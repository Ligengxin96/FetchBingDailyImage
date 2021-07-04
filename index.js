import mongoose from 'mongoose';
import axios from 'axios';
import dotenv from 'dotenv';

import bingImageApis from './config/bingApi.js';
import sendRequest from './utils/sendRequest.js'
import { getImage, createImage, updatImage } from './controllers/image.js'

dotenv.config();
mongoose.set('useFindAndModify', false);

const bingDomain = 'https://bing.com';

const connectDB = async() => {
  console.log('Begin connect mongoose');
  try {
    await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mongoose connect successful');
  } catch (error) {
    console.log(`Mongoose connect faild with error: ${error.message}`);
  }
}

const createPost = async(img) => {
  console.log(`Begin create post with imgUrl: ${img.imgUrl}`);

  try {
    const serverhost = process.env.SERVER_HOST; 
    const formValues = { email: process.env.EMAIL , password: process.env.PASSWORD };
    const API = axios.create({ baseURL: serverhost });
    
    const userPrefix = '/v1/user';
    const postPrefix = '/v1/post';
  
    let userInfo = null;
    try {
      const response = await API.post(`${userPrefix}/login`, formValues);
      userInfo = response?.data?.userInfo;
    } catch (error) {
      console.error(`Failed to login with error: ${error.message}`);
      throw error;
    }
  
    console.log(`Login successful, userInfo: ${JSON.stringify(userInfo)}`);
  
    API.interceptors.request.use((req) => {
      req.headers.Authorization = `Bearer ${userInfo.token}`;
      return req;
    });
  
    const commaIndex = img.copyright.indexOf('，') > -1 ? img.copyright.indexOf('，') : img.copyright.indexOf(',');
    const copyrightIconIndex = img.copyright.indexOf('©');
  
    const title = img.copyright.substring(0, commaIndex);
    const tags = img.copyright.substring(commaIndex + 1, copyrightIconIndex - 1).trim().split(',');
  
    let createdPost = null;
    const newPost = { message: img.copyright, title, tags: [...tags, img.region.toUpperCase()], selectedFile: img.imgUrl }
    createdPost = await API.post(`${postPrefix}`, newPost);
   
    console.log(`Create post successful, postId: ${createdPost.data.data[0]._id}`);
    
  } catch (error) {
    console.error(`Failed to create post with error: ${error.message}`);
  }
}

const fetchImageFromBing = async(api) => {
  try {
    const { url, region } = api;
    const result = await sendRequest(url);
    const images = JSON.parse(result).images;
    for (let img of images) {
      img['_id'] = img.hsh;
      img.region = region;
      img.imgUrl = bingDomain + img.url;
      const existImage = await getImage(img.hsh);
      if (existImage) {
        console.log(`This image with hsh: ${existImage.hsh} is exist, need update image info.`);
        img.lastUpdateTime = new Date();
        await updatImage(img.hsh, img);
      } else {
        console.log(`Fetch image from Bing successful, img hsh: ${img.hsh}, img url: ${img.imgUrl}`);
        await createImage(img);
        await createPost(img);
      }
    }
  } catch (error) {
    console.log(`Fetch image failed with error: ${error.message}`);
  }
}

const main = async() => {
  console.log(`Task begin, current time: ${new Date()}`);
  await connectDB();
  const promisseAll = [];
  bingImageApis.forEach((api) => {
    promisseAll.push(fetchImageFromBing(api));
  });
  await Promise.all(promisseAll);
  console.log(`Task finish, current time: ${new Date()}`);
  process.exit(0);
}

main();

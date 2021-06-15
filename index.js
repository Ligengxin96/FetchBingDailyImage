import mongoose from 'mongoose';
import dotenv from 'dotenv';

import bingImageApis from './config/bingApi.js';
import getImageRequest from './utils/getImageRequest.js'
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

const fetchImageFromBing = async(api) => {
  try {
    const { url, region } = api;
    const result = await getImageRequest(url);
    const images = JSON.parse(result).images;
    for (let img of images) {
      img['_id'] = img.hsh;
      img.region = region;
      img.imgUrl = bingDomain + img.url;
      const existImage = await getImage(img.hsh);
      if (existImage) {
        console.log('This image is exist, need update image info.')
        img.lastUpdateTime = new Date();
        await updatImage(img.hsh, img);
      } else {
        console.log(`Fetch image from Bing successful, img hsh: ${img.hsh}, img url: ${img.imgUrl}`);
        await createImage(img);
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

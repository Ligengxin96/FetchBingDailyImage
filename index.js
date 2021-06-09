import mongoose from 'mongoose';
import dotenv from 'dotenv';

import getImageRequest from './utils/getImageRequest.js'
import { getImage, createImage, updatImage } from './controllers/image.js'

dotenv.config();

const bingDomain = 'https://bing.com';
const bingImageApi = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US';

const connectDB = async() => {
  console.log('Begin connect mongoose');
  await mongoose.connect(
    process.env.CONNECTION_URL, 
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log('Mongoose connect successful');
    }).catch((error) => {
      console.log(`Mongoose connect faild with error: ${error.message}`)
    });
}

const fetchImageFromBing = async() => {
  try {
    const result = await getImageRequest(bingImageApi);
    const images = JSON.parse(result).images;
    for await (let img of images) {
      img['_id'] = img.hsh;
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
  await fetchImageFromBing();
  console.log(`Task finish, current time: ${new Date()}`);
}

setInterval(() => {
  main();
}, 1000 * 60);

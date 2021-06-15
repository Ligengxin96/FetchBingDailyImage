import ImageSchema from '../models/image.js';

const processData = (images) => {
  if (Array.isArray(images)) {
    return images.map(img => { return { hsh: img.hsh, copyright: img.copyright, title: img.title, imgUrl: img.imgUrl }});
  }
  return { hsh: images.hsh, copyright: images.copyright, title: images.title, imgUrl: images.imgUrl };
}

export const getImages = async (request, response) => {
  request.setTimeout(60000);
  try {
    const images = await ImageSchema.find();
    const data = processData(images);
    response.status(200).json({
      isSuccess: true,
      data,
      message: 'successful'
    });
  } catch (error) {
    response.status(404).json({
      isSuccess: false, 
      data: [],
      message: error.message,
    });
  }
}

export const getImagesByRegion = async (request, response) => { 
  request.setTimeout(30000);
  try {
    const { region = 'zh-cn' } = request.params;
    const images = await ImageSchema.find({ region });
    const data = processData(images);
    response.status(200).json({
      isSuccess: true,
      data,
      message: 'successful'
    });
  } catch (error) {
    response.status(404).json({
      isSuccess: false, 
      data: [],
      message: error.message,
    });
  }
}

export const getRandomImage = async (request, response) => {
  request.setTimeout(10000);
  try {
    const count = await ImageSchema.countDocuments().exec();
    const random = Math.floor(Math.random() * count)
    const image = await ImageSchema.findOne().skip(random).exec();
    const data = processData(image);
    response.status(200).json({
      isSuccess: true,
      data,
      message: 'successful'
    });
  } catch (error) {
    response.status(404).json({
      isSuccess: false, 
      data: [],
      message: error.message,
    });
  }
}


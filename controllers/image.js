import ImageSchema from '../models/image.js';

const supportImageSizes = [
  '320x240',
  '640x360',
  '640x480',
  '800x600',
  '800x480',
  '1024x768',
  '1280x720',
  '1280x768',
  '1366x768',
  '1920x1200',
  '1920x1080'
];

const processData = (images, size) => {
  if (images == null) {
    return [];
  }
  if (Array.isArray(images)) {
    return images.map(img => { return { hsh: img.hsh, copyright: img.copyright, title: img.title, imgUrl: img.imgUrl.replace(/1920x1080/g, size) }});
  }
  return [{ hsh: images.hsh, copyright: images.copyright, title: images.title, imgUrl: images.imgUrl.replace(/1920x1080/g, size) }];
}

const getImageSize = (request) => {
  const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
  console.log(`request '${request.originalUrl}' from '${ip}'`);
  const { size = '1920x1080' } = request.query;
  const afterTrimSize = size.replace(/ /g, '');
  if (supportImageSizes.includes(afterTrimSize)) {
    return { size: afterTrimSize };
  }
  let additionalMessage = `No specified size images, return '1920x1080' size images. Supported size: ${supportImageSizes.join('|')}.`;
  return { size: '1920x1080', additionalMessage };
}

export const getImages = async (request, response) => {
  request.setTimeout(120000);
  try {
    const { size, additionalMessage } = getImageSize(request);
    const images = await ImageSchema.find();
    const data = processData(images, size);
    response.status(200).json({
      isSuccess: true,
      data,
      message: additionalMessage ? `Successful. ${additionalMessage}` : 'Successful'
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
  request.setTimeout(60000);
  try {
    const { size, additionalMessage } = getImageSize(request);
    const { region } = request.params;
    const images = await ImageSchema.find({ region });
    const data = processData(images, size);
    response.status(200).json({
      isSuccess: true,
      data,
      message: additionalMessage ? `Successful. ${additionalMessage}` : 'Successful'
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
  request.setTimeout(30000);
  try {
    const { size, additionalMessage } = getImageSize(request);
    const { region } = request.params;
    let image;
    if (region) {
      const count = await ImageSchema.countDocuments({ region }).exec();
      const random = Math.floor(Math.random() * count);
      image = await ImageSchema.findOne({ region }).skip(random).exec();
    } else {
      const count = await ImageSchema.countDocuments().exec();
      const random = Math.floor(Math.random() * count);
      image = await ImageSchema.findOne().skip(random).exec();
    }
    const data = processData(image, size);
    response.status(200).json({
      isSuccess: true,
      data,
      message: additionalMessage ? `Successful. ${additionalMessage}` : 'Successful'
    });
  } catch (error) {
    response.status(404).json({
      isSuccess: false, 
      data: [],
      message: error.message,
    });
  }
}


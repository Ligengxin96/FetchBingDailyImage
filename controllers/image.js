import ImageSchema from '../models/image.js'

export const getImage = async(hsh) => { 
  console.log(`Need be get image hsh: ${hsh}`);
  try {
    const image = await ImageSchema.findById(hsh);
    if (image) {
      console.log(`----------------- Begin of image info -------------------`);
      console.log(`${JSON.stringify(image)}`);
      console.log(`------------------ End of image info --------------------`);
    }
    return image;
  } catch (error) {
    const errorMessage = `Get image from mongoose failed with error: ${error.message}`;
    console.log(errorMessage);
  }
}

export const createImage = async(image) => {
  try {
    console.log(`Need be created image hsh: ${image.hsh}`);
    const newImage = new ImageSchema(image);
    await newImage.save();
    console.log(`Save image to mongoose successful, image hsh: ${newImage.hsh}`);
  } catch (error) {
    const errorMessage = `Save image to mongoose failed with error: ${error.message}`;
    console.log(errorMessage);
  }
}

export const updatImage = async(hsh, image) => {
  console.log(`Need be updated image hsh: ${hsh}`);
  try {
    await ImageSchema.findByIdAndUpdate(hsh, image, { new: true });
    console.log(`Update image successful, image hsh: ${image.hsh}`);
  } catch (error) {
    const errorMessage = `Update image failed with error: ${error.message}`;
    console.log(errorMessage);
  }
}

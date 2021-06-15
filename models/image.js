import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    _id: String,
    bot: Number,
    copyright: String,
    copyrightlink: String,
    drk: Number,
    enddate: String,
    fullstartdate: String,
    hs: [String],
    hsh: String,
    imgUrl: String,
    quiz: String,
    startdate: String,
    title: String,
    top: Number,
    url: String,
    urlbase: String,
    wp: Boolean,
    region: {
      type: String,
      default: 'en-US',
    },
    createdTime: {
        type: Date,
        default: new Date(),
    },
    lastUpdateTime: {
      type: Date,
      default: new Date(),
  }
})

const ImageSchema = mongoose.model('bingImages', imageSchema);

export default ImageSchema;
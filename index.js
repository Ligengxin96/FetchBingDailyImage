import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import imageRouter from './routes/image.js';

dotenv.config();

const port = process.env.PORT || 5001;
const databaseConnectStr = process.env.CONNECTION_URL;

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/getimages/v1/getimages', imageRouter);

mongoose.connect(databaseConnectStr, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(() => {
  app.listen(port, () => {
    console.log(`${new Date()}: Server running on port: ${port}`);
  });
}).catch((error) => {
  console.log(`${new Date()}: Connect mongoose failed with error: ${error.message}`);
});

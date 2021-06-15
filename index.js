import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import imageRouter from './routes/image.js';

dotenv.config();

const port = 3001;
const databaseConnectStr = process.env.CONNECTION_URL;

const app = express();
app.use('/v1/getImages', imageRouter);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

mongoose.connect(databaseConnectStr, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
}).catch((error) => {
  console.log(`Connect mongoose failed with error: ${error.message}`);
});

import mongoose from 'mongoose';
import assert from 'assert';
import dotenv from 'dotenv';

import getImageRequest from '../../utils/getImageRequest.js';

import getBingImagesServerApi from '../../config/getBingImagesServerApi.js';

dotenv.config();

describe('test get bing images server health', function() {
  describe('test get bing images server MongoDB health', function() {
    it('should connect get bing images server MongoDB successful', async function() {
      this.retries(5);
      try {
        const response = await mongoose.connect(process.env.BINGIMAGE_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        assert.notStrictEqual(response, undefined);
        assert.notStrictEqual(response, null);
      } catch (error) {
        console.log(JSON.stringify(erros));
        assert(false);
      }
    });
  });
  
  describe('test get bing images api health', function() {
    it('api should return image info', async function() {
      this.retries(5);
      try {
        for (const api of getBingImagesServerApi) {
          const result = await getImageRequest(api);
          const imgs = JSON.parse(result).data;
          assert.notStrictEqual(imgs, undefined);
          assert.notStrictEqual(imgs, null);
        }
      } catch (error) {
        console.log(JSON.stringify(erros));
        assert(false);
      }
    });
  });
});
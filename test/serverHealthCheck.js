import mongoose from 'mongoose';
import assert from 'assert';
import dotenv from 'dotenv';

import bingImageApis from '../config/bingApi.js';
import getImageRequest from '../utils/getImageRequest.js'

dotenv.config();

describe('test server health', function() {
  describe('test mongoose server health', function() {
    it('should connect mongoose db successful', async function() {
      this.retries(5);
      try {
        const response = await mongoose.connect(process.env.BINGIMAGE_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        assert.notStrictEqual(response, undefined);
        assert.notStrictEqual(response, null);
      } catch (error) {
        assert(false);
      }
    });
  });
  
  describe('test Bing api health', function() {
    it('Bing api should return image info', async function() {
      this.retries(5);
      try {
        for (const api of bingImageApis) {
          const result = await getImageRequest(api.url);
          const imgs = JSON.parse(result).images;
          assert.notStrictEqual(imgs, undefined);
          assert.notStrictEqual(imgs, null);
          assert(Array.isArray(imgs));
          assert.notStrictEqual(imgs.length, 0);
          assert.notStrictEqual(imgs[0].hsh, undefined);
          assert.notStrictEqual(imgs[0].hsh, null);
          assert.notStrictEqual(imgs[0].hsh, '');
          assert.notStrictEqual(imgs[0].url, undefined);
          assert.notStrictEqual(imgs[0].url, null);
          assert.notStrictEqual(imgs[0].url, '');
        }
      } catch (error) {
        assert(false);
      }
    });
  });
})
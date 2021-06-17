import mongoose from 'mongoose';
import assert from 'assert';
import dotenv from 'dotenv';

import apis from '../config/api.js';
import getImageRequest from '../utils/getImageRequest.js';

dotenv.config();

describe('test server health', function() {
  describe('test mongoose server health', function() {
    it('should connect mongoose db successful', async function() {
      this.retries(5);
      try {
        const response = await mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        assert.notStrictEqual(response, undefined);
        assert.notStrictEqual(response, null);
      } catch (error) {
        assert(false);
      }
    });
  });
  
  describe('test api health', function() {
    it('api should return image info', async function() {
      this.retries(5);
      try {
        for (const api of apis) {
          const result = await getImageRequest(api);
          const imgs = JSON.parse(result).data;
          assert.notStrictEqual(imgs, undefined);
          assert.notStrictEqual(imgs, null);
        }
      } catch (error) {
        assert(false);
      }
    });
  });
})
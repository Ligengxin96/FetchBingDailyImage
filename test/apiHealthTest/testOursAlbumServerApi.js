import mongoose from 'mongoose';
import assert from 'assert';
import dotenv from 'dotenv';

import getImageRequest from '../../utils/getImageRequest.js';

import oursAlbumServerApi from '../../config/oursAlbumServerApi.js';

dotenv.config();

describe('test ours album server health', function() {
  describe('test ours album server MongoDB health', function() {
    it('should connect MongoDB successful', async function() {
      this.retries(5);
      try {
        const response = await mongoose.connect(process.env.OURS_ALBUUM_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        assert.notStrictEqual(response, undefined);
        assert.notStrictEqual(response, null);
      } catch (error) {
        assert(false);
      }
    });
  });
  
  describe('test ours album api health', function() {
    it('api should return data successful', async function() {
      this.retries(5);
      try {
        for (const api of oursAlbumServerApi) {
          const result = await getImageRequest(api);
          const resData = JSON.parse(result);
          assert(resData.isSuccess);
        }
      } catch (error) {
        assert(false);
      }
    });
  });
});
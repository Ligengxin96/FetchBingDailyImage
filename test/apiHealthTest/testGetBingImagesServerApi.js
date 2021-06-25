import assert from 'assert';
import dotenv from 'dotenv';

import getImageRequest from '../../utils/getImageRequest.js';

import getBingImagesServerApi from '../../config/getBingImagesServerApi.js';

dotenv.config();
  
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
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});
import assert from 'assert';
import dotenv from 'dotenv';

import getImageRequest from '../../utils/getImageRequest.js';

import oursAlbumServerApi from '../../config/oursAlbumServerApi.js';

dotenv.config();

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
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});

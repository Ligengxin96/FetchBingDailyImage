import assert from 'assert';

import sendRequest from '../../utils/sendRequest.js';

import oursAlbumServerApi from '../../config/oursAlbumServerApi.js';

describe('test ours album api health', function() {
  it('api should return data successful', async function() {
    this.retries(5);
    try {
      for (const api of oursAlbumServerApi) {
        const result = await sendRequest(api);
        const resData = JSON.parse(result);
        assert(resData.isSuccess);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});

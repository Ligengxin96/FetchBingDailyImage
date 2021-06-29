import assert from 'assert';

import sendRequest from '../../utils/sendRequest.js';

import repooTrafficDataApi from '../../config/getRepooTrafficDataApi.js';

describe('test get repoo traffic data api health', function() {
  it('api should return data successful', async function() {
    this.retries(5);
    try {
      for (const api of repooTrafficDataApi) {
        const result = await sendRequest(api);
        const resData = JSON.parse(result);
        assert.strictEqual(resData.isSuccess, true);
        assert.strictEqual(resData.data.viewsData.length, 1);
        assert.strictEqual(resData.data.clonesData.length, 1);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});

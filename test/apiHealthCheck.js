import assert from 'assert';

import apis from '../config/api.js';
import sendRequest from '../utils/sendRequest.js';


describe('test api health', function() {
  it('api should return image info', async function() {
    this.retries(5);
    try {
      for (const api of apis) {
        const result = await sendRequest(api);
        const imgs = JSON.parse(result).data;
        assert.notStrictEqual(imgs, undefined);
        assert.notStrictEqual(imgs, null);
      }
    } catch (error) {
      assert(false);
    }
  });
});
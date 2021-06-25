import assert from 'assert';

import bingImageApis from '../config/bingApi.js';
import sendRequest from '../utils/sendRequest.js'

describe('test Bing api health', function() {
  it('Bing api should return image info', async function() {
    this.retries(5);
    try {
      for (const api of bingImageApis) {
        const result = await sendRequest(api.url);
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
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});
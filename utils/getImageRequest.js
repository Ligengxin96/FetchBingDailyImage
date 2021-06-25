import request from 'request';

const getImageRequest = (url) =>{
  return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
          if (error) {
            reject(error);
          }
          if (response.statusCode > 299) {
            reject(`Invalid status code: ${response.statusCode}`);
          }
          resolve(body);
      });
  });
}

export default getImageRequest;
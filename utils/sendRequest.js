import request from 'request';

const sendRequest = (url) =>{
  return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
          if (error) {
            reject(error);
          }
          if (response.statusCode > 399) {
            reject(`Invalid status code: ${response.statusCode}`);
          }
          resolve(body);
      });
  });
}

export default sendRequest;
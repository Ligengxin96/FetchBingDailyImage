FROM node:14-alpine

ADD . ./

RUN yarn 

EXPOSE 5001

CMD [ "node", "index.js" ]
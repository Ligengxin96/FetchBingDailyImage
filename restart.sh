#!/bin/sh

docker stop fetchBingDailyImage && docker rm fetchBingDailyImage
docker run -v /etc/localtime:/etc/localtime --name fetchBingDailyImage --network userDefined --ip 172.20.0.6 -d fetch-bing-daily-image
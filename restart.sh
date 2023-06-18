#!/bin/sh

docker stop fetchBingDailyImage && docker rm fetchBingDailyImage
docker run -v /etc/localtime:/etc/localtime --name fetchBingDailyImage --network userDefined -d fetch-bing-daily-image

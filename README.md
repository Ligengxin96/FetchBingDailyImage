## About FetchBingDailyImage

The `main` branch project can fetch bing daily image and store in MongoDB.

The `apis` branch project can expose the apis so that we can get bing historical daily images.

## How it work

Use schedule Github Action to automatically update readme.md file to trigger the Github Action to deploy main branch project to heroku.

After deploying in heroku, heroku will automatically execute `npm start` command to run this project, so we can fetch the image everyday.

This is like we deploy a azure function in heroku, we can get a free azure function by this way.

## Last 14 days repo traffic data

Total views data: `{ count: 1197, uniques: 7 }`

Total clones data: `{ count: 839, uniques: 64 }`

## Latest fetch images time

Latest fetch images time: `2021-06-30 08:12:51`

## To everyone

If this project is helpful to you please star this project, this is an encouragement to me `:)`




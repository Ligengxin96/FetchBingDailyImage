## About FetchBingDailyImage

The `main` branch project can fetch bing daily image and store them in MongoDB.
It also can create a post automatically, you can see the images list in [this website](https://oursalbum.netlify.app)

The `apis` branch project can expose the apis so that we can get bing historical daily images.

## How it work

Use schedule Github Action to automatically update readme.md file to trigger the Github Action to deploy main branch project to heroku.

After deploying in heroku, heroku will automatically execute `npm start` command to run this project, so we can fetch the image everyday.

This is like we deploy a azure function in heroku, we can get a free azure function by this way.

## `2022-12-30` To `2025-07-26` FetchBingDailyImage repo traffic data

Total views data: `{ count: 2023, uniques: 517 }`

Total clones data: `{ count: 1662, uniques: 1332 }`

## Latest fetch images time

Latest fetch images time: `2025-07-26 08:21:02`

## To everyone

If this project is helpful to you please star this project, this is an encouragement to me `:)`




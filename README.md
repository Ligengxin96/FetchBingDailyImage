## Abount FetchBingDailyImage

The main branch project can fetch bing daily image and store in mongoose.

The apis branch project can export the apis so that we can get bing historical daily images.

## How it work

Use schedule Github Action to automatically update readme.md file to trigger the Github Action to deploy main branch project to heroku. 

After deploying in heroku, heroku will automatically execute `npm start` command to run this project, so we can fetch the image everyday.

This is like we deploy a azure function in heroku, we can get a free azure function by this way.

## Fetch Time

Latest Fetch Time: `2021-06-17 06:19:24`

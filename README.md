## About GetBingImages

You can use below api to the bing history daily images.

### (GET) `https://getbingimages.herokuapp.com/v1/getimages`

Get all images.

### (GET) `https://getbingimages.herokuapp.com/v1/getimages/random`

Get 1 random image.

### (GET) `https://getbingimages.herokuapp.com/v1/getimages/{region}`

Get specified region images.

You can get the images of the `zh-cn` region images by use this example: https://getbingimages.herokuapp.com/v1/getimages/zh-cn 

- `regoin` parameter
  - value: `zh-cn` | `en-us`

### Common parameter: size

You can get the different size images url by pass this parameter.

example: https://getbingimages.herokuapp.com/v1/getimages?size=1366x768

 - size
    - value: 
       `320x240`
      | `640x360`
      | `640x480`
      | `800x600`
      | `800x480`
      | `1024x768`
      | `1280x720`
      | `1280x768`
      | `1366x768`
      | `1920x1200`
      | `1920x1080`
    - default: `1920x1080`

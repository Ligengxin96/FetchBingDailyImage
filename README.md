## About GetBingImages

You can use below apis to get bing history daily images.

### `(GET) https://getbingimages.herokuapp.com/v1/getimages`

Get all images.

### `(GET) https://getbingimages.herokuapp.com/v1/getimages/random`

Get one random image.

### `(GET) https://getbingimages.herokuapp.com/v1/getimages/{region}`

Get the specified region images.

example: https://getbingimages.herokuapp.com/v1/getimages/zh-cn 

- `regoin` parameter detail
  - value: `zh-cn` | `en-us`

### Common parameter: `size`

Get the different size images.

example: https://getbingimages.herokuapp.com/v1/getimages?size=1366x768

example: https://getbingimages.herokuapp.com/v1/getimages/en-us?size=1366x768

- `size` parameter detail
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

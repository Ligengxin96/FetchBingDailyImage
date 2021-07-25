## About GetBingImages

You can use below apis to get bing historical daily images.

#### `(GET) https://ligengxin-server.top/getimages/v1/getimages/page/{currentPage}`

Get 20 images each.

example: https://ligengxin-server.top/getimages/v1/getimages/page/1

- `currentPage` parameter detail
  - type: `int`
  - value: `greater then 0 and less then maxPage`

#### `(GET) https://ligengxin-server.top/getimages/v1/getimages/random`

Get one random image.

#### `(GET) https://ligengxin-server.top/getimages/v1/getimages/page/{currentPage}/{region}`
Get the specified region images.

example: https://ligengxin-server.top/getimages/v1/getimages/page/1/zh-cn

- `currentPage` parameter detail
  - type: `int`
  - value: `greater then 0 and less then maxPage`

- `regoin` parameter detail
  - value: `zh-cn` | `en-us`

#### `(GET) https://ligengxin-server.top/getimages/v1/getimages/random/{region}`

Get one random specified region image.

example: https://ligengxin-server.top/getimages/v1/getimages/random/en-us

- `regoin` parameter detail
  - value: `zh-cn` | `en-us`

#### Common parameter: `size`

Get the different size images.

example: https://ligengxin-server.top/getimages/v1/getimages/page/1?size=1366x768

example: https://ligengxin-server.top/getimages/v1/getimages/page/1/en-us?size=1366x768

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

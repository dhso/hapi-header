# hapi-header

A Hapi plugin for request header(timeRecord, cors)

# install

```
npm install github:dhso/hapi-header
```

# options

```
//set timeRecord (default: false)
timeRecord: true

//set cors (default: false)
cors: {
  "Access-Control-Allow-Origin": "*", //指定允许其他域名访问
  "Access-Control-Allow-Credentials": true, //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回[optional]
  "Access-Control-Max-Age": 1800, //预检结果缓存时间,也就是上面说到的缓存啦[optional]
  "Access-Control-Allow-Methods": [optional], //允许的请求类型[optional]
  "Access-Control-Allow-Headers": [optional], //允许的请求头字段[optional]
}
```

# result

```
// in response header

x-req-start: 1531190985055
x-res-end: 1531190985061
x-time: 6ms

```

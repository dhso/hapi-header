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
cors: true
```

# result
```
// in response header

'x-req-start':1531190776
'x-res-end':1531190777
'x-time': 1s

```

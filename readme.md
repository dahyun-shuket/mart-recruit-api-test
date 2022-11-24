# **마트 API 관리 프로젝트**

# 어쩌구 저쩌구//////

# **실행**

```javascript
// pm2 start ./service.config.js (--watch)
npm start
```

2021-04-20 추가 부분

# _rand-token_

npm : rand-token

URL : [https://www.npmjs.com/package/rand-token](https://www.npmjs.com/package/rand-token)

License : MIT license

## **Usage**

```javascript
// Create a token generator with the default settings:
var randtoken = require("rand-token");

// Generate a 16 character alpha-numeric token:
var token = randtoken.generate(16);

// Use it as a replacement for uid:
var uid = require("rand-token").uid;
var token = uid(16);

// Generate mostly sequential tokens:
var suid = require("rand-token").suid;
var token = suid(16);
```

json 첫번째 sucess , fail

다음 data

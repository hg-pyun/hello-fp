# 3주차
Rambda.js

## 특징
- rambda.js는 pure function style을 강조한다. 따라서 Imutablity 와 side-effect free는 이 라이브러리의 핵심 철학이다.
- Rambda 함수들은 자동 커리된다.
- Rambda 함수의 매개 변수는 커링 (currying)에 편리하도록 배열된다. 조작 할 데이터는 일반적으로 마지막에 제공된다.

```javascript
To use with node: 
$ npm install ramda

Then in the console: 
const R = require('ramda');

To use directly in the browser:
<script src="path/to/yourCopyOf/ramda.js"></script>
```
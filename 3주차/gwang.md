# ramda.js

- Javascript의 함수형 라이브러리이다.
- lodash.js나 underscore.js 보다 좀 더 정석에 가까운 함수형 표현을 표현 할 수 있도록 설계 되어있다.
- pure function으로 구현돼 있다. side effect와 immutable을 기본적으로 제공한다.
- ramda.js를 이용해 작성된 함수는 자동으로 Currying이 되기 때문에 재사용하기 좋다.
## ramda.js와 lodash.js node에서 사용법

```bash
 npm i lodash -S
 npm i ramda -S
```

```js
 const _ = require('lodash')
 const R = require('ramda')
```

## ramda.js 와 lodash.js(underscore.js)와의 공통점
- `map`, `reduce`, `filter` 등 배열을 다루는 함수들이 존재한다.
> ex) lodash.js `_.map`

```js
const square= n => n * n;
const a = [4, 8];
 
_.map(a, square);
// => [16, 64]
```
> ex) ramda.js `R.map`

```js
const square= n => n * n;
const a = [4, 8];

R.map(square, a);
// => [16, 64]
```
> ex) lodash.js `_.reduce`
```js
const sum = (total, curr) => total + curr;
const a = [1, 2, 3, 4, 5];
_.reduce(a, sum);
// 15
```

> ex) ramda.js `R.reduce`
```js
const sum = (total, curr) => total + curr;
const a = [1, 2, 3, 4, 5];
R.map(sum, a);
// 15
```

> ex) lodash.js `_.filter` 
```js
const even = num => num % 2 === 0;
const a = [1, 2, 3, 4, 5, 6];
_.filter(a, even);
// [2, 4, 6]
```

> ex) ramda.js `R.filter`
```js
const isEven = num => num % 2 === 0;
const a = [1, 2, 3, 4, 5, 6];

R.filter(isEven, a);
// [2, 4, 6]
```

- `curry` 같이 함수를 재사용할 수 있는 방법을 제공해 준다.

ex) lodash.js `_.curry`
```js
const sumThreeNum = (a, b, c) => a + b + c;
const curried = _.curry(sumThreeNum);

curried(1, 2, 3)
curried(1)(2)(3)
curried(1, 2)(3)
curried(_, 2, 3)(1)
```
ex) ramda.js `R.curry`
```js
const sumThreeNum = (a, b, c) => a + b + c;
const curried = R.curry(sumThreeNum);

curried(1, 2, 3)
curried(1)(2)(3)
curried(1, 2)(3)
curried(R._, 2, 3)(1)
```

## ramda.js와 lodash.js(underscore.js)와의 차이점
- ramda.js는 모든 함수가 Pure Function 작성 돼 있다.(side effect가 없다.) -> lodash에서 immutable한 변수를 사용하려면 immutable.js를 사용해야 한다.

> ex) lodash.js `_.remove`
```js
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n === 2;
});
 
console.log(array);
// => [1, 3, 4]
 
console.log(evens);
// => [2]
```

> ex) ramda.js `R.remove`

```js
var array = [1, 2, 3, 4];
var evens = R.remove(1, 1, array);
 
console.log(array);
// => [1, 2, 3, 4]
 
console.log(evens);
// => [1, 3, 4]
```

- lodash.js는 method chaining을 이용하기 때문에 라이브러리 내부함수에 종속적이다.

> ex) lodash.js

```js
_(1)
  .range(21)
  .filter((x) => x % 2 > 0)
  .map((x) => x % 5 === 0 ? 2*x : x)
  .sum()
```
- ramda.js의 합성합수 표현이 수학적 합성함수 표현과 유사하기 때문에 내가 작성한 기능을 중간에 삽입 할 수 있다. f(g(h(x)))

> ex) ramda.js

```js
R.compose(  
    R.sum,
    R.map((x) => x % 5 === 0 ? 2*x : x),
    R.filter((x) => x % 2 > 0))
    (R.range(1, 21))
```


## 참고자료 
- [ramda.js](http://ramdajs.com/)
- [lodash.js](https://lodash.com/)
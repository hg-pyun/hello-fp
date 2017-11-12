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

## Curry
Curry를 사용하지 않았을 경우
```javascript
// uncurried version
var formatName1 = function(first, middle, last) {
    return first + ' ' + middle + ' ' + last;
};
formatName1('John', 'Paul', 'Jones');
//=> 'John Paul Jones'

formatName1('John', 'Paul');
//=> 'John Paul undefined');
```
Curry를 사용할 경우
```javascript
// curried version
var formatNames2 = R.curry(function(first, middle, last) {
    return first + ' ' + middle + ' ' + last;
});

formatNames2('John', 'Paul', 'Jones');
//=> 'John Paul Jones'

var jp = formatNames2('John', 'Paul'); //=> returns a function
jp('Jones'); //=> 'John Paul Jones'
jp('Stevens'); //=> 'John Paul Stevens'
```
map에 활용할 수도 있다
```javascript
['Jones', 'Stevens', 'Ziller'].map(jp);
//=> ['John Paul Jones', 'John Paul Stevens', 'John Paul Ziller']
```

### More Useful Example
배열을 모두 더하는 함수를 만들어보자.
```javascript
// Plain JS:
var add = function(a, b) {return a + b;};
var numbers = [1, 2, 3, 4, 5];
var sum = numbers.reduce(add, 0); //=> 15
```

이를 일반화 하면 다음과 같다.
```javascript
var total = function(list) {
    return list.reduce(add, 0);
};
var sum = total(numbers); //=> 15
```
Rambda로 표현하면 거의 비슷하다.
```javascript
var sum = R.reduce(add, 0, numbers); //=> 15
```
그러나 Rambda의 reduce는 curried function이기 때문에 다음 과 같이 활용이 가능하다.
```
// In Ramda:
var total = R.reduce(add, 0);  // returns a function
var sum = total(numbers); //=> 15
```
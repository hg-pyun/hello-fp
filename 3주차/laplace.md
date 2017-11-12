# 3주차
Rambda.js에 대해 기본적인 부분을 공부해 보도록 하자.

## 특징
- Rambda는 pure function style을 강조한다. 따라서 Imutablity 와 side-effect free는 이 라이브러리의 핵심 철학이다.
- Rambda 함수들은 자동 커리된다.
- Rambda 함수의 매개 변수는 커링 (currying)에 편리하도록 배열된다. 조작 할 데이터는 일반적으로 마지막에 제공된다.

## Installation
```javascript
To use with node: 
$ npm install ramda

Then in the console: 
const R = require('ramda');

To use directly in the browser:
<script src="path/to/yourCopyOf/ramda.js"></script>
```

## Curry
우선 Rambda의 curry에 대해 간단히 알아보도록 하자. formatName1이란 함수에서는 lastName을 고정하여 반복하고 사용하고 싶다. 하지만 vanilla를 사용해서 다음과 같이 표현할 경우 undefined가 출력된다.
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
따라서 curry를 사용해서 인자를 분해할 수 있는데,
Rambda를 사용할 경우 다음과 같이 사용이 가능하다.
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
뿐만 아니라 map에 활용할 수도 있다.
```javascript
['Jones', 'Stevens', 'Ziller'].map(jp);
//=> ['John Paul Jones', 'John Paul Stevens', 'John Paul Ziller']
```

### More Useful Example
이번엔 좀더 구체적인 활용법을 알아보도록 하자. 우선 배열을 모두 더하는 함수를 만들어보자. 보통은 reduce를 사용해서 다음과 같이 작성할 것이다.
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
이번엔 Rambda로 표현해보도록 하자. 거의 비슷하다.
```javascript
var sum = R.reduce(add, 0, numbers); //=> 15
```
하지만 vanilla와 다른 점이 있다. Rambda의 reduce는 curried function이기 때문에 다음 과 같이 활용이 가능하다.
```
// In Ramda:
var total = R.reduce(add, 0);  // returns a function
var sum = total(numbers); //=> 15
```

## Compose
Rambda를 사용하면 함수들을 합성해서 내게 필요한 함수들을 쉽게 만들어 낼 수 있다.
아래 함수를 보도록 하자. ```yellGreeting```함수는 ```classyGreeting``` 함수의 인자들을 대문자로 바꿔주는 함수이다.
```javascript
var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
var yellGreeting = R.compose(R.toUpper, classyGreeting);
yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"
```
여기서 주목할 부분은 compose method이다. ```R.compose```함수는 오른쪽에서 왼쪽으로 함수를 합성하는 역할을 한다. 가장 오른쪽 함수는 인자가 몇개여도 상관없지만, 그 외 함수들은 단항이어야 한다.
단, compose된 함수는 자동적으로 curried되지 않으니 주의하도록 하자. (비슷한 함수로 ```R.pipe```도 있다.)<br/>
다음으로 인자로 사용된 toUpper함수를 보도록 하자. ```R.toUpper```는 함수명으로 보건대 소문자를 대문자로 바꿔주는 역할을 하는 것 같다. 실제 구현을 보면 다음과 같다.

```javascript
import invoker from './invoker';

var toUpper = invoker(0, 'toUpperCase');
export default toUpper;
```
실제 다음과 같이 사용해도 잘 동작한다.
```
var yellGreeting = R.compose(R.invoker(0,'toUpperCase'), classyGreeting);
```
보다보니 ```invoker```함수가 무엇인지 궁금하다. 아무래도 ```invoker``` 함수가 Native의 toUppserCase 함수를 호출하는 것 같다. 그렇다면 ```invoker``` 함수도 들여다 보도록 하자.
```javascript
import _curry2 from './internal/_curry2';
import _isFunction from './internal/_isFunction';
import curryN from './curryN';
import toString from './toString';

var invoker = _curry2(function invoker(arity, method) {
  return curryN(arity + 1, function() {
    var target = arguments[arity];
    if (target != null && _isFunction(target[method])) {
      return target[method].apply(target, Array.prototype.slice.call(arguments, 0, arity));
    }
    throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
  });
});
export default invoker;
```
```_curry2```, ```curryN``` 등 또 새로운 함수가 나타났다. 대략적으로 보면 넘겨받은 인자를 실행하여 적용한 후 curried하여 리턴하는 것 같다. 계속 들어가다간 끝이 없으니 일단 curryN에 대해서는 다음 [포스팅](http://shiren.github.io/2015-08-03-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98-%EC%BB%A4%EB%A7%81/)을 참고하도록 하자. <br/>
Official Document를 참고하여 간단히 설명하자면 ```invoker``` 넘겨받은 인수와 함수명을 실행한 후 curried된 함수를 반환한다. 아래 예제를 보면 이해하는데 도움이 될 것이다.
```javascript
var sliceFrom = R.invoker(1, 'slice');
sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
var sliceFrom6 = R.invoker(2, 'slice')(6);
sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
```

아래는 다른 활용 예 이다.
```
R.compose(Math.abs, R.add(1), R.multiply(2))(-4) //=> 7
```
이처럼 Rambda에서는 여러 함수를 조합하여 새로운 함수를 만들어 낼 수 있다. 또 내부 구현에서도 기존 Rambda 함수들을 이용하여 구현해 둔게 대부분이었으니, 어떻게 활용하는가에 따라 코드 몇줄 또는 함수 몇개로 원하는 결과를 얻을 수 있는 함수를 만들어낼 수 있을 것이다.

## Examples
몇가지 예를 더 보도록 하자.

### Get an object's method names
object에서 function을 value로 가지고 있는 key값을 추출하는 함수를 만들어 보도록 하자.
```javascript
// pure script
var methodNames = function(obj){
    var result = [];
    for(var key in obj){
        if(typeof obj[key] === "function"){
            result.push(key);
        }
    }

    return result;
};

var obj = {
    foo: true,
    bar: function() {},
    baz: function() {},
};

methodNames(obj); // => ['bar', 'baz']
```
Rambda에서는 is, keys, pickby, compose를 사용하면 쉽게 만들 수 있다.

#### R.is
유효성 검사를 위해 사용한다.
```javascript
R.is(Object, {}); //=> true
R.is(Number, 1); //=> true
R.is(Object, 1); //=> false
R.is(String, 's'); //=> true
R.is(String, new String('')); //=> true
R.is(Object, new String('')); //=> true
R.is(Object, 's'); //=> false
R.is(Number, {}); //=> false
```
#### R.keys
key값을 추출해준다.
```javascript
R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
```
#### R.pickBy
object에서 조건식을 만족하는 값들만 추출 한다. 
```javascript
var isUpperCase = (val, key) => key.toUpperCase() === key;
R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
```
#### methodNames
```javascript
//  methodNames :: Object -> [String]
var methodNames = R.compose(R.keys, R.pickBy(R.is(Function)));

var obj = {
  foo: true,
  bar: function() {},
  baz: function() {},
};

methodNames(obj); // => ['bar', 'baz']
```

### Rename keys
다음 함수는 인자로 들어온 object의 key를 바꾸는 함수이다.
```javascript
const renameKeys = R.curry((keysMap, obj) =>
  R.reduce((acc, key) => R.assoc(keysMap[key] || key, obj[key], acc), {}, R.keys(obj))
);
```

renameKeys의 첫번째 인자로 바꿀 key들을 매칭하고, 두번째 인자로 바꾸고자 하는 object를 전달한다.
```javascript
const input = { firstName: 'Elisia', age: 22, type: 'human' }

renameKeys({ firstName: 'name', type: 'kind', foo: 'bar' })(input)
//=> { name: 'Elisia', age: 22, kind: 'human' }
```
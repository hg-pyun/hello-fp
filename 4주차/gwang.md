# underscore.js 분석하기

underscore.js는 Javascript 라이브러리이다. 라이브러리 소개에는 함수형 프로그래밍 지원이라고 되어 있지만, 객체지향으로 쓸 수도 있다.

함수형 방식
```js
const _ = require('underscore');

const arr = [12, 15, 19, 22, 56];

const oddArr = _.filter(arr, n => n%2); // [15, 19]

```
객체지향 방식
```js
const _ = require('underscore');

const arr = [12, 15, 19, 22, 56];

const oddArr = _(arr).filter(arr, n => n%2);

```
`_`객체를 생성자 함수로 써서 underscore객체를 만든다.


## underscore.js의 기능 분류

- collections
- Arrays
- Functions
- Objects
- Utilities
- OOP Style
- Chaining

underscore.js 홈페이지를 가보면 이렇게 7가지 섹션으로 분류 돼 있다. 각 섹션 별로 함수를 하나씩 골라서 분석해 보자.

### collections
 이 섹션에서는 `_.reduce` 함수를 살펴보겠다. 먼저 reduce 함수의 사용법을 알아보자.

공식문서에는 아래와 같이 사용하라고 돼 있는데, `list`와 `iteratee`는 필수인자, `memo`와 `context`는 선택이라고 표시 돼 있다.
```js
_.reduce(list, iteratee, [memo], [context]) 
```
위의 사용법을 따라서 아래와 같이 사용할 수 있다.
```js
const multiply = (a, b) => a * b;
_.reduce([1, 2, 3, 4, 5], multiply, 10);
=> 1200
```
이 함수는 배열 `[1, 2, 3, 4, 5]`를 순회하는데 배열의 첫 번째 요소에 대해 순회 할 때 `memo`값이 있으면 `memo`를 `multiply`함수의 첫 번째 인자로 넘겨주고, `multiply`함수의 두 번째 인자는 배열의 첫 번째요소 된다. 그리고 `multiply` 함수가 평가되고 그 결과인 `return`값이 다음 번 `multiply` 함수의 첫 번째 인자가 되고, `multiply` 함수의 두 번째 인자는 배열의 각 요소가 되는 형태로 배열이 끝날 때까지 반복된다.

이제 이 함수가 어떻게 구현됐는지 확인 해 보자. 아래 코드는 underscore.js에 있는 내용 그대로(주석까지)를 가지고 온 형태이다.

```js
// Create a reducing function iterating left or right.
function createReduce(dir) {
  // Optimized iterator function as using arguments.length
  // in the main function will deoptimize the, see #1991.
  function iterator(obj, iteratee, memo, keys, index, length) {
    for (; index >= 0 && index < length; index += dir) {
      var currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  }

  return function(obj, iteratee, memo, context) {
    iteratee = optimizeCb(iteratee, context, 4);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        index = dir > 0 ? 0 : length - 1;
    // Determine the initial value if none is provided.
    if (arguments.length < 3) {
      memo = obj[keys ? keys[index] : index];
      index += dir;
    }
    return iterator(obj, iteratee, memo, keys, index, length);
  };
}
_.reduce = _.foldl = _.inject = createReduce(1);

// The right-associative version of reduce, also known as `foldr`.
_.reduceRight = _.foldr = createReduce(-1);
```
구현 코드에서는 `_.reduce`와 `_.reduceRight`을 하나의 로직으로 구현하기 위해 `createReduce`란 wrapper 함수를 만들어서 인자(`dir`)가 1이면 `_.reduce` -1이면 `_.reduceRight`가 되도록 구현했다. `createReduce`함수는 새로운 함수를 만들어서 반환하는데 이 함수가 우리가 사용하는 `_.reduce` 또는 `_.reduceRight`이다.


반환된 함수를 편의상 `reduce` 함수라고 칭하자. `reduce`함수는 문서 사용법에서 봤듯이 4개의 인자를 받을 수 있다. `reduce`함수가 실행되면 `iteratee` 값을 `obtimizeCb`함수를 통해 얻은 결과값으로 바꿔준다. 그럼 이제 `obtimizeCb` 함수가 무슨일을 하는지 보자.

```js
// Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
var optimizeCb = function(func, context, argCount) {
  if (context === void 0) return func;
  switch (argCount == null ? 3 : argCount) {
    case 1: return function(value) {
      return func.call(context, value);
    };
    case 2: return function(value, other) {
      return func.call(context, value, other);
    };
    case 3: return function(value, index, collection) {
      return func.call(context, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(context, accumulator, value, index, collection);
    };
  }
  return function() {
    return func.apply(context, arguments);
  };
};
```
> `context === void 0` 은 `context`가 `undefind`인지 확인하는 구문이다.

`optimizeCb`함수는 `context`가 있는경우에 해당 함수의 `context`를 바꿔주는 역할을 한다. 다시 말해서 `reduce`함수의 두번째 인자로 넘어가는 `callback`함수 내부에서 쓰이는 `this`를 바꿔주는역할을 한다. 하지만 두 번째 인자로 `ES6`문법인 `arrow function`을 쓰면 의미가 없어진다. `arrow function`은 scope를 가지지 않기 때문에 this가 제대로 binding 되지 않는다.

```js
_.reduce([1, 2, 3], function (arr, curr){
  console.log(this);
  return arr+curr
}, 2, [1]);
// [1]
// [1]
// [1]
// context를 [1]로 바꿔준것이 제대로 작동
_.reduce([1, 2, 3],(arr, curr) => {
  console.log(this);
  return arr+curr
}, 2, [1]);
// {}
// {}
// {}
// context가 제대로 작동하지 않음
```

다시 돌아와서 `optimizeCb`함수가 실행되고, `keys`변수에 우리가 넘겼던 `Obj`가 `length` 속성을 갖는지 확인하는 함수 `isArrayLike`가 호출된다.

```js
var property = function(key) {
  return function(obj) {
    return obj == null ? void 0 : obj[key];
  };
};
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
var isArrayLike = function(collection) {
  var length = getLength(collection);
  return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};
```
`isArrayLike`함수 내부에서 `getLength`함수를 쓰고 `getLength`함수는 `property`함수를 쓰는데 `property`는 currying 함수이다. `collection`에 `length`속성이 숫자이고 `MAX_ARRAY_INDEX`보다 작으면 `true`를 반환한다.

따라서 우리가 넘긴 `Obj`인자가 `length` 속성을 가지고 있으면 `keys`값은 `false`가 되고, 가지고 있지 않으면 `_.keys(Obj)`의 결과값이 된다.

공식 문서에 나와있는 `_.keys`함수의 사용법과 구현은 아래와 같다.

```js
_.keys(object)
```
```js
_.keys({one: 1, two: 2, three: 3});
=> ["one", "two", "three"]
```

```js
_.keys = function(obj) {
  if (!_.isObject(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
  var keys = [];
  for (var key in obj) if (_.has(obj, key)) keys.push(key);
  // Ahem, IE < 9.
  if (hasEnumBug) collectNonEnumProps(obj, keys);
  return keys;
  };
```
이는 브라우저 버전 별로 Object의 key를 배열로 만들어서 리턴해 주는 함수이다.


다시 `reduce`함수로 돌아가자. `keys`가 결정 되고 `length`와 `index` 변수의 값을 지정해 주고 나서, `memo`의 값이 넘어오지 않은경우 첫 번째 값을 memo값으로 설정하고 `index`값을 `dir`값 만큼 더해주는데, 이는 `reduce`함수를 쓸 때 memo 값을 넘기지 않으면 객체의 두 번째 요소부터 실행되는 이유이다.

그리고나서 `createReduce`내부에 선언된 `iterator`함수를 실행한다. 위에서 할당했던 변수 값을 넘겨주면 `iterator`함수는 `Obj`를 순환하면서 `iteratee` callback을 실행시킨다. 함수 내부에서 `iteratee`함수의 결과값을 memo에 담아두었다가 다음번 함수 호출에서 첫 번째 인자로 넘기는 것을 확인할 수 있다.


### Arrays

이 섹션에서 분석할 함수는 `_.union`함수이다. underscore.js에서 `union`함수는 함수형 프로그래밍의 주요 개념중 하나인 HOF(High Order Function)이 녹아있는 함수라고 할 수 있다. 내부 구현을 보기 전에 용도와 사용법을 알아보자.

공식 문서에는 아래와 같이 설명돼 있다. `union`함수는 인자로 인자수에 상관없이 배열들을 받는다. 
```js
_.union(*arrays)
```
위의 사용법으로 아래와 같이 사용할 수 있다.
```js
_.union([1, 2, 3], [5, 6, 7], [2, 6, 9, 10]);
=> [1, 2, 3, 5, 6, 7, 9, 10]
```
결과를 보면 union이란 이름에 걸맞게 배열들의 합집합을 반환하는 함수이다.

그럼 이제 `union`함수를 분석해보자.
```js
_.union = function() {
  return _.uniq(flatten(arguments, true, true));
  };
```
라이브러리의 구현코드는 이게 끝이다. `_.union`함수는 내부에서 `_.uniq`함수와 `flatten`함수를 이용한다. `flatten`함수는 `_.flatten`함수의 내부 구현용으로 만들어진 함수인데, 이미 구현된 함수를 조합해서 `_.union`함수를 구현했다.

함수의 작동 순서대로 `flatten`함수를 먼저 분석해보자.  
공식 문서 사용법은 아래와 같다. 
```js
_.flatten(array, [shallow]);
```
```js

_.flatten([1, [2], [3, [[4]]]]);
=> [1, 2, 3, 4];

_.flatten([1, [2], [3, [[4]]]], true);
=> [1, 2, 3, [[4]]];
```

```js
var flatten = function(input, shallow, strict, startIndex) {
  var output = [], idx = 0;
  for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
    var value = input[i];
    if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
      //flatten current level of array or arguments object
      if (!shallow) value = flatten(value, shallow, strict);
      var j = 0, len = value.length;
      output.length += len;
      while (j < len) {
        output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
  }
  return output;
};
_.flatten = function(array, shallow) {
  return flatten(array, shallow, false);
};
```

`_.flatten`함수는 `input`, `shallow`값을 받아서 중첩된 배열을 벗겨주는 역할을 한다. 내부의 `flatten`함수는 4개의 인자를 받는데 이는 다른 함수에서도 이 `flatten`함수를 사용하기 때문에 확장성을 위해 설계 된 함수여서 그렇다.  
`flatten`함수 내부에서선 `input`의 타입을 체크해서 배열이면 `flatten`함수를 재귀로 호출해서 배열이 벗겨질 때까지 호출을 하는데 `shallow`값을 true로 받아올 경우는 한 단계만 배열이 벗겨진다.  
다시 `_.union` 함수로 돌아와서 `flatten`함수로 배열을 1차원화 시킨 결과 값을 `_.uniq`함수의 인자로 넘겨준다. `_.uniq`함수는 배열 내부에서 중복된 값을 하나만 남겨놓고 나머지는 없애주는 함수이다. 

`_.uniq`함수의 공식문서에 있는 사용법은 아래와 같다.
```js
_.uniq(array, [isSorted], [iteratee])
```
```js
_.uniq([1, 2, 1, 4, 1, 3]);
=> [1, 2, 4, 3]
```
```js
_.uniq = _.unique = function(array, isSorted, iteratee, context) {
  if (!_.isBoolean(isSorted)) {
    context = iteratee;
    iteratee = isSorted;
    isSorted = false;
  }
  if (iteratee != null) iteratee = cb(iteratee, context);
  var result = [];
  var seen = [];
  for (var i = 0, length = getLength(array); i < length; i++) {
    var value = array[i],
        computed = iteratee ? iteratee(value, i, array) : value;
    if (isSorted) {
      if (!i || seen !== computed) result.push(value);
      seen = computed;
    } else if (iteratee) {
      if (!_.contains(seen, computed)) {
        seen.push(computed);
        result.push(value);
      }
    } else if (!_.contains(result, value)) {
      result.push(value);
    }
  }
  return result;
};
```

`_.uniq`함수는 `array`, `isSorted`, `iteratee`, `context` 4개의 인자를 받는 함수인데 `isSorted`는 `_.uniq`함수의 입력값이 정렬되어 있는지 함수에 알려주는 값인데 이 값이 true이면(정렬을 해서 넘기면) 더 빠른 연산이 가능하다. `iteratee`는 각 요소에 적용할 함수를 입력받고, `context`는 `iteratee`함수 내부에서 쓰일 `this`의 `context`를 지정해 준다. `isSorted`값과 `iteratee`함수는 옵션이고, `isSorted`값을 무시하고 `iteratee`함수만 넘길 수도 있다.
`_.uniq`함수 내부에서 `isSorted`값의 type이 `boolean`인지 확인하고, 아니면 인자들의 값을 재지정해주고 나서, `iteratee`함수에 `context`를 설정해준다. 그리고 `iteratee`함수가 없을 경우엔 각각의 값을 비교해서 `result`배열의 내부에 값이 없을경우에만 추가해 주고, `iteratee`함수가 있을경우엔 그 결과값이 `result`배열에 없을 경우에 추가한다.


이렇게 `_.union`함수는 여러개의 배열을 받아서 `_.flatten`으로 배열을 1차원화 시킨 후 그중에서 중복되는 값을 없애는 방법으로 합집합을 구현하였다. 그래서 `_.union`함수는 이미 만들어진 함수를 재사용하여 다른 함수를 만들어내는 함수형 프로그래밍의 장점을 제대로 보여주고 있다.


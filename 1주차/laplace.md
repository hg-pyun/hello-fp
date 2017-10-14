# 함수형 프로그래밍이란 ?
함수형 프로그래밍은 순수 함수를 작성하는 것, 그러니까 숨겨진 입력이나 출력을 최대한 제거하여 
가능한 한 우리 코드의 대부분이 단지 입력과 출력의 관계를 기술하게끔 하는 것을 말한다.

#### Advantage
- 부작용(Side Effect)의 최소화
- 병렬프로그래밍에 강

#### Usage
- 순수 함수(pure function)
- 익명 함수(anonymous function)
- 람다 (lambda)
- 고계 함수(higher-order function)
- Curry
- Monad


# JS에서 함수형 프로그래밍 기법 찾기
#### Map
```javascript
// 과목을 저장
let subjects = ['math', 'english', 'korean'];

// 대문자로 변경
function makeUpperCase(word) { 
return word.toUpperCase();
}

// loop
let loopResult = [];
for (let i = 0; i < subjects.length; i++) {
    loopResult.push(makeUpperCase(subjects[i]));
}
console.log(loopResult);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]

// functional
let funcResult = subjects.map(makeUpperCase);   // Array.prototype.map.call(subjects, makeUpperCase);
console.log(funcResult);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]

// react
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li>{number}</li>
);
```

#### Filter
```javascript
// functional
let funcResult = subjects.map(makeUpperCase);   // Array.prototype.map.call(subjects, makeUpperCase);
console.log(funcResult);  // [ 'MATH', 'ENGLISH', 'KOREAN' ]

// loop
let result = [];
for (let i = 0; i < subjects.length; i++) {
    let subject = subjects[i];
    if(is90Over(subject)){
        result.push(subjects[i]);
    }
}
console.log(result); // [ { name: 'math', score: 100 }, { name: 'korean', score: 95 } ]

// functional
let funcResult = subjects.filter(is90Over);
console.log(funcResult); // [ { name: 'math', score: 100 }, { name: 'korean', score: 95 } ]

// react
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.filter(number => number > 3).map((number) =>
    <li>{number}</li>
);
```

#### Reduce
```javascript
// 과목을 저장
let subjects = ['math', 'english', 'korean'];

// 이전 숫자에 단어 숫자를 카운트해서 저장
function addLength(total, word) {
return total + word.length;
}

// loop
let loopTotal = 0;
for (let i = 0; i < subjects.length; i++) {
    let subject = subjects[i];
    loopTotal = addLength(loopTotal, subject);
}
console.log(loopTotal); // 17

// functional
let funcTotal = subjects.reduce(addLength, 0);
console.log(funcTotal);  // 17
```

#### arrow
```javascript
let subjects = ["math", "english", "korean",];

let lengthArray = subjects.map(function(s){ return s.length });
let lengthArray2 = subjects.map( s => s.length );

console.log(lengthArray);  // [ 4, 7, 6 ]
console.log(lengthArray2); // [ 4, 7, 6 ]
```

#### currying
example 01
```javascript
let sum = x => y => x+y;
let sum5 = sum(5);
let sum12 = sum5(7);

console.log(sum12, sum(5)(7)); // 12 12
```
example 02
```javascript
let greetDeeplyCurried = 
    greeting => separator => emphasis => name => 
        console.log(greeting + separator + name + emphasis);

let greetAwkwardly = greetDeeplyCurried("Hello")("...")("?");
greetAwkwardly("momo");  // Hello...momo?

let sayHello = greetDeeplyCurried("Hello")(", ");
sayHello(".")("momo");  // Hello, momo.

let askHello = sayHello("?");
askHello("momo");   // Hello, momo?
```
#### Bind
```javascript
function add(x, y) {
return x+y;
}

let increment = add.bind(undefined, 1);
console.log(increment(4) === 5);
```

#### Redux
```javascript
// connect
export default connect()(TodoApp)

// connect with action creators
import * as actionCreators from './actionCreators'
export default connect(null, actionCreators)(TodoApp)

// connect with state
export default connect(state => state)(TodoApp)
```

#### Vuex
```javascript
getters: {
    // ...
    getTodoById: (state, getters) => (id) => {
        return state.todos.find(todo => todo.id === id)
    }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

#### Event Handler
```javascript
const handleChange = (fieldName) => (event) => {
    saveField(fieldName, event.target.value)
}
<input type="text" onChange={handleChange('email')} ... />
```

#### Rendering HTML
```javascript
renderHtmlTag = tagName => content => `<${tagName}>${content}</${tagName}>`

renderDiv = renderHtmlTag('div')
renderH1 = renderHtmlTag('h1')

console.log(
    renderDiv('this is a really cool div'),
    renderH1('and this is an even cooler h1')
)
```

#### Monad
a monad is a design pattern that defines how functions, actions, inputs, and outputs can be used together to build generic types.
[Monad in Javascript](http://www.haruair.com/blog/2986)
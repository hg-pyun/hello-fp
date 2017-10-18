# 함수형 프로그래밍이란?
  - 상태가 없는 순수 함수(pure function)를 조합하고 공유 상태(shared state), 변경 가능한 데이터(mutable data) 및 부작용(side-effects)을 피하여 프로그래밍을 하는 패러다임.
  - 명령형이 아닌 선언형이며 Application의 상태는 순수 함수를 통해 전달 된다.

## 순수 함수(Pure Function)
  - 같은 입력이 주어지면, 항상 같은 출력을 반환한다.
  - Side-effects가 없다.
  - 외부 상태와 완전히 독립적이다(외부상태를 변경해서도, 외부상태에 의존해서도 안된다).
  - 공유된 가변 상태와 관련된 버그에서 영향을 받지 않는다.
 > 순수함수는 참조 투명성(referential transparency)(프로그램의 의미를 변경하지 않고 결과 값으로 함수 호출을 대체할 수 있음)을 가져야 한다.

## 공유 상태(Shared State)
  - 공유 범위(Shared Scope)내에 있는 변수, 객체 또는 메모리 공간이거나 범위 간에 전달되는 객체의 속성.
  > 공유 범위(Shraed Scope)에는 전역 또는 클로저가 포함 된다.
  - 공유 상태(Shared State)의 문제점은 해당 함수가 사용하거나 영향을 미치는 모든 공유 변수의 히스토리를 알아야 한다.

  ### 공유 상태(Shared State)와 관련된 문제
  - 공유 상태(Shared State)와 관련된 일반적인 버그인 경쟁조건(race condition)의 예
  > 아래와 같이 공유 범위(Shared Scope) 내에 있는 변수 searchResult의 값은 가장 각 요청마다 응답 시간이 다르기 때문에 가장 마지막으로 도착한 응답의 결과 값으로 저장 된다. 즉, 마지막 keyup 이벤트에서 요청한 결과 값이라는 보장이 없다.
  ```js
  // 검색결과를 저장하는 변수
  let searchResult;
  
  // 검색 input에서 keyup event 가 일어날 경우 검색 결과를 가져온다.
  input.addEventListener('keyup', () => {
    // axios 예시 코드
    axios.get(searchURL)
      .then((res) => {
        searchResult = res.data;
      })
  })
  ```
  > 디바운싱(Debouncing)을 이용한 공유 상태 경쟁조건(race condition) 해결 코드
  ```js
  function getSearchResult(){
    let prevTime = new Date();
    return function (e) {
      let nowTime = new Date();
      if(nowTime - prevTime > 200){
        axios.get(searchURL)
          .then((res) => {
            searchResult = res.data;
          })
      } else {
        prevTime = nowTime;
      }
    }
  }
  let searchResult;
  
  input.addEventListener('keyup', getSearchResult())
  ```
  - 공유상태(Shared State)와 관련된 문제 중 함수 호출 순서에 따라 결과 값이 달라진다.
  > 공유 상태를 가진 코드
  ```js
  const x = {
    val: 2
  };
  const x1 = () => x.val += 1;
  const x2 = () => x.val *= 2;

  x1(); // x.val === 3
  x2(); // x.val === 6

  console.log(x.val); // 6
  
  // 위와 같은 코드
  const y = {
    val: 2
  };
  const y1 = () => y.val += 1;
  const y2 = () => y.val *= 2;

  // 함수 호출 순서만 다름
  y2(); // y.val === 4
  y1(); // y.val === 5

  console.log(y.val); // 5
  ```
  > 공유 상태를 피한 코드
  ```js
  const x = {
    val: 2
  };
  // 각각 새로운 객체를 만들어서 반환하므로 외부에 대한 의존성이 없다.
  const x1 = x => Object.assign({}, x, { val : x.val + 1});
  const x2 = x => Object.assign({}, x, { val : x.val * 2});
  
  console.log(x1(x2(x)).val); // 5

  const y = {
    val: 2
  };

  // 외부에 대한 의존성이 없으므로 다른 함수가 필요하지 않음
  // x1, x2 함수를 아무리 많이 실행해도 입력 값이 같으면 항상 같은 결과가 나온다.
  x1(x);
  x2(x);

  console.log(x1(x2(y)).val); // 5
  ```
  
## 불변성(Immutability)
 - 객체를 생성한 후에 수정할 수 없는 객체를 불변성이 있는 객체다라고 칭함.
 - 함수형 프로그래밍의 핵심 개념.
 - 불변성이 없다면 프로그램의 데이터 흐름이 손실될 수 있다.
 > Javascript에선 불변성과 `const`를 혼동하지 않아야 한다. `const`는 생성 후 재할당 할 수 없는 변수 이름 바인딩을 만들 뿐 불변객체를 만들지 않는다.
 ```js
 const a = {
   x: 1,
   y: 2,
   z: 3
 };

 // 객체 내부 속성 값은 변할 수 있다.
 a.x = 5;
 console.log(a.x); // 5
 
 // Object.freeze method를 통해 객체를 불변으로 만들수 있다.
 const b = Object.freeze({
   x: 1,
   y: 2,
   z: 3
 });

 b.x = 5; // b객체 내부의 x, y, z는 읽기 전용이므로 변경할 수 없다.

 // 하지만 객체 내부에 또 다른 객체가 있다면 그 객체는 변경 할 수 있다.
 const c = Object.freeze({
   x: 1,
   y: 2,
   z: { a: 3}
 });
 c.z.a = 5;
 // 최상위 객체가 아닌 객체 속성 값은 바뀔 수 있다.
 console.log(c.z.a); // 5 

 ```
 > 동결된 객체의 최상위 원시 속성은 변경 할 수 없지만, 객체(배열 등)일 수 있는 모든 속성은 변할 수 있다. 따라서 모든 속성의 내부 객체도 동결 시켜야 불변성을 가지게 만들 수 있다.

 > 많은 함수형 프로그래밍 언어에는 트리 자료구조(Trie data structures)라고 불리는 특수한 불변의 자료 구조가 있다. 이는 객체의 계층에서 속성의 수준에 관계없이 속성이 변경될 수 없음을 의미한다. 
 
 > 자바스크립트에는 Immutable.js와 mori가 trie의 장점을 가진 라이브러리이다.

 ## 부작용(Side Effects)
  - 부작용은 반환값 이외에 호출된 함수 밖에서 관찰 할 수 있는 애플리케이션 상태변화
  - 외부 변수 또는 객체 속성 수정(예: 전역 변수나 상위 함수 스코프 체인의 변수)
  - 콘솔에서 로깅
  - 화면에 쓰기 작업
  - 파일에 쓰기 작업
  - 네트워크에 쓰기 작업
  - 외부 프로세스 트리거
  - 부작용을 동반한 다른 함수 호출
 > monads를 사용하여 순수 함수로 부터 부작용(Side Effects)를 격리하고 캡슐화 한다. 부작용(Side Effects)를 분리하면 소프트웨어 확장, 리팩토링, 디버그, 테스트 및 유지 보수가 훨씬 쉬워진다.


# Javascript에서 함수형 프로그래밍 기법 찾기
 - Javascript에서 함수는 변수에 담을 수 있고, 매개변수로 전달할 수 있고, 반환값으로 전달할 수 있기 때문에 1급 객체이고, 런타임(Runtime)에 생성 가능하고 익명(anonymous)으로 생성이 가능하기 때문에 1급 함수이다.
 - Arrow function : 함수형 언어들의 근간이 되는 Lambda를 표현하는 익명 함수 표현법
 ```js
  const fn = fn => fn(); // 함수의 인자로 함수를 받는 경우
  const fn2 = a => b => b; // 함수의 출력값이 함수인 경우
  const fn3 = fn => fn; // 함수의 인자로 함수를 받으면서 출력값이 함수인 경우

 ```
 - Array.prototype.map, Array.prototype.reduce, Array.prototype.filter 등 원본 데이터에 변형을 주지 않고 새로운 데이터를 만들어 낼 수 있다.
 ```js
 const each = (list, fn) => {
   for(let i = 0, l = list.length; i < l; i++){
     fn(list[i], i);
   }
   return list;
 }
 const map = (list, fn) => {
   const resultList = [];
   each(list, (data, index)=>{
     resultList.push(fn(data, index));
   });
   return resultList;
 }
 const filter = (list, fn) => {
   const resultList = [];
   each(list, (data, index)=>{
     if(fn(data, index)){
       resultList.push(data);
     }
   });
   return resultList;
 }
 const reduce = (list, fn, result) => {
   if(arguments.length === 2){
     result = list[0];
     list = Array.prototype.slice.call(list, 1);
   }
   each(list, (data)=>{
     result = fn(result, data);
   });
   return result;
 }
 ```

 - Currying 기법 : 인자를 여러개 받는 함수를 분리하여, 인자를 하나 받는 함수의 체인으로 만드는 방법
 ```js
 // DOM API 이용

function createEl (elName) {
  return function (content){
    const el = document.createElement(elName);
    el.textContent = content;
    return el
  }
}
const createEldiv = createEl('div');

const a = createEldiv('currying test'); // <div>currying test</div>
const b = createEldiv('currying2 test'); // <div>currying2 test</div>
const c = createEl('p')('chain'); // <p>chain</p>
 ```

# 참고자료
 - [What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)
 - [What is a Pure Function?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
 - [What is Function Composition?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)
 - [The Dao of Immutability.](https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd)
 - [10 Tips for Better Redux Architecture](https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44)
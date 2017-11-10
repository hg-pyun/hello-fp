# Ramda js

람다 대수란?
> 이론 컴퓨터과학 및 수리논리학에서 함수 정의, 함수 적용, 귀납적 함수를 추상화한 형식 체계이다. - 위키백과

- 람다 대수는 이름을 가질 필요가 없다. (익명함수)
- 두 개 이상의 입력이 있는 함수는 최종적으로 1개의 입력만 받는 람다 대수로 단순화 될 수 있다. (커링)

--- 

람다의 특징
1. 익명
    - 보통의 메소드와 달리 이름이 없음
2. 함수
    - 클래스에 종속되는 메소드와 달리 함수라고 함
3. 전달
    - 매개변수로 전달이 가능. 또한, 함수를 변수에 저장할 수 있음 (Java 8)
4. 간결성

---

## Ramda 를 알기 전 간단한 람다 예제
<pre><code>
var a = [
    "1",
    "2",
    "3",
    "4",
    "5"
];

var a2 = a.map(function(s){return s.length});   // 람다식
var a3 = a.map(s => s.length);                  // Arrow function 을 사용한 람다식

console.log(a.length);      // 5
console.log(a2);            // 5
console.log(a3);            // 5
</code></pre>

### 커링? (Currying)
> 커링은 여러 개의 인자를 받는 함수가 있을 때 일부의 인자만 받는 함수를 만드는 기법이다.
<pre><code>
// 기존 함수
var plus = function (a, b, c) {
    return a + b + c;
}

Function.prototype.curry = function() {
    var args = [].slice.apply(arguments);
    var self = this;
    return funtion() {
        return self.apply(null, args.concat([].slice.apply(arguments)));
    }
}

var plus_1 = plus.curry(1);
console.log(plus_1(2, 3));  // 6

var plus_2 = plus_1.curry(2);
console.log(plus_2(4));     // 7

var plus_3 = plus.curry(1, 3);
console.log(plus_3(5));     // 9
</code></pre>

위와 같은 방식으로 커링을 할 순 있지만 <code>bind()</code>함수를 사용하면 좀 더 깔끔하게, <code>curry method</code>를 prototype 에 추가할 필요 없이 사용할 수 있다.  

> bind() 함수는 호출 될 때 this 키워드가 제공된 값으로 설정되고, 새 함수가 호출 될 때 해당 value를 미리 채워서 넘겨준다. 

<pre><code>
var plus_1 = plus.bind(null, 1);
plus_1(2, 3);       // 6

var plus_2 = plus_1.bind(null, 2);
plus_2(4);          // 7

var plus_3 = plus.bind(null, 1, 3);
plus_3(5);          // 9
</code></pre>

<pre><code>
/*
    참고로 다음 코드는 커링하는 코드가 아니다. 왜냐하면, 커링은 여러 개의 인자를 받는 함수를 일부만 받도록 바꾸는 것이지, 처음부터 하나 씩만 받도록 하는게 아니기 때문이라고 한다.
*/
function multiply(x) {
    return funtion(y) {
        return x * y;
    };
}

multiply(4)(8);     // 32
</code></pre>

출처 : https://www.zerocho.com/category/Javascript/post/579236d08241b6f43951af18

--- 

## Ramda?
Ramdajs 는 함수형 프로그래밍 스타일을 위해 특별히 설계된 라이브러리가 필요했기 때문에, Ramda 는 유저 데이터를 변경시키지 않는 함수형 파이프라인을 쉽게 생성할 수 있도록 만들었다.
> We wanted a library designed specifically for a functional programming style, one that makes it easy to create functional pipelines, one that never mutates user data.


## 다른 점?
Ramda 의 주요 특징들은 다음과 같다. 
 - Ramda 는 순수 함수적인 스타일을 강조한다. 불변성과 side-effect 가 없는 함수는 디자인 철학의 핵심이다.
 - Ramda 함수들은 자동적으로 curried 된다. 이렇게 하면 최종 매개변수를 제공하지 않고, 간단하게 기존 함수에서 새 함수로 쉽게 빌드 할 수 있다.
 - Ramda 함수의 매개변수는 커링(currying)에 편리하도록 배열되어 만들어진다. 일반적으로 조작할 데이터는 마지막에 제공된다.


 ## Ramda.js 를 이용한 커링
위에 내용에서 bind() 함수를 이용해 커링을 한다고 했다. Ramda 에서도 커링을 할 수 있는 함수가 존재한다. 바로 <code>R.curry()</code>라는 함수이다.

<pre><code>
var formatNames = R.curry(function(first, middle, last) {
    return first + ' ' + middle + ' ' + last;
});

// 'John Paul Jones'
formatNames('John', 'Paul', 'Jones');   

var temp = formatNames('John', 'Paul');
temp('hojak');      // 'John Paul hojak'
temp('laplace');    // 'John Paul laplace'
temp('gwang');      // 'John Pawl gwang'

var temp_1 = formatNames('James');
temp_1('hojak', 'laplace');     // 'James hojak laplace'
var temp_2 = temp_1('gwang');   
temp_2('good');                 // 'James gwang good'
temp_2('nice');                 // 'James gwang nice'
</code></pre>
 
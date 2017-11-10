# Rambda js

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

## Rambda.js 를 알기 전 간단한 람다 예제
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

--- 

## Ramdjs ?
ramdjs 는 함수형 프로그래밍 스타일을 위해 특별히 설계된 라이브러리가 필요했기 때문에, Ramda 는 유저 데이터를 변경시키지 않는 함수형 파이프라인을 쉽게 생성할 수 있도록 만들었다.
> We wanted a library designed specifically for a functional programming style, one that makes it easy to create functional pipelines, one that never mutates user data.


## 다른 점?
Ramda 의 주요 특징들은 다음과 같다. 
 - Ramda 는 순수 함수적인 스타일을 강조한다. 불변성과 side-effect 가 없는 함수는 디자인 철학의 핵심이다.
 - Ramda 함수들은 자동적으로 curried 된다. 이렇게 하면 최종 매개변수를 제공하지 않고, 간단하게 기존 함수에서 새 함수로 쉽게 빌드 할 수 있다.
 - Ramda 함수의 매개변수는 커링(currying)에 편리하도록 배열되어 만들어진다. 일반적으로 조작할 데이터는 마지막에 제공된다.
 
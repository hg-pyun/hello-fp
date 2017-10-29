# RxJS 란?

RxJs 에 대한 정의를 알아가기 전, 알고 넘어가야 할 것들이 있다. <b>Reactive> Programming</b> 이다. 왜냐하면 바로 이 Reactive Programming 으로 만든 라이브러리가 RxJs 이기 때문이다.

## Reactive Programming
그렇다면 Reactive Programming 의 정의란 무엇일까?
<pre><code>
Reactive Programming 은 비동기 데이터 스트림을 사용한 프로그래밍이다.
해당 스트림을 듣고 이에 따라 대응할 수 있다.
</code></pre>

Reactive Programming 에서는 기본적으로 모든 것을 Stream 으로 본다고 한다. 즉, 이벤트, ajax 등 모든 데이터의 흐름을 시간순서에 의해 전달되어지는 스트림으로 처리한다는 말이다.

위의 내용들은 Reactive Programming 을 구현하는 개발자의 입장에서 본 정의에 가깝지만, 사용자 입장에서 Reactive Programming 이란 실시간으로 반응하는 프로그래밍을 말한다. 

그 예로 다음과 같이 들 수 있다.
- 네이버 검색창에 단어 입력할 때 관련 검색어 자동완성으로 바로 제시되는 것
- 페이스북 포스트에 좋아요 누르면 다른 유저들에게도 페이지 새로고침 없이 실시간으로 올라가는 것

<br>

그렇다면 이제 Reactive Programming 으로 만든 RxJs 는 무엇일까?

## RxJs 란?
<pre><code>
Rxjs는 관찰 가능한 시퀀스를 사용하여 비동기 및 이벤트 기반 프로그램을 작성하기 위한 라이브러리이다.
</code></pre>

여기서 관찰 가능한 시퀀스를 [Observable] 이라고 한다.
이 Observable 은 observer의 메소드를 호출하면서 item이나 정보 등을 호출하는 역할을 한다고 한다.

다음의 코드는 사용자가 매번 마우스를 움직일 때마다, observable이 이벤드틀 발산시키는 예제입니다.

<pre><code>
type Pair = [number, number];
const moves: Observable<Pair> = fromEvent(document.body, "mousemove").map(e => [e.screenX, e.screenY]);
const position = new BehaviorSubject<Pair>([0,0]);
moves.subscribe(position);
 
position.value // returns the current position of the mouse
</code></pre>

### Cold Observalble
* 일반적은 Observer 형태를 말함
* 누가 구독해주지 않으면 데이터를 배출 하지 않는다.
* 일반적인 웹 요청, DB 쿼리 등이 사용되며 내가 요청하면 결과를 받는 과정을 거침
* 처음부터 발행하는 걸 기본으로 함

### Hot Observable
* 구독자의 존재 여부와 상관없이 데이터를 배출하는 Observable 이다. 
* 구독시점으로부터 발행하는 값을 받는 걸 기본으로 한다.
* 마우스 이벤트, 키보드 이벤트, 시스템 이벤트 등이 주로 사용된다.
* 멀티캐스팅도 포함된다.

<pre><code>
// subscribe ()에 전달하는 observer을 생성한다
var observer = Rx.Observer.create(function (num) {
    // 새로운 값이 푸시된 때
    return console.log("onNext: " + num);
}, function (error) {
    // 오류가 발생했을 때
    return console.log("onError: " + error);
}, function () {
    // 모든 값을 밀어내고 스트림이 종료 한 때
    return console.log('onCompleted');
});
 
Rx.Observable.from([1, 2, 3, 4, 5])
    // 한 요소마다 500 ms 딜레이
    .delayWithSelector(function (num) {
        return Rx.Observable.timer(num * 500);
    }).filter(function (num) {
        return num % 2;
    }).map(function (num) {
        return num * num;
    }).subscribe(observer);
</code></pre>
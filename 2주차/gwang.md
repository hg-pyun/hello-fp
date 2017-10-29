# Reactive 패러다임
- 막힘없이 흘러다니는 데이터(Stream)을 통해 사용자에게 자연스러운 응답을 주고 규모 탄력적으로 리소스를 사용하며 실패에 있어서 유연하게 대처한다.
> 모든 지점에서 블럭되지 않게 하자.
- 비동기의 흐름이 연속되게 이어지는 것이다.

## Reactive의 4가지 주요 속성
- Responsive : 사용자에 대한 반응(React)
- Scalable(Elastic) : 부하(road)에 대한 반응(React)
- Resillent : 실패상황에 대한 반응(React)
- Event-driven : 이벤트에 대한 반응(React)

### Responsive
- 사용자가 기다리지 않게 하는것, 정해진 시간안에 반드시 결과를 받아 볼 수 있게 하자. 진짜 결과가 아니라 "처리중" 이라는 메시지 일지라도.

### Scalable(Elastic)
- 규모 변경 성질. 어플리케이션을 확장 시키거나 축소 시킬 수 있다. AWS처럼 서버를 증설했다가 축소했다가 자유자재로 할 수 있는 것을 의미

### Resillent
- 실패를 피해 완벽한 프로그램을 개발하는 것 보다 Reactive 패러다임은 실패를 포함한 설계를 하도록 한다. 자동으로 실패를 감지하고 원상태로 회복하게 만들어서 재앙을 최소화 하는 것에 관심을 둔다.

### Event-driven 
- 동기식 멀티쓰레드로 request가 대응되는 것이 아니라, 비동기식 Event 별로 처리를 하게 되면 리소스 활용성이 높아진다(메모리 및 CPU). 하지만 공유 상태를 나눠갖는 것에 있어서 어려움이 생길수 있다. 그래서 immutable 상태 지향의 개발 기술이 함께 따라다닌다.

# Reactive Programming 
- Reactive Programming은 비동기 데이터 스트림을 사용한 프로그래밍이다. 데이터 스트림을 관찰하고 이에 따라 대응 할 수 있다.
- Stream이란 시간상으로 정렬된 이벤트의 연속을 의미한다. Stream은 세 가지를 발생 시킬수 있다. value, error, completed
- 세 가지 이벤트(value, error, completed)가 발생할 때 실행되는 함수를 각각 정의하고 그 함수를 비동기식으로만 캡처한다. error와 completed는 생략하고 value에 대한 함수에만 집중할 수 있다.
- 각각의 Stream은 새로 만들어져서 새로운 Stream이 될 수도 있고, 여러개의 스트림이 합쳐질 수도 있다.
- Reactive Programming은 모든것을 Stream으로 간주 한다. Event, Ajax call 등 모든 데이터의 흐름을 시간순서에 의해 전달 되는 Stream으로 처리한다.
- Stream은 `map`, `filter` 같은 함수형 method를 이용하여, immutable하게 처리할 수 있다.
- Stream을 listening 하며 관찰 하고 있는 것을 Subscribe라고 한다. Subscribe는 Observer Design Pattern으로 구성 돼 있다.

## Reactive Programming의 필요성
- 요즘의 App은 real-time event를 많이 가지고 있다. 이 real-time event의 사용자 경험을 만족 시켜주기 위한 방법이 Reactive Programming이다.
- 함수형으로 Programming하기 때문에, 함수와 역할을 1:1로 지정 할 수 있다.

## Observable과 Observer
- Observer는 Observable을 subscribe한다. 그리고 나서 Observer는 Observable이 Emit하는 항목이나 순서대로 반응한다.
- Observable은 Observer의 Method를 호출 하면서 Object를 Emit하는 역할을 한다. Observer는 `onNext`, `onError`, `onCompleted`의 method가 구현돼 있다.
- Observer는 Subscriber, watcher, reactor로 불려진다.
- Observer Pattern은 Observable이 객체를 Emit하길 기다리는 동안 Block할 필요가 없기 때문에 동시 작업을 수월하게 한다. 하지만 Observable이 대응할 수 있는 Observer의 형태로 감시자를 만든다.


## Javascript와 Reactive Programming
- Javascript에서 Reactive Programming을 하기위한 Library로 `RxJS`가 있고, Javascript의 `Promise`와 Reactive Programming에서의 `Observable`은 개념적으로 유사하다.
- 차이점은 Promise는 하나의 value를 다루지만, Observable은 다수의 value를 다룰 수 있다.

```js
myObservable.subscribe(successFn, errorFn);
myPromise.then(successFn, errorFn);
``` 
> [Observale은 ES7 스펙에 제안 되었지만 표준이 되지 못했다](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe)

## RxJS
- Observable은 A stream에 의해 B stream이 영향을 받는 경우, A만 바꿔도 B가 자동적으로 바뀔 수 있도록 구성할 수 있어서, 데이터의 동기화를 간편하게 할 수 있다. 이게 가능한 이유는 A stream과 B stream 사이의 관계를 선언적으로 만들었기 때문에 가능하다.
- RxJS = Observables + Operators + Schedulers로 구성되어 있다.
```js
var streamA = Rx.Observable.of(3, 4);
var streamB = streamA.map(a => 10 * a);

streamB.subscribe(b => console.log(b));
// 결과
// 30
// 40
```
# 참고자료
- [RxJS 참고 예제 코드](http://jsbin.com/pekemu/edit?html,css,js,console,output)
- [ReactiveX의 Observable](http://reactivex.io/documentation/observable.html)
- [The introduction to Reactive Programming you've been missing](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)
- [Reactive Programming](http://sculove.github.io/blog/2016/06/22/Reactive-Programming/)
- [Reactive](http://hamait.tistory.com/761)
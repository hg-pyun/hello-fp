# 2주차

## Reactive Programming
RxJs에서 Rx가 의미하는건 ReactiveX 이다. 그렇다면 Reactive하다는건 뭘까?
```
Reactive programming is programming with asynchronous data streams.
```
한마디로 비동기적인 작업을 데이터의 흐름을 처리하는 프로그래밍을 의미한다.

## [Reactive Programming](http://blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=220983291803&parentCategoryNo=58&categoryNo=&viewDate=&isShowPopularPosts=true&from=search) Concept
### Real Time
사용자 입장에서 보자면 Reactive Programming이란 실시간으로 반응을 하는 프로그래밍을 말합니다. 
이는 '명령형' 프로그래밍을 뜻하는 Imperative Programming과 대비되는 개념입니다.
예를 들면, a = b + c라는 함수가 있을 때 명령형 프로그래밍에서는 a는 b + c 연산의 결과물이 되며, 차후 b와 c 값이 변하여도 재연산 명령이 새로 들어오지 않는 한 a 값은 첫번째 연산의 결과값으로 유지되게 됩니다. 
하지만 Reactive Programming 에서는 b와 c 값이 변할 때마다 바로바로 재연산이 수행되어 a값이 변하게 됩니다.
이런 관점에서 본다면 Reactive Programming은 Data Binding을 통해 Model과 View, Input과 Output이 서로서로 업데이트 상황을 실시간으로 공유받고 업데이트하는 프로그래밍이라고 할 수 있겠습니다.

### Async Observer
모든 데이터는 Stream으로 표현된다. Async한 작업들이 이 Stream에 들어있음. 따라서 데이터의 흐름을 관찰(Observe)하면서 변화가 있으면 즉각적으로 연산을 수행함

### Callback Observer
비동기 작업의 경우 보통 callback pattern을 이용해서 처리한다.
```
ajax((response)=>{
    // callback function
})
```
그러나 callback의 경우 비동기 작업이 늘어날 수록 로직이 복잡해짐(callback hell)
```javascript
async(1, function() {
  async(2, function() {
      async(3, function() {
        async(4, function() {
          async(5, function() {
            async(6, function() {
              
            });
          });
        });
      });
  },);
},);
```
Reactive Programming에서는 Observation객체를 이용해서 흐름을 단순하게 표현할 수 있음.

### FRP
FRP한 Reative프로그래밍 함수형 프로그래밍의 원리를 통해 구현하는 것.
데이터의 흐름을 순수함수를 사용하 결과물을 산출한다.

### ReactiveX
ReactiveX의 약자로서 FRP의 원리를 활용해서 비동기적인 이벤트를 손쉽게 처리하기 위해 만들어진 API.
```
Rx의 핵심은 모든것이 Dada Stream이다.
```
## RxJs란?
RxJS는 이벤트 스트림과 데이터를 쉽게 만들고 다룰 수 있도록 도우는 Library.
복잡하지만 가독성이 좋은 비동기적 코드를 더 쉽게 작성할 수 있도록 도와줌.

## Installation
```
// es6
$ npm install rxjs-es 

// es5
$ npm install rxjs
```

## How to Use

```javascript
import Rx from 'rxjs/Rx';

Rx.Observable.of(1,2,3)
```

## Declaration
### Converting
```javascript
// From one or multiple values
Rx.Observable.of('foo', 'bar');

// From array of values
Rx.Observable.from([1,2,3]);

// From an event
Rx.Observable.fromEvent(document.querySelector('button'), 'click');

// From a Promise
Rx.Observable.fromPromise(fetch('/users'));

// From a callback (last argument is a callback)
// fs.exists = (path, cb(exists))
var exists = Rx.Observable.bindCallback(fs.exists);
exists('file.txt').subscribe(exists => console.log('Does file exist?', exists));

// From a callback (last argument is a callback)
// fs.rename = (pathA, pathB, cb(err, result))
var rename = Rx.Observable.bindNodeCallback(fs.rename);
rename('file.txt', 'else.txt').subscribe(() => console.log('Renamed!'));
```
### Creating
```javascript
// Externally
var myObservable = new Rx.Subject();
myObservable.subscribe(value => console.log(value));
myObservable.next('foo');

// Internally
var myObservable = Rx.Observable.create(observer => {
  observer.next('foo');
  setTimeout(() => observer.next('bar'), 1000);
});
myObservable.subscribe(value => console.log(value));
```
## Example
보통 이벤트 리스너는 다음과 같이 선언함.
```javascript
var button = document.querySelector('button');
button.addEventListener('click', () => console.log('Clicked!'))
```
이를 RxJS로 표현하면 다음과 같다.
```javascript
var button = document.querySelector('button');
Rx.Observable.fromEvent(button, 'click')
  .subscribe(() => console.log('Clicked!'));
```
## Reference
- [RxJS](http://reactivex.io/rxjs/)
- [What is Reactive Programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754 )
- [Reactive Programming](http://blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=220983291803&parentCategoryNo=58&categoryNo=&viewDate=&isShowPopularPosts=true&from=search)
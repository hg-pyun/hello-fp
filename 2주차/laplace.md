# 2주차

## Reactive Programming
RxJs에서 Rx가 의미하는건 ReactiveX 이다. 그렇다면 Reactive하다는건 뭘까?
```
Reactive programming is programming with asynchronous data streams.
```
한마디로 비동기적인 데이터의 흐름을 처리하는 프로그래밍을 의미한다.

## [Reactive Programming](http://blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=220983291803&parentCategoryNo=58&categoryNo=&viewDate=&isShowPopularPosts=true&from=search) 블로그 인용
### 실시간
사용자 입장에서 보자면 Reactive Programming이란 실시간으로 반응을 하는 프로그래밍을 말합니다. 
이는 '명령형' 프로그래밍을 뜻하는 Imperative Programming과 대비되는 개념입니다.
예를 들면, a = b + c라는 함수가 있을 때 명령형 프로그래밍에서는 a는 b + c 연산의 결과물이 되며, 차후 b와 c 값이 변하여도 재연산 명령이 새로 들어오지 않는 한 a 값은 첫번째 연산의 결과값으로 유지되게 됩니다. 
하지만 Reactive Programming 에서는 b와 c 값이 변할 때마다 바로바로 재연산이 수행되어 a값이 변하게 됩니다.
이런 관점에서 본다면 Reactive Programming은 Data Binding을 통해 Model과 View, Input과 Output이 서로서로 업데이트 상황을 실시간으로 공유받고 업데이트하는 프로그래밍이라고 할 수 있겠습니다.

### Async Observer

### callback Observer

### FRP

### ReactiveX

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


## Reference
- [RxJS](http://reactivex.io/rxjs/)
- [What is Reactive Programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754 )
- [Reactive Programming](http://blog.naver.com/PostView.nhn?blogId=jdub7138&logNo=220983291803&parentCategoryNo=58&categoryNo=&viewDate=&isShowPopularPosts=true&from=search)
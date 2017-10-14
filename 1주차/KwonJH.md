# 1주차
### 함수형 패러다임 개념

**함수형 프로그래밍이란**
- 순수 함수를 지향하는 프로그래밍 패러다임
- 변경 가능한 상태를 불변상태로 만들어 부작용 없애도록 프로그래밍

<pre><code>
왜 Java Script 에서도 함수형 프로그래밍이 가능한 것일까?

구글링과 아는 지식으로 생각해보면 Java Script 에서의 함수는 1급 계층이라고 할 수 있는 것 같다.
- 함수를 다른 함수에 인자로 넘길 수 있음
- 함수 안에서 함수로 반환 가능
</code></pre>

**함수형 프로그래밍 기법**
함수형 프로그래밍 기법이라고 해서 너무 어렵게 생각할 필요가 없는 것 같다. 그냥 조금 어렵다고 생각하면 된다.

함수형 프로그래밍은 기존에 객체지향 프로그래밍이나 절차지향 프로그래밍에서 사용했던 for문을 그저 재귀함수로 그 역할을 대신할 수 있도록 프로그래밍 한다고 생각하면 될 것 같다. 

그렇다면 함수형 프로그래밍이 지향하는 순수함수에 대한 예제를 보면서 한 번 이해해보쟈

<pre><code>
var temp = 10;
function add (x, y) {
    return x+y;
}
</code></pre>

위에 있는 코드는 우선 순수함수다. 인자로 받은 x, y를 값 변경을 하지 않고 더한 값을 바로 반환시켜주며 함수 스코프 내에 있는 다른 변수들을 사용하지 않았기 때문에 순수함수라고 할 수 있다.

그렇다면 다음의 코드에 대해서 순수함수인지 아닌지에 대해서 생각해보도록 하자.

<pre><code>
function add(x, y){ 
    var z = x + y;
    return z;
}
</code></pre>

이 부분에 대해서 같이 스터디하는 분께 여쭤보았는데 순수함수가 맞을 수도 있고 아닐 수도 있다고 하셔서 나도 잘 모르겠다. 이 부분에 대해서는 같이 이야기하면서 알아봐야 할 것 같다. 

<br>

다시 본론으로 돌아와 filter 함수를 이용해서 순수함수를 만들어보자.

<pre><code>
var arr = [0,1,2,3,4,5];
var getFive = function(i) {
    return i === 5;
}

var result = function(array, func) {
    return array.filter(func);
}

result(arr, getFive);
</code></pre>

우선 result는 순수함수이다. 아까 위에서 말했 듯이 인자값들로만 프로그래밍 되어 있기 떄문이다. 만약 다음과 같은 코드가 된다면 result 함수는 더 이상 순수함수가 아닐 것이다.

<pre><code>
var result = function(array) {
    return array.filter(getFive);
}
</code></pre>

왜냐하면 함수 스코프 외에 있는 함수를 사용했기 때문이다.

이제 순수함수를 이용해 함수형 프로그래밍한 예제를 살펴보자.

<pre><code>
var sum = 0;

function add(sum, count) {
    sum += count;

    if(count > 0) {
        return add(sum, count -1);
    }else {
        return sum;
    }

    add(sum, 10);
}
</code></pre>

제일 처음 말했던 것처럼 add() 함수에서는 for문 대신 재귀함수로 그 역할을 했다. 그래서 코드를 볼 때 좀 더 명확하고 우리가 쉽게 예상할 수 있는 코드가 되었다. 

옛날에 C언어 배울 때는 재귀함수는 왠만하면 사용하지 말라고 했었는데 지금은 오히려 재귀함수를 사용해야 하니 새로운 프로그래밍 패러다임을 배우려면 기존에 있는 생각을 버려야 한다는 느낌을 받았다.

마지막으로 reduce 함수를 이용해 위의 코드를 더 진화시켜보도록 하겠다.

<pre><code>
var arr = [1,2,3,4,5,6,7,8,9,10];

arr.reduce(function(prev, cur) {
    return prev + cur;
});
</code></pre>

이런 식으로 무척이나 쉽고, 간단하게 재귀함수를 사용하지 않고도 코드를 짤 수 있다. 여기서 reduce 함수는 앞으로 많이 사용할 함수가 분명하기 때문에 항상 기억하고 있어야 한다고 생각된다.

reduce 함수에서 prev, cur 은 그냥 쉽게 생각해 이렇게 생각하면 된다.

<table>
  <tr>
    <th></th>
    <th>prev</th>
    <th>cur</th>
    <th>result</th>
  </tr>
  <tr>
    <th>1</th>
    <th>1</th>
    <th>2</th>
    <th>3</th>
  </tr>
  <tr>
    <th>2</th>
    <th>3</th>
    <th>3</th>
    <th>6</th>
  </tr>
  <tr>
    <th>3</th>
    <th>6</th>
    <th>4</th>
    <th>10</th>
  </tr>
  <tr>
    <th>4</th>
    <th>10</th>
    <th>5</th>
    <th>15</th>
  </tr>
  <tr>
    <th>5</th>
    <th>15</th>
    <th>6</th>
    <th>21</th>
  </tr>
  <tr>
    <th>6</th>
    <th>21</th>
    <th>7</th>
    <th>28</th>
  </tr>
  <tr>
    <th>7</th>
    <th>28</th>
    <th>8</th>
    <th>36</th>
  </tr>
  <tr>
    <th>8</th>
    <th>36</th>
    <th>9</th>
    <th>45</th>
  </tr>
  <tr>
    <th>9</th>
    <th>45</th>
    <th>10</th>
    <th>55</th>
  </tr>

  위와 같이 reduce 함수가 작동하게 된다.

  
</table>
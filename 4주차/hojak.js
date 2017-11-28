var _=require('underscore');

var optimizeCb = function(func, context, argCount) {
    if(context === void 0) {
        console.log("context is 0");
        return func;
    }

    switch(argCount) {
        case 1: return function(value) {
            console.log("case 1");
            return func.call(context, value);
        };

        case null : console.log("null");

        case 3 : return function(value, index, collection) {
            console.log("case 3");
            return func.call(context, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
            console.log("case 4");
            return func.call(context, accumulator, value, index, collection);
        };
    }
    
    // 보통 다음의 익명 함수를 apply 함수 써서 반환하는 듯하다.
    return function(){
        console.log("return");
        return func.apply(context, arguments);
    }
}

var each;
each = function(obj, iteratee, context) {
    
    iteratee = optimizeCb(iteratee, context);
    var i, length;

    // 인자로 들어온 obj 가 배열인지
    if (isArrayLike(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
            iteratee(obj[i], i, obj);
        }
    } else {
        // obj 대한 key 를 반환. {one :1, two: 2} => ["one","two"]
        var keys = _.keys(obj);
        for (i = 0, length = keys.length; i < length; i++) {
            iteratee(obj[keys[i]], keys[i], obj);
        }
    }
    return obj;
};

_.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    
    // nativeKeys = Object.keys
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

/*  테스트 코드  */


/*
    >> call 과 apply 의 차이
    apply는 this 와 arguments 객체 또는 배열로 넘길 수 있다.
    call 은 this 와 매개변수를 나열해서 넘겨야 한다.
*/

var arr = [1, 3, 4, 2, 3, 6];
var someOtherArray = ["one", "two", "three"];

/* 
여기서 this 는 <someOtherArray> 배열을 가리킨다.
num 에는 arr 배열의 데이터가 들어온다.
[context]는 iterator 함수에서 this의 값을 설정함
[context] 에 값을 넣지 않으면 this 는 window 오브젝트를 가리킨다.
그리고 _.each() 함수 구현 코드에 있는 optimizeCb() 함수에서 해당 context 가 
void 0 일 시 그냥 해당 function 을 리턴해서 iterator 로 설정해준다.

_.each(arr, function(num){
    console.log(this[num]);   
}, someOtherArray)
//*/

function plus(val_1, val_2) {
    return val_1 + val_2;
};

function applyTest(val_1, val_2){
    // return plus.apply(this, arguments);      // 4
    console.log(this);
    return plus.apply(this, [val_1, val_2]);    // 4
};
function callTest(val_1, val_2){
    // return plus.call(this, arguments);          // [object Arguments]undefined
    // return plus.call(this, [val_1, val_2]);     // 1,3undefined
    return plus.call(this, val_1, val_2);          // 4
};

console.log(applyTest(1, 3));




//////////////////////// call 과 apply
function Product(name, price) {
    this.name = name;
    this.price = price;
}


var otherObj = {};
otherObj.name = "aa";
otherObj.price = 5;

function Food(name, price) {
    Product.call(otherObj, name, price);
    this.name = "Food";         // 여기서 this 는 Food 를 가리킴
    console.log(otherObj);      // otherObj 의 name 과 price 가 Food 함수의 인자로 변경
    console.log("this(Food) 값 : " + this.name);     // Food 의 name 을 출력
}

function Toy(name, price) {
    Product.call(this, name, price);
    this.name = "asdasd";       // 여기서 this 는 Toy 를 가리킴
    console.log(this);          // Toy 의 인자로 robot 을 넣어줬지만 this.name 으로 인해 asdasd 로 변경
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);
# Underscore

### 0.1.0
```javascript
// Extend a given object with all of the properties in a source object.
extend : function(destination, source) {
  for (var property in source) destination[property] = source[property];
  return destination;
},

// Create a (shallow-cloned) duplicate of an object.
clone : function(obj) {
  return _.extend({}, obj);
},
```

### 1.0.0
```javascript
// Extend a given object with all the properties in passed-in object(s).
_.extend = function(obj) {
  each(_.rest(arguments), function(source) {
    for (var prop in source) obj[prop] = source[prop];
  });
  return obj;
};

// Create a (shallow-cloned) duplicate of an object.
_.clone = function(obj) {
  if (_.isArray(obj)) return obj.slice(0);  // array일 경우 추가
  return _.extend({}, obj);};
```

each, for each랑 같음
```javascript
// The cornerstone, an each implementation.
// Handles objects implementing forEach, arrays, and raw objects.
// Delegates to JavaScript 1.6's native forEach if available.
var each = _.forEach = function(obj, iterator, context) {
  try {
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (_.isNumber(obj.length)) {
      for (var i = 0, l = obj.length; i < l; i++) iterator.call(context, obj[i], i, obj);
    } else {
      for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) iterator.call(context, obj[key], key, obj);
      }
    }
  } catch(e) {
    if (e != breaker) throw e;
  }
  return obj;
};
```
rest 추가, 배열의 첫번째 인자를 리턴해줌
```javascript
// Returns everything but the first entry of the array. Aliased as "tail".
// Especially useful on the arguments object. Passing an "index" will return
// the rest of the values in the array from that index onward. The "guard"
//check allows it to work with _.map.
_.rest = function(array, index, guard) {
    return slice.call(array, _.isUndefined(index) || guard ? 1 : index);
};
```

### 1.5.0
```javascript
_.clone = function(obj) {
  if (!_.isObject(obj)) return obj;  //
  return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
};
```
extend method에서 _.rest가 빠짐

```javascript
// Extend a given object with all the properties in passed-in object(s).
_.extend = function(obj) {
  each(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

### 1.8.0
```javascript
_.extend = createAssigner(_.allKeys);
```
object assign 역할 internal 함수가 생김
```javascript
// An internal function for creating assigner functions.
var createAssigner = function(keysFunc, undefinedOnly) {
  return function(obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length;
      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
};
```
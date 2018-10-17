"use strict";

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

if (typeof window.HTMLVideoElement === "undefined") {
  document.createElement("video");
  document.createElement("audio");
  document.createElement("track");
}

(function (root, factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === "object") {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
})(void 0, function () {
  var $Array = Array;
  var ArrayPrototype = $Array.prototype;
  var $Object = Object;
  var ObjectPrototype = $Object.prototype;
  var FunctionPrototype = Function.prototype;
  var $String = String;
  var StringPrototype = $String.prototype;
  var $Number = Number;
  var NumberPrototype = $Number.prototype;
  var array_slice = ArrayPrototype.slice;
  var array_splice = ArrayPrototype.splice;
  var array_push = ArrayPrototype.push;
  var array_unshift = ArrayPrototype.unshift;
  var array_concat = ArrayPrototype.concat;
  var call = FunctionPrototype.call;
  var apply = FunctionPrototype.apply;
  var max = Math.max;
  var min = Math.min;
  var to_string = ObjectPrototype.toString;
  var hasToStringTag = typeof Symbol === "function" && _typeof2(Symbol.toStringTag) === "symbol";
  var isCallable;

  var fnToStr = Function.prototype.toString,
      tryFunctionObject = function tryFunctionObject(value) {
    try {
      fnToStr.call(value);
      return true;
    } catch (e) {
      return false;
    }
  },
      fnClass = "[object Function]",
      genClass = "[object GeneratorFunction]";

  isCallable = function isCallable(value) {
    if (typeof value !== "function") {
      return false;
    }

    if (hasToStringTag) {
      return tryFunctionObject(value);
    }

    var strClass = to_string.call(value);
    return strClass === fnClass || strClass === genClass;
  };

  var isRegex;

  var regexExec = RegExp.prototype.exec,
      tryRegexExec = function tryRegexExec(value) {
    try {
      regexExec.call(value);
      return true;
    } catch (e) {
      return false;
    }
  },
      regexClass = "[object RegExp]";

  isRegex = function isRegex(value) {
    if (_typeof2(value) !== "object") {
      return false;
    }

    return hasToStringTag ? tryRegexExec(value) : to_string.call(value) === regexClass;
  };

  var isString;

  var strValue = String.prototype.valueOf,
      tryStringObject = function tryStringObject(value) {
    try {
      strValue.call(value);
      return true;
    } catch (e) {
      return false;
    }
  },
      stringClass = "[object String]";

  isString = function isString(value) {
    if (typeof value === "string") {
      return true;
    }

    if (_typeof2(value) !== "object") {
      return false;
    }

    return hasToStringTag ? tryStringObject(value) : to_string.call(value) === stringClass;
  };

  var supportsDescriptors = $Object.defineProperty && function () {
    try {
      var obj = {};
      $Object.defineProperty(obj, "x", {
        enumerable: false,
        value: obj
      });

      for (var _ in obj) {
        return false;
      }

      return obj.x === obj;
    } catch (e) {
      return false;
    }
  }();

  var defineProperties = function (has) {
    var defineProperty;

    if (supportsDescriptors) {
      defineProperty = function defineProperty(object, name, method, forceAssign) {
        if (!forceAssign && name in object) {
          return;
        }

        $Object.defineProperty(object, name, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: method
        });
      };
    } else {
      defineProperty = function defineProperty(object, name, method, forceAssign) {
        if (!forceAssign && name in object) {
          return;
        }

        object[name] = method;
      };
    }

    return function defineProperties(object, map, forceAssign) {
      for (var name in map) {
        if (has.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
      }
    };
  }(ObjectPrototype.hasOwnProperty);

  var isPrimitive = function isPrimitive(input) {
    var type = _typeof2(input);

    return input === null || type !== "object" && type !== "function";
  };

  var isActualNaN = $Number.isNaN || function (x) {
    return x !== x;
  };

  var ES = {
    ToInteger: function ToInteger(num) {
      var n = +num;

      if (isActualNaN(n)) {
        n = 0;
      } else if (n !== 0 && n !== 1 / 0 && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }

      return n;
    },
    ToPrimitive: function ToPrimitive(input) {
      var val, valueOf, toStr;

      if (isPrimitive(input)) {
        return input;
      }

      valueOf = input.valueOf;

      if (isCallable(valueOf)) {
        val = valueOf.call(input);

        if (isPrimitive(val)) {
          return val;
        }
      }

      toStr = input.toString;

      if (isCallable(toStr)) {
        val = toStr.call(input);

        if (isPrimitive(val)) {
          return val;
        }
      }

      throw new TypeError();
    },
    ToObject: function ToObject(o) {
      if (o == null) {
        throw new TypeError("can't convert " + o + " to object");
      }

      return $Object(o);
    },
    ToUint32: function ToUint32(x) {
      return x >>> 0;
    }
  };

  var Empty = function Empty() {};

  defineProperties(FunctionPrototype, {
    bind: function bind(that) {
      var target = this;

      if (!isCallable(target)) {
        throw new TypeError("Function.prototype.bind called on incompatible " + target);
      }

      var args = array_slice.call(arguments, 1);
      var bound;

      var binder = function binder() {
        if (this instanceof bound) {
          var result = target.apply(this, array_concat.call(args, array_slice.call(arguments)));

          if ($Object(result) === result) {
            return result;
          }

          return this;
        } else {
          return target.apply(that, array_concat.call(args, array_slice.call(arguments)));
        }
      };

      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];

      for (var i = 0; i < boundLength; i++) {
        array_push.call(boundArgs, "$" + i);
      }

      bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this, arguments); }")(binder);

      if (target.prototype) {
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }

      return bound;
    }
  });
  var owns = call.bind(ObjectPrototype.hasOwnProperty);
  var toStr = call.bind(ObjectPrototype.toString);
  var arraySlice = call.bind(array_slice);
  var arraySliceApply = apply.bind(array_slice);
  var strSlice = call.bind(StringPrototype.slice);
  var strSplit = call.bind(StringPrototype.split);
  var strIndexOf = call.bind(StringPrototype.indexOf);
  var pushCall = call.bind(array_push);
  var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
  var arraySort = call.bind(ArrayPrototype.sort);

  var isArray = $Array.isArray || function isArray(obj) {
    return toStr(obj) === "[object Array]";
  };

  var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
  defineProperties(ArrayPrototype, {
    unshift: function unshift() {
      array_unshift.apply(this, arguments);
      return this.length;
    }
  }, hasUnshiftReturnValueBug);
  defineProperties($Array, {
    isArray: isArray
  });
  var boxedString = $Object("a");
  var splitString = boxedString[0] !== "a" || !(0 in boxedString);

  var properlyBoxesContext = function properlyBoxed(method) {
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    var threwException = false;

    if (method) {
      try {
        method.call("foo", function (_, __, context) {
          if (_typeof2(context) !== "object") {
            properlyBoxesNonStrict = false;
          }
        });
        method.call([1], function () {
          "use strict";

          properlyBoxesStrict = typeof this === "string";
        }, "x");
      } catch (e) {
        threwException = true;
      }
    }

    return !!method && !threwException && properlyBoxesNonStrict && properlyBoxesStrict;
  };

  defineProperties(ArrayPrototype, {
    forEach: function forEach(callbackfn) {
      var object = ES.ToObject(this);
      var self = splitString && isString(this) ? strSplit(this, "") : object;
      var i = -1;
      var length = ES.ToUint32(self.length);
      var T;

      if (arguments.length > 1) {
        T = arguments[1];
      }

      if (!isCallable(callbackfn)) {
        throw new TypeError("Array.prototype.forEach callback must be a function");
      }

      while (++i < length) {
        if (i in self) {
          if (typeof T === "undefined") {
            callbackfn(self[i], i, object);
          } else {
            callbackfn.call(T, self[i], i, object);
          }
        }
      }
    }
  }, !properlyBoxesContext(ArrayPrototype.forEach));
  defineProperties(ArrayPrototype, {
    map: function map(callbackfn) {
      var object = ES.ToObject(this);
      var self = splitString && isString(this) ? strSplit(this, "") : object;
      var length = ES.ToUint32(self.length);
      var result = $Array(length);
      var T;

      if (arguments.length > 1) {
        T = arguments[1];
      }

      if (!isCallable(callbackfn)) {
        throw new TypeError("Array.prototype.map callback must be a function");
      }

      for (var i = 0; i < length; i++) {
        if (i in self) {
          if (typeof T === "undefined") {
            result[i] = callbackfn(self[i], i, object);
          } else {
            result[i] = callbackfn.call(T, self[i], i, object);
          }
        }
      }

      return result;
    }
  }, !properlyBoxesContext(ArrayPrototype.map));
  defineProperties(ArrayPrototype, {
    filter: function filter(callbackfn) {
      var object = ES.ToObject(this);
      var self = splitString && isString(this) ? strSplit(this, "") : object;
      var length = ES.ToUint32(self.length);
      var result = [];
      var value;
      var T;

      if (arguments.length > 1) {
        T = arguments[1];
      }

      if (!isCallable(callbackfn)) {
        throw new TypeError("Array.prototype.filter callback must be a function");
      }

      for (var i = 0; i < length; i++) {
        if (i in self) {
          value = self[i];

          if (typeof T === "undefined" ? callbackfn(value, i, object) : callbackfn.call(T, value, i, object)) {
            pushCall(result, value);
          }
        }
      }

      return result;
    }
  }, !properlyBoxesContext(ArrayPrototype.filter));
  defineProperties(ArrayPrototype, {
    every: function every(callbackfn) {
      var object = ES.ToObject(this);
      var self = splitString && isString(this) ? strSplit(this, "") : object;
      var length = ES.ToUint32(self.length);
      var T;

      if (arguments.length > 1) {
        T = arguments[1];
      }

      if (!isCallable(callbackfn)) {
        throw new TypeError("Array.prototype.every callback must be a function");
      }

      for (var i = 0; i < length; i++) {
        if (i in self && !(typeof T === "undefined" ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
          return false;
        }
      }

      return true;
    }
  }, !properlyBoxesContext(ArrayPrototype.every));
  defineProperties(ArrayPrototype, {
    some: function some(callbackfn) {
      var object = ES.ToObject(this);
      var self = splitString && isString(this) ? strSplit(this, "") : object;
      var length = ES.ToUint32(self.length);
      var T;

      if (arguments.length > 1) {
        T = arguments[1];
      }

      if (!isCallable(callbackfn)) {
        throw new TypeError("Array.prototype.some callback must be a function");
      }

      for (var i = 0; i < length; i++) {
        if (i in self && (typeof T === "undefined" ? callbackfn(self[i], i, object) : callbackfn.call(T, self[i], i, object))) {
          return true;
        }
      }

      return false;
    }
  }, !properlyBoxesContext(ArrayPrototype.some));
  var reduceCoercesToObject = false;

  if (ArrayPrototype.reduce) {
    reduceCoercesToObject = _typeof2(ArrayPrototype.reduce.call("es5", function (_, __, ___, list) {
      return list;
    })) === "object";
  }

  defineProperties(ArrayPrototype, {
    reduce: function reduce(callbackfn) {
      var object = ES.ToObject(this);
      var self = splitString && isString(this) ? strSplit(this, "") : object;
      var length = ES.ToUint32(self.length);

      if (!isCallable(callbackfn)) {
        throw new TypeError("Array.prototype.reduce callback must be a function");
      }

      if (length === 0 && arguments.length === 1) {
        throw new TypeError("reduce of empty array with no initial value");
      }

      var i = 0;
      var result;

      if (arguments.length >= 2) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i++];
            break;
          }

          if (++i >= length) {
            throw new TypeError("reduce of empty array with no initial value");
          }
        } while (true);
      }

      for (; i < length; i++) {
        if (i in self) {
          result = callbackfn(result, self[i], i, object);
        }
      }

      return result;
    }
  }, !reduceCoercesToObject);
  var reduceRightCoercesToObject = false;

  if (ArrayPrototype.reduceRight) {
    reduceRightCoercesToObject = _typeof2(ArrayPrototype.reduceRight.call("es5", function (_, __, ___, list) {
      return list;
    })) === "object";
  }

  defineProperties(ArrayPrototype, {
    reduceRight: function reduceRight(callbackfn) {
      var object = ES.ToObject(this);
      var self = splitString && isString(this) ? strSplit(this, "") : object;
      var length = ES.ToUint32(self.length);

      if (!isCallable(callbackfn)) {
        throw new TypeError("Array.prototype.reduceRight callback must be a function");
      }

      if (length === 0 && arguments.length === 1) {
        throw new TypeError("reduceRight of empty array with no initial value");
      }

      var result;
      var i = length - 1;

      if (arguments.length >= 2) {
        result = arguments[1];
      } else {
        do {
          if (i in self) {
            result = self[i--];
            break;
          }

          if (--i < 0) {
            throw new TypeError("reduceRight of empty array with no initial value");
          }
        } while (true);
      }

      if (i < 0) {
        return result;
      }

      do {
        if (i in self) {
          result = callbackfn(result, self[i], i, object);
        }
      } while (i--);

      return result;
    }
  }, !reduceRightCoercesToObject);
  var hasFirefox2IndexOfBug = ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
  defineProperties(ArrayPrototype, {
    indexOf: function indexOf(searchElement) {
      var self = splitString && isString(this) ? strSplit(this, "") : ES.ToObject(this);
      var length = ES.ToUint32(self.length);

      if (length === 0) {
        return -1;
      }

      var i = 0;

      if (arguments.length > 1) {
        i = ES.ToInteger(arguments[1]);
      }

      i = i >= 0 ? i : max(0, length + i);

      for (; i < length; i++) {
        if (i in self && self[i] === searchElement) {
          return i;
        }
      }

      return -1;
    }
  }, hasFirefox2IndexOfBug);
  var hasFirefox2LastIndexOfBug = ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
  defineProperties(ArrayPrototype, {
    lastIndexOf: function lastIndexOf(searchElement) {
      var self = splitString && isString(this) ? strSplit(this, "") : ES.ToObject(this);
      var length = ES.ToUint32(self.length);

      if (length === 0) {
        return -1;
      }

      var i = length - 1;

      if (arguments.length > 1) {
        i = min(i, ES.ToInteger(arguments[1]));
      }

      i = i >= 0 ? i : length - Math.abs(i);

      for (; i >= 0; i--) {
        if (i in self && searchElement === self[i]) {
          return i;
        }
      }

      return -1;
    }
  }, hasFirefox2LastIndexOfBug);

  var spliceNoopReturnsEmptyArray = function () {
    var a = [1, 2];
    var result = a.splice();
    return a.length === 2 && isArray(result) && result.length === 0;
  }();

  defineProperties(ArrayPrototype, {
    splice: function splice(start, deleteCount) {
      if (arguments.length === 0) {
        return [];
      } else {
        return array_splice.apply(this, arguments);
      }
    }
  }, !spliceNoopReturnsEmptyArray);

  var spliceWorksWithEmptyObject = function () {
    var obj = {};
    ArrayPrototype.splice.call(obj, 0, 0, 1);
    return obj.length === 1;
  }();

  defineProperties(ArrayPrototype, {
    splice: function splice(start, deleteCount) {
      if (arguments.length === 0) {
        return [];
      }

      var args = arguments;
      this.length = max(ES.ToInteger(this.length), 0);

      if (arguments.length > 0 && typeof deleteCount !== "number") {
        args = arraySlice(arguments);

        if (args.length < 2) {
          pushCall(args, this.length - start);
        } else {
          args[1] = ES.ToInteger(deleteCount);
        }
      }

      return array_splice.apply(this, args);
    }
  }, !spliceWorksWithEmptyObject);

  var spliceWorksWithLargeSparseArrays = function () {
    var arr = new $Array(1e5);
    arr[8] = "x";
    arr.splice(1, 1);
    return arr.indexOf("x") === 7;
  }();

  var spliceWorksWithSmallSparseArrays = function () {
    var n = 256;
    var arr = [];
    arr[n] = "a";
    arr.splice(n + 1, 0, "b");
    return arr[n] === "a";
  }();

  defineProperties(ArrayPrototype, {
    splice: function splice(start, deleteCount) {
      var O = ES.ToObject(this);
      var A = [];
      var len = ES.ToUint32(O.length);
      var relativeStart = ES.ToInteger(start);
      var actualStart = relativeStart < 0 ? max(len + relativeStart, 0) : min(relativeStart, len);
      var actualDeleteCount = min(max(ES.ToInteger(deleteCount), 0), len - actualStart);
      var k = 0;
      var from;

      while (k < actualDeleteCount) {
        from = $String(actualStart + k);

        if (owns(O, from)) {
          A[k] = O[from];
        }

        k += 1;
      }

      var items = arraySlice(arguments, 2);
      var itemCount = items.length;
      var to;

      if (itemCount < actualDeleteCount) {
        k = actualStart;

        while (k < len - actualDeleteCount) {
          from = $String(k + actualDeleteCount);
          to = $String(k + itemCount);

          if (owns(O, from)) {
            O[to] = O[from];
          } else {
            delete O[to];
          }

          k += 1;
        }

        k = len;

        while (k > len - actualDeleteCount + itemCount) {
          delete O[k - 1];
          k -= 1;
        }
      } else if (itemCount > actualDeleteCount) {
        k = len - actualDeleteCount;

        while (k > actualStart) {
          from = $String(k + actualDeleteCount - 1);
          to = $String(k + itemCount - 1);

          if (owns(O, from)) {
            O[to] = O[from];
          } else {
            delete O[to];
          }

          k -= 1;
        }
      }

      k = actualStart;

      for (var i = 0; i < items.length; ++i) {
        O[k] = items[i];
        k += 1;
      }

      O.length = len - actualDeleteCount + itemCount;
      return A;
    }
  }, !spliceWorksWithLargeSparseArrays || !spliceWorksWithSmallSparseArrays);
  var originalJoin = ArrayPrototype.join;
  var hasStringJoinBug;

  try {
    hasStringJoinBug = Array.prototype.join.call("123", ",") !== "1,2,3";
  } catch (e) {
    hasStringJoinBug = true;
  }

  if (hasStringJoinBug) {
    defineProperties(ArrayPrototype, {
      join: function join(separator) {
        var sep = typeof separator === "undefined" ? "," : separator;
        return originalJoin.call(isString(this) ? strSplit(this, "") : this, sep);
      }
    }, hasStringJoinBug);
  }

  var hasJoinUndefinedBug = [1, 2].join(undefined) !== "1,2";

  if (hasJoinUndefinedBug) {
    defineProperties(ArrayPrototype, {
      join: function join(separator) {
        var sep = typeof separator === "undefined" ? "," : separator;
        return originalJoin.call(this, sep);
      }
    }, hasJoinUndefinedBug);
  }

  var pushShim = function push(item) {
    var O = ES.ToObject(this);
    var n = ES.ToUint32(O.length);
    var i = 0;

    while (i < arguments.length) {
      O[n + i] = arguments[i];
      i += 1;
    }

    O.length = n + i;
    return n + i;
  };

  var pushIsNotGeneric = function () {
    var obj = {};
    var result = Array.prototype.push.call(obj, undefined);
    return result !== 1 || obj.length !== 1 || typeof obj[0] !== "undefined" || !owns(obj, 0);
  }();

  defineProperties(ArrayPrototype, {
    push: function push(item) {
      if (isArray(this)) {
        return array_push.apply(this, arguments);
      }

      return pushShim.apply(this, arguments);
    }
  }, pushIsNotGeneric);

  var pushUndefinedIsWeird = function () {
    var arr = [];
    var result = arr.push(undefined);
    return result !== 1 || arr.length !== 1 || typeof arr[0] !== "undefined" || !owns(arr, 0);
  }();

  defineProperties(ArrayPrototype, {
    push: pushShim
  }, pushUndefinedIsWeird);
  defineProperties(ArrayPrototype, {
    slice: function slice(start, end) {
      var arr = isString(this) ? strSplit(this, "") : this;
      return arraySliceApply(arr, arguments);
    }
  }, splitString);

  var sortIgnoresNonFunctions = function () {
    try {
      [1, 2].sort(null);
      [1, 2].sort({});
      return true;
    } catch (e) {}

    return false;
  }();

  var sortThrowsOnRegex = function () {
    try {
      [1, 2].sort(/a/);
      return false;
    } catch (e) {}

    return true;
  }();

  var sortIgnoresUndefined = function () {
    try {
      [1, 2].sort(undefined);
      return true;
    } catch (e) {}

    return false;
  }();

  defineProperties(ArrayPrototype, {
    sort: function sort(compareFn) {
      if (typeof compareFn === "undefined") {
        return arraySort(this);
      }

      if (!isCallable(compareFn)) {
        throw new TypeError("Array.prototype.sort callback must be a function");
      }

      return arraySort(this, compareFn);
    }
  }, sortIgnoresNonFunctions || !sortIgnoresUndefined || !sortThrowsOnRegex);
  var hasDontEnumBug = !{
    toString: null
  }.propertyIsEnumerable("toString");

  var hasProtoEnumBug = function () {}.propertyIsEnumerable("prototype");

  var hasStringEnumBug = !owns("x", "0");

  var equalsConstructorPrototype = function equalsConstructorPrototype(o) {
    var ctor = o.constructor;
    return ctor && ctor.prototype === o;
  };

  var blacklistedKeys = {
    $window: true,
    $console: true,
    $parent: true,
    $self: true,
    $frame: true,
    $frames: true,
    $frameElement: true,
    $webkitIndexedDB: true,
    $webkitStorageInfo: true,
    $external: true
  };

  var hasAutomationEqualityBug = function () {
    if (typeof window === "undefined") {
      return false;
    }

    for (var k in window) {
      try {
        if (!blacklistedKeys["$" + k] && owns(window, k) && window[k] !== null && _typeof2(window[k]) === "object") {
          equalsConstructorPrototype(window[k]);
        }
      } catch (e) {
        return true;
      }
    }

    return false;
  }();

  var equalsConstructorPrototypeIfNotBuggy = function equalsConstructorPrototypeIfNotBuggy(object) {
    if (typeof window === "undefined" || !hasAutomationEqualityBug) {
      return equalsConstructorPrototype(object);
    }

    try {
      return equalsConstructorPrototype(object);
    } catch (e) {
      return false;
    }
  };

  var dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
  var dontEnumsLength = dontEnums.length;

  var isStandardArguments = function isArguments(value) {
    return toStr(value) === "[object Arguments]";
  };

  var isLegacyArguments = function isArguments(value) {
    return value !== null && _typeof2(value) === "object" && typeof value.length === "number" && value.length >= 0 && !isArray(value) && isCallable(value.callee);
  };

  var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;
  defineProperties($Object, {
    keys: function keys(object) {
      var isFn = isCallable(object);
      var isArgs = isArguments(object);
      var isObject = object !== null && _typeof2(object) === "object";
      var isStr = isObject && isString(object);

      if (!isObject && !isFn && !isArgs) {
        throw new TypeError("Object.keys called on a non-object");
      }

      var theKeys = [];
      var skipProto = hasProtoEnumBug && isFn;

      if (isStr && hasStringEnumBug || isArgs) {
        for (var i = 0; i < object.length; ++i) {
          pushCall(theKeys, $String(i));
        }
      }

      if (!isArgs) {
        for (var name in object) {
          if (!(skipProto && name === "prototype") && owns(object, name)) {
            pushCall(theKeys, $String(name));
          }
        }
      }

      if (hasDontEnumBug) {
        var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

        for (var j = 0; j < dontEnumsLength; j++) {
          var dontEnum = dontEnums[j];

          if (!(skipConstructor && dontEnum === "constructor") && owns(object, dontEnum)) {
            pushCall(theKeys, dontEnum);
          }
        }
      }

      return theKeys;
    }
  });

  var keysWorksWithArguments = $Object.keys && function () {
    return $Object.keys(arguments).length === 2;
  }(1, 2);

  var keysHasArgumentsLengthBug = $Object.keys && function () {
    var argKeys = $Object.keys(arguments);
    return arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1;
  }(1);

  var originalKeys = $Object.keys;
  defineProperties($Object, {
    keys: function keys(object) {
      if (isArguments(object)) {
        return originalKeys(arraySlice(object));
      } else {
        return originalKeys(object);
      }
    }
  }, !keysWorksWithArguments || keysHasArgumentsLengthBug);
  var hasNegativeMonthYearBug = new Date(-3509827329600292).getUTCMonth() !== 0;
  var aNegativeTestDate = new Date(-1509842289600292);
  var aPositiveTestDate = new Date(1449662400000);
  var hasToUTCStringFormatBug = aNegativeTestDate.toUTCString() !== "Mon, 01 Jan -45875 11:59:59 GMT";
  var hasToDateStringFormatBug;
  var hasToStringFormatBug;
  var timeZoneOffset = aNegativeTestDate.getTimezoneOffset();

  if (timeZoneOffset < -720) {
    hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== "Tue Jan 02 -45875";
    hasToStringFormatBug = !/^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(aPositiveTestDate.toString());
  } else {
    hasToDateStringFormatBug = aNegativeTestDate.toDateString() !== "Mon Jan 01 -45875";
    hasToStringFormatBug = !/^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-\+]\d\d\d\d(?: |$)/.test(aPositiveTestDate.toString());
  }

  var originalGetFullYear = call.bind(Date.prototype.getFullYear);
  var originalGetMonth = call.bind(Date.prototype.getMonth);
  var originalGetDate = call.bind(Date.prototype.getDate);
  var originalGetUTCFullYear = call.bind(Date.prototype.getUTCFullYear);
  var originalGetUTCMonth = call.bind(Date.prototype.getUTCMonth);
  var originalGetUTCDate = call.bind(Date.prototype.getUTCDate);
  var originalGetUTCDay = call.bind(Date.prototype.getUTCDay);
  var originalGetUTCHours = call.bind(Date.prototype.getUTCHours);
  var originalGetUTCMinutes = call.bind(Date.prototype.getUTCMinutes);
  var originalGetUTCSeconds = call.bind(Date.prototype.getUTCSeconds);
  var originalGetUTCMilliseconds = call.bind(Date.prototype.getUTCMilliseconds);
  var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var daysInMonth = function daysInMonth(month, year) {
    return originalGetDate(new Date(year, month, 0));
  };

  defineProperties(Date.prototype, {
    getFullYear: function getFullYear() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var year = originalGetFullYear(this);

      if (year < 0 && originalGetMonth(this) > 11) {
        return year + 1;
      }

      return year;
    },
    getMonth: function getMonth() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var year = originalGetFullYear(this);
      var month = originalGetMonth(this);

      if (year < 0 && month > 11) {
        return 0;
      }

      return month;
    },
    getDate: function getDate() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var year = originalGetFullYear(this);
      var month = originalGetMonth(this);
      var date = originalGetDate(this);

      if (year < 0 && month > 11) {
        if (month === 12) {
          return date;
        }

        var days = daysInMonth(0, year + 1);
        return days - date + 1;
      }

      return date;
    },
    getUTCFullYear: function getUTCFullYear() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var year = originalGetUTCFullYear(this);

      if (year < 0 && originalGetUTCMonth(this) > 11) {
        return year + 1;
      }

      return year;
    },
    getUTCMonth: function getUTCMonth() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var year = originalGetUTCFullYear(this);
      var month = originalGetUTCMonth(this);

      if (year < 0 && month > 11) {
        return 0;
      }

      return month;
    },
    getUTCDate: function getUTCDate() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var year = originalGetUTCFullYear(this);
      var month = originalGetUTCMonth(this);
      var date = originalGetUTCDate(this);

      if (year < 0 && month > 11) {
        if (month === 12) {
          return date;
        }

        var days = daysInMonth(0, year + 1);
        return days - date + 1;
      }

      return date;
    }
  }, hasNegativeMonthYearBug);
  defineProperties(Date.prototype, {
    toUTCString: function toUTCString() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var day = originalGetUTCDay(this);
      var date = originalGetUTCDate(this);
      var month = originalGetUTCMonth(this);
      var year = originalGetUTCFullYear(this);
      var hour = originalGetUTCHours(this);
      var minute = originalGetUTCMinutes(this);
      var second = originalGetUTCSeconds(this);
      return dayName[day] + ", " + (date < 10 ? "0" + date : date) + " " + monthName[month] + " " + year + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) + " GMT";
    }
  }, hasNegativeMonthYearBug || hasToUTCStringFormatBug);
  defineProperties(Date.prototype, {
    toDateString: function toDateString() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var day = this.getDay();
      var date = this.getDate();
      var month = this.getMonth();
      var year = this.getFullYear();
      return dayName[day] + " " + monthName[month] + " " + (date < 10 ? "0" + date : date) + " " + year;
    }
  }, hasNegativeMonthYearBug || hasToDateStringFormatBug);

  if (hasNegativeMonthYearBug || hasToStringFormatBug) {
    Date.prototype.toString = function toString() {
      if (!this || !(this instanceof Date)) {
        throw new TypeError("this is not a Date object.");
      }

      var day = this.getDay();
      var date = this.getDate();
      var month = this.getMonth();
      var year = this.getFullYear();
      var hour = this.getHours();
      var minute = this.getMinutes();
      var second = this.getSeconds();
      var timezoneOffset = this.getTimezoneOffset();
      var hoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
      var minutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
      return dayName[day] + " " + monthName[month] + " " + (date < 10 ? "0" + date : date) + " " + year + " " + (hour < 10 ? "0" + hour : hour) + ":" + (minute < 10 ? "0" + minute : minute) + ":" + (second < 10 ? "0" + second : second) + " GMT" + (timezoneOffset > 0 ? "-" : "+") + (hoursOffset < 10 ? "0" + hoursOffset : hoursOffset) + (minutesOffset < 10 ? "0" + minutesOffset : minutesOffset);
    };

    if (supportsDescriptors) {
      $Object.defineProperty(Date.prototype, "toString", {
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }

  var negativeDate = -62198755200000;
  var negativeYearString = "-000001";
  var hasNegativeDateBug = Date.prototype.toISOString && new Date(negativeDate).toISOString().indexOf(negativeYearString) === -1;
  var hasSafari51DateBug = Date.prototype.toISOString && new Date(-1).toISOString() !== "1969-12-31T23:59:59.999Z";
  defineProperties(Date.prototype, {
    toISOString: function toISOString() {
      if (!isFinite(this)) {
        throw new RangeError("Date.prototype.toISOString called on non-finite value.");
      }

      var year = originalGetUTCFullYear(this);
      var month = originalGetUTCMonth(this);
      year += Math.floor(month / 12);
      month = (month % 12 + 12) % 12;
      var result = [month + 1, originalGetUTCDate(this), originalGetUTCHours(this), originalGetUTCMinutes(this), originalGetUTCSeconds(this)];
      year = (year < 0 ? "-" : year > 9999 ? "+" : "") + strSlice("00000" + Math.abs(year), 0 <= year && year <= 9999 ? -4 : -6);

      for (var i = 0; i < result.length; ++i) {
        result[i] = strSlice("00" + result[i], -2);
      }

      return year + "-" + arraySlice(result, 0, 2).join("-") + "T" + arraySlice(result, 2).join(":") + "." + strSlice("000" + originalGetUTCMilliseconds(this), -3) + "Z";
    }
  }, hasNegativeDateBug || hasSafari51DateBug);

  var dateToJSONIsSupported = function () {
    try {
      return Date.prototype.toJSON && new Date(NaN).toJSON() === null && new Date(negativeDate).toJSON().indexOf(negativeYearString) !== -1 && Date.prototype.toJSON.call({
        toISOString: function toISOString() {
          return true;
        }
      });
    } catch (e) {
      return false;
    }
  }();

  if (!dateToJSONIsSupported) {
    Date.prototype.toJSON = function toJSON(key) {
      var O = $Object(this);
      var tv = ES.ToPrimitive(O);

      if (typeof tv === "number" && !isFinite(tv)) {
        return null;
      }

      var toISO = O.toISOString;

      if (!isCallable(toISO)) {
        throw new TypeError("toISOString property is not callable");
      }

      return toISO.call(O);
    };
  }

  var supportsExtendedYears = Date.parse("+033658-09-27T01:46:40.000Z") === 1e15;
  var acceptsInvalidDates = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z"));
  var doesNotParseY2KNewYear = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));

  if (doesNotParseY2KNewYear || acceptsInvalidDates || !supportsExtendedYears) {
    var maxSafeUnsigned32Bit = Math.pow(2, 31) - 1;
    var hasSafariSignedIntBug = isActualNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());

    Date = function (NativeDate) {
      var DateShim = function Date(Y, M, D, h, m, s, ms) {
        var length = arguments.length;
        var date;

        if (this instanceof NativeDate) {
          var seconds = s;
          var millis = ms;

          if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
            var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
            var sToShift = Math.floor(msToShift / 1e3);
            seconds += sToShift;
            millis -= sToShift * 1e3;
          }

          date = length === 1 && $String(Y) === Y ? new NativeDate(DateShim.parse(Y)) : length >= 7 ? new NativeDate(Y, M, D, h, m, seconds, millis) : length >= 6 ? new NativeDate(Y, M, D, h, m, seconds) : length >= 5 ? new NativeDate(Y, M, D, h, m) : length >= 4 ? new NativeDate(Y, M, D, h) : length >= 3 ? new NativeDate(Y, M, D) : length >= 2 ? new NativeDate(Y, M) : length >= 1 ? new NativeDate(Y) : new NativeDate();
        } else {
          date = NativeDate.apply(this, arguments);
        }

        if (!isPrimitive(date)) {
          defineProperties(date, {
            constructor: DateShim
          }, true);
        }

        return date;
      };

      var isoDateExpression = new RegExp("^" + "(\\d{4}|[+-]\\d{6})" + "(?:-(\\d{2})" + "(?:-(\\d{2})" + "(?:" + "T(\\d{2})" + ":(\\d{2})" + "(?:" + ":(\\d{2})" + "(?:(\\.\\d{1,}))?" + ")?" + "(" + "Z|" + "(?:" + "([-+])" + "(\\d{2})" + ":(\\d{2})" + ")" + ")?)?)?)?" + "$");
      var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

      var dayFromMonth = function dayFromMonth(year, month) {
        var t = month > 1 ? 1 : 0;
        return months[month] + Math.floor((year - 1969 + t) / 4) - Math.floor((year - 1901 + t) / 100) + Math.floor((year - 1601 + t) / 400) + 365 * (year - 1970);
      };

      var toUTC = function toUTC(t) {
        var s = 0;
        var ms = t;

        if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
          var msToShift = Math.floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
          var sToShift = Math.floor(msToShift / 1e3);
          s += sToShift;
          ms -= sToShift * 1e3;
        }

        return $Number(new NativeDate(1970, 0, 1, 0, 0, s, ms));
      };

      for (var key in NativeDate) {
        if (owns(NativeDate, key)) {
          DateShim[key] = NativeDate[key];
        }
      }

      defineProperties(DateShim, {
        now: NativeDate.now,
        UTC: NativeDate.UTC
      }, true);
      DateShim.prototype = NativeDate.prototype;
      defineProperties(DateShim.prototype, {
        constructor: DateShim
      }, true);

      var parseShim = function parse(string) {
        var match = isoDateExpression.exec(string);

        if (match) {
          var year = $Number(match[1]),
              month = $Number(match[2] || 1) - 1,
              day = $Number(match[3] || 1) - 1,
              hour = $Number(match[4] || 0),
              minute = $Number(match[5] || 0),
              second = $Number(match[6] || 0),
              millisecond = Math.floor($Number(match[7] || 0) * 1000),
              isLocalTime = Boolean(match[4] && !match[8]),
              signOffset = match[9] === "-" ? 1 : -1,
              hourOffset = $Number(match[10] || 0),
              minuteOffset = $Number(match[11] || 0),
              result;
          var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;

          if (hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25) && minute < 60 && second < 60 && millisecond < 1000 && month > -1 && month < 12 && hourOffset < 24 && minuteOffset < 60 && day > -1 && day < dayFromMonth(year, month + 1) - dayFromMonth(year, month)) {
            result = ((dayFromMonth(year, month) + day) * 24 + hour + hourOffset * signOffset) * 60;
            result = ((result + minute + minuteOffset * signOffset) * 60 + second) * 1000 + millisecond;

            if (isLocalTime) {
              result = toUTC(result);
            }

            if (-8.64e15 <= result && result <= 8.64e15) {
              return result;
            }
          }

          return NaN;
        }

        return NativeDate.parse.apply(this, arguments);
      };

      defineProperties(DateShim, {
        parse: parseShim
      });
      return DateShim;
    }(Date);
  }

  if (!Date.now) {
    Date.now = function now() {
      return new Date().getTime();
    };
  }

  var hasToFixedBugs = NumberPrototype.toFixed && (0.00008.toFixed(3) !== "0.000" || 0.9.toFixed(0) !== "1" || 1.255.toFixed(2) !== "1.25" || 1000000000000000128 .toFixed(0) !== "1000000000000000128");
  var toFixedHelpers = {
    base: 1e7,
    size: 6,
    data: [0, 0, 0, 0, 0, 0],
    multiply: function multiply(n, c) {
      var i = -1;
      var c2 = c;

      while (++i < toFixedHelpers.size) {
        c2 += n * toFixedHelpers.data[i];
        toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
        c2 = Math.floor(c2 / toFixedHelpers.base);
      }
    },
    divide: function divide(n) {
      var i = toFixedHelpers.size,
          c = 0;

      while (--i >= 0) {
        c += toFixedHelpers.data[i];
        toFixedHelpers.data[i] = Math.floor(c / n);
        c = c % n * toFixedHelpers.base;
      }
    },
    numToString: function numToString() {
      var i = toFixedHelpers.size;
      var s = "";

      while (--i >= 0) {
        if (s !== "" || i === 0 || toFixedHelpers.data[i] !== 0) {
          var t = $String(toFixedHelpers.data[i]);

          if (s === "") {
            s = t;
          } else {
            s += strSlice("0000000", 0, 7 - t.length) + t;
          }
        }
      }

      return s;
    },
    pow: function pow(x, n, acc) {
      return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
    },
    log: function log(x) {
      var n = 0;
      var x2 = x;

      while (x2 >= 4096) {
        n += 12;
        x2 /= 4096;
      }

      while (x2 >= 2) {
        n += 1;
        x2 /= 2;
      }

      return n;
    }
  };

  var toFixedShim = function toFixed(fractionDigits) {
    var f, x, s, m, e, z, j, k;
    f = $Number(fractionDigits);
    f = isActualNaN(f) ? 0 : Math.floor(f);

    if (f < 0 || f > 20) {
      throw new RangeError("Number.toFixed called with invalid number of decimals");
    }

    x = $Number(this);

    if (isActualNaN(x)) {
      return "NaN";
    }

    if (x <= -1e21 || x >= 1e21) {
      return $String(x);
    }

    s = "";

    if (x < 0) {
      s = "-";
      x = -x;
    }

    m = "0";

    if (x > 1e-21) {
      e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
      z = e < 0 ? x * toFixedHelpers.pow(2, -e, 1) : x / toFixedHelpers.pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;

      if (e > 0) {
        toFixedHelpers.multiply(0, z);
        j = f;

        while (j >= 7) {
          toFixedHelpers.multiply(1e7, 0);
          j -= 7;
        }

        toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
        j = e - 1;

        while (j >= 23) {
          toFixedHelpers.divide(1 << 23);
          j -= 23;
        }

        toFixedHelpers.divide(1 << j);
        toFixedHelpers.multiply(1, 1);
        toFixedHelpers.divide(2);
        m = toFixedHelpers.numToString();
      } else {
        toFixedHelpers.multiply(0, z);
        toFixedHelpers.multiply(1 << -e, 0);
        m = toFixedHelpers.numToString() + strSlice("0.00000000000000000000", 2, 2 + f);
      }
    }

    if (f > 0) {
      k = m.length;

      if (k <= f) {
        m = s + strSlice("0.0000000000000000000", 0, f - k + 2) + m;
      } else {
        m = s + strSlice(m, 0, k - f) + "." + strSlice(m, k - f);
      }
    } else {
      m = s + m;
    }

    return m;
  };

  defineProperties(NumberPrototype, {
    toFixed: toFixedShim
  }, hasToFixedBugs);

  var hasToPrecisionUndefinedBug = function () {
    try {
      return 1.0.toPrecision(undefined) === "1";
    } catch (e) {
      return true;
    }
  }();

  var originalToPrecision = NumberPrototype.toPrecision;
  defineProperties(NumberPrototype, {
    toPrecision: function toPrecision(precision) {
      return typeof precision === "undefined" ? originalToPrecision.call(this) : originalToPrecision.call(this, precision);
    }
  }, hasToPrecisionUndefinedBug);

  if ("ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || "tesst".split(/(s)*/)[1] === "t" || "test".split(/(?:)/, -1).length !== 4 || "".split(/.?/).length || ".".split(/()()/).length > 1) {
    (function () {
      var compliantExecNpcg = typeof /()??/.exec("")[1] === "undefined";
      var maxSafe32BitInt = Math.pow(2, 32) - 1;

      StringPrototype.split = function (separator, limit) {
        var string = String(this);

        if (typeof separator === "undefined" && limit === 0) {
          return [];
        }

        if (!isRegex(separator)) {
          return strSplit(this, separator, limit);
        }

        var output = [];
        var flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : ""),
            lastLastIndex = 0,
            separator2,
            match,
            lastIndex,
            lastLength;
        var separatorCopy = new RegExp(separator.source, flags + "g");

        if (!compliantExecNpcg) {
          separator2 = new RegExp("^" + separatorCopy.source + "$(?!\\s)", flags);
        }

        var splitLimit = typeof limit === "undefined" ? maxSafe32BitInt : ES.ToUint32(limit);
        match = separatorCopy.exec(string);

        while (match) {
          lastIndex = match.index + match[0].length;

          if (lastIndex > lastLastIndex) {
            pushCall(output, strSlice(string, lastLastIndex, match.index));

            if (!compliantExecNpcg && match.length > 1) {
              match[0].replace(separator2, function () {
                for (var i = 1; i < arguments.length - 2; i++) {
                  if (typeof arguments[i] === "undefined") {
                    match[i] = void 0;
                  }
                }
              });
            }

            if (match.length > 1 && match.index < string.length) {
              array_push.apply(output, arraySlice(match, 1));
            }

            lastLength = match[0].length;
            lastLastIndex = lastIndex;

            if (output.length >= splitLimit) {
              break;
            }
          }

          if (separatorCopy.lastIndex === match.index) {
            separatorCopy.lastIndex++;
          }

          match = separatorCopy.exec(string);
        }

        if (lastLastIndex === string.length) {
          if (lastLength || !separatorCopy.test("")) {
            pushCall(output, "");
          }
        } else {
          pushCall(output, strSlice(string, lastLastIndex));
        }

        return output.length > splitLimit ? strSlice(output, 0, splitLimit) : output;
      };
    })();
  } else if ("0".split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
      if (typeof separator === "undefined" && limit === 0) {
        return [];
      }

      return strSplit(this, separator, limit);
    };
  }

  var str_replace = StringPrototype.replace;

  var replaceReportsGroupsCorrectly = function () {
    var groups = [];
    "x".replace(/x(.)?/g, function (match, group) {
      pushCall(groups, group);
    });
    return groups.length === 1 && typeof groups[0] === "undefined";
  }();

  if (!replaceReportsGroupsCorrectly) {
    StringPrototype.replace = function replace(searchValue, replaceValue) {
      var isFn = isCallable(replaceValue);
      var hasCapturingGroups = isRegex(searchValue) && /\)[*?]/.test(searchValue.source);

      if (!isFn || !hasCapturingGroups) {
        return str_replace.call(this, searchValue, replaceValue);
      } else {
        var wrappedReplaceValue = function wrappedReplaceValue(match) {
          var length = arguments.length;
          var originalLastIndex = searchValue.lastIndex;
          searchValue.lastIndex = 0;
          var args = searchValue.exec(match) || [];
          searchValue.lastIndex = originalLastIndex;
          pushCall(args, arguments[length - 2], arguments[length - 1]);
          return replaceValue.apply(this, args);
        };

        return str_replace.call(this, searchValue, wrappedReplaceValue);
      }
    };
  }

  var string_substr = StringPrototype.substr;
  var hasNegativeSubstrBug = "".substr && "0b".substr(-1) !== "b";
  defineProperties(StringPrototype, {
    substr: function substr(start, length) {
      var normalizedStart = start;

      if (start < 0) {
        normalizedStart = max(this.length + start, 0);
      }

      return string_substr.call(this, normalizedStart, length);
    }
  }, hasNegativeSubstrBug);
  var ws = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003" + "\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028" + "\u2029\uFEFF";
  var zeroWidth = "\u200B";
  var wsRegexChars = "[" + ws + "]";
  var trimBeginRegexp = new RegExp("^" + wsRegexChars + wsRegexChars + "*");
  var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + "*$");
  var hasTrimWhitespaceBug = StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
  defineProperties(StringPrototype, {
    trim: function trim() {
      if (typeof this === "undefined" || this === null) {
        throw new TypeError("can't convert " + this + " to object");
      }

      return $String(this).replace(trimBeginRegexp, "").replace(trimEndRegexp, "");
    }
  }, hasTrimWhitespaceBug);
  var trim = call.bind(String.prototype.trim);
  var hasLastIndexBug = StringPrototype.lastIndexOf && "abcあい".lastIndexOf("あい", 2) !== -1;
  defineProperties(StringPrototype, {
    lastIndexOf: function lastIndexOf(searchString) {
      if (typeof this === "undefined" || this === null) {
        throw new TypeError("can't convert " + this + " to object");
      }

      var S = $String(this);
      var searchStr = $String(searchString);
      var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
      var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
      var start = min(max(pos, 0), S.length);
      var searchLen = searchStr.length;
      var k = start + searchLen;

      while (k > 0) {
        k = max(0, k - searchLen);
        var index = strIndexOf(strSlice(S, k, start + searchLen), searchStr);

        if (index !== -1) {
          return k + index;
        }
      }

      return -1;
    }
  }, hasLastIndexBug);
  var originalLastIndexOf = StringPrototype.lastIndexOf;
  defineProperties(StringPrototype, {
    lastIndexOf: function lastIndexOf(searchString) {
      return originalLastIndexOf.apply(this, arguments);
    }
  }, StringPrototype.lastIndexOf.length !== 1);

  if (parseInt(ws + "08") !== 8 || parseInt(ws + "0x16") !== 22) {
    parseInt = function (origParseInt) {
      var hexRegex = /^[\-+]?0[xX]/;
      return function parseInt(str, radix) {
        var string = trim(str);
        var defaultedRadix = $Number(radix) || (hexRegex.test(string) ? 16 : 10);
        return origParseInt(string, defaultedRadix);
      };
    }(parseInt);
  }

  if (1 / parseFloat("-0") !== -Infinity) {
    parseFloat = function (origParseFloat) {
      return function parseFloat(string) {
        var inputString = trim(string);
        var result = origParseFloat(inputString);
        return result === 0 && strSlice(inputString, 0, 1) === "-" ? -0 : result;
      };
    }(parseFloat);
  }

  if (String(new RangeError("test")) !== "RangeError: test") {
    var errorToStringShim = function toString() {
      if (typeof this === "undefined" || this === null) {
        throw new TypeError("can't convert " + this + " to object");
      }

      var name = this.name;

      if (typeof name === "undefined") {
        name = "Error";
      } else if (typeof name !== "string") {
        name = $String(name);
      }

      var msg = this.message;

      if (typeof msg === "undefined") {
        msg = "";
      } else if (typeof msg !== "string") {
        msg = $String(msg);
      }

      if (!name) {
        return msg;
      }

      if (!msg) {
        return name;
      }

      return name + ": " + msg;
    };

    Error.prototype.toString = errorToStringShim;
  }

  if (supportsDescriptors) {
    var ensureNonEnumerable = function ensureNonEnumerable(obj, prop) {
      if (isEnum(obj, prop)) {
        var desc = Object.getOwnPropertyDescriptor(obj, prop);
        desc.enumerable = false;
        Object.defineProperty(obj, prop, desc);
      }
    };

    ensureNonEnumerable(Error.prototype, "message");

    if (Error.prototype.message !== "") {
      Error.prototype.message = "";
    }

    ensureNonEnumerable(Error.prototype, "name");
  }

  if (String(/a/gim) !== "/a/gim") {
    var regexToString = function toString() {
      var str = "/" + this.source + "/";

      if (this.global) {
        str += "g";
      }

      if (this.ignoreCase) {
        str += "i";
      }

      if (this.multiline) {
        str += "m";
      }

      return str;
    };

    RegExp.prototype.toString = regexToString;
  }
});

(function (root, factory) {
  "use strict";

  if (typeof define === "function" && define.amd) {
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof2(exports)) === "object") {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
})(void 0, function () {
  var call = Function.call;
  var prototypeOfObject = Object.prototype;
  var owns = call.bind(prototypeOfObject.hasOwnProperty);
  var isEnumerable = call.bind(prototypeOfObject.propertyIsEnumerable);
  var toStr = call.bind(prototypeOfObject.toString);
  var defineGetter;
  var defineSetter;
  var lookupGetter;
  var lookupSetter;
  var supportsAccessors = owns(prototypeOfObject, "__defineGetter__");

  if (supportsAccessors) {
    defineGetter = call.bind(prototypeOfObject.__defineGetter__);
    defineSetter = call.bind(prototypeOfObject.__defineSetter__);
    lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
    lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
  }

  if (!Object.getPrototypeOf) {
    Object.getPrototypeOf = function getPrototypeOf(object) {
      var proto = object.__proto__;

      if (proto || proto === null) {
        return proto;
      } else if (toStr(object.constructor) === "[object Function]") {
        return object.constructor.prototype;
      } else if (object instanceof Object) {
        return prototypeOfObject;
      } else {
        return null;
      }
    };
  }

  var doesGetOwnPropertyDescriptorWork = function doesGetOwnPropertyDescriptorWork(object) {
    try {
      object.sentinel = 0;
      return Object.getOwnPropertyDescriptor(object, "sentinel").value === 0;
    } catch (exception) {
      return false;
    }
  };

  if (Object.defineProperty) {
    var getOwnPropertyDescriptorWorksOnObject = doesGetOwnPropertyDescriptorWork({});
    var getOwnPropertyDescriptorWorksOnDom = typeof document === "undefined" || doesGetOwnPropertyDescriptorWork(document.createElement("div"));

    if (!getOwnPropertyDescriptorWorksOnDom || !getOwnPropertyDescriptorWorksOnObject) {
      var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
    }
  }

  if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
    var ERR_NON_OBJECT = "Object.getOwnPropertyDescriptor called on a non-object: ";

    Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(object, property) {
      if (_typeof2(object) !== "object" && typeof object !== "function" || object === null) {
        throw new TypeError(ERR_NON_OBJECT + object);
      }

      if (getOwnPropertyDescriptorFallback) {
        try {
          return getOwnPropertyDescriptorFallback.call(Object, object, property);
        } catch (exception) {}
      }

      var descriptor;

      if (!owns(object, property)) {
        return descriptor;
      }

      descriptor = {
        enumerable: isEnumerable(object, property),
        configurable: true
      };

      if (supportsAccessors) {
        var prototype = object.__proto__;
        var notPrototypeOfObject = object !== prototypeOfObject;

        if (notPrototypeOfObject) {
          object.__proto__ = prototypeOfObject;
        }

        var getter = lookupGetter(object, property);
        var setter = lookupSetter(object, property);

        if (notPrototypeOfObject) {
          object.__proto__ = prototype;
        }

        if (getter || setter) {
          if (getter) {
            descriptor.get = getter;
          }

          if (setter) {
            descriptor.set = setter;
          }

          return descriptor;
        }
      }

      descriptor.value = object[property];
      descriptor.writable = true;
      return descriptor;
    };
  }

  if (!Object.getOwnPropertyNames) {
    Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
      return Object.keys(object);
    };
  }

  if (!Object.create) {
    var _createEmpty;

    var supportsProto = !({
      __proto__: null
    } instanceof Object);

    var shouldUseActiveX = function shouldUseActiveX() {
      if (!document.domain) {
        return false;
      }

      try {
        return !!new ActiveXObject("htmlfile");
      } catch (exception) {
        return false;
      }
    };

    var getEmptyViaActiveX = function getEmptyViaActiveX() {
      var empty;
      var xDoc;
      xDoc = new ActiveXObject("htmlfile");
      xDoc.write("<script></script>");
      xDoc.close();
      empty = xDoc.parentWindow.Object.prototype;
      xDoc = null;
      return empty;
    };

    var getEmptyViaIFrame = function getEmptyViaIFrame() {
      var iframe = document.createElement("iframe");
      var parent = document.body || document.documentElement;
      var empty;
      iframe.style.display = "none";
      parent.appendChild(iframe);
      iframe.src = "javascript:";
      empty = iframe.contentWindow.Object.prototype;
      parent.removeChild(iframe);
      iframe = null;
      return empty;
    };

    if (supportsProto || typeof document === "undefined") {
      _createEmpty = function createEmpty() {
        return {
          __proto__: null
        };
      };
    } else {
      _createEmpty = function createEmpty() {
        var empty = shouldUseActiveX() ? getEmptyViaActiveX() : getEmptyViaIFrame();
        delete empty.constructor;
        delete empty.hasOwnProperty;
        delete empty.propertyIsEnumerable;
        delete empty.isPrototypeOf;
        delete empty.toLocaleString;
        delete empty.toString;
        delete empty.valueOf;

        var Empty = function Empty() {};

        Empty.prototype = empty;

        _createEmpty = function createEmpty() {
          return new Empty();
        };

        return new Empty();
      };
    }

    Object.create = function create(prototype, properties) {
      var object;

      var Type = function Type() {};

      if (prototype === null) {
        object = _createEmpty();
      } else {
        if (_typeof2(prototype) !== "object" && typeof prototype !== "function") {
          throw new TypeError("Object prototype may only be an Object or null");
        }

        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
      }

      if (properties !== void 0) {
        Object.defineProperties(object, properties);
      }

      return object;
    };
  }

  var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
    try {
      Object.defineProperty(object, "sentinel", {});
      return "sentinel" in object;
    } catch (exception) {
      return false;
    }
  };

  if (Object.defineProperty) {
    var definePropertyWorksOnObject = doesDefinePropertyWork({});
    var definePropertyWorksOnDom = typeof document === "undefined" || doesDefinePropertyWork(document.createElement("div"));

    if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
      var definePropertyFallback = Object.defineProperty,
          definePropertiesFallback = Object.defineProperties;
    }
  }

  if (!Object.defineProperty || definePropertyFallback) {
    var ERR_NON_OBJECT_DESCRIPTOR = "Property description must be an object: ";
    var ERR_NON_OBJECT_TARGET = "Object.defineProperty called on non-object: ";
    var ERR_ACCESSORS_NOT_SUPPORTED = "getters & setters can not be defined on this javascript engine";

    Object.defineProperty = function defineProperty(object, property, descriptor) {
      if (_typeof2(object) !== "object" && typeof object !== "function" || object === null) {
        throw new TypeError(ERR_NON_OBJECT_TARGET + object);
      }

      if (_typeof2(descriptor) !== "object" && typeof descriptor !== "function" || descriptor === null) {
        throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
      }

      if (definePropertyFallback) {
        try {
          return definePropertyFallback.call(Object, object, property, descriptor);
        } catch (exception) {}
      }

      if ("value" in descriptor) {
        if (supportsAccessors && (lookupGetter(object, property) || lookupSetter(object, property))) {
          var prototype = object.__proto__;
          object.__proto__ = prototypeOfObject;
          delete object[property];
          object[property] = descriptor.value;
          object.__proto__ = prototype;
        } else {
          object[property] = descriptor.value;
        }
      } else {
        if (!supportsAccessors && ("get" in descriptor || "set" in descriptor)) {
          throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
        }

        if ("get" in descriptor) {
          defineGetter(object, property, descriptor.get);
        }

        if ("set" in descriptor) {
          defineSetter(object, property, descriptor.set);
        }
      }

      return object;
    };
  }

  if (!Object.defineProperties || definePropertiesFallback) {
    Object.defineProperties = function defineProperties(object, properties) {
      if (definePropertiesFallback) {
        try {
          return definePropertiesFallback.call(Object, object, properties);
        } catch (exception) {}
      }

      Object.keys(properties).forEach(function (property) {
        if (property !== "__proto__") {
          Object.defineProperty(object, property, properties[property]);
        }
      });
      return object;
    };
  }

  if (!Object.seal) {
    Object.seal = function seal(object) {
      if (Object(object) !== object) {
        throw new TypeError("Object.seal can only be called on Objects.");
      }

      return object;
    };
  }

  if (!Object.freeze) {
    Object.freeze = function freeze(object) {
      if (Object(object) !== object) {
        throw new TypeError("Object.freeze can only be called on Objects.");
      }

      return object;
    };
  }

  try {
    Object.freeze(function () {});
  } catch (exception) {
    Object.freeze = function (freezeObject) {
      return function freeze(object) {
        if (typeof object === "function") {
          return object;
        } else {
          return freezeObject(object);
        }
      };
    }(Object.freeze);
  }

  if (!Object.preventExtensions) {
    Object.preventExtensions = function preventExtensions(object) {
      if (Object(object) !== object) {
        throw new TypeError("Object.preventExtensions can only be called on Objects.");
      }

      return object;
    };
  }

  if (!Object.isSealed) {
    Object.isSealed = function isSealed(object) {
      if (Object(object) !== object) {
        throw new TypeError("Object.isSealed can only be called on Objects.");
      }

      return false;
    };
  }

  if (!Object.isFrozen) {
    Object.isFrozen = function isFrozen(object) {
      if (Object(object) !== object) {
        throw new TypeError("Object.isFrozen can only be called on Objects.");
      }

      return false;
    };
  }

  if (!Object.isExtensible) {
    Object.isExtensible = function isExtensible(object) {
      if (Object(object) !== object) {
        throw new TypeError("Object.isExtensible can only be called on Objects.");
      }

      var name = "";

      while (owns(object, name)) {
        name += "?";
      }

      object[name] = true;
      var returnValue = owns(object, name);
      delete object[name];
      return returnValue;
    };
  }
});

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }

  return s;
})({
  1: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    function intervalometer(cb, request, cancel, requestParameter) {
      var requestId;
      var previousLoopTime;

      function loop(now) {
        requestId = request(loop, requestParameter);
        cb(now - (previousLoopTime || now));
        previousLoopTime = now;
      }

      return {
        start: function start() {
          if (!requestId) {
            loop(0);
          }
        },
        stop: function stop() {
          cancel(requestId);
          requestId = null;
          previousLoopTime = 0;
        }
      };
    }

    function frameIntervalometer(cb) {
      return intervalometer(cb, requestAnimationFrame, cancelAnimationFrame);
    }

    function timerIntervalometer(cb, delay) {
      return intervalometer(cb, setTimeout, clearTimeout, delay);
    }

    exports.intervalometer = intervalometer;
    exports.frameIntervalometer = frameIntervalometer;
    exports.timerIntervalometer = timerIntervalometer;
  }, {}],
  2: [function (require, module, exports) {
    'use strict';

    function _interopDefault(ex) {
      return ex && _typeof2(ex) === 'object' && 'default' in ex ? ex['default'] : ex;
    }

    var _Symbol = _interopDefault(require('poor-mans-symbol'));

    var intervalometer = require('intervalometer');

    function preventEvent(element, eventName, toggleProperty, preventWithProperty) {
      function handler(e) {
        if (Boolean(element[toggleProperty]) === Boolean(preventWithProperty)) {
          e.stopImmediatePropagation();
        }

        delete element[toggleProperty];
      }

      element.addEventListener(eventName, handler, false);
      return handler;
    }

    function proxyProperty(object, propertyName, sourceObject, copyFirst) {
      function get() {
        return sourceObject[propertyName];
      }

      function set(value) {
        sourceObject[propertyName] = value;
      }

      if (copyFirst) {
        set(object[propertyName]);
      }

      Object.defineProperty(object, propertyName, {
        get: get,
        set: set
      });
    }

    function proxyEvent(object, eventName, sourceObject) {
      sourceObject.addEventListener(eventName, function () {
        return object.dispatchEvent(new Event(eventName));
      });
    }

    function dispatchEventAsync(element, type) {
      Promise.resolve().then(function () {
        element.dispatchEvent(new Event(type));
      });
    }

    var isWhitelisted = 'object-fit' in document.head.style && /iPhone|iPod/i.test(navigator.userAgent) && !matchMedia('(-webkit-video-playable-inline)').matches;

    var ಠ = _Symbol();

    var ಠevent = _Symbol();

    var ಠplay = _Symbol('nativeplay');

    var ಠpause = _Symbol('nativepause');

    function getAudioFromVideo(video) {
      var audio = new Audio();
      proxyEvent(video, 'play', audio);
      proxyEvent(video, 'playing', audio);
      proxyEvent(video, 'pause', audio);
      audio.crossOrigin = video.crossOrigin;
      audio.src = video.src || video.currentSrc || 'data:';
      return audio;
    }

    var lastRequests = [];
    var requestIndex = 0;
    var lastTimeupdateEvent;

    function setTime(video, time, rememberOnly) {
      if ((lastTimeupdateEvent || 0) + 200 < Date.now()) {
        video[ಠevent] = true;
        lastTimeupdateEvent = Date.now();
      }

      if (!rememberOnly) {
        video.currentTime = time;
      }

      lastRequests[++requestIndex % 3] = time * 100 | 0 / 100;
    }

    function isPlayerEnded(player) {
      return player.driver.currentTime >= player.video.duration;
    }

    function update(timeDiff) {
      var player = this;

      if (player.video.readyState >= player.video.HAVE_FUTURE_DATA) {
        if (!player.hasAudio) {
          player.driver.currentTime = player.video.currentTime + timeDiff * player.video.playbackRate / 1000;

          if (player.video.loop && isPlayerEnded(player)) {
            player.driver.currentTime = 0;
          }
        }

        setTime(player.video, player.driver.currentTime);
      } else if (player.video.networkState === player.video.NETWORK_IDLE && !player.video.buffered.length) {
        player.video.load();
      }

      if (player.video.ended) {
        delete player.video[ಠevent];
        player.video.pause(true);
      }
    }

    function play() {
      var video = this;
      var player = video[ಠ];

      if (video.webkitDisplayingFullscreen) {
        video[ಠplay]();
        return;
      }

      if (player.driver.src !== 'data:' && player.driver.src !== video.src) {
        setTime(video, 0, true);
        player.driver.src = video.src;
      }

      if (!video.paused) {
        return;
      }

      player.paused = false;

      if (!video.buffered.length) {
        video.load();
      }

      player.driver.play();
      player.updater.start();

      if (!player.hasAudio) {
        dispatchEventAsync(video, 'play');

        if (player.video.readyState >= player.video.HAVE_ENOUGH_DATA) {
          dispatchEventAsync(video, 'playing');
        }
      }
    }

    function pause(forceEvents) {
      var video = this;
      var player = video[ಠ];
      player.driver.pause();
      player.updater.stop();

      if (video.webkitDisplayingFullscreen) {
        video[ಠpause]();
      }

      if (player.paused && !forceEvents) {
        return;
      }

      player.paused = true;

      if (!player.hasAudio) {
        dispatchEventAsync(video, 'pause');
      }

      if (video.ended) {
        video[ಠevent] = true;
        dispatchEventAsync(video, 'ended');
      }
    }

    function addPlayer(video, hasAudio) {
      var player = video[ಠ] = {};
      player.paused = true;
      player.hasAudio = hasAudio;
      player.video = video;
      player.updater = intervalometer.frameIntervalometer(update.bind(player));

      if (hasAudio) {
        player.driver = getAudioFromVideo(video);
      } else {
        video.addEventListener('canplay', function () {
          if (!video.paused) {
            dispatchEventAsync(video, 'playing');
          }
        });
        player.driver = {
          src: video.src || video.currentSrc || 'data:',
          muted: true,
          paused: true,
          pause: function pause() {
            player.driver.paused = true;
          },
          play: function play() {
            player.driver.paused = false;

            if (isPlayerEnded(player)) {
              setTime(video, 0);
            }
          },

          get ended() {
            return isPlayerEnded(player);
          }

        };
      }

      video.addEventListener('emptied', function () {
        var wasEmpty = !player.driver.src || player.driver.src === 'data:';

        if (player.driver.src && player.driver.src !== video.src) {
          setTime(video, 0, true);
          player.driver.src = video.src;

          if (wasEmpty) {
            player.driver.play();
          } else {
            player.updater.stop();
          }
        }
      }, false);
      video.addEventListener('webkitbeginfullscreen', function () {
        if (!video.paused) {
          video.pause();
          video[ಠplay]();
        } else if (hasAudio && !player.driver.buffered.length) {
          player.driver.load();
        }
      });

      if (hasAudio) {
        video.addEventListener('webkitendfullscreen', function () {
          player.driver.currentTime = video.currentTime;
        });
        video.addEventListener('seeking', function () {
          if (lastRequests.indexOf(video.currentTime * 100 | 0 / 100) < 0) {
            player.driver.currentTime = video.currentTime;
          }
        });
      }
    }

    function overloadAPI(video) {
      var player = video[ಠ];
      video[ಠplay] = video.play;
      video[ಠpause] = video.pause;
      video.play = play;
      video.pause = pause;
      proxyProperty(video, 'paused', player.driver);
      proxyProperty(video, 'muted', player.driver, true);
      proxyProperty(video, 'playbackRate', player.driver, true);
      proxyProperty(video, 'ended', player.driver);
      proxyProperty(video, 'loop', player.driver, true);
      preventEvent(video, 'seeking');
      preventEvent(video, 'seeked');
      preventEvent(video, 'timeupdate', ಠevent, false);
      preventEvent(video, 'ended', ಠevent, false);
    }

    function enableInlineVideo(video, hasAudio, onlyWhitelisted) {
      if (hasAudio === void 0) hasAudio = true;
      if (onlyWhitelisted === void 0) onlyWhitelisted = true;

      if (onlyWhitelisted && !isWhitelisted || video[ಠ]) {
        return;
      }

      addPlayer(video, hasAudio);
      overloadAPI(video);
      video.classList.add('IIV');

      if (!hasAudio && video.autoplay) {
        video.play();
      }

      if (!/iPhone|iPod|iPad/.test(navigator.platform)) {
        console.warn('iphone-inline-video is not guaranteed to work in emulated environments');
      }
    }

    enableInlineVideo.isWhitelisted = isWhitelisted;
    module.exports = enableInlineVideo;
  }, {
    "intervalometer": 1,
    "poor-mans-symbol": 3
  }],
  3: [function (require, module, exports) {
    'use strict';

    var index = typeof Symbol === 'undefined' ? function (description) {
      return '@' + (description || '@') + Math.random();
    } : Symbol;
    module.exports = index;
  }, {}],
  4: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _Detector = require('../lib/Detector');

    var _Detector2 = _interopRequireDefault(_Detector);

    var _MobileBuffering = require('../lib/MobileBuffering');

    var _MobileBuffering2 = _interopRequireDefault(_MobileBuffering);

    var _Util = require('../lib/Util');

    var _Util2 = _interopRequireDefault(_Util);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var HAVE_CURRENT_DATA = 2;

    var BaseCanvas = function BaseCanvas(baseComponent, THREE) {
      var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return {
        constructor: function init(player, options) {
          this.settings = options;
          this.width = player.el().offsetWidth, this.height = player.el().offsetHeight;
          this.lon = options.initLon, this.lat = options.initLat, this.phi = 0, this.theta = 0;
          this.videoType = options.videoType;
          this.clickToToggle = options.clickToToggle;
          this.mouseDown = false;
          this.isUserInteracting = false;
          this.renderer = new THREE.WebGLRenderer();
          this.renderer.setPixelRatio(window.devicePixelRatio);
          this.renderer.setSize(this.width, this.height);
          this.renderer.autoClear = false;
          this.renderer.setClearColor(0x000000, 1);
          var video = settings.getTech(player);
          this.supportVideoTexture = _Detector2.default.supportVideoTexture();
          this.liveStreamOnSafari = _Detector2.default.isLiveStreamOnSafari(video);
          if (this.liveStreamOnSafari) this.supportVideoTexture = false;

          if (!this.supportVideoTexture) {
            this.helperCanvas = player.addChild("HelperCanvas", {
              video: video,
              width: options.helperCanvas.width ? options.helperCanvas.width : this.width,
              height: options.helperCanvas.height ? options.helperCanvas.height : this.height
            });
            var context = this.helperCanvas.el();
            this.texture = new THREE.Texture(context);
          } else {
            this.texture = new THREE.Texture(video);
          }

          video.style.visibility = "hidden";
          this.texture.generateMipmaps = false;
          this.texture.minFilter = THREE.LinearFilter;
          this.texture.maxFilter = THREE.LinearFilter;
          this.texture.format = THREE.RGBFormat;
          this.el_ = this.renderer.domElement;
          this.el_.classList.add('vjs-video-canvas');
          options.el = this.el_;
          baseComponent.call(this, player, options);
          this.attachControlEvents();
          this.player().on("play", function () {
            this.time = new Date().getTime();
            this.startAnimation();
          }.bind(this));
        },
        attachControlEvents: function attachControlEvents() {
          this.on('mousemove', this.handleMouseMove.bind(this));
          this.on('touchmove', this.handleTouchMove.bind(this));
          this.on('mousedown', this.handleMouseDown.bind(this));
          this.on('touchstart', this.handleTouchStart.bind(this));
          this.on('mouseup', this.handleMouseUp.bind(this));
          this.on('touchend', this.handleTouchEnd.bind(this));

          if (this.settings.scrollable) {
            this.on('mousewheel', this.handleMouseWheel.bind(this));
            this.on('MozMousePixelScroll', this.handleMouseWheel.bind(this));
          }

          this.on('mouseenter', this.handleMouseEnter.bind(this));
          this.on('mouseleave', this.handleMouseLease.bind(this));
          this.on('dispose', this.handleDispose.bind(this));
        },
        handleDispose: function handleDispose(event) {
          this.off('mousemove', this.handleMouseMove.bind(this));
          this.off('touchmove', this.handleTouchMove.bind(this));
          this.off('mousedown', this.handleMouseDown.bind(this));
          this.off('touchstart', this.handleTouchStart.bind(this));
          this.off('mouseup', this.handleMouseUp.bind(this));
          this.off('touchend', this.handleTouchEnd.bind(this));

          if (this.settings.scrollable) {
            this.off('mousewheel', this.handleMouseWheel.bind(this));
            this.off('MozMousePixelScroll', this.handleMouseWheel.bind(this));
          }

          this.off('mouseenter', this.handleMouseEnter.bind(this));
          this.off('mouseleave', this.handleMouseLease.bind(this));
          this.off('dispose', this.handleDispose.bind(this));
          this.stopAnimation();
        },
        startAnimation: function startAnimation() {
          this.render_animation = true;
          this.animate();
        },
        stopAnimation: function stopAnimation() {
          this.render_animation = false;

          if (this.requestAnimationId) {
            cancelAnimationFrame(this.requestAnimationId);
          }
        },
        handleResize: function handleResize() {
          this.width = this.player().el().offsetWidth, this.height = this.player().el().offsetHeight;
          this.renderer.setSize(this.width, this.height);
        },
        handleMouseUp: function handleMouseUp(event) {
          this.mouseDown = false;

          if (this.clickToToggle) {
            var clientX = event.clientX || event.changedTouches && event.changedTouches[0].clientX;
            var clientY = event.clientY || event.changedTouches && event.changedTouches[0].clientY;
            if (typeof clientX === "undefined" || clientY === "undefined") return;
            var diffX = Math.abs(clientX - this.onPointerDownPointerX);
            var diffY = Math.abs(clientY - this.onPointerDownPointerY);
            if (diffX < 0.1 && diffY < 0.1) this.player().paused() ? this.player().play() : this.player().pause();
          }
        },
        handleMouseDown: function handleMouseDown(event) {
          event.preventDefault();
          var clientX = event.clientX || event.touches && event.touches[0].clientX;
          var clientY = event.clientY || event.touches && event.touches[0].clientY;
          if (typeof clientX === "undefined" || clientY === "undefined") return;
          this.mouseDown = true;
          this.onPointerDownPointerX = clientX;
          this.onPointerDownPointerY = clientY;
          this.onPointerDownLon = this.lon;
          this.onPointerDownLat = this.lat;
        },
        handleTouchStart: function handleTouchStart(event) {
          if (event.touches.length > 1) {
            this.isUserPinch = true;
            this.multiTouchDistance = _Util2.default.getTouchesDistance(event.touches);
          }

          this.handleMouseDown(event);
        },
        handleTouchEnd: function handleTouchEnd(event) {
          this.isUserPinch = false;
          this.handleMouseUp(event);
        },
        handleMouseMove: function handleMouseMove(event) {
          var clientX = event.clientX || event.touches && event.touches[0].clientX;
          var clientY = event.clientY || event.touches && event.touches[0].clientY;
          if (typeof clientX === "undefined" || clientY === "undefined") return;

          if (this.settings.clickAndDrag) {
            if (this.mouseDown) {
              this.lon = (this.onPointerDownPointerX - clientX) * 0.2 + this.onPointerDownLon;
              this.lat = (clientY - this.onPointerDownPointerY) * 0.2 + this.onPointerDownLat;
            }
          } else {
            var x = clientX - this.el_.offsetLeft;
            var y = clientY - this.el_.offsetTop;
            this.lon = x / this.width * 430 - 225;
            this.lat = y / this.height * -180 + 90;
          }
        },
        handleTouchMove: function handleTouchMove(event) {
          if (!this.isUserPinch || event.touches.length <= 1) {
            this.handleMouseMove(event);
          }
        },
        handleMobileOrientation: function handleMobileOrientation(event) {
          if (typeof event.rotationRate === "undefined") return;
          var x = event.rotationRate.alpha;
          var y = event.rotationRate.beta;
          var portrait = typeof event.portrait !== "undefined" ? event.portrait : window.matchMedia("(orientation: portrait)").matches;
          var landscape = typeof event.landscape !== "undefined" ? event.landscape : window.matchMedia("(orientation: landscape)").matches;
          var orientation = event.orientation || window.orientation;

          if (portrait) {
            this.lon = this.lon - y * this.settings.mobileVibrationValue;
            this.lat = this.lat + x * this.settings.mobileVibrationValue;
          } else if (landscape) {
            var orientationDegree = -90;

            if (typeof orientation != "undefined") {
              orientationDegree = orientation;
            }

            this.lon = orientationDegree == -90 ? this.lon + x * this.settings.mobileVibrationValue : this.lon - x * this.settings.mobileVibrationValue;
            this.lat = orientationDegree == -90 ? this.lat + y * this.settings.mobileVibrationValue : this.lat - y * this.settings.mobileVibrationValue;
          }
        },
        handleMouseWheel: function handleMouseWheel(event) {
          event.stopPropagation();
          event.preventDefault();
        },
        handleMouseEnter: function handleMouseEnter(event) {
          this.isUserInteracting = true;
        },
        handleMouseLease: function handleMouseLease(event) {
          this.isUserInteracting = false;

          if (this.mouseDown) {
            this.mouseDown = false;
          }
        },
        animate: function animate() {
          if (!this.render_animation) return;
          this.requestAnimationId = requestAnimationFrame(this.animate.bind(this));

          if (!this.player().paused()) {
            if (typeof this.texture !== "undefined" && (!this.isPlayOnMobile && this.player().readyState() >= HAVE_CURRENT_DATA || this.isPlayOnMobile && this.player().hasClass("vjs-playing"))) {
              var ct = new Date().getTime();

              if (ct - this.time >= 30) {
                this.texture.needsUpdate = true;
                this.time = ct;
              }

              if (this.isPlayOnMobile) {
                var currentTime = this.player().currentTime();

                if (_MobileBuffering2.default.isBuffering(currentTime)) {
                  if (!this.player().hasClass("vjs-panorama-mobile-inline-video-buffering")) {
                    this.player().addClass("vjs-panorama-mobile-inline-video-buffering");
                  }
                } else {
                  if (this.player().hasClass("vjs-panorama-mobile-inline-video-buffering")) {
                    this.player().removeClass("vjs-panorama-mobile-inline-video-buffering");
                  }
                }
              }
            }
          }

          this.render();
        },
        render: function render() {
          if (!this.isUserInteracting) {
            var symbolLat = this.lat > this.settings.initLat ? -1 : 1;
            var symbolLon = this.lon > this.settings.initLon ? -1 : 1;

            if (this.settings.backToVerticalCenter) {
              this.lat = this.lat > this.settings.initLat - Math.abs(this.settings.returnStepLat) && this.lat < this.settings.initLat + Math.abs(this.settings.returnStepLat) ? this.settings.initLat : this.lat + this.settings.returnStepLat * symbolLat;
            }

            if (this.settings.backToHorizonCenter) {
              this.lon = this.lon > this.settings.initLon - Math.abs(this.settings.returnStepLon) && this.lon < this.settings.initLon + Math.abs(this.settings.returnStepLon) ? this.settings.initLon : this.lon + this.settings.returnStepLon * symbolLon;
            }
          }

          this.lat = Math.max(this.settings.minLat, Math.min(this.settings.maxLat, this.lat));
          this.lon = Math.max(this.settings.minLon, Math.min(this.settings.maxLon, this.lon));
          this.phi = THREE.Math.degToRad(90 - this.lat);
          this.theta = THREE.Math.degToRad(this.lon);

          if (!this.supportVideoTexture) {
            this.helperCanvas.update();
          }

          this.renderer.clear();
        },
        playOnMobile: function playOnMobile() {
          this.isPlayOnMobile = true;
          if (this.settings.autoMobileOrientation) window.addEventListener('devicemotion', this.handleMobileOrientation.bind(this));
        },
        el: function el() {
          return this.el_;
        }
      };
    };

    exports.default = BaseCanvas;
  }, {
    "../lib/Detector": 6,
    "../lib/MobileBuffering": 8,
    "../lib/Util": 11
  }],
  5: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _BaseCanvas = require('./BaseCanvas');

    var _BaseCanvas2 = _interopRequireDefault(_BaseCanvas);

    var _Util = require('./Util');

    var _Util2 = _interopRequireDefault(_Util);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var Canvas = function Canvas(baseComponent, THREE) {
      var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parent = (0, _BaseCanvas2.default)(baseComponent, THREE, settings);
      return _Util2.default.extend(parent, {
        constructor: function init(player, options) {
          parent.constructor.call(this, player, options);
          this.VRMode = false;
          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(options.initFov, this.width / this.height, 1, 2000);
          this.camera.target = new THREE.Vector3(0, 0, 0);
          var geometry = this.videoType === "equirectangular" ? new THREE.SphereGeometry(500, 60, 40) : new THREE.SphereBufferGeometry(500, 60, 40).toNonIndexed();

          if (this.videoType === "fisheye") {
            var normals = geometry.attributes.normal.array;
            var uvs = geometry.attributes.uv.array;

            for (var i = 0, l = normals.length / 3; i < l; i++) {
              var x = normals[i * 3 + 0];
              var y = normals[i * 3 + 1];
              var z = normals[i * 3 + 2];
              var r = Math.asin(Math.sqrt(x * x + z * z) / Math.sqrt(x * x + y * y + z * z)) / Math.PI;
              if (y < 0) r = 1 - r;
              var theta = x == 0 && z == 0 ? 0 : Math.acos(x / Math.sqrt(x * x + z * z));
              if (z < 0) theta = theta * -1;
              uvs[i * 2 + 0] = -0.8 * r * Math.cos(theta) + 0.5;
              uvs[i * 2 + 1] = 0.8 * r * Math.sin(theta) + 0.5;
            }

            geometry.rotateX(options.rotateX);
            geometry.rotateY(options.rotateY);
            geometry.rotateZ(options.rotateZ);
          } else if (this.videoType === "dual_fisheye") {
            var _normals = geometry.attributes.normal.array;
            var _uvs = geometry.attributes.uv.array;

            var _l = _normals.length / 3;

            for (var _i = 0; _i < _l / 2; _i++) {
              var _x2 = _normals[_i * 3 + 0];
              var _y = _normals[_i * 3 + 1];
              var _z = _normals[_i * 3 + 2];

              var _r = _x2 == 0 && _z == 0 ? 1 : Math.acos(_y) / Math.sqrt(_x2 * _x2 + _z * _z) * (2 / Math.PI);

              _uvs[_i * 2 + 0] = _x2 * options.dualFish.circle1.rx * _r * options.dualFish.circle1.coverX + options.dualFish.circle1.x;
              _uvs[_i * 2 + 1] = _z * options.dualFish.circle1.ry * _r * options.dualFish.circle1.coverY + options.dualFish.circle1.y;
            }

            for (var _i2 = _l / 2; _i2 < _l; _i2++) {
              var _x3 = _normals[_i2 * 3 + 0];
              var _y2 = _normals[_i2 * 3 + 1];
              var _z2 = _normals[_i2 * 3 + 2];

              var _r2 = _x3 == 0 && _z2 == 0 ? 1 : Math.acos(-_y2) / Math.sqrt(_x3 * _x3 + _z2 * _z2) * (2 / Math.PI);

              _uvs[_i2 * 2 + 0] = -_x3 * options.dualFish.circle2.rx * _r2 * options.dualFish.circle2.coverX + options.dualFish.circle2.x;
              _uvs[_i2 * 2 + 1] = _z2 * options.dualFish.circle2.ry * _r2 * options.dualFish.circle2.coverY + options.dualFish.circle2.y;
            }

            geometry.rotateX(options.rotateX);
            geometry.rotateY(options.rotateY);
            geometry.rotateZ(options.rotateZ);
          }

          geometry.scale(-1, 1, 1);
          this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
            map: this.texture
          }));
          this.scene.add(this.mesh);
        },
        enableVR: function enableVR() {
          this.VRMode = true;

          if (typeof vrHMD !== 'undefined') {
            var eyeParamsL = vrHMD.getEyeParameters('left');
            var eyeParamsR = vrHMD.getEyeParameters('right');
            this.eyeFOVL = eyeParamsL.recommendedFieldOfView;
            this.eyeFOVR = eyeParamsR.recommendedFieldOfView;
          }

          this.cameraL = new THREE.PerspectiveCamera(this.camera.fov, this.width / 2 / this.height, 1, 2000);
          this.cameraR = new THREE.PerspectiveCamera(this.camera.fov, this.width / 2 / this.height, 1, 2000);
        },
        disableVR: function disableVR() {
          this.VRMode = false;
          this.renderer.setViewport(0, 0, this.width, this.height);
          this.renderer.setScissor(0, 0, this.width, this.height);
        },
        handleResize: function handleResize() {
          parent.handleResize.call(this);
          this.camera.aspect = this.width / this.height;
          this.camera.updateProjectionMatrix();

          if (this.VRMode) {
            this.cameraL.aspect = this.camera.aspect / 2;
            this.cameraR.aspect = this.camera.aspect / 2;
            this.cameraL.updateProjectionMatrix();
            this.cameraR.updateProjectionMatrix();
          }
        },
        handleMouseWheel: function handleMouseWheel(event) {
          parent.handleMouseWheel(event);

          if (event.wheelDeltaY) {
            this.camera.fov -= event.wheelDeltaY * 0.05;
          } else if (event.wheelDelta) {
            this.camera.fov -= event.wheelDelta * 0.05;
          } else if (event.detail) {
            this.camera.fov += event.detail * 1.0;
          }

          this.camera.fov = Math.min(this.settings.maxFov, this.camera.fov);
          this.camera.fov = Math.max(this.settings.minFov, this.camera.fov);
          this.camera.updateProjectionMatrix();

          if (this.VRMode) {
            this.cameraL.fov = this.camera.fov;
            this.cameraR.fov = this.camera.fov;
            this.cameraL.updateProjectionMatrix();
            this.cameraR.updateProjectionMatrix();
          }
        },
        handleTouchMove: function handleTouchMove(event) {
          parent.handleTouchMove.call(this, event);

          if (this.isUserPinch) {
            var currentDistance = _Util2.default.getTouchesDistance(event.touches);

            event.wheelDeltaY = (currentDistance - this.multiTouchDistance) * 2;
            this.handleMouseWheel.call(this, event);
            this.multiTouchDistance = currentDistance;
          }
        },
        render: function render() {
          parent.render.call(this);
          this.camera.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
          this.camera.target.y = 500 * Math.cos(this.phi);
          this.camera.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
          this.camera.lookAt(this.camera.target);

          if (!this.VRMode) {
            this.renderer.render(this.scene, this.camera);
          } else {
            var viewPortWidth = this.width / 2,
                viewPortHeight = this.height;

            if (typeof vrHMD !== 'undefined') {
              this.cameraL.projectionMatrix = _Util2.default.fovToProjection(this.eyeFOVL, true, this.camera.near, this.camera.far);
              this.cameraR.projectionMatrix = _Util2.default.fovToProjection(this.eyeFOVR, true, this.camera.near, this.camera.far);
            } else {
              var lonL = this.lon + this.settings.VRGapDegree;
              var lonR = this.lon - this.settings.VRGapDegree;
              var thetaL = THREE.Math.degToRad(lonL);
              var thetaR = THREE.Math.degToRad(lonR);

              var targetL = _Util2.default.deepCopy(this.camera.target);

              targetL.x = 500 * Math.sin(this.phi) * Math.cos(thetaL);
              targetL.z = 500 * Math.sin(this.phi) * Math.sin(thetaL);
              this.cameraL.lookAt(targetL);

              var targetR = _Util2.default.deepCopy(this.camera.target);

              targetR.x = 500 * Math.sin(this.phi) * Math.cos(thetaR);
              targetR.z = 500 * Math.sin(this.phi) * Math.sin(thetaR);
              this.cameraR.lookAt(targetR);
            }

            this.renderer.setViewport(0, 0, viewPortWidth, viewPortHeight);
            this.renderer.setScissor(0, 0, viewPortWidth, viewPortHeight);
            this.renderer.render(this.scene, this.cameraL);
            this.renderer.setViewport(viewPortWidth, 0, viewPortWidth, viewPortHeight);
            this.renderer.setScissor(viewPortWidth, 0, viewPortWidth, viewPortHeight);
            this.renderer.render(this.scene, this.cameraR);
          }
        }
      });
    };

    exports.default = Canvas;
  }, {
    "./BaseCanvas": 4,
    "./Util": 11
  }],
  6: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var win = {};

    if (typeof window !== "undefined") {
      win = window;
    }

    var Detector = {
      canvas: !!win.CanvasRenderingContext2D,
      webgl: function () {
        try {
          var canvas = document.createElement('canvas');
          return !!(win.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      }(),
      workers: !!win.Worker,
      fileapi: win.File && win.FileReader && win.FileList && win.Blob,
      Check_Version: function Check_Version() {
        var rv = -1;

        if (navigator.appName == 'Microsoft Internet Explorer') {
          var ua = navigator.userAgent,
              re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

          if (re.exec(ua) !== null) {
            rv = parseFloat(RegExp.$1);
          }
        } else if (navigator.appName == "Netscape") {
          if (navigator.appVersion.indexOf('Trident') !== -1) rv = 11;else {
            var ua = navigator.userAgent;
            var re = new RegExp("Edge\/([0-9]{1,}[\\.0-9]{0,})");

            if (re.exec(ua) !== null) {
              rv = parseFloat(RegExp.$1);
            }
          }
        }

        return rv;
      },
      supportVideoTexture: function supportVideoTexture() {
        var version = this.Check_Version();
        return version === -1 || version >= 13;
      },
      isLiveStreamOnSafari: function isLiveStreamOnSafari(videoElement) {
        var videoSources = [].slice.call(videoElement.querySelectorAll("source"));
        var result = false;

        if (videoElement.src && videoElement.src.indexOf('.m3u8') > -1) {
          videoSources.push({
            src: videoElement.src,
            type: "application/x-mpegURL"
          });
        }

        for (var i = 0; i < videoSources.length; i++) {
          var currentVideoSource = videoSources[i];

          if ((currentVideoSource.type === "application/x-mpegURL" || currentVideoSource.type === "application/vnd.apple.mpegurl") && /(Safari|AppleWebKit)/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
            result = true;
            break;
          }
        }

        return result;
      },
      getWebGLErrorMessage: function getWebGLErrorMessage() {
        var element = document.createElement('div');
        element.id = 'webgl-error-message';

        if (!this.webgl) {
          element.innerHTML = win.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n') : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n');
        }

        return element;
      },
      addGetWebGLMessage: function addGetWebGLMessage(parameters) {
        var parent, id, element;
        parameters = parameters || {};
        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';
        element = Detector.getWebGLErrorMessage();
        element.id = id;
        parent.appendChild(element);
      }
    };
    exports.default = Detector;
  }, {}],
  7: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var HelperCanvas = function HelperCanvas(baseComponent) {
      var element = document.createElement('canvas');
      element.className = "vjs-video-helper-canvas";
      return {
        constructor: function init(player, options) {
          this.videoElement = options.video;
          this.width = options.width;
          this.height = options.height;
          element.width = this.width;
          element.height = this.height;
          element.style.display = "none";
          options.el = element;
          this.context = element.getContext('2d');
          this.context.drawImage(this.videoElement, 0, 0, this.width, this.height);
          baseComponent.call(this, player, options);
        },
        getContext: function getContext() {
          return this.context;
        },
        update: function update() {
          this.context.drawImage(this.videoElement, 0, 0, this.width, this.height);
        },
        el: function el() {
          return element;
        }
      };
    };

    exports.default = HelperCanvas;
  }, {}],
  8: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var MobileBuffering = {
      prev_currentTime: 0,
      counter: 0,
      isBuffering: function isBuffering(currentTime) {
        if (currentTime == this.prev_currentTime) this.counter++;else this.counter = 0;
        this.prev_currentTime = currentTime;

        if (this.counter > 10) {
          this.counter = 10;
          return true;
        }

        return false;
      }
    };
    exports.default = MobileBuffering;
  }, {}],
  9: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
      return _typeof2(obj);
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };

    var Notice = function Notice(baseComponent) {
      var element = document.createElement('div');
      element.className = "vjs-video-notice-label";
      return {
        constructor: function init(player, options) {
          if (_typeof(options.NoticeMessage) == "object") {
            element = options.NoticeMessage;
            options.el = options.NoticeMessage;
          } else if (typeof options.NoticeMessage == "string") {
            element.innerHTML = options.NoticeMessage;
            options.el = element;
          }

          baseComponent.call(this, player, options);
        },
        el: function el() {
          return element;
        }
      };
    };

    exports.default = Notice;
  }, {}],
  10: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _BaseCanvas = require('./BaseCanvas');

    var _BaseCanvas2 = _interopRequireDefault(_BaseCanvas);

    var _Util = require('./Util');

    var _Util2 = _interopRequireDefault(_Util);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var ThreeDCanvas = function ThreeDCanvas(baseComponent, THREE) {
      var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var parent = (0, _BaseCanvas2.default)(baseComponent, THREE, settings);
      return _Util2.default.extend(parent, {
        constructor: function init(player, options) {
          parent.constructor.call(this, player, options);
          this.VRMode = false;
          this.scene = new THREE.Scene();
          var aspectRatio = this.width / this.height;
          this.cameraL = new THREE.PerspectiveCamera(options.initFov, aspectRatio, 1, 2000);
          this.cameraL.target = new THREE.Vector3(0, 0, 0);
          this.cameraR = new THREE.PerspectiveCamera(options.initFov, aspectRatio / 2, 1, 2000);
          this.cameraR.position.set(1000, 0, 0);
          this.cameraR.target = new THREE.Vector3(1000, 0, 0);
          var geometryL = new THREE.SphereBufferGeometry(500, 60, 40).toNonIndexed();
          var geometryR = new THREE.SphereBufferGeometry(500, 60, 40).toNonIndexed();
          var uvsL = geometryL.attributes.uv.array;
          var normalsL = geometryL.attributes.normal.array;

          for (var i = 0; i < normalsL.length / 3; i++) {
            uvsL[i * 2 + 1] = uvsL[i * 2 + 1] / 2;
          }

          var uvsR = geometryR.attributes.uv.array;
          var normalsR = geometryR.attributes.normal.array;

          for (var i = 0; i < normalsR.length / 3; i++) {
            uvsR[i * 2 + 1] = uvsR[i * 2 + 1] / 2 + 0.5;
          }

          geometryL.scale(-1, 1, 1);
          geometryR.scale(-1, 1, 1);
          this.meshL = new THREE.Mesh(geometryL, new THREE.MeshBasicMaterial({
            map: this.texture
          }));
          this.meshR = new THREE.Mesh(geometryR, new THREE.MeshBasicMaterial({
            map: this.texture
          }));
          this.meshR.position.set(1000, 0, 0);
          this.scene.add(this.meshL);
          if (options.callback) options.callback();
        },
        handleResize: function handleResize() {
          parent.handleResize.call(this);
          var aspectRatio = this.width / this.height;

          if (!this.VRMode) {
            this.cameraL.aspect = aspectRatio;
            this.cameraL.updateProjectionMatrix();
          } else {
            aspectRatio /= 2;
            this.cameraL.aspect = aspectRatio;
            this.cameraR.aspect = aspectRatio;
            this.cameraL.updateProjectionMatrix();
            this.cameraR.updateProjectionMatrix();
          }
        },
        handleMouseWheel: function handleMouseWheel(event) {
          parent.handleMouseWheel(event);

          if (event.wheelDeltaY) {
            this.cameraL.fov -= event.wheelDeltaY * 0.05;
          } else if (event.wheelDelta) {
            this.cameraL.fov -= event.wheelDelta * 0.05;
          } else if (event.detail) {
            this.cameraL.fov += event.detail * 1.0;
          }

          this.cameraL.fov = Math.min(this.settings.maxFov, this.cameraL.fov);
          this.cameraL.fov = Math.max(this.settings.minFov, this.cameraL.fov);
          this.cameraL.updateProjectionMatrix();

          if (this.VRMode) {
            this.cameraR.fov = this.cameraL.fov;
            this.cameraR.updateProjectionMatrix();
          }
        },
        enableVR: function enableVR() {
          this.VRMode = true;
          this.scene.add(this.meshR);
          this.handleResize();
        },
        disableVR: function disableVR() {
          this.VRMode = false;
          this.scene.remove(this.meshR);
          this.handleResize();
        },
        render: function render() {
          parent.render.call(this);
          this.cameraL.target.x = 500 * Math.sin(this.phi) * Math.cos(this.theta);
          this.cameraL.target.y = 500 * Math.cos(this.phi);
          this.cameraL.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
          this.cameraL.lookAt(this.cameraL.target);

          if (this.VRMode) {
            var viewPortWidth = this.width / 2,
                viewPortHeight = this.height;
            this.cameraR.target.x = 1000 + 500 * Math.sin(this.phi) * Math.cos(this.theta);
            this.cameraR.target.y = 500 * Math.cos(this.phi);
            this.cameraR.target.z = 500 * Math.sin(this.phi) * Math.sin(this.theta);
            this.cameraR.lookAt(this.cameraR.target);
            this.renderer.setViewport(0, 0, viewPortWidth, viewPortHeight);
            this.renderer.setScissor(0, 0, viewPortWidth, viewPortHeight);
            this.renderer.render(this.scene, this.cameraL);
            this.renderer.setViewport(viewPortWidth, 0, viewPortWidth, viewPortHeight);
            this.renderer.setScissor(viewPortWidth, 0, viewPortWidth, viewPortHeight);
            this.renderer.render(this.scene, this.cameraR);
          } else {
            this.renderer.render(this.scene, this.cameraL);
          }
        }
      });
    };

    exports.default = ThreeDCanvas;
  }, {
    "./BaseCanvas": 4,
    "./Util": 11
  }],
  11: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    function whichTransitionEvent() {
      var t;
      var el = document.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };

      for (t in transitions) {
        if (el.style[t] !== undefined) {
          return transitions[t];
        }
      }
    }

    function mobileAndTabletcheck() {
      var check = false;

      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);

      return check;
    }

    function isIos() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function isRealIphone() {
      return /iPhone|iPod/i.test(navigator.platform);
    }

    function fovToNDCScaleOffset(fov) {
      var pxscale = 2.0 / (fov.leftTan + fov.rightTan);
      var pxoffset = (fov.leftTan - fov.rightTan) * pxscale * 0.5;
      var pyscale = 2.0 / (fov.upTan + fov.downTan);
      var pyoffset = (fov.upTan - fov.downTan) * pyscale * 0.5;
      return {
        scale: [pxscale, pyscale],
        offset: [pxoffset, pyoffset]
      };
    }

    function fovPortToProjection(fov, rightHanded, zNear, zFar) {
      rightHanded = rightHanded === undefined ? true : rightHanded;
      zNear = zNear === undefined ? 0.01 : zNear;
      zFar = zFar === undefined ? 10000.0 : zFar;
      var handednessScale = rightHanded ? -1.0 : 1.0;
      var mobj = new THREE.Matrix4();
      var m = mobj.elements;
      var scaleAndOffset = fovToNDCScaleOffset(fov);
      m[0 * 4 + 0] = scaleAndOffset.scale[0];
      m[0 * 4 + 1] = 0.0;
      m[0 * 4 + 2] = scaleAndOffset.offset[0] * handednessScale;
      m[0 * 4 + 3] = 0.0;
      m[1 * 4 + 0] = 0.0;
      m[1 * 4 + 1] = scaleAndOffset.scale[1];
      m[1 * 4 + 2] = -scaleAndOffset.offset[1] * handednessScale;
      m[1 * 4 + 3] = 0.0;
      m[2 * 4 + 0] = 0.0;
      m[2 * 4 + 1] = 0.0;
      m[2 * 4 + 2] = zFar / (zNear - zFar) * -handednessScale;
      m[2 * 4 + 3] = zFar * zNear / (zNear - zFar);
      m[3 * 4 + 0] = 0.0;
      m[3 * 4 + 1] = 0.0;
      m[3 * 4 + 2] = handednessScale;
      m[3 * 4 + 3] = 0.0;
      mobj.transpose();
      return mobj;
    }

    function fovToProjection(fov, rightHanded, zNear, zFar) {
      var DEG2RAD = Math.PI / 180.0;
      var fovPort = {
        upTan: Math.tan(fov.upDegrees * DEG2RAD),
        downTan: Math.tan(fov.downDegrees * DEG2RAD),
        leftTan: Math.tan(fov.leftDegrees * DEG2RAD),
        rightTan: Math.tan(fov.rightDegrees * DEG2RAD)
      };
      return fovPortToProjection(fovPort, rightHanded, zNear, zFar);
    }

    function extend(superClass) {
      var subClassMethods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      for (var method in superClass) {
        if (superClass.hasOwnProperty(method) && !subClassMethods.hasOwnProperty(method)) {
          subClassMethods[method] = superClass[method];
        }
      }

      return subClassMethods;
    }

    function deepCopy(obj) {
      var to = {};

      for (var name in obj) {
        to[name] = obj[name];
      }

      return to;
    }

    function getTouchesDistance(touches) {
      return Math.sqrt((touches[0].clientX - touches[1].clientX) * (touches[0].clientX - touches[1].clientX) + (touches[0].clientY - touches[1].clientY) * (touches[0].clientY - touches[1].clientY));
    }

    exports.default = {
      whichTransitionEvent: whichTransitionEvent,
      mobileAndTabletcheck: mobileAndTabletcheck,
      isIos: isIos,
      isRealIphone: isRealIphone,
      fovToProjection: fovToProjection,
      extend: extend,
      deepCopy: deepCopy,
      getTouchesDistance: getTouchesDistance
    };
  }, {}],
  12: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var VRButton = function VRButton(ButtonComponent) {
      return {
        constructor: function init(player, options) {
          ButtonComponent.call(this, player, options);
        },
        buildCSSClass: function buildCSSClass() {
          return "vjs-VR-control " + ButtonComponent.prototype.buildCSSClass.call(this);
        },
        handleClick: function handleClick() {
          var canvas = this.player().getChild("Canvas");
          !canvas.VRMode ? canvas.enableVR() : canvas.disableVR();
          canvas.VRMode ? this.addClass("enable") : this.removeClass("enable");
          canvas.VRMode ? this.player().trigger('VRModeOn') : this.player().trigger('VRModeOff');
        },
        controlText_: "VR"
      };
    };

    exports.default = VRButton;
  }, {}],
  13: [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _Util = require('./lib/Util');

    var _Util2 = _interopRequireDefault(_Util);

    var _Detector = require('./lib/Detector');

    var _Detector2 = _interopRequireDefault(_Detector);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var runOnMobile = typeof window !== "undefined" ? _Util2.default.mobileAndTabletcheck() : false;
    var defaults = {
      clickAndDrag: runOnMobile,
      showNotice: true,
      NoticeMessage: "Please use your mouse drag and drop the video.",
      autoHideNotice: 3000,
      scrollable: true,
      initFov: 75,
      maxFov: 105,
      minFov: 51,
      initLat: 0,
      initLon: -180,
      returnStepLat: 0.5,
      returnStepLon: 2,
      backToVerticalCenter: !runOnMobile,
      backToHorizonCenter: !runOnMobile,
      clickToToggle: false,
      minLat: -85,
      maxLat: 85,
      minLon: -Infinity,
      maxLon: Infinity,
      videoType: "equirectangular",
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      autoMobileOrientation: false,
      mobileVibrationValue: runOnMobile && _Util2.default.isIos() ? 0.022 : 1,
      VREnable: true,
      VRGapDegree: 2.5,
      closePanorama: false,
      helperCanvas: {},
      dualFish: {
        width: 1920,
        height: 1080,
        circle1: {
          x: 0.240625,
          y: 0.553704,
          rx: 0.23333,
          ry: 0.43148,
          coverX: 0.913,
          coverY: 0.9
        },
        circle2: {
          x: 0.757292,
          y: 0.553704,
          rx: 0.232292,
          ry: 0.4296296,
          coverX: 0.913,
          coverY: 0.9308
        }
      }
    };

    function playerResize(player) {
      var canvas = player.getChild('Canvas');
      return function () {
        player.el().style.width = window.innerWidth + "px";
        player.el().style.height = window.innerHeight + "px";
        canvas.handleResize();
      };
    }

    function fullscreenOnIOS(player, clickFn) {
      var resizeFn = playerResize(player);
      player.controlBar.fullscreenToggle.off("tap", clickFn);
      player.controlBar.fullscreenToggle.on("tap", function fullscreen() {
        var canvas = player.getChild('Canvas');

        if (!player.isFullscreen()) {
          player.isFullscreen(true);
          player.enterFullWindow();
          resizeFn();
          window.addEventListener("devicemotion", resizeFn);
        } else {
          player.isFullscreen(false);
          player.exitFullWindow();
          player.el().style.width = "";
          player.el().style.height = "";
          canvas.handleResize();
          window.removeEventListener("devicemotion", resizeFn);
        }
      });
    }

    var onPlayerReady = function onPlayerReady(player, options, settings) {
      player.addClass('vjs-panorama');

      if (!_Detector2.default.webgl) {
        PopupNotification(player, {
          NoticeMessage: _Detector2.default.getWebGLErrorMessage(),
          autoHideNotice: options.autoHideNotice
        });

        if (options.callback) {
          options.callback();
        }

        return;
      }

      player.addChild('Canvas', _Util2.default.deepCopy(options));
      var canvas = player.getChild('Canvas');

      if (runOnMobile) {
        var videoElement = settings.getTech(player);

        if (_Util2.default.isRealIphone()) {
          var makeVideoPlayableInline = require('iphone-inline-video');

          videoElement.setAttribute("playsinline", "");
          makeVideoPlayableInline(videoElement, true);
        }

        if (_Util2.default.isIos()) {
          fullscreenOnIOS(player, settings.getFullscreenToggleClickFn(player));
        }

        player.addClass("vjs-panorama-mobile-inline-video");
        player.removeClass("vjs-using-native-controls");
        canvas.playOnMobile();
      }

      if (options.showNotice) {
        player.on("playing", function () {
          PopupNotification(player, _Util2.default.deepCopy(options));
        });
      }

      if (options.VREnable) {
        player.controlBar.addChild('VRButton', {}, player.controlBar.children().length - 1);
      }

      canvas.hide();
      player.on("play", function () {
        canvas.show();
      });
      player.on("fullscreenchange", function () {
        canvas.handleResize();
      });
      if (options.callback) options.callback();
    };

    var PopupNotification = function PopupNotification(player) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        NoticeMessage: ""
      };
      var notice = player.addChild('Notice', options);

      if (options.autoHideNotice > 0) {
        setTimeout(function () {
          if (!notice.el_) {
            return;
          }

          notice.addClass("vjs-video-notice-fadeOut");

          var transitionEvent = _Util2.default.whichTransitionEvent();

          var hide = function hide() {
            notice.hide();
            notice.removeClass("vjs-video-notice-fadeOut");
            notice.off(transitionEvent, hide);
          };

          notice.on(transitionEvent, hide);
        }, options.autoHideNotice);
      }
    };

    var plugin = function plugin() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var videoTypes = ["equirectangular", "fisheye", "3dVideo", "dual_fisheye"];

      var panorama = function panorama(options) {
        var _this = this;

        if (settings.mergeOption) options = settings.mergeOption(defaults, options);

        if (typeof settings._init === "undefined" || typeof settings._init !== "function") {
          console.error("plugin must implement init function().");
          return;
        }

        if (videoTypes.indexOf(options.videoType) == -1) options.videoType = defaults.videoType;

        settings._init(options);

        this.ready(function () {
          onPlayerReady(_this, options, settings);
        });
      };

      panorama.VERSION = '0.1.7';
      return panorama;
    };

    exports.default = plugin;
  }, {
    "./lib/Detector": 6,
    "./lib/Util": 11,
    "iphone-inline-video": 2
  }],
  14: [function (require, module, exports) {
    'use strict';

    var _Canvas = require('./lib/Canvas');

    var _Canvas2 = _interopRequireDefault(_Canvas);

    var _ThreeCanvas = require('./lib/ThreeCanvas');

    var _ThreeCanvas2 = _interopRequireDefault(_ThreeCanvas);

    var _Notice = require('./lib/Notice');

    var _Notice2 = _interopRequireDefault(_Notice);

    var _HelperCanvas = require('./lib/HelperCanvas');

    var _HelperCanvas2 = _interopRequireDefault(_HelperCanvas);

    var _VRButton = require('./lib/VRButton');

    var _VRButton2 = _interopRequireDefault(_VRButton);

    var _plugin = require('./plugin');

    var _plugin2 = _interopRequireDefault(_plugin);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function getTech(player) {
      return player.tech({
        IWillNotUseThisInPlugins: true
      }).el();
    }

    function getFullscreenToggleClickFn(player) {
      return player.controlBar.fullscreenToggle.handleClick;
    }

    var component = videojs.getComponent('Component');
    var notice = (0, _Notice2.default)(component);
    videojs.registerComponent('Notice', videojs.extend(component, notice));
    var helperCanvas = (0, _HelperCanvas2.default)(component);
    videojs.registerComponent('HelperCanvas', videojs.extend(component, helperCanvas));
    var button = videojs.getComponent("Button");
    var vrBtn = (0, _VRButton2.default)(button);
    videojs.registerComponent('VRButton', videojs.extend(button, vrBtn));
    videojs.plugin('panorama', (0, _plugin2.default)({
      _init: function _init(options) {
        var canvas = options.videoType !== "3dVideo" ? (0, _Canvas2.default)(component, window.THREE, {
          getTech: getTech
        }) : (0, _ThreeCanvas2.default)(component, window.THREE, {
          getTech: getTech
        });
        videojs.registerComponent('Canvas', videojs.extend(component, canvas));
      },
      mergeOption: function mergeOption(defaults, options) {
        return videojs.mergeOptions(defaults, options);
      },
      getTech: getTech,
      getFullscreenToggleClickFn: getFullscreenToggleClickFn
    }));
  }, {
    "./lib/Canvas": 5,
    "./lib/HelperCanvas": 7,
    "./lib/Notice": 9,
    "./lib/ThreeCanvas": 10,
    "./lib/VRButton": 12,
    "./plugin": 13
  }]
}, {}, [14])(function () {
  'use strict';

  var videojs = null;

  if (typeof window.videojs === 'undefined' && typeof require === 'function') {
    videojs = require('video.js');
  } else {
    videojs = window.videojs;
  }

  (function (window, videojs) {
    var videoJsResolutionSwitcher,
        defaults = {
      ui: true
    };
    var MenuItem = videojs.getComponent('MenuItem');
    var ResolutionMenuItem = videojs.extend(MenuItem, {
      constructor: function constructor(player, options) {
        options.selectable = true;
        MenuItem.call(this, player, options);
        this.src = options.src;
        player.on('resolutionchange', videojs.bind(this, this.update));
      }
    });

    ResolutionMenuItem.prototype.handleClick = function (event) {
      MenuItem.prototype.handleClick.call(this, event);
      this.player_.currentResolution(this.options_.label);
    };

    ResolutionMenuItem.prototype.update = function () {
      var selection = this.player_.currentResolution();
      this.selected(this.options_.label === selection.label);
    };

    MenuItem.registerComponent('ResolutionMenuItem', ResolutionMenuItem);
    var MenuButton = videojs.getComponent('MenuButton');
    var ResolutionMenuButton = videojs.extend(MenuButton, {
      constructor: function constructor(player, options) {
        this.label = document.createElement('span');
        options.label = 'Quality';
        MenuButton.call(this, player, options);
        this.el().setAttribute('aria-label', 'Quality');
        this.controlText('Quality');

        if (options.dynamicLabel) {
          videojs.addClass(this.label, 'vjs-resolution-button-label');
          this.el().appendChild(this.label);
        } else {
          var staticLabel = document.createElement('span');
          videojs.addClass(staticLabel, 'vjs-menu-icon');
          this.el().appendChild(staticLabel);
        }

        player.on('updateSources', videojs.bind(this, this.update));
      }
    });

    ResolutionMenuButton.prototype.createItems = function () {
      var menuItems = [];
      var labels = this.sources && this.sources.label || {};

      for (var key in labels) {
        if (labels.hasOwnProperty(key)) {
          menuItems.push(new ResolutionMenuItem(this.player_, {
            label: key,
            src: labels[key],
            selected: key === (this.currentSelection ? this.currentSelection.label : false)
          }));
        }
      }

      return menuItems;
    };

    ResolutionMenuButton.prototype.update = function () {
      this.sources = this.player_.getGroupedSrc();
      this.currentSelection = this.player_.currentResolution();
      this.label.innerHTML = this.currentSelection ? this.currentSelection.label : '';
      return MenuButton.prototype.update.call(this);
    };

    ResolutionMenuButton.prototype.buildCSSClass = function () {
      return MenuButton.prototype.buildCSSClass.call(this) + ' vjs-resolution-button';
    };

    MenuButton.registerComponent('ResolutionMenuButton', ResolutionMenuButton);

    videoJsResolutionSwitcher = function videoJsResolutionSwitcher(options) {
      var settings = videojs.mergeOptions(defaults, options),
          player = this,
          groupedSrc = {},
          currentSources = {},
          currentResolutionState = {};

      player.updateSrc = function (src) {
        if (!src) {
          return player.src();
        }

        src = src.filter(function (source) {
          try {
            return player.canPlayType(source.type) !== '';
          } catch (e) {
            return true;
          }
        });
        this.currentSources = src.sort(compareResolutions);
        this.groupedSrc = bucketSources(this.currentSources);
        var chosen = chooseSrc(this.groupedSrc, this.currentSources);
        this.currentResolutionState = {
          label: chosen.label,
          sources: chosen.sources
        };
        player.trigger('updateSources');
        player.setSourcesSanitized(chosen.sources, chosen.label);
        player.trigger('resolutionchange');
        return player;
      };

      player.currentResolution = function (label, customSourcePicker) {
        if (label == null) {
          return this.currentResolutionState;
        }

        if (!this.groupedSrc || !this.groupedSrc.label || !this.groupedSrc.label[label]) {
          return;
        }

        var sources = this.groupedSrc.label[label];
        var currentTime = player.currentTime();
        var isPaused = player.paused();

        if (!isPaused && this.player_.options_.bigPlayButton) {
          this.player_.bigPlayButton.hide();
        }

        var handleSeekEvent = 'loadeddata';

        if (this.player_.techName_ !== 'Youtube' && this.player_.preload() === 'none' && this.player_.techName_ !== 'Flash') {
          handleSeekEvent = 'timeupdate';
        }

        player.setSourcesSanitized(sources, label, customSourcePicker || settings.customSourcePicker).one(handleSeekEvent, function () {
          player.currentTime(currentTime);
          player.handleTechSeeked_();

          if (!isPaused) {
            player.play().handleTechSeeked_();
          }

          player.trigger('resolutionchange');
        });
        return player;
      };

      player.getGroupedSrc = function () {
        return this.groupedSrc;
      };

      player.setSourcesSanitized = function (sources, label, customSourcePicker) {
        this.currentResolutionState = {
          label: label,
          sources: sources
        };

        if (typeof customSourcePicker === 'function') {
          return customSourcePicker(player, sources, label);
        }

        player.src(sources.map(function (src) {
          return {
            src: src.src,
            type: src.type,
            res: src.res
          };
        }));
        return player;
      };

      function compareResolutions(a, b) {
        if (!a.res || !b.res) {
          return 0;
        }

        return +b.res - +a.res;
      }

      function bucketSources(src) {
        var resolutions = {
          label: {},
          res: {},
          type: {}
        };
        src.map(function (source) {
          initResolutionKey(resolutions, 'label', source);
          initResolutionKey(resolutions, 'res', source);
          initResolutionKey(resolutions, 'type', source);
          appendSourceToKey(resolutions, 'label', source);
          appendSourceToKey(resolutions, 'res', source);
          appendSourceToKey(resolutions, 'type', source);
        });
        return resolutions;
      }

      function initResolutionKey(resolutions, key, source) {
        if (resolutions[key][source[key]] == null) {
          resolutions[key][source[key]] = [];
        }
      }

      function appendSourceToKey(resolutions, key, source) {
        resolutions[key][source[key]].push(source);
      }

      function chooseSrc(groupedSrc, src) {
        var selectedRes = settings['default'];
        var selectedLabel = '';

        if (selectedRes === 'high') {
          selectedRes = src[0].res;
          selectedLabel = src[0].label;
        } else if (selectedRes === 'low' || selectedRes == null || !groupedSrc.res[selectedRes]) {
          selectedRes = src[src.length - 1].res;
          selectedLabel = src[src.length - 1].label;
        } else if (groupedSrc.res[selectedRes]) {
          selectedLabel = groupedSrc.res[selectedRes][0].label;
        }

        return {
          res: selectedRes,
          label: selectedLabel,
          sources: groupedSrc.res[selectedRes]
        };
      }

      function initResolutionForYt(player) {
        var _yts = {
          highres: {
            res: 1080,
            label: '1080',
            yt: 'highres'
          },
          hd1080: {
            res: 1080,
            label: '1080',
            yt: 'hd1080'
          },
          hd720: {
            res: 720,
            label: '720',
            yt: 'hd720'
          },
          large: {
            res: 480,
            label: '480',
            yt: 'large'
          },
          medium: {
            res: 360,
            label: '360',
            yt: 'medium'
          },
          small: {
            res: 240,
            label: '240',
            yt: 'small'
          },
          tiny: {
            res: 144,
            label: '144',
            yt: 'tiny'
          },
          auto: {
            res: 0,
            label: 'auto',
            yt: 'auto'
          }
        };

        var _customSourcePicker = function _customSourcePicker(_player, _sources, _label) {
          player.tech_.ytPlayer.setPlaybackQuality(_sources[0]._yt);
          player.trigger('updateSources');
          return player;
        };

        settings.customSourcePicker = _customSourcePicker;
        player.tech_.ytPlayer.setPlaybackQuality('auto');
        player.tech_.ytPlayer.addEventListener('onPlaybackQualityChange', function (event) {
          for (var res in _yts) {
            if (res.yt === event.data) {
              player.currentResolution(res.label, _customSourcePicker);
              return;
            }
          }
        });
        player.one('play', function () {
          var qualities = player.tech_.ytPlayer.getAvailableQualityLevels();
          var _sources = [];
          qualities.map(function (q) {
            _sources.push({
              src: player.src().src,
              type: player.src().type,
              label: _yts[q].label,
              res: _yts[q].res,
              _yt: _yts[q].yt
            });
          });
          player.groupedSrc = bucketSources(_sources);
          var chosen = {
            label: 'auto',
            res: 0,
            sources: player.groupedSrc.label.auto
          };
          this.currentResolutionState = {
            label: chosen.label,
            sources: chosen.sources
          };
          player.trigger('updateSources');
          player.setSourcesSanitized(chosen.sources, chosen.label, _customSourcePicker);
        });
      }

      player.ready(function () {
        if (settings.ui) {
          var menuButton = new ResolutionMenuButton(player, settings);
          player.controlBar.resolutionSwitcher = player.controlBar.el_.insertBefore(menuButton.el_, player.controlBar.getChild('fullscreenToggle').el_);

          player.controlBar.resolutionSwitcher.dispose = function () {
            this.parentNode.removeChild(this);
          };
        }

        if (player.options_.sources.length > 1) {
          player.updateSrc(player.options_.sources);
        }

        if (player.techName_ === 'Youtube') {
          initResolutionForYt(player);
        }
      });
    };

    videojs.plugin('videoJsResolutionSwitcher', videoJsResolutionSwitcher);
  })(window, videojs);
})();
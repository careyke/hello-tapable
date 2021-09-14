const { AsyncParallelHook } = require("tapable");

const hook = new AsyncParallelHook(["name"]);

hook.tap("tap 1", (name) => {
  console.log("tap 1", name);
});

hook.tapAsync("tapAsync 1", (name, next) => {
  setTimeout(() => {
    console.log("tapAsync 1", name);
    next();
  }, 1000);
});

hook.tapPromise("tapPromise 1", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tapPromise 1", name);
      resolve();
    }, 1000);
  });
});

hook.callAsync("richboy", (result) => {
  console.log("result", result);
});

/**
 * 输出结果：
 * tap 1 richboy
 * tapAsync 1 richboy
 * tapPromise 1 richboy
 * result undefined
 */

/**
 * tapable动态生成的发布函数
 */
function asyncParalleHookFunc(name, _callback) {
  "use strict";
  var _context;
  var _x = this._x;
  do {
    var _counter = 3;
    var _done = function () {
      _callback();
    };
    if (_counter <= 0) break;
    var _fn0 = _x[0];
    var _hasError0 = false;
    try {
      _fn0(name);
    } catch (_err) {
      _hasError0 = true;
      if (_counter > 0) {
        _callback(_err);
        _counter = 0;
      }
    }
    if (!_hasError0) {
      if (--_counter === 0) _done();
    }
    if (_counter <= 0) break;
    var _fn1 = _x[1];
    _fn1(name, function (_err1) {
      if (_err1) {
        if (_counter > 0) {
          _callback(_err1);
          _counter = 0;
        }
      } else {
        if (--_counter === 0) _done();
      }
    });
    if (_counter <= 0) break;
    var _fn2 = _x[2];
    var _hasResult2 = false;
    var _promise2 = _fn2(name);
    if (!_promise2 || !_promise2.then)
      throw new Error(
        "Tap function (tapPromise) did not return promise (returned " +
          _promise2 +
          ")"
      );
    _promise2.then(
      function (_result2) {
        _hasResult2 = true;
        if (--_counter === 0) _done();
      },
      function (_err2) {
        if (_hasResult2) throw _err2;
        if (_counter > 0) {
          _callback(_err2);
          _counter = 0;
        }
      }
    );
  } while (false);
}

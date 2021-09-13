const { AsyncSeriesBailHook } = require("tapable");

const hook = new AsyncSeriesBailHook(["name"]);

hook.tap("tap 1", (name) => {
  console.log("tap 1", name);
});

hook.tapAsync("tapAsync 1", (name, next) => {
  setTimeout(() => {
    console.log("tapAsync 1", name);
    next(undefined, "result");
  }, 1000);
});

hook.tapPromise("tapPromise 1", (name) => {
  return new Promise((resolve, reject) => {
    resolve();
  });
});

hook.callAsync("richboy", (err, result) => {
  console.log("result", result);
});

/**
 * 运行结果：
 * tap 1 richboy
 * tapAsync 1 richboy
 * result result
 */

/**
 * tapable动态生成的发布函数
 * 在串行执行订阅者的回调函数时，如果其中一个回调函数产生了决议值，立刻中断发布流程。
 * 这个决议值作为发布函数的返回值
 */
function asyncSeriesBailHookFunc(name, _callback) {
  "use strict";
  var _context;
  var _x = this._x;
  function _next1() {
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
        if (_result2 !== undefined) {
          _callback(null, _result2);
        } else {
          _callback();
        }
      },
      function (_err2) {
        if (_hasResult2) throw _err2;
        _callback(_err2);
      }
    );
  }
  var _fn0 = _x[0];
  var _hasError0 = false;
  try {
    var _result0 = _fn0(name);
  } catch (_err) {
    _hasError0 = true;
    _callback(_err);
  }
  if (!_hasError0) {
    if (_result0 !== undefined) {
      _callback(null, _result0);
    } else {
      var _fn1 = _x[1];
      _fn1(name, function (_err1, _result1) {
        if (_err1) {
          _callback(_err1);
        } else {
          if (_result1 !== undefined) {
            _callback(null, _result1);
          } else {
            _next1();
          }
        }
      });
    }
  }
}

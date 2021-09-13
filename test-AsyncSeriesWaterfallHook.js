const { AsyncSeriesWaterfallHook } = require("tapable");

const hook = new AsyncSeriesWaterfallHook(["name"]);

hook.tap("tap 1", (name) => {
  console.log("tap 1", name);
  return name + "1";
});

hook.tapAsync("tapAsync 1", (name, next) => {
  setTimeout(() => {
    console.log("tapAsync 1", name);
    next(undefined, name + "2");
  }, 1000);
});

hook.tapPromise("tapPromise 1", (name) => {
  return new Promise((resolve, reject) => {
    console.log("tapPromise 1", name);
    resolve(name + "3");
  });
});

hook.promise("richboy").then((result) => {
  console.log("result", result);
});

/**
 * tapable动态生成的发布函数, 串联执行，依次传值
 */
function asyncSeriesWaterfallHookFunc(name) {
  "use strict";
  var _context;
  var _x = this._x;
  return new Promise(function (_resolve, _reject) {
    var _sync = true;
    function _error(_err) {
      if (_sync)
        _resolve(
          Promise.resolve().then(function () {
            throw _err;
          })
        );
      else _reject(_err);
    }
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
            name = _result2;
          }
          _resolve(name);
        },
        function (_err2) {
          if (_hasResult2) throw _err2;
          _error(_err2);
        }
      );
    }
    var _fn0 = _x[0];
    var _hasError0 = false;
    try {
      var _result0 = _fn0(name);
    } catch (_err) {
      _hasError0 = true;
      _error(_err);
    }
    if (!_hasError0) {
      if (_result0 !== undefined) {
        name = _result0;
      }
      var _fn1 = _x[1];
      _fn1(name, function (_err1, _result1) {
        if (_err1) {
          _error(_err1);
        } else {
          if (_result1 !== undefined) {
            name = _result1;
          }
          _next1();
        }
      });
    }
    _sync = false;
  });
}

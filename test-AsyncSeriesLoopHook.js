const { AsyncSeriesLoopHook } = require("tapable");

const hook = new AsyncSeriesLoopHook(["name"]);

let num1 = 2;
let num2 = 2;
let num3 = 2;

hook.tap("tap 1", (name) => {
  if (num1 > 0) {
    console.log("tap 1", name, num1);
    num1--;
    return num1;
  }
  return undefined;
});

hook.tapAsync("tapAsync 1", (name, next) => {
  setTimeout(() => {
    if (num2 > 0) {
      console.log("tapAsync 1", name, num2);
      num2--;
      next(undefined, name);
    } else {
      next(undefined, undefined);
    }
  }, 1000);
});

hook.tapPromise("tapPromise 1", (name) => {
  return new Promise((resolve, reject) => {
    if (num3 > 0) {
      console.log("tapPromise 1", name, num3);
      num3--;
      resolve(name);
    } else {
      resolve(undefined);
    }
  });
});

hook.promise("richboy").then((result) => {
  console.log("result", result);
});

/**
 * 输出结果：
 * tap 1 richboy 2
 * tap 1 richboy 1
 * tapAsync 1 richboy 2
 * tapAsync 1 richboy 1
 * tapPromise 1 richboy 2
 * tapPromise 1 richboy 1
 * result undefined
 */

/**
 * tapable动态生成的发布函数 逻辑上和SyncLoopHook一致
 */
function asyncSeriesLoopHookFunc(name) {
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
    var _looper = function () {
      var _loopAsync = false;
      var _loop;
      do {
        _loop = false;
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
                _loop = true;
                if (_loopAsync) _looper();
              } else {
                if (!_loop) {
                  _resolve();
                }
              }
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
            _loop = true;
            if (_loopAsync) _looper();
          } else {
            var _fn1 = _x[1];
            _fn1(name, function (_err1, _result1) {
              if (_err1) {
                _error(_err1);
              } else {
                if (_result1 !== undefined) {
                  _loop = true;
                  if (_loopAsync) _looper();
                } else {
                  _next1();
                }
              }
            });
          }
        }
      } while (_loop);
      _loopAsync = true;
    };
    _looper();
    _sync = false;
  });
}

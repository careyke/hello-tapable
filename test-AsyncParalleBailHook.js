const { AsyncParallelBailHook } = require("tapable");

const hook = new AsyncParallelBailHook(["name"]);

hook.tap("tap 1", (name) => {
  console.log("tap 1", name);
});

hook.tapAsync("tapAsync 1", (name, next) => {
  setTimeout(() => {
    console.log("tapAsync 1", name);
    next(undefined, "tapAsync 1 result");
  }, 2000);
});

hook.tapPromise("tapPromise 1", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tapPromise 1", name);
      resolve();
    }, 1000);
  });
});

hook.callAsync("richboy", (err, result) => {
  console.log("result", result);
});

/**
 * 输出结果：
 * tap 1 richboy
 * tapPromise 1 richboy
 * tapAsync 1 richboy
 * result tapAsync 1 result  // 这里输出结果是先执行的任务的决议值，而不是时间上先返回的决议值
 */

/**
 * tapable 动态生成的发布函数
 */
function asyncParalleBailHookFunc(name, _callback) {
  "use strict";
  var _context;
  var _x = this._x;
  var _results = new Array(3);
  var _checkDone = function () {
    for (var i = 0; i < _results.length; i++) {
      var item = _results[i];
      if (item === undefined) return false;
      if (item.result !== undefined) {
        _callback(null, item.result);
        return true;
      }
      if (item.error) {
        _callback(item.error);
        return true;
      }
    }
    return false;
  };
  do {
    var _counter = 3;
    var _done = function () {
      _callback();
    };
    if (_counter <= 0) break;
    var _fn0 = _x[0];
    var _hasError0 = false;
    try {
      var _result0 = _fn0(name);
    } catch (_err) {
      _hasError0 = true;
      if (_counter > 0) {
        if (
          0 < _results.length &&
          ((_results.length = 1), (_results[0] = { error: _err }), _checkDone())
        ) {
          _counter = 0;
        } else {
          if (--_counter === 0) _done();
        }
      }
    }
    if (!_hasError0) {
      if (_counter > 0) {
        // 这里逗号运算符需要注意一下, 插入了一个前置逻辑
        // 本质上是 0 < _results.length && _checkDone()
        if (
          0 < _results.length &&
          (_result0 !== undefined && (_results.length = 1),
          (_results[0] = { result: _result0 }),
          _checkDone())
        ) {
          _counter = 0;
        } else {
          if (--_counter === 0) _done();
        }
      }
    }
    if (_counter <= 0) break;
    if (1 >= _results.length) {
      if (--_counter === 0) _done();
    } else {
      var _fn1 = _x[1];
      _fn1(name, function (_err1, _result1) {
        if (_err1) {
          if (_counter > 0) {
            if (
              1 < _results.length &&
              ((_results.length = 2),
              (_results[1] = { error: _err1 }),
              _checkDone())
            ) {
              _counter = 0;
            } else {
              if (--_counter === 0) _done();
            }
          }
        } else {
          if (_counter > 0) {
            if (
              1 < _results.length &&
              (_result1 !== undefined && (_results.length = 2),
              (_results[1] = { result: _result1 }),
              _checkDone())
            ) {
              _counter = 0;
            } else {
              if (--_counter === 0) _done();
            }
          }
        }
      });
    }
    if (_counter <= 0) break;
    if (2 >= _results.length) {
      if (--_counter === 0) _done();
    } else {
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
          if (_counter > 0) {
            if (
              2 < _results.length &&
              (_result2 !== undefined && (_results.length = 3),
              (_results[2] = { result: _result2 }),
              _checkDone())
            ) {
              _counter = 0;
            } else {
              if (--_counter === 0) _done();
            }
          }
        },
        function (_err2) {
          if (_hasResult2) throw _err2;
          if (_counter > 0) {
            if (
              2 < _results.length &&
              ((_results.length = 3),
              (_results[2] = { error: _err2 }),
              _checkDone())
            ) {
              _counter = 0;
            } else {
              if (--_counter === 0) _done();
            }
          }
        }
      );
    }
  } while (false);
}

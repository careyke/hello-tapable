const { AsyncSeriesHook } = require("tapable");

const hook = new AsyncSeriesHook(["name"]);

hook.tap("tap 1", (name) => {
  console.log("tap 1", name);
});
hook.tap("tap 2", (name) => {
  console.log("tap 2", name);
});

hook.tapAsync("tapAsync 1", (name, cb) => {
  setTimeout(() => {
    console.log("tapAsync 1", name);
    cb();
  }, 1000);
});
hook.tapAsync("tapAsync 2", (name, cb) => {
  setTimeout(() => {
    console.log("tapAsync 2", name);
    cb();
  }, 1000);
});

hook.tapPromise("tapPromise 1", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tapPromise 1", name);
      reject();
    }, 1000);
  });
});
hook.tapPromise("tapPromise 2", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("tapPromise 2", name);
      resolve();
    }, 1000);
  });
});

hook
  .promise("richboy")
  .then((result) => {
    console.log("result", result);
  })
  .catch((err) => {
    console.log("catch", err);
  });

/**
 * 输出结果：
 * tap 1 richboy
 * tap 2 richboy
 * tapAsync 1 richboy
 * tapAsync 2 richboy
 * tapPromise 1 richboy
 * catch undefined
 */


/**
 * tapable动态生成的发布函数
 */
function asyncSeriesHookPromiseFunc(name) {
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
    function _next4() {
      var _fn5 = _x[5];
      var _hasResult5 = false;
      var _promise5 = _fn5(name);
      if (!_promise5 || !_promise5.then)
        throw new Error(
          "Tap function (tapPromise) did not return promise (returned " +
            _promise5 +
            ")"
        );
      _promise5.then(
        function (_result5) {
          _hasResult5 = true;
          _resolve();
        },
        function (_err5) {
          if (_hasResult5) throw _err5;
          _error(_err5);
        }
      );
    }
    function _next3() {
      var _fn4 = _x[4];
      var _hasResult4 = false;
      var _promise4 = _fn4(name);
      if (!_promise4 || !_promise4.then)
        throw new Error(
          "Tap function (tapPromise) did not return promise (returned " +
            _promise4 +
            ")"
        );
      _promise4.then(
        function (_result4) {
          _hasResult4 = true;
          _next4();
        },
        function (_err4) {
          if (_hasResult4) throw _err4;
          _error(_err4);
        }
      );
    }
    function _next2() {
      var _fn3 = _x[3];
      _fn3(name, function (_err3) {
        if (_err3) {
          _error(_err3);
        } else {
          _next3();
        }
      });
    }
    var _fn0 = _x[0];
    var _hasError0 = false;
    try {
      _fn0(name);
    } catch (_err) {
      _hasError0 = true;
      _error(_err);
    }
    if (!_hasError0) {
      var _fn1 = _x[1];
      var _hasError1 = false;
      try {
        _fn1(name);
      } catch (_err) {
        _hasError1 = true;
        _error(_err);
      }
      if (!_hasError1) {
        var _fn2 = _x[2];
        _fn2(name, function (_err2) {
          if (_err2) {
            _error(_err2);
          } else {
            _next2();
          }
        });
      }
    }
    _sync = false;
  });
}

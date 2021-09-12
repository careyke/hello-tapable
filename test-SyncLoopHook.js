const { SyncLoopHook } = require("tapable");

const hook = new SyncLoopHook(["name"]);

let num1 = 5;
let num2 = 5;

hook.tap("1", (name) => {
  if (num1) {
    const str = `1 ${name} ${num1}`;
    num1--;
    console.log(str);
    return str;
  } else {
    console.log(`1 ${name} undefined`);
    return undefined;
  }
});

hook.tap("2", (name) => {
  if (num2) {
    const str = `2 ${name} ${num2}`;
    num2--;
    console.log(str);
    return str;
  } else {
    console.log(`2 ${name} undefined`);
    return undefined;
  }
});

hook.call("richboy");
/**
 * 输出结果:
 * 1 richboy 5
 * 1 richboy 4
 * 1 richboy 3
 * 1 richboy 2
 * 1 richboy 1
 * 1 richboy undefined
 * 2 richboy 5
 * 1 richboy undefined
 * 2 richboy 4
 * 1 richboy undefined
 * 2 richboy 3
 * 1 richboy undefined
 * 2 richboy 2
 * 1 richboy undefined
 * 2 richboy 1
 * 1 richboy undefined
 * 2 richboy undefined
 * 无返回值
 */

/**
 * tapable生成的发布函数
 * 回调函数集合中只要其中一个回调函数有返回值，就需要重新串行执行一次
 */
function syncLoopHookFunc(name) {
  "use strict";
  var _context;
  var _x = this._x;
  var _loop;
  do {
    _loop = false;
    var _fn0 = _x[0];
    var _result0 = _fn0(name);
    if (_result0 !== undefined) {
      _loop = true;
    } else {
      var _fn1 = _x[1];
      var _result1 = _fn1(name);
      if (_result1 !== undefined) {
        _loop = true;
      } else {
        if (!_loop) {
        }
      }
    }
  } while (_loop);
}

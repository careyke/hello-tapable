const { SyncBailHook } = require("tapable");

const hook = new SyncBailHook(["name"]);

hook.tap("1", (name) => {
  console.log(`1 hello ${name}`);
});

hook.tap("2", (name) => {
  console.log(`2 hello ${name}`);
  return "break";
});

hook.tap("3", (name) => {
  console.log(`3 hello ${name}`);
});

hook.call("richboy");
/**
 * 输出结果：
 * 1 hello richboy
 * 2 hello richboy
 * @return: 'break'
 */

/**
 * tapable动态生成的发布函数
 */
function syncBailHookFunc(name) {
  "use strict";
  var _context;
  var _x = this._x;
  var _fn0 = _x[0];
  var _result0 = _fn0(name);
  if (_result0 !== undefined) {
    return _result0;
  } else {
    var _fn1 = _x[1];
    var _result1 = _fn1(name);
    if (_result1 !== undefined) {
      return _result1;
    } else {
      var _fn2 = _x[2];
      var _result2 = _fn2(name);
      if (_result2 !== undefined) {
        return _result2;
      } else {
      }
    }
  }
}

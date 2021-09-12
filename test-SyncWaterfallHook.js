const { SyncWaterfallHook } = require("tapable");

const hook = new SyncWaterfallHook(["name"]);

hook.tap("1", (name) => {
  console.log(`1 ${name}`);
});

hook.tap("2", (name) => {
  console.log(`2 ${name}`);
  return name + "2";
});

hook.tap("3", (name) => {
  console.log(`3 ${name}`);
});

hook.tap("4", (name) => {
  console.log(`4 ${name}`);
  return name + "4";
});

hook.tap("5", (name) => {
  console.log(`5 ${name}`);
});

hook.call("richboy");

/**
 * 输出结果：
 * 1 richboy
 * 2 richboy
 * 3 richboy2
 * 4 richboy2
 * 5 richboy24
 * @returns 'richboy24'
 */

/**
 * tapable 生成的发布函数
 */
function syncWaterfallHookFunc(name) {
  "use strict";
  var _context;
  var _x = this._x;
  var _fn0 = _x[0];
  var _result0 = _fn0(name);
  if (_result0 !== undefined) {
    name = _result0;
  }

  var _fn1 = _x[1];
  var _result1 = _fn1(name);
  if (_result1 !== undefined) {
    name = _result1;
  }

  var _fn2 = _x[2];
  var _result2 = _fn2(name);
  if (_result2 !== undefined) {
    name = _result2;
  }

  var _fn3 = _x[3];
  var _result3 = _fn3(name);
  if (_result3 !== undefined) {
    name = _result3;
  }

  var _fn4 = _x[4];
  var _result4 = _fn4(name);
  if (_result4 !== undefined) {
    name = _result4;
  }
  return name;
}

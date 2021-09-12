const { SyncHook } = require("tapable");

const hook = new SyncHook(["name"]);

hook.tap("1", (name) => {
  console.log(`1 ${name}`);
});

hook.tap("2", (name) => {
  console.log(`2 ${name}`);
});

hook.tap({ name: "3", before: "2" }, (name) => {
  console.log(`3 ${name}`);
});

hook.tap({ name: "4", stage: 3 }, (name) => {
  console.log(`4 ${name}`);
});

hook.tap({ name: "5", stage: 1 }, (name) => {
  console.log(`5 ${name}`);
});

hook.tap({ name: "6", before: "10" }, (name) => {
  console.log(`6 ${name}`);
});

hook.call("richboy");
/**
 * 输出结果
 * 6 richboy
 * 1 richboy
 * 3 richboy
 * 2 richboy
 * 5 richboy
 * 4 richboy
 */


/**
 * tapable 动态生成的发布函数
 */
function syncHookFunc(name) {
  "use strict";
  var _context;
  var _x = this._x;
  var _fn0 = _x[0];
  _fn0(name);
  var _fn1 = _x[1];
  _fn1(name);
  var _fn2 = _x[2];
  _fn2(name);
  var _fn3 = _x[3];
  _fn3(name);
  var _fn4 = _x[4];
  _fn4(name);
  var _fn5 = _x[5];
  _fn5(name);
}

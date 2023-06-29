var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/_object.ts
import structuredClone from "@ungap/structured-clone";
var _Object = Object.freeze({
  exclude: (obj, exclude) => {
    const clone = structuredClone(obj);
    for (let i of exclude) {
      if (clone[i]) {
        delete clone[i];
      }
    }
    return clone;
  },
  deepClone: (obj) => {
    return structuredClone(obj);
  },
  refine: (obj) => {
    const wildCards = {
      undefined: void 0,
      null: null,
      false: false,
      true: true
    };
    const clone = structuredClone(obj);
    const keys = Object.keys(clone);
    const _wildcards = Object.keys(wildCards);
    for (let k of keys) {
      if (_wildcards.includes(clone[k])) {
        clone[k] = wildCards[clone[k]];
      }
    }
    return clone;
  },
  merge: (obj, add) => {
    const fresh = structuredClone(obj);
    return __spreadValues(__spreadValues({}, fresh), add);
  }
});
export {
  _Object
};

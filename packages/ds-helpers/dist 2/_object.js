var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  _Object: () => _Object
});
var import_structured_clone = __toModule(require("@ungap/structured-clone"));
const _Object = Object.freeze({
  exclude: (obj, exclude) => {
    const clone = (0, import_structured_clone.default)(obj);
    for (let i of exclude) {
      if (clone[i]) {
        delete clone[i];
      }
    }
    return clone;
  },
  deepClone: (obj) => {
    return (0, import_structured_clone.default)(obj);
  },
  refine: (obj) => {
    const wildCards = {
      undefined: void 0,
      null: null,
      false: false,
      true: true
    };
    const clone = (0, import_structured_clone.default)(obj);
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
    const fresh = (0, import_structured_clone.default)(obj);
    return __spreadValues(__spreadValues({}, fresh), add);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _Object
});

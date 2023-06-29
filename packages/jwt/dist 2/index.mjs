var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var __filename, __dirname;
var init_esm_shims = __esm({
  "../../node_modules/tsup/assets/esm_shims.js"() {
    __filename = fileURLToPath(import.meta.url);
    __dirname = path.dirname(__filename);
  }
});

// ../../node_modules/proses-response/dist/response-handler.js
var require_response_handler = __commonJS({
  "../../node_modules/proses-response/dist/response-handler.js"(exports) {
    init_esm_shims();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.responseHandler = void 0;
    var ResponseHandler = class {
      constructor() {
        this.dbDialect = "mysql";
      }
      registerLoggers({ err, info, warn }) {
        this.errLogger = err;
        this.infoLogger = info;
        this.warnLogger = warn;
      }
      registerEncryption(encryptionFunc) {
        this.encryption = encryptionFunc;
      }
      registerDialect(dbdialect) {
        this.dbDialect = dbdialect;
      }
    };
    exports.responseHandler = new ResponseHandler();
  }
});

// ../../node_modules/proses-response/dist/response.js
var require_response = __commonJS({
  "../../node_modules/proses-response/dist/response.js"(exports) {
    init_esm_shims();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requiredFields = exports.alreadyExist = exports.other = exports.unauthorized = exports.notFound = exports.serverError = exports.success = void 0;
    var response_handler_1 = require_response_handler();
    var success = (res, data, msg) => {
      if (response_handler_1.responseHandler.encryption) {
        data = response_handler_1.responseHandler.encryption(data);
      }
      res.status(200).send({ data, msg });
    };
    exports.success = success;
    var handleConflict = (err) => {
      var _a, _b;
      if (response_handler_1.responseHandler.dbDialect == "mssql") {
        return ((_a = err === null || err === void 0 ? void 0 : err.original) === null || _a === void 0 ? void 0 : _a.number) === 547;
      }
      if (response_handler_1.responseHandler.dbDialect == "mysql") {
        return ((_b = err === null || err === void 0 ? void 0 : err.original) === null || _b === void 0 ? void 0 : _b.errno) === 1451;
      }
      return false;
    };
    var serverError = (res, err) => {
      if (res.headersSent)
        return;
      if (response_handler_1.responseHandler.errLogger) {
        response_handler_1.responseHandler.errLogger(err);
      }
      if (handleConflict(err)) {
        res.status(409).send({ status: 0, msg: "Already in use" });
      } else {
        res.status(500).send({ err });
      }
    };
    exports.serverError = serverError;
    var notFound = (res, msg) => {
      res.status(404).send(msg);
    };
    exports.notFound = notFound;
    var unauthorized2 = (res, msg) => {
      res.status(401).send(msg);
    };
    exports.unauthorized = unauthorized2;
    var other = (res, msg) => {
      res.status(400).send(msg);
    };
    exports.other = other;
    var alreadyExist = (res, msg) => {
      res.status(409).send(msg);
    };
    exports.alreadyExist = alreadyExist;
    var requiredFields = (res, err) => {
      res.status(422).json({ required: err });
    };
    exports.requiredFields = requiredFields;
  }
});

// ../../node_modules/proses-response/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/proses-response/dist/index.js"(exports) {
    init_esm_shims();
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_response(), exports);
    __exportStar(require_response_handler(), exports);
  }
});

// index.ts
init_esm_shims();
var import_proses_response = __toModule(require_dist());
import {
  config
} from "dotenv";
import jwt from "jsonwebtoken";
config();
var Jwtinstance = class {
  constructor({ interceptor, customErrorHandler }) {
    this.secret = process.env.secret || "zxcasdqwemnblkjpoi";
    this.expiry = process.env.expiry || "12h";
    this.generateToken = (payload) => {
      return jwt.sign(payload, this.secret);
    };
    this.tokenMiddleWare = (req, res, next) => {
      try {
        const token = req.header("x-identity-token");
        if (!token) {
          return (0, import_proses_response.unauthorized)(res, "Invalid token");
        }
        const decoded = jwt.verify(token, this.secret);
        if (this._interCeptor) {
          this._interCeptor(decoded);
        }
        req.user = decoded;
        this.currentUser = decoded;
        next();
      } catch (error) {
        if (this._customErrorHandler) {
          this._customErrorHandler(error);
        } else {
          (0, import_proses_response.unauthorized)(res, "token expired");
        }
      }
    };
    this.decodeToken = (token) => {
      try {
        const decode = jwt.verify(token, this.secret);
        return decode;
      } catch (error) {
        return false;
      }
    };
    this._customErrorHandler = customErrorHandler;
    this._interCeptor = interceptor;
  }
};
var jwt_default = Jwtinstance;
export {
  jwt_default as default
};

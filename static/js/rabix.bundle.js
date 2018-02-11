/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 70);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(6);
var ErrorCode_1 = __webpack_require__(1);
exports.ensureArray = function (map, key, valueKey) {
    // object is not defined or is null, return an empty array
    if (map === undefined || map === null)
        return [];
    if (Array.isArray(map)) {
        // if the object is already an array of objects, we don't want to transform it
        if (typeof map[0] === "object" || key === undefined) {
            return map.slice();
        }
        else {
            // if it's an array of something else, transform each element into {key: <any>item}
            return map.map(function (item) {
                return (_a = {}, _a[key] = item, _a);
                var _a;
            });
        }
    }
    // if the object is a primitive, wrap it in an array
    if (typeof map === "string" || typeof map === "number" || typeof map === "boolean") {
        return [map];
    }
    // if the object is a hashmap, transform it accordingly
    return Object.keys(map).map(function (prop) {
        /*
         if a valueKey is provided and the property isn't already an object, create an object from the valueKey
         e.g.: map = {foo: "bar"}, key = "id", valueKey = "type"

         return value is [ {id: "foo", type: "bar"} ];
         */
        if (valueKey && exports.checkMapValueType(map) !== "object" && exports.checkValueType(map[prop]) !== "object") {
            return __assign((_a = {}, _a[valueKey] = map[prop], _a), (_b = {}, _b[key] = prop, _b));
        }
        /*
         if they property is already an object, add its hashmap key under the property key provided as a param
         e.g.: map = {foo: {bar: "baz"}}, key = "id", valueKey = "type"

         return value is [ {id: "foo", bar: "baz"} ];
         */
        return __assign({}, map[prop], (_c = {}, _c[key] = prop, _c));
        var _a, _b, _c;
    });
};
/**
 * Checks the type of each property in a hashMap. Returns "mismatch" if property types are mixed,
 * otherwise returns type that corresponds to all properties.
 */
exports.checkMapValueType = function (map) {
    var type = null;
    Object.keys(map).forEach(function (key) {
        var valType = exports.checkValueType(map[key]);
        if (type && valType !== type) {
            type = "mismatch";
            return type;
        }
        else {
            type = valType;
        }
    });
    return type;
};
exports.checkValueType = function (value) {
    var valType;
    if (Array.isArray(value)) {
        valType = "array";
    }
    else if (value === null) {
        valType = "null";
    }
    else if (typeof value === "object") {
        valType = "object";
    }
    else {
        valType = typeof value;
    }
    return valType;
};
exports.incrementString = function (str) {
    var replaced = str.replace(/^(.*?)(\d+$)/gi, function (all, $1, $2) {
        return $1 + ++$2;
    });
    if (replaced === str)
        return str + "_1";
    return replaced;
};
exports.spreadAllProps = function (destObj, sourceObj) {
    return __assign({}, destObj, sourceObj);
};
exports.spreadSelectProps = function (sourceObj, destObj, keys) {
    Object.keys(sourceObj).forEach(function (key) {
        if (keys.indexOf(key) === -1 && sourceObj[key] !== undefined) {
            destObj[key] = sourceObj[key];
        }
    });
};
exports.intersection = function (arrA, arrB) {
    if (arrA === void 0) { arrA = []; }
    if (arrB === void 0) { arrB = []; }
    return arrA.filter(function (item) {
        return arrB.indexOf(item) !== -1;
    });
};
exports.commaSeparatedToArray = function (str) {
    if (!str)
        return [];
    if (Array.isArray(str))
        return str;
    return str.replace(/\s/g, "").split(",");
};
exports.charSeparatedToArray = function (str, pattern) {
    if (!str)
        return [];
    if (Array.isArray(str))
        return str;
    return str.split(pattern).map(function (s) { return s.trim(); });
};
exports.snakeCase = function (str) {
    if (str === void 0) { str = ""; }
    return str.replace(/[\s.\[\/\]-]+/g, "_").replace(/([A-Z])/g, function (match) { return "_" + match.toLowerCase(); });
};
exports.isEmpty = function (obj) {
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    else if (typeof obj === "object" && obj !== null) {
        return Object.keys(obj).length === 0;
    }
};
exports.fetchByLoc = function (obj, loc) {
    // change "foo.bar[3]['baz']" to "foo.bar.3.'baz'"
    loc = loc.replace(/\[/g, ".[").replace(/[\[\]]/g, "");
    // to ["foo", "bar", "3", "'baz'"]
    var tokens = loc.split(".").filter(function (tok) { return tok.length; });
    var result = obj;
    while (tokens.length) {
        // take first token, remove quotes
        var token = tokens.shift().replace(/["']/g, "");
        // attempt to access property
        try {
            // if token is number, cast to int
            if (!isNaN(token)) {
                result = result[parseInt(token, 10)];
            }
            else {
                // otherwise access property
                result = result[token];
            }
        }
        catch (ex) {
            // if property doesn't exist, return undefined
            return undefined;
        }
    }
    return result;
};
exports.cleanupNull = function (obj) {
    var keys = Object.keys(obj);
    var tmp = __assign({}, obj);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (obj[key] === undefined || obj[key] === null) {
            delete tmp[key];
        }
    }
    return tmp;
};
exports.nullifyObjValues = function (obj) {
    var keys = Object.keys(obj);
    var tmp = __assign({}, obj);
    for (var i = 0; i < keys.length; i++) {
        tmp[keys[i]] = null;
    }
    return tmp;
};
exports.validateID = function (id) {
    if (!id) {
        throw new ErrorCode_1.ValidityError("ID must be set", ErrorCode_1.ErrorCode.ID_MISSING);
    }
    if (!constants_1.ID_REGEX.test(id)) {
        throw new ErrorCode_1.ValidityError("ID \"" + id + "\" contains invalid characters", ErrorCode_1.ErrorCode.ID_INVALID_CHAR);
    }
};
exports.incrementLastLoc = function (items, prefix) {
    if (items === void 0) { items = []; }
    if (items.length === 0) {
        return prefix + "[0]";
    }
    var lastItem = items[items.length - 1];
    var match = ((lastItem.loc.match(/\[(\d+)]$/g) || [""])[0].match(/\d+/g) || [""])[0];
    if (!match)
        return null;
    match = parseInt(match);
    return prefix + "[" + ++match + "]";
};
/**
 * Returns true if port is of type or type[]
 * If type is an array, will check if port is single item or array of any of types
 * @param port
 * @param type
 */
exports.isType = function (port, type) {
    if (!port.type || !port.type.type) {
        return false;
    }
    if (typeof type === "string")
        type = [type];
    return type.filter(function (t) { return port.type.type === t || port.type.items === t; }).length > 0;
};
exports.checkIfConnectionIsValid = function (pointA, pointB, ltr) {
    if (ltr === void 0) { ltr = true; }
    // if both ports belong to the same step, connection is not possible
    if (pointA.parentStep && pointB.parentStep && pointA.parentStep.id === pointB.parentStep.id) {
        throw new ErrorCode_1.ValidityError("Invalid connection. Source and destination ports belong to the same step", ErrorCode_1.ErrorCode.CONNECTION_SAME_STEP);
    }
    var getType = function (type) {
        if (typeof type === "string") {
            return type;
        }
        if (Array.isArray(type)) {
            return "union";
        }
        if (typeof type === "object" && type !== null) {
            return "object";
        }
    };
    // fetch type
    var pointAType = pointA.type.type;
    var pointBType = pointB.type.type;
    var pointAItems = getType(pointA.type.items);
    var pointBItems = getType(pointB.type.items);
    // match types, defined types can be matched with undefined types
    if (pointAType === pointBType // match exact type
        || ((pointAItems === pointBType || pointAItems === "union") && !ltr) //match File[] to File
        || ((pointBItems === pointAType || pointBItems === "union") && ltr) // match File to File[]
        || pointAType === "null"
        || pointBType === "null") {
        // If union[] -> any[] or vice versa
        if (pointBItems === "union" || pointAItems === "union") {
            return true;
        }
        // If record[] -> object[] or vice versa
        if ((pointBItems === "record" && pointAItems === "object")
            || (pointAItems === "record" && pointBItems === "object")) {
            return true;
        }
        // if both are arrays but not of the same type
        if (pointAItems && pointBItems && pointAItems !== pointBItems) {
            throw new ErrorCode_1.ValidityError("Invalid connection. Connection type mismatch, attempting to connect \"" + pointAItems + "[]\" to \"" + pointBItems + "[]\"", ErrorCode_1.ErrorCode.CONNECTION_TYPE);
        }
        // if type match is file, and fileTypes are defined on both ports,
        // match only if fileTypes match
        if ((pointAType === "File" || pointAItems === "File") && pointB.fileTypes.length && pointA.fileTypes.length) {
            if (!!exports.intersection(pointB.fileTypes.map(function (type) { return type.toLowerCase(); }), pointA.fileTypes.map(function (type) { return type.toLowerCase(); })).length) {
                return true;
            }
            else {
                throw new ErrorCode_1.ValidityError("Invalid connection. File type mismatch, connecting formats \"" + pointA.fileTypes + "\" to \"" + pointB.fileTypes + "\"", ErrorCode_1.ErrorCode.CONNECTION_FILE_TYPE);
            }
        }
        // if not file or fileTypes not defined
        return true;
    }
    // if types are both defined and do not match
    var pointATypeOutput = pointAItems ? "\"" + pointAItems + "[]\"" : "\"" + pointAType + "\"";
    var pointBTypeOutput = pointBItems ? "\"" + pointBItems + "[]\"" : "\"" + pointBType + "\"";
    throw new ErrorCode_1.ValidityError("Invalid connection. Connection type mismatch, attempting to connect " + pointATypeOutput + " to " + pointBTypeOutput, ErrorCode_1.ErrorCode.CONNECTION_TYPE);
};
exports.flatten = function (arr) {
    var _flatten = function (arr, res) {
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i];
            if (Array.isArray(a)) {
                _flatten(a, res);
            }
            else {
                res.push(a);
            }
        }
    };
    var res = [];
    _flatten(arr, res);
    return res;
};
exports.returnNumIfNum = function (s) {
    return isNaN(s) ? s : parseInt(s);
};
exports.isFileType = function (i, required) {
    var requiredMatches = required === undefined || i.type.isNullable !== required;
    return i.type && requiredMatches && (i.type.type === "File" || i.type.items === "File");
};
exports.hasFileType = function (port) {
    if (exports.isFileType(port))
        return true;
    if (Array.isArray(port.type.fields)) {
        for (var i = 0; i < port.type.fields.length; i++) {
            var field = port.type.fields[i];
            if (exports.hasFileType(field))
                return true;
        }
    }
    return false;
};
/**
 * Returns the next available ID based on the provided ID which is unique in the given array.
 * @param {string} id
 * @param {Array<{id: string}>} set
 * @returns {string}
 */
exports.getNextAvailableId = function (id, set) {
    var hasId = true;
    var result = id;
    var len = set.length;
    while (hasId) {
        hasId = false;
        // loop through all inputs and outputs to verify id uniqueness
        for (var i = 0; i < len; i++) {
            if (set[i].id === result) {
                hasId = true;
                // if id exists, increment and check the uniqueness of the incremented id
                result = exports.incrementString(result);
            }
        }
    }
    return result;
};
exports.checkIdValidity = function (id, scope) {
    exports.validateID(id);
    var next = exports.getNextAvailableId(id, scope);
    if (next !== id) {
        throw new ErrorCode_1.ValidityError("ID \"" + id + "\" already exists in this tool, the next available id is \"" + next + "\"", ErrorCode_1.ErrorCode.ID_DUPLICATE);
    }
};
exports.concatIssues = function (base, add, overwrite) {
    var addKeys = Object.keys(add);
    for (var i = 0; i < addKeys.length; i++) {
        var key = addKeys[i];
        // base[key] is an array and add[key] is an item or an array, can be concatenated
        if (base[key] && add[key] !== null) {
            if (overwrite) {
                base[key] = (Array.isArray(add[key]) ? add[key] : [add[key]]);
            }
            else {
                var toAdd = (Array.isArray(add[key]) ? add[key] : [add[key]]);
                for (var i_1 = 0; i_1 < toAdd.length; i_1++) {
                    if (!exports.issueExistsInArray(base[key], toAdd[i_1])) {
                        base[key].push(toAdd[i_1]);
                    }
                }
            }
        }
        else {
            if (Array.isArray(add[key]) || add[key] === null) {
                base[key] = add[key];
            }
            else {
                base[key] = [add[key]];
            }
        }
    }
    return base;
};
exports.issueExistsInArray = function (arr, item) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].code === item.code && arr[i].message === item.message) {
            return true;
        }
    }
    return false;
};
exports.checkPortIdUniqueness = function (ports) {
    var map = {};
    var duplicate = [];
    for (var i = 0; i < ports.length; i++) {
        var p = ports[i];
        if (map[p.id]) {
            duplicate.push(p);
        }
        else {
            map[p.id] = true;
        }
    }
    if (duplicate.length > 0) {
        for (var i = 0; i < duplicate.length; i++) {
            var port = duplicate[i];
            port.setIssue((_a = {},
                _a[port.loc + ".id"] = {
                    type: "error",
                    code: ErrorCode_1.ErrorCode.ID_DUPLICATE,
                    message: "Duplicate id found: \u201C" + port.id + "\u201D"
                },
                _a));
        }
    }
    var _a;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["ALL"] = 0] = "ALL";
    ErrorCode[ErrorCode["ID_ALL"] = 100] = "ID_ALL";
    ErrorCode[ErrorCode["ID_INVALID_CHAR"] = 101] = "ID_INVALID_CHAR";
    ErrorCode[ErrorCode["ID_MISSING"] = 102] = "ID_MISSING";
    ErrorCode[ErrorCode["ID_DUPLICATE"] = 103] = "ID_DUPLICATE";
    ErrorCode[ErrorCode["EXPR_ALL"] = 200] = "EXPR_ALL";
    ErrorCode[ErrorCode["EXPR_SYNTAX"] = 201] = "EXPR_SYNTAX";
    ErrorCode[ErrorCode["EXPR_REFERENCE"] = 202] = "EXPR_REFERENCE";
    ErrorCode[ErrorCode["EXPR_TYPE"] = 203] = "EXPR_TYPE";
    ErrorCode[ErrorCode["EXPR_NOT_JSON"] = 204] = "EXPR_NOT_JSON";
    ErrorCode[ErrorCode["CONNECTION_ALL"] = 300] = "CONNECTION_ALL";
    ErrorCode[ErrorCode["CONNECTION_TYPE"] = 301] = "CONNECTION_TYPE";
    ErrorCode[ErrorCode["CONNECTION_FILE_TYPE"] = 302] = "CONNECTION_FILE_TYPE";
    ErrorCode[ErrorCode["CONNECTION_SAME_STEP"] = 303] = "CONNECTION_SAME_STEP";
    ErrorCode[ErrorCode["OUTPUT_ALL"] = 400] = "OUTPUT_ALL";
    ErrorCode[ErrorCode["OUTPUT_GLOB_MISSING"] = 401] = "OUTPUT_GLOB_MISSING";
    ErrorCode[ErrorCode["OUTPUT_EVAL_EXPR"] = 402] = "OUTPUT_EVAL_EXPR";
    ErrorCode[ErrorCode["OUTPUT_EVAL_INHERIT"] = 403] = "OUTPUT_EVAL_INHERIT";
    ErrorCode[ErrorCode["TYPE_ALL"] = 500] = "TYPE_ALL";
    ErrorCode[ErrorCode["TYPE_FIELDS_MISSING"] = 501] = "TYPE_FIELDS_MISSING";
    ErrorCode[ErrorCode["TYPE_ITEMS_MISSING"] = 502] = "TYPE_ITEMS_MISSING";
    ErrorCode[ErrorCode["TYPE_SYMBOLS_MISSING"] = 503] = "TYPE_SYMBOLS_MISSING";
    ErrorCode[ErrorCode["TYPE_NAME_MISSING"] = 504] = "TYPE_NAME_MISSING";
    ErrorCode[ErrorCode["TYPE_EXTRA_PROPS"] = 505] = "TYPE_EXTRA_PROPS";
    ErrorCode[ErrorCode["TYPE_UNSUPPORTED"] = 506] = "TYPE_UNSUPPORTED";
    ErrorCode[ErrorCode["TYPE_FIELD_DUPLICATE_ID"] = 507] = "TYPE_FIELD_DUPLICATE_ID";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var ValidityError = /** @class */ (function (_super) {
    __extends(ValidityError, _super);
    function ValidityError(str, code) {
        var _this = _super.call(this, str) || this;
        _this.code = code;
        return _this;
    }
    return ValidityError;
}(Error));
exports.ValidityError = ValidityError;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var ValidationBase = /** @class */ (function () {
    function ValidationBase(loc) {
        this.issues = {};
        this._errors = [];
        this._warnings = [];
        this.hasNewErrors = false;
        this.hasNewWarnings = false;
        this.modelListeners = [];
        this.loc = "";
        this.updateParentValidation = function (event) {
        };
        this.loc = loc || "";
        this.issues[this.loc] = [];
    }
    ValidationBase.prototype.clearListeners = function () {
        this.modelListeners.forEach(function (l) { return l(); });
    };
    ;
    Object.defineProperty(ValidationBase.prototype, "warnings", {
        get: function () {
            if (this.hasNewWarnings) {
                this._warnings = this.filterIssues("warning");
                this.hasNewWarnings = false;
            }
            return this._warnings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationBase.prototype, "errors", {
        get: function () {
            if (this.hasNewErrors) {
                this._errors = this.filterIssues("error");
                this.hasNewErrors = false;
            }
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    ValidationBase.prototype.updateValidity = function (event) {
        // sets these issues with the event received
        this.issues = utils_1.concatIssues(this.issues, event.data, event.overwrite);
        this.hasNewErrors = true;
        this.hasNewWarnings = true;
        // sometimes we want to contain warnings/info to the objects where they occur
        if (!event.stopPropagation) {
            this.updateParentValidation(event);
        }
    };
    ValidationBase.prototype.setIssue = function (data, stopPropagation) {
        if (stopPropagation === void 0) { stopPropagation = false; }
        this.updateValidity({ data: data, overwrite: false, stopPropagation: stopPropagation });
    };
    ValidationBase.prototype.clearIssue = function (code) {
        var hadIssue = false;
        var isGroup = code % 100 === 0;
        var group = code / 100;
        for (var key in this.issues) {
            if (this.issues[key].length) {
                if (code === ErrorCode_1.ErrorCode.ALL) {
                    hadIssue = true;
                    this.issues[key] = [];
                }
                else {
                    var initLen = this.issues[key].length;
                    this.issues[key] = this.issues[key].filter(function (i) {
                        if (isGroup) {
                            return Math.floor(i.code / 100) !== group;
                        }
                        return i.code !== code;
                    });
                    hadIssue = initLen !== this.issues[key].length || hadIssue;
                }
            }
        }
        if (hadIssue) {
            this.updateValidity({
                data: this.issues,
                overwrite: true
            });
        }
    };
    /**
     * @deprecated
     */
    ValidationBase.prototype.cleanValidity = function () {
    };
    /**
     * Updates location and propagates validity up the tree
     * @param newLoc
     */
    ValidationBase.prototype.updateLoc = function (newLoc) {
        var oldLoc = this.loc;
        this.issues[newLoc] = this.issues[oldLoc];
        delete this.issues[oldLoc];
        this.loc = newLoc;
        // @todo this doesn't change the location of all nested children!
        this.updateValidity({
            data: this.issues,
            overwrite: true
        });
    };
    ValidationBase.prototype.setValidationCallback = function (fn) {
        this.updateParentValidation = fn;
    };
    /**
     * @param {"warning" | "error" | "info"} type
     * @returns {Array}
     */
    ValidationBase.prototype.filterIssues = function (type) {
        if (type === void 0) { type = "error"; }
        var res = [];
        var _loop_1 = function (key) {
            if (this_1.issues[key].length) {
                var filter = this_1.issues[key].filter(function (i) { return i.type === type; });
                var map = filter.map(function (i) { return (__assign({}, i, { loc: key })); });
                res = res.concat(map);
            }
        };
        var this_1 = this;
        for (var key in this.issues) {
            _loop_1(key);
        }
        return res;
    };
    /**
     * @deprecated
     * @param args
     * @returns {Promise<any>}
     */
    ValidationBase.prototype.validate = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        new UnimplementedMethodException_1.UnimplementedMethodException("validate");
        return new Promise(function (res) {
            res(_this.issues);
        });
    };
    return ValidationBase;
}());
exports.ValidationBase = ValidationBase;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UnimplementedMethodException = /** @class */ (function () {
    function UnimplementedMethodException(method, parent) {
        //Temporarily disabling this log so it doesn't pollute actual debugging
        // const prefix = `${parent || ""}${parent ? "." : ""}`;
        // console.warn(`Expected child class to implement ${prefix}${method}.`);
    }
    return UnimplementedMethodException;
}());
exports.UnimplementedMethodException = UnimplementedMethodException;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TypeResolver_1 = __webpack_require__(29);
var ValidationBase_1 = __webpack_require__(2);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var ParameterTypeModel = /** @class */ (function (_super) {
    __extends(ParameterTypeModel, _super);
    function ParameterTypeModel(type, fieldConstructor, nameBase, loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.customProps = {};
        _this.hasDirectoryType = false;
        _this._items = null;
        _this.isNullable = false;
        _this.isItemOrArray = false;
        _this.typeBinding = null;
        _this.fields = null;
        _this._symbols = null;
        _this.name = null;
        _this.unionType = null;
        _this.nameBase = "field";
        _this.fieldConstructor = fieldConstructor;
        _this.eventHub = eventHub;
        _this.nameBase = nameBase;
        _this.deserialize(type);
        return _this;
    }
    Object.defineProperty(ParameterTypeModel.prototype, "symbols", {
        get: function () {
            return this._symbols;
        },
        set: function (value) {
            this._symbols = value;
            if (this.eventHub) {
                this.eventHub.emit("io.change.type", this.loc);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterTypeModel.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (t) {
            if (t && this._type !== "array") {
                throw ("ParameterTypeModel: Items can only be set to inputs type Array");
            }
            else if (t !== undefined && this._items !== t) {
                switch (t) {
                    case "enum":
                        this._symbols = [];
                        this.removeAllFields();
                        break;
                    case "record":
                        this.fields = [];
                        this._symbols = null;
                        break;
                    default:
                        this._symbols = null;
                        this.removeAllFields();
                }
                this._items = t;
                if (this.eventHub) {
                    this.eventHub.emit("io.change.type", this.loc);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParameterTypeModel.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (t) {
            if (t !== undefined && this._type === t) {
                return;
            }
            this._type = t;
            switch (t) {
                case "array":
                    this._symbols = null;
                    this.removeAllFields();
                    break;
                case "enum":
                    this._items = null;
                    this.removeAllFields();
                    this._symbols = this._symbols || [];
                    break;
                case "record":
                    this._items = null;
                    this._symbols = null;
                    this.fields = this.fields || [];
                    break;
                default:
                    this._items = null;
                    this._symbols = null;
                    this.removeAllFields();
            }
            if (this.eventHub) {
                this.eventHub.emit("io.change.type", this.loc);
            }
        },
        enumerable: true,
        configurable: true
    });
    ParameterTypeModel.prototype.validate = function (context) {
        var _this = this;
        if (context === void 0) { context = {}; }
        this.clearIssue(ErrorCode_1.ErrorCode.TYPE_ALL);
        var promises = [];
        // check type
        // if array, has items. Does not have symbols or items
        if (this.type === "array") {
            if (this.items === null) {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        type: "error",
                        message: "Type array must have items",
                        code: ErrorCode_1.ErrorCode.TYPE_ITEMS_MISSING
                    },
                    _a));
            }
            if (this._symbols && this.items !== "enum") {
                this.setIssue((_b = {},
                    _b[this.loc + ".symbols"] = {
                        type: "error",
                        message: "Type array must not have symbols",
                        code: ErrorCode_1.ErrorCode.TYPE_SYMBOLS_MISSING
                    },
                    _b));
            }
            if (this.fields && this.items !== "record") {
                this.setIssue((_c = {},
                    _c[this.loc + ".fields"] = {
                        type: "error",
                        message: "Type array must not have fields",
                        code: ErrorCode_1.ErrorCode.TYPE_FIELDS_MISSING
                    },
                    _c));
            }
        }
        // if enum, has symbols. Does not have items or fields. Has name.
        if (this.type === "enum") {
            if (this.items) {
                this.setIssue((_d = {},
                    _d[this.loc + ".items"] = {
                        type: "error",
                        message: "Type enum must not have items",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _d));
            }
            if (!this._symbols) {
                this.setIssue((_e = {},
                    _e[this.loc] = {
                        type: "error",
                        message: "Type enum must have symbols",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _e));
            }
            if (this.fields) {
                this.setIssue((_f = {},
                    _f[this.loc + ".fields"] = {
                        type: "error",
                        message: "Type enum must not have fields",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _f));
            }
            if (!this.name) {
                this.setIssue((_g = {},
                    _g["" + this.loc] = {
                        type: "error",
                        message: "Type enum must have a name",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _g));
            }
        }
        // if record, has fields. Does not have items or symbols. Has name.
        if (this.type === "record") {
            if (this.items) {
                this.setIssue((_h = {},
                    _h[this.loc + ".items"] = {
                        type: "error",
                        message: "Type record must not have items",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _h));
            }
            if (this._symbols) {
                this.setIssue((_j = {},
                    _j[this.loc + ".symbols"] = {
                        type: "error",
                        message: "Type record must not have symbols",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _j));
            }
            if (!this.fields) {
                this.setIssue((_k = {},
                    _k["" + this.loc] = {
                        type: "error",
                        message: "Type record must have fields",
                        code: ErrorCode_1.ErrorCode.TYPE_EXTRA_PROPS
                    },
                    _k));
            }
            else {
                // promises.concat(this.fields.map(field => field.validate(context)));
            }
            if (!this.name) {
                this.setIssue((_l = {},
                    _l[this.loc + ".type"] = {
                        type: "error",
                        message: "Type record must have a name",
                        code: ErrorCode_1.ErrorCode.TYPE_NAME_MISSING
                    },
                    _l));
            }
        }
        if (this.unionType) {
            this.setIssue((_m = {},
                _m[this.loc] = {
                    type: "info",
                    message: "Union type is not supported yet: " + this.unionType,
                    code: ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED
                },
                _m));
        }
        return Promise.all(promises).then(function (res) {
            return _this.issues;
        });
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    };
    ParameterTypeModel.prototype.serialize = function (version) {
        var type = TypeResolver_1.TypeResolver.serializeType(this, version);
        if (typeof type === "object" && !Array.isArray(type) && version !== "v1.0" && type !== null) {
            type = __assign({}, type, this.customProps);
        }
        return type;
    };
    ParameterTypeModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["type", "name", "_symbols", "fields", "items", "inputBinding", "outputBinding"];
        try {
            TypeResolver_1.TypeResolver.resolveType(attr, this);
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[this.loc] = {
                    message: ex.message,
                    type: "error",
                    code: ex.code
                },
                _a));
        }
        // populates object with all custom attributes not covered in model
        if (typeof attr === "object" && attr !== null && !Array.isArray(attr)) {
            utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
        }
        if (this.fields) {
            this.fields = utils_1.ensureArray(this.fields, "name", "type").map(function (field, index) {
                var f = new _this.fieldConstructor(field, _this.loc + ".fields[" + index + "]", _this.eventHub);
                f.isField = true;
                f.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return f;
            });
        }
        var _a;
    };
    ParameterTypeModel.prototype.updateLoc = function (loc) {
        var _this = this;
        _super.prototype.updateLoc.call(this, loc);
        if (this.fields && this.fields.length) {
            this.fields.forEach(function (f, i) { return f.updateLoc(_this.loc + ".fields[" + i + "]"); });
        }
    };
    ParameterTypeModel.prototype.setType = function (t) {
        this._type = t;
        switch (t) {
            case "array":
                this._symbols = null;
                this.removeAllFields();
                break;
            case "enum":
                this._items = null;
                this.removeAllFields();
                break;
            case "record":
                this._items = null;
                this._symbols = null;
                break;
        }
        if (this.eventHub) {
            this.eventHub.emit("io.change.type", this.loc);
        }
    };
    ParameterTypeModel.prototype.getNextAvailableName = function (id) {
        var hasId = true;
        var result = id;
        var set = this.fields;
        var len = set.length;
        while (hasId) {
            hasId = false;
            // loop through all inputs and outputs to verify id uniqueness
            for (var i = 0; i < len; i++) {
                if (set[i].id === result) {
                    hasId = true;
                    // if id exists, increment and check the uniqueness of the incremented id
                    result = utils_1.incrementString(result);
                }
            }
        }
        return result;
    };
    ParameterTypeModel.prototype.addField = function (field) {
        var _this = this;
        if (field === void 0) { field = {}; }
        if (this.type !== "record" && this.items !== "record") {
            throw new Error("Fields can only be added to type or items record: type is " + this.type + ", items is " + this.items + ".");
        }
        else {
            if (field.id) {
                var duplicate = this.fields.filter(function (val) {
                    return val.id === field.name
                        || val.id === field.id;
                });
                if (duplicate.length > 0) {
                    this.setIssue((_a = {},
                        _a[this.loc] = {
                            message: "Field with name \"" + duplicate[0].id + "\" already exists",
                            type: "error",
                            code: ErrorCode_1.ErrorCode.TYPE_FIELD_DUPLICATE_ID
                        },
                        _a));
                }
            }
            if (field instanceof this.fieldConstructor) {
                field.loc = this.loc + ".fields[" + this.fields.length + "]";
                field.setValidationCallback(function (err) { return _this.updateValidity(err); });
                if (this.eventHub) {
                    this.eventHub.emit("field.create", field);
                }
                this.fields.push(field);
                return field;
            }
            else {
                field.name = field.name || this.getNextAvailableName(this.nameBase);
                var loc = utils_1.incrementLastLoc(this.fields, this.loc + ".fields");
                var f = new this.fieldConstructor(field, loc, this.eventHub);
                f.setValidationCallback(function (err) { return _this.updateValidity(err); });
                if (this.eventHub) {
                    this.eventHub.emit("field.create", f);
                }
                this.fields.push(f);
                return f;
            }
        }
        var _a;
    };
    ParameterTypeModel.prototype.removeField = function (field) {
        var found;
        if (typeof field === "string") {
            found = this.fields.filter(function (val) { return val.id === field; })[0];
        }
        else {
            found = field;
        }
        found.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var index = this.fields.indexOf(found);
        if (index < 0) {
            throw ("Field " + field + " does not exist on input");
        }
        this.fields.splice(index, 1);
        for (var i = index; i < this.fields.length; i++) {
            this.fields[i].updateLoc(this.loc + ".fields[" + i + "]");
        }
        if (this.eventHub) {
            this.eventHub.emit("field.remove", found);
        }
    };
    ParameterTypeModel.prototype.removeAllFields = function () {
        if (this.fields && this.fields.length) {
            this.fields.forEach(function (f) {
                f.clearIssue(ErrorCode_1.ErrorCode.ALL);
            });
        }
        this.fields = null;
    };
    return ParameterTypeModel;
}(ValidationBase_1.ValidationBase));
exports.ParameterTypeModel = ParameterTypeModel;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionModel_1 = __webpack_require__(9);
var ExpressionEvaluator_1 = __webpack_require__(18);
var V1ExpressionModel = /** @class */ (function (_super) {
    __extends(V1ExpressionModel, _super);
    function V1ExpressionModel(expression, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.value = "";
        _this.tokens = [];
        if (expression instanceof V1ExpressionModel) {
            expression = expression.serialize();
        }
        if (expression)
            _this.deserialize(expression);
        if (_this.eventHub) {
            _this.eventHub.emit("expression.create", _this);
        }
        return _this;
    }
    V1ExpressionModel.prototype.serialize = function () {
        if (this.type === "expression" && this.eventHub) {
            this.eventHub.emit("expression.serialize", true);
        }
        return this.value !== "" ? this.value : undefined;
    };
    V1ExpressionModel.prototype.deserialize = function (attr) {
        if (typeof attr === "string") {
            this.value = attr;
            this.tokenizeAndSetType(attr);
        }
    };
    V1ExpressionModel.prototype.tokenizeAndSetType = function (str) {
        // parse expression
        this.tokens = ExpressionEvaluator_1.ExpressionEvaluator.grabExpressions(str || "") || [];
        // if expression is literal, type is string, otherwise it's complex (expression or function)
        this.type = this.tokens.length === 1 && this.tokens[0].type === "literal" || this.tokens.length === 0 ? "string" : "expression";
        return this.tokens;
    };
    V1ExpressionModel.prototype.evaluate = function (context) {
        if (context === void 0) { context = this.cachedContext; }
        if (this.value !== undefined) {
            return this._evaluate(this.value, context, "v1.0");
        }
        return new Promise(function (res) {
            res(undefined);
        });
    };
    V1ExpressionModel.prototype.setValue = function (val, type) {
        this.result = undefined;
        this.tokenizeAndSetType(val);
        this.value = val;
        if (this.eventHub) {
            this.eventHub.emit("expression.change", this);
        }
    };
    V1ExpressionModel.prototype.getScript = function () {
        return this.value;
    };
    V1ExpressionModel.prototype.toString = function () {
        return this.value || "";
    };
    V1ExpressionModel.prototype.clone = function () {
        return new V1ExpressionModel(this.serialize(), this.loc, this.eventHub);
    };
    V1ExpressionModel.prototype.cloneStatus = function (clone) {
        this.setValue(clone.serialize());
        this.setIssue(__assign({}, clone.issues));
    };
    return V1ExpressionModel;
}(ExpressionModel_1.ExpressionModel));
exports.V1ExpressionModel = V1ExpressionModel;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.STEP_INPUT_CONNECTION_PREFIX = "in/";
exports.STEP_OUTPUT_CONNECTION_PREFIX = "out/";
exports.ID_REGEX = /^[a-zA-Z0-9_;/?\-:@&=+$,.#!~*'()\[\]]*$/;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionModel_1 = __webpack_require__(9);
var SBDraft2ExpressionModel = /** @class */ (function (_super) {
    __extends(SBDraft2ExpressionModel, _super);
    function SBDraft2ExpressionModel(value, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        // guard against passing something that is already wrapped
        if (value instanceof SBDraft2ExpressionModel) {
            value = value.serialize();
        }
        _this.deserialize(value);
        if (value) {
            _this.type = value.script ? "expression" : "string";
        }
        if (_this.eventHub) {
            _this.eventHub.emit("expression.create", _this);
        }
        return _this;
    }
    /**
     * Evaluates expression and sets its result to result property.
     *
     * If expression throws a SyntaxError, no result is returned and the syntax error is pushed to
     * validation.errors. If expression throws any other exception, it is pushed to validation.warnings
     *
     * @param context
     * @returns {any}
     */
    SBDraft2ExpressionModel.prototype.evaluate = function (context) {
        if (context === void 0) { context = this.cachedContext; }
        if (this.value !== undefined) {
            return this._evaluate(this.value, context, "draft-2");
        }
        return new Promise(function (res) { res(undefined); });
    };
    /**
     * Returns CWL representation.
     */
    SBDraft2ExpressionModel.prototype.serialize = function () {
        if (this.type === "expression" && this.eventHub) {
            this.eventHub.emit("expression.serialize", true);
        }
        if (this.value && this.value.hasOwnProperty("script") && this.value.script === "") {
            return undefined;
        }
        else if (this.value === "" || this.value === null) {
            return undefined;
        }
        return this.value;
    };
    /**
     * Sets CWL representation as internal value
     */
    SBDraft2ExpressionModel.prototype.deserialize = function (val) {
        if (val === void 0) { val = ""; }
        this.value = val;
    };
    /**
     * Sets value of expression.script or primitive based on type parameter.
     */
    SBDraft2ExpressionModel.prototype.setValue = function (val, type) {
        this.result = undefined;
        if (type === "expression" && typeof val === "string") {
            this.value = {
                "class": "Expression",
                engine: "#cwl-js-engine",
                script: val.trim() === "" ? "" : val
            };
        }
        else {
            this.value = val;
        }
        this.type = type;
        if (this.eventHub) {
            this.eventHub.emit("expression.change", this);
        }
    };
    /**
     * Returns string representation of expression.script or primitive value.
     * @returns {string}
     */
    SBDraft2ExpressionModel.prototype.toString = function () {
        if (this.type === "expression") {
            return this.value.script;
        }
        else if (this.value === null || this.value === undefined) {
            return "";
        }
        else {
            return this.value.toString();
        }
    };
    /**
     * Returns script value of expression.script, or undefined if not set.
     * @returns {string}
     */
    SBDraft2ExpressionModel.prototype.getScript = function () {
        return this.value !== undefined && this.value !== null ?
            this.value.script :
            undefined;
    };
    SBDraft2ExpressionModel.prototype.clone = function () {
        return new SBDraft2ExpressionModel(this.serialize(), this.loc, this.eventHub);
    };
    SBDraft2ExpressionModel.prototype.cloneStatus = function (clone) {
        this.setValue(clone.serialize(), clone.type);
        this.setIssue(__assign({}, clone.issues));
    };
    return SBDraft2ExpressionModel;
}(ExpressionModel_1.ExpressionModel));
exports.SBDraft2ExpressionModel = SBDraft2ExpressionModel;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PluginBase = /** @class */ (function () {
    function PluginBase() {
    }
    PluginBase.prototype.registerWorkflow = function (workflow) {
        this.workflow = workflow;
    };
    PluginBase.prototype.registerOnBeforeChange = function (fn) {
        this.onBeforeChange = fn;
    };
    PluginBase.prototype.registerOnAfterChange = function (fn) {
        this.onAfterChange = fn;
    };
    PluginBase.prototype.registerOnAfterRender = function (fn) {
        this.onAfterRender = fn;
    };
    return PluginBase;
}());
exports.PluginBase = PluginBase;
//# sourceMappingURL=plugin-base.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var ExpressionEvaluator_1 = __webpack_require__(18);
var ErrorCode_1 = __webpack_require__(1);
var ExpressionModel = /** @class */ (function (_super) {
    __extends(ExpressionModel, _super);
    function ExpressionModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        _this.cachedContext = {};
        /** Internal type */
        _this._type = "string";
        return _this;
    }
    Object.defineProperty(ExpressionModel.prototype, "type", {
        /** Getter for model type. Returns internal representation */
        get: function () {
            return this._type;
        },
        /** Setter for model type. Model holds either expression or primitive like "string" */
        set: function (type) {
            if (type !== "string" && type !== "expression" && type !== "number") {
                throw new TypeError("Unknown ExpressionModel type. \"" + type + "\" does not exist or is not supported yet.");
            }
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExpressionModel.prototype, "isExpression", {
        /** Flag if model contains expression */
        get: function () {
            return this.type === "expression";
        },
        enumerable: true,
        configurable: true
    });
    ;
    ExpressionModel.prototype.validate = function (context) {
        var _this = this;
        return this.evaluate(context).then(function (suc) {
            _this.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
        }, function (err) {
            _this.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
            _this.setIssue((_a = {},
                _a[_this.loc] = {
                    type: err.type,
                    message: err.message,
                    code: err.code
                },
                _a));
            var _a;
        });
    };
    ExpressionModel.prototype._evaluate = function (value, context, version) {
        var _this = this;
        return new Promise(function (res, rej) {
            ExpressionEvaluator_1.ExpressionEvaluator.evaluate(value, context, version).then(function (suc) {
                _this.result = suc;
                res(suc);
            }, function (ex) {
                var message = ex.message;
                var code = ErrorCode_1.ErrorCode.EXPR_SYNTAX;
                if (ex.message.startsWith("Uncaught DataCloneError")) {
                    message = "Error: Return value should have transferable data (fully JSON-serializable)";
                    code = ErrorCode_1.ErrorCode.EXPR_NOT_JSON;
                }
                var err = { loc: _this.loc, message: message, code: code };
                if (ex.message.startsWith("Uncaught SyntaxError") || ex.name === "SyntaxError") {
                    rej(Object.assign({ type: "error" }, err));
                }
                else {
                    if (ex.message.startsWith("Uncaught ReferenceError") || ex.name === "ReferenceError") {
                        code = ErrorCode_1.ErrorCode.EXPR_REFERENCE;
                    }
                    else if (ex.message.startsWith("Uncaught TypeError") || ex.name === "TypeError") {
                        code = ErrorCode_1.ErrorCode.EXPR_TYPE;
                    }
                    rej(Object.assign({ type: "warning", code: code }, err));
                }
            });
        });
    };
    return ExpressionModel;
}(ValidationBase_1.ValidationBase));
exports.ExpressionModel = ExpressionModel;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var CommandInputParameterModel = /** @class */ (function (_super) {
    __extends(CommandInputParameterModel, _super);
    function CommandInputParameterModel(loc, event) {
        var _this = _super.call(this, loc) || this;
        /** Flag if input is field of a parent record. Derived from type field */
        _this.isField = false;
        _this.customProps = {};
        _this.eventHub = event;
        return _this;
    }
    Object.defineProperty(CommandInputParameterModel.prototype, "isBound", {
        get: function () {
            return this.inputBinding !== undefined && this.inputBinding !== null;
        },
        enumerable: true,
        configurable: true
    });
    CommandInputParameterModel.prototype.removeInputBinding = function () {
        if (this.inputBinding) {
            this.inputBinding.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
        }
        if (!this.hasSecondaryFilesInRoot) {
            this.secondaryFiles.forEach(function (f) { return f.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
            this.secondaryFiles = [];
        }
        this.inputBinding = null;
    };
    CommandInputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    CommandInputParameterModel.prototype._addSecondaryFile = function (file, exprConstructor, locBase) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.secondaryFiles, locBase + ".secondaryFiles");
        var f = new exprConstructor(file, loc, this.eventHub);
        this.secondaryFiles.push(f);
        f.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return f;
    };
    CommandInputParameterModel.prototype._updateSecondaryFiles = function (files) {
        var _this = this;
        this.secondaryFiles.forEach(function (f) { return f.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
        this.secondaryFiles = [];
        files.forEach(function (f) { return _this.addSecondaryFile(f); });
    };
    CommandInputParameterModel.prototype._removeSecondaryFile = function (index) {
        var file = this.secondaryFiles[index];
        if (file) {
            file.setValue("", "string");
            this.secondaryFiles.splice(index, 1);
        }
    };
    CommandInputParameterModel.prototype.validate = function (context) {
        var promises = [];
        // id
        try {
            utils_1.validateID(this.id);
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[this.loc + ".id"] = {
                    type: "error",
                    message: ex.message,
                    code: ex.code
                },
                _a));
        }
        // inputBinding
        if (this.inputBinding) {
            promises.push(this.inputBinding.validate(context));
        }
        // type
        if (this.type) {
            promises.push(this.type.validate(context));
        }
        // secondaryFiles
        if (this.secondaryFiles) {
            promises.concat(this.secondaryFiles.map(function (file) { return file.validate(context); }));
        }
        return Promise.all(promises);
        var _a;
    };
    CommandInputParameterModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "CommandInputParameterModel");
        return undefined;
    };
    CommandInputParameterModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "CommandInputParameterModel");
    };
    CommandInputParameterModel.prototype.attachFileTypeListeners = function () {
        var _this = this;
        if (this.eventHub) {
            this.modelListeners.push(this.eventHub.on("io.change.type", function (loc) {
                if (_this.loc + ".type" === loc) {
                    if (!utils_1.isFileType(_this)) {
                        _this.updateSecondaryFiles([]);
                    }
                }
            }));
        }
    };
    return CommandInputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.CommandInputParameterModel = CommandInputParameterModel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(6);
var EventHub_1 = __webpack_require__(45);
var Graph_1 = __webpack_require__(46);
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ValidationBase_1 = __webpack_require__(2);
var V1WorkflowOutputParameterModel_1 = __webpack_require__(47);
var RequirementBaseModel_1 = __webpack_require__(14);
var StepModel_1 = __webpack_require__(19);
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var WorkflowOutputParameterModel_1 = __webpack_require__(17);
var WorkflowStepInputModel_1 = __webpack_require__(20);
var WorkflowStepOutputModel_1 = __webpack_require__(21);
var ErrorCode_1 = __webpack_require__(1);
var WorkflowModel = /** @class */ (function (_super) {
    __extends(WorkflowModel, _super);
    function WorkflowModel(loc) {
        var _this = _super.call(this, loc) || this;
        _this["class"] = "Workflow";
        _this.hasBatch = false;
        _this.steps = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.hints = [];
        _this.customProps = {};
        _this.eventHub = new EventHub_1.EventHub([
            "step.create",
            "step.remove",
            "step.change",
            "step.update",
            "step.change.id",
            "step.inPort.show",
            "step.inPort.hide",
            "step.inPort.remove",
            "step.inPort.create",
            "step.outPort.remove",
            "step.outPort.create",
            "step.port.change",
            "connections.updated",
            "input.remove",
            "input.create",
            "output.create",
            "output.remove",
            "io.change",
            "io.change.id",
            "io.change.type",
            "connection.create",
            "connection.remove"
        ]);
        _this.initializeGraphWatchers();
        return _this;
    }
    Object.defineProperty(WorkflowModel.prototype, "connections", {
        get: function () {
            return Array.from(this.graph.edges);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowModel.prototype, "nodes", {
        get: function () {
            return Array.from(this.graph.vertices);
        },
        enumerable: true,
        configurable: true
    });
    WorkflowModel.prototype.addVertex = function (connectionId, node, graph) {
        if (graph === void 0) { graph = this.graph; }
        try {
            graph.addVertex(connectionId, node, function onConflict() {
                node.id = this.getNextAvailableId(node.connectionId, !(node instanceof StepModel_1.StepModel), graph);
                graph.addVertex(node.connectionId, node, onConflict);
            }.bind(this));
        }
        catch (ex) {
            node.setIssue((_a = {},
                _a[node.loc] = {
                    message: ex.message,
                    code: ex.code,
                    type: "error"
                },
                _a));
        }
        var _a;
    };
    WorkflowModel.prototype.initializeGraphWatchers = function () {
        var _this = this;
        /**
         * Adds inPort to graph
         * called on step update
         * @name step.inPort.create
         * @see StepModel.compareInPorts
         */
        this.eventHub.on("step.inPort.create", function (port) {
            _this.addVertex(port.connectionId, port);
            _this.graph.addEdge({
                id: port.connectionId,
                type: "StepInput"
            }, {
                id: port.parentStep.id,
                type: "Step"
            }, false);
        });
        /**
         * Adds outPort to graph
         * called on step update
         * @name step.outPort.create
         * @see StepModel.compareOutPorts
         */
        this.eventHub.on("step.outPort.create", function (port) {
            _this.addVertex(port.connectionId, port);
            _this.graph.addEdge({
                id: port.parentStep.id,
                type: "Step"
            }, {
                id: port.connectionId,
                type: "StepOutput"
            }, false);
        });
        /**
         * Remove input port
         * called when step is updated StepModel.setRunProcess
         * @name step.inPort.remove
         * @see StepModel.compareInPorts
         */
        this.eventHub.on("step.inPort.remove", function (port) {
            _this.clearPort(port);
            _this.graph.removeVertex(port.connectionId);
            // clean up connection between port and step
            _this.graph.removeEdge([port.connectionId, port.parentStep.connectionId]);
        });
        /**
         * Remove output port
         * called when step is updated
         * @name step.outPort.remove
         * @see StepModel.compareOutPorts
         */
        this.eventHub.on("step.outPort.remove", function (port) {
            _this.clearOutPort(port);
            _this.graph.removeVertex(port.connectionId);
            // clean up connection between step and port
            _this.graph.removeEdge([port.parentStep.connectionId, port.connectionId]);
        });
        /**
         * Changes value of existing node in workflow
         * called when step is updated
         * @name step.port.change
         * @see StepModel.compareOutPorts
         * @see StepModel.compareInPorts
         */
        this.eventHub.on("step.port.change", function (port) {
            _this.graph.setVertexData(port.connectionId, port);
            // check if port is connected to a workflow output
            if (port instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel && _this.graph.hasOutgoing(port.connectionId)) {
                var temporaryEdges = Array.from(_this.graph.edges);
                temporaryEdges.forEach(function (e) {
                    if (e.source.id === port.connectionId) {
                        var oldOutput = _this.findById(e.destination.id);
                        // make sure the destination is a workflow output and is only connected to the port which changed
                        if (!(oldOutput instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) || oldOutput.source.length !== 1)
                            return;
                        // remove the outdated workflow output first to avoid an infinite loop and duplicate ids
                        _this.removeOutput(oldOutput);
                        // create a new workflow output in place of the one which changed
                        _this.createOutputFromPort(port.connectionId, { customProps: oldOutput.customProps });
                    }
                });
            }
        });
    };
    WorkflowModel.prototype.on = function (event, handler) {
        return {
            dispose: this.eventHub.on(event, handler)
        };
    };
    WorkflowModel.prototype.off = function (event, handler) {
        this.eventHub.off(event, handler);
    };
    WorkflowModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        new UnimplementedMethodException_1.UnimplementedMethodException("serializeEmbedded", "WorkflowModel");
    };
    WorkflowModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "WorkflowModel");
    };
    WorkflowModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "WorkflowModel");
    };
    WorkflowModel.prototype.addHint = function (hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addHint", "WorkflowModel");
        return null;
    };
    WorkflowModel.prototype.createReq = function (req, constructor, loc, hint) {
        var _this = this;
        if (hint === void 0) { hint = false; }
        var reqModel;
        var property = hint ? "hints" : "requirements";
        loc = loc || this.loc + "." + property + "[" + this[property].length + "]";
        reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, constructor, loc);
        reqModel.isHint = hint;
        this[property].push(reqModel);
        reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return reqModel;
    };
    WorkflowModel.prototype.setBatch = function (input, type) {
    };
    ;
    WorkflowModel.prototype.findById = function (connectionId) {
        return this.graph.getVertexData(connectionId);
    };
    WorkflowModel.prototype._exposePort = function (inPort, inputConstructor) {
        // remove extraneous connections to this port and set it as invisible
        this.clearPort(inPort);
        return this._createInputFromPort(inPort, inputConstructor, false, true);
    };
    /**
     * Expose creates an input on the workflow level and connects it with the exposed port
     * Sets inPort.isVisible to false
     * Sets input.isVisible to false
     */
    WorkflowModel.prototype.exposePort = function (inPort) {
        new UnimplementedMethodException_1.UnimplementedMethodException("exposePort", "WorkflowModel");
    };
    /**
     * Adds inPort to graph and makes a connection between it and its step
     * sets inPort.isVisible to true
     *
     * @name step.inPort.show
     */
    WorkflowModel.prototype.includePort = function (inPort) {
        // check if port was exposed before including it
        if (inPort.status === "exposed") {
            this.clearPort(inPort);
        }
        // add port to canvas
        inPort.isVisible = true;
        // if the port has not been added to the graph yet
        if (!this.graph.hasVertex(inPort.connectionId)) {
            this.addVertex(inPort.connectionId, inPort);
            this.graph.addEdge({
                id: inPort.parentStep.id,
                type: "StepInput"
            }, {
                id: inPort.connectionId,
                type: "Step"
            }, true);
        }
        this.eventHub.emit("step.inPort.show", inPort);
    };
    /**
     * Removes connections to port to out/inputs, removes dangling inputs, sets port to invisible
     *
     * @name step.inPort.hide
     */
    WorkflowModel.prototype.clearPort = function (inPort) {
        // loop through sources, removing their connections and clearing dangling inputs
        while (inPort.source.length) {
            // because disconnect will remove the source once disconnected, we'll just reference it here
            var source = inPort.source[0];
            var sourceConnectionId = this.getSourceConnectionId(source);
            // disconnect takes care of edges and dangling inputs
            this.disconnect(sourceConnectionId, inPort.connectionId);
        }
        // remove visibility on the port so it isn't shown on canvas anymore
        inPort.isVisible = false;
        // send an event so the canvas knows it should hide it
        this.eventHub.emit("step.inPort.hide", inPort);
        inPort.clearIssue(ErrorCode_1.ErrorCode.ALL);
    };
    WorkflowModel.prototype.clearOutPort = function (outPort) {
        var _this = this;
        this.graph.edges.forEach(function (e) {
            // if the edge is connected to the output, it needs to be cleared and removed
            if (e.source.id === outPort.connectionId) {
                // if a connection is found, disconnect it
                // this handles dangling outputs
                _this.disconnect(outPort.connectionId, e.destination.id);
            }
        });
        outPort.isVisible = false;
    };
    /**
     * Checks if a workflow input has been leftover after removing
     */
    WorkflowModel.prototype.removeDanglingInput = function (connectionId) {
        var _this = this;
        // remove dangling input if it has been left over
        if (!this.graph.hasOutgoing(connectionId)) {
            this.graph.removeVertex(connectionId);
            this.inputs = this.inputs.filter(function (input) {
                if (input.connectionId === connectionId) {
                    _this.eventHub.emit("input.remove", input);
                    return false;
                }
                return true;
            });
        }
    };
    WorkflowModel.prototype.removeDanglingOutput = function (connectionId) {
        var _this = this;
        if (!this.graph.hasIncoming(connectionId)) {
            this.graph.removeVertex(connectionId);
            this.outputs = this.outputs.filter(function (output) {
                if (output.connectionId === connectionId) {
                    output.clearIssue(ErrorCode_1.ErrorCode.ALL);
                    _this.eventHub.emit("output.remove", output);
                    return false;
                }
                return true;
            });
        }
    };
    /**
     * Removes step from workflow and from graph
     * removes all connections to step and cleans up dangling inputs
     * @param step
     */
    WorkflowModel.prototype.removeStep = function (step) {
        if (typeof step === "string") {
            step = this.graph.getVertexData(step);
        }
        // remove step from wf.steps
        for (var i = 0; i < this.steps.length; i++) {
            if (this.steps[i].id === step.id) {
                this.steps[i].clearIssue(ErrorCode_1.ErrorCode.ALL);
                this.steps.splice(i, 1);
                break;
            }
        }
        // remove step from graph and remove all connections
        this.removeStepFromGraph(step);
        // removes inputs that were connected solely to step.in
        var inp = this.inputs.length;
        while (inp--) {
            this.removeDanglingInput(this.inputs[inp].connectionId);
        }
        // removes outputs that were connected solely to step.out
        var out = this.outputs.length;
        while (out--) {
            this.removeDanglingOutput(this.outputs[out].connectionId);
        }
        var dests = this.gatherDestinations();
        for (var j = 0; j < dests.length; j++) {
            for (var i = 0; i < step.out.length; i++) {
                var indexOf = dests[j].source.indexOf(step.out[i].sourceId);
                if (indexOf > -1) {
                    dests[j].source.splice(indexOf, 1);
                    this.validateDestination(dests[j]);
                }
            }
        }
        step.cleanValidity();
        this.eventHub.emit("step.remove", step);
    };
    WorkflowModel.prototype.removeStepFromGraph = function (step) {
        var _this = this;
        // remove step node from graph
        this.graph.removeVertex(step.connectionId);
        var stepIn = step.in.map(function (i) { return i.connectionId; });
        var stepOut = step.out.map(function (o) { return o.connectionId; });
        // clean up connections between in/out ports and other nodes
        // and in/out ports and the step itself
        this.graph.edges.forEach(function (edge) {
            if (stepIn.indexOf(edge.destination.id) !== -1 ||
                stepOut.indexOf(edge.source.id) !== -1) {
                _this.eventHub.emit("connection.remove", _this.graph.getVertexData(edge.source.id), _this.graph.getVertexData(edge.destination.id));
                _this.graph.removeEdge(edge);
            }
            else if (edge.destination.id === step.connectionId ||
                edge.source.id === step.connectionId) {
                _this.graph.removeEdge(edge);
            }
        });
        // remove in ports and out ports from graph
        stepIn.forEach(function (input) { return _this.graph.removeVertex(input); });
        stepOut.forEach(function (output) { return _this.graph.removeVertex(output); });
    };
    /**
     * Removes input from workflow and from graph
     * removes all connections
     * @param input
     */
    WorkflowModel.prototype.removeInput = function (input) {
        if (typeof input === "string") {
            input = this.graph.getVertexData(input);
        }
        // remove input from list of inputs on workflow model
        for (var i = 0; i < this.inputs.length; i++) {
            if (this.inputs[i].id == input.id) {
                this.inputs[i].clearIssue(ErrorCode_1.ErrorCode.ALL);
                this.inputs.splice(i, 1);
                break;
            }
        }
        // remove input from graph and remove connections
        this.removeIONodeFromGraph(input);
        // remove dangling outputs, in case one was attached solely to the input being removed
        for (var i = 0; i < this.outputs.length; i++) {
            this.removeDanglingOutput(this.outputs[i].connectionId);
        }
        var dests = this.gatherDestinations();
        // remove source from step.in ports
        for (var i = 0; i < dests.length; i++) {
            var indexOf = dests[i].source.indexOf(input.sourceId);
            if (indexOf !== -1) {
                dests[i].source.splice(indexOf, 1);
            }
        }
        this.eventHub.emit("input.remove", input);
    };
    /**
     * Removes output from workflow and from graph
     * removes all connections
     * @param output
     */
    WorkflowModel.prototype.removeOutput = function (output) {
        if (typeof output === "string") {
            output = this.graph.getVertexData(output);
        }
        // remove output from list of outputs on workflow model
        for (var i = 0; i < this.outputs.length; i++) {
            if (this.outputs[i].id == output.id) {
                this.outputs[i].clearIssue(ErrorCode_1.ErrorCode.ALL);
                this.outputs.splice(i, 1);
                break;
            }
        }
        // removes dangling inputs in case one was attached solely to the output being removed
        for (var i = 0; i < this.inputs.length; i++) {
            this.removeDanglingInput(this.inputs[i].connectionId);
        }
        // remove output from the graph and remove connections
        this.removeIONodeFromGraph(output);
        this.eventHub.emit("output.remove", output);
    };
    /**
     * Checks if source contains stepId.
     * If it does, returns id of step.out, else null;
     * @param source
     * @param stepId
     */
    WorkflowModel.prototype.isSourceFromStep = function (source, stepId) {
        throw new UnimplementedMethodException_1.UnimplementedMethodException("isSourceFromStep", "WorkflowModel");
    };
    /**
     * Checks if ID is valid and if it already exists on the graph
     * @param id
     * @param connectionId
     */
    WorkflowModel.prototype.checkIdValidity = function (id, connectionId) {
        utils_1.validateID(id);
        var next = this.getNextAvailableId(connectionId);
        if (next !== id) {
            throw new Error("ID already exists on graph, the next available id is \"" + next + "\"");
        }
    };
    /**
     * Changes ID of step, updates connections and nodes in graph
     */
    WorkflowModel.prototype.changeStepId = function (step, id) {
        var _this = this;
        if (id === step.id) {
            return;
        }
        this.checkIdValidity(id, id);
        var oldId = step.id;
        // remove references of step from graph
        this.removeStepFromGraph(step);
        // change id on step and add it to the graph
        step.id = id;
        this.addStepToGraph(step);
        // go through step inputs and re-add all connections
        step.in.forEach(function (input) {
            var destNode = {
                id: input.connectionId,
                type: "StepInput"
            };
            input.source.forEach(function (source) {
                _this.connectSource(source, input, destNode);
            });
        });
        // go through all destinations and reconnect step outputs
        this.gatherDestinations().forEach(function (dest) {
            var _loop_1 = function (i) {
                var source = dest.source[i];
                var stepOutput = _this.isSourceFromStep(source, oldId);
                if (stepOutput) {
                    dest.source[i] = step.out.find(function (o) { return o.id === stepOutput; }).sourceId;
                    var destination = {
                        id: dest.connectionId,
                        type: _this.getNodeType(dest)
                    };
                    _this.connectSource(dest.source[i], dest, destination);
                }
            };
            for (var i = 0; i < dest.source.length; i++) {
                _loop_1(i);
            }
        });
        this.eventHub.emit("step.change.id", step);
    };
    WorkflowModel.prototype.removeIONodeFromGraph = function (node) {
        var _this = this;
        this.graph.edges.forEach(function (edge) {
            if (edge.destination.id === node.connectionId || edge.source.id === node.connectionId) {
                _this.disconnect(edge.source.id, edge.destination.id);
            }
        });
        this.graph.removeVertex(node.connectionId);
    };
    WorkflowModel.prototype.changeIONodeId = function (node, id) {
        var _this = this;
        if (node.id === id)
            return;
        var pref = node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel ? constants_1.STEP_OUTPUT_CONNECTION_PREFIX : constants_1.STEP_INPUT_CONNECTION_PREFIX;
        this.checkIdValidity(id, "" + pref + id + "/" + id);
        var oldConnectionId = node.connectionId;
        var oldId = node.id;
        var oldSourceId = node.sourceId;
        node.id = id;
        this.graph.removeVertex(oldConnectionId);
        this.addVertex(node.connectionId, node);
        // if node is output, just change id, remove from graph, and re-add to graph
        if (node instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) {
            this.graph.edges.forEach(function (edge) {
                if (edge.destination.id === oldConnectionId) {
                    edge.destination.id = node.connectionId;
                }
            });
        }
        // if node is input, change id, remove from graph and re-add to graph, go through all destinations and change their source
        if (node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
            this.graph.edges.forEach(function (edge) {
                if (edge.source.id === oldConnectionId) {
                    edge.source.id = node.connectionId;
                    var destNode = _this.graph.getVertexData(edge.destination.id);
                    for (var i = 0; i < destNode.source.length; i++) {
                        if (destNode.source[i] === oldSourceId) {
                            destNode.source[i] = node.sourceId;
                        }
                    }
                }
            });
        }
        this.eventHub.emit("io.change.id", node, oldId);
    };
    /**
     * Connects two vertices which have already been added to the graph
     */
    WorkflowModel.prototype.addEdge = function (source, destination, isVisible, isValid) {
        if (isVisible === void 0) { isVisible = true; }
        if (isValid === void 0) { isValid = true; }
        this.graph.addEdge(source, destination, isVisible, isValid);
    };
    WorkflowModel.prototype.checkSrcAndDest = function (source, destination) {
        // fetch source if connectionId is provided
        if (typeof source === "string") {
            source = this.graph.getVertexData(source);
        }
        // fetch destination if connectionId is provided
        if (typeof destination === "string") {
            destination = this.graph.getVertexData(destination);
        }
        if (!source || !destination) {
            throw new Error("Source and destination must be defined");
        }
        // type check source
        if (!(source instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) && !(source instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel)) {
            throw new Error("Expected source to be instanceof WorkflowInputParameterModel or WorkflowStepOutputModel, instead got " + source.constructor.name);
        }
        // type check destination
        if (!(destination instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) && !(destination instanceof WorkflowStepInputModel_1.WorkflowStepInputModel)) {
            throw new Error("Expected destination to be instanceof WorkflowOutputParameterModel or WorkflowStepInputModel, instead got " + destination.constructor.name);
        }
        return [source, destination];
    };
    WorkflowModel.prototype.disconnect = function (source, destination) {
        _a = this.checkSrcAndDest(source, destination), source = _a[0], destination = _a[1];
        if (this.graph.removeEdge({
            source: {
                id: source.connectionId
            },
            destination: {
                id: destination.connectionId
            }
        })) {
            var destLen = destination.source.length;
            while (destLen--) {
                if (destination.source[destLen] === source.sourceId) {
                    destination.source.splice(destLen, 1);
                }
            }
            this.validateDestination(destination);
            if (source instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
                this.removeDanglingInput(source.connectionId);
            }
            if (destination instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) {
                this.removeDanglingOutput(destination.connectionId);
            }
            this.eventHub.emit("connection.remove", source, destination);
        }
        else {
            throw new Error("Could not remove nonexistent connection between " + source.connectionId + " and " + destination.connectionId);
        }
        var _a;
    };
    WorkflowModel.prototype.connect = function (source, destination, show) {
        if (show === void 0) { show = true; }
        _a = this.checkSrcAndDest(source, destination), source = _a[0], destination = _a[1];
        if (destination.parentStep &&
            source.parentStep &&
            destination.parentStep.id === source.parentStep.id) {
            throw new Error("Cannot connect ports that belong to the same step: " + destination.parentStep.id);
        }
        // add source to destination
        destination.source.push(source.sourceId);
        var isValid = this.validateConnection(destination, source);
        // add edge to the graph
        this.addEdge({
            id: source.connectionId,
            type: this.getNodeType(source)
        }, {
            id: destination.connectionId,
            type: this.getNodeType(destination)
        }, show, isValid);
        this.eventHub.emit("connection.create", source, destination);
        return isValid;
        var _a;
    };
    WorkflowModel.prototype.addStepFromProcess = function (proc) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addStepFromProcess", "WorkflowModel");
        return undefined;
    };
    /**
     * Checks for naming collisions in vertex ids, in case of collisions,
     * it will increment the provided id, otherwise it returns the original id
     */
    WorkflowModel.prototype.getNextAvailableId = function (connectionId, isIO, graph) {
        if (isIO === void 0) { isIO = false; }
        if (graph === void 0) { graph = this.graph; }
        var hasId = true;
        var result = connectionId;
        var arr = [];
        if (connectionId.indexOf("/") !== -1 && isIO) {
            arr = result.split("/");
        }
        while (hasId) {
            if (isIO) {
                if (hasId = (graph.hasVertex(["in", arr[1], arr[2]].join("/")) || graph.hasVertex(["out", arr[1], arr[2]].join("/")))) {
                    arr = [arr[0], utils_1.incrementString(arr[1]), utils_1.incrementString(arr[2])];
                    result = arr.join("/");
                }
            }
            else {
                if (hasId = graph.hasVertex(result)) {
                    result = utils_1.incrementString(result);
                }
            }
        }
        if (result.indexOf("/") !== -1) {
            return result.split("/")[2];
        }
        return result;
    };
    WorkflowModel.prototype.isConnected = function () {
        try {
            if (!this.graph)
                this.graph = this.constructGraph();
            var isConnected = this.graph.isConnected();
            if (!isConnected) {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        message: "Workflow is not connected",
                        type: "warning"
                    },
                    _a));
            }
            return isConnected;
        }
        catch (ex) {
            this.setIssue((_b = {},
                _b[this.loc] = {
                    message: ex,
                    type: "error"
                },
                _b));
            return false;
        }
        var _a, _b;
    };
    WorkflowModel.prototype.hasCycles = function () {
        try {
            if (!this.graph)
                this.graph = this.constructGraph();
            var hasCycles = this.graph.hasCycles();
            if (hasCycles) {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        message: "Workflow contains cycles",
                        type: "error"
                    },
                    _a));
            }
            return hasCycles;
        }
        catch (ex) {
            this.setIssue((_b = {},
                _b[this.loc] = {
                    message: ex,
                    type: "error"
                },
                _b));
            return false;
        }
        var _a, _b;
    };
    /**
     * Finds matching ports to which pointA can connect within the workflow.
     * Looks at port type and fileTypes if they are specified.
     */
    WorkflowModel.prototype.gatherValidPorts = function (pointA, points, ltr) {
        return points.filter(function (pointB) {
            try {
                utils_1.checkIfConnectionIsValid(pointA, pointB, ltr);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    };
    /**
     * Finds valid destination ports (workflow.outputs and step.in)
     * for a given source port (workflow.inputs and step.out);
     * @param port
     * @returns {any[]}
     */
    WorkflowModel.prototype.gatherValidConnectionPoints = function (port) {
        if (typeof port === "string") {
            port = this.graph.getVertexData(port);
        }
        if (port instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel || port instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel) {
            var destinations = this.gatherDestinations();
            return this.gatherValidPorts(port, destinations, true);
        }
        else {
            var sources = this.gatherSources();
            return this.gatherValidPorts(port, sources, false);
        }
    };
    /**
     * Returns all possible sources on the graph
     */
    WorkflowModel.prototype.gatherSources = function () {
        var stepOut = this.steps.reduce(function (acc, curr) {
            return acc.concat(curr.out);
        }, []);
        return stepOut.concat(this.inputs);
    };
    /**
     * Returns all possible destinations on the graph
     */
    WorkflowModel.prototype.gatherDestinations = function () {
        var stepOut = this.steps.reduce(function (acc, curr) {
            return acc.concat(curr.in);
        }, []);
        return stepOut.concat(this.outputs);
    };
    WorkflowModel.prototype.addStepToGraph = function (step, graph) {
        var _this = this;
        if (graph === void 0) { graph = this.graph; }
        this.addVertex(step.id, step, graph);
        // Sources don't have information about their destinations,
        // so we don't look through them for connections
        step.out.forEach(function (source) {
            _this.addVertex(source.connectionId, source, graph);
            graph.addEdge({
                id: source.parentStep.id,
                type: "Step"
            }, {
                id: source.connectionId,
                type: "StepOutput"
            }, false);
        });
        step.in.forEach(function (dest) {
            _this.addVertex(dest.connectionId, dest, graph);
            graph.addEdge({
                id: dest.connectionId,
                type: "StepInput"
            }, {
                id: dest.parentStep.id,
                type: "Step"
            }, false);
        });
    };
    /**
     * @param inPort
     * @param inputConstructor
     * @param show
     * @param create
     *
     * @param data
     * @private
     */
    WorkflowModel.prototype._createInputFromPort = function (inPort, inputConstructor, show, create, data) {
        var _this = this;
        if (show === void 0) { show = true; }
        if (create === void 0) { create = false; }
        if (data === void 0) { data = {}; }
        if (typeof inPort === "string") {
            inPort = this.graph.getVertexData(inPort);
        }
        if (!inPort || !this.graph.hasVertex(inPort.connectionId)) {
            if (!create) {
                throw new Error("WorkflowStepInputModel " + inPort.destinationId + " does not exist on the graph");
            }
            else {
                this.addVertex(inPort.connectionId, inPort);
                // connect in port to step
                this.addEdge({
                    id: inPort.connectionId,
                    type: "StepInput"
                }, {
                    id: inPort.parentStep.id,
                    type: "Step"
                }, false);
            }
        }
        // create new input on the workflow to connect with the port
        var inputParam = Object.assign((_a = {
                id: this.getNextAvailableId("" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + inPort.id + "/" + inPort.id, true),
                type: inPort.type ? inPort.type.serialize() : "null"
            },
            _a["sbg:fileTypes"] = inPort.fileTypes,
            _a.inputBinding = inPort["inputBinding"],
            _a), data.customProps);
        var input = new inputConstructor(inputParam, this.loc + ".inputs[" + this.inputs.length + "]", this.eventHub);
        // add it to the workflow tree
        input.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.inputs.push(input);
        // add input to graph
        this.addInputToGraph(input);
        input.isVisible = show;
        inPort.isVisible = show;
        this.eventHub.emit("input.create", input);
        // connect input with inPort
        this.connect(input, inPort, show);
        return input;
        var _a;
    };
    WorkflowModel.prototype._createOutputFromPort = function (outPort, outputConstructor, show, create, opts) {
        var _this = this;
        if (show === void 0) { show = true; }
        if (create === void 0) { create = false; }
        if (opts === void 0) { opts = {}; }
        if (typeof outPort === "string") {
            outPort = this.graph.getVertexData(outPort);
        }
        if (!outPort || !this.graph.hasVertex(outPort.connectionId)) {
            if (!create) {
                throw new Error("WorkflowStepInputModel " + outPort.sourceId + " does not exist on the graph");
            }
            else {
                this.addVertex(outPort.connectionId, outPort);
                // connect in port to step
                this.addEdge({
                    id: outPort.connectionId,
                    type: "StepInput"
                }, {
                    id: outPort.parentStep.id,
                    type: "Step"
                }, false);
            }
        }
        // create new input on the workflow to connect with the port
        var outputParam = Object.assign((_a = {
                id: this.getNextAvailableId("" + constants_1.STEP_INPUT_CONNECTION_PREFIX + outPort.id + "/" + outPort.id, true),
                type: outPort.type ? outPort.type.serialize() : "null"
            },
            _a["sbg:fileTypes"] = outPort.fileTypes,
            _a), opts.customProps);
        var output = new outputConstructor(outputParam, this.loc + ".outputs[" + this.outputs.length + "]", this.eventHub);
        // add it to the workflow tree
        output.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.outputs.push(output);
        // add output to graph
        this.addOutputToGraph(output);
        this.eventHub.emit("output.create", output);
        outPort.isVisible = show;
        // connect output with outPort
        this.connect(outPort, output, show);
        return output;
        var _a;
    };
    WorkflowModel.prototype.addInputToGraph = function (input, graph) {
        if (graph === void 0) { graph = this.graph; }
        this.addVertex(input.connectionId, input, graph);
    };
    WorkflowModel.prototype.addOutputToGraph = function (output, graph) {
        if (graph === void 0) { graph = this.graph; }
        this.addVertex(output.connectionId, output, graph);
    };
    /**
     * Helper function to connect source to destination
     */
    WorkflowModel.prototype.connectSource = function (sourceId, dest, destNode, graph) {
        if (graph === void 0) { graph = this.graph; }
        var sourceConnectionId = this.getSourceConnectionId(sourceId);
        // detect if source is a port of an input (has a step in its identifier),
        // if it is a port then add the prefix to form the connectionId
        // get source node by connectionId from graph's vertices
        var sourceModel = graph.getVertexData(sourceConnectionId);
        if (sourceModel === undefined) {
            dest.setIssue((_a = {},
                _a["" + dest.loc] = {
                    type: "error",
                    message: "Destination id " + dest.id + " has unknown source \"" + sourceId + "\". This may result in a cycle in the graph"
                },
                _a));
            return;
        }
        // all workflow inputs are visible by default and should be shown
        // except for those which are "exposed", these are explicitly hidden
        var isVisible = !(sourceModel instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel && !sourceModel.isVisible);
        // if workflow input isn't visible, its destination and connection
        // shouldn't be visible either
        dest.isVisible = isVisible;
        // add a connection between this destination and its source.
        // visibility depends on both nodes, for ports that were "exposed" for example
        // and are connected to nodes which are invisible
        var isValid = this.validateConnection(dest, sourceModel, graph);
        graph.addEdge({
            id: sourceModel.connectionId,
            type: this.getNodeType(sourceModel)
        }, destNode, isVisible, isValid);
        var _a;
    };
    ;
    WorkflowModel.prototype.constructGraph = function () {
        var _this = this;
        var destinations = this.gatherDestinations();
        // Create a blank Graph
        var graph = new Graph_1.Graph();
        // Add inputs to graph
        this.inputs.forEach(function (input) { return _this.addInputToGraph(input, graph); });
        // Add outputs to graph
        this.outputs.forEach(function (output) { return _this.addOutputToGraph(output, graph); });
        // Adding steps to graph adds their step.in and step.out as well as connecting in/out to step
        this.steps.forEach(function (step) { return _this.addStepToGraph(step, graph); });
        // Destinations contain all information about connections in .source property,
        // we loop through them and create the appropriate type of connection
        destinations.forEach(function (dest) {
            // create destination EdgeNode
            var destination = {
                id: dest.connectionId,
                type: _this.getNodeType(dest)
            };
            // No point in connecting if there's no source
            // @todo source should always be an array (just in case), change this check to dest.source.length
            if (dest.source) {
                // if source is an array, loop through all sources for this destination
                if (Array.isArray(dest.source)) {
                    dest.source.forEach(function (s) {
                        _this.connectSource(s, dest, destination, graph);
                    });
                }
                else {
                    _this.connectSource(dest.source, dest, destination, graph);
                }
            }
        });
        return graph;
    };
    /**
     * Returns type of node to be added to graph, for canvas rendering
     */
    WorkflowModel.prototype.getNodeType = function (node) {
        if (node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
            return "WorkflowInput";
        }
        else if (node instanceof WorkflowStepOutputModel_1.WorkflowStepOutputModel) {
            return "StepOutput";
        }
        else if (node instanceof StepModel_1.StepModel) {
            return "Step";
        }
        else if (node instanceof WorkflowStepInputModel_1.WorkflowStepInputModel) {
            return "StepInput";
        }
        else if (node instanceof WorkflowOutputParameterModel_1.WorkflowOutputParameterModel) {
            return "WorkflowOutput";
        }
    };
    WorkflowModel.prototype.getSourceConnectionId = function (source) {
        new UnimplementedMethodException_1.UnimplementedMethodException("getSourceConnectionId");
        return undefined;
    };
    /**
     * Validate all visible connections and sets correct validity state on destinations
     */
    WorkflowModel.prototype.validateConnections = function () {
        var _this = this;
        var sources = this.gatherSources();
        var destinations = this.gatherDestinations();
        this.connections.forEach(function (connection) {
            if (connection.isVisible) {
                var source = sources.find(function (item) {
                    return item.connectionId === connection.source.id;
                });
                var destination = destinations.find(function (item) {
                    return item.connectionId === connection.destination.id;
                });
                _this.validateConnection(destination, source);
            }
        });
    };
    /**
     * Validate connection between source and destination and sets correct validity state on destination
     */
    WorkflowModel.prototype.validateConnection = function (destination, source, graph) {
        if (graph === void 0) { graph = this.graph; }
        if (!source || !destination) {
            return;
        }
        var isValid = false;
        try {
            utils_1.checkIfConnectionIsValid(source, destination);
            isValid = true;
        }
        catch (e) {
            var sourceText = destination instanceof V1WorkflowOutputParameterModel_1.V1WorkflowOutputParameterModel ? "outputSource" : "source";
            destination.setIssue((_a = {},
                _a[destination.loc + ("." + sourceText + "[") + source.sourceId + "]"] = {
                    message: e.message,
                    type: "warning",
                    code: e.code
                },
                _a));
        }
        Array.from(graph.edges).filter(function (c) {
            return c.isVisible && (c.destination.id === destination.connectionId && c.source.id === source.connectionId);
        })
            .forEach(function (c) {
            c.isValid = isValid;
        });
        return isValid;
        var _a;
    };
    /**
     * Validate all connections made with given destination
     */
    WorkflowModel.prototype.validateDestination = function (destination) {
        var _this = this;
        destination.clearIssue(ErrorCode_1.ErrorCode.CONNECTION_ALL);
        // Find all sources connected to given destination
        var sources = this.connections.filter(function (connection) {
            return connection.isVisible && (connection.destination.id === destination.connectionId);
        }).map(function (connection) {
            return _this.findById(connection.source.id);
        });
        // Validate all connections
        sources.forEach(function (source) {
            _this.validateConnection(destination, source);
        });
    };
    /**
     * Validate all connections made with given IO port
     */
    WorkflowModel.prototype.validateConnectionsForIOPort = function (port) {
        var _this = this;
        if (port instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel) {
            var destinations = this.connections.filter(function (connection) {
                return connection.isVisible && (connection.source.id === port.connectionId);
            }).map(function (connection) {
                return _this.findById(connection.destination.id);
            });
            // Validate destination in case when connection goes from invalid > valid to remove warning
            // (This is because we do not have currently method to remove certain keys in issues - ValidationBase)
            destinations.forEach(function (destination) {
                _this.validateDestination(destination);
            });
        }
        else {
            // If port is output
            this.validateDestination(port);
        }
        this.eventHub.emit("connections.updated");
    };
    WorkflowModel.prototype.validateGraph = function () {
        try {
            this.graph.topSort();
        }
        catch (ex) {
            if (ex.message === "Graph has cycles") {
                this.setIssue((_a = {},
                    _a[this.loc] = {
                        message: "Graph has cycles",
                        type: "error"
                    },
                    _a));
            }
            else if (ex === "Can't sort unconnected graph") {
                this.setIssue((_b = {},
                    _b[this.loc] = {
                        message: "Graph is not connected",
                        type: "warning"
                    },
                    _b));
            }
        }
        var _a, _b;
    };
    return WorkflowModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowModel = WorkflowModel;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ProcessRequirementModel = /** @class */ (function (_super) {
    __extends(ProcessRequirementModel, _super);
    function ProcessRequirementModel(loc) {
        var _this = _super.call(this, loc) || this;
        _this.customProps = {};
        return _this;
    }
    ProcessRequirementModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "ProcessRequirementModel");
        return null;
    };
    ProcessRequirementModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "ProcessRequirementModel");
    };
    return ProcessRequirementModel;
}(ValidationBase_1.ValidationBase));
exports.ProcessRequirementModel = ProcessRequirementModel;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var utils_1 = __webpack_require__(0);
var CommandOutputParameterModel = /** @class */ (function (_super) {
    __extends(CommandOutputParameterModel, _super);
    function CommandOutputParameterModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    CommandOutputParameterModel.prototype.updateOutputBinding = function (binding) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updateOutputBinding", "CommandOutputParameterModel");
    };
    CommandOutputParameterModel.prototype._addSecondaryFile = function (file, exprConstructor, locBase) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.secondaryFiles, locBase + ".secondaryFiles");
        var f = new exprConstructor(file, loc, this.eventHub);
        this.secondaryFiles.push(f);
        f.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return f;
    };
    CommandOutputParameterModel.prototype._updateSecondaryFiles = function (files) {
        var _this = this;
        this.secondaryFiles.forEach(function (f) { return f.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
        this.secondaryFiles = [];
        files.forEach(function (f) { return _this.addSecondaryFile(f); });
    };
    CommandOutputParameterModel.prototype._removeSecondaryFile = function (index) {
        var file = this.secondaryFiles[index];
        if (file) {
            file.setValue("", "string");
            this.secondaryFiles.splice(index, 1);
        }
    };
    CommandOutputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    CommandOutputParameterModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.outputBinding.validate(context));
        promises.push(this.type.validate(context));
        promises.concat(this.secondaryFiles.map(function (f) { return f.validate(context); }));
        return Promise.all(promises).then(function () { return _this.issues; });
    };
    CommandOutputParameterModel.prototype.attachFileTypeListeners = function () {
        var _this = this;
        if (this.eventHub) {
            this.modelListeners.push(this.eventHub.on("io.change.type", function (loc) {
                if (_this.loc + ".type" === loc) {
                    if (!utils_1.isFileType(_this)) {
                        _this.updateSecondaryFiles([]);
                        if (_this.outputBinding) {
                            _this.outputBinding.setInheritMetadataFrom(null);
                        }
                    }
                }
            }));
        }
    };
    return CommandOutputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.CommandOutputParameterModel = CommandOutputParameterModel;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var utils_1 = __webpack_require__(0);
var ExpressionModel_1 = __webpack_require__(9);
var RequirementBaseModel = /** @class */ (function (_super) {
    __extends(RequirementBaseModel, _super);
    function RequirementBaseModel(req, exprConstructor, loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.exprConstructor = exprConstructor;
        _this.eventHub = eventHub;
        _this.customProps = {};
        _this.deserialize(req);
        return _this;
    }
    RequirementBaseModel.prototype.updateValue = function (value) {
        var _this = this;
        this.value = value;
        if (value instanceof ExpressionModel_1.ExpressionModel) {
            this.value.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.value.loc = this.loc + ".value";
        }
    };
    RequirementBaseModel.prototype.serialize = function () {
        // value stored in customProps was whole value of hint
        if (this.customProps.constructor.name !== "Object") {
            return this.customProps;
        }
        var base = {};
        if (this.class)
            base.class = this.class;
        var value;
        if (this.value instanceof ExpressionModel_1.ExpressionModel) {
            value = this.value.serialize();
        }
        else {
            value = this.value;
        }
        if (value) {
            base["value"] = value;
        }
        return Object.assign({}, base, this.customProps);
    };
    RequirementBaseModel.prototype.deserialize = function (attr) {
        var _this = this;
        // hint is not an object type, therefore it cannot be deserialized
        if (attr.constructor.name !== "Object") {
            this.customProps = attr;
            return;
        }
        this.class = attr.class;
        if (attr["value"] !== undefined && attr["value"] !== null) {
            this.value = attr["value"];
            if (typeof this.value === "string" || (this.value["script"] && this.exprConstructor === SBDraft2ExpressionModel_1.SBDraft2ExpressionModel)) {
                this.value = new this.exprConstructor(attr["value"], this.loc + ".value", this.eventHub);
                this.value.setValidationCallback(function (err) { return _this.updateValidity(err); });
            }
        }
        utils_1.spreadSelectProps(attr, this.customProps, ["class", "value"]);
    };
    return RequirementBaseModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.RequirementBaseModel = RequirementBaseModel;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var constants_1 = __webpack_require__(6);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var WorkflowInputParameterModel = /** @class */ (function (_super) {
    __extends(WorkflowInputParameterModel, _super);
    function WorkflowInputParameterModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.fileTypes = [];
        _this.isVisible = true;
        _this.customProps = {};
        _this.eventHub = eventHub;
        return _this;
    }
    Object.defineProperty(WorkflowInputParameterModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.eventHub.emit("io.change", this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowInputParameterModel.prototype, "sourceId", {
        /**
         * ID to be used when adding as source
         */
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowInputParameterModel.prototype, "connectionId", {
        /**
         * ID to be used in graph
         */
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    WorkflowInputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    WorkflowInputParameterModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "WorkflowInputParameterModel");
    };
    WorkflowInputParameterModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "WorkflowInputParameterModel");
    };
    WorkflowInputParameterModel.prototype.validate = function () {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.type.validate());
        return Promise.all(promises).then(function (res) { return _this.issues; });
    };
    return WorkflowInputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowInputParameterModel = WorkflowInputParameterModel;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var constants_1 = __webpack_require__(6);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var WorkflowOutputParameterModel = /** @class */ (function (_super) {
    __extends(WorkflowOutputParameterModel, _super);
    function WorkflowOutputParameterModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.fileTypes = [];
        _this.isField = false;
        _this.isVisible = true;
        _this.customProps = {};
        _this.eventHub = eventHub;
        return _this;
    }
    Object.defineProperty(WorkflowOutputParameterModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.eventHub.emit("io.change", this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowOutputParameterModel.prototype, "destinationId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowOutputParameterModel.prototype, "connectionId", {
        get: function () {
            return "" + constants_1.STEP_INPUT_CONNECTION_PREFIX + this.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    WorkflowOutputParameterModel.prototype.updateLoc = function (loc) {
        // must update location of self first
        _super.prototype.updateLoc.call(this, loc);
        // update location of type, so that in case the input is a field,
        // newly created fields will have correct loc
        this.type.updateLoc(loc + ".type");
    };
    WorkflowOutputParameterModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "WorkflowOutputParameterModel");
    };
    WorkflowOutputParameterModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "WorkflowOutputParameterModel");
    };
    WorkflowOutputParameterModel.prototype.validate = function () {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.type.validate());
        return Promise.all(promises).then(function (res) { return _this.issues; });
    };
    return WorkflowOutputParameterModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowOutputParameterModel = WorkflowOutputParameterModel;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionEvaluator = /** @class */ (function () {
    function ExpressionEvaluator() {
    }
    ExpressionEvaluator.evaluate = function (expr, context, version) {
        var _this = this;
        if (context === void 0) { context = {}; }
        if (version === "v1.0") {
            if (typeof expr === "number") {
                expr = expr.toString();
            }
            else if (typeof expr === "object") {
                return new Promise(function (res, rej) {
                    rej("Unexpected object type when evaluating v1.0 Expression: " + expr);
                });
            }
            try {
                var results = ExpressionEvaluator.grabExpressions(expr).map(function (token) {
                    switch (token.type) {
                        case "func":
                            return ExpressionEvaluator.evaluateExpression("(function() {" + _this.libraries.join("\n\n") + "\n\n"
                                + token.value + "})()", context);
                        case "expr":
                            return ExpressionEvaluator.evaluateExpression(_this.libraries.join("\n\n") + "\n\n" + token.value, context);
                        case "literal":
                            return new Promise(function (res) { return res(token.value); });
                    }
                });
                if (results.length === 1) {
                    return results[0];
                }
                else {
                    return Promise.all(results).then(function (res) { return res.join(""); });
                }
            }
            catch (ex) {
                return new Promise(function (res, rej) {
                    rej(ex);
                });
            }
        }
        else if (version === "draft-2") {
            if (typeof expr === "string" || typeof expr === "number") {
                return new Promise(function (res) { return res(expr); });
            }
            else {
                var script = expr.script.trim().charAt(0) === '{'
                    ? "(function()" + expr.script + ")()"
                    : expr.script;
                return ExpressionEvaluator.evaluateExpression(script, context);
            }
        }
    };
    ExpressionEvaluator.evaluateD2 = function (expr, context) {
        if (typeof expr === "string" || typeof expr === "number") {
            return new Promise(function (res) { return res(expr); });
        }
        else {
            var script = expr.script.trim().charAt(0) === '{'
                ? "(function()" + expr.script + ")()"
                : expr.script;
            return ExpressionEvaluator.evaluateExpression(script, context);
        }
    };
    ExpressionEvaluator.grabExpressions = function (exprStr) {
        var tokens = [];
        var i = 0;
        var state = State.LITERAL;
        var literal = "";
        var expr = "";
        var func = "";
        var bracketCount = 0;
        var parenCount = 0;
        // go through character by character
        while (i < exprStr.length) {
            var currentChar = exprStr[i];
            switch (state) {
                case State.LITERAL:
                    if (currentChar === "$" && exprStr[i + 1] === "(") {
                        // start expression and push past literal
                        if (literal) {
                            tokens.push({ type: "literal", value: literal });
                            literal = "";
                        }
                        i++;
                        expr = "";
                        state = State.EXPR;
                    }
                    else if (currentChar === "$" && exprStr[i + 1] === "{") {
                        // start expression and push past literal
                        if (literal) {
                            tokens.push({ type: "literal", value: literal });
                            literal = "";
                        }
                        i++;
                        func = "";
                        state = State.FUNC;
                    }
                    else if (currentChar === "\\" && exprStr[i + 1] === "$") {
                        literal += "\\$";
                        i++;
                    }
                    else {
                        literal += currentChar;
                    }
                    break;
                case State.EXPR:
                    switch (currentChar) {
                        case "(":
                            expr += currentChar;
                            parenCount++;
                            break;
                        case ")":
                            if (parenCount === 0) {
                                tokens.push({ type: "expr", value: expr });
                                state = State.LITERAL;
                            }
                            else {
                                expr += currentChar;
                                parenCount--;
                            }
                            break;
                        default:
                            expr += currentChar;
                    }
                    break;
                case State.FUNC:
                    switch (currentChar) {
                        case "{":
                            func += currentChar;
                            bracketCount++;
                            break;
                        case "}":
                            if (bracketCount === 0) {
                                tokens.push({ type: "func", value: func });
                                state = State.LITERAL;
                            }
                            else {
                                func += currentChar;
                                bracketCount--;
                            }
                            break;
                        default:
                            func += currentChar;
                            break;
                    }
                    break;
            }
            i++;
        }
        if (state === State.LITERAL && literal.length > 0) {
            tokens.push({ type: "literal", value: literal });
        }
        if (state === State.EXPR || state === State.FUNC) {
            // if expression is invalid, treat the whole thing as a literal
            tokens = [{ value: exprStr, type: "literal" }];
        }
        return tokens;
    };
    ExpressionEvaluator.evaluateExpression = null;
    ExpressionEvaluator.libraries = [];
    return ExpressionEvaluator;
}());
exports.ExpressionEvaluator = ExpressionEvaluator;
var State;
(function (State) {
    State[State["LITERAL"] = 0] = "LITERAL";
    State[State["FUNC"] = 1] = "FUNC";
    State[State["EXPR"] = 2] = "EXPR";
})(State || (State = {}));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var RequirementBaseModel_1 = __webpack_require__(14);
var StepModel = /** @class */ (function (_super) {
    __extends(StepModel, _super);
    function StepModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.isVisible = true;
        _this.runPath = "";
        _this.hints = [];
        _this.customProps = {};
        _this.eventHub = eventHub;
        return _this;
    }
    Object.defineProperty(StepModel.prototype, "label", {
        get: function () {
            return this._label;
        },
        set: function (value) {
            this._label = value;
            this.eventHub.emit("step.change", this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StepModel.prototype, "inAsMap", {
        get: function () {
            return this.in.reduce(function (acc, curr) {
                return __assign({}, acc, (_a = {}, _a[curr.id] = curr, _a));
                var _a;
            }, {});
        },
        enumerable: true,
        configurable: true
    });
    StepModel.prototype.setRunProcess = function (process) {
        new UnimplementedMethodException_1.UnimplementedMethodException("setRunProcess", "StepModel");
    };
    Object.defineProperty(StepModel.prototype, "connectionId", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    StepModel.prototype.compareInPorts = function (isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
    };
    StepModel.prototype.compareOutPorts = function (isUpdate) {
        if (isUpdate === void 0) { isUpdate = false; }
    };
    StepModel.prototype.serializeEmbedded = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serializeEmbedded", "StepModel");
    };
    StepModel.prototype.addHint = function (hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addHint", "WorkflowModel");
        return null;
    };
    StepModel.prototype.createReq = function (req, constructor, loc, hint) {
        var _this = this;
        if (hint === void 0) { hint = false; }
        var reqModel;
        var property = hint ? "hints" : "requirements";
        loc = loc || this.loc + "." + property + "[" + this[property].length + "]";
        reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, constructor, loc);
        reqModel.isHint = hint;
        this[property].push(reqModel);
        reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return reqModel;
    };
    StepModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "StepModel");
    };
    StepModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "StepModel");
    };
    StepModel.portDifference = function (stepPorts, runParameters) {
        var inserted = []; // contains only InputParamModels from run.inputs
        var remaining = []; // contains whatever is left from inPorts that's still in run.inputs
        var removed = stepPorts.slice(); // contains what isn't in run.inputs
        var _loop_1 = function (i) {
            var index = removed.findIndex(function (inp) { return inp.id === runParameters[i].id; });
            if (index === -1) {
                inserted.push(runParameters[i]);
            }
            else {
                remaining = remaining.concat(removed.splice(index, 1));
            }
        };
        for (var i = 0; i < runParameters.length; i++) {
            _loop_1(i);
        }
        return [inserted, remaining, removed];
    };
    return StepModel;
}(ValidationBase_1.ValidationBase));
exports.StepModel = StepModel;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(6);
var WorkflowStepInputModel = /** @class */ (function (_super) {
    __extends(WorkflowStepInputModel, _super);
    function WorkflowStepInputModel(loc) {
        var _this = _super.call(this, loc) || this;
        _this.source = [];
        _this.fileTypes = [];
        _this.isVisible = false;
        _this.customProps = {};
        return _this;
    }
    Object.defineProperty(WorkflowStepInputModel.prototype, "connectionId", {
        /**
         * The connectionId used within the graph, prefix with "in/" because it refers to the
         */
        get: function () {
            return "" + constants_1.STEP_INPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowStepInputModel.prototype, "destinationId", {
        /**
         * The input's ID for scatter
         * @returns {string}
         */
        get: function () {
            return this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowStepInputModel.prototype, "status", {
        get: function () {
            //  A port is displayed on canvas (if it has connections or
            // if it is required file, by default)
            if (this.isVisible)
                return "port";
            // Neither included in ports nor "exposed"
            if (!this.source.length)
                return "editable";
            // An in port is "exposed" when it isn't visible but has
            // a workflow input to which it is solely connected
            if (this.source.length === 1)
                return "exposed";
        },
        enumerable: true,
        configurable: true
    });
    WorkflowStepInputModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize");
    };
    WorkflowStepInputModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize");
    };
    return WorkflowStepInputModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowStepInputModel = WorkflowStepInputModel;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(6);
var WorkflowStepOutputModel = /** @class */ (function (_super) {
    __extends(WorkflowStepOutputModel, _super);
    function WorkflowStepOutputModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fileTypes = [];
        _this.customProps = {};
        _this.isVisible = true;
        return _this;
    }
    WorkflowStepOutputModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize");
    };
    WorkflowStepOutputModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize");
    };
    Object.defineProperty(WorkflowStepOutputModel.prototype, "sourceId", {
        /**
         * ID used for creating connections
         */
        get: function () {
            return this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkflowStepOutputModel.prototype, "connectionId", {
        /**
         * ID used for graph
         */
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    return WorkflowStepOutputModel;
}(ValidationBase_1.ValidationBase));
exports.WorkflowStepOutputModel = WorkflowStepOutputModel;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineUtils_1 = __webpack_require__(86);
var EventHub_1 = __webpack_require__(45);
var JobHelper_1 = __webpack_require__(24);
var UnimplementedMethodException_1 = __webpack_require__(3);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var ValidationBase_1 = __webpack_require__(2);
var CommandInputParameterModel_1 = __webpack_require__(10);
var CommandOutputParameterModel_1 = __webpack_require__(13);
var CommandLineToolModel = /** @class */ (function (_super) {
    __extends(CommandLineToolModel, _super);
    function CommandLineToolModel(loc) {
        var _this = _super.call(this, loc || "document") || this;
        _this["class"] = "CommandLineTool";
        // CWL PROPERTIES //
        _this.baseCommand = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.arguments = [];
        _this.requirements = [];
        _this.hints = [];
        _this.successCodes = [];
        _this.temporaryFailCodes = [];
        _this.permanentFailCodes = [];
        /** Set of all expressions the tool contains */
        _this.expressions = new Set();
        /** Array of all validation processes that are currently occurring */
        _this.validationPromises = [];
        /** Dummy job.inputs value to be used in command line generation */
        _this.jobInputs = {};
        /** Dummy job.runtime value to be used in command line generation */
        _this.runtime = {};
        // MODEL HELPERS //
        /** Flag to indicate that the tool has finished deserializing */
        _this.constructed = false;
        /** Custom properties that weren't serialized */
        _this.customProps = {};
        /** Function which is called when the command line is changed */
        _this.commandLineWatcher = function () {
        };
        _this.eventHub = new EventHub_1.EventHub([
            "input.create",
            "input.remove",
            "input.change",
            "input.change.id",
            "io.change.type",
            "output.create",
            "output.remove",
            "output.change.id",
            "argument.create",
            "argument.remove",
            "field.create",
            "field.remove",
            "validate",
            "binding.shellQuote",
            "expression.create",
            "expression.change",
            "expression.serialize",
            "output.metadata.inherit"
        ]);
        return _this;
    }
    // EXPRESSION CONTEXT //
    CommandLineToolModel.prototype.setJobInputs = function (inputs) {
        this.jobInputs = inputs || JobHelper_1.JobHelper.getNullJobInputs(this);
        this.validateAllExpressions();
        this.updateCommandLine();
    };
    // EVENT HANDLING //
    CommandLineToolModel.prototype.on = function (event, handler) {
        return {
            dispose: this.eventHub.on(event, handler)
        };
    };
    CommandLineToolModel.prototype.off = function (event, handler) {
        this.eventHub.off(event, handler);
    };
    CommandLineToolModel.prototype.initializeJobWatchers = function () {
        var _this = this;
        this.eventHub.on("input.change.id", function (data) {
            var root = _this.jobInputs;
            // check if port is a field (nested structure)
            if (data.port.isField) {
                root = _this.findFieldRoot(data.port, root);
                if (Array.isArray(root)) {
                    root.forEach(function (obj) {
                        obj[data.newId] = obj[data.oldId] || JobHelper_1.JobHelper.generateMockJobData(data.port);
                        delete obj[data.oldId];
                    });
                    return;
                }
            }
            // root is the object which holds changed input, either jobInputs or a record
            root[data.newId] = root[data.oldId] || JobHelper_1.JobHelper.generateMockJobData(data.port);
            delete root[data.oldId];
            _this.updateCommandLine();
        });
        this.eventHub.on("io.change.type", function (loc) {
            // make sure loc is within this tree and that belongs to one of the inputs
            if (loc.search(_this.loc) === 0 && loc.search("inputs") > -1) {
                // remove root part of loc and ignore type part of loc
                loc = loc.substr(_this.loc.length).replace(/type$/, "");
                // find port based on its loc
                var port = utils_1.fetchByLoc(_this, loc);
                if (!port) {
                    // newly added inputs will trigger this event before they are added to tool
                    return;
                }
                var root = _this.jobInputs;
                if (port.isField) {
                    root = _this.findFieldRoot(port, root);
                    if (Array.isArray(root)) {
                        for (var i = 0; i < root.length; i++) {
                            // add mock value of field to each record in array
                            root[i][port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                        }
                        _this.updateCommandLine();
                        return;
                    }
                }
                root[port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                _this.updateCommandLine();
            }
        });
        this.eventHub.on("input.remove", function (port) {
            delete _this.jobInputs[port.id];
            _this.updateCommandLine();
        });
        this.eventHub.on("field.remove", function (port) {
            if (port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                var root = _this.findFieldRoot(port, _this.jobInputs);
                if (Array.isArray(root)) {
                    root.forEach(function (obj) { return delete obj[port.id]; });
                }
                else {
                    delete root[port.id];
                }
                _this.updateCommandLine();
            }
        });
        this.eventHub.on("input.create", function (port) {
            _this.jobInputs[port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
            _this.updateCommandLine();
        });
        this.eventHub.on("field.create", function (port) {
            if (port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                var root = _this.findFieldRoot(port, _this.jobInputs);
                // in case parent is array of records, not a single record
                if (Array.isArray(root)) {
                    for (var i = 0; i < root.length; i++) {
                        // add mock value of field to each record in array
                        root[i][port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                    }
                }
                else {
                    // parent is single record, add mock value of field to that record
                    root[port.id] = JobHelper_1.JobHelper.generateMockJobData(port);
                }
                _this.updateCommandLine();
            }
        });
    };
    CommandLineToolModel.prototype.initializeExprWatchers = function () {
        var _this = this;
        this.eventHub.on("expression.create", function (expr) {
            _this.expressions.add(expr);
            if (_this.constructed) {
                _this.validationPromises.push(_this.validateExpression(expr));
            }
        });
        this.eventHub.on("expression.change", function (expr) {
            _this.validationPromises.push(_this.validateExpression(expr));
        });
    };
    CommandLineToolModel.prototype.validateExpression = function (expression) {
        var input;
        if (/inputs|outputs/.test(expression.loc)) {
            var loc = /.*(?:inputs\[\d+]|.*outputs\[\d+]|.*fields\[\d+])/
                .exec(expression.loc)[0] // take the first match
                .replace("document", ""); // so loc is relative to root
            input = utils_1.fetchByLoc(this, loc);
        }
        return expression.validate(this.getContext(input));
    };
    CommandLineToolModel.prototype.validateAllExpressions = function () {
        var _this = this;
        this.expressions.forEach(function (e) {
            _this.validationPromises.push(_this.validateExpression(e));
        });
    };
    // DOCUMENT TREE TRAVERSAL //
    CommandLineToolModel.prototype.findFieldRoot = function (port, base) {
        // find ancestor that is in the inputs root, save ancestors
        var isField = true;
        // creating a path to the input inside the job, ignoring the id of the actual input for now
        var path = [];
        // location of the current port we're looking at
        var loc = port.loc;
        while (isField) {
            var parent_1 = this.findFieldParent(loc);
            // add parent id to the beginning of the path, we're traversing up the tree
            // keeping track if type is array so we can gather all child nodes where port has a value
            path.unshift({ id: parent_1.id, isArray: parent_1.type.type === "array" });
            // continue traversing if parent is a field
            isField = parent_1.isField;
            // parent becomes port we're looking at
            loc = parent_1.loc;
        }
        // traverse jobInputs with the ids generated from field parents, find root of field
        var traversePath = function (path, root) {
            // null is if the record itself is set to null,
            // undefined is if the id isn't even defined in the job object
            if (root === null || root === undefined) {
                return null;
            }
            // starting from the root of the tree, going down each level till we find the port
            if (path.length === 0) {
                return root;
            }
            // if node is an array, recursively traverse all it's elements
            var part = path[0];
            if (part.isArray) {
                if (!Array.isArray(root[part.id])) {
                    return null;
                }
                // flatten the nested array, if it contains arrays itself
                return utils_1.flatten(root[part.id].map(function (obj) { return traversePath(path.slice(1), obj); }));
            }
            // traverse the path for the root element
            return traversePath(path.slice(1), root[part.id]);
        };
        return traversePath(path, base);
    };
    CommandLineToolModel.prototype.findFieldParent = function (loc) {
        // remove base of location that's the same as this location
        // remove the ".type.fields[#]" which signifies the field so the loc points to its parent
        // before: "document.inputs[3].type.fields[3]
        // after: ".inputs[3]"
        loc = loc.substr(this.loc.length).replace(/\.type\.fields\[\d+]$/, "");
        return utils_1.fetchByLoc(this, loc);
    };
    // CRUD HELPER METHODS //
    CommandLineToolModel.prototype.changeIOId = function (port, id) {
        if (port.id === id) {
            return;
        }
        var oldId = port.id;
        var type;
        var scope;
        // emit set proper type so event can be emitted and validity can be scoped
        if (port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
            type = "input";
        }
        else if (port instanceof CommandOutputParameterModel_1.CommandOutputParameterModel) {
            type = "output";
        }
        if (port.isField) {
            scope = this.findFieldParent(port.loc).type.fields;
        }
        // verify that the new ID can be set
        utils_1.checkIdValidity(id, scope || this.inputs.concat(this.outputs));
        port.clearIssue(ErrorCode_1.ErrorCode.ID_ALL);
        port.id = id;
        if (utils_1.isType(port, ["record", "enum"])) {
            port.type.name = id;
        }
        // emit change event so CLT subclasses can change job values,
        // emits "input.change.id" or "output.change.id"
        this.eventHub.emit(type + ".change.id", { port: port, oldId: oldId, newId: port.id });
    };
    CommandLineToolModel.prototype.addHint = function (hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addHint", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.updateStream = function (stream, type) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updateStream", "CommandLineToolModel");
    };
    CommandLineToolModel.prototype._addOutput = function (outputConstructor, output) {
        var _this = this;
        if (output === void 0) { output = { id: null }; }
        var loc = utils_1.incrementLastLoc(this.outputs, this.loc + ".outputs");
        output.id = output.id || utils_1.getNextAvailableId("output", this.inputs.concat(this.outputs));
        var o = new outputConstructor(output, loc, this.eventHub);
        o.setValidationCallback(function (err) { return _this.updateValidity(err); });
        try {
            utils_1.checkIdValidity(o.id, this.inputs.concat(this.outputs));
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[o.loc + ".id"] = {
                    type: "error",
                    message: ex.message,
                    code: ex.code
                },
                _a));
        }
        this.outputs.push(o);
        return o;
        var _a;
    };
    CommandLineToolModel.prototype.addOutput = function (output) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addOutput", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.removeOutput = function (output) {
        var index = this.outputs.indexOf(output);
        if (index < 0) {
            return;
        }
        this.outputs[index].clearIssue(ErrorCode_1.ErrorCode.ALL);
        this.outputs[index].clearListeners();
        this.outputs.splice(index, 1);
        // start at the index and update location of all arguments after it
        for (var i = index; i < this.outputs.length; i++) {
            this.outputs[i].updateLoc(this.loc + ".outputs[" + i + "]");
        }
        this.eventHub.emit("output.remove", output);
    };
    CommandLineToolModel.prototype._addInput = function (inputConstructor, input) {
        var _this = this;
        if (input === void 0) { input = { id: null }; }
        var loc = utils_1.incrementLastLoc(this.inputs, this.loc + ".inputs");
        input.id = input.id || utils_1.getNextAvailableId("input", this.inputs.concat(this.outputs));
        var i = new inputConstructor(input, loc, this.eventHub);
        i.setValidationCallback(function (err) { return _this.updateValidity(err); });
        try {
            utils_1.checkIdValidity(i.id, this.inputs.concat(this.outputs));
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[i.loc + ".id"] = {
                    type: "error",
                    message: ex.message,
                    code: ex.code
                },
                _a));
        }
        this.inputs.push(i);
        this.eventHub.emit("input.create", i);
        return i;
        var _a;
    };
    CommandLineToolModel.prototype.addInput = function (input) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addInput", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.removeInput = function (input) {
        var index = this.inputs.indexOf(input);
        if (index < 0) {
            return;
        }
        this.inputs[index].clearIssue(ErrorCode_1.ErrorCode.ALL);
        this.inputs[index].clearListeners();
        this.inputs.splice(index, 1);
        // start at the index and update location of all arguments after it
        for (var i = index; i < this.inputs.length; i++) {
            this.inputs[i].updateLoc(this.loc + ".inputs[" + i + "]");
        }
        this.eventHub.emit("input.remove", input);
    };
    CommandLineToolModel.prototype.addArgument = function (arg) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addArgument", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.removeArgument = function (arg) {
        var index = this.arguments.indexOf(arg);
        if (index < 0) {
            return;
        }
        this.arguments[index].clearIssue(ErrorCode_1.ErrorCode.ALL);
        this.arguments[index].clearListeners();
        this.arguments.splice(index, 1);
        // start at the index and update location of all arguments after it
        for (var i = index; i < this.arguments.length; i++) {
            this.arguments[i].updateLoc(this.loc + ".arguments[" + i + "]");
        }
        this.eventHub.emit("argument.remove", arg);
    };
    CommandLineToolModel.prototype.addBaseCommand = function (cmd) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addBaseCommand", "CommandLineToolModel");
        return null;
    };
    CommandLineToolModel.prototype.setRequirement = function (req, hint) {
        new UnimplementedMethodException_1.UnimplementedMethodException("setRequirement", "CommandLineToolModel");
    };
    // COMMAND LINE //
    CommandLineToolModel.prototype.updateCommandLine = function () {
        var _this = this;
        if (this.constructed) {
            this.generateCommandLineParts().then(function (res) {
                _this.commandLineWatcher(res);
            });
        }
    };
    CommandLineToolModel.prototype.onCommandLineResult = function (fn) {
        this.commandLineWatcher = fn;
    };
    CommandLineToolModel.prototype.generateCommandLine = function () {
        return this.generateCommandLineParts().then(function (parts) {
            var res = parts.filter(function (p) { return !!p.value; }).map(function (p) { return p.value; }).join(" ");
            return res.trim();
        });
    };
    CommandLineToolModel.prototype.generateCommandLineParts = function () {
        return CommandLineUtils_1.generateCommandLineParts(this, this.jobInputs, this.runtime);
    };
    // VALIDATION //
    CommandLineToolModel.prototype.validate = function () {
        var _this = this;
        return Promise.all(this.validationPromises).then(function () {
            _this.validationPromises = [];
        });
    };
    return CommandLineToolModel;
}(ValidationBase_1.ValidationBase));
exports.CommandLineToolModel = CommandLineToolModel;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var CommandArgumentModel = /** @class */ (function (_super) {
    __extends(CommandArgumentModel, _super);
    function CommandArgumentModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.hasBinding = false;
        _this.customProps = {};
        return _this;
    }
    Object.defineProperty(CommandArgumentModel.prototype, "prefix", {
        get: function () {
            return this.binding ? this.binding.prefix : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "position", {
        get: function () {
            return this.binding ? this.binding.position || 0 : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "separate", {
        get: function () {
            return this.binding ? this.binding.separate !== false : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "itemSeparator", {
        get: function () {
            return this.binding ? this.binding.itemSeparator : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "valueFrom", {
        get: function () {
            return this.binding ? this.binding.valueFrom : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandArgumentModel.prototype, "shellQuote", {
        // if binding doesn't have shellQuote, it will return undefined anyway
        get: function () {
            return this.binding ? this.binding.shellQuote : undefined;
        },
        enumerable: true,
        configurable: true
    });
    CommandArgumentModel.prototype.toggleBinding = function (state) {
        new UnimplementedMethodException_1.UnimplementedMethodException("toggleBinding", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.updatePrimitive = function (str) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updatePrimitive", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.updateBinding = function (binding) {
        new UnimplementedMethodException_1.UnimplementedMethodException("updateBinding", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.toString = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("toString", "CommandArgumentModel");
        return null;
    };
    CommandArgumentModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "CommandArgumentModel");
        return null;
    };
    CommandArgumentModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "CommandArgumentModel");
    };
    CommandArgumentModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL);
        if (this.hasBinding) {
            return this.binding.validate(context);
        }
        return new Promise(function (res) { res(_this.issues); });
    };
    return CommandArgumentModel;
}(ValidationBase_1.ValidationBase));
exports.CommandArgumentModel = CommandArgumentModel;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var V1CommandInputParameterModel_1 = __webpack_require__(33);
var V1WorkflowInputParameterModel_1 = __webpack_require__(51);
var JobHelper = /** @class */ (function () {
    function JobHelper() {
    }
    JobHelper.generateMockJobData = function (input) {
        var type = input.type.type;
        var items = input.type.items;
        var name = input.id;
        var symbols = input.type.symbols;
        var version = input instanceof V1CommandInputParameterModel_1.V1CommandInputParameterModel || input instanceof V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel ? "v1.0" : "sbg:draft-2";
        /**
         * Returns a random integer between min (included) and max (excluded)
         *
         * @param {number} min
         * @param {number} max
         * @returns {number}
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        /**
         * Returns a random floating number between min (inclusive) and max (exclusive)
         *
         * @param {number} min
         * @param {number} max
         * @returns {float}
         */
        function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
        }
        var file = function (name) {
            return {
                path: '/path/to/' + name + '.ext',
                'class': 'File',
                size: 0,
                contents: "file contents",
                secondaryFiles: []
            };
        };
        var map = {
            File: file(name),
            Directory: { path: "/path/to/" + name, "class": "Directory", basename: name },
            'enum': symbols ? symbols[0] : name,
            string: name + '-string-value',
            int: getRandomInt(0, 11),
            float: getRandomFloat(0, 11),
            boolean: true,
            record: {},
            map: {},
            array: {
                File: [
                    file(name + "-1"),
                    file(name + "-2")
                ],
                Directory: [
                    {
                        path: "/path/to/" + name,
                        "class": "Directory",
                        basename: name
                    },
                    {
                        path: "/path/to/" + name,
                        "class": "Directory",
                        basename: name
                    }
                ],
                string: [name + '-string-value-1', name + '-string-value-2'],
                int: [getRandomInt(0, 11), getRandomInt(0, 11)],
                float: [getRandomFloat(0, 11), getRandomFloat(0, 11)],
                record: [{}],
                map: [{}],
                'enum': [symbols ? symbols[0] || "" : name || ""],
                boolean: [true, true],
            }
        };
        var val = map[type];
        if (type === "array") {
            val = val[items];
            if (items === "record" && input.type.fields) {
                val = [];
                var obj_1 = {};
                input.type.fields.forEach(function (field) {
                    obj_1[field.id] = JobHelper.generateMockJobData(field);
                });
                // Objects must be cloned because of job management and later manipulation
                var obj1 = JSON.parse(JSON.stringify(obj_1));
                var obj2 = JSON.parse(JSON.stringify(obj_1));
                val.push(obj1);
                val.push(obj2);
            }
        }
        if (type === "record" && input.type.fields) {
            input.type.fields.forEach(function (field) {
                val[field.id] = JobHelper.generateMockJobData(field);
            });
        }
        if (type === "File" && version === "v1.0") {
            val = __assign({}, val, { basename: name + ".ext", nameroot: name, nameext: ".ext" });
        }
        return val !== undefined ? val : null;
    };
    JobHelper.getJobInputs = function (app) {
        var job = {};
        app.inputs.forEach(function (input) {
            job[input.id] = JobHelper.generateMockJobData(input);
        });
        return job;
    };
    JobHelper.getNullJobInputs = function (app) {
        var job = {};
        app.inputs.forEach(function (input) {
            job[input.id] = null;
        });
        return job;
    };
    return JobHelper;
}());
exports.JobHelper = JobHelper;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = __webpack_require__(27);
var html_utils_1 = __webpack_require__(116);
var svg_utils_1 = __webpack_require__(58);
var io_port_1 = __webpack_require__(57);
var GraphNode = /** @class */ (function () {
    function GraphNode(position, dataModel) {
        this.dataModel = dataModel;
        this.position = { x: 0, y: 0 };
        this.dataModel = dataModel;
        Object.assign(this.position, position);
    }
    GraphNode.makeIconFragment = function (model) {
        var iconStr = "";
        if (model instanceof models_1.StepModel && model.run) {
            if (model.run.class === "Workflow") {
                iconStr = this.workflowIconSvg;
            }
            else if (model.run.class === "CommandLineTool") {
                iconStr = this.toolIconSvg;
            }
        }
        else if (model instanceof models_1.WorkflowInputParameterModel && model.type) {
            if (model.type.type === "File" || (model.type.type === "array" && model.type.items === "File")) {
                iconStr = this.fileInputIconSvg;
            }
            else {
                iconStr = this.inputIconSvg;
            }
        }
        else if (model instanceof models_1.WorkflowOutputParameterModel && model.type) {
            if (model.type.type === "File" || (model.type.type === "array" && model.type.items === "File")) {
                iconStr = this.fileOutputIconSvg;
            }
            else {
                iconStr = this.outputIconSvg;
            }
        }
        return iconStr;
    };
    GraphNode.makeTemplate = function (dataModel, labelScale) {
        if (labelScale === void 0) { labelScale = 1; }
        var x = ~~(dataModel.customProps && dataModel.customProps["sbg:x"]);
        var y = ~~(dataModel.customProps && dataModel.customProps["sbg:y"]);
        var nodeTypeClass = "step";
        if (dataModel instanceof models_1.WorkflowInputParameterModel) {
            nodeTypeClass = "input";
        }
        else if (dataModel instanceof models_1.WorkflowOutputParameterModel) {
            nodeTypeClass = "output";
        }
        var inputs = (dataModel["in"] || []).filter(function (p) { return p.isVisible; });
        var outputs = (dataModel["out"] || []).filter(function (p) { return p.isVisible; });
        var maxPorts = Math.max(inputs.length, outputs.length);
        var radius = GraphNode.radius + maxPorts * io_port_1.IOPort.radius;
        var typeClass = "";
        var itemsClass = "";
        if (dataModel.type) {
            typeClass = "type-" + dataModel.type.type;
            if (dataModel.type.items) {
                itemsClass = "items-" + dataModel.type.items;
            }
        }
        var inputPortTemplates = inputs
            .sort(function (a, b) { return -a.id.localeCompare(b.id); })
            .map(function (p, i, arr) { return GraphNode.makePortTemplate(p, "input", svg_utils_1.SVGUtils.matrixToTransformAttr(GraphNode.createPortMatrix(arr.length, i, radius, "input"))); })
            .reduce(function (acc, tpl) { return acc + tpl; }, "");
        var outputPortTemplates = outputs
            .sort(function (a, b) { return -a.id.localeCompare(b.id); })
            .map(function (p, i, arr) { return GraphNode.makePortTemplate(p, "output", svg_utils_1.SVGUtils.matrixToTransformAttr(GraphNode.createPortMatrix(arr.length, i, radius, "output"))); })
            .reduce(function (acc, tpl) { return acc + tpl; }, "");
        return "\n            <g tabindex=\"-1\" class=\"node " + nodeTypeClass + " " + typeClass + " " + itemsClass + "\"\n               data-connection-id=\"" + dataModel.connectionId + "\"\n               transform=\"matrix(1, 0, 0, 1, " + x + ", " + y + ")\"\n               data-id=\"" + dataModel.id + "\">\n               \n                <g class=\"core\" transform=\"matrix(1, 0, 0, 1, 0, 0)\">\n                    <circle cx=\"0\" cy=\"0\" r=\"" + radius + "\" class=\"outer\"></circle>\n                    <circle cx=\"0\" cy=\"0\" r=\"" + radius * .75 + "\" class=\"inner\"></circle>\n                    \n                    " + GraphNode.makeIconFragment(dataModel) + "\n                </g>\n                \n                <text transform=\"matrix(" + labelScale + ",0,0," + labelScale + ",0," + (radius + 30) + ")\" class=\"title label\">" + html_utils_1.HtmlUtils.escapeHTML(dataModel.label || dataModel.id) + "</text>\n                \n                " + inputPortTemplates + "\n                " + outputPortTemplates + "\n            </g>\n        ";
    };
    GraphNode.makePortTemplate = function (port, type, transform) {
        if (transform === void 0) { transform = "matrix(1, 0, 0, 1, 0, 0)"; }
        var portClass = type === "input" ? "input-port" : "output-port";
        var label = port.label || port.id;
        return "\n            <g class=\"port " + portClass + "\" transform=\"" + (transform || "matrix(1, 0, 0, 1, 0, 0)") + "\"\n               data-connection-id=\"" + port.connectionId + "\"\n               data-port-id=\"" + port.id + "\"\n            >\n                <g class=\"io-port\">\n                    <circle cx=\"0\" cy=\"0\" r=\"7\" class=\"port-handle\"></circle>\n                </g>\n                <text x=\"0\" y=\"0\" transform=\"matrix(1,0,0,1,0,0)\" class=\"label unselectable\">" + label + "</text>\n            </g>\n            \n        ";
    };
    GraphNode.createPortMatrix = function (totalPortLength, portIndex, radius, type) {
        var availableAngle = 140;
        var rotationAngle = 
        // Starting rotation angle
        (-availableAngle / 2) +
            (
            // Angular offset by element index
            (portIndex + 1)
                // Angle between elements
                * availableAngle / (totalPortLength + 1));
        if (type === "input") {
            rotationAngle =
                // Determines the starting rotation angle
                180 - (availableAngle / -2)
                    // Determines the angular offset modifier for the current index
                    - (portIndex + 1)
                        // Determines the angular offset
                        * availableAngle / (totalPortLength + 1);
        }
        var matrix = svg_utils_1.SVGUtils.createMatrix();
        return matrix.rotate(rotationAngle).translate(radius, 0).rotate(-rotationAngle);
    };
    GraphNode.patchModelPorts = function (model) {
        var patch = [{ connectionId: model.connectionId, isVisible: true, id: model.id }];
        if (model instanceof models_1.WorkflowInputParameterModel) {
            var copy = Object.create(model);
            return Object.assign(copy, { out: patch });
        }
        else if (model instanceof models_1.WorkflowOutputParameterModel) {
            var copy = Object.create(model);
            return Object.assign(copy, { in: patch });
        }
        return model;
    };
    GraphNode.radius = 30;
    /**
     * @FIXME Making icons increases the rendering time by 50-100%. Try embedding the SVG directly.
     */
    GraphNode.workflowIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 400.01 399.88\" x=\"-9\" y=\"-10\" width=\"20\" height=\"20\"><title>workflow</title><path d=\"M400,200a80,80,0,0,1-140.33,52.53L158.23,303.24a80,80,0,1,1-17.9-35.77l101.44-50.71a80.23,80.23,0,0,1,0-33.52L140.33,132.53a79.87,79.87,0,1,1,17.9-35.77l101.44,50.71A80,80,0,0,1,400,200Z\" transform=\"translate(0.01 -0.16)\"/></svg>";
    GraphNode.toolIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 398.39 397.78\" x=\"-10\" y=\"-8\" width=\"20\" height=\"15\"><title>tool2</title><polygon points=\"38.77 397.57 0 366 136.15 198.78 0 31.57 38.77 0 200.63 198.78 38.77 397.57\"/><rect x=\"198.39\" y=\"347.78\" width=\"200\" height=\"50\"/></svg>";
    GraphNode.fileInputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499 462.86\" y=\"-10\" x=\"-11\" width=\"20\" height=\"20\"><title>file_input</title><path d=\"M386.06,0H175V58.29l50,50V50H337.81V163.38h25l86.19.24V412.86H225V353.71l-50,50v59.15H499V112.94Zm1.75,113.45v-41l41.1,41.1Z\"/><polygon points=\"387.81 1.06 387.81 1.75 387.12 1.06 387.81 1.06\"/><polygon points=\"290.36 231 176.68 344.68 141.32 309.32 194.64 256 0 256 0 206 194.64 206 142.32 153.68 177.68 118.32 290.36 231\"/></svg>";
    GraphNode.fileOutputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499 462.86\" x=\"-7\" y=\"-11\" width=\"20\" height=\"20\"><title>file_output</title><polygon points=\"387.81 1.06 387.81 1.75 387.12 1.06 387.81 1.06\"/><polygon points=\"499 231 385.32 344.68 349.96 309.32 403.28 256 208.64 256 208.64 206 403.28 206 350.96 153.68 386.32 118.32 499 231\"/><path d=\"M187.81,163.38l77.69.22H324V112.94L211.06,0H0V462.86H324V298.5H274V412.86H50V50H162.81V163.38Zm25-90.92,41.1,41.1-41.1-.11Z\"/></svg>";
    GraphNode.inputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 499 365\" x=\"-11\" y=\"-10\" width=\"20\" height=\"20\"><title>type_input</title><g id=\"input\"><path d=\"M316.5,68a181.72,181.72,0,0,0-114.12,40.09L238,143.72a132.5,132.5,0,1,1,1.16,214.39L203.48,393.8A182.5,182.5,0,1,0,316.5,68Z\" transform=\"translate(0 -68)\"/><g id=\"Layer_22\" data-name=\"Layer 22\"><g id=\"Layer_9_copy_4\" data-name=\"Layer 9 copy 4\"><polygon points=\"290.36 182 176.68 295.68 141.32 260.32 194.64 207 0 207 0 157 194.64 157 142.32 104.68 177.68 69.32 290.36 182\"/></g></g></g></svg>";
    GraphNode.outputIconSvg = "<svg class=\"node-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 500.36 365\" x=\"-9\" y=\"-10\" width=\"20\" height=\"20\"><title>type_output</title><g id=\"output\"><path d=\"M291.95,325.23a134,134,0,0,1-15.76,19,132.5,132.5,0,1,1,0-187.38,133.9,133.9,0,0,1,16.16,19.55l35.81-35.81A182.5,182.5,0,1,0,327.73,361Z\" transform=\"translate(0 -68)\"/><g id=\"circle_source_copy\" data-name=\"circle source copy\"><g id=\"Layer_22_copy\" data-name=\"Layer 22 copy\"><g id=\"Layer_9_copy_5\" data-name=\"Layer 9 copy 5\"><polygon points=\"500.36 182 386.68 295.68 351.32 260.32 404.64 207 210 207 210 157 404.64 157 352.32 104.68 387.68 69.32 500.36 182\"/></g></g></g></g></svg>";
    return GraphNode;
}());
exports.GraphNode = GraphNode;
//# sourceMappingURL=graph-node.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(78);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(83));
__export(__webpack_require__(110));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowModel_1 = __webpack_require__(11);
var V1WorkflowModel_1 = __webpack_require__(84);
var SBDraft2WorkflowModel_1 = __webpack_require__(104);
var WorkflowFactory = /** @class */ (function () {
    function WorkflowFactory() {
    }
    WorkflowFactory.from = function (workflow, loc) {
        // check if workflow passed has already been parsed to the model
        if (workflow instanceof WorkflowModel_1.WorkflowModel)
            return workflow;
        if (workflow) {
            switch (workflow.cwlVersion) {
                case "v1.0":
                    return new V1WorkflowModel_1.V1WorkflowModel(workflow, loc);
                case "sbg:draft-2":
                case "draft-2":
                default:
                    return new SBDraft2WorkflowModel_1.SBDraft2WorkflowModel(workflow, loc);
            }
        }
        return new SBDraft2WorkflowModel_1.SBDraft2WorkflowModel(workflow, loc);
    };
    return WorkflowFactory;
}());
exports.WorkflowFactory = WorkflowFactory;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode_1 = __webpack_require__(1);
/**
 * Name has to be present even if not initially added because of Avro compatibility
 * @name nameRequirement
 * @link https://docs.oracle.com/cd/E57769_01/html/GettingStartedGuide/avroschemas.html
 */
var TypeResolver = /** @class */ (function () {
    function TypeResolver() {
    }
    TypeResolver.resolveType = function (originalType, result) {
        result = result || {
            type: null,
            items: null,
            fields: null,
            symbols: null,
            isNullable: false,
            isItemOrArray: false,
            typeBinding: null,
            name: null,
            unionType: null
        };
        if (originalType === null || originalType === undefined) {
            result.isNullable = true;
            return result;
        }
        var tmp = originalType;
        if (typeof originalType.serialize === "function") {
            tmp = originalType.serialize();
        }
        var type;
        // clone type object because it will be sliced and modified later
        try {
            type = JSON.parse(JSON.stringify(tmp));
        }
        catch (err) {
            type = __assign({}, tmp);
            console.error(err);
        }
        if (typeof type === 'string') {
            var matches = /(\w+)([\[\]?]+)/g.exec(type);
            if (matches) {
                if (/\?/.test(matches[2])) {
                    result.isNullable = true;
                }
                if (/\[]/.test(matches[2])) {
                    result.type = 'array';
                    result.items = matches[1];
                }
                else {
                    result.type = matches[1];
                }
                return result;
            }
            else {
                result.type = type;
                return result;
            }
        }
        else if (Array.isArray(type)) {
            // check if type is required
            var nullIndex = type.indexOf('null');
            if (nullIndex > -1) {
                result.isNullable = true;
                type.splice(nullIndex, 1);
            }
            if (type.length !== 1) {
                // check if type has only two remaining values
                if (type.length === 2) {
                    // resolve types to TypeResolution
                    var type0 = TypeResolver.resolveType(type[0]);
                    var type1 = TypeResolver.resolveType(type[1]);
                    // check if types are actually item and item[]
                    if (type0.items === type1.type || type1.items === type0.type) {
                        // remove type which is array for encoding
                        type0.type === "array" ? type.splice(0, 1) : type.splice(1, 1);
                        result.isItemOrArray = true;
                    }
                    else {
                        result.unionType = type;
                        throw new ErrorCode_1.ValidityError("TypeResolverError: Union types not supported yet. Found type " + type, ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                    }
                }
                else {
                    result.unionType = type;
                    throw new ErrorCode_1.ValidityError("TypeResolverError: Union types not supported yet! Found type " + type, ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                }
            }
            if (typeof type[0] === 'string') {
                return TypeResolver.resolveType(type[0], result);
            }
            else {
                if (typeof type[0] === 'object') {
                    return TypeResolver.resolveType(type[0], result);
                }
                else {
                    throw new ErrorCode_1.ValidityError("TypeResolverError: expected complex object, instead got " + type[0], ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                }
            }
        }
        else if (typeof type === 'object') {
            if (type.type) {
                // result type has already been set, pass through is evaluating complex items type
                if (result.type === "array") {
                    result.items = type.type;
                }
                else {
                    // first pass through, type should be set  on result
                    result.type = type.type;
                }
                switch (type.type) {
                    case "array":
                        result.typeBinding = type.inputBinding || null;
                        if (typeof type.items === 'string') {
                            // primitive types don't need to be reevaluated
                            result.items = type.items;
                            return result;
                        }
                        else if (Array.isArray(type.items) || type.items.type === "array") {
                            // complex types that aren't currently supported but should be preserved
                            result.items = type.items;
                            return result;
                        }
                        else {
                            // complex types should be reevaluated to set fields/symbols/items properties
                            return TypeResolver.resolveType(type.items, result);
                        }
                    case "record":
                        result.fields = type.fields;
                        result.name = type.name || null;
                        return result;
                    case "enum":
                        result.symbols = type.symbols;
                        result.name = type.name || null;
                        return result;
                    case "string":
                    case "File":
                    case "null":
                    case "boolean":
                    case "int":
                    case "long":
                    case "Directory":
                    case "double":
                        return result;
                    default:
                        throw new ErrorCode_1.ValidityError("TypeResolverError: unmatched complex type, expected 'enum', 'array', or 'record', got '" + type.type + "'", ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
                }
            }
            else {
                throw new ErrorCode_1.ValidityError("TypeResolverError: expected complex object with type field, instead got " + JSON.stringify(type), ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
            }
        }
        else {
            throw new ErrorCode_1.ValidityError("TypeResolverError: expected complex object, array, or string, instead got " + type, ErrorCode_1.ErrorCode.TYPE_UNSUPPORTED);
        }
    };
    TypeResolver.doesTypeMatch = function (type, value) {
        if (type) {
            switch (type) {
                case 'int':
                case 'float':
                case 'long':
                case 'double':
                    return typeof value === 'number';
                case 'File':
                case 'record':
                case "Directory":
                    return typeof value === 'object' && !Array.isArray(value);
                case 'array':
                    return Array.isArray(value);
                case 'enum':
                    return typeof value === 'string';
                default:
                    return typeof value === type;
            }
        }
        return true;
    };
    TypeResolver.serializeType = function (type, version) {
        var t;
        if (type.unionType) {
            var union = type.unionType;
            type.type === "array" ? type.items = union : type.type = union;
            if (type.isNullable) {
                union.push("null");
                type.isNullable = false;
            }
        }
        if (type.type === null || type.type === undefined) {
            return null;
        }
        switch (type.type) {
            case "array":
                if (type.items === "enum") {
                    t = {
                        type: "array",
                        items: {
                            type: "enum",
                            /** @see nameRequirement */
                            name: type.name || "",
                            symbols: type.symbols
                        }
                    };
                }
                else if (type.items === "record") {
                    t = {
                        type: "array",
                        items: {
                            type: "record",
                            /** @see nameRequirement */
                            name: type.name || "",
                            fields: type.fields.map(function (field) {
                                if (typeof field.serialize === "function") {
                                    return field.serialize();
                                }
                                else {
                                    return field;
                                }
                            })
                        }
                    };
                }
                else if (version === "v1.0" && !type.typeBinding && typeof type.items === "string") {
                    t = type.items + "[]";
                }
                else {
                    t = {
                        type: "array",
                        items: type.items
                    };
                    if (type.typeBinding)
                        t.inputBinding = type.typeBinding;
                }
                break;
            case "record":
                t = {
                    type: "record",
                    fields: type.fields.map(function (field) {
                        if (typeof field.serialize === "function") {
                            return field.serialize();
                        }
                        else {
                            return field;
                        }
                    }),
                    /** @see nameRequirement */
                    name: type.name || ""
                };
                if (type.typeBinding)
                    t.inputBinding = type.typeBinding;
                break;
            case "enum":
                t = {
                    type: "enum",
                    symbols: type.symbols,
                    /** @see nameRequirement */
                    name: type.name || ""
                };
                if (type.typeBinding)
                    t.inputBinding = type.typeBinding;
                break;
            default:
                t = type.type;
        }
        // type should be serialized as an array of ["item", "item[]"]
        if (type.isItemOrArray) {
            var tArr = {
                type: "array",
                items: t
            };
            t = [t];
            t.push(tArr);
            if (type.isNullable) {
                t.unshift("null");
            }
            return t;
        }
        if (type.isNullable) {
            t = version === "v1.0" && typeof t === "string" ? t + "?" : ["null", t];
        }
        else if (version !== "v1.0") {
            t = [t];
        }
        return t;
    };
    return TypeResolver;
}());
exports.TypeResolver = TypeResolver;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolModel_1 = __webpack_require__(22);
var V1CommandLineToolModel_1 = __webpack_require__(88);
var SBDraft2CommandLineToolModel_1 = __webpack_require__(94);
var CommandLineToolFactory = /** @class */ (function () {
    function CommandLineToolFactory() {
    }
    CommandLineToolFactory.from = function (tool, loc) {
        // check if tool passed has already been parsed to the model
        if (tool instanceof CommandLineToolModel_1.CommandLineToolModel)
            return tool;
        if (tool) {
            switch (tool.cwlVersion) {
                case "v1.0":
                    return new V1CommandLineToolModel_1.V1CommandLineToolModel(tool, loc);
                case "sbg:draft-2":
                case "draft-2":
                default:
                    return new SBDraft2CommandLineToolModel_1.SBDraft2CommandLineToolModel(tool, loc);
            }
        }
        return new SBDraft2CommandLineToolModel_1.SBDraft2CommandLineToolModel(tool, loc);
    };
    return CommandLineToolFactory;
}());
exports.CommandLineToolFactory = CommandLineToolFactory;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandLinePart = /** @class */ (function () {
    function CommandLinePart(value, type, loc) {
        value = value === undefined ? '' : value; // in case expression returned undefined
        value = value.toString(); // in case expression returned something other than a string
        this.value = value.trim();
        this.type = type;
        this.loc = loc;
    }
    return CommandLinePart;
}());
exports.CommandLinePart = CommandLinePart;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var CommandLineBindingModel = /** @class */ (function (_super) {
    __extends(CommandLineBindingModel, _super);
    function CommandLineBindingModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    CommandLineBindingModel.prototype.validate = function (context) {
        var _this = this;
        new UnimplementedMethodException_1.UnimplementedMethodException("validate", "CommandLineBindingModel");
        return new Promise(function (res, rej) { return res(_this.issues); });
    };
    CommandLineBindingModel.prototype.setValueFrom = function (val) {
        new UnimplementedMethodException_1.UnimplementedMethodException("setValueFrom", "CommandLineBindingModel");
    };
    CommandLineBindingModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "CommandLineBindingModel");
        return null;
    };
    CommandLineBindingModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "CommandLineBindingModel");
    };
    CommandLineBindingModel.prototype.cloneStatus = function (clone) {
        this.setIssue(__assign({}, clone.issues));
        this.deserialize(clone.serialize());
    };
    ;
    return CommandLineBindingModel;
}(ValidationBase_1.ValidationBase));
exports.CommandLineBindingModel = CommandLineBindingModel;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandInputParameterModel_1 = __webpack_require__(10);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1CommandLineBindingModel_1 = __webpack_require__(50);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1CommandInputParameterModel = /** @class */ (function (_super) {
    __extends(V1CommandInputParameterModel, _super);
    function V1CommandInputParameterModel(attr, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.secondaryFiles = [];
        _this.hasSecondaryFiles = true;
        _this.hasSecondaryFilesInRoot = true;
        _this.hasStageInput = false;
        if (attr)
            _this.deserialize(attr);
        return _this;
    }
    V1CommandInputParameterModel.prototype.updateInputBinding = function (binding) {
        var _this = this;
        if (binding instanceof V1CommandLineBindingModel_1.V1CommandLineBindingModel) {
            //@todo breaks here for "serialize of undefined"
            this.inputBinding.cloneStatus(binding);
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    V1CommandInputParameterModel.prototype.createInputBinding = function () {
        var _this = this;
        this.inputBinding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel({}, this.loc + ".inputBinding", this.eventHub);
        this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return this.inputBinding;
    };
    V1CommandInputParameterModel.prototype.addSecondaryFile = function (file) {
        return this._addSecondaryFile(file, V1ExpressionModel_1.V1ExpressionModel, this.loc);
    };
    V1CommandInputParameterModel.prototype.updateSecondaryFiles = function (files) {
        this._updateSecondaryFiles(files);
    };
    V1CommandInputParameterModel.prototype.removeSecondaryFile = function (index) {
        this._removeSecondaryFile(index);
    };
    V1CommandInputParameterModel.prototype.serialize = function () {
        var base = __assign({}, this.customProps);
        if (this.isField) {
            base.name = this.id || "";
        }
        else {
            base.id = this.id || "";
        }
        base.type = this.type.serialize("v1.0");
        if (this.inputBinding)
            base.inputBinding = this.inputBinding.serialize();
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.doc = this.description;
        if (this.fileTypes.length && !this.isField) {
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        }
        if (this.streamable !== undefined && !this.isField) {
            base.streamable = this.streamable;
        }
        if (this.secondaryFiles && this.secondaryFiles.length && !this.isField) {
            base.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
        }
        return base;
    };
    V1CommandInputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["type", "doc", "inputBinding", "label", "secondaryFiles", "sbg:fileTypes", "streamable"];
        if (attr.name) {
            this.id = attr.name;
            this.isField = true;
            serializedKeys.push("name");
        }
        else {
            this.id = attr.id;
            serializedKeys.push("id");
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, V1CommandInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        if (attr.inputBinding) {
            this.inputBinding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel(attr.inputBinding, this.loc + ".inputBinding", this.eventHub);
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        this.label = attr.label;
        this.description = utils_1.ensureArray(attr.doc).join('\n');
        this.secondaryFiles = utils_1.ensureArray(attr.secondaryFiles).map(function (f) { return _this.addSecondaryFile(f); });
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.streamable = attr.streamable;
        this.attachFileTypeListeners();
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1CommandInputParameterModel;
}(CommandInputParameterModel_1.CommandInputParameterModel));
exports.V1CommandInputParameterModel = V1CommandInputParameterModel;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(0);
var DockerRequirementModel = /** @class */ (function (_super) {
    __extends(DockerRequirementModel, _super);
    function DockerRequirementModel(req, loc) {
        var _this = _super.call(this, loc) || this;
        _this.class = "DockerRequirement";
        _this.customProps = {};
        _this.serializedKeys = [
            "class",
            "dockerFile",
            "dockerImageId",
            "dockerLoad",
            "dockerOutputDirectory",
            "dockerPull"
        ];
        if (req)
            _this.deserialize(req);
        return _this;
    }
    DockerRequirementModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        this.serializedKeys.forEach(function (key) {
            if (_this[key])
                base[key] = _this[key];
        });
        // don't serialize if the only property that is being serialized is the class
        var keys = Object.keys(base);
        var customPropsKeys = Object.keys(this.customProps);
        if (keys.length === 1 && keys[0] === "class" && customPropsKeys.length === 0) {
            return undefined;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    DockerRequirementModel.prototype.deserialize = function (attr) {
        var _this = this;
        this.serializedKeys.forEach(function (key) {
            _this[key] = attr[key];
        });
        this.class = "DockerRequirement";
        utils_1.spreadSelectProps(attr, this.customProps, this.serializedKeys);
    };
    return DockerRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.DockerRequirementModel = DockerRequirementModel;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var ErrorCode_1 = __webpack_require__(1);
var CommandOutputBindingModel = /** @class */ (function (_super) {
    __extends(CommandOutputBindingModel, _super);
    function CommandOutputBindingModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    CommandOutputBindingModel.prototype.setGlob = function (value, exprConstructor) {
        var _this = this;
        var val = value.serialize();
        this._glob.clearIssue(ErrorCode_1.ErrorCode.ALL);
        this._glob = new exprConstructor(val, this.loc + ".glob", this.eventHub);
        this._glob.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.validateGlob();
    };
    CommandOutputBindingModel.prototype.validateGlob = function () {
        if (!this._glob)
            return;
        if (this._glob.serialize() === undefined) {
            this._glob.setIssue((_a = {},
                _a[this.loc + ".glob"] = {
                    message: "Glob should be specified",
                    type: "warning",
                    code: ErrorCode_1.ErrorCode.OUTPUT_GLOB_MISSING
                },
                _a), true);
        }
        else {
            this._glob.clearIssue(ErrorCode_1.ErrorCode.OUTPUT_GLOB_MISSING);
        }
        var _a;
    };
    CommandOutputBindingModel.prototype.setOutputEval = function (value, exprConstructor) {
        var _this = this;
        if (this._outputEval) {
            this._outputEval.clearIssue(ErrorCode_1.ErrorCode.ALL);
        }
        this._outputEval = new exprConstructor(value.serialize(), this.loc + ".outputEval", this.eventHub);
        this._outputEval.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    return CommandOutputBindingModel;
}(ValidationBase_1.ValidationBase));
exports.CommandOutputBindingModel = CommandOutputBindingModel;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UnimplementedMethodException_1 = __webpack_require__(3);
var ProcessRequirementModel_1 = __webpack_require__(12);
var ErrorCode_1 = __webpack_require__(1);
var CreateFileRequirementModel = /** @class */ (function (_super) {
    __extends(CreateFileRequirementModel, _super);
    function CreateFileRequirementModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        return _this;
    }
    CreateFileRequirementModel.prototype.addDirent = function (def) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addDirent", "CreateFileRequirementModel");
        return null;
    };
    CreateFileRequirementModel.prototype.addExpression = function (e) {
        new UnimplementedMethodException_1.UnimplementedMethodException("addExpression", "CreateFileRequirementModel");
        return null;
    };
    CreateFileRequirementModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        return Promise.all(this.listing.map(function (dir) { return dir.validate(context); }))
            .then(function () { return _this.issues; }, function () { return _this.issues; });
    };
    return CreateFileRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.CreateFileRequirementModel = CreateFileRequirementModel;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var UnimplementedMethodException_1 = __webpack_require__(3);
var ErrorCode_1 = __webpack_require__(1);
var DirentModel = /** @class */ (function (_super) {
    __extends(DirentModel, _super);
    function DirentModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.customProps = {};
        return _this;
    }
    DirentModel.prototype.serialize = function () {
        new UnimplementedMethodException_1.UnimplementedMethodException("serialize", "DirentModel");
        return null;
    };
    DirentModel.prototype.deserialize = function (attr) {
        new UnimplementedMethodException_1.UnimplementedMethodException("deserialize", "DirentModel");
    };
    DirentModel.prototype.validate = function (context) {
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        return Promise.all([this.entry.validate(context), this.entryName.validate(context)]);
    };
    return DirentModel;
}(ValidationBase_1.ValidationBase));
exports.DirentModel = DirentModel;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var ResourceRequirementModel = /** @class */ (function (_super) {
    __extends(ResourceRequirementModel, _super);
    function ResourceRequirementModel(loc, eventHub) {
        var _this = _super.call(this, loc) || this;
        _this.eventHub = eventHub;
        _this.class = "ResourceRequirement";
        return _this;
    }
    return ResourceRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.ResourceRequirementModel = ResourceRequirementModel;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(40));
__export(__webpack_require__(59));
__export(__webpack_require__(61));
__export(__webpack_require__(64));
__export(__webpack_require__(68));
__export(__webpack_require__(66));
__export(__webpack_require__(65));
__export(__webpack_require__(42));
__export(__webpack_require__(63));
__export(__webpack_require__(69));
// for implementing third-party plugins
__export(__webpack_require__(8));
//# sourceMappingURL=index.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dom_events_1 = __webpack_require__(114);
var event_hub_1 = __webpack_require__(115);
var edge_1 = __webpack_require__(41);
var graph_node_1 = __webpack_require__(25);
var step_node_1 = __webpack_require__(59);
var template_parser_1 = __webpack_require__(60);
/**
 * @FIXME validation states of old and newly created edges
 */
var Workflow = /** @class */ (function () {
    function Workflow(parameters) {
        var _this = this;
        this.svgID = this.makeID();
        this.minScale = 0.2;
        this.maxScale = 2;
        this.editingEnabled = true;
        /** Scale of labels, they are different than scale of other elements in the workflow */
        this.labelScale = 1;
        this.plugins = [];
        this.handlersThatCanBeDisabled = [];
        this.disposers = [];
        this.pendingFirstDraw = true;
        /** Current scale of the document */
        this._scale = 1;
        this.svgRoot = parameters.svgRoot;
        this.plugins = parameters.plugins || [];
        this.domEvents = new dom_events_1.DomEvents(this.svgRoot);
        this.model = parameters.model;
        this.editingEnabled = parameters.editingEnabled !== false; // default to true if undefined
        this.svgRoot.classList.add(this.svgID);
        this.svgRoot.innerHTML = "\n            <rect x=\"0\" y=\"0\" width=\"100%\" height=\"100%\" class=\"pan-handle\" transform=\"matrix(1,0,0,1,0,0)\"></rect>\n            <g class=\"workflow\" transform=\"matrix(1,0,0,1,0,0)\"></g>\n        ";
        this.workflow = this.svgRoot.querySelector(".workflow");
        this.invokePlugins("registerWorkflow", this);
        this.eventHub = new event_hub_1.EventHub([
            "connection.create",
            "app.create.step",
            "app.create.input",
            "app.create.output",
            "beforeChange",
            "afterChange",
            "afterRender",
            "selectionChange"
        ]);
        this.hookPlugins();
        this.draw(parameters.model);
        this.eventHub.on("afterRender", function () { return _this.invokePlugins("afterRender"); });
    }
    Object.defineProperty(Workflow.prototype, "scale", {
        get: function () {
            return this._scale;
        },
        // noinspection JSUnusedGlobalSymbols
        set: function (scale) {
            this.workflowBoundingClientRect = this.svgRoot.getBoundingClientRect();
            var x = (this.workflowBoundingClientRect.right + this.workflowBoundingClientRect.left) / 2;
            var y = (this.workflowBoundingClientRect.top + this.workflowBoundingClientRect.bottom) / 2;
            this.scaleAtPoint(scale, x, y);
        },
        enumerable: true,
        configurable: true
    });
    Workflow.canDrawIn = function (element) {
        return element.getBoundingClientRect().width !== 0;
    };
    Workflow.makeConnectionPath = function (x1, y1, x2, y2, forceDirection) {
        if (forceDirection === void 0) { forceDirection = "right"; }
        if (!forceDirection) {
            return "M " + x1 + " " + y1 + " C " + (x1 + x2) / 2 + " " + y1 + " " + (x1 + x2) / 2 + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "right") {
            var outDir = x1 + Math.abs(x1 - x2) / 2;
            var inDir = x2 - Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "left") {
            var outDir = x1 - Math.abs(x1 - x2) / 2;
            var inDir = x2 + Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
    };
    Workflow.prototype.draw = function (model) {
        var _this = this;
        if (model === void 0) { model = this.model; }
        // We will need to restore the transformations when we redraw the model, so save the current state
        var oldTransform = this.workflow.getAttribute("transform");
        var modelChanged = this.model !== model;
        if (modelChanged || this.pendingFirstDraw) {
            this.pendingFirstDraw = false;
            this.model = model;
            var stepChangeDisposer_1 = this.model.on("step.change", this.onStepChange.bind(this));
            var stepCreateDisposer_1 = this.model.on("step.create", this.onStepCreate.bind(this));
            var stepRemoveDisposer_1 = this.model.on("step.remove", this.onStepRemove.bind(this));
            var inputCreateDisposer_1 = this.model.on("input.create", this.onInputCreate.bind(this));
            var inputRemoveDisposer_1 = this.model.on("input.remove", this.onInputRemove.bind(this));
            var outputCreateDisposer_1 = this.model.on("output.create", this.onOutputCreate.bind(this));
            var outputRemoveDisposer_1 = this.model.on("output.remove", this.onOutputRemove.bind(this));
            var stepInPortShowDisposer_1 = this.model.on("step.inPort.show", this.onInputPortShow.bind(this));
            var stepInPortHideDisposer_1 = this.model.on("step.inPort.hide", this.onInputPortHide.bind(this));
            var connectionCreateDisposer_1 = this.model.on("connection.create", this.onConnectionCreate.bind(this));
            var connectionRemoveDisposer_1 = this.model.on("connection.remove", this.onConnectionRemove.bind(this));
            var stepOutPortCreateDisposer_1 = this.model.on("step.outPort.create", this.onOutputPortCreate.bind(this));
            var stepOutPortRemoveDisposer_1 = this.model.on("step.outPort.remove", this.onOutputPortRemove.bind(this));
            this.disposers.push(function () {
                stepChangeDisposer_1.dispose();
                stepCreateDisposer_1.dispose();
                stepRemoveDisposer_1.dispose();
                inputCreateDisposer_1.dispose();
                inputRemoveDisposer_1.dispose();
                outputCreateDisposer_1.dispose();
                outputRemoveDisposer_1.dispose();
                stepInPortShowDisposer_1.dispose();
                stepInPortHideDisposer_1.dispose();
                connectionCreateDisposer_1.dispose();
                connectionRemoveDisposer_1.dispose();
                stepOutPortCreateDisposer_1.dispose();
                stepOutPortRemoveDisposer_1.dispose();
            });
            this.invokePlugins("afterModelChange");
        }
        this.clearCanvas();
        var nodes = __spread(this.model.steps, this.model.inputs, this.model.outputs).filter(function (n) { return n.isVisible; });
        /**
         * If there is a missing sbg:x or sbg:y property on any node model,
         * graph should be arranged to avoid random placement.
         */
        var arrangeNecessary = false;
        var nodeTemplate = "";
        try {
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                var patched = graph_node_1.GraphNode.patchModelPorts(node);
                var missingX = isNaN(parseInt(patched.customProps["sbg:x"]));
                var missingY = isNaN(parseInt(patched.customProps["sbg:y"]));
                if (missingX || missingY) {
                    arrangeNecessary = true;
                }
                nodeTemplate += graph_node_1.GraphNode.makeTemplate(patched);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.workflow.innerHTML += nodeTemplate;
        this.redrawEdges();
        Array.from(this.workflow.querySelectorAll(".node")).forEach(function (e) {
            _this.workflow.appendChild(e);
        });
        this.addEventListeners();
        this.workflow.setAttribute("transform", oldTransform);
        this.scaleAtPoint(this.scale);
        this.invokePlugins("afterRender");
        var e_1, _a;
    };
    Workflow.prototype.findParent = function (el, parentClass) {
        if (parentClass === void 0) { parentClass = "node"; }
        var parentNode = el;
        while (parentNode) {
            if (parentNode.classList.contains(parentClass)) {
                return parentNode;
            }
            parentNode = parentNode.parentElement;
        }
    };
    /**
     * Retrieves a plugin instance
     * @param {{new(...args: any[]) => T}} plugin
     * @returns {T}
     */
    Workflow.prototype.getPlugin = function (plugin) {
        return this.plugins.find(function (p) { return p instanceof plugin; });
    };
    Workflow.prototype.on = function (event, handler) {
        this.eventHub.on(event, handler);
    };
    Workflow.prototype.off = function (event, handler) {
        this.eventHub.off(event, handler);
    };
    /**
     * Scales the workflow to fit the available viewport
     */
    Workflow.prototype.fitToViewport = function (ignoreScaleLimits) {
        if (ignoreScaleLimits === void 0) { ignoreScaleLimits = false; }
        this.scaleAtPoint(1);
        Object.assign(this.workflow.transform.baseVal.getItem(0).matrix, {
            e: 0,
            f: 0
        });
        var clientBounds = this.svgRoot.getBoundingClientRect();
        var wfBounds = this.workflow.getBoundingClientRect();
        var padding = 100;
        if (clientBounds.width === 0 || clientBounds.height === 0) {
            throw new Error("Cannot fit workflow to the area that has no visible viewport.");
        }
        var verticalScale = (wfBounds.height) / (clientBounds.height - padding);
        var horizontalScale = (wfBounds.width) / (clientBounds.width - padding);
        var scaleFactor = Math.max(verticalScale, horizontalScale);
        // Cap the upscaling to 1, we don't want to zoom in workflows that would fit anyway
        var newScale = Math.min(this.scale / scaleFactor, 1);
        if (!ignoreScaleLimits) {
            newScale = Math.max(newScale, this.minScale);
        }
        this.scaleAtPoint(newScale);
        var scaledWFBounds = this.workflow.getBoundingClientRect();
        var moveY = clientBounds.top - scaledWFBounds.top + Math.abs(clientBounds.height - scaledWFBounds.height) / 2;
        var moveX = clientBounds.left - scaledWFBounds.left + Math.abs(clientBounds.width - scaledWFBounds.width) / 2;
        var matrix = this.workflow.transform.baseVal.getItem(0).matrix;
        matrix.e += moveX;
        matrix.f += moveY;
    };
    Workflow.prototype.redrawEdges = function () {
        var _this = this;
        var highlightedEdges = new Set();
        Array.from(this.workflow.querySelectorAll(".edge")).forEach(function (el) {
            if (el.classList.contains("highlighted")) {
                var edgeID = el.attributes["data-source-connection"].value + el.attributes["data-destination-connection"].value;
                highlightedEdges.add(edgeID);
            }
            el.remove();
        });
        var edgesTpl = this.model.connections
            .map(function (c) {
            var edgeId = c.source.id + c.destination.id;
            var edgeStates = highlightedEdges.has(edgeId) ? "highlighted" : "";
            return edge_1.Edge.makeTemplate(c, _this.workflow, edgeStates);
        })
            .reduce(function (acc, tpl) { return acc + tpl; }, "");
        this.workflow.innerHTML = edgesTpl + this.workflow.innerHTML;
    };
    /**
     * Scale the workflow by the scaleCoefficient (not compounded) over given coordinates
     */
    Workflow.prototype.scaleAtPoint = function (scale, x, y) {
        if (scale === void 0) { scale = 1; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this._scale = scale;
        this.labelScale = 1 + (1 - this._scale) / (this._scale * 2);
        var transform = this.workflow.transform.baseVal;
        var matrix = transform.getItem(0).matrix;
        var coords = this.transformScreenCTMtoCanvas(x, y);
        matrix.e += matrix.a * coords.x;
        matrix.f += matrix.a * coords.y;
        matrix.a = matrix.d = scale;
        matrix.e -= scale * coords.x;
        matrix.f -= scale * coords.y;
        var nodeLabels = this.workflow.querySelectorAll(".node .label");
        try {
            for (var nodeLabels_1 = __values(nodeLabels), nodeLabels_1_1 = nodeLabels_1.next(); !nodeLabels_1_1.done; nodeLabels_1_1 = nodeLabels_1.next()) {
                var el = nodeLabels_1_1.value;
                var matrix_1 = el.transform.baseVal.getItem(0).matrix;
                Object.assign(matrix_1, {
                    a: this.labelScale,
                    d: this.labelScale
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (nodeLabels_1_1 && !nodeLabels_1_1.done && (_a = nodeLabels_1.return)) _a.call(nodeLabels_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _a;
    };
    Workflow.prototype.transformScreenCTMtoCanvas = function (x, y) {
        var svg = this.svgRoot;
        var ctm = this.workflow.getScreenCTM();
        var point = svg.createSVGPoint();
        point.x = x;
        point.y = y;
        var t = point.matrixTransform(ctm.inverse());
        return {
            x: t.x,
            y: t.y
        };
    };
    Workflow.prototype.enableEditing = function (enabled) {
        this.invokePlugins("onEditableStateChange", enabled);
        this.editingEnabled = enabled;
    };
    // noinspection JSUnusedGlobalSymbols
    Workflow.prototype.destroy = function () {
        this.svgRoot.classList.remove(this.svgID);
        this.clearCanvas();
        this.eventHub.empty();
        this.invokePlugins("destroy");
        try {
            for (var _a = __values(this.disposers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var dispose = _b.value;
                dispose();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var e_3, _c;
    };
    Workflow.prototype.resetTransform = function () {
        this.workflow.setAttribute("transform", "matrix(1,0,0,1,0,0)");
        this.scaleAtPoint();
    };
    Workflow.prototype.addEventListeners = function () {
        var _this = this;
        /**
         * Attach canvas panning
         */
        {
            var pane_1;
            var x_1;
            var y_1;
            var matrix_2;
            this.domEvents.drag(".pan-handle", function (dx, dy) {
                matrix_2.e = x_1 + dx;
                matrix_2.f = y_1 + dy;
            }, function (ev, el, root) {
                pane_1 = root.querySelector(".workflow");
                matrix_2 = pane_1.transform.baseVal.getItem(0).matrix;
                x_1 = matrix_2.e;
                y_1 = matrix_2.f;
            }, function () {
                pane_1 = undefined;
                matrix_2 = undefined;
            });
        }
        /**
         * On mouse over node, bring it to the front
         */
        this.domEvents.on("mouseover", ".node", function (ev, target, root) {
            if (_this.workflow.querySelector(".edge.dragged")) {
                return;
            }
            target.parentElement.appendChild(target);
        });
    };
    Workflow.prototype.clearCanvas = function () {
        this.domEvents.detachAll();
        this.workflow.innerHTML = "";
        this.workflow.setAttribute("transform", "matrix(1,0,0,1,0,0)");
        this.workflow.setAttribute("class", "workflow");
    };
    Workflow.prototype.hookPlugins = function () {
        var _this = this;
        this.plugins.forEach(function (plugin) {
            plugin.registerOnBeforeChange(function (event) {
                _this.eventHub.emit("beforeChange", event);
            });
            plugin.registerOnAfterChange(function (event) {
                _this.eventHub.emit("afterChange", event);
            });
            plugin.registerOnAfterRender(function (event) {
                _this.eventHub.emit("afterRender", event);
            });
        });
    };
    Workflow.prototype.invokePlugins = function (methodName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.plugins.forEach(function (plugin) {
            if (typeof plugin[methodName] === "function") {
                plugin[methodName].apply(plugin, __spread(args));
            }
        });
    };
    /**
     * Listener for “connection.create” event on model that renders new edges on canvas
     */
    Workflow.prototype.onConnectionCreate = function (source, destination) {
        if (!source.isVisible || !destination.isVisible) {
            return;
        }
        var sourceID = source.connectionId;
        var destinationID = destination.connectionId;
        edge_1.Edge.spawnBetweenConnectionIDs(this.workflow, sourceID, destinationID);
    };
    /**
     * Listener for "connection.remove" event on the model that disconnects nodes
     */
    Workflow.prototype.onConnectionRemove = function (source, destination) {
        if (!source.isVisible || !destination.isVisible) {
            return;
        }
        var sourceID = source.connectionId;
        var destinationID = destination.connectionId;
        var edge = this.svgRoot.querySelector(".edge[data-source-connection=\"" + sourceID + "\"][data-destination-connection=\"" + destinationID + "\"");
        edge.remove();
    };
    /**
     * Listener for “input.create” event on model that renders workflow inputs
     */
    Workflow.prototype.onInputCreate = function (input) {
        if (!input.isVisible) {
            return;
        }
        var patched = graph_node_1.GraphNode.patchModelPorts(input);
        var graphTemplate = graph_node_1.GraphNode.makeTemplate(patched, this.labelScale);
        var el = template_parser_1.TemplateParser.parse(graphTemplate);
        this.workflow.appendChild(el);
    };
    /**
     * Listener for “output.create” event on model that renders workflow outputs
     */
    Workflow.prototype.onOutputCreate = function (output) {
        if (!output.isVisible) {
            return;
        }
        var patched = graph_node_1.GraphNode.patchModelPorts(output);
        var graphTemplate = graph_node_1.GraphNode.makeTemplate(patched, this.labelScale);
        var el = template_parser_1.TemplateParser.parse(graphTemplate);
        this.workflow.appendChild(el);
    };
    Workflow.prototype.onStepCreate = function (step) {
        // if the step doesn't have x & y coordinates, check if they are in the run property
        if (!step.customProps["sbg:x"] && step.run.customProps && step.run.customProps["sbg:x"]) {
            Object.assign(step.customProps, {
                "sbg:x": step.run.customProps["sbg:x"],
                "sbg:y": step.run.customProps["sbg:y"]
            });
            // remove them from the run property once finished
            delete step.run.customProps["sbg:x"];
            delete step.run.customProps["sbg:y"];
        }
        var template = graph_node_1.GraphNode.makeTemplate(step, this.labelScale);
        var element = template_parser_1.TemplateParser.parse(template);
        this.workflow.appendChild(element);
    };
    Workflow.prototype.onStepChange = function (change) {
        var title = this.workflow.querySelector(".step[data-id=\"" + change.connectionId + "\"] .title");
        if (title) {
            title.textContent = change.label;
        }
    };
    Workflow.prototype.onInputPortShow = function (input) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + input.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, input.parentStep).update();
    };
    Workflow.prototype.onInputPortHide = function (input) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + input.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, input.parentStep).update();
    };
    Workflow.prototype.onOutputPortCreate = function (output) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + output.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, output.parentStep).update();
    };
    Workflow.prototype.onOutputPortRemove = function (output) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + output.parentStep.connectionId + "\"]");
        new step_node_1.StepNode(stepEl, output.parentStep).update();
    };
    /**
     * Listener for "step.remove" event on model which removes steps
     */
    Workflow.prototype.onStepRemove = function (step) {
        var stepEl = this.svgRoot.querySelector(".step[data-connection-id=\"" + step.connectionId + "\"]");
        stepEl.remove();
    };
    /**
     * Listener for "input.remove" event on model which removes inputs
     */
    Workflow.prototype.onInputRemove = function (input) {
        if (!input.isVisible)
            return;
        var inputEl = this.svgRoot.querySelector(".node.input[data-connection-id=\"" + input.connectionId + "\"]");
        inputEl.remove();
    };
    /**
     * Listener for "output.remove" event on model which removes outputs
     */
    Workflow.prototype.onOutputRemove = function (output) {
        if (!output.isVisible)
            return;
        var outputEl = this.svgRoot.querySelector(".node.output[data-connection-id=\"" + output.connectionId + "\"]");
        outputEl.remove();
    };
    Workflow.prototype.makeID = function (length) {
        if (length === void 0) { length = 6; }
        var output = "";
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < length; i++) {
            output += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        return output;
    };
    return Workflow;
}());
exports.Workflow = Workflow;
//# sourceMappingURL=workflow.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var geometry_1 = __webpack_require__(56);
var io_port_1 = __webpack_require__(57);
var workflow_1 = __webpack_require__(40);
var Edge = /** @class */ (function () {
    function Edge() {
    }
    Edge.makeTemplate = function (edge, containerNode, connectionStates) {
        if (!edge.isVisible || edge.source.type === "Step" || edge.destination.type === "Step") {
            return "";
        }
        var _a = __read(edge.source.id.split("/"), 3), sourceSide = _a[0], sourceStepId = _a[1], sourcePort = _a[2];
        var _b = __read(edge.destination.id.split("/"), 3), destSide = _b[0], destStepId = _b[1], destPort = _b[2];
        var sourceVertex = containerNode.querySelector(".node[data-id=\"" + sourceStepId + "\"] .output-port[data-port-id=\"" + sourcePort + "\"] .io-port");
        var destVertex = containerNode.querySelector(".node[data-id=\"" + destStepId + "\"] .input-port[data-port-id=\"" + destPort + "\"] .io-port");
        if (edge.source.type === edge.destination.type) {
            console.error("Can't update edge between nodes of the same type.", edge);
            return;
        }
        if (!sourceVertex) {
            console.error("Source vertex not found for edge " + edge.source.id, edge);
            return;
        }
        if (!destVertex) {
            console.error("Destination vertex not found for edge " + edge.destination.id, edge);
            return;
        }
        var sourceCTM = sourceVertex.getCTM();
        var destCTM = destVertex.getCTM();
        var wfMatrix = containerNode.transform.baseVal[0].matrix;
        var pathStr = workflow_1.Workflow.makeConnectionPath((sourceCTM.e - wfMatrix.e) / sourceCTM.a, (sourceCTM.f - wfMatrix.f) / sourceCTM.a, (destCTM.e - wfMatrix.e) / sourceCTM.a, (destCTM.f - wfMatrix.f) / sourceCTM.a);
        return "\n            <g tabindex=\"-1\" class=\"edge " + connectionStates + "\"\n               data-source-port=\"" + sourcePort + "\"\n               data-destination-port=\"" + destPort + "\"\n               data-source-node=\"" + sourceStepId + "\"\n               data-source-connection=\"" + edge.source.id + "\"\n               data-destination-connection=\"" + edge.destination.id + "\"\n               data-destination-node=\"" + destStepId + "\">\n                <path class=\"sub-edge outer\" d=\"" + pathStr + "\"></path>\n                <path class=\"sub-edge inner\" d=\"" + pathStr + "\"></path>\n            </g>\n        ";
    };
    Edge.spawn = function (pathStr, connectionIDs) {
        if (pathStr === void 0) { pathStr = ""; }
        if (connectionIDs === void 0) { connectionIDs = {}; }
        var ns = "http://www.w3.org/2000/svg";
        var edge = document.createElementNS(ns, "g");
        var _a = __read((connectionIDs.source || "//").split("/"), 3), sourceSide = _a[0], sourceStepId = _a[1], sourcePort = _a[2];
        var _b = __read((connectionIDs.destination || "//").split("/"), 3), destSide = _b[0], destStepId = _b[1], destPort = _b[2];
        edge.classList.add("edge");
        if (sourceStepId) {
            edge.classList.add(sourceStepId);
        }
        if (destStepId) {
            edge.classList.add(destStepId);
        }
        edge.setAttribute("tabindex", "-1");
        edge.setAttribute("data-destination-node", destStepId);
        edge.setAttribute("data-destination-port", destPort);
        edge.setAttribute("data-source-port", sourcePort);
        edge.setAttribute("data-source-node", sourceStepId);
        edge.setAttribute("data-source-connection", connectionIDs.source);
        edge.setAttribute("data-destination-connection", connectionIDs.destination);
        edge.innerHTML = "\n            <path class=\"sub-edge outer\" d=\"" + pathStr + "\"></path>\n            <path class=\"sub-edge inner\" d=\"" + pathStr + "\"></path>\n        ";
        return edge;
    };
    Edge.spawnBetweenConnectionIDs = function (root, source, destination) {
        if (source.startsWith("in")) {
            var tmp = source;
            source = destination;
            destination = tmp;
        }
        var sourceNode = root.querySelector(".port[data-connection-id=\"" + source + "\"]");
        var destinationNode = root.querySelector(".port[data-connection-id=\"" + destination + "\"]");
        var sourceCTM = geometry_1.Geometry.getTransformToElement(sourceNode, root);
        var destCTM = geometry_1.Geometry.getTransformToElement(destinationNode, root);
        var path = io_port_1.IOPort.makeConnectionPath(sourceCTM.e, sourceCTM.f, destCTM.e, destCTM.f);
        // If there is already a connection between these ports, update that one instead
        var existingEdge = root.querySelector(".edge[data-source-connection=\"" + source + "\"][data-destination-connection=\"" + destination + "\"]");
        if (existingEdge) {
            console.log("Updating existing edge");
            try {
                for (var _a = __values(existingEdge.querySelectorAll(".sub-edge")), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var sub = _b.value;
                    sub.setAttribute("d", path);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return existingEdge;
        }
        var edge = Edge.spawn(path, {
            source: source,
            destination: destination
        });
        var firstNode = root.querySelector(".node");
        root.insertBefore(edge, firstNode);
        return edge;
        var e_1, _c;
    };
    ;
    Edge.findEdge = function (root, sourceConnectionID, destinationConnectionID) {
        return root.querySelector("[data-source-connection=\"" + sourceConnectionID + "\"][data-destination-connection=\"" + destinationConnectionID + "\"]");
    };
    Edge.parseConnectionID = function (cid) {
        var _a = __read((cid || "//").split("/"), 3), side = _a[0], stepID = _a[1], portID = _a[2];
        return { side: side, stepID: stepID, portID: portID };
    };
    return Edge;
}());
exports.Edge = Edge;
//# sourceMappingURL=edge.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var SelectionPlugin = /** @class */ (function (_super) {
    __extends(SelectionPlugin, _super);
    function SelectionPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selection = new Map();
        _this.cleanups = [];
        _this.selectionChangeCallbacks = [];
        _this.css = {
            selected: "__selection-plugin-selected",
            highlight: "__selection-plugin-highlight",
            fade: "__selection-plugin-fade",
            plugin: "__plugin-selection"
        };
        return _this;
    }
    SelectionPlugin.prototype.registerWorkflow = function (workflow) {
        var _this = this;
        _super.prototype.registerWorkflow.call(this, workflow);
        this.svg = this.workflow.svgRoot;
        this.svg.classList.add(this.css.plugin);
        var clickListener = this.onClick.bind(this);
        this.svg.addEventListener("click", clickListener);
        this.cleanups.push(function () { return _this.svg.removeEventListener("click", clickListener); });
    };
    SelectionPlugin.prototype.afterRender = function () {
        this.restoreSelection();
    };
    SelectionPlugin.prototype.afterModelChange = function () {
        if (typeof this.detachModelEvents === "function") {
            this.detachModelEvents();
        }
        this.detachModelEvents = this.bindModelEvents();
    };
    SelectionPlugin.prototype.destroy = function () {
        this.detachModelEvents();
        this.detachModelEvents = undefined;
        this.svg.classList.remove(this.css.plugin);
        try {
            for (var _a = __values(this.cleanups), _b = _a.next(); !_b.done; _b = _a.next()) {
                var fn = _b.value;
                fn();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SelectionPlugin.prototype.clearSelection = function () {
        var selection = this.svg.querySelectorAll("." + this.css.selected);
        var highlights = this.svg.querySelectorAll("." + this.css.highlight);
        try {
            for (var selection_1 = __values(selection), selection_1_1 = selection_1.next(); !selection_1_1.done; selection_1_1 = selection_1.next()) {
                var el = selection_1_1.value;
                el.classList.remove(this.css.selected);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (selection_1_1 && !selection_1_1.done && (_a = selection_1.return)) _a.call(selection_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        try {
            for (var highlights_1 = __values(highlights), highlights_1_1 = highlights_1.next(); !highlights_1_1.done; highlights_1_1 = highlights_1.next()) {
                var el = highlights_1_1.value;
                el.classList.remove(this.css.highlight);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (highlights_1_1 && !highlights_1_1.done && (_b = highlights_1.return)) _b.call(highlights_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this.svg.classList.remove(this.css.fade);
        this.selection.clear();
        this.emitChange(null);
        var e_2, _a, e_3, _b;
    };
    SelectionPlugin.prototype.getSelection = function () {
        return this.selection;
    };
    SelectionPlugin.prototype.registerOnSelectionChange = function (fn) {
        this.selectionChangeCallbacks.push(fn);
    };
    SelectionPlugin.prototype.selectStep = function (stepID) {
        var query = "[data-connection-id=\"" + stepID + "\"]";
        var el = this.svg.querySelector(query);
        if (el) {
            this.materializeClickOnElement(el);
        }
    };
    SelectionPlugin.prototype.bindModelEvents = function () {
        var _this = this;
        var handler = function () { return _this.restoreSelection(); };
        var cleanup = [];
        var events = ["connection.create", "connection.remove"];
        var _loop_1 = function (ev) {
            var dispose = this_1.workflow.model.on(ev, handler);
            cleanup.push(function () { return dispose.dispose(); });
        };
        var this_1 = this;
        try {
            for (var events_1 = __values(events), events_1_1 = events_1.next(); !events_1_1.done; events_1_1 = events_1.next()) {
                var ev = events_1_1.value;
                _loop_1(ev);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (events_1_1 && !events_1_1.done && (_a = events_1.return)) _a.call(events_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return function () { return cleanup.forEach(function (fn) { return fn(); }); };
        var e_4, _a;
    };
    SelectionPlugin.prototype.restoreSelection = function () {
        var _this = this;
        this.selection.forEach(function (type, connectionID) {
            if (type === "node") {
                var el = _this.svg.querySelector("[data-connection-id=\"" + connectionID + "\"]");
                if (el) {
                    _this.selectNode(el);
                }
            }
            else if (type === "edge") {
                var _a = __read(connectionID.split(SelectionPlugin.edgePortsDelimiter), 2), sID = _a[0], dID = _a[1];
                var edgeSelector = "[data-source-connection=\"" + sID + "\"][data-destination-connection=\"" + dID + "\"]";
                var edge = _this.svg.querySelector(edgeSelector);
                if (edge) {
                    _this.selectEdge(edge);
                }
            }
        });
    };
    SelectionPlugin.prototype.onClick = function (click) {
        var target = click.target;
        this.clearSelection();
        this.materializeClickOnElement(target);
    };
    SelectionPlugin.prototype.materializeClickOnElement = function (target) {
        var element;
        if (element = this.workflow.findParent(target, "node")) {
            this.selectNode(element);
            this.selection.set(element.getAttribute("data-connection-id"), "node");
            this.emitChange(element);
        }
        else if (element = this.workflow.findParent(target, "edge")) {
            this.selectEdge(element);
            var cid = [
                element.getAttribute("data-source-connection"),
                SelectionPlugin.edgePortsDelimiter,
                element.getAttribute("data-destination-connection")
            ].join("");
            this.selection.set(cid, "edge");
            this.emitChange(cid);
        }
    };
    SelectionPlugin.prototype.selectNode = function (element) {
        // Fade everything on canvas so we can highlight only selected stuff
        this.svg.classList.add(this.css.fade);
        // Mark this node as selected
        element.classList.add(this.css.selected);
        // Highlight it in case there are no edges on the graph
        element.classList.add(this.css.highlight);
        // Take all adjacent edges since we should highlight them and move them above the other edges
        var nodeID = element.getAttribute("data-id");
        var adjacentEdges = this.svg.querySelectorAll(".edge[data-source-node=\"" + nodeID + "\"]," +
            (".edge[data-destination-node=\"" + nodeID + "\""));
        // Find the first node to be an anchor, so we can put all those edges just before that one.
        var firstNode = this.svg.getElementsByClassName("node")[0];
        try {
            for (var adjacentEdges_1 = __values(adjacentEdges), adjacentEdges_1_1 = adjacentEdges_1.next(); !adjacentEdges_1_1.done; adjacentEdges_1_1 = adjacentEdges_1.next()) {
                var edge = adjacentEdges_1_1.value;
                // Highlight each adjacent edge
                edge.classList.add(this.css.highlight);
                // Move it above other edges
                this.workflow.workflow.insertBefore(edge, firstNode);
                // Find all adjacent nodes so we can highlight them
                var sourceNodeID = edge.getAttribute("data-source-node");
                var destinationNodeID = edge.getAttribute("data-destination-node");
                var connectedNodes = this.svg.querySelectorAll(".node[data-id=\"" + sourceNodeID + "\"]," +
                    (".node[data-id=\"" + destinationNodeID + "\"]"));
                try {
                    // Highlight each adjacent node
                    for (var connectedNodes_1 = __values(connectedNodes), connectedNodes_1_1 = connectedNodes_1.next(); !connectedNodes_1_1.done; connectedNodes_1_1 = connectedNodes_1.next()) {
                        var n = connectedNodes_1_1.value;
                        n.classList.add(this.css.highlight);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (connectedNodes_1_1 && !connectedNodes_1_1.done && (_a = connectedNodes_1.return)) _a.call(connectedNodes_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (adjacentEdges_1_1 && !adjacentEdges_1_1.done && (_b = adjacentEdges_1.return)) _b.call(adjacentEdges_1);
            }
            finally { if (e_6) throw e_6.error; }
        }
        var e_6, _b, e_5, _a;
    };
    SelectionPlugin.prototype.selectEdge = function (element) {
        element.classList.add(this.css.highlight);
        element.classList.add(this.css.selected);
        var sourceNode = element.getAttribute("data-source-node");
        var destNode = element.getAttribute("data-destination-node");
        var sourcePort = element.getAttribute("data-source-port");
        var destPort = element.getAttribute("data-destination-port");
        var inputPortSelector = ".node[data-id=\"" + destNode + "\"] .input-port[data-port-id=\"" + destPort + "\"]";
        var outputPortSelector = ".node[data-id=\"" + sourceNode + "\"] .output-port[data-port-id=\"" + sourcePort + "\"]";
        var connectedPorts = this.svg.querySelectorAll(inputPortSelector + ", " + outputPortSelector);
        try {
            for (var connectedPorts_1 = __values(connectedPorts), connectedPorts_1_1 = connectedPorts_1.next(); !connectedPorts_1_1.done; connectedPorts_1_1 = connectedPorts_1.next()) {
                var port = connectedPorts_1_1.value;
                port.classList.add(this.css.highlight);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (connectedPorts_1_1 && !connectedPorts_1_1.done && (_a = connectedPorts_1.return)) _a.call(connectedPorts_1);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var e_7, _a;
    };
    SelectionPlugin.prototype.emitChange = function (change) {
        try {
            for (var _a = __values(this.selectionChangeCallbacks), _b = _a.next(); !_b.done; _b = _a.next()) {
                var fn = _b.value;
                fn(change);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_8) throw e_8.error; }
        }
        var e_8, _c;
    };
    SelectionPlugin.edgePortsDelimiter = "$!$";
    return SelectionPlugin;
}(plugin_base_1.PluginBase));
exports.SelectionPlugin = SelectionPlugin;
//# sourceMappingURL=selection.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cwl_svg_src_assets_styles_themes_rabix_dark_theme_scss__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cwl_svg_src_assets_styles_themes_rabix_dark_theme_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cwl_svg_src_assets_styles_themes_rabix_dark_theme_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cwl_svg_src_plugins_port_drag_theme_dark_scss__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_cwl_svg_src_plugins_port_drag_theme_dark_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_cwl_svg_src_plugins_port_drag_theme_dark_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cwl_svg_src_plugins_selection_theme_dark_scss__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_cwl_svg_src_plugins_selection_theme_dark_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_cwl_svg_src_plugins_selection_theme_dark_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cwlts_models__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_cwlts_models___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_cwlts_models__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cwl_svg__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_cwl_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_cwl_svg__);
//
//
//
//








/* harmony default export */ __webpack_exports__["a"] = ({
    data() {
        return {
            selectedNode: null,
            workflow: null,
            cwlState: null
        };
    },

    computed: {
        cwlModel() {
            return __WEBPACK_IMPORTED_MODULE_3_cwlts_models__["WorkflowFactory"].from(this.cwlState);
        }
    },

    props: {
        cwlUrl: {
            type: String,
            default: null,
            note: `A URL to request for the initial CWL object from. Used as an alternative to
            the "cwl" prop`
        },
        cwl: {
            type: Object,
            default: null,
            note: `The JSON object representing the CWL workflow to render`
        },

        editingEnabled: {
            type: Boolean,
            default: false,
            note: `True if the workflow is editable`
        },
        plugins: {
            type: Array,
            default: () => [],
            note: `A list of CWL plugins to use in the CWL rendering`
        }
    },

    /**
     * If the cwlUrl prop was set, send a request for the CWL object, and set it to the internal
     * state
     */
    mounted() {
        if (this.cwlUrl) {
            fetch(this.cwlUrl, {
                headers: new Headers({
                    'Accept': 'application/json'
                })
            }).then(response => {
                return response.json();
            }).then(json => {
                this.cwlState = json;
            });
        }
    },

    watch: {
        /**
         * If the cwl prop ever changes, update the internal workflow object to that
         */
        cwl() {
            this.cwlState = this.cwl;
        },

        cwlState() {
            this.workflow = new __WEBPACK_IMPORTED_MODULE_4_cwl_svg__["Workflow"]({
                editingEnabled: this.editingEnabled,
                model: this.cwlModel,
                svgRoot: this.$refs.svg,
                plugins: this.plugins
            });

            // Hack to force ArrangePlugin to rearrange
            const arranger = this.workflow.getPlugin(__WEBPACK_IMPORTED_MODULE_4_cwl_svg__["SVGArrangePlugin"]);
            if (arranger) arranger.arrange();

            // Emit a selectionChanged event when selection changes
            const selection = this.workflow.getPlugin(__WEBPACK_IMPORTED_MODULE_4_cwl_svg__["SelectionPlugin"]);
            selection.registerOnSelectionChange(element => {
                if (element) {
                    const id = element.getAttribute("data-connection-id");
                    const selected = this.workflow.model.findById(id);
                    this.$emit('selection-changed', selected);
                }
            });
        }
    }
});

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventHub = /** @class */ (function () {
    function EventHub(validEventList) {
        this.handlers = validEventList.reduce(function (acc, ev) {
            return Object.assign(acc, (_a = {}, _a[ev] = [], _a));
            var _a;
        }, {});
    }
    EventHub.prototype.on = function (event, handler) {
        var _this = this;
        this.guard(event, "subscribe to");
        this.handlers[event].push(handler);
        return function () { return _this.off(event, handler); };
    };
    EventHub.prototype.off = function (event, handler) {
        this.guard(event, "unsubscribe from");
        return this.handlers[event].splice(this.handlers[event].findIndex(function (h) { return handler === h; }), 1);
    };
    EventHub.prototype.emit = function (event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.guard(event, "emit");
        for (var i = 0; i < this.handlers[event].length; i++) {
            (_a = this.handlers[event])[i].apply(_a, data);
        }
        var _a;
    };
    EventHub.prototype.empty = function () {
        for (var event_1 in this.handlers) {
            this.handlers[event_1] = [];
        }
    };
    EventHub.prototype.guard = function (event, verb) {
        if (!this.handlers[event]) {
            throw new Error("Cannot " + verb + " a non-supported event \u201C" + event + "\u201D. \n            Supported events are: " + Object.keys(this.handlers).join(", ") + "\u201D");
        }
    };
    return EventHub;
}());
exports.EventHub = EventHub;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCode_1 = __webpack_require__(1);
var VertexMissing;
(function (VertexMissing) {
    VertexMissing[VertexMissing["CreateVertex"] = 0] = "CreateVertex";
    VertexMissing[VertexMissing["IgnoreEdge"] = 1] = "IgnoreEdge";
    VertexMissing[VertexMissing["AddEdge"] = 2] = "AddEdge";
    VertexMissing[VertexMissing["Error"] = 3] = "Error";
})(VertexMissing = exports.VertexMissing || (exports.VertexMissing = {}));
var Graph = /** @class */ (function () {
    function Graph(vertices, edges, missing) {
        if (missing === void 0) { missing = VertexMissing.Error; }
        this.vertices = new Map(vertices);
        this.edges = new Set();
        if (edges) {
            for (var _i = 0, _a = Array.from(edges); _i < _a.length; _i++) {
                var item = _a[_i];
                this.addEdge({ id: item[0] }, { id: item[1] }, true, true, missing);
            }
        }
    }
    Graph.prototype.addVertex = function (key, data, onConflict) {
        if (data === void 0) { data = null; }
        if (this.hasVertex(key)) {
            if (onConflict) {
                data = onConflict(this.vertices.get(key));
            }
            else {
                throw (new ErrorCode_1.ValidityError("Vertex '" + key + "' already exists", ErrorCode_1.ErrorCode.ID_DUPLICATE));
            }
        }
        else {
            this.vertices.set(key, data);
        }
    };
    Graph.prototype.setVertexData = function (key, data) {
        if (data === void 0) { data = null; }
        this.throwMissingVertex(key);
        this.vertices.set(key, data);
    };
    Graph.prototype.getVertexData = function (key) {
        return this.vertices.get(key);
    };
    Graph.prototype.hasVertex = function (key) {
        return this.vertices.has(key);
    };
    Graph.prototype.removeVertex = function (key) {
        return this.vertices.delete(key);
    };
    Graph.prototype.addEdge = function (source, destination, isVisible, isValid, missing) {
        if (isVisible === void 0) { isVisible = true; }
        if (isValid === void 0) { isValid = true; }
        if (missing === void 0) { missing = VertexMissing.Error; }
        switch (missing) {
            case VertexMissing.Error:
                this.throwMissingVertex(source.id);
                this.throwMissingVertex(destination.id);
                break;
            case VertexMissing.CreateVertex:
                this.addVertex(source.id, null, function (old) {
                    return old;
                });
                this.addVertex(destination.id, null, function (old) {
                    return old;
                });
                break;
            case VertexMissing.IgnoreEdge:
                if (!(this.hasVertex(source.id) && this.hasVertex(destination.id))) {
                    return;
                }
                break;
        }
        this.edges.add({
            source: source, destination: destination, isVisible: isVisible, isValid: isValid
        });
    };
    Graph.prototype.removeEdge = function (edge) {
        if (Array.isArray(edge)) {
            edge = {
                source: { id: edge[0] },
                destination: { id: edge[1] }
            };
        }
        return this.edges.delete(Array.from(this.edges.values()).find(function (e) {
            return e.source.id === edge.source.id && e.destination.id === edge.destination.id;
        }));
    };
    Graph.prototype.topSort = function () {
        var _this = this;
        if (!this.isConnected()) {
            throw ("Can't sort unconnected graph");
        }
        if (this.vertices.size == 0) {
            return [];
        }
        if (this.vertices.size == 1) {
            return [this.vertices.keys().next().value];
        }
        // initialize set of all nodes
        var topNodesInit = new Set(this.vertices.keys());
        // initialize set of all edges
        var unusedEdges = new Set(this.edges.values());
        var sorted = [];
        // go through edges, remove nodes which are destinations (meaning they have incoming connections)
        // for (let e of Array.from(unusedEdges)) {
        //     topNodesInit.delete(e.destination.id);
        // }
        unusedEdges.forEach(function (e) {
            topNodesInit.delete(e.destination.id);
        });
        // create an array of strings from first nodes
        var topNodes = Array.from(topNodesInit);
        var _loop_1 = function () {
            // remove node from list and add it to sorted nodes
            var n = topNodes.shift();
            sorted.push(n);
            // for each remaining edge check if it originates from this starting node
            unusedEdges.forEach(function (e) {
                if (e.source.id == n) {
                    // delete the edge as used
                    unusedEdges.delete(e);
                    // if the destination node of this edge has no other sources
                    // (no edges contain it as a destination)
                    if (!_this.hasIncoming(e.destination.id, unusedEdges)) {
                        // add it as a new starting node
                        topNodes.push(e.destination.id);
                    }
                }
            });
        };
        // for each of the first nodes, go through tree
        while (topNodes.length > 0) {
            _loop_1();
        }
        // leftover edges are back-edges indicating cycles
        if (unusedEdges.size > 0) {
            throw new Error("Graph has cycles");
        }
        return sorted;
    };
    Graph.prototype.hasOutgoing = function (vertex, edges) {
        if (edges === void 0) { edges = this.edges; }
        for (var _i = 0, _a = Array.from(edges); _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.source.id === vertex) {
                return true;
            }
        }
        return false;
    };
    Graph.prototype.hasIncoming = function (vertex, edges) {
        if (edges === void 0) { edges = this.edges; }
        for (var _i = 0, _a = Array.from(edges); _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.destination.id == vertex) {
                return true;
            }
        }
        return false;
    };
    Graph.prototype.isConnected = function () {
        if (this.vertices.size == 0 || this.vertices.size == 1) {
            return true;
        }
        if (this.edges.size == 0) {
            return false;
        }
        var unvisited = new Set(this.vertices.keys());
        var starter = unvisited.values().next().value;
        unvisited.delete(starter);
        var unusedEdges = new Set(this.edges);
        return this.connectedIter(unvisited, unusedEdges, [starter]);
    };
    Graph.prototype.connectedIter = function (unvisited, unusedEdges, toExpand) {
        var reached = new Set();
        for (var _i = 0, toExpand_1 = toExpand; _i < toExpand_1.length; _i++) {
            var node = toExpand_1[_i];
            for (var _a = 0, _b = this.reached(unusedEdges, node); _a < _b.length; _a++) {
                var r = _b[_a];
                reached.add(r);
            }
        }
        for (var _c = 0, _d = Array.from(reached); _c < _d.length; _c++) {
            var item = _d[_c];
            var existing = unvisited.delete(item);
            if (!existing) {
                reached.delete(item);
            }
        }
        if (unvisited.size == 0) {
            return true;
        }
        if (reached.size == 0) {
            // console.log("Unreached nodes", Array.from(unvisited));
            return false;
        }
        return this.connectedIter(unvisited, unusedEdges, Array.from(reached));
    };
    Graph.prototype.reached = function (unusedEdges, from) {
        var reached = new Set();
        for (var _i = 0, _a = Array.from(unusedEdges); _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.source.id == from) {
                reached.add(item.destination.id);
                unusedEdges.delete(item);
            }
            else if (item.destination.id == from) {
                reached.add(item.source.id);
                unusedEdges.delete(item);
            }
        }
        return Array.from(reached);
    };
    Graph.prototype.hasCycles = function () {
        if (this.vertices.size == 0) {
            return false;
        }
        if (this.edges.size == 0) {
            return false;
        }
        try {
            this.topSort();
            return false;
        }
        catch (ex) {
            return ex.message === "Graph has cycles";
        }
    };
    Graph.prototype.throwMissingVertex = function (key) {
        if (!this.hasVertex(key)) {
            throw new Error("Vertex '" + key + "' doesn't exist");
        }
    };
    return Graph;
}());
exports.Graph = Graph;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowOutputParameterModel_1 = __webpack_require__(17);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1WorkflowOutputParameterModel = /** @class */ (function (_super) {
    __extends(V1WorkflowOutputParameterModel, _super);
    function V1WorkflowOutputParameterModel(output, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (output)
            _this.deserialize(output);
        return _this;
    }
    V1WorkflowOutputParameterModel.prototype.deserialize = function (output) {
        var _this = this;
        var serializedKeys = ["id", "name", "outputSource", "type", "label", "doc", "sbg:fileTypes"];
        //@todo deserialization of outputBinding, streamable, linkMerge, secondaryFiles
        this.isField = !!output.name; // record fields don't have ids
        this.isField ? serializedKeys.push("name") : serializedKeys.push("id");
        if (this.isField) {
            this.id = output.name;
        }
        else {
            this.id = output.id;
        }
        if (!this.isField) {
            this.source = utils_1.ensureArray(output.outputSource);
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(output.type, V1WorkflowOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        this._label = output.label;
        this.description = utils_1.ensureArray(output.doc).join("\n\n");
        if (!this.isField) {
            this.fileTypes = utils_1.commaSeparatedToArray(output["sbg:fileTypes"]);
        }
        utils_1.spreadSelectProps(output, this.customProps, serializedKeys);
    };
    V1WorkflowOutputParameterModel.prototype.serialize = function () {
        var base = {};
        if (!this.isField) {
            base.id = this.id;
            if (this.source.length) {
                base.outputSource = this.source.slice();
            }
            if (this.fileTypes.length) {
                base["sbg:fileTypes"] = this.fileTypes.join(", ");
            }
        }
        else {
            base.name = this.id;
        }
        if (this.type)
            base.type = this.type.serialize("v1.0");
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.doc = this.description;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1WorkflowOutputParameterModel;
}(WorkflowOutputParameterModel_1.WorkflowOutputParameterModel));
exports.V1WorkflowOutputParameterModel = V1WorkflowOutputParameterModel;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineParsers_1 = __webpack_require__(87);
var CommandArgumentModel_1 = __webpack_require__(23);
var CommandInputParameterModel_1 = __webpack_require__(10);
var ExpressionModel_1 = __webpack_require__(9);
var CommandLinePrepare = /** @class */ (function () {
    function CommandLinePrepare() {
    }
    CommandLinePrepare.prepare = function (input, flatJobInputs, context, loc, cmdType) {
        var inputType = "primitive";
        if (!input) {
            inputType === "nullValue";
        }
        if (input instanceof CommandInputParameterModel_1.CommandInputParameterModel || input.type === "record") {
            var value = flatJobInputs[input.id] || null;
            cmdType = "input";
            if (value === null) {
                inputType = "nullValue";
            }
            else if (Array.isArray(value)) {
                inputType = "array";
            }
            else if (typeof value === "boolean") {
                inputType = "boolean";
            }
            else if (typeof value === "object" && value.class !== "File" && value.class !== "Directory") {
                inputType = "record";
            }
        }
        if (input instanceof CommandArgumentModel_1.CommandArgumentModel) {
            inputType = "argument";
            cmdType = "argument";
        }
        if (input instanceof ExpressionModel_1.ExpressionModel) {
            inputType = "expression";
        }
        if (cmdType === "stdin" || cmdType === "stdout") {
            inputType = "stream";
        }
        if (typeof input === "string") {
            inputType = "string";
        }
        var parser = CommandLineParsers_1.CommandLineParsers[inputType];
        return parser(input, flatJobInputs, flatJobInputs[input.id || null], context, cmdType, loc);
    };
    ;
    CommandLinePrepare.flattenInputsAndArgs = function (inputs) {
        return inputs.filter(function (input) {
            if (input instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                return !!input.inputBinding;
            }
            return true;
        }).reduce(function (acc, input, index) {
            var sortFn = function (a, b) {
                var c1, c2;
                _a = [a, b].map(function (a) {
                    return a instanceof CommandArgumentModel_1.CommandArgumentModel ?
                        { pos: ~~a.position, id: index.toString() } :
                        { pos: ~~a.inputBinding.position, id: a.id };
                }), c1 = _a[0], c2 = _a[1];
                return ~~c1.pos - ~~c2.pos || (c1.id ? c1.id.localeCompare(c2.id) : -1);
                var _a;
            };
            if (input instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
                if (input.type.fields) {
                    return acc.concat.apply(acc, [input].concat(CommandLinePrepare.flattenInputsAndArgs(input.type.fields).sort(sortFn)));
                }
            }
            return acc.concat(input).sort(sortFn);
        }, []);
    };
    CommandLinePrepare.flattenJob = function (job, master) {
        return Object.keys(job).reduce(function (acc, key) {
            if (job[key] === null)
                return Object.assign(master, (_a = {}, _a[key] = null, _a));
            if (typeof job[key] === "object" && job[key].class !== "File") {
                return Object.assign(master, (_b = {}, _b[key] = job[key], _b), CommandLinePrepare.flattenJob(job[key], {}));
            }
            return Object.assign(master, (_c = {}, _c[key] = job[key], _c));
            var _a, _b, _c;
        }, {});
    };
    return CommandLinePrepare;
}());
exports.CommandLinePrepare = CommandLinePrepare;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandArgumentModel_1 = __webpack_require__(23);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1CommandLineBindingModel_1 = __webpack_require__(50);
var ErrorCode_1 = __webpack_require__(1);
var V1CommandArgumentModel = /** @class */ (function (_super) {
    __extends(V1CommandArgumentModel, _super);
    function V1CommandArgumentModel(arg, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasExprPrimitive = true;
        _this.hasShellQuote = true;
        if (arg)
            _this.deserialize(arg);
        return _this;
    }
    Object.defineProperty(V1CommandArgumentModel.prototype, "arg", {
        get: function () {
            return this.primitive || this.binding;
        },
        set: function (value) {
            this.deserialize(value);
        },
        enumerable: true,
        configurable: true
    });
    V1CommandArgumentModel.prototype.toggleBinding = function (state) {
        var _this = this;
        if (state) {
            this.binding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel({}, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
            this.primitive.clearIssue(ErrorCode_1.ErrorCode.ALL);
            this.primitive = undefined;
        }
        else {
            this.primitive = new V1ExpressionModel_1.V1ExpressionModel("", this.loc, this.eventHub);
            this.primitive.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
            this.binding.clearIssue(ErrorCode_1.ErrorCode.ALL);
            this.binding = undefined;
        }
        this.hasBinding = state;
    };
    V1CommandArgumentModel.prototype.updatePrimitive = function (str) {
        this.hasBinding = false;
        this.binding = undefined;
        this.primitive.setValue(str);
    };
    V1CommandArgumentModel.prototype.updateBinding = function (binding) {
        var _this = this;
        this.binding.prefix = binding.prefix;
        this.binding.position = binding.position;
        this.binding.separate = binding.separate;
        this.binding.itemSeparator = binding.itemSeparator;
        this.binding.shellQuote = binding.shellQuote;
        this.binding.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(binding.valueFrom, this.loc + ".valueFrom");
        this.binding.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.primitive = undefined;
        this.hasBinding = true;
    };
    V1CommandArgumentModel.prototype.serialize = function () {
        if (this.binding) {
            return this.binding.serialize();
        }
        if (this.primitive) {
            return this.primitive.serialize();
        }
        return "";
    };
    V1CommandArgumentModel.prototype.toString = function () {
        if (this.primitive)
            return this.primitive.serialize();
        if (this.binding) {
            return this.binding.valueFrom.toString();
        }
    };
    V1CommandArgumentModel.prototype.deserialize = function (attr) {
        var _this = this;
        if (typeof attr === 'string' || attr instanceof V1ExpressionModel_1.V1ExpressionModel) {
            this.hasBinding = false;
            this.primitive = new V1ExpressionModel_1.V1ExpressionModel(attr, this.loc, this.eventHub);
            this.primitive.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        else if (attr instanceof V1CommandLineBindingModel_1.V1CommandLineBindingModel) {
            this.hasBinding = true;
            this.binding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel(attr.serialize(), this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        else if (typeof attr === 'object') {
            this.hasBinding = true;
            this.binding = new V1CommandLineBindingModel_1.V1CommandLineBindingModel(attr, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    return V1CommandArgumentModel;
}(CommandArgumentModel_1.CommandArgumentModel));
exports.V1CommandArgumentModel = V1CommandArgumentModel;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineBindingModel_1 = __webpack_require__(32);
var V1ExpressionModel_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(0);
var ErrorCode_1 = __webpack_require__(1);
var V1CommandLineBindingModel = /** @class */ (function (_super) {
    __extends(V1CommandLineBindingModel, _super);
    function V1CommandLineBindingModel(binding, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.shellQuote = true;
        _this.hasSecondaryFiles = false;
        _this.hasShellQuote = true;
        _this.serializedKeys = [
            "position",
            "prefix",
            "separate",
            "itemSeparator",
            "valueFrom",
            "shellQuote",
            "loadContents"
        ];
        if (binding)
            _this.deserialize(binding);
        return _this;
    }
    V1CommandLineBindingModel.prototype.setValueFrom = function (val) {
        var _this = this;
        this.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(val, this.loc + ".valueFrom", this.eventHub);
        this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    V1CommandLineBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        this.position = !isNaN(binding.position) ? parseInt(binding.position) : 0;
        this.prefix = binding.prefix;
        this.separate = binding.separate !== false; // default is true if not specified
        this.itemSeparator = binding.itemSeparator;
        this.shellQuote = binding.shellQuote !== false; // default is true if not specified
        this.loadContents = binding.loadContents === true;
        this.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(binding.valueFrom, this.loc + ".valueFrom", this.eventHub);
        this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
        utils_1.spreadSelectProps(binding, this.customProps, this.serializedKeys);
    };
    V1CommandLineBindingModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        this.serializedKeys.forEach(function (key) {
            if (_this[key] !== undefined && _this[key] !== null && key !== "valueFrom") {
                base[key] = _this[key];
            }
        });
        if (!base.loadContents)
            delete base.loadContents;
        if (base.shellQuote !== false) {
            delete base.shellQuote; // true by default
        }
        else if (base.shellQuote === false && this.eventHub) {
            this.eventHub.emit("binding.shellQuote", true);
        }
        if (base.separate !== false) {
            delete base.separate; // true by default
        }
        if (this.valueFrom.serialize() !== undefined) {
            base.valueFrom = this.valueFrom.serialize();
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1CommandLineBindingModel.prototype.validate = function (context) {
        var _this = this;
        this.clearIssue(ErrorCode_1.ErrorCode.ALL);
        var promises = [];
        promises.push(this.valueFrom.validate(context));
        return Promise.all(promises).then(function () { return _this.issues; });
    };
    return V1CommandLineBindingModel;
}(CommandLineBindingModel_1.CommandLineBindingModel));
exports.V1CommandLineBindingModel = V1CommandLineBindingModel;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1WorkflowInputParameterModel = /** @class */ (function (_super) {
    __extends(V1WorkflowInputParameterModel, _super);
    function V1WorkflowInputParameterModel(input, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (input)
            _this.deserialize(input);
        return _this;
    }
    V1WorkflowInputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["id", "name", "type", "label", "doc", "sbg:fileTypes"];
        // @todo serialization of secondaryFiles, streamable, inputBinding
        this._label = attr.label;
        this.description = utils_1.ensureArray(attr.doc).join("\n\n");
        this.id = attr.id || attr.name;
        this.isField = !!attr.name;
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, V1WorkflowInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.isVisible = !attr["sbg:exposed"];
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    V1WorkflowInputParameterModel.prototype.serialize = function () {
        var base = {};
        if (this.isField) {
            base.name = this.id;
        }
        else {
            base.id = this.id;
            if (this.fileTypes.length)
                base["sbg:fileTypes"] = this.fileTypes.join(", ");
        }
        if (this.type.type)
            base.type = this.type.serialize("v1.0");
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.doc = this.description;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1WorkflowInputParameterModel;
}(WorkflowInputParameterModel_1.WorkflowInputParameterModel));
exports.V1WorkflowInputParameterModel = V1WorkflowInputParameterModel;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputParameterModel_1 = __webpack_require__(13);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var V1CommandOutputBindingModel_1 = __webpack_require__(53);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1CommandOutputParameterModel = /** @class */ (function (_super) {
    __extends(V1CommandOutputParameterModel, _super);
    function V1CommandOutputParameterModel(output, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.secondaryFiles = [];
        _this.hasSecondaryFiles = true;
        _this.customProps = {};
        if (output)
            _this.deserialize(output);
        return _this;
    }
    V1CommandOutputParameterModel.prototype.addSecondaryFile = function (file) {
        if (file === void 0) { file = ""; }
        return this._addSecondaryFile(file, V1ExpressionModel_1.V1ExpressionModel, this.loc);
    };
    V1CommandOutputParameterModel.prototype.updateSecondaryFiles = function (files) {
        this._updateSecondaryFiles(files);
    };
    V1CommandOutputParameterModel.prototype.removeSecondaryFile = function (index) {
        this._removeSecondaryFile(index);
    };
    V1CommandOutputParameterModel.prototype.serialize = function () {
        var base = {};
        !this.isField ? base.id = this.id : base.name = this.id;
        if (this.description)
            base.doc = this.description;
        if (this.label)
            base.label = this.label;
        base.type = this.type.serialize("v1.0");
        if (this.outputBinding) {
            base.outputBinding = this.outputBinding.serialize();
        }
        if (!this.isField && this.secondaryFiles.length && (this.type.type === "File" || this.type.items === "File")) {
            base.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
        }
        if (!this.isField && this.fileTypes.length) {
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        }
        if (!this.isField && this.streamable) {
            base.streamable = this.streamable;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1CommandOutputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedKeys = ["id", "type", "outputBinding", "label", "doc", "secondaryFiles", "sbg:fileTypes", "streamable"];
        this.isField = !!attr.name; // record fields don't have ids
        this.id = attr.id || attr.name;
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, V1CommandOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.type.hasDirectoryType = true;
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        this.outputBinding = new V1CommandOutputBindingModel_1.V1CommandOutputBindingModel(attr.outputBinding, this.loc + ".outputBinding", this.eventHub);
        this.outputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.label = attr.label;
        this.description = utils_1.ensureArray(attr.doc).join("\n\n");
        // properties only on inputs, not on fields
        this.secondaryFiles = utils_1.ensureArray(attr.secondaryFiles).map(function (f) { return _this.addSecondaryFile(f); });
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.streamable = attr.streamable;
        this.attachFileTypeListeners();
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1CommandOutputParameterModel;
}(CommandOutputParameterModel_1.CommandOutputParameterModel));
exports.V1CommandOutputParameterModel = V1CommandOutputParameterModel;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputBindingModel_1 = __webpack_require__(35);
var V1ExpressionModel_1 = __webpack_require__(5);
var ErrorCode_1 = __webpack_require__(1);
var V1CommandOutputBindingModel = /** @class */ (function (_super) {
    __extends(V1CommandOutputBindingModel, _super);
    function V1CommandOutputBindingModel(binding, loc, eventHub) {
        if (binding === void 0) { binding = {}; }
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasSecondaryFiles = false;
        _this.hasMetadata = false;
        _this.hasInheritMetadata = true;
        if (binding)
            _this.deserialize(binding);
        return _this;
    }
    Object.defineProperty(V1CommandOutputBindingModel.prototype, "glob", {
        get: function () {
            return this._glob;
        },
        set: function (value) {
            this.setGlob(value, V1ExpressionModel_1.V1ExpressionModel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(V1CommandOutputBindingModel.prototype, "outputEval", {
        get: function () {
            return this._outputEval;
        },
        set: function (value) {
            if (!(new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX).test(value.serialize())) && this.inheritMetadataFrom) {
                this.inheritMetadataFrom = null;
            }
            this.setOutputEval(value, V1ExpressionModel_1.V1ExpressionModel);
        },
        enumerable: true,
        configurable: true
    });
    V1CommandOutputBindingModel.prototype.setInheritMetadataFrom = function (inputId) {
        var serialized = this._outputEval.serialize();
        // inherit was set
        if (inputId) {
            this.inheritMetadataFrom = inputId;
            this.eventHub.emit("output.metadata.inherit");
            var inheritExpr = "$(inheritMetadata(self, inputs." + inputId + "))";
            // output eval doesn't exist
            if (serialized === undefined) {
                this._outputEval.setValue(inheritExpr);
            }
            else {
                // remove existing inherit statements if they exist
                serialized = serialized.replace(new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX), "");
                if (serialized) {
                    this._outputEval.setIssue((_a = {}, _a[this.loc + ".outputEval"] = {
                        type: "warning",
                        code: ErrorCode_1.ErrorCode.OUTPUT_EVAL_INHERIT,
                        message: "Inheriting metadata appended some code to outputEval, this might change its behavior"
                    }, _a));
                }
                // output eval exists and is something else
                this._outputEval.setValue((serialized + "\n\n" + inheritExpr).trim());
            }
        }
        else if (serialized !== undefined) {
            // inherit was removed and should be removed from outputEval
            var newOutputEval = serialized.replace(new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX), "");
            this._outputEval.setValue(newOutputEval || undefined);
            this._outputEval.clearIssue(ErrorCode_1.ErrorCode.OUTPUT_EVAL_INHERIT);
            // set inherit to empty value
            this.inheritMetadataFrom = inputId;
        }
        var _a;
    };
    V1CommandOutputBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        var glob = binding.glob;
        if (Array.isArray(binding.glob)) {
            glob = binding.glob[0];
        }
        this.loadContents = binding.loadContents === true;
        this._glob = new V1ExpressionModel_1.V1ExpressionModel(glob, this.loc + ".glob", this.eventHub);
        this._glob.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.validateGlob();
        this._outputEval = new V1ExpressionModel_1.V1ExpressionModel(binding.outputEval, this.loc + ".outputEval", this.eventHub);
        this._outputEval.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // populate inherit metadata if it existsr
        if (binding.outputEval) {
            // only going to look at the first one, should be the only one
            // have to make a new RegExp because otherwise .exec would be called multiple times on the same one
            var matches = new RegExp(V1CommandOutputBindingModel.INHERIT_REGEX).exec(binding.outputEval);
            this.inheritMetadataFrom = matches ? matches[1] : null;
        }
    };
    V1CommandOutputBindingModel.prototype.serialize = function () {
        var base = {};
        if (this.loadContents)
            base.loadContents = true;
        if (this._glob && this._glob.serialize() !== undefined)
            base.glob = this._glob.serialize();
        if (this._outputEval && this._outputEval.serialize() !== undefined)
            base.outputEval = this._outputEval.serialize();
        return base;
    };
    V1CommandOutputBindingModel.INHERIT_REGEX = /\$\(inheritMetadata\(self, inputs.(.*?)\)\)/g;
    return V1CommandOutputBindingModel;
}(CommandOutputBindingModel_1.CommandOutputBindingModel));
exports.V1CommandOutputBindingModel = V1CommandOutputBindingModel;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineBindingModel_1 = __webpack_require__(32);
var utils_1 = __webpack_require__(0);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2CommandLineBindingModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandLineBindingModel, _super);
    function SBDraft2CommandLineBindingModel(binding, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasSecondaryFiles = true;
        _this.hasShellQuote = false;
        _this.serializedKeys = [
            "position",
            "prefix",
            "separate",
            "itemSeparator",
            "valueFrom",
            "loadContents",
            "secondaryFiles"
        ];
        _this.deserialize(binding || {});
        return _this;
    }
    SBDraft2CommandLineBindingModel.prototype.setValueFrom = function (val) {
        var _this = this;
        this.valueFrom = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(val, this.loc + ".valueFrom", this.eventHub);
        this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    SBDraft2CommandLineBindingModel.prototype.validate = function (context) {
        var _this = this;
        var promises = [];
        if (this.valueFrom) {
            promises.push(this.valueFrom.validate(context));
        }
        return Promise.all(promises).then(function () { return _this.issues; }, function (ex) {
            console.warn("SBDraft2CommandLineBindingModel threw error in validation: " + ex);
            return _this.issues;
        });
    };
    SBDraft2CommandLineBindingModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        this.serializedKeys.forEach(function (key) {
            if (_this[key] !== undefined && _this[key] !== null && key !== "valueFrom" && key !== "secondaryFiles") {
                base[key] = _this[key];
            }
        });
        if (!base.loadContents)
            delete base.loadContents;
        if (this.valueFrom.serialize() !== undefined) {
            base.valueFrom = this.valueFrom.serialize();
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2CommandLineBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        if (binding && binding.constructor === Object) {
            this.position = !isNaN(binding.position) ? parseInt(binding.position) : 0;
            this.prefix = binding.prefix;
            this.separate = binding.separate;
            this.itemSeparator = binding.itemSeparator;
            this.loadContents = binding.loadContents === true;
            this.valueFrom = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(binding.valueFrom, this.loc + ".valueFrom", this.eventHub);
            this.valueFrom.setValidationCallback(function (err) { return _this.updateValidity(err); });
            // populates object with all custom attributes not covered in model
            utils_1.spreadSelectProps(binding, this.customProps, this.serializedKeys);
        }
    };
    return SBDraft2CommandLineBindingModel;
}(CommandLineBindingModel_1.CommandLineBindingModel));
exports.SBDraft2CommandLineBindingModel = SBDraft2CommandLineBindingModel;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationBase_1 = __webpack_require__(2);
var V1CommandInputParameterModel_1 = __webpack_require__(33);
var V1CommandOutputParameterModel_1 = __webpack_require__(52);
var utils_1 = __webpack_require__(0);
var ExpressionToolModel = /** @class */ (function (_super) {
    __extends(ExpressionToolModel, _super);
    function ExpressionToolModel(tool, loc) {
        var _this = _super.call(this, loc) || this;
        _this["class"] = "ExperssionTool";
        _this.customProps = {};
        if (tool)
            _this.deserialize(tool);
        return _this;
    }
    ExpressionToolModel.prototype.serialize = function () {
        return utils_1.spreadAllProps({}, this.customProps);
    };
    ExpressionToolModel.prototype.deserialize = function (attr) {
        this.inputs = utils_1.ensureArray(attr.inputs, "id", "type").map(function (i) { return new V1CommandInputParameterModel_1.V1CommandInputParameterModel(i); });
        this.outputs = utils_1.ensureArray(attr.outputs, "id", "type").map(function (o) { return new V1CommandOutputParameterModel_1.V1CommandOutputParameterModel(o); });
        this.id = attr.id;
        this.label = attr.label;
        this.description = attr.doc || attr.description;
        utils_1.spreadSelectProps(attr, this.customProps, []);
    };
    return ExpressionToolModel;
}(ValidationBase_1.ValidationBase));
exports.ExpressionToolModel = ExpressionToolModel;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Geometry = /** @class */ (function () {
    function Geometry() {
    }
    Geometry.distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };
    Geometry.getTransformToElement = function (from, to) {
        var getPosition = function (node, addE, addF) {
            if (addE === void 0) { addE = 0; }
            if (addF === void 0) { addF = 0; }
            if (!node.ownerSVGElement) {
                // node is the root svg element
                var matrix = node.createSVGMatrix();
                matrix.e = addE;
                matrix.f = addF;
                return matrix;
            }
            else {
                // node still has parent elements
                var _a = node.transform.baseVal.getItem(0).matrix, e = _a.e, f = _a.f;
                return getPosition(node.parentNode, e + addE, f + addF);
            }
        };
        var toPosition = getPosition(to);
        var fromPosition = getPosition(from);
        var result = from.ownerSVGElement.createSVGMatrix();
        result.e = toPosition.e - fromPosition.e;
        result.f = toPosition.f - fromPosition.f;
        return result.inverse();
    };
    return Geometry;
}());
exports.Geometry = Geometry;
//# sourceMappingURL=geometry.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IOPort = /** @class */ (function () {
    function IOPort() {
    }
    /**
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param {"right" | "left" | string} forceDirection
     * @returns {string}
     */
    IOPort.makeConnectionPath = function (x1, y1, x2, y2, forceDirection) {
        if (forceDirection === void 0) { forceDirection = "right"; }
        if (!forceDirection) {
            return "M " + x1 + " " + y1 + " C " + (x1 + x2) / 2 + " " + y1 + " " + (x1 + x2) / 2 + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "right") {
            var outDir = x1 + Math.abs(x1 - x2) / 2;
            var inDir = x2 - Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
        else if (forceDirection === "left") {
            var outDir = x1 - Math.abs(x1 - x2) / 2;
            var inDir = x2 + Math.abs(x1 - x2) / 2;
            return "M " + x1 + " " + y1 + " C " + outDir + " " + y1 + " " + inDir + " " + y2 + " " + x2 + " " + y2;
        }
    };
    IOPort.radius = 7;
    return IOPort;
}());
exports.IOPort = IOPort;
//# sourceMappingURL=io-port.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SVGUtils = /** @class */ (function () {
    function SVGUtils() {
    }
    SVGUtils.matrixToTransformAttr = function (matrix) {
        var a = matrix.a, b = matrix.b, c = matrix.c, d = matrix.d, e = matrix.e, f = matrix.f;
        return "matrix(" + a + ", " + b + ", " + c + ", " + d + ", " + e + ", " + f + ")";
    };
    SVGUtils.createMatrix = function () {
        return document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
    };
    return SVGUtils;
}());
exports.SVGUtils = SVGUtils;
//# sourceMappingURL=svg-utils.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var edge_1 = __webpack_require__(41);
var graph_node_1 = __webpack_require__(25);
var template_parser_1 = __webpack_require__(60);
var StepNode = /** @class */ (function () {
    function StepNode(element, stepModel) {
        this.stepEl = element;
        this.svg = element.ownerSVGElement;
        this.model = stepModel;
    }
    StepNode.prototype.update = function () {
        var tpl = graph_node_1.GraphNode.makeTemplate(this.model);
        var el = template_parser_1.TemplateParser.parse(tpl);
        this.stepEl.innerHTML = el.innerHTML;
        // Reposition all edges
        var incomingEdges = this.svg.querySelectorAll(".edge[data-destination-node=\"" + this.model.connectionId + "\"]");
        var outgoingEdges = this.svg.querySelectorAll(".edge[data-source-node=\"" + this.model.connectionId + "\"");
        try {
            for (var _a = __values(__spread(incomingEdges, outgoingEdges)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var edge = _b.value;
                edge_1.Edge.spawnBetweenConnectionIDs(this.svg.querySelector(".workflow"), edge.getAttribute("data-source-connection"), edge.getAttribute("data-destination-connection"));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        console.log("Should redraw input port", incomingEdges);
        var e_1, _c;
    };
    return StepNode;
}());
exports.StepNode = StepNode;
//# sourceMappingURL=step-node.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TemplateParser = /** @class */ (function () {
    function TemplateParser() {
    }
    TemplateParser.parse = function (tpl) {
        var ns = "http://www.w3.org/2000/svg";
        var node = document.createElementNS(ns, "g");
        node.innerHTML = tpl;
        return node.firstElementChild;
    };
    return TemplateParser;
}());
exports.TemplateParser = TemplateParser;
//# sourceMappingURL=template-parser.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var _1 = __webpack_require__(62);
var graph_node_1 = __webpack_require__(25);
var geometry_1 = __webpack_require__(56);
var edge_1 = __webpack_require__(41);
var edge_panning_1 = __webpack_require__(67);
var SVGPortDragPlugin = /** @class */ (function (_super) {
    __extends(SVGPortDragPlugin, _super);
    function SVGPortDragPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** How far away from the port you need to drag in order to create a new input/output instead of snapping */
        _this.snapRadius = 120;
        /** Map of CSS classes attached by this plugin */
        _this.css = {
            /** Added to svgRoot as a sign that this plugin is active */
            plugin: "__plugin-port-drag",
            /** Suggests that an element that contains it will be the one to snap to */
            snap: "__port-drag-snap",
            /** Added to svgRoot while dragging is in progress */
            dragging: "__port-drag-dragging",
            /** Will be added to suggested ports and their parent nodes */
            suggestion: "__port-drag-suggestion",
        };
        _this.detachDragListenerFn = undefined;
        _this.wheelPrevent = function (ev) { return ev.stopPropagation(); };
        _this.ghostX = 0;
        _this.ghostY = 0;
        return _this;
    }
    SVGPortDragPlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        this.panner = new edge_panning_1.EdgePanner(this.workflow);
        this.workflow.svgRoot.classList.add(this.css.plugin);
    };
    SVGPortDragPlugin.prototype.afterRender = function () {
        if (this.workflow.editingEnabled) {
            this.attachPortDrag();
        }
    };
    SVGPortDragPlugin.prototype.onEditableStateChange = function (enabled) {
        if (enabled) {
            this.attachPortDrag();
        }
        else {
            this.detachPortDrag();
        }
    };
    SVGPortDragPlugin.prototype.destroy = function () {
        this.detachPortDrag();
    };
    SVGPortDragPlugin.prototype.detachPortDrag = function () {
        if (typeof this.detachDragListenerFn === "function") {
            this.detachDragListenerFn();
        }
        this.detachDragListenerFn = undefined;
    };
    SVGPortDragPlugin.prototype.attachPortDrag = function () {
        this.detachPortDrag();
        this.detachDragListenerFn = this.workflow.domEvents.drag(".port", this.onMove.bind(this), this.onMoveStart.bind(this), this.onMoveEnd.bind(this));
    };
    SVGPortDragPlugin.prototype.onMove = function (dx, dy, ev, portElement) {
        var _this = this;
        document.addEventListener("mousewheel", this.wheelPrevent, true);
        var mouseOnSVG = this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
        var scale = this.workflow.scale;
        var sdx = (dx - this.lastMouseMove.x) / scale;
        var sdy = (dy - this.lastMouseMove.y) / scale;
        /** We might have hit the boundary and need to start panning */
        this.panner.triggerCollisionDetection(ev.clientX, ev.clientY, function (sdx, sdy) {
            _this.ghostX += sdx;
            _this.ghostY += sdy;
            _this.translateGhostNode(_this.ghostX, _this.ghostY);
            _this.updateEdge(_this.portOnCanvas.x, _this.portOnCanvas.y, _this.ghostX, _this.ghostY);
        });
        var nodeToMouseDistance = geometry_1.Geometry.distance(this.nodeCoords.x, this.nodeCoords.y, mouseOnSVG.x, mouseOnSVG.y);
        var closestPort = this.findClosestPort(mouseOnSVG.x, mouseOnSVG.y);
        this.updateSnapPort(closestPort.portEl, closestPort.distance);
        this.ghostX += sdx;
        this.ghostY += sdy;
        this.translateGhostNode(this.ghostX, this.ghostY);
        this.updateGhostNodeVisibility(nodeToMouseDistance, closestPort.distance);
        this.updateEdge(this.portOnCanvas.x, this.portOnCanvas.y, this.ghostX, this.ghostY);
        this.lastMouseMove = { x: dx, y: dy };
    };
    /**
     * @FIXME: Add panning
     * @param {MouseEvent} ev
     * @param {SVGGElement} portEl
     */
    SVGPortDragPlugin.prototype.onMoveStart = function (ev, portEl) {
        this.lastMouseMove = { x: 0, y: 0 };
        this.originPort = portEl;
        var portCTM = portEl.getScreenCTM();
        this.portOnCanvas = this.workflow.transformScreenCTMtoCanvas(portCTM.e, portCTM.f);
        this.ghostX = this.portOnCanvas.x;
        this.ghostY = this.portOnCanvas.y;
        // Needed for collision detection
        this.boundingClientRect = this.workflow.svgRoot.getBoundingClientRect();
        var nodeMatrix = this.workflow.findParent(portEl).transform.baseVal.getItem(0).matrix;
        this.nodeCoords = {
            x: nodeMatrix.e,
            y: nodeMatrix.f
        };
        var workflowGroup = this.workflow.workflow;
        this.portType = portEl.classList.contains("input-port") ? "input" : "output";
        this.ghostNode = this.createGhostNode(this.portType);
        workflowGroup.appendChild(this.ghostNode);
        /** @FIXME: this should come from workflow */
        this.edgeGroup = edge_1.Edge.spawn();
        this.edgeGroup.classList.add(this.css.dragging);
        workflowGroup.appendChild(this.edgeGroup);
        this.workflow.svgRoot.classList.add(this.css.dragging);
        this.portOrigins = this.getPortCandidateTransformations(portEl);
        this.highlightSuggestedPorts(portEl.getAttribute("data-connection-id"));
    };
    SVGPortDragPlugin.prototype.onMoveEnd = function (ev) {
        document.removeEventListener("mousewheel", this.wheelPrevent, true);
        this.panner.stop();
        var ghostType = this.ghostNode.getAttribute("data-type");
        var ghostIsVisible = !this.ghostNode.classList.contains("hidden");
        var shouldSnap = this.snapPort !== undefined;
        var shouldCreateInput = ghostIsVisible && ghostType === "input";
        var shouldCreateOutput = ghostIsVisible && ghostType === "output";
        var portID = this.originPort.getAttribute("data-connection-id");
        if (shouldSnap) {
            this.createEdgeBetweenPorts(this.originPort, this.snapPort);
        }
        else if (shouldCreateInput || shouldCreateOutput) {
            var svgCoordsUnderMouse = this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
            var customProps = {
                "sbg:x": svgCoordsUnderMouse.x,
                "sbg:y": svgCoordsUnderMouse.y
            };
            if (shouldCreateInput) {
                this.workflow.model.createInputFromPort(portID, { customProps: customProps });
            }
            else {
                this.workflow.model.createOutputFromPort(portID, { customProps: customProps });
            }
        }
        this.cleanMemory();
        this.cleanStyles();
    };
    SVGPortDragPlugin.prototype.updateSnapPort = function (closestPort, closestPortDistance) {
        var closestPortChanged = closestPort !== this.snapPort;
        var closestPortIsOutOfRange = closestPortDistance > this.snapRadius;
        // We might need to remove old class for snapping if we are closer to some other port now
        if (this.snapPort && (closestPortChanged || closestPortIsOutOfRange)) {
            var node_1 = this.workflow.findParent(this.snapPort);
            this.snapPort.classList.remove(this.css.snap);
            node_1.classList.remove(this.css.snap);
            delete this.snapPort;
        }
        // If closest port is further away than our snapRadius, no highlighting should be done
        if (closestPortDistance > this.snapRadius) {
            return;
        }
        var originID = this.originPort.getAttribute("data-connection-id");
        var targetID = closestPort.getAttribute("data-connection-id");
        if (this.findEdge(originID, targetID)) {
            delete this.snapPort;
            return;
        }
        this.snapPort = closestPort;
        var node = this.workflow.findParent(closestPort);
        var oppositePortType = this.portType === "input" ? "output" : "input";
        closestPort.classList.add(this.css.snap);
        node.classList.add(this.css.snap);
        node.classList.add(this.css.snap + "-" + oppositePortType);
    };
    SVGPortDragPlugin.prototype.updateEdge = function (fromX, fromY, toX, toY) {
        var subEdges = this.edgeGroup.children;
        try {
            for (var _a = __values(subEdges), _b = _a.next(); !_b.done; _b = _a.next()) {
                var subEdge = _b.value;
                var path = _1.Workflow.makeConnectionPath(fromX, fromY, toX, toY, this.portType === "input" ? "left" : "right");
                subEdge.setAttribute("d", path);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SVGPortDragPlugin.prototype.updateGhostNodeVisibility = function (distanceToMouse, distanceToClosestPort) {
        var isHidden = this.ghostNode.classList.contains("hidden");
        var shouldBeVisible = distanceToMouse > this.snapRadius && distanceToClosestPort > this.snapRadius;
        if (shouldBeVisible && isHidden) {
            this.ghostNode.classList.remove("hidden");
        }
        else if (!shouldBeVisible && !isHidden) {
            this.ghostNode.classList.add("hidden");
        }
    };
    SVGPortDragPlugin.prototype.translateGhostNode = function (x, y) {
        this.ghostNode.transform.baseVal.getItem(0).setTranslate(x, y);
    };
    SVGPortDragPlugin.prototype.getPortCandidateTransformations = function (portEl) {
        var nodeEl = this.workflow.findParent(portEl);
        var nodeConnectionID = nodeEl.getAttribute("data-connection-id");
        var otherPortType = this.portType === "input" ? "output" : "input";
        var portQuery = ".node:not([data-connection-id=\"" + nodeConnectionID + "\"]) .port." + otherPortType + "-port";
        var candidates = this.workflow.workflow.querySelectorAll(portQuery);
        var matrices = new Map();
        try {
            for (var candidates_1 = __values(candidates), candidates_1_1 = candidates_1.next(); !candidates_1_1.done; candidates_1_1 = candidates_1.next()) {
                var port = candidates_1_1.value;
                matrices.set(port, geometry_1.Geometry.getTransformToElement(port, this.workflow.workflow));
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (candidates_1_1 && !candidates_1_1.done && (_a = candidates_1.return)) _a.call(candidates_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return matrices;
        var e_2, _a;
    };
    /**
     * Highlights ports that are model says are suggested.
     * Also marks their parent nodes as highlighted.
     *
     * @param {string} targetConnectionID ConnectionID of the origin port
     */
    SVGPortDragPlugin.prototype.highlightSuggestedPorts = function (targetConnectionID) {
        // Find all ports that we can validly connect to
        // Note that we can connect to any port, but some of them are suggested based on hypothetical validity.
        var portModels = this.workflow.model.gatherValidConnectionPoints(targetConnectionID);
        for (var i = 0; i < portModels.length; i++) {
            var portModel = portModels[i];
            if (!portModel.isVisible)
                continue;
            // Find port element by this connectionID and it's parent node element
            var portQuery = ".port[data-connection-id=\"" + portModel.connectionId + "\"]";
            var portElement = this.workflow.workflow.querySelector(portQuery);
            var parentNode = this.workflow.findParent(portElement);
            // Add highlighting classes to port and it's parent node
            parentNode.classList.add(this.css.suggestion);
            portElement.classList.add(this.css.suggestion);
        }
    };
    /**
     * @FIXME: GraphNode.radius should somehow come through Workflow,
     */
    SVGPortDragPlugin.prototype.createGhostNode = function (type) {
        var namespace = "http://www.w3.org/2000/svg";
        var node = document.createElementNS(namespace, "g");
        node.setAttribute("transform", "matrix(1,0,0,1,0,0)");
        node.setAttribute("data-type", type);
        node.classList.add("ghost");
        node.classList.add("node");
        node.innerHTML = "<circle class=\"ghost-circle\" cx=\"0\" cy=\"0\" r=\"" + graph_node_1.GraphNode.radius / 1.5 + "\"></circle>";
        return node;
    };
    /**
     * Finds a port closest to given SVG coordinates.
     */
    SVGPortDragPlugin.prototype.findClosestPort = function (x, y) {
        var closestPort = undefined;
        var closestDistance = Infinity;
        this.portOrigins.forEach(function (matrix, port) {
            var distance = geometry_1.Geometry.distance(x, y, matrix.e, matrix.f);
            if (distance < closestDistance) {
                closestPort = port;
                closestDistance = distance;
            }
        });
        return {
            portEl: closestPort,
            distance: closestDistance
        };
    };
    /**
     * Removes all dom elements and objects cached in-memory during dragging that are no longer needed.
     */
    SVGPortDragPlugin.prototype.cleanMemory = function () {
        this.edgeGroup.remove();
        this.ghostNode.remove();
        this.snapPort = undefined;
        this.edgeGroup = undefined;
        this.nodeCoords = undefined;
        this.originPort = undefined;
        this.portOrigins = undefined;
        this.boundingClientRect = undefined;
    };
    /**
     * Removes all css classes attached by this plugin
     */
    SVGPortDragPlugin.prototype.cleanStyles = function () {
        this.workflow.svgRoot.classList.remove(this.css.dragging);
        for (var cls in this.css) {
            var query = this.workflow.svgRoot.querySelectorAll("." + this.css[cls]);
            try {
                for (var query_1 = __values(query), query_1_1 = query_1.next(); !query_1_1.done; query_1_1 = query_1.next()) {
                    var el = query_1_1.value;
                    el.classList.remove(this.css[cls]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (query_1_1 && !query_1_1.done && (_a = query_1.return)) _a.call(query_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        var e_3, _a;
    };
    /**
     * Creates an edge (connection) between two elements determined by their connection IDs
     * This edge is created on the model, and not rendered directly on graph, as main workflow
     * is supposed to catch the creation event and draw it.
     */
    SVGPortDragPlugin.prototype.createEdgeBetweenPorts = function (source, destination) {
        // Find the connection ids of origin port and the highlighted port
        var sourceID = source.getAttribute("data-connection-id");
        var destinationID = destination.getAttribute("data-connection-id");
        // Swap their places in case you dragged out from input to output, since they have to be ordered output->input
        if (sourceID.startsWith("in")) {
            var tmp = sourceID;
            sourceID = destinationID;
            destinationID = tmp;
        }
        this.workflow.model.connect(sourceID, destinationID);
    };
    SVGPortDragPlugin.prototype.findEdge = function (sourceID, destinationID) {
        var ltrQuery = "[data-source-connection=\"" + sourceID + "\"][data-destination-connection=\"" + destinationID + "\"]";
        var rtlQuery = "[data-source-connection=\"" + destinationID + "\"][data-destination-connection=\"" + sourceID + "\"]";
        return this.workflow.workflow.querySelector(ltrQuery + "," + rtlQuery);
    };
    return SVGPortDragPlugin;
}(plugin_base_1.PluginBase));
exports.SVGPortDragPlugin = SVGPortDragPlugin;
//# sourceMappingURL=port-drag.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(40));
__export(__webpack_require__(63));
__export(__webpack_require__(64));
__export(__webpack_require__(65));
__export(__webpack_require__(66));
__export(__webpack_require__(61));
__export(__webpack_require__(42));
__export(__webpack_require__(68));
__export(__webpack_require__(69));
//# sourceMappingURL=index.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var ZoomPlugin = /** @class */ (function (_super) {
    __extends(ZoomPlugin, _super);
    function ZoomPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomPlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        this.svg = workflow.svgRoot;
        this.dispose = this.attachWheelListener();
    };
    ZoomPlugin.prototype.attachWheelListener = function () {
        var _this = this;
        var handler = this.onMouseWheel.bind(this);
        this.svg.addEventListener("mousewheel", handler, true);
        return function () { return _this.svg.removeEventListener("mousewheel", handler, true); };
    };
    ZoomPlugin.prototype.onMouseWheel = function (event) {
        var scale = this.workflow.scale;
        var scaleUpdate = scale - event.deltaY / 500;
        var zoominOut = scaleUpdate < scale;
        var zoomingIn = scaleUpdate > scale;
        if (zoomingIn && this.workflow.maxScale < scaleUpdate) {
            return;
        }
        if (zoominOut && this.workflow.minScale > scaleUpdate) {
            return;
        }
        this.workflow.scaleAtPoint(scaleUpdate, event.clientX, event.clientY);
        event.stopPropagation();
    };
    ZoomPlugin.prototype.destroy = function () {
        this.dispose();
        this.dispose = undefined;
    };
    return ZoomPlugin;
}(plugin_base_1.PluginBase));
exports.ZoomPlugin = ZoomPlugin;
//# sourceMappingURL=zoom.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var graph_node_1 = __webpack_require__(25);
var svg_utils_1 = __webpack_require__(58);
var SVGArrangePlugin = /** @class */ (function () {
    function SVGArrangePlugin() {
    }
    SVGArrangePlugin.prototype.registerWorkflow = function (workflow) {
        this.workflow = workflow;
        this.svgRoot = workflow.svgRoot;
    };
    SVGArrangePlugin.prototype.registerOnBeforeChange = function (fn) {
        this.onBeforeChange = function () { return fn({ type: "arrange" }); };
    };
    SVGArrangePlugin.prototype.registerOnAfterChange = function (fn) {
        this.onAfterChange = function () { return fn({ type: "arrange" }); };
    };
    SVGArrangePlugin.prototype.registerOnAfterRender = function (fn) {
        this.triggerAfterRender = function () { return fn({ type: "arrange" }); };
    };
    SVGArrangePlugin.prototype.afterRender = function () {
        try {
            for (var _a = __values(this.workflow.model.steps), _b = _a.next(); !_b.done; _b = _a.next()) {
                var step = _b.value;
                if (step.isVisible) {
                    var missingCoordinate = isNaN(parseInt(step.customProps["sbg:x"]));
                    if (missingCoordinate) {
                        this.arrange();
                    }
                    return;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    SVGArrangePlugin.prototype.arrange = function () {
        this.onBeforeChange();
        // We need to reset all transformations on the workflow for now.
        // @TODO Make arranging work without this
        this.workflow.resetTransform();
        // We need main graph and dangling nodes separately, they will be distributed differently
        var _a = this.makeNodeGraphs(), mainGraph = _a.mainGraph, danglingNodes = _a.danglingNodes;
        // Create an array of columns, each containing a list of NodeIOs
        var columns = this.distributeNodesIntoColumns(mainGraph);
        // Get total area in which we will fit the graph, and per-column dimensions
        var _b = this.calculateColumnSizes(columns), distributionArea = _b.distributionArea, columnDimensions = _b.columnDimensions;
        // This will be the vertical middle around which the graph should be centered
        var verticalBaseline = distributionArea.height / 2;
        var xOffset = 0;
        var maxYOffset = 0;
        // Here we will store positions for each node that is to be updated.
        // This should then be emitted as an afterChange event.
        var nodePositionUpdates = {};
        columns.forEach(function (column, index) {
            var colSize = columnDimensions[index];
            var yOffset = verticalBaseline - (colSize.height / 2) - column[0].rect.height / 2;
            column.forEach(function (node) {
                yOffset += node.rect.height / 2;
                var matrix = svg_utils_1.SVGUtils.createMatrix().translate(xOffset, yOffset);
                yOffset += node.rect.height / 2;
                if (yOffset > maxYOffset) {
                    maxYOffset = yOffset;
                }
                node.el.setAttribute("transform", svg_utils_1.SVGUtils.matrixToTransformAttr(matrix));
                nodePositionUpdates[node.connectionID] = {
                    x: matrix.e,
                    y: matrix.f
                };
            });
            xOffset += colSize.width;
        });
        var danglingNodeKeys = Object.keys(danglingNodes).sort(function (a, b) {
            var aIsInput = a.startsWith("out/");
            var aIsOutput = a.startsWith("in/");
            var bIsInput = b.startsWith("out/");
            var bIsOutput = b.startsWith("in/");
            var lowerA = a.toLowerCase();
            var lowerB = b.toLowerCase();
            if (aIsOutput) {
                if (bIsOutput) {
                    return lowerB.localeCompare(lowerA);
                }
                else {
                    return 1;
                }
            }
            else if (aIsInput) {
                if (bIsOutput) {
                    return -1;
                }
                if (bIsInput) {
                    return lowerB.localeCompare(lowerA);
                }
                else {
                    return 1;
                }
            }
            else {
                if (!bIsOutput && !bIsInput) {
                    return lowerB.localeCompare(lowerA);
                }
                else {
                    return -1;
                }
            }
        });
        var danglingNodeMarginOffset = 30;
        var danglingNodeSideLength = graph_node_1.GraphNode.radius * 5;
        var maxNodeHeightInRow = 0;
        var row = 0;
        var indexWidthMap = new Map();
        var rowMaxHeightMap = new Map();
        xOffset = 0;
        var danglingRowAreaWidth = Math.max(distributionArea.width, danglingNodeSideLength * 3);
        danglingNodeKeys.forEach(function (connectionID, index) {
            var el = danglingNodes[connectionID];
            var rect = el.firstElementChild.getBoundingClientRect();
            indexWidthMap.set(index, rect.width);
            if (xOffset === 0) {
                xOffset -= rect.width / 2;
            }
            if (rect.height > maxNodeHeightInRow) {
                maxNodeHeightInRow = rect.height;
            }
            xOffset += rect.width + danglingNodeMarginOffset + Math.max(150 - rect.width, 0);
            if (xOffset >= danglingRowAreaWidth && index < danglingNodeKeys.length - 1) {
                rowMaxHeightMap.set(row++, maxNodeHeightInRow);
                maxNodeHeightInRow = 0;
                xOffset = 0;
            }
        });
        rowMaxHeightMap.set(row, maxNodeHeightInRow);
        var colYOffset = maxYOffset;
        xOffset = 0;
        row = 0;
        danglingNodeKeys.forEach(function (connectionID, index) {
            var el = danglingNodes[connectionID];
            var width = indexWidthMap.get(index);
            var rowHeight = rowMaxHeightMap.get(row);
            var left = xOffset + width / 2;
            var top = colYOffset
                + danglingNodeMarginOffset
                + Math.ceil(rowHeight / 2)
                + ((xOffset === 0 ? 0 : left) / danglingRowAreaWidth) * danglingNodeSideLength;
            if (xOffset === 0) {
                left -= width / 2;
                xOffset -= width / 2;
            }
            xOffset += width + danglingNodeMarginOffset + Math.max(150 - width, 0);
            var matrix = svg_utils_1.SVGUtils.createMatrix().translate(left, top);
            el.setAttribute("transform", svg_utils_1.SVGUtils.matrixToTransformAttr(matrix));
            nodePositionUpdates[connectionID] = { x: matrix.e, y: matrix.f };
            if (xOffset >= danglingRowAreaWidth) {
                colYOffset += Math.ceil(rowHeight) + danglingNodeMarginOffset;
                xOffset = 0;
                maxNodeHeightInRow = 0;
                row++;
            }
        });
        this.workflow.redrawEdges();
        this.workflow.fitToViewport();
        this.onAfterChange(nodePositionUpdates);
        this.triggerAfterRender();
        for (var id in nodePositionUpdates) {
            var pos = nodePositionUpdates[id];
            var nodeModel = this.workflow.model.findById(id);
            if (!nodeModel.customProps) {
                nodeModel.customProps = {};
            }
            Object.assign(nodeModel.customProps, {
                "sbg:x": pos.x,
                "sbg:y": pos.y
            });
        }
        return nodePositionUpdates;
    };
    /**
     * Calculates column dimensions and total graph area
     * @param {NodeIO[][]} columns
     */
    SVGArrangePlugin.prototype.calculateColumnSizes = function (columns) {
        var distributionArea = { width: 0, height: 0 };
        var columnDimensions = [];
        for (var i = 1; i < columns.length; i++) {
            var width = 0;
            var height = 0;
            for (var j = 0; j < columns[i].length; j++) {
                var entry = columns[i][j];
                height += entry.rect.height;
                if (width < entry.rect.width) {
                    width = entry.rect.width;
                }
            }
            columnDimensions[i] = { height: height, width: width };
            distributionArea.width += width;
            if (height > distributionArea.height) {
                distributionArea.height = height;
            }
        }
        return {
            columnDimensions: columnDimensions,
            distributionArea: distributionArea
        };
    };
    /**
     * Maps node's connectionID to a 1-indexed column number
     */
    SVGArrangePlugin.prototype.distributeNodesIntoColumns = function (graph) {
        var idToZoneMap = {};
        var sortedNodeIDs = Object.keys(graph).sort(function (a, b) { return b.localeCompare(a); });
        var zones = [];
        for (var i = 0; i < sortedNodeIDs.length; i++) {
            var nodeID = sortedNodeIDs[i];
            var node = graph[nodeID];
            // For outputs and steps, we calculate the zone as a longest path you can take to them
            if (node.type !== "input") {
                idToZoneMap[nodeID] = this.traceLongestNodePathLength(node, graph);
            }
            else {
                //
                // Longest trace methods would put all inputs in the first column,
                // but we want it just behind the leftmost step that it is connected to
                // So instead of:
                //
                // (input)<----------------->(step)---
                // (input)<---------->(step)----------
                //
                // It should be:
                //
                // ---------------(input)<--->(step)---
                // --------(input)<-->(step)-----------
                //
                var closestNodeZone = Infinity;
                for (var i_1 = 0; i_1 < node.outputs.length; i_1++) {
                    var successorNodeZone = idToZoneMap[node.outputs[i_1]];
                    if (successorNodeZone < closestNodeZone) {
                        closestNodeZone = successorNodeZone;
                    }
                }
                if (closestNodeZone === Infinity) {
                    idToZoneMap[nodeID] = 1;
                }
                else {
                    idToZoneMap[nodeID] = closestNodeZone - 1;
                }
            }
            var zone = idToZoneMap[nodeID];
            zones[zone] || (zones[zone] = []);
            zones[zone].push(graph[nodeID]);
        }
        return zones;
    };
    /**
     * Finds all nodes in the graph, and indexes them by their "data-connection-id" attribute
     */
    SVGArrangePlugin.prototype.indexNodesByID = function () {
        var indexed = {};
        var nodes = this.svgRoot.querySelectorAll(".node");
        for (var i = 0; i < nodes.length; i++) {
            indexed[nodes[i].getAttribute("data-connection-id")] = nodes[i];
        }
        return indexed;
    };
    /**
     * Finds length of the longest possible path from the graph root to a node.
     * Lengths are 1-indexed. When a node has no predecessors, it will have length of 1.
     */
    SVGArrangePlugin.prototype.traceLongestNodePathLength = function (node, nodeGraph, visited) {
        if (visited === void 0) { visited = new Set(); }
        visited.add(node);
        if (node.inputs.length === 0) {
            return 1;
        }
        var inputPathLengths = [];
        for (var i = 0; i < node.inputs.length; i++) {
            var el = nodeGraph[node.inputs[i]];
            if (visited.has(el)) {
                continue;
            }
            inputPathLengths.push(this.traceLongestNodePathLength(el, nodeGraph, visited));
        }
        return Math.max.apply(Math, __spread(inputPathLengths)) + 1;
    };
    SVGArrangePlugin.prototype.makeNodeGraphs = function () {
        // We need all nodes in order to find the dangling ones, those will be sorted separately
        var allNodes = this.indexNodesByID();
        // Make a graph representation where you can trace inputs and outputs from/to connection ids
        var nodeGraph = {};
        // Edges are the main source of information from which we will distribute nodes
        var edges = this.svgRoot.querySelectorAll(".edge");
        for (var i = 0; i < edges.length; i++) {
            var edge = edges[i];
            var sourceConnectionID = edge.getAttribute("data-source-connection");
            var destinationConnectionID = edge.getAttribute("data-destination-connection");
            var _a = __read(sourceConnectionID.split("/"), 3), sourceSide = _a[0], sourceNodeID = _a[1], sourcePortID = _a[2];
            var _b = __read(destinationConnectionID.split("/"), 3), destinationSide = _b[0], destinationNodeID = _b[1], destinationPortID = _b[2];
            // Both source and destination are considered to be steps by default
            var sourceType = "step";
            var destinationType = "step";
            // Ports have the same node and port ids
            if (sourceNodeID === sourcePortID) {
                sourceType = sourceSide === "in" ? "output" : "input";
            }
            if (destinationNodeID === destinationPortID) {
                destinationType = destinationSide === "in" ? "output" : "input";
            }
            // Initialize keys on graph if they don't exist
            var sourceNode = this.svgRoot.querySelector(".node[data-id=\"" + sourceNodeID + "\"]");
            var destinationNode = this.svgRoot.querySelector(".node[data-id=\"" + destinationNodeID + "\"]");
            var sourceNodeConnectionID = sourceNode.getAttribute("data-connection-id");
            var destinationNodeConnectionID = destinationNode.getAttribute("data-connection-id");
            // Source and destination of this edge are obviously not dangling, so we can remove them
            // from the set of potentially dangling nodes
            delete allNodes[sourceNodeConnectionID];
            delete allNodes[destinationNodeConnectionID];
            // Ensure that the source node has its entry in the node graph
            (nodeGraph[sourceNodeID] || (nodeGraph[sourceNodeID] = {
                inputs: [],
                outputs: [],
                type: sourceType,
                connectionID: sourceNodeConnectionID,
                el: sourceNode,
                rect: sourceNode.getBoundingClientRect()
            }));
            // Ensure that the source node has its entry in the node graph
            (nodeGraph[destinationNodeID] || (nodeGraph[destinationNodeID] = {
                inputs: [],
                outputs: [],
                type: destinationType,
                connectionID: destinationNodeConnectionID,
                el: destinationNode,
                rect: destinationNode.getBoundingClientRect()
            }));
            nodeGraph[sourceNodeID].outputs.push(destinationNodeID);
            nodeGraph[destinationNodeID].inputs.push(sourceNodeID);
        }
        return {
            mainGraph: nodeGraph,
            danglingNodes: allNodes
        };
    };
    return SVGArrangePlugin;
}());
exports.SVGArrangePlugin = SVGArrangePlugin;
//# sourceMappingURL=arrange.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var SVGValidatePlugin = /** @class */ (function (_super) {
    __extends(SVGValidatePlugin, _super);
    function SVGValidatePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.modelDisposers = [];
        /** Map of CSS classes attached by this plugin */
        _this.css = {
            plugin: "__plugin-validate",
            invalid: "__validate-invalid"
        };
        return _this;
    }
    SVGValidatePlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        // add plugin specific class to the svgRoot for scoping
        this.workflow.svgRoot.classList.add(this.css.plugin);
    };
    SVGValidatePlugin.prototype.afterModelChange = function () {
        this.disposeModelListeners();
        // add listener for all subsequent edge validation
        var update = this.workflow.model.on("connections.updated", this.renderEdgeValidation.bind(this));
        var create = this.workflow.model.on("connection.create", this.renderEdgeValidation.bind(this));
        this.modelDisposers.concat([update.dispose, create.dispose]);
    };
    SVGValidatePlugin.prototype.destroy = function () {
        this.disposeModelListeners();
    };
    SVGValidatePlugin.prototype.afterRender = function () {
        // do initial validation rendering for edges
        this.renderEdgeValidation();
    };
    SVGValidatePlugin.prototype.onEditableStateChange = function (enabled) {
        if (enabled) {
            // only show validation if workflow is editable
            this.renderEdgeValidation();
        }
        else {
            this.removeClasses(this.workflow.workflow.querySelectorAll(".edge"));
        }
    };
    SVGValidatePlugin.prototype.disposeModelListeners = function () {
        try {
            for (var _a = __values(this.modelDisposers), _b = _a.next(); !_b.done; _b = _a.next()) {
                var disposeListener = _b.value;
                disposeListener();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.modelDisposers = [];
        var e_1, _c;
    };
    SVGValidatePlugin.prototype.removeClasses = function (edges) {
        try {
            // remove validity class on all edges
            for (var edges_1 = __values(edges), edges_1_1 = edges_1.next(); !edges_1_1.done; edges_1_1 = edges_1.next()) {
                var e = edges_1_1.value;
                e.classList.remove(this.css.invalid);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (edges_1_1 && !edges_1_1.done && (_a = edges_1.return)) _a.call(edges_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var e_2, _a;
    };
    SVGValidatePlugin.prototype.renderEdgeValidation = function () {
        var _this = this;
        var graphEdges = this.workflow.workflow.querySelectorAll(".edge");
        this.removeClasses(graphEdges);
        // iterate through all modal connections
        this.workflow.model.connections.forEach(function (e) {
            // if the connection isn't valid (should be colored on graph)
            if (!e.isValid) {
                try {
                    // iterate through edges on the svg
                    for (var graphEdges_1 = __values(graphEdges), graphEdges_1_1 = graphEdges_1.next(); !graphEdges_1_1.done; graphEdges_1_1 = graphEdges_1.next()) {
                        var ge = graphEdges_1_1.value;
                        var sourceNodeID = ge.getAttribute("data-source-connection");
                        var destinationNodeID = ge.getAttribute("data-destination-connection");
                        // compare invalid edge source/destination with svg edge
                        if (e.source.id === sourceNodeID && e.destination.id === destinationNodeID) {
                            // if its a match, tag it with the appropriate class and break from the loop
                            ge.classList.add(_this.css.invalid);
                            break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (graphEdges_1_1 && !graphEdges_1_1.done && (_a = graphEdges_1.return)) _a.call(graphEdges_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
            var e_3, _a;
        });
    };
    return SVGValidatePlugin;
}(plugin_base_1.PluginBase));
exports.SVGValidatePlugin = SVGValidatePlugin;
//# sourceMappingURL=validate.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(62);
var plugin_base_1 = __webpack_require__(8);
var edge_panning_1 = __webpack_require__(67);
/**
 * This plugin makes node dragging and movement possible.
 *
 * @FIXME: attach events for before and after change
 */
var SVGNodeMovePlugin = /** @class */ (function (_super) {
    __extends(SVGNodeMovePlugin, _super);
    function SVGNodeMovePlugin(parameters) {
        if (parameters === void 0) { parameters = {}; }
        var _this = _super.call(this) || this;
        /** How far from the edge of the viewport does mouse need to be before panning is triggered */
        _this.scrollMargin = 50;
        /** How fast does workflow move while panning */
        _this.movementSpeed = 10;
        _this.wheelPrevent = function (ev) { return ev.stopPropagation(); };
        _this.boundMoveHandler = _this.onMove.bind(_this);
        _this.boundMoveStartHandler = _this.onMoveStart.bind(_this);
        _this.boundMoveEndHandler = _this.onMoveEnd.bind(_this);
        _this.detachDragListenerFn = undefined;
        Object.assign(_this, parameters);
        return _this;
    }
    SVGNodeMovePlugin.prototype.onEditableStateChange = function (enabled) {
        if (enabled) {
            this.attachDrag();
        }
        else {
            this.detachDrag();
        }
    };
    SVGNodeMovePlugin.prototype.afterRender = function () {
        if (this.workflow.editingEnabled) {
            this.attachDrag();
        }
    };
    SVGNodeMovePlugin.prototype.destroy = function () {
        this.detachDrag();
    };
    SVGNodeMovePlugin.prototype.registerWorkflow = function (workflow) {
        _super.prototype.registerWorkflow.call(this, workflow);
        this.edgePanner = new edge_panning_1.EdgePanner(this.workflow, {
            scrollMargin: this.scrollMargin,
            movementSpeed: this.movementSpeed
        });
    };
    SVGNodeMovePlugin.prototype.detachDrag = function () {
        if (typeof this.detachDragListenerFn === "function") {
            this.detachDragListenerFn();
        }
        this.detachDragListenerFn = undefined;
    };
    SVGNodeMovePlugin.prototype.attachDrag = function () {
        this.detachDrag();
        this.detachDragListenerFn = this.workflow.domEvents.drag(".node .core", this.boundMoveHandler, this.boundMoveStartHandler, this.boundMoveEndHandler);
    };
    SVGNodeMovePlugin.prototype.getWorkflowMatrix = function () {
        return this.workflow.workflow.transform.baseVal.getItem(0).matrix;
    };
    SVGNodeMovePlugin.prototype.onMove = function (dx, dy, ev) {
        var _this = this;
        /** We will use workflow scale to determine how our mouse movement translate to svg proportions */
        var scale = this.workflow.scale;
        /** Need to know how far did the workflow itself move since when we started dragging */
        var matrixMovement = {
            x: this.getWorkflowMatrix().e - this.startWorkflowTranslation.x,
            y: this.getWorkflowMatrix().f - this.startWorkflowTranslation.y
        };
        /** We might have hit the boundary and need to start panning */
        this.edgePanner.triggerCollisionDetection(ev.clientX, ev.clientY, function (sdx, sdy) {
            _this.sdx += sdx;
            _this.sdy += sdy;
            _this.translateNodeBy(_this.movingNode, sdx, sdy);
            _this.redrawEdges(_this.sdx, _this.sdy);
        });
        /**
         * We need to store scaled ∆x and ∆y because this is not the only place from which node is being moved.
         * If mouse is outside the viewport, and the workflow is panning, startScroll will continue moving
         * this node, so it needs to know where to start from and update it, so this method can take
         * over when mouse gets back to the viewport.
         *
         * If there was no handoff, node would jump back and forth to
         * last positions for each movement initiator separately.
         */
        this.sdx = (dx - matrixMovement.x) / scale;
        this.sdy = (dy - matrixMovement.y) / scale;
        var moveX = this.sdx + this.startX;
        var moveY = this.sdy + this.startY;
        this.translateNodeTo(this.movingNode, moveX, moveY);
        this.redrawEdges(this.sdx, this.sdy);
    };
    /**
     * Triggered from {@link attachDrag} when drag starts.
     * This method initializes properties that are needed for calculations during movement.
     */
    SVGNodeMovePlugin.prototype.onMoveStart = function (event, handle) {
        /** We will query the SVG dom for edges that we need to move, so store svg element for easy access */
        var svg = this.workflow.svgRoot;
        document.addEventListener("mousewheel", this.wheelPrevent, true);
        /** Our drag handle is not the whole node because that would include ports and labels, but a child of it*/
        var node = handle.parentNode;
        /** Store initial transform values so we know how much we've moved relative from the starting position */
        var nodeMatrix = node.transform.baseVal.getItem(0).matrix;
        this.startX = nodeMatrix.e;
        this.startY = nodeMatrix.f;
        /** We have to query for edges that are attached to this node because we will move them as well */
        var nodeID = node.getAttribute("data-id");
        /**
         * When user drags the node to the edge and waits while workflow pans to the side,
         * mouse movement stops, but workflow movement starts.
         * We then utilize this to get movement ∆ of the workflow, and use that for translation instead.
         */
        this.startWorkflowTranslation = {
            x: this.getWorkflowMatrix().e,
            y: this.getWorkflowMatrix().f
        };
        /** Used to determine whether dragged node is hitting the edge, so we can pan the Workflow*/
        this.boundingClientRect = svg.getBoundingClientRect();
        /** Node movement can be initiated from both mouse events and animationFrame, so make it accessible */
        this.movingNode = handle.parentNode;
        /**
         * While node is being moved, incoming and outgoing edges also need to be moved in order to stay attached.
         * We don't want to query them all the time, so we cache them in maps that point from their dom elements
         * to an array of numbers that represent their bezier curves, since we will update those curves.
         */
        this.inputEdges = new Map();
        this.outputEdges = new Map();
        var outputsSelector = ".edge[data-source-node='" + nodeID + "'] .sub-edge";
        var inputsSelector = ".edge[data-destination-node='" + nodeID + "'] .sub-edge";
        var query = svg.querySelectorAll([inputsSelector, outputsSelector].join(", "));
        try {
            for (var query_1 = __values(query), query_1_1 = query_1.next(); !query_1_1.done; query_1_1 = query_1.next()) {
                var subEdge = query_1_1.value;
                var isInput = subEdge.parentElement.getAttribute("data-destination-node") === nodeID;
                var path = subEdge.getAttribute("d").split(" ").map(Number).filter(function (e) { return !isNaN(e); });
                isInput ? this.inputEdges.set(subEdge, path) : this.outputEdges.set(subEdge, path);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (query_1_1 && !query_1_1.done && (_a = query_1.return)) _a.call(query_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _a;
    };
    SVGNodeMovePlugin.prototype.translateNodeBy = function (node, x, y) {
        var matrix = node.transform.baseVal.getItem(0).matrix;
        this.translateNodeTo(node, matrix.e + x, matrix.f + y);
    };
    SVGNodeMovePlugin.prototype.translateNodeTo = function (node, x, y) {
        node.transform.baseVal.getItem(0).setTranslate(x, y);
    };
    /**
     * Redraws stored input and output edges so as to transform them with respect to
     * scaled transformation differences, sdx and sdy.
     */
    SVGNodeMovePlugin.prototype.redrawEdges = function (sdx, sdy) {
        this.inputEdges.forEach(function (p, el) {
            var path = _1.Workflow.makeConnectionPath(p[0], p[1], p[6] + sdx, p[7] + sdy);
            el.setAttribute("d", path);
        });
        this.outputEdges.forEach(function (p, el) {
            var path = _1.Workflow.makeConnectionPath(p[0] + sdx, p[1] + sdy, p[6], p[7]);
            el.setAttribute("d", path);
        });
    };
    /**
     * Triggered from {@link attachDrag} after move event ends
     */
    SVGNodeMovePlugin.prototype.onMoveEnd = function () {
        this.edgePanner.stop();
        var id = this.movingNode.getAttribute("data-connection-id");
        var nodeModel = this.workflow.model.findById(id);
        if (!nodeModel.customProps) {
            nodeModel.customProps = {};
        }
        var matrix = this.movingNode.transform.baseVal.getItem(0).matrix;
        Object.assign(nodeModel.customProps, {
            "sbg:x": matrix.e,
            "sbg:y": matrix.f,
        });
        this.onAfterChange({ type: "node-move" });
        document.removeEventListener("mousewheel", this.wheelPrevent, true);
        delete this.startX;
        delete this.startY;
        delete this.movingNode;
        delete this.inputEdges;
        delete this.outputEdges;
        delete this.boundingClientRect;
        delete this.startWorkflowTranslation;
    };
    return SVGNodeMovePlugin;
}(plugin_base_1.PluginBase));
exports.SVGNodeMovePlugin = SVGNodeMovePlugin;
//# sourceMappingURL=node-move.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EdgePanner = /** @class */ (function () {
    function EdgePanner(workflow, config) {
        if (config === void 0) { config = {
            scrollMargin: 100,
            movementSpeed: 10
        }; }
        this.movementSpeed = 10;
        this.scrollMargin = 100;
        /**
         * Current state of collision on both axes, each negative if beyond top/left border,
         * positive if beyond right/bottom, zero if inside the viewport
         */
        this.collision = { x: 0, y: 0 };
        this.panningCallback = function (sdx, sdy) { return void 0; };
        var options = Object.assign({
            scrollMargin: 100,
            movementSpeed: 10
        }, config);
        this.workflow = workflow;
        this.scrollMargin = options.scrollMargin;
        this.movementSpeed = options.movementSpeed;
        this.viewportClientRect = this.workflow.svgRoot.getBoundingClientRect();
    }
    /**
     * Calculates if dragged node is at or beyond the point beyond which workflow panning should be triggered.
     * If collision state has changed, {@link onBoundaryCollisionChange} will be triggered.
     */
    EdgePanner.prototype.triggerCollisionDetection = function (x, y, callback) {
        var collision = { x: 0, y: 0 };
        this.panningCallback = callback;
        var _a = this.viewportClientRect, left = _a.left, right = _a.right, top = _a.top, bottom = _a.bottom;
        left = left + this.scrollMargin;
        right = right - this.scrollMargin;
        top = top + this.scrollMargin;
        bottom = bottom - this.scrollMargin;
        if (x < left) {
            collision.x = x - left;
        }
        else if (x > right) {
            collision.x = x - right;
        }
        if (y < top) {
            collision.y = y - top;
        }
        else if (y > bottom) {
            collision.y = y - bottom;
        }
        if (Math.sign(collision.x) !== Math.sign(this.collision.x)
            || Math.sign(collision.y) !== Math.sign(this.collision.y)) {
            var previous = this.collision;
            this.collision = collision;
            this.onBoundaryCollisionChange(collision, previous);
        }
    };
    /**
     * Triggered when {@link triggerCollisionDetection} determines that collision properties have changed.
     */
    EdgePanner.prototype.onBoundaryCollisionChange = function (current, previous) {
        this.stop();
        if (current.x === 0 && current.y === 0) {
            return;
        }
        this.start(this.collision);
    };
    EdgePanner.prototype.start = function (direction) {
        var _this = this;
        var startTimestamp;
        var scale = this.workflow.scale;
        var matrix = this.workflow.workflow.transform.baseVal.getItem(0).matrix;
        var sixtyFPS = 16.6666;
        var onFrame = function (timestamp) {
            var frameDeltaTime = timestamp - (startTimestamp || timestamp);
            startTimestamp = timestamp;
            // We need to stop the animation at some point
            // It should be stopped when there is no animation frame ID anymore,
            // which means that stopScroll() was called
            // However, don't do that if we haven't made the first move yet, which is a situation when ∆t is 0
            if (frameDeltaTime !== 0 && !_this.panAnimationFrame) {
                startTimestamp = undefined;
                return;
            }
            var moveX = Math.sign(direction.x) * _this.movementSpeed * frameDeltaTime / sixtyFPS;
            var moveY = Math.sign(direction.y) * _this.movementSpeed * frameDeltaTime / sixtyFPS;
            matrix.e -= moveX;
            matrix.f -= moveY;
            var frameDiffX = moveX / scale;
            var frameDiffY = moveY / scale;
            _this.panningCallback(frameDiffX, frameDiffY);
            _this.panAnimationFrame = window.requestAnimationFrame(onFrame);
        };
        this.panAnimationFrame = window.requestAnimationFrame(onFrame);
    };
    EdgePanner.prototype.stop = function () {
        window.cancelAnimationFrame(this.panAnimationFrame);
        this.panAnimationFrame = undefined;
    };
    return EdgePanner;
}());
exports.EdgePanner = EdgePanner;
//# sourceMappingURL=edge-panning.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var SVGEdgeHoverPlugin = /** @class */ (function (_super) {
    __extends(SVGEdgeHoverPlugin, _super);
    function SVGEdgeHoverPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boundEdgeEnterFunction = _this.onEdgeEnter.bind(_this);
        _this.modelListener = {
            dispose: function () { return void 0; }
        };
        return _this;
    }
    SVGEdgeHoverPlugin.prototype.afterRender = function () {
        this.attachEdgeHoverBehavior();
    };
    SVGEdgeHoverPlugin.prototype.destroy = function () {
        this.detachEdgeHoverBehavior();
        this.modelListener.dispose();
    };
    SVGEdgeHoverPlugin.prototype.attachEdgeHoverBehavior = function () {
        this.detachEdgeHoverBehavior();
        this.workflow.workflow.addEventListener("mouseenter", this.boundEdgeEnterFunction, true);
    };
    SVGEdgeHoverPlugin.prototype.detachEdgeHoverBehavior = function () {
        this.workflow.workflow.removeEventListener("mouseenter", this.boundEdgeEnterFunction, true);
    };
    SVGEdgeHoverPlugin.prototype.onEdgeEnter = function (ev) {
        var _this = this;
        // Ignore if we did not enter an edge
        if (!ev.srcElement.classList.contains("edge"))
            return;
        var target = ev.srcElement;
        var tipEl;
        var onMouseMove = (function (ev) {
            var coords = _this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
            tipEl.setAttribute("x", String(coords.x));
            tipEl.setAttribute("y", String(coords.y - 16));
        }).bind(this);
        var onMouseLeave = (function (ev) {
            tipEl.remove();
            target.removeEventListener("mousemove", onMouseMove);
            target.removeEventListener("mouseleave", onMouseLeave);
        }).bind(this);
        this.modelListener = this.workflow.model.on("connection.remove", function (source, destination) {
            if (!tipEl)
                return;
            var _a = __read(tipEl.getAttribute("data-source-destination").split("$!$"), 2), tipS = _a[0], tipD = _a[1];
            if (tipS === source.connectionId && tipD === destination.connectionId) {
                tipEl.remove();
            }
        });
        var sourceNode = target.getAttribute("data-source-node");
        var destNode = target.getAttribute("data-destination-node");
        var sourcePort = target.getAttribute("data-source-port");
        var destPort = target.getAttribute("data-destination-port");
        var sourceConnect = target.getAttribute("data-source-connection");
        var destConnect = target.getAttribute("data-destination-connection");
        var sourceLabel = sourceNode === sourcePort ? sourceNode : sourceNode + " (" + sourcePort + ")";
        var destLabel = destNode === destPort ? destNode : destNode + " (" + destPort + ")";
        var coords = this.workflow.transformScreenCTMtoCanvas(ev.clientX, ev.clientY);
        var ns = "http://www.w3.org/2000/svg";
        tipEl = document.createElementNS(ns, "text");
        tipEl.classList.add("label");
        tipEl.classList.add("label-edge");
        tipEl.setAttribute("x", String(coords.x));
        tipEl.setAttribute("y", String(coords.y));
        tipEl.setAttribute("data-source-destination", sourceConnect + "$!$" + destConnect);
        tipEl.innerHTML = sourceLabel + " → " + destLabel;
        this.workflow.workflow.appendChild(tipEl);
        target.addEventListener("mousemove", onMouseMove);
        target.addEventListener("mouseleave", onMouseLeave);
    };
    return SVGEdgeHoverPlugin;
}(plugin_base_1.PluginBase));
exports.SVGEdgeHoverPlugin = SVGEdgeHoverPlugin;
//# sourceMappingURL=edge-hover.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_base_1 = __webpack_require__(8);
var selection_1 = __webpack_require__(42);
var models_1 = __webpack_require__(27);
var DeletionPlugin = /** @class */ (function (_super) {
    __extends(DeletionPlugin, _super);
    function DeletionPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boundDeleteFunction = _this.onDelete.bind(_this);
        return _this;
    }
    DeletionPlugin.prototype.afterRender = function () {
        this.attachDeleteBehavior();
    };
    DeletionPlugin.prototype.onEditableStateChange = function (enable) {
        if (enable) {
            this.attachDeleteBehavior();
        }
        else {
            this.detachDeleteBehavior();
        }
    };
    DeletionPlugin.prototype.attachDeleteBehavior = function () {
        this.detachDeleteBehavior();
        window.addEventListener("keyup", this.boundDeleteFunction, true);
    };
    DeletionPlugin.prototype.detachDeleteBehavior = function () {
        window.removeEventListener("keyup", this.boundDeleteFunction, true);
    };
    DeletionPlugin.prototype.onDelete = function (ev) {
        if (ev.which !== 8 && ev.which !== 46 || !(ev.target instanceof SVGElement)) {
            return;
        }
        this.deleteSelection();
    };
    DeletionPlugin.prototype.deleteSelection = function () {
        var _this = this;
        var selection = this.workflow.getPlugin(selection_1.SelectionPlugin);
        if (!selection || !this.workflow.editingEnabled) {
            return;
        }
        var selected = selection.getSelection();
        selected.forEach(function (type, id) {
            if (type === "node") {
                var model = _this.workflow.model.findById(id);
                if (model instanceof models_1.StepModel) {
                    _this.workflow.model.removeStep(model);
                    selection.clearSelection();
                }
                else if (model instanceof models_1.WorkflowInputParameterModel) {
                    _this.workflow.model.removeInput(model);
                    selection.clearSelection();
                }
                else if (model instanceof models_1.WorkflowOutputParameterModel) {
                    _this.workflow.model.removeOutput(model);
                    selection.clearSelection();
                }
            }
            else {
                var _a = __read(id.split(selection_1.SelectionPlugin.edgePortsDelimiter), 2), source = _a[0], destination = _a[1];
                _this.workflow.model.disconnect(source, destination);
                selection.clearSelection();
            }
        });
    };
    DeletionPlugin.prototype.destroy = function () {
        this.detachDeleteBehavior();
    };
    return DeletionPlugin;
}(plugin_base_1.PluginBase));
exports.DeletionPlugin = DeletionPlugin;
//# sourceMappingURL=deletion.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cwl = __webpack_require__(71);

var _cwl2 = _interopRequireDefault(_cwl);

var _vue = __webpack_require__(119);

var _vue2 = _interopRequireDefault(_vue);

var _cwlSvg = __webpack_require__(39);

var _cwlSvgExpand = __webpack_require__(123);

var _cwlSvgExpand2 = _interopRequireDefault(_cwlSvgExpand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.devtools = true;
_vue2.default.config.debug = true;
var selection = new _cwlSvg.SelectionPlugin();
var vue = new _vue2.default({
    el: '#vue',
    data: {
        plugins: [new _cwlSvg.SVGArrangePlugin(), new _cwlSvgExpand2.default(), selection],
        selection: null
    },
    components: {
        cwl: _cwl2.default
    },
    methods: {
        selectionChanged: function selectionChanged(payload) {
            this.selection = payload;
        }
    }
});

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_cwl_vue__ = __webpack_require__(44);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_597a6c5a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_cwl_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(118);
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(72)
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_cwl_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_597a6c5a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_cwl_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_597a6c5a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_cwl_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "cwl.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-597a6c5a", Component.options)
  } else {
    hotAPI.reload("data-v-597a6c5a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(74).default
var update = add("3887b45a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-597a6c5a\",\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cwl.vue", function() {
     var newContent = require("!!./node_modules/css-loader/index.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-597a6c5a\",\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cwl.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(true);
// imports


// module
exports.push([module.i, "\n.cwl-workflow {\n    height: 500px;\n    position: relative;\n}\n", "", {"version":3,"sources":["/home/michael/Programming/registry-website/js/cwl.vue"],"names":[],"mappings":";AA0GA;IACA,cAAA;IACA,mBAAA;CACA","file":"cwl.vue","sourcesContent":["<template>\n    <svg ref=\"svg\" class=\"cwl-workflow\"></svg>\n</template>\n\n<script>\n    import \"cwl-svg/src/assets/styles/themes/rabix-dark/theme.scss\";\n    import \"cwl-svg/src/plugins/port-drag/theme.dark.scss\";\n    import \"cwl-svg/src/plugins/selection/theme.dark.scss\";\n\n    import {WorkflowFactory} from \"cwlts/models\";\n    import {Workflow, SVGArrangePlugin, SelectionPlugin} from \"cwl-svg\";\n\n    export default {\n        data() {\n            return {\n                selectedNode: null,\n                workflow: null,\n                cwlState: null\n            };\n        },\n\n        computed: {\n            cwlModel() {\n                return WorkflowFactory.from(this.cwlState);\n            }\n        },\n\n        props: {\n            cwlUrl: {\n                type: String,\n                default: null,\n                note: `A URL to request for the initial CWL object from. Used as an alternative to\n                the \"cwl\" prop`\n            },\n            cwl: {\n                type: Object,\n                default: null,\n                note: `The JSON object representing the CWL workflow to render`\n            },\n\n            editingEnabled: {\n                type: Boolean,\n                default: false,\n                note: `True if the workflow is editable`\n            },\n            plugins: {\n                type: Array,\n                default: () => [],\n                note: `A list of CWL plugins to use in the CWL rendering`\n            }\n        },\n\n        /**\n         * If the cwlUrl prop was set, send a request for the CWL object, and set it to the internal\n         * state\n         */\n        mounted(){\n            if (this.cwlUrl){\n                fetch(this.cwlUrl, {\n                    headers: new Headers({\n                        'Accept': 'application/json'\n                    })\n                }).then(response => {\n                    return response.json();\n                }).then(json => {\n                    this.cwlState = json;\n                });\n            }\n        },\n\n        watch: {\n            /**\n             * If the cwl prop ever changes, update the internal workflow object to that\n             */\n            cwl() {\n                this.cwlState = this.cwl;\n            },\n\n            cwlState(){\n                this.workflow = new Workflow({\n                    editingEnabled: this.editingEnabled,\n                    model: this.cwlModel,\n                    svgRoot: this.$refs.svg,\n                    plugins: this.plugins\n                });\n\n                // Hack to force ArrangePlugin to rearrange\n                const arranger = this.workflow.getPlugin(SVGArrangePlugin);\n                if (arranger)\n                    arranger.arrange();\n\n                // Emit a selectionChanged event when selection changes\n                const selection = this.workflow.getPlugin(SelectionPlugin);\n                selection.registerOnSelectionChange(element => {\n                    if (element) {\n                        const id = element.getAttribute(\"data-connection-id\");\n                        const selected = this.workflow.model.findById(id);\n                        this.$emit('selection-changed', selected);\n                    }\n                });\n            }\n        }\n    }\n</script>\n\n<style lang=\"css\">\n    .cwl-workflow {\n        height: 500px;\n        position: relative;\n    }\n</style>"],"sourceRoot":""}]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = addStylesClient;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__listToStyles__ = __webpack_require__(75);
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = Object(__WEBPACK_IMPORTED_MODULE_0__listToStyles__["a" /* default */])(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 75 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = listToStyles;
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(77);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(26)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../../../css-loader/index.js!../../../../../../sass-loader/lib/loader.js!./theme.scss", function() {
			var newContent = require("!!../../../../../../css-loader/index.js!../../../../../../sass-loader/lib/loader.js!./theme.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, "svg.cwl-workflow {\n  fill: #303030;\n  color: white;\n  font-family: sans-serif;\n  padding: 0;\n  width: 100%;\n  display: block;\n  transform: translateZ(0); }\n  svg.cwl-workflow [tabindex]:active, svg.cwl-workflow [tabindex]:focus {\n    outline: none; }\n  svg.cwl-workflow .hidden {\n    display: none; }\n  svg.cwl-workflow .workflow {\n    user-select: none; }\n  svg.cwl-workflow .label {\n    fill: white;\n    stroke: #303030;\n    stroke-width: 4px;\n    text-anchor: middle;\n    paint-order: stroke;\n    stroke-linecap: butt;\n    stroke-linejoin: miter; }\n  svg.cwl-workflow .node-icon {\n    fill: #303030;\n    stroke: #303030;\n    stroke-width: 3px;\n    stroke-linecap: round; }\n  svg.cwl-workflow .node .outer {\n    fill: #303030;\n    stroke: #9a9a9a;\n    stroke-width: 2px; }\n  svg.cwl-workflow .node .inner {\n    stroke: 0; }\n  svg.cwl-workflow .node.input .inner {\n    fill: #c3c3c3; }\n  svg.cwl-workflow .node.output .inner {\n    fill: #c3c3c3; }\n  svg.cwl-workflow .node.step .inner {\n    fill: #11a7a7; }\n  svg.cwl-workflow .node .core .inner,\n  svg.cwl-workflow .node .core .node-icon {\n    pointer-events: none; }\n  svg.cwl-workflow .node:hover .port .label {\n    transition: all 0.1s;\n    opacity: 1; }\n  svg.cwl-workflow .node .port {\n    fill: #c3c3c3; }\n    svg.cwl-workflow .node .port:hover {\n      stroke: white;\n      stroke-width: 2px; }\n    svg.cwl-workflow .node .port.output-port .label {\n      text-anchor: start;\n      transform: translate(10px, 0); }\n    svg.cwl-workflow .node .port.input-port .label {\n      text-anchor: end;\n      transform: translate(-10px, 0); }\n    svg.cwl-workflow .node .port .label {\n      fill: white;\n      opacity: 0;\n      font-size: .9em;\n      user-select: none;\n      transition: all .1s;\n      pointer-events: none;\n      alignment-baseline: middle; }\n  svg.cwl-workflow .edge:hover .inner {\n    stroke: #11a7a7; }\n  svg.cwl-workflow .edge .inner, svg.cwl-workflow .edge .outer {\n    fill: none;\n    stroke-linecap: round; }\n  svg.cwl-workflow .edge .inner {\n    stroke-width: 2px;\n    stroke: #9a9a9a; }\n  svg.cwl-workflow .edge .outer {\n    stroke-width: 7px;\n    stroke: #303030; }\n  svg.cwl-workflow .unselectable {\n    user-select: none;\n    cursor: pointer; }\n", ""]);

// exports


/***/ }),
/* 78 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(26)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../css-loader/index.js!../../../../sass-loader/lib/loader.js!./theme.dark.scss", function() {
			var newContent = require("!!../../../../css-loader/index.js!../../../../sass-loader/lib/loader.js!./theme.dark.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".cwl-workflow.__plugin-port-drag .port.__port-drag-suggestion {\n  fill: #00fff0; }\n  .cwl-workflow.__plugin-port-drag .port.__port-drag-suggestion .label {\n    opacity: 1; }\n\n.cwl-workflow.__plugin-port-drag .port.__port-drag-snap {\n  stroke: white;\n  stroke-width: 2px; }\n\n.cwl-workflow.__plugin-port-drag .node.__port-drag-snap.__port-drag-snap-input .input-port .label,\n.cwl-workflow.__plugin-port-drag .node.__port-drag-snap.__port-drag-snap-output .output-port .label {\n  opacity: 1; }\n\n.cwl-workflow.__plugin-port-drag.__port-drag-dragging {\n  pointer-events: none; }\n\n.cwl-workflow.__plugin-port-drag .edge.__port-drag-dragging .inner {\n  stroke: #9a9a9a !important;\n  stroke-dasharray: 5; }\n\n.cwl-workflow.__plugin-port-drag .ghost {\n  stroke: #c3c3c3;\n  stroke-width: 2px;\n  stroke-dasharray: 5 3;\n  fill: #303030; }\n", ""]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(82);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(26)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../css-loader/index.js!../../../../sass-loader/lib/loader.js!./theme.dark.scss", function() {
			var newContent = require("!!../../../../css-loader/index.js!../../../../sass-loader/lib/loader.js!./theme.dark.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(16)(false);
// imports


// module
exports.push([module.i, ".cwl-workflow.__plugin-selection .node,\n.cwl-workflow.__plugin-selection .edge {\n  cursor: pointer; }\n\n.cwl-workflow.__plugin-selection.__selection-plugin-fade .node:not(.__selection-plugin-highlight) .outer {\n  stroke: #444343; }\n\n.cwl-workflow.__plugin-selection.__selection-plugin-fade .node:not(.__selection-plugin-highlight) .inner {\n  fill: #216b6b; }\n\n.cwl-workflow.__plugin-selection.__selection-plugin-fade .node:not(.__selection-plugin-highlight).input .inner {\n  fill: #838383; }\n\n.cwl-workflow.__plugin-selection.__selection-plugin-fade .node:not(.__selection-plugin-highlight).output .inner {\n  fill: #838383; }\n\n.cwl-workflow.__plugin-selection.__selection-plugin-fade .node:not(.__selection-plugin-highlight) .label {\n  fill: #7e7d7d; }\n\n.cwl-workflow.__plugin-selection.__selection-plugin-fade .node:not(.__selection-plugin-highlight) .port {\n  fill: #444343; }\n\n.cwl-workflow.__plugin-selection.__selection-plugin-fade .edge:not(.__selection-plugin-highlight) .inner {\n  stroke: #444343; }\n\n.cwl-workflow.__plugin-selection .port.__selection-plugin-highlight .label {\n  opacity: 1; }\n\n.cwl-workflow.__plugin-selection .__selection-plugin-selected.edge .inner {\n  stroke: #11a7a7; }\n\n.cwl-workflow.__plugin-selection .__selection-plugin-selected.node .outer {\n  stroke: #11a7a7; }\n", ""]);

// exports


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
// Workflow
__export(__webpack_require__(28));
__export(__webpack_require__(11));
__export(__webpack_require__(19));
__export(__webpack_require__(15));
__export(__webpack_require__(17));
__export(__webpack_require__(20));
__export(__webpack_require__(21));
// Command Line Tool
__export(__webpack_require__(30));
__export(__webpack_require__(22));
__export(__webpack_require__(10));
__export(__webpack_require__(32));
__export(__webpack_require__(13));
__export(__webpack_require__(35));
__export(__webpack_require__(23));
__export(__webpack_require__(9));
// Common
__export(__webpack_require__(4));
__export(__webpack_require__(34));
__export(__webpack_require__(12));
__export(__webpack_require__(14));
__export(__webpack_require__(36));
__export(__webpack_require__(37));
__export(__webpack_require__(38));


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowModel_1 = __webpack_require__(11);
var V1StepModel_1 = __webpack_require__(85);
var V1WorkflowInputParameterModel_1 = __webpack_require__(51);
var V1WorkflowOutputParameterModel_1 = __webpack_require__(47);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1WorkflowModel = /** @class */ (function (_super) {
    __extends(V1WorkflowModel, _super);
    function V1WorkflowModel(workflow, loc) {
        var _this = _super.call(this, loc || "document") || this;
        _this.cwlVersion = "v1.0";
        _this.steps = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.requirements = [];
        _this.customProps = {};
        if (workflow)
            _this.deserialize(workflow);
        _this.graph = _this.constructGraph();
        _this.validateGraph();
        return _this;
    }
    V1WorkflowModel.prototype.addStepFromProcess = function (proc) {
        var _this = this;
        var loc = this.loc + ".steps[" + this.steps.length + "]";
        var step = new V1StepModel_1.V1StepModel({
            in: [],
            out: [],
            run: proc
        }, loc, this.eventHub);
        step.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.steps.push(step);
        step.id = this.getNextAvailableId(step.id);
        this.addStepToGraph(step);
        this.eventHub.emit("step.create", step);
        return step;
    };
    /**
     * Adds Input, Output, or Step to workflow. Does not add them to the graph.
     */
    V1WorkflowModel.prototype.addEntry = function (entry, type) {
        var _this = this;
        entry.loc = this.loc + "." + type + "[" + this[type].length + "]";
        this[type].push(entry);
        entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return entry;
    };
    V1WorkflowModel.prototype.createInputFromPort = function (inPort, data) {
        if (data === void 0) { data = {}; }
        return _super.prototype._createInputFromPort.call(this, inPort, V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel, undefined, undefined, data);
    };
    V1WorkflowModel.prototype.createOutputFromPort = function (outPort, data) {
        if (data === void 0) { data = {}; }
        return _super.prototype._createOutputFromPort.call(this, outPort, V1WorkflowOutputParameterModel_1.V1WorkflowOutputParameterModel, undefined, undefined, data);
    };
    V1WorkflowModel.prototype.exposePort = function (inPort) {
        var port = _super.prototype._exposePort.call(this, inPort, V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel);
        port.customProps["sbg:exposed"] = true;
        port.isVisible = false;
    };
    V1WorkflowModel.prototype.getSourceConnectionId = function (source) {
        if (/[\/]+/.test(source)) {
            return constants_1.STEP_OUTPUT_CONNECTION_PREFIX + source;
        }
        else {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + source + "/" + source;
        }
    };
    /**
     * Checks if source contains stepId.
     * If it does, returns id of step.out, else null;
     * @param source
     * @param stepId
     */
    V1WorkflowModel.prototype.isSourceFromStep = function (source, stepId) {
        if (/[\/]+/.test(source)) {
            var split = source.split('/');
            if (split[0] === stepId)
                return split[1];
            return null;
        }
        return null;
    };
    V1WorkflowModel.prototype.addHint = function (hint) {
        return this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, undefined, true);
    };
    V1WorkflowModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    V1WorkflowModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    V1WorkflowModel.prototype._serialize = function (embed, retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.class = "Workflow";
        base.cwlVersion = "v1.0";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        if (this.description)
            base.doc = this.description;
        if (this.label)
            base.label = this.label;
        //@todo SERIALIZING HINTS AND REQUIREMENTS
        base.inputs = this.inputs.map(function (input) { return input.serialize(); });
        base.outputs = this.outputs.map(function (output) { return output.serialize(); });
        base.steps = this.steps.map(function (step) {
            if (embed) {
                return step.serializeEmbedded(retainSource);
            }
            else {
                return step.serialize();
            }
        });
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        // adding the proper requirements based on the features of the workflow
        var requirements = utils_1.ensureArray(this.customProps.requirements, "class", "value") || [];
        var allStepsHaveRun = true;
        var reqMap = {
            SubworkflowFeatureRequirement: false,
            ScatterFeatureRequirement: false,
            MultipleInputFeatureRequirement: false
        };
        // feature detection
        for (var i = 0; i < this.steps.length; i++) {
            var step = this.steps[i];
            if (step.run && step.run instanceof WorkflowModel_1.WorkflowModel) {
                reqMap.SubworkflowFeatureRequirement = true;
            }
            else if (!step.run) {
                allStepsHaveRun = false;
            }
            if (step.scatter.length) {
                reqMap.ScatterFeatureRequirement = true;
            }
            for (var j = 0; j < step.in.length; j++) {
                var inPort = step.in[j];
                if (inPort.source && inPort.source.length > 1) {
                    reqMap.MultipleInputFeatureRequirement = true;
                }
            }
        }
        var _loop_1 = function (req) {
            // only remove SubworkflowFeatureRequirement if we know the run type of all steps
            if (allStepsHaveRun || req !== "SubworkflowFeatureRequirement") {
                // remove each requirement first
                requirements = requirements.filter(function (r) { return r.class !== req; });
            }
            // re-add it only if it's needed
            if (reqMap[req]) {
                requirements.push({
                    class: req
                });
            }
        };
        // requirement setting
        for (var req in reqMap) {
            _loop_1(req);
        }
        base.requirements = requirements;
        delete this.customProps.requirements;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1WorkflowModel.prototype.deserialize = function (workflow) {
        var _this = this;
        var serializedKeys = [
            "class",
            "id",
            "inputs",
            "outputs",
            "steps",
            "cwlVersion",
            "doc",
            "label",
            "hints"
        ];
        //@todo DESERIALIZING HINTS AND REQUIREMENTS
        this.id = this.id = workflow["sbg:id"] && workflow["sbg:id"].split("/").length > 2 ?
            workflow["sbg:id"].split("/")[2] :
            utils_1.snakeCase(workflow.id);
        this.sbgId = workflow["sbg:id"];
        this.label = workflow.label;
        this.description = workflow.doc;
        utils_1.ensureArray(workflow.inputs, "id", "type").forEach(function (input, i) {
            _this.addEntry(new V1WorkflowInputParameterModel_1.V1WorkflowInputParameterModel(input, _this.loc + ".inputs[" + i + "]", _this.eventHub), "inputs");
        });
        utils_1.ensureArray(workflow.outputs, "id", "type").forEach(function (output, i) {
            _this.addEntry(new V1WorkflowOutputParameterModel_1.V1WorkflowOutputParameterModel(output, _this.loc + ".outputs[" + i + "]", _this.eventHub), "outputs");
        });
        utils_1.ensureArray(workflow.steps, "id").forEach(function (step, i) {
            if (step.run && typeof step.run !== "string") {
                step.run.cwlVersion = step.run.cwlVersion || "v1.0";
            }
            _this.addEntry(new V1StepModel_1.V1StepModel(step, _this.loc + ".steps[" + i + "]", _this.eventHub), "steps");
        });
        this.hints = utils_1.ensureArray(workflow.hints).map(function (hint, i) {
            return _this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        // populates object with all custom attributes not covered in model
        utils_1.spreadSelectProps(workflow, this.customProps, serializedKeys);
    };
    return V1WorkflowModel;
}(WorkflowModel_1.WorkflowModel));
exports.V1WorkflowModel = V1WorkflowModel;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolFactory_1 = __webpack_require__(30);
var ExpressionToolModel_1 = __webpack_require__(55);
var StepModel_1 = __webpack_require__(19);
var WorkflowFactory_1 = __webpack_require__(28);
var WorkflowModel_1 = __webpack_require__(11);
var utils_1 = __webpack_require__(0);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1WorkflowStepInputModel_1 = __webpack_require__(102);
var V1WorkflowStepOutputModel_1 = __webpack_require__(103);
var V1StepModel = /** @class */ (function (_super) {
    __extends(V1StepModel, _super);
    function V1StepModel(step, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this["in"] = [];
        _this.out = [];
        _this.hasMultipleScatter = true;
        _this.hasScatterMethod = true;
        if (step)
            _this.deserialize(step);
        return _this;
    }
    V1StepModel.prototype.addHint = function (hint) {
        return this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, undefined, true);
    };
    V1StepModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    V1StepModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    V1StepModel.prototype._serialize = function (embed, retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.id = this.id;
        base.in = this.in.map(function (i) { return i.serialize(); }).filter(function (i) {
            var keys = Object.keys(i);
            return !(keys.length === 1 && keys[0] === "id");
        });
        base.out = this.out.map(function (o) { return o.serialize(); });
        if (this.customProps["sbg:rdfId"] && !embed) {
            base.run = this.customProps["sbg:rdfId"];
        }
        else if (embed && this.run && this.run instanceof WorkflowModel_1.WorkflowModel) {
            base.run = this.run.serializeEmbedded();
        }
        else if (this.run && typeof this.run.serialize === "function") {
            base.run = this.run.serialize();
        }
        else {
            base.run = this.runPath;
        }
        // to preserve rdfId and rdfSource in the model
        var temp = __assign({}, this.customProps);
        if (!retainSource) {
            delete temp["sbg:rdfId"];
            delete temp["sbg:rdfSource"];
        }
        if (this._label)
            base.label = this.label;
        if (this.description)
            base.doc = this.description;
        if (this.scatter.length)
            base.scatter = this.scatter;
        if (this.scatterMethod)
            base.scatterMethod = this.scatterMethod;
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        return utils_1.spreadAllProps(base, temp);
    };
    V1StepModel.prototype.deserialize = function (step) {
        var _this = this;
        var serializedKeys = [
            "id",
            "doc",
            "label",
            "run",
            "scatter",
            "scatterMethod",
            "in",
            "out",
            "hints"
        ];
        this.id = step.id || "";
        this.description = step.doc;
        this._label = step.label;
        var hasRun = step.run && step.run.class;
        if (typeof step.run === "string") {
            console.warn("Expected to get json for step.run at " + this.loc + ", reading in and out from step");
            this.runPath = step.run;
        }
        else if (hasRun) {
            this.createRun(step.run);
        }
        this.in = utils_1.ensureArray(step.in, "id", "source")
            .map(function (i, index) { return new V1WorkflowStepInputModel_1.V1WorkflowStepInputModel(i, _this, _this.loc + ".in[" + index + "]"); });
        this.out = utils_1.ensureArray(step.out, "id")
            .map(function (o, index) { return new V1WorkflowStepOutputModel_1.V1WorkflowStepOutputModel(o, _this, _this.loc + ".out[" + index + "]"); });
        if (hasRun) {
            this.compareInPorts();
            this.compareOutPorts();
        }
        this.in.forEach(function (i) {
            // if in type is a required file/directory or required array of files/directories
            // include it by default
            if (i.type &&
                !i.type.isNullable &&
                (i.type.type === "File" ||
                    i.type.items === "File" ||
                    i.type.type === "Directory" ||
                    i.type.items === "Directory")) {
                i.isVisible = true;
            }
        });
        //@todo: generalize and parse requirements and hints
        this.requirements = utils_1.ensureArray(step.requirements, "class");
        this.hints = utils_1.ensureArray(step.hints).map(function (hint, i) {
            return _this.createReq(hint, V1ExpressionModel_1.V1ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        this.scatter = utils_1.ensureArray(step.scatter);
        this.scatterMethod = step.scatterMethod;
        utils_1.spreadSelectProps(step, this.customProps, serializedKeys);
    };
    V1StepModel.prototype.setRunProcess = function (process) {
        if (process && process.class) {
            this.createRun(process);
            this.compareInPorts(true);
            this.compareOutPorts(true);
            this.eventHub.emit("step.update", this);
        }
    };
    V1StepModel.prototype.createRun = function (process) {
        switch (process.class) {
            case "Workflow":
                this.run = WorkflowFactory_1.WorkflowFactory.from(process, this.loc + ".run");
                break;
            case "CommandLineTool":
                this.run = CommandLineToolFactory_1.CommandLineToolFactory.from(process, this.loc + ".run");
                break;
            case "ExpressionTool":
                this.run = new ExpressionToolModel_1.ExpressionToolModel(process);
                break;
            default:
                throw new Error("Unknown process class \"" + process.class + "\" at " + this.loc + ".step. Expected \"CommandLineTool\", \"Workflow\", or \"ExpressionTool\"");
        }
        // when the step is being updated, the ID will not change
        this.id = this.id || utils_1.snakeCase(this.run.id) || utils_1.snakeCase(this.loc);
        this._label = this._label || this.run.label || "";
    };
    V1StepModel.prototype.compareInPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runInputs = this.run.inputs;
        var inserted = [], removed, remaining;
        remaining = this.in;
        // only send events for creating, removing and updating ports if the run is being updated
        // when the workflow is initialized the first time, all this will happen automatically
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.in, this.run.inputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            // emit an event about the in port being removed so the workflow can remove it from the graph
            removed.forEach(function (r) { return _this.eventHub.emit("step.inPort.remove", r); });
            // fyi: inserted and remaining nodes are updated in the graph after the model is created because
            // 1. inserted array is of InputParamModel and doesn't have connectionId (can't be added to graph)
            // 2. remaining array doesn't have now info yet (changed type, fileTypes, etc)
        }
        // because type cannot be check on the level of the step
        // (step.in is just the id of the incoming port),
        // type and fileTypes from the app's inputs are spliced into the in ports.
        // Type validation is done for connections based on this information
        this.in = runInputs.map(function (input, index) {
            var match = remaining.find(function (port) { return input.id === port.id; });
            // serialize the match to create a new input from it
            var serialized = match ? match.serialize() : { id: input.id };
            // here will set source and default if they exist
            var model = new V1WorkflowStepInputModel_1.V1WorkflowStepInputModel(__assign({ type: input.type, fileTypes: input.fileTypes || [], doc: input.description, label: input.label, "sbg:toolDefaultValue": input.customProps["sbg:toolDefaultValue"], "sbg:category": input.customProps["sbg:category"], "sbg:altPrefix": input.customProps["sbg:altPrefix"] }, serialized // serialized match goes last so changed properties are overwritten
            ), _this, _this.loc + ".in[" + index + "]");
            model.setValidationCallback(function (err) { return _this.updateValidity(err); });
            // in case the port was inserted, signify to parent workflow that
            // it should be added to the graph
            if (inserted.find(function (i) { return i.id === model.id; })) {
                _this.eventHub.emit("step.inPort.create", model);
            }
            // in case there is a match and the step is being updated, signify to parent workflow
            // to update node info in graph
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", model);
            }
            // maintain the same visibility of the port
            // if the match was found, set to old visibility. If not, show if it's a required file
            model.isVisible = match ? (match.isVisible || utils_1.isFileType(model, true)) : utils_1.isFileType(model, true);
            var matchExistedAndWasChanged = (match ? match.isVisible !== model.isVisible : true);
            // notify the canvas that it should display this port but only if its visibility has changed
            if (model.isVisible && isUpdate && matchExistedAndWasChanged) {
                // wrapping this in a setTimeout so it will execute in the next tick
                // the svg relies on model.parentStep being correct, which can only happen
                // after this.in is set, so after all iterations
                setTimeout(function () {
                    _this.eventHub.emit("step.inPort.show", model);
                });
            }
            return model;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    V1StepModel.prototype.compareOutPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runOutputs = this.run.outputs;
        var inserted = [], removed, remaining;
        // only send events for creating, removing, and updating ports if the run is being updated
        // when the workflow is initialized the first time, all this will happen automatically
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.out, this.run.outputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            // emit an event about the in port being removed so the workflow can remove it from the graph
            removed.forEach(function (r) { return _this.eventHub.emit("step.outPort.remove", r); });
        }
        this.out = runOutputs.map(function (output, index) {
            var match = _this.out.find(function (port) { return port.id === output.id; });
            match = match ? match.serialize() : { id: output.id };
            var model = new V1WorkflowStepOutputModel_1.V1WorkflowStepOutputModel(__assign({ type: output.type, format: output.fileTypes || [], doc: output.description, label: output.label }, match), _this, _this.loc + ".out[" + index + "]");
            if (inserted.find(function (i) { return i.id === model.id; })) {
                _this.eventHub.emit("step.outPort.create", model);
            }
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", model);
            }
            return model;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    return V1StepModel;
}(StepModel_1.StepModel));
exports.V1StepModel = V1StepModel;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLinePart_1 = __webpack_require__(31);
var CommandLinePrepare_1 = __webpack_require__(48);
var utils_1 = __webpack_require__(0);
var JobHelper_1 = __webpack_require__(24);
exports.generateCommandLineParts = function (tool, jobInputs, runtime) {
    var flatInputs = CommandLinePrepare_1.CommandLinePrepare.flattenInputsAndArgs([].concat(tool.arguments).concat(tool.inputs));
    var job = utils_1.isEmpty(jobInputs) ? // if job has not been populated
     __assign({ inputs: JobHelper_1.JobHelper.getJobInputs(tool) }, { runtime: runtime }) : // supply dummy values
        tool.getContext(); // otherwise use job
    var flatJobInputs = CommandLinePrepare_1.CommandLinePrepare.flattenJob(job.inputs || job, {});
    var baseCmdPromise = tool.baseCommand.map(function (cmd, index) {
        var loc = tool.loc + ".baseCommand[" + index + "]";
        return CommandLinePrepare_1.CommandLinePrepare.prepare(cmd, flatJobInputs, tool.getContext(), loc, "baseCommand").then(function (suc) {
            if (suc instanceof CommandLinePart_1.CommandLinePart)
                return suc;
            return new CommandLinePart_1.CommandLinePart(suc, "baseCommand", loc);
        }, function (err) {
            return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
        });
    });
    var inputPromise = flatInputs.map(function (input) {
        return CommandLinePrepare_1.CommandLinePrepare.prepare(input, flatJobInputs, tool.getContext(input), input.loc);
    }).filter(function (i) { return i instanceof Promise; }).map(function (promise) {
        return promise.then(function (succ) { return succ; }, function (err) {
            return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type);
        });
    });
    var stdOutPromise = CommandLinePrepare_1.CommandLinePrepare.prepare(tool.stdout, flatJobInputs, tool.getContext(), tool.stdout.loc, "stdout");
    var stdInPromise = CommandLinePrepare_1.CommandLinePrepare.prepare(tool.stdin, flatJobInputs, tool.getContext(), tool.stdin.loc, "stdin");
    return Promise.all([].concat(baseCmdPromise, inputPromise, stdOutPromise, stdInPromise)).then(function (parts) {
        return parts.filter(function (part) { return part !== null; });
    });
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionModel_1 = __webpack_require__(9);
var CommandLinePart_1 = __webpack_require__(31);
var CommandLinePrepare_1 = __webpack_require__(48);
var TypeResolver_1 = __webpack_require__(29);
var V1CommandArgumentModel_1 = __webpack_require__(49);
var V1ExpressionModel_1 = __webpack_require__(5);
var CommandLineParsers = /** @class */ (function () {
    function CommandLineParsers() {
    }
    CommandLineParsers.primitive = function (input, job, value, context, cmdType, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        var prefix = input.inputBinding.prefix || "";
        var separator = input.inputBinding.separate !== false ? " " : "";
        var valueExists = value !== undefined && value !== null;
        var checkedValue = valueExists ? value : job[input.id];
        if (checkedValue !== null && checkedValue !== undefined) {
            if (checkedValue.hasOwnProperty("path")) {
                checkedValue = checkedValue.path;
            }
            else if (checkedValue.hasOwnProperty("location")) {
                checkedValue = checkedValue.location;
            }
        }
        if (input.inputBinding.valueFrom && input.inputBinding.valueFrom.serialize() !== undefined) {
            return input.inputBinding.valueFrom.evaluate(context)
                .then(function (res) {
                return new CommandLinePart_1.CommandLinePart(prefix + separator + res, cmdType, loc);
            }, function (err) {
                return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
            });
        }
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(prefix + separator + checkedValue, cmdType, loc));
        });
    };
    CommandLineParsers.string = function (input, job, value, context, type, loc) {
        return new Promise(function (res, rej) {
            res(new CommandLinePart_1.CommandLinePart(input, type, loc));
        });
    };
    CommandLineParsers.boolean = function (input, job, value, context, type, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        var result = "";
        var prefix = input.inputBinding.prefix || "";
        var itemsPrefix = (input.type.typeBinding && input.type.typeBinding.prefix)
            ? input.type.typeBinding.prefix : '';
        var separator = input.inputBinding.separate !== false ? " " : "";
        value = value || job[input.id];
        if (value) {
            prefix = input.type.items === "boolean" ? itemsPrefix : prefix;
            if (input.inputBinding.valueFrom && input.inputBinding.valueFrom.serialize() !== undefined) {
                return input.inputBinding.valueFrom.evaluate(context)
                    .then(function (res) {
                    return new CommandLinePart_1.CommandLinePart(prefix + separator + res, type, loc);
                }, function (err) {
                    return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
                });
            }
            result = prefix;
        }
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(result, type, loc));
        });
    };
    CommandLineParsers.record = function (input, job, value, context, cmdType, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        var prefix = input.inputBinding.prefix || "";
        var separator = input.inputBinding.separate !== false ? " " : "";
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(prefix + separator, cmdType, loc));
        });
    };
    CommandLineParsers.array = function (input, job, value, context, cmdType, loc) {
        CommandLineParsers.checkMismatch(input, job, value);
        value = value || job[input.id] || [];
        value = value.map(function (val) { return val && val.hasOwnProperty("path") ? val.path : val; });
        var prefix = input.inputBinding.prefix || "";
        var separator = input.inputBinding.separate !== false ? " " : "";
        var itemSeparator = typeof input.inputBinding.itemSeparator === "string" ?
            input.inputBinding.itemSeparator : " ";
        return Promise.all(value.map(function (val, index) {
            return Object.assign({}, input, {
                id: index,
                type: input.type.items,
                inputBinding: input.type.typeBinding || {}
            }, { items: undefined });
        }).map(function (item) {
            return CommandLinePrepare_1.CommandLinePrepare.prepare(item, value, value[item.id]);
        })).then(function (res) {
            return new CommandLinePart_1.CommandLinePart(prefix + separator + res.map(function (part) { return part.value; }).join(itemSeparator), cmdType, loc);
        });
    };
    CommandLineParsers.expression = function (expr, job, value, context, cmdType, loc) {
        return expr.evaluate(context).then(function (res) {
            return res === undefined ? "" : res;
        }, function (err) {
            return new CommandLinePart_1.CommandLinePart("<" + err.type + " at " + err.loc + ">", err.type, loc);
        });
    };
    CommandLineParsers.argument = function (arg, job, value, context, cmdType, loc) {
        if (arg.primitive) {
            if (arg instanceof V1CommandArgumentModel_1.V1CommandArgumentModel) {
                var expr = new V1ExpressionModel_1.V1ExpressionModel(arg.primitive, arg.loc);
                if (expr.isExpression) {
                    return CommandLineParsers.expression(expr, job, value, context, cmdType, loc).then(function (res) {
                        if (res instanceof CommandLinePart_1.CommandLinePart)
                            return res;
                        return new CommandLinePart_1.CommandLinePart(res, "argument", loc);
                    });
                }
            }
            return new Promise(function (res) {
                res(new CommandLinePart_1.CommandLinePart(arg.primitive, "argument", loc));
            });
        }
        var prefix = arg.prefix || "";
        var separator = arg.separate !== false ? " " : "";
        if (arg.valueFrom) {
            return CommandLinePrepare_1.CommandLinePrepare.prepare(arg.valueFrom, job, context, loc).then(function (res) {
                if (res instanceof CommandLinePart_1.CommandLinePart) {
                    return res;
                }
                return new CommandLinePart_1.CommandLinePart(prefix + separator + res, cmdType, loc);
            });
        }
        return new Promise(function (res) {
            res(new CommandLinePart_1.CommandLinePart(prefix, "input", loc));
        });
    };
    CommandLineParsers.stream = function (stream, job, value, context, cmdType, loc) {
        if (stream instanceof ExpressionModel_1.ExpressionModel) {
            return CommandLineParsers.expression(stream, job, value, context, cmdType, loc).then(function (res) {
                if (res instanceof CommandLinePart_1.CommandLinePart) {
                    return res;
                }
                else {
                    var prefix = res ? (cmdType === "stdin" ? "< " : "> ") : "";
                    return new CommandLinePart_1.CommandLinePart(prefix + res, cmdType, loc);
                }
            });
        }
    };
    CommandLineParsers.nullValue = function () {
        return new Promise(function (res) {
            res(null);
        });
    };
    CommandLineParsers.checkMismatch = function (input, job, value) {
        value = value || job[input.id];
        if (input === null || input.type === null) {
            return;
        }
        // If type declared does not match type of value, throw error
        if (!TypeResolver_1.TypeResolver.doesTypeMatch(input.type.type, value)) {
            // If there are items, only throw exception if items don't match either
            if (!input.type.items || !TypeResolver_1.TypeResolver.doesTypeMatch(input.type.items, value)) {
                // should be warning on input, not throw an exception
                // throw(`Mismatched value and type definition expected for ${input.id}. ${input.type.type}
                // or ${input.type.items}, but instead got ${typeof value}`);
            }
        }
    };
    return CommandLineParsers;
}());
exports.CommandLineParsers = CommandLineParsers;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolModel_1 = __webpack_require__(22);
var DockerRequirementModel_1 = __webpack_require__(34);
var RequirementBaseModel_1 = __webpack_require__(14);
var JobHelper_1 = __webpack_require__(24);
var utils_1 = __webpack_require__(0);
var V1CommandArgumentModel_1 = __webpack_require__(49);
var V1CommandInputParameterModel_1 = __webpack_require__(33);
var V1CommandOutputParameterModel_1 = __webpack_require__(52);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1InitialWorkDirRequirementModel_1 = __webpack_require__(89);
var V1InlineJavascriptRequirementModel_1 = __webpack_require__(91);
var V1ResourceRequirementModel_1 = __webpack_require__(92);
var CommandInputParameterModel_1 = __webpack_require__(10);
var CommandOutputParameterModel_1 = __webpack_require__(13);
var sbg_expression_lib_1 = __webpack_require__(93);
var ExpressionEvaluator_1 = __webpack_require__(18);
var V1CommandOutputBindingModel_1 = __webpack_require__(53);
var V1CommandLineToolModel = /** @class */ (function (_super) {
    __extends(V1CommandLineToolModel, _super);
    function V1CommandLineToolModel(json, loc) {
        var _this = _super.call(this, loc) || this;
        _this.cwlVersion = "v1.0";
        _this.inputs = [];
        _this.outputs = [];
        _this.baseCommand = [];
        _this.arguments = [];
        _this.hasStdErr = true;
        // Context for JavaScript execution
        _this.runtime = {};
        _this.initializeExprWatchers();
        if (json)
            _this.deserialize(json);
        _this.constructed = true;
        _this.validateAllExpressions();
        _this.initializeJobWatchers();
        _this.initializeInlineJSWatchers();
        return _this;
    }
    V1CommandLineToolModel.prototype.initializeInlineJSWatchers = function () {
        var _this = this;
        this.eventHub.on("output.metadata.inherit", function () {
            _this.inlineJavascriptRequirement.addExpressionLib(sbg_expression_lib_1.sbgHelperLibrary);
        });
    };
    // EXPRESSION CONTEXT //
    V1CommandLineToolModel.prototype.setRuntime = function (runtime) {
        if (runtime === void 0) { runtime = {}; }
        this.runtime.cores = runtime.cores !== undefined ? runtime.cores : this.runtime.cores;
        this.runtime.ram = runtime.ram !== undefined ? runtime.ram : this.runtime.ram;
    };
    V1CommandLineToolModel.prototype.resetJobDefaults = function () {
        this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        this.updateCommandLine();
    };
    V1CommandLineToolModel.prototype.getContext = function (port) {
        var context = {
            runtime: this.runtime,
            inputs: this.jobInputs
        };
        ExpressionEvaluator_1.ExpressionEvaluator.libraries = this.inlineJavascriptRequirement.expressionLib;
        if (port && port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
            if (port.isField) {
                var root = this.findFieldRoot(port, this.jobInputs);
                context.self = root ? root[port.id] : null;
            }
            else {
                context.self = this.jobInputs ? this.jobInputs[port.id] : null;
            }
        }
        if (port && port instanceof CommandOutputParameterModel_1.CommandOutputParameterModel) {
            context.self = JobHelper_1.JobHelper.generateMockJobData({
                type: {
                    type: "array",
                    items: "File"
                }
            });
        }
        return context;
    };
    ;
    V1CommandLineToolModel.prototype.addHint = function (hint) {
        var _this = this;
        var h = new RequirementBaseModel_1.RequirementBaseModel(hint, V1ExpressionModel_1.V1ExpressionModel, this.loc + ".hints[" + this.hints.length + "]", this.eventHub);
        h.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.hints.push(h);
        return h;
    };
    V1CommandLineToolModel.prototype.addOutput = function (output) {
        return _super.prototype._addOutput.call(this, V1CommandOutputParameterModel_1.V1CommandOutputParameterModel, output);
    };
    V1CommandLineToolModel.prototype.addInput = function (input) {
        return _super.prototype._addInput.call(this, V1CommandInputParameterModel_1.V1CommandInputParameterModel, input);
    };
    V1CommandLineToolModel.prototype.addArgument = function (arg) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.arguments, this.loc + ".arguments");
        var a = new V1CommandArgumentModel_1.V1CommandArgumentModel(arg, loc, this.eventHub);
        this.arguments.push(a);
        a.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.eventHub.emit("argument.create", arg);
        return a;
    };
    V1CommandLineToolModel.prototype.addBaseCommand = function (cmd) {
        this.baseCommand.push(cmd);
    };
    V1CommandLineToolModel.prototype.setRequirement = function (req, hint) {
        this.createReq(req, null, hint);
    };
    V1CommandLineToolModel.prototype.createReq = function (req, loc, hint) {
        var _this = this;
        if (hint === void 0) { hint = false; }
        var reqModel;
        var property = hint ? "hints" : "requirements";
        loc = loc || this.loc + "." + property + "[" + this[property].length + "]";
        switch (req.class) {
            case "DockerRequirement":
                this.docker = new DockerRequirementModel_1.DockerRequirementModel(req, this.docker ? this.docker.loc || loc : loc);
                this.docker.isHint = hint;
                this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "InitialWorkDirRequirement":
                loc = this.fileRequirement ? this.fileRequirement.loc || loc : loc;
                this.fileRequirement = new V1InitialWorkDirRequirementModel_1.V1InitialWorkDirRequirementModel(req, loc, this.eventHub);
                this.fileRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.fileRequirement.isHint = hint;
                return;
            case "ResourceRequirement":
                loc = this.resources ? this.resources.loc || loc : loc;
                this.resources = new V1ResourceRequirementModel_1.V1ResourceRequirementModel(req, loc, this.eventHub);
                this.resources.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.resources.isHint = hint;
                return;
            case "InlineJavascriptRequirement":
                loc = this.inlineJavascriptRequirement ? this.inlineJavascriptRequirement.loc || loc : loc;
                this.inlineJavascriptRequirement = new V1InlineJavascriptRequirementModel_1.V1InlineJavascriptRequirementModel(req, loc);
                this.inlineJavascriptRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.inlineJavascriptRequirement.isHint = hint;
                this.inlineJavascriptRequirement.wasPresent = true;
                return;
            default:
                reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, V1ExpressionModel_1.V1ExpressionModel, loc, this.eventHub);
                reqModel.isHint = hint;
        }
        if (reqModel) {
            this[property].push(reqModel);
            reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    V1CommandLineToolModel.prototype.updateStream = function (stream, type) {
        var _this = this;
        this[type] = stream;
        stream.loc = this.loc + "." + type;
        stream.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    // SERIALIZATION //
    V1CommandLineToolModel.prototype.deserialize = function (tool) {
        var _this = this;
        var serializedKeys = [
            "baseCommand",
            "stdout",
            "stdin",
            "stderr",
            "successCodes",
            "temporaryFailCodes",
            "permanentFailCodes",
            "inputs",
            "outputs",
            "id",
            "class",
            "cwlVersion",
            "doc",
            "label",
            "arguments",
            "hints",
            "requirements"
        ];
        this.id = this.id = tool["sbg:id"] && tool["sbg:id"].split("/").length > 2 ?
            tool["sbg:id"].split("/")[2] :
            utils_1.snakeCase(tool.id);
        this.description = tool.doc;
        this.label = tool.label;
        this.baseCommand = utils_1.charSeparatedToArray(tool.baseCommand, /\s+/);
        utils_1.ensureArray(tool.inputs, "id", "type").map(function (inp) { return _this.addInput(inp); });
        utils_1.ensureArray(tool.outputs, "id", "type").map(function (out) { return _this.addOutput(out); });
        this.arguments = utils_1.ensureArray(tool.arguments).map(function (arg) { return _this.addArgument(arg); });
        utils_1.ensureArray(tool.hints, "class", "value").map(function (h, i) { return _this.createReq(h, null, true); });
        utils_1.ensureArray(tool.requirements, "class", "value").map(function (r, i) { return _this.createReq(r); });
        var counter = this.requirements.length;
        // create DockerRequirement for manipulation
        if (!this.docker) {
            this.docker = new DockerRequirementModel_1.DockerRequirementModel({}, this.loc + ".requirements[" + ++counter + "]");
        }
        this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // create InitialWorkDirRequirement for manipulation
        if (!this.fileRequirement) {
            this.fileRequirement = new V1InitialWorkDirRequirementModel_1.V1InitialWorkDirRequirementModel({}, this.loc + ".requirements[" + ++counter + "]", this.eventHub);
        }
        this.fileRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // create ResourceRequirement for manipulation
        if (!this.resources) {
            this.resources = new V1ResourceRequirementModel_1.V1ResourceRequirementModel({}, this.loc + ".requirements[" + ++counter + "]", this.eventHub);
        }
        this.resources.setValidationCallback(function (err) { return _this.updateValidity(err); });
        // create InlineJavascriptRequirement for manipulation
        if (!this.inlineJavascriptRequirement) {
            this.inlineJavascriptRequirement = new V1InlineJavascriptRequirementModel_1.V1InlineJavascriptRequirementModel({}, this.loc + ".requirements[" + ++counter + "]");
        }
        this.stdin = new V1ExpressionModel_1.V1ExpressionModel(tool.stdin, this.loc + ".stdin", this.eventHub);
        this.stdin.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.stdout = new V1ExpressionModel_1.V1ExpressionModel(tool.stdout, this.loc + ".stdout", this.eventHub);
        this.stdout.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.stderr = new V1ExpressionModel_1.V1ExpressionModel(tool.stderr, this.loc + ".stderr", this.eventHub);
        this.stderr.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.runtime = { cores: 1, ram: 1000 };
        if (tool["sbg:job"]) {
            this.jobInputs = __assign({}, JobHelper_1.JobHelper.getNullJobInputs(this), tool["sbg:job"].inputs);
            this.runtime = __assign({}, this.runtime, tool["sbg:job"].runtime);
        }
        else {
            this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        }
        this.sbgId = tool["sbg:id"];
        this.successCodes = utils_1.ensureArray(tool.successCodes);
        this.temporaryFailCodes = utils_1.ensureArray(tool.temporaryFailCodes);
        this.permanentFailCodes = utils_1.ensureArray(tool.permanentFailCodes);
        utils_1.spreadSelectProps(tool, this.customProps, serializedKeys);
    };
    V1CommandLineToolModel.prototype.serialize = function () {
        var base = {};
        var hasShellQuote = false;
        var hasExpression = false;
        var shellWatcherDispose = this.eventHub.on("binding.shellQuote", function (data) {
            hasShellQuote = data;
        });
        var expressionWatcherDispose = this.eventHub.on("expression.serialize", function (data) {
            hasExpression = data;
        });
        base.class = "CommandLineTool";
        base.cwlVersion = "v1.0";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        base.baseCommand = this.baseCommand.filter(function (b) { return !!b; });
        base.inputs = this.inputs.map(function (i) { return i.serialize(); });
        base.outputs = this.outputs.map(function (o) { return o.serialize(); });
        if (this.description)
            base.doc = this.description;
        if (this.label)
            base.label = this.label;
        if (this.arguments.length) {
            base.arguments = this.arguments.map(function (a) { return a.serialize(); }).filter(function (a) { return !!a; });
        }
        // Add ShellCommandRequirement if any CommandLineBinding has shellQuote
        // remove requirement if no CommandLineBinding has shellQuote
        var shellReqIndex = this.requirements.findIndex((function (req) { return req.class === "ShellCommandRequirement"; }));
        if (hasShellQuote) {
            base.requirements = [];
            if (shellReqIndex === -1) {
                base.requirements.push({
                    "class": "ShellCommandRequirement"
                });
            }
        }
        else if (shellReqIndex > -1) {
            this.requirements.splice(shellReqIndex, 1);
        }
        shellWatcherDispose();
        // REQUIREMENTS && HINTS
        base.requirements = base.requirements || [];
        base.hints = [];
        if (this.requirements.length) {
            this.requirements.filter(function (r) { return !!r; }).forEach(function (r) { return base.requirements.push(r.serialize()); });
        }
        if (this.hints.length) {
            this.hints.forEach(function (h) { return base.hints.push(h.serialize()); });
        }
        if (this.resources.serialize()) {
            var dest = this.resources.isHint ? "hints" : "requirements";
            base[dest].push(this.resources.serialize());
        }
        if (this.docker.serialize()) {
            var dest = this.docker.isHint ? "hints" : "requirements";
            base[dest].push(this.docker.serialize());
        }
        if (this.fileRequirement.serialize()) {
            var dest = this.fileRequirement.isHint ? "hints" : "requirements";
            base[dest].push(this.fileRequirement.serialize());
        }
        if (!base.requirements.length)
            delete base.requirements;
        if (!base.hints.length)
            delete base.hints;
        if (this.stdin.serialize() !== undefined)
            base.stdin = this.stdin.serialize();
        if (this.stdout.serialize() !== undefined)
            base.stdout = this.stdout.serialize();
        if (this.stderr.serialize() !== undefined)
            base.stderr = this.stderr.serialize();
        if (this.successCodes.length) {
            base.successCodes = this.successCodes;
        }
        if (this.temporaryFailCodes.length) {
            base.temporaryFailCodes = this.temporaryFailCodes;
        }
        if (this.permanentFailCodes.length) {
            base.permanentFailCodes = this.permanentFailCodes;
        }
        // remove expression lib if it is no longer necessary (no output inherits metadata)
        var hasMetadataScript = false;
        for (var i = 0; i < base.outputs.length; i++) {
            var out = base.outputs[i];
            if (out.outputBinding && new RegExp(V1CommandOutputBindingModel_1.V1CommandOutputBindingModel.INHERIT_REGEX).test(out.outputBinding.outputEval)) {
                hasMetadataScript = true;
                break;
            }
        }
        if (!hasMetadataScript) {
            this.inlineJavascriptRequirement.removeExpressionLib(sbg_expression_lib_1.sbgHelperLibrary);
        }
        // for the InlineJavascriptRequirement,
        // serialize it if there are expression libs so they aren't lost
        if (this.inlineJavascriptRequirement.expressionLib.length > 0 || this.inlineJavascriptRequirement.wasPresent) {
            base.requirements = base.requirements || [];
            base.requirements.push(this.inlineJavascriptRequirement.serialize());
            // if there are no expression libs,
            // create requirement only if there are expressions
        }
        else if (hasExpression) {
            base.requirements = base.requirements || [];
            base.requirements.push({
                "class": "InlineJavascriptRequirement"
            });
        }
        expressionWatcherDispose();
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1CommandLineToolModel;
}(CommandLineToolModel_1.CommandLineToolModel));
exports.V1CommandLineToolModel = V1CommandLineToolModel;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateFileRequirementModel_1 = __webpack_require__(36);
var V1DirentModel_1 = __webpack_require__(90);
var utils_1 = __webpack_require__(0);
var ExpressionModel_1 = __webpack_require__(9);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1InitialWorkDirRequirementModel = /** @class */ (function (_super) {
    __extends(V1InitialWorkDirRequirementModel, _super);
    function V1InitialWorkDirRequirementModel(req, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this['class'] = "InitialWorkDirRequirement";
        _this.listing = [];
        if (req)
            _this.deserialize(req);
        return _this;
    }
    V1InitialWorkDirRequirementModel.prototype.addDirent = function (d) {
        var _this = this;
        var dirent = new V1DirentModel_1.V1DirentModel(d, this.loc + ".listing[" + this.listing.length + "]", this.eventHub);
        dirent.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.listing.push(dirent);
        return dirent;
    };
    V1InitialWorkDirRequirementModel.prototype.addExpression = function (e) {
        var _this = this;
        if (e === void 0) { e = ""; }
        var expression = new V1ExpressionModel_1.V1ExpressionModel(e, this.loc + ".listing[" + this.listing.length + "]", this.eventHub);
        expression.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.listing.push(expression);
        return expression;
    };
    V1InitialWorkDirRequirementModel.prototype.serialize = function () {
        var base = {
            'class': "InitialWorkDirRequirement",
            listing: this.listing.reduce(function (acc, item) {
                var serialized = item.serialize();
                if (serialized && ((item instanceof ExpressionModel_1.ExpressionModel) || serialized.entryname || serialized.entry)) {
                    acc.push(serialized);
                }
                return acc;
            }, [])
        };
        if (this.customProps.listing) {
            base.listing = base.listing.concat(this.customProps.listing);
            var c = __assign({}, this.customProps);
            delete c.listing;
            return utils_1.spreadAllProps(base, c);
        }
        // don't serialize if the only property that is being serialized is the class
        var keys = Object.keys(base);
        var customPropsKeys = Object.keys(this.customProps);
        if (keys.length === 2 &&
            keys[0] === "class" &&
            keys[1] === "listing" &&
            !base.listing.length &&
            customPropsKeys.length === 0) {
            return undefined;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1InitialWorkDirRequirementModel.prototype.deserialize = function (attr) {
        var _this = this;
        var listings = [];
        var customProperties = [];
        var serializedKeys = ["class"];
        if (Array.isArray(attr.listing)) {
            attr.listing.forEach(function (listing) {
                if (listing) {
                    if (listing.entryname || listing.entry) {
                        var any = _this.addDirent(listing);
                        listings.push(any);
                    }
                    else if (typeof listing === "string") {
                        listings.push(_this.addExpression(listing));
                    }
                    else {
                        customProperties.push(listing);
                    }
                }
            });
        }
        if (listings.length) {
            serializedKeys.push("listing");
        }
        if (customProperties.length) {
            this.customProps.listing = customProperties;
        }
        this.listing = listings;
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1InitialWorkDirRequirementModel;
}(CreateFileRequirementModel_1.CreateFileRequirementModel));
exports.V1InitialWorkDirRequirementModel = V1InitialWorkDirRequirementModel;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DirentModel_1 = __webpack_require__(37);
var V1ExpressionModel_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(0);
var V1DirentModel = /** @class */ (function (_super) {
    __extends(V1DirentModel, _super);
    function V1DirentModel(dirent, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (dirent)
            _this.deserialize(dirent);
        return _this;
    }
    V1DirentModel.prototype.serialize = function () {
        var base = {};
        if (this.entryName.serialize() !== undefined) {
            base.entryname = this.entryName.serialize();
        }
        if (this.entry.serialize() !== undefined) {
            base.entry = this.entry.serialize();
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1DirentModel.prototype.deserialize = function (attr) {
        var _this = this;
        this.entryName = new V1ExpressionModel_1.V1ExpressionModel(attr.entryname, this.loc + ".entryname", this.eventHub);
        this.entryName.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.entry = new V1ExpressionModel_1.V1ExpressionModel(attr.entry, this.loc + ".entry", this.eventHub);
        this.entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        utils_1.spreadSelectProps(attr, this.customProps, ["entry", "entryname"]);
    };
    return V1DirentModel;
}(DirentModel_1.DirentModel));
exports.V1DirentModel = V1DirentModel;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProcessRequirementModel_1 = __webpack_require__(12);
var utils_1 = __webpack_require__(0);
var V1InlineJavascriptRequirementModel = /** @class */ (function (_super) {
    __extends(V1InlineJavascriptRequirementModel, _super);
    function V1InlineJavascriptRequirementModel(req, loc) {
        var _this = _super.call(this, loc) || this;
        _this.class = "InlineJavascriptRequirement";
        _this.wasPresent = false;
        _this.expressionLib = [];
        if (req)
            _this.deserialize(req);
        return _this;
    }
    V1InlineJavascriptRequirementModel.prototype.addExpressionLib = function (lib) {
        if (this.expressionLib.indexOf(lib) === -1) {
            this.expressionLib.push(lib);
        }
    };
    V1InlineJavascriptRequirementModel.prototype.removeExpressionLib = function (lib) {
        var index = this.expressionLib.indexOf(lib);
        if (index !== -1) {
            this.expressionLib.splice(index, 1);
        }
    };
    V1InlineJavascriptRequirementModel.prototype.deserialize = function (attr) {
        this.expressionLib = attr.expressionLib || [];
        utils_1.spreadSelectProps(attr, this.customProps, ["expressionLib", "class"]);
    };
    V1InlineJavascriptRequirementModel.prototype.serialize = function () {
        var base = {};
        base.class = this.class;
        if (this.expressionLib.length)
            base.expressionLib = this.expressionLib;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return V1InlineJavascriptRequirementModel;
}(ProcessRequirementModel_1.ProcessRequirementModel));
exports.V1InlineJavascriptRequirementModel = V1InlineJavascriptRequirementModel;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceRequirementModel_1 = __webpack_require__(38);
var V1ExpressionModel_1 = __webpack_require__(5);
var utils_1 = __webpack_require__(0);
var V1ResourceRequirementModel = /** @class */ (function (_super) {
    __extends(V1ResourceRequirementModel, _super);
    function V1ResourceRequirementModel(req, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.class = "ResourceRequirement";
        _this.mem = new V1ExpressionModel_1.V1ExpressionModel("", _this.loc + ".ramMin", _this.eventHub);
        _this.mem.setValidationCallback(function (err) { return _this.updateValidity(err); });
        _this.cores = new V1ExpressionModel_1.V1ExpressionModel("", _this.loc + ".coresMin", _this.eventHub);
        _this.cores.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (req)
            _this.deserialize(req);
        return _this;
    }
    V1ResourceRequirementModel.prototype.serialize = function () {
        var mem = this.mem.serialize();
        var cores = this.cores.serialize();
        // in case neither mem nor cores have been defined, and no custom props were specified
        if (mem === undefined && cores === undefined && !Object.keys(this.customProps).length) {
            // indicate that there is nothing to serialize
            return undefined;
        }
        // mem and cores were cast to string during serialization, turn back to numbers if applicable
        mem = utils_1.returnNumIfNum(mem);
        cores = utils_1.returnNumIfNum(cores);
        var base = {
            "class": "ResourceRequirement"
        };
        if (mem !== undefined)
            base.ramMin = mem;
        if (cores !== undefined)
            base.coresMin = cores;
        return utils_1.spreadAllProps(base, this.customProps);
    };
    V1ResourceRequirementModel.prototype.deserialize = function (attr) {
        //@todo cover maximum values
        var _this = this;
        if (attr.ramMin !== undefined && attr.ramMin !== null) {
            this.mem = new V1ExpressionModel_1.V1ExpressionModel(attr.ramMin.toString(), this.loc + ".ramMin", this.eventHub);
            this.mem.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        if (attr.coresMin !== undefined && attr.coresMin !== null) {
            this.cores = new V1ExpressionModel_1.V1ExpressionModel(attr.coresMin.toString(), this.loc + ".coresMin", this.eventHub);
            this.cores.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        utils_1.spreadSelectProps(attr, this.customProps, ["class", "ramMin", "coresMin"]);
    };
    V1ResourceRequirementModel.prototype.validate = function (context) {
        return Promise.all([this.mem.validate(context), this.cores.validate(context)]);
    };
    return V1ResourceRequirementModel;
}(ResourceRequirementModel_1.ResourceRequirementModel));
exports.V1ResourceRequirementModel = V1ResourceRequirementModel;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sbgHelperLibrary = "\nvar setMetadata = function(file, metadata) {\n    if (!('metadata' in file))\n        file['metadata'] = metadata;\n    else {\n        for (var key in metadata) {\n            file['metadata'][key] = metadata[key];\n        }\n    }\n    return file\n};\n\nvar inheritMetadata = function(o1, o2) {\n    var commonMetadata = {};\n    if (!Array.isArray(o2)) {\n        o2 = [o2]\n    }\n    for (var i = 0; i < o2.length; i++) {\n        var example = o2[i]['metadata'];\n        for (var key in example) {\n            if (i == 0)\n                commonMetadata[key] = example[key];\n            else {\n                if (!(commonMetadata[key] == example[key])) {\n                    delete commonMetadata[key]\n                }\n            }\n        }\n    }\n    if (!Array.isArray(o1)) {\n        o1 = setMetadata(o1, commonMetadata)\n    } else {\n        for (var i = 0; i < o1.length; i++) {\n            o1[i] = setMetadata(o1[i], commonMetadata)\n        }\n    }\n    return o1;\n};";


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandLineToolModel_1 = __webpack_require__(22);
var DockerRequirementModel_1 = __webpack_require__(34);
var RequirementBaseModel_1 = __webpack_require__(14);
var JobHelper_1 = __webpack_require__(24);
var utils_1 = __webpack_require__(0);
var SBDraft2CommandArgumentModel_1 = __webpack_require__(95);
var SBDraft2CommandInputParameterModel_1 = __webpack_require__(96);
var SBDraft2CommandOutputParameterModel_1 = __webpack_require__(97);
var SBDraft2CreateFileRequirementModel_1 = __webpack_require__(99);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2ResourceRequirementModel_1 = __webpack_require__(101);
var CommandInputParameterModel_1 = __webpack_require__(10);
var CommandOutputParameterModel_1 = __webpack_require__(13);
var ErrorCode_1 = __webpack_require__(1);
var SBDraft2CommandLineToolModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandLineToolModel, _super);
    function SBDraft2CommandLineToolModel(json, loc) {
        var _this = _super.call(this, loc) || this;
        _this.cwlVersion = "sbg:draft-2";
        _this.baseCommand = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.requirements = [];
        _this.hints = [];
        _this.arguments = [];
        _this.hasStdErr = false;
        _this.initializeExprWatchers();
        if (json)
            _this.deserialize(json);
        _this.constructed = true;
        _this.validateAllExpressions();
        _this.initializeJobWatchers();
        return _this;
    }
    // EXPRESSION CONTEXT //
    SBDraft2CommandLineToolModel.prototype.setRuntime = function (runtime) {
        if (runtime === void 0) { runtime = {}; }
        this.runtime.cpu = runtime.cpu !== undefined ? runtime.cpu : this.runtime.cpu;
        this.runtime.mem = runtime.mem !== undefined ? runtime.mem : this.runtime.mem;
    };
    /**
     * Returns the context object for expressions in supplied port
     * @param port
     * @returns {{$job?: {inputs?: any; allocatedResources?: any}; $self?: any}}
     */
    SBDraft2CommandLineToolModel.prototype.getContext = function (port) {
        var context = {
            $job: {
                inputs: this.jobInputs,
                allocatedResources: this.runtime
            }
        };
        if (port && port instanceof CommandInputParameterModel_1.CommandInputParameterModel) {
            if (port.isField) {
                var root = this.findFieldRoot(port, this.jobInputs);
                context.$self = root ? root[port.id] : null;
            }
            else {
                context.$self = this.jobInputs ? this.jobInputs[port.id] : null;
            }
        }
        if (port && port instanceof CommandOutputParameterModel_1.CommandOutputParameterModel) {
            context.$self = JobHelper_1.JobHelper.generateMockJobData({ type: { type: "array", items: "File" } });
        }
        return context;
    };
    /**
     * Resets job value to dummy values
     */
    SBDraft2CommandLineToolModel.prototype.resetJobDefaults = function () {
        this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        this.updateCommandLine();
    };
    // CRUD HELPER METHODS //
    SBDraft2CommandLineToolModel.prototype.addHint = function (hint) {
        var _this = this;
        var h = new RequirementBaseModel_1.RequirementBaseModel(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, this.loc + ".hints[" + this.hints.length + "]", this.eventHub);
        h.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.hints.push(h);
        return h;
    };
    SBDraft2CommandLineToolModel.prototype.addBaseCommand = function (cmd) {
        var _this = this;
        if (cmd === void 0) { cmd = ""; }
        var loc = utils_1.incrementLastLoc(this.baseCommand, this.loc + ".baseCommand");
        var c = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(cmd, loc, this.eventHub);
        this.baseCommand.push(c);
        c.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return c;
    };
    SBDraft2CommandLineToolModel.prototype.updateBaseCommand = function (cmd) {
        var _this = this;
        this.baseCommand.forEach(function (c) { return c.clearIssue(ErrorCode_1.ErrorCode.EXPR_ALL); });
        this.baseCommand = [];
        cmd.forEach(function (c) { return _this.addBaseCommand(c.serialize()); });
    };
    SBDraft2CommandLineToolModel.prototype.addArgument = function (arg) {
        var _this = this;
        var loc = utils_1.incrementLastLoc(this.arguments, this.loc + ".arguments");
        var argument = new SBDraft2CommandArgumentModel_1.SBDraft2CommandArgumentModel(arg, loc, this.eventHub);
        this.arguments.push(argument);
        argument.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return argument;
    };
    SBDraft2CommandLineToolModel.prototype.addInput = function (input) {
        return _super.prototype._addInput.call(this, SBDraft2CommandInputParameterModel_1.SBDraft2CommandInputParameterModel, input);
    };
    SBDraft2CommandLineToolModel.prototype.addOutput = function (output) {
        return _super.prototype._addOutput.call(this, SBDraft2CommandOutputParameterModel_1.SBDraft2CommandOutputParameterModel, output);
    };
    SBDraft2CommandLineToolModel.prototype.setRequirement = function (req, hint) {
        var prop = hint ? "hints" : "requirements";
        this.createReq(req, this.loc + "." + prop + "[" + this[prop].length + "]", hint);
    };
    SBDraft2CommandLineToolModel.prototype.updateStream = function (stream, type) {
        var _this = this;
        this[type] = stream;
        stream.loc = this.loc + "." + type;
        stream.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    SBDraft2CommandLineToolModel.prototype.createReq = function (req, loc, hint) {
        var _this = this;
        var reqModel;
        var property = hint ? "hints" : "requirements";
        switch (req.class) {
            case "DockerRequirement":
                this.docker = new DockerRequirementModel_1.DockerRequirementModel(req, loc);
                this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "CreateFileRequirement":
                reqModel = new SBDraft2CreateFileRequirementModel_1.SBDraft2CreateFileRequirementModel(req, loc, this.eventHub);
                this.fileRequirement = reqModel;
                reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "sbg:CPURequirement":
                this.resources.cores = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(req.value, loc + ".value", this.eventHub);
                this.resources.cores.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            case "sbg:MemRequirement":
                this.resources.mem = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(req.value, loc + ".value", this.eventHub);
                this.resources.mem.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return;
            default:
                reqModel = new RequirementBaseModel_1.RequirementBaseModel(req, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, loc);
        }
        if (reqModel) {
            this[property].push(reqModel);
            reqModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    // SERIALIZATION //
    SBDraft2CommandLineToolModel.prototype.deserialize = function (tool) {
        var _this = this;
        var serializedAttr = [
            "baseCommand",
            "class",
            "id",
            "label",
            "description",
            "inputs",
            "hints",
            "requirements",
            "arguments",
            "outputs",
            "stdin",
            "stdout",
            "successCodes",
            "temporaryFailCodes",
            "permanentFailCodes",
            "cwlVersion"
        ];
        this.id = tool["sbg:id"] && tool["sbg:id"].split("/").length > 2 ?
            tool["sbg:id"].split("/")[2] :
            utils_1.snakeCase(tool.id);
        this.sbgId = tool["sbg:id"];
        this.label = tool.label;
        this.description = tool.description;
        utils_1.ensureArray(tool.inputs).forEach(function (i) { return _this.addInput(i); });
        utils_1.ensureArray(tool.outputs).forEach(function (o) { return _this.addOutput(o); });
        // Validate inputs and output uniqueness
        // this method sets an error on the second input/output with a repeat identifier
        utils_1.checkPortIdUniqueness(this.inputs.concat(this.outputs));
        if (tool.arguments) {
            tool.arguments.forEach(function (arg) {
                _this.addArgument(arg);
            });
        }
        this.resources = this.resources || new SBDraft2ResourceRequirementModel_1.SBDraft2ResourceRequirementModel(this.loc + ".hints[" + this.hints.length + "]", this.eventHub);
        this.resources.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
        if (tool.requirements) {
            tool.requirements.forEach(function (req, index) {
                _this.createReq(req, _this.loc + ".requirements[" + index + "]");
            });
        }
        if (tool.hints) {
            tool.hints.forEach(function (hint, index) {
                _this.createReq(hint, _this.loc + ".hints[" + index + "]", true);
            });
        }
        this.docker = this.docker || new DockerRequirementModel_1.DockerRequirementModel({}, this.loc + ".hints[" + this.hints.length + "]");
        this.docker.isHint = true;
        this.docker.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.fileRequirement = this.fileRequirement || new SBDraft2CreateFileRequirementModel_1.SBDraft2CreateFileRequirementModel({}, this.loc + ".requirements[" + this.requirements.length + "]", this.eventHub);
        this.fileRequirement.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.updateStream(new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(tool.stdin, this.loc + ".stdin", this.eventHub), "stdin");
        this.updateStream(new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(tool.stdout, this.loc + ".stdout", this.eventHub), "stdout");
        this.successCodes = utils_1.ensureArray(tool.successCodes);
        this.temporaryFailCodes = utils_1.ensureArray(tool.temporaryFailCodes);
        this.permanentFailCodes = utils_1.ensureArray(tool.permanentFailCodes);
        tool.baseCommand = tool.baseCommand || [''];
        // wrap to array
        tool.baseCommand = !Array.isArray(tool.baseCommand)
            ? [tool.baseCommand]
            : tool.baseCommand;
        this.baseCommand = [];
        tool.baseCommand.reduce(function (acc, curr) {
            if (typeof curr === "string") {
                if (typeof acc[acc.length - 1] === "string") {
                    acc[acc.length - 1] += " " + curr;
                    return acc;
                }
                else {
                    return acc.concat([curr]);
                }
            }
            else {
                return acc.concat([curr]);
            }
        }, []).forEach(function (cmd) {
            _this.addBaseCommand(cmd);
        });
        this.runtime = { mem: 1000, cpu: 1 };
        if (tool["sbg:job"]) {
            this.jobInputs = __assign({}, JobHelper_1.JobHelper.getNullJobInputs(this), tool["sbg:job"].inputs);
            this.runtime = __assign({}, this.runtime, tool["sbg:job"].allocatedResources);
        }
        else {
            this.jobInputs = JobHelper_1.JobHelper.getJobInputs(this);
        }
        // populates object with all custom attributes not covered in model
        utils_1.spreadSelectProps(tool, this.customProps, serializedAttr);
    };
    SBDraft2CommandLineToolModel.prototype.serialize = function () {
        var base = {};
        var hasExpression = false;
        base.cwlVersion = "sbg:draft-2";
        base.class = "CommandLineTool";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        var expressionWatcherDispose = this.eventHub.on("expression.serialize", function (data) {
            hasExpression = data;
        });
        // BASECOMMAND
        base.baseCommand = this.baseCommand
            .map(function (cmd) { return cmd.serialize(); })
            .filter(function (cmd) { return !!cmd; })
            .reduce(function (acc, curr) {
            if (typeof curr === "string") {
                //@todo implement not splitting quoted text
                return acc.concat(curr.split(/\s+/));
            }
            else {
                return acc.concat([curr]);
            }
        }, []);
        // INPUTS
        base.inputs = this.inputs
            .map(function (input) { return input.serialize(); });
        // OUTPUTS
        base.outputs = this.outputs
            .map(function (output) { return output.serialize(); });
        // REQUIREMENTS
        base.requirements = [];
        if (this.requirements.length) {
            base.requirements = this.requirements.map(function (req) { return req.serialize(); });
        }
        if (this.fileRequirement.serialize())
            base.requirements.push(this.fileRequirement.serialize());
        if (!base.requirements.length)
            delete base.requirements;
        // HINTS
        base.hints = [];
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        if (this.resources.cores.serialize() !== undefined) {
            base.hints.push({
                "class": "sbg:CPURequirement",
                value: utils_1.returnNumIfNum(this.resources.cores.serialize())
            });
        }
        if (this.resources.mem.serialize() !== undefined) {
            base.hints.push({
                "class": "sbg:MemRequirement",
                value: utils_1.returnNumIfNum(this.resources.mem.serialize())
            });
        }
        if (this.docker.serialize())
            base.hints.push(this.docker.serialize());
        if (!base.hints.length)
            delete base.hints;
        // ARGUMENTS
        if (this.arguments.length) {
            base.arguments = this.arguments.map(function (arg) { return arg.serialize(); }).filter(function (arg) { return !!arg; });
        }
        // STREAM
        if (this.stdin.serialize()) {
            base.stdin = this.stdin.serialize();
        }
        if (this.stdout.serialize()) {
            base.stdout = this.stdout.serialize();
        }
        if (this.successCodes.length) {
            base.successCodes = this.successCodes;
        }
        if (this.temporaryFailCodes.length) {
            base.temporaryFailCodes = this.temporaryFailCodes;
        }
        if (this.permanentFailCodes.length) {
            base.permanentFailCodes = this.permanentFailCodes;
        }
        var exprReqIndex = this.requirements.findIndex((function (req) { return req.class === "ExpressionEngineRequirement"; }));
        if (hasExpression) {
            base.requirements = base.requirements || [];
            if (exprReqIndex === -1) {
                base.requirements.push({
                    id: "#cwl-js-engine",
                    "class": "ExpressionEngineRequirement",
                    requirements: [
                        {
                            dockerPull: "rabix/js-engine",
                            "class": "DockerRequirement"
                        }
                    ]
                });
            }
        }
        expressionWatcherDispose();
        base = Object.assign({}, base, this.customProps);
        return base;
    };
    return SBDraft2CommandLineToolModel;
}(CommandLineToolModel_1.CommandLineToolModel));
exports.SBDraft2CommandLineToolModel = SBDraft2CommandLineToolModel;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandArgumentModel_1 = __webpack_require__(23);
var SBDraft2CommandLineBindingModel_1 = __webpack_require__(54);
var ErrorCode_1 = __webpack_require__(1);
var SBDraft2CommandArgumentModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandArgumentModel, _super);
    function SBDraft2CommandArgumentModel(arg, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasExprPrimitive = false;
        _this.hasShellQuote = false;
        _this.deserialize(arg || {});
        return _this;
    }
    SBDraft2CommandArgumentModel.prototype.updateBinding = function (binding) {
        this.hasBinding = true;
        this.primitive = undefined;
        this.binding.prefix = binding.prefix;
        this.binding.position = binding.position;
        this.binding.separate = binding.separate;
        this.binding.itemSeparator = binding.itemSeparator;
    };
    SBDraft2CommandArgumentModel.prototype.updatePrimitive = function (str) {
        this.hasBinding = false;
        this.binding = undefined;
        this.primitive = str;
    };
    SBDraft2CommandArgumentModel.prototype.toggleBinding = function (state) {
        var _this = this;
        if (state) {
            this.binding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel({}, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
            this.primitive = undefined;
        }
        else {
            this.primitive = "";
            this.binding.clearIssue(ErrorCode_1.ErrorCode.ALL);
            this.binding = undefined;
        }
        this.hasBinding = state;
    };
    Object.defineProperty(SBDraft2CommandArgumentModel.prototype, "arg", {
        get: function () {
            return this.primitive || this.binding;
        },
        set: function (value) {
            this.deserialize(value);
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2CommandArgumentModel.prototype.toString = function () {
        if (this.primitive)
            return this.primitive;
        if (this.binding) {
            return this.binding.valueFrom.toString();
        }
        return "";
    };
    SBDraft2CommandArgumentModel.prototype.serialize = function () {
        if (this.primitive) {
            return this.primitive;
        }
        else if (this.binding) {
            return this.binding.serialize();
        }
    };
    SBDraft2CommandArgumentModel.prototype.deserialize = function (attr) {
        var _this = this;
        if (typeof attr === "string") {
            this.hasBinding = false;
            this.primitive = attr;
        }
        else if (attr instanceof SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel) {
            this.hasBinding = true;
            this.binding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel(attr.serialize(), this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        else {
            this.hasBinding = true;
            this.binding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel(attr, this.loc, this.eventHub);
            this.binding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
    };
    return SBDraft2CommandArgumentModel;
}(CommandArgumentModel_1.CommandArgumentModel));
exports.SBDraft2CommandArgumentModel = SBDraft2CommandArgumentModel;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandInputParameterModel_1 = __webpack_require__(10);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var SBDraft2CommandLineBindingModel_1 = __webpack_require__(54);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2CommandInputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandInputParameterModel, _super);
    function SBDraft2CommandInputParameterModel(input, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        /** Binding for inclusion in command line */
        _this.inputBinding = null;
        _this.hasSecondaryFiles = false;
        _this.hasSecondaryFilesInRoot = false;
        _this.hasStageInput = true;
        _this.secondaryFiles = [];
        _this.deserialize(input);
        return _this;
    }
    SBDraft2CommandInputParameterModel.prototype.serialize = function () {
        var base = __assign({}, this.customProps);
        base.type = this.type.serialize();
        if (this.inputBinding) {
            base.inputBinding = this.inputBinding.serialize();
            if (this.type.type === "File" || this.type.items === "File" && this.secondaryFiles.length) {
                base.inputBinding.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
            }
        }
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        if (this.fileTypes.length)
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        if (this.isField) {
            base.name = this.id;
            return base;
        }
        else {
            base.id = this.id ? "#" + this.id : "";
            return base;
        }
    };
    SBDraft2CommandInputParameterModel.prototype.deserialize = function (input) {
        var _this = this;
        var serializedAttr = ["label", "description", "inputBinding", "type", "sbg:fileTypes"];
        input = input || {};
        this.isField = !!input.name; // record fields don't have ids
        this.isField ? serializedAttr.push("name") : serializedAttr.push("id");
        if (input.id && input.id.charAt(0) === "#") {
            this.id = input.id.substr(1);
        }
        else {
            this.id = input.id
                || input.name || ""; // for record fields
        }
        try {
            utils_1.validateID(this.id);
        }
        catch (ex) {
            this.setIssue((_a = {},
                _a[this.loc + ".id"] = {
                    type: "error",
                    code: ex.code,
                    message: ex.message
                },
                _a));
        }
        this.label = input.label;
        this.description = input.description;
        this.fileTypes = utils_1.commaSeparatedToArray(input["sbg:fileTypes"]);
        // if inputBinding isn't defined in input, it shouldn't exist as an object in model
        if (input.inputBinding !== undefined) {
            this.inputBinding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel(input.inputBinding, this.loc + ".inputBinding", this.eventHub);
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
            if (input.inputBinding.secondaryFiles) {
                this.secondaryFiles = utils_1.ensureArray(input.inputBinding.secondaryFiles).map(function (f) { return _this.addSecondaryFile(f); });
            }
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(input.type, SBDraft2CommandInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        this.attachFileTypeListeners();
        // populates object with all custom attributes not covered in model
        utils_1.spreadSelectProps(input, this.customProps, serializedAttr);
        var _a;
    };
    SBDraft2CommandInputParameterModel.prototype.updateInputBinding = function (binding) {
        var _this = this;
        if (binding instanceof SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel) {
            //@todo breaks here for serialize of undefined
            this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.inputBinding.cloneStatus(binding);
        }
    };
    SBDraft2CommandInputParameterModel.prototype.createInputBinding = function () {
        var _this = this;
        this.inputBinding = new SBDraft2CommandLineBindingModel_1.SBDraft2CommandLineBindingModel({}, this.loc + ".inputBinding", this.eventHub);
        this.inputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        return this.inputBinding;
    };
    SBDraft2CommandInputParameterModel.prototype.addSecondaryFile = function (file) {
        if (this.inputBinding) {
            return this._addSecondaryFile(file, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, this.inputBinding.loc);
        }
    };
    SBDraft2CommandInputParameterModel.prototype.updateSecondaryFiles = function (files) {
        if (this.inputBinding) {
            this._updateSecondaryFiles(files);
        }
    };
    SBDraft2CommandInputParameterModel.prototype.removeSecondaryFile = function (index) {
        if (this.inputBinding) {
            this._removeSecondaryFile(index);
        }
    };
    return SBDraft2CommandInputParameterModel;
}(CommandInputParameterModel_1.CommandInputParameterModel));
exports.SBDraft2CommandInputParameterModel = SBDraft2CommandInputParameterModel;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputParameterModel_1 = __webpack_require__(13);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var SBDraft2CommandOutputBindingModel_1 = __webpack_require__(98);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2CommandOutputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandOutputParameterModel, _super);
    function SBDraft2CommandOutputParameterModel(output, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.secondaryFiles = [];
        _this.hasSecondaryFiles = false;
        _this.hasSecondaryFilesInRoot = false;
        _this.deserialize(output || {});
        return _this;
    }
    SBDraft2CommandOutputParameterModel.prototype.updateSecondaryFiles = function (files) {
        if (this.outputBinding) {
            this._updateSecondaryFiles(files);
        }
    };
    SBDraft2CommandOutputParameterModel.prototype.addSecondaryFile = function (file) {
        if (this.outputBinding) {
            return this._addSecondaryFile(file, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, this.outputBinding.loc);
        }
    };
    SBDraft2CommandOutputParameterModel.prototype.removeSecondaryFile = function (index) {
        if (this.outputBinding) {
            this._removeSecondaryFile(index);
        }
    };
    SBDraft2CommandOutputParameterModel.prototype.updateOutputBinding = function (binding) {
        var _this = this;
        this.outputBinding = new SBDraft2CommandOutputBindingModel_1.SBDraft2CommandOutputBindingModel(binding instanceof SBDraft2CommandOutputBindingModel_1.SBDraft2CommandOutputBindingModel ?
            binding.serialize() : {}, this.loc + ".outputBinding", this.eventHub);
        this.outputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
    };
    SBDraft2CommandOutputParameterModel.prototype.serialize = function () {
        var base = {};
        base.type = this.type.serialize();
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        if (this.fileTypes && this.fileTypes.length) {
            base["sbg:fileTypes"] = (this.fileTypes || []).join(", ");
        }
        if (this.outputBinding) {
            base.outputBinding = this.outputBinding.serialize();
            // only type File or File[] can have secondaryFiles, loadContents and fileTypes
            if (!utils_1.isFileType(this)) {
                delete base.outputBinding.secondaryFiles;
                delete base.outputBinding.loadContents;
                delete base["sbg:fileTypes"];
            }
            if (utils_1.isFileType(this) && this.secondaryFiles.length > 0) {
                base.outputBinding.secondaryFiles = this.secondaryFiles.map(function (f) { return f.serialize(); }).filter(function (f) { return !!f; });
            }
            if (!Object.keys(base.outputBinding).length) {
                delete base.outputBinding;
            }
        }
        if (this.isField) {
            base.name = this.id || "";
        }
        else {
            base.id = this.id ? "#" + this.id : "";
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2CommandOutputParameterModel.prototype.deserialize = function (attr) {
        var _this = this;
        var serializedAttr = [
            "id",
            "label",
            "description",
            "outputBinding",
            "type",
            "sbg:fileTypes"
        ];
        this.isField = !!attr.name; // record fields don't have ids
        this.isField ? serializedAttr.push("name") : serializedAttr.push("id");
        if (attr.id && attr.id.charAt(0) === "#") {
            this.id = attr.id.substr(1);
        }
        else {
            this.id = attr.id
                || attr.name || ""; // for record fields
        }
        this.label = attr.label;
        this.description = attr.description;
        this.fileTypes = utils_1.commaSeparatedToArray(attr["sbg:fileTypes"]);
        this.outputBinding = new SBDraft2CommandOutputBindingModel_1.SBDraft2CommandOutputBindingModel(attr.outputBinding, this.loc + ".outputBinding", this.eventHub);
        this.outputBinding.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (attr.outputBinding && attr.outputBinding.secondaryFiles) {
            this.secondaryFiles = attr.outputBinding.secondaryFiles.map(function (f) { return _this.addSecondaryFile(f); });
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(attr.type, SBDraft2CommandOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) { return _this.updateValidity(err); });
        if (utils_1.isType(this, ["record", "enum"]) && !this.type.name) {
            this.type.name = this.id;
        }
        this.attachFileTypeListeners();
        utils_1.spreadSelectProps(attr, this.customProps, serializedAttr);
    };
    return SBDraft2CommandOutputParameterModel;
}(CommandOutputParameterModel_1.CommandOutputParameterModel));
exports.SBDraft2CommandOutputParameterModel = SBDraft2CommandOutputParameterModel;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CommandOutputBindingModel_1 = __webpack_require__(35);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var ErrorCode_1 = __webpack_require__(1);
var SBDraft2CommandOutputBindingModel = /** @class */ (function (_super) {
    __extends(SBDraft2CommandOutputBindingModel, _super);
    function SBDraft2CommandOutputBindingModel(binding, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.metadata = {};
        _this.hasSecondaryFiles = true;
        _this.hasMetadata = true;
        _this.hasInheritMetadata = true;
        _this.customProps = {};
        _this.deserialize(binding || {});
        return _this;
    }
    Object.defineProperty(SBDraft2CommandOutputBindingModel.prototype, "glob", {
        get: function () {
            return this._glob;
        },
        set: function (value) {
            this.setGlob(value, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2CommandOutputBindingModel.prototype, "outputEval", {
        get: function () {
            return this._outputEval;
        },
        set: function (value) {
            this.setOutputEval(value, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel);
            this.validateOutputEval();
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2CommandOutputBindingModel.prototype.validateOutputEval = function () {
        if (this._outputEval.type !== "expression" && this._outputEval.serialize() !== undefined) {
            this._outputEval.setIssue((_a = {},
                _a[this.loc + ".outputEval"] = {
                    type: "error",
                    message: "outputEval must be an expression",
                    code: ErrorCode_1.ErrorCode.OUTPUT_EVAL_EXPR
                },
                _a));
        }
        else {
            this._outputEval.clearIssue(ErrorCode_1.ErrorCode.OUTPUT_EVAL_EXPR);
        }
        var _a;
    };
    SBDraft2CommandOutputBindingModel.prototype.setInheritMetadataFrom = function (inputId) {
        this.inheritMetadataFrom = inputId;
    };
    SBDraft2CommandOutputBindingModel.prototype.serialize = function () {
        var _this = this;
        var base = {};
        if (this._glob && this._glob.serialize()) {
            base.glob = this._glob.serialize();
        }
        if (Object.keys(this.metadata).length) {
            base["sbg:metadata"] = {};
            Object.keys(this.metadata).filter(function (key) { return key; }).forEach(function (key) {
                var serialized = _this.metadata[key].serialize();
                if (serialized !== undefined) {
                    base["sbg:metadata"][key] = serialized;
                }
            });
        }
        if (this.inheritMetadataFrom) {
            base["sbg:inheritMetadataFrom"] = this.inheritMetadataFrom.substr(0) === "#" ? this.inheritMetadataFrom : "#" + this.inheritMetadataFrom;
        }
        if (this.loadContents)
            base.loadContents = true;
        if (this._outputEval.serialize()) {
            base.outputEval = this._outputEval.serialize();
        }
        return Object.assign({}, this.customProps, base);
    };
    SBDraft2CommandOutputBindingModel.prototype.deserialize = function (binding) {
        var _this = this;
        var serializedKeys = [
            "glob",
            "secondaryFiles",
            "outputEval",
            "loadContents",
            "sbg:metadata",
            "sbg:inheritMetadataFrom"
        ];
        if (binding && binding.constructor === Object) {
            if (!Array.isArray(binding.glob)) {
                this._glob = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(binding.glob, this.loc + '.glob', this.eventHub);
                this._glob.setValidationCallback(function (err) { return _this.updateValidity(err); });
                this.validateGlob();
            }
            else {
                console.warn("Not supporting glob which is string[] at " + this.loc + ". Glob cannot be edited via model");
                serializedKeys.splice(0, 1);
            }
            this.loadContents = binding.loadContents === true;
            this.inheritMetadataFrom = null;
            if (binding["sbg:inheritMetadataFrom"]) {
                this.inheritMetadataFrom = binding["sbg:inheritMetadataFrom"].charAt(0) === "#" ?
                    binding["sbg:inheritMetadataFrom"].substr(1) :
                    binding["sbg:inheritMetadataFrom"];
            }
            if (this.eventHub) {
                this.modelListeners.push(this.eventHub.on("input.change.id", function (data) {
                    if (data.oldId === _this.inheritMetadataFrom) {
                        _this.inheritMetadataFrom = data.newId;
                    }
                }));
            }
            this._outputEval = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(binding.outputEval, this.loc + ".outputEval", this.eventHub);
            this._outputEval.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.validateOutputEval();
            if (binding["sbg:metadata"] && binding["sbg:metadata"].constructor === Object) {
                Object.keys(binding["sbg:metadata"]).filter(function (key) { return key; }).forEach(function (key) {
                    var metadata = binding["sbg:metadata"][key];
                    if (metadata !== undefined) {
                        _this.metadata[key] = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(metadata, _this.loc + "[\"sbg:metadata\"]." + key, _this.eventHub);
                        _this.metadata[key].setValidationCallback(function (err) { return _this.updateValidity(err); });
                    }
                });
            }
            Object.keys(binding).forEach(function (key) {
                if (serializedKeys.indexOf(key) === -1) {
                    _this.customProps[key] = binding[key];
                }
            });
        }
    };
    return SBDraft2CommandOutputBindingModel;
}(CommandOutputBindingModel_1.CommandOutputBindingModel));
exports.SBDraft2CommandOutputBindingModel = SBDraft2CommandOutputBindingModel;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CreateFileRequirementModel_1 = __webpack_require__(36);
var SBDraft2FileDefModel_1 = __webpack_require__(100);
var SBDraft2CreateFileRequirementModel = /** @class */ (function (_super) {
    __extends(SBDraft2CreateFileRequirementModel, _super);
    function SBDraft2CreateFileRequirementModel(req, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this['class'] = "CreateFileRequirement";
        _this._listing = [];
        _this.deserialize(req);
        return _this;
    }
    Object.defineProperty(SBDraft2CreateFileRequirementModel.prototype, "listing", {
        get: function () {
            return this._listing;
        },
        set: function (value) {
            var _this = this;
            this._listing = [];
            value.forEach(function (def, index) {
                if (!(def instanceof SBDraft2FileDefModel_1.SBDraft2FileDefModel)) {
                    def = new SBDraft2FileDefModel_1.SBDraft2FileDefModel(def, _this.loc + ".fileDef[" + index + "]", _this.eventHub);
                }
                _this._listing.push(def);
                def.setValidationCallback(function (err) { return _this.updateValidity(err); });
            });
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2CreateFileRequirementModel.prototype.addDirent = function (def) {
        var _this = this;
        if (def instanceof SBDraft2FileDefModel_1.SBDraft2FileDefModel) {
            //@todo remove this if possible
            this._listing.push(def);
            def.setValidationCallback(function (err) { return _this.updateValidity(err); });
            def.loc = this.loc + ".fileDef[" + this._listing.length + "]";
            return def;
        }
        else {
            var d = new SBDraft2FileDefModel_1.SBDraft2FileDefModel(def, this.loc + ".fileDef[" + this._listing.length + "]", this.eventHub);
            d.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this._listing.push(d);
            return d;
        }
    };
    SBDraft2CreateFileRequirementModel.prototype.deserialize = function (req) {
        var _this = this;
        if (req.fileDef && Array.isArray(req.fileDef)) {
            this._listing = req.fileDef.map(function (def, index) {
                var d = new SBDraft2FileDefModel_1.SBDraft2FileDefModel(def, _this.loc + ".fileDef[" + index + "]", _this.eventHub);
                d.setValidationCallback(function (err) { return _this.updateValidity(err); });
                return d;
            });
        }
        Object.keys(req).forEach(function (key) {
            if (key !== "fileDef" && key !== "class")
                _this.customProps[key] = req[key];
        });
    };
    SBDraft2CreateFileRequirementModel.prototype.serialize = function () {
        var base = {};
        base.class = "CreateFileRequirement";
        base.fileDef = this._listing.map(function (def) { return def.serialize(); });
        // don't serialize if the only property that is being serialized is the class
        var customPropsKeys = Object.keys(this.customProps);
        if (base.fileDef.length === 0 && customPropsKeys.length === 0) {
            return undefined;
        }
        return Object.assign({}, base, this.customProps);
    };
    return SBDraft2CreateFileRequirementModel;
}(CreateFileRequirementModel_1.CreateFileRequirementModel));
exports.SBDraft2CreateFileRequirementModel = SBDraft2CreateFileRequirementModel;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var DirentModel_1 = __webpack_require__(37);
var utils_1 = __webpack_require__(0);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2FileDefModel = /** @class */ (function (_super) {
    __extends(SBDraft2FileDefModel, _super);
    function SBDraft2FileDefModel(fileDef, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.entryName = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", _this.loc + ".filename", _this.eventHub);
        _this.entry = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", _this.loc + ".fileContent", _this.eventHub);
        _this.customProps = {};
        _this.entryName.setValidationCallback(function (err) { return _this.updateValidity(err); });
        _this.entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        _this.deserialize(fileDef);
        return _this;
    }
    SBDraft2FileDefModel.prototype.serialize = function () {
        var base = {};
        if (this.entryName.serialize() !== undefined) {
            base.filename = this.entryName.serialize();
        }
        if (this.entry.serialize() !== undefined) {
            base.fileContent = this.entry.serialize();
        }
        return Object.assign({}, base, this.customProps);
    };
    SBDraft2FileDefModel.prototype.deserialize = function (attr) {
        var _this = this;
        if (attr) {
            this.entryName = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(attr.filename, this.loc + ".filename", this.eventHub);
            this.entryName.setValidationCallback(function (err) { return _this.updateValidity(err); });
            this.entry = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel(attr.fileContent, this.loc + ".fileContent", this.eventHub);
            this.entry.setValidationCallback(function (err) { return _this.updateValidity(err); });
        }
        utils_1.spreadSelectProps(attr, this.customProps, ["filename", "fileContent"]);
    };
    return SBDraft2FileDefModel;
}(DirentModel_1.DirentModel));
exports.SBDraft2FileDefModel = SBDraft2FileDefModel;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ResourceRequirementModel_1 = __webpack_require__(38);
var utils_1 = __webpack_require__(0);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2ResourceRequirementModel = /** @class */ (function (_super) {
    __extends(SBDraft2ResourceRequirementModel, _super);
    function SBDraft2ResourceRequirementModel(loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        var locBase = _this.loc.slice(0, -1);
        _this.mem = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", locBase + "].value", _this.eventHub);
        _this.mem.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
        _this.cores = new SBDraft2ExpressionModel_1.SBDraft2ExpressionModel("", utils_1.incrementString(locBase) + "].value", _this.eventHub);
        _this.cores.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
        return _this;
    }
    return SBDraft2ResourceRequirementModel;
}(ResourceRequirementModel_1.ResourceRequirementModel));
exports.SBDraft2ResourceRequirementModel = SBDraft2ResourceRequirementModel;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepInputModel_1 = __webpack_require__(20);
var utils_1 = __webpack_require__(0);
var ParameterTypeModel_1 = __webpack_require__(4);
var V1ExpressionModel_1 = __webpack_require__(5);
var V1WorkflowStepInputModel = /** @class */ (function (_super) {
    __extends(V1WorkflowStepInputModel, _super);
    function V1WorkflowStepInputModel(stepInput, step, loc) {
        var _this = _super.call(this, loc) || this;
        /**
         * Should in port be shown on the canvas
         */
        _this.isVisible = false;
        _this.parentStep = step;
        if (stepInput)
            _this.deserialize(stepInput);
        return _this;
    }
    V1WorkflowStepInputModel.prototype.serialize = function () {
        var base = {
            id: this.id
        };
        if (this.default !== undefined && this.default !== null)
            base.default = this.default;
        if (this.source.length)
            base.source = this.source.slice();
        if (this.valueFrom && this.valueFrom.serialize())
            base.valueFrom = this.valueFrom.serialize();
        base = utils_1.spreadAllProps(base, this.customProps);
        delete base["sbg:toolDefaultValue"];
        delete base["sbg:category"];
        delete base["sbg:altPrefix"];
        return base;
    };
    V1WorkflowStepInputModel.prototype.deserialize = function (attr) {
        var serializedKeys = [
            "id",
            "default",
            "source",
            "type",
            "doc",
            "label",
            "fileTypes"
        ];
        this.id = attr.id;
        this.default = attr.default;
        this.source = utils_1.ensureArray(attr.source);
        this.valueFrom = new V1ExpressionModel_1.V1ExpressionModel(attr.valueFrom, this.loc + ".valueFrom");
        // properties that will not be serialized on the step.in,
        // but are necessary for internal functions
        this.type = attr["type"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        this.type.hasDirectoryType = true;
        this.description = attr["doc"];
        this.label = attr["label"];
        this.fileTypes = attr["fileTypes"];
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return V1WorkflowStepInputModel;
}(WorkflowStepInputModel_1.WorkflowStepInputModel));
exports.V1WorkflowStepInputModel = V1WorkflowStepInputModel;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepOutputModel_1 = __webpack_require__(21);
var ParameterTypeModel_1 = __webpack_require__(4);
var V1WorkflowStepOutputModel = /** @class */ (function (_super) {
    __extends(V1WorkflowStepOutputModel, _super);
    function V1WorkflowStepOutputModel(output, step, loc) {
        var _this = _super.call(this, loc) || this;
        _this.parentStep = step;
        if (output)
            _this.deserialize(output);
        return _this;
    }
    V1WorkflowStepOutputModel.prototype.serialize = function () {
        return {
            id: this.id
        };
    };
    Object.defineProperty(V1WorkflowStepOutputModel.prototype, "sourceId", {
        get: function () {
            return this.parentStep.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    V1WorkflowStepOutputModel.prototype.deserialize = function (output) {
        this.id = output.id;
        // properties that will not be serialized on the step.out,
        // but are necessary for internal functions
        this.type = output["type"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        this.type.hasDirectoryType = true;
        this.description = output["doc"];
        this.label = output["label"];
        this.fileTypes = output["format"];
    };
    return V1WorkflowStepOutputModel;
}(WorkflowStepOutputModel_1.WorkflowStepOutputModel));
exports.V1WorkflowStepOutputModel = V1WorkflowStepOutputModel;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowModel_1 = __webpack_require__(11);
var SBDraft2StepModel_1 = __webpack_require__(105);
var SBDraft2WorkflowInputParameterModel_1 = __webpack_require__(108);
var SBDraft2WorkflowOutputParameterModel_1 = __webpack_require__(109);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2WorkflowModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowModel, _super);
    function SBDraft2WorkflowModel(workflow, loc) {
        if (loc === void 0) { loc = "document"; }
        var _this = _super.call(this, loc) || this;
        _this.cwlVersion = "sbg:draft-2";
        _this.steps = [];
        _this.inputs = [];
        _this.outputs = [];
        _this.hasBatch = true;
        if (workflow)
            _this.deserialize(workflow);
        _this.graph = _this.constructGraph();
        _this.validateGraph();
        _this.eventHub.on("io.change.id", function (node, oldId) {
            if (node instanceof WorkflowInputParameterModel_1.WorkflowInputParameterModel && _this.batchInput === oldId) {
                _this.batchInput = node.id;
            }
        });
        return _this;
    }
    SBDraft2WorkflowModel.prototype.createInputFromPort = function (inPort, data) {
        if (data === void 0) { data = {}; }
        var port = _super.prototype._createInputFromPort.call(this, inPort, SBDraft2WorkflowInputParameterModel_1.SBDraft2WorkflowInputParameterModel, undefined, undefined, data);
        port.customProps["sbg:includeInPorts"] = true;
        return port;
    };
    SBDraft2WorkflowModel.prototype.createOutputFromPort = function (outPort, data) {
        if (data === void 0) { data = {}; }
        return _super.prototype._createOutputFromPort.call(this, outPort, SBDraft2WorkflowOutputParameterModel_1.SBDraft2WorkflowOutputParameterModel, undefined, undefined, data);
    };
    SBDraft2WorkflowModel.prototype.exposePort = function (inPort) {
        _super.prototype._exposePort.call(this, inPort, SBDraft2WorkflowInputParameterModel_1.SBDraft2WorkflowInputParameterModel);
    };
    SBDraft2WorkflowModel.prototype.getSourceConnectionId = function (source) {
        // source comes from a step
        if (/[.]+/.test(source)) {
            var _a = source.split("."), step = _a[0], id = _a[1];
            step = step.charAt(0) === "#" ? step.substr(1) : step;
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + step + "/" + id;
        }
        else {
            var s = source.charAt(0) === "#" ? source.substr(1) : source;
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + s + "/" + s;
        }
    };
    /**
     * Checks if source contains stepId.
     * If it does, returns id of step.out, else null;
     * @param source
     * @param stepId
     */
    SBDraft2WorkflowModel.prototype.isSourceFromStep = function (source, stepId) {
        if (/[.]+/.test(source)) {
            var split = source.split('.');
            if (split[0] === "#" + stepId)
                return split[1];
            return null;
        }
        return null;
    };
    SBDraft2WorkflowModel.prototype.addStepFromProcess = function (proc) {
        var _this = this;
        var loc = this.loc + ".steps[" + this.steps.length + "]";
        var step = new SBDraft2StepModel_1.SBDraft2StepModel({
            inputs: [],
            outputs: [],
            run: proc
        }, loc, this.eventHub);
        step.setValidationCallback(function (err) { return _this.updateValidity(err); });
        this.steps.push(step);
        step.id = this.getNextAvailableId(step.id);
        this.addStepToGraph(step);
        this.eventHub.emit("step.create", step);
        return step;
    };
    SBDraft2WorkflowModel.prototype.setBatch = function (input, value) {
        if (!value || value === "none") {
            this.batchByValue = null;
            this.batchInput = null;
            return;
        }
        this.batchInput = input;
        this.batchByValue = value;
    };
    SBDraft2WorkflowModel.prototype.addHint = function (hint) {
        return this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, undefined, true);
    };
    SBDraft2WorkflowModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    SBDraft2WorkflowModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    SBDraft2WorkflowModel.prototype._serialize = function (embed, retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.class = "Workflow";
        base.cwlVersion = "sbg:draft-2";
        if (this.sbgId || this.id) {
            base.id = this.sbgId || this.id;
        }
        if (this.label)
            base.label = this.label;
        if (this.description)
            base.description = this.description;
        base.inputs = this.inputs.map(function (i) { return i.serialize(); });
        base.outputs = this.outputs.map(function (o) { return o.serialize(); });
        base.steps = this.steps.map(function (s) {
            if (embed) {
                return s.serializeEmbedded(retainSource);
            }
            else {
                return s.serialize();
            }
        });
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        if (this.batchInput)
            base["sbg:batchInput"] = "#" + this.batchInput;
        if (this.batchByValue) {
            var valueIsArray = Array.isArray(this.batchByValue);
            var batchBy = {
                type: valueIsArray ? "criteria" : "item"
            };
            if (valueIsArray) {
                batchBy.criteria = this.batchByValue;
            }
            base["sbg:batchBy"] = batchBy;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2WorkflowModel.prototype.deserialize = function (workflow) {
        var _this = this;
        var serializedKeys = [
            "id",
            "class",
            "cwlVersion",
            "steps",
            "inputs",
            "outputs",
            "label",
            "hints",
            "description",
            "sbg:batchBy",
            "sbg:batchInput"
        ];
        this.label = workflow.label;
        this.description = workflow.description;
        this.id = workflow["sbg:id"] && workflow["sbg:id"].split("/").length > 2 ?
            workflow["sbg:id"].split("/")[2] :
            utils_1.snakeCase(workflow.id);
        this.sbgId = workflow["sbg:id"];
        this.steps = utils_1.ensureArray(workflow.steps).map(function (step, index) {
            if (step.run && typeof step.run !== "string") {
                step.run.cwlVersion = step.run.cwlVersion || "sbg:draft-2";
            }
            var stepModel = new SBDraft2StepModel_1.SBDraft2StepModel(step, _this.loc + ".steps[" + index + "]", _this.eventHub);
            stepModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
            return stepModel;
        });
        this.inputs = utils_1.ensureArray(workflow.inputs).map(function (input, index) {
            var inputParameterModel = new SBDraft2WorkflowInputParameterModel_1.SBDraft2WorkflowInputParameterModel(input, _this.loc + ".inputs[" + index + "]", _this.eventHub);
            inputParameterModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
            return inputParameterModel;
        });
        this.outputs = utils_1.ensureArray(workflow.outputs).map(function (output, index) {
            var outputParameterModel = new SBDraft2WorkflowOutputParameterModel_1.SBDraft2WorkflowOutputParameterModel(output, _this.loc + ".outputs[" + index + "]", _this.eventHub);
            outputParameterModel.setValidationCallback(function (err) { return _this.updateValidity(err); });
            return outputParameterModel;
        });
        this.hints = utils_1.ensureArray(workflow.hints).map(function (hint, i) {
            return _this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        if (workflow["sbg:batchInput"]) {
            // Remove # in front of id
            if (workflow["sbg:batchInput"].indexOf("#") === 0) {
                this.batchInput = workflow["sbg:batchInput"].substring(1);
            }
            if (workflow["sbg:batchBy"].type === "item") {
                this.batchByValue = "item";
            }
            else {
                this.batchByValue = workflow["sbg:batchBy"].criteria;
            }
        }
        else {
            this.batchByValue = null;
            this.batchInput = null;
        }
        utils_1.spreadSelectProps(workflow, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowModel;
}(WorkflowModel_1.WorkflowModel));
exports.SBDraft2WorkflowModel = SBDraft2WorkflowModel;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var StepModel_1 = __webpack_require__(19);
var WorkflowModel_1 = __webpack_require__(11);
var ExpressionToolModel_1 = __webpack_require__(55);
var SBDraft2WorkflowStepInputModel_1 = __webpack_require__(106);
var SBDraft2WorkflowStepOutputModel_1 = __webpack_require__(107);
var utils_1 = __webpack_require__(0);
var WorkflowFactory_1 = __webpack_require__(28);
var CommandLineToolFactory_1 = __webpack_require__(30);
var SBDraft2ExpressionModel_1 = __webpack_require__(7);
var SBDraft2StepModel = /** @class */ (function (_super) {
    __extends(SBDraft2StepModel, _super);
    function SBDraft2StepModel(step, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        _this.hasMultipleScatter = false;
        _this.hasScatterMethod = false;
        if (step)
            _this.deserialize(step);
        return _this;
    }
    SBDraft2StepModel.prototype.setRunProcess = function (process) {
        if (process && process.class) {
            this.createRun(process);
            this.compareInPorts(true);
            this.compareOutPorts(true);
            this.eventHub.emit("step.update", this);
        }
    };
    SBDraft2StepModel.prototype.addHint = function (hint) {
        return this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, undefined, true);
    };
    SBDraft2StepModel.prototype.compareInPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runInputs = this.run.inputs;
        var inserted = [], removed, remaining;
        remaining = this.in;
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.in, this.run.inputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            removed.forEach(function (r) { return _this.eventHub.emit("step.inPort.remove", r); });
        }
        // because type cannot be check on the level of the step
        // (step.in is just the id of the incoming port),
        // type and fileTypes from the app's inputs are spliced into the in ports.
        // Type validation is done for connections based on this information
        this.in = runInputs.map(function (input, index) {
            var match = remaining.find(function (port) { return input.id === port.id; });
            var serialized = match ? match.serialize() : { id: _this.id + "." + input.id };
            // here will set source and default if they exist
            var newPort = new SBDraft2WorkflowStepInputModel_1.SBDraft2WorkflowStepInputModel(__assign({ type: input.type, fileTypes: input.fileTypes || [], description: input.description, label: input.label }, serialized, { "sbg:toolDefaultValue": input.customProps["sbg:toolDefaultValue"], "sbg:category": input.customProps["sbg:category"], "sbg:altPrefix": input.customProps["sbg:altPrefix"] }), _this, _this.loc + ".inputs[" + index + "]");
            newPort.setValidationCallback(function (err) { return _this.updateValidity(err); });
            // in case the port was inserted, signify to parent workflow that
            // it should be added to the graph
            if (inserted.find(function (i) { return i.id === newPort.id; })) {
                _this.eventHub.emit("step.inPort.create", newPort);
            }
            // in case there is a match and the step is being updated, signify to parent workflow
            // to update node info in graph
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", newPort);
            }
            // for some absurd reason, visibility is kept inside the run property, on the actual input
            newPort.isVisible = (match ? match.isVisible : !!input["customProps"]["sbg:includeInPorts"]) || utils_1.isFileType(input, true);
            var matchExistedAndWasChanged = (match ? match.isVisible !== newPort.isVisible : true);
            // notify the canvas that it should display this port but only if its visibility has changed
            if (newPort.isVisible && isUpdate && matchExistedAndWasChanged) {
                // wrapping this in a setTimeout so it will execute in the next tick
                // the svg relies on model.parentStep being correct, which can only happen
                // after this.in is set, so after all iterations
                setTimeout(function () {
                    _this.eventHub.emit("step.inPort.show", newPort);
                });
            }
            return newPort;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    SBDraft2StepModel.prototype.compareOutPorts = function (isUpdate) {
        var _this = this;
        if (isUpdate === void 0) { isUpdate = false; }
        var runOutputs = this.run.outputs;
        var inserted = [], removed, remaining;
        if (isUpdate) {
            _a = StepModel_1.StepModel.portDifference(this.out, this.run.outputs), inserted = _a[0], remaining = _a[1], removed = _a[2];
            removed.forEach(function (r) { return _this.eventHub.emit("step.outPort.remove", r); });
        }
        this.out = runOutputs.map(function (output, index) {
            var match = _this.out.find(function (port) { return output.id === port.id; });
            match = match ? match.serialize() : { id: _this.id + "." + output.id };
            var model = new SBDraft2WorkflowStepOutputModel_1.SBDraft2WorkflowStepOutputModel(__assign({ type: output.type, fileTypes: output.fileTypes, description: output.description, label: output.label }, match), _this, _this.loc + ".outputs[" + index + "]");
            if (inserted.find(function (i) { return i.id === model.id; })) {
                _this.eventHub.emit("step.outPort.create", model);
            }
            if (match && isUpdate) {
                _this.eventHub.emit("step.port.change", model);
            }
            return model;
        }).filter(function (port) { return port !== undefined; });
        var _a;
    };
    SBDraft2StepModel.prototype.createRun = function (process) {
        var _this = this;
        switch (process.class) {
            case "Workflow":
                this.run = WorkflowFactory_1.WorkflowFactory.from(process, this.loc + ".run");
                this.run.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
                break;
            case "CommandLineTool":
                this.run = CommandLineToolFactory_1.CommandLineToolFactory.from(process, this.loc + ".run");
                this.run.setValidationCallback(function (ev) { return _this.updateValidity(ev); });
                break;
            case "ExpressionTool":
                this.run = new ExpressionToolModel_1.ExpressionToolModel(process);
                break;
            default:
                throw new Error("Unknown process class \"" + process.class + "\" at " + this.loc + ".step. Expected \"CommandLineTool\", \"Workflow\", or \"ExpressionTool\"");
        }
        // when the step is being updated, the ID will not change
        this.id = this.id || utils_1.snakeCase(this.run.id) || utils_1.snakeCase(this.run.label) || utils_1.snakeCase(this.loc);
        this.id = this.id.charAt(0) === "#" ? this.id.substr(1) : this.id;
        this._label = this._label || this.run.label || "";
    };
    SBDraft2StepModel.prototype.serialize = function () {
        return this._serialize(false);
    };
    SBDraft2StepModel.prototype.serializeEmbedded = function (retainSource) {
        if (retainSource === void 0) { retainSource = false; }
        return this._serialize(true, retainSource);
    };
    SBDraft2StepModel.prototype._serialize = function (embed, retainSource) {
        var _this = this;
        if (retainSource === void 0) { retainSource = false; }
        var base = {};
        base.id = "#" + this.id;
        base.inputs = this.in.map(function (i) { return i.serialize(); }).filter(function (i) {
            var keys = Object.keys(i);
            return !(keys.length === 1 && keys[0] === "id");
        });
        base.outputs = this.out.map(function (o) { return o.serialize(); });
        if (this.customProps["sbg:rdfId"] && !embed) {
            base.run = this.customProps["sbg:rdfId"];
        }
        else if (embed && this.run && this.run instanceof WorkflowModel_1.WorkflowModel) {
            base.run = this.run.serializeEmbedded();
        }
        else if (this.run && typeof this.run.serialize === "function") {
            base.run = this.run.serialize();
        }
        else {
            base.run = this.runPath;
        }
        if (this.hints.length) {
            base.hints = this.hints.map(function (hint) { return hint.serialize(); });
        }
        var temp = __assign({}, this.customProps);
        if (!retainSource) {
            delete temp["sbg:rdfId"];
            delete temp["sbg:rdfSource"];
        }
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.description = this.description;
        if (this.scatter)
            base.scatter = this.in.filter(function (i) { return _this.scatter === i.id; })[0].destinationId;
        return utils_1.spreadAllProps(base, temp);
    };
    SBDraft2StepModel.prototype.deserialize = function (step) {
        var _this = this;
        var serializedKeys = [
            "id",
            "description",
            "label",
            "run",
            "scatter",
            "inputs",
            "outputs",
            "hints"
        ];
        this.id = step.id || "";
        this.description = step.description;
        this._label = step.label;
        this.scatter = step.scatter ? step.scatter.split(".")[1] : null;
        this.hints = utils_1.ensureArray(step.hints).map(function (hint, i) {
            return _this.createReq(hint, SBDraft2ExpressionModel_1.SBDraft2ExpressionModel, _this.loc + ".hints[" + i + "]", true);
        });
        if (step.run && typeof step.run === "string") {
            this.runPath = step.run;
        }
        else if (step.run && typeof step.run !== "string" && step.run.class) {
            this.createRun(step.run);
        }
        this.id = this.id.charAt(0) === "#" ? this.id.substr(1) : this.id;
        this.in = utils_1.ensureArray(step.inputs).map(function (step, index) {
            return new SBDraft2WorkflowStepInputModel_1.SBDraft2WorkflowStepInputModel(step, _this, _this.loc + ".inputs[" + index + "]");
        });
        this.out = utils_1.ensureArray(step.outputs).map(function (step, index) {
            return new SBDraft2WorkflowStepOutputModel_1.SBDraft2WorkflowStepOutputModel(step, _this, _this.loc + ".outputs[" + index + "]");
        });
        if (typeof step.run === "string") {
            console.warn("Expected to get json for step.run at " + this.loc + ", reading in and out from step");
        }
        else {
            this.compareInPorts();
            this.compareOutPorts();
        }
        this.in.forEach(function (i) {
            // if in type is a required file or required array of files, include it by default
            if (utils_1.isFileType(i, true)) {
                i.isVisible = true;
            }
        });
        utils_1.spreadSelectProps(step, this.customProps, serializedKeys);
    };
    return SBDraft2StepModel;
}(StepModel_1.StepModel));
exports.SBDraft2StepModel = SBDraft2StepModel;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepInputModel_1 = __webpack_require__(20);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var ParameterTypeModel_1 = __webpack_require__(4);
var SBDraft2WorkflowStepInputModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowStepInputModel, _super);
    function SBDraft2WorkflowStepInputModel(input, parentStep, loc) {
        var _this = _super.call(this, loc) || this;
        _this.parentStep = parentStep || {};
        if (input)
            _this.deserialize(input);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowStepInputModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepInputModel.prototype, "connectionId", {
        /**
         * The connectionId used within the graph, prefix with "in/" because it refers to the
         */
        get: function () {
            return "" + constants_1.STEP_INPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepInputModel.prototype, "destinationId", {
        /**
         * ID used for scatter
         * @returns {string}
         */
        get: function () {
            return "#" + this.parentStep.id + "." + this._id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowStepInputModel.prototype.serialize = function () {
        var base = {};
        base.id = "#" + this.parentStep.id + "." + this._id;
        if (this.source.length)
            base.source = this.source.slice();
        if (this.linkMerge)
            base.linkMerge = this.linkMerge;
        if (this.default !== undefined && this.default !== null)
            base.default = this.default;
        base = utils_1.spreadAllProps(base, this.customProps);
        delete base["sbg:toolDefaultValue"];
        delete base["sbg:category"];
        delete base["sbg:altPrefix"];
        return base;
    };
    SBDraft2WorkflowStepInputModel.prototype.deserialize = function (attr) {
        var serializedKeys = [
            "default",
            "id",
            "fileTypes",
            "type",
            "description",
            "label",
            "source"
        ];
        this.default = attr.default;
        this._id = attr.id.split(".")[1];
        // properties that will not be serialized on the step.in,
        // but are necessary for internal functions
        this.fileTypes = attr["fileTypes"];
        this.description = attr["description"];
        this.label = attr["label"];
        this.source = utils_1.ensureArray(attr.source);
        this.type = attr["type"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowStepInputModel;
}(WorkflowStepInputModel_1.WorkflowStepInputModel));
exports.SBDraft2WorkflowStepInputModel = SBDraft2WorkflowStepInputModel;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowStepOutputModel_1 = __webpack_require__(21);
var utils_1 = __webpack_require__(0);
var constants_1 = __webpack_require__(6);
var ParameterTypeModel_1 = __webpack_require__(4);
var SBDraft2WorkflowStepOutputModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowStepOutputModel, _super);
    function SBDraft2WorkflowStepOutputModel(output, parentStep, loc) {
        var _this = _super.call(this, loc) || this;
        _this.parentStep = parentStep || {};
        if (output)
            _this.deserialize(output);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowStepOutputModel.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepOutputModel.prototype, "connectionId", {
        /**
         * ID used in graph
         */
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.parentStep.id + "/" + this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowStepOutputModel.prototype, "sourceId", {
        /**
         * ID used for creating connections
         */
        get: function () {
            return "#" + this.parentStep.id + "." + this._id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowStepOutputModel.prototype.serialize = function () {
        return {
            id: "#" + this.parentStep.id + "." + this._id
        };
    };
    SBDraft2WorkflowStepOutputModel.prototype.deserialize = function (attr) {
        var serializedKeys = ["id", "sbg:fileTypes"];
        this._id = attr.id.split(".")[1];
        // properties that will not be serialized on the step.out,
        // but are necessary for internal functions
        this.fileTypes = attr["fileTypes"];
        this.type = attr["type"];
        this.description = attr["description"];
        this.label = attr["label"];
        if (!this.type)
            this.type = new ParameterTypeModel_1.ParameterTypeModel(null);
        utils_1.spreadSelectProps(attr, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowStepOutputModel;
}(WorkflowStepOutputModel_1.WorkflowStepOutputModel));
exports.SBDraft2WorkflowStepOutputModel = SBDraft2WorkflowStepOutputModel;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowInputParameterModel_1 = __webpack_require__(15);
var ParameterTypeModel_1 = __webpack_require__(4);
var constants_1 = __webpack_require__(6);
var utils_1 = __webpack_require__(0);
var SBDraft2WorkflowInputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowInputParameterModel, _super);
    function SBDraft2WorkflowInputParameterModel(input, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (input)
            _this.deserialize(input);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowInputParameterModel.prototype, "connectionId", {
        get: function () {
            return "" + constants_1.STEP_OUTPUT_CONNECTION_PREFIX + this.id + "/" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SBDraft2WorkflowInputParameterModel.prototype, "sourceId", {
        get: function () {
            return "#" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowInputParameterModel.prototype.deserialize = function (input) {
        var _this = this;
        var serializedKeys = ["name", "id", "type", "label", "description", "sbg:fileTypes"];
        this.isField = !!input.name;
        if (input.id && input.id.charAt(0) === "#") {
            this.id = input.id.substr(1);
        }
        else {
            this.id = input.id
                || input.name || ""; // for record fields
        }
        this.type = new ParameterTypeModel_1.ParameterTypeModel(input.type, SBDraft2WorkflowInputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this.type.setValidationCallback(function (err) {
            _this.updateValidity(err);
        });
        this.fileTypes = utils_1.commaSeparatedToArray(input["sbg:fileTypes"]);
        this._label = input.label;
        this.description = input.description;
        // only show inputs which are type File or File[], or should be explicitly shown
        this.isVisible = this.type.type === "File" || this.type.items === "File" || !!input["sbg:includeInPorts"];
        utils_1.spreadSelectProps(input, this.customProps, serializedKeys);
    };
    SBDraft2WorkflowInputParameterModel.prototype.serialize = function () {
        var base = {};
        base.type = this.type.serialize();
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.description = this.description;
        if (this.fileTypes.length)
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        if (this.isField) {
            base.name = this.id;
        }
        else {
            base.id = "#" + this.id;
        }
        return utils_1.spreadAllProps(base, this.customProps);
    };
    return SBDraft2WorkflowInputParameterModel;
}(WorkflowInputParameterModel_1.WorkflowInputParameterModel));
exports.SBDraft2WorkflowInputParameterModel = SBDraft2WorkflowInputParameterModel;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WorkflowOutputParameterModel_1 = __webpack_require__(17);
var ParameterTypeModel_1 = __webpack_require__(4);
var utils_1 = __webpack_require__(0);
var SBDraft2WorkflowOutputParameterModel = /** @class */ (function (_super) {
    __extends(SBDraft2WorkflowOutputParameterModel, _super);
    function SBDraft2WorkflowOutputParameterModel(attr, loc, eventHub) {
        var _this = _super.call(this, loc, eventHub) || this;
        if (attr)
            _this.deserialize(attr);
        return _this;
    }
    Object.defineProperty(SBDraft2WorkflowOutputParameterModel.prototype, "destinationId", {
        get: function () {
            return "#" + this.id;
        },
        enumerable: true,
        configurable: true
    });
    SBDraft2WorkflowOutputParameterModel.prototype.serialize = function () {
        var base = {};
        base.id = "#" + this.id;
        if (this._label)
            base.label = this._label;
        if (this.description)
            base.description = this.description;
        base.source = utils_1.ensureArray(this.source);
        if (this.type)
            base.type = this.type.serialize();
        if (this.fileTypes.length)
            base["sbg:fileTypes"] = this.fileTypes.join(", ");
        return utils_1.spreadAllProps(base, this.customProps);
    };
    SBDraft2WorkflowOutputParameterModel.prototype.deserialize = function (output) {
        var serializedKeys = ["id", "type", "source", "label", "description", "sbg:fileTypes"];
        if (output.id && output.id.charAt(0) === "#") {
            this.id = output.id.substr(1);
        }
        else {
            this.id = output.id || ""; // for record fields
        }
        this.source = utils_1.ensureArray(output.source);
        this.type = new ParameterTypeModel_1.ParameterTypeModel(output.type, SBDraft2WorkflowOutputParameterModel, this.id + "_field", this.loc + ".type", this.eventHub);
        this._label = output.label;
        this.description = output.description;
        this.fileTypes = utils_1.commaSeparatedToArray(output["sbg:fileTypes"]);
        utils_1.spreadSelectProps(output, this.customProps, serializedKeys);
    };
    return SBDraft2WorkflowOutputParameterModel;
}(WorkflowOutputParameterModel_1.WorkflowOutputParameterModel));
exports.SBDraft2WorkflowOutputParameterModel = SBDraft2WorkflowOutputParameterModel;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(18));
__export(__webpack_require__(31));
__export(__webpack_require__(111));
__export(__webpack_require__(46));
__export(__webpack_require__(29));
__export(__webpack_require__(6));
__export(__webpack_require__(0));


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var vm = __webpack_require__(112);
var JSExecutor = /** @class */ (function () {
    function JSExecutor() {
    }
    JSExecutor.evaluate = function (expr, context) {
        return new Promise(function (res, rej) {
            try {
                var result = vm.runInNewContext(expr, context || {}, { timeout: 1000 });
                res(result);
            }
            catch (ex) {
                rej(ex);
            }
        });
    };
    return JSExecutor;
}());
exports.JSExecutor = JSExecutor;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var indexOf = __webpack_require__(113);

var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    forEach(Object_keys(ctx), function (key) {
        context[key] = ctx[key];
    });

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};


/***/ }),
/* 113 */
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DomEvents = /** @class */ (function () {
    function DomEvents(root) {
        this.root = root;
        this.handlers = new Map();
    }
    DomEvents.prototype.on = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var event = args.shift();
        var selector = typeof args[0] === "string" ? args.shift() : undefined;
        var handler = typeof args[0] === "function" ? args.shift() : function () {
        };
        var root = args.shift();
        var eventHolder = root || this.root;
        if (!this.handlers.has(eventHolder)) {
            this.handlers.set(eventHolder, {});
        }
        if (!this.handlers.get(eventHolder)[event]) {
            this.handlers.get(eventHolder)[event] = [];
        }
        var evListener = function (ev) {
            var target;
            if (selector) {
                var selected = Array.from(_this.root.querySelectorAll(selector));
                target = ev.target;
                while (target) {
                    if (selected.find(function (el) { return el === target; })) {
                        break;
                    }
                    target = target.parentNode;
                }
                if (!target) {
                    return;
                }
            }
            var handlerOutput = handler(ev, target || ev.target, _this.root);
            if (handlerOutput === false) {
                return false;
            }
            return false;
        };
        eventHolder.addEventListener(event, evListener);
        this.handlers.get(eventHolder)[event].push(evListener);
        return function off() {
            eventHolder.removeEventListener(event, evListener);
        };
    };
    DomEvents.prototype.keyup = function () {
    };
    DomEvents.prototype.adaptedDrag = function (selector, move, start, end) {
        var _this = this;
        var dragging = false;
        var lastMove;
        var draggedEl;
        var moveEventCount = 0;
        var mouseDownEv;
        var threshold = 3;
        var mouseOverListeners;
        var onMouseDown = function (ev, el) {
            dragging = true;
            lastMove = ev;
            draggedEl = el;
            mouseDownEv = ev;
            ev.preventDefault();
            mouseOverListeners = _this.detachHandlers("mouseover");
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener("mouseup", upHandler);
            return false;
        };
        var off = this.on("mousedown", selector, onMouseDown);
        var moveHandler = function (ev) {
            if (!dragging) {
                return;
            }
            var dx = ev.screenX - lastMove.screenX;
            var dy = ev.screenY - lastMove.screenY;
            moveEventCount++;
            if (moveEventCount === threshold && typeof start === "function") {
                start(mouseDownEv, draggedEl, _this.root);
            }
            if (moveEventCount >= threshold && typeof move === "function") {
                move(dx, dy, ev, draggedEl, _this.root);
            }
        };
        var upHandler = function (ev) {
            if (moveEventCount >= threshold) {
                if (dragging) {
                    if (typeof end === "function") {
                        end(ev, draggedEl, _this.root);
                    }
                }
                var parentNode_1 = draggedEl.parentNode;
                var clickCancellation_1 = function (ev) {
                    ev.stopPropagation();
                    parentNode_1.removeEventListener("click", clickCancellation_1, true);
                };
                parentNode_1.addEventListener("click", clickCancellation_1, true);
            }
            dragging = false;
            draggedEl = undefined;
            lastMove = undefined;
            moveEventCount = 0;
            document.removeEventListener("mouseup", upHandler);
            document.removeEventListener("mousemove", moveHandler);
            for (var i in mouseOverListeners) {
                _this.root.addEventListener("mouseover", mouseOverListeners[i]);
                _this.handlers.get(_this.root)["mouseover"] = [];
                _this.handlers.get(_this.root)["mouseover"].push(mouseOverListeners[i]);
            }
        };
        return off;
    };
    DomEvents.prototype.drag = function (selector, move, start, end) {
        var _this = this;
        var dragging = false;
        var lastMove;
        var draggedEl;
        var moveEventCount = 0;
        var mouseDownEv;
        var threshold = 3;
        var mouseOverListeners;
        var onMouseDown = function (ev, el, root) {
            dragging = true;
            lastMove = ev;
            draggedEl = el;
            mouseDownEv = ev;
            ev.preventDefault();
            mouseOverListeners = _this.detachHandlers("mouseover");
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener("mouseup", upHandler);
            return false;
        };
        var off = this.on("mousedown", selector, onMouseDown);
        var moveHandler = function (ev) {
            if (!dragging) {
                return;
            }
            var dx = ev.screenX - lastMove.screenX;
            var dy = ev.screenY - lastMove.screenY;
            moveEventCount++;
            if (moveEventCount === threshold && typeof start === "function") {
                start(mouseDownEv, draggedEl, _this.root);
            }
            if (moveEventCount >= threshold && typeof move === "function") {
                move(dx, dy, ev, draggedEl, _this.root);
            }
        };
        var upHandler = function (ev) {
            if (moveEventCount >= threshold) {
                if (dragging) {
                    if (typeof end === "function") {
                        end(ev, draggedEl, _this.root);
                    }
                }
                // When releasing the mouse button, if it happens over the same element that we initially had
                // the mouseDown event, it will trigger a click event. We want to stop that, so we intercept
                // it by capturing click top-down and stopping its propagation.
                // However, if the mouseUp didn't happen above the starting element, it wouldn't trigger a click,
                // but it would intercept the next (unrelated) click event unless we prevent interception in the
                // first place by checking if we released above the starting element.
                if (draggedEl.contains(ev.target)) {
                    var parentNode_2 = draggedEl.parentNode;
                    var clickCancellation_2 = function (ev) {
                        ev.stopPropagation();
                        parentNode_2.removeEventListener("click", clickCancellation_2, true);
                    };
                    parentNode_2.addEventListener("click", clickCancellation_2, true);
                }
            }
            dragging = false;
            draggedEl = undefined;
            lastMove = undefined;
            moveEventCount = 0;
            document.removeEventListener("mouseup", upHandler);
            document.removeEventListener("mousemove", moveHandler);
            for (var i in mouseOverListeners) {
                _this.root.addEventListener("mouseover", mouseOverListeners[i]);
                _this.handlers.get(_this.root)["mouseover"] = [];
                _this.handlers.get(_this.root)["mouseover"].push(mouseOverListeners[i]);
            }
        };
        return off;
    };
    DomEvents.prototype.hover = function (element, hover, enter, leave) {
        var _this = this;
        if (hover === void 0) { hover = function () {
        }; }
        if (enter === void 0) { enter = function () {
        }; }
        if (leave === void 0) { leave = function () {
        }; }
        var hovering = false;
        element.addEventListener("mouseenter", function (ev) {
            hovering = true;
            enter(ev, element, _this.root);
        });
        element.addEventListener("mouseleave", function (ev) {
            hovering = false;
            leave(ev, element, _this.root);
        });
        element.addEventListener("mousemove", function (ev) {
            if (!hovering) {
                return;
            }
            hover(ev, element, _this.root);
        });
    };
    DomEvents.prototype.detachHandlers = function (evName, root) {
        root = root || this.root;
        var eventListeners = [];
        this.handlers.forEach(function (handlers, listenerRoot) {
            if (listenerRoot.id !== root.id || listenerRoot !== root) {
                return;
            }
            var _loop_1 = function (eventName) {
                if (eventName !== evName) {
                    return "continue";
                }
                handlers[eventName].forEach(function (handler) {
                    eventListeners.push(handler);
                    listenerRoot.removeEventListener(eventName, handler);
                });
            };
            for (var eventName in handlers) {
                _loop_1(eventName);
            }
        });
        delete this.handlers.get(this.root)[evName];
        return eventListeners;
    };
    DomEvents.prototype.detachAll = function () {
        this.handlers.forEach(function (handlers, listenerRoot) {
            var _loop_2 = function (eventName) {
                handlers[eventName].forEach(function (handler) { return listenerRoot.removeEventListener(eventName, handler); });
            };
            for (var eventName in handlers) {
                _loop_2(eventName);
            }
        });
        this.handlers.clear();
    };
    return DomEvents;
}());
exports.DomEvents = DomEvents;
//# sourceMappingURL=dom-events.js.map

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var EventHub = /** @class */ (function () {
    function EventHub(validEventList) {
        this.handlers = validEventList.reduce(function (acc, ev) {
            return Object.assign(acc, (_a = {}, _a[ev] = [], _a));
            var _a;
        }, {});
    }
    EventHub.prototype.on = function (event, handler) {
        var _this = this;
        this.guard(event, "subscribe to");
        this.handlers[event].push(handler);
        return function () { return _this.off(event, handler); };
    };
    EventHub.prototype.off = function (event, handler) {
        this.guard(event, "unsubscribe from");
        return this.handlers[event].splice(this.handlers[event].findIndex(function (h) { return handler === h; }), 1);
    };
    EventHub.prototype.emit = function (event) {
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        this.guard(event, "emit");
        for (var i = 0; i < this.handlers[event].length; i++) {
            (_a = this.handlers[event])[i].apply(_a, __spread(data));
        }
        var _a;
    };
    EventHub.prototype.empty = function () {
        for (var event_1 in this.handlers) {
            this.handlers[event_1] = [];
        }
    };
    EventHub.prototype.guard = function (event, verb) {
        if (!this.handlers[event]) {
            console.warn("Trying to " + verb + " a non-supported event \u201C" + event + "\u201D. \n            Supported events are: " + Object.keys(this.handlers).join(", ") + "\u201D");
        }
    };
    return EventHub;
}());
exports.EventHub = EventHub;
//# sourceMappingURL=event-hub.js.map

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HtmlUtils = /** @class */ (function () {
    function HtmlUtils() {
    }
    HtmlUtils.escapeHTML = function (source) {
        return String(source).replace(/[&<>"'\/]/g, function (s) { return HtmlUtils.entityMap[s]; });
    };
    HtmlUtils.entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"\"": "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };
    return HtmlUtils;
}());
exports.HtmlUtils = HtmlUtils;
//# sourceMappingURL=html-utils.js.map

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("svg", { ref: "svg", staticClass: "cwl-workflow" })
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-597a6c5a", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = normalizeComponent;
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  scriptExports = scriptExports || {}

  // ES6 modules interop
  var type = typeof scriptExports.default
  if (type === 'object' || type === 'function') {
    scriptExports = scriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vue = factory());
}(this, (function () { 'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}

function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

return Vue$3;

})));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43), __webpack_require__(120).setImmediate))

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(121);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43), __webpack_require__(122)))

/***/ }),
/* 122 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var cwl_svg_1 = __webpack_require__(39);
var objectPath = __webpack_require__(124);
var autoBind = __webpack_require__(125);
var WorkflowExpansionPlugin = /** @class */ (function (_super) {
    __extends(WorkflowExpansionPlugin, _super);
    function WorkflowExpansionPlugin() {
        var _this = _super.call(this) || this;
        _this.undoStack = [];
        _this.currentLoc = null;
        autoBind(_this);
        return _this;
    }
    /**
     * Collapses the current subworkflow and goes up a level in the workflow tree
     */
    WorkflowExpansionPlugin.prototype.collapse = function () {
        if (this.undoStack.length > 0) {
            this.currentLoc = this.undoStack.pop();
        }
        else {
            this.currentLoc = null;
        }
        this.draw();
    };
    /**
     * Expands the subworkflow located at the given path within the main workflow
     * @param {string} loc
     */
    WorkflowExpansionPlugin.prototype.expand = function (loc) {
        if (this.currentLoc)
            this.undoStack.push(this.currentLoc);
        this.currentLoc = loc;
        this.draw();
    };
    /**
     * Displays a workflow at the current path in the workflow tree
     */
    WorkflowExpansionPlugin.prototype.draw = function () {
        this.workflow.destroy();
        if (this.currentLoc == null)
            this.workflow.draw(this.rootWorkflow);
        else
            this.workflow.draw(objectPath.withInheritedProps.get(this.rootWorkflow, this.currentLoc));
        //Force rearrange if we have the SVGArrangePlugin
        var arranger = this.workflow.getPlugin(cwl_svg_1.SVGArrangePlugin);
        if (arranger)
            arranger.arrange();
    };
    WorkflowExpansionPlugin.prototype.afterModelChange = function () {
        if (this.rootWorkflow == null)
            this.rootWorkflow = this.workflow.model;
    };
    WorkflowExpansionPlugin.prototype.expandEvent = function (event) {
        var element = this.workflow.findParent(event.target, "node");
        if (element) {
            var id = element.getAttribute("data-connection-id");
            var model = this.workflow.model.findById(id).run;
            if ('class' in model && model.class == 'Workflow') {
                // Work out the path to the
                var loc = model.loc.replace(/^document\./, '').replace(/\[(\d+)]/, ".$1");
                this.expand(loc);
            }
        }
    };
    WorkflowExpansionPlugin.prototype.collapseEvent = function (event) {
        if (event.key == "Backspace")
            this.collapse();
    };
    WorkflowExpansionPlugin.prototype.afterRender = function () {
        window.addEventListener("dblclick", this.expandEvent);
        window.addEventListener("keydown", this.collapseEvent);
    };
    WorkflowExpansionPlugin.prototype.destroy = function () {
        window.removeEventListener("dblclick", this.expandEvent);
        window.removeEventListener("keydown", this.collapseEvent);
    };
    return WorkflowExpansionPlugin;
}(cwl_svg_1.PluginBase));
exports.default = WorkflowExpansionPlugin;
//# sourceMappingURL=cwl-svg-expand.js.map

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (self, options) => {
	options = Object.assign({}, options);

	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);

		if (options.include) {
			return options.include.some(match);
		}

		if (options.exclude) {
			return !options.exclude.some(match);
		}

		return true;
	};

	for (const key of Object.getOwnPropertyNames(self.constructor.prototype)) {
		const val = self[key];

		if (key !== 'constructor' && typeof val === 'function' && filter(key)) {
			self[key] = val.bind(self);
		}
	}

	return self;
};

const excludedReactMethods = [
	'componentWillMount',
	'render',
	'componentDidMount',
	'componentWillReceiveProps',
	'shouldComponentUpdate',
	'componentWillUpdate',
	'componentDidUpdate',
	'componentWillUnmount',
	'componentDidCatch',
	'setState',
	'forceUpdate'
];

module.exports.react = (self, options) => {
	options = Object.assign({}, options);
	options.exclude = (options.exclude || []).concat(excludedReactMethods);
	return module.exports(self, options);
};


/***/ })
/******/ ]);
//# sourceMappingURL=rabix.bundle.js.map
/**
 * math.js
 * https://github.com/josdejong/mathjs
 *
 * Math.js is an extensive math library for JavaScript and Node.js,
 * It features real and complex numbers, units, matrices, a large set of
 * mathematical functions, and a flexible expression parser.
 *
 * @version 3.20.1
 * @date    2018-01-28
 *
 * @license
 * Copyright (C) 2013-2018 Jos de Jong <wjosdejong@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["math"] = factory();
	else
		root["math"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// the compile functions which compile a Node into JavaScript are not
// exposed as class methods for security reasons to prevent being able to
// override them or create fake Nodes. Instead, only compile functions of
// registered nodes can be executed

var hasOwnProperty = __webpack_require__(2).hasOwnProperty;

function factory () {
  // map with node type as key and compile functions as value
  var compileFunctions = {}

  /**
   * Register a compile function for a node
   * @param {string} type
   * @param {function} compileFunction
   *                      The compile function, invoked as
   *                      compileFunction(node, defs, args)
   */
  function register(type, compileFunction) {
    if (compileFunctions[type] === undefined) {
      compileFunctions[type] = compileFunction;
    }
    else {
      throw new Error('Cannot register type "' + type + '": already exists');
    }
  }

  /**
   * Compile a Node into JavaScript
   * @param {Node} node
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} Returns JavaScript code
   */
  function compile (node, defs, args) {
    if (hasOwnProperty(compileFunctions, node.type)) {
      var compileFunction = compileFunctions[node.type];
      return compileFunction(node, defs, args);
    }
    else if (typeof node._compile === 'function' &&
        !hasOwnProperty(node, '_compile')) {
      // Compatibility for CustomNodes
      // TODO: this is a security risk, change it such that you have to register CustomNodes separately in math.js, like math.expression.node.register(MyCustomNode)
      return node._compile(defs, args);
    }
    else {
      throw new Error('Cannot compile node: unknown type "' + node.type + '"');
    }
  }

  return {
    register: register,
    compile: compile
  }
}

exports.factory = factory;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var formatNumber = __webpack_require__(8).format;
var formatBigNumber = __webpack_require__(236).format;
var isBigNumber = __webpack_require__(10);

/**
 * Test whether value is a string
 * @param {*} value
 * @return {boolean} isString
 */
exports.isString = function(value) {
  return typeof value === 'string';
};

/**
 * Check if a text ends with a certain string.
 * @param {string} text
 * @param {string} search
 */
exports.endsWith = function(text, search) {
  var start = text.length - search.length;
  var end = text.length;
  return (text.substring(start, end) === search);
};

/**
 * Format a value of any type into a string.
 *
 * Usage:
 *     math.format(value)
 *     math.format(value, precision)
 *
 * When value is a function:
 *
 * - When the function has a property `syntax`, it returns this
 *   syntax description.
 * - In other cases, a string `'function'` is returned.
 *
 * When `value` is an Object:
 *
 * - When the object contains a property `format` being a function, this
 *   function is invoked as `value.format(options)` and the result is returned.
 * - When the object has its own `toString` method, this method is invoked
 *   and the result is returned.
 * - In other cases the function will loop over all object properties and
 *   return JSON object notation like '{"a": 2, "b": 3}'.
 *
 * Example usage:
 *     math.format(2/7);                // '0.2857142857142857'
 *     math.format(math.pi, 3);         // '3.14'
 *     math.format(new Complex(2, 3));  // '2 + 3i'
 *     math.format('hello');            // '"hello"'
 *
 * @param {*} value             Value to be stringified
 * @param {Object | number | Function} [options]  Formatting options. See
 *                                                lib/utils/number:format for a
 *                                                description of the available
 *                                                options.
 * @return {string} str
 */
exports.format = function(value, options) {
  if (typeof value === 'number') {
    return formatNumber(value, options);
  }

  if (isBigNumber(value)) {
    return formatBigNumber(value, options);
  }

  // note: we use unsafe duck-typing here to check for Fractions, this is
  // ok here since we're only invoking toString or concatenating its values
  if (looksLikeFraction(value)) {
    if (!options || options.fraction !== 'decimal') {
      // output as ratio, like '1/3'
      return (value.s * value.n) + '/' + value.d;
    }
    else {
      // output as decimal, like '0.(3)'
      return value.toString();
    }
  }

  if (Array.isArray(value)) {
    return formatArray(value, options);
  }

  if (exports.isString(value)) {
    return '"' + value + '"';
  }

  if (typeof value === 'function') {
    return value.syntax ? String(value.syntax) : 'function';
  }

  if (value && typeof value === 'object') {
    if (typeof value.format === 'function') {
      return value.format(options);
    }
    else if (value && value.toString() !== {}.toString()) {
      // this object has a non-native toString method, use that one
      return value.toString();
    }
    else {
      var entries = [];

      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          entries.push('"' + key + '": ' + exports.format(value[key], options));
        }
      }

      return '{' + entries.join(', ') + '}';
    }
  }

  return String(value);
};

/**
 * Stringify a value into a string enclosed in double quotes.
 * Unescaped double quotes and backslashes inside the value are escaped.
 * @param {*} value
 * @return {string}
 */
exports.stringify = function (value) {
  var text = String(value);
  var escaped = '';
  var i = 0;
  while (i < text.length) {
    var c = text.charAt(i);

    if (c === '\\') {
      escaped += c;
      i++;

      c = text.charAt(i);
      if (c === '' || '"\\/bfnrtu'.indexOf(c) === -1) {
        escaped += '\\';  // no valid escape character -> escape it
      }
      escaped += c;
    }
    else if (c === '"') {
      escaped += '\\"';
    }
    else {
      escaped += c;
    }
    i++;
  }

  return '"' + escaped + '"';
}

/**
 * Escape special HTML characters
 * @param {*} value
 * @return {string}
 */
exports.escape = function (value) {
  var text = String(value);
  text = text.replace(/&/g, '&amp;')
			 .replace(/"/g, '&quot;')
			 .replace(/'/g, '&#39;')
			 .replace(/</g, '&lt;')
			 .replace(/>/g, '&gt;');
  
  return text;
}

/**
 * Recursively format an n-dimensional matrix
 * Example output: "[[1, 2], [3, 4]]"
 * @param {Array} array
 * @param {Object | number | Function} [options]  Formatting options. See
 *                                                lib/utils/number:format for a
 *                                                description of the available
 *                                                options.
 * @returns {string} str
 */
function formatArray (array, options) {
  if (Array.isArray(array)) {
    var str = '[';
    var len = array.length;
    for (var i = 0; i < len; i++) {
      if (i != 0) {
        str += ', ';
      }
      str += formatArray(array[i], options);
    }
    str += ']';
    return str;
  }
  else {
    return exports.format(array, options);
  }
}

/**
 * Check whether a value looks like a Fraction (unsafe duck-type check)
 * @param {*} value
 * @return {boolean}
 */
function looksLikeFraction (value) {
  return (value &&
      typeof value === 'object' &&
      typeof value.s === 'number' &&
      typeof value.n === 'number' &&
      typeof value.d === 'number') || false;
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isBigNumber = __webpack_require__(10);

/**
 * Clone an object
 *
 *     clone(x)
 *
 * Can clone any primitive type, array, and object.
 * If x has a function clone, this function will be invoked to clone the object.
 *
 * @param {*} x
 * @return {*} clone
 */
exports.clone = function clone(x) {
  var type = typeof x;

  // immutable primitive types
  if (type === 'number' || type === 'string' || type === 'boolean' ||
      x === null || x === undefined) {
    return x;
  }

  // use clone function of the object when available
  if (typeof x.clone === 'function') {
    return x.clone();
  }

  // array
  if (Array.isArray(x)) {
    return x.map(function (value) {
      return clone(value);
    });
  }

  if (x instanceof Number)    return new Number(x.valueOf());
  if (x instanceof String)    return new String(x.valueOf());
  if (x instanceof Boolean)   return new Boolean(x.valueOf());
  if (x instanceof Date)      return new Date(x.valueOf());
  if (isBigNumber(x))         return x; // bignumbers are immutable
  if (x instanceof RegExp)  throw new TypeError('Cannot clone ' + x);  // TODO: clone a RegExp

  // object
  return exports.map(x, clone);
};

/**
 * Apply map to all properties of an object
 * @param {Object} object
 * @param {function} callback
 * @return {Object} Returns a copy of the object with mapped properties
 */
exports.map = function(object, callback) {
  var clone = {};

  for (var key in object) {
    if (exports.hasOwnProperty(object, key)) {
      clone[key] = callback(object[key]);
    }
  }

  return clone;
}

/**
 * Extend object a with the properties of object b
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 */
exports.extend = function(a, b) {
  for (var prop in b) {
    if (exports.hasOwnProperty(b, prop)) {
      a[prop] = b[prop];
    }
  }
  return a;
};

/**
 * Deep extend an object a with the properties of object b
 * @param {Object} a
 * @param {Object} b
 * @returns {Object}
 */
exports.deepExtend = function deepExtend (a, b) {
  // TODO: add support for Arrays to deepExtend
  if (Array.isArray(b)) {
    throw new TypeError('Arrays are not supported by deepExtend');
  }

  for (var prop in b) {
    if (exports.hasOwnProperty(b, prop)) {
      if (b[prop] && b[prop].constructor === Object) {
        if (a[prop] === undefined) {
          a[prop] = {};
        }
        if (a[prop].constructor === Object) {
          deepExtend(a[prop], b[prop]);
        }
        else {
          a[prop] = b[prop];
        }
      } else if (Array.isArray(b[prop])) {
        throw new TypeError('Arrays are not supported by deepExtend');
      } else {
        a[prop] = b[prop];
      }
    }
  }
  return a;
};

/**
 * Deep test equality of all fields in two pairs of arrays or objects.
 * @param {Array | Object} a
 * @param {Array | Object} b
 * @returns {boolean}
 */
exports.deepEqual = function deepEqual (a, b) {
  var prop, i, len;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }

    if (a.length != b.length) {
      return false;
    }

    for (i = 0, len = a.length; i < len; i++) {
      if (!exports.deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }

    for (prop in a) {
      //noinspection JSUnfilteredForInLoop
      if (!exports.deepEqual(a[prop], b[prop])) {
        return false;
      }
    }
    for (prop in b) {
      //noinspection JSUnfilteredForInLoop
      if (!exports.deepEqual(a[prop], b[prop])) {
        return false;
      }
    }
    return true;
  }
  else {
    return (typeof a === typeof b) && (a == b);
  }
};

/**
 * Test whether the current JavaScript engine supports Object.defineProperty
 * @returns {boolean} returns true if supported
 */
exports.canDefineProperty = function () {
  // test needed for broken IE8 implementation
  try {
    if (Object.defineProperty) {
      Object.defineProperty({}, 'x', { get: function () {} });
      return true;
    }
  } catch (e) {}

  return false;
};

/**
 * Attach a lazy loading property to a constant.
 * The given function `fn` is called once when the property is first requested.
 * On older browsers (<IE8), the function will fall back to direct evaluation
 * of the properties value.
 * @param {Object} object   Object where to add the property
 * @param {string} prop     Property name
 * @param {Function} fn     Function returning the property value. Called
 *                          without arguments.
 */
exports.lazy = function (object, prop, fn) {
  if (exports.canDefineProperty()) {
    var _uninitialized = true;
    var _value;
    Object.defineProperty(object, prop, {
      get: function () {
        if (_uninitialized) {
          _value = fn();
          _uninitialized = false;
        }
        return _value;
      },

      set: function (value) {
        _value = value;
        _uninitialized = false;
      },

      configurable: true,
      enumerable: true
    });
  }
  else {
    // fall back to immediate evaluation
    object[prop] = fn();
  }
};

/**
 * Traverse a path into an object.
 * When a namespace is missing, it will be created
 * @param {Object} object
 * @param {string} path   A dot separated string like 'name.space'
 * @return {Object} Returns the object at the end of the path
 */
exports.traverse = function(object, path) {
  var obj = object;

  if (path) {
    var names = path.split('.');
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!(name in obj)) {
        obj[name] = {};
      }
      obj = obj[name];
    }
  }

  return obj;
};

/**
 * A safe hasOwnProperty
 * @param {Object} object
 * @param {string} property
 */
exports.hasOwnProperty = function (object, property) {
  return object && Object.hasOwnProperty.call(object, property);
}

/**
 * Test whether an object is a factory. a factory has fields:
 *
 * - factory: function (type: Object, config: Object, load: function, typed: function [, math: Object])   (required)
 * - name: string (optional)
 * - path: string    A dot separated path (optional)
 * - math: boolean   If true (false by default), the math namespace is passed
 *                   as fifth argument of the factory function
 *
 * @param {*} object
 * @returns {boolean}
 */
exports.isFactory = function (object) {
  return object && typeof object.factory === 'function';
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keywords = __webpack_require__(12);
var deepEqual= __webpack_require__(2).deepEqual;
var hasOwnProperty = __webpack_require__(2).hasOwnProperty;

function factory (type, config, load, typed, math) {
  var compile = load(__webpack_require__(0)).compile;

  /**
   * Node
   */
  function Node() {
    if (!(this instanceof Node)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }
  }

  /**
   * Evaluate the node
   * @param {Object} [scope]  Scope to read/write variables
   * @return {*}              Returns the result
   */
  Node.prototype.eval = function(scope) {
    return this.compile().eval(scope);
  };

  Node.prototype.type = 'Node';

  Node.prototype.isNode = true;

  Node.prototype.comment = '';

  /**
   * Compile the node to javascript code
   * @return {{eval: function}} expr  Returns an object with a function 'eval',
   *                                  which can be invoked as expr.eval([scope]),
   *                                  where scope is an optional object with
   *                                  variables.
   */
  Node.prototype.compile = function () {
    // TODO: calling compile(math) is deprecated since version 2.0.0. Remove this warning some day
    if (arguments.length > 0) {
      throw new Error('Calling compile(math) is deprecated. Call the function as compile() instead.');
    }

    // definitions globally available inside the closure of the compiled expressions
    var defs = {
      math: math.expression.mathWithTransform,
      args: {}, // can be filled with names of FunctionAssignment arguments
      _validateScope: _validateScope
    };

    // will be used to put local function arguments
    var args = {};

    var code = compile(this, defs, args);

    var defsCode = Object.keys(defs).map(function (name) {
      return '    var ' + name + ' = defs["' + name + '"];';
    });

    var factoryCode =
        defsCode.join(' ') +
        'return {' +
        '  "eval": function (scope) {' +
        '    if (scope) _validateScope(scope);' +
        '    scope = scope || {};' +
        '    return ' + code + ';' +
        '  }' +
        '};';

    var factory = new Function('defs', factoryCode);
    return factory(defs);
  };

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  Node.prototype.forEach = function (callback) {
    // must be implemented by each of the Node implementations
    throw new Error('Cannot run forEach on a Node interface');
  };

  /**
   * Create a new Node having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {OperatorNode} Returns a transformed copy of the node
   */
  Node.prototype.map = function (callback) {
    // must be implemented by each of the Node implementations
    throw new Error('Cannot run map on a Node interface');
  };

  /**
   * Validate whether an object is a Node, for use with map
   * @param {Node} node
   * @returns {Node} Returns the input if it's a node, else throws an Error
   * @protected
   */
  Node.prototype._ifNode = function (node) {
    if (!type.isNode(node)) {
      throw new TypeError('Callback function must return a Node');
    }

    return node;
  };

  /**
   * Recursively traverse all nodes in a node tree. Executes given callback for
   * this node and each of its child nodes.
   * @param {function(node: Node, path: string, parent: Node)} callback
   *          A callback called for every node in the node tree.
   */
  Node.prototype.traverse = function (callback) {
    // execute callback for itself
    callback(this, null, null);

    // recursively traverse over all childs of a node
    function _traverse(node, callback) {
      node.forEach(function (child, path, parent) {
        callback(child, path, parent);
        _traverse(child, callback);
      });
    }

    _traverse(this, callback);
  };

  /**
   * Recursively transform a node tree via a transform function.
   *
   * For example, to replace all nodes of type SymbolNode having name 'x' with a
   * ConstantNode with value 2:
   *
   *     var res = Node.transform(function (node, path, parent) {
   *       if (node && node.isSymbolNode) && (node.name == 'x')) {
   *         return new ConstantNode(2);
   *       }
   *       else {
   *         return node;
   *       }
   *     });
   *
   * @param {function(node: Node, path: string, parent: Node) : Node} callback
   *          A mapping function accepting a node, and returning
   *          a replacement for the node or the original node.
   *          Signature: callback(node: Node, index: string, parent: Node) : Node
   * @return {Node} Returns the original node or its replacement
   */
  Node.prototype.transform = function (callback) {
    // traverse over all childs
    function _transform (node, callback) {
      return node.map(function(child, path, parent) {
        var replacement = callback(child, path, parent);
        return _transform(replacement, callback);
      });
    }

    var replacement = callback(this, null, null);
    return _transform(replacement, callback);
  };

  /**
   * Find any node in the node tree matching given filter function. For example, to
   * find all nodes of type SymbolNode having name 'x':
   *
   *     var results = Node.filter(function (node) {
   *       return (node && node.isSymbolNode) && (node.name == 'x');
   *     });
   *
   * @param {function(node: Node, path: string, parent: Node) : Node} callback
   *            A test function returning true when a node matches, and false
   *            otherwise. Function signature:
   *            callback(node: Node, index: string, parent: Node) : boolean
   * @return {Node[]} nodes       An array with nodes matching given filter criteria
   */
  Node.prototype.filter = function (callback) {
    var nodes = [];

    this.traverse(function (node, path, parent) {
      if (callback(node, path, parent)) {
        nodes.push(node);
      }
    });

    return nodes;
  };

  // TODO: deprecated since version 1.1.0, remove this some day
  Node.prototype.find = function () {
    throw new Error('Function Node.find is deprecated. Use Node.filter instead.');
  };

  // TODO: deprecated since version 1.1.0, remove this some day
  Node.prototype.match = function () {
    throw new Error('Function Node.match is deprecated. See functions Node.filter, Node.transform, Node.traverse.');
  };

  /**
   * Create a shallow clone of this node
   * @return {Node}
   */
  Node.prototype.clone = function () {
    // must be implemented by each of the Node implementations
    throw new Error('Cannot clone a Node interface');
  };

  /**
   * Create a deep clone of this node
   * @return {Node}
   */
  Node.prototype.cloneDeep = function () {
    return this.map(function (node) {
      return node.cloneDeep();
    });
  };

  /**
   * Deep compare this node with another node.
   * @param {Node} other
   * @return {boolean} Returns true when both nodes are of the same type and
   *                   contain the same values (as do their childs)
   */
  Node.prototype.equals = function (other) {
    return other
        ? deepEqual(this, other)
        : false
  };

  /**
   * Get string representation. (wrapper function)
   *
   * This function can get an object of the following form:
   * {
   *    handler: //This can be a callback function of the form
   *             // "function callback(node, options)"or
   *             // a map that maps function names (used in FunctionNodes)
   *             // to callbacks
   *    parenthesis: "keep" //the parenthesis option (This is optional)
   * }
   *
   * @param {Object} [options]
   * @return {string}
   */
  Node.prototype.toString = function (options) {
    var customString;
    if (options && typeof options === 'object') {
        switch (typeof options.handler) {
          case 'object':
          case 'undefined':
            break;
          case 'function':
            customString = options.handler(this, options);
            break;
          default:
            throw new TypeError('Object or function expected as callback');
        }
    }

    if (typeof customString !== 'undefined') {
      return customString;
    }

    return this._toString(options);
  };

  /**
   * Get HTML representation. (wrapper function)
   *
   * This function can get an object of the following form:
   * {
   *    handler: //This can be a callback function of the form
   *             // "function callback(node, options)" or
   *             // a map that maps function names (used in FunctionNodes)
   *             // to callbacks
   *    parenthesis: "keep" //the parenthesis option (This is optional)
   * }
   *
   * @param {Object} [options]
   * @return {string}
   */
  Node.prototype.toHTML = function (options) {
    var customString;
    if (options && typeof options === 'object') {
        switch (typeof options.handler) {
          case 'object':
          case 'undefined':
            break;
          case 'function':
            customString = options.handler(this, options);
            break;
          default:
            throw new TypeError('Object or function expected as callback');
        }
    }

    if (typeof customString !== 'undefined') {
      return customString;
    }

    return this.toHTML(options);
  };

  /**
   * Internal function to generate the string output.
   * This has to be implemented by every Node
   *
   * @throws {Error}
   */
  Node.prototype._toString = function () {
    //must be implemented by each of the Node implementations
    throw new Error('_toString not implemented for ' + this.type);
  };

  /**
   * Get LaTeX representation. (wrapper function)
   *
   * This function can get an object of the following form:
   * {
   *    handler: //This can be a callback function of the form
   *             // "function callback(node, options)"or
   *             // a map that maps function names (used in FunctionNodes)
   *             // to callbacks
   *    parenthesis: "keep" //the parenthesis option (This is optional)
   * }
   *
   * @param {Object} [options]
   * @return {string}
   */
  Node.prototype.toTex = function (options) {
    var customTex;
    if (options && typeof options == 'object') {
      switch (typeof options.handler) {
        case 'object':
        case 'undefined':
          break;
        case 'function':
          customTex = options.handler(this, options);
          break;
        default:
          throw new TypeError('Object or function expected as callback');
      }
    }

    if (typeof customTex !== 'undefined') {
      return customTex;
    }

    return this._toTex(options);
  };

  /**
   * Internal function to generate the LaTeX output.
   * This has to be implemented by every Node
   *
   * @param {Object} [options]
   * @throws {Error}
   */
  Node.prototype._toTex = function (options) {
    //must be implemented by each of the Node implementations
    throw new Error('_toTex not implemented for ' + this.type);
  };

  /**
   * Get identifier.
   * @return {string}
   */
  Node.prototype.getIdentifier = function () {
    return this.type;
  };

  /**
   * Get the content of the current Node.
   * @return {Node} node
   **/
  Node.prototype.getContent = function () {
    return this;
  };

  /**
   * Validate the symbol names of a scope.
   * Throws an error when the scope contains an illegal symbol.
   * @param {Object} scope
   */
  function _validateScope(scope) {
    for (var symbol in scope) {
      if (hasOwnProperty(scope, symbol)) {
        if (symbol in keywords) {
          throw new Error('Scope contains an illegal symbol, "' + symbol + '" is a reserved keyword');
        }
      }
    }
  }

  return Node;
}

exports.name = 'Node';
exports.path = 'expression.node';
exports.math = true; // request access to the math namespace as 5th argument of the factory function
exports.factory = factory;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var number = __webpack_require__(8);
var string = __webpack_require__(1);
var object = __webpack_require__(2);
var types = __webpack_require__(11);

var DimensionError = __webpack_require__(19);
var IndexError = __webpack_require__(20);

/**
 * Calculate the size of a multi dimensional array.
 * This function checks the size of the first entry, it does not validate
 * whether all dimensions match. (use function `validate` for that)
 * @param {Array} x
 * @Return {Number[]} size
 */
exports.size = function (x) {
  var s = [];

  while (Array.isArray(x)) {
    s.push(x.length);
    x = x[0];
  }

  return s;
};

/**
 * Recursively validate whether each element in a multi dimensional array
 * has a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @param {number} dim   Current dimension
 * @throws DimensionError
 * @private
 */
function _validate(array, size, dim) {
  var i;
  var len = array.length;

  if (len != size[dim]) {
    throw new DimensionError(len, size[dim]);
  }

  if (dim < size.length - 1) {
    // recursively validate each child array
    var dimNext = dim + 1;
    for (i = 0; i < len; i++) {
      var child = array[i];
      if (!Array.isArray(child)) {
        throw new DimensionError(size.length - 1, size.length, '<');
      }
      _validate(array[i], size, dimNext);
    }
  }
  else {
    // last dimension. none of the childs may be an array
    for (i = 0; i < len; i++) {
      if (Array.isArray(array[i])) {
        throw new DimensionError(size.length + 1, size.length, '>');
      }
    }
  }
}

/**
 * Validate whether each element in a multi dimensional array has
 * a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @throws DimensionError
 */
exports.validate = function(array, size) {
  var isScalar = (size.length == 0);
  if (isScalar) {
    // scalar
    if (Array.isArray(array)) {
      throw new DimensionError(array.length, 0);
    }
  }
  else {
    // array
    _validate(array, size, 0);
  }
};

/**
 * Test whether index is an integer number with index >= 0 and index < length
 * when length is provided
 * @param {number} index    Zero-based index
 * @param {number} [length] Length of the array
 */
exports.validateIndex = function(index, length) {
  if (!number.isNumber(index) || !number.isInteger(index)) {
    throw new TypeError('Index must be an integer (value: ' + index + ')');
  }
  if (index < 0 || (typeof length === 'number' && index >= length)) {
    throw new IndexError(index, length);
  }
};

// a constant used to specify an undefined defaultValue
exports.UNINITIALIZED = {};

/**
 * Resize a multi dimensional array. The resized array is returned.
 * @param {Array} array         Array to be resized
 * @param {Array.<number>} size Array with the size of each dimension
 * @param {*} [defaultValue=0]  Value to be filled in in new entries,
 *                              zero by default. To leave new entries undefined,
 *                              specify array.UNINITIALIZED as defaultValue
 * @return {Array} array         The resized array
 */
exports.resize = function(array, size, defaultValue) {
  // TODO: add support for scalars, having size=[] ?

  // check the type of the arguments
  if (!Array.isArray(array) || !Array.isArray(size)) {
    throw new TypeError('Array expected');
  }
  if (size.length === 0) {
    throw new Error('Resizing to scalar is not supported');
  }

  // check whether size contains positive integers
  size.forEach(function (value) {
    if (!number.isNumber(value) || !number.isInteger(value) || value < 0) {
      throw new TypeError('Invalid size, must contain positive integers ' +
          '(size: ' + string.format(size) + ')');
    }
  });

  // recursively resize the array
  var _defaultValue = (defaultValue !== undefined) ? defaultValue : 0;
  _resize(array, size, 0, _defaultValue);

  return array;
};

/**
 * Recursively resize a multi dimensional array
 * @param {Array} array         Array to be resized
 * @param {number[]} size       Array with the size of each dimension
 * @param {number} dim          Current dimension
 * @param {*} [defaultValue]    Value to be filled in in new entries,
 *                              undefined by default.
 * @private
 */
function _resize (array, size, dim, defaultValue) {
  var i;
  var elem;
  var oldLen = array.length;
  var newLen = size[dim];
  var minLen = Math.min(oldLen, newLen);

  // apply new length
  array.length = newLen;

  if (dim < size.length - 1) {
    // non-last dimension
    var dimNext = dim + 1;

    // resize existing child arrays
    for (i = 0; i < minLen; i++) {
      // resize child array
      elem = array[i];
      if (!Array.isArray(elem)) {
        elem = [elem]; // add a dimension
        array[i] = elem;
      }
      _resize(elem, size, dimNext, defaultValue);
    }

    // create new child arrays
    for (i = minLen; i < newLen; i++) {
      // get child array
      elem = [];
      array[i] = elem;

      // resize new child array
      _resize(elem, size, dimNext, defaultValue);
    }
  }
  else {
    // last dimension

    // remove dimensions of existing values
    for (i = 0; i < minLen; i++) {
      while (Array.isArray(array[i])) {
        array[i] = array[i][0];
      }
    }

    if(defaultValue !== exports.UNINITIALIZED) {
      // fill new elements with the default value
      for (i = minLen; i < newLen; i++) {
        array[i] = defaultValue;
      }
    }
  }
}

/**
 * Re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {Array.<number>} sizes  List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 *
 * @throws {DimensionError}       If the product of the new dimension sizes does
 *                                not equal that of the old ones
 */
exports.reshape = function(array, sizes) {
  var flatArray = exports.flatten(array);
  var newArray;

  var product = function (arr) {
    return arr.reduce(function (prev, curr) {
      return prev * curr;
    });
  };

  if (!Array.isArray(array) || !Array.isArray(sizes)) {
    throw new TypeError('Array expected');
  }

  if (sizes.length === 0) {
    throw new DimensionError(0, product(exports.size(array)), '!=');
  }

  try {
    newArray  = _reshape(flatArray, sizes);
  } catch (e) {
    if (e instanceof DimensionError) {
      throw new DimensionError(
        product(sizes),
        product(exports.size(array)),
        '!='
      );
    }
    throw e;
  }

  if (flatArray.length > 0) {
    throw new DimensionError(
      product(sizes),
      product(exports.size(array)),
      '!='
    );
  }

  return newArray;
};

/**
 * Recursively re-shape a multi dimensional array to fit the specified dimensions
 * @param {Array} array           Array to be reshaped
 * @param {Array.<number>} sizes  List of sizes for each dimension
 * @returns {Array}               Array whose data has been formatted to fit the
 *                                specified dimensions
 *
 * @throws {DimensionError}       If the product of the new dimension sizes does
 *                                not equal that of the old ones
 */
function _reshape(array, sizes) {
  var accumulator = [];
  var i;

  if (sizes.length === 0) {
    if (array.length === 0) {
      throw new DimensionError(null, null, '!=');
    }
    return array.shift();
  }
  for (i = 0; i < sizes[0]; i += 1) {
    accumulator.push(_reshape(array, sizes.slice(1)));
  }
  return accumulator;
}


/**
 * Squeeze a multi dimensional array
 * @param {Array} array
 * @param {Array} [size]
 * @returns {Array} returns the array itself
 */
exports.squeeze = function(array, size) {
  var s = size || exports.size(array);

  // squeeze outer dimensions
  while (Array.isArray(array) && array.length === 1) {
    array = array[0];
    s.shift();
  }

  // find the first dimension to be squeezed
  var dims = s.length;
  while (s[dims - 1] === 1) {
    dims--;
  }

  // squeeze inner dimensions
  if (dims < s.length) {
    array = _squeeze(array, dims, 0);
    s.length = dims;
  }

  return array;
};

/**
 * Recursively squeeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the squeezed array
 * @private
 */
function _squeeze (array, dims, dim) {
  var i, ii;

  if (dim < dims) {
    var next = dim + 1;
    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _squeeze(array[i], dims, next);
    }
  }
  else {
    while (Array.isArray(array)) {
      array = array[0];
    }
  }

  return array;
}

/**
 * Unsqueeze a multi dimensional array: add dimensions when missing
 * 
 * Paramter `size` will be mutated to match the new, unqueezed matrix size.
 * 
 * @param {Array} array
 * @param {number} dims     Desired number of dimensions of the array
 * @param {number} [outer]  Number of outer dimensions to be added
 * @param {Array} [size]    Current size of array.
 * @returns {Array} returns the array itself
 * @private
 */
exports.unsqueeze = function(array, dims, outer, size) {
  var s = size || exports.size(array);

  // unsqueeze outer dimensions
  if (outer) {
    for (var i = 0; i < outer; i++) {
      array = [array];
      s.unshift(1);
    }
  }

  // unsqueeze inner dimensions
  array = _unsqueeze(array, dims, 0);
  while (s.length < dims) {
    s.push(1);
  }

  return array;
};

/**
 * Recursively unsqueeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the squeezed array
 * @private
 */
function _unsqueeze (array, dims, dim) {
  var i, ii;

  if (Array.isArray(array)) {
    var next = dim + 1;
    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _unsqueeze(array[i], dims, next);
    }
  }
  else {
    for (var d = dim; d < dims; d++) {
      array = [array];
    }
  }

  return array;
}
/**
 * Flatten a multi dimensional array, put all elements in a one dimensional
 * array
 * @param {Array} array   A multi dimensional array
 * @return {Array}        The flattened array (1 dimensional)
 */
exports.flatten = function(array) {
  if (!Array.isArray(array)) {
    //if not an array, return as is
    return array;
  }
  var flat = [];

  array.forEach(function callback(value) {
    if (Array.isArray(value)) {
      value.forEach(callback);  //traverse through sub-arrays recursively
    }
    else {
      flat.push(value);
    }
  });

  return flat;
};

/**
 * A safe map
 * @param {Array} array
 * @param {function} callback
 */
exports.map = function (array, callback) {
  return Array.prototype.map.call(array, callback);
}

/**
 * A safe forEach
 * @param {Array} array
 * @param {function} callback
 */
exports.forEach = function (array, callback) {
  Array.prototype.forEach.call(array, callback);
}

/**
 * A safe filter
 * @param {Array} array
 * @param {function} callback
 */
exports.filter = function (array, callback) {
  if (exports.size(array).length !== 1) {
    throw new Error('Only one dimensional matrices supported');
  }

  return Array.prototype.filter.call(array, callback);
}

/**
 * Filter values in a callback given a regular expression
 * @param {Array} array
 * @param {RegExp} regexp
 * @return {Array} Returns the filtered array
 * @private
 */
exports.filterRegExp = function (array, regexp) {
  if (exports.size(array).length !== 1) {
    throw new Error('Only one dimensional matrices supported');
  }

  return Array.prototype.filter.call(array, function (entry) {
    return regexp.test(entry);
  });
}

/**
 * A safe join
 * @param {Array} array
 * @param {string} separator
 */
exports.join = function (array, separator) {
  return Array.prototype.join.call(array, separator);
}

/**
 * Assign a numeric identifier to every element of a sorted array
 * @param {Array}	a  An array
 * @return {Array}	An array of objects containing the original value and its identifier
 */
exports.identify = function(a) {
  if (!Array.isArray(a)) {
	throw new TypeError('Array input expected');
  }
	
  if (a.length === 0) {
	return a;
  }
	
  var b = [];
  var count = 0;
  b[0] = {value: a[0], identifier: 0};
  for (var i=1; i<a.length; i++) {
    if (a[i] === a[i-1]) {
  	count++;
    }
    else {
      count = 0;
    }
    b.push({value: a[i], identifier: count});
  }
  return b;
}

/**
 * Remove the numeric identifier from the elements
 * @param	a  An array
 * @return	An array of values without identifiers
 */
exports.generalize = function(a) {
  if (!Array.isArray(a)) {
	throw new TypeError('Array input expected');
  }
	
  if (a.length === 0) {
	return a;
  }
	
  var b = [];
  for (var i=0; i<a.length; i++) {
    b.push(a[i].value);
  }
  return b;
}

/**
 * Test whether an object is an array
 * @param {*} value
 * @return {boolean} isArray
 */
exports.isArray = Array.isArray;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = __webpack_require__(2).hasOwnProperty;

/**
 * Get a property of a plain object
 * Throws an error in case the object is not a plain object or the
 * property is not defined on the object itself
 * @param {Object} object
 * @param {string} prop
 * @return {*} Returns the property value when safe
 */
function getSafeProperty (object, prop) {
  // only allow getting safe properties of a plain object
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    return object[prop];
  }

  if (typeof object[prop] === 'function' && isSafeMethod(object, prop)) {
    throw new Error('Cannot access method "' + prop + '" as a property');
  }

  throw new Error('No access to property "' + prop + '"');
}

/**
 * Set a property on a plain object.
 * Throws an error in case the object is not a plain object or the
 * property would override an inherited property like .constructor or .toString
 * @param {Object} object
 * @param {string} prop
 * @param {*} value
 * @return {*} Returns the value
 */
// TODO: merge this function into access.js?
function setSafeProperty (object, prop, value) {
  // only allow setting safe properties of a plain object
  if (isPlainObject(object) && isSafeProperty(object, prop)) {
    return object[prop] = value;
  }

  throw new Error('No access to property "' + prop + '"');
}

/**
 * Test whether a property is safe to use for an object.
 * For example .toString and .constructor are not safe
 * @param {string} prop
 * @return {boolean} Returns true when safe
 */
function isSafeProperty (object, prop) {
  if (!object || typeof object !== 'object') {
    return false;
  }
  // SAFE: whitelisted
  // e.g length
  if (hasOwnProperty(safeNativeProperties, prop)) {
    return true;
  }
  // UNSAFE: inherited from Object prototype
  // e.g constructor
  if (prop in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  }
  // UNSAFE: inherited from Function prototype
  // e.g call, apply
  if (prop in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }
  return true;
}

/**
 * Validate whether a method is safe.
 * Throws an error when that's not the case.
 * @param {Object} object
 * @param {string} method
 */
// TODO: merge this function into assign.js?
function validateSafeMethod (object, method) {
  if (!isSafeMethod(object, method)) {
    throw new Error('No access to method "' + method + '"');
  }
}

/**
 * Check whether a method is safe.
 * Throws an error when that's not the case (for example for `constructor`).
 * @param {Object} object
 * @param {string} method
 * @return {boolean} Returns true when safe, false otherwise
 */
function isSafeMethod (object, method) {
  if (!object || typeof object[method] !== 'function') {
    return false;
  }
  // UNSAFE: ghosted
  // e.g overridden toString
  // Note that IE10 doesn't support __proto__ and we can't do this check there.
  if (hasOwnProperty(object, method) &&
      (object.__proto__ && (method in object.__proto__))) {
    return false;
  }
  // SAFE: whitelisted
  // e.g toString
  if (hasOwnProperty(safeNativeMethods, method)) {
    return true;
  }
  // UNSAFE: inherited from Object prototype
  // e.g constructor
  if (method in Object.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Object.prototype is a root object
    return false;
  }
  // UNSAFE: inherited from Function prototype
  // e.g call, apply
  if (method in Function.prototype) {
    // 'in' is used instead of hasOwnProperty for nodejs v0.10
    // which is inconsistent on root prototypes. It is safe
    // here because Function.prototype is a root object
    return false;
  }
  return true;
}

function isPlainObject (object) {
  return typeof object === 'object' && object && object.constructor === Object;
}

var safeNativeProperties = {
  length: true,
  name: true
};

var safeNativeMethods = {
  toString: true,
  valueOf: true,
  toLocaleString: true
};

exports.getSafeProperty = getSafeProperty;
exports.setSafeProperty = setSafeProperty;
exports.isSafeProperty = isSafeProperty;
exports.validateSafeMethod = validateSafeMethod;
exports.isSafeMethod = isSafeMethod;
exports.isPlainObject = isPlainObject;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.symbols = {
  // GREEK LETTERS
  Alpha: 'A',     alpha: '\\alpha',
  Beta: 'B',      beta: '\\beta',
  Gamma: '\\Gamma',    gamma: '\\gamma',
  Delta: '\\Delta',    delta: '\\delta',
  Epsilon: 'E',   epsilon: '\\epsilon',  varepsilon: '\\varepsilon',
  Zeta: 'Z',      zeta: '\\zeta',
  Eta: 'H',       eta: '\\eta',
  Theta: '\\Theta',    theta: '\\theta',    vartheta: '\\vartheta',
  Iota: 'I',      iota: '\\iota',
  Kappa: 'K',     kappa: '\\kappa',    varkappa: '\\varkappa',
  Lambda: '\\Lambda',   lambda: '\\lambda',
  Mu: 'M',        mu: '\\mu',
  Nu: 'N',        nu: '\\nu',
  Xi: '\\Xi',       xi: '\\xi',
  Omicron: 'O',   omicron: 'o',
  Pi: '\\Pi',       pi: '\\pi',       varpi: '\\varpi',
  Rho: 'P',       rho: '\\rho',      varrho: '\\varrho',
  Sigma: '\\Sigma',    sigma: '\\sigma',    varsigma: '\\varsigma',
  Tau: 'T',       tau: '\\tau',
  Upsilon: '\\Upsilon',  upsilon: '\\upsilon',
  Phi: '\\Phi',      phi: '\\phi',      varphi: '\\varphi',
  Chi: 'X',       chi: '\\chi',
  Psi: '\\Psi',      psi: '\\psi',
  Omega: '\\Omega',    omega: '\\omega',
  //logic
  'true': '\\mathrm{True}',
  'false': '\\mathrm{False}',
  //other
  i: 'i', //TODO use \i ??
  inf: '\\infty',
  Inf: '\\infty',
  infinity: '\\infty',
  Infinity: '\\infty',
  oo: '\\infty',
  lim: '\\lim',
  'undefined': '\\mathbf{?}'
};

exports.operators = {
  'transpose': '^\\top',
  'factorial': '!',
  'pow': '^',
  'dotPow': '.^\\wedge', //TODO find ideal solution
  'unaryPlus': '+',
  'unaryMinus': '-',
  'bitNot': '~', //TODO find ideal solution
  'not': '\\neg',
  'multiply': '\\cdot',
  'divide': '\\frac', //TODO how to handle that properly?
  'dotMultiply': '.\\cdot', //TODO find ideal solution
  'dotDivide': '.:', //TODO find ideal solution
  'mod': '\\mod',
  'add': '+',
  'subtract': '-',
  'to': '\\rightarrow',
  'leftShift': '<<',
  'rightArithShift': '>>',
  'rightLogShift': '>>>',
  'equal': '=',
  'unequal': '\\neq',
  'smaller': '<',
  'larger': '>',
  'smallerEq': '\\leq',
  'largerEq': '\\geq',
  'bitAnd': '\\&',
  'bitXor': '\\underline{|}',
  'bitOr': '|',
  'and': '\\wedge',
  'xor': '\\veebar',
  'or': '\\vee'
};

exports.defaultTemplate = '\\mathrm{${name}}\\left(${args}\\right)';

var units = {
  deg: '^\\circ'
};

//@param {string} name
//@param {boolean} isUnit
exports.toSymbol = function (name, isUnit) {
  isUnit = typeof isUnit === 'undefined' ? false : isUnit;
  if (isUnit) {
    if (units.hasOwnProperty(name)) {
      return units[name];
    }
    return '\\mathrm{' + name + '}';
  }

  if (exports.symbols.hasOwnProperty(name)) {
    return exports.symbols[name];
  }
  else if (name.indexOf('_') !== -1) {
    //symbol with index (eg. alpha_1)
    var index = name.indexOf('_');
    return exports.toSymbol(name.substring(0, index)) + '_{'
      + exports.toSymbol(name.substring(index + 1)) + '}';
  }
  return name;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//list of identifiers of nodes in order of their precedence
//also contains information about left/right associativity
//and which other operator the operator is associative with
//Example:
// addition is associative with addition and subtraction, because:
// (a+b)+c=a+(b+c)
// (a+b)-c=a+(b-c)
//
// postfix operators are left associative, prefix operators 
// are right associative
//
//It's also possible to set the following properties:
// latexParens: if set to false, this node doesn't need to be enclosed
//              in parentheses when using LaTeX
// latexLeftParens: if set to false, this !OperatorNode's! 
//                  left argument doesn't need to be enclosed
//                  in parentheses
// latexRightParens: the same for the right argument
var properties = [
  { //assignment
    'AssignmentNode': {},
    'FunctionAssignmentNode': {}
  },
  { //conditional expression
    'ConditionalNode': {
      latexLeftParens: false,
      latexRightParens: false,
      latexParens: false
      //conditionals don't need parentheses in LaTeX because
      //they are 2 dimensional
    }
  },
  { //logical or
    'OperatorNode:or': {
      associativity: 'left',
      associativeWith: []
    }

  },
  { //logical xor
    'OperatorNode:xor': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //logical and
    'OperatorNode:and': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //bitwise or
    'OperatorNode:bitOr': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //bitwise xor
    'OperatorNode:bitXor': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //bitwise and
    'OperatorNode:bitAnd': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //relational operators
    'OperatorNode:equal': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:unequal': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:smaller': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:larger': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:smallerEq': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:largerEq': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //bitshift operators
    'OperatorNode:leftShift': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:rightArithShift': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:rightLogShift': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //unit conversion
    'OperatorNode:to': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //range
    'RangeNode': {}
  },
  { //addition, subtraction
    'OperatorNode:add': {
      associativity: 'left',
      associativeWith: ['OperatorNode:add', 'OperatorNode:subtract']
    },
    'OperatorNode:subtract': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //multiply, divide, modulus
    'OperatorNode:multiply': {
      associativity: 'left',
      associativeWith: [
        'OperatorNode:multiply',
        'OperatorNode:divide',
        'Operator:dotMultiply',
        'Operator:dotDivide'
      ]
    },
    'OperatorNode:divide': {
      associativity: 'left',
      associativeWith: [],
      latexLeftParens: false,
      latexRightParens: false,
      latexParens: false
      //fractions don't require parentheses because
      //they're 2 dimensional, so parens aren't needed
      //in LaTeX
    },
    'OperatorNode:dotMultiply': {
      associativity: 'left',
      associativeWith: [
        'OperatorNode:multiply',
        'OperatorNode:divide',
        'OperatorNode:dotMultiply',
        'OperatorNode:doDivide'
      ]
    },
    'OperatorNode:dotDivide': {
      associativity: 'left',
      associativeWith: []
    },
    'OperatorNode:mod': {
      associativity: 'left',
      associativeWith: []
    }
  },
  { //unary prefix operators
    'OperatorNode:unaryPlus': {
      associativity: 'right'
    },
    'OperatorNode:unaryMinus': {
      associativity: 'right'
    },
    'OperatorNode:bitNot': {
      associativity: 'right'
    },
    'OperatorNode:not': {
      associativity: 'right'
    }
  },
  { //exponentiation
    'OperatorNode:pow': {
      associativity: 'right',
      associativeWith: [],
      latexRightParens: false
      //the exponent doesn't need parentheses in
      //LaTeX because it's 2 dimensional
      //(it's on top)
    },
    'OperatorNode:dotPow': {
      associativity: 'right',
      associativeWith: []
    }
  },
  { //factorial
    'OperatorNode:factorial': {
      associativity: 'left'
    }
  },
  { //matrix transpose
    'OperatorNode:transpose': {
      associativity: 'left'
    }
  }
];

/**
 * Get the precedence of a Node.
 * Higher number for higher precedence, starting with 0.
 * Returns null if the precedence is undefined.
 *
 * @param {Node}
 * @param {string} parenthesis
 * @return {number|null}
 */
function getPrecedence (_node, parenthesis) {
  var node = _node;
  if (parenthesis !== 'keep') {
    //ParenthesisNodes are only ignored when not in 'keep' mode
    node = _node.getContent();
  }
  var identifier = node.getIdentifier();
  for (var i = 0; i < properties.length; i++) {
    if (identifier in properties[i]) {
      return i;
    }
  }
  return null;
}

/**
 * Get the associativity of an operator (left or right).
 * Returns a string containing 'left' or 'right' or null if
 * the associativity is not defined.
 *
 * @param {Node}
 * @param {string} parenthesis
 * @return {string|null}
 * @throws {Error}
 */
function getAssociativity (_node, parenthesis) {
  var node = _node;
  if (parenthesis !== 'keep') {
    //ParenthesisNodes are only ignored when not in 'keep' mode
    node = _node.getContent();
  }
  var identifier = node.getIdentifier();
  var index = getPrecedence(node, parenthesis);
  if (index === null) {
    //node isn't in the list
    return null;
  }
  var property = properties[index][identifier];

  if (property.hasOwnProperty('associativity')) {
    if (property.associativity === 'left') {
      return 'left';
    }
    if (property.associativity === 'right') {
      return 'right';
    }
    //associativity is invalid
    throw Error('\'' + identifier + '\' has the invalid associativity \''
                + property.associativity + '\'.');
  }

  //associativity is undefined
  return null;
}

/**
 * Check if an operator is associative with another operator.
 * Returns either true or false or null if not defined.
 *
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @param {string} parenthesis
 * @return {bool|null}
 */
function isAssociativeWith (nodeA, nodeB, parenthesis) {
  var a = nodeA;
  var b = nodeB;
  if (parenthesis !== 'keep') {
    //ParenthesisNodes are only ignored when not in 'keep' mode
    var a = nodeA.getContent();
    var b = nodeB.getContent();
  }
  var identifierA = a.getIdentifier();
  var identifierB = b.getIdentifier();
  var index = getPrecedence(a, parenthesis);
  if (index === null) {
    //node isn't in the list
    return null;
  }
  var property = properties[index][identifierA];

  if (property.hasOwnProperty('associativeWith')
      && (property.associativeWith instanceof Array)) {
    for (var i = 0; i < property.associativeWith.length; i++) {
      if (property.associativeWith[i] === identifierB) {
        return true;
      }
    }
    return false;
  }

  //associativeWith is not defined
  return null;
}

module.exports.properties = properties;
module.exports.getPrecedence = getPrecedence;
module.exports.getAssociativity = getAssociativity;
module.exports.isAssociativeWith = isAssociativeWith;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @typedef {{sign: '+' | '-' | '', coefficients: number[], exponent: number}} SplitValue
 */

/**
 * Test whether value is a number
 * @param {*} value
 * @return {boolean} isNumber
 */
exports.isNumber = function(value) {
  return typeof value === 'number';
};

/**
 * Check if a number is integer
 * @param {number | boolean} value
 * @return {boolean} isInteger
 */
exports.isInteger = function(value) {
  return isFinite(value)
      ? (value == Math.round(value))
      : false;
  // Note: we use ==, not ===, as we can have Booleans as well
};

/**
 * Calculate the sign of a number
 * @param {number} x
 * @returns {*}
 */
exports.sign = Math.sign || function(x) {
  if (x > 0) {
    return 1;
  }
  else if (x < 0) {
    return -1;
  }
  else {
    return 0;
  }
};

/**
 * Convert a number to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'engineering'    Always use engineering notation.
 *                                          For example '123.4e+0' and '14.0e+6'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lower` and `upper` bounds, and uses
 *                                          exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential' and
 *                                          'auto', `precision` defines the total
 *                                          number of significant digits returned
 *                                          and is undefined by default.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point, and is 0 by default.
 *                     {Object} exponential An object containing two parameters,
 *                                          {number} lower and {number} upper,
 *                                          used by notation 'auto' to determine
 *                                          when to return exponential notation.
 *                                          Default values are `lower=1e-3` and
 *                                          `upper=1e5`.
 *                                          Only applicable for notation `auto`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4);                                        // '6.4'
 *    format(1240000);                                    // '1.24e6'
 *    format(1/3);                                        // '0.3333333333333333'
 *    format(1/3, 3);                                     // '0.333'
 *    format(21385, 2);                                   // '21000'
 *    format(12.071, {notation: 'fixed'});                // '12'
 *    format(2.3,    {notation: 'fixed', precision: 2});  // '2.30'
 *    format(52.8,   {notation: 'exponential'});          // '5.28e+1'
 *    format(12345678, {notation: 'engineering'});        // '12.345678e+6'
 *
 * @param {number} value
 * @param {Object | Function | number} [options]
 * @return {string} str The formatted value
 */
exports.format = function(value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  }

  // handle special cases
  if (value === Infinity) {
    return 'Infinity';
  }
  else if (value === -Infinity) {
    return '-Infinity';
  }
  else if (isNaN(value)) {
    return 'NaN';
  }

  // default values for options
  var notation = 'auto';
  var precision = undefined;

  if (options) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    }

    // determine precision from options
    if (exports.isNumber(options)) {
      precision = options;
    }
    else if (options.precision) {
      precision = options.precision;
    }
  }

  // handle the various notations
  switch (notation) {
    case 'fixed':
      return exports.toFixed(value, precision);

    case 'exponential':
      return exports.toExponential(value, precision);

    case 'engineering':
      return exports.toEngineering(value, precision);

    case 'auto':
      return exports
          .toPrecision(value, precision, options && options.exponential)

          // remove trailing zeros after the decimal point
          .replace(/((\.\d*?)(0+))($|e)/, function () {
            var digits = arguments[2];
            var e = arguments[4];
            return (digits !== '.') ? digits + e : e;
          });

    default:
      throw new Error('Unknown notation "' + notation + '". ' +
          'Choose "auto", "exponential", or "fixed".');
  }
};

/**
 * Split a number into sign, coefficients, and exponent
 * @param {number | string} value
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 */
exports.splitNumber = function (value) {
  // parse the input value
  var match = String(value).toLowerCase().match(/^0*?(-?)(\d+\.?\d*)(e([+-]?\d+))?$/);
  if (!match) {
    throw new SyntaxError('Invalid number ' + value);
  }

  var sign         = match[1];
  var digits       = match[2];
  var exponent     = parseFloat(match[4] || '0');

  var dot = digits.indexOf('.');
  exponent += (dot !== -1) ? (dot - 1) : (digits.length - 1);

  var coefficients = digits
      .replace('.', '')  // remove the dot (must be removed before removing leading zeros)
      .replace(/^0*/, function (zeros) {
        // remove leading zeros, add their count to the exponent
        exponent -= zeros.length;
        return '';
      })
      .replace(/0*$/, '') // remove trailing zeros
      .split('')
      .map(function (d) {
        return parseInt(d);
      });

  if (coefficients.length === 0) {
    coefficients.push(0);
    exponent++;
  }

  return {
    sign: sign,
    coefficients: coefficients,
    exponent: exponent
  };
};


/**
 * Format a number in engineering notation. Like '1.23e+6', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision=0]        Optional number of decimals after the
 *                                      decimal point. Zero by default.
 */
exports.toEngineering = function (value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }
  
  var rounded = exports.roundDigits(exports.splitNumber(value), precision);

  var e = rounded.exponent;
  var c = rounded.coefficients;

  // find nearest lower multiple of 3 for exponent
  var newExp = e % 3 === 0 ? e : (e < 0 ? (e - 3) - (e % 3) : e - (e % 3));

  // concatenate coefficients with necessary zeros
  var significandsDiff = e >= 0 ? e : Math.abs(newExp);

  // add zeros if necessary (for ex: 1e+8)
  if (c.length - 1 < significandsDiff) c = c.concat(zeros(significandsDiff - (c.length - 1)));

  // find difference in exponents
  var expDiff = Math.abs(e - newExp);

  var decimalIdx = 1;

  // push decimal index over by expDiff times
  while (--expDiff >= 0) decimalIdx++;

  // if all coefficient values are zero after the decimal point, don't add a decimal value.
  // otherwise concat with the rest of the coefficients
  var decimals = c.slice(decimalIdx).join('');
  var decimalVal = decimals.match(/[1-9]/) ? ('.' + decimals) : '';

  var str = c.slice(0, decimalIdx).join('') +
      decimalVal +
      'e' + (e >= 0 ? '+' : '') + newExp.toString();
  return rounded.sign + str;
};

/**
 * Format a number with fixed notation.
 * @param {number | string} value
 * @param {number} [precision=0]        Optional number of decimals after the
 *                                      decimal point. Zero by default.
 */
exports.toFixed = function (value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  var splitValue = exports.splitNumber(value)
  var rounded = exports.roundDigits(splitValue, splitValue.exponent + 1 + (precision || 0));
  var c = rounded.coefficients;
  var p = rounded.exponent + 1; // exponent may have changed

  // append zeros if needed
  var pp = p + (precision || 0);
  if (c.length < pp) {
    c = c.concat(zeros(pp - c.length));
  }

  // prepend zeros if needed
  if (p < 0) {
    c = zeros(-p + 1).concat(c);
    p = 1;
  }

  // insert a dot if needed
  if (precision) {
    c.splice(p, 0, (p === 0) ? '0.' : '.');
  }

  return rounded.sign + c.join('');
};

/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {number | string} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 */
exports.toExponential = function (value, precision) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  // round if needed, else create a clone
  var split = exports.splitNumber(value)
  var rounded = precision ? exports.roundDigits(split, precision) : split;
  var c = rounded.coefficients;
  var e = rounded.exponent;

  // append zeros if needed
  if (c.length < precision) {
    c = c.concat(zeros(precision - c.length));
  }

  // format as `C.CCCe+EEE` or `C.CCCe-EEE`
  var first = c.shift();
  return rounded.sign + first + (c.length > 0 ? ('.' + c.join('')) : '') +
      'e' + (e >= 0 ? '+' : '') + e;
}

/**
 * Format a number with a certain precision
 * @param {number | string} value
 * @param {number} [precision=undefined] Optional number of digits.
 * @param {{lower: number | undefined, upper: number | undefined}} [options]
 *                                       By default:
 *                                         lower = 1e-3 (excl)
 *                                         upper = 1e+5 (incl)
 * @return {string}
 */
exports.toPrecision = function (value, precision, options) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  // determine lower and upper bound for exponential notation.
  var lower = (options && options.lower !== undefined) ? options.lower : 1e-3;
  var upper = (options && options.upper !== undefined) ? options.upper : 1e+5;

  var split = exports.splitNumber(value)
  var abs = Math.abs(Math.pow(10, split.exponent));
  if (abs < lower || abs >= upper) {
    // exponential notation
    return exports.toExponential(value, precision);
  }
  else {
    var rounded = precision ? exports.roundDigits(split, precision) : split;
    var c = rounded.coefficients;
    var e = rounded.exponent;

    // append trailing zeros
    if (c.length < precision) {
      c = c.concat(zeros(precision - c.length));
    }

    // append trailing zeros
    // TODO: simplify the next statement
    c = c.concat(zeros(e - c.length + 1 +
        (c.length < precision ? precision - c.length : 0)));

    // prepend zeros
    c = zeros(-e).concat(c);

    var dot = e > 0 ? e : 0;
    if (dot < c.length - 1) {
      c.splice(dot + 1, 0, '.');
    }

    return rounded.sign + c.join('');
  }
}

/**
 * Round the number of digits of a number *
 * @param {SplitValue} split       A value split with .splitNumber(value)
 * @param {number} precision  A positive integer
 * @return {SplitValue}
 *              Returns an object containing sign, coefficients, and exponent
 *              with rounded digits
 */
exports.roundDigits = function (split, precision) {
  // create a clone
  var rounded = {
    sign: split.sign,
    coefficients: split.coefficients,
    exponent: split.exponent
  }
  var c = rounded.coefficients;

  // prepend zeros if needed
  while (precision <= 0) {
    c.unshift(0);
    rounded.exponent++;
    precision++;
  }

  if (c.length > precision) {
    var removed = c.splice(precision, c.length - precision);

    if (removed[0] >= 5) {
      var i = precision - 1;
      c[i]++;
      while (c[i] === 10) {
        c.pop();
        if (i === 0) {
          c.unshift(0);
          rounded.exponent++;
          i++;
        }
        i--;
        c[i]++;
      }
    }
  }

  return rounded;
};

/**
 * Create an array filled with zeros.
 * @param {number} length
 * @return {Array}
 */
function zeros(length) {
  var arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(0);
  }
  return arr;
}

/**
 * Count the number of significant digits of a number.
 *
 * For example:
 *   2.34 returns 3
 *   0.0034 returns 2
 *   120.5e+30 returns 4
 *
 * @param {number} value
 * @return {number} digits   Number of significant digits
 */
exports.digits = function(value) {
  return value
      .toExponential()
      .replace(/e.*$/, '')          // remove exponential notation
      .replace( /^0\.?0*|\./, '')   // remove decimal point and leading zeros
      .length
};

/**
 * Minimum number added to one that makes the result different than one
 */
exports.DBL_EPSILON = Number.EPSILON || 2.2204460492503130808472633361816E-16;

/**
 * Compares two floating point numbers.
 * @param {number} x          First value to compare
 * @param {number} y          Second value to compare
 * @param {number} [epsilon]  The maximum relative difference between x and y
 *                            If epsilon is undefined or null, the function will
 *                            test whether x and y are exactly equal.
 * @return {boolean} whether the two numbers are nearly equal
*/
exports.nearlyEqual = function(x, y, epsilon) {
  // if epsilon is null or undefined, test whether x and y are exactly equal
  if (epsilon == null) {
    return x == y;
  }

  // use "==" operator, handles infinities
  if (x == y) {
    return true;
  }

  // NaN
  if (isNaN(x) || isNaN(y)) {
    return false;
  }

  // at this point x and y should be finite
  if(isFinite(x) && isFinite(y)) {
    // check numbers are very close, needed when comparing numbers near zero
    var diff = Math.abs(x - y);
    if (diff < exports.DBL_EPSILON) {
      return true;
    }
    else {
      // use relative error
      return diff <= Math.max(Math.abs(x), Math.abs(y)) * epsilon;
    }
  }

  // Infinite and Number or negative Infinite and positive Infinite cases
  return false;
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var latex = __webpack_require__(6);
var stringify = __webpack_require__(1).stringify;
var escape = __webpack_require__(1).escape;
var hasOwnProperty = __webpack_require__(2).hasOwnProperty;
var getSafeProperty = __webpack_require__(5).getSafeProperty;

function factory (type, config, load, typed, math) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * Check whether some name is a valueless unit like "inch".
   * @param {string} name
   * @return {boolean}
   */
  function isValuelessUnit (name) {
    return type.Unit ? type.Unit.isValuelessUnit(name) : false;
  }

  /**
   * @constructor SymbolNode
   * @extends {Node}
   * A symbol node can hold and resolve a symbol
   * @param {string} name
   * @extends {Node}
   */
  function SymbolNode(name) {
    if (!(this instanceof SymbolNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // validate input
    if (typeof name !== 'string')  throw new TypeError('String expected for parameter "name"');

    this.name = name;
  }

  SymbolNode.prototype = new Node();

  SymbolNode.prototype.type = 'SymbolNode';

  SymbolNode.prototype.isSymbolNode = true;

  /**
   * Compile the node to javascript code
   * @param {SymbolNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileSymbolNode(node, defs, args) {
    if (!(node instanceof SymbolNode)) {
      throw new TypeError('No valid SymbolNode')
    }

    // add a function to the definitions
    defs['undef'] = undef;
    defs['Unit'] = type.Unit;
    defs.getSafeProperty = getSafeProperty;
    defs.hasOwnProperty = hasOwnProperty;

    var jsName = stringify(node.name); // escaped node name inside double quotes

    if (hasOwnProperty(args, node.name)) {
      // this is a FunctionAssignment argument
      // (like an x when inside the expression of a function assignment `f(x) = ...`)
      return args[node.name];
    }
    else if (node.name in defs.math) {
      return '(' + jsName + ' in scope ' +
          '? getSafeProperty(scope, ' + jsName + ') ' +
          ': getSafeProperty(math, ' + jsName + '))';
    }
    else {
      return '(' +
          jsName + ' in scope ' +
          '? getSafeProperty(scope, ' + jsName + ') ' +
          ': ' + (isValuelessUnit(node.name)
              ? 'new Unit(null, ' + jsName + ')'
              : 'undef(' + jsName + ')') +
          ')';
    }
  }

  // register the compile function
  register(SymbolNode.prototype.type, compileSymbolNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  SymbolNode.prototype.forEach = function (callback) {
    // nothing to do, we don't have childs
  };

  /**
   * Create a new SymbolNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node) : Node} callback
   * @returns {SymbolNode} Returns a clone of the node
   */
  SymbolNode.prototype.map = function (callback) {
    return this.clone();
  };

  /**
   * Throws an error 'Undefined symbol {name}'
   * @param {string} name
   */
  function undef (name) {
    throw new Error('Undefined symbol ' + name);
  }

  /**
   * Create a clone of this node, a shallow copy
   * @return {SymbolNode}
   */
  SymbolNode.prototype.clone = function() {
    return new SymbolNode(this.name);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  SymbolNode.prototype._toString = function(options) {
    return this.name;
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  SymbolNode.prototype.toHTML = function(options) {
	var name = escape(this.name);
	
    if (name == "true" || name == "false") {
	  return '<span class="math-symbol math-boolean">' + name + '</span>';
	}
	else if (name == "i") {
	  return '<span class="math-symbol math-imaginary-symbol">' + name + '</span>';
	}
	else if (name == "Infinity") {
	  return '<span class="math-symbol math-infinity-symbol">' + name + '</span>';
	}
	else if (name == "NaN") {
	  return '<span class="math-symbol math-nan-symbol">' + name + '</span>';
	}
	else if (name == "null") {
	  return '<span class="math-symbol math-null-symbol">' + name + '</span>';
	}
	else if (name == "uninitialized") {
	  return '<span class="math-symbol math-uninitialized-symbol">' + name + '</span>';
	}
	
	return '<span class="math-symbol">' + name + '</span>';
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  SymbolNode.prototype._toTex = function(options) {
    var isUnit = false;
    if ((typeof math[this.name] === 'undefined') && isValuelessUnit(this.name)) {
      isUnit = true;
    }
    var symbol = latex.toSymbol(this.name, isUnit);
    if (symbol[0] === '\\') {
      //no space needed if the symbol starts with '\'
      return symbol;
    }
    //the space prevents symbols from breaking stuff like '\cdot' if it's written right before the symbol
    return ' ' + symbol;
  };

  return SymbolNode;
}

exports.name = 'SymbolNode';
exports.path = 'expression.node';
exports.math = true; // request access to the math namespace as 5th argument of the factory function
exports.factory = factory;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Test whether a value is a BigNumber
 * @param {*} x
 * @return {boolean}
 */
module.exports = function isBigNumber(x) {
  return x && x.constructor.prototype.isBigNumber || false
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine the type of a variable
 *
 *     type(x)
 *
 * The following types are recognized:
 *
 *     'undefined'
 *     'null'
 *     'boolean'
 *     'number'
 *     'string'
 *     'Array'
 *     'Function'
 *     'Date'
 *     'RegExp'
 *     'Object'
 *
 * @param {*} x
 * @return {string} Returns the name of the type. Primitive types are lower case,
 *                  non-primitive types are upper-camel-case.
 *                  For example 'number', 'string', 'Array', 'Date'.
 */
exports.type = function(x) {
  var type = typeof x;

  if (type === 'object') {
    if (x === null)           return 'null';
    if (Array.isArray(x))     return 'Array';
    if (x instanceof Date)    return 'Date';
    if (x instanceof RegExp)  return 'RegExp';
    if (x instanceof Boolean) return 'boolean';
    if (x instanceof Number)  return 'number';
    if (x instanceof String)  return 'string';

    return 'Object';
  }

  if (type === 'function')    return 'Function';

  return type;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Reserved keywords not allowed to use in the parser
module.exports = {
  end: true
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function factory (type, config, load, typed) {
  /**
   * Create a Matrix. The function creates a new `math.type.Matrix` object from
   * an `Array`. A Matrix has utility functions to manipulate the data in the
   * matrix, like getting the size and getting or setting values in the matrix.
   * Supported storage formats are 'dense' and 'sparse'.
   *
   * Syntax:
   *
   *    math.matrix()                         // creates an empty matrix using default storage format (dense).
   *    math.matrix(data)                     // creates a matrix with initial data using default storage format (dense).
   *    math.matrix('dense')                  // creates an empty matrix using the given storage format.
   *    math.matrix(data, 'dense')            // creates a matrix with initial data using the given storage format.
   *    math.matrix(data, 'sparse')           // creates a sparse matrix with initial data.
   *    math.matrix(data, 'sparse', 'number') // creates a sparse matrix with initial data, number data type.
   *
   * Examples:
   *
   *    var m = math.matrix([[1, 2], [3, 4]]);
   *    m.size();                        // Array [2, 2]
   *    m.resize([3, 2], 5);
   *    m.valueOf();                     // Array [[1, 2], [3, 4], [5, 5]]
   *    m.get([1, 0])                    // number 3
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, number, string, unit, sparse
   *
   * @param {Array | Matrix} [data]    A multi dimensional array
   * @param {string} [format]          The Matrix storage format
   *
   * @return {Matrix} The created matrix
   */
  var matrix = typed('matrix', {
    '': function () {
      return _create([]);
    },

    'string': function (format) {
      return _create([], format);
    },
    
    'string, string': function (format, datatype) {
      return _create([], format, datatype);
    },

    'Array': function (data) {
      return _create(data);
    },
      
    'Matrix': function (data) {
      return _create(data, data.storage());
    },
    
    'Array | Matrix, string': _create,
    
    'Array | Matrix, string, string': _create
  });

  matrix.toTex = {
    0: '\\begin{bmatrix}\\end{bmatrix}',
    1: '\\left(${args[0]}\\right)',
    2: '\\left(${args[0]}\\right)'
  };

  return matrix;

  /**
   * Create a new Matrix with given storage format
   * @param {Array} data
   * @param {string} [format]
   * @param {string} [datatype]
   * @returns {Matrix} Returns a new Matrix
   * @private
   */
  function _create(data, format, datatype) {
    // get storage format constructor
    var M = type.Matrix.storage(format || 'default');

    // create instance
    return new M(data, datatype);
  }
}

exports.name = 'matrix';
exports.factory = factory;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Create a syntax error with the message:
 *     'Wrong number of arguments in function <fn> (<count> provided, <min>-<max> expected)'
 * @param {string} fn     Function name
 * @param {number} count  Actual argument count
 * @param {number} min    Minimum required argument count
 * @param {number} [max]  Maximum required argument count
 * @extends Error
 */
function ArgumentsError(fn, count, min, max) {
  if (!(this instanceof ArgumentsError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.fn = fn;
  this.count = count;
  this.min = min;
  this.max = max;

  this.message = 'Wrong number of arguments in function ' + fn +
      ' (' + count + ' provided, ' +
      min + ((max != undefined) ? ('-' + max) : '') + ' expected)';

  this.stack = (new Error()).stack;
}

ArgumentsError.prototype = new Error();
ArgumentsError.prototype.constructor = Error;
ArgumentsError.prototype.name = 'ArgumentsError';
ArgumentsError.prototype.isArgumentsError = true;

module.exports = ArgumentsError;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'e',
  'category': 'Constants',
  'syntax': [
    'e'
  ],
  'description': 'Euler\'s number, the base of the natural logarithm. Approximately equal to 2.71828',
  'examples': [
    'e',
    'e ^ 2',
    'exp(2)',
    'log(e)'
  ],
  'seealso': ['exp']
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'pi',
  'category': 'Constants',
  'syntax': [
    'pi'
  ],
  'description': 'The number pi is a mathematical constant that is the ratio of a circle\'s circumference to its diameter, and is approximately equal to 3.14159',
  'examples': [
    'pi',
    'sin(pi/2)'
  ],
  'seealso': ['tau']
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Execute the callback function element wise for each element in array and any
 * nested array
 * Returns an array with the results
 * @param {Array | Matrix} array
 * @param {Function} callback   The callback is called with two parameters:
 *                              value1 and value2, which contain the current
 *                              element of both arrays.
 * @param {boolean} [skipZeros] Invoke callback function for non-zero values only.
 *
 * @return {Array | Matrix} res
 */
module.exports = function deepMap(array, callback, skipZeros) {
  if (array && (typeof array.map === 'function')) {
    // TODO: replace array.map with a for loop to improve performance
    return array.map(function (x) {
      return deepMap(x, callback, skipZeros);
    });
  }
  else {
    return callback(array);
  }
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(4).map;
var join = __webpack_require__(4).join;
var escape = __webpack_require__(1).escape;

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));
  var RangeNode = load(__webpack_require__(21));
  var SymbolNode = load(__webpack_require__(9));

  var Range = load(__webpack_require__(237));

  var isArray = Array.isArray;

  /**
   * @constructor IndexNode
   * @extends Node
   *
   * Describes a subset of a matrix or an object property.
   * Cannot be used on its own, needs to be used within an AccessorNode or
   * AssignmentNode.
   *
   * @param {Node[]} dimensions
   * @param {boolean} [dotNotation=false]  Optional property describing whether
   *                                       this index was written using dot
   *                                       notation like `a.b`, or using bracket
   *                                       notation like `a["b"]` (default).
   *                                       Used to stringify an IndexNode.
   */
  function IndexNode(dimensions, dotNotation) {
    if (!(this instanceof IndexNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.dimensions = dimensions;
    this.dotNotation = dotNotation || false;

    // validate input
    if (!isArray(dimensions) || !dimensions.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected for parameter "dimensions"');
    }
    if (this.dotNotation && !this.isObjectProperty()) {
      throw new Error('dotNotation only applicable for object properties');
    }

    // TODO: deprecated since v3, remove some day
    var deprecated = function () {
      throw new Error('Property `IndexNode.object` is deprecated, use `IndexNode.fn` instead');
    };
    Object.defineProperty(this, 'object', { get: deprecated, set: deprecated });
  }

  IndexNode.prototype = new Node();

  IndexNode.prototype.type = 'IndexNode';

  IndexNode.prototype.isIndexNode = true;

  /**
   * Compile all range nodes
   *
   * When some of the dimensions has `end` defined, the IndexNode requires
   * a variable `size` to be defined in the current closure, and must contain
   * the size of the matrix that's being handled. To check whether the `size`
   * variable is needed, call IndexNode.needsSize().
   *
   * @param {IndexNode} node        The node to be compiled
   * @param {Object} defs           Object which can be used to define functions
   *                                or constants globally available for the
   *                                compiled expression
   * @param {Object} args           Object with local function arguments, the key is
   *                                the name of the argument, and the value is `true`.
   *                                The object may not be mutated, but must be
   *                                extended instead.
   * @return {string} code
   */
  function compileIndexNode(node, defs, args) {
    if (!(node instanceof IndexNode)) {
      throw new TypeError('No valid IndexNode')
    }

    // args can be mutated by IndexNode, when dimensions use `end`
    var childArgs = Object.create(args);

    // helper function to create a Range from start, step and end
    defs.range = function (start, end, step) {
      return new Range(
          type.isBigNumber(start) ? start.toNumber() : start,
          type.isBigNumber(end)   ? end.toNumber()   : end,
          type.isBigNumber(step)  ? step.toNumber()  : step
      );
    };

    // TODO: implement support for bignumber (currently bignumbers are silently
    //       reduced to numbers when changing the value to zero-based)

    // TODO: Optimization: when the range values are ConstantNodes,
    //       we can beforehand resolve the zero-based value

    // optimization for a simple object property
    var dimensions = map(node.dimensions, function (range, i) {
      if (type.isRangeNode(range)) {
        if (range.needsEnd()) {
          childArgs.end = 'end';

          // resolve end and create range
          return '(function () {' +
              'var end = size[' + i + ']; ' +
              'return range(' +
              compile(range.start, defs, childArgs) + ', ' +
              compile(range.end, defs, childArgs) + ', ' +
              (range.step ? compile(range.step, defs, childArgs) : '1') +
              '); ' +
              '})()';
        }
        else {
          // create range
          return 'range(' +
              compile(range.start, defs, childArgs) + ', ' +
              compile(range.end, defs, childArgs) + ', ' +
              (range.step ? compile(range.step, defs, childArgs) : '1') +
              ')';
        }
      }
      if (type.isSymbolNode(range) && range.name === 'end') {
        childArgs.end = 'end';

        // resolve the parameter 'end'
        return '(function () {' +
            'var end = size[' + i + ']; ' +
            'return ' + compile(range, defs, childArgs) + '; ' +
            '})()'
      }
      else { // ConstantNode
        return compile(range, defs, childArgs);
      }
    });

    return 'math.index(' + join(dimensions, ', ') + ')';
  }

  // register the compile function
  register(IndexNode.prototype.type, compileIndexNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  IndexNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.dimensions.length; i++) {
      callback(this.dimensions[i], 'dimensions[' + i + ']', this);
    }
  };

  /**
   * Create a new IndexNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {IndexNode} Returns a transformed copy of the node
   */
  IndexNode.prototype.map = function (callback) {
    var dimensions = [];
    for (var i = 0; i < this.dimensions.length; i++) {
      dimensions[i] = this._ifNode(callback(this.dimensions[i], 'dimensions[' + i + ']', this));
    }

    return new IndexNode(dimensions);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {IndexNode}
   */
  IndexNode.prototype.clone = function () {
    return new IndexNode(this.dimensions.slice(0));
  };

  /**
   * Test whether this IndexNode contains a single property name
   * @return {boolean}
   */
  IndexNode.prototype.isObjectProperty = function () {
    return this.dimensions.length === 1 &&
        type.isConstantNode(this.dimensions[0]) &&
        this.dimensions[0].valueType === 'string';
  };

  /**
   * Returns the property name if IndexNode contains a property.
   * If not, returns null.
   * @return {string | null}
   */
  IndexNode.prototype.getObjectProperty = function () {
    return this.isObjectProperty() ? this.dimensions[0].value : null;
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */
  IndexNode.prototype._toString = function (options) {
    // format the parameters like "[1, 0:5]"
    return this.dotNotation
        ? ('.' + this.getObjectProperty())
        : ('[' + this.dimensions.join(', ') + ']');
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */
  IndexNode.prototype.toHTML = function (options) {
    // format the parameters like "[1, 0:5]"
	var dimensions = []
	for (var i=0; i<this.dimensions.length; i++)	{
	  dimensions[i] = this.dimensions[i].toHTML();
	}
	if (this.dotNotation) {
	  return '<span class="math-operator math-accessor-operator">.</span>' + '<span class="math-symbol math-property">' + escape(this.getObjectProperty()) + '</span>';}
	else {
	  return '<span class="math-parenthesis math-square-parenthesis">[</span>' + dimensions.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>'}
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  IndexNode.prototype._toTex = function (options) {
    var dimensions = this.dimensions.map(function (range) {
      return range.toTex(options);
    });

    return this.dotNotation
        ? ('.' + this.getObjectProperty() + '')
        : ('_{' + dimensions.join(',') + '}');
  };

  /**
   * Test whether this IndexNode needs the object size, size of the Matrix
   * @return {boolean}
   */
  IndexNode.prototype.needsSize = function () {
    return this.dimensions.some(function (range) {
      return (type.isRangeNode(range) && range.needsEnd()) ||
          (type.isSymbolNode(range) && range.name === 'end');
    });
  };

  return IndexNode;
}

exports.name = 'IndexNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Create a range error with the message:
 *     'Dimension mismatch (<actual size> != <expected size>)'
 * @param {number | number[]} actual        The actual size
 * @param {number | number[]} expected      The expected size
 * @param {string} [relation='!=']          Optional relation between actual
 *                                          and expected size: '!=', '<', etc.
 * @extends RangeError
 */
function DimensionError(actual, expected, relation) {
  if (!(this instanceof DimensionError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.actual   = actual;
  this.expected = expected;
  this.relation = relation;

  this.message = 'Dimension mismatch (' +
      (Array.isArray(actual) ? ('[' + actual.join(', ') + ']') : actual) +
      ' ' + (this.relation || '!=') + ' ' +
      (Array.isArray(expected) ? ('[' + expected.join(', ') + ']') : expected) +
      ')';

  this.stack = (new Error()).stack;
}

DimensionError.prototype = new RangeError();
DimensionError.prototype.constructor = RangeError;
DimensionError.prototype.name = 'DimensionError';
DimensionError.prototype.isDimensionError = true;

module.exports = DimensionError;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Create a range error with the message:
 *     'Index out of range (index < min)'
 *     'Index out of range (index < max)'
 *
 * @param {number} index     The actual index
 * @param {number} [min=0]   Minimum index (included)
 * @param {number} [max]     Maximum index (excluded)
 * @extends RangeError
 */
function IndexError(index, min, max) {
  if (!(this instanceof IndexError)) {
    throw new SyntaxError('Constructor must be called with the new operator');
  }

  this.index = index;
  if (arguments.length < 3) {
    this.min = 0;
    this.max = min;
  }
  else {
    this.min = min;
    this.max = max;
  }

  if (this.min !== undefined && this.index < this.min) {
    this.message = 'Index out of range (' + this.index + ' < ' + this.min + ')';
  }
  else if (this.max !== undefined && this.index >= this.max) {
    this.message = 'Index out of range (' + this.index + ' > ' + (this.max - 1) + ')';
  }
  else {
    this.message = 'Index out of range (' + this.index + ')';
  }

  this.stack = (new Error()).stack;
}

IndexError.prototype = new RangeError();
IndexError.prototype.constructor = RangeError;
IndexError.prototype.name = 'IndexError';
IndexError.prototype.isIndexError = true;

module.exports = IndexError;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var operators = __webpack_require__(7);

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * @constructor RangeNode
   * @extends {Node}
   * create a range
   * @param {Node} start  included lower-bound
   * @param {Node} end    included upper-bound
   * @param {Node} [step] optional step
   */
  function RangeNode(start, end, step) {
    if (!(this instanceof RangeNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // validate inputs
    if (!type.isNode(start)) throw new TypeError('Node expected');
    if (!type.isNode(end)) throw new TypeError('Node expected');
    if (step && !type.isNode(step)) throw new TypeError('Node expected');
    if (arguments.length > 3) throw new Error('Too many arguments');

    this.start = start;         // included lower-bound
    this.end = end;           // included upper-bound
    this.step = step || null;  // optional step
  }

  RangeNode.prototype = new Node();

  RangeNode.prototype.type = 'RangeNode';

  RangeNode.prototype.isRangeNode = true;

  /**
   * Check whether the RangeNode needs the `end` symbol to be defined.
   * This end is the size of the Matrix in current dimension.
   * @return {boolean}
   */
  RangeNode.prototype.needsEnd = function () {
    // find all `end` symbols in this RangeNode
    var endSymbols = this.filter(function (node) {
      return type.isSymbolNode(node) && (node.name === 'end');
    });

    return endSymbols.length > 0;
  };

  /**
   * Compile the node to javascript code
   *
   * When the range has a symbol `end` defined, the RangeNode requires
   * a variable `end` to be defined in the current closure, which must contain
   * the length of the of the matrix that's being handled in the range's
   * dimension. To check whether the `end` variable is needed, call
   * RangeNode.needsEnd().
   *
   * @param {RangeNode} node  The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileRangeNode(node, defs, args) {
    if (!(node instanceof RangeNode)) {
      throw new TypeError('No valid RangeNode')
    }

    return 'math.range(' +
        compile(node.start, defs, args) + ', ' +
        compile(node.end, defs, args) +
        (node.step ? (', ' + compile(node.step, defs, args)) : '') +
        ')';
  }

  // register the compile function
  register(RangeNode.prototype.type, compileRangeNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  RangeNode.prototype.forEach = function (callback) {
    callback(this.start, 'start', this);
    callback(this.end, 'end', this);
    if (this.step) {
      callback(this.step, 'step', this);
    }
  };

  /**
   * Create a new RangeNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {RangeNode} Returns a transformed copy of the node
   */
  RangeNode.prototype.map = function (callback) {
    return new RangeNode(
        this._ifNode(callback(this.start, 'start', this)),
        this._ifNode(callback(this.end, 'end', this)),
        this.step && this._ifNode(callback(this.step, 'step', this))
    );
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {RangeNode}
   */
  RangeNode.prototype.clone = function () {
    return new RangeNode(this.start, this.end, this.step && this.step);
  };

  /**
   * Calculate the necessary parentheses
   * @param {Node} node
   * @param {string} parenthesis
   * @return {Object} parentheses
   * @private
   */
  function calculateNecessaryParentheses(node, parenthesis) {
    var precedence = operators.getPrecedence(node, parenthesis);
    var parens = {};

    var startPrecedence = operators.getPrecedence(node.start, parenthesis);
    parens.start = ((startPrecedence !== null) && (startPrecedence <= precedence))
      || (parenthesis === 'all');

    if (node.step) {
      var stepPrecedence = operators.getPrecedence(node.step, parenthesis);
      parens.step = ((stepPrecedence !== null) && (stepPrecedence <= precedence))
        || (parenthesis === 'all');
    }

    var endPrecedence = operators.getPrecedence(node.end, parenthesis);
    parens.end = ((endPrecedence !== null) && (endPrecedence <= precedence))
      || (parenthesis === 'all');

    return parens;
  }

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */
  RangeNode.prototype._toString = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis);

    //format string as start:step:stop
    var str;

    var start = this.start.toString(options);
    if (parens.start) {
      start = '(' + start + ')';
    }
    str = start;

    if (this.step) {
      var step = this.step.toString(options);
      if (parens.step) {
        step = '(' + step + ')';
      }
      str += ':' + step;
    }

    var end = this.end.toString(options);
    if (parens.end) {
      end = '(' + end + ')';
    }
    str += ':' + end;

    return str;
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */
  RangeNode.prototype.toHTML = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis);

    //format string as start:step:stop
    var str;

    var start = this.start.toHTML(options);
    if (parens.start) {
      start = '<span class="math-parenthesis math-round-parenthesis">(</span>' + start + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    str = start;

    if (this.step) {
      var step = this.step.toHTML(options);
      if (parens.step) {
        step = '<span class="math-parenthesis math-round-parenthesis">(</span>' + step + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      str += '<span class="math-operator math-range-operator">:</span>' + step;
    }

    var end = this.end.toHTML(options);
    if (parens.end) {
      end = '<span class="math-parenthesis math-round-parenthesis">(</span>' + end + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    str += '<span class="math-operator math-range-operator">:</span>' + end;

    return str;
  };

  /**
   * Get LaTeX representation
   * @params {Object} options
   * @return {string} str
   */
  RangeNode.prototype._toTex = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis);

    var str = this.start.toTex(options);
    if (parens.start) {
      str = '\\left(' + str + '\\right)';
    }

    if (this.step) {
      var step = this.step.toTex(options);
      if (parens.step) {
        step = '\\left(' + step + '\\right)';
      }
      str += ':' + step;
    }

    var end = this.end.toTex(options);
    if (parens.end) {
      end = '\\left(' + end + '\\right)';
    }
    str += ':' + end;

    return str;
  };

  return RangeNode;
}

exports.name = 'RangeNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var errorTransform = __webpack_require__(23).transform;
var getSafeProperty = __webpack_require__(5).getSafeProperty;

function factory (type, config, load, typed) {
  var subset = load(__webpack_require__(24));

  /**
   * Retrieve part of an object:
   *
   * - Retrieve a property from an object
   * - Retrieve a part of a string
   * - Retrieve a matrix subset
   *
   * @param {Object | Array | Matrix | string} object
   * @param {Index} index
   * @return {Object | Array | Matrix | string} Returns the subset
   */
  return function access(object, index) {
    try {
      if (Array.isArray(object)) {
        return subset(object, index);
      }
      else if (object && typeof object.subset === 'function') { // Matrix
        return object.subset(index);
      }
      else if (typeof object === 'string') {
        // TODO: move getStringSubset into a separate util file, use that
        return subset(object, index);
      }
      else if (typeof object === 'object') {
        if (!index.isObjectProperty()) {
          throw new TypeError('Cannot apply a numeric index as object property');
        }

        return getSafeProperty(object, index.getObjectProperty());
      }
      else {
        throw new TypeError('Cannot apply index: unsupported type of object');
      }
    }
    catch (err) {
      throw errorTransform(err);
    }
  }
}

exports.factory = factory;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var IndexError = __webpack_require__(20);

/**
 * Transform zero-based indices to one-based indices in errors
 * @param {Error} err
 * @returns {Error} Returns the transformed error
 */
exports.transform = function (err) {
  if (err && err.isIndexError) {
    return new IndexError(
        err.index + 1,
        err.min + 1,
        err.max !== undefined ? err.max + 1 : undefined);
  }

  return err;
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var clone = __webpack_require__(2).clone;
var validateIndex = __webpack_require__(4).validateIndex;
var getSafeProperty = __webpack_require__(5).getSafeProperty;
var setSafeProperty = __webpack_require__(5).setSafeProperty;
var DimensionError = __webpack_require__(19);

function factory (type, config, load, typed) {
  var matrix = load(__webpack_require__(13));

  /**
   * Get or set a subset of a matrix or string.
   *
   * Syntax:
   *     math.subset(value, index)                                // retrieve a subset
   *     math.subset(value, index, replacement [, defaultValue])  // replace a subset
   *
   * Examples:
   *
   *     // get a subset
   *     var d = [[1, 2], [3, 4]];
   *     math.subset(d, math.index(1, 0));        // returns 3
   *     math.subset(d, math.index([0, 2], 1));   // returns [[2], [4]]
   *
   *     // replace a subset
   *     var e = [];
   *     var f = math.subset(e, math.index(0, [0, 2]), [5, 6]);  // f = [[5, 6]]
   *     var g = math.subset(f, math.index(1, 1), 7, 0);         // g = [[5, 6], [0, 7]]
   *
   * See also:
   *
   *     size, resize, squeeze, index
   *
   * @param {Array | Matrix | string} matrix  An array, matrix, or string
   * @param {Index} index                     An index containing ranges for each
   *                                          dimension
   * @param {*} [replacement]                 An array, matrix, or scalar.
   *                                          If provided, the subset is replaced with replacement.
   *                                          If not provided, the subset is returned
   * @param {*} [defaultValue=undefined]      Default value, filled in on new entries when
   *                                          the matrix is resized. If not provided,
   *                                          math.matrix elements will be left undefined.
   * @return {Array | Matrix | string} Either the retrieved subset or the updated matrix.
   */
  var subset = typed('subset', {
    // get subset
    'Array, Index': function (value, index) {
      var m = matrix(value);
      var subset = m.subset(index);       // returns a Matrix
      return index.isScalar()
          ? subset
          : subset.valueOf();  // return an Array (like the input)
    },

    'Matrix, Index': function (value, index) {
      return value.subset(index);
    },

    'Object, Index': _getObjectProperty,

    'string, Index': _getSubstring,

    // set subset
    'Array, Index, any': function (value, index, replacement) {
      return matrix(clone(value))
          .subset(index, replacement, undefined)
          .valueOf();
    },

    'Array, Index, any, any': function (value, index, replacement, defaultValue) {
      return matrix(clone(value))
          .subset(index, replacement, defaultValue)
          .valueOf();
    },

    'Matrix, Index, any': function (value, index, replacement) {
      return value.clone().subset(index, replacement);
    },

    'Matrix, Index, any, any': function (value, index, replacement, defaultValue) {
      return value.clone().subset(index, replacement, defaultValue);
    },

    'string, Index, string': _setSubstring,
    'string, Index, string, string': _setSubstring,
    'Object, Index, any': _setObjectProperty
  });

  subset.toTex = undefined; // use default template

  return subset;

  /**
   * Retrieve a subset of a string
   * @param {string} str            string from which to get a substring
   * @param {Index} index           An index containing ranges for each dimension
   * @returns {string} substring
   * @private
   */
  function _getSubstring(str, index) {
    if (!type.isIndex(index)) {
      // TODO: better error message
      throw new TypeError('Index expected');
    }
    if (index.size().length != 1) {
      throw new DimensionError(index.size().length, 1);
    }

    // validate whether the range is out of range
    var strLen = str.length;
    validateIndex(index.min()[0], strLen);
    validateIndex(index.max()[0], strLen);

    var range = index.dimension(0);

    var substr = '';
    range.forEach(function (v) {
      substr += str.charAt(v);
    });

    return substr;
  }

  /**
   * Replace a substring in a string
   * @param {string} str            string to be replaced
   * @param {Index} index           An index containing ranges for each dimension
   * @param {string} replacement    Replacement string
   * @param {string} [defaultValue] Default value to be uses when resizing
   *                                the string. is ' ' by default
   * @returns {string} result
   * @private
   */
  function _setSubstring(str, index, replacement, defaultValue) {
    if (!index || index.isIndex !== true) {
      // TODO: better error message
      throw new TypeError('Index expected');
    }
    if (index.size().length != 1) {
      throw new DimensionError(index.size().length, 1);
    }
    if (defaultValue !== undefined) {
      if (typeof defaultValue !== 'string' || defaultValue.length !== 1) {
        throw new TypeError('Single character expected as defaultValue');
      }
    }
    else {
      defaultValue = ' ';
    }

    var range = index.dimension(0);
    var len = range.size()[0];

    if (len != replacement.length) {
      throw new DimensionError(range.size()[0], replacement.length);
    }

    // validate whether the range is out of range
    var strLen = str.length;
    validateIndex(index.min()[0]);
    validateIndex(index.max()[0]);

    // copy the string into an array with characters
    var chars = [];
    for (var i = 0; i < strLen; i++) {
      chars[i] = str.charAt(i);
    }

    range.forEach(function (v, i) {
      chars[v] = replacement.charAt(i[0]);
    });

    // initialize undefined characters with a space
    if (chars.length > strLen) {
      for (i = strLen - 1, len = chars.length; i < len; i++) {
        if (!chars[i]) {
          chars[i] = defaultValue;
        }
      }
    }

    return chars.join('');
  }
}

/**
 * Retrieve a property from an object
 * @param {Object} object
 * @param {Index} index
 * @return {*} Returns the value of the property
 * @private
 */
function _getObjectProperty (object, index) {
  if (index.size().length !== 1) {
    throw new DimensionError(index.size(), 1);
  }

  var key = index.dimension(0);
  if (typeof key !== 'string') {
    throw new TypeError('String expected as index to retrieve an object property');
  }

  return getSafeProperty(object, key);
}

/**
 * Set a property on an object
 * @param {Object} object
 * @param {Index} index
 * @param {*} replacement
 * @return {*} Returns the updated object
 * @private
 */
function _setObjectProperty (object, index, replacement) {
  if (index.size().length !== 1) {
    throw new DimensionError(index.size(), 1);
  }

  var key = index.dimension(0);
  if (typeof key !== 'string') {
    throw new TypeError('String expected as index to retrieve an object property');
  }

  // clone the object, and apply the property to the clone
  var updated = clone(object);
  setSafeProperty(updated, key, replacement);

  return updated;
}

exports.name = 'subset';
exports.factory = factory;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(4).map;
var join = __webpack_require__(4).join;

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * @constructor ArrayNode
   * @extends {Node}
   * Holds an 1-dimensional array with items
   * @param {Node[]} [items]   1 dimensional array with items
   */
  function ArrayNode(items) {
    if (!(this instanceof ArrayNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.items = items || [];

    // validate input
    if (!Array.isArray(this.items) || !this.items.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected');
    }

    // TODO: deprecated since v3, remove some day
    var deprecated = function () {
      throw new Error('Property `ArrayNode.nodes` is deprecated, use `ArrayNode.items` instead');
    };
    Object.defineProperty(this, 'nodes', { get: deprecated, set: deprecated });
  }

  ArrayNode.prototype = new Node();

  ArrayNode.prototype.type = 'ArrayNode';

  ArrayNode.prototype.isArrayNode = true;

  /**
   * Compile the node to javascript code
   * @param {ArrayNode} node  Node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @private
   */
  function compileArrayNode(node, defs, args) {
    if (!(node instanceof ArrayNode)) {
      throw new TypeError('No valid ArrayNode')
    }

    var asMatrix = (defs.math.config().matrix !== 'Array');

    var items = map(node.items, function (item) {
      return compile(item, defs, args);
    });

    return (asMatrix ? 'math.matrix([' : '[') +
        join(items, ',') +
        (asMatrix ? '])' : ']');
  }

  // register the compile function
  register(ArrayNode.prototype.type, compileArrayNode);

      /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  ArrayNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.items.length; i++) {
      var node = this.items[i];
      callback(node, 'items[' + i + ']', this);
    }
  };

  /**
   * Create a new ArrayNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {ArrayNode} Returns a transformed copy of the node
   */
  ArrayNode.prototype.map = function (callback) {
    var items = [];
    for (var i = 0; i < this.items.length; i++) {
      items[i] = this._ifNode(callback(this.items[i], 'items[' + i + ']', this));
    }
    return new ArrayNode(items);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {ArrayNode}
   */
  ArrayNode.prototype.clone = function() {
    return new ArrayNode(this.items.slice(0));
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  ArrayNode.prototype._toString = function(options) {
    var items = this.items.map(function (node) {
      return node.toString(options);
    });
    return '[' + items.join(', ') + ']';
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  ArrayNode.prototype.toHTML = function(options) {
    var items = this.items.map(function (node) {
      return node.toHTML(options);
    });
    return '<span class="math-parenthesis math-square-parenthesis">[</span>' + items.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-square-parenthesis">]</span>';
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  ArrayNode.prototype._toTex = function(options) {
    var s = '\\begin{bmatrix}';

    this.items.forEach(function(node) {
      if (node.items) {
        s += node.items.map(function(childNode) {
          return childNode.toTex(options);
        }).join('&');
      }
      else {
        s += node.toTex(options);
      }

      // new line
      s += '\\\\';
    });
    s += '\\end{bmatrix}';
    return s;
  };

  return ArrayNode;
}

exports.name = 'ArrayNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getType = __webpack_require__(11).type;
var stringify = __webpack_require__(1).stringify;
var escape = __webpack_require__(1).escape;

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * A ConstantNode holds a constant value like a number or string. A ConstantNode
   * stores a stringified version of the value and uses this to compile to
   * JavaScript.
   *
   * In case of a stringified number as input, this may be compiled to a BigNumber
   * when the math instance is configured for BigNumbers.
   *
   * Usage:
   *
   *     // stringified values with type
   *     new ConstantNode('2.3', 'number');
   *     new ConstantNode('true', 'boolean');
   *     new ConstantNode('hello', 'string');
   *
   *     // non-stringified values, type will be automatically detected
   *     new ConstantNode(2.3);
   *     new ConstantNode('hello');
   *
   * @param {string | number | boolean | null | undefined} value
   *                            When valueType is provided, value must contain
   *                            an uninterpreted string representing the value.
   *                            When valueType is undefined, value can be a
   *                            number, string, boolean, null, or undefined, and
   *                            the type will be determined automatically.
   * @param {string} [valueType]  The type of value. Choose from 'number', 'string',
   *                              'boolean', 'undefined', 'null'
   * @constructor ConstantNode
   * @extends {Node}
   */
  function ConstantNode(value, valueType) {
    if (!(this instanceof ConstantNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (valueType) {
      if (typeof valueType !== 'string') {
        throw new TypeError('String expected for parameter "valueType"');
      }
      if (typeof value !== 'string') {
        throw new TypeError('String expected for parameter "value"');
      }

      this.value = value;
      this.valueType = valueType;
    }
    else {
      // stringify the value and determine the type
      this.value = value + '';
      this.valueType = getType(value);
    }

    if (!SUPPORTED_TYPES[this.valueType]) {
      throw new TypeError('Unsupported type of value "' + this.valueType + '"');
    }
  }

  var SUPPORTED_TYPES = {
    'number': true,
    'string': true,
    'boolean': true,
    'undefined': true,
    'null': true
  };

  ConstantNode.prototype = new Node();

  ConstantNode.prototype.type = 'ConstantNode';

  ConstantNode.prototype.isConstantNode = true;

  /**
   * Compile the node to javascript code
   * @param {ConstantNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileConstantNode(node, defs, args) {
    if (!(node instanceof ConstantNode)) {
      throw new TypeError('No valid ConstantNode')
    }

    switch (node.valueType) {
      case 'number':
        if (config.number === 'BigNumber') {
          return 'math.bignumber(' + stringify(node.value) + ')';
        }
        else if (config.number === 'Fraction') {
          return 'math.fraction(' + stringify(node.value) + ')';
        }
        else {
          // remove leading zeros like '003.2' which are not allowed by JavaScript
          validateNumericValue(node.value);
          return node.value.replace(/^(0*)[0-9]/, function (match, zeros) {
            return match.substring(zeros.length);
          });
        }

      case 'string':
        // Important to escape unescaped double quotes in the string
        return stringify(node.value);

      case 'boolean':
        // prevent invalid values
        return String(node.value) === 'true' ? 'true' : 'false';

      case 'undefined':
        return 'undefined';

      case 'null':
        return 'null';

      default:
        // TODO: move this error to the constructor?
        throw new TypeError('Unsupported type of constant "' + node.valueType + '"');
    }
  }

  /**
   * Test whether value is a string containing a numeric value
   * @param {String} value
   * @return {boolean} Returns true when ok
   */
  function validateNumericValue (value) {
    // The following regexp is relatively permissive
    if (typeof value !== 'string' ||
        !/^[\-+]?((\d+\.?\d*)|(\d*\.?\d+))([eE][+\-]?\d+)?$/.test(value)) {
      throw new Error('Invalid numeric value "' + value + '"');
    }
  }

  // register the compile function
  register(ConstantNode.prototype.type, compileConstantNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  ConstantNode.prototype.forEach = function (callback) {
    // nothing to do, we don't have childs
  };


  /**
   * Create a new ConstantNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node) : Node} callback
   * @returns {ConstantNode} Returns a clone of the node
   */
  ConstantNode.prototype.map = function (callback) {
    return this.clone();
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {ConstantNode}
   */
  ConstantNode.prototype.clone = function () {
    return new ConstantNode(this.value, this.valueType);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */
  ConstantNode.prototype._toString = function (options) {
    switch (this.valueType) {
      case 'string':
        return stringify(this.value);

      default:
        return this.value;
    }
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */
  ConstantNode.prototype.toHTML = function (options) {
	var value = escape(this.value);
    switch (this.valueType) {
	  case 'number':
	    return '<span class="math-number">' + value + '</span>';
      case 'string':
	    return '<span class="math-string">' + value + '</span>';
      case 'boolean':
	    return '<span class="math-boolean">' + value + '</span>';
      case 'null':
	    return '<span class="math-null-symbol">' + value + '</span>';
      case 'undefined':
	    return '<span class="math-undefined">' + value + '</span>';

      default:
        return '<span class="math-symbol">' + value + '</span>';
    }
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  ConstantNode.prototype._toTex = function (options) {
    var value = this.value,
        index;
    switch (this.valueType) {
      case 'string':
        return '\\mathtt{' + stringify(value) + '}';

      case 'number':
        index = value.toLowerCase().indexOf('e');
        if (index !== -1) {
          return value.substring(0, index) + '\\cdot10^{' +
              value.substring(index + 1) + '}';
        }
        return value;

      default:
        return value;
    }
  };

  return ConstantNode;
}

exports.name = 'ConstantNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/**
 * Get a unique name for an argument name to store in defs
 * @param {Object} defs
 * @return {string} A string like 'arg1', 'arg2', ...
 * @private
 */
function getUniqueArgumentName (defs) {
  return 'arg' + Object.keys(defs).length
}

module.exports = getUniqueArgumentName;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var latex = __webpack_require__(6);
var stringify = __webpack_require__(1).stringify;
var escape = __webpack_require__(1).escape;
var extend = __webpack_require__(2).extend;
var hasOwnProperty = __webpack_require__(2).hasOwnProperty;
var map = __webpack_require__(4).map;
var join = __webpack_require__(4).join;
var validateSafeMethod = __webpack_require__(5).validateSafeMethod;
var getUniqueArgumentName = __webpack_require__(27);

function factory (type, config, load, typed, math) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));
  var SymbolNode = load(__webpack_require__(9));

  /**
   * @constructor FunctionNode
   * @extends {./Node}
   * invoke a list with arguments on a node
   * @param {./Node | string} fn Node resolving with a function on which to invoke
   *                             the arguments, typically a SymboNode or AccessorNode
   * @param {./Node[]} args
   */
  function FunctionNode(fn, args) {
    if (!(this instanceof FunctionNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (typeof fn === 'string') {
      fn = new SymbolNode(fn);
    }

    // validate input
    if (!type.isNode(fn)) throw new TypeError('Node expected as parameter "fn"');
    if (!Array.isArray(args) || !args.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected for parameter "args"');
    }

    this.fn = fn;
    this.args = args || [];

    // readonly property name
    Object.defineProperty(this, 'name', {
      get: function () {
        return this.fn.name || '';
      }.bind(this),
      set: function () {
        throw new Error('Cannot assign a new name, name is read-only');
      }
    });

    // TODO: deprecated since v3, remove some day
    var deprecated = function () {
      throw new Error('Property `FunctionNode.object` is deprecated, use `FunctionNode.fn` instead');
    };
    Object.defineProperty(this, 'object', { get: deprecated, set: deprecated });
  }

  FunctionNode.prototype = new Node();

  FunctionNode.prototype.type = 'FunctionNode';

  FunctionNode.prototype.isFunctionNode = true;

  /**
   * Compile the node to javascript code
   * @param {FunctionNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileFunctionNode(node, defs, args) {
    if (!(node instanceof FunctionNode)) {
      throw new TypeError('No valid FunctionNode')
    }

    // compile fn and arguments
    var jsFn = compile(node.fn, defs, args);
    var jsArgs = map(node.args, function (arg) {
      return compile(arg, defs, args);
    });
    var jsScope = compileScope(defs, args);
    var argsName;

    if (type.isSymbolNode(node.fn)) {
      // we can statically determine whether the function has an rawArgs property
      var name = node.fn.name;
      var fn = hasOwnProperty(defs.math, name) ? defs.math[name] : undefined;
      var isRaw = (typeof fn === 'function') && (fn.rawArgs == true);

      if (isRaw) {
        // pass unevaluated parameters (nodes) to the function
        argsName = getUniqueArgumentName(defs);
        defs[argsName] = node.args;

        return jsFn + '(' + argsName + ', math, ' + jsScope + ')'; // "raw" evaluation
      }
      else {
        return jsFn + '(' + join(jsArgs, ', ') + ')';              // "regular" evaluation
      }
    }
    else if (type.isAccessorNode(node.fn) &&
        type.isIndexNode(node.fn.index) && node.fn.index.isObjectProperty()) {
      // execute the function with the right context: the object of the AccessorNode
      argsName = getUniqueArgumentName(defs);
      defs[argsName] = node.args;
      defs.validateSafeMethod = validateSafeMethod

      var jsObject = compile(node.fn.object, defs, args);
      var jsProp = stringify(node.fn.index.getObjectProperty());

      return '(function () {' +
          'var object = ' + jsObject + ';' +
          'validateSafeMethod(object, ' + jsProp + ');' +
          'return (object[' + jsProp + '] && object[' + jsProp + '].rawArgs) ' +
          ' ? object[' + jsProp + '](' + argsName + ', math, ' + jsScope + ')' + // "raw" evaluation
          ' : object[' + jsProp + '](' + join(jsArgs, ', ') + ')' +              // "regular" evaluation
          '})()';
    }
    else { // node.fn.isAccessorNode && !node.fn.index.isObjectProperty()
      // we have to dynamically determine whether the function has a rawArgs property
      argsName = getUniqueArgumentName(defs);
      defs[argsName] = node.args;

      return '(function () {' +
          'var fn = ' + jsFn + ';' +
          'return (fn && fn.rawArgs) ' +
          ' ? fn(' + argsName + ', math, ' + jsScope + ')' +  // "raw" evaluation
          ' : fn(' + join(jsArgs, ', ') + ')' +               // "regular" evaluation
          '})()';
    }
  }

  // register the compile function
  register(FunctionNode.prototype.type, compileFunctionNode);

  /**
   * Merge function arguments into scope before passing to the actual function.
   * This is needed when the function has `rawArgs=true`. In that case we have
   * to pass the `scope` as third argument, including any variables of
   * enclosing functions.
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileScope (defs, args) {
    var names = Object.keys(args)
        // .map(function (arg) {
        //   return args[arg];
        // });
    if (names.length === 0) {
      return 'scope';
    }
    else {
      // merge arguments into scope
      defs.extend = extend;

      var jsArgs = map(names, function (name) {
        return stringify(name) + ': ' + args[name];
      });

      return 'extend(extend({}, scope), {' + join(jsArgs, ', ') + '})';
    }
  }

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  FunctionNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.args.length; i++) {
      callback(this.args[i], 'args[' + i + ']', this);
    }
  };

  /**
   * Create a new FunctionNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {FunctionNode} Returns a transformed copy of the node
   */
  FunctionNode.prototype.map = function (callback) {
    var fn = this.fn.map(callback);
    var args = [];
    for (var i = 0; i < this.args.length; i++) {
      args[i] = this._ifNode(callback(this.args[i], 'args[' + i + ']', this));
    }
    return new FunctionNode(fn, args);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {FunctionNode}
   */
  FunctionNode.prototype.clone = function () {
    return new FunctionNode(this.fn, this.args.slice(0));
  };

  //backup Node's toString function
  //@private
  var nodeToString = FunctionNode.prototype.toString;

  /**
   * Get string representation. (wrapper function)
   * This overrides parts of Node's toString function.
   * If callback is an object containing callbacks, it
   * calls the correct callback for the current node,
   * otherwise it falls back to calling Node's toString
   * function.
   *
   * @param {Object} options
   * @return {string} str
   * @override
   */
  FunctionNode.prototype.toString = function (options) {
    var customString;
    var name = this.fn.toString(options);
    if (options && (typeof options.handler === 'object') && hasOwnProperty(options.handler, name)) {
      //callback is a map of callback functions
      customString = options.handler[name](this, options);
    }

    if (typeof customString !== 'undefined') {
      return customString;
    }

    //fall back to Node's toString
    return nodeToString.call(this, options);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */
  FunctionNode.prototype._toString = function (options) {
    var args = this.args.map(function (arg) {
      return arg.toString(options);
    });

    var fn = type.isFunctionAssignmentNode(this.fn)
        ? ('(' + this.fn.toString(options) + ')')
        : this.fn.toString(options)

    // format the arguments like "add(2, 4.2)"
    return fn + '(' + args.join(', ') + ')';
  };
  
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */
  FunctionNode.prototype.toHTML = function (options) {
    var args = this.args.map(function (arg) {
      return arg.toHTML(options);
    });

    // format the arguments like "add(2, 4.2)"
    return '<span class="math-function">' + escape(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + args.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
  };

  /*
   * Expand a LaTeX template
   *
   * @param {string} template
   * @param {Node} node
   * @param {Object} options
   * @private
   **/
  function expandTemplate(template, node, options) {
    var latex = '';

    // Match everything of the form ${identifier} or ${identifier[2]} or $$
    // while submatching identifier and 2 (in the second case)
    var regex = new RegExp('\\$(?:\\{([a-z_][a-z_0-9]*)(?:\\[([0-9]+)\\])?\\}|\\$)', 'ig');

    var inputPos = 0;   //position in the input string
    var match;
    while ((match = regex.exec(template)) !== null) {   //go through all matches
      // add everything in front of the match to the LaTeX string
      latex += template.substring(inputPos, match.index);
      inputPos = match.index;

      if (match[0] === '$$') { // escaped dollar sign
        latex += '$';
        inputPos++;
      }
      else { // template parameter
        inputPos += match[0].length;
        var property = node[match[1]];
        if (!property) {
          throw new ReferenceError('Template: Property ' + match[1] + ' does not exist.');
        }
        if (match[2] === undefined) { //no square brackets
          switch (typeof property) {
            case 'string':
              latex += property;
              break;
            case 'object':
              if (type.isNode(property)) {
                latex += property.toTex(options);
              }
              else if (Array.isArray(property)) {
                //make array of Nodes into comma separated list
                latex += property.map(function (arg, index) {
                  if (type.isNode(arg)) {
                    return arg.toTex(options);
                  }
                  throw new TypeError('Template: ' + match[1] + '[' + index + '] is not a Node.');
                }).join(',');
              }
              else {
                throw new TypeError('Template: ' + match[1] + ' has to be a Node, String or array of Nodes');
              }
              break;
            default:
              throw new TypeError('Template: ' + match[1] + ' has to be a Node, String or array of Nodes');
          }
        }
        else { //with square brackets
          if (type.isNode(property[match[2]] && property[match[2]])) {
            latex += property[match[2]].toTex(options);
          }
          else {
            throw new TypeError('Template: ' + match[1] + '[' + match[2] + '] is not a Node.');
          }
        }
      }
    }
    latex += template.slice(inputPos);  //append rest of the template

    return latex;
  }

  //backup Node's toTex function
  //@private
  var nodeToTex = FunctionNode.prototype.toTex;

  /**
   * Get LaTeX representation. (wrapper function)
   * This overrides parts of Node's toTex function.
   * If callback is an object containing callbacks, it
   * calls the correct callback for the current node,
   * otherwise it falls back to calling Node's toTex
   * function.
   *
   * @param {Object} options
   * @return {string}
   */
  FunctionNode.prototype.toTex = function (options) {
    var customTex;
    if (options && (typeof options.handler === 'object') && hasOwnProperty(options.handler, this.name)) {
      //callback is a map of callback functions
      customTex = options.handler[this.name](this, options);
    }

    if (typeof customTex !== 'undefined') {
      return customTex;
    }

    //fall back to Node's toTex
    return nodeToTex.call(this, options);
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  FunctionNode.prototype._toTex = function (options) {
    var args = this.args.map(function (arg) { //get LaTeX of the arguments
      return arg.toTex(options);
    });

    var latexConverter;

    if (math[this.name] && ((typeof math[this.name].toTex === 'function') || (typeof math[this.name].toTex === 'object') || (typeof math[this.name].toTex === 'string'))) {
      //.toTex is a callback function
      latexConverter = math[this.name].toTex;
    }

    var customToTex;
    switch (typeof latexConverter) {
      case 'function': //a callback function
        customToTex = latexConverter(this, options);
        break;
      case 'string': //a template string
        customToTex = expandTemplate(latexConverter, this, options);
        break;
      case 'object': //an object with different "converters" for different numbers of arguments
        switch (typeof latexConverter[args.length]) {
          case 'function':
            customToTex = latexConverter[args.length](this, options);
            break;
          case 'string':
            customToTex = expandTemplate(latexConverter[args.length], this, options);
            break;
        }
    }

    if (typeof customToTex !== 'undefined') {
      return customToTex;
    }

    return expandTemplate(latex.defaultTemplate, this, options);
  };

  /**
   * Get identifier.
   * @return {string}
   */
  FunctionNode.prototype.getIdentifier = function () {
    return this.type + ':' + this.name;
  };

  return FunctionNode;
}

exports.name = 'FunctionNode';
exports.path = 'expression.node';
exports.math = true; // request access to the math namespace as 5th argument of the factory function
exports.factory = factory;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(30);

/**
 * math.js factory function. Creates a new instance of math.js
 *
 * @param {Object} [config] Available configuration options:
 *                            {number} epsilon
 *                              Minimum relative difference between two
 *                              compared values, used by all comparison functions.
 *                            {string} matrix
 *                              A string 'matrix' (default) or 'array'.
 *                            {string} number
 *                              A string 'number' (default), 'bignumber', or
 *                              'fraction'
 *                            {number} precision
 *                              The number of significant digits for BigNumbers.
 *                              Not applicable for Numbers.
 *                            {boolean} predictable
 *                              Predictable output type of functions. When true,
 *                              output type depends only on the input types. When
 *                              false (default), output type can vary depending
 *                              on input values. For example `math.sqrt(-4)`
 *                              returns `complex('2i')` when predictable is false, and
 *                              returns `NaN` when true.
 */
function create (config) {
  // create a new math.js instance
  var math = core.create(config);
  math.create = create;

  // import data types, functions, constants, expression parser, etc.
  math['import'](__webpack_require__(39));
  math['import'](__webpack_require__(40));
  math['import'](__webpack_require__(233));

  return math;
}

// return a new instance of math.js
module.exports = create();


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isFactory = __webpack_require__(2).isFactory;
var typedFactory = __webpack_require__(32);
var emitter = __webpack_require__(35);

var importFactory = __webpack_require__(37);
var configFactory = __webpack_require__(38);

/**
 * Math.js core. Creates a new, empty math.js instance
 * @param {Object} [options] Available options:
 *                            {number} epsilon
 *                              Minimum relative difference between two
 *                              compared values, used by all comparison functions.
 *                            {string} matrix
 *                              A string 'Matrix' (default) or 'Array'.
 *                            {string} number
 *                              A string 'number' (default), 'BigNumber', or 'Fraction'
 *                            {number} precision
 *                              The number of significant digits for BigNumbers.
 *                              Not applicable for Numbers.
 *                            {boolean} predictable
 *                              Predictable output type of functions. When true,
 *                              output type depends only on the input types. When
 *                              false (default), output type can vary depending
 *                              on input values. For example `math.sqrt(-4)`
 *                              returns `complex('2i')` when predictable is false, and
 *                              returns `NaN` when true.
 *                            {string} randomSeed
 *                              Random seed for seeded pseudo random number generator.
 *                              Set to null to randomly seed.
 * @returns {Object} Returns a bare-bone math.js instance containing
 *                   functions:
 *                   - `import` to add new functions
 *                   - `config` to change configuration
 *                   - `on`, `off`, `once`, `emit` for events
 */
exports.create = function create (options) {
  // simple test for ES5 support
  if (typeof Object.create !== 'function') {
    throw new Error('ES5 not supported by this JavaScript engine. ' +
    'Please load the es5-shim and es5-sham library for compatibility.');
  }

  // cached factories and instances
  var factories = [];
  var instances = [];

  // create a namespace for the mathjs instance, and attach emitter functions
  var math = emitter.mixin({});
  math.type = {};
  math.expression = {
    transform: {},
    mathWithTransform: {}
  };

  // create a new typed instance
  math.typed = typedFactory.create(math.type);

  // create configuration options. These are private
  var _config = {
    // minimum relative difference between two compared values,
    // used by all comparison functions
    epsilon: 1e-12,

    // type of default matrix output. Choose 'matrix' (default) or 'array'
    matrix: 'Matrix',

    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
    number: 'number',

    // number of significant digits in BigNumbers
    precision: 64,

    // predictable output type of functions. When true, output type depends only
    // on the input types. When false (default), output type can vary depending
    // on input values. For example `math.sqrt(-4)` returns `complex('2i')` when
    // predictable is false, and returns `NaN` when true.
    predictable: false,

    // random seed for seeded pseudo random number generation
    // null = randomly seed
    randomSeed: null
  };

  /**
   * Load a function or data type from a factory.
   * If the function or data type already exists, the existing instance is
   * returned.
   * @param {{type: string, name: string, factory: Function}} factory
   * @returns {*}
   */
  function load (factory) {
    if (!isFactory(factory)) {
      throw new Error('Factory object with properties `type`, `name`, and `factory` expected');
    }

    var index = factories.indexOf(factory);
    var instance;
    if (index === -1) {
      // doesn't yet exist
      if (factory.math === true) {
        // pass with math namespace
        instance = factory.factory(math.type, _config, load, math.typed, math);
      }
      else {
        instance = factory.factory(math.type, _config, load, math.typed);
      }

      // append to the cache
      factories.push(factory);
      instances.push(instance);
    }
    else {
      // already existing function, return the cached instance
      instance = instances[index];
    }

    return instance;
  }

  // load the import and config functions
  math['import'] = load(importFactory);
  math['config'] = load(configFactory);
  math.expression.mathWithTransform['config'] = math['config']

  // apply options
  if (options) {
    math.config(options);
  }

  return math;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var typedFunction = __webpack_require__(33);
var digits = __webpack_require__(8).digits;
var isBigNumber = __webpack_require__(10);
var isMatrix = __webpack_require__(34);

// returns a new instance of typed-function
var createTyped = function () {
  // initially, return the original instance of typed-function
  // consecutively, return a new instance from typed.create.
  createTyped = typedFunction.create;
  return typedFunction;
};

/**
 * Factory function for creating a new typed instance
 * @param {Object} type   Object with data types like Complex and BigNumber
 * @returns {Function}
 */
exports.create = function create(type) {
  // TODO: typed-function must be able to silently ignore signatures with unknown data types

  // type checks for all known types
  //
  // note that:
  //
  // - check by duck-typing on a property like `isUnit`, instead of checking instanceof.
  //   instanceof cannot be used because that would not allow to pass data from
  //   one instance of math.js to another since each has it's own instance of Unit.
  // - check the `isUnit` property via the constructor, so there will be no
  //   matches for "fake" instances like plain objects with a property `isUnit`.
  //   That is important for security reasons.
  // - It must not be possible to override the type checks used internally,
  //   for security reasons, so these functions are not exposed in the expression
  //   parser.
  type.isNumber = function (x) { return typeof x === 'number' };
  type.isComplex = function (x) { return type.Complex && x instanceof type.Complex || false };
  type.isBigNumber = isBigNumber;
  type.isFraction = function (x) { return type.Fraction && x instanceof type.Fraction || false };
  type.isUnit = function (x) { return x && x.constructor.prototype.isUnit || false };
  type.isString = function (x) { return typeof x === 'string' };
  type.isArray = Array.isArray;
  type.isMatrix = isMatrix;
  type.isDenseMatrix = function (x) { return x && x.isDenseMatrix && x.constructor.prototype.isMatrix || false };
  type.isSparseMatrix = function (x) { return x && x.isSparseMatrix && x.constructor.prototype.isMatrix || false };
  type.isRange = function (x) { return x && x.constructor.prototype.isRange || false };
  type.isIndex = function (x) { return x && x.constructor.prototype.isIndex || false };
  type.isBoolean = function (x) { return typeof x === 'boolean' };
  type.isResultSet = function (x) { return x && x.constructor.prototype.isResultSet || false };
  type.isHelp = function (x) { return x && x.constructor.prototype.isHelp || false };
  type.isFunction = function (x) { return typeof x === 'function'};
  type.isDate = function (x) { return x instanceof Date };
  type.isRegExp = function (x) { return x instanceof RegExp };
  type.isObject = function (x) { return typeof x === 'object' };
  type.isNull = function (x) { return x === null };
  type.isUndefined = function (x) { return x === undefined };

  type.isAccessorNode = function (x) { return x && x.isAccessorNode && x.constructor.prototype.isNode || false };
  type.isArrayNode = function (x) { return x && x.isArrayNode && x.constructor.prototype.isNode || false };
  type.isAssignmentNode = function (x) { return x && x.isAssignmentNode && x.constructor.prototype.isNode || false };
  type.isBlockNode = function (x) { return x && x.isBlockNode && x.constructor.prototype.isNode || false };
  type.isConditionalNode = function (x) { return x && x.isConditionalNode && x.constructor.prototype.isNode || false };
  type.isConstantNode = function (x) { return x && x.isConstantNode && x.constructor.prototype.isNode || false };
  type.isFunctionAssignmentNode = function (x) { return x && x.isFunctionAssignmentNode && x.constructor.prototype.isNode || false };
  type.isFunctionNode = function (x) { return x && x.isFunctionNode && x.constructor.prototype.isNode || false };
  type.isIndexNode = function (x) { return x && x.isIndexNode && x.constructor.prototype.isNode || false };
  type.isNode = function (x) { return x && x.isNode && x.constructor.prototype.isNode || false };
  type.isObjectNode = function (x) { return x && x.isObjectNode && x.constructor.prototype.isNode || false };
  type.isOperatorNode = function (x) { return x && x.isOperatorNode && x.constructor.prototype.isNode || false };
  type.isParenthesisNode = function (x) { return x && x.isParenthesisNode && x.constructor.prototype.isNode || false };
  type.isRangeNode = function (x) { return x && x.isRangeNode && x.constructor.prototype.isNode || false };
  type.isSymbolNode = function (x) { return x && x.isSymbolNode && x.constructor.prototype.isNode || false };

  type.isChain = function (x) { return x && x.constructor.prototype.isChain || false };

  // get a new instance of typed-function
  var typed = createTyped();

  // define all types. The order of the types determines in which order function
  // arguments are type-checked (so for performance it's important to put the
  // most used types first).
  typed.types = [
    { name: 'number',          test: type.isNumber },
    { name: 'Complex',         test: type.isComplex },
    { name: 'BigNumber',       test: type.isBigNumber },
    { name: 'Fraction',        test: type.isFraction },
    { name: 'Unit',            test: type.isUnit },
    { name: 'string',          test: type.isString },
    { name: 'Array',           test: type.isArray },
    { name: 'Matrix',          test: type.isMatrix },
    { name: 'DenseMatrix',     test: type.isDenseMatrix },
    { name: 'SparseMatrix',    test: type.isSparseMatrix },
    { name: 'Range',           test: type.isRange },
    { name: 'Index',           test: type.isIndex },
    { name: 'boolean',         test: type.isBoolean },
    { name: 'ResultSet',       test: type.isResultSet },
    { name: 'Help',            test: type.isHelp },
    { name: 'function',        test: type.isFunction },
    { name: 'Date',            test: type.isDate },
    { name: 'RegExp',          test: type.isRegExp },
    { name: 'Object',          test: type.isObject },
    { name: 'null',            test: type.isNull },
    { name: 'undefined',       test: type.isUndefined },

    { name: 'OperatorNode',    test: type.isOperatorNode },
    { name: 'ConstantNode',    test: type.isConstantNode },
    { name: 'SymbolNode',      test: type.isSymbolNode },
    { name: 'ParenthesisNode', test: type.isParenthesisNode },
    { name: 'FunctionNode',    test: type.isFunctionNode },
    { name: 'FunctionAssignmentNode',    test: type.isFunctionAssignmentNode },
    { name: 'ArrayNode',                 test: type.isArrayNode },
    { name: 'AssignmentNode',            test: type.isAssignmentNode },
    { name: 'BlockNode',                 test: type.isBlockNode },
    { name: 'ConditionalNode',           test: type.isConditionalNode },
    { name: 'IndexNode',                 test: type.isIndexNode },
    { name: 'RangeNode',                 test: type.isRangeNode },
    { name: 'Node',                      test: type.isNode }
  ];

  // TODO: add conversion from BigNumber to number?
  typed.conversions = [
    {
      from: 'number',
      to: 'BigNumber',
      convert: function (x) {
        // note: conversion from number to BigNumber can fail if x has >15 digits
        if (digits(x) > 15) {
          throw new TypeError('Cannot implicitly convert a number with >15 significant digits to BigNumber ' +
          '(value: ' + x + '). ' +
          'Use function bignumber(x) to convert to BigNumber.');
        }
        return new type.BigNumber(x);
      }
    }, {
      from: 'number',
      to: 'Complex',
      convert: function (x) {
        return new type.Complex(x, 0);
      }
    }, {
      from: 'number',
      to: 'string',
      convert: function (x) {
        return x + '';
      }
    }, {
      from: 'BigNumber',
      to: 'Complex',
      convert: function (x) {
        return new type.Complex(x.toNumber(), 0);
      }
    }, {
      from: 'Fraction',
      to: 'BigNumber',
      convert: function (x) {
        throw new TypeError('Cannot implicitly convert a Fraction to BigNumber or vice versa. ' +
            'Use function bignumber(x) to convert to BigNumber or fraction(x) to convert to Fraction.');
      }
    }, {
      from: 'Fraction',
      to: 'Complex',
      convert: function (x) {
        return new type.Complex(x.valueOf(), 0);
      }
    }, {
      from: 'number',
      to: 'Fraction',
      convert: function (x) {
        var f = new type.Fraction(x);
        if (f.valueOf() !== x) {
          throw new TypeError('Cannot implicitly convert a number to a Fraction when there will be a loss of precision ' +
              '(value: ' + x + '). ' +
              'Use function fraction(x) to convert to Fraction.');
        }
        return new type.Fraction(x);
      }
    }, {
    // FIXME: add conversion from Fraction to number, for example for `sqrt(fraction(1,3))`
    //  from: 'Fraction',
    //  to: 'number',
    //  convert: function (x) {
    //    return x.valueOf();
    //  }
    //}, {
      from: 'string',
      to: 'number',
      convert: function (x) {
        var n = Number(x);
        if (isNaN(n)) {
          throw new Error('Cannot convert "' + x + '" to a number');
        }
        return n;
      }
    }, {
      from: 'string',
      to: 'BigNumber',
      convert: function (x) {
        try {
          return new type.BigNumber(x);
        }
        catch (err) {
          throw new Error('Cannot convert "' + x + '" to BigNumber');
        }
      }
    }, {
      from: 'string',
      to: 'Fraction',
      convert: function (x) {
        try {
          return new type.Fraction(x);
        }
        catch (err) {
          throw new Error('Cannot convert "' + x + '" to Fraction');
        }
      }
    }, {
      from: 'string',
      to: 'Complex',
      convert: function (x) {
        try {
          return new type.Complex(x);
        }
        catch (err) {
          throw new Error('Cannot convert "' + x + '" to Complex');
        }
      }
    }, {
      from: 'boolean',
      to: 'number',
      convert: function (x) {
        return +x;
      }
    }, {
      from: 'boolean',
      to: 'BigNumber',
      convert: function (x) {
        return new type.BigNumber(+x);
      }
    }, {
      from: 'boolean',
      to: 'Fraction',
      convert: function (x) {
        return new type.Fraction(+x);
      }
    }, {
      from: 'boolean',
      to: 'string',
      convert: function (x) {
        return +x;
      }
    }, {
      from: 'null',
      to: 'number',
      convert: function () {
        return 0;
      }
    }, {
      from: 'null',
      to: 'string',
      convert: function () {
        return 'null';
      }
    }, {
      from: 'null',
      to: 'BigNumber',
      convert: function () {
        return new type.BigNumber(0);
      }
    }, {
      from: 'null',
      to: 'Fraction',
      convert: function () {
        return new type.Fraction(0);
      }
    }, {
      from: 'Array',
      to: 'Matrix',
      convert: function (array) {
        // TODO: how to decide on the right type of matrix to create?
        return new type.DenseMatrix(array);
      }
    }, {
      from: 'Matrix',
      to: 'Array',
      convert: function (matrix) {
        return matrix.valueOf();
      }
    }
  ];

  return typed;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * typed-function
 *
 * Type checking for JavaScript functions
 *
 * https://github.com/josdejong/typed-function
 */


(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    // OldNode. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like OldNode.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.typed = factory();
  }
}(this, function () {
  // factory function to create a new instance of typed-function
  // TODO: allow passing configuration, types, tests via the factory function
  function create() {
    /**
     * Get a type test function for a specific data type
     * @param {string} name                   Name of a data type like 'number' or 'string'
     * @returns {Function(obj: *) : boolean}  Returns a type testing function.
     *                                        Throws an error for an unknown type.
     */
    function getTypeTest(name) {
      var test;
      for (var i = 0; i < typed.types.length; i++) {
        var entry = typed.types[i];
        if (entry.name === name) {
          test = entry.test;
          break;
        }
      }

      if (!test) {
        var hint;
        for (i = 0; i < typed.types.length; i++) {
          entry = typed.types[i];
          if (entry.name.toLowerCase() == name.toLowerCase()) {
            hint = entry.name;
            break;
          }
        }

        throw new Error('Unknown type "' + name + '"' +
            (hint ? ('. Did you mean "' + hint + '"?') : ''));
      }
      return test;
    }

    /**
     * Retrieve the function name from a set of functions, and check
     * whether the name of all functions match (if given)
     * @param {Array.<function>} fns
     */
    function getName (fns) {
      var name = '';

      for (var i = 0; i < fns.length; i++) {
        var fn = fns[i];

        // merge function name when this is a typed function
        if (fn.signatures && fn.name != '') {
          if (name == '') {
            name = fn.name;
          }
          else if (name != fn.name) {
            var err = new Error('Function names do not match (expected: ' + name + ', actual: ' + fn.name + ')');
            err.data = {
              actual: fn.name,
              expected: name
            };
            throw err;
          }
        }
      }

      return name;
    }

    /**
     * Create an ArgumentsError. Creates messages like:
     *
     *   Unexpected type of argument (expected: ..., actual: ..., index: ...)
     *   Too few arguments (expected: ..., index: ...)
     *   Too many arguments (expected: ..., actual: ...)
     *
     * @param {String} fn         Function name
     * @param {number} argCount   Number of arguments
     * @param {Number} index      Current argument index
     * @param {*} actual          Current argument
     * @param {string} [expected] An optional, comma separated string with
     *                            expected types on given index
     * @extends Error
     */
    function createError(fn, argCount, index, actual, expected) {
      var actualType = getTypeOf(actual);
      var _expected = expected ? expected.split(',') : null;
      var _fn = (fn || 'unnamed');
      var anyType = _expected && contains(_expected, 'any');
      var message;
      var data = {
        fn: fn,
        index: index,
        actual: actual,
        expected: _expected
      };

      if (_expected) {
        if (argCount > index && !anyType) {
          // unexpected type
          message = 'Unexpected type of argument in function ' + _fn +
              ' (expected: ' + _expected.join(' or ') + ', actual: ' + actualType + ', index: ' + index + ')';
        }
        else {
          // too few arguments
          message = 'Too few arguments in function ' + _fn +
              ' (expected: ' + _expected.join(' or ') + ', index: ' + index + ')';
        }
      }
      else {
        // too many arguments
        message = 'Too many arguments in function ' + _fn +
            ' (expected: ' + index + ', actual: ' + argCount + ')'
      }

      var err = new TypeError(message);
      err.data = data;
      return err;
    }

    /**
     * Collection with function references (local shortcuts to functions)
     * @constructor
     * @param {string} [name='refs']  Optional name for the refs, used to generate
     *                                JavaScript code
     */
    function Refs(name) {
      this.name = name || 'refs';
      this.categories = {};
    }

    /**
     * Add a function reference.
     * @param {Function} fn
     * @param {string} [category='fn']    A function category, like 'fn' or 'signature'
     * @returns {string} Returns the function name, for example 'fn0' or 'signature2'
     */
    Refs.prototype.add = function (fn, category) {
      var cat = category || 'fn';
      if (!this.categories[cat]) this.categories[cat] = [];

      var index = this.categories[cat].indexOf(fn);
      if (index == -1) {
        index = this.categories[cat].length;
        this.categories[cat].push(fn);
      }

      return cat + index;
    };

    /**
     * Create code lines for all function references
     * @returns {string} Returns the code containing all function references
     */
    Refs.prototype.toCode = function () {
      var code = [];
      var path = this.name + '.categories';
      var categories = this.categories;

      for (var cat in categories) {
        if (categories.hasOwnProperty(cat)) {
          var category = categories[cat];

          for (var i = 0; i < category.length; i++) {
            code.push('var ' + cat + i + ' = ' + path + '[\'' + cat + '\'][' + i + '];');
          }
        }
      }

      return code.join('\n');
    };

    /**
     * A function parameter
     * @param {string | string[] | Param} types    A parameter type like 'string',
     *                                             'number | boolean'
     * @param {boolean} [varArgs=false]            Variable arguments if true
     * @constructor
     */
    function Param(types, varArgs) {
      // parse the types, can be a string with types separated by pipe characters |
      if (typeof types === 'string') {
        // parse variable arguments operator (ellipses '...number')
        var _types = types.trim();
        var _varArgs = _types.substr(0, 3) === '...';
        if (_varArgs) {
          _types = _types.substr(3);
        }
        if (_types === '') {
          this.types = ['any'];
        }
        else {
          this.types = _types.split('|');
          for (var i = 0; i < this.types.length; i++) {
            this.types[i] = this.types[i].trim();
          }
        }
      }
      else if (Array.isArray(types)) {
        this.types = types;
      }
      else if (types instanceof Param) {
        return types.clone();
      }
      else {
        throw new Error('String or Array expected');
      }

      // can hold a type to which to convert when handling this parameter
      this.conversions = [];
      // TODO: implement better API for conversions, be able to add conversions via constructor (support a new type Object?)

      // variable arguments
      this.varArgs = _varArgs || varArgs || false;

      // check for any type arguments
      this.anyType = this.types.indexOf('any') !== -1;
    }

    /**
     * Order Params
     * any type ('any') will be ordered last, and object as second last (as other
     * types may be an object as well, like Array).
     *
     * @param {Param} a
     * @param {Param} b
     * @returns {number} Returns 1 if a > b, -1 if a < b, and else 0.
     */
    Param.compare = function (a, b) {
      // TODO: simplify parameter comparison, it's a mess
      if (a.anyType) return 1;
      if (b.anyType) return -1;

      if (contains(a.types, 'Object')) return 1;
      if (contains(b.types, 'Object')) return -1;

      if (a.hasConversions()) {
        if (b.hasConversions()) {
          var i, ac, bc;

          for (i = 0; i < a.conversions.length; i++) {
            if (a.conversions[i] !== undefined) {
              ac = a.conversions[i];
              break;
            }
          }

          for (i = 0; i < b.conversions.length; i++) {
            if (b.conversions[i] !== undefined) {
              bc = b.conversions[i];
              break;
            }
          }

          return typed.conversions.indexOf(ac) - typed.conversions.indexOf(bc);
        }
        else {
          return 1;
        }
      }
      else {
        if (b.hasConversions()) {
          return -1;
        }
        else {
          // both params have no conversions
          var ai, bi;

          for (i = 0; i < typed.types.length; i++) {
            if (typed.types[i].name === a.types[0]) {
              ai = i;
              break;
            }
          }

          for (i = 0; i < typed.types.length; i++) {
            if (typed.types[i].name === b.types[0]) {
              bi = i;
              break;
            }
          }

          return ai - bi;
        }
      }
    };

    /**
     * Test whether this parameters types overlap an other parameters types.
     * Will not match ['any'] with ['number']
     * @param {Param} other
     * @return {boolean} Returns true when there are overlapping types
     */
    Param.prototype.overlapping = function (other) {
      for (var i = 0; i < this.types.length; i++) {
        if (contains(other.types, this.types[i])) {
          return true;
        }
      }
      return false;
    };

    /**
     * Test whether this parameters types matches an other parameters types.
     * When any of the two parameters contains `any`, true is returned
     * @param {Param} other
     * @return {boolean} Returns true when there are matching types
     */
    Param.prototype.matches = function (other) {
      return this.anyType || other.anyType || this.overlapping(other);
    };

    /**
     * Create a clone of this param
     * @returns {Param} Returns a cloned version of this param
     */
    Param.prototype.clone = function () {
      var param = new Param(this.types.slice(), this.varArgs);
      param.conversions = this.conversions.slice();
      return param;
    };

    /**
     * Test whether this parameter contains conversions
     * @returns {boolean} Returns true if the parameter contains one or
     *                    multiple conversions.
     */
    Param.prototype.hasConversions = function () {
      return this.conversions.length > 0;
    };

    /**
     * Tests whether this parameters contains any of the provided types
     * @param {Object} types  A Map with types, like {'number': true}
     * @returns {boolean}     Returns true when the parameter contains any
     *                        of the provided types
     */
    Param.prototype.contains = function (types) {
      for (var i = 0; i < this.types.length; i++) {
        if (types[this.types[i]]) {
          return true;
        }
      }
      return false;
    };

    /**
     * Return a string representation of this params types, like 'string' or
     * 'number | boolean' or '...number'
     * @param {boolean} [toConversion]   If true, the returned types string
     *                                   contains the types where the parameter
     *                                   will convert to. If false (default)
     *                                   the "from" types are returned
     * @returns {string}
     */
    Param.prototype.toString = function (toConversion) {
      var types = [];
      var keys = {};

      for (var i = 0; i < this.types.length; i++) {
        var conversion = this.conversions[i];
        var type = toConversion && conversion ? conversion.to : this.types[i];
        if (!(type in keys)) {
          keys[type] = true;
          types.push(type);
        }
      }

      return (this.varArgs ? '...' : '') + types.join('|');
    };

    /**
     * A function signature
     * @param {string | string[] | Param[]} params
     *                         Array with the type(s) of each parameter,
     *                         or a comma separated string with types
     * @param {Function} fn    The actual function
     * @constructor
     */
    function Signature(params, fn) {
      var _params;
      if (typeof params === 'string') {
        _params = (params !== '') ? params.split(',') : [];
      }
      else if (Array.isArray(params)) {
        _params = params;
      }
      else {
        throw new Error('string or Array expected');
      }

      this.params = new Array(_params.length);
      this.anyType = false;
      this.varArgs = false;
      for (var i = 0; i < _params.length; i++) {
        var param = new Param(_params[i]);
        this.params[i] = param;
        if (param.anyType) {
          this.anyType = true;
        }
        if (i === _params.length - 1) {
          // the last argument
          this.varArgs = param.varArgs;
        }
        else {
          // non-last argument
          if (param.varArgs) {
            throw new SyntaxError('Unexpected variable arguments operator "..."');
          }
        }
      }

      this.fn = fn;
    }

    /**
     * Create a clone of this signature
     * @returns {Signature} Returns a cloned version of this signature
     */
    Signature.prototype.clone = function () {
      return new Signature(this.params.slice(), this.fn);
    };

    /**
     * Expand a signature: split params with union types in separate signatures
     * For example split a Signature "string | number" into two signatures.
     * @return {Signature[]} Returns an array with signatures (at least one)
     */
    Signature.prototype.expand = function () {
      var signatures = [];

      function recurse(signature, path) {
        if (path.length < signature.params.length) {
          var i, newParam, conversion;

          var param = signature.params[path.length];
          if (param.varArgs) {
            // a variable argument. do not split the types in the parameter
            newParam = param.clone();

            // add conversions to the parameter
            // recurse for all conversions
            for (i = 0; i < typed.conversions.length; i++) {
              conversion = typed.conversions[i];
              if (!contains(param.types, conversion.from) && contains(param.types, conversion.to)) {
                var j = newParam.types.length;
                newParam.types[j] = conversion.from;
                newParam.conversions[j] = conversion;
              }
            }

            recurse(signature, path.concat(newParam));
          }
          else {
            // split each type in the parameter
            for (i = 0; i < param.types.length; i++) {
              recurse(signature, path.concat(new Param(param.types[i])));
            }

            // recurse for all conversions
            for (i = 0; i < typed.conversions.length; i++) {
              conversion = typed.conversions[i];
              if (!contains(param.types, conversion.from) && contains(param.types, conversion.to)) {
                newParam = new Param(conversion.from);
                newParam.conversions[0] = conversion;
                recurse(signature, path.concat(newParam));
              }
            }
          }
        }
        else {
          signatures.push(new Signature(path, signature.fn));
        }
      }

      recurse(this, []);

      return signatures;
    };

    /**
     * Compare two signatures.
     *
     * When two params are equal and contain conversions, they will be sorted
     * by lowest index of the first conversions.
     *
     * @param {Signature} a
     * @param {Signature} b
     * @returns {number} Returns 1 if a > b, -1 if a < b, and else 0.
     */
    Signature.compare = function (a, b) {
      if (a.params.length > b.params.length) return 1;
      if (a.params.length < b.params.length) return -1;

      // count the number of conversions
      var i;
      var len = a.params.length; // a and b have equal amount of params
      var ac = 0;
      var bc = 0;
      for (i = 0; i < len; i++) {
        if (a.params[i].hasConversions()) ac++;
        if (b.params[i].hasConversions()) bc++;
      }

      if (ac > bc) return 1;
      if (ac < bc) return -1;

      // compare the order per parameter
      for (i = 0; i < a.params.length; i++) {
        var cmp = Param.compare(a.params[i], b.params[i]);
        if (cmp !== 0) {
          return cmp;
        }
      }

      return 0;
    };

    /**
     * Test whether any of the signatures parameters has conversions
     * @return {boolean} Returns true when any of the parameters contains
     *                   conversions.
     */
    Signature.prototype.hasConversions = function () {
      for (var i = 0; i < this.params.length; i++) {
        if (this.params[i].hasConversions()) {
          return true;
        }
      }
      return false;
    };

    /**
     * Test whether this signature should be ignored.
     * Checks whether any of the parameters contains a type listed in
     * typed.ignore
     * @return {boolean} Returns true when the signature should be ignored
     */
    Signature.prototype.ignore = function () {
      // create a map with ignored types
      var types = {};
      for (var i = 0; i < typed.ignore.length; i++) {
        types[typed.ignore[i]] = true;
      }

      // test whether any of the parameters contains this type
      for (i = 0; i < this.params.length; i++) {
        if (this.params[i].contains(types)) {
          return true;
        }
      }

      return false;
    };

    /**
     * Test whether the path of this signature matches a given path.
     * @param {Param[]} params
     */
    Signature.prototype.paramsStartWith = function (params) {
      if (params.length === 0) {
        return true;
      }

      var aLast = last(this.params);
      var bLast = last(params);

      for (var i = 0; i < params.length; i++) {
        var a = this.params[i] || (aLast.varArgs ? aLast: null);
        var b = params[i]      || (bLast.varArgs ? bLast: null);

        if (!a ||  !b || !a.matches(b)) {
          return false;
        }
      }

      return true;
    };

    /**
     * Generate the code to invoke this signature
     * @param {Refs} refs
     * @param {string} prefix
     * @returns {string} Returns code
     */
    Signature.prototype.toCode = function (refs, prefix) {
      var code = [];

      var args = new Array(this.params.length);
      for (var i = 0; i < this.params.length; i++) {
        var param = this.params[i];
        var conversion = param.conversions[0];
        if (param.varArgs) {
          args[i] = 'varArgs';
        }
        else if (conversion) {
          args[i] = refs.add(conversion.convert, 'convert') + '(arg' + i + ')';
        }
        else {
          args[i] = 'arg' + i;
        }
      }

      var ref = this.fn ? refs.add(this.fn, 'signature') : undefined;
      if (ref) {
        return prefix + 'return ' + ref + '(' + args.join(', ') + '); // signature: ' + this.params.join(', ');
      }

      return code.join('\n');
    };

    /**
     * Return a string representation of the signature
     * @returns {string}
     */
    Signature.prototype.toString = function () {
      return this.params.join(', ');
    };

    /**
     * A group of signatures with the same parameter on given index
     * @param {Param[]} path
     * @param {Signature} [signature]
     * @param {Node[]} childs
     * @param {boolean} [fallThrough=false]
     * @constructor
     */
    function Node(path, signature, childs, fallThrough) {
      this.path = path || [];
      this.param = path[path.length - 1] || null;
      this.signature = signature || null;
      this.childs = childs || [];
      this.fallThrough = fallThrough || false;
    }

    /**
     * Generate code for this group of signatures
     * @param {Refs} refs
     * @param {string} prefix
     * @returns {string} Returns the code as string
     */
    Node.prototype.toCode = function (refs, prefix) {
      // TODO: split this function in multiple functions, it's too large
      var code = [];

      if (this.param) {
        var index = this.path.length - 1;
        var conversion = this.param.conversions[0];
        var comment = '// type: ' + (conversion ?
                (conversion.from + ' (convert to ' + conversion.to + ')') :
                this.param);

        // non-root node (path is non-empty)
        if (this.param.varArgs) {
          if (this.param.anyType) {
            // variable arguments with any type
            code.push(prefix + 'if (arguments.length > ' + index + ') {');
            code.push(prefix + '  var varArgs = [];');
            code.push(prefix + '  for (var i = ' + index + '; i < arguments.length; i++) {');
            code.push(prefix + '    varArgs.push(arguments[i]);');
            code.push(prefix + '  }');
            code.push(this.signature.toCode(refs, prefix + '  '));
            code.push(prefix + '}');
          }
          else {
            // variable arguments with a fixed type
            var getTests = function (types, arg) {
              var tests = [];
              for (var i = 0; i < types.length; i++) {
                tests[i] = refs.add(getTypeTest(types[i]), 'test') + '(' + arg + ')';
              }
              return tests.join(' || ');
            }.bind(this);

            var allTypes = this.param.types;
            var exactTypes = [];
            for (var i = 0; i < allTypes.length; i++) {
              if (this.param.conversions[i] === undefined) {
                exactTypes.push(allTypes[i]);
              }
            }

            code.push(prefix + 'if (' + getTests(allTypes, 'arg' + index) + ') { ' + comment);
            code.push(prefix + '  var varArgs = [arg' + index + '];');
            code.push(prefix + '  for (var i = ' + (index + 1) + '; i < arguments.length; i++) {');
            code.push(prefix + '    if (' + getTests(exactTypes, 'arguments[i]') + ') {');
            code.push(prefix + '      varArgs.push(arguments[i]);');

            for (var i = 0; i < allTypes.length; i++) {
              var conversion_i = this.param.conversions[i];
              if (conversion_i) {
                var test = refs.add(getTypeTest(allTypes[i]), 'test');
                var convert = refs.add(conversion_i.convert, 'convert');
                code.push(prefix + '    }');
                code.push(prefix + '    else if (' + test + '(arguments[i])) {');
                code.push(prefix + '      varArgs.push(' + convert + '(arguments[i]));');
              }
            }
            code.push(prefix + '    } else {');
            code.push(prefix + '      throw createError(name, arguments.length, i, arguments[i], \'' + exactTypes.join(',') + '\');');
            code.push(prefix + '    }');
            code.push(prefix + '  }');
            code.push(this.signature.toCode(refs, prefix + '  '));
            code.push(prefix + '}');
          }
        }
        else {
          if (this.param.anyType) {
            // any type
            code.push(prefix + '// type: any');
            code.push(this._innerCode(refs, prefix));
          }
          else {
            // regular type
            var type = this.param.types[0];
            var test = type !== 'any' ? refs.add(getTypeTest(type), 'test') : null;

            code.push(prefix + 'if (' + test + '(arg' + index + ')) { ' + comment);
            code.push(this._innerCode(refs, prefix + '  '));
            code.push(prefix + '}');
          }
        }
      }
      else {
        // root node (path is empty)
        code.push(this._innerCode(refs, prefix));
      }

      return code.join('\n');
    };

    /**
     * Generate inner code for this group of signatures.
     * This is a helper function of Node.prototype.toCode
     * @param {Refs} refs
     * @param {string} prefix
     * @returns {string} Returns the inner code as string
     * @private
     */
    Node.prototype._innerCode = function (refs, prefix) {
      var code = [];
      var i;

      if (this.signature) {
        code.push(prefix + 'if (arguments.length === ' + this.path.length + ') {');
        code.push(this.signature.toCode(refs, prefix + '  '));
        code.push(prefix + '}');
      }

      for (i = 0; i < this.childs.length; i++) {
        code.push(this.childs[i].toCode(refs, prefix));
      }

      // TODO: shouldn't the this.param.anyType check be redundant
      if (!this.fallThrough || (this.param && this.param.anyType)) {
        var exceptions = this._exceptions(refs, prefix);
        if (exceptions) {
          code.push(exceptions);
        }
      }

      return code.join('\n');
    };


    /**
     * Generate code to throw exceptions
     * @param {Refs} refs
     * @param {string} prefix
     * @returns {string} Returns the inner code as string
     * @private
     */
    Node.prototype._exceptions = function (refs, prefix) {
      var index = this.path.length;

      if (this.childs.length === 0) {
        // TODO: can this condition be simplified? (we have a fall-through here)
        return [
          prefix + 'if (arguments.length > ' + index + ') {',
          prefix + '  throw createError(name, arguments.length, ' + index + ', arguments[' + index + ']);',
          prefix + '}'
        ].join('\n');
      }
      else {
        var keys = {};
        var types = [];

        for (var i = 0; i < this.childs.length; i++) {
          var node = this.childs[i];
          if (node.param) {
            for (var j = 0; j < node.param.types.length; j++) {
              var type = node.param.types[j];
              if (!(type in keys) && !node.param.conversions[j]) {
                keys[type] = true;
                types.push(type);
              }
            }
          }
        }

        return prefix + 'throw createError(name, arguments.length, ' + index + ', arguments[' + index + '], \'' + types.join(',') + '\');';
      }
    };

    /**
     * Split all raw signatures into an array with expanded Signatures
     * @param {Object.<string, Function>} rawSignatures
     * @return {Signature[]} Returns an array with expanded signatures
     */
    function parseSignatures(rawSignatures) {
      // FIXME: need to have deterministic ordering of signatures, do not create via object
      var signature;
      var keys = {};
      var signatures = [];
      var i;

      for (var types in rawSignatures) {
        if (rawSignatures.hasOwnProperty(types)) {
          var fn = rawSignatures[types];
          signature = new Signature(types, fn);

          if (signature.ignore()) {
            continue;
          }

          var expanded = signature.expand();

          for (i = 0; i < expanded.length; i++) {
            var signature_i = expanded[i];
            var key = signature_i.toString();
            var existing = keys[key];
            if (!existing) {
              keys[key] = signature_i;
            }
            else {
              var cmp = Signature.compare(signature_i, existing);
              if (cmp < 0) {
                // override if sorted first
                keys[key] = signature_i;
              }
              else if (cmp === 0) {
                throw new Error('Signature "' + key + '" is defined twice');
              }
              // else: just ignore
            }
          }
        }
      }

      // convert from map to array
      for (key in keys) {
        if (keys.hasOwnProperty(key)) {
          signatures.push(keys[key]);
        }
      }

      // order the signatures
      signatures.sort(function (a, b) {
        return Signature.compare(a, b);
      });

      // filter redundant conversions from signatures with varArgs
      // TODO: simplify this loop or move it to a separate function
      for (i = 0; i < signatures.length; i++) {
        signature = signatures[i];

        if (signature.varArgs) {
          var index = signature.params.length - 1;
          var param = signature.params[index];

          var t = 0;
          while (t < param.types.length) {
            if (param.conversions[t]) {
              var type = param.types[t];

              for (var j = 0; j < signatures.length; j++) {
                var other = signatures[j];
                var p = other.params[index];

                if (other !== signature &&
                    p &&
                    contains(p.types, type) && !p.conversions[index]) {
                  // this (conversion) type already exists, remove it
                  param.types.splice(t, 1);
                  param.conversions.splice(t, 1);
                  t--;
                  break;
                }
              }
            }
            t++;
          }
        }
      }

      return signatures;
    }

    /**
     * Filter all any type signatures
     * @param {Signature[]} signatures
     * @return {Signature[]} Returns only any type signatures
     */
    function filterAnyTypeSignatures (signatures) {
      var filtered = [];

      for (var i = 0; i < signatures.length; i++) {
        if (signatures[i].anyType) {
          filtered.push(signatures[i]);
        }
      }

      return filtered;
    }

    /**
     * create a map with normalized signatures as key and the function as value
     * @param {Signature[]} signatures   An array with split signatures
     * @return {Object.<string, Function>} Returns a map with normalized
     *                                     signatures as key, and the function
     *                                     as value.
     */
    function mapSignatures(signatures) {
      var normalized = {};

      for (var i = 0; i < signatures.length; i++) {
        var signature = signatures[i];
        if (signature.fn && !signature.hasConversions()) {
          var params = signature.params.join(',');
          normalized[params] = signature.fn;
        }
      }

      return normalized;
    }

    /**
     * Parse signatures recursively in a node tree.
     * @param {Signature[]} signatures  Array with expanded signatures
     * @param {Param[]} path            Traversed path of parameter types
     * @param {Signature[]} anys
     * @return {Node}                   Returns a node tree
     */
    function parseTree(signatures, path, anys) {
      var i, signature;
      var index = path.length;
      var nodeSignature;

      var filtered = [];
      for (i = 0; i < signatures.length; i++) {
        signature = signatures[i];

        // filter the first signature with the correct number of params
        if (signature.params.length === index && !nodeSignature) {
          nodeSignature = signature;
        }

        if (signature.params[index] != undefined) {
          filtered.push(signature);
        }
      }

      // sort the filtered signatures by param
      filtered.sort(function (a, b) {
        return Param.compare(a.params[index], b.params[index]);
      });

      // recurse over the signatures
      var entries = [];
      for (i = 0; i < filtered.length; i++) {
        signature = filtered[i];
        // group signatures with the same param at current index
        var param = signature.params[index];

        // TODO: replace the next filter loop
        var existing = entries.filter(function (entry) {
          return entry.param.overlapping(param);
        })[0];

        //var existing;
        //for (var j = 0; j < entries.length; j++) {
        //  if (entries[j].param.overlapping(param)) {
        //    existing = entries[j];
        //    break;
        //  }
        //}

        if (existing) {
          if (existing.param.varArgs) {
            throw new Error('Conflicting types "' + existing.param + '" and "' + param + '"');
          }
          existing.signatures.push(signature);
        }
        else {
          entries.push({
            param: param,
            signatures: [signature]
          });
        }
      }

      // find all any type signature that can still match our current path
      var matchingAnys = [];
      for (i = 0; i < anys.length; i++) {
        if (anys[i].paramsStartWith(path)) {
          matchingAnys.push(anys[i]);
        }
      }

      // see if there are any type signatures that don't match any of the
      // signatures that we have in our tree, i.e. we have alternative
      // matching signature(s) outside of our current tree and we should
      // fall through to them instead of throwing an exception
      var fallThrough = false;
      for (i = 0; i < matchingAnys.length; i++) {
        if (!contains(signatures, matchingAnys[i])) {
          fallThrough = true;
          break;
        }
      }

      // parse the childs
      var childs = new Array(entries.length);
      for (i = 0; i < entries.length; i++) {
        var entry = entries[i];
        childs[i] = parseTree(entry.signatures, path.concat(entry.param), matchingAnys)
      }

      return new Node(path, nodeSignature, childs, fallThrough);
    }

    /**
     * Generate an array like ['arg0', 'arg1', 'arg2']
     * @param {number} count Number of arguments to generate
     * @returns {Array} Returns an array with argument names
     */
    function getArgs(count) {
      // create an array with all argument names
      var args = [];
      for (var i = 0; i < count; i++) {
        args[i] = 'arg' + i;
      }

      return args;
    }

    /**
     * Compose a function from sub-functions each handling a single type signature.
     * Signatures:
     *   typed(signature: string, fn: function)
     *   typed(name: string, signature: string, fn: function)
     *   typed(signatures: Object.<string, function>)
     *   typed(name: string, signatures: Object.<string, function>)
     *
     * @param {string | null} name
     * @param {Object.<string, Function>} signatures
     * @return {Function} Returns the typed function
     * @private
     */
    function _typed(name, signatures) {
      var refs = new Refs();

      // parse signatures, expand them
      var _signatures = parseSignatures(signatures);
      if (_signatures.length == 0) {
        throw new Error('No signatures provided');
      }

      // filter all any type signatures
      var anys = filterAnyTypeSignatures(_signatures);

      // parse signatures into a node tree
      var node = parseTree(_signatures, [], anys);

      //var util = require('util');
      //console.log('ROOT');
      //console.log(util.inspect(node, { depth: null }));

      // generate code for the typed function
      // safeName is a conservative replacement of characters 
      // to prevend being able to inject JS code at the place of the function name 
      // the name is useful for stack trackes therefore we want have it there
      var code = [];
      var safeName = (name || '').replace(/[^a-zA-Z0-9_$]/g, '_')
      var args = getArgs(maxParams(_signatures));
      code.push('function ' + safeName + '(' + args.join(', ') + ') {');
      code.push('  "use strict";');
      code.push('  var name = ' + JSON.stringify(name || '') + ';');
      code.push(node.toCode(refs, '  ', false));
      code.push('}');

      // generate body for the factory function
      var body = [
        refs.toCode(),
        'return ' + code.join('\n')
      ].join('\n');

      // evaluate the JavaScript code and attach function references
      var factory = (new Function(refs.name, 'createError', body));
      var fn = factory(refs, createError);

      //console.log('FN\n' + fn.toString()); // TODO: cleanup

      // attach the signatures with sub-functions to the constructed function
      fn.signatures = mapSignatures(_signatures);

      return fn;
    }

    /**
     * Calculate the maximum number of parameters in givens signatures
     * @param {Signature[]} signatures
     * @returns {number} The maximum number of parameters
     */
    function maxParams(signatures) {
      var max = 0;

      for (var i = 0; i < signatures.length; i++) {
        var len = signatures[i].params.length;
        if (len > max) {
          max = len;
        }
      }

      return max;
    }

    /**
     * Get the type of a value
     * @param {*} x
     * @returns {string} Returns a string with the type of value
     */
    function getTypeOf(x) {
      var obj;

      for (var i = 0; i < typed.types.length; i++) {
        var entry = typed.types[i];

        if (entry.name === 'Object') {
          // Array and Date are also Object, so test for Object afterwards
          obj = entry;
        }
        else {
          if (entry.test(x)) return entry.name;
        }
      }

      // at last, test whether an object
      if (obj && obj.test(x)) return obj.name;

      return 'unknown';
    }

    /**
     * Test whether an array contains some item
     * @param {Array} array
     * @param {*} item
     * @return {boolean} Returns true if array contains item, false if not.
     */
    function contains(array, item) {
      return array.indexOf(item) !== -1;
    }

    /**
     * Returns the last item in the array
     * @param {Array} array
     * @return {*} item
     */
    function last (array) {
      return array[array.length - 1];
    }

    // data type tests
    var types = [
      { name: 'number',    test: function (x) { return typeof x === 'number' } },
      { name: 'string',    test: function (x) { return typeof x === 'string' } },
      { name: 'boolean',   test: function (x) { return typeof x === 'boolean' } },
      { name: 'Function',  test: function (x) { return typeof x === 'function'} },
      { name: 'Array',     test: Array.isArray },
      { name: 'Date',      test: function (x) { return x instanceof Date } },
      { name: 'RegExp',    test: function (x) { return x instanceof RegExp } },
      { name: 'Object',    test: function (x) { return typeof x === 'object' } },
      { name: 'null',      test: function (x) { return x === null } },
      { name: 'undefined', test: function (x) { return x === undefined } }
    ];

    // configuration
    var config = {};

    // type conversions. Order is important
    var conversions = [];

    // types to be ignored
    var ignore = [];

    // temporary object for holding types and conversions, for constructing
    // the `typed` function itself
    // TODO: find a more elegant solution for this
    var typed = {
      config: config,
      types: types,
      conversions: conversions,
      ignore: ignore
    };

    /**
     * Construct the typed function itself with various signatures
     *
     * Signatures:
     *
     *   typed(signatures: Object.<string, function>)
     *   typed(name: string, signatures: Object.<string, function>)
     */
    typed = _typed('typed', {
      'Object': function (signatures) {
        var fns = [];
        for (var signature in signatures) {
          if (signatures.hasOwnProperty(signature)) {
            fns.push(signatures[signature]);
          }
        }
        var name = getName(fns);

        return _typed(name, signatures);
      },
      'string, Object': _typed,
      // TODO: add a signature 'Array.<function>'
      '...Function': function (fns) {
        var err;
        var name = getName(fns);
        var signatures = {};

        for (var i = 0; i < fns.length; i++) {
          var fn = fns[i];

          // test whether this is a typed-function
          if (!(typeof fn.signatures === 'object')) {
            err = new TypeError('Function is no typed-function (index: ' + i + ')');
            err.data = {index: i};
            throw err;
          }

          // merge the signatures
          for (var signature in fn.signatures) {
            if (fn.signatures.hasOwnProperty(signature)) {
              if (signatures.hasOwnProperty(signature)) {
                if (fn.signatures[signature] !== signatures[signature]) {
                  err = new Error('Signature "' + signature + '" is defined twice');
                  err.data = {signature: signature};
                  throw err;
                }
                // else: both signatures point to the same function, that's fine
              }
              else {
                signatures[signature] = fn.signatures[signature];
              }
            }
          }
        }

        return _typed(name, signatures);
      }
    });

    /**
     * Find a specific signature from a (composed) typed function, for
     * example:
     *
     *   typed.find(fn, ['number', 'string'])
     *   typed.find(fn, 'number, string')
     *
     * Function find only only works for exact matches.
     *
     * @param {Function} fn                   A typed-function
     * @param {string | string[]} signature   Signature to be found, can be
     *                                        an array or a comma separated string.
     * @return {Function}                     Returns the matching signature, or
     *                                        throws an errror when no signature
     *                                        is found.
     */
    function find (fn, signature) {
      if (!fn.signatures) {
        throw new TypeError('Function is no typed-function');
      }

      // normalize input
      var arr;
      if (typeof signature === 'string') {
        arr = signature.split(',');
        for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].trim();
        }
      }
      else if (Array.isArray(signature)) {
        arr = signature;
      }
      else {
        throw new TypeError('String array or a comma separated string expected');
      }

      var str = arr.join(',');

      // find an exact match
      var match = fn.signatures[str];
      if (match) {
        return match;
      }

      // TODO: extend find to match non-exact signatures

      throw new TypeError('Signature not found (signature: ' + (fn.name || 'unnamed') + '(' + arr.join(', ') + '))');
    }

    /**
     * Convert a given value to another data type.
     * @param {*} value
     * @param {string} type
     */
    function convert (value, type) {
      var from = getTypeOf(value);

      // check conversion is needed
      if (type === from) {
        return value;
      }

      for (var i = 0; i < typed.conversions.length; i++) {
        var conversion = typed.conversions[i];
        if (conversion.from === from && conversion.to === type) {
          return conversion.convert(value);
        }
      }

      throw new Error('Cannot convert from ' + from + ' to ' + type);
    }

    // attach types and conversions to the final `typed` function
    typed.config = config;
    typed.types = types;
    typed.conversions = conversions;
    typed.ignore = ignore;
    typed.create = create;
    typed.find = find;
    typed.convert = convert;

    // add a type
    typed.addType = function (type) {
      if (!type || typeof type.name !== 'string' || typeof type.test !== 'function') {
        throw new TypeError('Object with properties {name: string, test: function} expected');
      }

      typed.types.push(type);
    };

    // add a conversion
    typed.addConversion = function (conversion) {
      if (!conversion
          || typeof conversion.from !== 'string'
          || typeof conversion.to !== 'string'
          || typeof conversion.convert !== 'function') {
        throw new TypeError('Object with properties {from: string, to: string, convert: function} expected');
      }

      typed.conversions.push(conversion);
    };

    return typed;
  }

  return create();
}));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Test whether a value is a Matrix
 * @param {*} x
 * @returns {boolean} returns true with input is a Matrix
 *                    (like a DenseMatrix or SparseMatrix)
 */
module.exports = function isMatrix (x) {
  return x && x.constructor.prototype.isMatrix || false;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Emitter = __webpack_require__(36);

/**
 * Extend given object with emitter functions `on`, `off`, `once`, `emit`
 * @param {Object} obj
 * @return {Object} obj
 */
exports.mixin = function (obj) {
  // create event emitter
  var emitter = new Emitter();

  // bind methods to obj (we don't want to expose the emitter.e Array...)
  obj.on   = emitter.on.bind(emitter);
  obj.off  = emitter.off.bind(emitter);
  obj.once = emitter.once.bind(emitter);
  obj.emit = emitter.emit.bind(emitter);

  return obj;
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var lazy = __webpack_require__(2).lazy;
var isFactory = __webpack_require__(2).isFactory;
var traverse = __webpack_require__(2).traverse;
var ArgumentsError = __webpack_require__(14);

function factory (type, config, load, typed, math) {
  /**
   * Import functions from an object or a module
   *
   * Syntax:
   *
   *    math.import(object)
   *    math.import(object, options)
   *
   * Where:
   *
   * - `object: Object`
   *   An object with functions to be imported.
   * - `options: Object` An object with import options. Available options:
   *   - `override: boolean`
   *     If true, existing functions will be overwritten. False by default.
   *   - `silent: boolean`
   *     If true, the function will not throw errors on duplicates or invalid
   *     types. False by default.
   *   - `wrap: boolean`
   *     If true, the functions will be wrapped in a wrapper function
   *     which converts data types like Matrix to primitive data types like Array.
   *     The wrapper is needed when extending math.js with libraries which do not
   *     support these data type. False by default.
   *
   * Examples:
   *
   *    // define new functions and variables
   *    math.import({
   *      myvalue: 42,
   *      hello: function (name) {
   *        return 'hello, ' + name + '!';
   *      }
   *    });
   *
   *    // use the imported function and variable
   *    math.myvalue * 2;               // 84
   *    math.hello('user');             // 'hello, user!'
   *
   *    // import the npm module 'numbers'
   *    // (must be installed first with `npm install numbers`)
   *    math.import(require('numbers'), {wrap: true});
   *
   *    math.fibonacci(7); // returns 13
   *
   * @param {Object | Array} object   Object with functions to be imported.
   * @param {Object} [options]        Import options.
   */
  function math_import(object, options) {
    var num = arguments.length;
    if (num !== 1 && num !== 2) {
      throw new ArgumentsError('import', num, 1, 2);
    }

    if (!options) {
      options = {};
    }

    if (isFactory(object)) {
      _importFactory(object, options);
    }
    // TODO: allow a typed-function with name too
    else if (Array.isArray(object)) {
      object.forEach(function (entry) {
        math_import(entry, options);
      });
    }
    else if (typeof object === 'object') {
      // a map with functions
      for (var name in object) {
        if (object.hasOwnProperty(name)) {
          var value = object[name];
          if (isSupportedType(value)) {
            _import(name, value, options);
          }
          else if (isFactory(object)) {
            _importFactory(object, options);
          }
          else {
            math_import(value, options);
          }
        }
      }
    }
    else {
      if (!options.silent) {
        throw new TypeError('Factory, Object, or Array expected');
      }
    }
  }

  /**
   * Add a property to the math namespace and create a chain proxy for it.
   * @param {string} name
   * @param {*} value
   * @param {Object} options  See import for a description of the options
   * @private
   */
  function _import(name, value, options) {
    // TODO: refactor this function, it's to complicated and contains duplicate code
    if (options.wrap && typeof value === 'function') {
      // create a wrapper around the function
      value = _wrap(value);
    }

    if (isTypedFunction(math[name]) && isTypedFunction(value)) {
      if (options.override) {
        // give the typed function the right name
        value = typed(name, value.signatures);
      }
      else {
        // merge the existing and typed function
        value = typed(math[name], value);
      }

      math[name] = value;
      _importTransform(name, value);
      math.emit('import', name, function resolver() {
        return value;
      });
      return;
    }

    if (math[name] === undefined || options.override) {
      math[name] = value;
      _importTransform(name, value);
      math.emit('import', name, function resolver() {
        return value;
      });
      return;
    }

    if (!options.silent) {
      throw new Error('Cannot import "' + name + '": already exists');
    }
  }

  function _importTransform (name, value) {
    if (value && typeof value.transform === 'function') {
      math.expression.transform[name] = value.transform;
      if (allowedInExpressions(name)) {
        math.expression.mathWithTransform[name] = value.transform
      }
    }
    else {
      // remove existing transform
      delete math.expression.transform[name]
      if (allowedInExpressions(name)) {
        math.expression.mathWithTransform[name] = value
      }
    }
  }

  /**
   * Create a wrapper a round an function which converts the arguments
   * to their primitive values (like convert a Matrix to Array)
   * @param {Function} fn
   * @return {Function} Returns the wrapped function
   * @private
   */
  function _wrap (fn) {
    var wrapper = function wrapper () {
      var args = [];
      for (var i = 0, len = arguments.length; i < len; i++) {
        var arg = arguments[i];
        args[i] = arg && arg.valueOf();
      }
      return fn.apply(math, args);
    };

    if (fn.transform) {
      wrapper.transform = fn.transform;
    }

    return wrapper;
  }

  /**
   * Import an instance of a factory into math.js
   * @param {{factory: Function, name: string, path: string, math: boolean}} factory
   * @param {Object} options  See import for a description of the options
   * @private
   */
  function _importFactory(factory, options) {
    if (typeof factory.name === 'string') {
      var name = factory.name;
      var existingTransform = name in math.expression.transform
      var namespace = factory.path ? traverse(math, factory.path) : math;
      var existing = namespace.hasOwnProperty(name) ? namespace[name] : undefined;

      var resolver = function () {
        var instance = load(factory);
        if (instance && typeof instance.transform === 'function') {
          throw new Error('Transforms cannot be attached to factory functions. ' +
              'Please create a separate function for it with exports.path="expression.transform"');
        }

        if (isTypedFunction(existing) && isTypedFunction(instance)) {
          if (options.override) {
            // replace the existing typed function (nothing to do)
          }
          else {
            // merge the existing and new typed function
            instance = typed(existing, instance);
          }

          return instance;
        }

        if (existing === undefined || options.override) {
          return instance;
        }

        if (!options.silent) {
          throw new Error('Cannot import "' + name + '": already exists');
        }
      };

      if (factory.lazy !== false) {
        lazy(namespace, name, resolver);

        if (!existingTransform) {
          if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
            lazy(math.expression.mathWithTransform, name, resolver);
          }
        }
      }
      else {
        namespace[name] = resolver();

        if (!existingTransform) {
          if (factory.path === 'expression.transform' || factoryAllowedInExpressions(factory)) {
            math.expression.mathWithTransform[name] = resolver();
          }
        }
      }

      math.emit('import', name, resolver, factory.path);
    }
    else {
      // unnamed factory.
      // no lazy loading
      load(factory);
    }
  }

  /**
   * Check whether given object is a type which can be imported
   * @param {Function | number | string | boolean | null | Unit | Complex} object
   * @return {boolean}
   * @private
   */
  function isSupportedType(object) {
    return typeof object === 'function'
        || typeof object === 'number'
        || typeof object === 'string'
        || typeof object === 'boolean'
        || object === null
        || (object && type.isUnit(object))
        || (object && type.isComplex(object))
        || (object && type.isBigNumber(object))
        || (object && type.isFraction(object))
        || (object && type.isMatrix(object))
        || (object && Array.isArray(object))
  }

  /**
   * Test whether a given thing is a typed-function
   * @param {*} fn
   * @return {boolean} Returns true when `fn` is a typed-function
   */
  function isTypedFunction (fn) {
    return typeof fn === 'function' && typeof fn.signatures === 'object';
  }

  function allowedInExpressions (name) {
    return !unsafe.hasOwnProperty(name);
  }

  function factoryAllowedInExpressions (factory) {
    return factory.path === undefined && !unsafe.hasOwnProperty(factory.name);
  }

  // namespaces and functions not available in the parser for safety reasons
  var unsafe = {
    'expression': true,
    'type': true,
    'docs': true,
    'error': true,
    'json': true,
    'chain': true // chain method not supported. Note that there is a unit chain too.
  };

  return math_import;
}

exports.math = true; // request access to the math namespace as 5th argument of the factory function
exports.name = 'import';
exports.factory = factory;
exports.lazy = true;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var object = __webpack_require__(2);

function factory (type, config, load, typed, math) {
  var MATRIX = ['Matrix', 'Array'];                   // valid values for option matrix
  var NUMBER = ['number', 'BigNumber', 'Fraction'];   // valid values for option number

  /**
   * Set configuration options for math.js, and get current options.
   * Will emit a 'config' event, with arguments (curr, prev, changes).
   *
   * Syntax:
   *
   *     math.config(config: Object): Object
   *
   * Examples:
   *
   *     math.config().number;                // outputs 'number'
   *     math.eval('0.4');                    // outputs number 0.4
   *     math.config({number: 'Fraction'});
   *     math.eval('0.4');                    // outputs Fraction 2/5
   *
   * @param {Object} [options] Available options:
   *                            {number} epsilon
   *                              Minimum relative difference between two
   *                              compared values, used by all comparison functions.
   *                            {string} matrix
   *                              A string 'Matrix' (default) or 'Array'.
   *                            {string} number
   *                              A string 'number' (default), 'BigNumber', or 'Fraction'
   *                            {number} precision
   *                              The number of significant digits for BigNumbers.
   *                              Not applicable for Numbers.
   *                            {string} parenthesis
   *                              How to display parentheses in LaTeX and string
   *                              output.
   *                            {string} randomSeed
   *                              Random seed for seeded pseudo random number generator.
   *                              Set to null to randomly seed.
   * @return {Object} Returns the current configuration
   */
  function _config(options) {
    if (options) {
      var prev = object.map(config, object.clone);

      // validate some of the options
      validateOption(options, 'matrix', MATRIX);
      validateOption(options, 'number', NUMBER);

      // merge options
      object.deepExtend(config, options);

      var curr = object.map(config, object.clone);

      var changes = object.map(options, object.clone);

      // emit 'config' event
      math.emit('config', curr, prev, changes);

      return curr;
    }
    else {
      return object.map(config, object.clone);
    }
  }

  // attach the valid options to the function so they can be extended
  _config.MATRIX = MATRIX;
  _config.NUMBER = NUMBER;

  return _config;
}

/**
 * Test whether an Array contains a specific item.
 * @param {Array.<string>} array
 * @param {string} item
 * @return {boolean}
 */
function contains (array, item) {
  return array.indexOf(item) !== -1;
}

/**
 * Find a string in an array. Case insensitive search
 * @param {Array.<string>} array
 * @param {string} item
 * @return {number} Returns the index when found. Returns -1 when not found
 */
function findIndex (array, item) {
  return array
      .map(function (i) {
        return i.toLowerCase();
      })
      .indexOf(item.toLowerCase());
}

/**
 * Validate an option
 * @param {Object} options         Object with options
 * @param {string} name            Name of the option to validate
 * @param {Array.<string>} values  Array with valid values for this option
 */
function validateOption(options, name, values) {
  if (options[name] !== undefined && !contains(values, options[name])) {
    var index = findIndex(values, options[name]);
    if (index !== -1) {
      // right value, wrong casing
      // TODO: lower case values are deprecated since v3, remove this warning some day.
      console.warn('Warning: Wrong casing for configuration option "' + name + '", should be "' + values[index] + '" instead of "' + options[name] + '".');

      options[name] = values[index]; // change the option to the right casing
    }
    else {
      // unknown value
      console.warn('Warning: Unknown value "' + options[name] + '" for configuration option "' + name + '". Available options: ' + values.map(JSON.stringify).join(', ') + '.');
    }
  }
}

exports.name = 'config';
exports.math = true; // request the math namespace as fifth argument
exports.factory = factory;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var types = __webpack_require__(11);

function factory (type, config, load, typed) {
  /**
   * Determine the type of a variable.
   *
   * Function `typeof` recognizes the following types of objects:
   *
   * Object                 | Returns       | Example
   * ---------------------- | ------------- | ------------------------------------------
   * null                   | `'null'`      | `math.typeof(null)`
   * number                 | `'number'`    | `math.typeof(3.5)`
   * boolean                | `'boolean'`   | `math.typeof (true)`
   * string                 | `'string'`    | `math.typeof ('hello world')`
   * Array                  | `'Array'`     | `math.typeof ([1, 2, 3])`
   * Date                   | `'Date'`      | `math.typeof (new Date())`
   * Function               | `'Function'`  | `math.typeof (function () {})`
   * Object                 | `'Object'`    | `math.typeof ({a: 2, b: 3})`
   * RegExp                 | `'RegExp'`    | `math.typeof (/a regexp/)`
   * undefined              | `'undefined'` | `math.typeof(undefined)`
   * math.type.BigNumber    | `'BigNumber'` | `math.typeof (math.bignumber('2.3e500'))`
   * math.type.Chain        | `'Chain'`     | `math.typeof (math.chain(2))`
   * math.type.Complex      | `'Complex'`   | `math.typeof (math.complex(2, 3))`
   * math.type.Fraction     | `'Fraction'`  | `math.typeof (math.fraction(1, 3))`
   * math.type.Help         | `'Help'`      | `math.typeof (math.help('sqrt'))`
   * math.type.Index        | `'Index'`     | `math.typeof (math.index(1, 3))`
   * math.type.Matrix       | `'Matrix'`    | `math.typeof (math.matrix([[1,2], [3, 4]]))`
   * math.type.Range        | `'Range'`     | `math.typeof (math.range(0, 10))`
   * math.type.Unit         | `'Unit'`      | `math.typeof (math.unit('45 deg'))`
   *
   * Syntax:
   *
   *    math.typeof(x)
   *
   * Examples:
   *
   *    math.typeof(3.5);                     // returns 'number'
   *    math.typeof(math.complex('2-4i'));    // returns 'Complex'
   *    math.typeof(math.unit('45 deg'));     // returns 'Unit'
   *    math.typeof('hello world');           // returns 'string'
   *
   * @param {*} x     The variable for which to test the type.
   * @return {string} Returns the name of the type. Primitive types are lower case,
   *                  non-primitive types are upper-camel-case.
   *                  For example 'number', 'string', 'Array', 'Date'.
   */
  var _typeof = typed('_typeof', {
    'any': function (x) {
      // JavaScript types
      var t = types.type(x);

      // math.js types
      if (t === 'Object') {
        if (type.isBigNumber(x)) return 'BigNumber';
        if (type.isComplex(x))   return 'Complex';
        if (type.isFraction(x))  return 'Fraction';
        if (type.isMatrix(x))    return 'Matrix';
        if (type.isUnit(x))      return 'Unit';
        if (type.isIndex(x))     return 'Index';
        if (type.isRange(x))     return 'Range';
        if (type.isChain(x))     return 'Chain';
        if (type.isHelp(x))      return 'Help';
      }

      return t;
    }
  });

  _typeof.toTex = undefined; // use default template

  return _typeof;
}

exports.name = 'typeof';
exports.factory = factory;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

function factory (construction, config, load, typed) {
  var docs = {};


  // construction functions
  docs.bignumber = __webpack_require__(41);
  docs['boolean'] = __webpack_require__(42);
  docs.complex = __webpack_require__(43);
  docs.createUnit = __webpack_require__(44);
  docs.fraction = __webpack_require__(45);
  docs.index = __webpack_require__(46);
  docs.matrix = __webpack_require__(47);
  docs.number = __webpack_require__(48);
  docs.sparse = __webpack_require__(49);
  docs.splitUnit = __webpack_require__(50);
  docs.string = __webpack_require__(51);
  docs.unit = __webpack_require__(52);

  // constants
  docs.e = __webpack_require__(15);
  docs.E = __webpack_require__(15);
  docs['false'] = __webpack_require__(53);
  docs.i = __webpack_require__(54);
  docs['Infinity'] = __webpack_require__(55);
  docs.LN2 = __webpack_require__(56);
  docs.LN10 = __webpack_require__(57);
  docs.LOG2E = __webpack_require__(58);
  docs.LOG10E = __webpack_require__(59);
  docs.NaN = __webpack_require__(60);
  docs['null'] = __webpack_require__(61);
  docs.pi = __webpack_require__(16);
  docs.PI = __webpack_require__(16);
  docs.phi = __webpack_require__(62);
  docs.SQRT1_2 = __webpack_require__(63);
  docs.SQRT2 = __webpack_require__(64);
  docs.tau = __webpack_require__(65);
  docs['true'] = __webpack_require__(66);
  docs.version = __webpack_require__(67);

  // physical constants
  // TODO: more detailed docs for physical constants
  docs.speedOfLight = {description: 'Speed of light in vacuum', examples: ['speedOfLight']};
  docs.gravitationConstant = {description: 'Newtonian constant of gravitation', examples: ['gravitationConstant']};
  docs.planckConstant = {description: 'Planck constant', examples: ['planckConstant']};
  docs.reducedPlanckConstant = {description: 'Reduced Planck constant', examples: ['reducedPlanckConstant']};

  docs.magneticConstant = {description: 'Magnetic constant (vacuum permeability)', examples: ['magneticConstant']};
  docs.electricConstant = {description: 'Electric constant (vacuum permeability)', examples: ['electricConstant']};
  docs.vacuumImpedance = {description: 'Characteristic impedance of vacuum', examples: ['vacuumImpedance']};
  docs.coulomb = {description: 'Coulomb\'s constant', examples: ['coulomb']};
  docs.elementaryCharge = {description: 'Elementary charge', examples: ['elementaryCharge']};
  docs.bohrMagneton = {description: 'Borh magneton', examples: ['bohrMagneton']};
  docs.conductanceQuantum = {description: 'Conductance quantum', examples: ['conductanceQuantum']};
  docs.inverseConductanceQuantum = {description: 'Inverse conductance quantum', examples: ['inverseConductanceQuantum']};
  //docs.josephson = {description: 'Josephson constant', examples: ['josephson']};
  docs.magneticFluxQuantum = {description: 'Magnetic flux quantum', examples: ['magneticFluxQuantum']};
  docs.nuclearMagneton = {description: 'Nuclear magneton', examples: ['nuclearMagneton']};
  docs.klitzing = {description: 'Von Klitzing constant', examples: ['klitzing']};

  docs.bohrRadius = {description: 'Borh radius', examples: ['bohrRadius']};
  docs.classicalElectronRadius = {description: 'Classical electron radius', examples: ['classicalElectronRadius']};
  docs.electronMass = {description: 'Electron mass', examples: ['electronMass']};
  docs.fermiCoupling = {description: 'Fermi coupling constant', examples: ['fermiCoupling']};
  docs.fineStructure = {description: 'Fine-structure constant', examples: ['fineStructure']};
  docs.hartreeEnergy = {description: 'Hartree energy', examples: ['hartreeEnergy']};
  docs.protonMass = {description: 'Proton mass', examples: ['protonMass']};
  docs.deuteronMass = {description: 'Deuteron Mass', examples: ['deuteronMass']};
  docs.neutronMass = {description: 'Neutron mass', examples: ['neutronMass']};
  docs.quantumOfCirculation = {description: 'Quantum of circulation', examples: ['quantumOfCirculation']};
  docs.rydberg = {description: 'Rydberg constant', examples: ['rydberg']};
  docs.thomsonCrossSection = {description: 'Thomson cross section', examples: ['thomsonCrossSection']};
  docs.weakMixingAngle = {description: 'Weak mixing angle', examples: ['weakMixingAngle']};
  docs.efimovFactor = {description: 'Efimov factor', examples: ['efimovFactor']};

  docs.atomicMass = {description: 'Atomic mass constant', examples: ['atomicMass']};
  docs.avogadro = {description: 'Avogadro\'s number', examples: ['avogadro']};
  docs.boltzmann = {description: 'Boltzmann constant', examples: ['boltzmann']};
  docs.faraday = {description: 'Faraday constant', examples: ['faraday']};
  docs.firstRadiation = {description: 'First radiation constant', examples: ['firstRadiation']};
  docs.loschmidt = {description: 'Loschmidt constant at T=273.15 K and p=101.325 kPa', examples: ['loschmidt']};
  docs.gasConstant = {description: 'Gas constant', examples: ['gasConstant']};
  docs.molarPlanckConstant = {description: 'Molar Planck constant', examples: ['molarPlanckConstant']};
  docs.molarVolume = {description: 'Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa', examples: ['molarVolume']};
  docs.sackurTetrode = {description: 'Sackur-Tetrode constant at T=1 K and p=101.325 kPa', examples: ['sackurTetrode']};
  docs.secondRadiation = {description: 'Second radiation constant', examples: ['secondRadiation']};
  docs.stefanBoltzmann = {description: 'Stefan-Boltzmann constant', examples: ['stefanBoltzmann']};
  docs.wienDisplacement = {description: 'Wien displacement law constant', examples: ['wienDisplacement']};
  //docs.spectralRadiance = {description: 'First radiation constant for spectral radiance', examples: ['spectralRadiance']};

  docs.molarMass = {description: 'Molar mass constant', examples: ['molarMass']};
  docs.molarMassC12 = {description: 'Molar mass constant of carbon-12', examples: ['molarMassC12']};
  docs.gravity = {description: 'Standard acceleration of gravity (standard acceleration of free-fall on Earth)', examples: ['gravity']};

  docs.planckLength = {description: 'Planck length', examples: ['planckLength']};
  docs.planckMass = {description: 'Planck mass', examples: ['planckMass']};
  docs.planckTime = {description: 'Planck time', examples: ['planckTime']};
  docs.planckCharge = {description: 'Planck charge', examples: ['planckCharge']};
  docs.planckTemperature = {description: 'Planck temperature', examples: ['planckTemperature']};

  // functions - algebra
  docs.derivative = __webpack_require__(68);
  docs.lsolve = __webpack_require__(69);
  docs.lup = __webpack_require__(70);
  docs.lusolve = __webpack_require__(71);
  docs.simplify = __webpack_require__(72);
  docs.rationalize = __webpack_require__(73);
  docs.slu = __webpack_require__(74);
  docs.usolve = __webpack_require__(75);
  docs.qr = __webpack_require__(76);

  // functions - arithmetic
  docs.abs = __webpack_require__(77);
  docs.add = __webpack_require__(78);
  docs.cbrt = __webpack_require__(79);
  docs.ceil = __webpack_require__(80);
  docs.cube = __webpack_require__(81);
  docs.divide = __webpack_require__(82);
  docs.dotDivide = __webpack_require__(83);
  docs.dotMultiply = __webpack_require__(84);
  docs.dotPow = __webpack_require__(85);
  docs.exp = __webpack_require__(86);
  docs.fix = __webpack_require__(87);
  docs.floor = __webpack_require__(88);
  docs.gcd = __webpack_require__(89);
  docs.hypot = __webpack_require__(90);
  docs.lcm = __webpack_require__(91);
  docs.log = __webpack_require__(92);
  docs.log10 = __webpack_require__(93);
  docs.mod = __webpack_require__(94);
  docs.multiply = __webpack_require__(95);
  docs.norm = __webpack_require__(96);
  docs.nthRoot = __webpack_require__(97);
  docs.pow = __webpack_require__(98);
  docs.round = __webpack_require__(99);
  docs.sign = __webpack_require__(100);
  docs.sqrt = __webpack_require__(101);
  docs.square = __webpack_require__(102);
  docs.subtract = __webpack_require__(103);
  docs.unaryMinus = __webpack_require__(104);
  docs.unaryPlus = __webpack_require__(105);
  docs.xgcd = __webpack_require__(106);

  // functions - bitwise
  docs.bitAnd = __webpack_require__(107);
  docs.bitNot = __webpack_require__(108);
  docs.bitOr = __webpack_require__(109);
  docs.bitXor = __webpack_require__(110);
  docs.leftShift = __webpack_require__(111);
  docs.rightArithShift = __webpack_require__(112);
  docs.rightLogShift = __webpack_require__(113);

  // functions - combinatorics
  docs.bellNumbers = __webpack_require__(114);
  docs.catalan = __webpack_require__(115);
  docs.composition = __webpack_require__(116);
  docs.stirlingS2 = __webpack_require__(117);

  // functions - core
  docs['config'] =  __webpack_require__(118);
  docs['import'] =  __webpack_require__(119);
  docs['typed'] =  __webpack_require__(120);

  // functions - complex
  docs.arg = __webpack_require__(121);
  docs.conj = __webpack_require__(122);
  docs.re = __webpack_require__(123);
  docs.im = __webpack_require__(124);

  // functions - expression
  docs['eval'] =  __webpack_require__(125);
  docs.help =  __webpack_require__(126);

  // functions - geometry
  docs.distance = __webpack_require__(127);
  docs.intersect = __webpack_require__(128);

  // functions - logical
  docs['and'] = __webpack_require__(129);
  docs['not'] = __webpack_require__(130);
  docs['or'] = __webpack_require__(131);
  docs['xor'] = __webpack_require__(132);

  // functions - matrix
  docs['concat'] = __webpack_require__(133);
  docs.cross = __webpack_require__(134);
  docs.det = __webpack_require__(135);
  docs.diag = __webpack_require__(136);
  docs.dot = __webpack_require__(137);
  docs.eye = __webpack_require__(138);
  docs.filter =  __webpack_require__(139);
  docs.flatten = __webpack_require__(140);
  docs.forEach =  __webpack_require__(141);
  docs.inv = __webpack_require__(142);
  docs.kron = __webpack_require__(143);
  docs.map =  __webpack_require__(144);
  docs.ones = __webpack_require__(145);
  docs.partitionSelect =  __webpack_require__(146);
  docs.range = __webpack_require__(147);
  docs.resize = __webpack_require__(148);
  docs.reshape = __webpack_require__(149);
  docs.size = __webpack_require__(150);
  docs.sort =  __webpack_require__(151);
  docs.squeeze = __webpack_require__(152);
  docs.subset = __webpack_require__(153);
  docs.trace = __webpack_require__(154);
  docs.transpose = __webpack_require__(155);
  docs.zeros = __webpack_require__(156);

  // functions - probability
  docs.combinations = __webpack_require__(157);
  //docs.distribution = require('./function/probability/distribution');
  docs.factorial = __webpack_require__(158);
  docs.gamma = __webpack_require__(159);
  docs.kldivergence = __webpack_require__(160);
  docs.multinomial = __webpack_require__(161);
  docs.permutations = __webpack_require__(162);
  docs.pickRandom = __webpack_require__(163);
  docs.random = __webpack_require__(164);
  docs.randomInt = __webpack_require__(165);

  // functions - relational
  docs.compare = __webpack_require__(166);
  docs.compareNatural = __webpack_require__(167);
  docs.deepEqual = __webpack_require__(168);
  docs['equal'] = __webpack_require__(169);
  docs.larger = __webpack_require__(170);
  docs.largerEq = __webpack_require__(171);
  docs.smaller = __webpack_require__(172);
  docs.smallerEq = __webpack_require__(173);
  docs.unequal = __webpack_require__(174);

  // functions - set
  docs.setCartesian = __webpack_require__(175);
  docs.setDifference = __webpack_require__(176);
  docs.setDistinct = __webpack_require__(177);
  docs.setIntersect = __webpack_require__(178);
  docs.setIsSubset = __webpack_require__(179);
  docs.setMultiplicity = __webpack_require__(180);
  docs.setPowerset = __webpack_require__(181);
  docs.setSize = __webpack_require__(182);
  docs.setSymDifference = __webpack_require__(183);
  docs.setUnion = __webpack_require__(184);

  // functions - special
  docs.erf = __webpack_require__(185);

  // functions - statistics
  docs.mad = __webpack_require__(186);
  docs.max = __webpack_require__(187);
  docs.mean = __webpack_require__(188);
  docs.median = __webpack_require__(189);
  docs.min = __webpack_require__(190);
  docs.mode = __webpack_require__(191);
  docs.prod = __webpack_require__(192);
  docs.quantileSeq = __webpack_require__(193);
  docs.std = __webpack_require__(194);
  docs.sum = __webpack_require__(195);
  docs['var'] = __webpack_require__(196);

  // functions - trigonometry
  docs.acos = __webpack_require__(197);
  docs.acosh = __webpack_require__(198);
  docs.acot = __webpack_require__(199);
  docs.acoth = __webpack_require__(200);
  docs.acsc = __webpack_require__(201);
  docs.acsch = __webpack_require__(202);
  docs.asec = __webpack_require__(203);
  docs.asech = __webpack_require__(204);
  docs.asin = __webpack_require__(205);
  docs.asinh = __webpack_require__(206);
  docs.atan = __webpack_require__(207);
  docs.atanh = __webpack_require__(208);
  docs.atan2 = __webpack_require__(209);
  docs.cos = __webpack_require__(210);
  docs.cosh = __webpack_require__(211);
  docs.cot = __webpack_require__(212);
  docs.coth = __webpack_require__(213);
  docs.csc = __webpack_require__(214);
  docs.csch = __webpack_require__(215);
  docs.sec = __webpack_require__(216);
  docs.sech = __webpack_require__(217);
  docs.sin = __webpack_require__(218);
  docs.sinh = __webpack_require__(219);
  docs.tan = __webpack_require__(220);
  docs.tanh = __webpack_require__(221);

  // functions - units
  docs.to = __webpack_require__(222);

  // functions - utils
  docs.clone = __webpack_require__(223);
  docs.format = __webpack_require__(224);
  docs.isNaN = __webpack_require__(225);
  docs.isInteger = __webpack_require__(226);
  docs.isNegative = __webpack_require__(227);
  docs.isNumeric = __webpack_require__(228);
  docs.isPositive = __webpack_require__(229);
  docs.isPrime = __webpack_require__(230);
  docs.isZero = __webpack_require__(231);
  // docs.print = require('./function/utils/print'); // TODO: add documentation for print as soon as the parser supports objects.
  docs['typeof'] =  __webpack_require__(232);

  return docs;
}

exports.name = 'docs';
exports.path = 'expression';
exports.factory = factory;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'bignumber',
  'category': 'Construction',
  'syntax': [
    'bignumber(x)'
  ],
  'description':
      'Create a big number from a number or string.',
  'examples': [
    '0.1 + 0.2',
    'bignumber(0.1) + bignumber(0.2)',
    'bignumber("7.2")',
    'bignumber("7.2e500")',
    'bignumber([0.1, 0.2, 0.3])'
  ],
  'seealso': [
    'boolean', 'complex', 'fraction', 'index', 'matrix', 'string', 'unit'
  ]
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'boolean',
  'category': 'Construction',
  'syntax': [
    'x',
    'boolean(x)'
  ],
  'description':
      'Convert a string or number into a boolean.',
  'examples': [
    'boolean(0)',
    'boolean(1)',
    'boolean(3)',
    'boolean("true")',
    'boolean("false")',
    'boolean([1, 0, 1, 1])'
  ],
  'seealso': [
    'bignumber', 'complex', 'index', 'matrix', 'number', 'string', 'unit'
  ]
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'complex',
  'category': 'Construction',
  'syntax': [
    'complex()',
    'complex(re, im)',
    'complex(string)'
  ],
  'description':
      'Create a complex number.',
  'examples': [
    'complex()',
    'complex(2, 3)',
    'complex("7 - 2i")'
  ],
  'seealso': [
    'bignumber', 'boolean', 'index', 'matrix', 'number', 'string', 'unit'
  ]
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'createUnit',
  'category': 'Construction',
  'syntax': [
    'createUnit(definitions)',
    'createUnit(name, definition)'
  ],
  'description':
      'Create a user-defined unit and register it with the Unit type.',
  'examples': [
    'createUnit("foo")',
    'createUnit("knot", {definition: "0.514444444 m/s", aliases: ["knots", "kt", "kts"]})',
    'createUnit("mph", "1 mile/hour")'
  ],
  'seealso': [
    'unit', 'splitUnit'
  ]
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'fraction',
  'category': 'Construction',
  'syntax': [
    'fraction(num)',
    'fraction(num,den)'
  ],
  'description':
    'Create a fraction from a number or from a numerator and denominator.',
  'examples': [
    'fraction(0.125)',
    'fraction(1, 3) + fraction(2, 5)'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'index', 'matrix', 'string', 'unit'
  ]
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'index',
  'category': 'Construction',
  'syntax': [
    '[start]',
    '[start:end]',
    '[start:step:end]',
    '[start1, start 2, ...]',
    '[start1:end1, start2:end2, ...]',
    '[start1:step1:end1, start2:step2:end2, ...]'
  ],
  'description':
      'Create an index to get or replace a subset of a matrix',
  'examples': [
    '[]',
    '[1, 2, 3]',
    'A = [1, 2, 3; 4, 5, 6]',
    'A[1, :]',
    'A[1, 2] = 50',
    'A[0:2, 0:2] = ones(2, 2)'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'matrix,', 'number', 'range', 'string', 'unit'
  ]
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'matrix',
  'category': 'Construction',
  'syntax': [
    '[]',
    '[a1, b1, ...; a2, b2, ...]',
    'matrix()',
    'matrix("dense")',
    'matrix([...])'
  ],
  'description':
      'Create a matrix.',
  'examples': [
    '[]',
    '[1, 2, 3]',
    '[1, 2, 3; 4, 5, 6]',
    'matrix()',
    'matrix([3, 4])',
    'matrix([3, 4; 5, 6], "sparse")',
    'matrix([3, 4; 5, 6], "sparse", "number")'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'index', 'number', 'string', 'unit', 'sparse'
  ]
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'number',
  'category': 'Construction',
  'syntax': [
    'x',
    'number(x)',
    'number(unit, valuelessUnit)'
  ],
  'description':
      'Create a number or convert a string or boolean into a number.',
  'examples': [
    '2',
    '2e3',
    '4.05',
    'number(2)',
    'number("7.2")',
    'number(true)',
    'number([true, false, true, true])',
    'number(unit("52cm"), "m")'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'fraction', 'index', 'matrix', 'string', 'unit'
  ]
};


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sparse',
  'category': 'Construction',
  'syntax': [
    'sparse()',
    'sparse([a1, b1, ...; a1, b2, ...])',
    'sparse([a1, b1, ...; a1, b2, ...], "number")'
  ],
  'description':
  'Create a sparse matrix.',
  'examples': [
    'sparse()',
    'sparse([3, 4; 5, 6])',
    'sparse([3, 0; 5, 0], "number")'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'index', 'number', 'string', 'unit', 'matrix'
  ]
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'splitUnit',
  'category': 'Construction',
  'syntax': [
    'splitUnit(unit: Unit, parts: Unit[])'
  ],
  'description':
      'Split a unit in an array of units whose sum is equal to the original unit.',
  'examples': [
    'splitUnit(1 m, ["feet", "inch"])'
  ],
  'seealso': [
    'unit', 'createUnit'
  ]
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'string',
  'category': 'Construction',
  'syntax': [
    '"text"',
    'string(x)'
  ],
  'description':
      'Create a string or convert a value to a string',
  'examples': [
    '"Hello World!"',
    'string(4.2)',
    'string(3 + 2i)'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'index', 'matrix', 'number', 'unit'
  ]
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'unit',
  'category': 'Construction',
  'syntax': [
    'value unit',
    'unit(value, unit)',
    'unit(string)'
  ],
  'description':
      'Create a unit.',
  'examples': [
    '5.5 mm',
    '3 inch',
    'unit(7.1, "kilogram")',
    'unit("23 deg")'
  ],
  'seealso': [
    'bignumber', 'boolean', 'complex', 'index', 'matrix', 'number', 'string'
  ]
};


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'false',
  'category': 'Constants',
  'syntax': [
    'false'
  ],
  'description': 'Boolean value false',
  'examples': [
    'false'
  ],
  'seealso': ['true']
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'i',
  'category': 'Constants',
  'syntax': [
    'i'
  ],
  'description': 'Imaginary unit, defined as i*i=-1. A complex number is described as a + b*i, where a is the real part, and b is the imaginary part.',
  'examples': [
    'i',
    'i * i',
    'sqrt(-1)'
  ],
  'seealso': []
};


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'Infinity',
  'category': 'Constants',
  'syntax': [
    'Infinity'
  ],
  'description': 'Infinity, a number which is larger than the maximum number that can be handled by a floating point number.',
  'examples': [
    'Infinity',
    '1 / 0'
  ],
  'seealso': []
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'LN2',
  'category': 'Constants',
  'syntax': [
    'LN2'
  ],
  'description': 'Returns the natural logarithm of 2, approximately equal to 0.693',
  'examples': [
    'LN2',
    'log(2)'
  ],
  'seealso': []
};


/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'LN10',
  'category': 'Constants',
  'syntax': [
    'LN10'
  ],
  'description': 'Returns the natural logarithm of 10, approximately equal to 2.302',
  'examples': [
    'LN10',
    'log(10)'
  ],
  'seealso': []
};


/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'LOG2E',
  'category': 'Constants',
  'syntax': [
    'LOG2E'
  ],
  'description': 'Returns the base-2 logarithm of E, approximately equal to 1.442',
  'examples': [
    'LOG2E',
    'log(e, 2)'
  ],
  'seealso': []
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'LOG10E',
  'category': 'Constants',
  'syntax': [
    'LOG10E'
  ],
  'description': 'Returns the base-10 logarithm of E, approximately equal to 0.434',
  'examples': [
    'LOG10E',
    'log(e, 10)'
  ],
  'seealso': []
};


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'NaN',
  'category': 'Constants',
  'syntax': [
    'NaN'
  ],
  'description': 'Not a number',
  'examples': [
    'NaN',
    '0 / 0'
  ],
  'seealso': []
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'null',
  'category': 'Constants',
  'syntax': [
    'null'
  ],
  'description': 'Value null',
  'examples': [
    'null'
  ],
  'seealso': ['true', 'false']
};


/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'phi',
  'category': 'Constants',
  'syntax': [
    'phi'
  ],
  'description': 'Phi is the golden ratio. Two quantities are in the golden ratio if their ratio is the same as the ratio of their sum to the larger of the two quantities. Phi is defined as `(1 + sqrt(5)) / 2` and is approximately 1.618034...',
  'examples': [
    'phi'
  ],
  'seealso': []
};


/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'SQRT1_2',
  'category': 'Constants',
  'syntax': [
    'SQRT1_2'
  ],
  'description': 'Returns the square root of 1/2, approximately equal to 0.707',
  'examples': [
    'SQRT1_2',
    'sqrt(1/2)'
  ],
  'seealso': []
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'SQRT2',
  'category': 'Constants',
  'syntax': [
    'SQRT2'
  ],
  'description': 'Returns the square root of 2, approximately equal to 1.414',
  'examples': [
    'SQRT2',
    'sqrt(2)'
  ],
  'seealso': []
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'tau',
  'category': 'Constants',
  'syntax': [
    'tau'
  ],
  'description': 'Tau is the ratio constant of a circle\'s circumference to radius, equal to 2 * pi, approximately 6.2832.',
  'examples': [
    'tau',
    '2 * pi'
  ],
  'seealso': ['pi']
};


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'true',
  'category': 'Constants',
  'syntax': [
    'true'
  ],
  'description': 'Boolean value true',
  'examples': [
    'true'
  ],
  'seealso': ['false']
};


/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'version',
  'category': 'Constants',
  'syntax': [
    'version'
  ],
  'description': 'A string with the version number of math.js',
  'examples': [
    'version'
  ],
  'seealso': []
};


/***/ }),
/* 68 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'derivative',
  'category': 'Algebra',
  'syntax': [
    'derivative(expr, variable)',
    'derivative(expr, variable, {simplify: boolean})'
  ],
  'description': 'Takes the derivative of an expression expressed in parser Nodes. The derivative will be taken over the supplied variable in the second parameter. If there are multiple variables in the expression, it will return a partial derivative.',
  'examples': [
    'derivative("2x^3", "x")',
    'derivative("2x^3", "x", {simplify: false})',
    'derivative("2x^2 + 3x + 4", "x")',
    'derivative("sin(2x)", "x")',
    'f = parse("x^2 + x")',
    'x = parse("x")',
    'df = derivative(f, x)',
    'df.eval({x: 3})'
  ],
  'seealso': [
    'simplify', 'parse', 'eval'
  ]
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'lsolve',
  'category': 'Algebra',
  'syntax': [
    'x=lsolve(L, b)'
  ],
  'description':
  'Solves the linear system L * x = b where L is an [n x n] lower triangular matrix and b is a [n] column vector.',
  'examples': [
    'a = [-2, 3; 2, 1]',
    'b = [11, 9]',
    'x = lsolve(a, b)'
  ],
  'seealso': [
    'lup', 'lusolve', 'usolve', 'matrix', 'sparse'
  ]
};


/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'lup',
  'category': 'Algebra',
  'syntax': [
    'lup(m)'
  ],
  'description':
  'Calculate the Matrix LU decomposition with partial pivoting. Matrix A is decomposed in three matrices (L, U, P) where P * A = L * U',
  'examples': [
    'lup([[2, 1], [1, 4]])',
    'lup(matrix([[2, 1], [1, 4]]))',
    'lup(sparse([[2, 1], [1, 4]]))'
  ],
  'seealso': [
    'lusolve', 'lsolve', 'usolve', 'matrix', 'sparse', 'slu', 'qr'
  ]
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'lusolve',
  'category': 'Algebra',
  'syntax': [
    'x=lusolve(A, b)',
    'x=lusolve(lu, b)'
  ],
  'description': 'Solves the linear system A * x = b where A is an [n x n] matrix and b is a [n] column vector.',
  'examples': [
    'a = [-2, 3; 2, 1]',
    'b = [11, 9]',
    'x = lusolve(a, b)'
  ],
  'seealso': [
    'lup', 'slu', 'lsolve', 'usolve', 'matrix', 'sparse'
  ]
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'simplify',
  'category': 'Algebra',
  'syntax': [
    'simplify(expr)',
    'simplify(expr, rules)'
  ],
  'description': 'Simplify an expression tree.',
  'examples': [
    'simplify("3 + 2 / 4")',
    'simplify("2x + x")',
    'f = parse("x * (x + 2 + x)")',
    'simplified = simplify(f)',
    'simplified.eval({x: 2})'
  ],
  'seealso': [
    'derivative', 'parse', 'eval'
  ]
};


/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'rationalize',
  'category': 'Algebra',
  'syntax': [
    'rationalize(expr)',
    'rationalize(expr, scope)',
    'rationalize(expr, scope, detailed)'
  ],
  'description': 'Transform a rationalizable expression in a rational fraction. If rational fraction is one variable polynomial then converts the numerator and denominator in canonical form, with decreasing exponents, returning the coefficients of numerator.',
  'examples': [
    'rationalize("2x/y - y/(x+1)")',
    'rationalize("2x/y - y/(x+1)", true)',
  ],
  'seealso': [
    'simplify'
  ]
};


/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'slu',
  'category': 'Algebra',
  'syntax': [
    'slu(A, order, threshold)'
  ],
  'description': 'Calculate the Matrix LU decomposition with full pivoting. Matrix A is decomposed in two matrices (L, U) and two permutation vectors (pinv, q) where P * A * Q = L * U',
  'examples': [
    'slu(sparse([4.5, 0, 3.2, 0; 3.1, 2.9, 0, 0.9; 0, 1.7, 3, 0; 3.5, 0.4, 0, 1]), 1, 0.001)'
  ],
  'seealso': [
    'lusolve', 'lsolve', 'usolve', 'matrix', 'sparse', 'lup', 'qr'
  ]
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'usolve',
  'category': 'Algebra',
  'syntax': [
    'x=usolve(U, b)'
  ],
  'description':
  'Solves the linear system U * x = b where U is an [n x n] upper triangular matrix and b is a [n] column vector.',
  'examples': [
    'x=usolve(sparse([1, 1, 1, 1; 0, 1, 1, 1; 0, 0, 1, 1; 0, 0, 0, 1]), [1; 2; 3; 4])'
  ],
  'seealso': [
    'lup', 'lusolve', 'lsolve', 'matrix', 'sparse'
  ]
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'qr',
  'category': 'Algebra',
  'syntax': [
    'qr(A)'
  ],
  'description':
  'Calculates the Matrix QR decomposition. Matrix `A` is decomposed in two matrices (`Q`, `R`) where `Q` is an orthogonal matrix and `R` is an upper triangular matrix.',
  'examples': [
    'qr([[1, -1,  4], [1,  4, -2], [1,  4,  2], [1,  -1, 0]])'
  ],
  'seealso': [
    'lup', 'slu', 'matrix'
  ]
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'abs',
  'category': 'Arithmetic',
  'syntax': [
    'abs(x)'
  ],
  'description': 'Compute the absolute value.',
  'examples': [
    'abs(3.5)',
    'abs(-4.2)'
  ],
  'seealso': ['sign']
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'add',
  'category': 'Operators',
  'syntax': [
    'x + y',
    'add(x, y)'
  ],
  'description': 'Add two values.',
  'examples': [
    'a = 2.1 + 3.6',
    'a - 3.6',
    '3 + 2i',
    '3 cm + 2 inch',
    '"2.3" + "4"'
  ],
  'seealso': [
    'subtract'
  ]
};


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'cbrt',
  'category': 'Arithmetic',
  'syntax': [
    'cbrt(x)',
    'cbrt(x, allRoots)'
  ],
  'description':
      'Compute the cubic root value. If x = y * y * y, then y is the cubic root of x. When `x` is a number or complex number, an optional second argument `allRoots` can be provided to return all three cubic roots. If not provided, the principal root is returned',
  'examples': [
    'cbrt(64)',
    'cube(4)',
    'cbrt(-8)',
    'cbrt(2 + 3i)',
    'cbrt(8i)',
    'cbrt(8i, true)',
    'cbrt(27 m^3)'
  ],
  'seealso': [
    'square',
    'sqrt',
    'cube',
    'multiply'
  ]
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'ceil',
  'category': 'Arithmetic',
  'syntax': [
    'ceil(x)'
  ],
  'description':
      'Round a value towards plus infinity. If x is complex, both real and imaginary part are rounded towards plus infinity.',
  'examples': [
    'ceil(3.2)',
    'ceil(3.8)',
    'ceil(-4.2)'
  ],
  'seealso': ['floor', 'fix', 'round']
};


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'cube',
  'category': 'Arithmetic',
  'syntax': [
    'cube(x)'
  ],
  'description': 'Compute the cube of a value. The cube of x is x * x * x.',
  'examples': [
    'cube(2)',
    '2^3',
    '2 * 2 * 2'
  ],
  'seealso': [
    'multiply',
    'square',
    'pow'
  ]
};


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'divide',
  'category': 'Operators',
  'syntax': [
    'x / y',
    'divide(x, y)'
  ],
  'description': 'Divide two values.',
  'examples': [
    'a = 2 / 3',
    'a * 3',
    '4.5 / 2',
    '3 + 4 / 2',
    '(3 + 4) / 2',
    '18 km / 4.5'
  ],
  'seealso': [
    'multiply'
  ]
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'dotDivide',
  'category': 'Operators',
  'syntax': [
    'x ./ y',
    'dotDivide(x, y)'
  ],
  'description': 'Divide two values element wise.',
  'examples': [
    'a = [1, 2, 3; 4, 5, 6]',
    'b = [2, 1, 1; 3, 2, 5]',
    'a ./ b'
  ],
  'seealso': [
    'multiply',
    'dotMultiply',
    'divide'
  ]
};


/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'dotMultiply',
  'category': 'Operators',
  'syntax': [
    'x .* y',
    'dotMultiply(x, y)'
  ],
  'description': 'Multiply two values element wise.',
  'examples': [
    'a = [1, 2, 3; 4, 5, 6]',
    'b = [2, 1, 1; 3, 2, 5]',
    'a .* b'
  ],
  'seealso': [
    'multiply',
    'divide',
    'dotDivide'
  ]
};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'dotpow',
  'category': 'Operators',
  'syntax': [
    'x .^ y',
    'dotpow(x, y)'
  ],
  'description':
      'Calculates the power of x to y element wise.',
  'examples': [
    'a = [1, 2, 3; 4, 5, 6]',
    'a .^ 2'
  ],
  'seealso': [
    'pow'
  ]
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'exp',
  'category': 'Arithmetic',
  'syntax': [
    'exp(x)'
  ],
  'description': 'Calculate the exponent of a value.',
  'examples': [
    'exp(1.3)',
    'e ^ 1.3',
    'log(exp(1.3))',
    'x = 2.4',
    '(exp(i*x) == cos(x) + i*sin(x))   # Euler\'s formula'
  ],
  'seealso': [
    'pow',
    'log'
  ]
};


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'fix',
  'category': 'Arithmetic',
  'syntax': [
    'fix(x)'
  ],
  'description':
      'Round a value towards zero. If x is complex, both real and imaginary part are rounded towards zero.',
  'examples': [
    'fix(3.2)',
    'fix(3.8)',
    'fix(-4.2)',
    'fix(-4.8)'
  ],
  'seealso': ['ceil', 'floor', 'round']
};


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'floor',
  'category': 'Arithmetic',
  'syntax': [
    'floor(x)'
  ],
  'description':
      'Round a value towards minus infinity.If x is complex, both real and imaginary part are rounded towards minus infinity.',
  'examples': [
    'floor(3.2)',
    'floor(3.8)',
    'floor(-4.2)'
  ],
  'seealso': ['ceil', 'fix', 'round']
};


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'gcd',
  'category': 'Arithmetic',
  'syntax': [
    'gcd(a, b)',
    'gcd(a, b, c, ...)'
  ],
  'description': 'Compute the greatest common divisor.',
  'examples': [
    'gcd(8, 12)',
    'gcd(-4, 6)',
    'gcd(25, 15, -10)'
  ],
  'seealso': [ 'lcm', 'xgcd' ]
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'hypot',
  'category': 'Arithmetic',
  'syntax': [
    'hypot(a, b, c, ...)',
    'hypot([a, b, c, ...])'
  ],
  'description': 'Calculate the hypotenusa of a list with values. ',
  'examples': [
    'hypot(3, 4)',
    'sqrt(3^2 + 4^2)',
    'hypot(-2)',
    'hypot([3, 4, 5])'
  ],
  'seealso': [ 'abs', 'norm' ]
};


/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'lcm',
  'category': 'Arithmetic',
  'syntax': [
    'lcm(x, y)'
  ],
  'description': 'Compute the least common multiple.',
  'examples': [
    'lcm(4, 6)',
    'lcm(6, 21)',
    'lcm(6, 21, 5)'
  ],
  'seealso': [ 'gcd' ]
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'log',
  'category': 'Arithmetic',
  'syntax': [
    'log(x)',
    'log(x, base)'
  ],
  'description': 'Compute the logarithm of a value. If no base is provided, the natural logarithm of x is calculated. If base if provided, the logarithm is calculated for the specified base. log(x, base) is defined as log(x) / log(base).',
  'examples': [
    'log(3.5)',
    'a = log(2.4)',
    'exp(a)',
    '10 ^ 4',
    'log(10000, 10)',
    'log(10000) / log(10)',
    'b = log(1024, 2)',
    '2 ^ b'
  ],
  'seealso': [
    'exp',
    'log10'
  ]
};

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'log10',
  'category': 'Arithmetic',
  'syntax': [
    'log10(x)'
  ],
  'description': 'Compute the 10-base logarithm of a value.',
  'examples': [
    'log10(0.00001)',
    'log10(10000)',
    '10 ^ 4',
    'log(10000) / log(10)',
    'log(10000, 10)'
  ],
  'seealso': [
    'exp',
    'log'
  ]
};


/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'mod',
  'category': 'Operators',
  'syntax': [
    'x % y',
    'x mod y',
    'mod(x, y)'
  ],
  'description':
      'Calculates the modulus, the remainder of an integer division.',
  'examples': [
    '7 % 3',
    '11 % 2',
    '10 mod 4',
    'isOdd(x) = x % 2',
    'isOdd(2)',
    'isOdd(3)'
  ],
  'seealso': ['divide']
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'multiply',
  'category': 'Operators',
  'syntax': [
    'x * y',
    'multiply(x, y)'
  ],
  'description': 'multiply two values.',
  'examples': [
    'a = 2.1 * 3.4',
    'a / 3.4',
    '2 * 3 + 4',
    '2 * (3 + 4)',
    '3 * 2.1 km'
  ],
  'seealso': [
    'divide'
  ]
};


/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'norm',
  'category': 'Arithmetic',
  'syntax': [
    'norm(x)',
    'norm(x, p)'
  ],
  'description': 'Calculate the norm of a number, vector or matrix.',
  'examples': [
    'abs(-3.5)',
    'norm(-3.5)',
    'norm(3 - 4i)',
    'norm([1, 2, -3], Infinity)',
    'norm([1, 2, -3], -Infinity)',
    'norm([3, 4], 2)',
    'norm([[1, 2], [3, 4]], 1)',
    'norm([[1, 2], [3, 4]], "inf")',
    'norm([[1, 2], [3, 4]], "fro")'
  ]
};


/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'nthRoot',
  'category': 'Arithmetic',
  'syntax': [
    'nthRoot(a)',
    'nthRoot(a, root)'
  ],
  'description': 'Calculate the nth root of a value. ' +
      'The principal nth root of a positive real number A, ' +
      'is the positive real solution of the equation "x^root = A".',
  'examples': [
    '4 ^ 3',
    'nthRoot(64, 3)',
    'nthRoot(9, 2)',
    'sqrt(9)'
  ],
  'seealso': [
    'sqrt',
    'pow'
  ]
};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'pow',
  'category': 'Operators',
  'syntax': [
    'x ^ y',
    'pow(x, y)'
  ],
  'description':
      'Calculates the power of x to y, x^y.',
  'examples': [
    '2^3',
    '2*2*2',
    '1 + e ^ (pi * i)'
  ],
  'seealso': [ 'multiply' ]
};


/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'round',
  'category': 'Arithmetic',
  'syntax': [
    'round(x)',
    'round(x, n)'
  ],
  'description':
      'round a value towards the nearest integer.If x is complex, both real and imaginary part are rounded towards the nearest integer. When n is specified, the value is rounded to n decimals.',
  'examples': [
    'round(3.2)',
    'round(3.8)',
    'round(-4.2)',
    'round(-4.8)',
    'round(pi, 3)',
    'round(123.45678, 2)'
  ],
  'seealso': ['ceil', 'floor', 'fix']
};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sign',
  'category': 'Arithmetic',
  'syntax': [
    'sign(x)'
  ],
  'description':
      'Compute the sign of a value. The sign of a value x is 1 when x>1, -1 when x<0, and 0 when x=0.',
  'examples': [
    'sign(3.5)',
    'sign(-4.2)',
    'sign(0)'
  ],
  'seealso': [
    'abs'
  ]
};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sqrt',
  'category': 'Arithmetic',
  'syntax': [
    'sqrt(x)'
  ],
  'description':
      'Compute the square root value. If x = y * y, then y is the square root of x.',
  'examples': [
    'sqrt(25)',
    '5 * 5',
    'sqrt(-1)'
  ],
  'seealso': [
    'square',
    'multiply'
  ]
};


/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'square',
  'category': 'Arithmetic',
  'syntax': [
    'square(x)'
  ],
  'description':
      'Compute the square of a value. The square of x is x * x.',
  'examples': [
    'square(3)',
    'sqrt(9)',
    '3^2',
    '3 * 3'
  ],
  'seealso': [
    'multiply',
    'pow',
    'sqrt',
    'cube'
  ]
};


/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'subtract',
  'category': 'Operators',
  'syntax': [
    'x - y',
    'subtract(x, y)'
  ],
  'description': 'subtract two values.',
  'examples': [
    'a = 5.3 - 2',
    'a + 2',
    '2/3 - 1/6',
    '2 * 3 - 3',
    '2.1 km - 500m'
  ],
  'seealso': [
    'add'
  ]
};


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'unaryMinus',
  'category': 'Operators',
  'syntax': [
    '-x',
    'unaryMinus(x)'
  ],
  'description':
      'Inverse the sign of a value. Converts booleans and strings to numbers.',
  'examples': [
    '-4.5',
    '-(-5.6)',
    '-"22"'
  ],
  'seealso': [
    'add', 'subtract', 'unaryPlus'
  ]
};


/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'unaryPlus',
  'category': 'Operators',
  'syntax': [
    '+x',
    'unaryPlus(x)'
  ],
  'description':
      'Converts booleans and strings to numbers.',
  'examples': [
    '+true',
    '+"2"'
  ],
  'seealso': [
    'add', 'subtract', 'unaryMinus'
  ]
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'xgcd',
  'category': 'Arithmetic',
  'syntax': [
    'xgcd(a, b)'
  ],
  'description': 'Calculate the extended greatest common divisor for two values. The result is an array [d, x, y] with 3 entries, where d is the greatest common divisor, and d = x * a + y * b.',
  'examples': [
    'xgcd(8, 12)',
    'gcd(8, 12)',
    'xgcd(36163, 21199)'
  ],
  'seealso': [ 'gcd', 'lcm' ]
};


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'bitAnd',
  'category': 'Bitwise',
  'syntax': [
    'x & y',
    'bitAnd(x, y)'
  ],
  'description': 'Bitwise AND operation. Performs the logical AND operation on each pair of the corresponding bits of the two given values by multiplying them. If both bits in the compared position are 1, the bit in the resulting binary representation is 1, otherwise, the result is 0',
  'examples': [
    '5 & 3',
    'bitAnd(53, 131)',
    '[1, 12, 31] & 42'
  ],
  'seealso': [
    'bitNot', 'bitOr', 'bitXor', 'leftShift', 'rightArithShift', 'rightLogShift'
  ]
};


/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'bitNot',
  'category': 'Bitwise',
  'syntax': [
    '~x',
    'bitNot(x)'
  ],
  'description': 'Bitwise NOT operation. Performs a logical negation on each bit of the given value. Bits that are 0 become 1, and those that are 1 become 0.',
  'examples': [
    '~1',
    '~2',
    'bitNot([2, -3, 4])'
  ],
  'seealso': [
    'bitAnd', 'bitOr', 'bitXor', 'leftShift', 'rightArithShift', 'rightLogShift'
  ]
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'bitOr',
  'category': 'Bitwise',
  'syntax': [
    'x | y',
    'bitOr(x, y)'
  ],
  'description': 'Bitwise OR operation. Performs the logical inclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if the first bit is 1 or the second bit is 1 or both bits are 1, otherwise, the result is 0.',
  'examples': [
    '5 | 3',
    'bitOr([1, 2, 3], 4)'
  ],
  'seealso': [
    'bitAnd', 'bitNot', 'bitXor', 'leftShift', 'rightArithShift', 'rightLogShift'
  ]
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'bitXor',
  'category': 'Bitwise',
  'syntax': [
    'bitXor(x, y)'
  ],
  'description': 'Bitwise XOR operation, exclusive OR. Performs the logical exclusive OR operation on each pair of corresponding bits of the two given values. The result in each position is 1 if only the first bit is 1 or only the second bit is 1, but will be 0 if both are 0 or both are 1.',
  'examples': [
    'bitOr(1, 2)',
    'bitXor([2, 3, 4], 4)'
  ],
  'seealso': [
    'bitAnd', 'bitNot', 'bitOr', 'leftShift', 'rightArithShift', 'rightLogShift'
  ]
};


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'leftShift',
  'category': 'Bitwise',
  'syntax': [
    'x << y',
    'leftShift(x, y)'
  ],
  'description': 'Bitwise left logical shift of a value x by y number of bits.',
  'examples': [
    '4 << 1',
    '8 >> 1'
  ],
  'seealso': [
    'bitAnd', 'bitNot', 'bitOr', 'bitXor', 'rightArithShift', 'rightLogShift'
  ]
};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'rightArithShift',
  'category': 'Bitwise',
  'syntax': [
    'x >> y',
    'rightArithShift(x, y)'
  ],
  'description': 'Bitwise right arithmetic shift of a value x by y number of bits.',
  'examples': [
    '8 >> 1',
    '4 << 1',
    '-12 >> 2'
  ],
  'seealso': [
    'bitAnd', 'bitNot', 'bitOr', 'bitXor', 'leftShift', 'rightLogShift'
  ]
};


/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'rightLogShift',
  'category': 'Bitwise',
  'syntax': [
    'x >>> y',
    'rightLogShift(x, y)'
  ],
  'description': 'Bitwise right logical shift of a value x by y number of bits.',
  'examples': [
    '8 >>> 1',
    '4 << 1',
    '-12 >>> 2'
  ],
  'seealso': [
    'bitAnd', 'bitNot', 'bitOr', 'bitXor', 'leftShift', 'rightArithShift'
  ]
};


/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'bellNumbers',
  'category': 'Combinatorics',
  'syntax': [
    'bellNumbers(n)'
  ],
  'description': 'The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S. `bellNumbers` only takes integer arguments. The following condition must be enforced: n >= 0.',
  'examples': [
    'bellNumbers(3)',
    'bellNumbers(8)'
  ],
  'seealso': ['stirlingS2']
};

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'catalan',
  'category': 'Combinatorics',
  'syntax': [
    'catalan(n)'
  ],
  'description': 'The Catalan Numbers enumerate combinatorial structures of many different types. catalan only takes integer arguments. The following condition must be enforced: n >= 0.',
  'examples': [
    'catalan(3)',
    'catalan(8)'
  ],
  'seealso': ['bellNumbers']
};

/***/ }),
/* 116 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'composition',
  'category': 'Combinatorics',
  'syntax': [
    'composition(n, k)'
  ],
  'description': 'The composition counts of n into k parts. composition only takes integer arguments. The following condition must be enforced: k <= n.',
  'examples': [
    'composition(5, 3)'
  ],
  'seealso': ['combinations']
};

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'stirlingS2',
  'category': 'Combinatorics',
  'syntax': [
    'stirlingS2(n, k)'
  ],
  'description': 'he Stirling numbers of the second kind, counts the number of ways to partition a set of n labelled objects into k nonempty unlabelled subsets. `stirlingS2` only takes integer arguments. The following condition must be enforced: k <= n. If n = k or k = 1, then s(n,k) = 1.',
  'examples': [
    'stirlingS2(5, 3)'
  ],
  'seealso': ['bellNumbers']
};


/***/ }),
/* 118 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'config',
  'category': 'Core',
  'syntax': [
    'config()',
    'config(options)'
  ],
  'description': 'Get configuration or change configuration.',
  'examples': [
    'config()',
    '1/3 + 1/4',
    'config({number: "Fraction"})',
    '1/3 + 1/4'
  ],
  'seealso': []
};


/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'import',
  'category': 'Core',
  'syntax': [
    'import(functions)',
    'import(functions, options)'
  ],
  'description': 'Import functions or constants from an object.',
  'examples': [
    'import({myFn: f(x)=x^2, myConstant: 32 })',
    'myFn(2)',
    'myConstant'
  ],
  'seealso': []
};


/***/ }),
/* 120 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'typed',
  'category': 'Core',
  'syntax': [
    'typed(signatures)',
    'typed(name, signatures)'
  ],
  'description': 'Create a typed function.',
  'examples': [
    'double = typed({ "number, number": f(x)=x+x })',
    'double(2)',
    'double("hello")'
  ],
  'seealso': []
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'arg',
  'category': 'Complex',
  'syntax': [
    'arg(x)'
  ],
  'description':
      'Compute the argument of a complex value. If x = a+bi, the argument is computed as atan2(b, a).',
  'examples': [
    'arg(2 + 2i)',
    'atan2(3, 2)',
    'arg(2 + 3i)'
  ],
  'seealso': [
    're',
    'im',
    'conj',
    'abs'
  ]
};


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'conj',
  'category': 'Complex',
  'syntax': [
    'conj(x)'
  ],
  'description':
      'Compute the complex conjugate of a complex value. If x = a+bi, the complex conjugate is a-bi.',
  'examples': [
    'conj(2 + 3i)',
    'conj(2 - 3i)',
    'conj(-5.2i)'
  ],
  'seealso': [
    're',
    'im',
    'abs',
    'arg'
  ]
};


/***/ }),
/* 123 */
/***/ (function(module, exports) {

module.exports = {
  'name': 're',
  'category': 'Complex',
  'syntax': [
    're(x)'
  ],
  'description': 'Get the real part of a complex number.',
  'examples': [
    're(2 + 3i)',
    'im(2 + 3i)',
    're(-5.2i)',
    're(2.4)'
  ],
  'seealso': [
    'im',
    'conj',
    'abs',
    'arg'
  ]
};


/***/ }),
/* 124 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'im',
  'category': 'Complex',
  'syntax': [
    'im(x)'
  ],
  'description': 'Get the imaginary part of a complex number.',
  'examples': [
    'im(2 + 3i)',
    're(2 + 3i)',
    'im(-5.2i)',
    'im(2.4)'
  ],
  'seealso': [
    're',
    'conj',
    'abs',
    'arg'
  ]
};


/***/ }),
/* 125 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'eval',
  'category': 'Expression',
  'syntax': [
    'eval(expression)',
    'eval([expr1, expr2, expr3, ...])'
  ],
  'description': 'Evaluate an expression or an array with expressions.',
  'examples': [
    'eval("2 + 3")',
    'eval("sqrt(" + 4 + ")")'
  ],
  'seealso': []
};


/***/ }),
/* 126 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'help',
  'category': 'Expression',
  'syntax': [
    'help(object)',
    'help(string)'
  ],
  'description': 'Display documentation on a function or data type.',
  'examples': [
    'help(sqrt)',
    'help("complex")'
  ],
  'seealso': []
};


/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'distance',
  'category': 'Geometry',
  'syntax': [
    'distance([x1, y1], [x2, y2])',
    'distance([[x1, y1], [x2, y2])'
  ],
  'description': 'Calculates the Euclidean distance between two points.',
  'examples': [
    'distance([0,0], [4,4])',
    'distance([[0,0], [4,4]])'
  ],
  'seealso': []
};


/***/ }),
/* 128 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'intersect',
  'category': 'Geometry',
  'syntax': [
    'intersect(expr1, expr2, expr3, expr4)',
    'intersect(expr1, expr2, expr3)'
  ],
  'description': 'Computes the intersection point of lines and/or planes.',
  'examples': [
    'intersect([0, 0], [10, 10], [10, 0], [0, 10])',
    'intersect([1, 0, 1],  [4, -2, 2], [1, 1, 1, 6])'
  ],
  'seealso': []
};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'and',
  'category': 'Logical',
  'syntax': [
    'x and y',
    'and(x, y)'
  ],
  'description': 'Logical and. Test whether two values are both defined with a nonzero/nonempty value.',
  'examples': [
    'true and false',
    'true and true',
    '2 and 4'
  ],
  'seealso': [
    'not', 'or', 'xor'
  ]
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'not',
  'category': 'Logical',
  'syntax': [
    'not x',
    'not(x)'
  ],
  'description': 'Logical not. Flips the boolean value of given argument.',
  'examples': [
    'not true',
    'not false',
    'not 2',
    'not 0'
  ],
  'seealso': [
    'and', 'or', 'xor'
  ]
};


/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'or',
  'category': 'Logical',
  'syntax': [
    'x or y',
    'or(x, y)'
  ],
  'description': 'Logical or. Test if at least one value is defined with a nonzero/nonempty value.',
  'examples': [
    'true or false',
    'false or false',
    '0 or 4'
  ],
  'seealso': [
    'not', 'and', 'xor'
  ]
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'xor',
  'category': 'Logical',
  'syntax': [
    'x xor y',
    'xor(x, y)'
  ],
  'description': 'Logical exclusive or, xor. Test whether one and only one value is defined with a nonzero/nonempty value.',
  'examples': [
    'true xor false',
    'false xor false',
    'true xor true',
    '0 xor 4'
  ],
  'seealso': [
    'not', 'and', 'or'
  ]
};


/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'concat',
  'category': 'Matrix',
  'syntax': [
    'concat(A, B, C, ...)',
    'concat(A, B, C, ..., dim)'
  ],
  'description': 'Concatenate matrices. By default, the matrices are concatenated by the last dimension. The dimension on which to concatenate can be provided as last argument.',
  'examples': [
    'A = [1, 2; 5, 6]',
    'B = [3, 4; 7, 8]',
    'concat(A, B)',
    'concat(A, B, 1)',
    'concat(A, B, 2)'
  ],
  'seealso': [
    'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 134 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'cross',
  'category': 'Matrix',
  'syntax': [
    'cross(A, B)'
  ],
  'description': 'Calculate the cross product for two vectors in three dimensional space.',
  'examples': [
    'cross([1, 1, 0],  [0, 1, 1])',
    'cross([3, -3, 1], [4, 9, 2])',
    'cross([2, 3, 4],  [5, 6, 7])'
  ],
  'seealso': [
    'multiply',
    'dot'
  ]
};


/***/ }),
/* 135 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'det',
  'category': 'Matrix',
  'syntax': [
    'det(x)'
  ],
  'description': 'Calculate the determinant of a matrix',
  'examples': [
    'det([1, 2; 3, 4])',
    'det([-2, 2, 3; -1, 1, 3; 2, 0, -1])'
  ],
  'seealso': [
    'concat', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'diag',
  'category': 'Matrix',
  'syntax': [
    'diag(x)',
    'diag(x, k)'
  ],
  'description': 'Create a diagonal matrix or retrieve the diagonal of a matrix. When x is a vector, a matrix with the vector values on the diagonal will be returned. When x is a matrix, a vector with the diagonal values of the matrix is returned. When k is provided, the k-th diagonal will be filled in or retrieved, if k is positive, the values are placed on the super diagonal. When k is negative, the values are placed on the sub diagonal.',
  'examples': [
    'diag(1:3)',
    'diag(1:3, 1)',
    'a = [1, 2, 3; 4, 5, 6; 7, 8, 9]',
    'diag(a)'
  ],
  'seealso': [
    'concat', 'det', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 137 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'dot',
  'category': 'Matrix',
  'syntax': [
    'dot(A, B)',
    'A * B'
  ],
  'description': 'Calculate the dot product of two vectors. ' +
      'The dot product of A = [a1, a2, a3, ..., an] and B = [b1, b2, b3, ..., bn] ' +
      'is defined as dot(A, B) = a1 * b1 + a2 * b2 + a3 * b3 + ... + an * bn',
  'examples': [
    'dot([2, 4, 1], [2, 2, 3])',
    '[2, 4, 1] * [2, 2, 3]'
  ],
  'seealso': [
    'multiply',
    'cross'
  ]
};


/***/ }),
/* 138 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'eye',
  'category': 'Matrix',
  'syntax': [
    'eye(n)',
    'eye(m, n)',
    'eye([m, n])'
  ],
  'description': 'Returns the identity matrix with size m-by-n. The matrix has ones on the diagonal and zeros elsewhere.',
  'examples': [
    'eye(3)',
    'eye(3, 5)',
    'a = [1, 2, 3; 4, 5, 6]',
    'eye(size(a))'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'filter',
  'category': 'Matrix',
  'syntax': [
    'filter(x, test)'
  ],
  'description': 'Filter items in a matrix.',
  'examples': [
    'isPositive(x) = x > 0',
    'filter([6, -2, -1, 4, 3], isPositive)',
    'filter([6, -2, 0, 1, 0], x != 0)'
  ],
  'seealso': ['sort', 'map', 'forEach']
};


/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'flatten',
  'category': 'Matrix',
  'syntax': [
    'flatten(x)'
  ],
  'description': 'Flatten a multi dimensional matrix into a single dimensional matrix.',
  'examples': [
    'a = [1, 2, 3; 4, 5, 6]',
    'size(a)',
    'b = flatten(a)',
    'size(b)'
  ],
  'seealso': [
    'concat', 'resize', 'size', 'squeeze'
  ]
};


/***/ }),
/* 141 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'forEach',
  'category': 'Matrix',
  'syntax': [
    'forEach(x, callback)'
  ],
  'description': 'Iterates over all elements of a matrix/array, and executes the given callback function.',
  'examples': [
    'forEach([1, 2, 3], function(val) { console.log(val) })'
  ],
  'seealso': ['map', 'sort', 'filter']
};


/***/ }),
/* 142 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'inv',
  'category': 'Matrix',
  'syntax': [
    'inv(x)'
  ],
  'description': 'Calculate the inverse of a matrix',
  'examples': [
    'inv([1, 2; 3, 4])',
    'inv(4)',
    '1 / 4'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 143 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'kron',
  'category': 'Matrix',
  'syntax': [
    'kron(x, y)'
  ],
  'description': 'Calculates the kronecker product of 2 matrices or vectors.',
  'examples': [
    'kron([[1, 0], [0, 1]], [[1, 2], [3, 4]])',
    'kron([1,1], [2,3,4])'
  ],
  'seealso': [
    'multiply', 'dot', 'cross'
  ]
};


/***/ }),
/* 144 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'map',
  'category': 'Matrix',
  'syntax': [
    'map(x, callback)'
  ],
  'description': 'Create a new matrix or array with the results of the callback function executed on each entry of the matrix/array.',
  'examples': [
    'map([1, 2, 3], square)'
  ],
  'seealso': ['filter', 'forEach']
};


/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'ones',
  'category': 'Matrix',
  'syntax': [
    'ones(m)',
    'ones(m, n)',
    'ones(m, n, p, ...)',
    'ones([m])',
    'ones([m, n])',
    'ones([m, n, p, ...])'
  ],
  'description': 'Create a matrix containing ones.',
  'examples': [
    'ones(3)',
    'ones(3, 5)',
    'ones([2,3]) * 4.5',
    'a = [1, 2, 3; 4, 5, 6]',
    'ones(size(a))'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'partitionSelect',
  'category': 'Matrix',
  'syntax': [
    'partitionSelect(x, k)',
    'partitionSelect(x, k, compare)'
  ],
  'description': 'Partition-based selection of an array or 1D matrix. Will find the kth smallest value, and mutates the input array. Uses Quickselect.',
  'examples': [
    'partitionSelect([5, 10, 1], 2)',
    'partitionSelect(["C", "B", "A", "D"], 1)'
  ],
  'seealso': ['sort']
};


/***/ }),
/* 147 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'range',
  'category': 'Type',
  'syntax': [
    'start:end',
    'start:step:end',
    'range(start, end)',
    'range(start, end, step)',
    'range(string)'
  ],
  'description':
      'Create a range. Lower bound of the range is included, upper bound is excluded.',
  'examples': [
    '1:5',
    '3:-1:-3',
    'range(3, 7)',
    'range(0, 12, 2)',
    'range("4:10")',
    'a = [1, 2, 3, 4; 5, 6, 7, 8]',
    'a[1:2, 1:2]'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'size', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 148 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'resize',
  'category': 'Matrix',
  'syntax': [
    'resize(x, size)',
    'resize(x, size, defaultValue)'
  ],
  'description': 'Resize a matrix.',
  'examples': [
    'resize([1,2,3,4,5], [3])',
    'resize([1,2,3], [5])',
    'resize([1,2,3], [5], -1)',
    'resize(2, [2, 3])',
    'resize("hello", [8], "!")'
  ],
  'seealso': [
    'size', 'subset', 'squeeze', 'reshape'
  ]
};


/***/ }),
/* 149 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'reshape',
  'category': 'Matrix',
  'syntax': [
    'reshape(x, sizes)'
  ],
  'description': 'Reshape a multi dimensional array to fit the specified dimensions.',
  'examples': [
    'reshape([1, 2, 3, 4, 5, 6], [2, 3])',
    'reshape([[1, 2], [3, 4]], [1, 4])',
    'reshape([[1, 2], [3, 4]], [4])'
  ],
  'seealso': [
    'size', 'squeeze', 'resize'
  ]
};


/***/ }),
/* 150 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'size',
  'category': 'Matrix',
  'syntax': [
    'size(x)'
  ],
  'description': 'Calculate the size of a matrix.',
  'examples': [
    'size(2.3)',
    'size("hello world")',
    'a = [1, 2; 3, 4; 5, 6]',
    'size(a)',
    'size(1:6)'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'squeeze', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 151 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sort',
  'category': 'Matrix',
  'syntax': [
    'sort(x)',
    'sort(x, compare)'
  ],
  'description': 'Sort the items in a matrix. Compare can be a string "asc", "desc", "natural", or a custom sort function.',
  'examples': [
    'sort([5, 10, 1])',
    'sort(["C", "B", "A", "D"])',
    'sortByLength(a, b) = size(a)[1] - size(b)[1]',
    'sort(["Langdon", "Tom", "Sara"], sortByLength)',
    'sort(["10", "1", "2"], "natural")'
  ],
  'seealso': ['map', 'filter', 'forEach']
};


/***/ }),
/* 152 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'squeeze',
  'category': 'Matrix',
  'syntax': [
    'squeeze(x)'
  ],
  'description': 'Remove inner and outer singleton dimensions from a matrix.',
  'examples': [
    'a = zeros(3,2,1)',
    'size(squeeze(a))',
    'b = zeros(1,1,3)',
    'size(squeeze(b))'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'subset', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'subset',
  'category': 'Matrix',
  'syntax': [
    'value(index)',
    'value(index) = replacement',
    'subset(value, [index])',
    'subset(value, [index], replacement)'
  ],
  'description': 'Get or set a subset of a matrix or string. ' +
      'Indexes are one-based. ' +
      'Both the ranges lower-bound and upper-bound are included.',
  'examples': [
    'd = [1, 2; 3, 4]',
    'e = []',
    'e[1, 1:2] = [5, 6]',
    'e[2, :] = [7, 8]',
    'f = d * e',
    'f[2, 1]',
    'f[:, 1]'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'trace', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 154 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'trace',
  'category': 'Matrix',
  'syntax': [
    'trace(A)'
  ],
  'description': 'Calculate the trace of a matrix: the sum of the elements on the main diagonal of a square matrix.',
  'examples': [
    'A = [1, 2, 3; -1, 2, 3; 2, 0, 3]',
    'trace(A)'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'transpose', 'zeros'
  ]
};


/***/ }),
/* 155 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'transpose',
  'category': 'Matrix',
  'syntax': [
    'x\'',
    'transpose(x)'
  ],
  'description': 'Transpose a matrix',
  'examples': [
    'a = [1, 2, 3; 4, 5, 6]',
    'a\'',
    'transpose(a)'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'zeros'
  ]
};


/***/ }),
/* 156 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'zeros',
  'category': 'Matrix',
  'syntax': [
    'zeros(m)',
    'zeros(m, n)',
    'zeros(m, n, p, ...)',
    'zeros([m])',
    'zeros([m, n])',
    'zeros([m, n, p, ...])'
  ],
  'description': 'Create a matrix containing zeros.',
  'examples': [
    'zeros(3)',
    'zeros(3, 5)',
    'a = [1, 2, 3; 4, 5, 6]',
    'zeros(size(a))'
  ],
  'seealso': [
    'concat', 'det', 'diag', 'eye', 'inv', 'ones', 'range', 'size', 'squeeze', 'subset', 'trace', 'transpose'
  ]
};


/***/ }),
/* 157 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'combinations',
  'category': 'Probability',
  'syntax': [
    'combinations(n, k)'
  ],
  'description': 'Compute the number of combinations of n items taken k at a time',
  'examples': [
    'combinations(7, 5)'
  ],
  'seealso': ['permutations', 'factorial']
};


/***/ }),
/* 158 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'factorial',
  'category': 'Probability',
  'syntax': [
    'n!',
    'factorial(n)'
  ],
  'description': 'Compute the factorial of a value',
  'examples': [
    '5!',
    '5 * 4 * 3 * 2 * 1',
    '3!'
  ],
  'seealso': ['combinations', 'permutations', 'gamma']
};


/***/ }),
/* 159 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'gamma',
  'category': 'Probability',
  'syntax': [
    'gamma(n)'
  ],
  'description': 'Compute the gamma function. For small values, the Lanczos approximation is used, and for large values the extended Stirling approximation.',
  'examples': [
    'gamma(4)',
    '3!',
    'gamma(1/2)',
    'sqrt(pi)'
  ],
  'seealso': ['factorial']
};


/***/ }),
/* 160 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'kldivergence',
  'category': 'Probability',
  'syntax': [
    'kldivergence(x, y)'
  ],
  'description': 'Calculate the Kullback-Leibler (KL) divergence  between two distributions.',
  'examples': [
    'kldivergence([0.7,0.5,0.4], [0.2,0.9,0.5])'
  ],
  'seealso': []
};


/***/ }),
/* 161 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'multinomial',
  'category': 'Probability',
  'syntax': [
    'multinomial(A)'
  ],
  'description': 'Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities. multinomial takes one array of integers as an argument. The following condition must be enforced: every ai > 0.',
  'examples': [
    'multinomial([1, 2, 1])'
  ],
  'seealso': ['combinations', 'factorial']
};

/***/ }),
/* 162 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'permutations',
  'category': 'Probability',
  'syntax': [
    'permutations(n)',
    'permutations(n, k)'
  ],
  'description': 'Compute the number of permutations of n items taken k at a time',
  'examples': [
    'permutations(5)',
    'permutations(5, 3)'
  ],
  'seealso': ['combinations', 'factorial']
};


/***/ }),
/* 163 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'pickRandom',
  'category': 'Probability',
  'syntax': [
    'pickRandom(array)',
    'pickRandom(array, number)',
    'pickRandom(array, weights)',
    'pickRandom(array, number, weights)',
    'pickRandom(array, weights, number)'
  ],
  'description':
      'Pick a random entry from a given array.',
  'examples': [
    'pickRandom(0:10)',
    'pickRandom([1, 3, 1, 6])',
    'pickRandom([1, 3, 1, 6], 2)',
    'pickRandom([1, 3, 1, 6], [2, 3, 2, 1])',
    'pickRandom([1, 3, 1, 6], 2, [2, 3, 2, 1])',
    'pickRandom([1, 3, 1, 6], [2, 3, 2, 1], 2)'
  ],
  'seealso': ['random', 'randomInt']
};


/***/ }),
/* 164 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'random',
  'category': 'Probability',
  'syntax': [
    'random()',
    'random(max)',
    'random(min, max)',
    'random(size)',
    'random(size, max)',
    'random(size, min, max)'
  ],
  'description':
      'Return a random number.',
  'examples': [
    'random()',
    'random(10, 20)',
    'random([2, 3])'
  ],
  'seealso': ['pickRandom', 'randomInt']
};


/***/ }),
/* 165 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'randomInt',
  'category': 'Probability',
  'syntax': [
    'randomInt(max)',
    'randomInt(min, max)',
    'randomInt(size)',
    'randomInt(size, max)',
    'randomInt(size, min, max)'
  ],
  'description':
      'Return a random integer number',
  'examples': [
    'randomInt(10, 20)',
    'randomInt([2, 3], 10)'
  ],
  'seealso': ['pickRandom', 'random']
};

/***/ }),
/* 166 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'compare',
  'category': 'Relational',
  'syntax': [
    'compare(x, y)'
  ],
  'description':
      'Compare two values. Returns 1 if x is larger than y, -1 if x is smaller than y, and 0 if x and y are equal.',
  'examples': [
    'compare(2, 3)',
    'compare(3, 2)',
    'compare(2, 2)',
    'compare(5cm, 40mm)',
    'compare(2, [1, 2, 3])'
  ],
  'seealso': [
    'equal', 'unequal', 'smaller', 'smallerEq', 'largerEq', 'compareNatural'
  ]
};


/***/ }),
/* 167 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'compareNatural',
  'category': 'Relational',
  'syntax': [
    'compareNatural(x, y)'
  ],
  'description': 'Compare two values of any type in a deterministic, natural way.',
  'examples': [
    'compareNatural(2, 3)',
    'compareNatural(3, 2)',
    'compareNatural(2, 2)',
    'compareNatural(5cm, 40mm)',
    'compareNatural("2", "10")',
    'compareNatural(2 + 3i, 2 + 4i)',
    'compareNatural([1, 2, 4], [1, 2, 3])',
    'compareNatural([1, 5], [1, 2, 3])',
    'compareNatural([1, 2], [1, 2])',
    'compareNatural({a: 2}, {a: 4})'
  ],
  'seealso': [
    'equal', 'unequal', 'smaller', 'smallerEq', 'largerEq', 'compare'
  ]
};


/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'deepEqual',
  'category': 'Relational',
  'syntax': [
    'deepEqual(x, y)'
  ],
  'description':
      'Check equality of two matrices element wise. Returns true if the size of both matrices is equal and when and each of the elements are equal.',
  'examples': [
    'deepEqual([1,3,4], [1,3,4])',
    'deepEqual([1,3,4], [1,3])'
  ],
  'seealso': [
    'equal', 'unequal', 'smaller', 'larger', 'smallerEq', 'largerEq', 'compare'
  ]
};


/***/ }),
/* 169 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'equal',
  'category': 'Relational',
  'syntax': [
    'x == y',
    'equal(x, y)'
  ],
  'description':
      'Check equality of two values. Returns true if the values are equal, and false if not.',
  'examples': [
    '2+2 == 3',
    '2+2 == 4',
    'a = 3.2',
    'b = 6-2.8',
    'a == b',
    '50cm == 0.5m'
  ],
  'seealso': [
    'unequal', 'smaller', 'larger', 'smallerEq', 'largerEq', 'compare', 'deepEqual'
  ]
};


/***/ }),
/* 170 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'larger',
  'category': 'Relational',
  'syntax': [
    'x > y',
    'larger(x, y)'
  ],
  'description':
      'Check if value x is larger than y. Returns true if x is larger than y, and false if not.',
  'examples': [
    '2 > 3',
    '5 > 2*2',
    'a = 3.3',
    'b = 6-2.8',
    '(a > b)',
    '(b < a)',
    '5 cm > 2 inch'
  ],
  'seealso': [
    'equal', 'unequal', 'smaller', 'smallerEq', 'largerEq', 'compare'
  ]
};


/***/ }),
/* 171 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'largerEq',
  'category': 'Relational',
  'syntax': [
    'x >= y',
    'largerEq(x, y)'
  ],
  'description':
      'Check if value x is larger or equal to y. Returns true if x is larger or equal to y, and false if not.',
  'examples': [
    '2 >= 1+1',
    '2 > 1+1',
    'a = 3.2',
    'b = 6-2.8',
    '(a >= b)'
  ],
  'seealso': [
    'equal', 'unequal', 'smallerEq', 'smaller', 'compare'
  ]
};


/***/ }),
/* 172 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'smaller',
  'category': 'Relational',
  'syntax': [
    'x < y',
    'smaller(x, y)'
  ],
  'description':
      'Check if value x is smaller than value y. Returns true if x is smaller than y, and false if not.',
  'examples': [
    '2 < 3',
    '5 < 2*2',
    'a = 3.3',
    'b = 6-2.8',
    '(a < b)',
    '5 cm < 2 inch'
  ],
  'seealso': [
    'equal', 'unequal', 'larger', 'smallerEq', 'largerEq', 'compare'
  ]
};


/***/ }),
/* 173 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'smallerEq',
  'category': 'Relational',
  'syntax': [
    'x <= y',
    'smallerEq(x, y)'
  ],
  'description':
      'Check if value x is smaller or equal to value y. Returns true if x is smaller than y, and false if not.',
  'examples': [
    '2 <= 1+1',
    '2 < 1+1',
    'a = 3.2',
    'b = 6-2.8',
    '(a <= b)'
  ],
  'seealso': [
    'equal', 'unequal', 'larger', 'smaller', 'largerEq', 'compare'
  ]
};


/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'unequal',
  'category': 'Relational',
  'syntax': [
    'x != y',
    'unequal(x, y)'
  ],
  'description':
      'Check unequality of two values. Returns true if the values are unequal, and false if they are equal.',
  'examples': [
    '2+2 != 3',
    '2+2 != 4',
    'a = 3.2',
    'b = 6-2.8',
    'a != b',
    '50cm != 0.5m',
    '5 cm != 2 inch'
  ],
  'seealso': [
    'equal', 'smaller', 'larger', 'smallerEq', 'largerEq', 'compare', 'deepEqual'
  ]
};


/***/ }),
/* 175 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setCartesian',
  'category': 'Set',
  'syntax': [
    'setCartesian(set1, set2)'
  ],
  'description':
      'Create the cartesian product of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.',
  'examples': [
    'setCartesian([1, 2], [3, 4])'
  ],
  'seealso': [
    'setUnion', 'setIntersect', 'setDifference', 'setPowerset'
  ]
};


/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setDifference',
  'category': 'Set',
  'syntax': [
    'setDifference(set1, set2)'
  ],
  'description':
      'Create the difference of two (multi)sets: every element of set1, that is not the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.',
  'examples': [
    'setDifference([1, 2, 3, 4], [3, 4, 5, 6])',
    'setDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])'
  ],
  'seealso': [
    'setUnion', 'setIntersect', 'setSymDifference'
  ]
};


/***/ }),
/* 177 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setDistinct',
  'category': 'Set',
  'syntax': [
    'setDistinct(set)'
  ],
  'description':
      'Collect the distinct elements of a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.',
  'examples': [
    'setDistinct([1, 1, 1, 2, 2, 3])'
  ],
  'seealso': [
    'setMultiplicity'
  ]
};


/***/ }),
/* 178 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setIntersect',
  'category': 'Set',
  'syntax': [
    'setIntersect(set1, set2)'
  ],
  'description':
      'Create the intersection of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.',
  'examples': [
    'setIntersect([1, 2, 3, 4], [3, 4, 5, 6])',
    'setIntersect([[1, 2], [3, 4]], [[3, 4], [5, 6]])'
  ],
  'seealso': [
    'setUnion', 'setDifference'
  ]
};


/***/ }),
/* 179 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setIsSubset',
  'category': 'Set',
  'syntax': [
    'setIsSubset(set1, set2)'
  ],
  'description':
      'Check whether a (multi)set is a subset of another (multi)set: every element of set1 is the element of set2. Multi-dimension arrays will be converted to single-dimension arrays before the operation.',
  'examples': [
    'setIsSubset([1, 2], [3, 4, 5, 6])',
    'setIsSubset([3, 4], [3, 4, 5, 6])'
  ],
  'seealso': [
    'setUnion', 'setIntersect', 'setDifference'
  ]
};


/***/ }),
/* 180 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setMultiplicity',
  'category': 'Set',
  'syntax': [
    'setMultiplicity(element, set)'
  ],
  'description':
      'Count the multiplicity of an element in a multiset. A multi-dimension array will be converted to a single-dimension array before the operation.',
  'examples': [
    'setMultiplicity(1, [1, 2, 2, 4])',
    'setMultiplicity(2, [1, 2, 2, 4])'
  ],
  'seealso': [
    'setDistinct', 'setSize'
  ]
};


/***/ }),
/* 181 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setPowerset',
  'category': 'Set',
  'syntax': [
    'setPowerset(set)'
  ],
  'description':
      'Create the powerset of a (multi)set: the powerset contains very possible subsets of a (multi)set. A multi-dimension array will be converted to a single-dimension array before the operation.',
  'examples': [
    'setPowerset([1, 2, 3])'
  ],
  'seealso': [
    'setCartesian'
  ]
};


/***/ }),
/* 182 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setSize',
  'category': 'Set',
  'syntax': [
    'setSize(set)',
    'setSize(set, unique)'
  ],
  'description':
      'Count the number of elements of a (multi)set. When the second parameter "unique" is true, count only the unique values. A multi-dimension array will be converted to a single-dimension array before the operation.',
  'examples': [
    'setSize([1, 2, 2, 4])',
    'setSize([1, 2, 2, 4], true)'
  ],
  'seealso': [
    'setUnion', 'setIntersect', 'setDifference'
  ]
};


/***/ }),
/* 183 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setSymDifference',
  'category': 'Set',
  'syntax': [
    'setSymDifference(set1, set2)'
  ],
  'description':
      'Create the symmetric difference of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.',
  'examples': [
    'setSymDifference([1, 2, 3, 4], [3, 4, 5, 6])',
    'setSymDifference([[1, 2], [3, 4]], [[3, 4], [5, 6]])'
  ],
  'seealso': [
    'setUnion', 'setIntersect', 'setDifference'
  ]
};


/***/ }),
/* 184 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'setUnion',
  'category': 'Set',
  'syntax': [
    'setUnion(set1, set2)'
  ],
  'description':
      'Create the union of two (multi)sets. Multi-dimension arrays will be converted to single-dimension arrays before the operation.',
  'examples': [
    'setUnion([1, 2, 3, 4], [3, 4, 5, 6])',
    'setUnion([[1, 2], [3, 4]], [[3, 4], [5, 6]])'
  ],
  'seealso': [
    'setIntersect', 'setDifference'
  ]
};


/***/ }),
/* 185 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'erf',
  'category': 'Special',
  'syntax': [
    'erf(x)'
  ],
  'description': 'Compute the erf function of a value using a rational Chebyshev approximations for different intervals of x',
  'examples': [
    'erf(0.2)',
    'erf(-0.5)',
    'erf(4)'
  ],
  'seealso': []
};


/***/ }),
/* 186 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'mad',
  'category': 'Statistics',
  'syntax': [
    'mad(a, b, c, ...)',
    'mad(A)'
  ],
  'description': 'Compute the median absolute deviation of a matrix or a list with values. The median absolute deviation is defined as the median of the absolute deviations from the median.',
  'examples': [
    'mad(10, 20, 30)',
    'mad([1, 2, 3])'
  ],
  'seealso': [
    'mean',
    'median',
    'std',
    'abs'
  ]
};


/***/ }),
/* 187 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'max',
  'category': 'Statistics',
  'syntax': [
    'max(a, b, c, ...)',
    'max(A)',
    'max(A, dim)'
  ],
  'description': 'Compute the maximum value of a list of values.',
  'examples': [
    'max(2, 3, 4, 1)',
    'max([2, 3, 4, 1])',
    'max([2, 5; 4, 3])',
    'max([2, 5; 4, 3], 1)',
    'max([2, 5; 4, 3], 2)',
    'max(2.7, 7.1, -4.5, 2.0, 4.1)',
    'min(2.7, 7.1, -4.5, 2.0, 4.1)'
  ],
  'seealso': [
    'mean',
    'median',
    'min',
    'prod',
    'std',
    'sum',
    'var'
  ]
};


/***/ }),
/* 188 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'mean',
  'category': 'Statistics',
  'syntax': [
    'mean(a, b, c, ...)',
    'mean(A)',
    'mean(A, dim)'
  ],
  'description': 'Compute the arithmetic mean of a list of values.',
  'examples': [
    'mean(2, 3, 4, 1)',
    'mean([2, 3, 4, 1])',
    'mean([2, 5; 4, 3])',
    'mean([2, 5; 4, 3], 1)',
    'mean([2, 5; 4, 3], 2)',
    'mean([1.0, 2.7, 3.2, 4.0])'
  ],
  'seealso': [
    'max',
    'median',
    'min',
    'prod',
    'std',
    'sum',
    'var'
  ]
};


/***/ }),
/* 189 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'median',
  'category': 'Statistics',
  'syntax': [
    'median(a, b, c, ...)',
    'median(A)'
  ],
  'description': 'Compute the median of all values. The values are sorted and the middle value is returned. In case of an even number of values, the average of the two middle values is returned.',
  'examples': [
    'median(5, 2, 7)',
    'median([3, -1, 5, 7])'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'prod',
    'std',
    'sum',
    'var',
    'quantileSeq'
  ]
};


/***/ }),
/* 190 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'min',
  'category': 'Statistics',
  'syntax': [
    'min(a, b, c, ...)',
    'min(A)',
    'min(A, dim)'
  ],
  'description': 'Compute the minimum value of a list of values.',
  'examples': [
    'min(2, 3, 4, 1)',
    'min([2, 3, 4, 1])',
    'min([2, 5; 4, 3])',
    'min([2, 5; 4, 3], 1)',
    'min([2, 5; 4, 3], 2)',
    'min(2.7, 7.1, -4.5, 2.0, 4.1)',
    'max(2.7, 7.1, -4.5, 2.0, 4.1)'
  ],
  'seealso': [
    'max',
    'mean',
    'median',
    'prod',
    'std',
    'sum',
    'var'
  ]
};


/***/ }),
/* 191 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'mode',
  'category': 'Statistics',
  'syntax': [
    'mode(a, b, c, ...)',
    'mode(A)',
    'mode(A, a, b, B, c, ...)'
  ],
  'description': 'Computes the mode of all values as an array. In case mode being more than one, multiple values are returned in an array.',
  'examples': [
    'mode(2, 1, 4, 3, 1)',
    'mode([1, 2.7, 3.2, 4, 2.7])',
    'mode(1, 4, 6, 1, 6)'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'median',
    'prod',
    'std',
    'sum',
    'var'
  ]
};


/***/ }),
/* 192 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'prod',
  'category': 'Statistics',
  'syntax': [
    'prod(a, b, c, ...)',
    'prod(A)'
  ],
  'description': 'Compute the product of all values.',
  'examples': [
    'prod(2, 3, 4)',
    'prod([2, 3, 4])',
    'prod([2, 5; 4, 3])'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'median',
    'min',
    'std',
    'sum',
    'var'
  ]
};


/***/ }),
/* 193 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'quantileSeq',
  'category': 'Statistics',
  'syntax': [
    'quantileSeq(A, prob[, sorted])',
    'quantileSeq(A, [prob1, prob2, ...][, sorted])',
    'quantileSeq(A, N[, sorted])'
  ],
  'description': 'Compute the prob order quantile of a matrix or a list with values. The sequence is sorted and the middle value is returned. Supported types of sequence values are: Number, BigNumber, Unit Supported types of probablity are: Number, BigNumber. \n\nIn case of a (multi dimensional) array or matrix, the prob order quantile of all elements will be calculated.',
  'examples': [
    'quantileSeq([3, -1, 5, 7], 0.5)',
    'quantileSeq([3, -1, 5, 7], [1/3, 2/3])',
    'quantileSeq([3, -1, 5, 7], 2)',
    'quantileSeq([-1, 3, 5, 7], 0.5, true)'
  ],
  'seealso': [
    'mean',
    'median',
    'min',
    'max',
    'prod',
    'std',
    'sum',
    'var'
  ]
};

/***/ }),
/* 194 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'std',
  'category': 'Statistics',
  'syntax': [
    'std(a, b, c, ...)',
    'std(A)',
    'std(A, normalization)'
  ],
  'description': 'Compute the standard deviation of all values, defined as std(A) = sqrt(var(A)). Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  'examples': [
    'std(2, 4, 6)',
    'std([2, 4, 6, 8])',
    'std([2, 4, 6, 8], "uncorrected")',
    'std([2, 4, 6, 8], "biased")',
    'std([1, 2, 3; 4, 5, 6])'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'median',
    'min',
    'prod',
    'sum',
    'var'
  ]
};


/***/ }),
/* 195 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sum',
  'category': 'Statistics',
  'syntax': [
    'sum(a, b, c, ...)',
    'sum(A)'
  ],
  'description': 'Compute the sum of all values.',
  'examples': [
    'sum(2, 3, 4, 1)',
    'sum([2, 3, 4, 1])',
    'sum([2, 5; 4, 3])'
  ],
  'seealso': [
    'max',
    'mean',
    'median',
    'min',
    'prod',
    'std',
    'sum',
    'var'
  ]
};


/***/ }),
/* 196 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'var',
  'category': 'Statistics',
  'syntax': [
    'var(a, b, c, ...)',
    'var(A)',
    'var(A, normalization)'
  ],
  'description': 'Compute the variance of all values. Optional parameter normalization can be "unbiased" (default), "uncorrected", or "biased".',
  'examples': [
    'var(2, 4, 6)',
    'var([2, 4, 6, 8])',
    'var([2, 4, 6, 8], "uncorrected")',
    'var([2, 4, 6, 8], "biased")',
    'var([1, 2, 3; 4, 5, 6])'
  ],
  'seealso': [
    'max',
    'mean',
    'min',
    'median',
    'min',
    'prod',
    'std',
    'sum'
  ]
};


/***/ }),
/* 197 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'acos',
  'category': 'Trigonometry',
  'syntax': [
    'acos(x)'
  ],
  'description': 'Compute the inverse cosine of a value in radians.',
  'examples': [
    'acos(0.5)',
    'acos(cos(2.3))'
  ],
  'seealso': [
    'cos',
    'atan',
    'asin'
  ]
};


/***/ }),
/* 198 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'acosh',
  'category': 'Trigonometry',
  'syntax': [
    'acosh(x)'
  ],
  'description': 'Calculate the hyperbolic arccos of a value, defined as `acosh(x) = ln(sqrt(x^2 - 1) + x)`.',
  'examples': [
    'acosh(1.5)'
  ],
  'seealso': [
    'cosh',
    'asinh',
    'atanh'
  ]
};

/***/ }),
/* 199 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'acot',
  'category': 'Trigonometry',
  'syntax': [
    'acot(x)'
  ],
  'description': 'Calculate the inverse cotangent of a value.',
  'examples': [
    'acot(0.5)',
    'acot(cot(0.5))',
    'acot(2)'
  ],
  'seealso': [
    'cot',
    'atan'
  ]
};


/***/ }),
/* 200 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'acoth',
  'category': 'Trigonometry',
  'syntax': [
    'acoth(x)'
  ],
  'description': 'Calculate the hyperbolic arccotangent of a value, defined as `acoth(x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.',
  'examples': [
    'acoth(2)',
    'acoth(0.5)'
  ],
  'seealso': [
    'acsch',
    'asech'
  ]
};

/***/ }),
/* 201 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'acsc',
  'category': 'Trigonometry',
  'syntax': [
    'acsc(x)'
  ],
  'description': 'Calculate the inverse cotangent of a value.',
  'examples': [
    'acsc(2)',
    'acsc(csc(0.5))',
    'acsc(0.5)'
  ],
  'seealso': [
    'csc',
    'asin',
    'asec'
  ]
};


/***/ }),
/* 202 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'acsch',
  'category': 'Trigonometry',
  'syntax': [
    'acsch(x)'
  ],
  'description': 'Calculate the hyperbolic arccosecant of a value, defined as `acsch(x) = ln(1/x + sqrt(1/x^2 + 1))`.',
  'examples': [
    'acsch(0.5)'
  ],
  'seealso': [
    'asech',
    'acoth'
  ]
};


/***/ }),
/* 203 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'asec',
  'category': 'Trigonometry',
  'syntax': [
    'asec(x)'
  ],
  'description': 'Calculate the inverse secant of a value.',
  'examples': [
    'asec(0.5)',
    'asec(sec(0.5))',
    'asec(2)'
  ],
  'seealso': [
    'acos',
    'acot',
    'acsc'
  ]
};


/***/ }),
/* 204 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'asech',
  'category': 'Trigonometry',
  'syntax': [
    'asech(x)'
  ],
  'description': 'Calculate the inverse secant of a value.',
  'examples': [
    'asech(0.5)'
  ],
  'seealso': [
    'acsch',
    'acoth'
  ]
};


/***/ }),
/* 205 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'asin',
  'category': 'Trigonometry',
  'syntax': [
    'asin(x)'
  ],
  'description': 'Compute the inverse sine of a value in radians.',
  'examples': [
    'asin(0.5)',
    'asin(sin(0.5))'
  ],
  'seealso': [
    'sin',
    'acos',
    'atan'
  ]
};


/***/ }),
/* 206 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'asinh',
  'category': 'Trigonometry',
  'syntax': [
    'asinh(x)'
  ],
  'description': 'Calculate the hyperbolic arcsine of a value, defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.',
  'examples': [
    'asinh(0.5)'
  ],
  'seealso': [
    'acosh',
    'atanh'
  ]
};


/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'atan',
  'category': 'Trigonometry',
  'syntax': [
    'atan(x)'
  ],
  'description': 'Compute the inverse tangent of a value in radians.',
  'examples': [
    'atan(0.5)',
    'atan(tan(0.5))'
  ],
  'seealso': [
    'tan',
    'acos',
    'asin'
  ]
};


/***/ }),
/* 208 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'atanh',
  'category': 'Trigonometry',
  'syntax': [
    'atanh(x)'
  ],
  'description': 'Calculate the hyperbolic arctangent of a value, defined as `atanh(x) = ln((1 + x)/(1 - x)) / 2`.',
  'examples': [
    'atanh(0.5)'
  ],
  'seealso': [
    'acosh',
    'asinh'
  ]
};


/***/ }),
/* 209 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'atan2',
  'category': 'Trigonometry',
  'syntax': [
    'atan2(y, x)'
  ],
  'description':
      'Computes the principal value of the arc tangent of y/x in radians.',
  'examples': [
    'atan2(2, 2) / pi',
    'angle = 60 deg in rad',
    'x = cos(angle)',
    'y = sin(angle)',
    'atan2(y, x)'
  ],
  'seealso': [
    'sin',
    'cos',
    'tan'
  ]
};


/***/ }),
/* 210 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'cos',
  'category': 'Trigonometry',
  'syntax': [
    'cos(x)'
  ],
  'description': 'Compute the cosine of x in radians.',
  'examples': [
    'cos(2)',
    'cos(pi / 4) ^ 2',
    'cos(180 deg)',
    'cos(60 deg)',
    'sin(0.2)^2 + cos(0.2)^2'
  ],
  'seealso': [
    'acos',
    'sin',
    'tan'
  ]
};


/***/ }),
/* 211 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'cosh',
  'category': 'Trigonometry',
  'syntax': [
    'cosh(x)'
  ],
  'description': 'Compute the hyperbolic cosine of x in radians.',
  'examples': [
    'cosh(0.5)'
  ],
  'seealso': [
    'sinh',
    'tanh',
    'coth'
  ]
};


/***/ }),
/* 212 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'cot',
  'category': 'Trigonometry',
  'syntax': [
    'cot(x)'
  ],
  'description': 'Compute the cotangent of x in radians. Defined as 1/tan(x)',
  'examples': [
    'cot(2)',
    '1 / tan(2)'
  ],
  'seealso': [
    'sec',
    'csc',
    'tan'
  ]
};


/***/ }),
/* 213 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'coth',
  'category': 'Trigonometry',
  'syntax': [
    'coth(x)'
  ],
  'description': 'Compute the hyperbolic cotangent of x in radians.',
  'examples': [
    'coth(2)',
    '1 / tanh(2)'
  ],
  'seealso': [
    'sech',
    'csch',
    'tanh'
  ]
};


/***/ }),
/* 214 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'csc',
  'category': 'Trigonometry',
  'syntax': [
    'csc(x)'
  ],
  'description': 'Compute the cosecant of x in radians. Defined as 1/sin(x)',
  'examples': [
    'csc(2)',
    '1 / sin(2)'
  ],
  'seealso': [
    'sec',
    'cot',
    'sin'
  ]
};


/***/ }),
/* 215 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'csch',
  'category': 'Trigonometry',
  'syntax': [
    'csch(x)'
  ],
  'description': 'Compute the hyperbolic cosecant of x in radians. Defined as 1/sinh(x)',
  'examples': [
    'csch(2)',
    '1 / sinh(2)'
  ],
  'seealso': [
    'sech',
    'coth',
    'sinh'
  ]
};


/***/ }),
/* 216 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sec',
  'category': 'Trigonometry',
  'syntax': [
    'sec(x)'
  ],
  'description': 'Compute the secant of x in radians. Defined as 1/cos(x)',
  'examples': [
    'sec(2)',
    '1 / cos(2)'
  ],
  'seealso': [
    'cot',
    'csc',
    'cos'
  ]
};


/***/ }),
/* 217 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sech',
  'category': 'Trigonometry',
  'syntax': [
    'sech(x)'
  ],
  'description': 'Compute the hyperbolic secant of x in radians. Defined as 1/cosh(x)',
  'examples': [
    'sech(2)',
    '1 / cosh(2)'
  ],
  'seealso': [
    'coth',
    'csch',
    'cosh'
  ]
};


/***/ }),
/* 218 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sin',
  'category': 'Trigonometry',
  'syntax': [
    'sin(x)'
  ],
  'description': 'Compute the sine of x in radians.',
  'examples': [
    'sin(2)',
    'sin(pi / 4) ^ 2',
    'sin(90 deg)',
    'sin(30 deg)',
    'sin(0.2)^2 + cos(0.2)^2'
  ],
  'seealso': [
    'asin',
    'cos',
    'tan'
  ]
};


/***/ }),
/* 219 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'sinh',
  'category': 'Trigonometry',
  'syntax': [
    'sinh(x)'
  ],
  'description': 'Compute the hyperbolic sine of x in radians.',
  'examples': [
    'sinh(0.5)'
  ],
  'seealso': [
    'cosh',
    'tanh'
  ]
};


/***/ }),
/* 220 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'tan',
  'category': 'Trigonometry',
  'syntax': [
    'tan(x)'
  ],
  'description': 'Compute the tangent of x in radians.',
  'examples': [
    'tan(0.5)',
    'sin(0.5) / cos(0.5)',
    'tan(pi / 4)',
    'tan(45 deg)'
  ],
  'seealso': [
    'atan',
    'sin',
    'cos'
  ]
};


/***/ }),
/* 221 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'tanh',
  'category': 'Trigonometry',
  'syntax': [
    'tanh(x)'
  ],
  'description': 'Compute the hyperbolic tangent of x in radians.',
  'examples': [
    'tanh(0.5)',
    'sinh(0.5) / cosh(0.5)'
  ],
  'seealso': [
    'sinh',
    'cosh'
  ]
};


/***/ }),
/* 222 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'to',
  'category': 'Units',
  'syntax': [
    'x to unit',
    'to(x, unit)'
  ],
  'description': 'Change the unit of a value.',
  'examples': [
    '5 inch to cm',
    '3.2kg to g',
    '16 bytes in bits'
  ],
  'seealso': []
};


/***/ }),
/* 223 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'clone',
  'category': 'Utils',
  'syntax': [
    'clone(x)'
  ],
  'description': 'Clone a variable. Creates a copy of primitive variables,and a deep copy of matrices',
  'examples': [
    'clone(3.5)',
    'clone(2 - 4i)',
    'clone(45 deg)',
    'clone([1, 2; 3, 4])',
    'clone("hello world")'
  ],
  'seealso': []
};


/***/ }),
/* 224 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'format',
  'category': 'Utils',
  'syntax': [
    'format(value)',
    'format(value, precision)'
  ],
  'description': 'Format a value of any type as string.',
  'examples': [
    'format(2.3)',
    'format(3 - 4i)',
    'format([])',
    'format(pi, 3)'
  ],
  'seealso': ['print']
};


/***/ }),
/* 225 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'isNaN',
  'category': 'Utils',
  'syntax': [
    'isNaN(x)'
  ],
  'description': 'Test whether a value is NaN (not a number)',
  'examples': [
    'isNaN(2)',
    'isNaN(0 / 0)',
    'isNaN(NaN)',
    'isNaN(Infinity)'
  ],
  'seealso': ['isNegative', 'isNumeric', 'isPositive', 'isZero']
};


/***/ }),
/* 226 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'isInteger',
  'category': 'Utils',
  'syntax': [
    'isInteger(x)'
  ],
  'description': 'Test whether a value is an integer number.',
  'examples': [
    'isInteger(2)',
    'isInteger(3.5)',
    'isInteger([3, 0.5, -2])'
  ],
  'seealso': ['isNegative', 'isNumeric', 'isPositive', 'isZero']
};


/***/ }),
/* 227 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'isNegative',
  'category': 'Utils',
  'syntax': [
    'isNegative(x)'
  ],
  'description': 'Test whether a value is negative: smaller than zero.',
  'examples': [
    'isNegative(2)',
    'isNegative(0)',
    'isNegative(-4)',
    'isNegative([3, 0.5, -2])'
  ],
  'seealso': ['isInteger', 'isNumeric', 'isPositive', 'isZero']
};


/***/ }),
/* 228 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'isNumeric',
  'category': 'Utils',
  'syntax': [
    'isNumeric(x)'
  ],
  'description': 'Test whether a value is a numeric value. ' +
    'Returns true when the input is a number, BigNumber, Fraction, or boolean.',
  'examples': [
    'isNumeric(2)',
    'isNumeric(0)',
    'isNumeric(bignumber(500))',
    'isNumeric(fraction(0.125))',
    'isNumeric("3")',
    'isNumeric(2 + 3i)',
    'isNumeric([2.3, "foo", false])'
  ],
  'seealso': ['isInteger', 'isZero', 'isNegative', 'isPositive', 'isNaN']
};


/***/ }),
/* 229 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'isPositive',
  'category': 'Utils',
  'syntax': [
    'isPositive(x)'
  ],
  'description': 'Test whether a value is positive: larger than zero.',
  'examples': [
    'isPositive(2)',
    'isPositive(0)',
    'isPositive(-4)',
    'isPositive([3, 0.5, -2])'
  ],
  'seealso': ['isInteger', 'isNumeric', 'isNegative', 'isZero']
};


/***/ }),
/* 230 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'isPrime',
  'category': 'Utils',
  'syntax': [
    'isPrime(x)'
  ],
  'description': 'Test whether a value is prime: has no divisors other than itself and one.',
  'examples': [
    'isPrime(3)',
    'isPrime(-2)',
    'isPrime([2, 17, 100])'
  ],
  'seealso': ['isInteger', 'isNumeric', 'isNegative', 'isZero']
};

/***/ }),
/* 231 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'isZero',
  'category': 'Utils',
  'syntax': [
    'isZero(x)'
  ],
  'description': 'Test whether a value is zero.',
  'examples': [
    'isZero(2)',
    'isZero(0)',
    'isZero(-4)',
    'isZero([3, 0, -2, 0])'
  ],
  'seealso': ['isInteger', 'isNumeric', 'isNegative', 'isPositive']
};


/***/ }),
/* 232 */
/***/ (function(module, exports) {

module.exports = {
  'name': 'typeof',
  'category': 'Utils',
  'syntax': [
    'typeof(x)'
  ],
  'description': 'Get the type of a variable.',
  'examples': [
    'typeof(3.5)',
    'typeof(2 - 4i)',
    'typeof(45 deg)',
    'typeof("hello world")'
  ],
  'seealso': []
};


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var deepMap = __webpack_require__(17);

function factory (type, config, load, typed) {
  var parse = load(__webpack_require__(234));

  /**
   * Evaluate an expression.
   *
   * Note the evaluating arbitrary expressions may involve security risks,
   * see [http://mathjs.org/docs/expressions/security.html](http://mathjs.org/docs/expressions/security.html) for more information.
   *
   * Syntax:
   *
   *     math.eval(expr)
   *     math.eval(expr, scope)
   *     math.eval([expr1, expr2, expr3, ...])
   *     math.eval([expr1, expr2, expr3, ...], scope)
   *
   * Example:
   *
   *     math.eval('(2+3)/4');                // 1.25
   *     math.eval('sqrt(3^2 + 4^2)');        // 5
   *     math.eval('sqrt(-4)');               // 2i
   *     math.eval(['a=3', 'b=4', 'a*b']);,   // [3, 4, 12]
   *
   *     var scope = {a:3, b:4};
   *     math.eval('a * b', scope);           // 12
   *
   * See also:
   *
   *    parse, compile
   *
   * @param {string | string[] | Matrix} expr   The expression to be evaluated
   * @param {Object} [scope]                    Scope to read/write variables
   * @return {*} The result of the expression
   * @throws {Error}
   */
  return typed('compile', {
    'string': function (expr) {
      var scope = {};
      return parse(expr).compile().eval(scope);
    },

    'string, Object': function (expr, scope) {
      return parse(expr).compile().eval(scope);
    },

    'Array | Matrix': function (expr) {
      var scope = {};
      return deepMap(expr, function (entry) {
        return parse(entry).compile().eval(scope);
      });
    },

    'Array | Matrix, Object': function (expr, scope) {
      return deepMap(expr, function (entry) {
        return parse(entry).compile().eval(scope);
      });
    }
  });
}

exports.name = 'eval';
exports.factory = factory;

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ArgumentsError = __webpack_require__(14);
var deepMap = __webpack_require__(17);

function factory (type, config, load, typed) {
  var AccessorNode            = load(__webpack_require__(235));
  var ArrayNode               = load(__webpack_require__(25));
  var AssignmentNode          = load(__webpack_require__(238));
  var BlockNode               = load(__webpack_require__(240));
  var ConditionalNode         = load(__webpack_require__(242));
  var ConstantNode            = load(__webpack_require__(26));
  var FunctionAssignmentNode  = load(__webpack_require__(243));
  var IndexNode               = load(__webpack_require__(18));
  var ObjectNode              = load(__webpack_require__(244));
  var OperatorNode            = load(__webpack_require__(245));
  var ParenthesisNode         = load(__webpack_require__(246));
  var FunctionNode            = load(__webpack_require__(28));
  var RangeNode               = load(__webpack_require__(21));
  var SymbolNode              = load(__webpack_require__(9));


  /**
   * Parse an expression. Returns a node tree, which can be evaluated by
   * invoking node.eval();
   *
   * Syntax:
   *
   *     parse(expr)
   *     parse(expr, options)
   *     parse([expr1, expr2, expr3, ...])
   *     parse([expr1, expr2, expr3, ...], options)
   *
   * Example:
   *
   *     var node = parse('sqrt(3^2 + 4^2)');
   *     node.compile(math).eval(); // 5
   *
   *     var scope = {a:3, b:4}
   *     var node = parse('a * b'); // 12
   *     var code = node.compile(math);
   *     code.eval(scope); // 12
   *     scope.a = 5;
   *     code.eval(scope); // 20
   *
   *     var nodes = math.parse(['a = 3', 'b = 4', 'a * b']);
   *     nodes[2].compile(math).eval(); // 12
   *
   * @param {string | string[] | Matrix} expr
   * @param {{nodes: Object<string, Node>}} [options]  Available options:
   *                                                   - `nodes` a set of custom nodes
   * @return {Node | Node[]} node
   * @throws {Error}
   */
  function parse (expr, options) {
    if (arguments.length != 1 && arguments.length != 2) {
      throw new ArgumentsError('parse', arguments.length, 1, 2);
    }

    // pass extra nodes
    extra_nodes = (options && options.nodes) ? options.nodes : {};

    if (typeof expr === 'string') {
      // parse a single expression
      expression = expr;
      return parseStart();
    }
    else if (Array.isArray(expr) || expr instanceof type.Matrix) {
      // parse an array or matrix with expressions
      return deepMap(expr, function (elem) {
        if (typeof elem !== 'string') throw new TypeError('String expected');

        expression = elem;
        return parseStart();
      });
    }
    else {
      // oops
      throw new TypeError('String or matrix expected');
    }
  }

  // token types enumeration
  var TOKENTYPE = {
    NULL : 0,
    DELIMITER : 1,
    NUMBER : 2,
    SYMBOL : 3,
    UNKNOWN : 4
  };

  // map with all delimiters
  var DELIMITERS = {
    ',': true,
    '(': true,
    ')': true,
    '[': true,
    ']': true,
    '{': true,
    '}': true,
    '\"': true,
    ';': true,

    '+': true,
    '-': true,
    '*': true,
    '.*': true,
    '/': true,
    './': true,
    '%': true,
    '^': true,
    '.^': true,
    '~': true,
    '!': true,
    '&': true,
    '|': true,
    '^|': true,
    '\'': true,
    '=': true,
    ':': true,
    '?': true,

    '==': true,
    '!=': true,
    '<': true,
    '>': true,
    '<=': true,
    '>=': true,

    '<<': true,
    '>>': true,
    '>>>': true
  };

  // map with all named delimiters
  var NAMED_DELIMITERS = {
    'mod': true,
    'to': true,
    'in': true,
    'and': true,
    'xor': true,
    'or': true,
    'not': true
  };

  var extra_nodes = {};             // current extra nodes
  var expression = '';              // current expression
  var comment = '';                 // last parsed comment
  var index = 0;                    // current index in expr
  var c = '';                       // current token character in expr
  var token = '';                   // current token
  var token_type = TOKENTYPE.NULL;  // type of the token
  var nesting_level = 0;            // level of nesting inside parameters, used to ignore newline characters
  var conditional_level = null;     // when a conditional is being parsed, the level of the conditional is stored here

  /**
   * Get the first character from the expression.
   * The character is stored into the char c. If the end of the expression is
   * reached, the function puts an empty string in c.
   * @private
   */
  function first() {
    index = 0;
    c = expression.charAt(0);
    nesting_level = 0;
    conditional_level = null;
  }

  /**
   * Get the next character from the expression.
   * The character is stored into the char c. If the end of the expression is
   * reached, the function puts an empty string in c.
   * @private
   */
  function next() {
    index++;
    c = expression.charAt(index);
  }

  /**
   * Preview the previous character from the expression.
   * @return {string} cNext
   * @private
   */
  function prevPreview() {
    return expression.charAt(index - 1);
  }

  /**
   * Preview the next character from the expression.
   * @return {string} cNext
   * @private
   */
  function nextPreview() {
    return expression.charAt(index + 1);
  }

  /**
   * Preview the second next character from the expression.
   * @return {string} cNext
   * @private
   */
  function nextNextPreview() {
    return expression.charAt(index + 2);
  }

  /**
   * Get next token in the current string expr.
   * The token and token type are available as token and token_type
   * @private
   */
  function getToken() {
    token_type = TOKENTYPE.NULL;
    token = '';
    comment = '';

    // skip over whitespaces
    // space, tab, and newline when inside parameters
    while (parse.isWhitespace(c, nesting_level)) {
      next();
    }

    // skip comment
    if (c == '#') {
      while (c != '\n' && c != '') {
        comment += c;
        next();
      }
    }

    // check for end of expression
    if (c == '') {
      // token is still empty
      token_type = TOKENTYPE.DELIMITER;
      return;
    }

    // check for new line character
    if (c == '\n' && !nesting_level) {
      token_type = TOKENTYPE.DELIMITER;
      token = c;
      next();
      return;
    }

    // check for delimiters consisting of 3 characters
    var c2 = c + nextPreview();
    var c3 = c2 + nextNextPreview();
    if (c3.length == 3 && DELIMITERS[c3]) {
      token_type = TOKENTYPE.DELIMITER;
      token = c3;
      next();
      next();
      next();
      return;
    }

    // check for delimiters consisting of 2 characters
    if (c2.length == 2 && DELIMITERS[c2]) {
      token_type = TOKENTYPE.DELIMITER;
      token = c2;
      next();
      next();
      return;
    }

    // check for delimiters consisting of 1 character
    if (DELIMITERS[c]) {
      token_type = TOKENTYPE.DELIMITER;
      token = c;
      next();
      return;
    }

    // check for a number
    if (parse.isDigitDot(c)) {
      token_type = TOKENTYPE.NUMBER;

      // get number, can have a single dot
      if (c == '.') {
        token += c;
        next();

        if (!parse.isDigit(c)) {
          // this is no number, it is just a dot (can be dot notation)
          token_type = TOKENTYPE.DELIMITER;
        }
      }
      else {
        while (parse.isDigit(c)) {
          token += c;
          next();
        }
        if (parse.isDecimalMark(c, nextPreview())) {
          token += c;
          next();
        }
      }
      while (parse.isDigit(c)) {
        token += c;
        next();
      }

      // check for exponential notation like "2.3e-4", "1.23e50" or "2e+4"
      c2 = nextPreview();
      if (c == 'E' || c == 'e') {
        if (parse.isDigit(c2) || c2 == '-' || c2 == '+') {
          token += c;
          next();

          if (c == '+' || c == '-') {
            token += c;
            next();
          }

          // Scientific notation MUST be followed by an exponent
          if (!parse.isDigit(c)) {
            throw createSyntaxError('Digit expected, got "' + c + '"');
          }

          while (parse.isDigit(c)) {
            token += c;
            next();
          }

          if (parse.isDecimalMark(c, nextPreview())) {
            throw createSyntaxError('Digit expected, got "' + c + '"');
          }
        }
        else if (c2 == '.') {
          next();
          throw createSyntaxError('Digit expected, got "' + c + '"');
        }
      }

      return;
    }

    // check for variables, functions, named operators
    if (parse.isAlpha(c, prevPreview(), nextPreview())) {
      while (parse.isAlpha(c, prevPreview(), nextPreview()) || parse.isDigit(c)) {
        token += c;
        next();
      }

      if (NAMED_DELIMITERS.hasOwnProperty(token)) {
        token_type = TOKENTYPE.DELIMITER;
      }
      else {
        token_type = TOKENTYPE.SYMBOL;
      }

      return;
    }

    // something unknown is found, wrong characters -> a syntax error
    token_type = TOKENTYPE.UNKNOWN;
    while (c != '') {
      token += c;
      next();
    }
    throw createSyntaxError('Syntax error in part "' + token + '"');
  }

  /**
   * Get next token and skip newline tokens
   */
  function getTokenSkipNewline () {
    do {
      getToken();
    }
    while (token == '\n');
  }

  /**
   * Open parameters.
   * New line characters will be ignored until closeParams() is called
   */
  function openParams() {
    nesting_level++;
  }

  /**
   * Close parameters.
   * New line characters will no longer be ignored
   */
  function closeParams() {
    nesting_level--;
  }

  /**
   * Checks whether the current character `c` is a valid alpha character:
   *
   * - A latin letter (upper or lower case) Ascii: a-z, A-Z
   * - An underscore                        Ascii: _
   * - A dollar sign                        Ascii: $
   * - A latin letter with accents          Unicode: \u00C0 - \u02AF
   * - A greek letter                       Unicode: \u0370 - \u03FF
   * - A mathematical alphanumeric symbol   Unicode: \u{1D400} - \u{1D7FF} excluding invalid code points
   *
   * The previous and next characters are needed to determine whether
   * this character is part of a unicode surrogate pair.
   *
   * @param {string} c      Current character in the expression
   * @param {string} cPrev  Previous character
   * @param {string} cNext  Next character
   * @return {boolean}
   */
  parse.isAlpha = function isAlpha (c, cPrev, cNext) {
    return parse.isValidLatinOrGreek(c)
        || parse.isValidMathSymbol(c, cNext)
        || parse.isValidMathSymbol(cPrev, c);
  };

  /**
   * Test whether a character is a valid latin, greek, or letter-like character
   * @param {string} c
   * @return {boolean}
   */
  parse.isValidLatinOrGreek = function isValidLatinOrGreek (c) {
    return /^[a-zA-Z_$\u00C0-\u02AF\u0370-\u03FF\u2100-\u214F]$/.test(c);
  };

  /**
   * Test whether two given 16 bit characters form a surrogate pair of a
   * unicode math symbol.
   *
   * http://unicode-table.com/en/
   * http://www.wikiwand.com/en/Mathematical_operators_and_symbols_in_Unicode
   *
   * Note: In ES6 will be unicode aware:
   * http://stackoverflow.com/questions/280712/javascript-unicode-regexes
   * https://mathiasbynens.be/notes/es6-unicode-regex
   *
   * @param {string} high
   * @param {string} low
   * @return {boolean}
   */
  parse.isValidMathSymbol = function isValidMathSymbol (high, low) {
    return /^[\uD835]$/.test(high) &&
        /^[\uDC00-\uDFFF]$/.test(low) &&
        /^[^\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]$/.test(low);
  };

  /**
   * Check whether given character c is a white space character: space, tab, or enter
   * @param {string} c
   * @param {number} nestingLevel
   * @return {boolean}
   */
  parse.isWhitespace = function isWhitespace (c, nestingLevel) {
    // TODO: also take '\r' carriage return as newline? Or does that give problems on mac?
    return c == ' ' || c == '\t' || (c == '\n' && nestingLevel > 0);
  };

  /**
   * Test whether the character c is a decimal mark (dot).
   * This is the case when it's not the start of a delimiter '.*', './', or '.^'
   * @param {string} c
   * @param {string} cNext
   * @return {boolean}
   */
  parse.isDecimalMark = function isDecimalMark (c, cNext) {
    return c == '.' && cNext !== '/' && cNext !== '*' && cNext !== '^';
  };

  /**
   * checks if the given char c is a digit or dot
   * @param {string} c   a string with one character
   * @return {boolean}
   */
  parse.isDigitDot = function isDigitDot (c) {
    return ((c >= '0' && c <= '9') || c == '.');
  };

  /**
   * checks if the given char c is a digit
   * @param {string} c   a string with one character
   * @return {boolean}
   */
  parse.isDigit = function isDigit (c) {
    return (c >= '0' && c <= '9');
  };

  /**
   * Start of the parse levels below, in order of precedence
   * @return {Node} node
   * @private
   */
  function parseStart () {
    // get the first character in expression
    first();

    getToken();

    var node = parseBlock();

    // check for garbage at the end of the expression
    // an expression ends with a empty character '' and token_type DELIMITER
    if (token != '') {
      if (token_type == TOKENTYPE.DELIMITER) {
        // user entered a not existing operator like "//"

        // TODO: give hints for aliases, for example with "<>" give as hint " did you mean != ?"
        throw createError('Unexpected operator ' + token);
      }
      else {
        throw createSyntaxError('Unexpected part "' + token + '"');
      }
    }

    return node;
  }

  /**
   * Parse a block with expressions. Expressions can be separated by a newline
   * character '\n', or by a semicolon ';'. In case of a semicolon, no output
   * of the preceding line is returned.
   * @return {Node} node
   * @private
   */
  function parseBlock () {
    var node;
    var blocks = [];
    var visible;

    if (token != '' && token != '\n' && token != ';') {
      node = parseAssignment();
      node.comment = comment;
    }

    // TODO: simplify this loop
    while (token == '\n' || token == ';') {
      if (blocks.length == 0 && node) {
        visible = (token != ';');
        blocks.push({
          node: node,
          visible: visible
        });
      }

      getToken();
      if (token != '\n' && token != ';' && token != '') {
        node = parseAssignment();
        node.comment = comment;

        visible = (token != ';');
        blocks.push({
          node: node,
          visible: visible
        });
      }
    }

    if (blocks.length > 0) {
      return new BlockNode(blocks);
    }
    else {
      if (!node) {
        node = new ConstantNode('undefined', 'undefined');
        node.comment = comment;
      }

      return node
    }
  }

  /**
   * Assignment of a function or variable,
   * - can be a variable like 'a=2.3'
   * - or a updating an existing variable like 'matrix(2,3:5)=[6,7,8]'
   * - defining a function like 'f(x) = x^2'
   * @return {Node} node
   * @private
   */
  function parseAssignment () {
    var name, args, value, valid;

    var node = parseConditional();

    if (token == '=') {
      if (type.isSymbolNode(node)) {
        // parse a variable assignment like 'a = 2/3'
        name = node.name;
        getTokenSkipNewline();
        value = parseAssignment();
        return new AssignmentNode(new SymbolNode(name), value);
      }
      else if (type.isAccessorNode(node)) {
        // parse a matrix subset assignment like 'A[1,2] = 4'
        getTokenSkipNewline();
        value = parseAssignment();
        return new AssignmentNode(node.object, node.index, value);
      }
      else if (type.isFunctionNode(node) && type.isSymbolNode(node.fn)) {
        // parse function assignment like 'f(x) = x^2'
        valid = true;
        args = [];

        name = node.name;
        node.args.forEach(function (arg, index) {
          if (type.isSymbolNode(arg)) {
            args[index] = arg.name;
          }
          else {
            valid = false;
          }
        });

        if (valid) {
          getTokenSkipNewline();
          value = parseAssignment();
          return new FunctionAssignmentNode(name, args, value);
        }
      }

      throw createSyntaxError('Invalid left hand side of assignment operator =');
    }

    return node;
  }

  /**
   * conditional operation
   *
   *     condition ? truePart : falsePart
   *
   * Note: conditional operator is right-associative
   *
   * @return {Node} node
   * @private
   */
  function parseConditional () {
    var node = parseLogicalOr();

    while (token == '?') {
      // set a conditional level, the range operator will be ignored as long
      // as conditional_level == nesting_level.
      var prev = conditional_level;
      conditional_level = nesting_level;
      getTokenSkipNewline();

      var condition = node;
      var trueExpr = parseAssignment();

      if (token != ':') throw createSyntaxError('False part of conditional expression expected');

      conditional_level = null;
      getTokenSkipNewline();

      var falseExpr = parseAssignment(); // Note: check for conditional operator again, right associativity

      node = new ConditionalNode(condition, trueExpr, falseExpr);

      // restore the previous conditional level
      conditional_level = prev;
    }

    return node;
  }

  /**
   * logical or, 'x or y'
   * @return {Node} node
   * @private
   */
  function parseLogicalOr() {
    var node = parseLogicalXor();

    while (token == 'or') {
      getTokenSkipNewline();
      node = new OperatorNode('or', 'or', [node, parseLogicalXor()]);
    }

    return node;
  }

  /**
   * logical exclusive or, 'x xor y'
   * @return {Node} node
   * @private
   */
  function parseLogicalXor() {
    var node = parseLogicalAnd();

    while (token == 'xor') {
      getTokenSkipNewline();
      node = new OperatorNode('xor', 'xor', [node, parseLogicalAnd()]);
    }

    return node;
  }

  /**
   * logical and, 'x and y'
   * @return {Node} node
   * @private
   */
  function parseLogicalAnd() {
    var node = parseBitwiseOr();

    while (token == 'and') {
      getTokenSkipNewline();
      node = new OperatorNode('and', 'and', [node, parseBitwiseOr()]);
    }

    return node;
  }

  /**
   * bitwise or, 'x | y'
   * @return {Node} node
   * @private
   */
  function parseBitwiseOr() {
    var node = parseBitwiseXor();

    while (token == '|') {
      getTokenSkipNewline();
      node = new OperatorNode('|', 'bitOr', [node, parseBitwiseXor()]);
    }

    return node;
  }

  /**
   * bitwise exclusive or (xor), 'x ^| y'
   * @return {Node} node
   * @private
   */
  function parseBitwiseXor() {
    var node = parseBitwiseAnd();

    while (token == '^|') {
      getTokenSkipNewline();
      node = new OperatorNode('^|', 'bitXor', [node, parseBitwiseAnd()]);
    }

    return node;
  }

  /**
   * bitwise and, 'x & y'
   * @return {Node} node
   * @private
   */
  function parseBitwiseAnd () {
    var node = parseRelational();

    while (token == '&') {
      getTokenSkipNewline();
      node = new OperatorNode('&', 'bitAnd', [node, parseRelational()]);
    }

    return node;
  }

  /**
   * relational operators
   * @return {Node} node
   * @private
   */
  function parseRelational () {
    var node, operators, name, fn, params;

    node = parseShift();

    operators = {
      '==': 'equal',
      '!=': 'unequal',
      '<': 'smaller',
      '>': 'larger',
      '<=': 'smallerEq',
      '>=': 'largerEq'
    };
    while (operators.hasOwnProperty(token)) {
      name = token;
      fn = operators[name];

      getTokenSkipNewline();
      params = [node, parseShift()];
      node = new OperatorNode(name, fn, params);
    }

    return node;
  }

  /**
   * Bitwise left shift, bitwise right arithmetic shift, bitwise right logical shift
   * @return {Node} node
   * @private
   */
  function parseShift () {
    var node, operators, name, fn, params;

    node = parseConversion();

    operators = {
      '<<' : 'leftShift',
      '>>' : 'rightArithShift',
      '>>>' : 'rightLogShift'
    };

    while (operators.hasOwnProperty(token)) {
      name = token;
      fn = operators[name];

      getTokenSkipNewline();
      params = [node, parseConversion()];
      node = new OperatorNode(name, fn, params);
    }

    return node;
  }

  /**
   * conversion operators 'to' and 'in'
   * @return {Node} node
   * @private
   */
  function parseConversion () {
    var node, operators, name, fn, params;

    node = parseRange();

    operators = {
      'to' : 'to',
      'in' : 'to'   // alias of 'to'
    };

    while (operators.hasOwnProperty(token)) {
      name = token;
      fn = operators[name];

      getTokenSkipNewline();
      
      if (name === 'in' && token === '') {
        // end of expression -> this is the unit 'in' ('inch')
        node = new OperatorNode('*', 'multiply', [node, new SymbolNode('in')], true);
      }
      else {
        // operator 'a to b' or 'a in b'
        params = [node, parseRange()];
        node = new OperatorNode(name, fn, params);
      }
    }

    return node;
  }

  /**
   * parse range, "start:end", "start:step:end", ":", "start:", ":end", etc
   * @return {Node} node
   * @private
   */
  function parseRange () {
    var node, params = [];

    if (token == ':') {
      // implicit start=1 (one-based)
      node = new ConstantNode('1', 'number');
    }
    else {
      // explicit start
      node = parseAddSubtract();
    }

    if (token == ':' && (conditional_level !== nesting_level)) {
      // we ignore the range operator when a conditional operator is being processed on the same level
      params.push(node);

      // parse step and end
      while (token == ':' && params.length < 3) {
        getTokenSkipNewline();

        if (token == ')' || token == ']' || token == ',' || token == '') {
          // implicit end
          params.push(new SymbolNode('end'));
        }
        else {
          // explicit end
          params.push(parseAddSubtract());
        }
      }

      if (params.length == 3) {
        // params = [start, step, end]
        node = new RangeNode(params[0], params[2], params[1]); // start, end, step
      }
      else { // length == 2
        // params = [start, end]
        node = new RangeNode(params[0], params[1]); // start, end
      }
    }

    return node;
  }

  /**
   * add or subtract
   * @return {Node} node
   * @private
   */
  function parseAddSubtract ()  {
    var node, operators, name, fn, params;

    node = parseMultiplyDivide();

    operators = {
      '+': 'add',
      '-': 'subtract'
    };
    while (operators.hasOwnProperty(token)) {
      name = token;
      fn = operators[name];

      getTokenSkipNewline();
      params = [node, parseMultiplyDivide()];
      node = new OperatorNode(name, fn, params);
    }

    return node;
  }

  /**
   * multiply, divide, modulus
   * @return {Node} node
   * @private
   */
  function parseMultiplyDivide () {
    var node, last, operators, name, fn;

    node = parseUnary();
    last = node;

    operators = {
      '*': 'multiply',
      '.*': 'dotMultiply',
      '/': 'divide',
      './': 'dotDivide',
      '%': 'mod',
      'mod': 'mod'
    };

    while (true) {
      if (operators.hasOwnProperty(token)) {
        // explicit operators
        name = token;
        fn = operators[name];

        getTokenSkipNewline();

        last = parseUnary();
        node = new OperatorNode(name, fn, [node, last]);
      }
      else if ((token_type === TOKENTYPE.SYMBOL) ||
          (token === 'in' && type.isConstantNode(node)) ||
          (token_type === TOKENTYPE.NUMBER &&
              !type.isConstantNode(last) &&
              (!type.isOperatorNode(last) || last.op === '!')) ||
          (token === '(')) {
        // parse implicit multiplication
        //
        // symbol:      implicit multiplication like '2a', '(2+3)a', 'a b'
        // number:      implicit multiplication like '(2+3)2'
        // parenthesis: implicit multiplication like '2(3+4)', '(3+4)(1+2)'
        last = parseUnary();
        node = new OperatorNode('*', 'multiply', [node, last], true /*implicit*/);
      }
      else {
        break;
      }
    }

    return node;
  }

  /**
   * Unary plus and minus, and logical and bitwise not
   * @return {Node} node
   * @private
   */
  function parseUnary () {
    var name, params, fn;
    var operators = {
      '-': 'unaryMinus',
      '+': 'unaryPlus',
      '~': 'bitNot',
      'not': 'not'
    };

    if (operators.hasOwnProperty(token)) {
      fn = operators[token];
      name = token;

      getTokenSkipNewline();
      params = [parseUnary()];

      return new OperatorNode(name, fn, params);
    }

    return parsePow();
  }

  /**
   * power
   * Note: power operator is right associative
   * @return {Node} node
   * @private
   */
  function parsePow () {
    var node, name, fn, params;

    node = parseLeftHandOperators();

    if (token == '^' || token == '.^') {
      name = token;
      fn = (name == '^') ? 'pow' : 'dotPow';

      getTokenSkipNewline();
      params = [node, parseUnary()]; // Go back to unary, we can have '2^-3'
      node = new OperatorNode(name, fn, params);
    }

    return node;
  }

  /**
   * Left hand operators: factorial x!, transpose x'
   * @return {Node} node
   * @private
   */
  function parseLeftHandOperators ()  {
    var node, operators, name, fn, params;

    node = parseCustomNodes();

    operators = {
      '!': 'factorial',
      '\'': 'transpose'
    };

    while (operators.hasOwnProperty(token)) {
      name = token;
      fn = operators[name];

      getToken();
      params = [node];

      node = new OperatorNode(name, fn, params);
      node = parseAccessors(node);
    }

    return node;
  }

  /**
   * Parse a custom node handler. A node handler can be used to process
   * nodes in a custom way, for example for handling a plot.
   *
   * A handler must be passed as second argument of the parse function.
   * - must extend math.expression.node.Node
   * - must contain a function _compile(defs: Object) : string
   * - must contain a function find(filter: Object) : Node[]
   * - must contain a function toString() : string
   * - the constructor is called with a single argument containing all parameters
   *
   * For example:
   *
   *     nodes = {
   *       'plot': PlotHandler
   *     };
   *
   * The constructor of the handler is called as:
   *
   *     node = new PlotHandler(params);
   *
   * The handler will be invoked when evaluating an expression like:
   *
   *     node = math.parse('plot(sin(x), x)', nodes);
   *
   * @return {Node} node
   * @private
   */
  function parseCustomNodes () {
    var params = [];

    if (token_type == TOKENTYPE.SYMBOL && extra_nodes.hasOwnProperty(token)) {
      var CustomNode = extra_nodes[token];

      getToken();

      // parse parameters
      if (token == '(') {
        params = [];

        openParams();
        getToken();

        if (token != ')') {
          params.push(parseAssignment());

          // parse a list with parameters
          while (token == ',') {
            getToken();
            params.push(parseAssignment());
          }
        }

        if (token != ')') {
          throw createSyntaxError('Parenthesis ) expected');
        }
        closeParams();
        getToken();
      }

      // create a new custom node
      //noinspection JSValidateTypes
      return new CustomNode(params);
    }

    return parseSymbol();
  }

  /**
   * parse symbols: functions, variables, constants, units
   * @return {Node} node
   * @private
   */
  function parseSymbol () {
    var node, name;

    if (token_type == TOKENTYPE.SYMBOL ||
        (token_type == TOKENTYPE.DELIMITER && token in NAMED_DELIMITERS)) {
      name = token;

      getToken();

      // parse function parameters and matrix index
      node = new SymbolNode(name);
      node = parseAccessors(node);
      return node;
    }

    return parseString();
  }

  /**
   * parse accessors:
   * - function invocation in round brackets (...), for example sqrt(2)
   * - index enclosed in square brackets [...], for example A[2,3]
   * - dot notation for properties, like foo.bar
   * @param {Node} node    Node on which to apply the parameters. If there
   *                       are no parameters in the expression, the node
   *                       itself is returned
   * @param {string[]} [types]  Filter the types of notations
   *                            can be ['(', '[', '.']
   * @return {Node} node
   * @private
   */
  function parseAccessors (node, types) {
    var params;

    while ((token === '(' || token === '[' || token === '.') &&
        (!types || types.indexOf(token) !== -1)) {
      params = [];

      if (token === '(') {
        if (type.isSymbolNode(node) || type.isAccessorNode(node) || type.isFunctionNode(node)) {
          // function invocation like fn(2, 3)
          openParams();
          getToken();

          if (token !== ')') {
            params.push(parseAssignment());

            // parse a list with parameters
            while (token === ',') {
              getToken();
              params.push(parseAssignment());
            }
          }

          if (token !== ')') {
            throw createSyntaxError('Parenthesis ) expected');
          }
          closeParams();
          getToken();

          node = new FunctionNode(node, params);
        }
        else {
          // implicit multiplication like (2+3)(4+5)
          // don't parse it here but let it be handled by parseMultiplyDivide
          // with correct precedence
          return node;
        }
      }
      else if (token === '[') {
        // index notation like variable[2, 3]
        openParams();
        getToken();

        if (token !== ']') {
          params.push(parseAssignment());

          // parse a list with parameters
          while (token === ',') {
            getToken();
            params.push(parseAssignment());
          }
        }

        if (token !== ']') {
          throw createSyntaxError('Parenthesis ] expected');
        }
        closeParams();
        getToken();

        node = new AccessorNode(node, new IndexNode(params));
      }
      else {
        // dot notation like variable.prop
        getToken();

        if (token_type !== TOKENTYPE.SYMBOL) {
          throw createSyntaxError('Property name expected after dot');
        }
        params.push(new ConstantNode(token));
        getToken();

        var dotNotation = true;
        node = new AccessorNode(node, new IndexNode(params, dotNotation));
      }
    }

    return node;
  }

  /**
   * parse a string.
   * A string is enclosed by double quotes
   * @return {Node} node
   * @private
   */
  function parseString () {
    var node, str;

    if (token == '"') {
      str = parseStringToken();

      // create constant
      node = new ConstantNode(str, 'string');

      // parse index parameters
      node = parseAccessors(node);

      return node;
    }

    return parseMatrix();
  }

  /**
   * Parse a string surrounded by double quotes "..."
   * @return {string}
   */
  function parseStringToken () {
    var str = '';

    while (c != '' && c != '\"') {
      if (c == '\\') {
        // escape character
        str += c;
        next();
      }

      str += c;
      next();
    }

    getToken();
    if (token != '"') {
      throw createSyntaxError('End of string " expected');
    }
    getToken();

    return str;
  }

  /**
   * parse the matrix
   * @return {Node} node
   * @private
   */
  function parseMatrix () {
    var array, params, rows, cols;

    if (token == '[') {
      // matrix [...]
      openParams();
      getToken();

      if (token != ']') {
        // this is a non-empty matrix
        var row = parseRow();

        if (token == ';') {
          // 2 dimensional array
          rows = 1;
          params = [row];

          // the rows of the matrix are separated by dot-comma's
          while (token == ';') {
            getToken();

            params[rows] = parseRow();
            rows++;
          }

          if (token != ']') {
            throw createSyntaxError('End of matrix ] expected');
          }
          closeParams();
          getToken();

          // check if the number of columns matches in all rows
          cols = params[0].items.length;
          for (var r = 1; r < rows; r++) {
            if (params[r].items.length != cols) {
              throw createError('Column dimensions mismatch ' +
                  '(' + params[r].items.length + ' != ' + cols + ')');
            }
          }

          array = new ArrayNode(params);
        }
        else {
          // 1 dimensional vector
          if (token != ']') {
            throw createSyntaxError('End of matrix ] expected');
          }
          closeParams();
          getToken();

          array = row;
        }
      }
      else {
        // this is an empty matrix "[ ]"
        closeParams();
        getToken();
        array = new ArrayNode([]);
      }

      return parseAccessors(array);
    }

    return parseObject();
  }

  /**
   * Parse a single comma-separated row from a matrix, like 'a, b, c'
   * @return {ArrayNode} node
   */
  function parseRow () {
    var params = [parseAssignment()];
    var len = 1;

    while (token == ',') {
      getToken();

      // parse expression
      params[len] = parseAssignment();
      len++;
    }

    return new ArrayNode(params);
  }

  /**
   * parse an object, enclosed in angle brackets{...}, for example {value: 2}
   * @return {Node} node
   * @private
   */
  function parseObject () {
    if (token == '{') {
      var key;

      var properties = {};
      do {
        getToken();

        if (token != '}') {
          // parse key
          if (token == '"') {
            key = parseStringToken();
          }
          else if (token_type == TOKENTYPE.SYMBOL) {
            key = token;
            getToken();
          }
          else {
            throw createSyntaxError('Symbol or string expected as object key');
          }

          // parse key/value separator
          if (token != ':') {
            throw createSyntaxError('Colon : expected after object key');
          }
          getToken();

          // parse key
          properties[key] = parseAssignment();
        }
      }
      while (token == ',');

      if (token != '}') {
        throw createSyntaxError('Comma , or bracket } expected after object value');
      }
      getToken();

      var node = new ObjectNode(properties);

      // parse index parameters
      node = parseAccessors(node);

      return node;
    }

    return parseNumber();
  }

  /**
   * parse a number
   * @return {Node} node
   * @private
   */
  function parseNumber () {
    var number;

    if (token_type == TOKENTYPE.NUMBER) {
      // this is a number
      number = token;
      getToken();

      return new ConstantNode(number, 'number');
    }

    return parseParentheses();
  }

  /**
   * parentheses
   * @return {Node} node
   * @private
   */
  function parseParentheses () {
    var node;

    // check if it is a parenthesized expression
    if (token == '(') {
      // parentheses (...)
      openParams();
      getToken();

      node = parseAssignment(); // start again

      if (token != ')') {
        throw createSyntaxError('Parenthesis ) expected');
      }
      closeParams();
      getToken();

      node = new ParenthesisNode(node);
      node = parseAccessors(node);
      return node;
    }

    return parseEnd();
  }

  /**
   * Evaluated when the expression is not yet ended but expected to end
   * @return {Node} res
   * @private
   */
  function parseEnd () {
    if (token == '') {
      // syntax error or unexpected end of expression
      throw createSyntaxError('Unexpected end of expression');
    } else if (token === "'") {
      throw createSyntaxError('Value expected. Note: strings must be enclosed by double quotes');
    } else {
      throw createSyntaxError('Value expected');
    }
  }

  /**
   * Shortcut for getting the current row value (one based)
   * Returns the line of the currently handled expression
   * @private
   */
  /* TODO: implement keeping track on the row number
  function row () {
    return null;
  }
  */

  /**
   * Shortcut for getting the current col value (one based)
   * Returns the column (position) where the last token starts
   * @private
   */
  function col () {
    return index - token.length + 1;
  }

  /**
   * Create an error
   * @param {string} message
   * @return {SyntaxError} instantiated error
   * @private
   */
  function createSyntaxError (message) {
    var c = col();
    var error = new SyntaxError(message + ' (char ' + c + ')');
    error['char'] = c;

    return error;
  }

  /**
   * Create an error
   * @param {string} message
   * @return {Error} instantiated error
   * @private
   */
  function createError (message) {
    var c = col();
    var error = new SyntaxError(message + ' (char ' + c + ')');
    error['char'] = c;

    return error;
  }

  return parse;
}

exports.name = 'parse';
exports.path = 'expression';
exports.factory = factory;


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(1).stringify;
var getSafeProperty = __webpack_require__(5).getSafeProperty;

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));
  var IndexNode = load(__webpack_require__(18));
  var access = load(__webpack_require__(22));

  /**
   * @constructor AccessorNode
   * @extends {Node}
   * Access an object property or get a matrix subset
   *
   * @param {Node} object                 The object from which to retrieve
   *                                      a property or subset.
   * @param {IndexNode} index             IndexNode containing ranges
   */
  function AccessorNode(object, index) {
    if (!(this instanceof AccessorNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (!type.isNode(object)) {
      throw new TypeError('Node expected for parameter "object"');
    }
    if (!type.isIndexNode(index)) {
      throw new TypeError('IndexNode expected for parameter "index"');
    }

    this.object = object || null;
    this.index = index;

    // readonly property name
    Object.defineProperty(this, 'name', {
      get: function () {
        if (this.index) {
          return (this.index.isObjectProperty())
              ? this.index.getObjectProperty()
              : '';
        }
        else {
          return this.object.name || '';
        }
      }.bind(this),
      set: function () {
        throw new Error('Cannot assign a new name, name is read-only');
      }
    });
  }

  AccessorNode.prototype = new Node();

  AccessorNode.prototype.type = 'AccessorNode';

  AccessorNode.prototype.isAccessorNode = true;

  /**
   * Compile the node to javascript code
   * @param {AccessorNode} node  Node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileAccessorNode(node, defs, args) {
    if (!(node instanceof AccessorNode)) {
      throw new TypeError('No valid AccessorNode')
    }

    defs.access = access;
    defs.getSafeProperty = getSafeProperty;

    var object = compile(node.object, defs, args);
    var index = compile(node.index, defs, args);

    if (node.index.isObjectProperty()) {
      var jsProp = stringify(node.index.getObjectProperty());
      return 'getSafeProperty(' + object + ', ' + jsProp + ')';
    }
    else if (node.index.needsSize()) {
      // if some parameters use the 'end' parameter, we need to calculate the size
      return '(function () {' +
          '  var object = ' + object + ';' +
          '  var size = math.size(object).valueOf();' +
          '  return access(object, ' + index + ');' +
          '})()';
    }
    else {
      return 'access(' + object + ', ' + index + ')';
    }
  }

  // register the compile function
  register(AccessorNode.prototype.type, compileAccessorNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  AccessorNode.prototype.forEach = function (callback) {
    callback(this.object, 'object', this);
    callback(this.index, 'index', this);
  };

  /**
   * Create a new AccessorNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {AccessorNode} Returns a transformed copy of the node
   */
  AccessorNode.prototype.map = function (callback) {
    return new AccessorNode(
        this._ifNode(callback(this.object, 'object', this)),
        this._ifNode(callback(this.index, 'index', this))
    );
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {AccessorNode}
   */
  AccessorNode.prototype.clone = function () {
    return new AccessorNode(this.object, this.index);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string}
   */
  AccessorNode.prototype._toString = function (options) {
    var object = this.object.toString(options);
    if (needParenthesis(this.object)) {
      object = '(' + object + ')';
    }

    return object + this.index.toString(options);
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string}
   */
  AccessorNode.prototype.toHTML = function (options) {
    var object = this.object.toHTML(options);
    if (needParenthesis(this.object)) {
      object = '<span class="math-parenthesis math-round-parenthesis">(</span>' + object + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    return object + this.index.toHTML(options);
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string}
   */
  AccessorNode.prototype._toTex = function (options) {
    var object = this.object.toTex(options);
    if (needParenthesis(this.object)) {
      object = '\\left(' + object + '\\right)';
    }

    return object + this.index.toTex(options);
  };

  /**
   * Are parenthesis needed?
   * @private
   */
  function needParenthesis(node) {
    // TODO: maybe make a method on the nodes which tells whether they need parenthesis?
    return !(
        type.isAccessorNode(node) ||
        type.isArrayNode(node) ||
        type.isConstantNode(node) ||
        type.isFunctionNode(node) ||
        type.isObjectNode(node) ||
        type.isParenthesisNode(node) ||
        type.isSymbolNode(node));
  }

  return AccessorNode;
}

exports.name = 'AccessorNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 236 */
/***/ (function(module, exports) {

/**
 * Convert a BigNumber to a formatted string representation.
 *
 * Syntax:
 *
 *    format(value)
 *    format(value, options)
 *    format(value, precision)
 *    format(value, fn)
 *
 * Where:
 *
 *    {number} value   The value to be formatted
 *    {Object} options An object with formatting options. Available options:
 *                     {string} notation
 *                         Number notation. Choose from:
 *                         'fixed'          Always use regular number notation.
 *                                          For example '123.40' and '14000000'
 *                         'exponential'    Always use exponential notation.
 *                                          For example '1.234e+2' and '1.4e+7'
 *                         'auto' (default) Regular number notation for numbers
 *                                          having an absolute value between
 *                                          `lower` and `upper` bounds, and uses
 *                                          exponential notation elsewhere.
 *                                          Lower bound is included, upper bound
 *                                          is excluded.
 *                                          For example '123.4' and '1.4e7'.
 *                     {number} precision   A number between 0 and 16 to round
 *                                          the digits of the number.
 *                                          In case of notations 'exponential' and
 *                                          'auto', `precision` defines the total
 *                                          number of significant digits returned
 *                                          and is undefined by default.
 *                                          In case of notation 'fixed',
 *                                          `precision` defines the number of
 *                                          significant digits after the decimal
 *                                          point, and is 0 by default.
 *                     {Object} exponential An object containing two parameters,
 *                                          {number} lower and {number} upper,
 *                                          used by notation 'auto' to determine
 *                                          when to return exponential notation.
 *                                          Default values are `lower=1e-3` and
 *                                          `upper=1e5`.
 *                                          Only applicable for notation `auto`.
 *    {Function} fn    A custom formatting function. Can be used to override the
 *                     built-in notations. Function `fn` is called with `value` as
 *                     parameter and must return a string. Is useful for example to
 *                     format all values inside a matrix in a particular way.
 *
 * Examples:
 *
 *    format(6.4);                                        // '6.4'
 *    format(1240000);                                    // '1.24e6'
 *    format(1/3);                                        // '0.3333333333333333'
 *    format(1/3, 3);                                     // '0.333'
 *    format(21385, 2);                                   // '21000'
 *    format(12.071, {notation: 'fixed'});                // '12'
 *    format(2.3,    {notation: 'fixed', precision: 2});  // '2.30'
 *    format(52.8,   {notation: 'exponential'});          // '5.28e+1'
 *
 * @param {BigNumber} value
 * @param {Object | Function | number} [options]
 * @return {string} str The formatted value
 */
exports.format = function (value, options) {
  if (typeof options === 'function') {
    // handle format(value, fn)
    return options(value);
  }

  // handle special cases
  if (!value.isFinite()) {
    return value.isNaN() ? 'NaN' : (value.gt(0) ? 'Infinity' : '-Infinity');
  }

  // default values for options
  var notation = 'auto';
  var precision = undefined;

  if (options !== undefined) {
    // determine notation from options
    if (options.notation) {
      notation = options.notation;
    }

    // determine precision from options
    if (typeof options === 'number') {
      precision = options;
    }
    else if (options.precision) {
      precision = options.precision;
    }
  }

  // handle the various notations
  switch (notation) {
    case 'fixed':
      return exports.toFixed(value, precision);

    case 'exponential':
      return exports.toExponential(value, precision);

    case 'auto':
      // determine lower and upper bound for exponential notation.
      // TODO: implement support for upper and lower to be BigNumbers themselves
      var lower = 1e-3;
      var upper = 1e5;
      if (options && options.exponential) {
        if (options.exponential.lower !== undefined) {
          lower = options.exponential.lower;
        }
        if (options.exponential.upper !== undefined) {
          upper = options.exponential.upper;
        }
      }

      // adjust the configuration of the BigNumber constructor (yeah, this is quite tricky...)
      var oldConfig = {
        toExpNeg: value.constructor.toExpNeg,
        toExpPos: value.constructor.toExpPos
      };

      value.constructor.config({
        toExpNeg: Math.round(Math.log(lower) / Math.LN10),
        toExpPos: Math.round(Math.log(upper) / Math.LN10)
      });

      // handle special case zero
      if (value.isZero()) return '0';

      // determine whether or not to output exponential notation
      var str;
      var abs = value.abs();
      if (abs.gte(lower) && abs.lt(upper)) {
        // normal number notation
        str = value.toSignificantDigits(precision).toFixed();
      }
      else {
        // exponential notation
        str = exports.toExponential(value, precision);
      }

      // remove trailing zeros after the decimal point
      return str.replace(/((\.\d*?)(0+))($|e)/, function () {
        var digits = arguments[2];
        var e = arguments[4];
        return (digits !== '.') ? digits + e : e;
      });

    default:
      throw new Error('Unknown notation "' + notation + '". ' +
          'Choose "auto", "exponential", or "fixed".');
  }
};

/**
 * Format a number in exponential notation. Like '1.23e+5', '2.3e+0', '3.500e-3'
 * @param {BigNumber} value
 * @param {number} [precision]  Number of digits in formatted output.
 *                              If not provided, the maximum available digits
 *                              is used.
 * @returns {string} str
 */
exports.toExponential = function (value, precision) {
  if (precision !== undefined) {
    return value.toExponential(precision - 1); // Note the offset of one
  }
  else {
    return value.toExponential();
  }
};

/**
 * Format a number with fixed notation.
 * @param {BigNumber} value
 * @param {number} [precision=0]        Optional number of decimals after the
 *                                      decimal point. Zero by default.
 */
exports.toFixed = function (value, precision) {
  return value.toFixed(precision || 0);
  // Note: the (precision || 0) is needed as the toFixed of BigNumber has an
  // undefined default precision instead of 0.
};


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var number = __webpack_require__(8);

function factory (type, config, load, typed) {
  /**
   * Create a range. A range has a start, step, and end, and contains functions
   * to iterate over the range.
   *
   * A range can be constructed as:
   *     var range = new Range(start, end);
   *     var range = new Range(start, end, step);
   *
   * To get the result of the range:
   *     range.forEach(function (x) {
   *         console.log(x);
   *     });
   *     range.map(function (x) {
   *         return math.sin(x);
   *     });
   *     range.toArray();
   *
   * Example usage:
   *     var c = new Range(2, 6);         // 2:1:5
   *     c.toArray();                     // [2, 3, 4, 5]
   *     var d = new Range(2, -3, -1);    // 2:-1:-2
   *     d.toArray();                     // [2, 1, 0, -1, -2]
   *
   * @class Range
   * @constructor Range
   * @param {number} start  included lower bound
   * @param {number} end    excluded upper bound
   * @param {number} [step] step size, default value is 1
   */
  function Range(start, end, step) {
    if (!(this instanceof Range)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    if (start != null) {
      if (type.isBigNumber(start))
        start = start.toNumber();
      else if (typeof start !== 'number')
        throw new TypeError('Parameter start must be a number');
    }
    if (end != null) {
      if (type.isBigNumber(end))
        end = end.toNumber();
      else if (typeof end !== 'number')
        throw new TypeError('Parameter end must be a number');
    }
    if (step != null) {
      if (type.isBigNumber(step))
        step = step.toNumber();
      else if (typeof step !== 'number')
        throw new TypeError('Parameter step must be a number');
    }

    this.start = (start != null) ? parseFloat(start) : 0;
    this.end   = (end != null)   ? parseFloat(end)   : 0;
    this.step  = (step != null)  ? parseFloat(step)  : 1;
  }

  /**
   * Attach type information
   */
  Range.prototype.type = 'Range';
  Range.prototype.isRange = true;

  /**
   * Parse a string into a range,
   * The string contains the start, optional step, and end, separated by a colon.
   * If the string does not contain a valid range, null is returned.
   * For example str='0:2:11'.
   * @memberof Range
   * @param {string} str
   * @return {Range | null} range
   */
  Range.parse = function (str) {
    if (typeof str !== 'string') {
      return null;
    }

    var args = str.split(':');
    var nums = args.map(function (arg) {
      return parseFloat(arg);
    });

    var invalid = nums.some(function (num) {
      return isNaN(num);
    });
    if (invalid) {
      return null;
    }

    switch (nums.length) {
      case 2:
        return new Range(nums[0], nums[1]);
      case 3:
        return new Range(nums[0], nums[2], nums[1]);
      default:
        return null;
    }
  };

  /**
   * Create a clone of the range
   * @return {Range} clone
   */
  Range.prototype.clone = function () {
    return new Range(this.start, this.end, this.step);
  };

  /**
   * Retrieve the size of the range.
   * Returns an array containing one number, the number of elements in the range.
   * @memberof Range
   * @returns {number[]} size
   */
  Range.prototype.size = function () {
    var len = 0,
        start = this.start,
        step = this.step,
        end = this.end,
        diff = end - start;

    if (number.sign(step) == number.sign(diff)) {
      len = Math.ceil((diff) / step);
    }
    else if (diff == 0) {
      len = 0;
    }

    if (isNaN(len)) {
      len = 0;
    }
    return [len];
  };

  /**
   * Calculate the minimum value in the range
   * @memberof Range
   * @return {number | undefined} min
   */
  Range.prototype.min = function () {
    var size = this.size()[0];

    if (size > 0) {
      if (this.step > 0) {
        // positive step
        return this.start;
      }
      else {
        // negative step
        return this.start + (size - 1) * this.step;
      }
    }
    else {
      return undefined;
    }
  };

  /**
   * Calculate the maximum value in the range
   * @memberof Range
   * @return {number | undefined} max
   */
  Range.prototype.max = function () {
    var size = this.size()[0];

    if (size > 0) {
      if (this.step > 0) {
        // positive step
        return this.start + (size - 1) * this.step;
      }
      else {
        // negative step
        return this.start;
      }
    }
    else {
      return undefined;
    }
  };


  /**
   * Execute a callback function for each value in the range.
   * @memberof Range
   * @param {function} callback   The callback method is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Range being traversed.
   */
  Range.prototype.forEach = function (callback) {
    var x = this.start;
    var step = this.step;
    var end = this.end;
    var i = 0;

    if (step > 0) {
      while (x < end) {
        callback(x, [i], this);
        x += step;
        i++;
      }
    }
    else if (step < 0) {
      while (x > end) {
        callback(x, [i], this);
        x += step;
        i++;
      }
    }
  };

  /**
   * Execute a callback function for each value in the Range, and return the
   * results as an array
   * @memberof Range
   * @param {function} callback   The callback method is invoked with three
   *                              parameters: the value of the element, the index
   *                              of the element, and the Matrix being traversed.
   * @returns {Array} array
   */
  Range.prototype.map = function (callback) {
    var array = [];
    this.forEach(function (value, index, obj) {
      array[index[0]] = callback(value, index, obj);
    });
    return array;
  };

  /**
   * Create an Array with a copy of the Ranges data
   * @memberof Range
   * @returns {Array} array
   */
  Range.prototype.toArray = function () {
    var array = [];
    this.forEach(function (value, index) {
      array[index[0]] = value;
    });
    return array;
  };

  /**
   * Get the primitive value of the Range, a one dimensional array
   * @memberof Range
   * @returns {Array} array
   */
  Range.prototype.valueOf = function () {
    // TODO: implement a caching mechanism for range.valueOf()
    return this.toArray();
  };

  /**
   * Get a string representation of the range, with optional formatting options.
   * Output is formatted as 'start:step:end', for example '2:6' or '0:0.2:11'
   * @memberof Range
   * @param {Object | number | function} [options]  Formatting options. See
   *                                                lib/utils/number:format for a
   *                                                description of the available
   *                                                options.
   * @returns {string} str
   */
  Range.prototype.format = function (options) {
    var str = number.format(this.start, options);

    if (this.step != 1) {
      str += ':' + number.format(this.step, options);
    }
    str += ':' + number.format(this.end, options);
    return str;
  };

  /**
   * Get a string representation of the range.
   * @memberof Range
   * @returns {string}
   */
  Range.prototype.toString = function () {
    return this.format();
  };

  /**
   * Get a JSON representation of the range
   * @memberof Range
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "Range", "start": 2, "end": 4, "step": 1}`
   */
  Range.prototype.toJSON = function () {
    return {
      mathjs: 'Range',
      start: this.start,
      end: this.end,
      step: this.step
    };
  };

  /**
   * Instantiate a Range from a JSON object
   * @memberof Range
   * @param {Object} json A JSON object structured as:
   *                      `{"mathjs": "Range", "start": 2, "end": 4, "step": 1}`
   * @return {Range}
   */
  Range.fromJSON = function (json) {
    return new Range(json.start, json.end, json.step);
  };

  return Range;
}

exports.name = 'Range';
exports.path = 'type';
exports.factory = factory;


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var latex = __webpack_require__(6);
var stringify = __webpack_require__(1).stringify;
var getSafeProperty = __webpack_require__(5).getSafeProperty;
var setSafeProperty = __webpack_require__(5).setSafeProperty;

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));
  var ArrayNode = load(__webpack_require__(25));
  var matrix = load(__webpack_require__(13));
  var assign = load(__webpack_require__(239));
  var access = load(__webpack_require__(22));

  var keywords = __webpack_require__(12);
  var operators = __webpack_require__(7);

  /**
   * @constructor AssignmentNode
   * @extends {Node}
   *
   * Define a symbol, like `a=3.2`, update a property like `a.b=3.2`, or
   * replace a subset of a matrix like `A[2,2]=42`.
   *
   * Syntax:
   *
   *     new AssignmentNode(symbol, value)
   *     new AssignmentNode(object, index, value)
   *
   * Usage:
   *
   *    new AssignmentNode(new SymbolNode('a'), new ConstantNode(2));                      // a=2
   *    new AssignmentNode(new SymbolNode('a'), new IndexNode('b'), new ConstantNode(2))   // a.b=2
   *    new AssignmentNode(new SymbolNode('a'), new IndexNode(1, 2), new ConstantNode(3))  // a[1,2]=3
   *
   * @param {SymbolNode | AccessorNode} object  Object on which to assign a value
   * @param {IndexNode} [index=null]            Index, property name or matrix
   *                                            index. Optional. If not provided
   *                                            and `object` is a SymbolNode,
   *                                            the property is assigned to the
   *                                            global scope.
   * @param {Node} value                        The value to be assigned
   */
  function AssignmentNode(object, index, value) {
    if (!(this instanceof AssignmentNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.object = object;
    this.index = value ? index : null;
    this.value = value ? value : index;

    // validate input
    if (!type.isSymbolNode(object) && !type.isAccessorNode(object)) {
      throw new TypeError('SymbolNode or AccessorNode expected as "object"');
    }
    if (type.isSymbolNode(object) && object.name === 'end') {
      throw new Error('Cannot assign to symbol "end"');
    }
    if (this.index && !type.isIndexNode(this.index)) { // index is optional
      throw new TypeError('IndexNode expected as "index"');
    }
    if (!type.isNode(this.value)) {
      throw new TypeError('Node expected as "value"');
    }

    // readonly property name
    Object.defineProperty(this, 'name', {
      get: function () {
        if (this.index) {
          return (this.index.isObjectProperty())
              ? this.index.getObjectProperty()
              : '';
        }
        else {
          return this.object.name || '';
        }
      }.bind(this),
      set: function () {
        throw new Error('Cannot assign a new name, name is read-only');
      }
    });
  }

  AssignmentNode.prototype = new Node();

  AssignmentNode.prototype.type = 'AssignmentNode';

  AssignmentNode.prototype.isAssignmentNode = true;

  /**
   * Compile the node to javascript code
   * @param {AssignmentNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @private
   */
  function compileAssignmentNode (node, defs, args) {
    if (!(node instanceof AssignmentNode)) {
      throw new TypeError('No valid AssignmentNode')
    }

    defs.assign = assign;
    defs.access = access;
    defs.getSafeProperty = getSafeProperty;
    defs.setSafeProperty = setSafeProperty;

    var size;
    var object = compile(node.object, defs, args);
    var index = node.index ? compile(node.index, defs, args) : null;
    var value = compile(node.value, defs, args);
    var jsName = stringify(node.object.name);

    if (!node.index) {
      // apply a variable to the scope, for example `a=2`
      if (!type.isSymbolNode(node.object)) {
        throw new TypeError('SymbolNode expected as object');
      }

      return 'setSafeProperty(scope, ' + jsName + ', ' + value + ')';
    }
    else if (node.index.isObjectProperty()) {
      // apply an object property for example `a.b=2`
      var jsProp = stringify(node.index.getObjectProperty());
      return 'setSafeProperty(' + object + ', ' + jsProp + ', ' + value + ')';
    }
    else if (type.isSymbolNode(node.object)) {
      // update a matrix subset, for example `a[2]=3`
      size = node.index.needsSize() ? 'var size = math.size(object).valueOf();' : '';

      // apply updated object to scope
      return '(function () {' +
          '  var object = ' + object + ';' +
          '  var value = ' + value + ';' +
          '  ' + size +
          '  setSafeProperty(scope, ' + jsName + ', assign(object, ' + index + ', value));' +
          '  return value;' +
          '})()';
    }
    else { // type.isAccessorNode(node.object) === true
      // update a matrix subset, for example `a.b[2]=3`
      size = node.index.needsSize() ? 'var size = math.size(object).valueOf();' : '';

      // we will not use the compile function of the AccessorNode, but compile it
      // ourselves here as we need the parent object of the AccessorNode:
      // wee need to apply the updated object to parent object
      var parentObject = compile(node.object.object, defs, args);

      if (node.object.index.isObjectProperty()) {
        var jsParentProperty = stringify(node.object.index.getObjectProperty());
        return '(function () {' +
            '  var parent = ' + parentObject + ';' +
            '  var object = getSafeProperty(parent, ' + jsParentProperty + ');' + // parentIndex is a property
            '  var value = ' + value + ';' +
            size +
            '  setSafeProperty(parent, ' + jsParentProperty + ', assign(object, ' + index + ', value));' +
            '  return value;' +
            '})()';
      }
      else {
        // if some parameters use the 'end' parameter, we need to calculate the size
        var parentSize = node.object.index.needsSize() ? 'var size = math.size(parent).valueOf();' : '';
        var parentIndex = compile(node.object.index, defs, args);

        return '(function () {' +
            '  var parent = ' + parentObject + ';' +
            '  ' + parentSize +
            '  var parentIndex = ' + parentIndex + ';' +
            '  var object = access(parent, parentIndex);' +
            '  var value = ' + value + ';' +
            '  ' + size +
            '  assign(parent, parentIndex, assign(object, ' + index + ', value));' +
            '  return value;' +
            '})()';
      }
    }
  }

  // register the compile function
  register(AssignmentNode.prototype.type, compileAssignmentNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  AssignmentNode.prototype.forEach = function (callback) {
    callback(this.object, 'object', this);
    if (this.index) {
      callback(this.index, 'index', this);
    }
    callback(this.value, 'value', this);
  };

  /**
   * Create a new AssignmentNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {AssignmentNode} Returns a transformed copy of the node
   */
  AssignmentNode.prototype.map = function (callback) {
    var object = this._ifNode(callback(this.object, 'object', this));
    var index = this.index
        ? this._ifNode(callback(this.index, 'index', this))
        : null;
    var value = this._ifNode(callback(this.value, 'value', this));

    return new AssignmentNode(object, index, value);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {AssignmentNode}
   */
  AssignmentNode.prototype.clone = function() {
    return new AssignmentNode(this.object, this.index, this.value);
  };

  /*
   * Is parenthesis needed?
   * @param {node} node
   * @param {string} [parenthesis='keep']
   * @private
   */
  function needParenthesis(node, parenthesis) {
    if (!parenthesis) {
      parenthesis = 'keep';
    }

    var precedence = operators.getPrecedence(node, parenthesis);
    var exprPrecedence = operators.getPrecedence(node.value, parenthesis);
    return (parenthesis === 'all')
      || ((exprPrecedence !== null) && (exprPrecedence <= precedence));
  }

  /**
   * Get string representation
   * @param {Object} options
   * @return {string}
   */
  AssignmentNode.prototype._toString = function(options) {
    var object = this.object.toString(options);
    var index = this.index ? this.index.toString(options) : '';
    var value = this.value.toString(options);
    if (needParenthesis(this, options && options.parenthesis)) {
      value = '(' + value + ')';
    }

    return object + index + ' = ' + value;
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string}
   */
  AssignmentNode.prototype.toHTML = function(options) {
    var object = this.object.toHTML(options);
    var index = this.index ? this.index.toHTML(options) : '';
    var value = this.value.toHTML(options);
    if (needParenthesis(this, options && options.parenthesis)) {
      value = '<span class="math-paranthesis math-round-parenthesis">(</span>' + value + '<span class="math-paranthesis math-round-parenthesis">)</span>';
    }

    return object + index + '<span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + value;
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string}
   */
  AssignmentNode.prototype._toTex = function(options) {
    var object = this.object.toTex(options);
    var index = this.index ? this.index.toTex(options) : '';
    var value = this.value.toTex(options);
    if (needParenthesis(this, options && options.parenthesis)) {
      value = '\\left(' + value + '\\right)';
    }

    return object + index + ':=' + value;
  };

  return AssignmentNode;
}

exports.name = 'AssignmentNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var errorTransform = __webpack_require__(23).transform;
var setSafeProperty = __webpack_require__(5).setSafeProperty;

function factory (type, config, load, typed) {
  var subset = load(__webpack_require__(24));
  var matrix = load(__webpack_require__(13));

  /**
   * Replace part of an object:
   *
   * - Assign a property to an object
   * - Replace a part of a string
   * - Replace a matrix subset
   *
   * @param {Object | Array | Matrix | string} object
   * @param {Index} index
   * @param {*} value
   * @return {Object | Array | Matrix | string} Returns the original object
   *                                            except in case of a string
   */
  // TODO: change assign to return the value instead of the object
  return function assign(object, index, value) {
    try {
      if (Array.isArray(object)) {
        return matrix(object).subset(index, value).valueOf();
      }
      else if (object && typeof object.subset === 'function') { // Matrix
        return object.subset(index, value);
      }
      else if (typeof object === 'string') {
        // TODO: move setStringSubset into a separate util file, use that
        return subset(object, index, value);
      }
      else if (typeof object === 'object') {
        if (!index.isObjectProperty()) {
          throw TypeError('Cannot apply a numeric index as object property');
        }
        setSafeProperty(object, index.getObjectProperty(), value);
        return object;
      }
      else {
        throw new TypeError('Cannot apply index: unsupported type of object');
      }
    }
    catch (err) {
        throw errorTransform(err);
    }
  }
}

exports.factory = factory;


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var map = __webpack_require__(4).map;
var join = __webpack_require__(4).join;

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));
  var ResultSet = load(__webpack_require__(241));

  /**
   * @constructor BlockNode
   * @extends {Node}
   * Holds a set with blocks
   * @param {Array.<{node: Node} | {node: Node, visible: boolean}>} blocks
   *            An array with blocks, where a block is constructed as an Object
   *            with properties block, which is a Node, and visible, which is
   *            a boolean. The property visible is optional and is true by default
   */
  function BlockNode(blocks) {
    if (!(this instanceof BlockNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // validate input, copy blocks
    if (!Array.isArray(blocks)) throw new Error('Array expected');
    this.blocks = blocks.map(function (block) {
      var node = block && block.node;
      var visible = block && block.visible !== undefined ? block.visible : true;

      if (!type.isNode(node)) throw new TypeError('Property "node" must be a Node');
      if (typeof visible !== 'boolean') throw new TypeError('Property "visible" must be a boolean');

      return {
        node: node,
        visible: visible
      }
    });
  }

  BlockNode.prototype = new Node();

  BlockNode.prototype.type = 'BlockNode';

  BlockNode.prototype.isBlockNode = true;

  /**
   * Compile the node to javascript code
   * @param {BlockNode} node  The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileBlockNode (node, defs, args) {
    if (!(node instanceof BlockNode)) {
      throw new TypeError('No valid BlockNode')
    }

    defs.ResultSet = ResultSet;
    var blocks = map(node.blocks, function (param) {
      var js = compile(param.node, defs, args);
      if (param.visible) {
        return 'results.push(' + js + ');';
      }
      else {
        return js + ';';
      }
    });

    return '(function () {' +
        'var results = [];' +
        join(blocks, '') +
        'return new ResultSet(results);' +
        '})()';
  }

  // register the compile function
  register(BlockNode.prototype.type, compileBlockNode);

  /**
   * Execute a callback for each of the child blocks of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  BlockNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.blocks.length; i++) {
      callback(this.blocks[i].node, 'blocks[' + i + '].node', this);
    }
  };

  /**
   * Create a new BlockNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {BlockNode} Returns a transformed copy of the node
   */
  BlockNode.prototype.map = function (callback) {
    var blocks = [];
    for (var i = 0; i < this.blocks.length; i++) {
      var block = this.blocks[i];
      var node = this._ifNode(callback(block.node, 'blocks[' + i + '].node', this));
      blocks[i] = {
        node: node,
        visible: block.visible
      };
    }
    return new BlockNode(blocks);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {BlockNode}
   */
  BlockNode.prototype.clone = function () {
    var blocks = this.blocks.map(function (block) {
      return {
        node: block.node,
        visible: block.visible
      };
    });

    return new BlockNode(blocks);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  BlockNode.prototype._toString = function (options) {
    return this.blocks.map(function (param) {
      return param.node.toString(options) + (param.visible ? '' : ';');
    }).join('\n');
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  BlockNode.prototype.toHTML = function (options) {
    return this.blocks.map(function (param) {
      return param.node.toHTML(options) + (param.visible ? '' : '<span class="math-separator">;</span>');
    }).join('<span class="math-separator"><br /></span>');
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  BlockNode.prototype._toTex = function (options) {
    return this.blocks.map(function (param) {
      return param.node.toTex(options) + (param.visible ? '' : ';');
    }).join('\\;\\;\n');
  };

  return BlockNode;
}

exports.name = 'BlockNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function factory (type, config, load, typed) {
  /**
   * A ResultSet contains a list or results
   * @class ResultSet
   * @param {Array} entries
   * @constructor ResultSet
   */
  function ResultSet(entries) {
    if (!(this instanceof ResultSet)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.entries = entries || [];
  }

  /**
   * Attach type information
   */
  ResultSet.prototype.type = 'ResultSet';
  ResultSet.prototype.isResultSet = true;

  /**
   * Returns the array with results hold by this ResultSet
   * @memberof ResultSet
   * @returns {Array} entries
   */
  ResultSet.prototype.valueOf = function () {
    return this.entries;
  };

  /**
   * Returns the stringified results of the ResultSet
   * @memberof ResultSet
   * @returns {string} string
   */
  ResultSet.prototype.toString = function () {
    return '[' + this.entries.join(', ') + ']';
  };

  /**
   * Get a JSON representation of the ResultSet
   * @memberof ResultSet
   * @returns {Object} Returns a JSON object structured as:
   *                   `{"mathjs": "ResultSet", "entries": [...]}`
   */
  ResultSet.prototype.toJSON = function () {
    return {
      mathjs: 'ResultSet',
      entries: this.entries
    };
  };

  /**
   * Instantiate a ResultSet from a JSON object
   * @memberof ResultSet
   * @param {Object} json  A JSON object structured as:
   *                       `{"mathjs": "ResultSet", "entries": [...]}`
   * @return {ResultSet}
   */
  ResultSet.fromJSON = function (json) {
    return new ResultSet(json.entries);
  };

  return ResultSet;
}

exports.name = 'ResultSet';
exports.path = 'type';
exports.factory = factory;


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var latex = __webpack_require__(6);
var operators = __webpack_require__(7);

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * A lazy evaluating conditional operator: 'condition ? trueExpr : falseExpr'
   *
   * @param {Node} condition   Condition, must result in a boolean
   * @param {Node} trueExpr    Expression evaluated when condition is true
   * @param {Node} falseExpr   Expression evaluated when condition is true
   *
   * @constructor ConditionalNode
   * @extends {Node}
   */
  function ConditionalNode(condition, trueExpr, falseExpr) {
    if (!(this instanceof ConditionalNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }
    if (!type.isNode(condition)) throw new TypeError('Parameter condition must be a Node');
    if (!type.isNode(trueExpr))  throw new TypeError('Parameter trueExpr must be a Node');
    if (!type.isNode(falseExpr)) throw new TypeError('Parameter falseExpr must be a Node');

    this.condition = condition;
    this.trueExpr = trueExpr;
    this.falseExpr = falseExpr;
  }

  ConditionalNode.prototype = new Node();

  ConditionalNode.prototype.type = 'ConditionalNode';

  ConditionalNode.prototype.isConditionalNode = true;

  /**
   * Compile the node to javascript code
   * @param {ConditionalNode} node  The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileConditionalNode(node, defs, args) {
    if (!(node instanceof ConditionalNode)) {
      throw new TypeError('No valid ConditionalNode')
    }

    /**
     * Test whether a condition is met
     * @param {*} condition
     * @returns {boolean} true if condition is true or non-zero, else false
     */
    defs.testCondition = function (condition) {
      if (typeof condition === 'number'
          || typeof condition === 'boolean'
          || typeof condition === 'string') {
        return condition ? true : false;
      }

      if (condition) {
        if (type.isBigNumber(condition)) {
          return condition.isZero() ? false : true;
        }

        if (type.isComplex(condition)) {
          return (condition.re || condition.im) ? true : false;
        }

        if (type.isUnit(condition)) {
          return condition.value ? true : false;
        }
      }

      if (condition === null || condition === undefined) {
        return false;
      }

      throw new TypeError('Unsupported type of condition "' + defs.math['typeof'](condition) + '"');
    };

    return (
      'testCondition(' + compile(node.condition, defs, args) + ') ? ' +
      '( ' + compile(node.trueExpr, defs, args) + ') : ' +
      '( ' + compile(node.falseExpr, defs, args) + ')'
    );
  }

  // register the compile function
  register(ConditionalNode.prototype.type, compileConditionalNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  ConditionalNode.prototype.forEach = function (callback) {
    callback(this.condition, 'condition', this);
    callback(this.trueExpr, 'trueExpr', this);
    callback(this.falseExpr, 'falseExpr', this);
  };

  /**
   * Create a new ConditionalNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {ConditionalNode} Returns a transformed copy of the node
   */
  ConditionalNode.prototype.map = function (callback) {
    return new ConditionalNode(
        this._ifNode(callback(this.condition, 'condition', this)),
        this._ifNode(callback(this.trueExpr, 'trueExpr', this)),
        this._ifNode(callback(this.falseExpr, 'falseExpr', this))
    );
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {ConditionalNode}
   */
  ConditionalNode.prototype.clone = function () {
    return new ConditionalNode(this.condition, this.trueExpr, this.falseExpr);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */
  ConditionalNode.prototype._toString = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(this, parenthesis);

    //Enclose Arguments in parentheses if they are an OperatorNode
    //or have lower or equal precedence
    //NOTE: enclosing all OperatorNodes in parentheses is a decision
    //purely based on aesthetics and readability
    var condition = this.condition.toString(options);
    var conditionPrecedence = operators.getPrecedence(this.condition, parenthesis);
    if ((parenthesis === 'all')
        || (this.condition.type === 'OperatorNode')
        || ((conditionPrecedence !== null) && (conditionPrecedence <= precedence))) {
      condition = '(' + condition + ')';
    }

    var trueExpr = this.trueExpr.toString(options);
    var truePrecedence = operators.getPrecedence(this.trueExpr, parenthesis);
    if ((parenthesis === 'all')
        || (this.trueExpr.type === 'OperatorNode')
        || ((truePrecedence !== null) && (truePrecedence <= precedence))) {
      trueExpr = '(' + trueExpr + ')';
    }

    var falseExpr = this.falseExpr.toString(options);
    var falsePrecedence = operators.getPrecedence(this.falseExpr, parenthesis);
    if ((parenthesis === 'all')
        || (this.falseExpr.type === 'OperatorNode')
        || ((falsePrecedence !== null) && (falsePrecedence <= precedence))) {
      falseExpr = '(' + falseExpr + ')';
    }
    return condition + ' ? ' + trueExpr + ' : ' + falseExpr;
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */
  ConditionalNode.prototype.toHTML = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var precedence = operators.getPrecedence(this, parenthesis);

    //Enclose Arguments in parentheses if they are an OperatorNode
    //or have lower or equal precedence
    //NOTE: enclosing all OperatorNodes in parentheses is a decision
    //purely based on aesthetics and readability
    var condition = this.condition.toHTML(options);
    var conditionPrecedence = operators.getPrecedence(this.condition, parenthesis);
    if ((parenthesis === 'all')
        || (this.condition.type === 'OperatorNode')
        || ((conditionPrecedence !== null) && (conditionPrecedence <= precedence))) {
      condition = '<span class="math-parenthesis math-round-parenthesis">(</span>' + condition + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    var trueExpr = this.trueExpr.toHTML(options);
    var truePrecedence = operators.getPrecedence(this.trueExpr, parenthesis);
    if ((parenthesis === 'all')
        || (this.trueExpr.type === 'OperatorNode')
        || ((truePrecedence !== null) && (truePrecedence <= precedence))) {
      trueExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + trueExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    var falseExpr = this.falseExpr.toHTML(options);
    var falsePrecedence = operators.getPrecedence(this.falseExpr, parenthesis);
    if ((parenthesis === 'all')
        || (this.falseExpr.type === 'OperatorNode')
        || ((falsePrecedence !== null) && (falsePrecedence <= precedence))) {
      falseExpr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + falseExpr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    return condition + '<span class="math-operator math-conditional-operator">?</span>' + trueExpr + '<span class="math-operator math-conditional-operator">:</span>' + falseExpr;
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  ConditionalNode.prototype._toTex = function (options) {
    return '\\begin{cases} {'
        + this.trueExpr.toTex(options) + '}, &\\quad{\\text{if }\\;'
        + this.condition.toTex(options)
        + '}\\\\{' + this.falseExpr.toTex(options)
        + '}, &\\quad{\\text{otherwise}}\\end{cases}';
  };

  return ConditionalNode;
}

exports.name = 'ConditionalNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keywords = __webpack_require__(12);
var stringify = __webpack_require__(1).stringify;
var escape = __webpack_require__(1).escape;
var map = __webpack_require__(4).map;
var join = __webpack_require__(4).join;
var latex = __webpack_require__(6);
var operators = __webpack_require__(7);
var setSafeProperty = __webpack_require__(5).setSafeProperty;
var getUniqueArgumentName = __webpack_require__(27);

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * @constructor FunctionAssignmentNode
   * @extends {Node}
   * Function assignment
   *
   * @param {string} name           Function name
   * @param {string[] | Array.<{name: string, type: string}>} params
   *                                Array with function parameter names, or an
   *                                array with objects containing the name
   *                                and type of the parameter
   * @param {Node} expr             The function expression
   */
  function FunctionAssignmentNode(name, params, expr) {
    if (!(this instanceof FunctionAssignmentNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // validate input
    if (typeof name !== 'string') throw new TypeError('String expected for parameter "name"');
    if (!Array.isArray(params))  throw new TypeError('Array containing strings or objects expected for parameter "params"');
    if (!type.isNode(expr)) throw new TypeError('Node expected for parameter "expr"');
    if (name in keywords) throw new Error('Illegal function name, "' + name + '" is a reserved keyword');

    this.name = name;
    this.params = params.map(function (param) {
      return param && param.name || param;
    });
    this.types = params.map(function (param) {
      return param && param.type || 'any'
    });
    this.expr = expr;
  }

  FunctionAssignmentNode.prototype = new Node();

  FunctionAssignmentNode.prototype.type = 'FunctionAssignmentNode';

  FunctionAssignmentNode.prototype.isFunctionAssignmentNode = true;

  /**
   * Compile the node to javascript code
   * @param {FunctionAssignmentNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileFunctionAssignmentNode(node, defs, args) {
    if (!(node instanceof FunctionAssignmentNode)) {
      throw new TypeError('No valid FunctionAssignmentNode')
    }

    defs.typed = typed;
    defs.setSafeProperty = setSafeProperty;

    // validate params
    // FIXME: rename parameters to safe, internal names

    // we extend the original args and add the args to the child object
    // and create a mapping from the unsafe param name to a safe, internal one
    var childArgs = Object.create(args);
    var jsParams = map(node.params, function (param) {
      childArgs[param] = getUniqueArgumentName(childArgs);
      return childArgs[param];
    });

    // compile the function expression with the child args
    var jsExpr = compile(node.expr, defs, childArgs);
    var jsName = stringify(node.name);

    return 'setSafeProperty(scope, ' + jsName + ', ' +
        '  (function () {' +
        '    var fn = typed(' + jsName + ', {' +
        '      ' + stringify(join(node.types, ',')) + ': function (' + join(jsParams, ',') + ') {' +
        '        return ' + jsExpr + '' +
        '      }' +
        '    });' +
        '    fn.syntax = ' + stringify(node.name + '(' + join(node.params, ', ') + ')') + ';' +
        '    return fn;' +
        '  })())';
  }

  // register the compile function
  register(FunctionAssignmentNode.prototype.type, compileFunctionAssignmentNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  FunctionAssignmentNode.prototype.forEach = function (callback) {
    callback(this.expr, 'expr', this);
  };

  /**
   * Create a new FunctionAssignmentNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {FunctionAssignmentNode} Returns a transformed copy of the node
   */
  FunctionAssignmentNode.prototype.map = function (callback) {
    var expr = this._ifNode(callback(this.expr, 'expr', this));

    return new FunctionAssignmentNode(this.name, this.params.slice(0), expr);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {FunctionAssignmentNode}
   */
  FunctionAssignmentNode.prototype.clone = function () {
    return new FunctionAssignmentNode(this.name, this.params.slice(0), this.expr);
  };

  /**
   * Is parenthesis needed?
   * @param {Node} node
   * @param {Object} parenthesis
   * @private
   */
  function needParenthesis(node, parenthesis) {
    var precedence = operators.getPrecedence(node, parenthesis);
    var exprPrecedence = operators.getPrecedence(node.expr, parenthesis);

    return (parenthesis === 'all')
      || ((exprPrecedence !== null) && (exprPrecedence <= precedence));
  }

  /**
   * get string representation
   * @param {Object} options
   * @return {string} str
   */
  FunctionAssignmentNode.prototype._toString = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var expr = this.expr.toString(options);
    if (needParenthesis(this, parenthesis)) {
      expr = '(' + expr + ')';
    }
    return this.name + '(' + this.params.join(', ') + ') = ' + expr;
  };

  /**
   * get HTML representation
   * @param {Object} options
   * @return {string} str
   */
   FunctionAssignmentNode.prototype.toHTML = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
	var params = [];
	for (var i=0; i<this.params.length; i++)	{
	  params.push('<span class="math-symbol math-parameter">' + escape(this.params[i]) + '</span>');
	}
    var expr = this.expr.toHTML(options);
    if (needParenthesis(this, parenthesis)) {
      expr = '<span class="math-parenthesis math-round-parenthesis">(</span>' + expr + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    return '<span class="math-function">' + escape(this.name) + '</span>' + '<span class="math-parenthesis math-round-parenthesis">(</span>' + params.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-round-parenthesis">)</span><span class="math-operator math-assignment-operator math-variable-assignment-operator math-binary-operator">=</span>' + expr;
  };

  /**
   * get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  FunctionAssignmentNode.prototype._toTex = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var expr = this.expr.toTex(options);
    if (needParenthesis(this, parenthesis)) {
      expr = '\\left(' + expr + '\\right)';
    }

    return '\\mathrm{' + this.name
        + '}\\left(' + this.params.map(latex.toSymbol).join(',') + '\\right):=' + expr;
  };

  return FunctionAssignmentNode;
}
exports.name = 'FunctionAssignmentNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(1).stringify;
var escape = __webpack_require__(1).escape;
var isSafeProperty = __webpack_require__(5).isSafeProperty;
var hasOwnProperty = __webpack_require__(2).hasOwnProperty;

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * @constructor ObjectNode
   * @extends {Node}
   * Holds an object with keys/values
   * @param {Object.<string, Node>} [properties]   array with key/value pairs
   */
  function ObjectNode(properties) {
    if (!(this instanceof ObjectNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    this.properties = properties || {};

    // validate input
    if (properties) {
      if (!(typeof properties === 'object') || !Object.keys(properties).every(function (key) {
            return type.isNode(properties[key]);
          })) {
        throw new TypeError('Object containing Nodes expected');
      }
    }
  }

  ObjectNode.prototype = new Node();

  ObjectNode.prototype.type = 'ObjectNode';

  ObjectNode.prototype.isObjectNode = true;

  /**
   * Compile the node to javascript code
   * @param {ObjectNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} code
   * @private
   */
  function compileObjectNode(node, defs, args) {
    if (!(node instanceof ObjectNode)) {
      throw new TypeError('No valid ObjectNode')
    }

    var entries = [];
    for (var key in node.properties) {
      if (hasOwnProperty(node.properties, key)) {
        // we stringify/parse the key here to resolve unicode characters,
        // so you cannot create a key like {"co\\u006Estructor": null} 
        var stringifiedKey = stringify(key)
        var parsedKey = JSON.parse(stringifiedKey)
        if (!isSafeProperty(node.properties, parsedKey)) {
          throw new Error('No access to property "' + parsedKey + '"');
        }

        entries.push(stringifiedKey + ': ' + compile(node.properties[key], defs, args));
      }
    }
    return '{' + entries.join(', ') + '}';
  }

  // register the compile function
  register(ObjectNode.prototype.type, compileObjectNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  ObjectNode.prototype.forEach = function (callback) {
    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        callback(this.properties[key], 'properties[' + stringify(key) + ']', this);
      }
    }
  };

  /**
   * Create a new ObjectNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {ObjectNode} Returns a transformed copy of the node
   */
  ObjectNode.prototype.map = function (callback) {
    var properties = {};
    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        properties[key] = this._ifNode(callback(this.properties[key],
            'properties[' + stringify(key) + ']', this));
      }
    }
    return new ObjectNode(properties);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {ObjectNode}
   */
  ObjectNode.prototype.clone = function() {
    var properties = {};
    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        properties[key] = this.properties[key];
      }
    }
    return new ObjectNode(properties);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  ObjectNode.prototype._toString = function(options) {
    var entries = [];
    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        entries.push(stringify(key) + ': ' + this.properties[key].toString(options));
      }
    }
    return '{' + entries.join(', ') + '}';
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  ObjectNode.prototype.toHTML = function(options) {
    var entries = [];
    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        entries.push('<span class="math-symbol math-property">' + escape(key) + '</span>' + '<span class="math-operator math-assignment-operator math-property-assignment-operator math-binary-operator">:</span>' + this.properties[key].toHTML(options));
      }
    }
    return '<span class="math-parenthesis math-curly-parenthesis">{</span>' + entries.join('<span class="math-separator">,</span>') + '<span class="math-parenthesis math-curly-parenthesis">}</span>';
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  ObjectNode.prototype._toTex = function(options) {
    var entries = [];
    for (var key in this.properties) {
      if (this.properties.hasOwnProperty(key)) {
        entries.push("\\mathbf{" + key + ':} & ' + this.properties[key].toTex(options) + "\\\\");
      }
    }
    return '\\left\\{\\begin{array}{ll}' + entries.join('\n') + '\\end{array}\\right\\}';
  };

  return ObjectNode;
}

exports.name = 'ObjectNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var latex = __webpack_require__(6);
var map = __webpack_require__(4).map;
var join = __webpack_require__(4).join;
var stringify = __webpack_require__(1).stringify;
var escape = __webpack_require__(1).escape;
var isSafeMethod = __webpack_require__(5).isSafeMethod;
var operators = __webpack_require__(7);

function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node         = load(__webpack_require__(3));
  var ConstantNode = load(__webpack_require__(26));
  var SymbolNode   = load(__webpack_require__(9));
  var FunctionNode = load(__webpack_require__(28));

  /**
   * @constructor OperatorNode
   * @extends {Node}
   * An operator with two arguments, like 2+3
   *
   * @param {string} op           Operator name, for example '+'
   * @param {string} fn           Function name, for example 'add'
   * @param {Node[]} args         Operator arguments
   * @param {boolean} [implicit]  Is this an implicit multiplication?
   */
  function OperatorNode(op, fn, args, implicit) {
    if (!(this instanceof OperatorNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    //validate input
    if (typeof op !== 'string') {
      throw new TypeError('string expected for parameter "op"');
    }
    if (typeof fn !== 'string') {
      throw new TypeError('string expected for parameter "fn"');
    }
    if (!Array.isArray(args) || !args.every(type.isNode)) {
      throw new TypeError('Array containing Nodes expected for parameter "args"');
    }

    this.implicit = (implicit === true);
    this.op = op;
    this.fn = fn;
    this.args = args || [];
  }

  OperatorNode.prototype = new Node();

  OperatorNode.prototype.type = 'OperatorNode';

  OperatorNode.prototype.isOperatorNode = true;

  /**
   * Compile the node to javascript code
   * @param {OperatorNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileOperatorNode(node, defs, args) {
    if (!(node instanceof OperatorNode)) {
      throw new TypeError('No valid OperatorNode')
    }

    // validate fn
    if (typeof node.fn !== 'string' || !isSafeMethod(defs.math, node.fn)) {
      if (!defs.math[node.fn]) {
        throw new Error('Function ' + node.fn + ' missing in provided namespace "math"');
      }
      else {
        throw new Error('No access to function "' + node.fn + '"');
      }
    }

    var jsArgs = map(node.args, function (arg) {
      return compile(arg, defs, args);
    });

    return 'math[' + stringify(node.fn) + '](' + join(jsArgs, ', ') + ')';
  }

  // register the compile function
  register(OperatorNode.prototype.type, compileOperatorNode);

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  OperatorNode.prototype.forEach = function (callback) {
    for (var i = 0; i < this.args.length; i++) {
      callback(this.args[i], 'args[' + i + ']', this);
    }
  };

  /**
   * Create a new OperatorNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {OperatorNode} Returns a transformed copy of the node
   */
  OperatorNode.prototype.map = function (callback) {
    var args = [];
    for (var i = 0; i < this.args.length; i++) {
      args[i] = this._ifNode(callback(this.args[i], 'args[' + i + ']', this));
    }
    return new OperatorNode(this.op, this.fn, args);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {OperatorNode}
   */
  OperatorNode.prototype.clone = function () {
    return new OperatorNode(this.op, this.fn, this.args.slice(0), this.implicit);
  };

  /**
   * Calculate which parentheses are necessary. Gets an OperatorNode
   * (which is the root of the tree) and an Array of Nodes
   * (this.args) and returns an array where 'true' means that an argument
   * has to be enclosed in parentheses whereas 'false' means the opposite.
   *
   * @param {OperatorNode} root
   * @param {string} parenthesis
   * @param {Node[]} args
   * @param {boolean} latex
   * @return {boolean[]}
   * @private
   */
  function calculateNecessaryParentheses(root, parenthesis, implicit, args, latex) {
    //precedence of the root OperatorNode
    var precedence = operators.getPrecedence(root, parenthesis);
    var associativity = operators.getAssociativity(root, parenthesis);

    if ((parenthesis === 'all') || ((args.length > 2) && (root.getIdentifier() !== 'OperatorNode:add') && (root.getIdentifier() !== 'OperatorNode:multiply'))) {
      var parens = args.map(function (arg) {
        switch (arg.getContent().type) { //Nodes that don't need extra parentheses
          case 'ArrayNode':
          case 'ConstantNode':
          case 'SymbolNode':
          case 'ParenthesisNode':
            return false;
            break;
          default:
            return true;
        }
      });
      return parens;
    }

    var result = undefined;
    switch (args.length) {
      case 0:
        result = [];
        break;

      case 1: //unary operators
        //precedence of the operand
        var operandPrecedence = operators.getPrecedence(args[0], parenthesis);

        //handle special cases for LaTeX, where some of the parentheses aren't needed
        if (latex && (operandPrecedence !== null)) {
          var operandIdentifier;
          var rootIdentifier;
          if (parenthesis === 'keep') {
            operandIdentifier = args[0].getIdentifier();
            rootIdentifier = root.getIdentifier();
          }
          else {
            //Ignore Parenthesis Nodes when not in 'keep' mode
            operandIdentifier = args[0].getContent().getIdentifier();
            rootIdentifier = root.getContent().getIdentifier();
          }
          if (operators.properties[precedence][rootIdentifier].latexLeftParens === false) {
            result = [false];
            break;
          }

          if (operators.properties[operandPrecedence][operandIdentifier].latexParens === false) {
            result = [false];
            break;
          }
        }

        if (operandPrecedence === null) {
          //if the operand has no defined precedence, no parens are needed
          result = [false];
          break;
        }

        if (operandPrecedence <= precedence) {
          //if the operands precedence is lower, parens are needed
          result = [true];
          break;
        }

        //otherwise, no parens needed
        result = [false];
        break;

      case 2: //binary operators
        var lhsParens; //left hand side needs parenthesis?
        //precedence of the left hand side
        var lhsPrecedence = operators.getPrecedence(args[0], parenthesis);
        //is the root node associative with the left hand side
        var assocWithLhs = operators.isAssociativeWith(root, args[0], parenthesis);

        if (lhsPrecedence === null) {
          //if the left hand side has no defined precedence, no parens are needed
          //FunctionNode for example
          lhsParens = false;
        }
        else if ((lhsPrecedence === precedence) && (associativity === 'right') && !assocWithLhs) {
          //In case of equal precedence, if the root node is left associative
          // parens are **never** necessary for the left hand side.
          //If it is right associative however, parens are necessary
          //if the root node isn't associative with the left hand side
          lhsParens = true;
        }
        else if (lhsPrecedence < precedence) {
          lhsParens = true;
        }
        else {
          lhsParens = false;
        }

        var rhsParens; //right hand side needs parenthesis?
        //precedence of the right hand side
        var rhsPrecedence = operators.getPrecedence(args[1], parenthesis);
        //is the root node associative with the right hand side?
        var assocWithRhs = operators.isAssociativeWith(root, args[1], parenthesis);

        if (rhsPrecedence === null) {
          //if the right hand side has no defined precedence, no parens are needed
          //FunctionNode for example
          rhsParens = false;
        }
        else if ((rhsPrecedence === precedence) && (associativity === 'left') && !assocWithRhs) {
          //In case of equal precedence, if the root node is right associative
          // parens are **never** necessary for the right hand side.
          //If it is left associative however, parens are necessary
          //if the root node isn't associative with the right hand side
          rhsParens = true;
        }
        else if (rhsPrecedence < precedence) {
          rhsParens = true;
        }
        else {
          rhsParens = false;
        }

        //handle special cases for LaTeX, where some of the parentheses aren't needed
        if (latex) {
          var rootIdentifier;
          var lhsIdentifier;
          var rhsIdentifier;
          if (parenthesis === 'keep') {
            rootIdentifier = root.getIdentifier();
            lhsIdentifier = root.args[0].getIdentifier();
            rhsIdentifier = root.args[1].getIdentifier();
          }
          else {
            //Ignore ParenthesisNodes when not in 'keep' mode
            rootIdentifier = root.getContent().getIdentifier();
            lhsIdentifier = root.args[0].getContent().getIdentifier();
            rhsIdentifier = root.args[1].getContent().getIdentifier();
          }

          if (lhsPrecedence !== null) {
            if (operators.properties[precedence][rootIdentifier].latexLeftParens === false) {
              lhsParens = false;
            }

            if (operators.properties[lhsPrecedence][lhsIdentifier].latexParens === false) {
              lhsParens = false;
            }
          }

          if (rhsPrecedence !== null) {
            if (operators.properties[precedence][rootIdentifier].latexRightParens === false) {
              rhsParens = false;
            }

            if (operators.properties[rhsPrecedence][rhsIdentifier].latexParens === false) {
              rhsParens = false;
            }
          }
        }

        result = [lhsParens, rhsParens];
        break;

      default:
        if ((root.getIdentifier() === 'OperatorNode:add') || (root.getIdentifier() === 'OperatorNode:multiply')) {
          var result = args.map(function (arg) {
            var argPrecedence = operators.getPrecedence(arg, parenthesis);
            var assocWithArg = operators.isAssociativeWith(root, arg, parenthesis);
            var argAssociativity = operators.getAssociativity(arg, parenthesis);
            if (argPrecedence === null) {
              //if the argument has no defined precedence, no parens are needed
              return false;
            } else if ((precedence === argPrecedence) && (associativity === argAssociativity) && !assocWithArg) {
              return true;
            } else if (argPrecedence < precedence) {
              return true;
            }

            return false;
          });
        }
        break;
    }

    //handles an edge case of 'auto' parentheses with implicit multiplication of ConstantNode
    //In that case print parentheses for ParenthesisNodes even though they normally wouldn't be
    //printed.
    if ((args.length >= 2) && (root.getIdentifier() === 'OperatorNode:multiply') && root.implicit && (parenthesis === 'auto') && (implicit === 'hide')) {
      result = args.map(function (arg, index) {
        var isParenthesisNode = (arg.getIdentifier() === 'ParenthesisNode');
        if (result[index] || isParenthesisNode) { //put in parenthesis?
          return true;
        }

        return false;
      });
    }

    return result;
  }

  /**
   * Get string representation.
   * @param {Object} options
   * @return {string} str
   */
  OperatorNode.prototype._toString = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var implicit = (options && options.implicit) ? options.implicit : 'hide';
    var args = this.args;
    var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, false);

    if (args.length === 1) { //unary operators
      var assoc = operators.getAssociativity(this, parenthesis);

      var operand = args[0].toString(options);
      if (parens[0]) {
        operand = '(' + operand + ')';
      }

      if (assoc === 'right') { //prefix operator
        return this.op + operand;
      }
      else if (assoc === 'left') { //postfix
        return operand + this.op;
      }

      //fall back to postfix
      return operand + this.op;
    } else if (args.length == 2) {
      var lhs = args[0].toString(options); //left hand side
      var rhs = args[1].toString(options); //right hand side
      if (parens[0]) { //left hand side in parenthesis?
        lhs = '(' + lhs + ')';
      }
      if (parens[1]) { //right hand side in parenthesis?
        rhs = '(' + rhs + ')';
      }

      if (this.implicit && (this.getIdentifier() === 'OperatorNode:multiply') && (implicit == 'hide')) {
        return lhs + ' ' + rhs;
      }

      return lhs + ' ' + this.op + ' ' + rhs;
    } else if ((args.length > 2) && ((this.getIdentifier() === 'OperatorNode:add') || (this.getIdentifier() === 'OperatorNode:multiply'))) {
      var stringifiedArgs = args.map(function (arg, index) {
        arg = arg.toString(options);
        if (parens[index]) { //put in parenthesis?
          arg = '(' + arg + ')';
        }

        return arg;
      });

      if (this.implicit && (this.getIdentifier() === 'OperatorNode:multiply') && (implicit === 'hide')) {
        return stringifiedArgs.join(' ');
      }

      return stringifiedArgs.join(' ' + this.op + ' ');
    } else {
      //fallback to formatting as a function call
      return this.fn + '(' + this.args.join(', ') + ')';
    }
  };

  /**
   * Get HTML representation.
   * @param {Object} options
   * @return {string} str
   */
  OperatorNode.prototype.toHTML = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var implicit = (options && options.implicit) ? options.implicit : 'hide';
    var args = this.args;
    var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, false);

    if (args.length === 1) { //unary operators
      var assoc = operators.getAssociativity(this, parenthesis);

      var operand = args[0].toHTML(options);
      if (parens[0]) {
        operand = '<span class="math-parenthesis math-round-parenthesis">(</span>' + operand + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }

      if (assoc === 'right') { //prefix operator
        return '<span class="math-operator math-unary-operator math-lefthand-unary-operator">' + escape(this.op) + '</span>' + operand;
      }
      else if (assoc === 'left') { //postfix
        return '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + escape(this.op) + '</span>' + operand;
      }

      //fall back to postfix
      return '<span class="math-operator math-unary-operator math-righthand-unary-operator">' + escape(this.op) + '</span>' + operand;
    }
	else if (args.length == 2) { // binary operatoes
      var lhs = args[0].toHTML(options); //left hand side
      var rhs = args[1].toHTML(options); //right hand side
      if (parens[0]) { //left hand side in parenthesis?
        lhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + lhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
      if (parens[1]) { //right hand side in parenthesis?
        rhs = '<span class="math-parenthesis math-round-parenthesis">(</span>' + rhs + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }
	  
	  if (this.implicit && (this.getIdentifier() === 'OperatorNode:multiply') && (implicit == 'hide')) {
	    return lhs + '<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>' + rhs;
	  }
      
	  return lhs + '<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape(this.op) + '</span>' + rhs;
    }
	else if ((args.length > 2) && ((this.getIdentifier() === 'OperatorNode:add') || (this.getIdentifier() === 'OperatorNode:multiply'))) {
      var stringifiedArgs = args.map(function (arg, index) {
        arg = arg.toHTML(options);
        if (parens[index]) { //put in parenthesis?
          arg = '<span class="math-parenthesis math-round-parenthesis">(</span>' + arg + '<span class="math-parenthesis math-round-parenthesis">)</span>';
        }

        return arg;
      });

      if (this.implicit && (this.getIdentifier() === 'OperatorNode:multiply') && (implicit === 'hide')) {
        return stringifiedArgs.join('<span class="math-operator math-binary-operator math-implicit-binary-operator"></span>');
      }

      return stringifiedArgs.join('<span class="math-operator math-binary-operator math-explicit-binary-operator">' + escape(this.op) + '</span>');
    } else {
      //fallback to formatting as a function call
      return '<span class="math-function">' + escape(this.fn) + '</span><span class="math-paranthesis math-round-parenthesis">(</span>' + stringifiedArgs.join('<span class="math-separator">,</span>') + '<span class="math-paranthesis math-round-parenthesis">)</span>';
    }
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   */
  OperatorNode.prototype._toTex = function (options) {
    var parenthesis = (options && options.parenthesis) ? options.parenthesis : 'keep';
    var implicit = (options && options.implicit) ? options.implicit : 'hide';
    var args = this.args;
    var parens = calculateNecessaryParentheses(this, parenthesis, implicit, args, true);
    var op = latex.operators[this.fn];
    op = typeof op === 'undefined' ? this.op : op; //fall back to using this.op

    if (args.length === 1) { //unary operators
      var assoc = operators.getAssociativity(this, parenthesis);

      var operand = args[0].toTex(options);
      if (parens[0]) {
        operand = '\\left(' + operand + '\\right)';
      }

      if (assoc === 'right') { //prefix operator
        return op + operand;
      }
      else if (assoc === 'left') { //postfix operator
        return operand + op;
      }

      //fall back to postfix
      return operand + op;
    } else if (args.length === 2) { //binary operators
      var lhs = args[0]; //left hand side
      var lhsTex = lhs.toTex(options);
      if (parens[0]) {
        lhsTex = '\\left(' + lhsTex + '\\right)';
      }

      var rhs = args[1]; //right hand side
      var rhsTex = rhs.toTex(options);
      if (parens[1]) {
        rhsTex = '\\left(' + rhsTex + '\\right)';
      }

      //handle some exceptions (due to the way LaTeX works)
      var lhsIdentifier;
      if (parenthesis === 'keep') {
        lhsIdentifier = lhs.getIdentifier();
      }
      else {
        //Ignore ParenthesisNodes if in 'keep' mode
        lhsIdentifier = lhs.getContent().getIdentifier();
      }
      switch (this.getIdentifier()) {
        case 'OperatorNode:divide':
          //op contains '\\frac' at this point
          return op + '{' + lhsTex + '}' + '{' + rhsTex + '}';
        case 'OperatorNode:pow':
          lhsTex = '{' + lhsTex + '}';
          rhsTex = '{' + rhsTex + '}';
          switch (lhsIdentifier) {
            case 'ConditionalNode': //
            case 'OperatorNode:divide':
              lhsTex = '\\left(' + lhsTex + '\\right)';
          }
        case 'OperatorNode:multiply':
          if (this.implicit && (implicit === 'hide')) {
            return lhsTex + '~' + rhsTex;
          }
      }
      return lhsTex + op + rhsTex;
    } else if ((args.length > 2) && ((this.getIdentifier() === 'OperatorNode:add') || (this.getIdentifier() === 'OperatorNode:multiply'))) {
      var texifiedArgs = args.map(function (arg, index) {
        arg = arg.toTex(options);
        if (parens[index]) {
          arg = '\\left(' + arg + '\\right)';
        }
        return arg;
      });

      if ((this.getIdentifier() === 'OperatorNode:multiply') && this.implicit) {
        return texifiedArgs.join('~');
      }

      return texifiedArgs.join(op)
    } else {
      //fall back to formatting as a function call
      //as this is a fallback, it doesn't use
      //fancy function names
      return '\\mathrm{' + this.fn + '}\\left('
          + args.map(function (arg) {
            return arg.toTex(options);
          }).join(',') + '\\right)';
    }
  };

  /**
   * Get identifier.
   * @return {string}
   */
  OperatorNode.prototype.getIdentifier = function () {
    return this.type + ':' + this.fn;
  };

  return OperatorNode;
}

exports.name = 'OperatorNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function factory (type, config, load, typed) {
  var register = load(__webpack_require__(0)).register;
  var compile = load(__webpack_require__(0)).compile;
  var Node = load(__webpack_require__(3));

  /**
   * @constructor ParenthesisNode
   * @extends {Node}
   * A parenthesis node describes manual parenthesis from the user input
   * @param {Node} content
   * @extends {Node}
   */
  function ParenthesisNode(content) {
    if (!(this instanceof ParenthesisNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    }

    // validate input
    if (!type.isNode(content)) {
      throw new TypeError('Node expected for parameter "content"');
    }

    this.content = content;
  }

  ParenthesisNode.prototype = new Node();

  ParenthesisNode.prototype.type = 'ParenthesisNode';

  ParenthesisNode.prototype.isParenthesisNode = true;

  /**
   * Compile the node to javascript code
   * @param {ParenthesisNode} node The node to be compiled
   * @param {Object} defs     Object which can be used to define functions
   *                          or constants globally available for the compiled
   *                          expression
   * @param {Object} args     Object with local function arguments, the key is
   *                          the name of the argument, and the value is `true`.
   *                          The object may not be mutated, but must be
   *                          extended instead.
   * @return {string} js
   * @private
   */
  function compileParenthesisNode(node, defs, args) {
    if (!(node instanceof ParenthesisNode)) {
      throw new TypeError('No valid ParenthesisNode')
    }

    return compile(node.content, defs, args);
  }

  // register the compile function
  register(ParenthesisNode.prototype.type, compileParenthesisNode);

  /**
   * Get the content of the current Node.
   * @return {Node} content
   * @override
   **/
  ParenthesisNode.prototype.getContent = function () {
    return this.content.getContent();
  };

  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */
  ParenthesisNode.prototype.forEach = function (callback) {
    callback(this.content, 'content', this);
  };

  /**
   * Create a new ParenthesisNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node) : Node} callback
   * @returns {ParenthesisNode} Returns a clone of the node
   */
  ParenthesisNode.prototype.map = function (callback) {
    var content = callback(this.content, 'content', this);
    return new ParenthesisNode(content);
  };

  /**
   * Create a clone of this node, a shallow copy
   * @return {ParenthesisNode}
   */
  ParenthesisNode.prototype.clone = function() {
    return new ParenthesisNode(this.content);
  };

  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  ParenthesisNode.prototype._toString = function(options) {
    if ((!options) || (options && !options.parenthesis) || (options && options.parenthesis === 'keep')) {
      return '(' + this.content.toString(options) + ')';
    }
    return this.content.toString(options);
  };

  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  ParenthesisNode.prototype.toHTML = function(options) {
    if ((!options) || (options && !options.parenthesis) || (options && options.parenthesis === 'keep')) {
      return '<span class="math-parenthesis math-round-parenthesis">(</span>' + this.content.toHTML(options) + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }
    return this.content.toHTML(options);
  };

  /**
   * Get LaTeX representation
   * @param {Object} options
   * @return {string} str
   * @override
   */
  ParenthesisNode.prototype._toTex = function(options) {
    if ((!options) || (options && !options.parenthesis) || (options && options.parenthesis === 'keep')) {
      return '\\left(' + this.content.toTex(options) + '\\right)';
    }
    return this.content.toTex(options);
  };

  return ParenthesisNode;
}

exports.name = 'ParenthesisNode';
exports.path = 'expression.node';
exports.factory = factory;


/***/ })
/******/ ]);
});
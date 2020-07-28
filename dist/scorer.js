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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scorer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scorer.js":
/*!*******************!*\
  !*** ./scorer.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*global LearnosityAmd*/\nLearnosityAmd.define([\"underscore-v1.5.2\"], function (_) {\n  \"use strict\";\n\n  function CustomShorttextScorer(question, response) {\n    this.question = question;\n    this.response = response;\n    this.validResponse = question.valid_response || {};\n  }\n\n  _.extend(CustomShorttextScorer.prototype, {\n    isValid: function isValid() {\n      return this.response === this.validResponse;\n    },\n    score: function score() {\n      return this.isValid() ? this.maxScore() : 0;\n    },\n    maxScore: function maxScore() {\n      return this.question.score != null ? this.question.score : null;\n    },\n    canValidateResponse: function canValidateResponse() {\n      return !!this.validResponse;\n    }\n  });\n\n  return {\n    Scorer: CustomShorttextScorer\n  };\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zY29yZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zY29yZXIuanM/ZmI4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbCBMZWFybm9zaXR5QW1kKi9cbkxlYXJub3NpdHlBbWQuZGVmaW5lKFtcInVuZGVyc2NvcmUtdjEuNS4yXCJdLCBmdW5jdGlvbiAoXykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBmdW5jdGlvbiBDdXN0b21TaG9ydHRleHRTY29yZXIocXVlc3Rpb24sIHJlc3BvbnNlKSB7XG4gICAgdGhpcy5xdWVzdGlvbiA9IHF1ZXN0aW9uO1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICB0aGlzLnZhbGlkUmVzcG9uc2UgPSBxdWVzdGlvbi52YWxpZF9yZXNwb25zZSB8fCB7fTtcbiAgfVxuXG4gIF8uZXh0ZW5kKEN1c3RvbVNob3J0dGV4dFNjb3Jlci5wcm90b3R5cGUsIHtcbiAgICBpc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXNwb25zZSA9PT0gdGhpcy52YWxpZFJlc3BvbnNlO1xuICAgIH0sXG5cbiAgICBzY29yZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5tYXhTY29yZSgpIDogMDtcbiAgICB9LFxuXG4gICAgbWF4U2NvcmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXN0aW9uLnNjb3JlICE9IG51bGwgPyB0aGlzLnF1ZXN0aW9uLnNjb3JlIDogbnVsbDtcbiAgICB9LFxuXG4gICAgY2FuVmFsaWRhdGVSZXNwb25zZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICEhdGhpcy52YWxpZFJlc3BvbnNlO1xuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgU2NvcmVyOiBDdXN0b21TaG9ydHRleHRTY29yZXIsXG4gIH07XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQWZBO0FBQ0E7QUFpQkE7QUFDQTtBQURBO0FBR0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./scorer.js\n");

/***/ })

/******/ });
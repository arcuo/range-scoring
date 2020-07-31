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

eval("/*global LearnosityAmd*/\nLearnosityAmd.define([\"underscore-v1.5.2\"], function (_) {\n  \"use strict\";\n\n  function CustomShorttextScorer(question, response) {\n    this.question = question;\n    this.response = parseInt(response);\n    this.max = this.question.validation.valid_response.score;\n    this.min = this.question.validation.min_score_if_attempted;\n  }\n\n  _.extend(CustomShorttextScorer.prototype, {\n    isValid: function isValid() {\n      return this.min <= this.response && this.response <= this.max;\n    },\n    score: function score() {\n      return this.isValid() ? this.response : this.min;\n    },\n    maxScore: function maxScore() {\n      return this.max;\n    },\n    canValidateResponse: function canValidateResponse() {\n      return (!!this.max || this.max === 0) && (!!this.min || this.min === 0);\n    }\n  });\n\n  return {\n    Scorer: CustomShorttextScorer\n  };\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zY29yZXIuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zY29yZXIuanM/ZmI4ZiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmdsb2JhbCBMZWFybm9zaXR5QW1kKi9cbkxlYXJub3NpdHlBbWQuZGVmaW5lKFtcInVuZGVyc2NvcmUtdjEuNS4yXCJdLCBmdW5jdGlvbiAoXykge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBmdW5jdGlvbiBDdXN0b21TaG9ydHRleHRTY29yZXIocXVlc3Rpb24sIHJlc3BvbnNlKSB7XG4gICAgdGhpcy5xdWVzdGlvbiA9IHF1ZXN0aW9uO1xuICAgIHRoaXMucmVzcG9uc2UgPSBwYXJzZUludChyZXNwb25zZSk7XG4gICAgdGhpcy5tYXggPSB0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24udmFsaWRfcmVzcG9uc2Uuc2NvcmU7XG4gICAgdGhpcy5taW4gPSB0aGlzLnF1ZXN0aW9uLnZhbGlkYXRpb24ubWluX3Njb3JlX2lmX2F0dGVtcHRlZDtcbiAgfVxuXG4gIF8uZXh0ZW5kKEN1c3RvbVNob3J0dGV4dFNjb3Jlci5wcm90b3R5cGUsIHtcbiAgICBpc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5taW4gPD0gdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlIDw9IHRoaXMubWF4O1xuICAgIH0sXG5cbiAgICBzY29yZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZCgpID8gdGhpcy5yZXNwb25zZSA6IHRoaXMubWluO1xuICAgIH0sXG5cbiAgICBtYXhTY29yZTogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMubWF4O1xuICAgIH0sXG5cbiAgICBjYW5WYWxpZGF0ZVJlc3BvbnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gKCEhdGhpcy5tYXggfHwgdGhpcy5tYXggPT09IDApICYmICghIXRoaXMubWluIHx8IHRoaXMubWluID09PSAwKTtcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIFNjb3JlcjogQ3VzdG9tU2hvcnR0ZXh0U2NvcmVyLFxuICB9O1xufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQWZBO0FBQ0E7QUFpQkE7QUFDQTtBQURBO0FBR0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./scorer.js\n");

/***/ })

/******/ });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./question.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./question.js":
/*!*********************!*\
  !*** ./question.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*global LearnosityAmd*/\nLearnosityAmd.define([\"underscore-v1.5.2\", \"jquery-v1.10.2\"], function (_, $) {\n  \"use strict\";\n\n  function CustomShorttext(init, tools) {\n    this.init = init;\n    this.tools = tools;\n    this.question = init.question;\n    this.$el = init.$el;\n    this.setup();\n    init.events.trigger(\"ready\");\n  }\n\n  _.extend(CustomShorttext.prototype, {\n    render: function render() {\n      this.$el.html('<div><div class=\"input-wrapper\"><input type=\"number\" /></div></div>').append('<div data-lrn-component=\"range_scoring_max\"/>').append('<div data-lrn-component=\"range_scoring_min\"/>');\n    },\n    setup: function setup() {\n      var init = this.init;\n      var events = init.events;\n      var facade = init.getFacade();\n      var max = this.question.range_scoring_max;\n      var min = this.question.range_scoring_min;\n      this.updatePublicMethods(facade);\n      this.render();\n      this.$response = $(\"input\", this.$el);\n      this.$response.attr(\"max\", max);\n      this.$response.attr(\"min\", min);\n\n      if (init.response) {\n        this.$response.val(init.response);\n      } // Developer is responsible to know when to clean up the validation UI as well as when to trigger the 'changed' event to update\n      // the model value\n\n\n      this.$response.on(\"focus\", function () {\n        this.clearValidationUI();\n      }.bind(this)).on(\"change\", function (event) {\n        events.trigger(\"changed\", event.currentTarget.value);\n      }); // \"validate\" event can be triggered when Check Answer button is clicked or when public method .validate() is called\n      // so developer needs to listen to this event to decide if he wants to display the correct answers to user or not\n      // options.showCorrectAnswers will tell if correct answers for this question should be display or not.\n      // The value showCorrectAnswers by default is the value of showCorrectAnswers inside initOptions object that is used\n      // to initialize question app or the value of the options that is passed into public method validate (like question.validate({showCorrectAnswers: false}))\n\n      events.on(\"validate\", function (options) {\n        var result = facade.isValid(); // Use facade.isValid(true) to get the detailed report\n\n        this.clearValidationUI();\n        this.showValidationUI(result);\n      }.bind(this));\n    },\n    showValidationUI: function showValidationUI(isCorrect) {\n      this.$el.find(\".input-wrapper\") // Add \"lrn_response_index_visible\" class if you want to display the index of current response\n      .addClass(\"lrn_response_index_visible\") // Add this class to display default Learnosity correct, incorrect style\n      .addClass(isCorrect ? \"lrn_correct\" : \"lrn_incorrect\") // After adding the class \"lrn_response_index_visible\", you then can inject the response index element\n      .prepend('<span class=\"lrn_responseIndex\"><span>1</span></span>') // Add this element if you want to display to corresponding validation (cross, tick) icon\n      .append('<span class=\"lrn_validation_icon\"/>');\n    },\n    clearValidationUI: function clearValidationUI() {\n      var $validatedResponse = this.$el.find(\".input-wrapper\").removeClass(\"lrn_incorrect lrn_correct\");\n      $validatedResponse.find(\".lrn_validation_icon\").remove();\n      $validatedResponse.find(\".lrn_responseIndex\").remove();\n    },\n    updatePublicMethods: function updatePublicMethods(facade) {\n      var self = this; // Override mandatory public methods\n\n      var _enable = facade.enable;\n\n      facade.enable = function () {\n        _enable();\n\n        self.$response.prop(\"disabled\", false);\n      };\n\n      var _disable = facade.disable;\n\n      facade.disable = function () {\n        _disable();\n\n        self.$response.prop(\"disabled\", true);\n      }; // Add new public methods\n\n\n      facade.reset = function () {\n        self.$response.val(\"\").trigger(\"changed\");\n      };\n    }\n  });\n\n  return {\n    Question: CustomShorttext\n  };\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9xdWVzdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3F1ZXN0aW9uLmpzP2Q4YzciXSwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgTGVhcm5vc2l0eUFtZCovXG5MZWFybm9zaXR5QW1kLmRlZmluZShbXCJ1bmRlcnNjb3JlLXYxLjUuMlwiLCBcImpxdWVyeS12MS4xMC4yXCJdLCBmdW5jdGlvbiAoXywgJCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBmdW5jdGlvbiBDdXN0b21TaG9ydHRleHQoaW5pdCwgdG9vbHMpIHtcbiAgICB0aGlzLmluaXQgPSBpbml0O1xuICAgIHRoaXMudG9vbHMgPSB0b29scztcbiAgICB0aGlzLnF1ZXN0aW9uID0gaW5pdC5xdWVzdGlvbjtcbiAgICB0aGlzLiRlbCA9IGluaXQuJGVsO1xuICAgIHRoaXMuc2V0dXAoKTtcblxuICAgIGluaXQuZXZlbnRzLnRyaWdnZXIoXCJyZWFkeVwiKTtcbiAgfVxuXG4gIF8uZXh0ZW5kKEN1c3RvbVNob3J0dGV4dC5wcm90b3R5cGUsIHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGVsXG4gICAgICAgIC5odG1sKFxuICAgICAgICAgICc8ZGl2PjxkaXYgY2xhc3M9XCJpbnB1dC13cmFwcGVyXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiAvPjwvZGl2PjwvZGl2PidcbiAgICAgICAgKVxuICAgICAgICAuYXBwZW5kKCc8ZGl2IGRhdGEtbHJuLWNvbXBvbmVudD1cInJhbmdlX3Njb3JpbmdfbWF4XCIvPicpXG4gICAgICAgIC5hcHBlbmQoJzxkaXYgZGF0YS1scm4tY29tcG9uZW50PVwicmFuZ2Vfc2NvcmluZ19taW5cIi8+JylcbiAgICB9LFxuXG4gICAgc2V0dXA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpbml0ID0gdGhpcy5pbml0O1xuICAgICAgdmFyIGV2ZW50cyA9IGluaXQuZXZlbnRzO1xuICAgICAgdmFyIGZhY2FkZSA9IGluaXQuZ2V0RmFjYWRlKCk7XG4gICAgICB2YXIgbWF4ID0gdGhpcy5xdWVzdGlvbi5yYW5nZV9zY29yaW5nX21heDtcbiAgICAgIHZhciBtaW4gPSB0aGlzLnF1ZXN0aW9uLnJhbmdlX3Njb3JpbmdfbWluO1xuXG4gICAgICB0aGlzLnVwZGF0ZVB1YmxpY01ldGhvZHMoZmFjYWRlKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuJHJlc3BvbnNlID0gJChcImlucHV0XCIsIHRoaXMuJGVsKTtcbiAgICAgIHRoaXMuJHJlc3BvbnNlLmF0dHIoXCJtYXhcIiwgbWF4KTtcbiAgICAgIHRoaXMuJHJlc3BvbnNlLmF0dHIoXCJtaW5cIiwgbWluKTtcblxuICAgICAgaWYgKGluaXQucmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy4kcmVzcG9uc2UudmFsKGluaXQucmVzcG9uc2UpO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXZlbG9wZXIgaXMgcmVzcG9uc2libGUgdG8ga25vdyB3aGVuIHRvIGNsZWFuIHVwIHRoZSB2YWxpZGF0aW9uIFVJIGFzIHdlbGwgYXMgd2hlbiB0byB0cmlnZ2VyIHRoZSAnY2hhbmdlZCcgZXZlbnQgdG8gdXBkYXRlXG4gICAgICAvLyB0aGUgbW9kZWwgdmFsdWVcbiAgICAgIHRoaXMuJHJlc3BvbnNlXG4gICAgICAgIC5vbihcbiAgICAgICAgICBcImZvY3VzXCIsXG4gICAgICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclZhbGlkYXRpb25VSSgpO1xuICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICApXG4gICAgICAgIC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudHMudHJpZ2dlcihcImNoYW5nZWRcIiwgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBcInZhbGlkYXRlXCIgZXZlbnQgY2FuIGJlIHRyaWdnZXJlZCB3aGVuIENoZWNrIEFuc3dlciBidXR0b24gaXMgY2xpY2tlZCBvciB3aGVuIHB1YmxpYyBtZXRob2QgLnZhbGlkYXRlKCkgaXMgY2FsbGVkXG4gICAgICAvLyBzbyBkZXZlbG9wZXIgbmVlZHMgdG8gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdG8gZGVjaWRlIGlmIGhlIHdhbnRzIHRvIGRpc3BsYXkgdGhlIGNvcnJlY3QgYW5zd2VycyB0byB1c2VyIG9yIG5vdFxuICAgICAgLy8gb3B0aW9ucy5zaG93Q29ycmVjdEFuc3dlcnMgd2lsbCB0ZWxsIGlmIGNvcnJlY3QgYW5zd2VycyBmb3IgdGhpcyBxdWVzdGlvbiBzaG91bGQgYmUgZGlzcGxheSBvciBub3QuXG4gICAgICAvLyBUaGUgdmFsdWUgc2hvd0NvcnJlY3RBbnN3ZXJzIGJ5IGRlZmF1bHQgaXMgdGhlIHZhbHVlIG9mIHNob3dDb3JyZWN0QW5zd2VycyBpbnNpZGUgaW5pdE9wdGlvbnMgb2JqZWN0IHRoYXQgaXMgdXNlZFxuICAgICAgLy8gdG8gaW5pdGlhbGl6ZSBxdWVzdGlvbiBhcHAgb3IgdGhlIHZhbHVlIG9mIHRoZSBvcHRpb25zIHRoYXQgaXMgcGFzc2VkIGludG8gcHVibGljIG1ldGhvZCB2YWxpZGF0ZSAobGlrZSBxdWVzdGlvbi52YWxpZGF0ZSh7c2hvd0NvcnJlY3RBbnN3ZXJzOiBmYWxzZX0pKVxuICAgICAgZXZlbnRzLm9uKFxuICAgICAgICBcInZhbGlkYXRlXCIsXG4gICAgICAgIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGZhY2FkZS5pc1ZhbGlkKCk7IC8vIFVzZSBmYWNhZGUuaXNWYWxpZCh0cnVlKSB0byBnZXQgdGhlIGRldGFpbGVkIHJlcG9ydFxuXG4gICAgICAgICAgdGhpcy5jbGVhclZhbGlkYXRpb25VSSgpO1xuICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25VSShyZXN1bHQpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgc2hvd1ZhbGlkYXRpb25VSTogZnVuY3Rpb24gKGlzQ29ycmVjdCkge1xuICAgICAgdGhpcy4kZWxcbiAgICAgICAgLmZpbmQoXCIuaW5wdXQtd3JhcHBlclwiKVxuICAgICAgICAvLyBBZGQgXCJscm5fcmVzcG9uc2VfaW5kZXhfdmlzaWJsZVwiIGNsYXNzIGlmIHlvdSB3YW50IHRvIGRpc3BsYXkgdGhlIGluZGV4IG9mIGN1cnJlbnQgcmVzcG9uc2VcbiAgICAgICAgLmFkZENsYXNzKFwibHJuX3Jlc3BvbnNlX2luZGV4X3Zpc2libGVcIilcbiAgICAgICAgLy8gQWRkIHRoaXMgY2xhc3MgdG8gZGlzcGxheSBkZWZhdWx0IExlYXJub3NpdHkgY29ycmVjdCwgaW5jb3JyZWN0IHN0eWxlXG4gICAgICAgIC5hZGRDbGFzcyhpc0NvcnJlY3QgPyBcImxybl9jb3JyZWN0XCIgOiBcImxybl9pbmNvcnJlY3RcIilcbiAgICAgICAgLy8gQWZ0ZXIgYWRkaW5nIHRoZSBjbGFzcyBcImxybl9yZXNwb25zZV9pbmRleF92aXNpYmxlXCIsIHlvdSB0aGVuIGNhbiBpbmplY3QgdGhlIHJlc3BvbnNlIGluZGV4IGVsZW1lbnRcbiAgICAgICAgLnByZXBlbmQoJzxzcGFuIGNsYXNzPVwibHJuX3Jlc3BvbnNlSW5kZXhcIj48c3Bhbj4xPC9zcGFuPjwvc3Bhbj4nKVxuICAgICAgICAvLyBBZGQgdGhpcyBlbGVtZW50IGlmIHlvdSB3YW50IHRvIGRpc3BsYXkgdG8gY29ycmVzcG9uZGluZyB2YWxpZGF0aW9uIChjcm9zcywgdGljaykgaWNvblxuICAgICAgICAuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImxybl92YWxpZGF0aW9uX2ljb25cIi8+Jyk7XG4gICAgfSxcblxuICAgIGNsZWFyVmFsaWRhdGlvblVJOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHZhciAkdmFsaWRhdGVkUmVzcG9uc2UgPSB0aGlzLiRlbFxuICAgICAgICAuZmluZChcIi5pbnB1dC13cmFwcGVyXCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImxybl9pbmNvcnJlY3QgbHJuX2NvcnJlY3RcIik7XG5cbiAgICAgICR2YWxpZGF0ZWRSZXNwb25zZS5maW5kKFwiLmxybl92YWxpZGF0aW9uX2ljb25cIikucmVtb3ZlKCk7XG4gICAgICAkdmFsaWRhdGVkUmVzcG9uc2UuZmluZChcIi5scm5fcmVzcG9uc2VJbmRleFwiKS5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUHVibGljTWV0aG9kczogZnVuY3Rpb24gKGZhY2FkZSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBPdmVycmlkZSBtYW5kYXRvcnkgcHVibGljIG1ldGhvZHNcbiAgICAgIHZhciBfZW5hYmxlID0gZmFjYWRlLmVuYWJsZTtcbiAgICAgIGZhY2FkZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9lbmFibGUoKTtcbiAgICAgICAgc2VsZi4kcmVzcG9uc2UucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBfZGlzYWJsZSA9IGZhY2FkZS5kaXNhYmxlO1xuICAgICAgZmFjYWRlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9kaXNhYmxlKCk7XG4gICAgICAgIHNlbGYuJHJlc3BvbnNlLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEFkZCBuZXcgcHVibGljIG1ldGhvZHNcbiAgICAgIGZhY2FkZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi4kcmVzcG9uc2UudmFsKFwiXCIpLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xuICAgICAgfTtcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIFF1ZXN0aW9uOiBDdXN0b21TaG9ydHRleHQsXG4gIH07XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQTtBQUVBO0FBRUE7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFyR0E7QUFDQTtBQXVHQTtBQUNBO0FBREE7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./question.js\n");

/***/ })

/******/ });
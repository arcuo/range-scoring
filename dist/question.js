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

eval("/*global LearnosityAmd*/\nLearnosityAmd.define([\"underscore-v1.5.2\", \"jquery-v1.10.2\"], function (_, $) {\n  \"use strict\";\n\n  function CustomShorttext(init, tools) {\n    this.init = init;\n    this.tools = tools;\n    this.question = init.question;\n    this.$el = init.$el;\n    this.setup();\n    init.events.trigger(\"ready\");\n  }\n\n  _.extend(CustomShorttext.prototype, {\n    render: function render() {\n      this.$el.html('<div><div class=\"input-wrapper\"><input type=\"number\" pattern=\"\\\\d*\" /></div></div>').append('<div data-lrn-component=\"range_scoring_max\"/>').append('<div data-lrn-component=\"range_scoring_min\"/>');\n    },\n    setup: function setup() {\n      var init = this.init;\n      var events = init.events;\n      var facade = init.getFacade();\n      var max = this.question.range_scoring_max;\n      var min = this.question.range_scoring_min;\n      this.updatePublicMethods(facade);\n      this.render();\n      this.$response = $(\"input\", this.$el);\n      this.$response.attr(\"max\", max);\n      this.$response.attr(\"min\", min);\n\n      if (init.response) {\n        this.$response.val(init.response);\n      } // Developer is responsible to know when to clean up the validation UI as well as when to trigger the 'changed' event to update\n      // the model value\n\n\n      this.$response.on(\"focus\", function () {\n        this.clearValidationUI();\n      }.bind(this)).on(\"change\", function (event) {\n        events.trigger(\"changed\", event.currentTarget.value);\n      }) // Prevent other than integer\n      .on(\"keypress\", function (event) {\n        var _char = event.which;\n        return _char === 45 || 48 <= _char && _char <= 57;\n      }); // \"validate\" event can be triggered when Check Answer button is clicked or when public method .validate() is called\n      // so developer needs to listen to this event to decide if he wants to display the correct answers to user or not\n      // options.showCorrectAnswers will tell if correct answers for this question should be display or not.\n      // The value showCorrectAnswers by default is the value of showCorrectAnswers inside initOptions object that is used\n      // to initialize question app or the value of the options that is passed into public method validate (like question.validate({showCorrectAnswers: false}))\n\n      events.on(\"validate\", function (options) {\n        var result = facade.isValid(); // Use facade.isValid(true) to get the detailed report\n\n        this.clearValidationUI();\n        this.showValidationUI(result);\n      }.bind(this));\n    },\n    showValidationUI: function showValidationUI(isCorrect) {\n      this.$el.find(\".input-wrapper\") // Add \"lrn_response_index_visible\" class if you want to display the index of current response\n      .addClass(\"lrn_response_index_visible\") // Add this class to display default Learnosity correct, incorrect style\n      .addClass(isCorrect ? \"lrn_correct\" : \"lrn_incorrect\") // After adding the class \"lrn_response_index_visible\", you then can inject the response index element\n      // .prepend('<span class=\"lrn_responseIndex\"><span>1</span></span>')\n      // Add this element if you want to display to corresponding validation (cross, tick) icon\n      .append('<span class=\"lrn_validation_icon\"/>');\n    },\n    clearValidationUI: function clearValidationUI() {\n      var $validatedResponse = this.$el.find(\".input-wrapper\").removeClass(\"lrn_incorrect lrn_correct\");\n      $validatedResponse.find(\".lrn_validation_icon\").remove();\n      $validatedResponse.find(\".lrn_responseIndex\").remove();\n    },\n    updatePublicMethods: function updatePublicMethods(facade) {\n      var self = this; // Override mandatory public methods\n\n      var _enable = facade.enable;\n\n      facade.enable = function () {\n        _enable();\n\n        self.$response.prop(\"disabled\", false);\n      };\n\n      var _disable = facade.disable;\n\n      facade.disable = function () {\n        _disable();\n\n        self.$response.prop(\"disabled\", true);\n      }; // Add new public methods\n\n\n      facade.reset = function () {\n        self.$response.val(\"\").trigger(\"changed\");\n      };\n    }\n  });\n\n  return {\n    Question: CustomShorttext\n  };\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9xdWVzdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3F1ZXN0aW9uLmpzP2Q4YzciXSwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgTGVhcm5vc2l0eUFtZCovXG5MZWFybm9zaXR5QW1kLmRlZmluZShbXCJ1bmRlcnNjb3JlLXYxLjUuMlwiLCBcImpxdWVyeS12MS4xMC4yXCJdLCBmdW5jdGlvbiAoXywgJCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBmdW5jdGlvbiBDdXN0b21TaG9ydHRleHQoaW5pdCwgdG9vbHMpIHtcbiAgICB0aGlzLmluaXQgPSBpbml0O1xuICAgIHRoaXMudG9vbHMgPSB0b29scztcbiAgICB0aGlzLnF1ZXN0aW9uID0gaW5pdC5xdWVzdGlvbjtcbiAgICB0aGlzLiRlbCA9IGluaXQuJGVsO1xuICAgIHRoaXMuc2V0dXAoKTtcblxuICAgIGluaXQuZXZlbnRzLnRyaWdnZXIoXCJyZWFkeVwiKTtcbiAgfVxuXG4gIF8uZXh0ZW5kKEN1c3RvbVNob3J0dGV4dC5wcm90b3R5cGUsIHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuJGVsXG4gICAgICAgIC5odG1sKFxuICAgICAgICAgICc8ZGl2PjxkaXYgY2xhc3M9XCJpbnB1dC13cmFwcGVyXCI+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBwYXR0ZXJuPVwiXFxcXGQqXCIgLz48L2Rpdj48L2Rpdj4nXG4gICAgICAgIClcbiAgICAgICAgLmFwcGVuZCgnPGRpdiBkYXRhLWxybi1jb21wb25lbnQ9XCJyYW5nZV9zY29yaW5nX21heFwiLz4nKVxuICAgICAgICAuYXBwZW5kKCc8ZGl2IGRhdGEtbHJuLWNvbXBvbmVudD1cInJhbmdlX3Njb3JpbmdfbWluXCIvPicpO1xuICAgIH0sXG5cbiAgICBzZXR1cDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGluaXQgPSB0aGlzLmluaXQ7XG4gICAgICB2YXIgZXZlbnRzID0gaW5pdC5ldmVudHM7XG4gICAgICB2YXIgZmFjYWRlID0gaW5pdC5nZXRGYWNhZGUoKTtcbiAgICAgIHZhciBtYXggPSB0aGlzLnF1ZXN0aW9uLnJhbmdlX3Njb3JpbmdfbWF4O1xuICAgICAgdmFyIG1pbiA9IHRoaXMucXVlc3Rpb24ucmFuZ2Vfc2NvcmluZ19taW47XG5cbiAgICAgIHRoaXMudXBkYXRlUHVibGljTWV0aG9kcyhmYWNhZGUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgdGhpcy4kcmVzcG9uc2UgPSAkKFwiaW5wdXRcIiwgdGhpcy4kZWwpO1xuICAgICAgdGhpcy4kcmVzcG9uc2UuYXR0cihcIm1heFwiLCBtYXgpO1xuICAgICAgdGhpcy4kcmVzcG9uc2UuYXR0cihcIm1pblwiLCBtaW4pO1xuXG4gICAgICBpZiAoaW5pdC5yZXNwb25zZSkge1xuICAgICAgICB0aGlzLiRyZXNwb25zZS52YWwoaW5pdC5yZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIERldmVsb3BlciBpcyByZXNwb25zaWJsZSB0byBrbm93IHdoZW4gdG8gY2xlYW4gdXAgdGhlIHZhbGlkYXRpb24gVUkgYXMgd2VsbCBhcyB3aGVuIHRvIHRyaWdnZXIgdGhlICdjaGFuZ2VkJyBldmVudCB0byB1cGRhdGVcbiAgICAgIC8vIHRoZSBtb2RlbCB2YWx1ZVxuICAgICAgdGhpcy4kcmVzcG9uc2VcbiAgICAgICAgLm9uKFxuICAgICAgICAgIFwiZm9jdXNcIixcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVmFsaWRhdGlvblVJKCk7XG4gICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIClcbiAgICAgICAgLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGV2ZW50cy50cmlnZ2VyKFwiY2hhbmdlZFwiLCBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLy8gUHJldmVudCBvdGhlciB0aGFuIGludGVnZXJcbiAgICAgICAgLm9uKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIGNoYXIgPSBldmVudC53aGljaDtcbiAgICAgICAgICByZXR1cm4gY2hhciA9PT0gNDUgfHwgNDggPD0gY2hhciAmJiBjaGFyIDw9IDU3O1xuICAgICAgICB9KTtcblxuICAgICAgLy8gXCJ2YWxpZGF0ZVwiIGV2ZW50IGNhbiBiZSB0cmlnZ2VyZWQgd2hlbiBDaGVjayBBbnN3ZXIgYnV0dG9uIGlzIGNsaWNrZWQgb3Igd2hlbiBwdWJsaWMgbWV0aG9kIC52YWxpZGF0ZSgpIGlzIGNhbGxlZFxuICAgICAgLy8gc28gZGV2ZWxvcGVyIG5lZWRzIHRvIGxpc3RlbiB0byB0aGlzIGV2ZW50IHRvIGRlY2lkZSBpZiBoZSB3YW50cyB0byBkaXNwbGF5IHRoZSBjb3JyZWN0IGFuc3dlcnMgdG8gdXNlciBvciBub3RcbiAgICAgIC8vIG9wdGlvbnMuc2hvd0NvcnJlY3RBbnN3ZXJzIHdpbGwgdGVsbCBpZiBjb3JyZWN0IGFuc3dlcnMgZm9yIHRoaXMgcXVlc3Rpb24gc2hvdWxkIGJlIGRpc3BsYXkgb3Igbm90LlxuICAgICAgLy8gVGhlIHZhbHVlIHNob3dDb3JyZWN0QW5zd2VycyBieSBkZWZhdWx0IGlzIHRoZSB2YWx1ZSBvZiBzaG93Q29ycmVjdEFuc3dlcnMgaW5zaWRlIGluaXRPcHRpb25zIG9iamVjdCB0aGF0IGlzIHVzZWRcbiAgICAgIC8vIHRvIGluaXRpYWxpemUgcXVlc3Rpb24gYXBwIG9yIHRoZSB2YWx1ZSBvZiB0aGUgb3B0aW9ucyB0aGF0IGlzIHBhc3NlZCBpbnRvIHB1YmxpYyBtZXRob2QgdmFsaWRhdGUgKGxpa2UgcXVlc3Rpb24udmFsaWRhdGUoe3Nob3dDb3JyZWN0QW5zd2VyczogZmFsc2V9KSlcbiAgICAgIGV2ZW50cy5vbihcbiAgICAgICAgXCJ2YWxpZGF0ZVwiLFxuICAgICAgICBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgIHZhciByZXN1bHQgPSBmYWNhZGUuaXNWYWxpZCgpOyAvLyBVc2UgZmFjYWRlLmlzVmFsaWQodHJ1ZSkgdG8gZ2V0IHRoZSBkZXRhaWxlZCByZXBvcnRcblxuICAgICAgICAgIHRoaXMuY2xlYXJWYWxpZGF0aW9uVUkoKTtcbiAgICAgICAgICB0aGlzLnNob3dWYWxpZGF0aW9uVUkocmVzdWx0KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBzaG93VmFsaWRhdGlvblVJOiBmdW5jdGlvbiAoaXNDb3JyZWN0KSB7XG4gICAgICB0aGlzLiRlbFxuICAgICAgICAuZmluZChcIi5pbnB1dC13cmFwcGVyXCIpXG4gICAgICAgIC8vIEFkZCBcImxybl9yZXNwb25zZV9pbmRleF92aXNpYmxlXCIgY2xhc3MgaWYgeW91IHdhbnQgdG8gZGlzcGxheSB0aGUgaW5kZXggb2YgY3VycmVudCByZXNwb25zZVxuICAgICAgICAuYWRkQ2xhc3MoXCJscm5fcmVzcG9uc2VfaW5kZXhfdmlzaWJsZVwiKVxuICAgICAgICAvLyBBZGQgdGhpcyBjbGFzcyB0byBkaXNwbGF5IGRlZmF1bHQgTGVhcm5vc2l0eSBjb3JyZWN0LCBpbmNvcnJlY3Qgc3R5bGVcbiAgICAgICAgLmFkZENsYXNzKGlzQ29ycmVjdCA/IFwibHJuX2NvcnJlY3RcIiA6IFwibHJuX2luY29ycmVjdFwiKVxuICAgICAgICAvLyBBZnRlciBhZGRpbmcgdGhlIGNsYXNzIFwibHJuX3Jlc3BvbnNlX2luZGV4X3Zpc2libGVcIiwgeW91IHRoZW4gY2FuIGluamVjdCB0aGUgcmVzcG9uc2UgaW5kZXggZWxlbWVudFxuICAgICAgICAvLyAucHJlcGVuZCgnPHNwYW4gY2xhc3M9XCJscm5fcmVzcG9uc2VJbmRleFwiPjxzcGFuPjE8L3NwYW4+PC9zcGFuPicpXG4gICAgICAgIC8vIEFkZCB0aGlzIGVsZW1lbnQgaWYgeW91IHdhbnQgdG8gZGlzcGxheSB0byBjb3JyZXNwb25kaW5nIHZhbGlkYXRpb24gKGNyb3NzLCB0aWNrKSBpY29uXG4gICAgICAgIC5hcHBlbmQoJzxzcGFuIGNsYXNzPVwibHJuX3ZhbGlkYXRpb25faWNvblwiLz4nKTtcbiAgICB9LFxuXG4gICAgY2xlYXJWYWxpZGF0aW9uVUk6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdmFsaWRhdGVkUmVzcG9uc2UgPSB0aGlzLiRlbFxuICAgICAgICAuZmluZChcIi5pbnB1dC13cmFwcGVyXCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImxybl9pbmNvcnJlY3QgbHJuX2NvcnJlY3RcIik7XG5cbiAgICAgICR2YWxpZGF0ZWRSZXNwb25zZS5maW5kKFwiLmxybl92YWxpZGF0aW9uX2ljb25cIikucmVtb3ZlKCk7XG4gICAgICAkdmFsaWRhdGVkUmVzcG9uc2UuZmluZChcIi5scm5fcmVzcG9uc2VJbmRleFwiKS5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlUHVibGljTWV0aG9kczogZnVuY3Rpb24gKGZhY2FkZSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAvLyBPdmVycmlkZSBtYW5kYXRvcnkgcHVibGljIG1ldGhvZHNcbiAgICAgIHZhciBfZW5hYmxlID0gZmFjYWRlLmVuYWJsZTtcbiAgICAgIGZhY2FkZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9lbmFibGUoKTtcbiAgICAgICAgc2VsZi4kcmVzcG9uc2UucHJvcChcImRpc2FibGVkXCIsIGZhbHNlKTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBfZGlzYWJsZSA9IGZhY2FkZS5kaXNhYmxlO1xuICAgICAgZmFjYWRlLmRpc2FibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9kaXNhYmxlKCk7XG4gICAgICAgIHNlbGYuJHJlc3BvbnNlLnByb3AoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEFkZCBuZXcgcHVibGljIG1ldGhvZHNcbiAgICAgIGZhY2FkZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi4kcmVzcG9uc2UudmFsKFwiXCIpLnRyaWdnZXIoXCJjaGFuZ2VkXCIpO1xuICAgICAgfTtcbiAgICB9LFxuICB9KTtcblxuICByZXR1cm4ge1xuICAgIFF1ZXN0aW9uOiBDdXN0b21TaG9ydHRleHQsXG4gIH07XG59KTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUdBO0FBQ0E7QUFUQTtBQVlBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBT0E7QUFDQTtBQVJBO0FBVUE7QUFFQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBeEdBO0FBQ0E7QUEwR0E7QUFDQTtBQURBO0FBR0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./question.js\n");

/***/ })

/******/ });
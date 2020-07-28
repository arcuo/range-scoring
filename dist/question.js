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

eval("/*global LearnosityAmd*/\nLearnosityAmd.define([\"underscore-v1.5.2\", \"jquery-v1.10.2\"], function (_, $) {\n  \"use strict\";\n\n  function CustomShorttext(init, lrnUtils) {\n    this.init = init;\n    this.lrnUtils = lrnUtils;\n    this.question = init.question;\n    this.$el = init.$el;\n    this.setup();\n    init.events.trigger(\"ready\");\n  }\n\n  _.extend(CustomShorttext.prototype, {\n    render: function render() {\n      this.$el.html('<div><div class=\"input-wrapper\"><input type=\"text\" /></div></div>').append('<div data-lrn-component=\"range_scoring_max\"/>').append('<div data-lrn-component=\"range_scoring_min\"/>').append('<div data-lrn-component=\"suggestedAnswersList\"/>').append('<div data-lrn-component=\"checkAnswer\"/>');\n      this.$el.find(\"input\").width(this.question.width).height(this.question.height);\n      this.lrnUtils.renderComponent(\"CheckAnswerButton\", this.$el.find('[data-lrn-component=\"checkAnswer\"]').get(0));\n    },\n    setup: function setup() {\n      var init = this.init;\n      var events = init.events;\n      var facade = init.getFacade();\n      console.log(this.question.range_scoring_max);\n      this.updatePublicMethods(facade);\n      this.render();\n      this.$response = $(\"input\", this.$el);\n      this.$correctAnswers = $(\".lrn_correctAnswers\", this.$el);\n\n      if (init.response) {\n        this.$response.val(init.response);\n      } // Developer is responsible to know when to clean up the validation UI as well as when to trigger the 'changed' event to update\n      // the model value\n\n\n      this.$response.on(\"focus\", function () {\n        this.clearValidationUI();\n        this.hideCorrectAnswers();\n      }.bind(this)).on(\"change\", function (event) {\n        events.trigger(\"changed\", event.currentTarget.value);\n      }); // \"validate\" event can be triggered when Check Answer button is clicked or when public method .validate() is called\n      // so developer needs to listen to this event to decide if he wants to display the correct answers to user or not\n      // options.showCorrectAnswers will tell if correct answers for this question should be display or not.\n      // The value showCorrectAnswers by default is the value of showCorrectAnswers inside initOptions object that is used\n      // to initialize question app or the value of the options that is passed into public method validate (like question.validate({showCorrectAnswers: false}))\n\n      events.on(\"validate\", function (options) {\n        var result = facade.isValid(); // Use facade.isValid(true) to get the detailed report\n\n        this.clearValidationUI();\n        this.showValidationUI(result);\n\n        if (!result && options.showCorrectAnswers) {\n          this.showCorrectAnswers();\n        }\n      }.bind(this));\n    },\n    showValidationUI: function showValidationUI(isCorrect) {\n      this.$el.find(\".input-wrapper\") // Add \"lrn_response_index_visible\" class if you want to display the index of current response\n      .addClass(\"lrn_response_index_visible\") // Add this class to display default Learnosity correct, incorrect style\n      .addClass(isCorrect ? \"lrn_correct\" : \"lrn_incorrect\") // After adding the class \"lrn_response_index_visible\", you then can inject the response index element\n      .prepend('<span class=\"lrn_responseIndex\"><span>1</span></span>') // Add this element if you want to display to corresponding validation (cross, tick) icon\n      .append('<span class=\"lrn_validation_icon\"/>');\n    },\n    clearValidationUI: function clearValidationUI() {\n      this.$correctAnswers.addClass(\"lrn_hide\").find(\".lrn_correctAnswerList\").empty();\n      var $validatedResponse = this.$el.find(\".input-wrapper\").removeClass(\"lrn_incorrect lrn_correct\");\n      $validatedResponse.find(\".lrn_validation_icon\").remove();\n      $validatedResponse.find(\".lrn_responseIndex\").remove();\n    },\n    showCorrectAnswers: function showCorrectAnswers() {\n      var self = this;\n      var correctAnswerText = _.getNested(this.question, \"valid_response\") || \"\";\n\n      var setAnswersToSuggestedList = function setAnswersToSuggestedList() {\n        // Pass in string to display correct answer list without the index\n        // this.suggestedAnswersList.setAnswers(correctAnswerText);\n        // Pass in an array of object which contains index and label to render a list\n        // of suggested answers\n        self.suggestedAnswersList.setAnswers([{\n          index: 0,\n          label: correctAnswerText\n        }]);\n      };\n\n      if (!this.suggestedAnswersList) {\n        this.lrnUtils.renderComponent(\"SuggestedAnswersList\", this.$el.find('[data-lrn-component=\"suggestedAnswersList\"]').get(0)).then(function (component) {\n          self.suggestedAnswersList = component;\n          setAnswersToSuggestedList();\n        });\n      } else {\n        setAnswersToSuggestedList();\n      }\n    },\n    hideCorrectAnswers: function hideCorrectAnswers() {\n      if (this.suggestedAnswersList) {\n        // Clear current suggsted answer list\n        this.suggestedAnswersList.reset();\n      }\n    },\n    updatePublicMethods: function updatePublicMethods(facade) {\n      var self = this; // Override mandatory public methods\n\n      var _enable = facade.enable;\n\n      facade.enable = function () {\n        _enable();\n\n        self.$response.prop(\"disabled\", false);\n      };\n\n      var _disable = facade.disable;\n\n      facade.disable = function () {\n        _disable();\n\n        self.$response.prop(\"disabled\", true);\n      }; // Add new public methods\n\n\n      facade.reset = function () {\n        self.$response.val(\"\").trigger(\"changed\");\n      };\n    }\n  });\n\n  return {\n    Question: CustomShorttext\n  };\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9xdWVzdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3F1ZXN0aW9uLmpzP2Q4YzciXSwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgTGVhcm5vc2l0eUFtZCovXG5MZWFybm9zaXR5QW1kLmRlZmluZShbXCJ1bmRlcnNjb3JlLXYxLjUuMlwiLCBcImpxdWVyeS12MS4xMC4yXCJdLCBmdW5jdGlvbiAoXywgJCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBmdW5jdGlvbiBDdXN0b21TaG9ydHRleHQoaW5pdCwgbHJuVXRpbHMpIHtcbiAgICB0aGlzLmluaXQgPSBpbml0O1xuICAgIHRoaXMubHJuVXRpbHMgPSBscm5VdGlscztcbiAgICB0aGlzLnF1ZXN0aW9uID0gaW5pdC5xdWVzdGlvbjtcbiAgICB0aGlzLiRlbCA9IGluaXQuJGVsO1xuXG4gICAgdGhpcy5zZXR1cCgpO1xuXG4gICAgaW5pdC5ldmVudHMudHJpZ2dlcihcInJlYWR5XCIpO1xuICB9XG5cbiAgXy5leHRlbmQoQ3VzdG9tU2hvcnR0ZXh0LnByb3RvdHlwZSwge1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kZWxcbiAgICAgICAgLmh0bWwoXG4gICAgICAgICAgJzxkaXY+PGRpdiBjbGFzcz1cImlucHV0LXdyYXBwZXJcIj48aW5wdXQgdHlwZT1cInRleHRcIiAvPjwvZGl2PjwvZGl2PidcbiAgICAgICAgKVxuICAgICAgICAuYXBwZW5kKCc8ZGl2IGRhdGEtbHJuLWNvbXBvbmVudD1cInJhbmdlX3Njb3JpbmdfbWF4XCIvPicpXG4gICAgICAgIC5hcHBlbmQoJzxkaXYgZGF0YS1scm4tY29tcG9uZW50PVwicmFuZ2Vfc2NvcmluZ19taW5cIi8+JylcbiAgICAgICAgLmFwcGVuZCgnPGRpdiBkYXRhLWxybi1jb21wb25lbnQ9XCJzdWdnZXN0ZWRBbnN3ZXJzTGlzdFwiLz4nKVxuICAgICAgICAuYXBwZW5kKCc8ZGl2IGRhdGEtbHJuLWNvbXBvbmVudD1cImNoZWNrQW5zd2VyXCIvPicpO1xuXG4gICAgICB0aGlzLiRlbFxuICAgICAgICAuZmluZChcImlucHV0XCIpXG4gICAgICAgIC53aWR0aCh0aGlzLnF1ZXN0aW9uLndpZHRoKVxuICAgICAgICAuaGVpZ2h0KHRoaXMucXVlc3Rpb24uaGVpZ2h0KTtcblxuICAgICAgdGhpcy5scm5VdGlscy5yZW5kZXJDb21wb25lbnQoXG4gICAgICAgIFwiQ2hlY2tBbnN3ZXJCdXR0b25cIixcbiAgICAgICAgdGhpcy4kZWwuZmluZCgnW2RhdGEtbHJuLWNvbXBvbmVudD1cImNoZWNrQW5zd2VyXCJdJykuZ2V0KDApXG4gICAgICApO1xuICAgIH0sXG5cbiAgICBzZXR1cDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGluaXQgPSB0aGlzLmluaXQ7XG4gICAgICB2YXIgZXZlbnRzID0gaW5pdC5ldmVudHM7XG4gICAgICB2YXIgZmFjYWRlID0gaW5pdC5nZXRGYWNhZGUoKTtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMucXVlc3Rpb24ucmFuZ2Vfc2NvcmluZ19tYXgpXG5cbiAgICAgIHRoaXMudXBkYXRlUHVibGljTWV0aG9kcyhmYWNhZGUpO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgdGhpcy4kcmVzcG9uc2UgPSAkKFwiaW5wdXRcIiwgdGhpcy4kZWwpO1xuICAgICAgdGhpcy4kY29ycmVjdEFuc3dlcnMgPSAkKFwiLmxybl9jb3JyZWN0QW5zd2Vyc1wiLCB0aGlzLiRlbCk7XG5cbiAgICAgIGlmIChpbml0LnJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuJHJlc3BvbnNlLnZhbChpbml0LnJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgLy8gRGV2ZWxvcGVyIGlzIHJlc3BvbnNpYmxlIHRvIGtub3cgd2hlbiB0byBjbGVhbiB1cCB0aGUgdmFsaWRhdGlvbiBVSSBhcyB3ZWxsIGFzIHdoZW4gdG8gdHJpZ2dlciB0aGUgJ2NoYW5nZWQnIGV2ZW50IHRvIHVwZGF0ZVxuICAgICAgLy8gdGhlIG1vZGVsIHZhbHVlXG4gICAgICB0aGlzLiRyZXNwb25zZVxuICAgICAgICAub24oXG4gICAgICAgICAgXCJmb2N1c1wiLFxuICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJWYWxpZGF0aW9uVUkoKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZUNvcnJlY3RBbnN3ZXJzKCk7XG4gICAgICAgICAgfS5iaW5kKHRoaXMpXG4gICAgICAgIClcbiAgICAgICAgLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGV2ZW50cy50cmlnZ2VyKFwiY2hhbmdlZFwiLCBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIFwidmFsaWRhdGVcIiBldmVudCBjYW4gYmUgdHJpZ2dlcmVkIHdoZW4gQ2hlY2sgQW5zd2VyIGJ1dHRvbiBpcyBjbGlja2VkIG9yIHdoZW4gcHVibGljIG1ldGhvZCAudmFsaWRhdGUoKSBpcyBjYWxsZWRcbiAgICAgIC8vIHNvIGRldmVsb3BlciBuZWVkcyB0byBsaXN0ZW4gdG8gdGhpcyBldmVudCB0byBkZWNpZGUgaWYgaGUgd2FudHMgdG8gZGlzcGxheSB0aGUgY29ycmVjdCBhbnN3ZXJzIHRvIHVzZXIgb3Igbm90XG4gICAgICAvLyBvcHRpb25zLnNob3dDb3JyZWN0QW5zd2VycyB3aWxsIHRlbGwgaWYgY29ycmVjdCBhbnN3ZXJzIGZvciB0aGlzIHF1ZXN0aW9uIHNob3VsZCBiZSBkaXNwbGF5IG9yIG5vdC5cbiAgICAgIC8vIFRoZSB2YWx1ZSBzaG93Q29ycmVjdEFuc3dlcnMgYnkgZGVmYXVsdCBpcyB0aGUgdmFsdWUgb2Ygc2hvd0NvcnJlY3RBbnN3ZXJzIGluc2lkZSBpbml0T3B0aW9ucyBvYmplY3QgdGhhdCBpcyB1c2VkXG4gICAgICAvLyB0byBpbml0aWFsaXplIHF1ZXN0aW9uIGFwcCBvciB0aGUgdmFsdWUgb2YgdGhlIG9wdGlvbnMgdGhhdCBpcyBwYXNzZWQgaW50byBwdWJsaWMgbWV0aG9kIHZhbGlkYXRlIChsaWtlIHF1ZXN0aW9uLnZhbGlkYXRlKHtzaG93Q29ycmVjdEFuc3dlcnM6IGZhbHNlfSkpXG4gICAgICBldmVudHMub24oXG4gICAgICAgIFwidmFsaWRhdGVcIixcbiAgICAgICAgZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFjYWRlLmlzVmFsaWQoKTsgLy8gVXNlIGZhY2FkZS5pc1ZhbGlkKHRydWUpIHRvIGdldCB0aGUgZGV0YWlsZWQgcmVwb3J0XG5cbiAgICAgICAgICB0aGlzLmNsZWFyVmFsaWRhdGlvblVJKCk7XG4gICAgICAgICAgdGhpcy5zaG93VmFsaWRhdGlvblVJKHJlc3VsdCk7XG5cbiAgICAgICAgICBpZiAoIXJlc3VsdCAmJiBvcHRpb25zLnNob3dDb3JyZWN0QW5zd2Vycykge1xuICAgICAgICAgICAgdGhpcy5zaG93Q29ycmVjdEFuc3dlcnMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9LFxuXG4gICAgc2hvd1ZhbGlkYXRpb25VSTogZnVuY3Rpb24gKGlzQ29ycmVjdCkge1xuICAgICAgdGhpcy4kZWxcbiAgICAgICAgLmZpbmQoXCIuaW5wdXQtd3JhcHBlclwiKVxuICAgICAgICAvLyBBZGQgXCJscm5fcmVzcG9uc2VfaW5kZXhfdmlzaWJsZVwiIGNsYXNzIGlmIHlvdSB3YW50IHRvIGRpc3BsYXkgdGhlIGluZGV4IG9mIGN1cnJlbnQgcmVzcG9uc2VcbiAgICAgICAgLmFkZENsYXNzKFwibHJuX3Jlc3BvbnNlX2luZGV4X3Zpc2libGVcIilcbiAgICAgICAgLy8gQWRkIHRoaXMgY2xhc3MgdG8gZGlzcGxheSBkZWZhdWx0IExlYXJub3NpdHkgY29ycmVjdCwgaW5jb3JyZWN0IHN0eWxlXG4gICAgICAgIC5hZGRDbGFzcyhpc0NvcnJlY3QgPyBcImxybl9jb3JyZWN0XCIgOiBcImxybl9pbmNvcnJlY3RcIilcbiAgICAgICAgLy8gQWZ0ZXIgYWRkaW5nIHRoZSBjbGFzcyBcImxybl9yZXNwb25zZV9pbmRleF92aXNpYmxlXCIsIHlvdSB0aGVuIGNhbiBpbmplY3QgdGhlIHJlc3BvbnNlIGluZGV4IGVsZW1lbnRcbiAgICAgICAgLnByZXBlbmQoJzxzcGFuIGNsYXNzPVwibHJuX3Jlc3BvbnNlSW5kZXhcIj48c3Bhbj4xPC9zcGFuPjwvc3Bhbj4nKVxuICAgICAgICAvLyBBZGQgdGhpcyBlbGVtZW50IGlmIHlvdSB3YW50IHRvIGRpc3BsYXkgdG8gY29ycmVzcG9uZGluZyB2YWxpZGF0aW9uIChjcm9zcywgdGljaykgaWNvblxuICAgICAgICAuYXBwZW5kKCc8c3BhbiBjbGFzcz1cImxybl92YWxpZGF0aW9uX2ljb25cIi8+Jyk7XG4gICAgfSxcblxuICAgIGNsZWFyVmFsaWRhdGlvblVJOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLiRjb3JyZWN0QW5zd2Vyc1xuICAgICAgICAuYWRkQ2xhc3MoXCJscm5faGlkZVwiKVxuICAgICAgICAuZmluZChcIi5scm5fY29ycmVjdEFuc3dlckxpc3RcIilcbiAgICAgICAgLmVtcHR5KCk7XG5cbiAgICAgIHZhciAkdmFsaWRhdGVkUmVzcG9uc2UgPSB0aGlzLiRlbFxuICAgICAgICAuZmluZChcIi5pbnB1dC13cmFwcGVyXCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhcImxybl9pbmNvcnJlY3QgbHJuX2NvcnJlY3RcIik7XG5cbiAgICAgICR2YWxpZGF0ZWRSZXNwb25zZS5maW5kKFwiLmxybl92YWxpZGF0aW9uX2ljb25cIikucmVtb3ZlKCk7XG4gICAgICAkdmFsaWRhdGVkUmVzcG9uc2UuZmluZChcIi5scm5fcmVzcG9uc2VJbmRleFwiKS5yZW1vdmUoKTtcbiAgICB9LFxuXG4gICAgc2hvd0NvcnJlY3RBbnN3ZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICB2YXIgY29ycmVjdEFuc3dlclRleHQgPVxuICAgICAgICBfLmdldE5lc3RlZCh0aGlzLnF1ZXN0aW9uLCBcInZhbGlkX3Jlc3BvbnNlXCIpIHx8IFwiXCI7XG4gICAgICB2YXIgc2V0QW5zd2Vyc1RvU3VnZ2VzdGVkTGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gUGFzcyBpbiBzdHJpbmcgdG8gZGlzcGxheSBjb3JyZWN0IGFuc3dlciBsaXN0IHdpdGhvdXQgdGhlIGluZGV4XG4gICAgICAgIC8vIHRoaXMuc3VnZ2VzdGVkQW5zd2Vyc0xpc3Quc2V0QW5zd2Vycyhjb3JyZWN0QW5zd2VyVGV4dCk7XG5cbiAgICAgICAgLy8gUGFzcyBpbiBhbiBhcnJheSBvZiBvYmplY3Qgd2hpY2ggY29udGFpbnMgaW5kZXggYW5kIGxhYmVsIHRvIHJlbmRlciBhIGxpc3RcbiAgICAgICAgLy8gb2Ygc3VnZ2VzdGVkIGFuc3dlcnNcbiAgICAgICAgc2VsZi5zdWdnZXN0ZWRBbnN3ZXJzTGlzdC5zZXRBbnN3ZXJzKFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgIGxhYmVsOiBjb3JyZWN0QW5zd2VyVGV4dCxcbiAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5zdWdnZXN0ZWRBbnN3ZXJzTGlzdCkge1xuICAgICAgICB0aGlzLmxyblV0aWxzXG4gICAgICAgICAgLnJlbmRlckNvbXBvbmVudChcbiAgICAgICAgICAgIFwiU3VnZ2VzdGVkQW5zd2Vyc0xpc3RcIixcbiAgICAgICAgICAgIHRoaXMuJGVsLmZpbmQoJ1tkYXRhLWxybi1jb21wb25lbnQ9XCJzdWdnZXN0ZWRBbnN3ZXJzTGlzdFwiXScpLmdldCgwKVxuICAgICAgICAgIClcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAoY29tcG9uZW50KSB7XG4gICAgICAgICAgICBzZWxmLnN1Z2dlc3RlZEFuc3dlcnNMaXN0ID0gY29tcG9uZW50O1xuXG4gICAgICAgICAgICBzZXRBbnN3ZXJzVG9TdWdnZXN0ZWRMaXN0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRBbnN3ZXJzVG9TdWdnZXN0ZWRMaXN0KCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGhpZGVDb3JyZWN0QW5zd2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc3VnZ2VzdGVkQW5zd2Vyc0xpc3QpIHtcbiAgICAgICAgLy8gQ2xlYXIgY3VycmVudCBzdWdnc3RlZCBhbnN3ZXIgbGlzdFxuICAgICAgICB0aGlzLnN1Z2dlc3RlZEFuc3dlcnNMaXN0LnJlc2V0KCk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHVwZGF0ZVB1YmxpY01ldGhvZHM6IGZ1bmN0aW9uIChmYWNhZGUpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgLy8gT3ZlcnJpZGUgbWFuZGF0b3J5IHB1YmxpYyBtZXRob2RzXG4gICAgICB2YXIgX2VuYWJsZSA9IGZhY2FkZS5lbmFibGU7XG4gICAgICBmYWNhZGUuZW5hYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfZW5hYmxlKCk7XG4gICAgICAgIHNlbGYuJHJlc3BvbnNlLnByb3AoXCJkaXNhYmxlZFwiLCBmYWxzZSk7XG4gICAgICB9O1xuXG4gICAgICB2YXIgX2Rpc2FibGUgPSBmYWNhZGUuZGlzYWJsZTtcbiAgICAgIGZhY2FkZS5kaXNhYmxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBfZGlzYWJsZSgpO1xuICAgICAgICBzZWxmLiRyZXNwb25zZS5wcm9wKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgbmV3IHB1YmxpYyBtZXRob2RzXG4gICAgICBmYWNhZGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuJHJlc3BvbnNlLnZhbChcIlwiKS50cmlnZ2VyKFwiY2hhbmdlZFwiKTtcbiAgICAgIH07XG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBRdWVzdGlvbjogQ3VzdG9tU2hvcnR0ZXh0LFxuICB9O1xufSk7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBU0E7QUFLQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFEQTtBQUlBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVBO0FBRUE7QUFDQTtBQUtBO0FBSUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQU1BO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBaEtBO0FBQ0E7QUFrS0E7QUFDQTtBQURBO0FBR0EiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./question.js\n");

/***/ })

/******/ });
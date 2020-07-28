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

eval("/*global LearnosityAmd*/\nLearnosityAmd.define([\"underscore-v1.5.2\", \"jquery-v1.10.2\"], function (_, $) {\n  \"use strict\";\n\n  function CustomShorttext(init, lrnUtils) {\n    this.init = init;\n    this.lrnUtils = lrnUtils;\n    this.question = init.question;\n    this.$el = init.$el;\n    this.setup();\n    init.events.trigger(\"ready\");\n  }\n\n  _.extend(CustomShorttext.prototype, {\n    render: function render() {\n      this.$el.html('<div><div class=\"input-wrapper\"><input type=\"text\" /></div></div>').append('<div data-lrn-component=\"suggestedAnswersList\"/>').append('<div data-lrn-component=\"checkAnswer\"/>');\n      this.$el.find(\"input\").width(this.question.width).height(this.question.height);\n      this.lrnUtils.renderComponent(\"CheckAnswerButton\", this.$el.find('[data-lrn-component=\"checkAnswer\"]').get(0));\n    },\n    setup: function setup() {\n      var init = this.init;\n      var events = init.events;\n      var facade = init.getFacade();\n      this.updatePublicMethods(facade);\n      this.render();\n      this.$response = $(\"input\", this.$el);\n      this.$correctAnswers = $(\".lrn_correctAnswers\", this.$el);\n\n      if (init.response) {\n        this.$response.val(init.response);\n      } // Developer is responsible to know when to clean up the validation UI as well as when to trigger the 'changed' event to update\n      // the model value\n\n\n      this.$response.on(\"focus\", function () {\n        this.clearValidationUI();\n        this.hideCorrectAnswers();\n      }.bind(this)).on(\"change\", function (event) {\n        events.trigger(\"changed\", event.currentTarget.value);\n      }); // \"validate\" event can be triggered when Check Answer button is clicked or when public method .validate() is called\n      // so developer needs to listen to this event to decide if he wants to display the correct answers to user or not\n      // options.showCorrectAnswers will tell if correct answers for this question should be display or not.\n      // The value showCorrectAnswers by default is the value of showCorrectAnswers inside initOptions object that is used\n      // to initialize question app or the value of the options that is passed into public method validate (like question.validate({showCorrectAnswers: false}))\n\n      events.on(\"validate\", function (options) {\n        var result = facade.isValid(); // Use facade.isValid(true) to get the detailed report\n\n        this.clearValidationUI();\n        this.showValidationUI(result);\n\n        if (!result && options.showCorrectAnswers) {\n          this.showCorrectAnswers();\n        }\n      }.bind(this));\n    },\n    showValidationUI: function showValidationUI(isCorrect) {\n      this.$el.find(\".input-wrapper\") // Add \"lrn_response_index_visible\" class if you want to display the index of current response\n      .addClass(\"lrn_response_index_visible\") // Add this class to display default Learnosity correct, incorrect style\n      .addClass(isCorrect ? \"lrn_correct\" : \"lrn_incorrect\") // After adding the class \"lrn_response_index_visible\", you then can inject the response index element\n      .prepend('<span class=\"lrn_responseIndex\"><span>1</span></span>') // Add this element if you want to display to corresponding validation (cross, tick) icon\n      .append('<span class=\"lrn_validation_icon\"/>');\n    },\n    clearValidationUI: function clearValidationUI() {\n      this.$correctAnswers.addClass(\"lrn_hide\").find(\".lrn_correctAnswerList\").empty();\n      var $validatedResponse = this.$el.find(\".input-wrapper\").removeClass(\"lrn_incorrect lrn_correct\");\n      $validatedResponse.find(\".lrn_validation_icon\").remove();\n      $validatedResponse.find(\".lrn_responseIndex\").remove();\n    },\n    showCorrectAnswers: function showCorrectAnswers() {\n      var self = this;\n      var correctAnswerText = _.getNested(this.question, \"valid_response\") || \"\";\n\n      var setAnswersToSuggestedList = function setAnswersToSuggestedList() {\n        // Pass in string to display correct answer list without the index\n        // this.suggestedAnswersList.setAnswers(correctAnswerText);\n        // Pass in an array of object which contains index and label to render a list\n        // of suggested answers\n        self.suggestedAnswersList.setAnswers([{\n          index: 0,\n          label: correctAnswerText\n        }]);\n      };\n\n      if (!this.suggestedAnswersList) {\n        this.lrnUtils.renderComponent(\"SuggestedAnswersList\", this.$el.find('[data-lrn-component=\"suggestedAnswersList\"]').get(0)).then(function (component) {\n          self.suggestedAnswersList = component;\n          setAnswersToSuggestedList();\n        });\n      } else {\n        setAnswersToSuggestedList();\n      }\n    },\n    hideCorrectAnswers: function hideCorrectAnswers() {\n      if (this.suggestedAnswersList) {\n        // Clear current suggsted answer list\n        this.suggestedAnswersList.reset();\n      }\n    },\n    updatePublicMethods: function updatePublicMethods(facade) {\n      var self = this; // Override mandatory public methods\n\n      var _enable = facade.enable;\n\n      facade.enable = function () {\n        _enable();\n\n        self.$response.prop(\"disabled\", false);\n      };\n\n      var _disable = facade.disable;\n\n      facade.disable = function () {\n        _disable();\n\n        self.$response.prop(\"disabled\", true);\n      }; // Add new public methods\n\n\n      facade.reset = function () {\n        self.$response.val(\"\").trigger(\"changed\");\n      };\n    }\n  });\n\n  return {\n    Question: CustomShorttext\n  };\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9xdWVzdGlvbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3F1ZXN0aW9uLmpzP2Q4YzciXSwic291cmNlc0NvbnRlbnQiOlsiLypnbG9iYWwgTGVhcm5vc2l0eUFtZCovXG5MZWFybm9zaXR5QW1kLmRlZmluZShbXCJ1bmRlcnNjb3JlLXYxLjUuMlwiLCBcImpxdWVyeS12MS4xMC4yXCJdLCBmdW5jdGlvbiAoXywgJCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBmdW5jdGlvbiBDdXN0b21TaG9ydHRleHQoaW5pdCwgbHJuVXRpbHMpIHtcbiAgICB0aGlzLmluaXQgPSBpbml0O1xuICAgIHRoaXMubHJuVXRpbHMgPSBscm5VdGlscztcbiAgICB0aGlzLnF1ZXN0aW9uID0gaW5pdC5xdWVzdGlvbjtcbiAgICB0aGlzLiRlbCA9IGluaXQuJGVsO1xuXG4gICAgdGhpcy5zZXR1cCgpO1xuXG4gICAgaW5pdC5ldmVudHMudHJpZ2dlcihcInJlYWR5XCIpO1xuICB9XG5cbiAgXy5leHRlbmQoQ3VzdG9tU2hvcnR0ZXh0LnByb3RvdHlwZSwge1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kZWxcbiAgICAgICAgLmh0bWwoXG4gICAgICAgICAgJzxkaXY+PGRpdiBjbGFzcz1cImlucHV0LXdyYXBwZXJcIj48aW5wdXQgdHlwZT1cInRleHRcIiAvPjwvZGl2PjwvZGl2PidcbiAgICAgICAgKVxuICAgICAgICAuYXBwZW5kKCc8ZGl2IGRhdGEtbHJuLWNvbXBvbmVudD1cInN1Z2dlc3RlZEFuc3dlcnNMaXN0XCIvPicpXG4gICAgICAgIC5hcHBlbmQoJzxkaXYgZGF0YS1scm4tY29tcG9uZW50PVwiY2hlY2tBbnN3ZXJcIi8+Jyk7XG5cbiAgICAgIHRoaXMuJGVsXG4gICAgICAgIC5maW5kKFwiaW5wdXRcIilcbiAgICAgICAgLndpZHRoKHRoaXMucXVlc3Rpb24ud2lkdGgpXG4gICAgICAgIC5oZWlnaHQodGhpcy5xdWVzdGlvbi5oZWlnaHQpO1xuXG4gICAgICB0aGlzLmxyblV0aWxzLnJlbmRlckNvbXBvbmVudChcbiAgICAgICAgXCJDaGVja0Fuc3dlckJ1dHRvblwiLFxuICAgICAgICB0aGlzLiRlbC5maW5kKCdbZGF0YS1scm4tY29tcG9uZW50PVwiY2hlY2tBbnN3ZXJcIl0nKS5nZXQoMClcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHNldHVwOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaW5pdCA9IHRoaXMuaW5pdDtcbiAgICAgIHZhciBldmVudHMgPSBpbml0LmV2ZW50cztcbiAgICAgIHZhciBmYWNhZGUgPSBpbml0LmdldEZhY2FkZSgpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVB1YmxpY01ldGhvZHMoZmFjYWRlKTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuJHJlc3BvbnNlID0gJChcImlucHV0XCIsIHRoaXMuJGVsKTtcbiAgICAgIHRoaXMuJGNvcnJlY3RBbnN3ZXJzID0gJChcIi5scm5fY29ycmVjdEFuc3dlcnNcIiwgdGhpcy4kZWwpO1xuXG4gICAgICBpZiAoaW5pdC5yZXNwb25zZSkge1xuICAgICAgICB0aGlzLiRyZXNwb25zZS52YWwoaW5pdC5yZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIERldmVsb3BlciBpcyByZXNwb25zaWJsZSB0byBrbm93IHdoZW4gdG8gY2xlYW4gdXAgdGhlIHZhbGlkYXRpb24gVUkgYXMgd2VsbCBhcyB3aGVuIHRvIHRyaWdnZXIgdGhlICdjaGFuZ2VkJyBldmVudCB0byB1cGRhdGVcbiAgICAgIC8vIHRoZSBtb2RlbCB2YWx1ZVxuICAgICAgdGhpcy4kcmVzcG9uc2VcbiAgICAgICAgLm9uKFxuICAgICAgICAgIFwiZm9jdXNcIixcbiAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVmFsaWRhdGlvblVJKCk7XG4gICAgICAgICAgICB0aGlzLmhpZGVDb3JyZWN0QW5zd2VycygpO1xuICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICApXG4gICAgICAgIC5vbihcImNoYW5nZVwiLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBldmVudHMudHJpZ2dlcihcImNoYW5nZWRcIiwgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAvLyBcInZhbGlkYXRlXCIgZXZlbnQgY2FuIGJlIHRyaWdnZXJlZCB3aGVuIENoZWNrIEFuc3dlciBidXR0b24gaXMgY2xpY2tlZCBvciB3aGVuIHB1YmxpYyBtZXRob2QgLnZhbGlkYXRlKCkgaXMgY2FsbGVkXG4gICAgICAvLyBzbyBkZXZlbG9wZXIgbmVlZHMgdG8gbGlzdGVuIHRvIHRoaXMgZXZlbnQgdG8gZGVjaWRlIGlmIGhlIHdhbnRzIHRvIGRpc3BsYXkgdGhlIGNvcnJlY3QgYW5zd2VycyB0byB1c2VyIG9yIG5vdFxuICAgICAgLy8gb3B0aW9ucy5zaG93Q29ycmVjdEFuc3dlcnMgd2lsbCB0ZWxsIGlmIGNvcnJlY3QgYW5zd2VycyBmb3IgdGhpcyBxdWVzdGlvbiBzaG91bGQgYmUgZGlzcGxheSBvciBub3QuXG4gICAgICAvLyBUaGUgdmFsdWUgc2hvd0NvcnJlY3RBbnN3ZXJzIGJ5IGRlZmF1bHQgaXMgdGhlIHZhbHVlIG9mIHNob3dDb3JyZWN0QW5zd2VycyBpbnNpZGUgaW5pdE9wdGlvbnMgb2JqZWN0IHRoYXQgaXMgdXNlZFxuICAgICAgLy8gdG8gaW5pdGlhbGl6ZSBxdWVzdGlvbiBhcHAgb3IgdGhlIHZhbHVlIG9mIHRoZSBvcHRpb25zIHRoYXQgaXMgcGFzc2VkIGludG8gcHVibGljIG1ldGhvZCB2YWxpZGF0ZSAobGlrZSBxdWVzdGlvbi52YWxpZGF0ZSh7c2hvd0NvcnJlY3RBbnN3ZXJzOiBmYWxzZX0pKVxuICAgICAgZXZlbnRzLm9uKFxuICAgICAgICBcInZhbGlkYXRlXCIsXG4gICAgICAgIGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IGZhY2FkZS5pc1ZhbGlkKCk7IC8vIFVzZSBmYWNhZGUuaXNWYWxpZCh0cnVlKSB0byBnZXQgdGhlIGRldGFpbGVkIHJlcG9ydFxuXG4gICAgICAgICAgdGhpcy5jbGVhclZhbGlkYXRpb25VSSgpO1xuICAgICAgICAgIHRoaXMuc2hvd1ZhbGlkYXRpb25VSShyZXN1bHQpO1xuXG4gICAgICAgICAgaWYgKCFyZXN1bHQgJiYgb3B0aW9ucy5zaG93Q29ycmVjdEFuc3dlcnMpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvcnJlY3RBbnN3ZXJzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICk7XG4gICAgfSxcblxuICAgIHNob3dWYWxpZGF0aW9uVUk6IGZ1bmN0aW9uIChpc0NvcnJlY3QpIHtcbiAgICAgIHRoaXMuJGVsXG4gICAgICAgIC5maW5kKFwiLmlucHV0LXdyYXBwZXJcIilcbiAgICAgICAgLy8gQWRkIFwibHJuX3Jlc3BvbnNlX2luZGV4X3Zpc2libGVcIiBjbGFzcyBpZiB5b3Ugd2FudCB0byBkaXNwbGF5IHRoZSBpbmRleCBvZiBjdXJyZW50IHJlc3BvbnNlXG4gICAgICAgIC5hZGRDbGFzcyhcImxybl9yZXNwb25zZV9pbmRleF92aXNpYmxlXCIpXG4gICAgICAgIC8vIEFkZCB0aGlzIGNsYXNzIHRvIGRpc3BsYXkgZGVmYXVsdCBMZWFybm9zaXR5IGNvcnJlY3QsIGluY29ycmVjdCBzdHlsZVxuICAgICAgICAuYWRkQ2xhc3MoaXNDb3JyZWN0ID8gXCJscm5fY29ycmVjdFwiIDogXCJscm5faW5jb3JyZWN0XCIpXG4gICAgICAgIC8vIEFmdGVyIGFkZGluZyB0aGUgY2xhc3MgXCJscm5fcmVzcG9uc2VfaW5kZXhfdmlzaWJsZVwiLCB5b3UgdGhlbiBjYW4gaW5qZWN0IHRoZSByZXNwb25zZSBpbmRleCBlbGVtZW50XG4gICAgICAgIC5wcmVwZW5kKCc8c3BhbiBjbGFzcz1cImxybl9yZXNwb25zZUluZGV4XCI+PHNwYW4+MTwvc3Bhbj48L3NwYW4+JylcbiAgICAgICAgLy8gQWRkIHRoaXMgZWxlbWVudCBpZiB5b3Ugd2FudCB0byBkaXNwbGF5IHRvIGNvcnJlc3BvbmRpbmcgdmFsaWRhdGlvbiAoY3Jvc3MsIHRpY2spIGljb25cbiAgICAgICAgLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJscm5fdmFsaWRhdGlvbl9pY29uXCIvPicpO1xuICAgIH0sXG5cbiAgICBjbGVhclZhbGlkYXRpb25VSTogZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kY29ycmVjdEFuc3dlcnNcbiAgICAgICAgLmFkZENsYXNzKFwibHJuX2hpZGVcIilcbiAgICAgICAgLmZpbmQoXCIubHJuX2NvcnJlY3RBbnN3ZXJMaXN0XCIpXG4gICAgICAgIC5lbXB0eSgpO1xuXG4gICAgICB2YXIgJHZhbGlkYXRlZFJlc3BvbnNlID0gdGhpcy4kZWxcbiAgICAgICAgLmZpbmQoXCIuaW5wdXQtd3JhcHBlclwiKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoXCJscm5faW5jb3JyZWN0IGxybl9jb3JyZWN0XCIpO1xuXG4gICAgICAkdmFsaWRhdGVkUmVzcG9uc2UuZmluZChcIi5scm5fdmFsaWRhdGlvbl9pY29uXCIpLnJlbW92ZSgpO1xuICAgICAgJHZhbGlkYXRlZFJlc3BvbnNlLmZpbmQoXCIubHJuX3Jlc3BvbnNlSW5kZXhcIikucmVtb3ZlKCk7XG4gICAgfSxcblxuICAgIHNob3dDb3JyZWN0QW5zd2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgdmFyIGNvcnJlY3RBbnN3ZXJUZXh0ID1cbiAgICAgICAgXy5nZXROZXN0ZWQodGhpcy5xdWVzdGlvbiwgXCJ2YWxpZF9yZXNwb25zZVwiKSB8fCBcIlwiO1xuICAgICAgdmFyIHNldEFuc3dlcnNUb1N1Z2dlc3RlZExpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFBhc3MgaW4gc3RyaW5nIHRvIGRpc3BsYXkgY29ycmVjdCBhbnN3ZXIgbGlzdCB3aXRob3V0IHRoZSBpbmRleFxuICAgICAgICAvLyB0aGlzLnN1Z2dlc3RlZEFuc3dlcnNMaXN0LnNldEFuc3dlcnMoY29ycmVjdEFuc3dlclRleHQpO1xuXG4gICAgICAgIC8vIFBhc3MgaW4gYW4gYXJyYXkgb2Ygb2JqZWN0IHdoaWNoIGNvbnRhaW5zIGluZGV4IGFuZCBsYWJlbCB0byByZW5kZXIgYSBsaXN0XG4gICAgICAgIC8vIG9mIHN1Z2dlc3RlZCBhbnN3ZXJzXG4gICAgICAgIHNlbGYuc3VnZ2VzdGVkQW5zd2Vyc0xpc3Quc2V0QW5zd2VycyhbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICBsYWJlbDogY29ycmVjdEFuc3dlclRleHQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoIXRoaXMuc3VnZ2VzdGVkQW5zd2Vyc0xpc3QpIHtcbiAgICAgICAgdGhpcy5scm5VdGlsc1xuICAgICAgICAgIC5yZW5kZXJDb21wb25lbnQoXG4gICAgICAgICAgICBcIlN1Z2dlc3RlZEFuc3dlcnNMaXN0XCIsXG4gICAgICAgICAgICB0aGlzLiRlbC5maW5kKCdbZGF0YS1scm4tY29tcG9uZW50PVwic3VnZ2VzdGVkQW5zd2Vyc0xpc3RcIl0nKS5nZXQoMClcbiAgICAgICAgICApXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgICAgICAgICAgc2VsZi5zdWdnZXN0ZWRBbnN3ZXJzTGlzdCA9IGNvbXBvbmVudDtcblxuICAgICAgICAgICAgc2V0QW5zd2Vyc1RvU3VnZ2VzdGVkTGlzdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0QW5zd2Vyc1RvU3VnZ2VzdGVkTGlzdCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBoaWRlQ29ycmVjdEFuc3dlcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnN1Z2dlc3RlZEFuc3dlcnNMaXN0KSB7XG4gICAgICAgIC8vIENsZWFyIGN1cnJlbnQgc3VnZ3N0ZWQgYW5zd2VyIGxpc3RcbiAgICAgICAgdGhpcy5zdWdnZXN0ZWRBbnN3ZXJzTGlzdC5yZXNldCgpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB1cGRhdGVQdWJsaWNNZXRob2RzOiBmdW5jdGlvbiAoZmFjYWRlKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgIC8vIE92ZXJyaWRlIG1hbmRhdG9yeSBwdWJsaWMgbWV0aG9kc1xuICAgICAgdmFyIF9lbmFibGUgPSBmYWNhZGUuZW5hYmxlO1xuICAgICAgZmFjYWRlLmVuYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX2VuYWJsZSgpO1xuICAgICAgICBzZWxmLiRyZXNwb25zZS5wcm9wKFwiZGlzYWJsZWRcIiwgZmFsc2UpO1xuICAgICAgfTtcblxuICAgICAgdmFyIF9kaXNhYmxlID0gZmFjYWRlLmRpc2FibGU7XG4gICAgICBmYWNhZGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX2Rpc2FibGUoKTtcbiAgICAgICAgc2VsZi4kcmVzcG9uc2UucHJvcChcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgfTtcblxuICAgICAgLy8gQWRkIG5ldyBwdWJsaWMgbWV0aG9kc1xuICAgICAgZmFjYWRlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLiRyZXNwb25zZS52YWwoXCJcIikudHJpZ2dlcihcImNoYW5nZWRcIik7XG4gICAgICB9O1xuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgUXVlc3Rpb246IEN1c3RvbVNob3J0dGV4dCxcbiAgfTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQU9BO0FBS0E7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQURBO0FBSUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBVUE7QUFFQTtBQUNBO0FBS0E7QUFJQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFGQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBTUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUE3SkE7QUFDQTtBQStKQTtBQUNBO0FBREE7QUFHQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./question.js\n");

/***/ })

/******/ });
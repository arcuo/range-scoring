/*global LearnosityAmd*/
LearnosityAmd.define(["underscore-v1.5.2", "jquery-v1.10.2"], function (_, $) {
  "use strict";

  function CustomShorttext(init, tools) {
    this.init = init;
    this.tools = tools;
    this.question = init.question;
    this.$el = init.$el;
    this.setup();

    init.events.trigger("ready");
  }

  _.extend(CustomShorttext.prototype, {
    render: function () {
      this.$el
        .html(
          '<div><div class="input-wrapper"><input type="number" pattern="\\d*" /></div></div>'
        )
        .append('<div data-lrn-component="range_scoring_max"/>')
        .append('<div data-lrn-component="range_scoring_min"/>');
    },

    setup: function () {
      var init = this.init;
      var events = init.events;
      var facade = init.getFacade();
      var max = this.question.range_scoring_max;
      var min = this.question.range_scoring_min;

      this.updatePublicMethods(facade);
      this.render();

      this.$response = $("input", this.$el);
      this.$response.attr("max", max);
      this.$response.attr("min", min);

      if (init.response) {
        this.$response.val(init.response);
      }

      // Developer is responsible to know when to clean up the validation UI as well as when to trigger the 'changed' event to update
      // the model value
      this.$response
        .on(
          "focus",
          function () {
            this.clearValidationUI();
          }.bind(this)
        )
        .on("change", function (event) {
          events.trigger("changed", event.currentTarget.value);
        })
        // Prevent other than integer
        .on("keypress", function (event) {
          var char = event.which;
          return char === 45 || 48 <= char && char <= 57;
        });

      // "validate" event can be triggered when Check Answer button is clicked or when public method .validate() is called
      // so developer needs to listen to this event to decide if he wants to display the correct answers to user or not
      // options.showCorrectAnswers will tell if correct answers for this question should be display or not.
      // The value showCorrectAnswers by default is the value of showCorrectAnswers inside initOptions object that is used
      // to initialize question app or the value of the options that is passed into public method validate (like question.validate({showCorrectAnswers: false}))
      events.on(
        "validate",
        function (options) {
          var result = facade.isValid(); // Use facade.isValid(true) to get the detailed report

          this.clearValidationUI();
          this.showValidationUI(result);
        }.bind(this)
      );
    },

    showValidationUI: function (isCorrect) {
      this.$el
        .find(".input-wrapper")
        // Add "lrn_response_index_visible" class if you want to display the index of current response
        .addClass("lrn_response_index_visible")
        // Add this class to display default Learnosity correct, incorrect style
        .addClass(isCorrect ? "lrn_correct" : "lrn_incorrect")
        // After adding the class "lrn_response_index_visible", you then can inject the response index element
        // .prepend('<span class="lrn_responseIndex"><span>1</span></span>')
        // Add this element if you want to display to corresponding validation (cross, tick) icon
        .append('<span class="lrn_validation_icon"/>');
    },

    clearValidationUI: function () {
      var $validatedResponse = this.$el
        .find(".input-wrapper")
        .removeClass("lrn_incorrect lrn_correct");

      $validatedResponse.find(".lrn_validation_icon").remove();
      $validatedResponse.find(".lrn_responseIndex").remove();
    },

    updatePublicMethods: function (facade) {
      var self = this;

      // Override mandatory public methods
      var _enable = facade.enable;
      facade.enable = function () {
        _enable();
        self.$response.prop("disabled", false);
      };

      var _disable = facade.disable;
      facade.disable = function () {
        _disable();
        self.$response.prop("disabled", true);
      };

      // Add new public methods
      facade.reset = function () {
        self.$response.val("").trigger("changed");
      };
    },
  });

  return {
    Question: CustomShorttext,
  };
});

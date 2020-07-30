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
        .addClass("question-wrapper")
        .html(
          `<div class="input-wrapper ui action input" >
            <button class="decrease ui button">-</button>
            <input id="response" type="number" />
            <button class="increase ui button">+</button>
          </div>`
        )
        .prepend(
          '<div class="input-label" data-lrn-component="range_scoring_min"/>'
        )
        .append(
          '<div class="input-label" data-lrn-component="range_scoring_max"/>'
        );
    },

    setup: function () {
      var init = this.init;
      var events = init.events;
      var facade = init.getFacade();
      var max = this.question.range_scoring_max;
      var min = this.question.range_scoring_min;

      this.updatePublicMethods(facade);
      this.render();

      // Add attributes to input
      this.$input = $("input", this.$el).attr("max", max).attr("min", min);
      if (!this.$input.attr("value")) {
        var middle = min + max / 2;
        this.$input.attr("value", middle); // Default start value to middle point
        events.trigger("changed", middle);
      }

      this.dom_input = document.getElementById("response");
      const increase = function () {
        this.dom_input.stepUp();
        events.trigger("changed", this.dom_input.value);
      }.bind(this);
      const decrease = function () {
        this.dom_input.stepDown();
        events.trigger("changed", this.dom_input.value);
      }.bind(this);
      var increasing = false;
      var decreasing = false;
      var keydown = false;

      const hold = function (direction) {
        const dir = direction === "add";
        var repeater = setInterval(
          function () {
            if (!decreasing && !increasing) {
              clearInterval(repeater);
              return;
            }
            dir ? increase() : decrease();
          }.bind(this),
          50
        );
      }.bind(this);

      // Increase/Decrease buttons
      this.$inc = $("button.increase", this.$el).on(
        "mousedown keydown",
        (evt) => {
          if (
            (evt.type == "keydown" && evt.which == 13 && !keydown) ||
            evt.type == "mousedown"
          ) {
            keydown = true;
            increase();
            increasing = true;
            setTimeout(() => {
              if (increasing) {
                hold("add");
              }
            }, 500);
          }
        }
      );
      this.$inc = $("button.increase", this.$el).on("mouseup keyup", () => {
        keydown = false;
        increasing = false;
      });

      this.$inc = $("button.decrease", this.$el).on(
        "mousedown keydown",
        (evt) => {
          if (
            (evt.type == "keydown" && evt.which == 13 && !keydown) ||
            evt.type == "mousedown"
          ) {
            keydown = true;
            decrease();
            decreasing = true;
            setTimeout(() => {
              if (decreasing) {
                hold("sub");
              }
            }, 500);
          }
        }
      );
      this.$inc = $("button.decrease", this.$el).on("mouseup keyup", () => {
        keydown = false;
        decreasing = false;
      });

      // Labels
      this.$min = $(
        "div[data-lrn-component='range_scoring_min']",
        this.$el
      ).html(`${min} \u2264`);
      this.$max = $(
        "div[data-lrn-component='range_scoring_max']",
        this.$el
      ).html(`\u2264 ${max}`);

      if (init.response) {
        this.$input.val(init.response);
      }

      // trigger the 'changed' event to update the model value
      this.$input
        .on("change", function (event) {
          events.trigger("changed", event.currentTarget.value);
        })
        // Prevent other than integer when writing
        .on("keypress", function (event) {
          var char = event.which;
          return char === 45 || char === 13 || (48 <= char && char <= 57);
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
        // .addClass("lrn_response_index_visible")
        // Add this class to display default Learnosity correct, incorrect style
        .addClass(isCorrect ? "correct" : "incorrect")
        // After adding the class "lrn_response_index_visible", you then can inject the response index element
        // .prepend('<span class="lrn_responseIndex"><span>1</span></span>')
        // Add this element if you want to display to corresponding validation (cross, tick) icon
        // .append('<span class="lrn_validation_icon"/>');
    },

    clearValidationUI: function () {
      var $validatedResponse = this.$el
        .find(".input-wrapper")
        .removeClass("correct incorrect");

      // $validatedResponse.find(".lrn_validation_icon").remove();
      // $validatedResponse.find(".lrn_responseIndex").remove();
    },

    updatePublicMethods: function (facade) {
      var self = this;

      // Override mandatory public methods
      var _enable = facade.enable;
      facade.enable = function () {
        _enable();
        self.$input.prop("disabled", false);
      };

      var _disable = facade.disable;
      facade.disable = function () {
        _disable();
        self.$input.prop("disabled", true);
      };

      // Add new public methods
      facade.reset = function () {
        self.$input.val("").trigger("changed");
      };
    },
  });

  return {
    Question: CustomShorttext,
  };
});

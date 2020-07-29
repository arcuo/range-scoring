/*global LearnosityAmd*/
LearnosityAmd.define(["underscore-v1.5.2"], function (_) {
  "use strict";

  function CustomShorttextScorer(question, response) {
    this.question = question;
    this.response = parseInt(response);
    this.max = question.range_scoring_max;
    this.min = question.range_scoring_min;

  }

  _.extend(CustomShorttextScorer.prototype, {
    isValid: function () {
      return this.min <= this.response && this.response <= this.max;
    },

    score: function () {
      return this.isValid() ? this.response : this.min;
    },

    maxScore: function () {
      return this.max;
    },

    canValidateResponse: function () {
      return (!!this.max || this.max === 0) && (!!this.min || this.min === 0);
    },
  });

  return {
    Scorer: CustomShorttextScorer,
  };
});

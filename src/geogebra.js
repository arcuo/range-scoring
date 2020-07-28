LearnosityAmd.define([
    'jquery-v1.10.2'
], function ($) {
    'use strict';

    var templates = {
        modal: '<div class="geogebra-exercise"></div>'
    };
    var libLoaded = false;
    var matApiParameters = ["enableRightClick", "showToolBar", "showMenuBar",
        "showAlgebraInput", "enableShiftDragZoom", "allowStyleBar"];
    var callbacks = null;
    function loadDependencies(callback) {
        var loadScript = function (src) {
            var status = $.Deferred();
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = src;
            script.onload = status.resolve;
            head.appendChild(script);

            return status.promise();
        };
        if(callbacks === null){
            callbacks = [callback];
            $.when(
                loadScript('https://cdn.geogebra.org/apps/deployggb.js')
            ).done(function () {
                libLoaded = true;
                callbacks && callbacks.forEach(function(fn){fn()});
            });
        } else {
            callbacks.push(callback);
        }
    }

    function GeogebraExercise(options, tools) {
        this.questionsApiVersion = options.questionsApiVersion;
        this.renderComponent = tools.renderComponent;
        this.events = options.events;
        this.validatePermanent = true;
        this.$el = options.$el;
        this.question = options.question;
        this.response = options.response || {};
        this.questionState = options.state;
        this.loadCallbacks = [];
        var modalId = this.modalId = 'ggbApplet_' + Math.round(Math.random() * 1E12);
        var facade = options.getFacade();
        var that = this;
        facade.showSolution = function() {
            that.afterLoaded(function() {
                window[modalId].setValue("showsolution", true);
            });
        };

        this.events.on("validate", function (validationEvent) {
            that.afterLoaded(function() {
                that.showValidation(validationEvent);
            });
        });

        if (!libLoaded) {
            loadDependencies(function () {
                this.render();
            }.bind(this));
        } else {
            this.render();
        }
        this.events.trigger('ready');
    }

    function computeSeed(responseId){
        var h=0;
        for (var i = 8; i < responseId.length; i += 8) {
            h = h ^ parseInt(responseId.substring(i - 8, i));
        }
        return Math.abs(h);
    }

    function extend(prot, fns) {
        for (var k in fns) {
            prot[k] = fns[k];
        }
    }

    extend(GeogebraExercise.prototype, {
        afterLoaded: function(callback) {
            var modalId = this.modalId;
            if (window[modalId] && window[modalId].setValue) {
                callback();
            } else {
                this.loadCallbacks.push(callback);
            }
        },

        render: function () {
            this.$body = $('body');
            this.createModal(this.question, this.response, this.questionState === "review");
        },

        showValidation: function(options) {
            this.blockListeners = true;
            var showAnswer = window[this.modalId].getValueString("showanswer");
            if (showAnswer && options && options.showCorrectAnswers) {
                window[this.modalId].setValue("showanswer", 1);
            } else {
                window[this.modalId].setValue("validate", 1);
            }

            this.blockListeners = false;
        },
        parseAdvanced: function(question, defaultOptions) {
            console.log(question.advanced);
            try {
                var advanced = JSON.parse(question.advanced || "{}");
                for (var key in advanced) {
                    if (advanced.hasOwnProperty(key)) {
                        defaultOptions[key] = advanced[key];
                    }
                }
            } catch(e) {
                console.log("Error handling advanced properties: " + question.advanced);
            }
        },
        createModal: function (question, response, review) {
            function setMaterial(opt, url) {
                if (url.match(/ggbm.at/) || url.match(/geogebra.org\/m/)) {
                    opt.material_id = url.split("/").reverse()[0];
                } else {
                    opt.filename = url;
                }
            }
            this.$el.empty();
            $("<div class=\"ggb-validation\">").appendTo(this.$el);
            var that = this;
            var $modal = $(templates.modal).appendTo(this.$el);
            if (question.instant_feedback && !review) {
                var button = $("<div/>");
                this.renderComponent("CheckAnswerButton", button[0]);
                button.appendTo(this.$el);
                button.on("click", function () {
                    that.validatePermanent = false;
                });
            }
            var modalId = this.modalId;
            var events = window.levents = this.events;
            var updateScore = function (objName, undoPoint) {
                var val = window[modalId].getExerciseFraction();
                if (val < 1 && objName != "validate" && window[modalId].getValue("validate") > 0
                    && !that.blockListeners && !that.validatePermanent) {
                    window[modalId].setValue("validate", 0);
                }
                if (response.fraction != val || undoPoint) {
                    var evt = {"base64": window[modalId].getBase64(), "fraction": val};
                    for (var idx = 0; idx < matApiParameters.length; idx++) {
                        evt[matApiParameters[idx]] = $modal.find("article").attr("data-param-" + matApiParameters[idx]);
                    }
                    events.trigger("changed", evt);
                }
                response.fraction = val;
            }
            var height = question.height || 550;
            this.$el.css("minHeight", height);
            var defaultOptions = {
                "id": modalId,
                "width": question.width || 750,
                "height": height,
                "borderColor": null,
                "enableLabelDrags": false,
                "showLogging": false,
                "useBrowserForJS": false,
                "scaleContainerClass": "learnosity-item",
                "randomSeed": computeSeed(this.question.response_id),
                "appletOnLoad": function (api) {
                    updateScore("validate");
                    $.each(that.loadCallbacks, Object.call);
                    that.loadCallbacks = [];
                    if (review) {
                        var elements = api.getAllObjectNames();
                        for(var k=0; k < elements.length; k++){
                            api.setFixed(elements[k], true, false);
                        }
                    } else {
                        window[modalId].registerUpdateListener(updateScore, question.scoring_object);
                        window[modalId].registerStoreUndoListener(function (a) {
                            updateScore(a, true);
                        });
                    }
                }
            };
            this.parseAdvanced(question, defaultOptions);
            if (response.base64) {
                for (var idx = 0; idx < matApiParameters.length; idx++) {
                    defaultOptions[matApiParameters[idx]] = response[matApiParameters[idx]];
                }
                defaultOptions.ggbBase64 = response.base64;
            } else {
                setMaterial(defaultOptions, question.material || "");
            }

            // Initialise
            this.appletInstance = new GGBApplet(defaultOptions, "5.0", true);
            // Render
            this.appletInstance.inject($modal[0], 'preferhtml5');

            this.$modal = $modal;
        }

    });

    function GeoGebraScorer(question, response) {
        this.question = question;
        this.response = response;
    }

    /* Is the response correct?
     * @return boolean
     */
    GeoGebraScorer.prototype.isValid = function () {
        return this.response && this.response.fraction > 0;
    };

    /* The score for the current response.
     * @return float
     */
    GeoGebraScorer.prototype.score = function () {
        return this.response ? this.response.fraction * this.maxScore() : 0;
    };

    /* The maximum score for this question.
     * @return float
     */
    GeoGebraScorer.prototype.maxScore = function () {
        return parseFloat(this.question.max_score) || 1;
    };

    GeoGebraScorer.prototype.canValidateResponse = function () {
        return true;
    }

    return {
        Question: GeogebraExercise,
        Scorer: GeoGebraScorer
    };
});

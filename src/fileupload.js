(window.LearnosityAmd = window.LearnosityAmd || []).push([[29], {
    215: function(e, t, i) {
        "use strict";
        i(1);
        var n = i(0)
          , a = i.n(n)
          , o = i(5)
          , s = i.n(o);
        function _defineProperties(e, t) {
            for (var i = 0; i < t.length; i++) {
                var n = t[i];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n)
            }
        }
        function _createClass(e, t, i) {
            return t && _defineProperties(e.prototype, t),
            i && _defineProperties(e, i),
            e
        }
        var l = ["keydown", "keyup"]
          , r = {
            arrowDown: "keydown:arrowDown",
            arrowLeft: "keydown:arrowLeft",
            arrowRight: "keydown:arrowRight",
            arrowUp: "keydown:arrowUp",
            comboShiftArrowDown: "combo:shiftArrowDown",
            comboShiftArrowLeft: "combo:shiftArrowLeft",
            comboShiftArrowRight: "combo:shiftArrowRight",
            comboShiftArrowUp: "combo:shiftArrowUp",
            enter: "keydown:enter",
            escape: "keydown:escape",
            shift: "keydown:shift"
        }
          , d = {
            arrowDown: 40,
            arrowLeft: 37,
            arrowRight: 39,
            arrowUp: 38,
            enter: 13,
            escape: 27,
            shift: 16,
            space: 32,
            tab: 9
        }
          , c = {
            comboShiftArrowDown: [d.shift, d.arrowDown],
            comboShiftArrowLeft: [d.shift, d.arrowLeft],
            comboShiftArrowRight: [d.shift, d.arrowRight],
            comboShiftArrowUp: [d.shift, d.arrowUp]
        }
          , p = "lrn_questions_key_emitter"
          , u = function getKeyName(e) {
            return a.a.findKey(d, (function(t) {
                return e === t
            }
            ))
        }
          , _ = function() {
            function KeyEmitter(e) {
                var t = this;
                !function _classCallCheck(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }(this, KeyEmitter),
                this.$el = e,
                this._jqNamespace = "." + p + "_" + a.a.uniqueId(),
                this._elEvents = {},
                this._keysDown = [],
                l.forEach((function(e) {
                    t._elEvents[e] = e + "." + t._jqNamespace
                }
                )),
                a.a.bindAll(this, "_onKeydown", "_onKeyup"),
                this._addListeners()
            }
            return _createClass(KeyEmitter, null, [{
                key: "keyIs",
                value: function keyIs(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return a.a.isNumber(t.keyCode) && e === u(t.keyCode)
                }
            }, {
                key: "events",
                get: function get() {
                    return r
                }
            }, {
                key: "keys",
                get: function get() {
                    return d
                }
            }]),
            _createClass(KeyEmitter, [{
                key: "remove",
                value: function remove() {
                    var e = this;
                    this.$el && (a.a.each(this._elEvents, (function(t) {
                        return e.$el.off(t)
                    }
                    )),
                    this.$el = null)
                }
            }, {
                key: "_addListeners",
                value: function _addListeners() {
                    this.$el.on(this._elEvents.keydown, this._onKeydown),
                    this.$el.on(this._elEvents.keyup, this._onKeyup)
                }
            }, {
                key: "_getKeyCombo",
                value: function _getKeyCombo() {
                    var e = this;
                    return a.a.findKey(c, (function(t) {
                        return a.a.isEqual(t, e._keysDown)
                    }
                    ))
                }
            }, {
                key: "_onKeydown",
                value: function _onKeydown(e) {
                    var t = u(e.keyCode);
                    if (t) {
                        this._keysDown.push(e.keyCode);
                        var i = this._getKeyCombo()
                          , n = r[i || t];
                        n && this.trigger(n, e)
                    }
                }
            }, {
                key: "_onKeyup",
                value: function _onKeyup(e) {
                    u(e.keyCode) && (this._keysDown = a.a.without(this._keysDown, e.keyCode))
                }
            }]),
            KeyEmitter
        }();
        a()(_.prototype).assign(s.a.Events),
        t.a = _
    },
    400: function(e, t, i) {
        "use strict";
        i(0);
        var n = i(1)
          , a = i.n(n)
          , o = i(5)
          , s = i.n(o)
          , l = i(401)
          , r = i.n(l)
          , d = i(215);
        t.a = s.a.View.extend({
            CONTAINER_CLASS: "lrn-response-modal-container",
            VISIBILITY_CLASS: "lrn-response-modal-is-visible",
            UI_SELECTORS: {
                content: ".lrn-response-modal-content",
                wrapper: ".lrn-response-modal-content-wrapper"
            },
            className: "lrn-response-modal",
            events: {
                'click [data-action="lrnResponseModalClose"]': "onDismiss",
                'touchend [data-action="lrnResponseModalClose"]': "onDismiss"
            },
            template: r.a,
            initialize: function initialize(e) {
                this.options = e,
                this.addKeyboardEvents()
            },
            addKeyboardEvents: function addKeyboardEvents() {
                this.keyEmitter = new d.a(a()(document)),
                this.listenTo(this.keyEmitter, d.a.events.escape, this.onDismiss)
            },
            onDismiss: function onDismiss(e) {
                var t = !0
                  , i = {
                    preventDefault: function preventDefault() {
                        t = !1
                    }
                };
                this.trigger("dismiss", i),
                t && this.remove({
                    wasDismissed: !0
                }),
                e.preventDefault()
            },
            remove: function remove(e) {
                this.options.contentView.remove(e),
                this.removeMinHeight(),
                this.removeKeyboardEvents(),
                s.a.View.prototype.remove.call(this),
                this.trigger("remove", e)
            },
            removeKeyboardEvents: function removeKeyboardEvents() {
                this.keyEmitter && (this.stopListening(this.keyEmitter),
                this.keyEmitter.remove(),
                this.keyEmitter = null)
            },
            removeMinHeight: function removeMinHeight() {
                this.$el.parent().css("min-height", "")
            },
            render: function render() {
                var e = this.template({})
                  , t = this.options.contentView.render().$el;
                return this.$el.html(e),
                this.$(this.UI_SELECTORS.content).append(t),
                this
            },
            setMinHeight: function setMinHeight() {
                var e = this.$(this.UI_SELECTORS.wrapper)
                  , t = window.parseInt(e.css("margin-top"))
                  , i = e.outerHeight() + 2 * t;
                this.$el.parent().css({
                    minHeight: i
                })
            },
            show: function show() {
                return this.toggleContainerClass(!0),
                this.toggleVisibility(!0),
                this.setMinHeight(),
                this
            },
            toggleContainerClass: function toggleContainerClass(e) {
                this.$el.parent().toggleClass(this.CONTAINER_CLASS, e)
            },
            toggleVisibility: function toggleVisibility(e) {
                this.$el.toggleClass(this.VISIBILITY_CLASS, e)
            }
        })
    },
    401: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<div class="lrn-response-modal-content-wrapper"><div class="lrn-response-modal-header"><button class="close lrn-response-modal-header-close" data-action="lrnResponseModalClose" type="button"><span>&times;</span></button></div><div class="lrn-response-modal-content"></div></div>';
            return __p
        }
    },
    572: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<div class="lrn-toolbar lrn_clearfix" data-lrn-component="toolbar"><button type="button" title="' + (null == (__t = displayLogic.labels.fileUpload.uploadFiles) ? "" : _.escape(__t)) + '" class="lrn_btn lrn-fileupload-upload-btn" aria-label="' + (null == (__t = displayLogic.labels.fileUpload.uploadFiles) ? "" : _.escape(__t)) + '"',
                (displayLogic.isReadOnly || displayLogic.maxNumberFilesUploaded) && (__p += 'disabled="disabled"'),
                __p += '><span class="lrn_icon lrn-icon-upload"></span><span class="sr-only">' + (null == (__t = displayLogic.labels.fileUpload.uploadFiles) ? "" : _.escape(__t)) + "</span></button>",
                displayLogic.canLaunchWebcam && displayLogic.isPhotoCaptureEnabled && (__p += '<button type="button" title="' + (null == (__t = displayLogic.labels.fileUpload.capturePhoto) ? "" : _.escape(__t)) + '" class="lrn_btn lrn-fileupload-capture-photo-btn" aria-label="' + (null == (__t = displayLogic.labels.fileUpload.capturePhoto) ? "" : _.escape(__t)) + '"',
                (displayLogic.isReadOnly || displayLogic.maxNumberFilesUploaded) && (__p += 'disabled="disabled"'),
                __p += '><span class="lrn_icon lrn-icon-camera"></span><span class="sr-only">' + (null == (__t = displayLogic.labels.fileUpload.photoCapture.launch) ? "" : _.escape(__t)) + "</span></button>"),
                __p += '<button type="button" title="' + (null == (__t = displayLogic.labels.fileUpload.deleteFileMode) ? "" : _.escape(__t)) + '" class="lrn_btn lrn-fileupload-delete-mode-btn ',
                displayLogic.isInDeleteMode && (__p += "lrn-icon-active"),
                __p += '" aria-label="' + (null == (__t = displayLogic.labels.fileUpload.deleteFileMode) ? "" : _.escape(__t)) + '" aria-pressed="' + (null == (__t = displayLogic.isInDeleteMode.toString()) ? "" : __t) + '"',
                (displayLogic.isReadOnly || displayLogic.deleteModeDisabled) && (__p += 'disabled="disabled"'),
                __p += '><span class="lrn_icon lrn-icon-trash"></span><span class="sr-only">' + (null == (__t = displayLogic.labels.fileUpload.deleteFileMode) ? "" : _.escape(__t)) + "</span></button></div>";
            return __p
        }
    },
    573: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<footer class="lrn-toolbar-footer lrn_clearfix"><div class="lrn-toolbar-footer-left"><span data-lrn-component="toolbarTooltip"></span>\x3c!-- Max individual file size 10MB --\x3e</div><div class="lrn-toolbar-footer-right"><span class="lrn-limit-status ',
                displayLogic.hasReachedMaxFiles && (__p += "lrn-limit-warning"),
                __p += '">' + (null == (__t = displayLogic.fileCount) ? "" : __t) + " / " + (null == (__t = displayLogic.maxFiles) ? "" : __t) + " " + (null == (__t = displayLogic.labels.fileUpload.fileLimit) ? "" : _.escape(__t)) + "</span></div></footer>";
            return __p
        }
    },
    574: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<div class="lrn-fileupload-upload-container ',
                displayLogic.isHidden && (__p += "hidden"),
                __p += '"><div class="lrn-fileupload-input-wrapper"><span class="btn lrn_btn_blue lrn-fileupload-btn-upload ',
                displayLogic.isReadOnly && (__p += "lrn-disabled"),
                __p += '"><span class="lrn-icon-upload"></span>' + (null == (__t = displayLogic.labels.fileUpload.uploadFiles) ? "" : _.escape(__t)) + '</span><input class="lrn-fileupload-file-input" type="file" multiple tabindex="0" accept="' + (null == (__t = displayLogic.allowedExtensions) ? "" : _.escape(__t)) + '"',
                displayLogic.isReadOnly && (__p += 'disabled="disabled"'),
                __p += '/><input class="lrn-fileupload-photo-fallback" type="file" accept="image/*"',
                displayLogic.isReadOnly && (__p += 'disabled="disabled"'),
                __p += '/></div><div class="lrn-fileupload-support-copy">(' + (null == (__t = displayLogic.supportCopy) ? "" : _.escape(__t)) + " " + (null == (__t = displayLogic.labels.fileUpload.fileFormatsSupported) ? "" : _.escape(__t)) + ")</div></div>";
            return __p
        }
    },
    575: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<div class="lrn-fileupload-list-container"><ul>',
                _.each(displayLogic.files, (function(e, t) {
                    __p += '<li class="lrn-fileupload-file-' + (null == (__t = e.status) ? "" : _.escape(__t)) + '" data-file-id="' + (null == (__t = e.id) ? "" : __t) + '"><div class="lrn-fileupload-file-numerator">',
                    e.hasUploaded || e.hasFailed ? __p += (null == (__t = t + 1) ? "" : __t) + "." : __p += '<img src="' + (null == (__t = displayLogic.uploadingImageSrc) ? "" : _.escape(__t)) + '" class="lrn-fileupload-spinner" alt="Uploading" />',
                    __p += '</div><div class="lrn-fileupload-file-type-icon">',
                    e.hasFailed ? __p += '<span class="lrn-icon-failed"></span>' : __p += '<span class="lrn-file-icon ' + (null == (__t = e.colorClass) ? "" : _.escape(__t)) + '"><span class="lrn-file-extension">' + (null == (__t = e.extension) ? "" : _.escape(__t)) + "</span></span>",
                    __p += '</div><div class="lrn-fileupload-filename">',
                    e.hasUploaded ? __p += '<a href="#" target="_blank" title="' + (null == (__t = e.name) ? "" : _.escape(__t)) + '" class="lrn-fileupload-file-link" data-file-id="' + (null == (__t = e.id) ? "" : _.escape(__t)) + '">' + (null == (__t = e.name) ? "" : _.escape(__t)) + "</a>" : (__p += "" + (null == (__t = e.name) ? "" : _.escape(__t)),
                    e.hasFailed && (__p += " (" + (null == (__t = i18n.fileUpload.uploadFailed) ? "" : _.escape(__t)) + ")"),
                    __p += ""),
                    __p += "</div>",
                    displayLogic.isReadOnly || (__p += '<div class="lrn-fileupload-actions">',
                    e.hasFailed && (__p += '<button type="button" title="Retry upload?"class="lrn-file-retry lrn_btn" data-file-id="' + (null == (__t = e.id) ? "" : __t) + '"><span class="lrn_icon lrn-icon-retry"></span><span class="sr-only">Retry upload</span></button>'),
                    __p += '<button type="button" title="Delete ' + (null == (__t = e.name) ? "" : _.escape(__t)) + '?"class="lrn-file-delete lrn_btn" data-file-id="' + (null == (__t = e.id) ? "" : __t) + '"><span class="lrn_icon lrn-icon-trash"></span><span class="sr-only">Delete File</span></button></div>'),
                    __p += "</li>"
                }
                )),
                __p += "</ul></div>";
            return __p
        }
    },
    576: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<div class="lrn-notifications-bar ' + (null == (__t = displayLogic.type) ? "" : __t) + ' hidden" aria-live="assertive" aria-atomic="true" role="alert"><span class="lrn-notification-icon"></span>' + (null == (__t = displayLogic.message) ? "" : _.escape(__t)) + "</div>";
            return __p
        }
    },
    577: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<div class="lrn-fileupload-webcam"><div class="lrn-fileupload-webcam-flexible-content"><div class="lrn-fileupload-webcam-flexible-content-inner"><div class="lrn-fileupload-webcam-capture-screen"><div class="lrn-fileupload-webcam-video-container"><video class="lrn-fileupload-webcam-video" playsinline="true" width="640" height="480"></video><div class="lrn-fileupload-webcam-placeholder-aspect-ratio-box"></div><canvas class="lrn-fileupload-webcam-canvas"></canvas><div class="lrn-fileupload-webcam-placeholder"><div class="lrn-fileupload-webcam-placeholder-content"><h3>' + (null == (__t = labels.fileUpload.photoCapture.accessToCamera.title) ? "" : _.escape(__t)) + "</h3><p>" + (null == (__t = labels.fileUpload.photoCapture.accessToCamera.description) ? "" : _.escape(__t)) + '</p></div></div><div class="lrn-fileupload-webcam-countdown lrn_hide" aria-live="polite"><div class="lrn-fileupload-webcam-countdown-inner"><p>' + (null == (__t = labels.fileUpload.photoCapture.countdownCapturingIn) ? "" : _.escape(__t)) + ' <span class="lrn-fileupload-webcam-countdown-count"></span></p></div></div></div></div><div class="lrn-fileupload-webcam-preview-screen lrn_hide"><div><img class="lrn-fileupload-webcam-output"></div></div><div class="lrn-fileupload-webcam-name-screen lrn_hide"><div class="lrn-fileupload-webcam-prompt-content"><label for="lrn_fileupload_webcam_name_input_' + (null == (__t = viewId) ? "" : _.escape(__t)) + '"><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.chooseName) ? "" : _.escape(__t)) + '</span></label><input type="text" class="lrn-fileupload-webcam-name-input" id="lrn_fileupload_webcam_name_input_' + (null == (__t = viewId) ? "" : _.escape(__t)) + '"></div></div><div class="lrn-fileupload-webcam-delete-check-screen lrn_hide"><div class="lrn-fileupload-webcam-prompt-content"><p>' + (null == (__t = labels.fileUpload.photoCapture.confirmDelete) ? "" : _.escape(__t)) + '</p></div></div><div class="lrn-fileupload-webcam-access-denied lrn_hide"><div class="lrn-fileupload-webcam-prompt-content"><p>' + (null == (__t = labels.fileUpload.photoCapture.accessToCamera.denied) ? "" : _.escape(__t)) + '</p></div></div></div></div><div class="lrn-fileupload-webcam-controls"><div class="lrn-fileupload-webcam-buttons"><div class="lrn-fileupload-webcam-capture-screen"><button type="button" class="lrn-fileupload-webcam-capture-btn lrn_btn" disabled><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.capture) ? "" : _.escape(__t)) + '</span></button></div><div class="lrn-fileupload-webcam-preview-screen lrn_hide"><button type="button" class="lrn-fileupload-webcam-retry-btn lrn_btn"><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.retake) ? "" : _.escape(__t)) + '</span></button><button type="button" class="lrn-fileupload-webcam-accept-btn lrn_btn"><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.accept) ? "" : _.escape(__t)) + '</span></button></div><div class="lrn-fileupload-webcam-name-screen lrn_hide"><button type="button" class="lrn-fileupload-webcam-upload-btn lrn_btn"><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.save) ? "" : _.escape(__t)) + '</span></button></div><div class="lrn-fileupload-webcam-delete-check-screen lrn_hide"><button type="button" class="lrn-fileupload-webcam-delete-cancel-btn lrn_btn"><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.cancel) ? "" : _.escape(__t)) + '</span></button><button type="button" class="lrn-fileupload-webcam-delete-btn lrn-fileupload-webcam-button-danger lrn_btn" data-action="lrnResponseModalClose"><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.delete) ? "" : _.escape(__t)) + '</span></button></div><div class="lrn-fileupload-webcam-access-denied lrn_hide"><button type="button" class="lrn-fileupload-webcam-close-btn lrn_btn"><span class="lrn-btn-text">' + (null == (__t = labels.fileUpload.photoCapture.close) ? "" : _.escape(__t)) + "</span></button></div></div></div></div>";
            return __p
        }
    },
    578: function(module, exports, __webpack_require__) {
        var _ = __webpack_require__(0);
        module.exports = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "")
            };
            with (obj || {})
                __p += '<div class="lrn_response_input_wrapper" aria-label="File upload question type" ',
                _.isUndefined(displayLogic.width) || (__p += 'style="width: ' + (null == (__t = displayLogic.width) ? "" : _.escape(__t)) + '; max-width: none;"'),
                __p += '><div class="lrn-fileupload"><div class="lrn-fileupload-toolbar-outlet"></div><div class="lrn-fileupload-container"><div class="lrn-fileupload-notifications-outlet"></div><div class="lrn-fileupload-upload-outlet"></div><div class="lrn-fileupload-filelist-outlet hidden"></div></div><div class="lrn-fileupload-statusbar-outlet"></div></div></div>';
            return __p
        }
    },
    85: function(e, t, i) {
        "use strict";
        i.r(t);
        var n, a = i(8), o = i(273), s = a.a.extend({
            MAX_FILE_SIZE: 1e7,
            MAX_SIZE_TEXT: "".concat(10, "MB"),
            DEFAULT_MAX_FILES: 12,
            updateMaxUploadSize: function updateMaxUploadSize(e) {
                var t = parseInt(e, 10)
                  , i = t / 1e3 / 1e3;
                this.MAX_FILE_SIZE = t,
                this.MAX_SIZE_TEXT = "".concat(i.toFixed(1), "MB")
            },
            getAllowedFileTypes: function getAllowedFileTypes() {
                var e, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = this.get("question"), n = [];
                for (var a in i)
                    if (a.indexOf("allow_") > -1 && i[a]) {
                        if ("allow_video" === a && !t.allow_video)
                            continue;
                        e = a.replace("allow_", ""),
                        n = n.concat(o.a.getExtensions(e))
                    }
                return n.sort()
            },
            getFileExtension: function getFileExtension() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
                return e.substr(e.lastIndexOf(".") + 1).toLowerCase()
            },
            processResponseValue: function processResponseValue() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                this.hasResponse() || this.set({
                    response: {
                        value: [],
                        type: this.RESPONSE_TYPE.ARRAY
                    }
                }, {
                    silent: !0
                }),
                this.get("response").value = e
            },
            hasAllowedResponse: function hasAllowedResponse() {
                return !0
            }
        }), l = i(0), r = i.n(l), d = i(5), c = i.n(d), p = i(572), u = i.n(p), _ = i(215);
        function _defineProperty(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        var h = function isKeyOtherThanEnterOrSpace() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return r.a.exists(e.keyCode) && !_.a.keyIs("enter", e) && !_.a.keyIs("space", e)
        }
          , f = {
            uploadBtn: ".lrn-toolbar .lrn_btn.lrn-fileupload-upload-btn",
            capturePhotoBtn: ".lrn-toolbar .lrn-fileupload-capture-photo-btn",
            deleteModeBtn: ".lrn-toolbar .lrn_btn.lrn-fileupload-delete-mode-btn"
        }
          , b = c.a.View.extend({
            template: u.a,
            SELECTORS: f,
            isInDeleteMode: !1,
            events: (n = {},
            _defineProperty(n, "click ".concat(f.uploadBtn), "onUploadButton"),
            _defineProperty(n, "click ".concat(f.capturePhotoBtn), "onCapturePhotoButton"),
            _defineProperty(n, "click ".concat(f.deleteModeBtn), "onDeleteModeButton"),
            _defineProperty(n, "keydown ".concat(f.uploadBtn), "onUploadButton"),
            _defineProperty(n, "keydown ".concat(f.capturePhotoBtn), "onCapturePhotoButton"),
            _defineProperty(n, "keydown ".concat(f.deleteModeBtn), "onDeleteModeButton"),
            n),
            initialize: function initialize() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.options = e,
                this.isInDeleteMode = this.options.isInDeleteMode || !1,
                this.isReadOnly = this.options.isReadOnly,
                this.labels = this.options.labels,
                this.deleteModeDisabled = 0 === this.options.fileCount,
                this.maxNumberFilesUploaded = this.options.fileCount >= this.options.maxFiles,
                this.isPhotoCaptureEnabled = this.options.isPhotoCaptureEnabled
            },
            disableTab: function disableTab() {
                var e = this;
                r()(f).forEach((function(t) {
                    e.$(t).attr({
                        tabindex: "-1"
                    }).blur()
                }
                ))
            },
            enableTab: function enableTab() {
                var e = this;
                r()(f).forEach((function(t) {
                    return e.$(t).removeAttr("tabindex")
                }
                ))
            },
            render: function render() {
                var e = this.options.canLaunchWebcam
                  , t = this.template({
                    displayLogic: {
                        canLaunchWebcam: e,
                        isInDeleteMode: this.isInDeleteMode,
                        isReadOnly: this.isReadOnly,
                        isPhotoCaptureEnabled: this.isPhotoCaptureEnabled,
                        labels: this.labels,
                        maxNumberFilesUploaded: this.maxNumberFilesUploaded,
                        deleteModeDisabled: this.deleteModeDisabled
                    }
                });
                return this.$el.html(t),
                this
            },
            onUploadButton: function onUploadButton(e) {
                h(e) || this.options.eventBus.trigger("launchFileBrowser")
            },
            onCapturePhotoButton: function onCapturePhotoButton(e) {
                h(e) || this.options.eventBus.trigger("launchWebcam")
            },
            onDeleteModeButton: function onDeleteModeButton(e) {
                h(e) || (this.toggleDeleteMode(),
                this.isInDeleteMode ? this.options.eventBus.trigger("enterDeleteMode") : this.options.eventBus.trigger("exitDeleteMode"),
                this.render())
            },
            toggleDeleteMode: function toggleDeleteMode() {
                this.isInDeleteMode = !this.isInDeleteMode
            }
        })
          , v = i(573)
          , m = i.n(v)
          , g = c.a.View.extend({
            template: m.a,
            initialize: function initialize() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.options = e,
                this.displayLogic = {}
            },
            render: function render() {
                return this.addRenderingLogic(),
                this.$el.html(this.template({
                    displayLogic: this.displayLogic
                })),
                this
            },
            addRenderingLogic: function addRenderingLogic() {
                var e = this.options.fileCount
                  , t = parseInt(this.options.maxFiles, 10)
                  , i = e === t
                  , n = this.options.labels;
                this.displayLogic = {
                    fileCount: e,
                    maxFiles: t,
                    hasReachedMaxFiles: i,
                    labels: n
                }
            }
        })
          , y = i(574)
          , w = i.n(y);
        var E, T = {
            fileInput: ".lrn-fileupload-file-input"
        }, C = c.a.View.extend({
            template: w.a,
            SELECTORS: T,
            events: function upload_defineProperty(e, t, i) {
                return t in e ? Object.defineProperty(e, t, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = i,
                e
            }({}, "change ".concat(T.fileInput), "onFileChange"),
            initialize: function initialize() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.options = e,
                this.displayLogic = {}
            },
            render: function render() {
                return this.addRenderingLogic(),
                this.$el.html(this.template({
                    displayLogic: this.displayLogic
                })),
                this
            },
            disableTab: function disableTab() {
                var e = this;
                r()(T).forEach((function(t) {
                    e.$(t).attr({
                        tabindex: "-1"
                    }).blur()
                }
                ))
            },
            enableTab: function enableTab() {
                var e = this;
                r()(T).forEach((function(t) {
                    return e.$(t).removeAttr("tabindex")
                }
                ))
            },
            addRenderingLogic: function addRenderingLogic() {
                var e = this.options.supportCopy
                  , t = this.options.isHidden
                  , i = this.options.isReadOnly
                  , n = this.options.labels;
                this.displayLogic = {
                    supportCopy: e,
                    isHidden: t,
                    isReadOnly: i,
                    labels: n
                }
            },
            onFileChange: function onFileChange() {
                var e = this.$(T.fileInput).first().prop("files");
                this.options.eventBus.trigger("fileSelect", e),
                this.render()
            }
        }), L = i(6), S = i(575), U = i.n(S);
        function fileList_defineProperty(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        var O = {
            FILE_DELETE_BTN: ".lrn-file-delete",
            FILE_LINK: ".lrn-fileupload-file-link"
        }
          , A = c.a.View.extend({
            SELECTORS: O,
            template: U.a,
            uploadingImageSrc: L.a.assetsHost + "/images/loader_spinner.gif",
            events: (E = {},
            fileList_defineProperty(E, "keydown ".concat(O.FILE_LINK), "onFileLink"),
            fileList_defineProperty(E, "mouseup ".concat(O.FILE_LINK), "onFileLink"),
            fileList_defineProperty(E, "contextmenu ".concat(O.FILE_LINK), "onFileLink"),
            E),
            initialize: function initialize() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.options = e,
                this.isInDeleteMode = this.options.isInDeleteMode || !1,
                this.isReadOnly = this.options.isReadOnly || !1,
                this.displayLogic = {},
                this.files = this.options.files || []
            },
            render: function render() {
                return this.addRenderingLogic(),
                this.$el.html(this.template({
                    displayLogic: this.displayLogic,
                    i18n: this.options.labels
                })),
                this.isInDeleteMode || this.$(O.FILE_DELETE_BTN).hide(),
                this
            },
            addRenderingLogic: function addRenderingLogic() {
                this.displayLogic = {
                    files: this.files.toJSON(),
                    uploadingImageSrc: this.uploadingImageSrc,
                    isReadOnly: this.isReadOnly
                }
            },
            disableTab: function disableTab() {
                var e = this;
                r()(O).forEach((function(t) {
                    e.$(t).attr({
                        tabindex: "-1"
                    }).blur()
                }
                ))
            },
            enableTab: function enableTab() {
                var e = this;
                r()(O).forEach((function(t) {
                    return e.$(t).removeAttr("tabindex")
                }
                ))
            },
            onFileLink: function onFileLink(e) {
                var t = this.$(e.target)
                  , i = t.data("file-id")
                  , n = this.files.get(i)
                  , a = !!e.type.match(/^mouse|contextmenu/)
                  , o = "keydown" === e.type && 13 === e.which;
                r.a.isUndefined(n) || !o && !a || t.attr("href", n.getViewUrl(!0))
            }
        })
          , D = i(576)
          , R = i.n(D);
        var I, N = {
            notificationContainer: ".lrn-notifications-bar"
        }, F = {
            danger: "lrn-notification-danger",
            warning: "lrn-notification-warning",
            info: "lrn-notification-info",
            success: "lrn-notification-success"
        }, M = c.a.View.extend({
            template: R.a,
            SELECTORS: N,
            TYPE_CLASS_MAP: F,
            events: function notifications_defineProperty(e, t, i) {
                return t in e ? Object.defineProperty(e, t, {
                    value: i,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = i,
                e
            }({}, "click ".concat(N.notificationContainer), "onContainerClick"),
            initialize: function initialize() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.options = e,
                this.displayLogic = {},
                this.notification = {
                    message: "",
                    type: ""
                },
                r.a.isObject(this.options) && r.a.isObject(this.options.notification) && (this.notification = this.options.notification)
            },
            render: function render() {
                return this.addRenderingLogic(),
                this.$el.html(this.template({
                    displayLogic: this.displayLogic
                })),
                this.displayLogic.message && this.$(N.notificationContainer).removeClass("hidden").fadeIn(),
                this
            },
            addRenderingLogic: function addRenderingLogic() {
                var e = this.notification.message || ""
                  , t = F[this.notification.type];
                this.displayLogic = {
                    message: e,
                    type: t || ""
                }
            },
            onContainerClick: function onContainerClick() {
                this.$el.fadeOut()
            }
        }), P = i(577), B = i.n(P), k = i(3), V = i(4), x = i(266);
        function webcam_defineProperty(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        var $, j = {
            HIDE: "lrn_hide"
        }, q = {
            CANVAS: ".lrn-fileupload-webcam-canvas",
            COUNTDOWN: ".lrn-fileupload-webcam-countdown",
            COUNTDOWN_COUNT: ".lrn-fileupload-webcam-countdown-count",
            FLEXIBLE_CONTENT: ".lrn-fileupload-webcam-flexible-content",
            FLEXIBLE_CONTENT_INNER: ".lrn-fileupload-webcam-flexible-content-inner",
            NAME_INPUT: ".lrn-fileupload-webcam-name-input",
            OUTPUT_IMG: ".lrn-fileupload-webcam-output",
            PLACEHOLDER: ".lrn-fileupload-webcam-placeholder",
            VIDEO: ".lrn-fileupload-webcam-video",
            BUTTONS: {
                ACCEPT: ".lrn-fileupload-webcam-accept-btn",
                DELETE: ".lrn-fileupload-webcam-delete-btn",
                CANCEL_DELETE: ".lrn-fileupload-webcam-delete-cancel-btn",
                CAPTURE: ".lrn-fileupload-webcam-capture-btn",
                RETRY: ".lrn-fileupload-webcam-retry-btn",
                UPLOAD: ".lrn-fileupload-webcam-upload-btn",
                CLOSE_ACCESS_DENIED: ".lrn-fileupload-webcam-close-btn"
            },
            SCREENS: {
                CAPTURE: ".lrn-fileupload-webcam-capture-screen",
                DELETE_CHECK: ".lrn-fileupload-webcam-delete-check-screen",
                NAME: ".lrn-fileupload-webcam-name-screen",
                PREVIEW: ".lrn-fileupload-webcam-preview-screen",
                CAMERA_ACCESS_DENIED: ".lrn-fileupload-webcam-access-denied"
            },
            MODAL: {
                VISIBLE_CONTAINER: ".lrn-response-modal.lrn-response-modal-is-visible",
                CLOSE_BUTTON: ".lrn-response-modal-header-close",
                CAMERA_BUTTON: ".lrn-fileupload-capture-photo-btn"
            }
        }, K = 0, W = function isKeyOtherThanEnterOrSpace() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            return r.a.exists(e.keyCode) && !_.a.keyIs("enter", e) && !_.a.keyIs("space", e)
        }, z = c.a.View.extend({
            CLASS_NAMES: j,
            COUNTDOWN_START: 3,
            COUNTDOWN_INTERVAL: 1e3,
            MEDIA_CONSTRAINTS: {
                audio: !1,
                video: {
                    facingMode: "user",
                    width: {
                        min: 480,
                        ideal: 640,
                        max: 960
                    },
                    height: {
                        min: 480,
                        ideal: 480,
                        max: 480
                    }
                }
            },
            OUTPUT_FORMAT: "jpeg",
            OUTPUT_QUALITY: .9,
            OUTPUT_WIDTH: 1280,
            SELECTORS: q,
            countdown: 0,
            fileName: "",
            isStreaming: !1,
            restoreFocus: null,
            previousScreen: "",
            template: B.a,
            visibleScreen: "CAPTURE",
            events: (I = {},
            webcam_defineProperty(I, "click ".concat(q.BUTTONS.ACCEPT), "onAccept"),
            webcam_defineProperty(I, "click ".concat(q.BUTTONS.CANCEL_DELETE), "onCancelDelete"),
            webcam_defineProperty(I, "click ".concat(q.BUTTONS.CAPTURE), "onCapture"),
            webcam_defineProperty(I, "click ".concat(q.BUTTONS.RETRY), "onRetry"),
            webcam_defineProperty(I, "click ".concat(q.BUTTONS.UPLOAD), "onUpload"),
            webcam_defineProperty(I, "click ".concat(q.BUTTONS.CLOSE_ACCESS_DENIED), "onCloseCameraAccessDenied"),
            webcam_defineProperty(I, "touchend  ".concat(q.BUTTONS.ACCEPT), "onAccept"),
            webcam_defineProperty(I, "touchend ".concat(q.BUTTONS.CANCEL_DELETE), "onCancelDelete"),
            webcam_defineProperty(I, "touchend  ".concat(q.BUTTONS.CAPTURE), "onCapture"),
            webcam_defineProperty(I, "touchend  ".concat(q.BUTTONS.RETRY), "onRetry"),
            webcam_defineProperty(I, "touchend  ".concat(q.BUTTONS.UPLOAD), "onUpload"),
            webcam_defineProperty(I, "keydown  ".concat(q.BUTTONS.ACCEPT), "onAccept"),
            webcam_defineProperty(I, "keydown ".concat(q.BUTTONS.CANCEL_DELETE), "onCancelDelete"),
            webcam_defineProperty(I, "keydown  ".concat(q.BUTTONS.RETRY), "onRetry"),
            webcam_defineProperty(I, "keydown  ".concat(q.BUTTONS.UPLOAD), "onUpload"),
            webcam_defineProperty(I, "keyup ".concat(q.NAME_INPUT), "onTypeName"),
            I),
            initialize: function initialize() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                this.i18n = e.i18n
            },
            createMediaStream: function createMediaStream() {
                var e = this;
                navigator.mediaDevices.getUserMedia({
                    video: !0,
                    audio: !1
                }).then(this.openVideoStream.bind(this)).catch((function() {
                    return e.onCameraAccessDenied()
                }
                ))
            },
            deleteCheck: function deleteCheck() {
                var e = this.visibleScreen
                  , t = !0;
                return -1 === ["CAPTURE", "DELETE_CHECK", "CAMERA_ACCESS_DENIED"].indexOf(e) && (t = !1,
                this.showScreen("DELETE_CHECK")),
                t
            },
            disableButton: function disableButton(e) {
                this.$(q.BUTTONS[e]).attr("disabled", !0)
            },
            enableButton: function enableButton(e) {
                this.$(q.BUTTONS[e]).attr("disabled", !1)
            },
            getCanvas: function getCanvas() {
                return this.$(q.CANVAS)[0]
            },
            getDefaultName: function getDefaultName() {
                return "".concat(this.i18n.labels.fileUpload.photoCapture.defaultFileName, "-").concat(K + 1)
            },
            getOutputImage: function getOutputImage() {
                return this.$(q.OUTPUT_IMG)[0]
            },
            getVideo: function getVideo() {
                return this.$(q.VIDEO)[0]
            },
            getVisibleModalElement: function getVisibleModalElement() {
                return this.$el.closest(q.MODAL.VISIBLE_CONTAINER).get(0)
            },
            onAccept: function onAccept(e) {
                if (!W(e)) {
                    var t = this.getDefaultName();
                    this.showScreen("NAME"),
                    this.$(q.NAME_INPUT).attr({
                        placeholder: t,
                        value: t
                    }).focus().select(),
                    e.preventDefault()
                }
            },
            onCancelDelete: function onCancelDelete(e) {
                W(e) || (this.showScreen(this.previousScreen),
                e.preventDefault())
            },
            onCapture: function onCapture(e) {
                var t = this;
                if (!W(e)) {
                    this.disableButton("CAPTURE");
                    var i = this.getVisibleModalElement().querySelector(q.MODAL.CLOSE_BUTTON);
                    i && i.focus(),
                    this.startCountdown().then((function() {
                        var e = t.getCanvas()
                          , i = t.getOutputImage()
                          , n = t.getVideo();
                        e.getContext("2d").drawImage(n, 0, 0, e.width, e.height);
                        var a = e.toDataURL("image/png");
                        i.setAttribute("src", a),
                        i.onload = function() {
                            return t.showScreen("PREVIEW")
                        }
                    }
                    )).catch((function(e) {
                        return Object(V.a)(new Error(V.a))
                    }
                    )),
                    e.preventDefault()
                }
            },
            onRetry: function onRetry(e) {
                W(e) || (this.enableButton("CAPTURE"),
                this.showScreen("CAPTURE"),
                e.preventDefault())
            },
            onTypeName: function onTypeName(e) {
                this.fileName = e.target.value
            },
            onUpload: function onUpload(e) {
                var t = this;
                if (!W(e)) {
                    var i = this.getCanvas();
                    this.fileName || (this.fileName = this.getDefaultName()),
                    i.toBlob((function(e) {
                        e.name = "".concat(t.fileName, ".").concat("jpeg"),
                        t.options.eventBus.trigger("fileSelect", [e])
                    }
                    ), "image/".concat("jpeg"), .9),
                    K += 1,
                    e.preventDefault()
                }
            },
            onVideoCanPlay: function onVideoCanPlay() {
                this.isStreaming || (this.enableButton("CAPTURE"),
                this.showScreen("CAPTURE"),
                this.setDimensions(),
                this.$(q.PLACEHOLDER).addClass("lrn_hide"),
                this.isStreaming = !0)
            },
            onCameraAccessDenied: function onCameraAccessDenied() {
                this.showScreen("CAMERA_ACCESS_DENIED")
            },
            onCloseCameraAccessDenied: function onCloseCameraAccessDenied() {
                this.remove(),
                this.options.eventBus.trigger("cameraAccessDenied")
            },
            openVideoStream: function openVideoStream(e) {
                var t = this.getVideo();
                t.srcObject = e,
                t.play(),
                t.addEventListener("canplay", this.onVideoCanPlay.bind(this), !1)
            },
            remove: function remove() {
                this.stopStream(),
                window.clearTimeout(this.countdownTimeoutId),
                this.disableFocusTrap(),
                c.a.View.prototype.remove.apply(this, arguments)
            },
            render: function render() {
                var e = this.template({
                    viewId: this.cid,
                    labels: this.i18n.labels
                });
                return this.$el.html(e),
                this.createMediaStream(),
                this
            },
            setDimensions: function setDimensions() {
                var e = this.getVideo()
                  , t = this.getCanvas()
                  , i = e.videoHeight / (e.videoWidth / 1280);
                t.setAttribute("width", 1280),
                t.setAttribute("height", i)
            },
            enableFocusTrap: function enableFocusTrap() {
                var e = this.getVisibleModalElement();
                e && (r.a.isFunction(this.restoreFocus) && this.restoreFocus(),
                this.restoreFocus = Object(x.a)(e))
            },
            disableFocusTrap: function disableFocusTrap() {
                if (r.a.isFunction(this.restoreFocus)) {
                    var e = document.querySelector(q.MODAL.CAMERA_BUTTON);
                    this.restoreFocus(e),
                    this.restoreFocus = null
                }
            },
            showScreen: function showScreen(e) {
                var t = this
                  , i = this.$(q.FLEXIBLE_CONTENT)
                  , n = this.$(q.FLEXIBLE_CONTENT_INNER);
                r()(q.SCREENS).forEach((function(e) {
                    t.$(e).addClass(j.HIDE)
                }
                )),
                this.previousScreen = this.visibleScreen,
                this.visibleScreen = e,
                this.$(q.SCREENS[e]).removeClass(j.HIDE);
                var a = n.height();
                i.height(a),
                this.enableFocusTrap();
                var o = {
                    CAPTURE: q.BUTTONS.CAPTURE,
                    PREVIEW: q.BUTTONS.ACCEPT,
                    DELETE_CHECK: q.BUTTONS.DELETE,
                    CAMERA_ACCESS_DENIED: q.BUTTONS.CLOSE_ACCESS_DENIED
                }[e];
                o && this.$(o).focus()
            },
            startCountdown: function startCountdown() {
                var e = this;
                return this.$(q.COUNTDOWN).removeClass("lrn_hide"),
                this.countdown = 3,
                new k.default((function(t) {
                    !function decrementCountdown() {
                        0 === e.countdown ? (e.$(q.COUNTDOWN).addClass("lrn_hide"),
                        t()) : e.countdown > 0 && (e.$(q.COUNTDOWN_COUNT).text(e.countdown),
                        e.countdown -= 1,
                        e.countdownTimeoutId = window.setTimeout(decrementCountdown, 1e3))
                    }()
                }
                ))
            },
            stopStream: function stopStream() {
                var e = this.getVideo().srcObject;
                e && e.getTracks().forEach((function(e) {
                    return e.stop()
                }
                ))
            }
        }), H = i(578), X = i.n(H), Y = i(20), Z = i(400), G = i(311), Q = i(384), J = i(305), ee = (i(1),
        i(46));
        function fileUpload_defineProperty(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i,
            e
        }
        var te = {
            TOOLBAR_OUTLET: ".lrn-fileupload-toolbar-outlet",
            UPLOAD_OUTLET: ".lrn-fileupload-upload-outlet",
            FILELIST_OUTLET: ".lrn-fileupload-filelist-outlet",
            STATUSBAR_OUTLET: ".lrn-fileupload-statusbar-outlet",
            NOTIFICATIONS_OUTLET: ".lrn-fileupload-notifications-outlet",
            MAIN_CONTAINER: ".lrn-fileupload-container",
            IMAGE_INPUT: ".lrn-fileupload-photo-fallback",
            FILE_INPUT: ".lrn-fileupload-file-input",
            FILE_DELETE_BTN: ".lrn-file-delete",
            UPLOAD_RETRY_BTN: ".lrn-file-retry"
        }
          , ie = ee.a.isGetUserMediaSupported()
          , ne = []
          , ae = Y.a.extend({
            SELECTORS: te,
            isInDeleteMode: !1,
            events: ($ = {},
            fileUpload_defineProperty($, "click ".concat(te.FILE_DELETE_BTN), "onDeleteFile"),
            fileUpload_defineProperty($, "click ".concat(te.UPLOAD_RETRY_BTN), "onRetryUpload"),
            fileUpload_defineProperty($, "dragover ".concat(te.MAIN_CONTAINER), "onFileDragOver"),
            fileUpload_defineProperty($, "dragleave ".concat(te.MAIN_CONTAINER), "removeFileDragOverStyle"),
            fileUpload_defineProperty($, "drop ".concat(te.MAIN_CONTAINER), "onFileDrop"),
            $),
            eventBusActions: {
                fileSelect: "fileSelect",
                fileRemove: "fileRemove",
                updateMainView: "updateMainView",
                showNotifications: "showNotifications",
                launchFileBrowser: "launchFileBrowser",
                launchWebcam: "launchWebcam",
                enterDeleteMode: "enterDeleteMode",
                exitDeleteMode: "exitDeleteMode",
                retryUpload: "retryUpload",
                cameraAccessDenied: "onCameraAccessDenied",
                fileSelected: "updateMainView",
                fileRemoved: "updateMainView",
                fileUploaded: "fileUploaded",
                fileUploadFailed: "fileUploadFailed"
            },
            template: X.a,
            initialize: function initialize() {
                this.activity = this.options.activity;
                var e = this.activity.get("consumer")
                  , t = this.model.get("question")
                  , i = this.model.getResponseValue();
                this.assets = new Q.a,
                this.eventBus = r.a.extend({}, c.a.Events),
                this.i18n = this.activity.get("i18n"),
                this.subViews = {},
                this.notification = {},
                this.isLocalPractice = this.activity.get("type") === this.activity.TYPE.LOCAL_PRACTICE,
                this.isResumeMode = this.activity.get("state") === this.activity.STATE.RESUME,
                this.isReviewMode = this.activity.get("state") === this.activity.STATE.REVIEW,
                this.isPreviewMode = this.activity.get("state") === this.activity.STATE.PREVIEW,
                this.isReadOnly = this.isLocalPractice || this.isReviewMode || this.isPreviewMode,
                this.hasVideoSupport = !0,
                this.displayLogic = {
                    width: this.getContainerWidth()
                },
                !e.hasPermissions("fileupload_video") && t.allow_video && (this.hasVideoSupport = !1,
                V.a.log("Video uploads are not available and have been disabled.")),
                r.a.isArray(i) && i.length > 0 && this.assets.add(i, {
                    securityObject: this.activity.get("security").getRequestParameters()
                }),
                this.allowedFileTypes = this.model.getAllowedFileTypes({
                    allow_video: this.hasVideoSupport
                }),
                this.model.updateMaxUploadSize(e.get("assetMaxSize")),
                this.bindEventBusActions(),
                G.a.hookToActivity(this.activity, this.assets),
                this.isLocalPractice && V.a.log('File Upload question type is not available using "local_practice".'),
                this.preloadImages().then(r.a.bind(this.initRender, this)).catch(r.a.bind(this.initRender, this)),
                ne.push(this)
            },
            preloadImages: function preloadImages() {
                for (var e, t = ["".concat(L.a.assetsHost, "/images/loader_spinner.gif")], i = [], n = function _loop(n) {
                    i.push(new k.default((function(i, a) {
                        (e = new Image).onload = i,
                        e.onerror = a,
                        e.src = t[n]
                    }
                    )))
                }, a = 0; a < t.length; a++)
                    n(a);
                return k.default.all(i)
            },
            initRender: function initRender() {
                this.render(),
                this.initialisationCompleted(),
                this.eventBus.trigger("updateMainView")
            },
            addFacadeMethods: function addFacadeMethods(e) {
                var t = this;
                e.retryUpload = function() {
                    t.retryUploadingFiles()
                }
                ,
                e.stop = function() {
                    t.closeWebcam()
                }
            },
            getContainerWidth: function getContainerWidth() {
                var e = this.model.get("question").max_width;
                return "none" === e && (e = "100%"),
                e
            },
            remove: function remove() {
                ne = r()(ne).without(this),
                c.a.View.prototype.remove.apply(this, arguments)
            },
            render: function render() {
                var e = this.template({
                    questionResponse: this.model,
                    displayLogic: this.displayLogic,
                    labels: this.i18n.labels
                });
                return this.renderViewContent(e),
                this.renderToolbar(),
                this.renderStatusBar(),
                this.renderNotifications(),
                this.renderUploadView(),
                this.renderFileList(),
                this
            },
            renderToolbar: function renderToolbar() {
                var e = this.$(this.SELECTORS.TOOLBAR_OUTLET);
                this.subViews.toolbar = new b({
                    canLaunchWebcam: ie,
                    eventBus: this.eventBus,
                    isReadOnly: this.isReadOnly,
                    labels: this.i18n.labels,
                    fileCount: this.assets.length,
                    maxFiles: this.model.get("question").max_files,
                    isPhotoCaptureEnabled: this.model.get("question").photo_capture || !1,
                    isInDeleteMode: this.isInDeleteMode
                }),
                e.html(this.subViews.toolbar.render().$el)
            },
            renderUploadView: function renderUploadView() {
                var e = this.$(this.SELECTORS.UPLOAD_OUTLET)
                  , t = this.getSupportedTypesCopy();
                this.subViews.uploadView = new C({
                    eventBus: this.eventBus,
                    isReadOnly: this.isReadOnly,
                    supportCopy: t,
                    labels: this.i18n.labels
                }),
                e.html(this.subViews.uploadView.render().$el)
            },
            renderFileList: function renderFileList() {
                var e = this.$(this.SELECTORS.FILELIST_OUTLET);
                this.subViews.fileList = new A({
                    eventBus: this.eventBus,
                    files: this.assets,
                    isInDeleteMode: this.isInDeleteMode,
                    labels: this.i18n.labels,
                    isReadOnly: this.isReadOnly
                }),
                e.html(this.subViews.fileList.render().$el)
            },
            renderStatusBar: function renderStatusBar() {
                var e = this.$(this.SELECTORS.STATUSBAR_OUTLET);
                this.subViews.statusBar = new g({
                    eventBus: this.eventBus,
                    fileCount: this.assets.length,
                    maxFiles: this.model.get("question").max_files,
                    labels: this.i18n.labels
                }),
                e.html(this.subViews.statusBar.render().$el)
            },
            renderNotifications: function renderNotifications() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = this.$(this.SELECTORS.NOTIFICATIONS_OUTLET);
                this.subViews.notifications = new M({
                    eventBus: this.eventBus,
                    notification: e
                }),
                t.html(this.subViews.notifications.render().$el),
                this.$(this.SELECTORS.MAIN_CONTAINER).scrollTop(0)
            },
            getSupportedTypesCopy: function getSupportedTypesCopy() {
                var e, t = this.model.get("question"), i = [];
                for (var n in t)
                    if (n.indexOf("allow_") > -1 && t[n])
                        switch (e = n.replace("allow_", "")) {
                        case "ms_word":
                            i.push("Word");
                            break;
                        case "ms_excel":
                            i.push("Excel");
                            break;
                        case "ms_powerpoint":
                            i.push("Powerpoint");
                            break;
                        case "ms_publisher":
                            i.push("Publisher");
                            break;
                        case "open_office":
                            i.push("Open Office");
                            break;
                        case "altera_quartus":
                            i.push("Altera Quartus");
                            break;
                        case "verilog":
                            i.push("Verilog");
                            break;
                        case "assembly":
                            i.push("Assembly");
                            break;
                        case "video":
                            this.hasVideoSupport && i.push("Video");
                            break;
                        default:
                            i.push(e.toUpperCase())
                        }
                return i.join(", ")
            },
            bindEventBusActions: function bindEventBusActions() {
                var e = this;
                r.a.each(this.eventBusActions, (function(t, i) {
                    e.listenTo(e.eventBus, i, e[t])
                }
                ))
            },
            enterDeleteMode: function enterDeleteMode() {
                this.$(te.FILE_DELETE_BTN).stop().fadeIn(),
                this.isInDeleteMode = !0
            },
            exitDeleteMode: function exitDeleteMode() {
                this.$(te.FILE_DELETE_BTN).stop().fadeOut(),
                this.isInDeleteMode = !1
            },
            onFileDragOver: function onFileDragOver(e) {
                if (this.isReadOnly)
                    return e.stopPropagation(),
                    void e.preventDefault();
                var t = e.originalEvent.dataTransfer
                  , i = !0;
                t.items && (i = !!r()(t.items).any((function(e) {
                    return "file" === e.kind
                }
                ))),
                i ? (this.$(te.MAIN_CONTAINER).addClass("lrn-file-drag-over"),
                t.dropEffect = "copy") : t.dropEffect = "none",
                e.stopPropagation(),
                e.preventDefault()
            },
            onFileDrop: function onFileDrop(e) {
                var t = e.originalEvent.dataTransfer.files;
                e.stopPropagation(),
                e.preventDefault(),
                this.isReadOnly || (this.removeFileDragOverStyle(),
                this.eventBus.trigger("fileSelect", t))
            },
            removeFileDragOverStyle: function removeFileDragOverStyle() {
                this.$(te.MAIN_CONTAINER).removeClass("lrn-file-drag-over")
            },
            onDeleteFile: function onDeleteFile(e) {
                var t = this.$(e.target).closest(".lrn_btn").data("file-id");
                t && this.eventBus.trigger("fileRemove", t)
            },
            onRetryUpload: function onRetryUpload(e) {
                var t = this.$(e.target).closest(".lrn_btn").data("file-id");
                t && this.eventBus.trigger("retryUpload", t)
            },
            fileSelect: function fileSelect() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : []
                  , t = this.addFiles(e, this.eventBus, this.i18n.labels)
                  , i = this.assets.length
                  , n = this.model.get("question").max_files;
                this.closeWebcam(),
                t.hasAddedFiles ? (this.renderToolbar(),
                this.renderStatusBar(),
                this.renderUploadView(),
                this.renderFileList(),
                i === parseInt(n, 10) && this.renderNotifications({
                    type: "info",
                    message: this.i18n.labels.fileUpload.notification.maxFilesReached
                })) : t.error && this.renderNotifications({
                    message: t.error,
                    type: "danger"
                }),
                this.eventBus.trigger("fileSelected")
            },
            hasValidFileType: function hasValidFileType() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = e.name || ""
                  , i = (e.type,
                o.a.getValidExtension(t))
                  , n = i.length > 0 && r.a.contains(this.allowedFileTypes, i);
                return !!n
            },
            hasValidFileSize: function hasValidFileSize() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return !!(r.a.isNumber(e.size) && e.size < this.model.MAX_FILE_SIZE)
            },
            hasAlreadyBeenSelected: function hasAlreadyBeenSelected() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                  , t = {
                    originalName: e.name
                }
                  , i = this.assets.findWhere(t);
                return !!i
            },
            validateSelectedFiles: function validateSelectedFiles(e, t) {
                var i, n, a, o = this.model.get("question").max_files || this.model.DEFAULT_MAX_FILES;
                for (e.length + this.assets.length > o && (i = "".concat(t.fileUpload.notification.tooManyFilesSelected, ": ").concat(o)),
                a = 0; a < e.length && r.a.isUndefined(i); a++)
                    n = e[a],
                    this.hasValidFileSize(n) ? this.hasValidFileType(n) ? this.hasAlreadyBeenSelected(n) && (i = "".concat(n.name, " ").concat(t.fileUpload.notification.alreadySelected)) : (i = "".concat(n.name, " ").concat(t.fileUpload.notification.invalidFileType),
                    i += " ".concat(this.allowedFileTypes.join(", ").toUpperCase(), ".")) : i = "".concat(n.name, " ").concat(t.fileUpload.notification.tooLarge, " ").concat(this.model.MAX_SIZE_TEXT, ".");
                return {
                    isValid: r.a.isUndefined(i),
                    error: i
                }
            },
            addFiles: function addFiles() {
                var e, t = this, i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n = arguments.length > 1 ? arguments[1] : void 0, a = arguments.length > 2 ? arguments[2] : void 0, s = this.validateSelectedFiles(i, a), l = !1;
                return s.isValid ? (r.a.each(i, (function(e) {
                    var i = o.a.createFullPath(t.activity, t.model.get("id"), e.name, !0)
                      , a = o.a.getValidExtension(e.name)
                      , s = o.a.getMimeTypeByExtension(a);
                    t.assets.add({
                        file: e
                    }, {
                        assetPath: i,
                        assetMimeType: s,
                        assetExtension: a,
                        activity: t.activity,
                        responseId: t.model.get("response_id"),
                        eventBus: n,
                        securityObject: t.activity.get("security").getRequestParameters(),
                        hasVideoSupport: t.hasVideoSupport
                    })
                }
                )),
                l = !0) : e = s.error,
                {
                    hasAddedFiles: l,
                    error: e
                }
            },
            fileRemove: function fileRemove(e) {
                var t = this
                  , i = this.$("".concat(te.FILELIST_OUTLET, ' li[data-file-id="').concat(e, '"]'));
                r.a.isUndefined(e) || (this.assets.remove(e),
                this.model.updateResponseValue(this.assets.getResponseValueFormat())),
                i && (i.addClass("lrn-slide-up lrn-fade-out").one("transitionend", (function() {
                    t.renderFileList(),
                    t.eventBus.trigger("fileRemoved"),
                    t.renderToolbar()
                }
                )),
                i.nextAll("li").addClass("lrn-slide-up"))
            },
            retryUpload: function retryUpload(e) {
                var t = this.assets.get(e);
                t && t.get("hasFailed") && this.retryUploadingFiles([t])
            },
            retryUploadingFiles: function retryUploadingFiles(e) {
                e || (e = this.assets.where({
                    hasFailed: !0
                })),
                e.length && (this.subViews.notifications && this.subViews.notifications.remove(),
                r()(e).invoke("retryUpload"),
                this.renderFileList())
            },
            launchFileBrowser: function launchFileBrowser() {
                this.$(this.SELECTORS.FILE_INPUT).click()
            },
            onCameraAccessDenied: function onCameraAccessDenied() {
                this.closeWebcam()
            },
            launchWebcam: function launchWebcam() {
                var e = this;
                this.subViews.webcam = new z({
                    eventBus: this.eventBus,
                    i18n: this.activity.get("i18n")
                }),
                this.subViews.modal = new Z.a({
                    contentView: this.subViews.webcam
                }),
                this.listenTo(this.subViews.modal, "dismiss", (function(t) {
                    e.subViews.webcam.deleteCheck() || t.preventDefault()
                }
                )),
                this.$el.append(this.subViews.modal.render().$el),
                this.subViews.modal.show(),
                this.preventTab(),
                this.listenToOnce(this.subViews.modal, "remove", this.enableTab)
            },
            preventTab: function preventTab() {
                r()(this.subViews).forEach((function(e) {
                    r.a.isFunction(e.disableTab) && e.disableTab()
                }
                ))
            },
            enableTab: function enableTab() {
                r()(this.subViews).forEach((function(e) {
                    r.a.isFunction(e.enableTab) && e.enableTab()
                }
                ))
            },
            closeWebcam: function closeWebcam() {
                var e = this.subViews.modal;
                e && e.remove()
            },
            updateMainView: function updateMainView() {
                this.assets.length > 0 ? (this.$(this.SELECTORS.FILELIST_OUTLET).removeClass("hidden"),
                this.$(this.SELECTORS.UPLOAD_OUTLET).addClass("hidden")) : (this.$(this.SELECTORS.FILELIST_OUTLET).addClass("hidden"),
                this.$(this.SELECTORS.UPLOAD_OUTLET).removeClass("hidden"),
                this.eventBus.trigger("exitDeleteMode")),
                this.isInDeleteMode ? this.$(te.FILE_DELETE_BTN).css({
                    opacity: ""
                }) : this.$(te.FILE_DELETE_BTN).css({
                    opacity: 1
                }),
                this.renderToolbar(),
                this.renderStatusBar()
            },
            fileUploaded: function fileUploaded(e) {
                this.renderFileList(),
                this.model.updateResponseValue(this.assets.getResponseValueFormat()),
                this.afterUploadsProcessed()
            },
            fileUploadFailed: function fileUploadFailed(e) {
                e && (this.renderNotifications({
                    type: "danger",
                    message: "".concat(e.get("name"), " ").concat(this.i18n.labels.fileUpload.notification.couldNotUpload)
                }),
                this.renderFileList(),
                this.afterUploadsProcessed())
            },
            setDisabled: function setDisabled(e) {
                this.isReadOnly = e,
                this.setEventsDisabled(e),
                this.renderToolbar(),
                this.renderUploadView(),
                this.renderFileList(),
                this.closeWebcam()
            },
            isUploading: function isUploading() {
                return !!this.assets.find({
                    status: J.a.prototype.UPLOAD_STATUS.uploading
                })
            },
            afterUploadsProcessed: function afterUploadsProcessed() {
                var e = this.assets.where({
                    hasNotifiedFailure: !1,
                    hasFailed: !0
                });
                if (e.length > 0 && !this.isUploading()) {
                    var t = e.map((function(e) {
                        return e.get("name")
                    }
                    ));
                    e.map((function(e) {
                        return e.clearFailNotification()
                    }
                    )),
                    V.a.exception({
                        code: 10029,
                        detail: "Unable to upload: ".concat(t.join(", ")),
                        response_id: this.model.get("response_id")
                    })
                } else
                    this.renderToolbar()
            }
        });
        t.default = {
            Model: s,
            View: ae
        }
    }
}]);

var YYG;
(function (YYG) {
    var Version = /** @class */ (function () {
        function Version() {
        }
        Version.Ver = "1.1.3";
        return Version;
    }());
    YYG.Version = Version;
})(YYG || (YYG = {}));
//# sourceMappingURL=Version.js.map
var YYG;
(function (YYG) {
    /**
     * YYG äº‹ä»¶ç±»åž‹
     */
    var Event = /** @class */ (function () {
        function Event() {
        }
        /**
         * å¹¿å‘Šå¼€å§‹æ’­æ”¾
         */
        Event.AD_STARTED = "AD_STARTED";
        /**
         * å¹¿å‘ŠåŠ è½½å®Œæˆ
         */
        Event.AD_LOADED = "AD_LOADED";
        /**
         * å¹¿å‘Šç‚¹å‡»
         */
        Event.AD_CLICK = "AD_CLICK";
        /**
         * å¹¿å‘Šæ’­æ”¾å®Œæˆ
         */
        Event.AD_COMPLETE = "AD_COMPLETE";
        /**
         * å¹¿å‘Šç‚¹å‡»è·³è¿‡
         */
        Event.AD_SKIPPED = "AD_SKIPPED";
        /**
         * æ¸¸æˆå†…å¹¿å‘Šä¸å¯ç”¨
         */
        Event.AD_INGAME_DISABLED = "AD_INGAME_DISABLED";
        /**
         * å¹¿å‘Šè¯·æ±‚è¿‡å¿«
         */
        Event.AD_REQUEST_TOO_SOON = "AD_REQUEST_TOO_SOON";
        /**
         * å¹¿å‘Šé”™è¯¯
         */
        Event.AD_ERROR = "AD_ERROR";
        /**
         * SDKåˆå§‹åŒ–æˆåŠŸ
         */
        Event.YYGSDK_INITIALIZED = "SDK_INITIALIZED";
        /**
         * SDKåˆå§‹åŒ–æˆåŠŸ
         */
        Event.YYGSDK_NOT_INITIALIZED = "YYGSDK_NOT_INITIALIZED";
        /**
         * æœåŠ¡å™¨è¯·æ±‚å‚æ•°è¶…æ—¶
         */
        Event.SEVRVER_OPTIONS_TIMEOUT = "SEVRVER_OPTIONS_TIMEOUT";
        return Event;
    }());
    YYG.Event = Event;
})(YYG || (YYG = {}));
//# sourceMappingURL=Event.js.map
var YYG;
(function (YYG) {
    /**
     * å¹¿å‘Šç±»åž‹
     */
    var TYPE = /** @class */ (function () {
        function TYPE() {
        }
        /**
         * æ’å±å¹¿å‘Š
         * æœ‰æ—¶é—´é—´éš”
         */
        TYPE.INTERSTITIAL = "INTERSTITIAL";
        /**
         * å¥–åŠ±å¹¿å‘Š
         * æ— æ—¶é—´é—´éš”
         * ç”¨æˆ·ä¸»åŠ¨è§¦å‘
         */
        TYPE.REWARD = "REWARD";
        return TYPE;
    }());
    YYG.TYPE = TYPE;
})(YYG || (YYG = {}));
//# sourceMappingURL=TYPE.js.map
var YYG;
(function (YYG) {
    /**
     * <p><code>EventHandler</code> æ˜¯äº‹ä»¶å¤„ç†å™¨ç±»ã€‚</p>
     * <p>æŽ¨èä½¿ç”¨ EventHandler.create() æ–¹æ³•ä»Žå¯¹è±¡æ± åˆ›å»ºï¼Œå‡å°‘å¯¹è±¡åˆ›å»ºæ¶ˆè€—ã€‚
     * åˆ›å»ºçš„ Handler å¯¹è±¡ä¸å†ä½¿ç”¨åŽï¼Œå¯ä»¥ä½¿ç”¨ Handler.recover() å°†å…¶å›žæ”¶åˆ°å¯¹è±¡æ± ï¼Œå›žæ”¶åŽä¸è¦å†ä½¿ç”¨æ­¤å¯¹è±¡ï¼Œå¦åˆ™ä¼šå¯¼è‡´ä¸å¯é¢„æ–™çš„é”™è¯¯ã€‚</p>
     */
    var EventHandler = /** @class */ (function () {
        /**
         * æ ¹æ®æŒ‡å®šçš„å±žæ€§å€¼ï¼Œåˆ›å»ºä¸€ä¸ª <code>Handler</code> ç±»çš„å®žä¾‹ã€‚
         * @param	caller æ‰§è¡ŒåŸŸã€‚
         * @param	method å¤„ç†å‡½æ•°ã€‚
         * @param	args å‡½æ•°å‚æ•°ã€‚
         * @param	once æ˜¯å¦åªæ‰§è¡Œä¸€æ¬¡ã€‚
         */
        function EventHandler(caller, method, args, once) {
            this.once = false;
            this._id = 0;
            this.setTo(caller, method, args, once);
        }
        /**
         * è®¾ç½®æ­¤å¯¹è±¡çš„æŒ‡å®šå±žæ€§å€¼ã€‚
         * @param	caller æ‰§è¡ŒåŸŸ(this)ã€‚
         * @param	method å›žè°ƒæ–¹æ³•ã€‚
         * @param	args æºå¸¦çš„å‚æ•°ã€‚
         * @param	once æ˜¯å¦åªæ‰§è¡Œä¸€æ¬¡ï¼Œå¦‚æžœä¸ºtrueï¼Œæ‰§è¡ŒåŽæ‰§è¡Œrecover()è¿›è¡Œå›žæ”¶ã€‚
         * @return  è¿”å›ž handler æœ¬èº«ã€‚
         */
        EventHandler.prototype.setTo = function (caller, method, args, once) {
            this._id = EventHandler._gid++;
            this.caller = caller;
            this.method = method;
            this.args = args;
            this.once = once;
            return this;
        };
        /**
         * æ‰§è¡Œå¤„ç†å™¨ã€‚
         */
        EventHandler.prototype.run = function () {
            if (this.method == null)
                return null;
            var id = this._id;
            var result = this.method.apply(this.caller, this.args);
            this._id === id && this.once && this.recover();
            return result;
        };
        /**
         * æ‰§è¡Œå¤„ç†å™¨ï¼Œæºå¸¦é¢å¤–æ•°æ®ã€‚
         * @param	data é™„åŠ çš„å›žè°ƒæ•°æ®ï¼Œå¯ä»¥æ˜¯å•æ•°æ®æˆ–è€…Array(ä½œä¸ºå¤šå‚)ã€‚
         */
        EventHandler.prototype.runWith = function (data) {
            if (this.method == null)
                return null;
            var id = this._id;
            if (data == null)
                var result = this.method.apply(this.caller, this.args);
            else if (!this.args && !data.unshift)
                result = this.method.call(this.caller, data);
            else if (this.args)
                result = this.method.apply(this.caller, this.args.concat(data));
            else
                result = this.method.apply(this.caller, data);
            this._id === id && this.once && this.recover();
            return result;
        };
        EventHandler.prototype.clear = function () {
            this.caller = null;
            this.method = null;
            this.args = null;
            return this;
        };
        /**
         * æ¸…ç†å¯¹è±¡å¼•ç”¨ã€‚
         */
        EventHandler.prototype.recover = function () {
            if (this._id > 0) {
                this._id = 0;
                EventHandler._pool.push(this.clear());
            }
        };
        /**
         * ä»Žå¯¹è±¡æ± å†…åˆ›å»ºä¸€ä¸ªHandlerï¼Œé»˜è®¤ä¼šæ‰§è¡Œä¸€æ¬¡å¹¶ç«‹å³å›žæ”¶ï¼Œå¦‚æžœä¸éœ€è¦è‡ªåŠ¨å›žæ”¶ï¼Œè®¾ç½®onceå‚æ•°ä¸ºfalseã€‚
         * @param	caller æ‰§è¡ŒåŸŸ(this)ã€‚
         * @param	method å›žè°ƒæ–¹æ³•ã€‚
         * @param	args æºå¸¦çš„å‚æ•°ã€‚
         * @param	once æ˜¯å¦åªæ‰§è¡Œä¸€æ¬¡ï¼Œå¦‚æžœä¸ºtrueï¼Œå›žè°ƒåŽæ‰§è¡Œrecover()è¿›è¡Œå›žæ”¶ï¼Œé»˜è®¤ä¸ºtrueã€‚
         * @return  è¿”å›žåˆ›å»ºçš„handlerå®žä¾‹ã€‚
         */
        EventHandler.create = function (caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = true; }
            if (EventHandler._pool.length)
                return EventHandler._pool.pop().setTo(caller, method, args, once);
            return new EventHandler(caller, method, args, once);
        };
        EventHandler._pool = [];
        EventHandler._gid = 1;
        return EventHandler;
    }());
    YYG.EventHandler = EventHandler;
})(YYG || (YYG = {}));
//# sourceMappingURL=EventHandler.js.map
var YYG;
(function (YYG) {
    /**
     * <code>EventDispatcher</code> ç±»æ˜¯å¯è°ƒåº¦äº‹ä»¶çš„æ‰€æœ‰ç±»çš„åŸºç±»ã€‚
     */
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
        }
        /**
         * æ£€æŸ¥ EventDispatcher å¯¹è±¡æ˜¯å¦ä¸ºç‰¹å®šäº‹ä»¶ç±»åž‹æ³¨å†Œäº†ä»»ä½•ä¾¦å¬å™¨ã€‚
         * @param	type äº‹ä»¶çš„ç±»åž‹ã€‚
         * @return å¦‚æžœæŒ‡å®šç±»åž‹çš„ä¾¦å¬å™¨å·²æ³¨å†Œï¼Œåˆ™å€¼ä¸º trueï¼›å¦åˆ™ï¼Œå€¼ä¸º falseã€‚
         */
        EventDispatcher.prototype.hasListener = function (type) {
            var listener = this._events && this._events[type];
            return !!listener;
        };
        /**
         * æ´¾å‘äº‹ä»¶ã€‚
         * @param type	äº‹ä»¶ç±»åž‹ã€‚
         * @param data	ï¼ˆå¯é€‰ï¼‰å›žè°ƒæ•°æ®ã€‚<b>æ³¨æ„ï¼š</b>å¦‚æžœæ˜¯éœ€è¦ä¼ é€’å¤šä¸ªå‚æ•° p1,p2,p3,...å¯ä»¥ä½¿ç”¨æ•°ç»„ç»“æž„å¦‚ï¼š[p1,p2,p3,...] ï¼›å¦‚æžœéœ€è¦å›žè°ƒå•ä¸ªå‚æ•° p ï¼Œä¸” p æ˜¯ä¸€ä¸ªæ•°ç»„ï¼Œåˆ™éœ€è¦ä½¿ç”¨ç»“æž„å¦‚ï¼š[p]ï¼Œå…¶ä»–çš„å•ä¸ªå‚æ•° p ï¼Œå¯ä»¥ç›´æŽ¥ä¼ å…¥å‚æ•° pã€‚
         * @return æ­¤äº‹ä»¶ç±»åž‹æ˜¯å¦æœ‰ä¾¦å¬è€…ï¼Œå¦‚æžœæœ‰ä¾¦å¬è€…åˆ™å€¼ä¸º trueï¼Œå¦åˆ™å€¼ä¸º falseã€‚
         */
        EventDispatcher.prototype.event = function (type, data) {
            if (!this._events || !this._events[type])
                return false;
            var listeners = this._events[type];
            if (listeners.run) {
                if (listeners.once)
                    delete this._events[type];
                data != null ? listeners.runWith(data) : listeners.run();
            }
            else {
                for (var i = 0, n = listeners.length; i < n; i++) {
                    var listener = listeners[i];
                    if (listener) {
                        (data != null) ? listener.runWith(data) : listener.run();
                    }
                    if (!listener || listener.once) {
                        listeners.splice(i, 1);
                        i--;
                        n--;
                    }
                }
                if (listeners.length === 0 && this._events)
                    delete this._events[type];
            }
            return true;
        };
        /**
         * ä½¿ç”¨ EventDispatcher å¯¹è±¡æ³¨å†ŒæŒ‡å®šç±»åž‹çš„äº‹ä»¶ä¾¦å¬å™¨å¯¹è±¡ï¼Œä»¥ä½¿ä¾¦å¬å™¨èƒ½å¤ŸæŽ¥æ”¶äº‹ä»¶é€šçŸ¥ã€‚
         * @param type		äº‹ä»¶çš„ç±»åž‹ã€‚
         * @param caller	äº‹ä»¶ä¾¦å¬å‡½æ•°çš„æ‰§è¡ŒåŸŸã€‚
         * @param listener	äº‹ä»¶ä¾¦å¬å‡½æ•°ã€‚
         * @param args		ï¼ˆå¯é€‰ï¼‰äº‹ä»¶ä¾¦å¬å‡½æ•°çš„å›žè°ƒå‚æ•°ã€‚
         * @return æ­¤ EventDispatcher å¯¹è±¡ã€‚
         */
        EventDispatcher.prototype.on = function (type, caller, listener, args) {
            return this._createListener(type, caller, listener, args, false);
        };
        /**
         * ä½¿ç”¨ EventDispatcher å¯¹è±¡æ³¨å†ŒæŒ‡å®šç±»åž‹çš„äº‹ä»¶ä¾¦å¬å™¨å¯¹è±¡ï¼Œä»¥ä½¿ä¾¦å¬å™¨èƒ½å¤ŸæŽ¥æ”¶äº‹ä»¶é€šçŸ¥ï¼Œæ­¤ä¾¦å¬äº‹ä»¶å“åº”ä¸€æ¬¡åŽè‡ªåŠ¨ç§»é™¤ã€‚
         * @param type		äº‹ä»¶çš„ç±»åž‹ã€‚
         * @param caller	äº‹ä»¶ä¾¦å¬å‡½æ•°çš„æ‰§è¡ŒåŸŸã€‚
         * @param listener	äº‹ä»¶ä¾¦å¬å‡½æ•°ã€‚
         * @param args		ï¼ˆå¯é€‰ï¼‰äº‹ä»¶ä¾¦å¬å‡½æ•°çš„å›žè°ƒå‚æ•°ã€‚
         * @return æ­¤ EventDispatcher å¯¹è±¡ã€‚
         */
        EventDispatcher.prototype.once = function (type, caller, listener, args) {
            return this._createListener(type, caller, listener, args, true);
        };
        /**
         * ä»Ž EventDispatcher å¯¹è±¡ä¸­åˆ é™¤ä¾¦å¬å™¨ã€‚
         * @param type		äº‹ä»¶çš„ç±»åž‹ã€‚
         * @param caller	äº‹ä»¶ä¾¦å¬å‡½æ•°çš„æ‰§è¡ŒåŸŸã€‚
         * @param listener	äº‹ä»¶ä¾¦å¬å‡½æ•°ã€‚
         * @param onceOnly	ï¼ˆå¯é€‰ï¼‰å¦‚æžœå€¼ä¸º true ,åˆ™åªç§»é™¤é€šè¿‡ once æ–¹æ³•æ·»åŠ çš„ä¾¦å¬å™¨ã€‚
         * @return æ­¤ EventDispatcher å¯¹è±¡ã€‚
         */
        EventDispatcher.prototype.off = function (type, caller, listener, onceOnly) {
            if (!this._events || !this._events[type])
                return this;
            var listeners = this._events[type];
            if (listeners != null) {
                if (listeners.run) {
                    if ((!caller || listeners.caller === caller) && (listener == null || listeners.method === listener) && (!onceOnly || listeners.once)) {
                        delete this._events[type];
                        listeners.recover();
                    }
                }
                else {
                    var count = 0;
                    for (var i = 0, n = listeners.length; i < n; i++) {
                        var item = listeners[i];
                        if (!item) {
                            count++;
                            continue;
                        }
                        if (item && (!caller || item.caller === caller) && (listener == null || item.method === listener) && (!onceOnly || item.once)) {
                            count++;
                            listeners[i] = null;
                            item.recover();
                        }
                    }
                    if (count === n)
                        delete this._events[type];
                }
            }
            return this;
        };
        /**
         * ä»Ž EventDispatcher å¯¹è±¡ä¸­åˆ é™¤æŒ‡å®šäº‹ä»¶ç±»åž‹çš„æ‰€æœ‰ä¾¦å¬å™¨ã€‚
         * @param type	ï¼ˆå¯é€‰ï¼‰äº‹ä»¶ç±»åž‹ï¼Œå¦‚æžœå€¼ä¸º nullï¼Œåˆ™ç§»é™¤æœ¬å¯¹è±¡æ‰€æœ‰ç±»åž‹çš„ä¾¦å¬å™¨ã€‚
         * @return æ­¤ EventDispatcher å¯¹è±¡ã€‚
         */
        EventDispatcher.prototype.offAll = function (type) {
            var events = this._events;
            if (!events)
                return this;
            if (type) {
                this._recoverHandlers(events[type]);
                delete events[type];
            }
            else {
                for (var name in events) {
                    this._recoverHandlers(events[name]);
                }
                this._events = null;
            }
            return this;
        };
        /**
         * ç§»é™¤callerä¸ºtargetçš„æ‰€æœ‰äº‹ä»¶ç›‘å¬
         * @param caller callerå¯¹è±¡
         */
        EventDispatcher.prototype.offAllCaller = function (caller) {
            if (caller && this._events) {
                for (var name in this._events) {
                    this.off(name, caller, null);
                }
            }
            return this;
        };
        EventDispatcher.prototype._recoverHandlers = function (arr) {
            if (!arr)
                return;
            if (arr.run) {
                arr.recover();
            }
            else {
                for (var i = arr.length - 1; i > -1; i--) {
                    if (arr[i]) {
                        arr[i].recover();
                        arr[i] = null;
                    }
                }
            }
        };
        EventDispatcher.prototype._createListener = function (type, caller, listener, args, once, offBefore) {
            offBefore && this.off(type, caller, listener, once);
            var handler = YYG.EventHandler.create(caller || this, listener, args, once);
            this._events || (this._events = {});
            var events = this._events;
            if (!events[type])
                events[type] = handler;
            else {
                if (!events[type].run)
                    events[type].push(handler);
                else
                    events[type] = [events[type], handler];
            }
            return this;
        };
        return EventDispatcher;
    }());
    YYG.EventDispatcher = EventDispatcher;
})(YYG || (YYG = {}));
//# sourceMappingURL=EventDispatcher.js.map
var YYG;
(function (YYG) {
    var ChannelType;
    (function (ChannelType) {
        ChannelType[ChannelType["YAD"] = 0] = "YAD";
        ChannelType[ChannelType["YIV"] = 1] = "YIV";
        ChannelType[ChannelType["BABYGAMES"] = 2] = "BABYGAMES";
        ChannelType[ChannelType["BESTGAMES"] = 3] = "BESTGAMES";
        ChannelType[ChannelType["CARGAMES"] = 4] = "CARGAMES";
    })(ChannelType = YYG.ChannelType || (YYG.ChannelType = {}));
    var Options = /** @class */ (function () {
        function Options() {
            /**
             * å¼€å‘è€…ç‰ˆæœ¬
             */
            this.version = 0;
            /**
             * æ˜¯å¦ä¸ºgamedistribution
             */
            this.isGamedistribution = false;
            this.iu = "";
            this.forgames = [];
            /**
             * æ˜¯å¦è·³è½¬åˆ°é¡¶çº§åŸŸå
             */
            this.redirect = 0;
            /**
             * æ˜¯å¦ä¸ºè¯•è°ƒæ¨¡å¼
             */
            this.debug = false;
            /**
             * æ˜¯å¦ä¸ºæœ¬åœ°æµ‹è¯•
             */
            this.isLocal = false;
            /**
             * logoå’ŒmoregamesæŒ‰é’®ç‚¹å‡»æ˜¯å¦æ‰“å¼€ç½‘ç«™ï¼›
             * 0ï¼šä¸èƒ½ï¼›1ï¼šèƒ½
             */
            this.linksClickable = true;
            this.canForgames = false;
            this.forgamesCooldown = true;
            this.videoLength = 1;
            this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        }
        /**
         * è®¾ç½®æœåŠ¡å™¨æ•°æ®
         */
        Options.prototype.setData = function (data) {
            this.redirect = data.redirect;
            this.adstxt = data.adstxt;
            this.inGameAd = data.inGameAd;
            this.linksClickable = data.linksClickable;
            this.thumb = data.thumb;
            this.videoAdType = data.videoAdType;
            this.videoLength = data.videoLength;
            this.adInterval = data.adInterval;
            YYG.Utils.LOG("==================INIT PARAMS==================");
            YYG.Utils.LOG("redirect:", this.redirect);
            YYG.Utils.LOG("adstxt:", this.adstxt);
            YYG.Utils.LOG("inGameAd:", this.inGameAd);
            YYG.Utils.LOG("linksClickable:", this.linksClickable);
            YYG.Utils.LOG("thumb:", this.thumb);
            YYG.Utils.LOG("videoAdType:", this.videoAdType);
            YYG.Utils.LOG("videoLength:", this.videoLength);
            YYG.Utils.LOG("adInterval:", this.adInterval);
            YYG.Utils.LOG("===============================================");
        };
        Options.prototype.setChannel = function (channel) {
            this.channel = channel;
            if (channel === ChannelType.YAD) {
                this.channelURL = "https://www.yad.com/";
                this.channelName = "YAD.Com";
                this.iu = "/21627520311/YAD_InGame";
            }
            else if (channel === ChannelType.YIV) {
                this.channelURL = "https://www.yiv.com/";
                this.channelName = "YIV.Com";
                this.iu = "/21627520311/Yiv_InGame";
            }
            else if (channel === ChannelType.BABYGAMES) {
                this.channelURL = "https://www.babygames.com/";
                this.channelName = "BabyGames.Com";
                this.iu = "/21627520311/BabyGames_InGame_Adunit";
            }
            else if (channel === ChannelType.BESTGAMES) {
                this.channelURL = "https://www.bestgames.com/";
                this.channelName = "BestGames.Com";
                this.iu = "/21627520311/BestGames_InGame_Adunit";
            }
            else if (channel === ChannelType.CARGAMES) {
                this.channelURL = "https://cargames.com/";
                this.channelName = "CarGames.Com";
                this.iu = "/21627520311/CarGames_InGame_Adunit";
            }
            else {
                YYG.MessageUI.popup("Error", "CHANNEL ERROR");
            }
        };
        Object.defineProperty(Options.prototype, "ad_type", {
            // 0: ad_type=image
            // 1: ad_type=skippablevideo_image
            // 2: ad_type=standardvideo_image
            // 3: ad_type=video_image
            /**èŽ·å–è§†é¢‘ç±»åž‹ */
            get: function () {
                switch (this.videoAdType) {
                    case 0:
                        return "VideoAdType%3DNone";
                    case 1:
                        return "VideoAdType%3DSkip";
                    case 2:
                        return "VideoAdType%3DStandard";
                    case 3:
                        return "VideoAdType%3DAll";
                    default:
                        return "VideoAdType%3DAll";
                }
            },
            enumerable: true,
            configurable: true
        });
        return Options;
    }());
    YYG.Options = Options;
})(YYG || (YYG = {}));
//# sourceMappingURL=Options.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var YYG;
(function (YYG) {
    /** å¹¿å‘Šç®¡ç†å™¨ */
    var AdsManager = /** @class */ (function (_super) {
        __extends(AdsManager, _super);
        function AdsManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isFistLook = false;
            _this.canForgames = false;
            _this.forgamesCooldonw = false;
            /**å®šæ—¶å™¨æ—¶é—´ */
            _this._intervalTimer = 0;
            /**æ—¶é—´å¥æŸ„ */
            _this._intervalHander = 0;
            /**
             * å®¹å™¨åŠ¨ç”»æ—¶å¸¸(æ¯«ç§’)
             */
            _this.containerTransitionSpeed = 300;
            /**
             * å¹¿å‘Šæ˜¯å¦å‡†å¤‡å®Œæ¯•
             */
            _this.__isReady = false;
            /** AdsManager åˆå§‹åŒ–å®Œæˆ */
            _this.__initialized = false;
            return _this;
        }
        /**
         * å¯åŠ¨ AdsManager
         */
        AdsManager.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            /**åŠ è½½è°·æ­ŒSDK */
                            return [4 /*yield*/, this.loadLib().catch(function () { YYG.Utils.adBlock(); })];
                        case 1:
                            /**åŠ è½½è°·æ­ŒSDK */
                            _a.sent();
                            /**åˆå§‹åŒ– Options*/
                            this.__init__();
                            /**æ´¾å‘å®Œæˆäº‹ä»¶*/
                            YYGSDK.event(YYG.Event.YYGSDK_INITIALIZED);
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**åˆå§‹åŒ– UI è°·æ­Œ sdk */
        AdsManager.prototype.__init__ = function () {
            var _this = this;
            /**è§†é¢‘å®¹å™¨ */
            var body = document.body || document.getElementsByTagName("body")[0];
            this._adContainer = document.createElement("div");
            this._adContainer.id = "advertisement";
            this._adContainer.style.position = "fixed";
            this._adContainer.style.zIndex = "0";
            this._adContainer.style.top = "0";
            this._adContainer.style.left = "0";
            this._adContainer.style.width = "100%";
            this._adContainer.style.height = "100%";
            this._adContainer.style.backgroundColor = "#000000";
            /**è§†é¢‘ */
            this._videoContainer = document.createElement("video");
            this._videoContainer.id = "advertisement_video";
            this._videoContainer.style.position = "absolute";
            this._videoContainer.style.backgroundColor = "#000000";
            this._videoContainer.style.top = "0";
            this._videoContainer.style.left = "0";
            this._videoContainer.style.width = YYGSDK.options.width + "px";
            this._videoContainer.style.height = YYGSDK.options.width + "px";
            this._adContainer.appendChild(this._videoContainer);
            this._adContainerInner = document.createElement("div");
            this._adContainerInner.id = "advertisement_slot";
            this._adContainerInner.style.position = "absolute";
            this._adContainerInner.style.top = "0";
            this._adContainerInner.style.left = "0";
            this._adContainerInner.style.width = YYGSDK.options.width + "px";
            this._adContainerInner.style.height = YYGSDK.options.height + "px";
            this._adContainer.appendChild(this._adContainerInner);
            body.appendChild(this._adContainer);
            this._adDisplayContainer = new google.ima.AdDisplayContainer(this._adContainerInner, this._videoContainer);
            this._adDisplayContainer.initialize();
            this._adsLoader = new google.ima.AdsLoader(this._adDisplayContainer);
            this._adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, this._onAdsManagerLoaded.bind(this), false);
            this._adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdsManagerError.bind(this), false);
            //æ£€æµ‹æµè§ˆå™¨å˜åŒ–
            window.addEventListener("resize", function () {
                _this.onResize();
            });
            this.__initialized = true;
            this._hide();
        };
        /**window çª—å£å˜åŒ– */
        AdsManager.prototype.onResize = function () {
            YYGSDK.options.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            YYGSDK.options.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this._adContainerInner.style.width = YYGSDK.options.width + "px";
            this._adContainerInner.style.height = YYGSDK.options.height + "px";
            this._videoContainer.style.width = YYGSDK.options.width + "px";
            this._videoContainer.style.height = YYGSDK.options.height + "px";
            if (this._adsManager) {
                //å¤„ç†å¹¿å‘Šçª—å£å˜åŒ–
                this._adsManager.resize(YYGSDK.options.width, YYGSDK.options.height, google.ima.ViewMode.NORMAL);
            }
        };
        /** åŠ è½½ è°·æ­Œ AdsManager åŠ è½½é”™è¯¯å›žè°ƒ  */
        AdsManager.prototype.onAdsManagerError = function (event) {
            var error = event.getError();
            YYG.Utils.LOG("===============================AD_ERROR====================================");
            YYG.Utils.LOG("ErrorMessage:", error.getMessage());
            YYG.Utils.LOG("ErrorType:", error.getType());
            YYG.Utils.LOG("ErrorCode:", error.getVastErrorCode());
            YYG.Utils.LOG("error:", error);
            YYG.Utils.LOG("===========================================================================");
            this.event(YYG.Event.AD_ERROR);
            YYG.LoaderUI.hide();
            this._hide();
            if (this.__adFailHandler) {
                this.__adFailHandler.runWith(YYG.Event.AD_ERROR);
            }
        };
        /**
         * åŠ è½½ è°·æ­Œ AdsManager åŠ è½½å®Œæˆå›žè°ƒ
         * @param adsManagerLoadedEvent
         */
        AdsManager.prototype._onAdsManagerLoaded = function (adsManagerLoadedEvent) {
            this._adsManager = adsManagerLoadedEvent.getAdsManager(this._videoContainer);
            this._adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.onAdsManagerError.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, this._onAdEvent.bind(this));
            this._adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this._onAdEvent.bind(this));
            try {
                this._adsManager.init(YYGSDK.options.width, YYGSDK.options.height, google.ima.ViewMode.NORMAL);
                this._adsManager.start();
            }
            catch (error) {
                YYG.Utils.LOG("===============================AdsManager_ERROR====================================");
                throw error;
            }
        };
        /**
         * è°·æ­Œ AdsManager äº‹ä»¶å¤„ç†
         * @param adEvent
         * @see  google.ima.AdEvent
         */
        AdsManager.prototype._onAdEvent = function (adEvent) {
            var _this = this;
            switch (adEvent.type) {
                case google.ima.AdEvent.Type.STARTED:
                    this.event(YYG.Event.AD_STARTED);
                    YYG.Utils.LOG("===============================STARTED====================================");
                    break;
                case google.ima.AdEvent.Type.CLICK:
                    this.event(YYG.Event.AD_CLICK);
                    YYG.Utils.LOG("===============================CLICK====================================");
                    break;
                case google.ima.AdEvent.Type.LOADED:
                    YYG.Utils.LOG("===============================LOADED====================================");
                    if (!this.isFistLook) {
                        this.isFistLook = true;
                        var waitCanforgames = function () {
                            YYGSDK.options.canForgames = true;
                            clearInterval(canforgamesInterval_1);
                        };
                        var canforgamesInterval_1 = setInterval(waitCanforgames, 90e3);
                    }
                    this.event(YYG.Event.AD_LOADED);
                    this._show();
                    break;
                case google.ima.AdEvent.Type.COMPLETE:
                    YYG.Utils.LOG("===============================COMPLETE====================================");
                    this.event(YYG.Event.AD_COMPLETE);
                    this._intervalTimer = YYGSDK.options.adInterval || 30;
                    clearInterval(this._intervalHander);
                    this._intervalHander = setInterval(function () { _this.onIntervalTimer(); }, 1e3);
                    this._hide();
                    if (this.__adSuccessHandler) {
                        this.__adSuccessHandler.runWith(YYG.Event.AD_COMPLETE);
                    }
                    if (YYGSDK.options.forgamesCooldown) {
                        YYGSDK.options.forgamesCooldown = false;
                        var forgamesCooldown = function () {
                            YYGSDK.options.forgamesCooldown = true;
                            clearInterval(forgamesCooldownInterval_1);
                        };
                        var forgamesCooldownInterval_1 = setInterval(forgamesCooldown, 5e3);
                    }
                    break;
                case google.ima.AdEvent.Type.SKIPPED:
                    YYG.Utils.LOG("===============================SKIPPED====================================");
                    this.event(YYG.Event.AD_SKIPPED);
                    this._intervalTimer = YYGSDK.options.adInterval || 30;
                    clearInterval(this._intervalHander);
                    this._intervalHander = setInterval(function () { _this.onIntervalTimer(); }, 1e3);
                    this._hide();
                    if (this.__adFailHandler) {
                        this.__adFailHandler.runWith(YYG.Event.AD_SKIPPED);
                    }
                    if (YYGSDK.options.forgamesCooldown) {
                        YYGSDK.options.forgamesCooldown = false;
                        var forgamesCooldown = function () {
                            YYGSDK.options.forgamesCooldown = true;
                            clearInterval(forgamesCooldownInterval_2);
                        };
                        var forgamesCooldownInterval_2 = setInterval(forgamesCooldown, 5e3);
                    }
                    break;
            }
        };
        /**
         * IntervalTimer
         */
        AdsManager.prototype.onIntervalTimer = function () {
            this._intervalTimer--;
            if (this._intervalTimer <= 0) {
                this._intervalTimer = 0;
                clearInterval(this._intervalHander);
            }
        };
        /**
         * å±•ç¤ºå¹¿å‘Š
         */
        AdsManager.prototype._show = function () {
            var _this = this;
            YYG.LoaderUI.hide();
            if (this._adContainer) {
                this._adContainer.style.transform = "translateX(0)";
                this._adContainer.style.zIndex = "99";
                setTimeout(function () { _this._adContainer.style.opacity = "1"; }, 10);
            }
        };
        /**
         * _hide
         * hide the advertisement container.
         * @private
         */
        AdsManager.prototype._hide = function () {
            var _this = this;
            YYG.LoaderUI.hide();
            this._videoContainer.src = "";
            if (this._adContainer) {
                this.__isReady = false;
                ;
                this._adContainer.style.opacity = "0";
                setTimeout(function () {
                    _this._adContainer.style.transform = "translateX(-9999px)";
                    _this._adContainer.style.zIndex = "-1";
                }, this.containerTransitionSpeed);
            }
        };
        /**
         * é‡ç½®
         * @private
         */
        AdsManager.prototype._resetAdsLoader = function () {
            if (this._adsManager) {
                this._adsManager.destroy();
                this._adsManager = null;
            }
            if (this._adsLoader) {
                this._adsLoader.contentComplete();
            }
        };
        /**
         * è¯·æ±‚è§†é¢‘
         * @param success è§†é¢‘æ’­æ”¾å®Œæˆå›žè°ƒ;
         * @param fail  è§†é¢‘æ’­æ”¾å¤±è´¥å›žè°ƒ;
         */
        AdsManager.prototype.request = function (adType, success, fail) {
            if (this.__isReady) {
                YYG.Utils.LOG("===============================AD_ALREADY_START====================================");
                return;
            }
            if (!this.__initialized) {
                this.event(YYG.Event.YYGSDK_NOT_INITIALIZED);
                fail && fail.runWith(YYG.Event.YYGSDK_NOT_INITIALIZED);
                return;
            }
            if (YYGSDK.options.inGameAd === 0) {
                this.event(YYG.Event.AD_INGAME_DISABLED);
                fail && fail.runWith(YYG.Event.AD_INGAME_DISABLED);
                YYG.Utils.LOG("===============================AD_INGAME_DISABLED====================================");
                return;
            }
            this._adType = adType;
            if (adType === YYG.TYPE.INTERSTITIAL && this._intervalTimer > 0) {
                this.event(YYG.Event.AD_REQUEST_TOO_SOON);
                fail && fail.runWith(YYG.Event.AD_REQUEST_TOO_SOON);
                YYG.Utils.LOG("===============================INTERSTITIAL REQUESTING TOO SOON :" + this._intervalTimer + "====================================");
                return;
            }
            YYG.Utils.LOG("===============================REQUEST START====================================");
            this.__adSuccessHandler = success;
            this.__adFailHandler = fail;
            this.__isReady = true;
            this.doAdsRequest();
        };
        /**è¯·æ±‚è§†é¢‘ */
        AdsManager.prototype.doAdsRequest = function () {
            var _this = this;
            this._resetAdsLoader();
            return new Promise(function (resolve) {
                try {
                    _this.onResize();
                    var adsRequest = new google.ima.AdsRequest();
                    adsRequest.adTagUrl = _this.initTagWithGampad();
                    adsRequest.nonLinearAdSlotWidth = YYGSDK.options.width;
                    adsRequest.nonLinearAdSlotHeight = YYGSDK.options.height;
                    adsRequest.linearAdSlotHeight = YYGSDK.options.width;
                    adsRequest.linearAdSlotHeight = YYGSDK.options.height;
                    adsRequest.forceNonLinearFullSlot = true;
                    adsRequest.setAdWillAutoPlay(false);
                    adsRequest.setAdWillPlayMuted(false);
                    _this._adsLoader.requestAds(adsRequest);
                    //YIV YAD å–æ¶ˆloading
                    // if(YYGSDK.options.channel === YYG.ChannelType.YIV || YYGSDK.options.channel === YYG.ChannelType.YAD){
                    // }else{
                    // }
                    YYG.LoaderUI.show();
                    resolve(adsRequest);
                }
                catch (error) {
                    YYG.LoaderUI.hide();
                    throw new Error(error);
                }
            });
        };
        /**åŠ è½½GoogleSDK */
        AdsManager.prototype.loadLib = function () {
            return new Promise(function (resolve, reject) {
                var library = document.createElement("script");
                library.onload = function () { resolve(); };
                library.onerror = function () { reject(); };
                library.type = "text/javascript";
                library.async = true;
                if (YYGSDK.options.debug) {
                    library.src = "https://imasdk.googleapis.com/js/sdkloader/ima3_debug.js";
                }
                else {
                    library.src = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
                }
                library.id = "GoogleSDK";
                document.head.appendChild(library);
            });
        };
        // /**
        //  * åˆå§‹åŒ–Pagead URL
        //  */
        // private initTagWithPagead():string
        // {
        //     let url = "https://googleads.g.doubleclick.net/pagead/ads?"+
        //                 /**
        //                  *  //å‘å¸ƒå•†çš„ç½‘ç»œåª’ä½“èµ„æº IDã€‚ å¿…å¡«é¡¹
        //                  * @param å¿…å¡«é¡¹
        //                  */
        //                 "client=ca-games-pub-8878716159434368" +
        //                 /**
        //                  * (String) æŒ‡å®šæ‰€éœ€çš„å¹¿å‘Šç±»åž‹ã€‚åº”ä½¿ç”¨ä¸‹åˆ’çº¿è¿žæŽ¥èµ·æ¥ã€‚
        //                  * @param å¿…å¡«é¡¹
        //                  */
        //                 "&ad_type=" + YYGSDK.options.ad_type +
        //                 //å¹¿å‘Šå¼€å§‹å±•ç¤ºæ—¶è§†é¢‘æ’­æ”¾çš„æ¯«ç§’æ•°ã€‚é»˜è®¤è®¾ç½®ä¸ºæ’æ’­å¹¿å‘Šçš„å€¼ï¼ˆå…·ä½“è€Œè¨€ï¼Œå°±æ˜¯è®¾ç½®ä¸º 1
        //                 "&videoad_start_delay="+0+
        //                 //(String) è¯­è¨€ä»£ç ï¼Œç”¨äºŽè¯·æ±‚ä½¿ç”¨è¯¥è¯­è¨€çš„å¹¿å‘Šã€‚
        //                 // "&hl="+"en" +
        //                 //(Integer) æŒ‡å®šå¿…é¡»è¿”å›žçš„è§†é¢‘æ—¶é•¿ä¸Šé™ï¼ˆä»¥æ¯«ç§’ä¸ºå•ä½ï¼‰
        //                 "&max_ad_duration=" + (YYGSDK.options.videoLength * 1e3) +
        //                 //ç¡®å®šç”¨æ¥è¿‡æ»¤æ‰€å±•ç¤ºå¹¿å‘Šçš„è®¾ç½®ã€‚é»˜è®¤è®¾ç½®ä¸º highã€‚
        //                 "&adsafe="+"high"+
        //                 //(String) æŒ‡å®šæ­¤æ¬¡æ˜¯å¦æ˜¯æµ‹è¯•æ€§è´¨çš„å®žæ–½ã€‚å¯èƒ½çš„å€¼ä¸º on æˆ– offã€‚
        //                 "&adtest="+"on"+
        //                 /**
        //                  * (String) ç»è¿‡ç½‘å€ç¼–ç çš„å®Œæ•´ç½‘å€
        //                  * @param å¿…å¡«é¡¹
        //                  */
        //                 "&description_url="+encodeURIComponent(location.href);
        //    return  url
        // }
        /**
         * åˆå§‹åŒ–Gampad URL
         */
        AdsManager.prototype.initTagWithGampad = function () {
            var _adType = YYGSDK.options.ad_type;
            if (this._adType === YYG.TYPE.REWARD) {
                _adType = "VideoAdType%3DAll";
            }
            if (YYGSDK.options.debug) {
                // _adType = "VideoAdType%3DTest";
            }
            var url = "https://pubads.g.doubleclick.net/gampad/ads?" +
                /**
                 * ä¸»è§†é¢‘å¹¿å‘Šçš„å°ºå¯¸
                 * @param å¿…å¡«é¡¹
                 */
                "sz=640x480" +
                /**
                 * å½“å‰å¹¿å‘Šçš„å•å…ƒ
                 * @param å¿…å¡«é¡¹
                 */
                "&iu=" + YYGSDK.options.iu +
                /**
                 * è¡¨ç¤ºè¯·æ±‚æ¥è‡ªè§†é¢‘æ’­æ”¾å™¨ã€‚
                 * @param å¿…å¡«é¡¹
                 */
                "&env=vp" +
                /**
                 * å°†è¯¥å€¼è®¾ç½®ä¸º 1 ä¼šå¯ç”¨å»¶è¿Ÿå±•ç¤ºè§†é¢‘ã€‚
                 * @param å¿…å¡«é¡¹
                 */
                "&unviewed_position_start=1" +
                /**
                 * è¡¨ç¤ºç”¨æˆ·åœ¨ Ad Manager æž¶æž„ä¸­ã€‚
                 * @param å¿…å¡«é¡¹
                 */
                "&gdfp_req=1" +
                /**
                 * å¹¿å‘Šçš„è¾“å‡ºæ ¼å¼
                 * @param å¿…å¡«é¡¹
                 */
                "&output=" + "vast" +
                /**
                 * é¢å‘å„¿ç«¥å†…å®¹
                 * @param å¿…å¡«é¡¹
                 */
                "&tfcd=0" +
                "&npa=0" +
                "&impl=s" +
                "&cust_params=" + _adType +
                /**
                 * æ­¤å€¼åº”è¯¥ç”¨äºŽæè¿°åœ¨ç½‘é¡µä¸Šæ’­æ”¾çš„è§†é¢‘
                 * @param å¿…å¡«é¡¹
                 */
                "&description_url" + +encodeURIComponent(location.href);
            return url;
        };
        return AdsManager;
    }(YYG.EventDispatcher));
    YYG.AdsManager = AdsManager;
})(YYG || (YYG = {}));
//# sourceMappingURL=AdsManager.js.map
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var YYG;
(function (YYG) {
    var AdsManagerGD = /** @class */ (function (_super) {
        __extends(AdsManagerGD, _super);
        function AdsManagerGD() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AdsManagerGD.prototype.onEvent = function (event) {
            console.log("event.name ====", event);
            switch (event.name) {
                case "AD_ERROR":
                    this.onAdsManagerError(event);
                    break;
                case "SDK_GAME_START":
                    setTimeout(function () {
                        window["gdsdk"].preloadAd('rewarded')
                            .then(function (response) {
                                console.log("preloadAd_ok");
                            })
                            .catch(function (error) {
                                console.log('preload failed', error);
                                "";
                            });
                    }, 200);
                    if (event.status === "warning") {
                        this.event(YYG.Event.AD_REQUEST_TOO_SOON);
                        this.__adFailHandler && this.__adFailHandler.runWith(YYG.Event.AD_REQUEST_TOO_SOON);
                        YYG.Utils.LOG("===============================INTERSTITIAL REQUESTING TOO SOON====================================");
                    }
                    break;
                case "SDK_GAME_PAUSE":
                    break;
                case "LOADED":
                    this.event(YYG.Event.AD_LOADED);
                    break;
                case "AD_SDK_FINISHED":
                case "CONTENT_RESUME_REQUESTED":
                    YYG.Utils.LOG("===============================COMPLETE====================================");
                    this.event(YYG.Event.AD_COMPLETE);
                    if (this.__adSuccessHandler) {
                        this.__adSuccessHandler.runWith(YYG.Event.AD_COMPLETE);
                    }
                    break;
                case "SDK_READY":
                    window["gdsdk"].preloadAd('rewarded')
                        .then(function (response) {
                            console.log("preloadAd_ok");
                        })
                        .catch(function (error) {
                            console.log('preload failed', error);
                            "";
                        });
                    break;
                case "AD_SDK_CANCELED":
                case "AD_CANCELED":
                    YYG.Utils.LOG("===============================SKIPPED====================================");
                    this.event(YYG.Event.AD_SKIPPED);
                    if (this.__adFailHandler) {
                        this.__adFailHandler.runWith(YYG.Event.AD_SKIPPED);
                    }
                    break;
                default:
                    break;
            }
        };
        AdsManagerGD.prototype.start = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            window["GD_OPTIONS"] = {
                                gameId: YYGSDK.options.gamedistributionID,
                                onEvent: this.onEvent.bind(this)
                            };
                            return [4 /*yield*/, this.loadLib().catch(function () {
                                YYG.Utils.adBlock();
                            })];
                        case 1:
                            _a.sent();
                            YYGSDK.event(YYG.Event.YYGSDK_INITIALIZED);
                            this.__initialized = true;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
        * è¯·æ±‚è§†é¢‘
        * @param success è§†é¢‘æ’­æ”¾å®Œæˆå›žè°ƒ;
        * @param fail  è§†é¢‘æ’­æ”¾å¤±è´¥å›žè°ƒ;
        */
        AdsManagerGD.prototype.request = function (adType, success, fail) {
            if (!this.__initialized) {
                this.event(YYG.Event.YYGSDK_NOT_INITIALIZED);
                fail && fail.runWith(YYG.Event.YYGSDK_NOT_INITIALIZED);
            }
            if (YYGSDK.options.inGameAd === 0) {
                this.event(YYG.Event.AD_INGAME_DISABLED);
                fail && fail.runWith(YYG.Event.AD_INGAME_DISABLED);
                YYG.Utils.LOG("===============================AD_INGAME_DISABLED====================================");
            }
            this._adType === adType;
            if (adType === YYG.TYPE.INTERSTITIAL && this._intervalTimer > 0) {
                this.event(YYG.Event.AD_REQUEST_TOO_SOON);
                fail && fail.runWith(YYG.Event.AD_REQUEST_TOO_SOON);
                YYG.Utils.LOG("===============================INTERSTITIAL REQUESTING TOO SOON====================================");
                return;
            }
            YYG.Utils.LOG("===============================REQUEST START====================================");
            this.__adSuccessHandler = success;
            this.__adFailHandler = fail;
            if (adType === YYG.TYPE.INTERSTITIAL) {
                window["gdsdk"].showAd();
            }
            else if (adType === YYG.TYPE.REWARD) {
                window["gdsdk"].showAd('rewarded');
            }
        };
        AdsManagerGD.prototype.__init__ = function () { };
        /** åŠ è½½ è°·æ­Œ AdsManager åŠ è½½é”™è¯¯å›žè°ƒ  */
        AdsManagerGD.prototype.onAdsManagerError = function (event) {
            YYG.Utils.LOG("===============================AD_ERROR====================================");
            YYG.Utils.LOG("ErrorMessage:", event.name);
            YYG.Utils.LOG("ErrorType:", event.message);
            YYG.Utils.LOG("===========================================================================");
            this.event(YYG.Event.AD_ERROR);
            if (this.__adFailHandler) {
                this.__adFailHandler.runWith(YYG.Event.AD_ERROR);
            }
        };
        /**åŠ è½½gamedistributionSDK */
        AdsManagerGD.prototype.loadLib = function () {
            return new Promise(function (resolve, reject) {
                if (document.getElementById("gamedistribution-jssdk")) {
                    resolve();
                }
                var library = document.createElement("script");
                library.onload = function () { resolve(); };
                library.onerror = function () { reject(); };
                library.type = "text/javascript";
                library.async = true;
                library.src = "https://html5.api.gamedistribution.com/main.min.js";
                library.id = "gamedistribution-jssdk";
                document.head.appendChild(library);
            });
        };
        return AdsManagerGD;
    }(YYG.AdsManager));
    YYG.AdsManagerGD = AdsManagerGD;
})(YYG || (YYG = {}));
//# sourceMappingURL=AdsManagerGD.js.map
var YYG;
(function (YYG) {
    var MessageUI = /** @class */ (function () {
        function MessageUI() {
        }
        MessageUI.__init__ = function () {
            var _this = this;
            if (!this._initialize) {
                var body = document.body || document.getElementsByTagName("body")[0];
                var style = document.createElement("style");
                style.textContent += "#message_layer{" +
                    "position: fixed;" +
                    "z-index: 1050;" +
                    "width:100%;" +
                    "height:100%;" +
                    "}";
                style.textContent += "#message_container{" +
                    "padding: 4px 10px 4px 10px;" +
                    "position: fixed;" +
                    "z-index: 1051;" +
                    "font-family:Verdana;" +
                    "min-width: 300px;" +
                    "max-width:430px;" +
                    "width:80%;" +
                    "min-height:160px;" +
                    "color: #00335e;" +
                    "-moz-border-radius: 6px;" +
                    "-webkit-border-radius: 6px;" +
                    "border-radius: 6px;" +
                    "-moz-box-shadow: 0px 0px 11px #000000;" +
                    "-webkit-box-shadow: 0px 0px 11px #000000;" +
                    "box-shadow: 0px 0px 11px #000000;" +
                    "left: 50%;" +
                    "top:50%;" +
                    "transform: translate(-50%, -50%);" +
                    "opacity: 1;" +
                    "background-color:#bcbcbc;" +
                    "}";
                style.textContent += "#message_container div.massage_title{" +
                    "padding:5px 0 5px 0;" +
                    "font-variant:small-caps;" +
                    "font-size:16pt;" +
                    "font-weight:lighter;" +
                    "color:#00335e;" +
                    "width:100%;" +
                    "border-bottom : 1px solid #002c5f;" +
                    "}";
                style.textContent += "#message_container div.massage_box{" +
                    "line-height: 18px;" +
                    "padding: 10px 0 0 0;" +
                    "}";
                style.textContent += "@media screen and (min-width: 280px) {" +
                    "#message_container div.massage_box{" +
                    "line-height: 22px;" +
                    "}" +
                    "}" +
                    "@media screen and (min-width: 523px) {" +
                    "#message_container div.massage_box{" +
                    "line-height: 22px;" +
                    "font-size: 15px;" +
                    "}" +
                    "}" +
                    "#message_container div.colse{" +
                    "position: absolute;" +
                    "right: -15px;" +
                    "top: -15px;" +
                    "width: 30px;" +
                    "height: 30px;" +
                    "border-radius: 25px;" +
                    "box-shadow: 2px 2px 5px 0px black;" +
                    "background: red;" +
                    "cursor: pointer;" +
                    "}" +
                    "#message_container div.colse:hover{" +
                    "background: red;" +
                    "}" +
                    "#message_container div.colse:before{" +
                    "position: absolute;" +
                    "content: '';" +
                    "width: 4px;" +
                    "height:20px;" +
                    "background: white;" +
                    "transform: rotate(45deg);" +
                    "top: 5px;" +
                    "left: 13px;" +
                    "}" +
                    "#message_container div.colse:after{" +
                    "position: absolute;" +
                    "content: '';" +
                    "width: 4px;" +
                    "height:20px;" +
                    "background: white;" +
                    "transform: rotate(-45deg);" +
                    "top: 5px;" +
                    "left: 13px;" +
                    "}" +
                    "#message_container div.btn_container{" +
                    "display:inline-block;" +
                    " width:100%;" +
                    "text-align:right;" +
                    "}" +
                    "#message_container div.btn_container input[type='button']{" +
                    "cursor:pointer;" +
                    "margin:2px;" +
                    "height:35px;" +
                    "border:1px solid #AFAFAF;" +
                    "background-color:#004076;" +
                    "color:#FFFFFF;" +
                    "-moz-border-radius: 6px;" +
                    "-webkit-border-radius: 6px;" +
                    "border-radius: 6px;" +
                    "outline: none;" +
                    "}" +
                    "#message_container div.btn_container input[type='button']:hover" +
                    "{" +
                    "background-color:#00549c;" +
                    "color:White;" +
                    "}" +
                    "#message_container div.btn_container input[type='button']:active" +
                    "{" +
                    "background-color:#AAAAAA;" +
                    "color:White;" +
                    "}" +
                    "#message_container div.btn_container input[type='button']:focus" +
                    "{" +
                    "outline: none; " +
                    "border: solid 2px #FFCC66; /* replace outline by a border */" +
                    "-o-transform:rotate(0); /*remove opera outline*/" +
                    "}" +
                    "#message_container div.btn_container input[type='button']::-moz-focus-inner /*remove firefox inner outline*/" +
                    "{ " +
                    " outline: none; " +
                    "border: none;" +
                    "}";
                body.appendChild(style);
                this._layer = document.createElement("div");
                this._layer.id = "message_layer";
                body.appendChild(this._layer);
                this._container = document.createElement("div");
                this._container.id = "message_container";
                this._layer.appendChild(this._container);
                this._title = document.createElement("div");
                this._title.className = "massage_title";
                this._title.textContent = "textContent";
                this._container.appendChild(this._title);
                this._colse = document.createElement("div");
                this._colse.className = "colse";
                // this._colse.type = "button";
                this._colse.onclick = function () { _this._onCloseClick(); };
                this._container.appendChild(this._colse);
                var div = document.createElement("div");
                this._container.appendChild(div);
                var box = document.createElement("div");
                box.className = "massage_box";
                div.appendChild(box);
                var p = document.createElement("p");
                this._message = document.createElement("span");
                p.appendChild(this._message);
                this._message.textContent = "Without ads, we will not survive. Please disable adblock on our site and then click refresh button, thank you!";
                box.appendChild(p);
                this._textarea = document.createElement("textarea");
                this._textarea.style.width = "100%";
                this._textarea.style.display = "none";
                box.appendChild(this._textarea);
                var btn_container = document.createElement("div");
                btn_container.className = "btn_container";
                div.appendChild(btn_container);
                this._button = document.createElement("input");
                this._button.type = "button";
                this._button.onclick = function () { _this._onButtonClick(); };
                this._button.value = "Refresh";
                btn_container.appendChild(this._button);
                this._layer.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); }, false);
            }
        };
        /**
         * å¼¹å‡ºæç¤ºæ¡†
         * @param title æ¶ˆæ¯æ ‡é¢˜
         * @param message æ¶ˆæ¯å†…å®¹
         * @param buttonName æŒ‰é’®åç§°
         * @param listener @see EventHandler ç‚¹å‡»ç¡®å®šå›žè°ƒ
         */
        MessageUI.popup = function (title, message, buttonName, listener, btnDisplay, closeDisplay, textarea, disabled) {
            this.__init__();
            if (disabled === void 0) {
                disabled = false;
            }
            this._disabled = disabled;
            this._title.textContent = title || "";
            this._message.textContent = message;
            if (btnDisplay === void 0 || btnDisplay === null) {
                btnDisplay = true;
            }
            if (!btnDisplay) {
                this._button.style.display = "none";
            }
            else {
                this._button.value = buttonName || "OK";
                this._button.style.display = "show";
            }
            if (closeDisplay === void 0 || closeDisplay === null) {
                closeDisplay = false;
            }
            if (closeDisplay) {
                this._colse.style.display = "show";
            }
            else {
                this._colse.style.display = "none";
            }
            if (textarea === void 0 || textarea === null) {
                this._textarea.style.display = "none";
            }
            else {
                this._textarea.style.display = "block";
                this._textarea.value = textarea;
            }
            this._listener = listener;
            this._layer.style.display = "show";
        };
        MessageUI._onButtonClick = function () {
            /**æ— æ³•å…³é—­ */
            if (this._disabled) {
            }
            else {
                this._layer.style.display = "none";
            }
            this._listener && this._listener.run();
            // location.reload();
        };
        MessageUI._onCloseClick = function () {
            /**æ— æ³•å…³é—­ */
            this._layer.style.display = "none";
            if (this._closelistener) {
                this._closelistener.run();
            }
        };
        /**
         * å¯ä»¥copyçš„
         * @param title æ¶ˆæ¯æ ‡é¢˜
         * @param message æ¶ˆæ¯å†…å®¹
         * @param buttonName æŒ‰é’®åç§°
         */
        MessageUI.popupWhitCopy = function (title, message, buttonName, closeDisplay, from, closelistener) {
            var _this = this;
            this.__init__();
            this._title.textContent = title || "";
            this._message.textContent = message;
            this._button.value = buttonName;
            this._closelistener = closelistener;
            if (closeDisplay === void 0) {
                closeDisplay = false;
            }
            if (closeDisplay) {
                this._colse.style.display = "show";
            }
            else {
                this._colse.style.display = "none";
            }
            this._button.onclick = function () {
                var textarea = document.createElement("textarea");
                textarea.style.position = 'fixed';
                textarea.style.top = '0';
                textarea.style.left = '0';
                textarea.style.width = '2em';
                textarea.style.height = '2em';
                textarea.style.padding = '0';
                textarea.style.border = 'none';
                textarea.style.outline = 'none';
                textarea.style.boxShadow = 'none';
                textarea.style.background = 'transparent';
                textarea.value = YYGSDK.options.channelURL + "?" + from;
                document.body.appendChild(textarea);
                textarea.select();
                var success = document.execCommand('copy');
                if (success) {
                    _this._button.value = "Copied";
                    setTimeout(function () { _this._button.value = buttonName; }, 3e3);
                }
                else {
                }
                document.body.removeChild(textarea);
            };
        };
        MessageUI._initialize = false;
        return MessageUI;
    }());
    YYG.MessageUI = MessageUI;
})(YYG || (YYG = {}));
//# sourceMappingURL=MessageUI.js.map
var YYG;
(function (YYG) {
    var LoaderUI = /** @class */ (function () {
        function LoaderUI() {
        }
        LoaderUI.__init__ = function () {
            if (this._initialize)
                return;
            var body = document.body || document.getElementsByTagName("body")[0];
            var style = document.createElement("style");
            style.textContent +=
                ".YYG_loader, .YYG_loader:before," +
                ".YYG_loader:after {  border-radius: 50%; width: 2.0em;  height: 2.0em;  -webkit-animation-fill-mode: both;  animation-fill-mode: both; -webkit-animation: load7 1.8s infinite ease-in-out;animation: load7 1.8s infinite ease-in-out;}" +
                ".YYG_loader {color: #ffffff;font-size: 10px;margin: 0px auto;position: relative;text-indent: -9999em;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation-delay: -0.16s;animation-delay: -0.16s;}" +
                ".YYG_loader:before," +
                ".YYG_loader:after {content: '';position: absolute;top: 0;}" +
                ".YYG_loader:before {left: -3.5em;-webkit-animation-delay: -0.32s;animation-delay: -0.32s;}" +
                ".YYG_loader:after {left: 3.5em;}" +
                "@-webkit-keyframes load7 {0%,80%,100% {box-shadow: 0 2.5em 0 -1.3em;}40% {box-shadow: 0 2.5em 0 0;}}" +
                "@keyframes load7 {0%,80%,100% {box-shadow: 0 2.5em 0 -1.3em;}40% {box-shadow: 0 2.5em 0 0;}}";
            body.appendChild(style);
            this._container = document.createElement("div");
            this._container.style.position = "fixed";
            this._container.style.zIndex = "0";
            this._container.style.top = "0";
            this._container.style.left = "0";
            this._container.style.width = "100%";
            this._container.style.height = "100%";
            this._container.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            this._loader = document.createElement("div");
            this._loader.className = "YYG_loader";
            this._loader.style.top = "40%";
            this._container.appendChild(this._loader);
            body.appendChild(this._container);
            this._container.style.display = "none";
            this._initialize = true;
        };
        LoaderUI.show = function () {
            this.__init__();
            this._container.style.zIndex = "1000";
            this._container.style.display = "block";
        };
        LoaderUI.hide = function () {
            var _this = this;
            if (!this._initialize)
                return;
            this._container.style.zIndex = "0";
            setTimeout(function () {
                _this._container.style.display = "none";
            }, 10);
        };
        LoaderUI._initialize = false;
        return LoaderUI;
    }());
    YYG.LoaderUI = LoaderUI;
})(YYG || (YYG = {}));
//# sourceMappingURL=LoaderUI.js.map
var YYG;
(function (YYG) {
    /**
     * YYG skd è¾…åŠ©é€»è¾‘
     */
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.forgames = function () {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", YYGSDK.options.channelURL + "forgame/games.json", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.responseType = "text";
            xhr.onerror = function (e) { };
            xhr.onabort = function (e) { };
            xhr.onprogress = function (e) { };
            xhr.onload = function (e) {
                var status = xhr.status !== undefined ? xhr.status : 200;
                if (status === 200 || status === 204 || status === 0) {
                    const forgames = JSON.parse(xhr.responseText);
                    YYGSDK.options.forgames = [];
                    for (const t of forgames) {
                        delete t.nameid
                        YYGSDK.options.forgames.push(t)
                    }
                }
                else {
                }
            };
            xhr.send();
        };
        /**æ—¥å¿— */
        Utils.LOG = function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!YYGSDK.options.debug)
                return;
            this.__LOG__.apply(this, ['%c %c %c YYGSKD:', "background: #fb8cb3", "background: #d44a52", "color: #ffffff; background: #871905;", message].concat(optionalParams));
        };
        /**
         * å¼ºåˆ¶é¡¶çº§é¡µé¢è·³è½¬
         * title:"Please Disable Adblock",
         * message:"Without ads, we will not survive. Please disable adblock and then click refresh button, thank you!",
         * button:"Refresh"
         */
        Utils.adBlock = function () {
            if (YYGSDK.options.inGameAd === 0)
                return;
            var title = "Please Disable Adblock";
            var message = "Without ads, we will not survive. Please disable adblock and then click refresh button, thank you!";
            var btnName = "Refresh";
            YYG.MessageUI.popup(title, message, btnName, YYG.EventHandler.create(this, function () {
                location.reload();
            }));
        };
        Utils.adstxt = function () {
            var title = "Please Update ads.txt";
            var message = "Hi dear webmaster, thanks for adding the game. Please add the following content to your ads.txt file, thank you!";
            var btnName = "Refresh";
            YYG.MessageUI.popup(title, message, btnName, null, false, true, YYGSDK.options.adstxt + "");
        };
        /**
         * å¼ºåˆ¶é¡¶çº§é¡µé¢è·³è½¬
         */
        Utils.redirect = function () {
            try {
                top.location.href = YYGSDK.options.channelURL + "?redirect";
            }
            catch (error) {
                var title = "The Game is Stolen";
                var message = "The game is stolen from "
                    + YYGSDK.options.channelURL
                    + " please visit "
                    + YYGSDK.options.channelURL
                    + "to play the game, thank you!";
                var btnName = "Copy the URL";
                YYG.MessageUI.popupWhitCopy(title, message, btnName, false, "redirect");
            }
        };
        /**
         * è·³è½¬åˆ°ä¸»ç«™
         * @param gameNameId æœ¬æ¸¸æˆçš„æ¸¸æˆåç§°ID
         * @param screenName è·³è½¬åœºæ™¯çš„åç§°
         * @param buttonName è§¦å‘æŒ‰é’®çš„åç§°
         * @param gameId è§¦å‘æ¸¸æˆçš„ID
         */
        Utils.navigateTo = function (gameNameId, screenName, buttonName, gameId) {
            if (YYGSDK.options.version === 1 && YYGSDK.isGamedistribution)
                return;
            if (!YYGSDK.options.linksClickable)
                return;
            gameId = gameId || "";
            var domain = document.referrer;
            var url = YYGSDK.options.channelURL;
            if (typeof gameId === 'undefined' || gameId == "" || gameId == "undefined") {
            }
            else {
                url = url + "?pic=" + gameId;
            }
            if (typeof domain === 'undefined' || domain == "" || domain == "undefined") {
                domain = "unknown";
            }
            else {
                domain = domain.split('/')[2];
            }
            if (url.indexOf("?") > -1) {
                url = url + "&";
            }
            else {
                url = url + "?";
            }
            url = url + "utm_source=" + domain + "&utm_medium=" + screenName + "-" + buttonName + "&utm_campaign=game-" + gameNameId;
            //é˜²æ­¢ä¸€äº› åµŒå…¥çš„ç½‘ç«™ å…³é—­äº† å¤–éƒ¨é“¾æŽ¥
            try {
                if (window.open(url)) {
                }
                else {
                    YYG.MessageUI.popupWhitCopy("More Games", "Please visit " + YYGSDK.options.channelURL + " for more games.", "Copy the URL", true, "linkblocked");
                }
            }
            catch (error) {
                YYG.MessageUI.popupWhitCopy("More Games", "Please visit " + YYGSDK.options.channelURL + " for more games.", "Copy the URL", true, "linkblocked");
            }
        };
        Utils.__LOG__ = console.log || function (message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
        };
        return Utils;
    }());
    YYG.Utils = Utils;
})(YYG || (YYG = {}));
//# sourceMappingURL=Utils.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * AD ä¸ºå¹¿å‘Šç®¡ç†å™¨
 */
var YYGSDK = /** @class */ (function () {
    function YYGSDK() {
    }
    Object.defineProperty(YYGSDK, "options", {
        get: function () {
            if (!this._options) {
                this._options = new YYG.Options();
            }
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    // YYG.Utils.__LOG__("%c %c %c YYG-"+cName+":","background: #fb8cb3","background: #d44a52","color: #ffffff; background: #871905;
    // "background: #fb8cb3","background: #d44a52","color: #ffffff; background: #871905;"
    YYGSDK.trace = function (message) {
        var optionalParams = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            optionalParams[_i - 1] = arguments[_i];
        }
        var _a;
        if (!this.options.debug)
            return;
        (_a = YYG.Utils).__LOG__.apply(_a, ["%c %c  %c YYG-" + this.channelName + ":",
            "background: #fb8cb3",
            "background: #d44a52",
            "color: #ffffff; background: #871905",
            message].concat(optionalParams));
    };
    Object.defineProperty(YYGSDK, "dispatcher", {
        get: function () {
            if (!this._dispatcher) {
                this._dispatcher = new YYG.EventDispatcher();
            }
            return this._dispatcher;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * SDK å¯¹è±¡æ³¨å†ŒæŒ‡å®šç±»åž‹çš„äº‹ä»¶ä¾¦å¬å™¨å¯¹è±¡ï¼Œä»¥ä½¿ä¾¦å¬å™¨èƒ½å¤ŸæŽ¥æ”¶äº‹ä»¶é€šçŸ¥ã€‚
     */
    YYGSDK.on = function (type, caller, listener, args) {
        return this.dispatcher.on(type, caller, listener, args);
    };
    /**
     * SDK å¯¹è±¡æ³¨å†ŒæŒ‡å®šç±»åž‹çš„äº‹ä»¶ä¾¦å¬å™¨å¯¹è±¡ï¼Œä»¥ä½¿ä¾¦å¬å™¨èƒ½å¤ŸæŽ¥æ”¶äº‹ä»¶é€šçŸ¥ã€‚
     */
    YYGSDK.event = function (type, data) {
        return this.dispatcher.event(type, data);
    };
    /**
     * è·³è½¬åˆ°ä¸»ç«™
     * @param gameNameId æœ¬æ¸¸æˆçš„æ¸¸æˆåç§°ID
     * @param screenName è·³è½¬åœºæ™¯çš„åç§°
     * @param buttonName è§¦å‘æŒ‰é’®çš„åç§°
     * @param gameId è§¦å‘æ¸¸æˆçš„ID
     */
    YYGSDK.navigateTo = function (gameNameId, screenName, buttonName, gameId) {
        YYG.Utils.navigateTo(gameNameId, screenName, buttonName, gameId);
    };
    /**
     * è·³è½¬åˆ°ä¸»ç«™
     * @param screenName è·³è½¬åœºæ™¯çš„åç§°
     * @param buttonName è§¦å‘æŒ‰é’®çš„åç§°
     * @param gameId è§¦å‘æ¸¸æˆçš„ID
     */
    YYGSDK.navigate = function (screenName, buttonName, gameId) {
        YYG.Utils.navigateTo(YYGSDK.options.gameNameId, screenName, buttonName, gameId);
    };
    /**
     * è·³è½¬åˆ°ä¸»ç«™
     * @param screenName è·³è½¬åœºæ™¯çš„åç§°
     * @param buttonName è§¦å‘æŒ‰é’®çš„åç§°
     * @param gameId è§¦å‘æ¸¸æˆçš„ID
     */
    YYGSDK.forceNavigate = function (screenName, buttonName, gameId) {
        YYG.Utils.navigateTo(YYGSDK.options.gameNameId, screenName, buttonName, gameId);
    };
    YYGSDK.forgamesNavigate = function (screenName, buttonName, gameId) {
        if (this.options.isGamedistribution) {
        }
        else {
            YYG.Utils.navigateTo(YYGSDK.options.gameNameId, screenName, buttonName, gameId);
        }
    };
    Object.defineProperty(YYGSDK, "thumb", {
        /**
         * æ¸¸æˆç»“æŸæ˜¯å¦æ˜¾ç¤ºäº¤å‰æŽ¨å¹¿
         */
        get: function () {
            return this.options.thumb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YYGSDK, "forgames", {
        /**
         * äº¤å‰æŽ¨å¹¿æ¸¸æˆåˆ—è¡¨
         */
        get: function () {
            // if(YYGSDK.options.version === 1 && YYGSDK.isGamedistribution)return [];
            if (this.options.thumb === 0)
                return [];
            return this.options.forgames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YYGSDK, "isGamedistribution", {
        /**
         * äº¤å‰æŽ¨å¹¿æ¸¸æˆåˆ—è¡¨
         */
        get: function () {
            return this.options.isGamedistribution;
        },
        enumerable: true,
        configurable: true
    });
    YYGSDK.showForgames = function (options) {
        var _this = this;
        options = options || {};
        if (this.options.isGamedistribution) {
            this.trace("gamedistribution no forgames");
            if (options.onComplete) {
                options.onComplete();
                options.onComplete = null;
            }
            return;
        }
        var forgames = this.options.forgames;
        if (forgames.length < 4) {
            if (options.onComplete) {
                options.onComplete();
                options.onComplete = null;
            }
            return;
        }
        for (var i = 0, length_1 = forgames.length; i < length_1; i++) {
            var random = Math.floor(Math.random() * (i + 1));
            var item = forgames[random];
            forgames[random] = forgames[i];
            forgames[i] = item;
        }
        if (!this.options.debug && !this.options.canForgames) {
            this.trace("first ad less 90s");
            if (options.onComplete) {
                options.onComplete();
                options.onComplete = null;
            }
            return;
        }
        if (!this.options.debug && !this.options.forgamesCooldown) {
            this.trace("forgames too soon", YYGSDK.forgamesCooldownTime);
            if (options.onComplete) {
                options.onComplete();
                options.onComplete = null;
            }
            return;
        }
        this.options.forgamesCooldown = false;
        var forgamesCooldown = function () {
            YYGSDK.forgamesCooldownTime--;
            if (YYGSDK.forgamesCooldownTime <= 0) {
                YYGSDK.options.forgamesCooldown = true;
                clearInterval(forgamesCooldownInterval);
            }
        };
        this.forgamesCooldownTime = 120;
        var forgamesCooldownInterval = setInterval(forgamesCooldown, 1e3);
        if (this.forgames_) {
            document.body.removeChild(this.forgames_);
            this.forgames_ = null;
        }
        if (void 0 === options.alpha) {
            options.alpha = 1;
        }
        if (void 0 === options.titleColse) {
            options.titleColse = true;
        }
        if (void 0 === options.buttonClose) {
            options.buttonClose = true;
        }
        var alpha = Number(options.alpha);
        var titleColse = Boolean(options.titleColse);
        var buttonClose = Boolean(options.buttonClose);
        var screen_ = options.screen || "GAME";
        var size = options.size || 300;
        this.forgames_ = document.createElement('div');
        var apps_ = document.createElement('div');
        this.forgames_.style.cssText = "width:100%;height:100%;z-index:999;position: fixed;background:rgba(0, 0, 0," + alpha + ");";
        this.forgames_.onclick = function (event) {
            event.stopPropagation();
        };
        if (titleColse) {
            var close_ = document.createElement("img");
            close_.src = "https://h5gamessdk.yyggames.com/sdk/res/ad-orangeclose.png";
            close_.style.cssText = "position:absolute;right: -14px;top: -14px;border-radius: 25px;cursor:pointer;width:36px";
            close_.onclick = function () {
                document.body.removeChild(_this.forgames_);
                _this.forgames_ = null;
                if (options.onClose) {
                    options.onClose();
                }
                if (options.onComplete) {
                    options.onComplete();
                }
                options.onClose = null;
                options.onComplete = null;
            };
            apps_.appendChild(close_);
        }
        if (buttonClose) {
            var btnclose_ = document.createElement("img");
            btnclose_.src = "https://h5gamessdk.yyggames.com/sdk/res/forgamesskip.png";
            btnclose_.style.cssText = "position:absolute;bottom:-60px;cursor: pointer; width:100px;left:50%;; margin-left:-50px";
            btnclose_.onclick = function () {
                document.body.removeChild(_this.forgames_);
                _this.forgames_ = null;
                if (options.onClose) {
                    options.onClose();
                }
                if (options.onComplete) {
                    options.onComplete();
                }
                options.onClose = null;
                options.onComplete = null;
            };
            apps_.appendChild(btnclose_);
        }
        apps_.style.cssText =
            "width:" + size + "px;height:" + size * 3 / 4 + "px;" +
            "padding-bottom:2px;" +
            "border-radius:4px;position:fixed;top: 40%;" +
            "left: 50%;transform: translate(-50%, -50%);background: rgba(240, 240, 240,1);";
        var _loop_1 = function (i) {
            var img = document.createElement('img');
            img.src = forgames[i].thumb;
            img.style.cssText = "margin-left:4px;margin-top:4px;width:" + (size - 12) / 2 + "px;border-radius:4px;cursor:pointer";
            img.onclick = function () {
                YYGSDK.navigate(screen_, "MORE", forgames[i].id);
            };
            apps_.appendChild(img);
        };
        for (var i = 0; i < 4; i++) {
            _loop_1(i);
        }
        this.forgames_.appendChild(apps_);
        document.body.appendChild(this.forgames_);
        // this.forgames_.style.display = "inline";
        // this.forgames_.style.opacity = '1';
    };
    /**
     * æ˜¾ç¤ºæ’å±å¹¿å‘Š
     */
    YYGSDK.showInterstitial = function (complete) {
        this.adsManager.request(YYG.TYPE.INTERSTITIAL, YYG.EventHandler.create(this, function () {
            complete && complete();
        }), YYG.EventHandler.create(this, function () {
            complete && complete();
        }));
    };
    /**
     * sdkåˆå§‹åŒ–
     * @param  channel æ¸ é“
     * @param  isDebug  æ˜¯å¦ä¸ºdebguæ¨¡å¼
     */
    YYGSDK.__init__ = function (channel, options) {
        return __awaiter(this, void 0, void 0, function () {
            var cName, isDebug, isLocal, version, gameNameId, gamedistributionID;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cName = "";
                        switch (channel) {
                            case YYG.ChannelType.YAD:
                                cName = "YAD";
                                break;
                            case YYG.ChannelType.CARGAMES:
                                cName = "CARGAMES";
                                break;
                            case YYG.ChannelType.BESTGAMES:
                                cName = "BESTGAMES";
                                break;
                            case YYG.ChannelType.BABYGAMES:
                                cName = "BABYGAMES";
                                break;
                            case YYG.ChannelType.YIV:
                                cName = "YIV";
                                break;
                            default:
                                break;
                        }
                        this.channelName = cName;
                        YYG.Utils.__LOG__("%c %c %c YYG-" + cName + ":", "background: #fb8cb3", "background: #d44a52", "color: #ffffff; background: #871905;", "Version: " + YYG.Version.Ver);
                        isDebug = false;
                        isLocal = false;
                        version = 0;
                        gameNameId = "";
                        gamedistributionID = "";
                        if (options) {
                            isDebug = options.debug;
                            gamedistributionID = options.gamedistributionID || "";
                            isLocal = options.isLocal || false;
                            gameNameId = options.gameNameId;
                            version = options.version || 0;
                        }
                        this.options.version = version;
                        this.options.gameNameId = gameNameId;
                        this.options.debug = isDebug;
                        this.options.setChannel(channel);
                        this.options.isLocal = isLocal;
                        if (gamedistributionID.length > 5) {
                            this.options.isGamedistribution = true;
                            this.options.gamedistributionID = options.gamedistributionID;
                            YYGSDK.adsManager = new YYG.AdsManagerGD();
                        }
                        else {
                            this.options.isGamedistribution = false;
                            YYGSDK.adsManager = new YYG.AdsManager();
                        }
                        YYG.Utils.forgames();
                        return [4 /*yield*/, this.request()];
                    case 1:
                        _a.sent();
                        YYGSDK.adsManager.start();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**è¯·æ±‚æœåŠ¡å™¨æ•°æ® */
    YYGSDK.request = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "https://h5gamessdk.yyggames.com/in.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.responseType = "text";
            xhr.timeout = 3e3;
            xhr.ontimeout = function (e) { resolve(); };
            xhr.onerror = function (e) { resolve(); };
            xhr.onabort = function (e) { };
            xhr.onprogress = function (e) { };
            xhr.onload = function (e) {
                var status = xhr.status !== undefined ? xhr.status : 200;
                if (status === 200 || status === 204 || status === 0) {
                    var data = JSON.parse(xhr.responseText);
                    YYGSDK.options.setData(data);
                    if (YYGSDK.options.redirect === 1) {
                        YYG.Utils.redirect();
                        return;
                    }
                    if (YYGSDK.options.adstxt !== 0 && YYGSDK.options.isGamedistribution === false) {
                        YYG.Utils.adstxt();
                    }
                    resolve();
                }
                else {
                    YYG.Utils.LOG("===============================SEVRVER_OPTIONS_TIMEOUT====================================");
                    resolve();
                    throw new Error("SEVRVER_OPTIONS_TIMEOUT");
                }
            };
            try {
                var href = top.location.href;
                xhr.send("url=" + encodeURIComponent(href));
            }
            catch (e) {
                /**hhaha */
                var referrer = document.referrer || "";
                if (referrer.length > 3) {
                    xhr.send("url=" + encodeURIComponent(referrer));
                }
                else {
                    _this.wrongEmbedCodePop();
                }
            }
        });
    };
    YYGSDK.wrongEmbedCodePop = function () {
        var title = "Wrong Embed Code";
        var msg = "Hi dear webmaster, thanks for adding the game. Please enable referrer to make the game playable, thank you!";
        var btn = "Play On " + YYGSDK.options.channelName;
        YYG.MessageUI.popup(title, msg, btn, YYG.EventHandler.create(this, this.wrongEmbedCodeOpen), null, null, null, true);
    };
    YYGSDK.wrongEmbedCodeOpen = function () {
        try {
            if (window.open(YYGSDK.options.channelURL)) {
            }
            else {
                YYG.MessageUI.popupWhitCopy("More Games", "Please visit " + YYGSDK.options.channelURL + " for more games.", "Copy the URL", true, "linkblocked", YYG.EventHandler.create(this, this.wrongEmbedCodePop));
            }
        }
        catch (error) {
            YYG.MessageUI.popupWhitCopy("More Games", "Please visit " + YYGSDK.options.channelURL + " for more games.", "Copy the URL", true, "linkblocked", YYG.EventHandler.create(this, this.wrongEmbedCodePop));
        }
    };
    YYGSDK.forgamesCooldownTime = 120;
    return YYGSDK;
}());
//# sourceMappingURL=YYG.js.map

var REG = Laya.ClassUtils.regClass;
var ui;
(function (ui) {
    class MessageUI extends Laya.Dialog {
        constructor() {
            super();
        }
        createChildren() {
            super.createChildren();
            this.createView(MessageUI.uiView);
        }
    }
    MessageUI.uiView = { "type": "Dialog", "props": { "width": 750, "height": 1334 }, "compId": 2, "child": [{ "type": "Image", "props": { "width": 720, "skin": "ui_ad/mask_bg.png", "sizeGrid": "5,5,5,5", "centerY": -100, "centerX": 0 }, "compId": 5, "child": [{ "type": "Label", "props": { "y": 30, "x": 30.5, "wordWrap": true, "width": 659, "text": "Failed to get reward,please watch the ads to the end.", "height": 90, "fontSize": 40, "color": "#050000", "align": "center" }, "compId": 7 }] }], "loadList": ["ui_ad/mask_bg.png"], "loadList3D": [] };
    ui.MessageUI = MessageUI;
    REG("ui.MessageUI", MessageUI);
})(ui || (ui = {}));
  
class IPlatform {
    filePath() {
        return "";
    }
    getStorageSync(key) { }
    ;
    setStorageSync(key, value) { }
    ;
    getFileSystemManager() {
        return {};
    }
    ;
    downloadFile(object) {
        return {};
    }
    ;
    showReward(success, failure) { };
    showInterstitial(complete) {};
    getForgames() {
        return [];
    }
    navigate(screenName, buttonName, gameId) { }
    ;
}


class WebPlatform extends IPlatform {
    constructor() {
        super();
        this.navigateActive = false;
        let canvas = document.getElementById("layaCanvas");
        canvas && canvas.addEventListener("mouseup", () => {
            if (this.navigateActive) {
                this.navigateActive = false;
                YYGSDK.navigate(this._screenName, this._buttonName, this._gameId);
            }
        });
        canvas && canvas.addEventListener("touchend", () => {
            if (this.navigateActive) {
                this.navigateActive = false;
                YYGSDK.navigate(this._screenName, this._buttonName, this._gameId);
            }
        });
    }
    navigate(screenName, buttonName, gameId) {
        if (this.navigateActive === false) {
            this.navigateActive = true;
            this._screenName = screenName;
            this._buttonName = buttonName;
            this._gameId = gameId;
        }
    }
    showInterstitial(complete) {
        let needresume = false
        if(!Laya.SoundManager.muted){
            needresume = true;
            Laya.SoundManager.muted = true;
        }
        YYGSDK.showInterstitial(()=>{
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            complete && complete();
        });
    }
    getStorageSync(key) {
        let v = Laya.LocalStorage.getItem(key);
        return JSON.parse(v);
    }
    setStorageSync(key, value) {
        return Laya.LocalStorage.setItem(key, JSON.stringify(value));
    }
    showReward(success, failure) {
        let needresume = false
        if(!Laya.SoundManager.muted){
            needresume = true;
            Laya.SoundManager.muted = true;
        }
        YYGSDK.adsManager.request(YYG.TYPE.REWARD, YYG.EventHandler.create(this, () => {
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            success && success();
        }), YYG.EventHandler.create(this, (event) => {
            if(needresume){
                Laya.SoundManager.muted = false;
            }
            if (failure) {
                failure(event);
            }
            else {
                if (event == YYG.Event.AD_SKIPPED) {
                    let tip = new ui.MessageUI();
                    tip.popup();
                    Laya.timer.once(3e3, tip, tip.close);
                }
            }
        }));
    }

    showMessage( event ){
        if (event == YYG.Event.AD_SKIPPED) {
            let tip = new ui.MessageUI();
            tip.popup();
            Laya.timer.once(3e3, tip, tip.close);
        }
    }

    getForgames() {
        let forgames = YYGSDK.forgames;
        forgames.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        return forgames;
    }
    showLoading(title) { }
    hideLoading() { }
}

class platform {
    static _init_() {
        this._platform = new WebPlatform();
    }
    static getInstance() {
        if (!this._platform) {
            this._init_();
        }
        return this._platform;
    }
}
platform._platform = null;
window["platform"] = platform;

    
    
var __extends = this && this.__extends || function() {
    var extendStatics = Object.setPrototypeOf || {
        __proto__: []
    } instanceof Array && function(d, b) {
        d.__proto__ = b;
    } || function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return function(d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

(function() {
    function r(e, n, t) {
        function o(i, f) {
            if (!n[i]) {
                if (!e[i]) {
                    var c = "function" == typeof require && require;
                    if (!f && c) return c(i, !0);
                    if (u) return u(i, !0);
                    var a = new Error("Cannot find module '" + i + "'");
                    throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i] = {
                    exports: {}
                };
                e[i][0].call(p.exports, function(r) {
                    var n = e[i][1][r];
                    return o(n || r);
                }, p, p.exports, r, e, n, t);
            }
            return n[i].exports;
        }
        for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
        return o;
    }
    return r;
})()({
    1: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LoadScene_1 = require("./script/scene/LoadScene");
        var UINoticeCmp_1 = require("./script/ui/Cmp/UINoticeCmp");
        var MainScene_1 = require("./script/scene/MainScene");
        var UI_Main_1 = require("./script/ui/UI_Main");
        var UIRankIconCmp_1 = require("./script/ui/Cmp/UIRankIconCmp");
        var UIRankProgressCmp_1 = require("./script/ui/Cmp/UIRankProgressCmp");
        var UIRebornCardTipCmp_1 = require("./script/ui/Cmp/UIRebornCardTipCmp");
        var UINameCmp_1 = require("./script/ui/Cmp/UINameCmp");
        var UI_Name_1 = require("./script/ui/UI_Name");
        var UI_Fight_1 = require("./script/ui/UI_Fight");
        var UI_Dead_1 = require("./script/ui/UI_Dead");
        var UI_Ready_1 = require("./script/ui/UI_Ready");
        var UI_End_1 = require("./script/ui/UI_End");
        var UIRankEndCmp_1 = require("./script/ui/Cmp/UIRankEndCmp");
        var UI_Load_1 = require("./script/ui/UI_Load");
        var UI_GameAd_1 = require("./script/ui/UI_GameAd");
        var UI_DeadAd_1 = require("./script/ui/UI_DeadAd");
        var UI_BottomAd_1 = require("./script/ui/UI_BottomAd");
        var UI_RebornAd_1 = require("./script/ui/UI_RebornAd");
        var UIRankCmp_1 = require("./script/ui/Cmp/UIRankCmp");
        var UI_EndRank_1 = require("./script/ui/UI_EndRank");
        var UI_Record_1 = require("./script/ui/UI_Record");
        var UI_Banner_1 = require("./script/ui/UI_Banner");
        var UI_buy_reborn_1 = require("./script/ui/UI_buy_reborn");
        var UI_GetHints_1 = require("./script/ui/UI_GetHints");
        var UI_Gift_1 = require("./script/ui/UI_Gift");
        var UI_Invitefrined_1 = require("./script/ui/UI_Invitefrined");
        var UI_Luck_1 = require("./script/ui/UI_Luck");
        var UI_Map_1 = require("./script/ui/UI_Map");
        var MatchIconCmp_1 = require("./script/ui/Cmp/MatchIconCmp");
        var UIMatchCmp_1 = require("./script/ui/Cmp/UIMatchCmp");
        var UI_Match_1 = require("./script/ui/UI_Match");
        var UI_MoreGame_1 = require("./script/ui/UI_MoreGame");
        var UI_QQGift_1 = require("./script/ui/UI_QQGift");
        var UI_QQSmGift_1 = require("./script/ui/UI_QQSmGift");
        var UI_QQSmGiftGet_1 = require("./script/ui/UI_QQSmGiftGet");
        var UI_Rank_1 = require("./script/ui/UI_Rank");
        var UI_RankUpgrade_1 = require("./script/ui/UI_RankUpgrade");
        var UI_SIgn_1 = require("./script/ui/UI_SIgn");
        var UI_Skin_1 = require("./script/ui/UI_Skin");
        var UI_TrySkin_1 = require("./script/ui/UI_TrySkin");
        var UI_TryReborn_1 = require("./script/ui/UI_TryReborn");
        var UI_Two11_1 = require("./script/ui/UI_Two11");
        var UI_Week_1 = require("./script/ui/UI_Week");
        var UI_WeekMoney_1 = require("./script/ui/UI_WeekMoney");
        var UI_WeekReward_1 = require("./script/ui/UI_WeekReward");
        var UI_WeekRule_1 = require("./script/ui/UI_WeekRule");
        var GameConfig = function() {
            function GameConfig() {}
            GameConfig.init = function() {
                var reg = Laya.ClassUtils.regClass;
                reg("script/scene/LoadScene.ts", LoadScene_1.default);
                reg("script/ui/Cmp/UINoticeCmp.ts", UINoticeCmp_1.default);
                reg("script/scene/MainScene.ts", MainScene_1.default);
                reg("script/ui/UI_Main.ts", UI_Main_1.default);
                reg("script/ui/Cmp/UIRankIconCmp.ts", UIRankIconCmp_1.default);
                reg("script/ui/Cmp/UIRankProgressCmp.ts", UIRankProgressCmp_1.default);
                reg("script/ui/Cmp/UIRebornCardTipCmp.ts", UIRebornCardTipCmp_1.default);
                reg("script/ui/Cmp/UINameCmp.ts", UINameCmp_1.default);
                reg("script/ui/UI_Name.ts", UI_Name_1.default);
                reg("script/ui/UI_Fight.ts", UI_Fight_1.default);
                reg("script/ui/UI_Dead.ts", UI_Dead_1.default);
                reg("script/ui/UI_Ready.ts", UI_Ready_1.default);
                reg("script/ui/UI_End.ts", UI_End_1.default);
                reg("script/ui/Cmp/UIRankEndCmp.ts", UIRankEndCmp_1.default);
                reg("script/ui/UI_Load.ts", UI_Load_1.default);
                reg("script/ui/UI_GameAd.ts", UI_GameAd_1.default);
                reg("script/ui/UI_DeadAd.ts", UI_DeadAd_1.default);
                reg("script/ui/UI_BottomAd.ts", UI_BottomAd_1.default);
                reg("script/ui/UI_RebornAd.ts", UI_RebornAd_1.default);
                reg("script/ui/Cmp/UIRankCmp.ts", UIRankCmp_1.default);
                reg("script/ui/UI_EndRank.ts", UI_EndRank_1.default);
                reg("script/ui/UI_Record.ts", UI_Record_1.default);
                reg("script/ui/UI_Banner.ts", UI_Banner_1.default);
                reg("script/ui/UI_buy_reborn.ts", UI_buy_reborn_1.default);
                reg("script/ui/UI_GetHints.ts", UI_GetHints_1.default);
                reg("script/ui/UI_Gift.ts", UI_Gift_1.default);
                reg("script/ui/UI_Invitefrined.ts", UI_Invitefrined_1.default);
                reg("script/ui/UI_Luck.ts", UI_Luck_1.default);
                reg("script/ui/UI_Map.ts", UI_Map_1.default);
                reg("script/ui/Cmp/MatchIconCmp.ts", MatchIconCmp_1.default);
                reg("script/ui/Cmp/UIMatchCmp.ts", UIMatchCmp_1.default);
                reg("script/ui/UI_Match.ts", UI_Match_1.default);
                reg("script/ui/UI_MoreGame.ts", UI_MoreGame_1.default);
                reg("script/ui/UI_QQGift.ts", UI_QQGift_1.default);
                reg("script/ui/UI_QQSmGift.ts", UI_QQSmGift_1.default);
                reg("script/ui/UI_QQSmGiftGet.ts", UI_QQSmGiftGet_1.default);
                reg("script/ui/UI_Rank.ts", UI_Rank_1.default);
                reg("script/ui/UI_RankUpgrade.ts", UI_RankUpgrade_1.default);
                reg("script/ui/UI_SIgn.ts", UI_SIgn_1.default);
                reg("script/ui/UI_Skin.ts", UI_Skin_1.default);
                reg("script/ui/UI_TrySkin.ts", UI_TrySkin_1.default);
                reg("script/ui/UI_TryReborn.ts", UI_TryReborn_1.default);
                reg("script/ui/UI_Two11.ts", UI_Two11_1.default);
                reg("script/ui/UI_Week.ts", UI_Week_1.default);
                reg("script/ui/UI_WeekMoney.ts", UI_WeekMoney_1.default);
                reg("script/ui/UI_WeekReward.ts", UI_WeekReward_1.default);
                reg("script/ui/UI_WeekRule.ts", UI_WeekRule_1.default);
            };
            GameConfig.width = 750;
            GameConfig.height = 1333;
            GameConfig.scaleMode = "fixedwidth";
            // GameConfig.screenMode = "vertical";
            GameConfig.alignV = "top";
            GameConfig.alignH = "center";
            GameConfig.startScene = "LoadScene.scene";
            GameConfig.sceneRoot = "";
            GameConfig.debug = false;
            GameConfig.stat = false;
            GameConfig.physicsDebug = false;
            GameConfig.exportSceneToJson = true;
            return GameConfig;
        }();
        exports.default = GameConfig;
        GameConfig.init();
    }, {
        "./script/scene/LoadScene": 92,
        "./script/scene/MainScene": 93,
        "./script/ui/Cmp/MatchIconCmp": 110,
        "./script/ui/Cmp/UIMatchCmp": 111,
        "./script/ui/Cmp/UINameCmp": 112,
        "./script/ui/Cmp/UINoticeCmp": 113,
        "./script/ui/Cmp/UIRankCmp": 114,
        "./script/ui/Cmp/UIRankEndCmp": 115,
        "./script/ui/Cmp/UIRankIconCmp": 116,
        "./script/ui/Cmp/UIRankProgressCmp": 117,
        "./script/ui/Cmp/UIRebornCardTipCmp": 118,
        "./script/ui/UI_Banner": 120,
        "./script/ui/UI_BottomAd": 121,
        "./script/ui/UI_Dead": 122,
        "./script/ui/UI_DeadAd": 123,
        "./script/ui/UI_End": 124,
        "./script/ui/UI_EndRank": 125,
        "./script/ui/UI_Fight": 126,
        "./script/ui/UI_GameAd": 127,
        "./script/ui/UI_GetHints": 128,
        "./script/ui/UI_Gift": 129,
        "./script/ui/UI_Invitefrined": 130,
        "./script/ui/UI_Load": 131,
        "./script/ui/UI_Luck": 132,
        "./script/ui/UI_Main": 133,
        "./script/ui/UI_Map": 134,
        "./script/ui/UI_Match": 135,
        "./script/ui/UI_MoreGame": 136,
        "./script/ui/UI_Name": 137,
        "./script/ui/UI_QQGift": 138,
        "./script/ui/UI_QQSmGift": 139,
        "./script/ui/UI_QQSmGiftGet": 140,
        "./script/ui/UI_Rank": 141,
        "./script/ui/UI_RankUpgrade": 142,
        "./script/ui/UI_Ready": 143,
        "./script/ui/UI_RebornAd": 144,
        "./script/ui/UI_Record": 145,
        "./script/ui/UI_SIgn": 146,
        "./script/ui/UI_Skin": 147,
        "./script/ui/UI_TryReborn": 148,
        "./script/ui/UI_TrySkin": 149,
        "./script/ui/UI_Two11": 150,
        "./script/ui/UI_Week": 151,
        "./script/ui/UI_WeekMoney": 152,
        "./script/ui/UI_WeekReward": 153,
        "./script/ui/UI_WeekRule": 154,
        "./script/ui/UI_buy_reborn": 155
    } ],
    2: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GameConfig_1 = require("./GameConfig");
        var APIManager_1 = require("./module/manager/APIManager");
        var SDKManager_1 = require("./module/manager/SDKManager");
        var CQApi_1 = require("./module/sdk/cqApi/CQApi");
        var WX_1 = require("./module/sdk/weChat/WX");
        var WX_helper_1 = require("./module/sdk/weChat/WX_helper");
        var WebTest_1 = require("./module/sdk/web/WebTest");
        var BJApi_1 = require("./module/sdk/bjApi/BJApi");
        var LoadScene_1 = require("./script/scene/LoadScene");
        var WXHelper_1 = require("./script/manager/WXHelper");
        var Bd_1 = require("./module/sdk/baidu/Bd");
        var Resdefine_1 = require("./script/common/Resdefine");
        var BDHelper_1 = require("./script/manager/BDHelper");
        var QQ_1 = require("./module/sdk/qq/QQ");
        var QQHelper_1 = require("./script/manager/QQHelper");
        var Main = function() {
            function Main() {
                if (window["Laya3D"]) Laya3D.init(GameConfig_1.default.width, GameConfig_1.default.height); else Laya.init(GameConfig_1.default.width, GameConfig_1.default.height, Laya["WebGL"]);
                Laya["Physics"] && Laya["Physics"].enable();
                Laya["DebugPanel"] && Laya["DebugPanel"].enable();
                Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
                Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
                Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
                Laya.URL.exportSceneToJson = GameConfig_1.default.exportSceneToJson;
                if (GameConfig_1.default.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
                if (GameConfig_1.default.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
                if (GameConfig_1.default.stat) Laya.Stat.show();
                Laya.alertGlobalError = true;
                Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_WX:
                    // APIManager_1.default.inst.init(BJApi_1.default, "https://api.yz061.com/", "klhs");
                    // SDKManager_1.default.inst.init(WX_1.default, WXHelper_1.WXHelper);
                    // console.log("åˆå§‹åŒ–å¾®ä¿¡");
                    break;

                  case SDKManager_1.default.PlaneForm_Swan:
                    // APIManager_1.default.inst.init(CQApi_1.default, "https://games.api.gugudang.com", "C2HYNMSvyX3wmqXBpqOmb6sZV6lWLnGG");
                    // SDKManager_1.default.inst.init(Bd_1.default, BDHelper_1.default);
                    // Resdefine_1.default.adVersion += "_bd";
                    // console.log("åˆå§‹åŒ–ç™¾åº¦");
                    break;

                  case SDKManager_1.default.PlaneForm_QQ:
                    // APIManager_1.default.inst.init(CQApi_1.default, "https://games.api.gugudang.com", "1109574595");
                    // SDKManager_1.default.inst.init(QQ_1.default, QQHelper_1.default);
                    // Resdefine_1.default.adVersion += "_qq";
                    // console.log("åˆå§‹åŒ–QQ");
                    break;

                  case SDKManager_1.default.PlaneForm_Web:
                    APIManager_1.default.inst.init(CQApi_1.default, "", "");
                    SDKManager_1.default.inst.init(WebTest_1.default, WX_helper_1.default);
                    // console.log("åˆå§‹åŒ–Web");
                    break;
                }
                var str = Laya.LocalStorage.getItem("=========");
                var num = Number("16");
                console.debug(str);
            }
            Main.prototype.onConfigLoaded = function() {
                platform.getInstance();
                YYGSDK.on(YYG.Event.YYGSDK_INITIALIZED,this,()=>
                {
                    new LoadScene_1.default();
                    GameConfig_1.default.startScene && Laya.Scene.open(GameConfig_1.default.startScene);
                    
                })
                let o = new YYG.Options();
                o.gameNameId = "Aquapark-Io"
                o.gamedistributionID = "2d5df06bddfa400ab53e02c64a7f4172";
                YYGSDK.__init__(YYG.ChannelType.YAD,o);
              
            };
            return Main;
        }();
        new Main();
    }, {
        "./GameConfig": 1,
        "./module/manager/APIManager": 5,
        "./module/manager/SDKManager": 8,
        "./module/sdk/baidu/Bd": 14,
        "./module/sdk/bjApi/BJApi": 16,
        "./module/sdk/cqApi/CQApi": 17,
        "./module/sdk/qq/QQ": 18,
        "./module/sdk/weChat/WX": 20,
        "./module/sdk/weChat/WX_helper": 21,
        "./module/sdk/web/WebTest": 22,
        "./script/common/Resdefine": 57,
        "./script/manager/BDHelper": 79,
        "./script/manager/QQHelper": 87,
        "./script/manager/WXHelper": 91,
        "./script/scene/LoadScene": 92
    } ],
    3: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EventHandler_1 = require("./EventHandler");
        var EventDispatcher = function() {
            function EventDispatcher() {}
            EventDispatcher.prototype.hasListener = function(type) {
                var listener = this._events && this._events[type];
                return !!listener;
            };
            EventDispatcher.prototype.event = function(type, data) {
                if (data === void 0) {
                    data = null;
                }
                if (!this._events || !this._events[type]) return false;
                var listeners = this._events[type];
                if (listeners.run) {
                    if (listeners.once) {
                        delete this._events[type];
                    }
                    data != null ? listeners.runWith(data) : listeners.run();
                } else {
                    for (var i = 0, n = listeners.length; i < n; i++) {
                        var listener = listeners[i];
                        if (listener) {
                            data != null ? listener.runWith(data) : listener.run();
                        }
                        if (!listener || listener.once) {
                            listeners.splice(i, 1);
                            i--;
                            n--;
                        }
                    }
                    if (listeners.length === 0 && this._events) {
                        delete this._events[type];
                    }
                }
                return true;
            };
            EventDispatcher.prototype.on = function(type, caller, listener, args) {
                if (args === void 0) {
                    args = null;
                }
                return this._createListener(type, caller, listener, args, false);
            };
            EventDispatcher.prototype.once = function(type, caller, listener, args) {
                if (args === void 0) {
                    args = null;
                }
                return this._createListener(type, caller, listener, args, true);
            };
            EventDispatcher.prototype._createListener = function(type, caller, listener, args, once, offBefore) {
                if (offBefore === void 0) {
                    offBefore = true;
                }
                if (offBefore) {
                    this.off(type, caller, listener, once);
                }
                var handler = EventHandler_1.default.create(caller || this, listener, args, once);
                this._events || (this._events = {});
                var events = this._events;
                if (!events[type]) events[type] = handler; else {
                    if (!events[type].run) events[type].push(handler); else events[type] = [ events[type], handler ];
                }
                return this;
            };
            EventDispatcher.prototype.off = function(type, caller, listener, onceOnly) {
                if (onceOnly === void 0) {
                    onceOnly = false;
                }
                if (!this._events || !this._events[type]) return this;
                var listeners = this._events[type];
                if (listeners != null) {
                    if (listeners.run) {
                        if ((!caller || listeners.caller === caller) && (listener == null || listeners.method === listener) && (!onceOnly || listeners.once)) {
                            delete this._events[type];
                            listeners.recover();
                        }
                    } else {
                        var eventArr = Array(listeners);
                        var count = 0;
                        var n = eventArr.length;
                        for (var i = 0; i < n; i++) {
                            var item = eventArr[i];
                            if (!item) {
                                count++;
                                continue;
                            }
                            if (item && (!caller || item.caller === caller) && (listener == null || item.method === listener) && (!onceOnly || item.once)) {
                                count++;
                                eventArr[i] = null;
                                item.recover();
                            }
                        }
                        if (count === n) {
                            delete this._events[type];
                        }
                    }
                }
                return this;
            };
            EventDispatcher.prototype.offAll = function(type) {
                if (type === void 0) {
                    type = null;
                }
                var events = this._events;
                if (!events) return this;
                if (type) {
                    this._recoverHandlers(events[type]);
                    delete events[type];
                } else {
                    for (var name_1 in events) {
                        this._recoverHandlers(events[name_1]);
                    }
                    this._events = null;
                }
                return this;
            };
            EventDispatcher.prototype._recoverHandlers = function(arr) {
                if (!arr) return;
                if (arr.run) {
                    arr.recover();
                } else {
                    var i = arr.length - 1;
                    for (i; i > -1; i--) {
                        if (arr[i]) {
                            arr[i].recover();
                            arr[i] = null;
                        }
                    }
                }
            };
            return EventDispatcher;
        }();
        exports.default = EventDispatcher;
    }, {
        "./EventHandler": 4
    } ],
    4: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BHandler_1 = require("../utils/BHandler");
        var EventHandler = function(_super) {
            __extends(EventHandler, _super);
            function EventHandler() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return EventHandler;
        }(BHandler_1.default);
        exports.default = EventHandler;
    }, {
        "../utils/BHandler": 23
    } ],
    5: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var APIManager = function() {
            function APIManager() {}
            Object.defineProperty(APIManager, "inst", {
                get: function() {
                    if (!this._inst) {
                        this._inst = new APIManager();
                    }
                    return this._inst;
                },
                enumerable: true,
                configurable: true
            });
            APIManager.prototype.init = function(apiClas, url, flag) {
                this._api = new apiClas();
                this._api.url = url;
                this._api.flag = flag;
            };
            Object.defineProperty(APIManager.prototype, "api", {
                get: function() {
                    return this._api;
                },
                enumerable: true,
                configurable: true
            });
            return APIManager;
        }();
        exports.default = APIManager;
    }, {} ],
    6: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EventDispatcher_1 = require("../event/EventDispatcher");
        var DispatcherMrg = function() {
            function DispatcherMrg() {}
            Object.defineProperty(DispatcherMrg, "ins", {
                get: function() {
                    if (!this._ins) {
                        this._evt = new EventDispatcher_1.default();
                        this._ins = new DispatcherMrg();
                    }
                    return this._ins;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DispatcherMrg, "evntObj", {
                get: function() {
                    return this._evt;
                },
                enumerable: true,
                configurable: true
            });
            DispatcherMrg.prototype.on = function(type, caller, res, args) {
                if (args === void 0) {
                    args = null;
                }
                DispatcherMrg.evntObj.on(type + "", caller, res, args);
            };
            DispatcherMrg.prototype.off = function(type, caller, res) {
                DispatcherMrg.evntObj.off(type + "", caller, res);
            };
            DispatcherMrg.prototype.eventTo = function(type, data) {
                if (data === void 0) {
                    data = null;
                }
                DispatcherMrg.evntObj.event(type + "", data);
            };
            DispatcherMrg.prototype.hasEvent = function(type) {
                return DispatcherMrg.evntObj.hasListener(type + "");
            };
            return DispatcherMrg;
        }();
        exports.default = DispatcherMrg;
    }, {
        "../event/EventDispatcher": 3
    } ],
    7: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var APIManager_1 = require("./APIManager");
        var BHandler_1 = require("../utils/BHandler");
        var Dictionary_1 = require("../utils/Dictionary");
        var DispatcherMrg_1 = require("./DispatcherMrg");
        var SDKManager_1 = require("./SDKManager");
        var ShareInfo_1 = require("../sdk/ShareInfo");
        var MatterManager = function() {
            function MatterManager() {
                this.isReady = false;
                this._recomDic = new Dictionary_1.default();
                this._countData = new Dictionary_1.default();
                this._materViewInfo = new Dictionary_1.default();
                this._shareDic = new Array();
                DispatcherMrg_1.default.ins.on(SDKManager_1.default.Event_Hide, this, this.onUpdate);
            }
            Object.defineProperty(MatterManager, "inst", {
                get: function() {
                    if (!this._inst) {
                        this._inst = new MatterManager();
                    }
                    return this._inst;
                },
                enumerable: true,
                configurable: true
            });
            MatterManager.prototype.init = function(adVersion) {
                var _this = this;
                APIManager_1.default.inst.api.getAdState(adVersion, BHandler_1.default.create(this, function(state, adState) {
                    MatterManager.adPolicy = adState;
                    MatterManager.canShow = state;
                    console.log("æŽ¥æ”¶åˆ°å¹¿å‘ŠçŠ¶æ€:ç­–ç•¥", adState, "å¹¿å‘Š", state);
                    console.log("å®žé™…å¹¿å‘ŠçŠ¶æ€:ç­–ç•¥", MatterManager.adPolicy, "å¹¿å‘Š", MatterManager.canShow);
                    APIManager_1.default.inst.api.getMatter(BHandler_1.default.create(_this, function(arr) {
                        console.log("å¹¿å‘ŠèŽ·å–å®Œæˆ:", arr);
                        _this.onInitMatter(arr);
                    }));
                }));
            };
            Object.defineProperty(MatterManager, "canShow", {
                get: function() {
                    return this._canShow;
                },
                set: function(val) {
                    if (val == this._canShow) {
                        return;
                    }
                    this._canShow = val;
                    DispatcherMrg_1.default.ins.eventTo(MatterManager.Events_MatterState);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MatterManager, "adPolicy", {
                get: function() {
                    return this._adPolicy && SDKManager_1.default.inst.sChannel != "own";
                },
                set: function(val) {
                    this._adPolicy = val;
                },
                enumerable: true,
                configurable: true
            });
            MatterManager.prototype.onClick = function(info, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                if (!info) {
                    console.error("æ”¶åˆ°äº†çš„å¹¿å‘Šå¯¹è±¡");
                    return;
                }
                SDKManager_1.default.inst.sdk.navigateToMiniProgram(info.appid, info, hand, info.path);
            };
            MatterManager.prototype.showMatter = function(viewID, locID, recArr) {
                this.changeInfo(viewID, locID, recArr);
                this.addCount(recArr);
            };
            MatterManager.prototype.showPart = function(viewID, locID, recArr) {
                var arr = this.getShowInfo(viewID, locID);
                var j = 0;
                var i = 0;
                var recon;
                var showArr = [];
                var ps = true;
                for (j = 0; j < recArr.length; j++) {
                    ps = true;
                    for (i = 0; i < arr.length; i++) {
                        recon = arr[i];
                        if (recon.id == recArr[j].id && recon.location == recArr[j].location && recon.appid == recArr[j].appid) {
                            ps = false;
                            break;
                        }
                    }
                    if (ps) {
                        showArr.push(recArr[j]);
                    }
                }
                this.changeInfo(viewID, locID, recArr);
                this.addCount(showArr);
            };
            MatterManager.prototype.hideMatter = function(sViewID, locID) {
                var dic = this._materViewInfo.get(locID);
                if (dic && dic.ContainsKey(sViewID)) {
                    console.log("Matter hide ->" + sViewID);
                    dic.remove(sViewID);
                }
            };
            MatterManager.prototype.applyMatter = function(viewID, locID, type) {
                return platform.getInstance().getForgames();
                // if (type === void 0) {
                //     type = 0;
                // }
                // var rArr = new Array();
                // var hasShow;
                // switch (type) {
                //   case 0:
                //     {
                //         hasShow = this.getShowInfoAll(viewID, locID);
                //         break;
                //     }

                //   case 1:
                //     {
                //         hasShow = this.getShowInfoAll(viewID, locID);
                //         break;
                //     }

                //   case 2:
                //     {
                //         hasShow = this.getShowInfo(viewID, locID);
                //         break;
                //     }

                //   case 3:
                //     {
                //         rArr = this._recomDic.get(locID);
                //         if (rArr) {
                //             rArr = rArr.concat([]);
                //         }
                //         return rArr;
                //     }

                //   default:
                //     {
                //         hasShow = [];
                //     }
                // }
                // var idArr = [];
                // var i = 0;
                // for (i = 0; i < hasShow.length; i++) {
                //     idArr.push(hasShow[i].id + "_" + hasShow[i].appid);
                // }
                // var allArr = this._recomDic.get(locID);
                // var str;
                // if (allArr) {
                //     for (i = 0; i < allArr.length; i++) {
                //         str = allArr[i].id + "_" + allArr[i].appid;
                //         if (idArr.indexOf(str) == -1) {
                //             rArr.push(allArr[i]);
                //         }
                //     }
                // }
                // return rArr;
            };
            MatterManager.prototype.addCount = function(arr) {
                // if (!arr) {
                //     return;
                // }
                // var i = 0;
                // var dic;
                // var countObj;
                // for (i = 0; i < arr.length; i++) {
                //     dic = this._countData.get(arr[i].name);
                //     if (!dic) {
                //         dic = new Dictionary_1.default();
                //         this._countData.set(arr[i].name, dic);
                //     }
                //     countObj = dic.get(arr[i].id);
                //     if (!countObj) {
                //         countObj = {
                //             ad_id: arr[i].id,
                //             location_id: arr[i].location,
                //             scene: arr[i].item.name,
                //             num: 0
                //         };
                //         dic.set(arr[i].id, countObj);
                //     }
                //     countObj.num += 1;
                // }
            };
            MatterManager.prototype.onUpdate = function() {
                if (this._countData.values.length == 0) return;
                var arr = [];
                var i = 0;
                var j = 0;
                var dic;
                var temp;
                for (i = 0; i < this._countData.values.length; i++) {
                    dic = this._countData.values[i];
                    temp = dic.values;
                    arr = arr.concat(temp);
                }
                APIManager_1.default.inst.api.exposure(arr, null);
                this._countData.clear();
            };
            MatterManager.prototype.onInitMatter = function(arr) {
                if (arr) {
                    var i = 0;
                    var info = void 0;
                    var temp = void 0;
                    var div = SDKManager_1.default.inst.getPhonePlane();
                    var canUse = void 0;
                    for (i = 0; i < arr.length; i++) {
                        canUse = false;
                        info = arr[i];
                        if (info) {
                            if (info.matter_type == 1) {
                                switch (info.ad_device) {
                                  case 0:
                                    {
                                        canUse = true;
                                        break;
                                    }

                                  case 1:
                                  case 2:
                                    {
                                        if (info.ad_device == div || div > 2) {
                                            canUse = true;
                                        }
                                        break;
                                    }

                                  default:
                                    {
                                        canUse = true;
                                        break;
                                    }
                                }
                                if (canUse) {
                                    temp = this._recomDic.get(info.location);
                                    if (!temp) {
                                        temp = new Array();
                                        this._recomDic.set(info.location, temp);
                                    }
                                    temp.push(info);
                                }
                            } else {
                                console.log("åˆ†äº«å†…å®¹èŽ·å–æˆåŠŸ", info.data);
                                if (info.data) {
                                    var share = new ShareInfo_1.default();
                                    share.init(info.data);
                                    this._shareDic.push(share);
                                    SDKManager_1.default.inst.sdk.shareMenu();
                                }
                            }
                        }
                    }
                }
                console.log("onMatterReady", this._recomDic);
                this.isReady = true;
                DispatcherMrg_1.default.ins.eventTo(MatterManager.Events_MatterReady);
            };
            MatterManager.prototype.getShowInfo = function(sViewID, locID) {
                var dic = this._materViewInfo.get(locID);
                if (dic && dic.ContainsKey(sViewID)) {
                    return dic.get(sViewID).info;
                }
                return [];
            };
            MatterManager.prototype.getShowInfoAll = function(viewID, locID) {
                if (viewID === void 0) {
                    viewID = null;
                }
                if (locID === void 0) {
                    locID = null;
                }
                var rArr = new Array();
                var i = 0;
                var j = 0;
                var valArr = this._materViewInfo.values;
                var dicArr;
                var dic;
                for (i = 0; i < valArr.length; i++) {
                    dic = valArr[i];
                    dicArr = dic.values;
                    for (j = 0; j < dicArr.length; j++) {
                        if (!dicArr[j]) {
                            continue;
                        }
                        if (dicArr[j].id != viewID || locID != dicArr[j].loc) {
                            if (dicArr[j].info && dicArr[j].info.length > 0) {
                                rArr = rArr.concat(dicArr[j].info);
                            }
                        }
                    }
                }
                return rArr;
            };
            MatterManager.prototype.getShowInfoByLoc = function(locID, viewID) {
                if (viewID === void 0) {
                    viewID = null;
                }
                var rArr = new Array();
                var dic = this._materViewInfo.get(locID);
                if (dic) {
                    var dicArr = dic.values;
                    var i = 0;
                    if (dicArr[i].id != viewID) {
                        if (dicArr[i].info && dicArr[i].info.length > 0) {
                            rArr = rArr.concat(dicArr[i].info);
                        }
                    }
                }
                return rArr;
            };
            MatterManager.prototype.changeInfo = function(viewID, locID, recArr) {
                var dic = this._materViewInfo.get(locID);
                if (!dic) {
                    dic = new Dictionary_1.default();
                    this._materViewInfo.set(locID, dic);
                }
                dic.set(viewID, {
                    info: recArr,
                    id: viewID,
                    loc: locID
                });
            };
            MatterManager.prototype.getShareInfo = function(id) {
                if (id === void 0) {
                    id = -1;
                }
                if (this._shareDic && this._shareDic.length > 0) {
                    if (id < 0) {
                        var dex = Math.floor(Math.random() * this._shareDic.length);
                        console.log("è¿”å›žåˆ†äº«ä¿¡æ¯:", this._shareDic, dex);
                        return this._shareDic[dex];
                    }
                    for (var i = 0; i < this._shareDic.length; i++) {
                        if (this._shareDic[i].share_id == id) {
                            return this._shareDic[i];
                        }
                    }
                }
                return null;
            };
            MatterManager.Location_Fire = 7;
            MatterManager.Location_EndGame = 6;
            MatterManager.Location_GuessLike = 5;
            MatterManager.Location_MoreGame = 10;
            MatterManager.Events_MatterReady = "matterready";
            MatterManager.Events_MatterState = "matterStateChange";
            MatterManager._canShow = true;
            MatterManager._adPolicy = true;
            return MatterManager;
        }();
        exports.default = MatterManager;
    }, {
        "../sdk/ShareInfo": 13,
        "../utils/BHandler": 23,
        "../utils/Dictionary": 24,
        "./APIManager": 5,
        "./DispatcherMrg": 6,
        "./SDKManager": 8
    } ],
    8: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var SDKManager = function() {
            function SDKManager() {
                this.sChannel = "own";
                this.code = null;
                this.platform = -1;
                if (window["qq"]) {
                    this.platform = SDKManager.PlaneForm_QQ;
                } else if (window["wx"]) {
                    this.platform = SDKManager.PlaneForm_WX;
                } else if (window["swan"]) {
                    this.platform = SDKManager.PlaneForm_Swan;
                } else {
                    this.platform = SDKManager.PlaneForm_Web;
                }
            }
            Object.defineProperty(SDKManager, "inst", {
                get: function() {
                    if (!this._inst) {
                        this._inst = new SDKManager();
                    }
                    return this._inst;
                },
                enumerable: true,
                configurable: true
            });
            SDKManager.prototype.init = function(sdkClass, helper) {
                if (sdkClass) {
                    this.sdk = new sdkClass();
                    this.sdk.init(helper);
                }
            };
            Object.defineProperty(SDKManager.prototype, "helper", {
                get: function() {
                    if (!this.sdk) {
                        return null;
                    }
                    return this.sdk.helper;
                },
                enumerable: true,
                configurable: true
            });
            SDKManager.prototype.getPhonePlane = function() {
                return this.sdk.getPhonePlane();
            };
            Object.defineProperty(SDKManager.prototype, "phoneInfo", {
                get: function() {
                    if (!this.sdk) {
                        return null;
                    }
                    return this.sdk.phoneInfo;
                },
                enumerable: true,
                configurable: true
            });
            SDKManager.Event_Hide = "onGameHide";
            SDKManager.Event_Show = "onGameShow";
            SDKManager.Event_BannerOnErro = "Banner_onError";
            SDKManager.Event_VideoOnErro = "Video_onError";
            SDKManager.PlaneForm_WX = 0;
            SDKManager.PlaneForm_Swan = 1;
            SDKManager.PlaneForm_Web = 2;
            SDKManager.PlaneForm_QQ = 3;
            return SDKManager;
        }();
        exports.default = SDKManager;
    }, {} ],
    9: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var APIBase = function() {
            function APIBase() {
                this.url = "";
                this.flag = "";
                this.token = "";
            }
            APIBase.prototype.login = function(sCode, sChannel, hand, sFappid) {
                if (sChannel === void 0) {
                    sChannel = "";
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sFappid === void 0) {
                    sFappid = null;
                }
            };
            APIBase.prototype.setUserData = function(sData, siv, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.setUserData_2 = function(sData, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.additional = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.getAdState = function(param, hand) {};
            APIBase.prototype.getMatter = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.openClick = function(app, type, comp, hand) {
                if (comp === void 0) {
                    comp = true;
                }
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.eventPost = function(sCode, sKey, val, hand, sExtend) {
                if (val === void 0) {
                    val = null;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sExtend === void 0) {
                    sExtend = "";
                }
            };
            APIBase.prototype.UploadWeekScore = function(score, mapId) {};
            APIBase.prototype.GetWeekScore = function(mapId, hand) {};
            APIBase.prototype.GetRewardCode = function(hand) {
                var dataSource = [];
                hand.runWith(dataSource);
            };
            APIBase.prototype.report = function(hand, skey, val) {
                if (skey === void 0) {
                    skey = "";
                }
                if (val === void 0) {
                    val = null;
                }
            };
            APIBase.prototype.getPay = function(hand, isFirst) {
                if (isFirst === void 0) {
                    isFirst = false;
                }
            };
            APIBase.prototype.midasPay = function(num, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.midasGetBalance = function(money, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.daily = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.exposure = function(datas, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.invite = function(origin, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.seeInviteNum = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            APIBase.prototype.stat = function(sLoc, hand, proObj) {
                if (hand === void 0) {
                    hand = null;
                }
                if (proObj === void 0) {
                    proObj = null;
                }
            };
            APIBase.prototype.getsetting = function() {};
            APIBase.prototype.getShareContent = function(hand) {};
            APIBase.prototype.uploadShareStatus = function(iState, hand) {};
            APIBase.prototype.uploadError = function(code, msg, hand) {};
            APIBase.prototype.uploadWorldRankScroe = function(score, hand) {};
            APIBase.prototype.getWorldRankScroe = function(count, hand) {
                if (count === void 0) {
                    count = 8;
                }
            };
            APIBase.prototype.uploadAdsClick = function(param, hand) {};
            return APIBase;
        }();
        exports.default = APIBase;
    }, {} ],
    10: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EventDispatcher_1 = require("../event/EventDispatcher");
        var Http = function(_super) {
            __extends(Http, _super);
            function Http() {
                var _this = _super.call(this) || this;
                _this._http = new XMLHttpRequest();
                return _this;
            }
            Http.prototype.send = function(url, data, hand, method, responseType, headers) {
                var _this = this;
                if (data === void 0) {
                    data = null;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (method === void 0) {
                    method = "get";
                }
                if (responseType === void 0) {
                    responseType = "json";
                }
                if (headers === void 0) {
                    headers = null;
                }
                var ds = "";
                if (method === "get" && data != null) {
                    ds = "?";
                    for (var i in data) {
                        ds += i + "=" + data[i] + "&";
                    }
                    ds = ds.slice(0, ds.length - 1);
                    data = null;
                }
                this._hand = hand;
                this._responseType = responseType;
                this._data = null;
                this._url = url;
                this.http.open(method, url + ds, true);
                if (headers) {
                    var i = 0;
                    for (i = 0; i < headers.length; i++) {
                        this.http.setRequestHeader(headers[i++], headers[i]);
                    }
                } else {
                    if (!data || typeof data == "string") {
                        this.http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    } else {
                        this.http.setRequestHeader("Content-Type", "application/json");
                    }
                }
                this.http.responseType = responseType !== "arraybuffer" ? "text" : "arraybuffer";
                this.http.onerror = function(e) {
                    _this._onError(e);
                };
                this.http.onabort = function(e) {
                    _this._onAbort(e);
                };
                this.http.onprogress = function(e) {
                    _this._onProgress(e);
                };
                this.http.onload = function(e) {
                    _this._onLoad(e);
                };
                console.log("Http -> ", url + ds, data);
                this.http.send(data);
            };
            Http.prototype._onError = function(e) {
                console.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText);
                if (this._hand) {
                    this._hand.runWith([ null ]);
                }
            };
            Http.prototype._onAbort = function(e) {
                console.error("Request was aborted by user");
            };
            Http.prototype._onProgress = function(e) {
                if (e && e.lengthComputable) {
                    _super.prototype.event.call(this, "progress", e.loaded / e.total);
                }
            };
            Http.prototype._onLoad = function(e) {
                var http = this._http;
                var status = http.status !== undefined ? http.status : 200;
                if (status === 200 || status === 204 || status === 0) {
                    this.complete();
                } else {
                    console.error("[" + http.status + "]" + http.statusText + ":" + http.responseURL);
                }
            };
            Http.prototype.complete = function() {
                this.clear();
                var flag = true;
                try {
                    if (this._responseType === "json") {
                        this._data = JSON.parse(this._http.responseText);
                    } else if (this._responseType === "xml") {} else {
                        this._data = this._http.response || this._http.responseText;
                    }
                } catch (e) {
                    flag = false;
                    console.error(e.message);
                }
                if (flag) {
                    _super.prototype.event.call(this, "complete", [ this._data ]);
                    if (this._hand) {
                        this._hand.runWith([ this.data ]);
                    }
                }
            };
            Http.prototype.clear = function() {
                var http = this._http;
                http.onerror = http.onabort = http.onprogress = http.onload = null;
            };
            Object.defineProperty(Http.prototype, "url", {
                get: function() {
                    return this._url;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Http.prototype, "data", {
                get: function() {
                    return this._data;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Http.prototype, "http", {
                get: function() {
                    return this._http;
                },
                enumerable: true,
                configurable: true
            });
            return Http;
        }(EventDispatcher_1.default);
        exports.default = Http;
    }, {
        "../event/EventDispatcher": 3
    } ],
    11: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var RecomInfo = function() {
            function RecomInfo() {
                this.id = 0;
                this.icon = "";
                this.openImg = "";
                this.path = "";
                this.appid = "";
                this.count = "";
                this.dot = 0;
                this.name = "";
                this.location = 0;
                this.ad_device = 0;
                this.matter_type = 0;
                this.induced = "";
            }
            RecomInfo.prototype.initBj = function(obj, aItem) {
                if (!obj) {
                    return;
                }
                this.icon = obj.ad_img + "";
                this.path = obj.ad_path + "";
                this.dot = obj.ad_dot;
                this.appid = obj.ad_appid + "";
                this.count = obj.ad_count + "";
                this.id = obj.ad_id;
                this.name = obj.ad_name + "";
                this.ad_device = obj.ad_device;
                if (obj.ad_qrimg) {
                    this.openImg = obj.ad_qrimg + "";
                }
                this.data = obj;
                this.matter_type = aItem.matter_type;
                this.location = aItem.location_id;
                this.item = aItem;
            };
            RecomInfo.prototype.initCq = function(obj, aItem) {
                if (!obj) {
                    return;
                }
                this.id = obj.id;
                this.name = obj.name + "";
                this.appid = obj.appid + "";
                this.icon = obj.logo + "";
                this.path = obj.path + "";
                this.dot = obj.dot;
                this.count = obj.player + "";
                this.ad_device = obj.device;
                this.induced = obj.induced;
                if (obj.qrcode) {
                    this.openImg = obj.qrcode + "";
                }
                this.data = obj;
                this.matter_type = 1;
                this.location = parseInt(aItem.code);
                this.item = aItem;
            };
            return RecomInfo;
        }();
        exports.default = RecomInfo;
    }, {} ],
    12: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var DispatcherMrg_1 = require("../manager/DispatcherMrg");
        var SDKBase = function() {
            function SDKBase() {
                this.SDK = null;
                this.Banner_Def_Width = 0;
                this.canVibrate = true;
                this.sysOfy = 0;
                this.screenratio = 0;
                this.bannerShowing = false;
                this._loginState = -1;
                this._videoState = -1;
                this.openDataContext = null;
                this.shareflag = 3;
                this.isUploadInviteInfo = false;
                this.inviteId = "";
            }
            SDKBase.prototype.init = function(hClass) {
                if (hClass === void 0) {
                    hClass = null;
                }
            };
            SDKBase.prototype.getPhonePlane = function() {
                return -1;
            };
            SDKBase.prototype.setStorage = function(skey, value, toServer, hand, isAsyh) {
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (isAsyh === void 0) {
                    isAsyh = false;
                }
            };
            SDKBase.prototype.getStorage = function(key, defVal, toServer, hand) {
                if (defVal === void 0) {
                    defVal = null;
                }
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
            };
            SDKBase.prototype.getReferrerInfo = function() {
                var res = this.base.getLaunchOptionsSync();
                if (res) {
                    return res.referrerInfo;
                }
                return null;
            };
            SDKBase.prototype.getSceneID = function() {
                if (!this.base) return -1;
                var res = this.base.getLaunchOptionsSync();
                if (res) {
                    return res.scene;
                }
                return -1;
            };
            SDKBase.prototype.getFappID = function() {
                var res = this.getReferrerInfo();
                if (res && res.appId) {
                    return res.appId;
                }
                return "";
            };
            SDKBase.prototype.getSystemInfo = function(resHandler, difSysOfy, stageWidth, stageHeight) {
                if (difSysOfy === void 0) {
                    difSysOfy = 95;
                }
                if (stageWidth === void 0) {
                    stageWidth = 750;
                }
                if (stageHeight === void 0) {
                    stageHeight = 1334;
                }
            };
            SDKBase.prototype.vibrateLong = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
            };
            SDKBase.prototype.vibrateShort = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
            };
            SDKBase.prototype.login = function(hand) {};
            SDKBase.prototype.applyUpdate = function() {};
            SDKBase.prototype.clearStorage = function() {};
            SDKBase.prototype.authorize = function(hand, rect) {};
            SDKBase.prototype.getUserInfo = function(hand) {};
            SDKBase.prototype.destroyUserInfoButton = function() {};
            SDKBase.prototype.navigateToMiniProgram = function(sAppId, app, hand, spath, oExtraData, sEnvVersion) {
                if (hand === void 0) {
                    hand = null;
                }
                if (spath === void 0) {
                    spath = "";
                }
                if (oExtraData === void 0) {
                    oExtraData = null;
                }
                if (sEnvVersion === void 0) {
                    sEnvVersion = "release";
                }
            };
            SDKBase.prototype.shareAppMessage = function(hand, queryData) {
                if (hand === void 0) {
                    hand = null;
                }
                if (queryData === void 0) {
                    queryData = null;
                }
            };
            SDKBase.prototype.shareMenu = function(withShareTicket) {
                if (withShareTicket === void 0) {
                    withShareTicket = true;
                }
            };
            SDKBase.prototype.setClipboardData = function(code) {};
            SDKBase.prototype.previewImage = function(url, pro, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            SDKBase.prototype.setKeepScreenOn = function(bKeepScreenOn) {
                if (bKeepScreenOn === void 0) {
                    bKeepScreenOn = true;
                }
            };
            SDKBase.prototype.exit = function() {};
            SDKBase.prototype.createFeedbackButton = function(type, text, image, style) {};
            SDKBase.prototype.showBanner = function(delay, hand, iWidth) {
                if (delay === void 0) {
                    delay = 0;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (iWidth === void 0) {
                    iWidth = -1;
                }
                return 0;
            };
            SDKBase.prototype.hideBannder = function(bDestroy) {
                if (bDestroy === void 0) {
                    bDestroy = true;
                }
            };
            SDKBase.prototype.onBannerResize = function(caller, res, args) {
                if (args === void 0) {
                    args = null;
                }
                DispatcherMrg_1.default.ins.on("Banner_OnResize", caller, res, args);
            };
            SDKBase.prototype.offBannerResize = function(caller, res) {
                DispatcherMrg_1.default.ins.off("Banner_OnResize", caller, res);
            };
            SDKBase.prototype.pay = function(num, hand, zone) {
                if (zone === void 0) {
                    zone = "1";
                }
            };
            SDKBase.prototype.showToast = function(sTitle, iDuration, bMask, sIcon) {
                if (iDuration === void 0) {
                    iDuration = 1e3;
                }
                if (bMask === void 0) {
                    bMask = false;
                }
                if (sIcon === void 0) {
                    sIcon = "none";
                }
            };
            SDKBase.prototype.showLoading = function(sTitle, bMask) {
                if (sTitle === void 0) {
                    sTitle = "è¯·ç¨åŽ";
                }
                if (bMask === void 0) {
                    bMask = true;
                }
            };
            SDKBase.prototype.hideLoading = function(params) {
                if (params === void 0) {
                    params = null;
                }
            };
            SDKBase.prototype.showModal = function(sTitle, desc, hand, bshowCancel) {
                if (hand === void 0) {
                    hand = null;
                }
                if (bshowCancel === void 0) {
                    bshowCancel = false;
                }
                this.showModal2({
                    title: sTitle,
                    showCancel: bshowCancel,
                    content: desc,
                    success: function(res) {
                        if (hand) {
                            hand.runWith(res);
                        }
                    }
                });
            };
            SDKBase.prototype.showModal2 = function(params) {};
            SDKBase.prototype.canShowBanner = function() {
                return 1;
            };
            SDKBase.prototype.canPlayVideo = function() {
                return false;
            };
            SDKBase.prototype.openCustomerServiceConversation = function(params) {
                if (params === void 0) {
                    params = null;
                }
            };
            SDKBase.prototype.postMsg = function(msg) {};
            SDKBase.prototype.openViewSize = function(iWidth, iHeight) {};
            SDKBase.prototype.phoneToScreen = function(nX, nY, nWidth, nHeight) {
                var rx = 0;
                var ry = 0;
                if (this.phoneInfo) {
                    var w = Number(this.phoneInfo.windowWidth) / nWidth;
                    var h = Number(this.phoneInfo.windowHeight) / nHeight;
                    rx = nX / w;
                    ry = nY / h;
                }
                return {
                    x: rx,
                    y: ry
                };
            };
            SDKBase.prototype.screenToPhone = function(nX, nY, nWidth, nHeight) {
                var rx = 0;
                var ry = 0;
                if (this.phoneInfo) {
                    var w = Number(this.phoneInfo.windowWidth) / nWidth;
                    var h = Number(this.phoneInfo.windowHeight) / nHeight;
                    rx = nX * w;
                    ry = nY * h;
                }
                return {
                    x: rx,
                    y: ry
                };
            };
            SDKBase.prototype.showVideoAd = function(compHand) {
                return null;
            };
            SDKBase.prototype.initVideoAD = function() {
                return false;
            };
            SDKBase.prototype.eventPost = function(sCode, sKey, val, hand, sExtend) {
                if (sCode === void 0) {
                    sCode = "";
                }
                if (sKey === void 0) {
                    sKey = "";
                }
                if (val === void 0) {
                    val = null;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sExtend === void 0) {
                    sExtend = "";
                }
            };
            return SDKBase;
        }();
        exports.default = SDKBase;
    }, {
        "../manager/DispatcherMrg": 6
    } ],
    13: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ShareInfo = function() {
            function ShareInfo() {
                this.share_id = 0;
                this.share_img = "";
                this.share_path = "";
                this.share_title = "";
            }
            ShareInfo.prototype.init = function(data) {
                this.share_id = parseInt(data.share_id);
                this.share_img = data.share_img;
                if (data.share_path != null) {
                    var path = data.share_path;
                    var arr = path.split("?");
                    if (arr.length > 1) {
                        this.share_path = arr[1];
                    } else {
                        this.share_path = data.share_path;
                    }
                }
                this.share_title = data.share_title;
            };
            return ShareInfo;
        }();
        exports.default = ShareInfo;
    }, {} ],
    14: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var SDKBase_1 = require("../SDKBase");
        var BHandler_1 = require("../../utils/BHandler");
        var Bd_helper_1 = require("./Bd_helper");
        var DispatcherMrg_1 = require("../../manager/DispatcherMrg");
        var SDKManager_1 = require("../../manager/SDKManager");
        var APIManager_1 = require("../../manager/APIManager");
        var Bd = function(_super) {
            __extends(Bd, _super);
            function Bd() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.SDKVersion = "v1.0.0";
                _this.swanid = null;
                _this.bOpenDebug = false;
                _this.recommendationButton = null;
                _this.bannerState = -1;
                return _this;
            }
            Bd.prototype.init = function(hClass) {
                var _this = this;
                if (hClass === void 0) {
                    hClass = null;
                }
                console.log("Bd Version:" + this.SDKVersion);
                if (hClass) {
                    this._helper = new hClass();
                } else {
                    this._helper = new Bd_helper_1.default();
                }
                try {
                    this.base = window["swan"];
                } catch (err) {
                    console.error("this.init Erro" + err.message);
                    return;
                }
                if (this.base) {
                    this.openDataContext = this.base.getOpenDataContext();
                    this.base.onHide(function() {
                        _this.onHide();
                    });
                    this.base.onShow(function(res) {
                        _this.onShow(res);
                    });
                    this.base.onError(function(res) {
                        _this.onError(res);
                    });
                    var manager = this.base.getUpdateManager();
                    manager.onCheckForUpdate(function(res) {
                        _this.onCheckUpdate(res.hasUpdate);
                    });
                    manager.onUpdateReady(function() {
                        _this.onReady();
                    });
                    this.onInitRecord();
                }
                this._helper.onInit();
            };
            Bd.prototype.onInitRecord = function() {
                var _this = this;
                if (!this.base || !this.base.getVideoRecorderManager) {
                    return;
                }
                this.videoRecorderManager = this.base.getVideoRecorderManager();
                if (this.videoRecorderManager) {
                    this.videoRecorderManager.onStart(function() {
                        console.log("å½•åˆ¶å¼€å§‹");
                        DispatcherMrg_1.default.ins.eventTo(Bd.Event_RecordStart);
                    });
                    this.videoRecorderManager.onPause(function() {
                        console.log("å½•åˆ¶æš‚åœ");
                        DispatcherMrg_1.default.ins.eventTo(Bd.Event_RecordPause);
                    });
                    this.videoRecorderManager.onResume(function() {
                        DispatcherMrg_1.default.ins.eventTo(Bd.Event_RecordResume);
                    });
                    this.videoRecorderManager.onStop(function(res) {
                        console.log("å½•åˆ¶åœæ­¢", res.videoPath);
                        DispatcherMrg_1.default.ins.eventTo(Bd.Event_RecordStop, res.videoPath);
                    });
                    this.videoRecorderManager.onError(function(res) {
                        _this.showModal("å½•åˆ¶é”™è¯¯", res.errMsg);
                        DispatcherMrg_1.default.ins.eventTo(Bd.Event_RecordErro, res.errMsg);
                    });
                }
            };
            Bd.prototype.login = function(hand) {
                var _this = this;
                if (!this.base) {
                    if (hand) {
                        hand.run();
                    }
                    return;
                }
                var res = this.base.getLaunchOptionsSync();
                if (res && res.query && res.query.channel) {
                    SDKManager_1.default.inst.sChannel = res.query.channel;
                    SDKManager_1.default.inst.sdk.setStorage("Stroage_Channel", SDKManager_1.default.inst.sChannel, false);
                } else {
                    SDKManager_1.default.inst.sChannel = SDKManager_1.default.inst.sdk.getStorage("Stroage_Channel", "own", false);
                }
                this.base.login({
                    success: function(res) {
                        console.log("ç™»é™†æˆåŠŸ res =>", res);
                        _this.loginData = res;
                        SDKManager_1.default.inst.code = res.code;
                        _this._helper.onLogin(res, hand, SDKManager_1.default.inst.sChannel, _this.getFappID());
                    },
                    fail: function(err) {
                        SDKManager_1.default.inst.sdk.showModal2({
                            title: "ç™»å½•å¤±è´¥",
                            content: "æ˜¯å¦é‡æ–°ç™»å½•ï¼Ÿ",
                            cancelText: "é€€å‡ºæ¸¸æˆ",
                            success: function(res) {
                                if (res.confirm) {
                                    _this.login(hand);
                                } else if (res.cancel) {
                                    _this.exit();
                                }
                            }
                        });
                        _this._loginState = -1;
                    }
                });
            };
            Bd.prototype.getUserInfo = function(hand) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                this.base.getUserInfo({
                    success: function(res) {
                        console.log("èŽ·å–æˆåŠŸ", res);
                        _this._helper.onGetUserInfo(res);
                    },
                    fail: function(res) {
                        console.log("èŽ·å–å¤±è´¥", res);
                    }
                });
            };
            Bd.prototype.navigateToMiniProgram = function(sAppId, app, hand, spath, oExtraData, sEnvVersion) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                if (spath === void 0) {
                    spath = "";
                }
                if (oExtraData === void 0) {
                    oExtraData = null;
                }
                if (sEnvVersion === void 0) {
                    sEnvVersion = "release";
                }
                if (!this.base) {
                    return;
                }
                this.base.navigateToMiniProgram({
                    appId: sAppId,
                    extraData: oExtraData,
                    path: spath,
                    success: function(res) {
                        _this._helper.openClick(app, true);
                        console.log("APPæ‹‰èµ·æˆåŠŸ", res);
                        if (hand) {
                            hand.runWith([ true ]);
                        }
                    },
                    fail: function(res) {
                        _this._helper.openClick(app, false);
                        console.log("APPæ‹‰èµ·å¤±è´¥", res);
                        if (hand) {
                            hand.runWith([ false ]);
                        }
                    }
                });
            };
            Bd.prototype.navigateBackSmartProgram = function(extraData) {
                if (extraData === void 0) {
                    extraData = {};
                }
                this.base.navigateBackSmartProgram({
                    extraData: extraData,
                    success: function(res) {
                        console.log("è¿”å›žåˆ°ä¸Šä¸€ä¸ªå°ç¨‹åºæˆåŠŸ res->", res);
                    }
                });
            };
            Bd.prototype.applyUpdate = function() {
                var manager = this.base.getUpdateManager();
                if (manager) {
                    manager.applyUpdate();
                }
            };
            Bd.prototype.getStorage = function(sKey, defVal, toServer, hand) {
                if (defVal === void 0) {
                    defVal = null;
                }
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (!this.base) {
                    if (hand) {
                        hand.runWith([ 1, null ]);
                    }
                    return;
                }
                var datas = null;
                try {
                    datas = this.base.getStorageSync(sKey);
                } catch (e) {
                    console.error("èŽ·å–æœ¬åœ°å­˜å‚¨å¼‚å¸¸ ->", e);
                }
                if (!datas || datas === "NaN") {
                    datas = defVal;
                    if (toServer) {
                        APIManager_1.default.inst.api.report(BHandler_1.default.create(this, function(data) {
                            if (hand) {
                                hand.runWith([ data ]);
                            }
                        }), sKey, null);
                        return datas;
                    }
                }
                if (hand) {
                    hand.runWith([ {
                        skye: datas
                    } ]);
                }
                return datas;
            };
            Bd.prototype.setStorage = function(skey, value, toServer, hand) {
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (!this.base) {
                    return;
                }
                var str = typeof value;
                if (str == "boolean") {
                    value = value ? 1 : 0;
                }
                try {
                    this.base.setStorageSync(skey, value);
                } catch (e) {
                    console.error("ä¿å­˜æœ¬åœ°å­˜å‚¨ å¼‚å¸¸ e ->", e);
                }
                if (toServer) {
                    var save = value;
                    if (str != "boolean" && str != "string" && str != "number") {
                        save = JSON.stringify(value);
                    }
                    APIManager_1.default.inst.api.report(hand, skey, save);
                }
            };
            Bd.prototype.clearStorage = function() {
                if (this.base) {
                    this.base.clearStorageSync();
                }
            };
            Bd.prototype.removeStorageSync = function(sKey) {
                if (this.base) {
                    this.base.removeStorageSync(sKey);
                }
            };
            Bd.prototype.vibrateShort = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
                if (this.base && this.canVibrate) {
                    this.base.vibrateShort(obj);
                }
            };
            Bd.prototype.vibrateLong = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
                if (this.base && this.canVibrate) {
                    this.base.vibrateLong(obj);
                }
            };
            Bd.prototype.setClipboardData = function(sCode) {
                if (!this.base) {
                    return;
                }
                this.base.setClipboardData({
                    data: sCode
                });
            };
            Bd.prototype.getSystemInfo = function(resHandler, difSysOfy, stageWidth, stageHeight) {
                var _this = this;
                if (difSysOfy === void 0) {
                    difSysOfy = 95;
                }
                if (stageWidth === void 0) {
                    stageWidth = 750;
                }
                if (stageHeight === void 0) {
                    stageHeight = 1334;
                }
                if (!this.base) {
                    this.screenratio = stageHeight / stageWidth;
                    if (this.screenratio >= 2.06) {
                        this.sysOfy = difSysOfy;
                    }
                    if (resHandler) {
                        resHandler.run();
                    }
                    return;
                }
                this.base.getSystemInfo({
                    success: function(res) {
                        console.log("Bd getSystemInfo - > æˆåŠŸ ", res);
                        _this.phoneInfo = res;
                        _this.screenratio = Number(res.windowHeight) / Number(res.windowWidth);
                        if (_this.screenratio >= 2.06) {
                            _this.sysOfy = difSysOfy;
                        }
                        _this._helper.onGetSystemInfo(res);
                    },
                    fail: function(failData) {
                        console.log("getSystemInfo - > å¤±è´¥ ", failData);
                    },
                    complete: function(completeData) {
                        if (resHandler != null) {
                            resHandler.run();
                        }
                    }
                });
            };
            Bd.prototype.requestPolymerPayment = function(sDealId, sAppKey, sTotalAmount, sTpOrderId, sDealTitle, sRsaSign, sBizInfo, bannedChannels) {
                var _this = this;
                if (bannedChannels === void 0) {
                    bannedChannels = [ "BDWallet" ];
                }
                this.base.requestPolymerPayment({
                    orderInfo: {
                        dealId: sDealId,
                        appKey: sAppKey,
                        totalAmount: sTotalAmount,
                        tpOrderId: sTpOrderId,
                        dealTitle: sDealTitle,
                        rsaSign: sRsaSign,
                        signFieldsRange: 1,
                        bizInfo: sBizInfo
                    },
                    bannedChannels: bannedChannels,
                    success: function(res) {
                        _this.base.showToast({
                            title: "æ”¯ä»˜æˆåŠŸ",
                            icon: "success"
                        });
                    },
                    fail: function(err) {
                        _this.base.showToast({
                            title: JSON.stringify(err)
                        });
                        console.log("pay fail", err);
                    }
                });
            };
            Bd.prototype.getPhonePlane = function() {
                if (!this.base) return 3;
                if (this.phoneInfo.platform.indexOf("ios") > -1 || this.phoneInfo.platform.indexOf("IOS") > -1) {
                    return 2;
                }
                if (this.phoneInfo.platform.indexOf("devtools") > -1) {
                    return 4;
                }
                return 1;
            };
            Bd.prototype.platform = function() {
                if (!this.base) {
                    return "web";
                }
                return this.phoneInfo.platform;
            };
            Bd.prototype.setKeepScreenOn = function(bKeepScreenOn) {
                if (bKeepScreenOn === void 0) {
                    bKeepScreenOn = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.setKeepScreenOn({
                    keepScreenOn: bKeepScreenOn,
                    success: function() {
                        console.log("è®¾ç½®å¸¸äº®æˆåŠŸ WX -> setKeepScreenOn ");
                    }
                });
            };
            Bd.prototype.previewImage = function(url, pro, hand) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                var arr = new Array();
                arr.push(this._helper.getUrl(url));
                this.base.previewImage({
                    urls: arr,
                    success: function() {
                        _this._helper.onPreviewComp(url, pro, true);
                        if (hand) {
                            hand.runWith([ true, pro ]);
                        }
                    },
                    fail: function() {
                        _this._helper.onPreviewComp(url, pro, false);
                        if (hand) {
                            hand.runWith([ false, pro ]);
                        }
                    }
                });
            };
            Bd.prototype.getSwanId = function() {
                var _this = this;
                this.base.getSwanId({
                    success: function(res) {
                        _this.swanid = res.data.swanid;
                        console.log("èŽ·å– swanid -> ", res.data.swanid);
                    }
                });
            };
            Bd.prototype.shareAppMessageByClient = function(obj, hand) {
                if (!this.base) {
                    return;
                }
                if (this._shareHand && this._shareHand.once) {
                    this._shareHand.recover();
                }
                this._shareHand = hand;
                this._helper.onShare(obj);
                this.base.shareAppMessage(obj);
            };
            Bd.prototype.shareAppMessage = function(hand, queryData) {
                if (hand === void 0) {
                    hand = null;
                }
                if (queryData === void 0) {
                    queryData = null;
                }
                var tempQuery = queryData;
                if (!queryData) {
                    tempQuery = {};
                }
                var shareObj = {};
                shareObj["imageUrl"] = "" + this._helper.DefShareImgString;
                shareObj["title"] = this._helper.DefShareTitle + "";
                shareObj["query"] = this.objToString(tempQuery);
                this.shareAppMessageByClient(shareObj, hand);
            };
            Bd.prototype.objToString = function(obj) {
                var str = "";
                for (var i in obj) {
                    str += i + "=" + obj[i] + "&";
                }
                str = str.slice(0, str.length - 1);
                return str;
            };
            Bd.prototype.onHide = function() {
                console.log("onGameHide");
                this._helper.onHide();
                // DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_Hide);
            };
            Bd.prototype.onShow = function(res) {
                console.log("onShow ->", res);
                this._helper.onShow(res);
                // DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_Show, res);
            };
            Bd.prototype.onError = function(res) {
                var str = "";
                if (this.phoneInfo) {
                    str += "brand=" + this.phoneInfo.brand + "\n";
                    str += "model=" + this.phoneInfo.model + "\n";
                    str += "language=" + this.phoneInfo.language + "\n";
                    str += "version=" + this.phoneInfo.version + "\n";
                    str += "system=" + this.phoneInfo.system + "\n";
                    str += "platform=" + this.phoneInfo.platform + "\n";
                    str += "SDKVersion=" + this.phoneInfo.SDKVersion + "\n";
                    str += "benchmarkLevel=" + this.phoneInfo.benchmarkLevel + "\n";
                    str += "language=" + this.phoneInfo.language + "\n";
                    str += "screenWidth=" + this.phoneInfo.screenWidth + "\n";
                    str += "screenHeight=" + this.phoneInfo.screenHeight + "\n";
                    str += "pixelRatio=" + this.phoneInfo.pixelRatio + "\n";
                }
                str += "message=" + res.message + "\n";
                str += "stack=" + res.stack;
                if (str == "") {
                    str = "æœ‰æŠ¥é”™ï¼Œä½†æ˜¯æ²¡æœ‰æ”¶é›†åˆ°æ•°æ®";
                }
                console.error("catchErro:" + str);
                this._helper.onError(res, str);
            };
            Bd.prototype.shareMenu = function(withShareTicket) {
                var _this = this;
                if (withShareTicket === void 0) {
                    withShareTicket = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.showShareMenu({
                    success: function(successData) {
                        _this._helper.onInitShareMeun(BHandler_1.default.create(_this, function() {
                            _this.onShareAppMessage(withShareTicket);
                        }));
                    },
                    fail: function(failData) {},
                    complete: function(completeData) {}
                });
            };
            Bd.prototype.onShareAppMessage = function(withShareTicket) {
                var _this = this;
                if (!this.base) {
                    return;
                }
                this.base.onShareAppMessage(function() {
                    return {
                        title: _this._helper.DefShareTitle,
                        imageUrl: _this._helper.DefShareImgString,
                        query: _this.objToString(_this._helper.DefSharePathData),
                        success: function() {
                            console.log("å³ä¸Šè§’åˆ†äº« æˆåŠŸ");
                        },
                        fail: function() {
                            console.error("å³ä¸Šè§’åˆ†äº« å¤±è´¥");
                        },
                        complete: function() {
                            console.log("å³ä¸Šè§’åˆ†äº«ç»“æŸ å›žè°ƒ");
                        }
                    };
                });
            };
            Bd.prototype.showModal2 = function(params) {
                if (!this.base) return;
                this.base.showModal(params);
            };
            Bd.prototype.showToast = function(sTitle, iDuration, bMask, sIcon) {
                if (iDuration === void 0) {
                    iDuration = 1e3;
                }
                if (bMask === void 0) {
                    bMask = false;
                }
                if (sIcon === void 0) {
                    sIcon = "none";
                }
                if (!this.base) {
                    console.log("WXToast:" + sTitle);
                    this._helper.showToastByWeb(sTitle, iDuration, bMask, sIcon);
                    return;
                }
                this.base.showToast({
                    title: sTitle,
                    icon: sIcon,
                    duration: iDuration,
                    mask: bMask
                });
            };
            Bd.prototype.showLoading = function(sTitle, bMask) {
                if (sTitle === void 0) {
                    sTitle = "è¯·ç¨åŽ";
                }
                if (bMask === void 0) {
                    bMask = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.showLoading({
                    title: sTitle,
                    mask: bMask
                });
            };
            Bd.prototype.hideLoading = function(params) {
                if (params === void 0) {
                    params = null;
                }
                if (!this.base) return;
                !params && (params = {});
                this.base.hideLoading(params);
            };
            Bd.prototype.reportAnalytics = function(sKey, params) {
                if (params === void 0) {
                    params = {};
                }
                if (!this.base) return;
                this.base.reportAnalytics(sKey, params);
            };
            Bd.prototype.onCheckUpdate = function(b) {
                this._helper.onUpdate(b);
            };
            Bd.prototype.onReady = function() {
                this._helper.onReady();
            };
            Bd.prototype.setEnableDebug = function() {
                if (!this.base) return;
                this.base.setEnableDebug({
                    enableDebug: this.bOpenDebug
                });
            };
            Object.defineProperty(Bd.prototype, "helper", {
                get: function() {
                    return this._helper;
                },
                enumerable: true,
                configurable: true
            });
            Bd.prototype.loadSubPackage = function() {
                if (!this.base) return;
                this.base.loadSubPackage({
                    root: "subpackage",
                    success: function(res) {
                        console.log("ä¸‹è½½æˆåŠŸ", res);
                    },
                    fail: function(err) {
                        console.log("ä¸‹è½½å¤±è´¥", err);
                    }
                });
            };
            Bd.prototype.exit = function() {
                if (!this.base) {
                    return;
                }
                this.base.exit({});
            };
            Bd.prototype.getPerformance = function() {
                if (!this.base) return;
                var performance = this.base.getPerformance();
                var start = performance.now();
                setTimeout(function() {
                    var end = performance.now();
                    console.log(end - start);
                }, 1e3);
            };
            Bd.prototype.triggerGC = function() {
                if (!this.base) return;
                this.base.triggerGC();
            };
            Bd.prototype.onNetworkStatusChange = function() {
                if (!this.base) return;
                this.base.onNetworkStatusChange(function(res) {
                    console.log("ç½‘ç»œåˆ‡æ¢ç»“æžœ", JSON.stringify(res));
                });
            };
            Bd.prototype.openCustomerServiceConversation = function(params) {
                if (params === void 0) {
                    params = null;
                }
                if (!this.base) return;
                this.base.openCustomerServiceConversation(params);
            };
            Bd.prototype.isLoginSync = function() {
                if (!this.base) return;
                try {
                    var result = this.base.isLoginSync();
                    console.log("isLoginSync", result.isLogin);
                } catch (e) {
                    console.log("error", e);
                }
            };
            Bd.prototype.canShowBanner = function() {
                if (this.base == null) {
                    return -1;
                }
                if (this._helper.Banner_adunit == "") {
                    console.log("Warning Banner å¹¿å‘Šè¢«è°ƒç”¨äº†ï¼Œ ä½†æ˜¯å¹¶æ²¡æœ‰è®¾ç½® å•å…ƒIDã€‚è¯·å‰å¾€ WX_Helper.as è®¾ç½® Banner_adunit");
                    return 3;
                }
                return 0;
            };
            Bd.prototype.showBanner = function(delay, hand, iWidth) {
                var _this = this;
                if (delay === void 0) {
                    delay = 0;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (iWidth === void 0) {
                    iWidth = -1;
                }
                var rev = this.canShowBanner();
                if (rev != 0) {
                    if (hand) {
                        hand.run();
                    }
                    return rev;
                }
                if (iWidth == -1) {
                    iWidth = this.Banner_Def_Width == 0 ? this.phoneInfo.windowWidth / 5 * 3 : this.Banner_Def_Width;
                }
                if (this.bannerAd) {
                    if (this.bannerAd.style) {
                        this.bannerAd.style.width = iWidth;
                    }
                    this.onShowBannerAD(hand, delay);
                    return 0;
                }
                this.bannerAd = this.base.createBannerAd(this._helper.getBannerObj(iWidth));
                this.bannerAd.onResize(this.onResize);
                this.bannerAd.onError(function(res) {
                    console.log("Bannerå‡ºçŽ°é”™è¯¯:" + res.errCode + ": " + res.errMsg);
                    _this.bannerState = -1;
                    _this.bannerAd.destroy();
                    _this.bannerAd = null;
                });
                this.bannerState = 1;
                this.bannerAd.onLoad(function() {
                    console.log("å¹¿å‘ŠåŠ è½½å®Œæˆ");
                    _this.bannerState = 2;
                    _this.onShowBannerAD(hand, delay);
                });
                return rev;
            };
            Bd.prototype.onResize = function() {
                if (this.bannerAd) {
                    this._helper.bannerResize(this.bannerAd);
                    DispatcherMrg_1.default.ins.eventTo("Banner_OnResize", this.bannerAd);
                }
            };
            Bd.prototype.onShowBannerAD = function(hand, delay) {
                var _this = this;
                this.bannerShowing = true;
                if (delay > 0) {
                    setTimeout(function() {
                        if (_this.bannerAd && _this.bannerShowing && _this.bannerState == 2) {
                            _this.bannerAd.show();
                            _this.onResize();
                            if (hand) {
                                hand.run();
                            }
                        }
                    }, delay);
                } else {
                    if (this.bannerAd && this.bannerShowing && this.bannerState == 2) {
                        this.bannerAd.show();
                        this.onResize();
                        if (hand) {
                            hand.run();
                        }
                    }
                }
            };
            Bd.prototype.hideBannder = function(bDestroy) {
                if (bDestroy === void 0) {
                    bDestroy = true;
                }
                if (this.bannerAd) {
                    if (bDestroy) {
                        this.bannerAd.destroy();
                        this.bannerAd = null;
                    } else {
                        this.bannerAd.hide();
                    }
                }
                this.bannerShowing = false;
            };
            Bd.prototype.initVideoAD = function() {
                var _this = this;
                var t = this;
                if (!t.canPlayVideo()) {
                    return false;
                }
                if (!t.RewardedVideo) {
                    t.RewardedVideo = t.base.createRewardedVideoAd(t._helper.getVideoObj());
                    t.RewardedVideo.onLoad(function() {
                        console.log("RewardedVideo è§†é¢‘å¹¿å‘ŠåŠ è½½å®Œæˆ");
                        if (t._videoState == 2) {
                            t._videoState = 1;
                            t.RewardedVideo.show();
                            return;
                        }
                        t._videoState = 0;
                    });
                    t.RewardedVideo.onClose(function(res) {
                        t.onVideoClose(res);
                    });
                    t.RewardedVideo.onError(function(msg) {
                        t._videoState = -1;
                        var desc = "1002:è§†é¢‘æ’­æ”¾æ¬¡æ•°å·²è¾¾ä¸Šé™";
                        if (msg.errCode != 1002) {
                            desc = msg.errCode + ":" + msg.errMsg;
                        }
                        _this.showModal("è§†é¢‘æ’­æ”¾å¤±è´¥", desc, BHandler_1.default.create(t, function() {
                            if (t._videoCallBack) {
                                t._videoCallBack.runWith(false);
                                t._videoCallBack = null;
                            }
                        }));
                    });
                }
                if (t.RewardedVideo) {
                    t._videoState = 2;
                    t.RewardedVideo.load();
                }
                return true;
            };
            Bd.prototype.showVideoAd = function(compHand) {
                var t = this;
                if (!t.base || this._videoState == 1) {
                    return -1;
                }
                var res = this.canPlayVideo();
                if (!res) {
                    return 1;
                }
                if (!t.RewardedVideo) {
                    t.initVideoAD();
                }
                t._videoCallBack = compHand;
                if (t._videoState == 0) {
                    t._videoState = 1;
                    console.log("showVideoAd  å¼€å§‹æ˜¾ç¤º");
                    t.RewardedVideo.show();
                }
                return 0;
            };
            Bd.prototype.onVideoClose = function(res) {
                this._videoState = -1;
                var b = false;
                if (res && res.isEnded || res === undefined) {
                    this._helper.VideoHasPlayCount += 1;
                    b = true;
                }
                console.log("è§†é¢‘è¢«å…³é—­ å·²ç»çœ‹å®Œï¼š" + this._helper.VideoHasPlayCount + "æ¬¡");
                this._helper.onVideoClose(b);
                if (this._videoCallBack) {
                    this._videoCallBack.runWith(b);
                }
            };
            Bd.prototype.recommendation = function() {
                var _this = this;
                if (!this.base || !this.base.createRecommendationButton) {
                    console.log("äº¤å‰æŽ¨èåŠŸèƒ½ä¸æ”¯æŒã€‚");
                    return;
                }
                this.recommendationButton = this.base.createRecommendationButton({
                    type: "list"
                });
                console.log("åˆ›å»ºäº¤å‰æŽ¨èå®Œæˆ");
                this.recommendationButton.onLoad(function() {
                    console.log("äº¤å‰æŽ¨èå¹¿å‘ŠåŠ è½½å®Œæˆ");
                    _this.recommendationButton.show();
                    _this.recommendationButton.offLoad(function() {});
                });
                this.recommendationButton.onError(function(e) {
                    console.error("äº¤å‰æŽ¨èåŠ è½½é”™è¯¯" + e);
                });
                this.recommendationButton.load();
            };
            Bd.prototype.recommendationShow = function(nX, nY) {
                if (!this.recommendationButton) {
                    this.recommendation();
                }
                if (this.recommendationButton) {
                    if (nX >= 0) {
                        this.recommendationButton.style.left = nX;
                        this.recommendationButton.style.top = nY;
                    }
                    this.recommendationButton.show();
                }
            };
            Bd.prototype.recommendationHide = function() {
                if (!this.recommendationButton) {
                    return;
                }
                this.recommendationButton.hide();
            };
            Bd.prototype.postMsg = function(msg) {
                if (this.openDataContext) {
                    this.openDataContext.postMessage(msg);
                }
            };
            Bd.prototype.openViewSize = function(iWidth, iHeight) {
                if (this.openDataContext && this.openDataContext.canvas) {
                    this.openDataContext.canvas.width = iWidth;
                    this.openDataContext.canvas.height = iHeight;
                }
            };
            Bd.prototype.canPlayVideo = function() {
                return this._helper.Video_adunit != "";
            };
            Bd.prototype.recorder_Start = function(nDuration, bMicrophone) {
                if (nDuration === void 0) {
                    nDuration = 10;
                }
                if (bMicrophone === void 0) {
                    bMicrophone = false;
                }
                if (this.videoRecorderManager) {
                    this.videoRecorderManager.start({
                        duration: nDuration,
                        microphoneEnabled: bMicrophone
                    });
                } else {
                    console.log("æ­¤è®¾å¤‡ä¸æ”¯æŒå½•åˆ¶ã€‚");
                    DispatcherMrg_1.default.ins.eventTo(Bd.Event_RecordErro, "è®¾å¤‡ä¸æ”¯æŒå½•åˆ¶åŠŸèƒ½");
                }
            };
            Bd.prototype.recorder_Stop = function() {
                if (this.videoRecorderManager) {
                    this.videoRecorderManager.stop();
                }
            };
            Bd.prototype.recorder_resume = function() {
                if (this.videoRecorderManager) {
                    this.videoRecorderManager.resume();
                }
            };
            Bd.prototype.recorder_pause = function() {
                if (this.videoRecorderManager) {
                    this.videoRecorderManager.pause();
                }
            };
            Bd.prototype.saveFile = function(tempFile, hand) {
                if (!this.base) {
                    return;
                }
                var fileSystemManager = this.base.getFileSystemManager();
                if (fileSystemManager) {
                    fileSystemManager.saveFile({
                        tempFilePath: tempFile,
                        success: function(res) {
                            console.log("æ–‡ä»¶ä¿å­˜å®Œæˆ", res.savedFilePath);
                            if (hand) {
                                hand.runWith([ res.savedFilePath ]);
                            }
                        },
                        fail: function(res) {
                            console.log("æ–‡ä»¶ä¿å­˜å¤±è´¥", res.errMsg);
                            if (hand) {
                                hand.runWith([ res.errMsg ]);
                            }
                        }
                    });
                }
            };
            Bd.prototype.shareVideo = function(vPath, sTitle, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                if (!this.base || !this.base.shareVideo) {
                    this.showToast("ç‰ˆæœ¬è¿‡ä½Žï¼Œä¸æŒæŒè§†é¢‘åˆ†äº«");
                    if (hand && hand.once) {
                        hand.recover();
                    }
                    return;
                }
                this.base.shareVideo({
                    videoPath: vPath,
                    title: sTitle,
                    success: function() {
                        console.log("åˆ†äº«å®Œæˆ");
                        if (hand) {
                            hand.runWith([ true ]);
                        }
                    },
                    fail: function() {
                        console.log("åˆ†äº«å¤±è´¥");
                        if (hand) {
                            hand.runWith([ false ]);
                        }
                    }
                });
            };
            Bd.Event_RecordStart = "Event_BD_RecordStart";
            Bd.Event_RecordPause = "Event_BD_RecordPause";
            Bd.Event_RecordResume = "Event_BD_RecordResume";
            Bd.Event_RecordStop = "Event_BD_RecordStop";
            Bd.Event_RecordErro = "Event_BD_RecordErro";
            return Bd;
        }(SDKBase_1.default);
        exports.default = Bd;
    }, {
        "../../manager/APIManager": 5,
        "../../manager/DispatcherMrg": 6,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23,
        "../SDKBase": 12,
        "./Bd_helper": 15
    } ],
    15: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var APIManager_1 = require("../../manager/APIManager");
        var Bd_1 = require("./Bd");
        var BHandler_1 = require("../../utils/BHandler");
        var SDKManager_1 = require("../../manager/SDKManager");
        var Bd_helper = function() {
            function Bd_helper() {
                this.version = "v1.0.0";
                this.DefShareTitle = "";
                this.DefShareImgString = "";
                this.DefSharePathData = {};
                this.VideoMaxPlayCount = 8;
                this.VideoHasPlayCount = 0;
                this.Video_adunit = "";
                this.Banner_adunit = "";
                this.Banner_appSid = "";
                console.log("Bd helper Version:" + this.version);
            }
            Bd_helper.prototype.onInit = function() {};
            Bd_helper.prototype.onHide = function() {};
            Bd_helper.prototype.onShow = function(res) {};
            Bd_helper.prototype.onError = function(res, msg) {
                APIManager_1.default.inst.api.uploadError(1e3, msg, null);
            };
            Bd_helper.prototype.onInitShareMeun = function(hand) {
                if (hand) {
                    hand.run();
                }
            };
            Bd_helper.prototype.onShare = function(pro) {
                APIManager_1.default.inst.api.stat("share");
            };
            Bd_helper.prototype.getUrl = function(url) {
                return url;
            };
            Bd_helper.prototype.onGetSystemInfo = function(res) {
                console.log("Bd_helper SystemInfo ->", res);
            };
            Bd_helper.prototype.openClick = function(pro, scc) {
                APIManager_1.default.inst.api.openClick(pro, 0, scc);
            };
            Bd_helper.prototype.onPreviewComp = function(url, pro, scc) {
                APIManager_1.default.inst.api.openClick(pro, 1, scc);
            };
            Bd_helper.prototype.showToastByWeb = function(sTitle, iDuration, bMask, sIcon) {
                if (iDuration === void 0) {
                    iDuration = 1e3;
                }
                if (bMask === void 0) {
                    bMask = false;
                }
                if (sIcon === void 0) {
                    sIcon = "none";
                }
                console.log(sTitle);
            };
            Bd_helper.prototype.buildShareMenuObject = function() {
                return {
                    imageUrl: this.DefShareImgString,
                    title: this.DefShareTitle
                };
            };
            Bd_helper.prototype.onLogin = function(res, hand, sChannel, fAppid) {
                APIManager_1.default.inst.api.login(res.code, sChannel, BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        if (hand) {
                            hand.run();
                        }
                    } else {
                        SDKManager_1.default.inst.sdk.showModal("æç¤º", "ç™»å½•å¤±è´¥,æœåŠ¡å™¨é”™è¯¯", BHandler_1.default.create(Bd_1.default, SDKManager_1.default.inst.sdk.exit));
                    }
                }), fAppid);
            };
            Bd_helper.prototype.onUpdate = function(hasUpdate) {
                console.log("Update:" + hasUpdate);
            };
            Bd_helper.prototype.onReady = function() {
                SDKManager_1.default.inst.sdk.showModal2({
                    title: "æ›´æ–°æç¤º",
                    content: "æ–°ç‰ˆæœ¬å·²ç»å‡†å¤‡å¥½ï¼Œæ˜¯å¦é‡å¯åº”ç”¨ï¼Ÿ",
                    success: function(res) {
                        if (res.confirm) {
                            SDKManager_1.default.inst.sdk.applyUpdate();
                        } else {
                            SDKManager_1.default.inst.sdk.exit();
                        }
                    }
                });
            };
            Bd_helper.prototype.getBannerObj = function(iWidth) {
                var obj = {};
                obj["adUnitId"] = this.Banner_adunit;
                obj["appSid"] = this.Banner_appSid;
                obj["style"] = {
                    left: 0,
                    top: 0,
                    width: iWidth
                };
                return obj;
            };
            Bd_helper.prototype.getVideoObj = function() {
                return {
                    adUnitId: this.Video_adunit,
                    appSid: this.Banner_appSid
                };
            };
            Bd_helper.prototype.bannerResize = function(ad) {
                console.log("Banner ç»„ä»¶å°ºå¯¸æ”¹å˜:", ad, SDKManager_1.default.inst.phoneInfo);
                ad.style.left = SDKManager_1.default.inst.phoneInfo.windowWidth / 2 - ad.style.realWidth / 2;
                ad.style.top = SDKManager_1.default.inst.phoneInfo.windowHeight - ad.style.height;
            };
            Bd_helper.prototype.onVideoClose = function(isComp) {
                if (isComp) {
                    APIManager_1.default.inst.api.stat("video");
                }
            };
            Bd_helper.prototype.onGetUserInfo = function(info, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                if (!info) {
                    return;
                }
                APIManager_1.default.inst.api.setUserData(info.data, info.iv, hand);
            };
            return Bd_helper;
        }();
        exports.default = Bd_helper;
    }, {
        "../../manager/APIManager": 5,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23,
        "./Bd": 14
    } ],
    16: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var APIBase_1 = require("../APIBase");
        var BHandler_1 = require("../../utils/BHandler");
        var Http_1 = require("../Http");
        var RecomInfo_1 = require("../RecomInfo");
        var SDKManager_1 = require("../../manager/SDKManager");
        var APIManager_1 = require("../../manager/APIManager");
        var BJApi = function(_super) {
            __extends(BJApi, _super);
            function BJApi() {
                return _super.call(this) || this;
            }
            BJApi.prototype.login = function(sCode, sChannel, hand, sFappid) {
                var _this = this;
                if (sChannel === void 0) {
                    sChannel = "";
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sFappid === void 0) {
                    sFappid = null;
                }
                if (!sChannel) {
                    sChannel = "own";
                }
                var pro = {
                    flg: this.flag,
                    code: sCode,
                    channel: sChannel
                };
                if (sFappid) {
                    pro["fappid"] = sFappid;
                }
                this.sendPro(pro, "auth", BHandler_1.default.create(BJApi, function(data) {
                    if (data && data.status == 1) {
                        _this.token = data.result.token;
                        SDKManager_1.default.inst.session_key = encodeURIComponent(data.result.session_key);
                        SDKManager_1.default.inst.openID = encodeURIComponent(data.result.openid);
                        APIManager_1.default.inst.api.daily();
                        if (SDKManager_1.default.inst.sdk.isUploadInviteInfo && SDKManager_1.default.inst.sdk.inviteId != "") {
                            APIManager_1.default.inst.api.invite(SDKManager_1.default.inst.sdk.inviteId, BHandler_1.default.create(_this, function(data) {
                                console.log("data.status=====>" + data.status + "data.msg=====>" + data.msg);
                            }));
                        }
                    }
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            BJApi.prototype.setUserData = function(sData, siv, hand) {
                if (hand === void 0) {
                    hand = null;
                }
            };
            BJApi.prototype.UploadWeekScore = function(score, mapId) {
                if (SDKManager_1.default.inst.userInfo == null) return;
                var userName = SDKManager_1.default.inst.userInfo.userInfo.nickName;
                var userIcon = SDKManager_1.default.inst.userInfo.userInfo.avatarUrl;
                if (userIcon == null || userIcon == "") {
                    console.log("ç”¨æˆ·æœªæŽˆæƒï¼Œå–æ¶ˆä¸ŠæŠ¥å‘¨æ¦œåˆ†æ•°");
                    return;
                }
                var userId = SDKManager_1.default.inst.openID;
                this.sendPro({
                    flg: this.flag,
                    uid: userId,
                    mid: mapId,
                    avatar: userIcon,
                    source: score,
                    nickname: userName
                }, "rank", BHandler_1.default.create(BJApi, function(data) {
                    console.log("ä¸ŠæŠ¥å‘¨æ¦œè¿”å›ž", data);
                }), "post");
            };
            BJApi.prototype.GetWeekScore = function(mapId, hand) {
                var userId = SDKManager_1.default.inst.openID;
                this.sendPro({
                    flg: this.flag,
                    uid: userId,
                    mid: mapId
                }, "getRank", BHandler_1.default.create(BJApi, function(data) {
                    var dataSource = [];
                    if (data && data.status == 1) {
                        console.log("èŽ·å–å‘¨æŽ’è¡Œæ¦œæ•°æ®æˆåŠŸ", data);
                        var rankCount = 0;
                        for (var key in data.result) {
                            rankCount++;
                            var value = data.result[key];
                            if (value == null) continue;
                            var pushData = {
                                id: key,
                                iconUrl: value.avatar,
                                name: value.nickname,
                                score: value.source
                            };
                            dataSource.push(pushData);
                        }
                    } else {
                        console.log("èŽ·å–å‘¨æŽ’è¡Œæ¦œæ•°æ®å¤±è´¥", data);
                    }
                    hand.runWith([ dataSource ]);
                }), "get");
            };
            BJApi.prototype.getMatter = function(hand) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    flg: this.flag
                }, "game/" + this.flag, BHandler_1.default.create(this, function(data) {
                    if (data && data.status == 1) {
                        _this.getAdInfos(data.result, hand);
                    }
                }));
            };
            BJApi.prototype.getAdInfos = function(arr, hand) {
                var dex = 0;
                var reArr = [];
                for (var i = 0; i < arr.length; i++) {
                    this.getadInfo(arr[i].url, BHandler_1.default.create(this, function(item, data) {
                        dex++;
                        if (!data || data.status != 1) {
                            return;
                        }
                        for (var j = 0; j < data.result.length; j++) {
                            var info = new RecomInfo_1.default();
                            info.initBj(data.result[j], item);
                            reArr.push(info);
                        }
                        if (dex >= arr.length) {
                            hand.runWith([ reArr ]);
                        }
                    }, [ arr[i] ]));
                }
            };
            BJApi.prototype.getadInfo = function(sUrl, hand) {
                var req = new Http_1.default();
                req.send(sUrl + "&uid=" + SDKManager_1.default.inst.openID, null, hand);
            };
            BJApi.prototype.daily = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID,
                    channel: SDKManager_1.default.inst.sChannel
                }, "daily", hand);
            };
            BJApi.prototype.stat = function(sLoc, hand, pro) {
                if (hand === void 0) {
                    hand = null;
                }
                if (pro === void 0) {
                    pro = null;
                }
                this.sendPro({
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID,
                    channel: SDKManager_1.default.inst.sChannel,
                    loc: sLoc,
                    sid: pro ? pro.info.share_id : ""
                }, "stat", hand);
            };
            BJApi.prototype.exposure = function(datas, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    gflg: this.flag,
                    uid: SDKManager_1.default.inst.openID,
                    channel: SDKManager_1.default.inst.sChannel,
                    data: datas
                }, "exposure", hand, "post");
            };
            BJApi.prototype.invite = function(origin, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID,
                    origin: origin
                }, "Invite", hand);
            };
            BJApi.prototype.seeInviteNum = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID
                }, "Invite", hand);
            };
            BJApi.prototype.openClick = function(app, type, comp, hand) {
                if (comp === void 0) {
                    comp = true;
                }
                if (hand === void 0) {
                    hand = null;
                }
                var pro = {
                    gflg: this.flag,
                    uid: SDKManager_1.default.inst.openID,
                    channel: SDKManager_1.default.inst.sChannel,
                    ad_id: app.id,
                    location_id: app.location
                };
                if (comp) {
                    pro["status"] = "cb";
                }
                this.sendPro(pro, "reportad", hand);
            };
            BJApi.prototype.report = function(hand, sKey, val) {
                if (hand === void 0) {
                    hand = null;
                }
                if (sKey === void 0) {
                    sKey = "";
                }
                if (val === void 0) {
                    val = null;
                }
                var pro = {
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID
                };
                if (sKey != "") {
                    pro[sKey] = val;
                }
                this.sendPro(pro, "matter/report", BHandler_1.default.create(this, function(data) {
                    if (data && hand) {
                        hand.runWith([ data.result ]);
                    }
                }));
            };
            BJApi.prototype.additional = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    flg: this.flag
                }, "additional", hand);
            };
            BJApi.prototype.getAdState = function(param, hand) {
                this.additional(BHandler_1.default.create(this, function(data) {
                    var rb = true;
                    var rb2 = true;
                    if (data && data.status == 1) {
                        if (data.result && data.result.config && parseInt(data.result.config[param]) == 0) {
                            rb = false;
                        }
                        if (data.result && data.result.config && parseInt(data.result.ad[param]) == 0) {
                            rb2 = false;
                        }
                    }
                    if (hand) {
                        hand.runWith([ rb, rb2 ]);
                    }
                }));
            };
            BJApi.prototype.getPay = function(hand, isFirst) {
                if (isFirst === void 0) {
                    isFirst = false;
                }
                if (isFirst) {
                    this.midasGetBalance(0, hand, 0);
                    return;
                }
                var pro = {
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID
                };
                this.sendPro(pro, "getPay", BHandler_1.default.create(BJApi, function(data) {
                    if (data && data.status == 1) {}
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            BJApi.prototype.midasPay = function(num, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                var pro = {
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID
                };
                pro["zone_id"] = "1";
                pro["pf"] = "android";
                pro["session_key"] = SDKManager_1.default.inst.session_key;
                pro["amt"] = num;
                pro["channel"] = SDKManager_1.default.inst.sChannel;
                this.sendPro(pro, "midasPay", BHandler_1.default.create(BJApi, function(data) {
                    if (data && data.status == 1) {}
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            BJApi.prototype.midasGetBalance = function(money, hand, bState) {
                if (hand === void 0) {
                    hand = null;
                }
                if (bState === void 0) {
                    bState = 1;
                }
                var pro = {
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID
                };
                pro["zone_id"] = "1";
                pro["pf"] = "android";
                pro["session_key"] = SDKManager_1.default.inst.session_key;
                pro["price"] = money;
                pro["channel"] = SDKManager_1.default.inst.sChannel;
                pro["status"] = bState;
                this.sendPro(pro, "midasGetBalance", BHandler_1.default.create(BJApi, function(data) {
                    if (data && data.status == 1) {}
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            BJApi.prototype.eventPost = function(sCode, sKey, val, hand, sExtend) {
                if (sCode === void 0) {
                    sCode = "";
                }
                if (sKey === void 0) {
                    sKey = "";
                }
                if (val === void 0) {
                    val = null;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sExtend === void 0) {
                    sExtend = "";
                }
                SDKManager_1.default.inst.sdk.eventPost(sCode, sKey, val, hand, sExtend);
            };
            BJApi.prototype.sendPro = function(pro, apiName, hand, method, type) {
                if (hand === void 0) {
                    hand = null;
                }
                if (method === void 0) {
                    method = "get";
                }
                if (type === void 0) {
                    type = "json";
                }
                var req = new Http_1.default();
                req.send(this.url + apiName, pro, hand, method, type);
            };
            return BJApi;
        }(APIBase_1.default);
        exports.default = BJApi;
    }, {
        "../../manager/APIManager": 5,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23,
        "../APIBase": 9,
        "../Http": 10,
        "../RecomInfo": 11
    } ],
    17: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var APIBase_1 = require("../APIBase");
        var BHandler_1 = require("../../utils/BHandler");
        var Http_1 = require("../Http");
        var RecomInfo_1 = require("../RecomInfo");
        var SDKManager_1 = require("../../manager/SDKManager");
        var APIManager_1 = require("../../manager/APIManager");
        var GlobalUnit_1 = require("../../../script/common/GlobalUnit");
        var CQApi = function(_super) {
            __extends(CQApi, _super);
            function CQApi() {
                var _this = _super.call(this) || this;
                _this.logCode = "";
                return _this;
            }
            CQApi.prototype.login = function(sCode, sChannel, hand, sFappid) {
                var _this = this;
                if (sChannel === void 0) {
                    sChannel = "";
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sFappid === void 0) {
                    sFappid = null;
                }
                if (!sChannel) {
                    sChannel = "own";
                }
                var pro = {
                    appid: this.flag,
                    code: sCode,
                    channel: sChannel
                };
                if (sFappid) {
                    pro["fappid"] = sFappid;
                }
                this.sendPro(pro, "/api/login", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        _this.logCode = data.log_code;
                        SDKManager_1.default.inst.session_key = encodeURIComponent(data.sessionKey);
                        SDKManager_1.default.inst.openID = encodeURIComponent(data.openid);
                        APIManager_1.default.inst.api.daily();
                        if (SDKManager_1.default.inst.sdk.isUploadInviteInfo && SDKManager_1.default.inst.sdk.inviteId != "") {
                            APIManager_1.default.inst.api.invite(SDKManager_1.default.inst.sdk.inviteId, BHandler_1.default.create(_this, function(data) {
                                console.log("data.status=====>" + data.status + "data.msg=====>" + data.msg);
                            }));
                        }
                        GlobalUnit_1.default.dataManager.saveGift(data.lb);
                    }
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            CQApi.prototype.setUserData = function(sData, siv, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    appid: this.flag,
                    code: this.logCode,
                    iv: siv,
                    enc: sData,
                    sessionKey: SDKManager_1.default.inst.session_key
                }, "/api/auth", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        console.log("ä¸Šä¼ æŽˆæƒç»“æžœ", data);
                    }
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            CQApi.prototype.setUserData_2 = function(sData, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    userInfo: sData
                }, "/api/user/info", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        console.log("ä¸Šä¼ æŽˆæƒç»“æžœ2", data);
                    }
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            CQApi.prototype.UploadWeekScore = function(score, mapId) {
                if (score > 500) return;
                if (SDKManager_1.default.inst.openID == null) return;
                if (score < 0) return;
                if (SDKManager_1.default.inst.userInfo == null) return;
                var userName = SDKManager_1.default.inst.userInfo.userInfo.nickName;
                var userIcon = SDKManager_1.default.inst.userInfo.userInfo.avatarUrl;
                if (userIcon == null || userIcon == "") {
                    console.log("ç”¨æˆ·æœªæŽˆæƒï¼Œå–æ¶ˆä¸ŠæŠ¥å‘¨æ¦œåˆ†æ•°");
                    return;
                }
                var userId = SDKManager_1.default.inst.openID;
                this.sendPro({
                    appid: this.flag,
                    openId: userId,
                    type: mapId,
                    avatar: userIcon,
                    times: score,
                    nickname: userName
                }, "/api/rank/times", BHandler_1.default.create(this, function(data) {
                    console.log("ä¸ŠæŠ¥å‘¨æ¦œè¿”å›ž", data);
                }), "get");
            };
            CQApi.prototype.GetWeekScore = function(mapId, hand) {
                var userId = SDKManager_1.default.inst.openID;
                this.sendPro({
                    appid: this.flag,
                    openId: userId,
                    type: mapId,
                    count: 50,
                    week: 1
                }, "/api/rank/week/time", BHandler_1.default.create(CQApi, function(data) {
                    var dataSource = [];
                    var selfData;
                    if (data && data.code == 1) {
                        if (data.data) {
                            console.log("èŽ·å–å‘¨æŽ’è¡Œæ¦œæ•°æ®æˆåŠŸ", data);
                            for (var key in data.data) {
                                var value = data.data[key];
                                if (value == null) continue;
                                var pushData = {
                                    id: value.open_id,
                                    iconUrl: value.avatarUrl,
                                    name: value.nickName,
                                    score: value.val,
                                    authCode: value.auth_code,
                                    rewardState: value.state,
                                    count: value.count,
                                    index: value.index,
                                    mapId: data.type
                                };
                                dataSource.push(pushData);
                            }
                        }
                        if (data.self) {
                            selfData = {
                                id: data.self.open_id,
                                iconUrl: data.self.avatarUrl,
                                name: data.self.nickName,
                                score: data.self.val,
                                authCode: data.self.auth_code,
                                rewardState: data.self.state,
                                count: data.self.count,
                                index: data.self.index,
                                mapId: data.self.type
                            };
                            console.log(selfData.mapId);
                        }
                    } else {
                        console.log("èŽ·å–å‘¨æŽ’è¡Œæ¦œæ•°æ®å¤±è´¥===>", data);
                    }
                    hand.runWith([ dataSource, selfData ]);
                }), "get");
            };
            CQApi.prototype.upWeekRewardStatus = function(mapId, rank, hand) {
                this.sendPro({
                    type: mapId,
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    rank: rank
                }, "/api/rank/check/code", BHandler_1.default.create(CQApi, function(data) {
                    if (data) {
                        hand.runWith([ data ]);
                    }
                }), "get");
            };
            CQApi.prototype.additional = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    appid: this.flag
                }, "/api/game/config", hand);
            };
            CQApi.prototype.getAdState = function(param, hand) {
                this.additional(BHandler_1.default.create(this, function(data) {
                    var rb = true;
                    var rb2 = true;
                    if (data && data.code == 1) {
                        if (data.data && data.data && data.data["config"] == param) {
                            rb = false;
                        }
                        if (data.data && data.data && data.data["ad"] == param) {
                            rb2 = false;
                        }
                    }
                    if (hand) {
                        hand.runWith([ rb, rb2 ]);
                    }
                }));
            };
            CQApi.prototype.getMatter = function(hand) {
                var _this = this;
                this.sendPro({
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID
                }, "/ads/get", BHandler_1.default.create(this, function(data) {
                    var reArr = [];
                    if (data && data.code == 1) {
                        console.log("èŽ·å–å¹¿å‘Šæ•°æ® data ->", data);
                        var dataArr = data.data;
                        if (dataArr && dataArr.length > 0) {
                            for (var i = 0; i < dataArr.length; i++) {
                                var element = dataArr[i];
                                reArr = reArr.concat(_this.getAdInfos(element.ads, element));
                            }
                        }
                    }
                    _this.getShareContent(BHandler_1.default.create(_this, function(obj) {
                        if (obj && obj.data && obj.code == 1) {
                            var info = new RecomInfo_1.default();
                            info.matter_type = 2;
                            info.data = {
                                id: obj.data.id,
                                share_img: obj.data.picurl,
                                share_title: obj.data.title
                            };
                            info.id = obj.id;
                            reArr.push(info);
                        }
                        hand.runWith([ reArr ]);
                    }));
                }));
            };
            CQApi.prototype.getAdInfos = function(arr, item) {
                var reArr = [];
                for (var i = 0; i < arr.length; i++) {
                    var info = new RecomInfo_1.default();
                    info.initCq(arr[i], item);
                    reArr.push(info);
                }
                return reArr;
            };
            CQApi.prototype.openClick = function(param, type, comp, hand) {
                if (comp === void 0) {
                    comp = true;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (!param) {
                    return;
                }
                var pro = {
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    adId: param.id,
                    code: param.location + "",
                    scene: param.item.name,
                    channel: SDKManager_1.default.inst.sChannel
                };
                if (comp) {
                    pro["status"] = 1;
                } else {
                    pro["status"] = 0;
                }
                this.sendPro(pro, "/ads/click/post", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        if (data.status == 1) {}
                    }
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            CQApi.prototype.exposure = function(datas, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                var arr = [];
                for (var i = 0; i < datas.length; i++) {
                    arr[i] = {
                        adId: datas[i].ad_id,
                        code: datas[i].location_id,
                        scene: datas[i].scene,
                        num: datas[i].num
                    };
                }
                this.sendPro({
                    openId: SDKManager_1.default.inst.openID,
                    appid: this.flag,
                    channel: SDKManager_1.default.inst.sChannel,
                    data: arr
                }, "/ads/exposure/post2", hand, "post");
            };
            CQApi.prototype.invite = function(origin, hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID,
                    origin: origin
                }, "/api/invite", hand);
            };
            CQApi.prototype.seeInviteNum = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
                this.sendPro({
                    flg: this.flag,
                    uid: SDKManager_1.default.inst.openID,
                    isNew: 1
                }, "/api/count/invite", hand);
            };
            CQApi.prototype.report = function(hand, sKey, val) {
                if (hand === void 0) {
                    hand = null;
                }
                if (sKey === void 0) {
                    sKey = "all";
                }
                if (val === void 0) {
                    val = null;
                }
                if (val != null) {
                    this.uploadGamePlayerInfo(sKey, val, hand);
                } else {
                    this.getGamePlayerInfo(sKey, hand);
                }
            };
            CQApi.prototype.uploadGamePlayerInfo = function(skey, sval, hand) {
                var ty = typeof sval;
                if (ty != "string" && ty != "boolean" && ty != "number") {
                    console.error("å­˜å‚¨æ•°æ®:" + skey + "éžåŸºç¡€ç±»åž‹,å¯èƒ½ä¼šå­˜å‚¨é”™è¯¯,å¦‚æžœéœ€è¦å­˜å‚¨å¯¹è±¡è¯·ç”¨jsonå­˜å‚¨!!!");
                }
                var postPro = "appid=" + this.flag + "&openId=" + SDKManager_1.default.inst.openID + "&key=" + skey + "&val=" + sval;
                this.sendPro(postPro, "/api/property/put", BHandler_1.default.create(this, function(data) {
                    if (data && hand) {
                        if (hand) {
                            hand.runWith(data.data);
                        }
                    }
                }), "post");
            };
            CQApi.prototype.getGamePlayerInfo = function(key, hand) {
                if (key === void 0) {
                    key = "all";
                }
                if (!key) {
                    key = "all";
                }
                var pro = {
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    keys: key
                };
                this.sendPro(pro, "/api/property/get", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        if (data.data) {
                            hand.runWith(data.data);
                        }
                    }
                }));
            };
            CQApi.prototype.uploadWorldRankScroe = function(score, hand) {
                var pro = {
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    score: score
                };
                this.sendPro(pro, "/api/score/score", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1 && data.data) {}
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            CQApi.prototype.getWorldRankScroe = function(count, hand) {
                if (count === void 0) {
                    count = 8;
                }
                var pro = {
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    count: count
                };
                this.sendPro(pro, "/api/score/orders", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        if (data.data.length > 0 && hand) {
                            hand.runWith(data.data);
                        }
                    }
                }));
            };
            CQApi.prototype.eventPost = function(sCode, sKey, val, hand, sExtend) {
                if (sCode === void 0) {
                    sCode = "";
                }
                if (sKey === void 0) {
                    sKey = "";
                }
                if (val === void 0) {
                    val = null;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sExtend === void 0) {
                    sExtend = "";
                }
                SDKManager_1.default.inst.sdk.eventPost(sCode, sKey, val, hand, sExtend);
                var pro = {
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    key: sKey,
                    code: sCode,
                    val: val,
                    channel: SDKManager_1.default.inst.platform
                };
                if (sExtend != "") {
                    pro["extend"] = sExtend;
                }
                this.sendPro(pro, "/api/event/post", hand);
            };
            CQApi.prototype.getShareContent = function(hand) {
                var pro = {
                    appid: this.flag
                };
                this.sendPro(pro, "/api/shares", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        hand.runWith(data);
                    }
                }));
            };
            CQApi.prototype.uploadShareStatus = function(iState, hand) {
                var pro = {
                    appid: this.flag,
                    openId: SDKManager_1.default.inst.openID,
                    state: iState
                };
                this.sendPro(pro, "/api/shares/post", BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1 && data.data) {}
                    if (hand) {
                        hand.runWith(data);
                    }
                }));
            };
            CQApi.prototype.uploadError = function(code, msg, hand) {
                // var pro = "appid=" + this.flag + "&code=" + code + "&msg=" + msg;
                // this.sendPro(pro, "/api/onerr", BHandler_1.default.create(this, function(data) {
                //     if (data && data.code == 1 && data.data) {}
                //     if (hand) {
                //         hand.runWith(data);
                //     }
                // }), "post");
            };
            CQApi.prototype.sendPro = function(pro, apiName, hand, method, type) {
                // if (hand === void 0) {
                //     hand = null;
                // }
                // if (method === void 0) {
                //     method = "get";
                // }
                // if (type === void 0) {
                //     type = "json";
                // }
                // var req = new Http_1.default();
                // req.send(this.url + apiName, pro, hand, method, type);
            };
            return CQApi;
        }(APIBase_1.default);
        exports.default = CQApi;
    }, {
        "../../../script/common/GlobalUnit": 56,
        "../../manager/APIManager": 5,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23,
        "../APIBase": 9,
        "../Http": 10,
        "../RecomInfo": 11
    } ],
    18: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BHandler_1 = require("../../utils/BHandler");
        var TimeUtil_1 = require("../../utils/TimeUtil");
        var DispatcherMrg_1 = require("../../manager/DispatcherMrg");
        var SDKBase_1 = require("../SDKBase");
        var SDKManager_1 = require("../../manager/SDKManager");
        var APIManager_1 = require("../../manager/APIManager");
        var QQ_helper_1 = require("./QQ_helper");
        var QQ = function(_super) {
            __extends(QQ, _super);
            function QQ() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._lastShareTime = 0;
                _this.SDKVersion = "v1.0.0";
                _this.useStageWidth = 750;
                _this.useStageHeight = 1334;
                _this._VidofailTimes = 0;
                _this._BannerFailTimes = 0;
                return _this;
            }
            QQ.prototype.init = function(hClass) {
                var _this = this;
                if (hClass === void 0) {
                    hClass = null;
                }
                console.log("QQ Version:" + this.SDKVersion);
                if (hClass) {
                    this._helper = new hClass();
                } else {
                    this._helper = new QQ_helper_1.default();
                }
                try {
                    this.base = window["qq"];
                } catch (err) {
                    console.error("Init QQ Erro" + err.message);
                    return;
                }
                if (this.base) {
                    this.openDataContext = this.base.getOpenDataContext();
                    this.base.onHide(function() {
                        // _this.onHide();
                    });
                    this.base.onShow(function(res) {
                        // _this.onShow(res);
                    });
                    this.base.onError(function(res) {
                        _this.onError(res);
                    });
                    var manager = this.base.getUpdateManager();
                    manager.onCheckForUpdate(function(res) {
                        _this.onCheckUpdate(res);
                    });
                    manager.onUpdateReady(function() {
                        _this.onReady();
                    });
                }
                this._helper.onInit();
            };
            QQ.prototype.postMsg = function(msg) {
                if (this.openDataContext) {
                    this.openDataContext.postMessage(msg);
                }
            };
            QQ.prototype.openViewSize = function(iWidth, iHeight) {
                if (this.openDataContext && this.openDataContext.canvas) {
                    this.openDataContext.canvas.width = iWidth;
                    this.openDataContext.canvas.height = iHeight;
                }
            };
            Object.defineProperty(QQ.prototype, "helper", {
                get: function() {
                    return this._helper;
                },
                enumerable: true,
                configurable: true
            });
            QQ.prototype.onCheckUpdate = function(b) {
                this._helper.onUpdate(b);
            };
            QQ.prototype.onReady = function() {
                this._helper.onReady();
            };
            QQ.prototype.applyUpdate = function() {
                this.base.getUpdateManager().applyUpdate();
            };
            QQ.prototype.onError = function(res) {
                var str = "";
                if (this.phoneInfo) {
                    str += "brand=" + this.phoneInfo.brand + "\n";
                    str += "model=" + this.phoneInfo.model + "\n";
                    str += "language=" + this.phoneInfo.language + "\n";
                    str += "version=" + this.phoneInfo.version + "\n";
                    str += "system=" + this.phoneInfo.system + "\n";
                    str += "platform=" + this.phoneInfo.platform + "\n";
                    str += "SDKVersion=" + this.phoneInfo.SDKVersion + "\n";
                    str += "benchmarkLevel=" + this.phoneInfo.benchmarkLevel + "\n";
                }
                str += "message=" + res.message + "\n";
                str += "stack=" + res.stack;
                if (str == "") {
                    str = "æœ‰æŠ¥é”™ï¼Œä½†æ˜¯æ²¡æœ‰æ”¶é›†åˆ°æ•°æ®";
                }
                console.error("catchErro:" + str);
                this._helper.onError(res, str);
            };
            QQ.prototype.onHide = function() {
                console.log("onGameHide");
                this._helper.onHide();
                DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_Hide);
            };
            QQ.prototype.onShow = function(res) {
                console.log("onGameShow", res);
                this._helper.onShow(res);
                if (this._shareTime > 0) {
                    var dt = TimeUtil_1.default.getTime() - this._shareTime;
                    if (this._shareHand) {
                        this._shareHand.runWith([ dt ]);
                    }
                }
                this._shareHand = null;
                DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_Show, res);
            };
            QQ.prototype.login = function(hand) {
                var _this = this;
                var t = this;
                if (SDKManager_1.default.inst.platform != SDKManager_1.default.PlaneForm_QQ) {
                    if (hand) {
                        hand.run();
                    }
                    return;
                }
                var res = this.base.getLaunchOptionsSync();
                if (res && res.query && res.query.channel) {
                    SDKManager_1.default.inst.sChannel = res.query.channel;
                    SDKManager_1.default.inst.sdk.setStorage("Stroage_Channel", SDKManager_1.default.inst.sChannel);
                } else {
                    SDKManager_1.default.inst.sChannel = SDKManager_1.default.inst.sdk.getStorage("Stroage_Channel");
                    if (!SDKManager_1.default.inst.sChannel) {
                        SDKManager_1.default.inst.sChannel = "own";
                    }
                }
                if (res && res.query && res.query.inviteId) {
                    if (res.query.shareflag == SDKManager_1.default.inst.sdk.shareflag) {
                        this.isUploadInviteInfo = true;
                        this.inviteId = res.query.inviteId;
                    }
                }
                this.base.login({
                    success: function(res) {
                        console.log("LoginRes -> æˆåŠŸ", res);
                        _this.loginData = res;
                        SDKManager_1.default.inst.code = res.code;
                        _this._helper.onLogin(res, hand, SDKManager_1.default.inst.sChannel, _this.getFappID());
                    },
                    fail: function(res) {
                        console.error("loginRes - > å¤±è´¥ ", res);
                        _this._loginState = -1;
                    }
                });
            };
            QQ.prototype.getSystemInfo = function(resHandler, difSysOfy, stageWidth, stageHeight) {
                var _this = this;
                if (difSysOfy === void 0) {
                    difSysOfy = 95;
                }
                if (stageWidth === void 0) {
                    stageWidth = 750;
                }
                if (stageHeight === void 0) {
                    stageHeight = 1334;
                }
                if (!this.base) {
                    this.screenratio = stageHeight / stageWidth;
                    this.useStageWidth = stageWidth;
                    this.useStageHeight = stageHeight;
                    if (this.screenratio >= 2.06) {
                        this.sysOfy = difSysOfy;
                    }
                    if (resHandler) {
                        resHandler.run();
                    }
                    return;
                }
                this.base.getSystemInfo({
                    success: function(res) {
                        console.log("getSystemInfo - > æˆåŠŸ ", res);
                        _this.phoneInfo = res;
                        _this.screenratio = Number(res.windowHeight) / Number(res.windowWidth);
                        if (_this.screenratio >= 2.06) {
                            _this.sysOfy = difSysOfy;
                        }
                        _this._helper.onGetSystemInfo(res);
                    },
                    fail: function(failData) {
                        console.log("getSystemInfo - > å¤±è´¥ ", failData);
                    },
                    complete: function(completeData) {
                        if (resHandler != null) {
                            resHandler.run();
                        }
                    }
                });
            };
            QQ.prototype.getPhonePlane = function() {
                if (!this.base) return 3;
                if (this.phoneInfo.platform.indexOf("ios") > -1 || this.phoneInfo.platform.indexOf("IOS") > -1) {
                    return 2;
                }
                if (this.phoneInfo.platform.indexOf("devtools") > -1) {
                    return 4;
                }
                return 1;
            };
            QQ.prototype.platform = function() {
                if (!this.base) {
                    return "web";
                }
                return this.phoneInfo.platform;
            };
            QQ.prototype.shareMenu = function(withShareTicket) {
                var _this = this;
                if (withShareTicket === void 0) {
                    withShareTicket = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.showShareMenu({
                    withShareTicket: withShareTicket,
                    success: function(successData) {
                        _this._helper.onInitShareMeun(BHandler_1.default.create(_this, function() {
                            _this.onShareAppMessage(withShareTicket);
                        }));
                    },
                    fail: function(failData) {
                        console.log("åˆå§‹åŒ–å³ä¸Šè§’æŒ‰é’®å¤±è´¥:", failData);
                    },
                    complete: function(completeData) {}
                });
            };
            QQ.prototype.onShareAppMessage = function(withShareTicket) {
                var _this = this;
                if (!this.base) {
                    return;
                }
                this.base.onShareAppMessage(function(res) {
                    return _this._helper.buildShareMenuObject();
                });
            };
            QQ.prototype.showModal2 = function(params) {
                if (!this.base) return;
                this.base.showModal(params);
            };
            QQ.prototype.showToast = function(sTitle, iDuration, bMask, sIcon) {
                if (iDuration === void 0) {
                    iDuration = 1e3;
                }
                if (bMask === void 0) {
                    bMask = false;
                }
                if (sIcon === void 0) {
                    sIcon = "none";
                }
                if (!this.base) {
                    console.log("WXToast:" + sTitle);
                    this._helper.showToastByWeb(sTitle, iDuration, bMask, sIcon);
                    return;
                }
                this.base.showToast({
                    title: sTitle,
                    icon: sIcon,
                    duration: iDuration,
                    mask: bMask
                });
            };
            QQ.prototype.showLoading = function(sTitle, bMask) {
                if (sTitle === void 0) {
                    sTitle = "è¯·ç¨åŽ";
                }
                if (bMask === void 0) {
                    bMask = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.showLoading({
                    title: sTitle,
                    mask: bMask
                });
            };
            QQ.prototype.hideLoading = function(params) {
                if (params === void 0) {
                    params = null;
                }
                if (!this.base) return;
                !params && (params = {});
                this.base.hideLoading(params);
            };
            QQ.prototype.shareAppMessageByClient = function(obj, hand) {
                if (!this.base) {
                    return;
                }
                if (this._shareHand && this._shareHand.once) {
                    this._shareHand.recover();
                }
                this._shareHand = hand;
                this._shareTime = TimeUtil_1.default.getTime();
                this._helper.onShare(obj);
                this.base.shareAppMessage(obj);
                this.base.onShareAppMessage(BHandler_1.default.create(this, function(res) {
                    console.log(res.title, res.imageUrl, res.query);
                }));
            };
            QQ.prototype.shareAppMessage = function(hand, queryData) {
                if (hand === void 0) {
                    hand = null;
                }
                if (queryData === void 0) {
                    queryData = null;
                }
                var tempQuery = this._helper.buildShareObject();
                if (tempQuery.query) {
                    tempQuery.query = tempQuery.query + "&inviteId=" + SDKManager_1.default.inst.openID + "&shareflag=" + this.shareflag;
                }
                this.shareAppMessageByClient(tempQuery, hand);
            };
            QQ.prototype.objToString = function(obj) {
                var str = "";
                for (var i in obj) {
                    str += i + "=" + obj[i] + "&";
                }
                str = str.slice(0, str.length - 1);
                return str;
            };
            QQ.prototype.setClipboardData = function(code) {
                if (!this.base) {
                    return;
                }
                this.base.setClipboardData({
                    data: code
                });
            };
            QQ.prototype.previewImage = function(url, pro, hand) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                var arr = new Array();
                arr.push(this._helper.getUrl(url));
                this.base.previewImage({
                    urls: arr,
                    success: function() {
                        _this._helper.onPreviewComp(url, pro, true);
                        if (hand) {
                            hand.runWith([ true, pro ]);
                        }
                    },
                    fail: function() {
                        _this._helper.onPreviewComp(url, pro, false);
                        if (hand) {
                            hand.runWith([ false, pro ]);
                        }
                    }
                });
            };
            QQ.prototype.checkVersion = function(version, isSDK) {
                if (isSDK === void 0) {
                    isSDK = true;
                }
                if (!this.base) {
                    return false;
                }
                if (this.phoneInfo) {
                    var wxVs = isSDK ? this.phoneInfo.SDKVersion : this.phoneInfo.version;
                    var wxVsArr = wxVs.split(".");
                    var checkArr = version.split(".");
                    if (checkArr.length < 3) {
                        console.error("checkVersion Erro:version - >" + version);
                        return false;
                    }
                    if (parseInt(wxVsArr[0]) > parseInt(checkArr[0])) {
                        return true;
                    }
                    if (parseInt(wxVsArr[0]) < parseInt(checkArr[0])) {
                        return false;
                    }
                    if (parseInt(wxVsArr[0]) == parseInt(checkArr[0])) {
                        if (parseInt(wxVsArr[1]) > parseInt(checkArr[1])) {
                            return true;
                        } else if (parseInt(wxVsArr[1]) < parseInt(checkArr[1])) {
                            return false;
                        } else {
                            return parseInt(wxVsArr[2]) >= parseInt(checkArr[2]);
                        }
                    }
                }
                return false;
            };
            QQ.prototype.navigateToMiniProgram = function(sAppId, app, hand, spath, oExtraData, sEnvVersion) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                if (spath === void 0) {
                    spath = "";
                }
                if (oExtraData === void 0) {
                    oExtraData = null;
                }
                if (sEnvVersion === void 0) {
                    sEnvVersion = "release";
                }
                if (!this.base || !this.checkVersion("2.2.0")) {
                    if (hand && hand.once) {
                        hand.recover();
                    }
                    return;
                }
                this.base.navigateToMiniProgram({
                    appId: sAppId,
                    extraData: oExtraData,
                    path: spath,
                    envVersion: sEnvVersion,
                    success: function() {
                        _this._helper.openClick(app, true);
                        console.log("APPæ‹‰èµ·æˆåŠŸ");
                        if (hand) {
                            hand.runWith([ true ]);
                        }
                    },
                    fail: function() {
                        _this._helper.openClick(app, false);
                        console.log("APPæ‹‰èµ·å¤±è´¥");
                        if (hand) {
                            hand.runWith([ false ]);
                        }
                    }
                });
            };
            QQ.prototype.vibrateShort = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
                if (this.base && this.canVibrate) {
                    this.base.vibrateShort(obj);
                }
            };
            QQ.prototype.vibrateLong = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
                if (this.base && this.canVibrate) {
                    this.base.vibrateLong(obj);
                }
            };
            QQ.prototype.setKeepScreenOn = function(bKeepScreenOn) {
                if (bKeepScreenOn === void 0) {
                    bKeepScreenOn = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.setKeepScreenOn({
                    keepScreenOn: bKeepScreenOn,
                    success: function() {
                        console.log("WX -> setKeepScreenOn");
                    }
                });
            };
            QQ.prototype.exit = function() {
                if (!this.base) {
                    return;
                }
                this.base.exitMiniProgram({});
            };
            QQ.prototype.createFeedbackButton = function(type, text, image, style) {
                if (!this.base || !this.checkVersion("2.1.2")) {
                    return;
                }
                return this.base.createFeedbackButton({
                    type: type,
                    text: text,
                    image: image,
                    style: style
                });
            };
            QQ.prototype.openCustomerServiceConversation = function(params) {
                if (params === void 0) {
                    params = null;
                }
                if (!this.base) return;
                this.base.openCustomerServiceConversation(params);
            };
            QQ.prototype.canShowBanner = function() {
                if (this.base == null) {
                    return -1;
                }
                if (this._helper.Banner_adunit == "") {
                    console.log("Warning Banner å¹¿å‘Šè¢«è°ƒç”¨äº†ï¼Œ ä½†æ˜¯å¹¶æ²¡æœ‰è®¾ç½® å•å…ƒIDã€‚è¯·å‰å¾€ WX_Helper.as è®¾ç½® Banner_adunit");
                    return 3;
                }
                if (this._BannerFailTimes >= this._helper.MaxBannerFailTimes) {
                    return 4;
                }
                return 0;
            };
            QQ.prototype.showBanner = function(delay, hand, iWidth) {
                var _this = this;
                if (delay === void 0) {
                    delay = 0;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (iWidth === void 0) {
                    iWidth = -1;
                }
                var rev = this.canShowBanner();
                if (rev != 0) {
                    if (hand) {
                        hand.run();
                    }
                    return rev;
                }
                if (iWidth == -1) {
                    iWidth = this.Banner_Def_Width == 0 ? this.phoneInfo.windowWidth : this.Banner_Def_Width;
                }
                if (this.bannerAd) {
                    if (this.bannerAd.style) {
                        this.bannerAd.style.width = iWidth;
                    }
                    this.onShowBannerAD(hand, delay);
                    return 0;
                }
                this.bannerAd = this.base.createBannerAd(this._helper.getBannerObj(iWidth));
                console.log("åˆ›å»ºbanneræ•°æ®:", this.bannerAd);
                this.bannerAd.onResize(function(size) {
                    if (_this.bannerAd) {
                        _this._helper.bannerResize(_this.bannerAd, size);
                    }
                    DispatcherMrg_1.default.ins.eventTo("Banner_OnResize", _this.bannerAd);
                });
                this.bannerAd.onError(function(res) {
                    console.log("å¹¿å‘Šé”™è¯¯:", res);
                    _this._BannerFailTimes += 1;
                });
                this.onShowBannerAD(hand, delay);
                return rev;
            };
            QQ.prototype.onShowBannerAD = function(hand, delay) {
                var _this = this;
                this.bannerShowing = true;
                if (delay > 0) {
                    setTimeout(function() {
                        if (_this.bannerAd && _this.bannerShowing) {
                            _this.bannerAd.show();
                            if (hand) {
                                hand.run();
                            }
                        }
                    }, delay);
                } else {
                    if (this.bannerAd && this.bannerShowing) {
                        this.bannerAd.show();
                        if (hand) {
                            hand.run();
                        }
                    }
                }
            };
            QQ.prototype.hideBannder = function(bDestroy) {
                if (bDestroy === void 0) {
                    bDestroy = true;
                }
                if (this.bannerAd) {
                    if (bDestroy) {
                        this.bannerAd.destroy();
                        this.bannerAd = null;
                    } else {
                        this.bannerAd.hide();
                    }
                }
                this.bannerShowing = false;
            };
            QQ.prototype.canPlayVideo = function() {
                if (!this.base) {
                    return false;
                }
                if (!this._helper.Video_adunit) {
                    return false;
                }
                if (this._VidofailTimes > this._helper.VideoCanFailTimes) {
                    console.log("Warning è§†é¢‘å¹¿å‘Šæ‹‰èµ·å¤±è´¥æ¬¡æ•°å·²è¾¾ä¸Šé™" + this._helper.VideoCanFailTimes + "æ¬¡ï¼Œå½“æ—¥æ— æ³•ç»§ç»­æ’­æ”¾ã€‚");
                    return false;
                }
                return true;
            };
            QQ.prototype.initVideoAD = function() {
                var _this = this;
                var t = this;
                if (!t.base) {
                    return false;
                }
                if (!t.canPlayVideo()) {
                    return false;
                }
                if (!t.RewardedVideo) {
                    t.RewardedVideo = t.base.createRewardedVideoAd(t._helper.getVideoObj());
                    t.RewardedVideo.onLoad(function() {
                        console.log("RewardedVideo è§†é¢‘å¹¿å‘ŠåŠ è½½å®Œæˆ");
                        t._videoState = 0;
                    });
                    t.RewardedVideo.onClose(function(s) {
                        _this.onVideoClose(s);
                    });
                    t.RewardedVideo.onError(function(msg) {
                        t._videoState = -1;
                        var desc = "è§†é¢‘æ’­æ”¾æ¬¡æ•°å·²è¾¾ä¸Šé™";
                        if (msg.errCode != 1002) {
                            desc = msg.errCode + ":" + msg.errMsg;
                        }
                        _this._VidofailTimes += 1;
                        _this.showModal("è§†é¢‘æ’­æ”¾å¤±è´¥", desc, BHandler_1.default.create(t, function() {
                            if (t._videoCallBack) {
                                t._videoCallBack.runWith(false);
                                t._videoCallBack = null;
                            }
                        }));
                    });
                }
                if (t.RewardedVideo) {
                    t._videoState = 2;
                    t._resolved = t.RewardedVideo.load();
                    t._resolved.then(function() {
                        return _this._videoState = 0;
                    });
                }
                return true;
            };
            QQ.prototype.showVideoAd = function(compHand) {
                var t = this;
                if (t.base == null || t._videoState == 1) {
                    return -1;
                }
                var res = t.canPlayVideo();
                if (!res) {
                    return res;
                }
                if (!t.RewardedVideo) {
                    t.initVideoAD();
                }
                t._videoCallBack = compHand;
                if (t._videoState == 0) {
                    t._videoState = 1;
                    console.log("showVideoAd  å¼€å§‹æ˜¾ç¤º");
                    t.RewardedVideo.show();
                } else if (t._videoState == -1) {
                    t._videoState = 2;
                    t._resolved = t.RewardedVideo.load();
                    t._resolved.then(function() {
                        t._videoState = 0;
                        return t.showVideoAd(compHand);
                    });
                } else if (t._videoState == 2) {
                    if (t._resolved) {
                        t._resolved.then(function() {
                            return t.showVideoAd(compHand);
                        });
                    }
                }
                return 0;
            };
            QQ.prototype.onVideoClose = function(res) {
                this._videoState = -1;
                var b = false;
                if (true) {
                    if (res && res.isEnded || res === undefined) {
                        this._helper.VideoHasPlayCount += 1;
                        b = true;
                    } else {
                        b = false;
                    }
                } else {
                    b = true;
                    this._helper.VideoHasPlayCount += 1;
                }
                console.log("è§†é¢‘è¢«å…³é—­ å·²ç»çœ‹å®Œï¼š" + this._helper.VideoHasPlayCount + "æ¬¡");
                this._helper.onVideoClose(b);
                if (this._videoCallBack) {
                    this._videoCallBack.runWith(b);
                }
            };
            QQ.prototype.getStorage = function(sKey, defVal, toServer, hand) {
                if (defVal === void 0) {
                    defVal = null;
                }
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (!this.base) {
                    if (hand) {
                        hand.runWith([ 1, null ]);
                    }
                    return defVal;
                }
                var datas = null;
                try {
                    datas = this.base.getStorageSync(sKey);
                } catch (e) {
                    console.error("èŽ·å–æœ¬åœ°å­˜å‚¨å¼‚å¸¸ ->", e);
                }
                if (!datas || datas === "NaN") {
                    datas = defVal;
                    if (toServer) {
                        APIManager_1.default.inst.api.report(BHandler_1.default.create(this, function(data) {
                            if (hand) {
                                hand.runWith([ data ]);
                            }
                        }), sKey, null);
                        return datas;
                    }
                }
                if (hand) {
                    hand.runWith([ {
                        skye: datas
                    } ]);
                }
                return datas;
            };
            QQ.prototype.setStorage = function(skey, value, toServer, hand, isAsyh) {
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (isAsyh === void 0) {
                    isAsyh = false;
                }
                if (!this.base) {
                    return;
                }
                var str = typeof value;
                try {
                    if (isAsyh) {
                        this.base.setStorage(skey, value);
                    } else {
                        this.base.setStorageSync(skey, value);
                    }
                } catch (e) {
                    console.error("ä¿å­˜æœ¬åœ°å­˜å‚¨ å¼‚å¸¸ e ->", e);
                }
                if (toServer) {
                    APIManager_1.default.inst.api.report(hand, skey, JSON.stringify(value));
                }
            };
            QQ.prototype.pay = function(num, hand, zone) {
                var _this = this;
                if (zone === void 0) {
                    zone = "1";
                }
                var t = this;
                if (!t._wx || this.getPhonePlane() == 2) {
                    console.log("çŽ¯å¢ƒä¸æ”¯æŒæ”¯ä»˜");
                    return;
                }
                num = parseInt(num + "");
                if (num <= 0) {
                    this.showToast("æ”¯ä»˜é‡‘é¢ä¸å¾—å°äºŽ0");
                    if (hand) {
                        hand.runWith([ false, num, zone ]);
                    }
                    return;
                }
                var pro = {};
                pro["mode"] = "game";
                pro["env"] = t._helper.PayEnv;
                pro["offerId"] = t._helper.offerID;
                pro["currencyType"] = "CNY";
                pro["platform"] = "android";
                pro["buyQuantity"] = num;
                pro["zoneId"] = zone;
                pro["success"] = function() {
                    if (hand) {
                        hand.runWith([ true, num, zone ]);
                    }
                    t._helper.onPayComp(true, num, zone);
                };
                pro["fail"] = function(res) {
                    _this.showModal("æ”¯ä»˜å¤±è´¥", res.errCode + ":" + res.errMsg, BHandler_1.default.create(_this, function() {
                        if (hand) {
                            hand.runWith([ false, num, zone ]);
                        }
                        t._helper.onPayComp(false, num, zone);
                    }));
                };
                t._wx.requestMidasPayment(pro);
            };
            QQ.prototype.clearStorage = function() {
                if (this.base) {
                    this.base.clearStorageSync();
                }
            };
            QQ.prototype.eventPost = function(sCode, sKey, val, hand, sExtend) {
                if (sCode === void 0) {
                    sCode = "";
                }
                if (sKey === void 0) {
                    sKey = "";
                }
                if (val === void 0) {
                    val = null;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sExtend === void 0) {
                    sExtend = "";
                }
                var fun = this.base["aldSendEvent"];
                if (this.base && fun) {
                    var sendObj = {};
                    if (sKey) {
                        sendObj[sKey] = val;
                    }
                    if (sExtend) {
                        sendObj["extend"] = sExtend;
                    }
                    fun(sCode, sendObj);
                }
            };
            QQ.prototype.authorize = function(hand, rect) {
                var _this = this;
                if (!this.base) {
                    if (hand) {
                        hand.runWith([ false ]);
                    }
                    return;
                }
                console.log("å‡†å¤‡æ‹‰èµ·æŽˆæƒ:");
                this.base.getSetting({
                    success: function(sucData) {
                        console.log("getSetting - > æˆåŠŸ ", sucData);
                        if (!sucData.authSetting["scope.userInfo"]) {
                            console.log("å°šæœªæŽˆæƒ:");
                            _this.createUserInfoButton(hand, rect);
                        } else {
                            console.log("å·²æŽˆæƒè¿‡äº†");
                            _this.getUserInfo(hand);
                        }
                    }
                });
            };
            QQ.prototype.createUserInfoButton = function(hand, rect) {
                var _this = this;
                if (!this.phoneInfo) {
                    if (hand) {
                        hand.runWith([ false ]);
                    }
                    console.error("æŽˆæƒæ—¶å°šæœªèŽ·å¾—è®¾å¤‡ä¿¡æ¯");
                    return;
                }
                var w = Number(this.phoneInfo.windowWidth) / this.useStageWidth;
                var h = Number(this.phoneInfo.windowHeight) / this.useStageHeight;
                this.UserInfoButton = this.base.createUserInfoButton({
                    type: "text",
                    text: "",
                    style: {
                        left: w * rect.x,
                        top: h * rect.y,
                        width: w * rect.width,
                        height: h * rect.height,
                        lineHeight: 0,
                        textAlign: "center",
                        fontSize: 16,
                        borderRadius: 0
                    }
                });
                this.UserInfoButton.onTap(function(res) {
                    if (res) {
                        if (res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1) {
                            console.log("ç”¨æˆ·æ‹’ç»æŽˆæƒ!å¯ç”¨QQè®¾ç½®åŠŸèƒ½" + res);
                            _this.showModal("ç”¨æˆ·æŽˆæƒ", "ä¸ºæ­£å¸¸ä½¿ç”¨ç¨‹åºåŠŸèƒ½,è¯·ç‚¹å‡»ç¡®å®šå¹¶åœ¨æŽˆæƒç®¡ç†ä¸­é€‰ä¸­å…è®¸è®¿é—®ç”¨æˆ·ä¿¡æ¯", BHandler_1.default.create(_this, function() {
                                _this.base.openSetting({
                                    success: function(res) {
                                        console.log("æ‰“å¼€è®¾ç½®å®Œæˆ" + res);
                                        _this.getUserInfo(BHandler_1.default.create(_this, function(b) {
                                            if (b) {
                                                _this.destroyUserInfoButton();
                                            }
                                            if (hand) {
                                                hand.runWith([ b ]);
                                            }
                                        }));
                                    }
                                });
                            }));
                        } else {
                            _this.destroyUserInfoButton();
                            SDKManager_1.default.inst.userInfo = res;
                            for (var key in res) {
                                console.log("key=====" + key + "===value==" + res[key]);
                            }
                            console.log("UserInfoButton ç”¨æˆ·æŽˆæƒ=========" + res.userInfo + "=====" + res.encryptedData + "===" + res.rawData + "====" + res.signature + "====" + res.iv);
                            _this._helper.onGetUserInfo(res);
                            console.log(" ç”¨æˆ·æŽˆæƒ=======UserInfoButton");
                            _this.getUserInfo(BHandler_1.default.create(_this, function(b) {
                                if (hand) {
                                    hand.runWith([ b ]);
                                }
                            }));
                        }
                    }
                });
            };
            QQ.prototype.getSetting = function(setStr, callBack) {
                if (setStr === void 0) {
                    setStr = "scope.userInfo";
                }
                this.base.getSetting({
                    success: function(sucData) {
                        if (sucData.authSetting[setStr]) {
                            callBack(true);
                        } else {
                            callBack(false);
                        }
                    }
                });
            };
            QQ.prototype.getUserInfo = function(hand) {
                var _this = this;
                this.base.getSetting({
                    success: function(sucData) {
                        console.log("getSetting - > æˆåŠŸ ", sucData);
                        if (sucData.authSetting["scope.userInfo"]) {
                            _this.base.getUserInfo({
                                openIdList: [ "selfOpenId" ],
                                fail: function(res) {
                                    console.log("getUserInfo - > å¤±è´¥ ", res);
                                    if (hand) {
                                        hand.runWith([ false ]);
                                    }
                                },
                                success: function(successData) {
                                    console.log("getUserInfo - > æˆåŠŸ ", successData);
                                    SDKManager_1.default.inst.userInfo = successData;
                                    SDKManager_1.default.inst.sdk.postMsg({
                                        type: "userInfoData",
                                        data: successData
                                    });
                                    if (hand) {
                                        hand.runWith([ true ]);
                                    }
                                }
                            });
                        } else {
                            if (hand) {
                                hand.runWith([ false ]);
                            }
                        }
                    }
                });
            };
            QQ.prototype.destroyUserInfoButton = function() {
                if (this.UserInfoButton) {
                    this.UserInfoButton.destroy();
                }
            };
            return QQ;
        }(SDKBase_1.default);
        exports.default = QQ;
    }, {
        "../../manager/APIManager": 5,
        "../../manager/DispatcherMrg": 6,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23,
        "../../utils/TimeUtil": 26,
        "../SDKBase": 12,
        "./QQ_helper": 19
    } ],
    19: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BHandler_1 = require("../../utils/BHandler");
        var APIManager_1 = require("../../manager/APIManager");
        var SDKManager_1 = require("../../manager/SDKManager");
        var MatterManager_1 = require("../../manager/MatterManager");
        var QQ_helper = function() {
            function QQ_helper() {
                this.offerID = "";
                this.PayEnv = 1;
                this.VideoMaxPlayCount = 8;
                this.VideoHasPlayCount = 0;
                this.Video_adunit = "";
                this.Banner_adunit = "";
                this.DefShareTitle = "";
                this.DefShareImgString = "";
                this.VideoCanFailTimes = 1;
                this.MaxBannerFailTimes = 1;
                this.version = "v1.0.0";
                console.log("QQ helper Version:" + this.version);
            }
            QQ_helper.prototype.onInit = function() {};
            QQ_helper.prototype.onHide = function() {};
            QQ_helper.prototype.onShow = function(res) {};
            QQ_helper.prototype.onError = function(res, msg) {
                APIManager_1.default.inst.api.uploadError(1e3, msg, null);
            };
            QQ_helper.prototype.onLogin = function(res, hand, sChannel, fAppid) {
                var _this = this;
                APIManager_1.default.inst.api.login(res.code, sChannel, BHandler_1.default.create(this, function(data) {
                    if (data && (data.status == 1 || data.code == 1)) {
                        if (hand) {
                            hand.run();
                        }
                    } else {
                        SDKManager_1.default.inst.sdk.showModal("æç¤º", "ç™»å½•å¤±è´¥,æœåŠ¡å™¨é”™è¯¯", BHandler_1.default.create(_this, SDKManager_1.default.inst.sdk.exit));
                    }
                }), fAppid);
            };
            QQ_helper.prototype.onPayComp = function(isPay, buyNum, zone) {};
            QQ_helper.prototype.onReady = function() {
                SDKManager_1.default.inst.sdk.showModal2({
                    title: "æ›´æ–°æç¤º",
                    content: "æ–°ç‰ˆæœ¬å·²ç»å‡†å¤‡å¥½ï¼Œæ˜¯å¦é‡å¯åº”ç”¨ï¼Ÿ",
                    success: function(res) {
                        if (res.confirm) {
                            SDKManager_1.default.inst.sdk.applyUpdate();
                        } else {
                            SDKManager_1.default.inst.sdk.exit();
                        }
                    }
                });
            };
            QQ_helper.prototype.onUpdate = function(hasUpdate) {
                console.log("Update:" + hasUpdate);
            };
            QQ_helper.prototype.onGetSystemInfo = function(res) {
                console.log("SystemInfo ->", res);
            };
            QQ_helper.prototype.onInitShareMeun = function(hand) {
                if (hand) {
                    hand.run();
                }
            };
            QQ_helper.prototype.buildShareObject = function() {
                return this.buildShareMenuObject();
            };
            QQ_helper.prototype.buildShareMenuObject = function() {
                var info = MatterManager_1.default.inst.getShareInfo();
                if (!info) {
                    console.warn("æ²¡æœ‰èŽ·å–åˆ°åˆ†äº«é…ç½®ä¿¡æ¯");
                    return {
                        imageUrl: this.DefShareImgString,
                        title: this.DefShareTitle
                    };
                }
                if (info.share_path == "") {
                    info.share_path = "1";
                }
                console.log("åˆ†äº«:", info);
                return {
                    imageUrl: info.share_img,
                    title: info.share_title,
                    query: info.share_path,
                    info: info
                };
            };
            QQ_helper.prototype.showToastByWeb = function(sTitle, iDuration, bMask, sIcon) {
                if (iDuration === void 0) {
                    iDuration = 1e3;
                }
                if (bMask === void 0) {
                    bMask = false;
                }
                if (sIcon === void 0) {
                    sIcon = "none";
                }
                console.log(sTitle);
            };
            QQ_helper.prototype.getUrl = function(url) {
                return url;
            };
            QQ_helper.prototype.onPreviewComp = function(url, pro, scc) {
                APIManager_1.default.inst.api.openClick(pro, 1, scc);
            };
            QQ_helper.prototype.onShare = function(pro) {
                APIManager_1.default.inst.api.stat("share", null, pro);
            };
            QQ_helper.prototype.openClick = function(pro, scc) {
                APIManager_1.default.inst.api.openClick(pro, 0, scc);
            };
            QQ_helper.prototype.getBannerObj = function(iWidth) {
                var obj = {};
                obj["adUnitId"] = this.Banner_adunit;
                var adTop = SDKManager_1.default.inst.phoneInfo.screenHeight - iWidth * .242;
                obj["style"] = {
                    top: adTop,
                    left: 0,
                    width: iWidth
                };
                return obj;
            };
            QQ_helper.prototype.getVideoObj = function() {
                return {
                    adUnitId: this.Video_adunit
                };
            };
            QQ_helper.prototype.bannerResize = function(bannerAd, size) {
                bannerAd.style.top = SDKManager_1.default.inst.phoneInfo.screenHeight - size.height;
                bannerAd.style.left = (SDKManager_1.default.inst.phoneInfo.screenWidth - size.width) / 2;
                console.log("bannerResize:", size);
            };
            QQ_helper.prototype.onVideoClose = function(isComp) {
                if (isComp) {
                    APIManager_1.default.inst.api.stat("video");
                }
            };
            QQ_helper.prototype.onGetUserInfo = function(res) {
                if (!res) {
                    return;
                }
                APIManager_1.default.inst.api.setUserData_2(res.rawData);
            };
            return QQ_helper;
        }();
        exports.default = QQ_helper;
    }, {
        "../../manager/APIManager": 5,
        "../../manager/MatterManager": 7,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23
    } ],
    20: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var WX_helper_1 = require("./WX_helper");
        var BHandler_1 = require("../../utils/BHandler");
        var TimeUtil_1 = require("../../utils/TimeUtil");
        var DispatcherMrg_1 = require("../../manager/DispatcherMrg");
        var SDKBase_1 = require("../SDKBase");
        var SDKManager_1 = require("../../manager/SDKManager");
        var APIManager_1 = require("../../manager/APIManager");
        var WX = function(_super) {
            __extends(WX, _super);
            function WX() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._lastShareTime = 0;
                _this.SDKVersion = "v1.0.1";
                _this.useStageWidth = 750;
                _this.useStageHeight = 1334;
                _this._VidofailTimes = 0;
                _this._BannerFailTimes = 0;
                _this.showBannerCount = 0;
                _this.showNomoreBanner = true;
                return _this;
            }
            WX.prototype.init = function(hClass) {
                var _this = this;
                if (hClass === void 0) {
                    hClass = null;
                }
                console.log("WX Version:" + this.SDKVersion);
                if (hClass) {
                    this._helper = new hClass();
                } else {
                    this._helper = new WX_helper_1.default();
                }
                try {
                    this.base = wx;
                } catch (err) {
                    console.error("this.init Erro" + err.message);
                    return;
                }
                if (this.base) {
                    this.openDataContext = this.base.getOpenDataContext();
                    this.base.onHide(function() {
                        _this.onHide();
                    });
                    this.base.onShow(function(res) {
                        _this.onShow(res);
                    });
                    this.base.onError(function(res) {
                        _this.onError(res);
                    });
                    var manager = this.base.getUpdateManager();
                    manager.onCheckForUpdate(function(res) {
                        _this.onCheckUpdate(res);
                    });
                    manager.onUpdateReady(function() {
                        _this.onReady();
                    });
                }
                this._helper.onInit();
            };
            WX.prototype.postMsg = function(msg) {
                if (this.openDataContext) {
                    this.openDataContext.postMessage(msg);
                }
            };
            WX.prototype.openViewSize = function(iWidth, iHeight) {
                if (this.openDataContext && this.openDataContext.canvas) {
                    this.openDataContext.canvas.width = iWidth;
                    this.openDataContext.canvas.height = iHeight;
                }
            };
            Object.defineProperty(WX.prototype, "helper", {
                get: function() {
                    return this._helper;
                },
                enumerable: true,
                configurable: true
            });
            WX.prototype.onCheckUpdate = function(b) {
                this._helper.onUpdate(b);
            };
            WX.prototype.onReady = function() {
                this._helper.onReady();
            };
            WX.prototype.applyUpdate = function() {
                this.base.getUpdateManager().applyUpdate();
            };
            WX.prototype.onError = function(res) {
                var str = "";
                if (this.phoneInfo) {
                    str += "brand=" + this.phoneInfo.brand + "\n";
                    str += "model=" + this.phoneInfo.model + "\n";
                    str += "language=" + this.phoneInfo.language + "\n";
                    str += "version=" + this.phoneInfo.version + "\n";
                    str += "system=" + this.phoneInfo.system + "\n";
                    str += "platform=" + this.phoneInfo.platform + "\n";
                    str += "SDKVersion=" + this.phoneInfo.SDKVersion + "\n";
                    str += "benchmarkLevel=" + this.phoneInfo.benchmarkLevel + "\n";
                }
                str += "message=" + res.message + "\n";
                str += "stack=" + res.stack;
                if (str == "") {
                    str = "æœ‰æŠ¥é”™ï¼Œä½†æ˜¯æ²¡æœ‰æ”¶é›†åˆ°æ•°æ®";
                }
                console.error("catchErro:" + str);
                this._helper.onError(res, str);
            };
            WX.prototype.onHide = function() {
                console.log("onGameHide");
                this._helper.onHide();
                DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_Hide);
            };
            WX.prototype.onShow = function(res) {
                console.log("onGameShow", res);
                this._helper.onShow(res);
                if (this._shareTime > 0) {
                    var dt = TimeUtil_1.default.getTime() - this._shareTime;
                    if (this._shareHand) {
                        this._shareHand.runWith([ dt ]);
                    }
                }
                this._shareHand = null;
                DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_Show, res);
            };
            WX.prototype.login = function(hand) {
                var _this = this;
                var t = this;
                if (SDKManager_1.default.inst.platform != SDKManager_1.default.PlaneForm_WX) {
                    if (hand) {
                        hand.run();
                    }
                    return;
                }
                var res = this.base.getLaunchOptionsSync();
                if (res && res.query && res.query.channel) {
                    SDKManager_1.default.inst.sChannel = res.query.channel;
                    SDKManager_1.default.inst.sdk.setStorage("Stroage_Channel", SDKManager_1.default.inst.sChannel);
                } else {
                    SDKManager_1.default.inst.sChannel = SDKManager_1.default.inst.sdk.getStorage("Stroage_Channel");
                    if (!SDKManager_1.default.inst.sChannel) {
                        SDKManager_1.default.inst.sChannel = "own";
                    }
                }
                if (res && res.query && res.query.inviteId) {
                    if (res.query.shareflag == SDKManager_1.default.inst.sdk.shareflag) {
                        this.isUploadInviteInfo = true;
                        this.inviteId = res.query.inviteId;
                    }
                }
                this.base.login({
                    success: function(res) {
                        console.log("LoginRes -> æˆåŠŸ", res);
                        _this.loginData = res;
                        SDKManager_1.default.inst.code = res.code;
                        _this._helper.onLogin(res, hand, SDKManager_1.default.inst.sChannel, _this.getFappID());
                    },
                    fail: function(res) {
                        console.error("loginRes - > å¤±è´¥ ", res);
                        _this._loginState = -1;
                    }
                });
            };
            WX.prototype.getSystemInfo = function(resHandler, difSysOfy, stageWidth, stageHeight) {
                var _this = this;
                if (difSysOfy === void 0) {
                    difSysOfy = 95;
                }
                if (stageWidth === void 0) {
                    stageWidth = 750;
                }
                if (stageHeight === void 0) {
                    stageHeight = 1334;
                }
                if (!this.base) {
                    this.screenratio = stageHeight / stageWidth;
                    this.useStageWidth = stageWidth;
                    this.useStageHeight = stageHeight;
                    if (this.screenratio >= 2.06) {
                        this.sysOfy = difSysOfy;
                    }
                    if (resHandler) {
                        resHandler.run();
                    }
                    return;
                }
                this.base.getSystemInfo({
                    success: function(res) {
                        console.log("getSystemInfo - > æˆåŠŸ ", res);
                        _this.phoneInfo = res;
                        _this.screenratio = Number(res.windowHeight) / Number(res.windowWidth);
                        if (_this.screenratio >= 2.06) {
                            _this.sysOfy = difSysOfy;
                        }
                        _this._helper.onGetSystemInfo(res);
                    },
                    fail: function(failData) {
                        console.log("getSystemInfo - > å¤±è´¥ ", failData);
                    },
                    complete: function(completeData) {
                        if (resHandler != null) {
                            resHandler.run();
                        }
                    }
                });
            };
            WX.prototype.getPhonePlane = function() {
                if (!this.base) return 3;
                if (this.phoneInfo.platform.indexOf("ios") > -1 || this.phoneInfo.platform.indexOf("IOS") > -1) {
                    return 2;
                }
                if (this.phoneInfo.platform.indexOf("devtools") > -1) {
                    return 4;
                }
                return 1;
            };
            WX.prototype.platform = function() {
                if (!this.base) {
                    return "web";
                }
                return this.phoneInfo.platform;
            };
            WX.prototype.shareMenu = function(withShareTicket) {
                var _this = this;
                if (withShareTicket === void 0) {
                    withShareTicket = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.showShareMenu({
                    withShareTicket: withShareTicket,
                    success: function(successData) {
                        _this._helper.onInitShareMeun(BHandler_1.default.create(_this, function() {
                            _this.onShareAppMessage(withShareTicket);
                        }));
                    },
                    fail: function(failData) {},
                    complete: function(completeData) {}
                });
            };
            WX.prototype.onShareAppMessage = function(withShareTicket) {
                var _this = this;
                if (!this.base) {
                    return;
                }
                this.base.onShareAppMessage(function(res) {
                    return _this._helper.buildShareMenuObject();
                });
            };
            WX.prototype.showModal2 = function(params) {
                if (!this.base) return;
                this.base.showModal(params);
            };
            WX.prototype.showToast = function(sTitle, iDuration, bMask, sIcon) {
                if (iDuration === void 0) {
                    iDuration = 1e3;
                }
                if (bMask === void 0) {
                    bMask = false;
                }
                if (sIcon === void 0) {
                    sIcon = "none";
                }
                if (!this.base) {
                    console.log("WXToast:" + sTitle);
                    this._helper.showToastByWeb(sTitle, iDuration, bMask, sIcon);
                    return;
                }
                this.base.showToast({
                    title: sTitle,
                    icon: sIcon,
                    duration: iDuration,
                    mask: bMask
                });
            };
            WX.prototype.showLoading = function(sTitle, bMask) {
                if (sTitle === void 0) {
                    sTitle = "è¯·ç¨åŽ";
                }
                if (bMask === void 0) {
                    bMask = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.showLoading({
                    title: sTitle,
                    mask: bMask
                });
            };
            WX.prototype.hideLoading = function(params) {
                if (params === void 0) {
                    params = null;
                }
                if (!this.base) return;
                !params && (params = {});
                this.base.hideLoading(params);
            };
            WX.prototype.shareAppMessageByClient = function(obj, hand) {
                if (!this.base) {
                    return;
                }
                if (this._shareHand && this._shareHand.once) {
                    this._shareHand.recover();
                }
                this._shareHand = hand;
                this._shareTime = TimeUtil_1.default.getTime();
                this._helper.onShare(obj);
                this.base.shareAppMessage(obj);
            };
            WX.prototype.shareAppMessage = function(hand, queryData) {
                if (hand === void 0) {
                    hand = null;
                }
                if (queryData === void 0) {
                    queryData = null;
                }
                var tempQuery = this._helper.buildShareObject();
                if (tempQuery.query) {
                    tempQuery.query = tempQuery.query + "&inviteId=" + SDKManager_1.default.inst.openID + "&shareflag=" + this.shareflag;
                }
                this.shareAppMessageByClient(tempQuery, hand);
            };
            WX.prototype.objToString = function(obj) {
                var str = "";
                for (var i in obj) {
                    str += i + "=" + obj[i] + "&";
                }
                str = str.slice(0, str.length - 1);
                return str;
            };
            WX.prototype.setClipboardData = function(code) {
                if (!this.base) {
                    return;
                }
                this.base.setClipboardData({
                    data: code
                });
            };
            WX.prototype.previewImage = function(url, pro, hand) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                var arr = new Array();
                arr.push(this._helper.getUrl(url));
                this.base.previewImage({
                    urls: arr,
                    success: function() {
                        _this._helper.onPreviewComp(url, pro, true);
                        if (hand) {
                            hand.runWith([ true, pro ]);
                        }
                    },
                    fail: function() {
                        _this._helper.onPreviewComp(url, pro, false);
                        if (hand) {
                            hand.runWith([ false, pro ]);
                        }
                    }
                });
            };
            WX.prototype.checkVersion = function(version, isSDK) {
                if (isSDK === void 0) {
                    isSDK = true;
                }
                if (!this.base) {
                    return false;
                }
                if (this.phoneInfo) {
                    var wxVs = isSDK ? this.phoneInfo.SDKVersion : this.phoneInfo.version;
                    var wxVsArr = wxVs.split(".");
                    var checkArr = version.split(".");
                    if (checkArr.length < 3) {
                        console.error("checkVersion Erro:version - >" + version);
                        return false;
                    }
                    if (parseInt(wxVsArr[0]) > parseInt(checkArr[0])) {
                        return true;
                    }
                    if (parseInt(wxVsArr[0]) < parseInt(checkArr[0])) {
                        return false;
                    }
                    if (parseInt(wxVsArr[0]) == parseInt(checkArr[0])) {
                        if (parseInt(wxVsArr[1]) > parseInt(checkArr[1])) {
                            return true;
                        } else if (parseInt(wxVsArr[1]) < parseInt(checkArr[1])) {
                            return false;
                        } else {
                            return parseInt(wxVsArr[2]) >= parseInt(checkArr[2]);
                        }
                    }
                }
                return false;
            };
            WX.prototype.navigateToMiniProgram = function(sAppId, app, hand, spath, oExtraData, sEnvVersion) {
                var _this = this;
                if (hand === void 0) {
                    hand = null;
                }
                if (spath === void 0) {
                    spath = "";
                }
                if (oExtraData === void 0) {
                    oExtraData = null;
                }
                if (sEnvVersion === void 0) {
                    sEnvVersion = "release";
                }
                if (!this.base || !this.checkVersion("2.2.0")) {
                    if (hand && hand.once) {
                        hand.recover();
                    }
                    return;
                }
                this.base.navigateToMiniProgram({
                    appId: sAppId,
                    extraData: oExtraData,
                    path: spath,
                    envVersion: sEnvVersion,
                    success: function() {
                        _this._helper.openClick(app, true);
                        console.log("APPæ‹‰èµ·æˆåŠŸ");
                        if (hand) {
                            hand.runWith([ true ]);
                        }
                    },
                    fail: function() {
                        _this._helper.openClick(app, false);
                        console.log("APPæ‹‰èµ·å¤±è´¥");
                        if (hand) {
                            hand.runWith([ false ]);
                        }
                    }
                });
            };
            WX.prototype.vibrateShort = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
                if (this.base && this.canVibrate) {
                    this.base.vibrateShort(obj);
                }
            };
            WX.prototype.vibrateLong = function(obj) {
                if (obj === void 0) {
                    obj = {};
                }
                if (this.base && this.canVibrate) {
                    this.base.vibrateLong(obj);
                }
            };
            WX.prototype.setKeepScreenOn = function(bKeepScreenOn) {
                if (bKeepScreenOn === void 0) {
                    bKeepScreenOn = true;
                }
                if (!this.base) {
                    return;
                }
                this.base.setKeepScreenOn({
                    keepScreenOn: bKeepScreenOn,
                    success: function() {
                        console.log("WX -> setKeepScreenOn");
                    }
                });
            };
            WX.prototype.exit = function() {
                if (!this.base) {
                    return;
                }
                this.base.exitMiniProgram({});
            };
            WX.prototype.createFeedbackButton = function(type, text, image, style) {
                if (!this.base || !this.checkVersion("2.1.2")) {
                    return;
                }
                return this.base.createFeedbackButton({
                    type: type,
                    text: text,
                    image: image,
                    style: style
                });
            };
            WX.prototype.openCustomerServiceConversation = function(params) {
                if (params === void 0) {
                    params = null;
                }
                if (!this.base) return;
                this.base.openCustomerServiceConversation(params);
            };
            WX.prototype.canShowBanner = function() {
                if (this.base == null) {
                    return -1;
                }
                if (!this.checkVersion("2.0.4")) {
                    return 2;
                }
                if (this._helper.Banner_adunit == "") {
                    console.log("Warning Banner å¹¿å‘Šè¢«è°ƒç”¨äº†ï¼Œ ä½†æ˜¯å¹¶æ²¡æœ‰è®¾ç½® å•å…ƒIDã€‚è¯·å‰å¾€ WX_Helper.as è®¾ç½® Banner_adunit");
                    return 3;
                }
                if (this._BannerFailTimes >= this._helper.MaxBannerFailTimes) {
                    return 4;
                }
                return 0;
            };
            WX.prototype.showBanner = function(delay, hand, iWidth) {
                var _this = this;
                if (delay === void 0) {
                    delay = 0;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (iWidth === void 0) {
                    iWidth = -1;
                }
                this.showBannerCount += 1;
                if (this.showBannerCount % 2 == 0) {
                    this.showNomoreBanner = !this.showNomoreBanner;
                }
                if (!this.showNomoreBanner) {
                    this.startCreateGameBanner();
                    return;
                }
                var rev = this.canShowBanner();
                if (rev != 0) {
                    if (hand) {
                        hand.run();
                    }
                    return rev;
                }
                if (iWidth == -1) {
                    iWidth = this.Banner_Def_Width == 0 ? this.phoneInfo.windowWidth / 5 * 3 : this.Banner_Def_Width;
                }
                if (this.bannerAd) {
                    if (this.bannerAd.style) {
                        this.bannerAd.style.width = iWidth;
                    }
                    this.onShowBannerAD(hand, delay);
                    return 0;
                }
                this.bannerAd = this.base.createBannerAd(this._helper.getBannerObj(iWidth));
                this.bannerAd.onResize(function() {
                    if (_this.bannerAd) {
                        _this._helper.bannerResize(_this.bannerAd, _this.screenratio);
                    }
                    DispatcherMrg_1.default.ins.eventTo("Banner_OnResize", _this.bannerAd);
                });
                this.bannerAd.onError(function(msg) {
                    _this._BannerFailTimes += 1;
                    DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_BannerOnErro, msg);
                });
                this.onShowBannerAD(hand, delay);
                return rev;
            };
            WX.prototype.onShowBannerAD = function(hand, delay) {
                var _this = this;
                this.bannerShowing = true;
                if (delay > 0) {
                    setTimeout(function() {
                        if (_this.bannerAd && _this.bannerShowing) {
                            _this.bannerAd.show();
                            if (hand) {
                                hand.run();
                            }
                        }
                    }, delay);
                } else {
                    if (this.bannerAd && this.bannerShowing) {
                        this.bannerAd.show();
                        if (hand) {
                            hand.run();
                        }
                    }
                }
            };
            WX.prototype.hideBannder = function(bDestroy) {
                if (bDestroy === void 0) {
                    bDestroy = true;
                }
                if (this.bannerAd) {
                    if (bDestroy) {
                        this.bannerAd.destroy();
                        this.bannerAd = null;
                    } else {
                        this.bannerAd.hide();
                    }
                }
                if (this.gameBanner) {
                    this.hideGameBanner();
                }
                this.bannerShowing = false;
            };
            WX.prototype.canPlayVideo = function() {
                if (!this.base) {
                    return false;
                }
                if (!this.checkVersion("2.0.4")) {
                    return false;
                }
                if (!this._helper.Video_adunit) {
                    return false;
                }
                if (this._VidofailTimes > this._helper.VideoCanFailTimes) {
                    console.log("Warning è§†é¢‘å¹¿å‘Šæ‹‰èµ·å¤±è´¥æ¬¡æ•°å·²è¾¾ä¸Šé™" + this._helper.VideoCanFailTimes + "æ¬¡ï¼Œå½“æ—¥æ— æ³•ç»§ç»­æ’­æ”¾ã€‚");
                    return false;
                }
                return true;
            };
            WX.prototype.initVideoAD = function() {
                var _this = this;
                var t = this;
                if (!t.base) {
                    return false;
                }
                if (!t.canPlayVideo()) {
                    return false;
                }
                if (!t.RewardedVideo) {
                    t.RewardedVideo = t.base.createRewardedVideoAd(t._helper.getVideoObj());
                    t.RewardedVideo.onLoad(function() {
                        console.log("RewardedVideo è§†é¢‘å¹¿å‘ŠåŠ è½½å®Œæˆ");
                        t._videoState = 0;
                    });
                    t.RewardedVideo.onClose(function(s) {
                        _this.onVideoClose(s);
                    });
                    t.RewardedVideo.onError(function(msg) {
                        t._videoState = -1;
                        _this._VidofailTimes += 1;
                        if (t._videoCallBack) {
                            t._videoCallBack.runWith(false);
                            t._videoCallBack = null;
                        }
                        DispatcherMrg_1.default.ins.eventTo(SDKManager_1.default.Event_VideoOnErro, msg);
                    });
                }
                if (t.RewardedVideo) {
                    t._videoState = 2;
                    t._resolved = t.RewardedVideo.load();
                    t._resolved.then(function() {
                        return _this._videoState = 0;
                    });
                }
                return true;
            };
            WX.prototype.showVideoAd = function(compHand) {
                var t = this;
                if (t.base == null || t._videoState == 1) {
                    return -1;
                }
                var res = t.canPlayVideo();
                if (!res) {
                    return res;
                }
                if (!t.RewardedVideo) {
                    t.initVideoAD();
                }
                t._videoCallBack = compHand;
                if (t._videoState == 0) {
                    t._videoState = 1;
                    console.log("showVideoAd  å¼€å§‹æ˜¾ç¤º");
                    t.RewardedVideo.show();
                } else if (t._videoState == -1) {
                    t._videoState = 2;
                    t._resolved = t.RewardedVideo.load();
                    t._resolved.then(function() {
                        t._videoState = 0;
                        return t.showVideoAd(compHand);
                    });
                } else if (t._videoState == 2) {
                    if (t._resolved) {
                        t._resolved.then(function() {
                            return t.showVideoAd(compHand);
                        });
                    }
                }
                return 0;
            };
            WX.prototype.onVideoClose = function(res) {
                this._videoState = -1;
                var b = false;
                if (this.checkVersion("2.1.0")) {
                    if (res && res.isEnded || res === undefined) {
                        this._helper.VideoHasPlayCount += 1;
                        b = true;
                    } else {
                        b = false;
                    }
                } else {
                    b = true;
                    this._helper.VideoHasPlayCount += 1;
                }
                console.log("è§†é¢‘è¢«å…³é—­ å·²ç»çœ‹å®Œï¼š" + this._helper.VideoHasPlayCount + "æ¬¡");
                this._helper.onVideoClose(b);
                if (this._videoCallBack) {
                    this._videoCallBack.runWith(b);
                }
            };
            WX.prototype.getStorage = function(sKey, defVal, toServer, hand) {
                if (defVal === void 0) {
                    defVal = null;
                }
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (!this.base) {
                    if (hand) {
                        hand.runWith([ 1, null ]);
                    }
                    return defVal;
                }
                var datas = null;
                try {
                    datas = this.base.getStorageSync(sKey);
                } catch (e) {
                    console.error("èŽ·å–æœ¬åœ°å­˜å‚¨å¼‚å¸¸ ->", e);
                }
                if (!datas || datas === "NaN") {
                    datas = defVal;
                    if (toServer) {
                        APIManager_1.default.inst.api.report(BHandler_1.default.create(this, function(data) {
                            if (hand) {
                                hand.runWith([ data ]);
                            }
                        }), sKey, null);
                        return datas;
                    }
                }
                if (hand) {
                    hand.runWith([ {
                        skye: datas
                    } ]);
                }
                return datas;
            };
            WX.prototype.setStorage = function(skey, value, toServer, hand, isAsyh) {
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (isAsyh === void 0) {
                    isAsyh = false;
                }
                if (!this.base) {
                    return;
                }
                var str = typeof value;
                try {
                    if (isAsyh) {
                        this.base.setStorage(skey, value);
                    } else {
                        this.base.setStorageSync(skey, value);
                    }
                } catch (e) {
                    console.error("ä¿å­˜æœ¬åœ°å­˜å‚¨ å¼‚å¸¸ e ->", e);
                }
                if (toServer) {
                    APIManager_1.default.inst.api.report(hand, skey, JSON.stringify(value));
                }
            };
            WX.prototype.pay = function(num, hand, zone) {
                var _this = this;
                if (zone === void 0) {
                    zone = "1";
                }
                var t = this;
                if (!t._wx || this.getPhonePlane() == 2) {
                    console.log("çŽ¯å¢ƒä¸æ”¯æŒæ”¯ä»˜");
                    return;
                }
                num = parseInt(num + "");
                if (num <= 0) {
                    this.showToast("æ”¯ä»˜é‡‘é¢ä¸å¾—å°äºŽ0");
                    if (hand) {
                        hand.runWith([ false, num, zone ]);
                    }
                    return;
                }
                var pro = {};
                pro["mode"] = "game";
                pro["env"] = t._helper.PayEnv;
                pro["offerId"] = t._helper.offerID;
                pro["currencyType"] = "CNY";
                pro["platform"] = "android";
                pro["buyQuantity"] = num;
                pro["zoneId"] = zone;
                pro["success"] = function() {
                    if (hand) {
                        hand.runWith([ true, num, zone ]);
                    }
                    t._helper.onPayComp(true, num, zone);
                };
                pro["fail"] = function(res) {
                    _this.showModal("æ”¯ä»˜å¤±è´¥", res.errCode + ":" + res.errMsg, BHandler_1.default.create(_this, function() {
                        if (hand) {
                            hand.runWith([ false, num, zone ]);
                        }
                        t._helper.onPayComp(false, num, zone);
                    }));
                };
                t._wx.requestMidasPayment(pro);
            };
            WX.prototype.clearStorage = function() {
                if (this.base) {
                    this.base.clearStorageSync();
                }
            };
            WX.prototype.eventPost = function(sCode, sKey, val, hand, sExtend) {
                if (sCode === void 0) {
                    sCode = "";
                }
                if (sKey === void 0) {
                    sKey = "";
                }
                if (val === void 0) {
                    val = null;
                }
                if (hand === void 0) {
                    hand = null;
                }
                if (sExtend === void 0) {
                    sExtend = "";
                }
                var fun = this.base["aldSendEvent"];
                if (this.base && fun) {
                    var sendObj = {};
                    if (sKey) {
                        sendObj[sKey] = val;
                    }
                    if (sExtend) {
                        sendObj["extend"] = sExtend;
                    }
                    fun(sCode, sendObj);
                }
            };
            WX.prototype.authorize = function(hand, rect) {
                var _this = this;
                if (!this.base) {
                    if (hand) {
                        hand.runWith([ false ]);
                    }
                    return;
                }
                this.base.getSetting({
                    success: function(sucData) {
                        console.log("getSetting - > æˆåŠŸ ", sucData);
                        if (!sucData.authSetting["scope.userInfo"]) {
                            _this.createUserInfoButton(hand, rect);
                        } else {
                            console.log("å·²æŽˆæƒè¿‡äº†");
                            _this.getUserInfo(hand);
                        }
                    }
                });
            };
            WX.prototype.createUserInfoButton = function(hand, rect) {
                var _this = this;
                if (!this.phoneInfo) {
                    if (hand) {
                        hand.runWith([ false ]);
                    }
                    console.error("æŽˆæƒæ—¶å°šæœªèŽ·å¾—è®¾å¤‡ä¿¡æ¯");
                    return;
                }
                var w = Number(this.phoneInfo.windowWidth) / this.useStageWidth;
                var h = Number(this.phoneInfo.windowHeight) / this.useStageHeight;
                this.UserInfoButton = this.base.createUserInfoButton({
                    type: "text",
                    text: "",
                    style: {
                        left: w * rect.x,
                        top: h * rect.y,
                        width: w * rect.width,
                        height: h * rect.height,
                        lineHeight: 0,
                        backgroundColor: "#ff000000",
                        textAlign: "center",
                        fontSize: 16,
                        borderRadius: 0
                    }
                });
                this.UserInfoButton.onTap(function(res) {
                    if (res) {
                        if (res.errMsg.indexOf("auth deny") > -1 || res.errMsg.indexOf("auth denied") > -1) {
                            console.log(res.errMsg);
                            if (hand) {
                                hand.runWith([ false ]);
                            }
                        } else {
                            _this.destroyUserInfoButton();
                            SDKManager_1.default.inst.userInfo = res;
                            console.log("UserInfoButton ç”¨æˆ·æŽˆæƒ", res);
                            _this._helper.onGetUserInfo(res);
                            _this.getUserInfo(BHandler_1.default.create(_this, function(b) {
                                if (hand) {
                                    hand.runWith([ b ]);
                                }
                            }));
                        }
                    }
                });
            };
            WX.prototype.getUserInfo = function(hand) {
                this.base.getUserInfo({
                    openIdList: [ "selfOpenId" ],
                    fail: function(res) {
                        console.log("getUserInfo - > å¤±è´¥ ", res);
                        if (hand) {
                            hand.runWith([ false ]);
                        }
                    },
                    success: function(successData) {
                        console.log("getUserInfo - > æˆåŠŸ ", successData);
                        SDKManager_1.default.inst.userInfo = successData;
                        SDKManager_1.default.inst.sdk.postMsg({
                            type: "userInfoData",
                            data: successData
                        });
                        if (hand) {
                            hand.runWith([ true ]);
                        }
                    }
                });
            };
            WX.prototype.destroyUserInfoButton = function() {
                if (this.UserInfoButton) {
                    this.UserInfoButton.destroy();
                }
            };
            WX.prototype.getSystemInfoSnc = function(hand) {
                if (hand === void 0) {
                    hand = null;
                }
                var t = this;
                if (this.base && this.base.getSystemInfoSync) {
                    try {
                        var res = wx.getSystemInfoSync();
                        if (t.checkVersion2("2.7.5", res.SDKVersion)) {
                            t.isCanUseGameExt = true;
                            if (hand) {
                                hand.run();
                            }
                        }
                    } catch (e) {
                        console.log(e, "==============e==============");
                    }
                } else {
                    console.log("getSystemInfoSnc=====2", this.base.getSystemInfoSync);
                }
            };
            WX.prototype.startCreateGamePortal = function() {
                if (this.isCanUseGameExt) {
                    if (!this.gamePortal) {
                        this.createGamePortal();
                    } else {
                        this.gamePortal.show();
                    }
                } else {
                    if (!this.gamePortal) {
                        this.getSystemInfoSnc(BHandler_1.default.create(this, this.createGamePortal));
                    }
                }
            };
            WX.prototype.createGamePortal = function() {
                this.gamePortal = this.base.createGamePortal({
                    adUnitId: "PBgAAG5gk1lUbYgQ"
                });
                if (this.gamePortal) {
                    var t_1 = this.gamePortal;
                    t_1.load();
                    t_1.onLoad(function() {
                        console.log("å°æ¸¸æˆæŽ¨èå¼¹çª—ç»„ä»¶åŠ è½½æˆåŠŸ");
                        t_1.show();
                        t_1.offLoad();
                    });
                }
            };
            WX.prototype.startCreateGameBanner = function() {
                if (this.isCanUseGameExt) {
                    if (!this.gameBanner) {
                        this.createGameBanner();
                    } else {
                        this.hideGameBanner();
                        this.createGameBanner();
                    }
                } else {
                    if (!this.gameBanner) {
                        this.getSystemInfoSnc(BHandler_1.default.create(this, this.createGameBanner));
                    }
                }
            };
            WX.prototype.createGameBanner = function() {
                var _this = this;
                this.gameBanner = this.base.createGameBanner({
                    adUnitId: "PBgAAG5gk1lZRwjg",
                    style: {
                        left: 0,
                        top: 0
                    }
                });
                if (this.gameBanner) {
                    this.gameBanner.onLoad(function() {
                        _this.gameBanner.show();
                        console.log("æˆæŽ¨èbannerç»„ä»¶=========æˆåŠŸ====");
                    });
                    this.gameBanner.onResize(function() {
                        this.gameBanner.style.left = (SDKManager_1.default.inst.phoneInfo.windowWidth - this.gameBanner.style.width) * .5;
                        this.gameBanner.style.top = SDKManager_1.default.inst.phoneInfo.windowHeight - this.gameBanner.style.height;
                    }.bind(this));
                    this.gameBanner.onError(function() {
                        console.log("å°æ¸¸æˆæŽ¨bannerç»„ä»¶å‡ºé”™");
                    });
                } else {
                    console.log("===this.gameBanner====åˆ›å»ºå¤±è´¥");
                }
            };
            WX.prototype.hideGameBanner = function() {
                if (this.gameBanner) {
                    this.gameBanner.offError();
                    this.gameBanner.offResize();
                    this.gameBanner.destroy();
                    this.gameBanner = null;
                }
            };
            WX.prototype.checkVersion2 = function(version, wxVs) {
                if (!this.base) {
                    return false;
                }
                if (this.phoneInfo) {
                    var wxVsArr = wxVs.split(".");
                    var checkArr = version.split(".");
                    if (checkArr.length < 3) {
                        console.error("checkVersion Erro:version - >" + version);
                        return false;
                    }
                    if (parseInt(wxVsArr[0]) > parseInt(checkArr[0])) {
                        return true;
                    }
                    if (parseInt(wxVsArr[0]) < parseInt(checkArr[0])) {
                        return false;
                    }
                    if (parseInt(wxVsArr[0]) == parseInt(checkArr[0])) {
                        if (parseInt(wxVsArr[1]) > parseInt(checkArr[1])) {
                            return true;
                        } else if (parseInt(wxVsArr[1]) < parseInt(checkArr[1])) {
                            return false;
                        } else {
                            return parseInt(wxVsArr[2]) >= parseInt(checkArr[2]);
                        }
                    }
                }
                return false;
            };
            return WX;
        }(SDKBase_1.default);
        exports.default = WX;
    }, {
        "../../manager/APIManager": 5,
        "../../manager/DispatcherMrg": 6,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23,
        "../../utils/TimeUtil": 26,
        "../SDKBase": 12,
        "./WX_helper": 21
    } ],
    21: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BHandler_1 = require("../../utils/BHandler");
        var APIManager_1 = require("../../manager/APIManager");
        var SDKManager_1 = require("../../manager/SDKManager");
        var MatterManager_1 = require("../../manager/MatterManager");
        var WX_helper = function() {
            function WX_helper() {
                this.offerID = "";
                this.PayEnv = 1;
                this.VideoMaxPlayCount = 8;
                this.VideoHasPlayCount = 0;
                this.Video_adunit = "";
                this.Banner_adunit = "";
                this.DefShareTitle = "";
                this.DefShareImgString = "";
                this.VideoCanFailTimes = 1;
                this.MaxBannerFailTimes = 1;
                this.version = "v1.0.0";
                console.log("WX helper Version:" + this.version);
            }
            WX_helper.prototype.onInit = function() {};
            WX_helper.prototype.onHide = function() {};
            WX_helper.prototype.onShow = function(res) {};
            WX_helper.prototype.onError = function(res, msg) {
                APIManager_1.default.inst.api.uploadError(1e3, msg, null);
            };
            WX_helper.prototype.onLogin = function(res, hand, sChannel, fAppid) {
                APIManager_1.default.inst.api.login(res.code, sChannel, BHandler_1.default.create(this, function(data) {
                    if (data && (data.status == 1 || data.code == 1)) {} else {
                        SDKManager_1.default.inst.sdk.showToast("æ¸¸æˆç™»å½•ä¿¡æ¯èŽ·å–å¤±è´¥");
                    }
                    if (hand) {
                        hand.run();
                    }
                }), fAppid);
            };
            WX_helper.prototype.onPayComp = function(isPay, buyNum, zone) {};
            WX_helper.prototype.onReady = function() {
                SDKManager_1.default.inst.sdk.showModal2({
                    title: "æ›´æ–°æç¤º",
                    content: "æ–°ç‰ˆæœ¬å·²ç»å‡†å¤‡å¥½ï¼Œæ˜¯å¦é‡å¯åº”ç”¨ï¼Ÿ",
                    success: function(res) {
                        if (res.confirm) {
                            SDKManager_1.default.inst.sdk.applyUpdate();
                        } else {
                            SDKManager_1.default.inst.sdk.exit();
                        }
                    }
                });
            };
            WX_helper.prototype.onUpdate = function(hasUpdate) {
                console.log("Update:", hasUpdate);
            };
            WX_helper.prototype.onGetSystemInfo = function(res) {
                console.log("SystemInfo ->", res);
            };
            WX_helper.prototype.onInitShareMeun = function(hand) {
                if (hand) {
                    hand.run();
                }
            };
            WX_helper.prototype.buildShareObject = function() {
                return this.buildShareMenuObject();
            };
            WX_helper.prototype.buildShareMenuObject = function() {
                var info = MatterManager_1.default.inst.getShareInfo();
                if (!info) {
                    console.warn("æ²¡æœ‰èŽ·å–åˆ°åˆ†äº«é…ç½®ä¿¡æ¯");
                    return {
                        imageUrl: this.DefShareImgString,
                        title: this.DefShareTitle
                    };
                }
                return {
                    imageUrl: info.share_img,
                    title: info.share_title,
                    query: info.share_path,
                    info: info
                };
            };
            WX_helper.prototype.showToastByWeb = function(sTitle, iDuration, bMask, sIcon) {
                if (iDuration === void 0) {
                    iDuration = 1e3;
                }
                if (bMask === void 0) {
                    bMask = false;
                }
                if (sIcon === void 0) {
                    sIcon = "none";
                }
                console.log(sTitle);
            };
            WX_helper.prototype.getUrl = function(url) {
                return url;
            };
            WX_helper.prototype.onPreviewComp = function(url, pro, scc) {
                APIManager_1.default.inst.api.openClick(pro, 1, scc);
            };
            WX_helper.prototype.onShare = function(pro) {
                APIManager_1.default.inst.api.stat("share", null, pro);
            };
            WX_helper.prototype.openClick = function(pro, scc) {
                APIManager_1.default.inst.api.openClick(pro, 0, scc);
            };
            WX_helper.prototype.getBannerObj = function(iWidth) {
                var obj = {};
                obj["adUnitId"] = this.Banner_adunit;
                obj["style"] = {
                    left: 0,
                    top: 0,
                    width: iWidth
                };
                return obj;
            };
            WX_helper.prototype.getVideoObj = function() {
                return {
                    adUnitId: this.Video_adunit
                };
            };
            WX_helper.prototype.bannerResize = function(ad, screenratio) {
                var temp = screenratio > 17 / 8 ? ad.style.realHeight + 25 : ad.style.realHeight;
                ad.style.left = SDKManager_1.default.inst.phoneInfo.windowWidth / 2 - ad.style.realWidth / 2;
                ad.style.top = SDKManager_1.default.inst.phoneInfo.windowHeight - temp;
            };
            WX_helper.prototype.onVideoClose = function(isComp) {
                if (isComp) {
                    APIManager_1.default.inst.api.stat("video");
                }
            };
            WX_helper.prototype.onGetUserInfo = function(res) {
                if (!res) {
                    return;
                }
                APIManager_1.default.inst.api.setUserData(res.encryptedData, res.iv);
            };
            return WX_helper;
        }();
        exports.default = WX_helper;
    }, {
        "../../manager/APIManager": 5,
        "../../manager/MatterManager": 7,
        "../../manager/SDKManager": 8,
        "../../utils/BHandler": 23
    } ],
    22: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var SDKBase_1 = require("../SDKBase");
        var WebTest = function(_super) {
            __extends(WebTest, _super);
            function WebTest() {
                return _super.call(this) || this;
            }
            WebTest.prototype.init = function(c) {
                this.helper = new c();
            };
            WebTest.prototype.getSystemInfo = function(hand) {
                if (hand) {
                    hand.run();
                }
            };
            WebTest.prototype.getStorage = function(key, defVal, toServer, hand) {
                if (defVal === void 0) {
                    defVal = null;
                }
                if (toServer === void 0) {
                    toServer = false;
                }
                if (hand === void 0) {
                    hand = null;
                }
                return defVal;
            };
            WebTest.prototype.login = function(hand) {
                if (hand) {
                    hand.run();
                }
            };
            WebTest.prototype.showToast = function(title) {
                console.log(title);
            };
            return WebTest;
        }(SDKBase_1.default);
        exports.default = WebTest;
    }, {
        "../SDKBase": 12
    } ],
    23: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BHandler = function() {
            function BHandler(caller, method, args, once) {
                if (caller === void 0) {
                    caller = null;
                }
                if (method === void 0) {
                    method = null;
                }
                if (args === void 0) {
                    args = null;
                }
                if (once === void 0) {
                    once = false;
                }
                this.once = false;
                this._id = 0;
                this.setTo(caller, method, args, once);
            }
            BHandler.prototype.setTo = function(caller, method, args, once) {
                this._id = BHandler.gid++;
                this.caller = caller;
                this.method = method;
                this.args = args;
                this.once = once;
                return this;
            };
            BHandler.prototype.run = function() {
                if (this.method == null) return null;
                var id = this._id;
                var result = this.method.apply(this.caller, this.args);
                if (this._id === id && this.once) {
                    this.recover();
                }
                return result;
            };
            BHandler.prototype.runWith = function(data) {
                if (this.method == null) {
                    return null;
                }
                var id = this._id;
                var result;
                if (data == null) {
                    result = this.method.apply(this.caller, this.args);
                } else if (!this.args && !data.unshift) {
                    result = this.method.call(this.caller, data);
                } else if (this.args) {
                    result = this.method.apply(this.caller, this.args.concat(data));
                } else {
                    result = this.method.apply(this.caller, data);
                }
                if (this._id === id && this.once) {
                    this.recover();
                }
                return result;
            };
            BHandler.prototype.recover = function() {
                if (this._id > 0) {
                    this._id = 0;
                    BHandler._pool.push(this.clear());
                }
            };
            BHandler.prototype.clear = function() {
                this.caller = null;
                this.method = null;
                this.args = null;
                return this;
            };
            BHandler.create = function(caller, method, args, once) {
                if (args === void 0) {
                    args = null;
                }
                if (once === void 0) {
                    once = true;
                }
                if (BHandler._pool.length) {
                    return BHandler._pool.pop().setTo(caller, method, args, once);
                }
                return new BHandler(caller, method, args, once);
            };
            BHandler._pool = [];
            BHandler.gid = 1;
            return BHandler;
        }();
        exports.default = BHandler;
    }, {} ],
    24: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Dictionary = function() {
            function Dictionary() {
                this._values = [];
                this._keys = [];
            }
            Object.defineProperty(Dictionary.prototype, "values", {
                get: function() {
                    return this._values;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Dictionary.prototype, "keys", {
                get: function() {
                    return this._keys;
                },
                enumerable: true,
                configurable: true
            });
            Dictionary.prototype.set = function(key, value) {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this._values[index] = value;
                    return;
                }
                this._keys.push(key);
                this._values.push(value);
            };
            Dictionary.prototype.indexOf = function(key) {
                var index = this._keys.indexOf(key);
                if (index >= 0) {
                    return index;
                }
                key = typeof key == "string" ? Number(key) : typeof key == "number" ? key.toString() : key;
                return this._keys.indexOf(key);
            };
            Dictionary.prototype.get = function(key) {
                if (this.ContainsKey(key)) {
                    var index = this.indexOf(key);
                    return index < 0 ? null : this._values[index];
                }
                return null;
            };
            Dictionary.prototype.remove = function(key) {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this._keys.splice(index, 1);
                    this._values.splice(index, 1);
                    return true;
                }
                return false;
            };
            Dictionary.prototype.ContainsKey = function(key) {
                return this.indexOf(key) > -1;
            };
            Dictionary.prototype.clear = function() {
                this._values.length = 0;
                this._keys.length = 0;
            };
            return Dictionary;
        }();
        exports.default = Dictionary;
    }, {} ],
    25: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var E_U = function() {
            function E_U() {}
            E_U.checkTypeOf = function(c, v) {
                if (typeof c === "number") {
                    return Number(v);
                } else if (typeof c === "string") {
                    return String(v);
                }
                return v;
            };
            E_U.addDatas = function(orgArr, newDatas) {
                for (var i = 0; i < newDatas.length; i++) {
                    orgArr.push(newDatas[i]);
                }
            };
            E_U.vectorToArray = function(vs) {
                var arr = [];
                for (var i = 0; i < vs.length; i++) {
                    arr.push(vs[i]);
                }
                return arr;
            };
            E_U.chatToAscii = function(s) {
                var character = s.split("");
                var ascii = "";
                for (var i = 0; i < character.length; i++) {
                    var code = Number(character[i].charCodeAt(0));
                    if (code > 127) {
                        var charAscii = code.toString(16);
                        charAscii = new String("0000").substring(charAscii.length, 4) + charAscii;
                        ascii += "\\u" + charAscii;
                    } else {
                        ascii += character[i];
                    }
                }
                return ascii;
            };
            E_U.asciiToChat = function(s) {
                var character = s.split("\\u");
                var native1 = character[0];
                for (var i = 1; i < character.length; i++) {
                    var code = character[i];
                    native1 += String.fromCharCode(parseInt("0x" + code.substring(0, 4)));
                    if (code.length > 4) {
                        native1 += code.substring(4, code.length);
                    }
                }
                return native1;
            };
            E_U.int2 = function(value) {
                if (value === undefined || value === null) {
                    return 0;
                } else if (typeof value === "number") {
                    return Math.floor(value);
                }
                return parseInt(value);
            };
            return E_U;
        }();
        exports.default = E_U;
    }, {} ],
    26: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var E_U_1 = require("./E_U");
        var TimeUtil = function() {
            function TimeUtil() {}
            TimeUtil.setServerTime = function(time) {
                this.lastUpdateTime = this.getTime();
                this.serverTime = time;
            };
            TimeUtil.getServerTime = function() {
                var dif = this.getTime() - this.lastUpdateTime;
                return this.serverTime + dif;
            };
            TimeUtil.getServerTimeDifference = function() {
                var dif = this.getTime() - this.lastUpdateTime;
                return this.serverTime + dif + this._date.getTimezoneOffset() * 6e4 - this.recordTimeZoneDiffMiSec * 6e4;
            };
            TimeUtil.timeZoneConversion = function(time) {
                var d = new Date();
                d.setTime(time);
                if (d.getTimezoneOffset() != this.recordTimeZoneDiffMiSec) {
                    d.setTime(d.getTime() - (d.getTimezoneOffset() - this.recordTimeZoneDiffMiSec) * 6e4);
                }
                return d.getTime();
            };
            TimeUtil.timeZoneReConversion = function(time) {
                var d = new Date();
                d.setTime(time);
                if (d.getTimezoneOffset() != this.recordTimeZoneDiffMiSec) {
                    d.setTime(d.getTime() + (d.getTimezoneOffset() - this.recordTimeZoneDiffMiSec) * 6e4);
                }
                return d.getTime();
            };
            TimeUtil.getConfigTime = function(ch, cm, cs) {
                if (cm === void 0) {
                    cm = 0;
                }
                if (cs === void 0) {
                    cs = 0;
                }
                var t = this.getServerTimeDifference();
                this._configDate = null;
                this._configDate = new Date(t);
                this._configDate.setHours(ch);
                this._configDate.setMinutes(cm);
                this._configDate.setSeconds(cs);
                if (this._configDate.getTime() > t) return this.timeZoneConversion(this._configDate.getTime());
                return this.timeZoneConversion(this._configDate.getTime() + this.oneDayToMillisecends);
            };
            TimeUtil.getTime = function() {
                var data = new Date();
                return data.getTime();
            };
            TimeUtil.parseDate = function(time, doc, passDay) {
                if (doc === void 0) {
                    doc = "-";
                }
                if (passDay === void 0) {
                    passDay = TimeUtil.TODAY;
                }
                time = time + passDay * 864e5;
                var d = new Date();
                d.setTime(time);
                var monthStr;
                var dateStr;
                var hourStr;
                var minutesStr;
                var secondStr;
                if (E_U_1.default.int2(d.getMonth() + 1) < 10) {
                    monthStr = "0" + String(d.getMonth() + 1);
                } else {
                    monthStr = String(d.getMonth() + 1);
                }
                if (E_U_1.default.int2(d.getDate()) < 10) {
                    dateStr = "0" + String(d.getDate());
                } else {
                    dateStr = String(d.getDate());
                }
                var rtn = d.getFullYear() + doc + monthStr + doc + dateStr;
                return rtn;
            };
            TimeUtil.toTimeFromLong = function(ms) {
                var d = new Date();
                d.setTime(ms);
                var monthStr;
                var dateStr;
                var hourStr;
                var minutesStr;
                var secondStr;
                if (E_U_1.default.int2(d.getMonth() + 1) < 10) {
                    monthStr = "0" + String(d.getMonth() + 1);
                } else {
                    monthStr = String(d.getMonth() + 1);
                }
                if (E_U_1.default.int2(d.getDate()) < 10) {
                    dateStr = "0" + String(d.getDate());
                } else {
                    dateStr = String(d.getDate());
                }
                if (E_U_1.default.int2(d.getHours()) < 10) {
                    hourStr = "0" + String(d.getHours());
                } else {
                    hourStr = String(d.getHours());
                }
                if (E_U_1.default.int2(d.getMinutes()) < 10) {
                    minutesStr = "0" + String(d.getMinutes());
                } else {
                    minutesStr = String(d.getMinutes());
                }
                if (E_U_1.default.int2(d.getSeconds()) < 10) {
                    secondStr = "0" + String(d.getSeconds());
                } else {
                    secondStr = String(d.getSeconds());
                }
                var rtn = d.getFullYear() + "-" + monthStr + "-" + dateStr + " " + hourStr + ":" + minutesStr + ":" + secondStr;
                return rtn;
            };
            TimeUtil.toTimeFromParam = function(year, month, date, hour, minute, second) {
                var d = new Date(year, month - 1, date, hour, minute, second, 0);
                return d.getTime();
            };
            TimeUtil.toTimeMinuteString = function(seconds) {
                var rtn = "";
                var h = E_U_1.default.int2(seconds / 3600);
                var m = E_U_1.default.int2((seconds - h * 3600) / 60);
                var s = E_U_1.default.int2(seconds % 60);
                if (m <= 0) {
                    rtn += "00:";
                } else if (m < 10) {
                    rtn += "0" + m + ":";
                } else {
                    rtn += m + ":";
                }
                if (s <= 0) {
                    rtn += "00";
                } else if (s < 10) {
                    rtn += "0" + s;
                } else {
                    rtn += s;
                }
                return rtn;
            };
            TimeUtil.toTimeHourString = function(seconds) {
                var d = new Date();
                d.setTime(seconds * 1e3);
                var rtn = "";
                if (d.getHours() <= 0) {
                    rtn += "00:";
                } else if (d.getHours() < 10) {
                    rtn += "0" + d.getHours() + ":";
                } else {
                    rtn += d.getHours() + ":";
                }
                if (d.getMinutes() <= 0) {
                    rtn += "00";
                } else if (d.getMinutes() < 10) {
                    rtn += "0" + d.getMinutes() + "";
                } else {
                    rtn += d.getMinutes() + "";
                }
                return rtn;
            };
            TimeUtil.toTimeString = function(seconds) {
                var rtn = "";
                var h = E_U_1.default.int2(seconds / 3600);
                var m = E_U_1.default.int2((seconds - h * 3600) / 60);
                var s = E_U_1.default.int2(seconds % 60);
                if (h <= 0) {
                    rtn += "00:";
                } else if (h < 10) {
                    rtn += "0" + h + ":";
                } else {
                    rtn += h + ":";
                }
                if (m <= 0) {
                    rtn += "00:";
                } else if (m < 10) {
                    rtn += "0" + m + ":";
                } else {
                    rtn += m + ":";
                }
                if (s <= 0) {
                    rtn += "00";
                } else if (s < 10) {
                    rtn += "0" + s;
                } else {
                    rtn += s;
                }
                return rtn;
            };
            TimeUtil.isPassData = function(lastTime, currentTime) {
                var boo = false;
                var lastLongTimeStr = TimeUtil.toTimeFromLong(lastTime);
                var curLongTimeStr = TimeUtil.toTimeFromLong(currentTime);
                var lastYear = E_U_1.default.int2(lastLongTimeStr.substr(0, 4));
                var curYear = E_U_1.default.int2(curLongTimeStr.substr(0, 4));
                if (curYear > lastYear) {
                    boo = true;
                }
                var lastMonth = E_U_1.default.int2(lastLongTimeStr.substr(5, 2));
                var curMonth = E_U_1.default.int2(curLongTimeStr.substr(5, 2));
                if (curMonth > lastMonth) {
                    boo = true;
                }
                var lastDay = E_U_1.default.int2(lastLongTimeStr.substr(8, 2));
                var curDay = E_U_1.default.int2(curLongTimeStr.substr(8, 2));
                if (curDay > lastDay) {
                    boo = true;
                }
                return boo;
            };
            TimeUtil.exceedDays = function(lastTime, currentTime, hour) {
                if (hour === void 0) {
                    hour = 0;
                }
                lastTime += 288e5;
                currentTime += 288e5;
                lastTime -= hour * 36e5;
                currentTime -= hour * 36e5;
                if (lastTime > currentTime) {
                    return E_U_1.default.int2(E_U_1.default.int2(lastTime / 864e5) - E_U_1.default.int2(currentTime / 864e5));
                } else {
                    return E_U_1.default.int2(E_U_1.default.int2(currentTime / 864e5) - E_U_1.default.int2(lastTime / 864e5));
                }
            };
            TimeUtil.getDifferenceHours = function(lastTime, currentTime) {
                var diffMillisecends = currentTime - lastTime;
                diffMillisecends = E_U_1.default.int2(diffMillisecends / 1e3 / 60 / 60);
                return diffMillisecends;
            };
            TimeUtil.getDifferenceDays = function(lastTime, currentTime) {
                var diffMillisecends = currentTime - lastTime;
                diffMillisecends = E_U_1.default.int2(diffMillisecends / 1e3 / 60 / 60 / 24);
                return diffMillisecends;
            };
            TimeUtil.getTimeFormLong = function(time) {
                var timer = new Date(time);
                return timer.getFullYear() + "å¹´" + timer.getMonth() + "æœˆ" + timer.getDay() + "æ—¥" + " " + timer.getHours() + "æ—¶" + timer.getMinutes() + "åˆ†" + timer.getSeconds() + "ç§’";
            };
            TimeUtil.puz = function(n) {
                return n < 10 ? "0" + n : n + "";
            };
            TimeUtil.getSurplusTime = function(lastTime, nowTime) {
                return Math.ceil((lastTime - nowTime) / 1e3);
            };
            TimeUtil.isOutTime = function(rTime, outTime) {
                if (TimeUtil.getServerTime() > rTime + outTime) return true;
                return false;
            };
            TimeUtil.getPerTimeStr = function(preTime) {
                var time = TimeUtil.getServerTime() - preTime;
                var minutes = 60 * 1e3;
                var hours = 60 * 60 * 1e3;
                var days = 24 * hours;
                if (time > days) {
                    return Math.floor(time / days) + "å¤©å‰";
                }
                if (time > hours) {
                    return Math.floor(time / hours) + "å°æ—¶å‰";
                }
                if (time > minutes) {
                    return Math.floor(time / minutes) + "åˆ†é’Ÿå‰";
                }
                return "åˆšåˆš";
            };
            TimeUtil.lastUpdateTime = 0;
            TimeUtil.serverTime = 0;
            TimeUtil.lastUpdateGameTime = 0;
            TimeUtil.DATETIME_ONE_MINUTE = 60 * 1e3;
            TimeUtil.ONE_MINUTE_SECENDS = 60;
            TimeUtil.oneHourMillisecneds = 60 * 60 * 1e3;
            TimeUtil.oneHourSecends = 60 * 60;
            TimeUtil.oneDayToMillisecends = 24 * 60 * 60 * 1e3;
            TimeUtil.recordTimeZoneDiffMiSec = -8 * 60;
            TimeUtil.DAY_BEFORE_YESTERDAY = -2;
            TimeUtil.YESTERDAY = -1;
            TimeUtil.TODAY = 0;
            return TimeUtil;
        }();
        exports.default = TimeUtil;
    }, {
        "./E_U": 25
    } ],
    27: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ConfigManager = function() {
            function ConfigManager() {}
            ConfigManager.AddConfig = function(configName) {
                if (ConfigManager._configList == null) {
                    ConfigManager._configList = [];
                }
                ConfigManager._configList.push(configName);
            };
            ConfigManager.StartLoad = function(onFinished) {
                var loadUrls = [];
                for (var _i = 0, _a = ConfigManager._configList; _i < _a.length; _i++) {
                    var configName = _a[_i];
                    loadUrls.push(configName.path);
                }
                Laya.loader.create(loadUrls, Laya.Handler.create(this, function() {
                    for (var _i = 0, _a = ConfigManager._configList; _i < _a.length; _i++) {
                        var configName = _a[_i];
                        configName.data = Laya.loader.getRes(configName.path);
                        configName.dataList = [];
                        for (var configKey in configName.data) {
                            var value = configName.data[configKey];
                            if (value != null) {
                                configName.dataList.push(value);
                            }
                        }
                    }
                    onFinished.run();
                }));
            };
            return ConfigManager;
        }();
        exports.ConfigManager = ConfigManager;
    }, {} ],
    28: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BaseState = function() {
            function BaseState() {}
            BaseState.prototype.OnEnter = function(exitState, param) {};
            BaseState.prototype.OnRunning = function(param) {};
            BaseState.prototype.OnExit = function(enterState, param) {};
            return BaseState;
        }();
        exports.default = BaseState;
    }, {} ],
    29: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTDictionary_1 = require("../LTUtils/LTDictionary");
        var StateMachine = function() {
            function StateMachine() {
                this._states = new LTDictionary_1.default();
            }
            Object.defineProperty(StateMachine.prototype, "count", {
                get: function() {
                    return this._states.count;
                },
                enumerable: true,
                configurable: true
            });
            StateMachine.prototype.Add = function(addState) {
                return this._states.Add(addState.id, addState);
            };
            StateMachine.prototype.Remove = function(id) {
                return this._states.Remove(id);
            };
            StateMachine.prototype.RemoveAll = function() {
                this._states.Clear();
                this.currState = null;
            };
            StateMachine.prototype.ExitCurrState = function(param) {
                if (param === void 0) {
                    param = null;
                }
                if (null != this.currState) {
                    this.currState.OnExit(null, param);
                    this.currState = null;
                }
            };
            StateMachine.prototype.ChangeState = function(id, param) {
                if (param === void 0) {
                    param = null;
                }
                var state = this.Find(id);
                if (state != null) {
                    if (null != this.currState) {
                        this.currState.OnExit(state, param);
                    }
                    this.lastState = this.currState;
                    this.currState = state;
                    state.OnEnter(this.lastState, param);
                    return true;
                }
                console.error("ä¸å­˜åœ¨çš„çŠ¶æ€ID:" + id);
                return false;
            };
            StateMachine.prototype.OnRunning = function(param) {
                if (param === void 0) {
                    param = null;
                }
                if (null == this.currState) {
                    return;
                }
                this.currState.OnRunning(param);
            };
            StateMachine.prototype.Find = function(id) {
                return this._states.Get(id);
            };
            return StateMachine;
        }();
        exports.default = StateMachine;
    }, {
        "../LTUtils/LTDictionary": 31
    } ],
    30: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTBehaviour = function(_super) {
            __extends(LTBehaviour, _super);
            function LTBehaviour() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isDestory = false;
                return _this;
            }
            Object.defineProperty(LTBehaviour.prototype, "transform", {
                get: function() {
                    if (this == null) return null;
                    if (this.owner == null) return null;
                    return this.owner.transform;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LTBehaviour.prototype, "gameobject", {
                get: function() {
                    if (this == null) return null;
                    if (this.owner == null) return null;
                    return this.owner;
                },
                enumerable: true,
                configurable: true
            });
            LTBehaviour.prototype.DestorySelf = function() {
                if (this._isDestory) return;
                this._isDestory = true;
                if (this.owner == null) return;
                if (this.owner.destroyed) return;
                this.owner.destroy(true);
            };
            return LTBehaviour;
        }(Laya.Script3D);
        exports.default = LTBehaviour;
    }, {} ],
    31: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTDictionary = function() {
            function LTDictionary() {
                this._values = [];
                this._keys = [];
            }
            Object.defineProperty(LTDictionary.prototype, "values", {
                get: function() {
                    return this._values;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LTDictionary.prototype, "keys", {
                get: function() {
                    return this._keys;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LTDictionary.prototype, "count", {
                get: function() {
                    return this._keys.length;
                },
                enumerable: true,
                configurable: true
            });
            LTDictionary.prototype.set = function(key, value) {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this._values[index] = value;
                    return;
                }
                this._keys.push(key);
                this._values.push(value);
            };
            LTDictionary.prototype.indexOf = function(key) {
                var index = this._keys.indexOf(key);
                if (index >= 0) return index;
                return -1;
            };
            LTDictionary.prototype.Get = function(key) {
                var index = this.indexOf(key);
                return index < 0 ? null : this._values[index];
            };
            LTDictionary.prototype.ContainsKey = function(key) {
                return this.indexOf(key) >= 0;
            };
            LTDictionary.prototype.Add = function(key, value) {
                var index = this.indexOf(key);
                if (index >= 0) {
                    return false;
                }
                this._keys.push(key);
                this._values.push(value);
                return true;
            };
            LTDictionary.prototype.Remove = function(key) {
                var index = this.indexOf(key);
                if (index >= 0) {
                    this._keys.splice(index, 1);
                    this._values.splice(index, 1);
                    return true;
                }
                return false;
            };
            LTDictionary.prototype.Clear = function() {
                this._values.length = 0;
                this._keys.length = 0;
            };
            return LTDictionary;
        }();
        exports.default = LTDictionary;
    }, {} ],
    32: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTDictionary_1 = require("./LTDictionary");
        var LTObjPool = function() {
            function LTObjPool() {
                this._objMap = new LTDictionary_1.default();
            }
            Object.defineProperty(LTObjPool, "instance", {
                get: function() {
                    if (this._instance == null) {
                        this._instance = new LTObjPool();
                    }
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            LTObjPool.prototype.InitObjPool = function(keyName, obj) {
                if (this._objMap.ContainsKey(keyName)) {
                    console.error("å¯¹è±¡æ± ä¸­å·²å­˜åœ¨é‡å¤key:" + keyName);
                    return;
                }
                var newItem = new LTObjPoolItem();
                newItem.sampleObj = obj;
                this._objMap.Add(keyName, newItem);
            };
            LTObjPool.prototype.GetObj = function(keyName) {
                var getItem = this._objMap.Get(keyName);
                if (getItem == null) {
                    console.error("å¯¹è±¡æ± ä¸­ä¸å­˜åœ¨key:" + keyName);
                    return null;
                }
                return getItem.GenNew();
            };
            LTObjPool.prototype.ReturnObj = function(keyName, obj) {
                var getItem = this._objMap.Get(keyName);
                if (getItem == null) {
                    console.error("å¯¹è±¡æ± ä¸­ä¸å­˜åœ¨key:" + keyName);
                    return;
                }
                getItem.ReturnObj(obj);
            };
            return LTObjPool;
        }();
        exports.default = LTObjPool;
        var LTObjPoolItem = function() {
            function LTObjPoolItem() {
                this._cacheList = [];
                this.maxCount = 50;
            }
            LTObjPoolItem.prototype.GenNew = function() {
                if (this._cacheList.length > 0) {
                    return this._cacheList.pop();
                }
                return Laya.Sprite3D.instantiate(this.sampleObj);
            };
            LTObjPoolItem.prototype.ReturnObj = function(obj) {
                if (this._cacheList.length >= this.maxCount) {
                    obj.destroy(true);
                } else {
                    this._cacheList.push(obj);
                }
            };
            return LTObjPoolItem;
        }();
    }, {
        "./LTDictionary": 31
    } ],
    33: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var QuaternionEx_1 = require("./QuaternionEx");
        var LTQuaternionCurve = function() {
            function LTQuaternionCurve() {
                this._keyList = [];
                this._valueList = [];
                this._minKey = 99999;
                this._maxKey = -99999;
            }
            Object.defineProperty(LTQuaternionCurve.prototype, "Count", {
                get: function() {
                    return this._keyList.length;
                },
                enumerable: true,
                configurable: true
            });
            LTQuaternionCurve.prototype.SetKey = function(progress, value) {
                var searchIndex = 0;
                var isReplace = false;
                for (;searchIndex < this._keyList.length; ++searchIndex) {
                    var keyValue = this._keyList[searchIndex];
                    if (keyValue == progress) {
                        isReplace = true;
                        break;
                    }
                    if (keyValue > progress) {
                        break;
                    }
                }
                var finalIndex = searchIndex;
                if (finalIndex < 0) {
                    this._keyList[0] = progress;
                    this._valueList[0] = value;
                } else {
                    if (isReplace) {
                        this._keyList[finalIndex] = progress;
                        this._valueList[finalIndex] = value;
                    } else {
                        this._keyList.splice(finalIndex, 0, progress);
                        this._valueList.splice(finalIndex, 0, value);
                    }
                }
                if (progress < this._minKey) {
                    this._minKey = progress;
                }
                if (progress > this._maxKey) {
                    this._maxKey = progress;
                }
            };
            LTQuaternionCurve.prototype.Evaluate = function(progress, searchIndex) {
                if (this._keyList.length < 2) {
                    console.error(this);
                    console.error("æ•°æ®é•¿åº¦ä¸è¶³,æ— æ³•è¿›è¡Œæ’å€¼");
                    return Laya.Quaternion.DEFAULT;
                }
                if (progress < this._minKey) return this._valueList[0];
                if (progress > this._maxKey) return this._valueList[this._valueList.length - 1];
                var preIndex = searchIndex > 0 ? searchIndex : 0;
                var behindIndex = preIndex + 1;
                for (;behindIndex < this._keyList.length; ++behindIndex, ++preIndex) {
                    var preProgress = this._keyList[preIndex];
                    if (preProgress == progress) {
                        return this._valueList[preIndex];
                    }
                    var behindProgress = this._keyList[behindIndex];
                    if (behindProgress == progress) {
                        return this._valueList[behindIndex];
                    }
                    if (this._keyList[preIndex] < progress && this._keyList[behindIndex] > progress) {
                        var lerpProgress = (progress - preProgress) / (behindProgress - preProgress);
                        return QuaternionEx_1.default.Lerp(this._valueList[preIndex], this._valueList[behindIndex], lerpProgress);
                    }
                }
                console.error(this);
                console.error("æ’å€¼å¤±è´¥progress:" + progress);
                return Laya.Quaternion.DEFAULT;
            };
            return LTQuaternionCurve;
        }();
        exports.default = LTQuaternionCurve;
    }, {
        "./QuaternionEx": 38
    } ],
    34: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var MathEx_1 = require("./MathEx");
        var LTSimpleCurve = function() {
            function LTSimpleCurve() {
                this._keyList = [];
                this._valueList = [];
                this._minKey = 99999;
                this._maxKey = -99999;
            }
            Object.defineProperty(LTSimpleCurve.prototype, "Count", {
                get: function() {
                    return this._keyList.length;
                },
                enumerable: true,
                configurable: true
            });
            LTSimpleCurve.prototype.SetKey = function(progress, value) {
                var searchIndex = 0;
                var isReplace = false;
                for (;searchIndex < this._keyList.length; ++searchIndex) {
                    var keyValue = this._keyList[searchIndex];
                    if (keyValue == progress) {
                        isReplace = true;
                        break;
                    }
                    if (keyValue > progress) {
                        break;
                    }
                }
                var finalIndex = searchIndex;
                if (finalIndex < 0) {
                    this._keyList[0] = progress;
                    this._valueList[0] = value;
                } else {
                    if (isReplace) {
                        this._keyList[finalIndex] = progress;
                        this._valueList[finalIndex] = value;
                    } else {
                        this._keyList.splice(finalIndex, 0, progress);
                        this._valueList.splice(finalIndex, 0, value);
                    }
                }
                if (progress < this._minKey) {
                    this._minKey = progress;
                }
                if (progress > this._maxKey) {
                    this._maxKey = progress;
                }
            };
            LTSimpleCurve.prototype.Evaluate = function(progress, initIndex) {
                if (this._keyList.length < 2) {
                    console.error(this);
                    console.error("æ•°æ®é•¿åº¦ä¸è¶³,æ— æ³•è¿›è¡Œæ’å€¼");
                    return [ 0, 0 ];
                }
                if (progress < this._minKey) return [ 0, this._valueList[0] ];
                if (progress > this._maxKey) return [ this._keyList.length - 2, this._valueList[this._valueList.length - 1] ];
                var preIndex = initIndex > 1 ? initIndex - 1 : 0;
                var behindIndex = preIndex + 1;
                for (;behindIndex < this._keyList.length; ++behindIndex, ++preIndex) {
                    var preProgress = this._keyList[preIndex];
                    if (preProgress == progress) {
                        return [ preIndex - 1, this._valueList[preIndex] ];
                    }
                    var behindProgress = this._keyList[behindIndex];
                    if (behindProgress == progress) {
                        return [ preIndex, this._valueList[behindIndex] ];
                    }
                    if (this._keyList[preIndex] < progress && this._keyList[behindIndex] > progress) {
                        var lerpProgress = (progress - preProgress) / (behindProgress - preProgress);
                        return [ preIndex - 1, MathEx_1.default.Lerp(this._valueList[preIndex], this._valueList[behindIndex], lerpProgress) ];
                    }
                }
                console.error(this);
                console.error("æ’å€¼å¤±è´¥progress:" + progress);
                return [ 0, 0 ];
            };
            return LTSimpleCurve;
        }();
        exports.default = LTSimpleCurve;
    }, {
        "./MathEx": 37
    } ],
    35: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUtils = function() {
            function LTUtils() {}
            LTUtils.CachFile = function(url) {
                if (!Laya.Browser.onWeiXin) return;
                var fullUrl = Laya.URL.formatURL(url);
                var fileInfo = Laya.MiniAdpter.getFileInfo(fullUrl);
                if (fileInfo == null) {
                    Laya.MiniAdpter.downLoadFile(fullUrl);
                }
            };
            LTUtils.DownLoadFiles = function(urls, complete, progress) {
                Laya.loader.create(urls, complete, progress, null, null, null, 1, true);
            };
            return LTUtils;
        }();
        exports.LTUtils = LTUtils;
    }, {} ],
    36: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTSimpleCurve_1 = require("./LTSimpleCurve");
        var LTVectro3Curve = function() {
            function LTVectro3Curve() {
                this._xCurve = new LTSimpleCurve_1.default();
                this._yCurve = new LTSimpleCurve_1.default();
                this._zCurve = new LTSimpleCurve_1.default();
            }
            Object.defineProperty(LTVectro3Curve.prototype, "Count", {
                get: function() {
                    return this._xCurve.Count;
                },
                enumerable: true,
                configurable: true
            });
            LTVectro3Curve.prototype.SetKey = function(progress, value) {
                this._xCurve.SetKey(progress, value.x);
                this._yCurve.SetKey(progress, value.y);
                this._zCurve.SetKey(progress, value.z);
            };
            LTVectro3Curve.prototype.Evaluate = function(progress, searchIndex) {
                var xV = this._xCurve.Evaluate(progress, searchIndex);
                return [ xV[0], new Laya.Vector3(xV[1], this._yCurve.Evaluate(progress, searchIndex)[1], this._zCurve.Evaluate(progress, searchIndex)[1]) ];
            };
            return LTVectro3Curve;
        }();
        exports.default = LTVectro3Curve;
    }, {
        "./LTSimpleCurve": 34
    } ],
    37: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var MathEx = function() {
            function MathEx() {}
            MathEx.ToHex = function(num) {
                return num.toString(16);
            };
            MathEx.RandomFromArray = function(numArr) {
                var randomIndex = MathEx.RandomInt(0, numArr.length);
                return numArr[randomIndex];
            };
            MathEx.RandomFromWithWeight = function(numArr, weightArr) {
                if (numArr == null || numArr.length == 0) {
                    return null;
                }
                var totalWeight = 0;
                for (var _i = 0, weightArr_1 = weightArr; _i < weightArr_1.length; _i++) {
                    var weight = weightArr_1[_i];
                    totalWeight += weight;
                }
                var randomWeight = MathEx.Random(0, totalWeight);
                var currentWeight = 0;
                for (var i = 0; i < numArr.length; ++i) {
                    currentWeight += weightArr[i];
                    if (randomWeight < currentWeight) {
                        return numArr[i];
                    }
                }
                return numArr[numArr.length - 1];
            };
            MathEx.RandomInt = function(min, max) {
                return Math.floor(this.Random(min, max));
            };
            MathEx.Random = function(min, max) {
                return (max - min) * Math.random() + min;
            };
            MathEx.Clamp = function(value, min, max) {
                if (value < min) return min;
                if (value > max) return max;
                return value;
            };
            MathEx.Clamp01 = function(value) {
                return this.Clamp(value, 0, 1);
            };
            MathEx.Sign = function(value) {
                if (value == 0) return 0;
                return value > 0 ? 1 : -1;
            };
            MathEx.GetNumCount = function(num) {
                var numberCount = 0;
                var newNumber = num;
                while (newNumber / 10 > 0) {
                    newNumber = Math.floor(newNumber / 10);
                    numberCount++;
                }
                return numberCount;
            };
            MathEx.Lerp = function(from, to, progress) {
                return from + (to - from) * progress;
            };
            MathEx.MoveTowardsAngle = function(current, target, maxDelta) {
                var num = MathEx.DeltaAngle(current, target);
                if (0 - maxDelta < num && num < maxDelta) {
                    return target;
                }
                target = current + num;
                return MathEx.MoveTowards(current, target, maxDelta);
            };
            MathEx.MoveTowards = function(current, target, maxDelta) {
                if (Math.abs(target - current) <= maxDelta) {
                    return target;
                }
                return current + Math.sin(target - current) * maxDelta;
            };
            MathEx.DeltaAngle = function(current, target) {
                var num = MathEx.Repeat(target - current, 360);
                if (num > 180) {
                    num -= 360;
                }
                return num;
            };
            MathEx.Repeat = function(t, length) {
                return MathEx.Clamp(t - Math.floor(t / length) * length, 0, length);
            };
            MathEx.Deg2Rad = .0175;
            MathEx.Rad2Deg = 57.2958;
            return MathEx;
        }();
        exports.default = MathEx;
    }, {} ],
    38: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var MathEx_1 = require("./MathEx");
        var Vector3Ex_1 = require("./Vector3Ex");
        var QuaternionEx = function() {
            function QuaternionEx() {}
            QuaternionEx.FromVector3 = function(elurAngle) {
                return this.FromEulerAngle(elurAngle.x, elurAngle.y, elurAngle.z);
            };
            QuaternionEx.ToEulerAngle = function(q) {
                var eulerE = new Laya.Vector3();
                q.getYawPitchRoll(eulerE);
                var rotationEulerE = new Laya.Vector3();
                rotationEulerE.x = eulerE.y * QuaternionEx._angleToRandin;
                rotationEulerE.y = eulerE.x * QuaternionEx._angleToRandin;
                rotationEulerE.z = eulerE.z * QuaternionEx._angleToRandin;
                return rotationEulerE;
            };
            QuaternionEx.FromEulerAngle = function(x, y, z) {
                var eulerX = x / 2 * MathEx_1.default.Deg2Rad;
                var cX = Math.cos(eulerX);
                var sX = Math.sin(eulerX);
                var eulerY = y / 2 * MathEx_1.default.Deg2Rad;
                var cY = Math.cos(eulerY);
                var sY = Math.sin(eulerY);
                var eulerZ = z / 2 * MathEx_1.default.Deg2Rad;
                var cZ = Math.cos(eulerZ);
                var sZ = Math.sin(eulerZ);
                var ix = sX * cY * cZ - cX * sY * sZ;
                var iy = cX * sY * cZ + sX * cY * sZ;
                var iz = cX * cY * sZ - sX * sY * cZ;
                var iw = cX * cY * cZ + sX * sY * sZ;
                var q = new Laya.Quaternion(ix, iy, iz, iw);
                return q;
            };
            QuaternionEx.MultiplyQ = function(r1, r2) {
                var result = Laya.Quaternion.DEFAULT;
                Laya.Quaternion.multiply(r1, r2, result);
                return result;
            };
            QuaternionEx.Copy = function(src) {
                return new Laya.Quaternion(src.x, src.y, src.z, src.w);
            };
            QuaternionEx.Multiply = function(r, v) {
                var x = r.x + r.x;
                var y = r.y + r.y;
                var z = r.z + r.z;
                var xx = r.x * x;
                var yy = r.y * y;
                var zz = r.z * z;
                var xy = r.x * y;
                var xz = r.x * z;
                var yz = r.y * z;
                var wx = r.w * x;
                var wy = r.w * y;
                var wz = r.w * z;
                var res = Vector3Ex_1.default.zero;
                res.x = (1 - (yy + zz)) * v.x + (xy - wz) * v.y + (xz + wy) * v.z;
                res.y = (xy + wz) * v.x + (1 - (xx + zz)) * v.y + (yz - wx) * v.z;
                res.z = (xz - wy) * v.x + (yz + wx) * v.y + (1 - (xx + yy)) * v.z;
                return res;
            };
            QuaternionEx.Lerp = function(from, to, value) {
                var q = Laya.Quaternion.DEFAULT;
                Laya.Quaternion.lerp(from, to, value, q);
                return q;
            };
            QuaternionEx.identify = QuaternionEx.FromEulerAngle(0, 0, 0);
            QuaternionEx._angleToRandin = 180 / Math.PI;
            return QuaternionEx;
        }();
        exports.default = QuaternionEx;
    }, {
        "./MathEx": 37,
        "./Vector3Ex": 40
    } ],
    39: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var StringEx = function() {
            function StringEx() {}
            StringEx.SplitToIntArray = function(str, splitStr) {
                var splits = str.split(splitStr);
                var result = [];
                for (var i = 0; i < splits.length; ++i) {
                    var parseNum = parseInt(splits[i]);
                    if (isNaN(parseNum)) {
                        parseNum = 0;
                    }
                    result.push(parseNum);
                }
                return result;
            };
            StringEx.IntArrToStr = function(arr) {
                var str = "";
                for (var i = 0; i < arr.length; ++i) {
                    str += arr[i].toFixed(0);
                    if (i < arr.length - 1) {
                        str += ",";
                    }
                }
                return str;
            };
            return StringEx;
        }();
        exports.default = StringEx;
    }, {} ],
    40: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var MathEx_1 = require("./MathEx");
        var Vector3Ex = function() {
            function Vector3Ex() {}
            Object.defineProperty(Vector3Ex, "up", {
                get: function() {
                    return new Laya.Vector3(0, 1, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3Ex, "down", {
                get: function() {
                    return new Laya.Vector3(0, -1, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3Ex, "forward", {
                get: function() {
                    return new Laya.Vector3(0, 0, 1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3Ex, "zero", {
                get: function() {
                    return new Laya.Vector3(0, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3Ex, "one", {
                get: function() {
                    return new Laya.Vector3(1, 1, 1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3Ex, "back", {
                get: function() {
                    return new Laya.Vector3(0, 0, -1);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3Ex, "left", {
                get: function() {
                    return new Laya.Vector3(-1, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Vector3Ex, "right", {
                get: function() {
                    return new Laya.Vector3(1, 0, 0);
                },
                enumerable: true,
                configurable: true
            });
            Vector3Ex.Cross = function(right, left) {
                var result = new Laya.Vector3(0, 0, 0);
                Laya.Vector3.cross(right, left, result);
                return result;
            };
            Vector3Ex.Subtract = function(right, left) {
                var result = new Laya.Vector3(0, 0, 0);
                Laya.Vector3.subtract(right, left, result);
                return result;
            };
            Vector3Ex.ClampMagnitude = function(vector, maxLength) {
                var result = new Laya.Vector3(0, 0, 0);
                var sqrMagnitude = 0;
                if (Laya.Vector3.distanceSquared(vector, result) > maxLength * maxLength) {
                    result = Vector3Ex.Scale(Vector3Ex.Normalize(vector), maxLength);
                } else {
                    result = vector;
                }
                return result;
            };
            Vector3Ex.Normalize = function(vec) {
                var result = new Laya.Vector3(0, 0, 0);
                Laya.Vector3.normalize(vec, result);
                return result;
            };
            Vector3Ex.Add = function() {
                var vecs = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    vecs[_i] = arguments[_i];
                }
                var result = new Laya.Vector3(0, 0, 0);
                for (var i = 0; i < vecs.length; ++i) {
                    var vec = vecs[i];
                    result.x += vec.x;
                    result.y += vec.y;
                    result.z += vec.z;
                }
                return result;
            };
            Vector3Ex.Scale = function(vec, scale) {
                var result = new Laya.Vector3(0, 0, 0);
                Laya.Vector3.scale(vec, scale, result);
                return result;
            };
            Vector3Ex.Dot = function(left, right) {
                return Laya.Vector3.dot(left, right);
            };
            Vector3Ex.Lerp = function(from, to, v) {
                var result = new Laya.Vector3(0, 0, 0);
                Laya.Vector3.lerp(from, to, v, result);
                return result;
            };
            Vector3Ex.Magnitude = function(v3) {
                return Math.sqrt(v3.x * v3.x + v3.y * v3.y + v3.z * v3.z);
            };
            Vector3Ex.Distance = function(from, to) {
                var offset = Vector3Ex.Subtract(from, to);
                return Vector3Ex.Magnitude(offset);
            };
            Vector3Ex.DistanceSqrt = function(from, to) {
                var offset = Vector3Ex.Subtract(from, to);
                return offset.x * offset.x + offset.y * offset.y + offset.z * offset.z;
            };
            Vector3Ex.SignedAngle = function(from, to, asix) {
                var normalized = Vector3Ex.Normalize(from);
                var normalized2 = Vector3Ex.Normalize(to);
                var num = Math.acos(MathEx_1.default.Clamp(Laya.Vector3.dot(normalized, normalized2), -1, 1)) * 57.29578;
                var cross = Vector3Ex.Cross(normalized, normalized2);
                var num2 = MathEx_1.default.Sign(Laya.Vector3.dot(asix, cross));
                return num * num2;
            };
            Vector3Ex.SmoothDamp = function(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime) {
                var num = 2 / smoothTime;
                var num2 = num * deltaTime;
                var d = 1 / (1 + num2 + .48 * num2 * num2 + .235 * num2 * num2 * num2);
                var vector = Vector3Ex.Subtract(current, target);
                var vector2 = target.clone();
                var maxLength = maxSpeed * smoothTime;
                vector = Vector3Ex.ClampMagnitude(vector, maxLength);
                var target2 = Vector3Ex.Subtract(current, vector);
                var vector3 = Vector3Ex.Scale(Vector3Ex.Add(currentVelocity, Vector3Ex.Scale(vector, num)), deltaTime);
                var cacheV = Vector3Ex.Scale(Vector3Ex.Subtract(currentVelocity, Vector3Ex.Scale(vector3, num)), d);
                currentVelocity.x = cacheV.x;
                currentVelocity.y = cacheV.y;
                currentVelocity.z = cacheV.z;
                var vector4 = Vector3Ex.Add(target2, Vector3Ex.Scale(Vector3Ex.Add(vector, vector3), d));
                if (Vector3Ex.Dot(Vector3Ex.Subtract(vector2, current), Vector3Ex.Subtract(vector4, vector2)) > 0) {
                    vector4 = vector2;
                    currentVelocity.x = 0;
                    currentVelocity.y = 0;
                    currentVelocity.z = 0;
                }
                return vector4;
            };
            return Vector3Ex;
        }();
        exports.default = Vector3Ex;
    }, {
        "./MathEx": 37
    } ],
    41: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI = function(_super) {
            __extends(LTUI, _super);
            function LTUI() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 10;
                return _this;
            }
            Object.defineProperty(LTUI.prototype, "visible", {
                get: function() {
                    return this.owner.visible;
                },
                set: function(value) {
                    if (this.owner.visible == value) return;
                    this.owner.visible = value;
                    if (value) {
                        this.onVisible();
                    } else {
                        this.onUnvisible();
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LTUI.prototype, "visibleInScene", {
                get: function() {
                    if (!this.visible) return false;
                    var parent = this.owner.parent;
                    while (parent != null) {
                        if (!parent.visible) return false;
                        parent = parent.parent;
                    }
                    return true;
                },
                enumerable: true,
                configurable: true
            });
            LTUI.prototype.FindChild = function(pathName) {
                if (pathName == "") return this.owner;
                var splitPath = pathName.split("/");
                return LTUI._FindChild(splitPath, this.owner, 0);
            };
            LTUI.prototype.FindCMP = function(pathName, cmp) {
                var findChild = this.FindChild(pathName);
                if (findChild == null) return null;
                if (findChild instanceof cmp) {
                    return findChild;
                }
                var findCmp = findChild.getComponent(cmp);
                if (findCmp == null) {
                    console.log(findChild, "ä¸Šä¸å­˜åœ¨ç»„ä»¶:" + cmp);
                }
                return findCmp;
            };
            LTUI.prototype.HideUI = function() {
                if (this.owner && this.owner.parent) {
                    this.owner.parent.removeChild(this.owner);
                }
            };
            LTUI.prototype.onVisible = function() {};
            LTUI.prototype.onUnvisible = function() {};
            LTUI.prototype.onUpdate = function() {
                if (this.visibleInScene) {
                    this._OnUpdate();
                }
            };
            LTUI.prototype._OnUpdate = function() {};
            LTUI._FindChild = function(nodeName, currentNode, currentLevel) {
                var findChild = currentNode.getChildByName(nodeName[currentLevel]);
                if (findChild == null) {
                    console.log(currentNode + "ä¸‹ä¸å­˜åœ¨èŠ‚ç‚¹:" + nodeName[currentLevel]);
                    return null;
                }
                if (currentLevel + 1 == nodeName.length) {
                    return findChild;
                } else {
                    return LTUI._FindChild(nodeName, findChild, currentLevel + 1);
                }
            };
            return LTUI;
        }(Laya.Script);
        exports.default = LTUI;
    }, {} ],
    42: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUIUtils = function() {
            function LTUIUtils() {}
            LTUIUtils.CloneLabel = function(label) {
                var newText = new Laya.Label();
                LTUIUtils.CloneUIProp(label, newText);
                newText.text = label.text;
                newText.fontSize = label.fontSize;
                newText.color = label.color;
                newText.strokeColor = label.strokeColor;
                newText.stroke = label.stroke;
                return newText;
            };
            LTUIUtils.CloneFontClip = function(clip) {
                var newFontClip = new Laya.FontClip();
                LTUIUtils.CloneUIProp(clip, newFontClip);
                newFontClip.sizeGrid = clip.sizeGrid;
                newFontClip.skin = clip.skin;
                newFontClip.group = clip.group;
                newFontClip.align = clip.align;
                newFontClip.sheet = clip.sheet;
                newFontClip.value = clip.value;
                newFontClip.spaceX = clip.spaceX;
                newFontClip.spaceY = clip.spaceY;
                newFontClip.direction = clip.direction;
                return newFontClip;
            };
            LTUIUtils.CloneImage = function(img) {
                var newImage = new Laya.Image();
                LTUIUtils.CloneUIProp(img, newImage);
                newImage.skin = img.skin;
                newImage.sizeGrid = img.sizeGrid;
                return newImage;
            };
            LTUIUtils.CloneUIProp = function(srcNode, dstNode) {
                dstNode.name = srcNode.name;
                dstNode.anchorX = srcNode.anchorX;
                dstNode.anchorY = srcNode.anchorY;
                dstNode.x = srcNode.x;
                dstNode.y = srcNode.y;
                dstNode.centerX = srcNode.centerX;
                dstNode.centerY = srcNode.centerY;
                dstNode.left = srcNode.left;
                dstNode.right = srcNode.right;
                dstNode.top = srcNode.top;
                dstNode.bottom = srcNode.bottom;
                dstNode.width = srcNode.width;
                dstNode.height = srcNode.height;
                dstNode._renderType = srcNode._renderType;
            };
            LTUIUtils.SetWxHead = function(headUrl, showImg) {
                var _this = this;
                if (this._headCache[headUrl] != undefined) {
                    showImg.skin = this._headCache[headUrl];
                } else {
                    var httpRequest = new Laya.HttpRequest();
                    httpRequest.once(Laya.Event.COMPLETE, this, function(data) {
                        var byte = new Laya.Byte(data);
                        byte.writeArrayBuffer(data, 4);
                        var blob = new Laya.Browser.window.Blob([ data ], {
                            type: "image/apng"
                        });
                        var url = Laya.Browser.window.URL.createObjectURL(blob);
                        showImg.skin = url;
                        _this._headCache[headUrl] = url;
                    });
                    httpRequest.once(Laya.Event.ERROR, this, function(data) {
                        console.error(data);
                    });
                    httpRequest.send(headUrl, "", "get", "arraybuffer");
                }
            };
            LTUIUtils._headCache = {};
            return LTUIUtils;
        }();
        exports.default = LTUIUtils;
    }, {} ],
    43: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BaseAIState_1 = require("./BaseAIState");
        var EAIState_1 = require("./EAIState");
        var EPlayerState_1 = require("../state/EPlayerState");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var GameConst_1 = require("../common/GameConst");
        var AIStateJudge = function(_super) {
            __extends(AIStateJudge, _super);
            function AIStateJudge(owner) {
                return _super.call(this, owner, EAIState_1.EAIState.Judge) || this;
            }
            AIStateJudge.prototype.GetNextState = function() {
                if (this.owner.viewPlayer.currentState.currentState == EPlayerState_1.EPlayerState.MoveInRoad) {
                    if (this.owner.viewPlayer.moveDistance < GlobalUnit_1.default.mainPlayer.moveDistance - this.owner.flyDistance) {
                        this.owner.viewPlayer.ForceChangeState(EPlayerState_1.EPlayerState.FixedFly);
                        return EAIState_1.EAIState.None;
                    }
                    return EAIState_1.EAIState.Move;
                } else if (this.owner.viewPlayer.currentState.currentState == EPlayerState_1.EPlayerState.Dead) {
                    this.owner.viewPlayer.RestartMove(GlobalUnit_1.default.mainPlayer.moveDistance - GameConst_1.default.aiRebornDistance, MathEx_1.default.Random(-GameConst_1.default.maxRoadDegree, GameConst_1.default.maxRoadDegree));
                    return EAIState_1.EAIState.None;
                }
                return EAIState_1.EAIState.None;
            };
            return AIStateJudge;
        }(BaseAIState_1.default);
        exports.default = AIStateJudge;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../state/EPlayerState": 95,
        "./BaseAIState": 46,
        "./EAIState": 47
    } ],
    44: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BaseAIState_1 = require("./BaseAIState");
        var EPlayerState_1 = require("../state/EPlayerState");
        var EAIState_1 = require("./EAIState");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var GameConst_1 = require("../common/GameConst");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var EItemType_1 = require("../common/EItemType");
        var AIStateMove = function(_super) {
            __extends(AIStateMove, _super);
            function AIStateMove(owner) {
                return _super.call(this, owner, EAIState_1.EAIState.Move) || this;
            }
            AIStateMove.prototype._DoEnter = function() {
                this._flyCheckTime = this.owner.aiConfig.check_fly_time;
                this._targetDegree = this.owner.viewPlayer.degree;
                this._turnCheckTime = this.owner.changeTime;
                this._attackCheckTime = this.owner.aiConfig.hit_player_time;
                this._isFast = false;
            };
            AIStateMove.prototype._RandomTarget = function() {
                this._isFast = MathEx_1.default.RandomInt(0, 100) < this.owner.aiConfig.force_speedup_rate;
                if (this._isFast) {
                    this._targetDegree = MathEx_1.default.RandomInt(0, 100) > 50 ? 60 : -60;
                } else {
                    this._targetDegree = MathEx_1.default.Random(-GameConst_1.default.maxRoadDegree, GameConst_1.default.maxRoadDegree);
                    if (Math.abs(this._targetDegree) < GameConst_1.default.maxRoadDegree / 3) {
                        this._targetDegree * 2;
                    }
                }
                this._turnCheckTime = this.owner.changeTime;
            };
            AIStateMove.prototype._DoRunning = function() {
                if (this.owner.viewPlayer.currentState.currentState != EPlayerState_1.EPlayerState.MoveInRoad) {
                    this.isFinished = true;
                    this.nextState = EAIState_1.EAIState.Judge;
                    return;
                }
                var currentDistance = this.owner.viewPlayer.moveDistance;
                if (GlobalUnit_1.default.mainPlayer.isInRoad && !GlobalUnit_1.default.mainPlayer.isSuperSpeedUp && Math.abs(GlobalUnit_1.default.mainPlayer.moveDistance - currentDistance) < 1) {
                    this._attackCheckTime -= this.deltaTime;
                    if (this._attackCheckTime < 0) {
                        this._targetDegree = GlobalUnit_1.default.mainPlayer.degree;
                        this._turnCheckTime = this.owner.changeTime;
                        this._isFast = true;
                    }
                } else {
                    this._attackCheckTime = this.owner.aiConfig.hit_player_time;
                }
                if (!this._isFast) {
                    var findCmp = GlobalUnit_1.default.itemManager.GetItem(currentDistance - 2, currentDistance + 15);
                    if (this._cacheItem != findCmp && findCmp != null) {
                        this._cacheItem = findCmp;
                        switch (this._cacheItem.itemType) {
                          case EItemType_1.EItemType.Block:
                            if (MathEx_1.default.Random(0, 100) < this.owner.dogeWallRate) {
                                this._AutoMove(this._cacheItem);
                            }
                            break;

                          case EItemType_1.EItemType.SpeedUp:
                            if (MathEx_1.default.Random(0, 100) < this.owner.eatSpeedUpRate) {
                                this._AutoMove(this._cacheItem);
                            }
                            break;
                        }
                    }
                }
                this._turnCheckTime -= this.deltaTime;
                if (this._turnCheckTime < 0) {
                    this._RandomTarget();
                }
                var moveDelta = (this._isFast ? 240 : this.owner.aiConfig.turn_speed) * this.deltaTime;
                var newDegree = this.owner.viewPlayer.degree;
                if (newDegree < this._targetDegree) {
                    newDegree += moveDelta;
                    if (newDegree > this._targetDegree) {
                        newDegree = this._targetDegree;
                    }
                } else if (newDegree > this._targetDegree) {
                    newDegree -= moveDelta;
                    if (newDegree < this._targetDegree) {
                        newDegree = this._targetDegree;
                    }
                }
                this.owner.viewPlayer.degree = newDegree;
                if (currentDistance < GlobalUnit_1.default.mainPlayer.moveDistance - this.owner.flyDistance) {
                    this._flyCheckTime -= this.deltaTime;
                    if (this._flyCheckTime < 0) {
                        this._flyCheckTime = this.owner.aiConfig.check_fly_time;
                        if (MathEx_1.default.Random(0, 100) < this.owner.flyRate) {
                            this.isFinished = true;
                            this.nextState = EAIState_1.EAIState.Judge;
                        }
                    }
                }
            };
            AIStateMove.prototype._AutoMove = function(findCmp) {
                this._targetDegree = findCmp.degree;
                this._turnCheckTime = this.owner.changeTime;
            };
            return AIStateMove;
        }(BaseAIState_1.default);
        exports.default = AIStateMove;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../common/EItemType": 52,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../state/EPlayerState": 95,
        "./BaseAIState": 46,
        "./EAIState": 47
    } ],
    45: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var StateMachine_1 = require("../LTGame/Fsm/StateMachine");
        var AIStateJudge_1 = require("./AIStateJudge");
        var AIStateMove_1 = require("./AIStateMove");
        var EAIState_1 = require("./EAIState");
        var AiConfig_1 = require("../config/AiConfig");
        var AgentPlayer = function() {
            function AgentPlayer(viewPlayer) {
                this.viewPlayer = viewPlayer;
                this.aiId = viewPlayer.aiId;
                this._GenConfig();
                viewPlayer.isPressed = true;
                this._fsm = new StateMachine_1.default();
                this._fsm.Add(new AIStateJudge_1.default(this));
                this._fsm.Add(new AIStateMove_1.default(this));
            }
            AgentPlayer.prototype._GenConfig = function() {
                this.aiConfig = AiConfig_1.AiConfig.data[this.aiId];
                this.dogeWallRate = this.aiConfig.doge_wall;
                this.eatSpeedUpRate = this.aiConfig.eat_speedup;
                this.flyRate = this.aiConfig.fly_rate;
                this.flyDownMinDistance = this.aiConfig.fly_down_distance[0];
                this.flyDownMaxDistance = this.aiConfig.fly_down_distance[1];
                this.flyDistance = this.aiConfig.behind_distance;
                this.changeTime = this.aiConfig.change_time;
            };
            AgentPlayer.prototype.StartLogic = function() {
                this._fsm.ChangeState(EAIState_1.EAIState.Judge);
            };
            AgentPlayer.prototype.LogicUpdate = function(dt) {
                var currentState = this._fsm.currState;
                var nextState = currentState.GetNextState();
                if (nextState != EAIState_1.EAIState.None) {
                    this._fsm.ChangeState(nextState);
                }
                this._fsm.OnRunning(dt);
            };
            return AgentPlayer;
        }();
        exports.default = AgentPlayer;
    }, {
        "../LTGame/Fsm/StateMachine": 29,
        "../config/AiConfig": 58,
        "./AIStateJudge": 43,
        "./AIStateMove": 44,
        "./EAIState": 47
    } ],
    46: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BaseState_1 = require("../LTGame/Fsm/BaseState");
        var EAIState_1 = require("./EAIState");
        var BaseAIState = function(_super) {
            __extends(BaseAIState, _super);
            function BaseAIState(owner, state) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                _this.currentState = state;
                _this.id = state;
                return _this;
            }
            BaseAIState.prototype.OnEnter = function(exitState, param) {
                this.passTime = 0;
                this.nextState = EAIState_1.EAIState.None;
                this.isFinished = false;
                this._DoEnter(exitState);
            };
            BaseAIState.prototype.OnRunning = function(param) {
                this.deltaTime = param;
                this.passTime += this.deltaTime;
                this._DoRunning();
            };
            BaseAIState.prototype.OnExit = function(enterState, param) {
                this._DoExit(enterState);
            };
            BaseAIState.prototype.GetNextState = function() {
                if (this.isFinished) {
                    return this.nextState;
                }
                return EAIState_1.EAIState.None;
            };
            BaseAIState.prototype._DoEnter = function(exitState) {};
            BaseAIState.prototype._DoRunning = function() {};
            BaseAIState.prototype._DoExit = function(enterState) {};
            return BaseAIState;
        }(BaseState_1.default);
        exports.default = BaseAIState;
    }, {
        "../LTGame/Fsm/BaseState": 28,
        "./EAIState": 47
    } ],
    47: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EAIState;
        (function(EAIState) {
            EAIState[EAIState["None"] = 0] = "None";
            EAIState[EAIState["Wait"] = 1] = "Wait";
            EAIState[EAIState["Judge"] = 2] = "Judge";
            EAIState[EAIState["Move"] = 3] = "Move";
        })(EAIState = exports.EAIState || (exports.EAIState = {}));
    }, {} ],
    48: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTBehaviour_1 = require("../LTGame/LTBehaviour");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var GameConst_1 = require("../common/GameConst");
        var FollowCamera = function(_super) {
            __extends(FollowCamera, _super);
            function FollowCamera() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._initCameraParentPos = new Laya.Vector3(0, 1, GameConst_1.default.initPlayerDistance);
                _this._initCameraParentRot = new Laya.Vector3(0, 30, 0);
                _this._initCameraPos = new Laya.Vector3(0, 1.75, -6);
                _this._initCameraRot = new Laya.Vector3(-20, 180, 0);
                _this._flyCameraPos = new Laya.Vector3(0, 1.85, -6.5);
                _this._flyCameraRot = new Laya.Vector3(-15, 180, 0);
                _this._jumpCameraPos = new Laya.Vector3(0, 2, -8);
                _this._jumpCameraRot = new Laya.Vector3(-10, 180, 0);
                _this._fastDt = 1 / 60;
                _this._slowDt = 1 / 30;
                _this._yaw = 0;
                return _this;
            }
            Object.defineProperty(FollowCamera.prototype, "camera", {
                get: function() {
                    return this._camera;
                },
                enumerable: true,
                configurable: true
            });
            FollowCamera.prototype.Init = function() {
                this._isFollowing = false;
                this._followPlayer = GlobalUnit_1.default.mainPlayer;
                this._camera = this.gameobject.getChildAt(0);
                this.speedEffect = this.gameobject.getChildByName("JiaSu_PingMu");
                this.speedEffect.active = false;
            };
            FollowCamera.prototype.ResetInitPos = function() {
                this.transform.position = this._initCameraParentPos;
                this.transform.rotation = QuaternionEx_1.default.FromVector3(this._initCameraParentRot);
                this._camera.transform.localPosition = this._initCameraPos;
                this._camera.transform.localRotationEuler = this._initCameraRot;
                this._posVelocity = Vector3Ex_1.default.zero;
                this._rotVelocity = Vector3Ex_1.default.zero;
                this._maxSmoothTime = 0;
                this._passSmoothTime = 0;
                this._isFollowing = false;
                this._isJumping = false;
                this.speedEffect.active = false;
            };
            FollowCamera.prototype.StartFollow = function() {
                this._isFollowing = true;
                this._isJumping = false;
                this._posVelocity = Vector3Ex_1.default.zero;
                this._rotVelocity = Vector3Ex_1.default.zero;
            };
            FollowCamera.prototype.StopFollow = function() {
                this.onLateUpdate();
                this._isFollowing = false;
            };
            FollowCamera.prototype._CacheNowPos = function(maxSmoothTime) {
                this._maxSmoothTime = maxSmoothTime;
                this._passSmoothTime = 0;
                this._startPos = this._camera.transform.localPosition;
                this._startRot = this._camera.transform.localRotationEuler;
            };
            FollowCamera.prototype.SwitchToJump = function() {
                this._isFollowing = false;
                this._isJumping = true;
                this._CacheNowPos(1);
                this._targetPos = this._jumpCameraPos;
                this._targetRot = this._jumpCameraRot;
                this._startParentRot = this.transform.localRotationEuler;
                this._targetParentRot = new Laya.Vector3(0, this.transform.localRotationEulerY, 0);
                this._yaw = this.transform.localRotationEuler.y;
            };
            FollowCamera.prototype.ChangeToFlyModel = function() {
                this._CacheNowPos(.5);
                this._targetPos = this._flyCameraPos;
                this._targetRot = this._flyCameraRot;
            };
            FollowCamera.prototype.ChangeToRoadModel = function() {
                this._CacheNowPos(.5);
                this._targetPos = this._initCameraPos;
                this._targetRot = this._initCameraRot;
            };
            FollowCamera.prototype.onUpdate = function() {
                this._dt = Laya.timer.delta / 1e3;
                if (this._dt < .03) {
                    this._dt = this._fastDt;
                } else {
                    this._dt = this._slowDt;
                }
                GlobalUnit_1.default.gameManager.LogicUpdate(this._dt);
            };
            FollowCamera.prototype.onLateUpdate = function() {
                if (this._isFollowing) {
                    this._FollowAction();
                    GlobalUnit_1.default.uiRoot.ui_name.UpdateAllUIPos();
                } else if (this._isJumping) {
                    this._JumpAction();
                    GlobalUnit_1.default.uiRoot.ui_name.UpdateAllUIPos();
                }
            };
            FollowCamera.prototype._JumpAction = function() {
                var dt = this._dt;
                this._passSmoothTime += dt;
                if (this._passSmoothTime < this._maxSmoothTime) {
                    var progress = this._passSmoothTime / this._maxSmoothTime;
                    this._camera.transform.localPosition = Vector3Ex_1.default.Lerp(this._startPos, this._targetPos, progress);
                    this._camera.transform.localRotationEuler = Vector3Ex_1.default.Lerp(this._startRot, this._targetRot, progress);
                    var currentE = Vector3Ex_1.default.Lerp(this._startParentRot, this._targetParentRot, progress);
                    this._yaw += 28 * dt;
                    currentE.y = this._yaw;
                    this.transform.localRotationEuler = currentE;
                } else {
                    this.transform.localRotationEulerY += 8 * dt;
                }
                this.transform.position = this._followPlayer.transform.position;
            };
            FollowCamera.prototype._FollowAction = function() {
                var dt = this._dt;
                var targetPos = this._followPlayer.transform.position;
                this.transform.position = this._followPlayer.transform.position;
                var targetRotE = this.transform.rotationEuler.clone();
                var currentRotation = targetRotE;
                if (this._followPlayer.isInRoad) {
                    var getQ = GlobalUnit_1.default.roadManager.UpdateCamera(this._followPlayer.moveDistance, 0);
                    var getE = QuaternionEx_1.default.ToEulerAngle(getQ);
                    if (currentRotation.y < 0 && getE.y > 0 && getE.y - currentRotation.y > 200) {
                        targetRotE = getE;
                        currentRotation.y += 360;
                    } else if (currentRotation.y > 0 && getE.y < 0 && currentRotation.y - getE.y > 200) {
                        targetRotE = getE;
                        currentRotation.y -= 360;
                    } else {
                        targetRotE = getE;
                    }
                } else {
                    if (currentRotation.y < 0 && this._followPlayer.transform.localRotationEulerY > 0 && this._followPlayer.transform.localRotationEulerY - currentRotation.y > 200) {
                        targetRotE.y = this._followPlayer.transform.localRotationEulerY;
                        currentRotation.y += 360;
                    } else if (targetRotE.y > 0 && this._followPlayer.transform.localRotationEulerY < 0 && currentRotation.y - this._followPlayer.transform.localRotationEulerY > 200) {
                        targetRotE.y = this._followPlayer.transform.localRotationEulerY;
                        currentRotation.y -= 360;
                    } else {
                        targetRotE.y = this._followPlayer.transform.localRotationEulerY;
                    }
                }
                this.transform.rotationEuler = Vector3Ex_1.default.SmoothDamp(currentRotation, targetRotE, this._rotVelocity, .03, 9999999999, dt);
                this._passSmoothTime += dt;
                if (this._passSmoothTime < this._maxSmoothTime) {
                    var progress = this._passSmoothTime / this._maxSmoothTime;
                    this._camera.transform.localPosition = Vector3Ex_1.default.Lerp(this._startPos, this._targetPos, progress);
                    this._camera.transform.localRotationEuler = Vector3Ex_1.default.Lerp(this._startRot, this._targetRot, progress);
                }
            };
            return FollowCamera;
        }(LTBehaviour_1.default);
        exports.default = FollowCamera;
    }, {
        "../LTGame/LTBehaviour": 30,
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56
    } ],
    49: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTBehaviour_1 = require("../LTGame/LTBehaviour");
        var EItemType_1 = require("../common/EItemType");
        var CollisionLayer_1 = require("../common/CollisionLayer");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var GameConst_1 = require("../common/GameConst");
        var Resdefine_1 = require("../common/Resdefine");
        var EPropType_1 = require("../common/EPropType");
        var EPlayerState_1 = require("../state/EPlayerState");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var ItemCmp = function(_super) {
            __extends(ItemCmp, _super);
            function ItemCmp() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._circleMaxDegree = 20;
                _this._circleMoveSpeed = 20;
                _this._fastRotateTime = 0;
                return _this;
            }
            ItemCmp.prototype.Init = function(itemType) {
                this.itemType = itemType;
                for (var i = 0; i < this.gameobject.numChildren; ++i) {
                    var children = this.gameobject.getChildAt(i);
                    var collider = children.getComponent(Laya.PhysicsCollider);
                    if (collider == null) continue;
                    collider.collisionGroup = CollisionLayer_1.default.Item;
                    collider.canCollideWith = CollisionLayer_1.default.Ray;
                }
                switch (this.itemType) {
                  case EItemType_1.EItemType.CircleWall:
                    if (this.isMove) {
                        this._isLeftMove = MathEx_1.default.Random(0, 100) > 50;
                    }
                    break;

                  case EItemType_1.EItemType.Coin:
                    this._fastRotateTime = 0;
                    this.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
                    break;
                }
            };
            ItemCmp.prototype._OnHitBlock = function(player) {
                GlobalUnit_1.default.itemManager.RemoveItem(this);
                GlobalUnit_1.default.effectManager.GenEffect(this.effectStr, this.transform.position, this.transform.rotation, 2);
                var hitWallProp = GlobalUnit_1.default.skinManager.GetProp(player.skinConfig, EPropType_1.EPropType.HitBlock);
                if (hitWallProp != null) {
                    player.SpeedScale(GameConst_1.default.roadMoveSpeedCenter * hitWallProp.pro_value, GameConst_1.default.blockDownTime, false);
                    if (player == GlobalUnit_1.default.mainPlayer) {
                        GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectMianyi, player.transform.position, player.transform.rotation, 2, player.gameobject);
                    }
                } else {
                    player.SpeedScale(GameConst_1.default.blockDownSpeed, GameConst_1.default.blockDownTime, false);
                }
                if (player == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.audioManager.PlaySound(Resdefine_1.default.audio_hit_wall);
                }
                this.DestorySelf();
            };
            ItemCmp.prototype._OnHitSpeedUp = function(player) {
                player.SpeedScale(GameConst_1.default.speedUpSpeed, GameConst_1.default.speedUpTime, true);
                player.isSuperSpeedUp = true;
                if (player == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.audioManager.PlaySound(Resdefine_1.default.audio_eat_prop);
                    GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectSou, player.transform.position, player.transform.rotation, 2, player.gameobject);
                }
            };
            ItemCmp.prototype._OnHitCircleWall = function(player) {
                GlobalUnit_1.default.itemManager.RemoveItem(this);
                GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectWall, this.transform.position, this.transform.rotation, 2);
                player.ForceChangeState(EPlayerState_1.EPlayerState.HitWall);
                if (player == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.audioManager.PlaySound(Resdefine_1.default.audio_hit_wall);
                }
                this.DestorySelf();
            };
            ItemCmp.prototype._OnHitXiangJiaoPi = function(player) {
                player.ForceChangeState(EPlayerState_1.EPlayerState.ForceFly);
                if (player.degreeSpeed == 0) {
                    player.isflyLeft = this.degree < 0;
                } else {
                    player.isflyLeft = player.degreeSpeed < 0;
                }
                if (player == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectXiu, player.transform.position, player.transform.rotation, 2, player.gameobject);
                }
                GlobalUnit_1.default.itemManager.RemoveItem(this);
                this.DestorySelf();
            };
            ItemCmp.prototype._OnHitBoom = function(player) {
                player.ForceChangeState(EPlayerState_1.EPlayerState.HitBoom);
                GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectBoom, this.transform.position, this.transform.rotation, 2);
                GlobalUnit_1.default.itemManager.RemoveItem(this);
                this.DestorySelf();
            };
            ItemCmp.prototype._OnHitCoin = function(player) {
                if (player == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.dataManager.matchCoin += GameConst_1.default.coinTransUnit;
                    var coinPos = this.transform.position;
                    GlobalUnit_1.default.uiRoot.ui_fight.ShowCoin(coinPos);
                }
                GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectCoin, player.transform.position, player.transform.rotation, 2, player.gameobject);
                GlobalUnit_1.default.itemManager.RemoveItem(this);
                this.DestorySelf();
            };
            ItemCmp.prototype.BeHit = function(player) {
                switch (this.itemType) {
                  case EItemType_1.EItemType.Block:
                    this._OnHitBlock(player);
                    break;

                  case EItemType_1.EItemType.SpeedUp:
                    this._OnHitSpeedUp(player);
                    break;

                  case EItemType_1.EItemType.CircleWall:
                    this._OnHitCircleWall(player);
                    break;

                  case EItemType_1.EItemType.XiaoJiaoPi:
                    this._OnHitXiangJiaoPi(player);
                    break;

                  case EItemType_1.EItemType.Boom:
                    this._OnHitBoom(player);
                    break;

                  case EItemType_1.EItemType.Coin:
                    this._OnHitCoin(player);
                    break;

                  default:
                    console.error("æœªå¤„ç†çš„éšœç¢ç±»åž‹:", this.itemType);
                    break;
                }
            };
            ItemCmp.prototype._UpdateSpeedUp = function(dt) {
                this.moveDistance += GameConst_1.default.speedUpPropSpeed * dt;
                if (this.moveDistance >= GlobalUnit_1.default.roadManager.totalDistance) {
                    GlobalUnit_1.default.itemManager.RemoveItem(this);
                    this.DestorySelf();
                } else {
                    this.searchIndex = GlobalUnit_1.default.roadManager.UpdateObj(this.gameobject, this.moveDistance, this.degree, this.searchIndex);
                }
            };
            ItemCmp.prototype._UpdateCircleWall = function(dt) {
                if (this.isMove) {
                    if (this._isLeftMove) {
                        this.degree -= dt * this._circleMoveSpeed;
                        if (this.degree < -this._circleMaxDegree) {
                            this.degree = -this._circleMaxDegree;
                            this._isLeftMove = false;
                        }
                    } else {
                        this.degree += dt * this._circleMoveSpeed;
                        if (this.degree > this._circleMaxDegree) {
                            this.degree = this._circleMaxDegree;
                            this._isLeftMove = true;
                        }
                    }
                    this.searchIndex = GlobalUnit_1.default.roadManager.UpdateObj(this.gameobject, this.moveDistance, this.degree, this.searchIndex);
                }
            };
            ItemCmp.prototype._UpdateCoin = function(dt) {
                if (this.transform == null) return;
                this.transform.localRotationEulerY += dt * (this._fastRotateTime > 0 ? 1e3 : 200);
                this._fastRotateTime -= dt;
            };
            ItemCmp.prototype.onUpdate = function() {
                if (this == null) return;
                var dt = Laya.timer.delta;
                if (dt > 30) {
                    dt = 30;
                }
                dt /= 1e3;
                switch (this.itemType) {
                  case EItemType_1.EItemType.SpeedUp:
                    this._UpdateSpeedUp(dt);
                    break;

                  case EItemType_1.EItemType.CircleWall:
                    this._UpdateCircleWall(dt);
                    break;

                  case EItemType_1.EItemType.Coin:
                    this._UpdateCoin(dt);
                    break;
                }
            };
            return ItemCmp;
        }(LTBehaviour_1.default);
        exports.default = ItemCmp;
    }, {
        "../LTGame/LTBehaviour": 30,
        "../LTGame/LTUtils/MathEx": 37,
        "../common/CollisionLayer": 51,
        "../common/EItemType": 52,
        "../common/EPropType": 53,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../state/EPlayerState": 95
    } ],
    50: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTBehaviour_1 = require("../LTGame/LTBehaviour");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var GameConst_1 = require("../common/GameConst");
        var StateMachine_1 = require("../LTGame/Fsm/StateMachine");
        var EPlayerState_1 = require("../state/EPlayerState");
        var PlayerStateMoveInRoad_1 = require("../state/PlayerStateMoveInRoad");
        var PlayerStateFlyup_1 = require("../state/PlayerStateFlyup");
        var PlayerStateFly_1 = require("../state/PlayerStateFly");
        var CollisionLayer_1 = require("../common/CollisionLayer");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var PlayerStateHitGround_1 = require("../state/PlayerStateHitGround");
        var PlayerStateJump_1 = require("../state/PlayerStateJump");
        var PlayerStateWaterUp_1 = require("../state/PlayerStateWaterUp");
        var PlayerStateWaterIdle_1 = require("../state/PlayerStateWaterIdle");
        var PlayerStateWaterDown_1 = require("../state/PlayerStateWaterDown");
        var PlayerStateForceFly_1 = require("../state/PlayerStateForceFly");
        var RankSpeedConfig_1 = require("../config/RankSpeedConfig");
        var Resdefine_1 = require("../common/Resdefine");
        var PlayerStateFixedFly_1 = require("../state/PlayerStateFixedFly");
        var PlayerStateLose_1 = require("../state/PlayerStateLose");
        var EPropType_1 = require("../common/EPropType");
        var PlayerStateHitWall_1 = require("../state/PlayerStateHitWall");
        var PlayerStateHitBoom_1 = require("../state/PlayerStateHitBoom");
        var PlayerStateDead_1 = require("../state/PlayerStateDead");
        var PlayerCmp = function(_super) {
            __extends(PlayerCmp, _super);
            function PlayerCmp() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._changeSpeed = 10;
                return _this;
            }
            Object.defineProperty(PlayerCmp.prototype, "currentState", {
                get: function() {
                    return this._fsm.currState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PlayerCmp.prototype, "skinConfig", {
                get: function() {
                    return this._skinConfig;
                },
                enumerable: true,
                configurable: true
            });
            PlayerCmp.prototype.Init = function(skinConfig) {
                this._skinConfig = skinConfig;
                this.collider = this.owner.getComponent(Laya.Rigidbody3D);
                this.collider.collisionGroup = CollisionLayer_1.default.Player;
                this.collider.canCollideWith = CollisionLayer_1.default.Ray;
                this.collider.enabled = false;
                this.degree = 0;
                this.moveDistance = 0;
                this.lastSeachIndex = 0;
                this.isInRoad = true;
                this.isHitEnd = false;
                this.speedScaleTime = 0;
                this.isSuperSpeedUp = false;
                this.killCount = 0;
                this._lastRankCount = 0;
                this.isFinished = false;
                this.currentAnim = Resdefine_1.default.anim_move;
                this._lastAnim = Resdefine_1.default.anim_move;
                this._eForceChangeState = EPlayerState_1.EPlayerState.None;
                var moveSpeedProp = GlobalUnit_1.default.skinManager.GetProp(this._skinConfig, EPropType_1.EPropType.MoveSpeed);
                if (moveSpeedProp != null) {
                    this._moveCenterSpeed = GameConst_1.default.roadMoveSpeedCenter * moveSpeedProp.pro_value;
                    this._moveBoaderSpeed = GameConst_1.default.roadMoveSpeedBoarder * moveSpeedProp.pro_value;
                } else {
                    this._moveCenterSpeed = GameConst_1.default.roadMoveSpeedCenter;
                    this._moveBoaderSpeed = GameConst_1.default.roadMoveSpeedBoarder;
                }
                this.initFlySpeed = GameConst_1.default.initFlyUpSpeed.clone();
                var flyForwardProp = GlobalUnit_1.default.skinManager.GetProp(this._skinConfig, EPropType_1.EPropType.FlySpeed);
                if (flyForwardProp != null) {
                    this.initFlySpeed.z = flyForwardProp.pro_value;
                }
                this.downAddSpeed = GameConst_1.default.downAddSpeed;
                var downAddSpeedProp = GlobalUnit_1.default.skinManager.GetProp(this._skinConfig, EPropType_1.EPropType.DownAddSpeed);
                if (downAddSpeedProp != null) {
                    this.downAddSpeed = downAddSpeedProp.pro_value;
                }
                this.animator = this.gameobject.getChildAt(0).getComponent(Laya.Animator);
                this.animator.cullingMode = Laya.Animator.CULLINGMODE_ALWAYSANIMATE;
                Laya.timer.frameOnce(1, this, function() {
                    this.animator.play(Resdefine_1.default.anim_move);
                });
                this.kingObj = Laya.Sprite3D.instantiate(Laya.loader.getRes(Resdefine_1.default.kingObjPath));
                this.animator.owner.addChild(this.kingObj);
                this.animator.linkSprite3DToAvatarNode("Point_King", this.kingObj);
                this.kingObj.active = false;
                this._fsm = new StateMachine_1.default();
                this._fsm.Add(new PlayerStateMoveInRoad_1.default(this));
                this._fsm.Add(new PlayerStateFlyup_1.default(this));
                this._fsm.Add(new PlayerStateFly_1.default(this));
                this._fsm.Add(new PlayerStateHitGround_1.default(this));
                this._fsm.Add(new PlayerStateJump_1.default(this));
                this._fsm.Add(new PlayerStateWaterUp_1.default(this));
                this._fsm.Add(new PlayerStateWaterIdle_1.default(this));
                this._fsm.Add(new PlayerStateWaterDown_1.default(this));
                this._fsm.Add(new PlayerStateForceFly_1.default(this));
                this._fsm.Add(new PlayerStateFixedFly_1.default(this));
                this._fsm.Add(new PlayerStateLose_1.default(this));
                this._fsm.Add(new PlayerStateHitWall_1.default(this));
                this._fsm.Add(new PlayerStateHitBoom_1.default(this));
                this._fsm.Add(new PlayerStateDead_1.default(this));
            };
            PlayerCmp.prototype.SpeedScale = function(targetSpeed, continueTime, isSpeedUp) {
                this.isSpeedUp = isSpeedUp;
                this.targetSpeed = targetSpeed;
                this.speedScaleTime = continueTime;
            };
            PlayerCmp.prototype.ShowKuzi = function(isBlue) {
                var skinMesh = this.gameobject.getChildAt(0).getChildByName("shenti");
                skinMesh.skinnedMeshRenderer.material.albedoTexture = Laya.loader.getRes(isBlue ? this.skinConfig.blue_tex : this.skinConfig.red_tex);
            };
            PlayerCmp.prototype.GenSpeed = function(dt) {
                if (GlobalUnit_1.default.gameManager.isEnd) {
                    this._endTime -= dt;
                    if (this._endTime < 0) {
                        this._endTime = 0;
                    }
                    return MathEx_1.default.Lerp(0, this._cacheSpeed, this._endTime / GameConst_1.default.endStopTime);
                }
                this.speedScaleTime -= dt;
                if (this.speedScaleTime > 0) {
                    this._currentSpeed = this.targetSpeed;
                    return this.targetSpeed;
                } else {
                    if (this.isSpeedUp) {
                        this.isSpeedUp = false;
                    }
                    var roadSpeed = MathEx_1.default.Lerp(this._moveCenterSpeed, this._moveBoaderSpeed, Math.abs(this.degree) / GameConst_1.default.maxRoadDegree);
                    if (this.rankSpeed == null || this.rankSpeed.rank_count != this.rankCount) {
                        for (var key in RankSpeedConfig_1.RankSpeedConfig.data) {
                            var configItem = RankSpeedConfig_1.RankSpeedConfig.data[key];
                            if (configItem == null) continue;
                            if (configItem.rank_count <= this.rankCount) {
                                this.rankSpeed = configItem;
                            }
                        }
                    }
                    roadSpeed *= this.rankSpeed.speed_scale;
                    if (this._currentSpeed == null) {
                        this._currentSpeed = roadSpeed;
                    } else {
                        if (this._currentSpeed < roadSpeed) {
                            this._currentSpeed += dt * this._changeSpeed;
                            if (this._currentSpeed > roadSpeed) {
                                this._currentSpeed = roadSpeed;
                            }
                        } else if (this._currentSpeed > roadSpeed) {
                            this._currentSpeed -= dt * this._changeSpeed;
                            if (this._currentSpeed < roadSpeed) {
                                this._currentSpeed = roadSpeed;
                            }
                        }
                    }
                    return this._currentSpeed;
                }
            };
            PlayerCmp.prototype.EndGame = function() {
                if (this.isFinished) return;
                this._cacheSpeed = this._currentSpeed;
                this._endTime = GameConst_1.default.endStopTime;
                this.FinishRace(false);
            };
            PlayerCmp.prototype.ForceChangeState = function(forceState) {
                this._eForceChangeState = forceState;
            };
            PlayerCmp.prototype.CheckHitPlayers = function() {
                if (GlobalUnit_1.default.gameManager.isEnd) return;
                if (this.currentState.currentState != EPlayerState_1.EPlayerState.MoveInRoad) return;
                var allPlayer = GlobalUnit_1.default.gameManager.allPlayers;
                for (var _i = 0, allPlayer_1 = allPlayer; _i < allPlayer_1.length; _i++) {
                    var player = allPlayer_1[_i];
                    if (player == this) continue;
                    if (player.currentState.currentState != EPlayerState_1.EPlayerState.MoveInRoad) continue;
                    var absDistance = Math.abs(this.moveDistance - player.moveDistance);
                    if (absDistance > 1.8) continue;
                    var absDegree = Math.abs(player.degree - this.degree);
                    if (absDegree > 5) continue;
                    this.OnHitPlayer(player);
                }
            };
            PlayerCmp.prototype.OnHitPlayer = function(hitPlayer) {
                if (hitPlayer == GlobalUnit_1.default.mainPlayer || this == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.audioManager.PlaySound(Resdefine_1.default.audio_hit_player);
                    GlobalUnit_1.default.Shake();
                }
                var degreeOffset = hitPlayer.degree - this.degree;
                if (this.isSuperSpeedUp) {
                    hitPlayer._fsm.ChangeState(EPlayerState_1.EPlayerState.ForceFly);
                    hitPlayer.isflyLeft = degreeOffset < 0;
                    this.killCount++;
                    if (GlobalUnit_1.default.mainPlayer == this) {
                        GlobalUnit_1.default.uiRoot.ui_fight.ShowHint(GameConst_1.default.killAddCoinCount);
                        GlobalUnit_1.default.Shake();
                    }
                    GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectHitPlayer, this.transform.position, this.transform.rotation, 2, this.gameobject);
                    return;
                }
                var distanceOffset = hitPlayer.moveDistance - this.moveDistance;
                if (distanceOffset <= 0) return;
                if (distanceOffset > 1 || hitPlayer.teamId == this.teamId && !GlobalUnit_1.default.gameManager.isSigleModel) {
                    var player_front = this.moveDistance > hitPlayer.moveDistance ? this : hitPlayer;
                    var player_behind = this.moveDistance > hitPlayer.moveDistance ? hitPlayer : this;
                    player_front.SpeedScale(GameConst_1.default.playerHitUpSpeed, GameConst_1.default.playerHitDownSpeedTime, true);
                    player_behind.SpeedScale(GameConst_1.default.playerHitDownSpeed, GameConst_1.default.playerHitDownSpeedTime, false);
                } else {
                    var selfAbsDegree = Math.abs(this.degreeSpeed);
                    var otherAbsDegree = Math.abs(hitPlayer.degreeSpeed);
                    var winPlayer;
                    var losePlayer;
                    var flyLeft = false;
                    if (selfAbsDegree > otherAbsDegree) {
                        winPlayer = this;
                        losePlayer = hitPlayer;
                        flyLeft = this.degreeSpeed < 0;
                    } else {
                        winPlayer = hitPlayer;
                        losePlayer = this;
                        flyLeft = hitPlayer.degreeSpeed < 0;
                    }
                    var beHitSpeedUpProp = GlobalUnit_1.default.skinManager.GetProp(losePlayer.skinConfig, EPropType_1.EPropType.BeHitSpeedUp);
                    if (beHitSpeedUpProp == null) {
                        losePlayer._fsm.ChangeState(EPlayerState_1.EPlayerState.ForceFly);
                        losePlayer.isflyLeft = flyLeft;
                    } else {
                        var randomValue = MathEx_1.default.Random(0, 1);
                        if (randomValue < beHitSpeedUpProp.pro_value) {
                            losePlayer.SpeedScale(GameConst_1.default.playerHitUpSpeed, GameConst_1.default.playerHitDownSpeedTime, true);
                            if (this == GlobalUnit_1.default.mainPlayer) {
                                GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectLinqiao, this.transform.position, this.transform.rotation, 2, this.gameobject);
                            }
                        } else {
                            losePlayer._fsm.ChangeState(EPlayerState_1.EPlayerState.ForceFly);
                            losePlayer.isflyLeft = flyLeft;
                        }
                    }
                    GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectHitPlayer, winPlayer.transform.position, winPlayer.transform.rotation, 2, winPlayer.gameobject);
                    winPlayer.killCount++;
                    if (winPlayer == GlobalUnit_1.default.mainPlayer) {
                        GlobalUnit_1.default.uiRoot.ui_fight.ShowHint(GameConst_1.default.killAddCoinCount);
                    }
                }
            };
            PlayerCmp.prototype.SetInitPos = function(initDistance, degree) {
                this.moveDistance = initDistance;
                this.degree = degree;
                this.lastSeachIndex = 0;
                this.UpdateViewPos();
            };
            PlayerCmp.prototype.StartMove = function() {
                this.isHitEnd = false;
                this.isInRoad = true;
                this.isSuperSpeedUp = false;
                this.isPressed = false;
                this.collider.enabled = true;
                this.moveSpeed = this.GenSpeed(0);
                this.jumpSpeed = GameConst_1.default.jumpForwardSpeed;
                this.lastSeachIndex = 0;
                this._fsm.ChangeState(EPlayerState_1.EPlayerState.MoveInRoad);
                this.targetSpeed = 0;
                this.speedScaleTime = 0;
                this.isSpeedUp = false;
                this.finishTime = -1;
                this.teamScore = 0;
            };
            PlayerCmp.prototype.RestartMove = function(distance, degree) {
                this.collider.enabled = true;
                this.moveDistance = distance;
                this.degree = degree;
                this._fsm.ChangeState(EPlayerState_1.EPlayerState.MoveInRoad);
                this.lastSeachIndex = 0;
            };
            PlayerCmp.prototype.FinishRace = function(isPassed) {
                if (this.isFinished) return;
                this.isFinished = true;
                var curDate = new Date();
                var passTime = curDate.getTime() - GlobalUnit_1.default.gameManager.startTime;
                this.finishTime = passTime / 1e3;
                if (!isPassed) {
                    this.finishTime += 1e4 + this.moveDistance / GlobalUnit_1.default.roadManager.totalDistance * 10;
                }
                GlobalUnit_1.default.gameManager.PlayerEndGame(this);
            };
            PlayerCmp.prototype.StopMove = function() {
                this.collider.enabled = false;
            };
            PlayerCmp.prototype.ResetPlayer = function() {
                this.killCount = 0;
                this.moveDistance = 0;
                this.degree = 0;
                this.isPressed = false;
                this.isInRoad = true;
                this.lastSeachIndex = 0;
            };
            PlayerCmp.prototype.HandleTurn = function(value) {
                if (this.isInRoad) {
                    this.degree -= value * GameConst_1.default.dragRoadDegree;
                } else if (this._fsm.currState.id == EPlayerState_1.EPlayerState.Fly) {
                    var flyDegree = MathEx_1.default.Clamp(value * GameConst_1.default.dragFlyDegree, -10, 10);
                    this.flyDegree -= flyDegree;
                }
            };
            PlayerCmp.prototype.LogicUpdate = function(dt) {
                var currentState = this._fsm.currState;
                if (this._eForceChangeState != EPlayerState_1.EPlayerState.None) {
                    if (currentState.id != this._eForceChangeState) {
                        this._fsm.ChangeState(this._eForceChangeState);
                    }
                    this._eForceChangeState = EPlayerState_1.EPlayerState.None;
                } else {
                    var nextState = currentState.GetNextState();
                    if (nextState != EPlayerState_1.EPlayerState.None) {
                        this._fsm.ChangeState(nextState);
                    }
                }
                this._fsm.OnRunning(dt);
                this._PlayAnim();
            };
            PlayerCmp.prototype._PlayAnim = function() {
                if (this._lastAnim == this.currentAnim) {
                    return;
                }
                if (this.animator == null) return;
                if (this._lastAnim == Resdefine_1.default.anim_move && this.currentAnim == Resdefine_1.default.anim_speedup || this._lastAnim == Resdefine_1.default.anim_speedup && this.currentAnim == Resdefine_1.default.anim_move) {
                    this.animator.play(this.currentAnim);
                } else {
                    this.animator.crossFade(this.currentAnim, .1);
                }
                this._lastAnim = this.currentAnim;
            };
            PlayerCmp.prototype.UpdateHeadInfo = function() {
                if (this.head_text == null) return;
                if (this._lastRankCount != this.rankCount) {
                    this._lastRankCount = this.rankCount;
                    this.head_text.UpdateRank();
                }
            };
            PlayerCmp.prototype.UpdateViewPos = function() {
                this.lastSeachIndex = GlobalUnit_1.default.roadManager.UpdateObj(this.gameobject, this.moveDistance, this.degree, this.lastSeachIndex);
            };
            return PlayerCmp;
        }(LTBehaviour_1.default);
        exports.default = PlayerCmp;
    }, {
        "../LTGame/Fsm/StateMachine": 29,
        "../LTGame/LTBehaviour": 30,
        "../LTGame/LTUtils/MathEx": 37,
        "../common/CollisionLayer": 51,
        "../common/EPropType": 53,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/RankSpeedConfig": 69,
        "../state/EPlayerState": 95,
        "../state/PlayerStateDead": 96,
        "../state/PlayerStateFixedFly": 97,
        "../state/PlayerStateFly": 98,
        "../state/PlayerStateFlyup": 99,
        "../state/PlayerStateForceFly": 100,
        "../state/PlayerStateHitBoom": 101,
        "../state/PlayerStateHitGround": 102,
        "../state/PlayerStateHitWall": 103,
        "../state/PlayerStateJump": 104,
        "../state/PlayerStateLose": 105,
        "../state/PlayerStateMoveInRoad": 106,
        "../state/PlayerStateWaterDown": 107,
        "../state/PlayerStateWaterIdle": 108,
        "../state/PlayerStateWaterUp": 109
    } ],
    51: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var CollisionLayer = function() {
            function CollisionLayer() {}
            CollisionLayer.Player = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER1;
            CollisionLayer.Road = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER2;
            CollisionLayer.Ray = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER3;
            CollisionLayer.EndPoint = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER4;
            CollisionLayer.Item = Laya.Physics3DUtils.COLLISIONFILTERGROUP_CUSTOMFILTER5;
            return CollisionLayer;
        }();
        exports.default = CollisionLayer;
    }, {} ],
    52: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EItemType;
        (function(EItemType) {
            EItemType[EItemType["SpeedUp"] = 0] = "SpeedUp";
            EItemType[EItemType["Block"] = 1] = "Block";
            EItemType[EItemType["CircleWall"] = 2] = "CircleWall";
            EItemType[EItemType["XiaoJiaoPi"] = 3] = "XiaoJiaoPi";
            EItemType[EItemType["Boom"] = 4] = "Boom";
            EItemType[EItemType["Coin"] = 5] = "Coin";
        })(EItemType = exports.EItemType || (exports.EItemType = {}));
    }, {} ],
    53: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EPropType;
        (function(EPropType) {
            EPropType[EPropType["Coin"] = 1] = "Coin";
            EPropType[EPropType["HitBlock"] = 2] = "HitBlock";
            EPropType[EPropType["UpSpeed"] = 3] = "UpSpeed";
            EPropType[EPropType["DownAddSpeed"] = 4] = "DownAddSpeed";
            EPropType[EPropType["SupperSpeedTime"] = 5] = "SupperSpeedTime";
            EPropType[EPropType["FlySpeed"] = 6] = "FlySpeed";
            EPropType[EPropType["HitPlayer"] = 7] = "HitPlayer";
            EPropType[EPropType["StartPos"] = 8] = "StartPos";
            EPropType[EPropType["MoveSpeed"] = 9] = "MoveSpeed";
            EPropType[EPropType["BeHitSpeedUp"] = 10] = "BeHitSpeedUp";
        })(EPropType = exports.EPropType || (exports.EPropType = {}));
    }, {} ],
    54: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EUnlockType;
        (function(EUnlockType) {
            EUnlockType[EUnlockType["Default"] = 0] = "Default";
            EUnlockType[EUnlockType["Coin"] = 1] = "Coin";
            EUnlockType[EUnlockType["Gift"] = 2] = "Gift";
            EUnlockType[EUnlockType["AD"] = 3] = "AD";
            EUnlockType[EUnlockType["Rank"] = 4] = "Rank";
            EUnlockType[EUnlockType["Sign"] = 5] = "Sign";
            EUnlockType[EUnlockType["Invite"] = 6] = "Invite";
        })(EUnlockType = exports.EUnlockType || (exports.EUnlockType = {}));
    }, {} ],
    55: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GameConst = function() {
            function GameConst() {}
            GameConst.roadMoveSpeedCenter = 20;
            GameConst.roadMoveSpeedBoarder = 16;
            GameConst.jumpForwardSpeed = 10;
            GameConst.initFlyUpSpeed = new Laya.Vector3(0, 4, 15);
            GameConst.minFlyDownSpeed = -15;
            GameConst.downAddSpeed = 4;
            GameConst.maxRoadDegree = 40;
            GameConst.dragRoadDegree = 250;
            GameConst.dragFlyDegree = 150;
            GameConst.backDegreeSpeed = 150;
            GameConst.minFlyDegree = 3.5;
            GameConst.initPlayerDistance = 5;
            GameConst.initUnitDistance = 3;
            GameConst.blockDownSpeed = .5 * GameConst.roadMoveSpeedCenter;
            GameConst.blockDownTime = 1.5;
            GameConst.speedUpSpeed = 2 * GameConst.roadMoveSpeedCenter;
            GameConst.speedUpTime = 5;
            GameConst.speedUpPropSpeed = GameConst.roadMoveSpeedCenter * .7;
            GameConst.genSpeedUpTime = 5;
            GameConst.playerHitUpSpeed = 1.2 * GameConst.roadMoveSpeedCenter;
            GameConst.playerHitUpSpeedTime = 1;
            GameConst.playerHitDownSpeed = .8 * GameConst.roadMoveSpeedCenter;
            GameConst.playerHitDownSpeedTime = .3;
            GameConst.safeDistance = 80;
            GameConst.aiRebornDistance = 5;
            GameConst.flyGenCoinTime = 1;
            GameConst.flyGenCoinCount = 1;
            GameConst.flyMaxGenCoinCount = 30;
            GameConst.killAddCoinCount = 10;
            GameConst.jumpEndDistance = 2.5;
            GameConst.endWaitTime = 5;
            GameConst.endStopTime = 2;
            GameConst.teamRankScore = [ 20, 16, 13, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0 ];
            GameConst.totalPlayerCount = 12;
            GameConst.maxRandomTexCount = 9;
            GameConst.coinTransUnit = 1;
            return GameConst;
        }();
        exports.default = GameConst;
    }, {} ],
    56: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var RoadManager_1 = require("../manager/RoadManager");
        var GameManager_1 = require("../manager/GameManager");
        var UIRoot_1 = require("../ui/UIRoot");
        var ItemManager_1 = require("../manager/ItemManager");
        var EffectManager_1 = require("../manager/EffectManager");
        var AIManager_1 = require("../manager/AIManager");
        var DataManager_1 = require("../manager/DataManager");
        var NameManager_1 = require("../manager/NameManager");
        var APIManager_1 = require("../../module/manager/APIManager");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var AudioManager_1 = require("../manager/AudioManager");
        var ShareManager_1 = require("../manager/ShareManager");
        var SkinManager_1 = require("../manager/SkinManager");
        var MapManager_1 = require("../manager/MapManager");
        var NoticeManager_1 = require("../manager/NoticeManager");
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var LTDictionary_1 = require("../LTGame/LTUtils/LTDictionary");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var GlobalUnit = function() {
            function GlobalUnit() {}
            GlobalUnit.InitAllManager = function() {
                this.dataManager = new DataManager_1.default();
                this.dataManager.Init();
                this.audioManager = new AudioManager_1.default();
                this.itemManager = new ItemManager_1.default();
                this.roadManager = new RoadManager_1.default();
                this.effectManager = new EffectManager_1.default();
                this.uiRoot = new UIRoot_1.default();
                this.gameManager = new GameManager_1.default();
                this.aiManager = new AIManager_1.default();
                this.nameManager = new NameManager_1.default();
                this.nameManager.Init();
                this.shareManager = new ShareManager_1.default();
                this.shareManager.Init();
                this.skinManager = new SkinManager_1.default();
                this.skinManager.Init();
                this.mapManager = new MapManager_1.default();
                this.mapManager.Init();
                this.noticeManager = new NoticeManager_1.default();
                this.noticeManager.Init();
                this._uiCache = new LTDictionary_1.default();
            };
            GlobalUnit.HasSaved = function() {
                var sceneId = SDKManager_1.default.inst.sdk.getSceneID();
                console.log("sceneId", sceneId);
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    return false;
                } else {
                    if (sceneId == 1022 || sceneId == 1023 || sceneId == 1089) {
                        return true;
                    }
                }
                return false;
            };
            GlobalUnit.EnableBannerMove = function() {
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) return true;
                return false;
                if (!MatterManager_1.default.adPolicy) return false;
                if (!MatterManager_1.default.inst.isReady) return false;
                return true;
            };
            GlobalUnit.PostEvent = function(eventId, paramName, paramValue) {
                APIManager_1.default.inst.api.eventPost(eventId, paramName, paramValue);
            };
            GlobalUnit.Shake = function() {
                if (GlobalUnit.dataManager.shakeOn) {
                    SDKManager_1.default.inst.sdk.vibrateShort();
                }
            };
            GlobalUnit.ShowUI = function(uiPath, prop) {
                if (prop === void 0) {
                    prop = null;
                }
                if (uiPath == null || uiPath == "") {
                    console.error("é”™è¯¯çš„ä¼ å…¥å‚æ•°:", uiPath);
                    return;
                }
                var uiCmp = this._uiCache.Get(uiPath);
                if (uiCmp == null) {
                    Laya.loader.create(uiPath, Laya.Handler.create(this, this._UILoaded, [ uiPath, prop ]));
                } else {
                    this._AddUI(uiCmp, prop);
                }
            };
            GlobalUnit.HideUI = function(uiPath, prop) {
                if (prop === void 0) {
                    prop = null;
                }
                var uiCmp = this._uiCache.Get(uiPath);
                if (uiCmp == null) {
                    console.error("uiæœªæ‰“å¼€", uiPath);
                    return;
                }
                uiCmp.HideUI();
            };
            GlobalUnit.GetUI = function(uiPath) {
                var uiCmp = this._uiCache.Get(uiPath);
                return uiCmp;
            };
            GlobalUnit._UILoaded = function(uiPath, prop) {
                var loadPrefab = Laya.loader.getRes(uiPath);
                if (loadPrefab == null) {
                    console.error("åŠ è½½çš„Prefabä¸ºç©º", uiPath);
                    return;
                }
                var instanceUI = loadPrefab.create();
                if (loadPrefab == null) {
                    console.error("æ— æ³•ä»Žprefabåˆ›å»ºview", loadPrefab);
                    return;
                }
                var selfUICmp = instanceUI.getComponent(LTUI_1.default);
                if (selfUICmp == null) {
                    console.log("æ— UIç»„ä»¶,ç›´æŽ¥æ·»åŠ ", instanceUI);
                    this.uiRoot.root.addChild(instanceUI);
                } else {
                    this._uiCache.Add(uiPath, selfUICmp);
                    this._AddUI(selfUICmp, prop);
                }
                SDKManager_1.default.inst.sdk.hideLoading();
            };
            GlobalUnit._AddUI = function(selfUICmp, prop) {
                if (prop != null) {
                    selfUICmp.openData = prop;
                }
                var findIndex = 0;
                for (var i = 0; i < this.uiRoot.root.numChildren; ++i) {
                    var getChild = this.uiRoot.root.getChildAt(i);
                    var uiCmp = getChild.getComponent(LTUI_1.default);
                    if (uiCmp != null && uiCmp.sortOrder > selfUICmp.sortOrder) {
                        break;
                    }
                    findIndex = i;
                }
                this.uiRoot.root.addChildAt(selfUICmp.owner, findIndex + 1);
            };
            return GlobalUnit;
        }();
        exports.default = GlobalUnit;
    }, {
        "../../module/manager/APIManager": 5,
        "../../module/manager/MatterManager": 7,
        "../../module/manager/SDKManager": 8,
        "../LTGame/LTUtils/LTDictionary": 31,
        "../LTGame/UIExt/LTUI": 41,
        "../manager/AIManager": 77,
        "../manager/AudioManager": 78,
        "../manager/DataManager": 80,
        "../manager/EffectManager": 81,
        "../manager/GameManager": 82,
        "../manager/ItemManager": 83,
        "../manager/MapManager": 84,
        "../manager/NameManager": 85,
        "../manager/NoticeManager": 86,
        "../manager/RoadManager": 88,
        "../manager/ShareManager": 89,
        "../manager/SkinManager": 90,
        "../ui/UIRoot": 119
    } ],
    57: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Resdefine = function() {
            function Resdefine() {}
            Resdefine.version = "v1.1.20_wx";
            Resdefine.adVersion = "1.0.79";
            Resdefine.prefix = "res/LayaScene_Main/Conventional/";
            Resdefine.behindfix = ".lh";
            Resdefine.cameraPath = Resdefine.prefix + "followCamera.lh";
            Resdefine.kingObjPath = Resdefine.prefix + "huangguan_01.lh";
            Resdefine.effectJumpWater = Resdefine.prefix + "LuoShui_ShuiHua" + Resdefine.behindfix;
            Resdefine.effectDownWater = Resdefine.prefix + "ShuiPao" + Resdefine.behindfix;
            Resdefine.effectUpWater = Resdefine.prefix + "ShuiPao2" + Resdefine.behindfix;
            Resdefine.effectShuibo = Resdefine.prefix + "ShuiBo" + Resdefine.behindfix;
            Resdefine.effectTail = Resdefine.prefix + "PengQi_TuoWei" + Resdefine.behindfix;
            Resdefine.effectBlockLeft = Resdefine.prefix + "Zhangai_03_Effect" + Resdefine.behindfix;
            Resdefine.effectBlockMiddle = Resdefine.prefix + "Zhangai_02_Effect" + Resdefine.behindfix;
            Resdefine.effectBlockRight = Resdefine.prefix + "Zhangai_01_Effect" + Resdefine.behindfix;
            Resdefine.effectXuanyun = Resdefine.prefix + "Sw_XuanYun" + Resdefine.behindfix;
            Resdefine.effectDead = Resdefine.prefix + "Sw_Yan" + Resdefine.behindfix;
            Resdefine.effectHitPlayer = Resdefine.prefix + "PengZhuangYan" + Resdefine.behindfix;
            Resdefine.flyEffect = Resdefine.prefix + "fly_tail" + Resdefine.behindfix;
            Resdefine.flyEffect2 = Resdefine.prefix + "fly_tail_xiaonanhai" + Resdefine.behindfix;
            Resdefine.flyEffect3 = Resdefine.prefix + "miaoniang_effect" + Resdefine.behindfix;
            Resdefine.effectWall = Resdefine.prefix + "men_effect" + Resdefine.behindfix;
            Resdefine.effectBoom = Resdefine.prefix + "boom_effect" + Resdefine.behindfix;
            Resdefine.effectCoin = Resdefine.prefix + "coin_effect" + Resdefine.behindfix;
            Resdefine.effectSou = Resdefine.prefix + "sou_effect" + Resdefine.behindfix;
            Resdefine.effectXiu = Resdefine.prefix + "xiu_effect" + Resdefine.behindfix;
            Resdefine.effectLinqiao = Resdefine.prefix + "linqiao_effect" + Resdefine.behindfix;
            Resdefine.effectMianyi = Resdefine.prefix + "mianyi_effect" + Resdefine.behindfix;
            Resdefine.pifu_scene = Resdefine.prefix + "pifu_01" + Resdefine.behindfix;
            Resdefine.speedUp = Resdefine.prefix + "jiasu_01" + Resdefine.behindfix;
            Resdefine.blockLeft = Resdefine.prefix + "Zhangai_03" + Resdefine.behindfix;
            Resdefine.blockMiddle = Resdefine.prefix + "Zhangai_02" + Resdefine.behindfix;
            Resdefine.blockRight = Resdefine.prefix + "Zhangai_01" + Resdefine.behindfix;
            Resdefine.circleBlock = Resdefine.prefix + "HS_men_01" + Resdefine.behindfix;
            Resdefine.xiangjiaopi = Resdefine.prefix + "HS_xiangjiaopi_01" + Resdefine.behindfix;
            Resdefine.boomPath = Resdefine.prefix + "HS_zhadan_01" + Resdefine.behindfix;
            Resdefine.coinPath = Resdefine.prefix + "HS_jinbi_01" + Resdefine.behindfix;
            Resdefine.anim_move = "swim";
            Resdefine.anim_speedup = "speed_swim";
            Resdefine.anim_fly = "fly";
            Resdefine.anim_dead = "stun";
            Resdefine.anim_jump = "jump";
            Resdefine.anim_swimup = "swimming";
            Resdefine.anim_swimidle = "swim_idle";
            Resdefine.anim_move_left = "swim_left";
            Resdefine.anim_move_right = "swim_right";
            Resdefine.anim_stand_win = "win";
            Resdefine.anim_stand_lose = "lose";
            Resdefine.anim_stand_show = "stand";
            Resdefine.anim_stand_random = "random";
            Resdefine.anim_jump_roll = "roll";
            Resdefine.anim_say_hello = "sayhello";
            Resdefine.audio_bg = "bg.mp3";
            Resdefine.audio_drop_water = "drop_water.mp3";
            Resdefine.audio_eat_prop = "eat_prop.mp3";
            Resdefine.audio_fly = "fly_sound.mp3";
            Resdefine.audio_hit_ground = "hit_ground.mp3";
            Resdefine.audio_hit_player = "hit_player.mp3";
            Resdefine.audio_hit_wall = "hit_wall.mp3";
            Resdefine.audio_win = "win.mp3";
            Resdefine.ID_LOAD_SCENE = "LOAD_SCENE";
            Resdefine.ID_MAIN_SCENE = "MAIN_SCENE";
            Resdefine.ID_GAME = "GAME_RANK_";
            return Resdefine;
        }();
        exports.default = Resdefine;
    }, {} ],
    58: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var AiConfig;
        (function(AiConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            AiConfig.config = config;
            AiConfig.path = "res/config/AiConfig.json";
        })(AiConfig = exports.AiConfig || (exports.AiConfig = {}));
    }, {} ],
    59: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var AiNameBehind;
        (function(AiNameBehind) {
            var config = function() {
                function config() {}
                return config;
            }();
            AiNameBehind.config = config;
            AiNameBehind.path = "res/config/AiNameBehind.json";
        })(AiNameBehind = exports.AiNameBehind || (exports.AiNameBehind = {}));
    }, {} ],
    60: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var AiNamePre;
        (function(AiNamePre) {
            var config = function() {
                function config() {}
                return config;
            }();
            AiNamePre.config = config;
            AiNamePre.path = "res/config/AiNamePre.json";
        })(AiNamePre = exports.AiNamePre || (exports.AiNamePre = {}));
    }, {} ],
    61: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var CharactorConfig;
        (function(CharactorConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            CharactorConfig.config = config;
            CharactorConfig.path = "res/config/CharactorConfig.json";
        })(CharactorConfig = exports.CharactorConfig || (exports.CharactorConfig = {}));
    }, {} ],
    62: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var DrawlotsConfig;
        (function(DrawlotsConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            DrawlotsConfig.config = config;
            DrawlotsConfig.path = "res/config/DrawlotsConfig.json";
        })(DrawlotsConfig = exports.DrawlotsConfig || (exports.DrawlotsConfig = {}));
    }, {} ],
    63: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var DrawlotsDesConfig;
        (function(DrawlotsDesConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            DrawlotsDesConfig.config = config;
            DrawlotsDesConfig.path = "res/config/DrawlotsDesConfig.json";
        })(DrawlotsDesConfig = exports.DrawlotsDesConfig || (exports.DrawlotsDesConfig = {}));
    }, {} ],
    64: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var HeadConfig;
        (function(HeadConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            HeadConfig.config = config;
            HeadConfig.path = "res/config/HeadConfig.json";
        })(HeadConfig = exports.HeadConfig || (exports.HeadConfig = {}));
    }, {} ],
    65: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LevelConfig;
        (function(LevelConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            LevelConfig.config = config;
            LevelConfig.path = "res/config/LevelConfig.json";
        })(LevelConfig = exports.LevelConfig || (exports.LevelConfig = {}));
    }, {} ],
    66: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LoadConfig;
        (function(LoadConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            LoadConfig.config = config;
            LoadConfig.path = "res/config/LoadConfig.json";
        })(LoadConfig = exports.LoadConfig || (exports.LoadConfig = {}));
    }, {} ],
    67: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ProertyConfig;
        (function(ProertyConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            ProertyConfig.config = config;
            ProertyConfig.path = "res/config/ProertyConfig.json";
        })(ProertyConfig = exports.ProertyConfig || (exports.ProertyConfig = {}));
    }, {} ],
    68: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var RankConfig;
        (function(RankConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            RankConfig.config = config;
            RankConfig.path = "res/config/RankConfig.json";
        })(RankConfig = exports.RankConfig || (exports.RankConfig = {}));
    }, {} ],
    69: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var RankSpeedConfig;
        (function(RankSpeedConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            RankSpeedConfig.config = config;
            RankSpeedConfig.path = "res/config/RankSpeedConfig.json";
        })(RankSpeedConfig = exports.RankSpeedConfig || (exports.RankSpeedConfig = {}));
    }, {} ],
    70: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var RoadConfig;
        (function(RoadConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            RoadConfig.config = config;
            RoadConfig.path = "res/config/RoadConfig.json";
        })(RoadConfig = exports.RoadConfig || (exports.RoadConfig = {}));
    }, {} ],
    71: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var SignConfig;
        (function(SignConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            SignConfig.config = config;
            SignConfig.path = "res/config/SignConfig.json";
        })(SignConfig = exports.SignConfig || (exports.SignConfig = {}));
    }, {} ],
    72: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var SpeedupConfig;
        (function(SpeedupConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            SpeedupConfig.config = config;
            SpeedupConfig.path = "res/config/SpeedupConfig.json";
        })(SpeedupConfig = exports.SpeedupConfig || (exports.SpeedupConfig = {}));
    }, {} ],
    73: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var WeekRankConfig;
        (function(WeekRankConfig) {
            var config = function() {
                function config() {}
                return config;
            }();
            WeekRankConfig.config = config;
            WeekRankConfig.path = "res/config/WeekRankConfig.json";
        })(WeekRankConfig = exports.WeekRankConfig || (exports.WeekRankConfig = {}));
    }, {} ],
    74: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var PlayerReadyData = function() {
            function PlayerReadyData() {}
            return PlayerReadyData;
        }();
        exports.default = PlayerReadyData;
    }, {} ],
    75: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTVector3Curve_1 = require("../LTGame/LTUtils/LTVector3Curve");
        var LTQuaternionCurve_1 = require("../LTGame/LTUtils/LTQuaternionCurve");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var RoadData = function() {
            function RoadData() {
                this._cacheRotQ = QuaternionEx_1.default.FromEulerAngle(0, 90, 0);
                this._posCurve = new LTVector3Curve_1.default();
                this._rotCurve = new LTQuaternionCurve_1.default();
            }
            RoadData.prototype.SetKey = function(progress, pos, rot) {
                this._posCurve.SetKey(progress, pos);
                var readQ = new Laya.Quaternion(rot.x, rot.y, rot.z, rot.w);
                this._rotCurve.SetKey(progress, readQ);
            };
            RoadData.prototype.GetPos = function(progress, searchIndex) {
                return this._posCurve.Evaluate(progress, searchIndex);
            };
            RoadData.prototype.GetRot = function(progress, searchIndex) {
                return this._rotCurve.Evaluate(progress, searchIndex);
            };
            return RoadData;
        }();
        exports.default = RoadData;
    }, {
        "../LTGame/LTUtils/LTQuaternionCurve": 33,
        "../LTGame/LTUtils/LTVector3Curve": 36,
        "../LTGame/LTUtils/QuaternionEx": 38
    } ],
    76: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTDictionary_1 = require("../LTGame/LTUtils/LTDictionary");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var BHandler_1 = require("../../module/utils/BHandler");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var UI_Banner_1 = require("../ui/UI_Banner");
        var DispatcherMrg_1 = require("../../module/manager/DispatcherMrg");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var ADManager = function() {
            function ADManager() {}
            Object.defineProperty(ADManager, "instance", {
                get: function() {
                    if (this._instance == null) {
                        this._instance = new ADManager();
                        this._instance.Init();
                    }
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            ADManager.prototype.Init = function() {
                this._videoShowCount = new LTDictionary_1.default();
                this._isShowBanner = false;
                DispatcherMrg_1.default.ins.on(SDKManager_1.default.Event_BannerOnErro, this, this._OnBannerFialed);
            };
            ADManager.prototype.ShowVideoAd = function(tag, onSuccess, onFailed) {
                Laya.timer.scale = 0;
                this._cacheSuccess = onSuccess;
                this._cacheFailed = onFailed;
                this._DoVideo();
            };
            ADManager.prototype._CanPlayVideo = function(tag) {
                return true;
                // if (!SDKManager_1.default.inst.sdk.canPlayVideo()) {
                //     console.log(tag, "æ— å¯ç”¨è§†å±å¹¿å‘Š");
                //     return false;
                // }
                // if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                //     return true;
                // }
                // var showCount = this._videoShowCount.Get(tag);
                // if (showCount == null) {
                //     this._videoShowCount.Add(tag, 1);
                //     return true;
                // } else {
                //     showCount++;
                //     this._videoShowCount.set(tag, showCount);
                //     var result = showCount < 4;
                //     if (!result) {
                //         console.log(tag, "è§†é¢‘å¹¿å‘Šå·²æ’­æ”¾è¶…è¿‡ä¸‰æ¬¡");
                //     }
                //     return result;
                // }
            };
            ADManager.prototype._DoShare = function() {
                SDKManager_1.default.inst.sdk.shareAppMessage(BHandler_1.default.create(this, this._OnShared), {
                    titile: "åˆ†äº«æ¸¸æˆ"
                });
            };
            ADManager.prototype._OnShared = function(res) {
                Laya.timer.scale = 1;
                var shareResult = GlobalUnit_1.default.shareManager.GetShareResult();
                if (shareResult) {
                    SDKManager_1.default.inst.sdk.showToast("åˆ†äº«æˆåŠŸ");
                    if (this._cacheSuccess != null) {
                        this._cacheSuccess.run();
                    }
                } else {
                    var randomStr = MathEx_1.default.RandomInt(0, 100) > 50 ? "è¯·åˆ†äº«åˆ°ç¾¤" : "è¯·æ¢ä¸ªç¾¤è¯•è¯•";
                    SDKManager_1.default.inst.sdk.showToast(randomStr);
                    if (this._cacheFailed != null) {
                        this._cacheFailed.run();
                    }
                }
            };
            ADManager.prototype._DoVideo = function() {

                platform.getInstance().showReward
                (
                    ()=>{
                        Laya.timer.scale = 1;
                        if (this._cacheSuccess != null) {
                            this._cacheSuccess.run();
                        }
                    },
                    ( e )=>{
                        Laya.timer.scale = 1;
                        console.log("e------->",e)
                        if (this._cacheFailed != null) {
                            this._cacheFailed.run();
                        }else{
                            platform.getInstance().showMessage(e);
                        }
                    }
                )

                // SDKManager_1.default.inst.sdk.showVideoAd(BHandler_1.default.create(this, this._OnVideoFinished));
            };
            ADManager.prototype._OnVideoFinished = function(res) {
                // Laya.timer.scale = 1;
                // if (res) {
                //     SDKManager_1.default.inst.sdk.showToast("è§‚çœ‹è§†é¢‘æˆåŠŸ,èŽ·å¾—å¥–åŠ±");
                //     if (this._cacheSuccess != null) {
                //         this._cacheSuccess.run();
                //     }
                // } else {
                //     SDKManager_1.default.inst.sdk.showToast("è·³è¿‡è§‚çœ‹è§†é¢‘,æ— å¥–åŠ±");
                //     if (this._cacheFailed != null) {
                //         this._cacheFailed.run();
                //     }
                // }
            };
            ADManager.prototype._OnBannerFialed = function() {
                if (!this._isShowBanner) return;
                var canShowBanner = SDKManager_1.default.inst.sdk.canShowBanner() == 0;
                if (!canShowBanner) {
                    UI_Banner_1.default.ShowAD();
                }
            };
            ADManager.prototype.ShowBanner = function() {
                if (MatterManager_1.default.adPolicy && MatterManager_1.default.inst.isReady) {} else {
                    return;
                }
                if (this._isShowBanner) return;
                if (SDKManager_1.default.inst.sdk.canShowBanner() == 0) {
                    if (SDKManager_1.default.inst.sdk.phoneInfo == null) {
                        SDKManager_1.default.inst.sdk.showBanner();
                    } else {
                        SDKManager_1.default.inst.sdk.showBanner(0, null, SDKManager_1.default.inst.sdk.phoneInfo.windowWidth);
                    }
                } else {
                    UI_Banner_1.default.ShowAD();
                }
                this._isShowBanner = true;
            };
            ADManager.prototype.HideBanner = function() {
                this._isShowBanner = false;
                SDKManager_1.default.inst.sdk.hideBannder();
                UI_Banner_1.default.HideAD();
            };
            return ADManager;
        }();
        exports.default = ADManager;
    }, {
        "../../module/manager/DispatcherMrg": 6,
        "../../module/manager/MatterManager": 7,
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/LTUtils/LTDictionary": 31,
        "../LTGame/LTUtils/MathEx": 37,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../ui/UI_Banner": 120
    } ],
    77: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var AgentPlayer_1 = require("../ai/AgentPlayer");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var AIManager = function() {
            function AIManager() {}
            AIManager.prototype.Init = function() {
                this.aiPlayers = [];
                var allAiPlayer = GlobalUnit_1.default.gameManager.aiPlayers;
                for (var i = 0; i < allAiPlayer.length; ++i) {
                    var viewPlayer = allAiPlayer[i];
                    var agentPlayer = new AgentPlayer_1.default(viewPlayer);
                    agentPlayer.StartLogic();
                    this.aiPlayers.push(agentPlayer);
                }
            };
            AIManager.prototype.LogicUpdate = function(dt) {
                for (var _i = 0, _a = this.aiPlayers; _i < _a.length; _i++) {
                    var aiPlayer = _a[_i];
                    if (!aiPlayer.viewPlayer.isFinished) {
                        aiPlayer.LogicUpdate(dt);
                    }
                }
            };
            return AIManager;
        }();
        exports.default = AIManager;
    }, {
        "../ai/AgentPlayer": 45,
        "../common/GlobalUnit": 56
    } ],
    78: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var AudioManager = function() {
            function AudioManager() {}
            AudioManager.prototype.Init = function() {};
            AudioManager.prototype.PlayMusic = function(soundStr) {};
            AudioManager.prototype.PlaySound = function(soundStr) {};
            return AudioManager;
        }();
        exports.default = AudioManager;
    }, {} ],
    79: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Bd_helper_1 = require("../../module/sdk/baidu/Bd_helper");
        var BDHelper = function(_super) {
            __extends(BDHelper, _super);
            function BDHelper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BDHelper.prototype.onInit = function() {
                _super.prototype.onInit.call(this);
                this.Video_adunit = "6374349";
                this.Banner_adunit = "6374346";
                this.Banner_appSid = "c79c794e";
            };
            return BDHelper;
        }(Bd_helper_1.default);
        exports.default = BDHelper;
    }, {
        "../../module/sdk/baidu/Bd_helper": 15
    } ],
    80: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var RankConfig_1 = require("../config/RankConfig");
        var LTDictionary_1 = require("../LTGame/LTUtils/LTDictionary");
        var StringEx_1 = require("../LTGame/LTUtils/StringEx");
        var CharactorConfig_1 = require("../config/CharactorConfig");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var TimeUtil_1 = require("../../module/utils/TimeUtil");
        var DataManager = function() {
            function DataManager() {
                this._coinCount_KEY = "coinCount";
                this._campionCount_KEY = "campionCount";
                this._lastOpenTime_KEY = "lastOpenTime";
                this._musicOn_KEY = "musicOn";
                this._shakeOn_KEY = "shakeOn";
                this._cupCount_KEY = "cupCount";
                this._maxCupCount_KEY = "maxCupCount";
                this._saveFastTime_KEY = "_saveFastTime";
                this._unlockedSkinIds_KEY = "_unlockedSkinIds";
                this._trySkinCount_KEY = "_trySkinCount";
                this._currentSkinId_KEY = "_currentSkinId";
                this._unlockProgress_KEY = "_unlockProgress";
                this._rebornCardCount_KEY = "rebornCardCount";
                this.matchNum = 0;
                this.lastLoginTimeKey = "lastLoginTimeKey";
                this.lastLoginTime = 0;
                this.isTwo11 = false;
                this.isGetTwo11RewardKey = "isGetTwo11RewardKey";
                this.isGetTwo11Reward = 0;
                this.isOpenSignEdKey = "isOpenSignEdKey";
                this.giftData = null;
            }
            DataManager.prototype.isPassData = function() {
                var curTime = TimeUtil_1.default.getTime();
                var bool = TimeUtil_1.default.isPassData(this.lastLoginTime, curTime);
                if (bool) {
                    this.saveTwo11RewardStatus(0);
                    this.saveOpenSignEd(1);
                    this.lastLoginTime = curTime;
                    Laya.LocalStorage.setItem(this.lastLoginTimeKey, curTime.toString());
                }
                return bool;
            };
            DataManager.prototype.saveTwo11RewardStatus = function(status) {
                this.isGetTwo11Reward = 0;
                Laya.LocalStorage.setItem(this.isGetTwo11RewardKey, status.toString());
            };
            DataManager.prototype.Init = function() {
                this.matchCoin = 0;
                if (Laya.LocalStorage.getItem(this.lastLoginTimeKey) != null) {
                    this.lastLoginTime = Number(Laya.LocalStorage.getItem(this.lastLoginTimeKey));
                } else {
                    this.lastLoginTime = 0;
                }
                if (Laya.LocalStorage.getItem(this.isGetTwo11RewardKey) != null) {
                    this.isGetTwo11Reward = Number(Laya.LocalStorage.getItem(this.isGetTwo11RewardKey));
                } else {
                    this.isGetTwo11Reward = 0;
                }
                this.coinCount = parseInt(Laya.LocalStorage.getItem(this._coinCount_KEY));
                if (isNaN(this.coinCount) || this.coinCount < 0) {
                    this.coinCount = 0;
                }
                this.rebornCardCount = parseInt(Laya.LocalStorage.getItem(this._rebornCardCount_KEY));
                if (isNaN(this.rebornCardCount) || this.rebornCardCount < 0) {
                    this.rebornCardCount = 0;
                }
                this.campionCount = parseInt(Laya.LocalStorage.getItem(this._campionCount_KEY));
                if (isNaN(this.campionCount) || this.campionCount < 0) {
                    this.campionCount = 0;
                }
                this.cupCount = parseInt(Laya.LocalStorage.getItem(this._cupCount_KEY));
                if (isNaN(this.cupCount) || this.cupCount < 0) {
                    this.cupCount = this.campionCount;
                }
                this.maxCupCount = parseInt(Laya.LocalStorage.getItem(this._maxCupCount_KEY));
                if (isNaN(this.maxCupCount) || this.maxCupCount < 0) {
                    this.maxCupCount = this.cupCount;
                }
                var saveFastTime = Laya.LocalStorage.getItem(this._saveFastTime_KEY);
                this._saveFastTime = new LTDictionary_1.default();
                if (saveFastTime == null || saveFastTime == "") {} else {
                    var splitStrs = saveFastTime.split("|");
                    for (var _i = 0, splitStrs_1 = splitStrs; _i < splitStrs_1.length; _i++) {
                        var splitStr = splitStrs_1[_i];
                        var splitNumStrs = splitStr.split(",");
                        var num1 = parseInt(splitNumStrs[0]);
                        var num2 = parseFloat(splitNumStrs[1]);
                        this._saveFastTime.Add(num1, num2);
                    }
                }
                var saveUnlockSkinStr = Laya.LocalStorage.getItem(this._unlockedSkinIds_KEY);
                if (saveUnlockSkinStr == null || saveUnlockSkinStr == "") {
                    this._unlockedSkinIds = [ 1 ];
                } else {
                    this._unlockedSkinIds = StringEx_1.default.SplitToIntArray(saveUnlockSkinStr, ",");
                }
                var saveTrySkinStr = Laya.LocalStorage.getItem(this._trySkinCount_KEY);
                this._trySkinCount = new LTDictionary_1.default();
                if (saveTrySkinStr == null || saveTrySkinStr == "") {} else {
                    var splitStrs = saveTrySkinStr.split("|");
                    for (var _a = 0, splitStrs_2 = splitStrs; _a < splitStrs_2.length; _a++) {
                        var splitStr = splitStrs_2[_a];
                        var splitNumStrs = splitStr.split(",");
                        var num1 = parseInt(splitNumStrs[0]);
                        var num2 = parseInt(splitNumStrs[1]);
                        this._trySkinCount.Add(num1, num2);
                    }
                }
                var saveUnlockProgressStr = Laya.LocalStorage.getItem(this._unlockProgress_KEY);
                this._unlockProgress = new LTDictionary_1.default();
                if (saveUnlockProgressStr == null || saveUnlockProgressStr == "") {} else {
                    var splitStrs = saveUnlockProgressStr.split("|");
                    for (var _b = 0, splitStrs_3 = splitStrs; _b < splitStrs_3.length; _b++) {
                        var splitStr = splitStrs_3[_b];
                        var splitNumStrs = splitStr.split(",");
                        var num1 = parseInt(splitNumStrs[0]);
                        var num2 = parseInt(splitNumStrs[1]);
                        this._unlockProgress.Add(num1, num2);
                    }
                }
                this.currentSkinId = parseInt(Laya.LocalStorage.getItem(this._currentSkinId_KEY));
                if (isNaN(this.currentSkinId) || this.currentSkinId < 0) {
                    this.currentSkinId = this._unlockedSkinIds[0];
                }
                this.lastOpenTime = parseInt(Laya.LocalStorage.getItem(this._lastOpenTime_KEY));
                var getMusicOn = parseInt(Laya.LocalStorage.getItem(this._musicOn_KEY));
                this.musicOn = isNaN(getMusicOn) || getMusicOn == 1;
                var getSahkeOn = parseInt(Laya.LocalStorage.getItem(this._shakeOn_KEY));
                this.shakeOn = isNaN(getSahkeOn) || getSahkeOn == 1;
                var rankInfo = this.GetRankInfo(this.cupCount);
                for (var i = 1; i < rankInfo.id; ++i) {
                    var searchRank = RankConfig_1.RankConfig.data[i];
                    for (var j = 0; j < searchRank.unlock_type.length; ++j) {
                        var unlockType = searchRank.unlock_type[j];
                        var unlockValue = searchRank.unlock_value[j];
                        if (unlockType == 2) {
                            this.UnlockSkin(unlockValue);
                        }
                    }
                }
            };
            DataManager.prototype.HasMapNew = function() {
                return this._mapIds != null;
            };
            DataManager.prototype.IsMapNew = function(key) {
                if (this._mapIds == null) return false;
                return this._mapIds.indexOf(key) >= 0;
            };
            DataManager.prototype.MarkMapOld = function() {
                this._mapIds = null;
            };
            DataManager.prototype.MarkMapNew = function(mapId) {
                if (this._mapIds == null) {
                    this._mapIds = [];
                }
                this._mapIds.push(mapId);
            };
            DataManager.prototype.GetFastScore = function(key) {
                if (this._saveFastTime.ContainsKey(key)) {
                    return this._saveFastTime.Get(key);
                }
                return 500;
            };
            DataManager.prototype.SetFastScore = function(key, value) {
                this._saveFastTime.set(key, value);
            };
            DataManager.prototype.UploadScore = function() {
                if (SDKManager_1.default.inst.openID != undefined) {
                    SDKManager_1.default.inst.sdk.postMsg({
                        method: "updateMaxScore",
                        maxscore: this.campionCount,
                        maxscore2: null,
                        userId: SDKManager_1.default.inst.openID
                    });
                }
            };
            DataManager.prototype.Save = function() {
                Laya.LocalStorage.setItem(this._coinCount_KEY, this.coinCount.toFixed(0));
                Laya.LocalStorage.setItem(this._rebornCardCount_KEY, this.rebornCardCount.toFixed(0));
                Laya.LocalStorage.setItem(this._campionCount_KEY, this.campionCount.toFixed(0));
                Laya.LocalStorage.setItem(this._lastOpenTime_KEY, this.lastOpenTime.toFixed(0));
                Laya.LocalStorage.setItem(this._musicOn_KEY, this.musicOn ? "1" : "0");
                Laya.LocalStorage.setItem(this._shakeOn_KEY, this.shakeOn ? "1" : "0");
                Laya.LocalStorage.setItem(this._cupCount_KEY, this.cupCount.toFixed(0));
                Laya.LocalStorage.setItem(this._maxCupCount_KEY, this.maxCupCount.toFixed(0));
                Laya.LocalStorage.setItem(this._currentSkinId_KEY, this.currentSkinId.toFixed(0));
                var saveFastKey = "";
                for (var i = 0; i < this._saveFastTime.count; ++i) {
                    var key = this._saveFastTime.keys[i];
                    var value = this._saveFastTime.values[i];
                    saveFastKey += key + "," + value;
                    if (i < this._saveFastTime.count - 1) {
                        saveFastKey += "|";
                    }
                }
                Laya.LocalStorage.setItem(this._saveFastTime_KEY, saveFastKey);
                var saveUnlockSkinStr = StringEx_1.default.IntArrToStr(this._unlockedSkinIds);
                Laya.LocalStorage.setItem(this._unlockedSkinIds_KEY, saveUnlockSkinStr);
                var saveTryCountStr = "";
                for (var i = 0; i < this._trySkinCount.count; ++i) {
                    var key = this._trySkinCount.keys[i];
                    var value = this._trySkinCount.values[i];
                    saveTryCountStr += key + "," + value;
                    if (i < this._trySkinCount.count - 1) {
                        saveTryCountStr += "|";
                    }
                }
                Laya.LocalStorage.setItem(this._trySkinCount_KEY, saveTryCountStr);
                var saveUnlockProgress = "";
                for (var i = 0; i < this._unlockProgress.count; ++i) {
                    var key = this._unlockProgress.keys[i];
                    var value = this._unlockProgress.values[i];
                    saveUnlockProgress += key + "," + value;
                    if (i < this._unlockProgress.count - 1) {
                        saveUnlockProgress += "|";
                    }
                }
                Laya.LocalStorage.setItem(this._unlockProgress_KEY, saveUnlockProgress);
            };
            DataManager.prototype.GetRankStr = function(rankCount) {
                if(rankCount === 1){
                    return "1st";
                }
                else if(rankCount === 2){
                    return "2nd";
                }
                else if(rankCount === 3){
                    return "3rd";
                }
                return rankCount + "th";
            };
            Object.defineProperty(DataManager.prototype, "currentRankInfo", {
                get: function() {
                    return this.GetRankInfo(this.cupCount);
                },
                enumerable: true,
                configurable: true
            });
            DataManager.prototype.GetRankProgress = function(cupCount) {
                var rankInfo = this.GetRankInfo(cupCount);
                var nextRankInfo = RankConfig_1.RankConfig.data[rankInfo.id + 1];
                if (nextRankInfo == null) return 1;
                return cupCount / nextRankInfo.cup_count;
            };
            DataManager.prototype.GetRankInfo = function(cupCount) {
                var lastRankInfo = RankConfig_1.RankConfig.dataList[0];
                for (var i = 1; i < RankConfig_1.RankConfig.dataList.length; ++i) {
                    var rankInfo = RankConfig_1.RankConfig.dataList[i];
                    if (cupCount < rankInfo.cup_count) {
                        return lastRankInfo;
                    }
                    lastRankInfo = rankInfo;
                }
                return lastRankInfo;
            };
            DataManager.prototype.GetTryCount = function(skinId) {
                if (this._trySkinCount.ContainsKey(skinId)) {
                    var value = this._trySkinCount.Get(skinId);
                    if (isNaN(value)) {
                        return 0;
                    }
                    return value;
                }
                return 0;
            };
            DataManager.prototype.GetUnlockProgress = function(skinId) {
                if (this._unlockProgress.ContainsKey(skinId)) {
                    return this._unlockProgress.Get(skinId);
                }
                return 0;
            };
            DataManager.prototype.SetUnlockProgress = function(skinId, value) {
                if (this.IsSkinUnlocked(skinId)) {
                    return;
                }
                this._unlockProgress.set(skinId, value);
            };
            DataManager.prototype.IsSkinUnlocked = function(skinId) {
                var index = this._unlockedSkinIds.indexOf(skinId);
                return index >= 0;
            };
            DataManager.prototype.AddTryCount = function(skinId) {
                if (this.IsSkinUnlocked(skinId)) {
                    return;
                }
                if (this._trySkinCount.ContainsKey(skinId)) {
                    var oldCount = this._trySkinCount.Get(skinId);
                    if (isNaN(oldCount)) {
                        oldCount = 0;
                    }
                    oldCount++;
                    var skinConfig = CharactorConfig_1.CharactorConfig.data[skinId];
                    if (skinConfig.try_count < 0) return;
                    if (oldCount >= skinConfig.try_count) {
                        this.UnlockSkin(skinId);
                    } else {
                        this._trySkinCount.set(skinId, oldCount);
                    }
                } else {
                    this._trySkinCount.Add(skinId, 1);
                }
            };
            DataManager.prototype.UnlockSkin = function(skinId) {
                if (this.IsSkinUnlocked(skinId)) {
                    return;
                }
                this._unlockedSkinIds.push(skinId);
                this._trySkinCount.Remove(skinId);
            };
            DataManager.prototype.GetTrySkinConfig = function() {
                var allCharactor = CharactorConfig_1.CharactorConfig.dataList;
                var canTryIds = [];
                for (var _i = 0, allCharactor_1 = allCharactor; _i < allCharactor_1.length; _i++) {
                    var charactor = allCharactor_1[_i];
                    if (charactor.can_try && this._unlockedSkinIds.indexOf(charactor.id) < 0) {
                        canTryIds.push(charactor.id);
                    }
                }
                if (canTryIds.length <= 0) return null;
                var randomId = MathEx_1.default.RandomFromArray(canTryIds);
                return CharactorConfig_1.CharactorConfig.data[randomId];
            };
            Object.defineProperty(DataManager.prototype, "lastSignLoginDate", {
                get: function() {
                    var str = Laya.LocalStorage.getItem(DataManager._lastSignLogin_key);
                    return str;
                },
                set: function(value) {
                    Laya.LocalStorage.setItem(DataManager._lastSignLogin_key, value);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataManager.prototype, "curSignDay", {
                get: function() {
                    var str = Laya.LocalStorage.getItem(DataManager._curSignDay_key);
                    if (str) {
                        return Number(str);
                    }
                    return 0;
                },
                set: function(value) {
                    Laya.LocalStorage.setItem(DataManager._curSignDay_key, value.toString());
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataManager.prototype, "isGetSignReward", {
                get: function() {
                    var str = Laya.LocalStorage.getItem(DataManager._isGetSignReward_key);
                    if (str) {
                        return Number(str) > 0;
                    }
                    return false;
                },
                set: function(value) {
                    Laya.LocalStorage.setItem(DataManager._isGetSignReward_key, value ? "1" : "0");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataManager.prototype, "isOpenSignEd", {
                get: function() {
                    var a = Laya.LocalStorage.getItem(this.isOpenSignEdKey) ? Laya.LocalStorage.getItem(this.isOpenSignEdKey) : "0";
                    return a == "1";
                },
                enumerable: true,
                configurable: true
            });
            DataManager.prototype.saveOpenSignEd = function(status) {
                Laya.LocalStorage.setItem(this.isOpenSignEdKey, status.toString());
            };
            Object.defineProperty(DataManager.prototype, "lastWeekRewardDate", {
                get: function() {
                    var str = Laya.LocalStorage.getItem(DataManager._lastWeekRewardDate_key);
                    return str;
                },
                set: function(value) {
                    Laya.LocalStorage.setItem(DataManager._lastWeekRewardDate_key, value);
                },
                enumerable: true,
                configurable: true
            });
            DataManager.prototype.getWeekRankRewardStatus = function(mapId) {
                var str = Laya.LocalStorage.getItem(DataManager._isGetWeekReward_key + mapId);
                if (str) {
                    return Number(str) > 0;
                }
                return false;
            };
            DataManager.prototype.setWeekRankRewardsStatus = function(mapId, value) {
                Laya.LocalStorage.setItem(DataManager._isGetWeekReward_key + mapId, value ? "1" : "0");
            };
            DataManager.prototype.isHaveGift = function() {
                return this.giftData != null;
            };
            DataManager.prototype.saveGiftData = function() {
                if (this.giftData) {
                    var tempA = this.giftData;
                    var len = tempA.length;
                    for (var i = 0; i < len; i++) {
                        var resultA = tempA[i].split("#");
                        switch (resultA[0]) {
                          case "1":
                            this.showGiftTip(Number(resultA[1]));
                            break;

                          case "2":
                            break;
                        }
                    }
                }
                this.giftData = null;
            };
            DataManager.prototype.saveGift = function(data) {
                if (data) {
                    if (data.lbRule) {
                        this.giftData = data.lbRule;
                    }
                }
            };
            DataManager.prototype.showGiftTip = function(num) {
                GlobalUnit_1.default.dataManager.coinCount += num;
                GlobalUnit_1.default.dataManager.Save();
                var randomStr = "é¢†å–ç¤¼åŒ…æˆåŠŸ";
                SDKManager_1.default.inst.sdk.showToast(randomStr);
                if (GlobalUnit_1.default.uiRoot && GlobalUnit_1.default.uiRoot.ui_main) {
                    GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                }
            };
            DataManager._isGetSignReward_key = "isGetSignReward_key";
            DataManager._curSignDay_key = "curDayLoginTimes_key";
            DataManager._lastSignLogin_key = "lastLogin_key";
            DataManager._isGetWeekReward_key = "isGetWeekReward_key";
            DataManager._lastWeekRewardDate_key = "_lastWeekRewardDate_key";
            return DataManager;
        }();
        exports.default = DataManager;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/utils/TimeUtil": 26,
        "../LTGame/LTUtils/LTDictionary": 31,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/StringEx": 39,
        "../common/GlobalUnit": 56,
        "../config/CharactorConfig": 61,
        "../config/RankConfig": 68
    } ],
    81: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var LTObjPool_1 = require("../LTGame/LTUtils/LTObjPool");
        var EffectManager = function() {
            function EffectManager() {
                this._effectUrls = [];
                this._isWarmed = false;
                this._effectUrls.push(Resdefine_1.default.effectJumpWater);
                this._effectUrls.push(Resdefine_1.default.effectDownWater);
                this._effectUrls.push(Resdefine_1.default.effectShuibo);
                this._effectUrls.push(Resdefine_1.default.effectUpWater);
                this._effectUrls.push(Resdefine_1.default.effectBlockLeft);
                this._effectUrls.push(Resdefine_1.default.effectBlockMiddle);
                this._effectUrls.push(Resdefine_1.default.effectBlockRight);
                this._effectUrls.push(Resdefine_1.default.effectXuanyun);
                this._effectUrls.push(Resdefine_1.default.effectDead);
                this._effectUrls.push(Resdefine_1.default.effectTail);
                this._effectUrls.push(Resdefine_1.default.effectHitPlayer);
                this._effectUrls.push(Resdefine_1.default.flyEffect);
                this._effectUrls.push(Resdefine_1.default.effectWall);
                this._effectUrls.push(Resdefine_1.default.effectBoom);
                this._effectUrls.push(Resdefine_1.default.effectCoin);
                this._effectUrls.push(Resdefine_1.default.effectSou);
                this._effectUrls.push(Resdefine_1.default.effectXiu);
                this._effectUrls.push(Resdefine_1.default.flyEffect2);
                this._effectUrls.push(Resdefine_1.default.flyEffect3);
                this._effectUrls.push(Resdefine_1.default.effectLinqiao);
                this._effectUrls.push(Resdefine_1.default.effectMianyi);
            }
            EffectManager.prototype.Preload = function(urls) {
                if (this._isWarmed) return;
                for (var _i = 0, _a = this._effectUrls; _i < _a.length; _i++) {
                    var url = _a[_i];
                    urls.push(url);
                }
                urls.push(Resdefine_1.default.blockLeft);
                urls.push(Resdefine_1.default.blockMiddle);
                urls.push(Resdefine_1.default.blockRight);
                urls.push(Resdefine_1.default.speedUp);
                urls.push(Resdefine_1.default.circleBlock);
                urls.push(Resdefine_1.default.xiangjiaopi);
                urls.push(Resdefine_1.default.boomPath);
                urls.push(Resdefine_1.default.coinPath);
            };
            EffectManager.prototype.WarmUp = function() {
                if (this._isWarmed) return;
                this._isWarmed = true;
                for (var _i = 0, _a = this._effectUrls; _i < _a.length; _i++) {
                    var effectUrl = _a[_i];
                    this._WarmupSingleEffect(effectUrl);
                }
            };
            EffectManager.prototype._WarmupSingleEffect = function(effectStr) {
                var loadEffect = GlobalUnit_1.default.s3d.addChild(Laya.loader.getRes(effectStr));
                LTObjPool_1.default.instance.InitObjPool(effectStr, loadEffect);
                Laya.timer.frameOnce(1, this, function() {
                    GlobalUnit_1.default.s3d.removeChild(loadEffect);
                });
            };
            EffectManager.prototype.ReturnEffect = function(effectStr, obj) {
                if (obj == null || obj.destroyed) return;
                if (obj.parent != null) {
                    obj.parent.removeChild(obj);
                }
                LTObjPool_1.default.instance.ReturnObj(effectStr, obj);
            };
            EffectManager.prototype.GenEffect = function(effectStr, pos, rot, effectTime, parent) {
                var effectObj = LTObjPool_1.default.instance.GetObj(effectStr);
                if (effectObj == null) return null;
                if (parent != null) {
                    parent.addChild(effectObj);
                } else {
                    GlobalUnit_1.default.s3d.addChild(effectObj);
                }
                if (pos != null) {
                    effectObj.transform.position = pos;
                }
                if (rot != null) {
                    effectObj.transform.rotation = rot;
                }
                if (effectTime != null) {
                    Laya.timer.once(effectTime * 1e3, this, function() {
                        GlobalUnit_1.default.effectManager.ReturnEffect(effectStr, effectObj);
                    });
                }
                return effectObj;
            };
            return EffectManager;
        }();
        exports.default = EffectManager;
    }, {
        "../LTGame/LTUtils/LTObjPool": 32,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57
    } ],
    82: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var PlayerCmp_1 = require("../cmp/PlayerCmp");
        var Resdefine_1 = require("../common/Resdefine");
        var GameConst_1 = require("../common/GameConst");
        var FollowCamera_1 = require("../cmp/FollowCamera");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var CharactorConfig_1 = require("../config/CharactorConfig");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var PlayerReadyData_1 = require("../data/PlayerReadyData");
        var LTUtils_1 = require("../LTGame/LTUtils/LTUtils");
        var EPropType_1 = require("../common/EPropType");
        var GameManager = function() {
            function GameManager() {}
            GameManager.prototype.CreateMainScene = function(isFirst) {
                if (!isFirst) {
                    GlobalUnit_1.default.s3d.removeChild(GlobalUnit_1.default.followCamera.owner);
                    GlobalUnit_1.default.s3d.removeChild(GlobalUnit_1.default.roadManager.sceneObj);
                    GlobalUnit_1.default.s3d.destroy(true);
                }
                GlobalUnit_1.default.s3d = new Laya.Scene3D();
                GlobalUnit_1.default.roadManager.InitMainScene();
                Laya.stage.addChildAt(GlobalUnit_1.default.s3d, 0);
                GlobalUnit_1.default.gameManager.Init(true);
                if (isFirst) {
                    GlobalUnit_1.default.followCamera = Laya.loader.getRes(Resdefine_1.default.cameraPath).addComponent(FollowCamera_1.default);
                    GlobalUnit_1.default.s3d.addChild(GlobalUnit_1.default.followCamera.owner);
                } else {
                    GlobalUnit_1.default.followCamera = Laya.loader.getRes(Resdefine_1.default.cameraPath).getComponent(FollowCamera_1.default);
                    GlobalUnit_1.default.s3d.addChild(GlobalUnit_1.default.followCamera.owner);
                }
                GlobalUnit_1.default.followCamera.Init();
                GlobalUnit_1.default.followCamera.ResetInitPos();
            };
            GameManager.prototype.UpdateMainPlayer = function(skinConfig) {
                var loadPlayerModel = Laya.loader.getRes(Resdefine_1.default.prefix + skinConfig.model_path + ".lh");
                if (loadPlayerModel == null) {
                    SDKManager_1.default.inst.sdk.showToast("æ¸¸æˆèµ„æºåŠ è½½å¤±è´¥,è¯·é€€å‡ºæ¸¸æˆåŽé‡è¯•");
                    return;
                }
                if (GlobalUnit_1.default.mainPlayer != null) {
                    GlobalUnit_1.default.mainPlayer.DestorySelf();
                }
                GlobalUnit_1.default.mainPlayer = Laya.Sprite3D.instantiate(loadPlayerModel).addComponent(PlayerCmp_1.default);
                GlobalUnit_1.default.s3d.addChild(GlobalUnit_1.default.mainPlayer.owner);
                GlobalUnit_1.default.mainPlayer.Init(skinConfig);
                GlobalUnit_1.default.mainPlayer.transform.position = new Laya.Vector3(0, .17, GameConst_1.default.initPlayerDistance);
                GlobalUnit_1.default.mainPlayer.transform.rotationEuler = new Laya.Vector3(0, 0, 0);
                if (GlobalUnit_1.default.followCamera != null) {
                    GlobalUnit_1.default.followCamera.Init();
                }
            };
            GameManager.prototype.Init = function(onlySelf) {
                var rankInfo = GlobalUnit_1.default.dataManager.currentRankInfo;
                if (onlySelf) {
                    this.allPlayers = [];
                    this.UpdateMainPlayer(CharactorConfig_1.CharactorConfig.data[GlobalUnit_1.default.dataManager.currentSkinId]);
                } else {
                    if (this._useSkin.id != GlobalUnit_1.default.dataManager.currentSkinId) {
                        this.UpdateMainPlayer(this._useSkin);
                    }
                    this.aiPlayers = [];
                    var aiIndex = 0;
                    for (var i = 0; i < this.readyPlayers.length; ++i) {
                        var readyData = this.readyPlayers[i];
                        var loadPlayer;
                        if (readyData.isSelf) {
                            loadPlayer = GlobalUnit_1.default.mainPlayer;
                        } else {
                            var modelPath = GlobalUnit_1.default.skinManager.GetSkinModelPath(readyData.skinId);
                            var loadObj = Laya.loader.getRes(modelPath);
                            if (loadObj == null) {
                                console.error("èµ„æº", modelPath, "åŠ è½½å¤±è´¥");
                                continue;
                            }
                            loadPlayer = Laya.Sprite3D.instantiate(loadObj).addComponent(PlayerCmp_1.default);
                            GlobalUnit_1.default.s3d.addChild(loadPlayer.owner);
                            this.aiPlayers.push(loadPlayer);
                            loadPlayer.Init(CharactorConfig_1.CharactorConfig.data[readyData.skinId]);
                            var aiId = rankInfo.ai_ids.length > aiIndex ? rankInfo.ai_ids[aiIndex] : rankInfo.ai_ids[rankInfo.ai_ids.length - 1];
                            loadPlayer.aiId = aiId;
                            aiIndex++;
                        }
                        loadPlayer.teamId = readyData.teamId;
                        loadPlayer.name = readyData.name;
                        loadPlayer.iconUrl = readyData.iconUrl;
                        loadPlayer.rankCount = readyData.rankCount;
                        if (this.isSigleModel) {
                            loadPlayer.SetInitPos(GameConst_1.default.initPlayerDistance + GameConst_1.default.initUnitDistance * (this.readyPlayers.length - loadPlayer.rankCount + 1), 0);
                        } else {
                            var initDistance = GameConst_1.default.initPlayerDistance + GameConst_1.default.initUnitDistance * (this.readyPlayers.length - Math.ceil(loadPlayer.rankCount / 2) + 1);
                            loadPlayer.SetInitPos(initDistance, loadPlayer.teamId == 1 ? 15 : -15);
                        }
                        this.allPlayers.push(loadPlayer);
                    }
                    if (!this.isSigleModel) {
                        for (var _i = 0, _a = this.allPlayers; _i < _a.length; _i++) {
                            var player = _a[_i];
                            player.ShowKuzi(player.teamId == GlobalUnit_1.default.mainPlayer.teamId);
                        }
                    }
                    this.firstPlayer = this.allPlayers[this.allPlayers.length - 1];
                }
            };
            GameManager.prototype.StartMatch = function(isSingle, trySkin) {
                this.readyPlayers = [];
                if (trySkin == null) {
                    this._useSkin = CharactorConfig_1.CharactorConfig.data[GlobalUnit_1.default.dataManager.currentSkinId];
                } else {
                    this._useSkin = trySkin;
                    GlobalUnit_1.default.dataManager.AddTryCount(this._useSkin.id);
                }
                var randomPlayerCount = MathEx_1.default.RandomInt(10, GameConst_1.default.totalPlayerCount + 1);
                var beforProp = GlobalUnit_1.default.skinManager.GetProp(this._useSkin, EPropType_1.EPropType.StartPos);
                if (beforProp != null) {
                    randomPlayerCount = MathEx_1.default.RandomInt(1, beforProp.pro_value + 1);
                }
                if (randomPlayerCount > GameConst_1.default.totalPlayerCount) {
                    randomPlayerCount = GameConst_1.default.totalPlayerCount;
                }
                var allIcons = GlobalUnit_1.default.nameManager.GenRandomIcon(GameConst_1.default.totalPlayerCount);
                for (var i = 1; i <= GameConst_1.default.totalPlayerCount; ++i) {
                    var readyData = new PlayerReadyData_1.default();
                    readyData.isSelf = i == randomPlayerCount;
                    if (readyData.isSelf) {
                        readyData.name = GlobalUnit_1.default.dataManager.userName == null ? "You" : GlobalUnit_1.default.dataManager.userName;
                        readyData.iconUrl = GlobalUnit_1.default.dataManager.userIcon != null ? GlobalUnit_1.default.dataManager.userIcon : "ui_main/default_icon.png";
                        readyData.skinId = this._useSkin.id;
                    } else {
                        readyData.name = GlobalUnit_1.default.nameManager.GenRandomName();
                        readyData.iconUrl = allIcons[i - 1];
                        var randomModelId = GlobalUnit_1.default.skinManager.GetRandomAISkinId();
                        readyData.skinId = randomModelId;
                        var modelConfig = CharactorConfig_1.CharactorConfig.data[randomModelId];
                    }
                    readyData.rankCount = i;
                    readyData.teamId = i % 2;
                    this.readyPlayers.push(readyData);
                }
                this.isSigleModel = isSingle;
                GlobalUnit_1.default.mainPlayer.name = GlobalUnit_1.default.dataManager.userName == null ? "You" : GlobalUnit_1.default.dataManager.userName;
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_match.prefab", {
                    isSingle: isSingle
                });
                var preConfig = GlobalUnit_1.default.dataManager.currentRankInfo;
                GameConst_1.default.safeDistance = preConfig.safe_distance;
            };
            GameManager.prototype.OnShow = function() {
                console.log("åˆ‡åˆ°å‰å°");
                if (this._hideTime == null) return;
                if (!this._isRunning) return;
                if (!GlobalUnit_1.default.uiRoot.ui_fight.visible) return;
                var passTime = (new Date().getTime() - this._hideTime) / 1e3;
                if (passTime > 60) {
                    GlobalUnit_1.default.followCamera.StopFollow();
                    GlobalUnit_1.default.uiRoot.ui_fight.visible = false;
                    this.ResetGame(true);
                }
            };
            GameManager.prototype.OnHide = function() {
                console.log("åˆ‡åˆ°åŽå°");
                this._hideTime = new Date().getTime();
            };
            GameManager.prototype.Load2DAtMatch = function(urls) {};
            GameManager.prototype.LoadAtMatch = function(urls) {
                for (var _i = 0, _a = this.readyPlayers; _i < _a.length; _i++) {
                    var readyData = _a[_i];
                    var skinConfig = CharactorConfig_1.CharactorConfig.data[readyData.skinId];
                    urls.push(GlobalUnit_1.default.skinManager.GetSkinModelPath(readyData.skinId));
                    if (!this.isSigleModel) {
                        urls.push(skinConfig.blue_tex);
                        urls.push(skinConfig.red_tex);
                    }
                }
                GlobalUnit_1.default.roadManager.LoadAtMatch(urls);
                GlobalUnit_1.default.effectManager.Preload(urls);
                if (this._useSkin.id != GlobalUnit_1.default.dataManager.currentSkinId) {
                    urls.push(Resdefine_1.default.prefix + this._useSkin.model_path + ".lh");
                }
            };
            GameManager.prototype.PreStart = function() {
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "åŒ¹é…å®Œæˆ", GlobalUnit_1.default.dataManager.cupCount);
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_GAME + GlobalUnit_1.default.dataManager.currentRankInfo.id, "å¼€å§‹æ¸¸æˆ");
                GlobalUnit_1.default.roadManager.InitFightScene();
                GlobalUnit_1.default.itemManager.InitRoad();
                this.Init(false);
                GlobalUnit_1.default.uiRoot.ui_main.visible = false;
                GlobalUnit_1.default.HideUI("ui_prefabs/ui_match.prefab");
                for (var i = 0; i < this.allPlayers.length; ++i) {
                    var player = this.allPlayers[i];
                    var readyData = this.readyPlayers[i];
                    if (!readyData.isSelf) {
                        GlobalUnit_1.default.uiRoot.ui_name.GenNewName(player);
                        player.UpdateHeadInfo();
                    }
                }
                GlobalUnit_1.default.uiRoot.ui_name.visible = true;
                GlobalUnit_1.default.uiRoot.ui_name.UpdateAllUIPos();
                GlobalUnit_1.default.uiRoot.ui_ready.visible = true;
                GlobalUnit_1.default.uiRoot.ui_ready.StartReady();
                GlobalUnit_1.default.Shake();
            };
            GameManager.prototype.StartGame = function() {
                var curDate = new Date();
                this.startTime = curDate.getTime();
                GlobalUnit_1.default.dataManager.matchCoin = 0;
                GlobalUnit_1.default.uiRoot.ui_fight.visible = true;
                GlobalUnit_1.default.uiRoot.ui_end_rank.ClearData();
                this._finishPlayers = [];
                this.hasFinishPlayer = false;
                this._isRunning = true;
                this.isEnd = false;
                this.redTeam = 0;
                this.blueTeam = 0;
                GlobalUnit_1.default.mainPlayer.StartMove();
                for (var i = 0; i < this.aiPlayers.length; ++i) {
                    var aiPlayer = this.aiPlayers[i];
                    aiPlayer.StartMove();
                }
                GlobalUnit_1.default.aiManager.Init();
                console.log("æ¸¸æˆå¼€å§‹,å½“å‰èµ›é“:", GlobalUnit_1.default.roadManager.roadConifg.scene_path);
            };
            GameManager.prototype.PlayerEndGame = function(playerCmp) {
                if (!this.hasFinishPlayer) {
                    this.hasFinishPlayer = true;
                    GlobalUnit_1.default.uiRoot.ui_fight.ShowEnd(GameConst_1.default.endWaitTime);
                }
                this._finishPlayers.push(playerCmp);
            };
            GameManager.prototype.EndGame = function() {
                this.isEnd = true;
                for (var _i = 0, _a = this.allPlayers; _i < _a.length; _i++) {
                    var player = _a[_i];
                    player.EndGame();
                }
            };
            GameManager.prototype.ShowEndRank = function() {
                if (GlobalUnit_1.default.uiRoot.ui_end.visible) return;
                GlobalUnit_1.default.uiRoot.ui_fight.visible = false;
                GlobalUnit_1.default.uiRoot.ui_end_rank.visible = true;
            };
            GameManager.prototype.StopGame = function(isPassed) {
                if (isPassed) {
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_GAME + GlobalUnit_1.default.dataManager.currentRankInfo.id, "æ¸¸æˆé€šå…³", GlobalUnit_1.default.mainPlayer.rankCount);
                } else {
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_GAME + GlobalUnit_1.default.dataManager.currentRankInfo.id, "æ¸¸æˆæ­»äº¡", GlobalUnit_1.default.dataManager.currentRankInfo.id);
                }
                GlobalUnit_1.default.followCamera.StopFollow();
                GlobalUnit_1.default.uiRoot.ui_fight.visible = false;
                if (isPassed) {
                    GlobalUnit_1.default.gameManager.ShowEndRank();
                } else {
                    GlobalUnit_1.default.uiRoot.ui_dead.visible = true;
                }
            };
            GameManager.prototype.ResetGame = function(noChange) {
                this._isRunning = false;
                GlobalUnit_1.default.uiRoot.ui_dead.visible = false;
                GlobalUnit_1.default.uiRoot.ui_end.visible = false;
                GlobalUnit_1.default.uiRoot.ui_load.visible = true;
                if (noChange) {
                    this._OnLoadFinished();
                } else {
                    var loadUrls = [];
                    GlobalUnit_1.default.roadManager.PreLoad(loadUrls);
                    LTUtils_1.LTUtils.DownLoadFiles(loadUrls, Laya.Handler.create(this, this._OnLoadFinished));
                }
            };
            GameManager.prototype._OnLoadFinished = function() {
                GlobalUnit_1.default.uiRoot.ui_name.visible = false;
                GlobalUnit_1.default.uiRoot.ui_main.visible = true;
                this.CreateMainScene(false);
                GlobalUnit_1.default.uiRoot.ui_load.visible = false;
            };
            GameManager.prototype.Reborn = function() {
                this._isRunning = true;
                var lastPlayer = this.allPlayers[this.allPlayers.length - 1];
                if (lastPlayer == GlobalUnit_1.default.mainPlayer) {
                    lastPlayer = this.allPlayers[this.allPlayers.length - 2];
                }
                var bornDistance = 0;
                if (lastPlayer.isFinished) {
                    bornDistance = GlobalUnit_1.default.roadManager.totalDistance - GameConst_1.default.safeDistance;
                } else {
                    bornDistance = lastPlayer.moveDistance - 10;
                }
                GlobalUnit_1.default.mainPlayer.RestartMove(bornDistance, 0);
                GlobalUnit_1.default.mainPlayer.SpeedScale(GameConst_1.default.speedUpSpeed, GameConst_1.default.speedUpTime, true);
                GlobalUnit_1.default.uiRoot.ui_dead.visible = false;
                GlobalUnit_1.default.uiRoot.ui_fight.visible = true;
                GlobalUnit_1.default.followCamera.StartFollow();
            };
            GameManager.prototype._SortFunc = function(o1, o2) {
                if (o2.isFinished && o1.isFinished) {
                    return o1.finishTime - o2.finishTime;
                }
                if (o2.isFinished) {
                    return 1;
                }
                if (o1.isFinished) {
                    return -1;
                }
                return o2.moveDistance - o1.moveDistance;
            };
            GameManager.prototype.SortPlayers = function() {
                this.allPlayers.sort(this._SortFunc);
                for (var i = 0; i < this.allPlayers.length; ++i) {
                    var player = this.allPlayers[i];
                    player.rankCount = i + 1;
                    player.UpdateHeadInfo();
                }
            };
            GameManager.prototype._UpdateKingObj = function() {
                if (this.firstPlayer != this.allPlayers[0]) {
                    this.firstPlayer.kingObj.active = false;
                    this.allPlayers[0].kingObj.active = true;
                }
                this.firstPlayer = this.allPlayers[0];
            };
            GameManager.prototype._UpdateTeamScore = function() {
                var blueTeam = 0;
                var redTeam = 0;
                for (var _i = 0, _a = this.allPlayers; _i < _a.length; _i++) {
                    var playerCmp = _a[_i];
                    var teamScore = GameConst_1.default.teamRankScore[playerCmp.rankCount - 1];
                    if (playerCmp.teamId == GlobalUnit_1.default.mainPlayer.teamId) {
                        blueTeam += teamScore;
                    } else {
                        redTeam += teamScore;
                    }
                }
                GlobalUnit_1.default.gameManager.blueTeam = blueTeam;
                GlobalUnit_1.default.gameManager.redTeam = redTeam;
                GlobalUnit_1.default.uiRoot.ui_fight.UpdateTeamScore();
            };
            GameManager.prototype.UpdateRank = function() {
                if (!this.isEnd) {
                    this.SortPlayers();
                    this._UpdateKingObj();
                    if (!this.isSigleModel) {
                        this._UpdateTeamScore();
                    }
                }
                if (this._finishPlayers.length > 0) {
                    this._finishPlayers.sort(this._UpdateRankSort);
                    for (var _i = 0, _a = this._finishPlayers; _i < _a.length; _i++) {
                        var playerCmp = _a[_i];
                        if (!this.isSigleModel) {
                            playerCmp.teamScore = GameConst_1.default.teamRankScore[playerCmp.rankCount - 1];
                        }
                        GlobalUnit_1.default.uiRoot.ui_end_rank.PushData(playerCmp);
                    }
                    this._finishPlayers = [];
                }
            };
            GameManager.prototype._UpdateRankSort = function(o1, o2) {
                return o1.rankCount - o2.rankCount;
            };
            GameManager.prototype.LogicUpdate = function(dt) {
                if (this._isRunning) {
                    for (var _i = 0, _a = this.aiPlayers; _i < _a.length; _i++) {
                        var player = _a[_i];
                        player.LogicUpdate(dt);
                    }
                    GlobalUnit_1.default.mainPlayer.LogicUpdate(dt);
                    for (var _b = 0, _c = this.allPlayers; _b < _c.length; _b++) {
                        var player = _c[_b];
                        player.CheckHitPlayers();
                    }
                    GlobalUnit_1.default.aiManager.LogicUpdate(dt);
                    this.UpdateRank();
                }
            };
            return GameManager;
        }();
        exports.default = GameManager;
    }, {
        "../../module/manager/SDKManager": 8,
        "../LTGame/LTUtils/LTUtils": 35,
        "../LTGame/LTUtils/MathEx": 37,
        "../cmp/FollowCamera": 48,
        "../cmp/PlayerCmp": 50,
        "../common/EPropType": 53,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/CharactorConfig": 61,
        "../data/PlayerReadyData": 74
    } ],
    83: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var Resdefine_1 = require("../common/Resdefine");
        var ItemCmp_1 = require("../cmp/ItemCmp");
        var EItemType_1 = require("../common/EItemType");
        var GameConst_1 = require("../common/GameConst");
        var ItemManager = function() {
            function ItemManager() {}
            ItemManager.prototype.InitRoad = function() {
                this._blockItems = [];
                this._speedItems = [];
                this._cacheIndex = 0;
                this._GenItems();
                this._GenCoin();
            };
            ItemManager.prototype._GenCoin = function() {
                var rankInfo = GlobalUnit_1.default.dataManager.currentRankInfo;
                var genDistance = 50 + MathEx_1.default.Random(rankInfo.itemGenDistance[0], rankInfo.itemGenDistance[1]);
                var totalDistance = GlobalUnit_1.default.roadManager.totalDistance;
                this._cacheIndex = 0;
                while (genDistance < totalDistance - 50) {
                    var randomSmallUnitCount = MathEx_1.default.RandomInt(rankInfo.coin_units[0], rankInfo.coin_units[1]);
                    for (var i = 0; i < randomSmallUnitCount; ++i) {
                        var randomPos = MathEx_1.default.RandomInt(-1, 2);
                        var coinCount = MathEx_1.default.RandomInt(rankInfo.coin_small_count[0], rankInfo.coin_small_count[1]);
                        for (var j = 0; j < coinCount; ++j) {
                            this._GenSingleCoin(genDistance, randomPos);
                            genDistance += rankInfo.coin_step;
                            if (genDistance > totalDistance - 5) {
                                return;
                            }
                        }
                    }
                    genDistance += MathEx_1.default.Random(rankInfo.coin_unit_step[0], rankInfo.coin_unit_step[1]);
                }
            };
            ItemManager.prototype._GenSingleCoin = function(genDistance, randomPos) {
                var resPath = Resdefine_1.default.coinPath;
                var loadObj = Laya.loader.getRes(resPath);
                if (loadObj == null) {
                    console.error("èµ„æºåŠ è½½å¤±è´¥", resPath);
                    return;
                }
                var degree = randomPos * 30;
                var genObj = GlobalUnit_1.default.s3d.addChild(Laya.Sprite3D.instantiate(loadObj));
                var progress = genDistance / GlobalUnit_1.default.roadManager.totalDistance;
                var posData = GlobalUnit_1.default.roadManager.roadData.GetPos(progress, this._cacheIndex);
                this._cacheIndex = posData[0];
                this._cacheIndex = GlobalUnit_1.default.roadManager.UpdateObj(genObj, genDistance, degree, this._cacheIndex);
                var itemCmp = genObj.addComponent(ItemCmp_1.default);
                itemCmp.moveDistance = genDistance;
                itemCmp.degree = degree;
                itemCmp.searchIndex = this._cacheIndex;
                itemCmp.Init(EItemType_1.EItemType.Coin);
            };
            ItemManager.prototype._GenItems = function() {
                var rankInfo = GlobalUnit_1.default.dataManager.currentRankInfo;
                var genDistance = 50 + MathEx_1.default.Random(rankInfo.itemGenDistance[0], rankInfo.itemGenDistance[1]);
                var totalDistance = GlobalUnit_1.default.roadManager.totalDistance;
                var cacheIndex = 0;
                while (genDistance < totalDistance - 50) {
                    var randomType = MathEx_1.default.RandomFromWithWeight(rankInfo.road_item_ids, rankInfo.road_item_weight);
                    if (randomType == null) {
                        genDistance += MathEx_1.default.Random(rankInfo.itemGenDistance[0], rankInfo.itemGenDistance[1]);
                        continue;
                    }
                    if (GlobalUnit_1.default.roadManager.CheckIsBroken(genDistance)) {
                        genDistance += MathEx_1.default.Random(rankInfo.itemGenDistance[0], rankInfo.itemGenDistance[1]);
                        continue;
                    }
                    var itemType = randomType;
                    switch (itemType) {
                      case EItemType_1.EItemType.Block:
                        this._GenBlock(genDistance);
                        break;

                      case EItemType_1.EItemType.CircleWall:
                        this._GenCircleWall(genDistance);
                        break;

                      case EItemType_1.EItemType.XiaoJiaoPi:
                        this._GenXiangJiaoPi(genDistance);
                        break;

                      case EItemType_1.EItemType.Boom:
                        this._GenBoom(genDistance);
                        break;

                      default:
                        console.error("æœªå¤„ç†çš„itemç±»åž‹", itemType);
                        break;
                    }
                    genDistance += MathEx_1.default.Random(rankInfo.itemGenDistance[0], rankInfo.itemGenDistance[1]);
                }
            };
            ItemManager.prototype._GenBoom = function(genDistance) {
                var resPath = Resdefine_1.default.boomPath;
                var loadObj = Laya.loader.getRes(resPath);
                if (loadObj == null) {
                    console.error("èµ„æºåŠ è½½å¤±è´¥", resPath);
                    return;
                }
                var randomDegree = MathEx_1.default.Random(-30, 30);
                var genObj = GlobalUnit_1.default.s3d.addChild(Laya.Sprite3D.instantiate(loadObj));
                this._cacheIndex = GlobalUnit_1.default.roadManager.UpdateObj(genObj, genDistance, randomDegree, this._cacheIndex);
                var itemCmp = genObj.addComponent(ItemCmp_1.default);
                itemCmp.moveDistance = genDistance;
                itemCmp.degree = randomDegree;
                itemCmp.searchIndex = this._cacheIndex;
                itemCmp.Init(EItemType_1.EItemType.Boom);
                this._blockItems.push(itemCmp);
            };
            ItemManager.prototype._GenXiangJiaoPi = function(genDistance) {
                var resPath = Resdefine_1.default.xiangjiaopi;
                var loadObj = Laya.loader.getRes(resPath);
                if (loadObj == null) {
                    console.error("èµ„æºåŠ è½½å¤±è´¥", resPath);
                    return;
                }
                var randomDegree = MathEx_1.default.Random(-30, 30);
                var genObj = GlobalUnit_1.default.s3d.addChild(Laya.Sprite3D.instantiate(loadObj));
                this._cacheIndex = GlobalUnit_1.default.roadManager.UpdateObj(genObj, genDistance, randomDegree, this._cacheIndex);
                var itemCmp = genObj.addComponent(ItemCmp_1.default);
                itemCmp.moveDistance = genDistance;
                itemCmp.degree = randomDegree;
                itemCmp.searchIndex = this._cacheIndex;
                itemCmp.Init(EItemType_1.EItemType.XiaoJiaoPi);
                this._blockItems.push(itemCmp);
            };
            ItemManager.prototype._GenCircleWall = function(genDistance) {
                var resPath = Resdefine_1.default.circleBlock;
                var loadObj = Laya.loader.getRes(resPath);
                if (loadObj == null) {
                    console.error("èµ„æºåŠ è½½å¤±è´¥", resPath);
                    return;
                }
                var progress = genDistance / GlobalUnit_1.default.roadManager.totalDistance;
                var genObj = GlobalUnit_1.default.s3d.addChild(Laya.Sprite3D.instantiate(loadObj));
                var posData = GlobalUnit_1.default.roadManager.roadData.GetPos(progress, this._cacheIndex);
                this._cacheIndex = posData[0];
                genObj.transform.rotation = GlobalUnit_1.default.roadManager.roadData.GetRot(progress, this._cacheIndex);
                genObj.transform.position = new Laya.Vector3(posData[1].x, posData[1].y - 1.8, posData[1].z);
                var itemCmp = genObj.addComponent(ItemCmp_1.default);
                itemCmp.moveDistance = genDistance;
                itemCmp.degree = 0;
                itemCmp.isMove = MathEx_1.default.Random(0, 100) > 50;
                itemCmp.searchIndex = this._cacheIndex;
                itemCmp.Init(EItemType_1.EItemType.CircleWall);
                this._blockItems.push(itemCmp);
            };
            ItemManager.prototype._GenBlock = function(genDistance) {
                var genBlockType = MathEx_1.default.RandomInt(1, 4);
                var genBlockStr;
                var effectStr;
                var degree = 0;
                switch (genBlockType) {
                  case 1:
                    genBlockStr = Resdefine_1.default.blockLeft;
                    effectStr = Resdefine_1.default.effectBlockLeft;
                    degree = 30;
                    break;

                  case 2:
                    genBlockStr = Resdefine_1.default.blockMiddle;
                    effectStr = Resdefine_1.default.effectBlockMiddle;
                    degree = 0;
                    break;

                  case 3:
                    genBlockStr = Resdefine_1.default.blockRight;
                    effectStr = Resdefine_1.default.effectBlockRight;
                    degree = -30;
                    break;

                  default:
                    console.log("éšæœºæ•°å¼‚å¸¸:" + genBlockType);
                    break;
                }
                var progress = genDistance / GlobalUnit_1.default.roadManager.totalDistance;
                var loadObj = Laya.loader.getRes(genBlockStr);
                if (loadObj == null) {
                    console.error("èµ„æºåŠ è½½å¤±è´¥", genBlockStr);
                    return;
                }
                var genObj = GlobalUnit_1.default.s3d.addChild(Laya.Sprite3D.instantiate(loadObj));
                var posData = GlobalUnit_1.default.roadManager.roadData.GetPos(progress, this._cacheIndex);
                this._cacheIndex = posData[0];
                genObj.transform.rotation = GlobalUnit_1.default.roadManager.roadData.GetRot(progress, this._cacheIndex);
                genObj.transform.position = new Laya.Vector3(posData[1].x, posData[1].y - 1.8, posData[1].z);
                var itemCmp = genObj.addComponent(ItemCmp_1.default);
                itemCmp.Init(EItemType_1.EItemType.Block);
                itemCmp.moveDistance = genDistance;
                itemCmp.effectStr = effectStr;
                itemCmp.degree = degree;
                this._blockItems.push(itemCmp);
            };
            ItemManager.prototype.RemoveItem = function(obj) {
                var index = this._blockItems.indexOf(obj);
                if (index < 0) return;
                this._blockItems.splice(index, 1);
            };
            ItemManager.prototype.GenSpeedUp = function(genDistance, searchIndex) {
                if (genDistance > GlobalUnit_1.default.roadManager.totalDistance - 50) return;
                var progress = genDistance / progress;
                var genObj = GlobalUnit_1.default.s3d.addChild(Laya.Sprite3D.instantiate(Laya.loader.getRes(Resdefine_1.default.speedUp)));
                var itemCmp = genObj.addComponent(ItemCmp_1.default);
                itemCmp.Init(EItemType_1.EItemType.SpeedUp);
                itemCmp.moveDistance = genDistance;
                itemCmp.searchIndex = searchIndex;
                var maxDegree = GameConst_1.default.maxRoadDegree * .8;
                itemCmp.degree = MathEx_1.default.Random(-maxDegree, maxDegree);
                this._speedItems.push(itemCmp);
            };
            ItemManager.prototype.GetItem = function(preProgress, behindProgress) {
                var findItem;
                for (var _i = 0, _a = this._blockItems; _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v.moveDistance > behindProgress) break;
                    if (v.moveDistance > preProgress) {
                        findItem = v;
                        break;
                    }
                }
                for (var _b = 0, _c = this._speedItems; _b < _c.length; _b++) {
                    var v = _c[_b];
                    if (v.moveDistance > behindProgress) break;
                    if (v.moveDistance > preProgress) {
                        if (findItem == null || v.moveDistance < findItem.moveDistance) {
                            findItem = v;
                        }
                        break;
                    }
                }
                return findItem;
            };
            return ItemManager;
        }();
        exports.default = ItemManager;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../cmp/ItemCmp": 49,
        "../common/EItemType": 52,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57
    } ],
    84: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTDictionary_1 = require("../LTGame/LTUtils/LTDictionary");
        var RoadConfig_1 = require("../config/RoadConfig");
        var RankConfig_1 = require("../config/RankConfig");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MapManager = function() {
            function MapManager() {}
            Object.defineProperty(MapManager.prototype, "keyMapList", {
                get: function() {
                    return this._mapConfig.values;
                },
                enumerable: true,
                configurable: true
            });
            MapManager.prototype.CheckUnlocked = function(index) {
                return this._unlockIds.indexOf(index) >= 0;
            };
            MapManager.prototype.Init = function() {
                this._mapConfig = new LTDictionary_1.default();
                for (var _i = 0, _a = RoadConfig_1.RoadConfig.dataList; _i < _a.length; _i++) {
                    var mapItem = _a[_i];
                    if (!this._mapConfig.ContainsKey(mapItem.scene_key)) {
                        this._mapConfig.Add(mapItem.scene_key, mapItem);
                        if (this._defaultIcon == null) {
                            this._defaultIcon = mapItem.icon_path;
                        }
                    }
                }
                this._unlockIds = [];
                this._unlockIds.push(1);
                var currentRankInfo = GlobalUnit_1.default.dataManager.currentRankInfo;
                for (var _b = 0, _c = RankConfig_1.RankConfig.dataList; _b < _c.length; _b++) {
                    var rankConfig = _c[_b];
                    if (rankConfig.id > currentRankInfo.id) break;
                    var unlockTypes = rankConfig.unlock_type;
                    for (var i = 0; i < unlockTypes.length; ++i) {
                        var unlockType = unlockTypes[i];
                        var unlockValue = rankConfig.unlock_value[i];
                        if (unlockType == 1) {
                            this._unlockIds.push(unlockValue);
                        }
                    }
                }
            };
            MapManager.prototype.GetConfig = function(index) {
                return this._mapConfig.Get(index);
            };
            Object.defineProperty(MapManager.prototype, "defaultIcon", {
                get: function() {
                    return this._defaultIcon;
                },
                enumerable: true,
                configurable: true
            });
            return MapManager;
        }();
        exports.default = MapManager;
    }, {
        "../LTGame/LTUtils/LTDictionary": 31,
        "../common/GlobalUnit": 56,
        "../config/RankConfig": 68,
        "../config/RoadConfig": 70
    } ],
    85: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var AiNamePre_1 = require("../config/AiNamePre");
        var AiNameBehind_1 = require("../config/AiNameBehind");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var HeadConfig_1 = require("../config/HeadConfig");
        var NameManager = function() {
            function NameManager() {}
            NameManager.prototype.Init = function() {
                this._preNames = [];
                this._behindNames = [];
                this._icon01s = [];
                for (var key in AiNamePre_1.AiNamePre.data) {
                    var value1 = AiNamePre_1.AiNamePre.data[key];
                    if (value1 == null) continue;
                    this._preNames.push(value1.name_str);
                }
                for (var key in AiNameBehind_1.AiNameBehind.data) {
                    var value2 = AiNameBehind_1.AiNameBehind.data[key];
                    if (value2 == null) continue;
                    this._behindNames.push(value2.name_str);
                }
                for (var key in HeadConfig_1.HeadConfig.data) {
                    var value3 = HeadConfig_1.HeadConfig.data[key];
                    if (value3 == null) continue;
                    this._icon01s.push("icon/" + value3.icon_01);
                }
            };
            NameManager.prototype.GenRandomName = function() {
                return this._preNames[MathEx_1.default.RandomInt(0, this._preNames.length)] + this._behindNames[MathEx_1.default.RandomInt(0, this._behindNames.length)];
            };
            NameManager.prototype.GenRandomIcon = function(randomCount) {
                var totalCount = [];
                for (var i = 0; i < this._icon01s.length; ++i) {
                    totalCount.push(i);
                }
                var randomIds = [];
                for (var i = 0; i < randomCount; ++i) {
                    var randomIndex = MathEx_1.default.RandomInt(0, totalCount.length);
                    var randomId = totalCount[randomIndex];
                    totalCount.splice(randomIndex, 1);
                    randomIds.push(randomId);
                }
                var result = [];
                for (var i = 0; i < randomCount; ++i) {
                    var randomIcon = this._icon01s[randomIds[i]];
                    result.push(randomIcon);
                }
                return result;
            };
            return NameManager;
        }();
        exports.default = NameManager;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../config/AiNameBehind": 59,
        "../config/AiNamePre": 60,
        "../config/HeadConfig": 64
    } ],
    86: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var LoadConfig_1 = require("../config/LoadConfig");
        var NoticeManager = function() {
            function NoticeManager() {}
            NoticeManager.prototype.Init = function() {
                this._currentShowIndex = MathEx_1.default.RandomInt(0, LoadConfig_1.LoadConfig.dataList.length);
            };
            NoticeManager.prototype.GetNotice = function() {
                var getStr = LoadConfig_1.LoadConfig.dataList[this._currentShowIndex].notice_str;
                this._currentShowIndex++;
                if (this._currentShowIndex >= LoadConfig_1.LoadConfig.dataList.length) {
                    this._currentShowIndex = 0;
                }
                return getStr;
            };
            return NoticeManager;
        }();
        exports.default = NoticeManager;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../config/LoadConfig": 66
    } ],
    87: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var QQ_helper_1 = require("../../module/sdk/qq/QQ_helper");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var QQHelper = function(_super) {
            __extends(QQHelper, _super);
            function QQHelper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            QQHelper.prototype.onInit = function() {
                _super.prototype.onInit.call(this);
                this.Video_adunit = "b92145c96cb0a331fe1ceb58fc3ac724";
                this.Banner_adunit = "8ff96db92090e06a0eb7c343ff2441d7";
            };
            QQHelper.prototype.onHide = function() {
                _super.prototype.onHide.call(this);
                Laya.timer.scale = 0;
                if (GlobalUnit_1.default.gameManager != null) {
                    GlobalUnit_1.default.gameManager.OnHide();
                }
            };
            QQHelper.prototype.onShow = function(res) {
                _super.prototype.onShow.call(this, res);
                Laya.timer.scale = 1;
                if (GlobalUnit_1.default.gameManager != null) {
                    GlobalUnit_1.default.gameManager.OnShow();
                }
                var referInfo = SDKManager_1.default.inst.sdk.getSceneID();
                console.log(referInfo);
            };
            return QQHelper;
        }(QQ_helper_1.default);
        exports.default = QQHelper;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/sdk/qq/QQ_helper": 19,
        "../common/GlobalUnit": 56
    } ],
    88: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var RoadData_1 = require("../data/RoadData");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var RoadConfig_1 = require("../config/RoadConfig");
        var Resdefine_1 = require("../common/Resdefine");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var CollisionLayer_1 = require("../common/CollisionLayer");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var GameConst_1 = require("../common/GameConst");
        var RoadManager = function() {
            function RoadManager() {
                this._lastRoadIndex = -1;
                this._huadao = "huadao";
                this._startPoint = "Star";
                this._endPoint = "End";
                this._skyPoint = "Sky";
                this._endHitPoint = "endpoint";
                this._downVec = new Laya.Vector3(0, -1.7, 0);
            }
            Object.defineProperty(RoadManager.prototype, "roadData", {
                get: function() {
                    return this._roadData;
                },
                enumerable: true,
                configurable: true
            });
            RoadManager.prototype.PreLoad = function(loadUrls) {
                var randomSceneId = MathEx_1.default.RandomFromArray(GlobalUnit_1.default.dataManager.currentRankInfo.scene_ids);
                if (this.isFirstChange) {
                    randomSceneId = GlobalUnit_1.default.dataManager.currentRankInfo.scene_ids[0];
                    this.isFirstChange = false;
                }

                this.roadConifg = RoadConfig_1.RoadConfig.data[randomSceneId];
                loadUrls.push(Resdefine_1.default.prefix + this.roadConifg.start_path + Resdefine_1.default.behindfix);
                var newIndex = MathEx_1.default.RandomInt(1, GameConst_1.default.maxRandomTexCount + 1);
                if (newIndex == this._lastRoadIndex) {
                    newIndex++;
                    if (newIndex > GameConst_1.default.maxRandomTexCount) {
                        newIndex = 1;
                    }
                }
                this._lastRoadIndex = newIndex;
                this._cacheTexStr = "res/huadaoTex/huadao_0" + this._lastRoadIndex + ".jpg";
                loadUrls.push(this._cacheTexStr);
            };
            RoadManager.prototype.LoadAtMatch = function(loadUrls) {
                loadUrls.push(Resdefine_1.default.prefix + this.roadConifg.scene_path + Resdefine_1.default.behindfix);
                loadUrls.push(Resdefine_1.default.prefix + this.roadConifg.scene_path + "_collider" + Resdefine_1.default.behindfix);
                loadUrls.push("res/animData/" + this.roadConifg.scene_path + ".json");
                loadUrls.push(Resdefine_1.default.prefix + this.roadConifg.start_scene + Resdefine_1.default.behindfix);
                loadUrls.push(Resdefine_1.default.prefix + this.roadConifg.end_scene + Resdefine_1.default.behindfix);
                loadUrls.push(Resdefine_1.default.prefix + this.roadConifg.sky_scene + Resdefine_1.default.behindfix);
            };
            RoadManager.prototype.InitMainScene = function() {
                var loadUrl = Resdefine_1.default.prefix + this.roadConifg.start_path + Resdefine_1.default.behindfix;
                var loadObj = Laya.loader.getRes(loadUrl);
                if (loadObj == null) {
                    console.error("èµ„æºåŠ è½½å¤±è´¥", loadUrl);
                    return;
                }
                this.sceneObj = GlobalUnit_1.default.s3d.addChild(loadObj);
                this._ReplaceHuadao();
            };
            RoadManager.prototype._ReplaceHuadao = function() {
                var huadao = this.sceneObj.getChildByName(this._huadao);
                if (huadao == null) {
                    console.error("å½“å‰åœºæ™¯æœªæ£€æµ‹åˆ°å¯æ›¿æ¢è´´å›¾è·¯å¾„", this.roadConifg.start_path);
                } else {
                    var loadTex = Laya.loader.getRes(this._cacheTexStr);
                    if (loadTex == null) {
                        console.error("è´´å›¾æ— æ³•åŠ è½½", this._cacheTexStr);
                        return;
                    }
                    huadao.meshRenderer.material.albedoTexture = loadTex;
                    huadao.meshRenderer.material.cull = 0;
                }
            };
            RoadManager.prototype.InitFightScene = function() {
                GlobalUnit_1.default.s3d.removeChild(this.sceneObj);
                var loadUrl = Resdefine_1.default.prefix + this.roadConifg.scene_path + Resdefine_1.default.behindfix;
                var loadObj = Laya.loader.getRes(loadUrl);
                if (loadObj == null) {
                    console.error("èµ„æºåŠ è½½å¤±è´¥", loadUrl);
                    return;
                }
                this.sceneObj = GlobalUnit_1.default.s3d.addChild(loadObj);
                this._ReplaceHuadao();
                var endParent = this.sceneObj.getChildByName(this._endPoint);
                var endScenePath = Resdefine_1.default.prefix + this.roadConifg.end_scene + Resdefine_1.default.behindfix;
                var endScene = Laya.loader.getRes(endScenePath);
                if (endParent != null && endScene != null) {
                    var getChild = endParent.getChildAt(0);
                    if (getChild != null) {
                        endParent.removeChild(getChild);
                    }
                    var instScene = endScene;
                    endParent.addChild(instScene);
                    instScene.transform.localPosition = Vector3Ex_1.default.zero;
                    instScene.transform.localScale = Vector3Ex_1.default.one;
                    instScene.transform.localRotationEuler = Vector3Ex_1.default.zero;
                    this.groundHeight = instScene.transform.position.y;
                    var endPoint = instScene.getChildByName(this._endHitPoint);
                    if (endPoint == null) {
                        console.error("å½“å‰åœºæ™¯æ— ç»“æŸç‚¹,æ— æ³•é£žè¡Œç»“æŸ" + this.roadConifg.id);
                    } else {
                        var endCollider = endPoint.getComponent(Laya.PhysicsCollider);
                        endCollider.collisionGroup = CollisionLayer_1.default.EndPoint;
                        endCollider.canCollideWith = CollisionLayer_1.default.Ray;
                    }
                } else {
                    if (endParent == null) {
                        console.error("å½“å‰åœºæ™¯æœªæ£€æµ‹ç»“æŸåœºæ™¯æŒ‚è½½ç‚¹");
                    }
                    if (endScene == null) {
                        console.error("èµ„æºåŠ è½½å¤±è´¥", endScenePath);
                    }
                    this.groundHeight = -100;
                }
                var startParent = this.sceneObj.getChildByName(this._startPoint);
                var startScenePath = Resdefine_1.default.prefix + this.roadConifg.start_scene + Resdefine_1.default.behindfix;
                var startScene = Laya.loader.getRes(startScenePath);
                if (startParent != null && startScene != null) {
                    var getChild = startParent.getChildAt(0);
                    if (getChild != null) {
                        startParent.removeChild(getChild);
                    }
                    var instScene = startScene;
                    startParent.addChild(instScene);
                    instScene.transform.localPosition = Vector3Ex_1.default.zero;
                    instScene.transform.localScale = Vector3Ex_1.default.one;
                    instScene.transform.localRotationEuler = Vector3Ex_1.default.zero;
                } else {
                    if (startParent == null) {
                        console.error("å½“å‰åœºæ™¯æœªæ£€æµ‹ç»“æŸå¼€å§‹æŒ‚è½½ç‚¹");
                    }
                    if (startScene == null) {
                        console.error("èµ„æºåŠ è½½å¤±è´¥", startScenePath);
                    }
                }
                var skyParent = this.sceneObj.getChildByName(this._skyPoint);
                var skyScenePath = Resdefine_1.default.prefix + this.roadConifg.sky_scene + Resdefine_1.default.behindfix;
                var skyScene = Laya.loader.getRes(skyScenePath);
                if (skyParent != null && skyScene != null) {
                    var getChild = skyParent.getChildAt(0);
                    if (getChild != null) {
                        skyParent.removeChild(getChild);
                    }
                    var instScene = skyScene;
                    skyParent.addChild(instScene);
                    instScene.transform.localPosition = Vector3Ex_1.default.zero;
                    instScene.transform.localScale = Vector3Ex_1.default.one;
                    instScene.transform.localRotationEuler = Vector3Ex_1.default.zero;
                } else {
                    if (skyParent == null) {
                        console.error("å½“å‰åœºæ™¯æœªæ£€æµ‹å¤©ç©ºç›’å¼€å§‹æŒ‚è½½ç‚¹");
                    }
                    if (skyScene == null) {
                        console.error("èµ„æºåŠ è½½å¤±è´¥", skyScenePath);
                    }
                }
                var jsonData = Laya.loader.getRes("res/animData/" + this.roadConifg.scene_path + ".json");
                this._roadData = new RoadData_1.default();
                var frameCount = jsonData.keys.length;
                this._roadData.totalDistance = jsonData.totalDistance;
                for (var i = 0; i < frameCount; ++i) {
                    this._roadData.SetKey(jsonData.keys[i], new Laya.Vector3(-jsonData.pos_x[i], jsonData.pos_y[i] + 1.6, jsonData.pos_z[i]), new Laya.Vector4(jsonData.rot_x[i], jsonData.rot_y[i], jsonData.rot_z[i], jsonData.rot_w[i]));
                }
                this.totalDistance = this._roadData.totalDistance;
                var colliderPath = Resdefine_1.default.prefix + this.roadConifg.scene_path + "_collider" + Resdefine_1.default.behindfix;
                var loadObj = Laya.loader.getRes(colliderPath);
                if (loadObj == null) {
                    this.colliderObj = null;
                    console.error("èµ„æºåŠ è½½å¤±è´¥", colliderPath);
                } else {
                    this.colliderObj = GlobalUnit_1.default.s3d.addChild(Laya.Sprite3D.instantiate(loadObj));
                    for (var i = 0; i < this.colliderObj.numChildren; ++i) {
                        var colliderPObj = this.colliderObj.getChildAt(i);
                        for (var j = 0; j < colliderPObj.numChildren; ++j) {
                            var colliderObj = colliderPObj.getChildAt(j);
                            var collider = colliderObj.getComponent(Laya.PhysicsCollider);
                            collider.collisionGroup = CollisionLayer_1.default.Road;
                            collider.canCollideWith = CollisionLayer_1.default.Ray;
                        }
                    }
                }
            };
            RoadManager.prototype.UpdateObj = function(obj, distance, angle, searchIndex) {
                if (obj == null) return;
                var progress = distance / this._roadData.totalDistance;
                var posData = this._roadData.GetPos(progress, searchIndex);
                var currentCenterPos = posData[1];
                var currentCenterRot = this._roadData.GetRot(progress, searchIndex);
                var combineRotation = QuaternionEx_1.default.MultiplyQ(currentCenterRot, QuaternionEx_1.default.FromEulerAngle(0, angle / 5, angle));
                var playerPos = Vector3Ex_1.default.Add(currentCenterPos, QuaternionEx_1.default.Multiply(combineRotation, this._downVec));
                obj.transform.position = playerPos;
                obj.transform.rotation = combineRotation;
                return posData[0];
            };
            RoadManager.prototype.UpdateCamera = function(distance, searchIndex) {
                var progress = distance / this._roadData.totalDistance;
                return this._roadData.GetRot(progress, searchIndex);
            };
            RoadManager.prototype.SearchPos = function(pos, progress, searchIndex) {
                var beginProgress = MathEx_1.default.Clamp01(progress - .05);
                var behindProgress = MathEx_1.default.Clamp01(progress + .05);
                var exceptP = beginProgress;
                var exceptCenter;
                var minDistance = 9999;
                for (var p = beginProgress; p < behindProgress; p += .001) {
                    var exceptPos = this._roadData.GetPos(p, searchIndex)[1];
                    var distance = Vector3Ex_1.default.DistanceSqrt(pos, exceptPos);
                    if (distance < minDistance) {
                        minDistance = distance;
                        exceptP = p;
                        exceptCenter = exceptPos;
                    }
                }
                var exceptRot = this._roadData.GetRot(exceptP, searchIndex);
                var downDir = QuaternionEx_1.default.Multiply(exceptRot, Vector3Ex_1.default.down);
                var forwardDir = QuaternionEx_1.default.Multiply(exceptRot, Vector3Ex_1.default.forward);
                var toPos = Vector3Ex_1.default.Subtract(pos, exceptCenter);
                var degree = Vector3Ex_1.default.SignedAngle(downDir, toPos, forwardDir);
                degree = MathEx_1.default.Clamp(degree, -GameConst_1.default.maxRoadDegree + 5, GameConst_1.default.maxRoadDegree - 5);
                var result = new Laya.Vector2(degree, this.totalDistance * exceptP);
                return result;
            };
            RoadManager.prototype.CheckIsBroken = function(distance) {
                for (var i = 0; i < this.roadConifg.map_broken.length; i += 2) {
                    var startDistance = this.roadConifg.map_broken[i];
                    var stopDistance = this.roadConifg.map_broken[i + 1];
                    if (distance < startDistance) return false;
                    if (distance > stopDistance) continue;
                    return true;
                }
                return false;
            };
            return RoadManager;
        }();
        exports.default = RoadManager;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/CollisionLayer": 51,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/RoadConfig": 70,
        "../data/RoadData": 75
    } ],
    89: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ShareManager = function() {
            function ShareManager() {
                this._shareValue = [ false, true, false, true, true, false, true, true, true ];
                this._initIndex = 0;
            }
            ShareManager.prototype.Init = function() {};
            ShareManager.prototype.GetShareResult = function() {
                if (this._initIndex >= this._shareValue.length) {
                    this._initIndex = 0;
                }
                return this._shareValue[this._initIndex++];
            };
            return ShareManager;
        }();
        exports.default = ShareManager;
    }, {} ],
    90: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var CharactorConfig_1 = require("../config/CharactorConfig");
        var ProertyConfig_1 = require("../config/ProertyConfig");
        var EUnlockType_1 = require("../common/EUnlockType");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var Resdefine_1 = require("../common/Resdefine");
        var SkinManager = function() {
            function SkinManager() {}
            Object.defineProperty(SkinManager.prototype, "totalWeight", {
                get: function() {
                    return this._totalWeight;
                },
                enumerable: true,
                configurable: true
            });
            SkinManager.prototype.Init = function() {
                this._totalWeight = 0;
                for (var _i = 0, _a = CharactorConfig_1.CharactorConfig.dataList; _i < _a.length; _i++) {
                    var charactorConfig = _a[_i];
                    this._totalWeight += charactorConfig.ai_weight;
                }
            };
            SkinManager.prototype.GetSkinModelPath = function(id) {
                var skinConfig = CharactorConfig_1.CharactorConfig.data[id];
                if (skinConfig == null) return Resdefine_1.default.prefix + "player01" + ".lh";
                return Resdefine_1.default.prefix + skinConfig.model_path + ".lh";
            };
            SkinManager.prototype.GetRandomAISkinId = function() {
                var randomValue = MathEx_1.default.Random(0, this._totalWeight);
                var currentWeight = 0;
                for (var _i = 0, _a = CharactorConfig_1.CharactorConfig.dataList; _i < _a.length; _i++) {
                    var charactorConfig = _a[_i];
                    currentWeight += charactorConfig.ai_weight;
                    if (randomValue <= currentWeight) {
                        return charactorConfig.id;
                    }
                }
                return CharactorConfig_1.CharactorConfig.dataList[CharactorConfig_1.CharactorConfig.dataList.length - 1].id;
            };
            SkinManager.prototype.CheckGiftUnlocked = function() {
                var allSkin = CharactorConfig_1.CharactorConfig.dataList;
                for (var _i = 0, allSkin_1 = allSkin; _i < allSkin_1.length; _i++) {
                    var skin = allSkin_1[_i];
                    if (skin.unlock_type == EUnlockType_1.EUnlockType.Gift) {
                        return GlobalUnit_1.default.dataManager.IsSkinUnlocked(skin.id);
                    }
                }
                return false;
            };
            SkinManager.prototype.UnLockGiftSkin = function() {
                var allSkin = CharactorConfig_1.CharactorConfig.dataList;
                for (var _i = 0, allSkin_2 = allSkin; _i < allSkin_2.length; _i++) {
                    var skin = allSkin_2[_i];
                    if (skin.unlock_type == EUnlockType_1.EUnlockType.Gift) {
                        GlobalUnit_1.default.dataManager.UnlockSkin(skin.id);
                    }
                }
            };
            SkinManager.prototype.CheckContains = function(skinConfig, eprop) {
                var getProp = this.GetProp(skinConfig, eprop);
                return getProp != null;
            };
            SkinManager.prototype.GetProp = function(skinConfig, eprop) {
                if (skinConfig == null) return null;
                var propIds = skinConfig.prop_ids;
                for (var _i = 0, propIds_1 = propIds; _i < propIds_1.length; _i++) {
                    var propId = propIds_1[_i];
                    var propConfig = ProertyConfig_1.ProertyConfig.data[propId];
                    if (propConfig == null) continue;
                    if (propConfig.prop_type == eprop) {
                        return propConfig;
                    }
                }
                return null;
            };
            return SkinManager;
        }();
        exports.default = SkinManager;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../common/EUnlockType": 54,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/CharactorConfig": 61,
        "../config/ProertyConfig": 67
    } ],
    91: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var WX_helper_1 = require("../../module/sdk/weChat/WX_helper");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var WXHelper = function(_super) {
            __extends(WXHelper, _super);
            function WXHelper() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WXHelper.prototype.onInit = function() {
                _super.prototype.onInit.call(this);
                this.Video_adunit = "adunit-5631637236cf16b6";
                this.Banner_adunit = "adunit-b48894d44d318e5a";
            };
            WXHelper.prototype.onHide = function() {
                _super.prototype.onHide.call(this);
                Laya.timer.scale = 0;
                if (GlobalUnit_1.default.gameManager != null) {
                    GlobalUnit_1.default.gameManager.OnHide();
                }
            };
            WXHelper.prototype.onShow = function(res) {
                _super.prototype.onShow.call(this, res);
                Laya.timer.scale = 1;
                if (GlobalUnit_1.default.gameManager != null) {
                    GlobalUnit_1.default.gameManager.OnShow();
                }
                var referInfo = SDKManager_1.default.inst.sdk.getSceneID();
                console.log(referInfo);
            };
            return WXHelper;
        }(WX_helper_1.default);
        exports.WXHelper = WXHelper;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/sdk/weChat/WX_helper": 21,
        "../common/GlobalUnit": 56
    } ],
    92: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var RoadConfig_1 = require("../config/RoadConfig");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var CharactorConfig_1 = require("../config/CharactorConfig");
        var APIManager_1 = require("../../module/manager/APIManager");
        var AiConfig_1 = require("../config/AiConfig");
        var AiNameBehind_1 = require("../config/AiNameBehind");
        var AiNamePre_1 = require("../config/AiNamePre");
        var HeadConfig_1 = require("../config/HeadConfig");
        var LevelConfig_1 = require("../config/LevelConfig");
        var RankSpeedConfig_1 = require("../config/RankSpeedConfig");
        var SpeedupConfig_1 = require("../config/SpeedupConfig");
        var ConfigManager_1 = require("../LTGame/Config/ConfigManager");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var SignConfig_1 = require("../config/SignConfig");
        var LTUtils_1 = require("../LTGame/LTUtils/LTUtils");
        var RankConfig_1 = require("../config/RankConfig");
        var ProertyConfig_1 = require("../config/ProertyConfig");
        var LoadConfig_1 = require("../config/LoadConfig");
        var WeekRankConfig_1 = require("../config/WeekRankConfig");
        var DrawlotsConfig_1 = require("../config/DrawlotsConfig");
        var DrawlotsDesConfig_1 = require("../config/DrawlotsDesConfig");
        var LoadScene = function(_super) {
            __extends(LoadScene, _super);
            function LoadScene() {
                var _this = _super.call(this) || this;
                _this.width = Laya.stage.width;
                _this.height = Laya.stage.height;
                return _this;
            }
            LoadScene.prototype.onOpened = function() {
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_LOAD_SCENE, "å¼€å§‹åŠ è½½");
                this._startTime = new Date().getTime();
                this._maxProgressWidth = this.progress_bg.width;
                this._3dProgress = 0;
                this._uiProgress = 0;

                this.img_logo.on(Laya.Event.MOUSE_DOWN,this,()=>{
                    platform.getInstance().navigate("Loading","LOGO");
                })
                this._UpdateProgress();
                var adapter = null;
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_WX:
                  case SDKManager_1.default.PlaneForm_QQ:
                    adapter = Laya.MiniAdpter;
                    break;

                  case SDKManager_1.default.PlaneForm_Swan:
                    adapter = Laya.BMiniAdapter;
                    this.img_logo.visible = false;
                    break;
                }
                if (adapter != null) 
                {
                    // adapter.nativefiles = [ 
                    //     "res/atlas/ui_res.atlas",
                    //     "res/atlas/ui_res.png", 
                    //     "ui_res", "MainScene.scene", 
                    //     "res/LayaScene_Main/Conventional/Library", 
                    //     "res/LayaScene_Main/Conventional/Assets/_res", 
                    //     "res/LayaScene_Main/Conventional/Assets/TeXiao", 
                    //     "res/LayaScene_Main/Conventional/Assets/Texture" ];
                    // if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ || SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_Swan) {
                    //     Laya.URL.basePath = "https://file.gugudang.com/res/down/aquapark/" + Resdefine_1.default.version + "/aquapark/";
                    // } else {
                    //     Laya.URL.basePath = "https://hs.yz061.com/res/down/aquapark/" + Resdefine_1.default.version + "/aquapark/";
                    // }
                    // if (Laya.LocalStorage.getItem("resVersion") != Resdefine_1.default.version) {
                    //     console.log("æœ¬åœ°èµ„æºç¼“å­˜ä¸Žå½“å‰ç‰ˆæœ¬ä¸ä¸€è‡´ï¼Œæ¸…ç†æœ¬åœ°èµ„æºç¼“å­˜");
                    //     adapter.removeAll();
                    //     Laya.LocalStorage.setItem("resVersion", Resdefine_1.default.version);
                    // }
                }
                ConfigManager_1.ConfigManager.AddConfig(AiConfig_1.AiConfig);
                ConfigManager_1.ConfigManager.AddConfig(AiNameBehind_1.AiNameBehind);
                ConfigManager_1.ConfigManager.AddConfig(AiNamePre_1.AiNamePre);
                ConfigManager_1.ConfigManager.AddConfig(CharactorConfig_1.CharactorConfig);
                ConfigManager_1.ConfigManager.AddConfig(HeadConfig_1.HeadConfig);
                ConfigManager_1.ConfigManager.AddConfig(LevelConfig_1.LevelConfig);
                ConfigManager_1.ConfigManager.AddConfig(RankSpeedConfig_1.RankSpeedConfig);
                ConfigManager_1.ConfigManager.AddConfig(RoadConfig_1.RoadConfig);
                ConfigManager_1.ConfigManager.AddConfig(SpeedupConfig_1.SpeedupConfig);
                ConfigManager_1.ConfigManager.AddConfig(SignConfig_1.SignConfig);
                ConfigManager_1.ConfigManager.AddConfig(RankConfig_1.RankConfig);
                ConfigManager_1.ConfigManager.AddConfig(ProertyConfig_1.ProertyConfig);
                ConfigManager_1.ConfigManager.AddConfig(LoadConfig_1.LoadConfig);
                ConfigManager_1.ConfigManager.AddConfig(WeekRankConfig_1.WeekRankConfig);
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    ConfigManager_1.ConfigManager.AddConfig(DrawlotsConfig_1.DrawlotsConfig);
                    ConfigManager_1.ConfigManager.AddConfig(DrawlotsDesConfig_1.DrawlotsDesConfig);
                }
                ConfigManager_1.ConfigManager.StartLoad(Laya.Handler.create(this, this._OnLoadedJson));
            };
            LoadScene.prototype._OnLoadedJson = function() {
                this._LoadScene();
            };
            LoadScene.prototype._LoadScene = function() {
                GlobalUnit_1.default.InitAllManager();
                var loadUrls = [];
                GlobalUnit_1.default.roadManager.PreLoad(loadUrls);
                loadUrls.push(Resdefine_1.default.prefix + CharactorConfig_1.CharactorConfig.data[GlobalUnit_1.default.dataManager.currentSkinId].model_path + ".lh");
                loadUrls.push(Resdefine_1.default.cameraPath);
                loadUrls.push(Resdefine_1.default.kingObjPath);
                loadUrls.push(Resdefine_1.default.pifu_scene);
                LTUtils_1.LTUtils.DownLoadFiles(loadUrls, Laya.Handler.create(this, this._OnLoadFinished), Laya.Handler.create(this, this._OnLoadProgress, null, false));
                SDKManager_1.default.inst.sdk.canVibrate = true;
                SDKManager_1.default.inst.sdk.getSystemInfo(BHandler_1.default.create(this, this._OnInited));
                SDKManager_1.default.inst.sdk.getUserInfo(BHandler_1.default.create(this, this._GetUserInfo));
            };
            LoadScene.prototype._GetUserInfo = function(ret) {
                if (ret == false) {
                    GlobalUnit_1.default.dataManager.userName = null;
                    GlobalUnit_1.default.dataManager.userIcon = null;
                } else {
                    GlobalUnit_1.default.dataManager.userName = SDKManager_1.default.inst.userInfo.userInfo.nickName;
                    GlobalUnit_1.default.dataManager.userIcon = SDKManager_1.default.inst.userInfo.userInfo.avatarUrl;
                }
            };
            LoadScene.prototype._OnInited = function() {
                console.log("åˆå§‹åŒ–æˆåŠŸ");
                SDKManager_1.default.inst.sdk.login(BHandler_1.default.create(this, this._DataLogin));
            };
            LoadScene.prototype._DataLogin = function(res) {
                console.log("åŽå°ä¿¡æ¯ç™»å½•", res);
                MatterManager_1.default.inst.init(Resdefine_1.default.adVersion);
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "é‡‘å¸æ•°é‡", GlobalUnit_1.default.dataManager.coinCount);
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "æ®µä½ç§¯åˆ†", GlobalUnit_1.default.dataManager.cupCount);
                GlobalUnit_1.default.dataManager.UploadScore();
            };
            LoadScene.prototype._OnLoadProgress = function(value) {
                this._3dProgress = value;
                this._UpdateProgress();
            };
            LoadScene.prototype._UpdateProgress = function() {
                var progress = (this._3dProgress + this._uiProgress) / 2;
                this.progress_front.right = this._maxProgressWidth * MathEx_1.default.Clamp01(1 - progress);
            };
            LoadScene.prototype._OnLoadFinished = function() {
                GlobalUnit_1.default.gameManager.CreateMainScene(true);
                Laya.Scene.load("MainScene.scene", Laya.Handler.create(this, this._LoadSceneFinished), Laya.Handler.create(this, this._OnLoadMainProgress, null, false));
            };
            LoadScene.prototype._OnLoadMainProgress = function(value) {
                this._uiProgress = value;
                this._UpdateProgress();
            };
            LoadScene.prototype._LoadSceneFinished = function() {
                this._RealOpen();
            };
            LoadScene.prototype._RealOpen = function() {
                Laya.Scene.open("MainScene.scene");
                var passTime = (new Date().getTime() - this._startTime) / 1e3;
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_LOAD_SCENE, "åŠ è½½å®Œæˆ", passTime);
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    this.checkTwo11();
                }
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_WX) {
                    this.checkOpenSign();
                }
            };
            LoadScene.prototype.checkTwo11 = function() {
                var _this = this;
                APIManager_1.default.inst.api.additional(BHandler_1.default.create(this, function(data) {
                    if (data && data.code == 1) {
                        var bool1 = GlobalUnit_1.default.dataManager.isPassData();
                        if (data.data && data.data && data.data["double_eleven"] == 1) {
                            GlobalUnit_1.default.dataManager.isTwo11 = true;
                            if (!bool1) {
                                var bool0 = GlobalUnit_1.default.dataManager.isGetTwo11Reward == 1;
                                if (!bool0) {
                                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_two11.prefab");
                                } else {
                                    _this.checkOpenSign();
                                }
                            } else {
                                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_two11.prefab");
                            }
                        } else {
                            GlobalUnit_1.default.dataManager.isTwo11 = false;
                            _this.checkOpenSign();
                        }
                    }
                }));
            };
            LoadScene.prototype.checkOpenSign = function() {
                if (GlobalUnit_1.default.dataManager.isOpenSignEd) return;
                var bool = GlobalUnit_1.default.dataManager.isGetSignReward;
                var day = GlobalUnit_1.default.dataManager.curSignDay;
                if (day >= 7 && bool) {} else {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_sign.prefab");
                }
            };
            return LoadScene;
        }(Laya.Scene);
        exports.default = LoadScene;
    }, {
        "../../module/manager/APIManager": 5,
        "../../module/manager/MatterManager": 7,
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/Config/ConfigManager": 27,
        "../LTGame/LTUtils/LTUtils": 35,
        "../LTGame/LTUtils/MathEx": 37,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/AiConfig": 58,
        "../config/AiNameBehind": 59,
        "../config/AiNamePre": 60,
        "../config/CharactorConfig": 61,
        "../config/DrawlotsConfig": 62,
        "../config/DrawlotsDesConfig": 63,
        "../config/HeadConfig": 64,
        "../config/LevelConfig": 65,
        "../config/LoadConfig": 66,
        "../config/ProertyConfig": 67,
        "../config/RankConfig": 68,
        "../config/RankSpeedConfig": 69,
        "../config/RoadConfig": 70,
        "../config/SignConfig": 71,
        "../config/SpeedupConfig": 72,
        "../config/WeekRankConfig": 73
    } ],
    93: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var Resdefine_1 = require("../common/Resdefine");
        var MainScene = function(_super) {
            __extends(MainScene, _super);
            function MainScene() {
                var _this = _super.call(this) || this;
                _this.width = Laya.stage.width;
                _this.height = Laya.stage.height;
                return _this;
            }
            MainScene.prototype.onOpened = function() {
                GlobalUnit_1.default.uiRoot.root = this;
                GlobalUnit_1.default.uiRoot.ui_main.visible = true;
                SDKManager_1.default.inst.sdk.postMsg({
                    method: "resize",
                    width: Laya.stage.width,
                    height: Laya.stage.height,
                    rankSuffix: "æ¬¡"
                });
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "è¿›å…¥ä¸»ç•Œé¢");
                GlobalUnit_1.default.audioManager.PlayMusic(Resdefine_1.default.audio_bg);
            };
            return MainScene;
        }(Laya.Scene);
        exports.default = MainScene;
    }, {
        "../../module/manager/SDKManager": 8,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57
    } ],
    94: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BaseState_1 = require("../LTGame/Fsm/BaseState");
        var EPlayerState_1 = require("./EPlayerState");
        var BasePlayerState = function(_super) {
            __extends(BasePlayerState, _super);
            function BasePlayerState(owner, state) {
                var _this = _super.call(this) || this;
                _this.owner = owner;
                _this.currentState = state;
                _this.id = state;
                return _this;
            }
            BasePlayerState.prototype.OnEnter = function(exitState, param) {
                this.passTime = 0;
                this.nextState = EPlayerState_1.EPlayerState.None;
                this.isFinished = false;
                this._DoEnter(exitState);
            };
            BasePlayerState.prototype.OnRunning = function(param) {
                this.deltaTime = param;
                this.passTime += this.deltaTime;
                this._DoRunning();
            };
            BasePlayerState.prototype.OnExit = function(enterState, param) {
                this._DoExit(enterState);
            };
            BasePlayerState.prototype.GetNextState = function() {
                if (this.isFinished) {
                    return this.nextState;
                }
                return EPlayerState_1.EPlayerState.None;
            };
            BasePlayerState.prototype._DoEnter = function(exitState) {};
            BasePlayerState.prototype._DoRunning = function() {};
            BasePlayerState.prototype._DoExit = function(enterState) {};
            return BasePlayerState;
        }(BaseState_1.default);
        exports.default = BasePlayerState;
    }, {
        "../LTGame/Fsm/BaseState": 28,
        "./EPlayerState": 95
    } ],
    95: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var EPlayerState;
        (function(EPlayerState) {
            EPlayerState[EPlayerState["None"] = 0] = "None";
            EPlayerState[EPlayerState["MoveInRoad"] = 1] = "MoveInRoad";
            EPlayerState[EPlayerState["HitWall"] = 2] = "HitWall";
            EPlayerState[EPlayerState["FlyUp"] = 3] = "FlyUp";
            EPlayerState[EPlayerState["Fly"] = 4] = "Fly";
            EPlayerState[EPlayerState["Jump"] = 5] = "Jump";
            EPlayerState[EPlayerState["HitGround"] = 6] = "HitGround";
            EPlayerState[EPlayerState["WaterUp"] = 7] = "WaterUp";
            EPlayerState[EPlayerState["WaterIdle"] = 8] = "WaterIdle";
            EPlayerState[EPlayerState["WaterDown"] = 9] = "WaterDown";
            EPlayerState[EPlayerState["ForceFly"] = 10] = "ForceFly";
            EPlayerState[EPlayerState["FixedFly"] = 11] = "FixedFly";
            EPlayerState[EPlayerState["Lose"] = 12] = "Lose";
            EPlayerState[EPlayerState["HitBoom"] = 13] = "HitBoom";
            EPlayerState[EPlayerState["Dead"] = 14] = "Dead";
        })(EPlayerState = exports.EPlayerState || (exports.EPlayerState = {}));
    }, {} ],
    96: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var PlayerStateDead = function(_super) {
            __extends(PlayerStateDead, _super);
            function PlayerStateDead(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.Dead) || this;
            }
            PlayerStateDead.prototype._DoEnter = function() {
                this.owner.StopMove();
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    if (!GlobalUnit_1.default.uiRoot.ui_end_rank.visible) {
                        GlobalUnit_1.default.gameManager.StopGame(false);
                    }
                }
            };
            return PlayerStateDead;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateDead;
    }, {
        "../common/GlobalUnit": 56,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    97: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var GameConst_1 = require("../common/GameConst");
        var Resdefine_1 = require("../common/Resdefine");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var AiConfig_1 = require("../config/AiConfig");
        var PlayerStateFixedFly = function(_super) {
            __extends(PlayerStateFixedFly, _super);
            function PlayerStateFixedFly(owner) {
                var _this = _super.call(this, owner, EPlayerState_1.EPlayerState.FixedFly) || this;
                _this._flyTime = 1;
                return _this;
            }
            PlayerStateFixedFly.prototype._DoEnter = function() {
                var aiConfig = AiConfig_1.AiConfig.data[this.owner.aiId];
                this.owner.currentAnim = Resdefine_1.default.anim_fly;
                var isForward = MathEx_1.default.Random(0, 100) < aiConfig.forward_rate;
                var exceptDistance = GlobalUnit_1.default.mainPlayer.moveDistance;
                if (isForward) {
                    exceptDistance += MathEx_1.default.Random(aiConfig.fly_down_distance[0], aiConfig.fly_down_distance[1]);
                } else {
                    exceptDistance += MathEx_1.default.Random(aiConfig.move_distance[0], aiConfig.move_distance[1]);
                }
                exceptDistance = MathEx_1.default.Clamp(exceptDistance, GameConst_1.default.safeDistance, GlobalUnit_1.default.roadManager.totalDistance - GameConst_1.default.safeDistance);
                if (exceptDistance > GlobalUnit_1.default.mainPlayer.moveDistance + GameConst_1.default.roadMoveSpeedCenter * this._flyTime) {
                    var exceptProgress = exceptDistance / GlobalUnit_1.default.roadManager.totalDistance;
                    var exceptPosData = GlobalUnit_1.default.roadManager.roadData.GetPos(exceptProgress, 0);
                    this.owner.lastSeachIndex = 0;
                    var exceptPos = exceptPosData[1];
                    var toExceptPos = Vector3Ex_1.default.Subtract(exceptPos, this.owner.transform.position);
                    var flyDegree = Vector3Ex_1.default.SignedAngle(Vector3Ex_1.default.forward, toExceptPos, Vector3Ex_1.default.up);
                    var flyQ = QuaternionEx_1.default.FromEulerAngle(0, flyDegree, 0);
                    this.owner.transform.rotation = flyQ;
                    this.owner.flySpeed = new Laya.Vector3(0, GameConst_1.default.minFlyDownSpeed, GameConst_1.default.initFlyUpSpeed.z);
                    var flyDistance = Vector3Ex_1.default.Scale(this.owner.flySpeed, this._flyTime);
                    var flyStartPos = Vector3Ex_1.default.Subtract(exceptPos, QuaternionEx_1.default.Multiply(flyQ, flyDistance));
                    this.owner.transform.position = flyStartPos;
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Fly;
                } else {
                    if (exceptDistance > GlobalUnit_1.default.mainPlayer.moveDistance - 8) {
                        exceptDistance = GlobalUnit_1.default.mainPlayer.moveDistance - 8;
                    }
                    this.owner.moveDistance = exceptDistance;
                    if (MathEx_1.default.Random(0, 100) < aiConfig.force_speedup_rate) {
                        this.owner.SpeedScale(GameConst_1.default.speedUpSpeed, GameConst_1.default.speedUpTime, true);
                        this.owner.isSuperSpeedUp = true;
                    }
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.MoveInRoad;
                }
            };
            return PlayerStateFixedFly;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateFixedFly;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/AiConfig": 58,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    98: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var CollisionLayer_1 = require("../common/CollisionLayer");
        var GameConst_1 = require("../common/GameConst");
        var Resdefine_1 = require("../common/Resdefine");
        var PlayerStateFly = function(_super) {
            __extends(PlayerStateFly, _super);
            function PlayerStateFly(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.Fly) || this;
            }
            PlayerStateFly.prototype._DoEnter = function() {
                this.owner.flyDegree = this.owner.transform.localRotationEulerY;
                this._genCoinTime = 0;
                this._currentGenCoin = 0;
                if (this.owner.skinConfig.id == 4) {
                    this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.flyEffect, this.owner.transform.position, this.owner.transform.rotation, null, this.owner.gameobject);
                } else if (this.owner.skinConfig.id == 10) {
                    this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.flyEffect2, this.owner.transform.position, this.owner.transform.rotation, null, this.owner.gameobject);
                } else if (this.owner.skinConfig.id == 12) {
                    this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.flyEffect3, this.owner.transform.position, this.owner.transform.rotation, null, this.owner.gameobject);
                }
            };
            PlayerStateFly.prototype._DoRunning = function() {
                this._genCoinTime -= this.deltaTime;
                if (this._genCoinTime < 0 && this._currentGenCoin < GameConst_1.default.flyMaxGenCoinCount) {
                    this._genCoinTime = GameConst_1.default.flyGenCoinTime;
                    this._currentGenCoin += GameConst_1.default.flyGenCoinCount;
                }
                if (this.owner.flySpeed.y > GameConst_1.default.minFlyDownSpeed) {
                    this.owner.flySpeed.y -= GameConst_1.default.downAddSpeed * this.deltaTime;
                }
                var oldRotation = this.owner.transform.rotation.clone();
                var oldPosition = this.owner.transform.position.clone();
                this.owner.transform.localRotationEulerY = this.owner.flyDegree;
                var forwardDistance = QuaternionEx_1.default.Multiply(this.owner.transform.rotation, Vector3Ex_1.default.Scale(this.owner.flySpeed, this.deltaTime));
                this.owner.transform.position = Vector3Ex_1.default.Add(this.owner.transform.position, forwardDistance);
                var hitInfo = new Laya.HitResult();
                var isHit = GlobalUnit_1.default.s3d.physicsSimulation.shapeCast(this.owner.collider.colliderShape, oldPosition, this.owner.transform.position, hitInfo, oldRotation, this.owner.transform.rotation, CollisionLayer_1.default.Ray, CollisionLayer_1.default.Road | CollisionLayer_1.default.EndPoint);
                if (isHit) {
                    switch (hitInfo.collider.collisionGroup) {
                      case CollisionLayer_1.default.Road:
                        var result = GlobalUnit_1.default.roadManager.SearchPos(hitInfo.point, parseFloat(hitInfo.collider.owner.parent.name), this.owner.lastSeachIndex - 50);
                        this.owner.moveDistance = result.y;
                        this.owner.degree = result.x;
                        this.isFinished = true;
                        this.nextState = EPlayerState_1.EPlayerState.MoveInRoad;
                        if (this.owner == GlobalUnit_1.default.mainPlayer) {
                            GlobalUnit_1.default.followCamera.ChangeToRoadModel();
                        }
                        return;

                      case CollisionLayer_1.default.EndPoint:
                        this.isFinished = true;
                        this.nextState = EPlayerState_1.EPlayerState.WaterDown;
                        this._currentSpeed = this.owner.flySpeed;
                        return;
                    }
                }
                if (this.owner.transform.position.y < GlobalUnit_1.default.roadManager.groundHeight) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.HitGround;
                }
                if (GlobalUnit_1.default.gameManager.isEnd) {
                    if (GlobalUnit_1.default.mainPlayer == this.owner) {
                        GlobalUnit_1.default.gameManager.ShowEndRank();
                    }
                }
            };
            PlayerStateFly.prototype._DoExit = function() {
                if (this._effectObj != null) {
                    GlobalUnit_1.default.effectManager.ReturnEffect(Resdefine_1.default.flyEffect, this._effectObj);
                }
            };
            return PlayerStateFly;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateFly;
    }, {
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/CollisionLayer": 51,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    99: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var GameConst_1 = require("../common/GameConst");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var PlayerStateFlyup = function(_super) {
            __extends(PlayerStateFlyup, _super);
            function PlayerStateFlyup(owner) {
                var _this = _super.call(this, owner, EPlayerState_1.EPlayerState.FlyUp) || this;
                _this._totalTime = .5;
                return _this;
            }
            PlayerStateFlyup.prototype._DoEnter = function(exitState) {
                this.owner.currentAnim = Resdefine_1.default.anim_fly;
                this.owner.isInRoad = false;
                this.owner.flySpeed = GameConst_1.default.initFlyUpSpeed.clone();
                this._startEulerZ = this.owner.transform.rotationEuler.z;
                this._startEulerY = this.owner.transform.rotationEuler.y;
                this._targetEulerY = this._startEulerY + (this.owner.degree < 0 ? -0 : 0);
                this._startUpSpeed = this.owner.flySpeed.y;
                this.owner.flySpeed.z *= 2;
                if (this.owner == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.followCamera.ChangeToFlyModel();
                    GlobalUnit_1.default.Shake();
                }
            };
            PlayerStateFlyup.prototype._DoRunning = function() {
                var progress = MathEx_1.default.Clamp01(this.passTime / this._totalTime);
                var lerpY = MathEx_1.default.Lerp(this._startEulerY, this._targetEulerY, progress);
                var euler = new Laya.Vector3(0, lerpY, MathEx_1.default.Lerp(this._startEulerZ, 0, progress));
                this.owner.transform.rotationEuler = euler;
                this.owner.flySpeed.y -= GameConst_1.default.downAddSpeed * this.deltaTime;
                var forwardSpeed = new Laya.Vector3(0, 0, this.owner.flySpeed.z);
                var forwardDistance = QuaternionEx_1.default.Multiply(this.owner.transform.rotation, Vector3Ex_1.default.Scale(forwardSpeed, this.deltaTime));
                var upDistance = new Laya.Vector3(0, this.owner.flySpeed.y * this.deltaTime, 0);
                this.owner.transform.position = Vector3Ex_1.default.Add(this.owner.transform.position, forwardDistance, upDistance);
                if (this.passTime >= this._totalTime) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Fly;
                }
            };
            PlayerStateFlyup.prototype._DoExit = function() {
                this.owner.flySpeed.z /= 2;
            };
            return PlayerStateFlyup;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateFlyup;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    100: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var GameConst_1 = require("../common/GameConst");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var PlayerStateForceFly = function(_super) {
            __extends(PlayerStateForceFly, _super);
            function PlayerStateForceFly(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.ForceFly) || this;
            }
            PlayerStateForceFly.prototype._DoEnter = function() {
                this._UpdateAnim();
                this._nextFly = false;
            };
            PlayerStateForceFly.prototype._DoRunning = function() {
                if (this._nextFly) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.FlyUp;
                    return;
                }
                this.owner.degree += (this.owner.isflyLeft ? -1 : 1) * GameConst_1.default.maxRoadDegree * this.deltaTime * 50;
                if (this.owner.degree < -GameConst_1.default.maxRoadDegree - GameConst_1.default.minFlyDegree || this.owner.degree > GameConst_1.default.maxRoadDegree + GameConst_1.default.minFlyDegree) {
                    this.owner.degree = MathEx_1.default.Clamp(this.owner.degree, -GameConst_1.default.maxRoadDegree, GameConst_1.default.maxRoadDegree);
                    this._nextFly = true;
                }
                this.owner.moveDistance += this.owner.moveSpeed * this.deltaTime;
                this.owner.UpdateViewPos();
                if (this.owner.moveDistance >= GlobalUnit_1.default.roadManager.totalDistance - GameConst_1.default.jumpEndDistance) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Jump;
                }
                this._UpdateAnim();
            };
            PlayerStateForceFly.prototype._UpdateAnim = function() {
                var absDegree = Math.abs(this.owner.degree);
                if (absDegree < 5) {
                    this.owner.currentAnim = Resdefine_1.default.anim_move;
                } else if (this.owner.degree > 0) {
                    this.owner.currentAnim = Resdefine_1.default.anim_move_left;
                } else {
                    this.owner.currentAnim = Resdefine_1.default.anim_move_right;
                }
            };
            return PlayerStateForceFly;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateForceFly;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    101: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var Resdefine_1 = require("../common/Resdefine");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var PlayerStateHitBoom = function(_super) {
            __extends(PlayerStateHitBoom, _super);
            function PlayerStateHitBoom(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.HitBoom) || this;
            }
            PlayerStateHitBoom.prototype._DoEnter = function() {
                this.owner.currentAnim = Resdefine_1.default.anim_dead;
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    GlobalUnit_1.default.Shake();
                }
            };
            PlayerStateHitBoom.prototype._DoRunning = function() {
                if (this.passTime > 1) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Dead;
                }
            };
            return PlayerStateHitBoom;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateHitBoom;
    }, {
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    102: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var PlayerStateHitGround = function(_super) {
            __extends(PlayerStateHitGround, _super);
            function PlayerStateHitGround(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.HitGround) || this;
            }
            PlayerStateHitGround.prototype._DoEnter = function() {
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    GlobalUnit_1.default.followCamera.StopFollow();
                }
                this.owner.currentAnim = Resdefine_1.default.anim_dead;
                this.owner.transform.localRotationEulerX = 0;
                this.owner.transform.localRotationEulerZ = 0;
                this.owner.transform.localRotationEulerY += 180;
                this.owner.transform.localPositionY = GlobalUnit_1.default.roadManager.groundHeight + .7;
                var effectPos = this.owner.transform.position.clone();
                effectPos.y += .6;
                this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectXuanyun, effectPos);
                GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectDead, this.owner.transform.position, QuaternionEx_1.default.FromEulerAngle(0, 0, 0), .5);
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    GlobalUnit_1.default.Shake();
                    GlobalUnit_1.default.audioManager.PlaySound(Resdefine_1.default.audio_hit_ground);
                }
            };
            PlayerStateHitGround.prototype._DoRunning = function() {
                if (this.passTime > 2) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Dead;
                }
            };
            PlayerStateHitGround.prototype._DoExit = function() {
                GlobalUnit_1.default.effectManager.ReturnEffect(Resdefine_1.default.effectXuanyun, this._effectObj);
            };
            return PlayerStateHitGround;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateHitGround;
    }, {
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    103: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var Resdefine_1 = require("../common/Resdefine");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var PlayerStateHitWall = function(_super) {
            __extends(PlayerStateHitWall, _super);
            function PlayerStateHitWall(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.HitWall) || this;
            }
            PlayerStateHitWall.prototype._DoEnter = function() {
                this.owner.currentAnim = Resdefine_1.default.anim_dead;
                var effectPos = this.owner.transform.position.clone();
                effectPos.y += .6;
                this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectXuanyun, effectPos);
            };
            PlayerStateHitWall.prototype._DoRunning = function() {
                if (this.passTime > 2) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.MoveInRoad;
                }
            };
            PlayerStateHitWall.prototype._DoExit = function() {
                GlobalUnit_1.default.effectManager.ReturnEffect(Resdefine_1.default.effectXuanyun, this._effectObj);
            };
            return PlayerStateHitWall;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateHitWall;
    }, {
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    104: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var GameConst_1 = require("../common/GameConst");
        var Resdefine_1 = require("../common/Resdefine");
        var PlayerStateJump = function(_super) {
            __extends(PlayerStateJump, _super);
            function PlayerStateJump(owner) {
                var _this = _super.call(this, owner, EPlayerState_1.EPlayerState.Jump) || this;
                _this._backZDegreeSpeed = 30;
                _this._forwardSpeed = new Laya.Vector3(0, 0, 5);
                _this._downSpeed = 10;
                _this._timeScale = 1;
                return _this;
            }
            PlayerStateJump.prototype._DoEnter = function() {
                this.owner.collider.enabled = false;
                this.owner.currentAnim = Resdefine_1.default.anim_jump;
                if (this.owner == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.followCamera.SwitchToJump();
                    GlobalUnit_1.default.uiRoot.ui_fight.visible = false;
                }
                var speed = MathEx_1.default.Random(GameConst_1.default.roadMoveSpeedBoarder, GameConst_1.default.roadMoveSpeedCenter);
                this._currentSpeed = QuaternionEx_1.default.Multiply(this.owner.transform.rotation, Vector3Ex_1.default.Scale(Vector3Ex_1.default.forward, speed * .6));
                this._currentSpeed.x = MathEx_1.default.Random(this._currentSpeed.x * .8, this._currentSpeed.x * 1);
                this._currentSpeed.z = MathEx_1.default.Random(this._currentSpeed.z * .8, this._currentSpeed.z * 1);
                this._timeScale = 1;
                this.owner.FinishRace(true);
            };
            PlayerStateJump.prototype._DoRunning = function() {
                if (this._timeScale > .8) {
                    this._timeScale -= this.deltaTime * .1;
                }
                var dt = this.deltaTime * this._timeScale;
                if (this.owner.transform.localRotationEulerZ < 0) {
                    this.owner.transform.localRotationEulerZ += this._backZDegreeSpeed * this.deltaTime;
                    if (this.owner.transform.localRotationEulerZ > 0) {
                        this.owner.transform.localRotationEulerZ = 0;
                    }
                } else if (this.owner.transform.localRotationEulerZ > 0) {
                    this.owner.transform.localRotationEulerZ -= this._backZDegreeSpeed * this.deltaTime;
                    if (this.owner.transform.localRotationEulerZ < 0) {
                        this.owner.transform.localRotationEulerZ = 0;
                    }
                }
                this._currentSpeed.y -= dt * this._downSpeed;
                var moveDelta = Vector3Ex_1.default.Scale(this._currentSpeed, dt);
                this.owner.transform.position = Vector3Ex_1.default.Add(this.owner.transform.position, moveDelta);
                var forwardSpeed = Math.sqrt(this._currentSpeed.x * this._currentSpeed.x + this._currentSpeed.z * this._currentSpeed.z);
                var xaw = Vector3Ex_1.default.SignedAngle(Vector3Ex_1.default.forward, new Laya.Vector3(0, this._currentSpeed.y, forwardSpeed), Vector3Ex_1.default.right);
                this.owner.transform.localRotationEulerX = xaw;
                if (this.owner.transform.position.y <= GlobalUnit_1.default.roadManager.groundHeight) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.WaterDown;
                }
            };
            return PlayerStateJump;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateJump;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    105: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var Resdefine_1 = require("../common/Resdefine");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var PlayerStateLose = function(_super) {
            __extends(PlayerStateLose, _super);
            function PlayerStateLose(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.Lose) || this;
            }
            PlayerStateLose.prototype._DoEnter = function() {
                this.owner.collider.enabled = false;
                this.owner.currentAnim = Resdefine_1.default.anim_stand_lose;
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    GlobalUnit_1.default.gameManager.ShowEndRank();
                }
            };
            return PlayerStateLose;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateLose;
    }, {
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    106: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var GameConst_1 = require("../common/GameConst");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var CollisionLayer_1 = require("../common/CollisionLayer");
        var ItemCmp_1 = require("../cmp/ItemCmp");
        var SpeedupConfig_1 = require("../config/SpeedupConfig");
        var Resdefine_1 = require("../common/Resdefine");
        var PlayerStateMoveInRoad = function(_super) {
            __extends(PlayerStateMoveInRoad, _super);
            function PlayerStateMoveInRoad(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.MoveInRoad) || this;
            }
            PlayerStateMoveInRoad.prototype._DoEnter = function(exitState) {
                this._UpdateAnim();
                this.owner.isInRoad = true;
                this.owner.speedScaleTime = 0;
                if (GlobalUnit_1.default.mainPlayer == this.owner && this._genSpeedUpTime == null) {
                    this._genSpeedUpTime = GameConst_1.default.genSpeedUpTime;
                }
                this._speedUpEffect = Laya.Sprite3D.instantiate(Laya.loader.getRes(Resdefine_1.default.effectTail));
                this._speedUpEffect.active = false;
                GlobalUnit_1.default.s3d.addChild(this._speedUpEffect);
                if (GlobalUnit_1.default.gameManager.isEnd) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Lose;
                }
                this.owner.lastDegree = this.owner.degree;
                this.owner.degreeSpeed = 0;
            };
            PlayerStateMoveInRoad.prototype._DoRunning = function() {
                if (GlobalUnit_1.default.gameManager.isEnd) {
                    this._EndLogic();
                } else {
                    this._NormalLogic();
                }
            };
            PlayerStateMoveInRoad.prototype._EndLogic = function() {
                var oldRotation = this.owner.transform.rotation.clone();
                var oldPosition = this.owner.transform.position.clone();
                this._BackToCenter();
                this._UpdateAnim();
                this._UpdatePos();
                this._CheckHit(oldPosition, oldRotation);
                if (this.owner.moveSpeed <= 0) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Lose;
                }
            };
            PlayerStateMoveInRoad.prototype._BackToCenter = function() {
                if (this.owner.degree > 0) {
                    this.owner.degree -= GameConst_1.default.backDegreeSpeed * this.deltaTime;
                    if (this.owner.degree < 0) {
                        this.owner.degree = 0;
                    }
                } else if (this.owner.degree < 0) {
                    this.owner.degree += GameConst_1.default.backDegreeSpeed * this.deltaTime;
                    if (this.owner.degree > 0) {
                        this.owner.degree = 0;
                    }
                }
            };
            PlayerStateMoveInRoad.prototype._UpdatePos = function() {
                this.owner.moveSpeed = this.owner.GenSpeed(this.deltaTime);
                var moveDt = this.owner.moveSpeed * this.deltaTime;
                this.owner.moveDistance += moveDt;
                this.owner.UpdateViewPos();
            };
            PlayerStateMoveInRoad.prototype._NormalLogic = function() {
                var oldRotation = this.owner.transform.rotation.clone();
                var oldPosition = this.owner.transform.position.clone();
                if (!this.owner.isPressed || GlobalUnit_1.default.roadManager.CheckIsBroken(this.owner.moveDistance)) {
                    this._BackToCenter();
                }
                if (this.owner.degree < -GameConst_1.default.maxRoadDegree - GameConst_1.default.minFlyDegree || this.owner.degree > GameConst_1.default.maxRoadDegree + GameConst_1.default.minFlyDegree) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.FlyUp;
                }
                this.owner.degree = MathEx_1.default.Clamp(this.owner.degree, -GameConst_1.default.maxRoadDegree, GameConst_1.default.maxRoadDegree);
                this.owner.degreeSpeed = this.owner.degree - this.owner.lastDegree;
                this.owner.lastDegree = this.owner.degree;
                this._UpdatePos();
                this._CheckHit(oldPosition, oldRotation);
                if (this.owner.moveDistance >= GlobalUnit_1.default.roadManager.totalDistance - GameConst_1.default.jumpEndDistance) {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.Jump;
                }
                this._GenSpeedUp();
                if (this._speedUpEffect.active != this.owner.isSpeedUp) {
                    this._speedUpEffect.active = this.owner.isSpeedUp;
                }
                if (this.owner.isSuperSpeedUp && !this.owner.isSpeedUp) {
                    this.owner.isSuperSpeedUp = false;
                }
                if (this._speedUpEffect.active && this._speedUpEffect.transform != null) {
                    this._speedUpEffect.transform.position = this.owner.transform.position;
                    this._speedUpEffect.transform.rotation = this.owner.transform.rotation;
                }
                this._UpdateAnim();
                if (GlobalUnit_1.default.roadManager.CheckIsBroken(this.owner.moveDistance)) {
                    this.owner.currentAnim = Resdefine_1.default.anim_jump_roll;
                }
            };
            PlayerStateMoveInRoad.prototype._CheckHit = function(oldPosition, oldRotation) {
                var hitInfo = new Laya.HitResult();
                var isHit = GlobalUnit_1.default.s3d.physicsSimulation.shapeCast(this.owner.collider.colliderShape, oldPosition, this.owner.transform.position, hitInfo, oldRotation, this.owner.transform.rotation, CollisionLayer_1.default.Ray, CollisionLayer_1.default.Item);
                if (isHit) {
                    switch (hitInfo.collider.collisionGroup) {
                      case CollisionLayer_1.default.Item:
                        var itemCmp = hitInfo.collider.owner.parent.getComponent(ItemCmp_1.default);
                        if (itemCmp == null) {
                            console.error(hitInfo.collider.owner.name + "ç¢°æ’žå±‚çº§ä¸ºItem,ä½†æ˜¯æ²¡æœ‰Itemç»„ä»¶");
                            return;
                        }
                        itemCmp.BeHit(this.owner);
                        break;

                      default:
                        console.error("æ— æ•ˆlayer", hitInfo);
                        break;
                    }
                }
            };
            PlayerStateMoveInRoad.prototype._UpdateAnim = function() {
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    GlobalUnit_1.default.followCamera.speedEffect.active = this.owner.isSpeedUp && this.owner.isSuperSpeedUp;
                }
                if (this.owner.isSpeedUp) {
                    this.owner.currentAnim = Resdefine_1.default.anim_speedup;
                    return;
                }
                var absDegree = Math.abs(this.owner.degree);
                if (absDegree < 5) {
                    this.owner.currentAnim = Resdefine_1.default.anim_move;
                } else if (this.owner.degree > 0) {
                    this.owner.currentAnim = Resdefine_1.default.anim_move_left;
                } else {
                    this.owner.currentAnim = Resdefine_1.default.anim_move_right;
                }
            };
            PlayerStateMoveInRoad.prototype._GenSpeedUp = function() {
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    this._genSpeedUpTime -= this.deltaTime;
                    if (this._genSpeedUpTime < 0) {
                        this._genSpeedUpTime = GameConst_1.default.genSpeedUpTime;
                        var randomValue = MathEx_1.default.Random(0, 100);
                        var config;
                        for (var key in SpeedupConfig_1.SpeedupConfig.data) {
                            var configItem = SpeedupConfig_1.SpeedupConfig.data[key];
                            if (configItem == null) continue;
                            if (configItem.rank_count <= this.owner.rankCount) {
                                config = configItem;
                            }
                        }
                        var genRate = 100 - config.gen_rate;
                        if (randomValue > genRate) {
                            GlobalUnit_1.default.itemManager.GenSpeedUp(this.owner.moveDistance + config.gen_distance, this.owner.lastSeachIndex);
                        }
                    }
                }
            };
            PlayerStateMoveInRoad.prototype._DoExit = function() {
                this._speedUpEffect.destroy(true);
                this.owner.isSuperSpeedUp = false;
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    GlobalUnit_1.default.followCamera.speedEffect.active = false;
                }
            };
            return PlayerStateMoveInRoad;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateMoveInRoad;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../cmp/ItemCmp": 49,
        "../common/CollisionLayer": 51,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/SpeedupConfig": 72,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    107: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var Resdefine_1 = require("../common/Resdefine");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var QuaternionEx_1 = require("../LTGame/LTUtils/QuaternionEx");
        var PlayerStateWaterDown = function(_super) {
            __extends(PlayerStateWaterDown, _super);
            function PlayerStateWaterDown(owner) {
                var _this = _super.call(this, owner, EPlayerState_1.EPlayerState.WaterDown) || this;
                _this._upSpeed = 15;
                return _this;
            }
            PlayerStateWaterDown.prototype._DoEnter = function(exitState) {
                this.owner.collider.enabled = false;
                this.owner.moveDistance = GlobalUnit_1.default.roadManager.totalDistance;
                if (this.owner == GlobalUnit_1.default.mainPlayer) {
                    GlobalUnit_1.default.gameManager.StopGame(true);
                }
                if (this.owner == GlobalUnit_1.default.mainPlayer && exitState.id == EPlayerState_1.EPlayerState.Fly) {
                    GlobalUnit_1.default.followCamera.SwitchToJump();
                }
                this._currentSpeed = exitState._currentSpeed;
                this._totalTime = -this._currentSpeed.y / this._upSpeed;
                this._startXaw = this.owner.transform.localRotationEulerX;
                this._scalePassTime = 0;
                this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectDownWater);
                GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectJumpWater, this.owner.transform.position, QuaternionEx_1.default.FromEulerAngle(0, 0, 0), 1);
                this.owner.FinishRace(true);
                if (GlobalUnit_1.default.mainPlayer == this.owner) {
                    GlobalUnit_1.default.audioManager.PlaySound(Resdefine_1.default.audio_drop_water);
                }
            };
            PlayerStateWaterDown.prototype._DoRunning = function() {
                var dt = this.deltaTime * .8;
                if (this._currentSpeed.y < 0) {
                    this._currentSpeed.y += dt * this._upSpeed;
                    this._currentSpeed.x = this._currentSpeed.x * .8;
                    this._currentSpeed.z = this._currentSpeed.z * .8;
                    var moveDelta = Vector3Ex_1.default.Scale(this._currentSpeed, dt);
                    this.owner.transform.position = Vector3Ex_1.default.Add(this.owner.transform.position, moveDelta);
                    this._scalePassTime += dt;
                    var sqrtProgress = MathEx_1.default.Clamp01(this._scalePassTime / this._totalTime);
                    this.owner.transform.localRotationEulerX = MathEx_1.default.Lerp(this._startXaw, 0, sqrtProgress * sqrtProgress);
                    this._effectObj.transform.position = this.owner.transform.position;
                } else {
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.WaterUp;
                }
            };
            PlayerStateWaterDown.prototype._DoExit = function() {
                GlobalUnit_1.default.effectManager.ReturnEffect(Resdefine_1.default.effectDownWater, this._effectObj);
            };
            return PlayerStateWaterDown;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateWaterDown;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/QuaternionEx": 38,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    108: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var PlayerStateWaterIdle = function(_super) {
            __extends(PlayerStateWaterIdle, _super);
            function PlayerStateWaterIdle(owner) {
                return _super.call(this, owner, EPlayerState_1.EPlayerState.WaterIdle) || this;
            }
            PlayerStateWaterIdle.prototype._DoEnter = function() {
                this.owner.currentAnim = Resdefine_1.default.anim_swimidle;
                this.owner.StopMove();
                this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectShuibo);
                this._effectObj.transform.position = this.owner.transform.position;
            };
            PlayerStateWaterIdle.prototype._DoExit = function() {
                GlobalUnit_1.default.effectManager.ReturnEffect(Resdefine_1.default.effectShuibo, this._effectObj);
            };
            return PlayerStateWaterIdle;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateWaterIdle;
    }, {
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    109: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var BasePlayerState_1 = require("./BasePlayerState");
        var EPlayerState_1 = require("./EPlayerState");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var Resdefine_1 = require("../common/Resdefine");
        var PlayerStateWaterUp = function(_super) {
            __extends(PlayerStateWaterUp, _super);
            function PlayerStateWaterUp(owner) {
                var _this = _super.call(this, owner, EPlayerState_1.EPlayerState.WaterUp) || this;
                _this._upSpeed = 5;
                _this._maxSpeed = 4;
                _this._startXaw = 0;
                _this._targetXaw = -45;
                _this._stayTime = .5;
                return _this;
            }
            PlayerStateWaterUp.prototype._DoEnter = function(exitState) {
                this.owner.currentAnim = Resdefine_1.default.anim_swimup;
                this._currentSpeed = exitState._currentSpeed;
                this._currentSpeed.x = 0;
                this._currentSpeed.z = 0;
                this._startXaw = this.owner.transform.localRotationEulerX;
                this._scalePassTime = 0;
                this._totalTime = (GlobalUnit_1.default.roadManager.groundHeight - this.owner.transform.position.y) / this._maxSpeed;
                this._effectObj = GlobalUnit_1.default.effectManager.GenEffect(Resdefine_1.default.effectUpWater);
                this._remainTime = this._stayTime;
            };
            PlayerStateWaterUp.prototype._DoRunning = function() {
                var dt = this.deltaTime * .8;
                if (this._currentSpeed.y < this._maxSpeed) {
                    this._currentSpeed.y += dt * this._upSpeed;
                }
                var moveDelta = Vector3Ex_1.default.Scale(this._currentSpeed, dt);
                this.owner.transform.position = Vector3Ex_1.default.Add(this.owner.transform.position, moveDelta);
                this._scalePassTime += dt;
                var sqrtProgress = 1 - MathEx_1.default.Clamp01(this._scalePassTime / this._totalTime);
                this.owner.transform.localRotationEulerX = MathEx_1.default.Lerp(this._startXaw, this._targetXaw, 1 - sqrtProgress * sqrtProgress * sqrtProgress);
                var checkHeight = GlobalUnit_1.default.roadManager.groundHeight;
                if (this.owner.transform.position.y >= checkHeight) {
                    var oldPos = this.owner.transform.position;
                    this.owner.transform.position = new Laya.Vector3(oldPos.x, checkHeight, oldPos.z);
                    this.isFinished = true;
                    this.nextState = EPlayerState_1.EPlayerState.WaterIdle;
                }
                if (this._remainTime < 0) {
                    this._effectObj.transform.position = this.owner.transform.position;
                } else {
                    this._remainTime -= this.deltaTime;
                }
            };
            PlayerStateWaterUp.prototype._DoExit = function() {
                GlobalUnit_1.default.effectManager.ReturnEffect(Resdefine_1.default.effectUpWater, this._effectObj);
            };
            return PlayerStateWaterUp;
        }(BasePlayerState_1.default);
        exports.default = PlayerStateWaterUp;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./BasePlayerState": 94,
        "./EPlayerState": 95
    } ],
    110: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var LTUIUtils_1 = require("../../LTGame/UIExt/LTUIUtils");
        var MatchIconCmp = function(_super) {
            __extends(MatchIconCmp, _super);
            function MatchIconCmp() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._isChecked = false;
                return _this;
            }
            MatchIconCmp.prototype._SafeCheck = function() {
                if (!this._isChecked) {
                    this._isChecked = true;
                    this.img_bg = this.FindCMP("", Laya.Image);
                    this.img_icon = this.FindCMP("head_icon", Laya.Image);
                    this.img_load = this.FindCMP("load_icon", Laya.Image);
                }
            };
            MatchIconCmp.prototype.GenNew = function() {
                this._SafeCheck();
                var baseImg = LTUIUtils_1.default.CloneImage(this.img_bg);
                var iconImg = LTUIUtils_1.default.CloneImage(this.img_icon);
                var loadImg = LTUIUtils_1.default.CloneImage(this.img_load);
                iconImg.mask = this.img_icon.mask;
                baseImg.addChild(iconImg);
                baseImg.addChild(loadImg);
                var cmp = baseImg.addComponent(MatchIconCmp);
                cmp.img_bg = baseImg;
                cmp.img_icon = iconImg;
                cmp.img_load = loadImg;
                return cmp;
            };
            MatchIconCmp.prototype.SetImg = function(skin) {
                this.img_icon.skin = skin;
                this.img_load.visible = false;
            };
            MatchIconCmp.prototype.ClearImg = function() {
                this.img_icon.skin = "";
                this.img_load.visible = true;
            };
            MatchIconCmp.prototype.SetPos = function(x, y) {
                this.img_bg.x = x;
                this.img_bg.y = y;
            };
            MatchIconCmp.prototype._OnUpdate = function() {
                if (!this.img_load.visible) return;
                this.img_load.rotation += 1;
            };
            return MatchIconCmp;
        }(LTUI_1.default);
        exports.default = MatchIconCmp;
    }, {
        "../../LTGame/UIExt/LTUI": 41,
        "../../LTGame/UIExt/LTUIUtils": 42
    } ],
    111: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var MatchIconCmp_1 = require("./MatchIconCmp");
        var UIMatchCmp = function(_super) {
            __extends(UIMatchCmp, _super);
            function UIMatchCmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIMatchCmp.prototype._SafeCheck = function() {
                if (this.sampleIcon == null) {
                    this.sampleIcon = this.FindCMP("head_bg", MatchIconCmp_1.default);
                    this.sampleIcon.visible = false;
                }
            };
            UIMatchCmp.prototype.InitBaseIcons = function(xCount, yCount, xOffset, yOffset, xUnit, yUnit) {
                this._SafeCheck();
                this.icons = [];
                for (var i = 0; i < xCount; ++i) {
                    for (var j = 0; j < yCount; ++j) {
                        var newIconCmp = this.sampleIcon.GenNew();
                        this.owner.addChild(newIconCmp.owner);
                        newIconCmp.SetPos(i * xUnit + xOffset, j * yUnit + yOffset);
                        this.icons.push(newIconCmp);
                    }
                }
            };
            UIMatchCmp.prototype.Reset = function() {
                for (var _i = 0, _a = this.icons; _i < _a.length; _i++) {
                    var cmp = _a[_i];
                    cmp.ClearImg();
                }
            };
            return UIMatchCmp;
        }(LTUI_1.default);
        exports.default = UIMatchCmp;
    }, {
        "../../LTGame/UIExt/LTUI": 41,
        "./MatchIconCmp": 110
    } ],
    112: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var LTUIUtils_1 = require("../../LTGame/UIExt/LTUIUtils");
        var Vector3Ex_1 = require("../../LTGame/LTUtils/Vector3Ex");
        var GlobalUnit_1 = require("../../common/GlobalUnit");
        var QuaternionEx_1 = require("../../LTGame/LTUtils/QuaternionEx");
        var MathEx_1 = require("../../LTGame/LTUtils/MathEx");
        var UINameCmp = function(_super) {
            __extends(UINameCmp, _super);
            function UINameCmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UINameCmp.prototype.GenNew = function(playerCmp) {
                var textName = LTUIUtils_1.default.CloneLabel(this.text_name);
                var textRank = LTUIUtils_1.default.CloneLabel(this.text_rank);
                var imgIcon = LTUIUtils_1.default.CloneImage(this.img_icon);
                imgIcon.mask = this.img_icon.mask;
                textName.text = playerCmp.name;
                textName.addChild(textRank);
                textName.addChild(imgIcon);
                var cmp = textName.addComponent(UINameCmp);
                cmp.text_name = textName;
                cmp.text_rank = textRank;
                cmp.img_icon = imgIcon;
                cmp._playerCmp = playerCmp;
                this._delTime = 0;
                cmp.visible = false;
                return cmp;
            };
            UINameCmp.prototype.SetColorHex = function(hexColor, borderColor) {
                this.text_name.color = hexColor;
                this.text_rank.color = hexColor;
                this.text_name.strokeColor = borderColor;
                this.text_rank.strokeColor = borderColor;
            };
            UINameCmp.prototype.UpdatePos = function(camera, autoHide) {
                var shouldShow = true;
                var isFinished = this._playerCmp.isFinished;
                if (autoHide && !isFinished) {
                    var currentRank = this._playerCmp.rankCount;
                    var playerRank = GlobalUnit_1.default.mainPlayer.rankCount;
                    shouldShow = Math.abs(currentRank - playerRank) < 3;
                }
                var sourcePos;
                var outUIPos = Vector3Ex_1.default.zero;
                sourcePos = this._playerCmp.transform.position.clone();
                sourcePos.y += .4;
                if (isFinished) {
                    sourcePos = Vector3Ex_1.default.Add(sourcePos, QuaternionEx_1.default.Multiply(this._playerCmp.transform.rotation, new Laya.Vector3(0, 0, .2)));
                }
                var cameraForward = QuaternionEx_1.default.Multiply(camera.transform.rotation, new Laya.Vector3(1, 0, 0));
                var cameraUp = QuaternionEx_1.default.Multiply(camera.transform.rotation, Vector3Ex_1.default.up);
                var toSource = Vector3Ex_1.default.Subtract(sourcePos, camera.transform.position);
                var signAngle = Vector3Ex_1.default.SignedAngle(cameraForward, toSource, cameraUp);
                var isViewBefore = signAngle >= 0;
                if (!isViewBefore) {
                    if (this.visible) {
                        this.visible = false;
                    }
                } else if (shouldShow) {
                    if (!this.visible) {
                        this.visible = true;
                    }
                    this._delTime = 500;
                } else {
                    this._delTime -= Laya.timer.delta;
                    if (this._delTime < 0 && this.visible) {
                        this.visible = false;
                    }
                }
                if (this.visible) {
                    camera.worldToViewportPoint(sourcePos, outUIPos);
                    var toSource = Vector3Ex_1.default.Subtract(this._playerCmp.transform.position, GlobalUnit_1.default.mainPlayer.transform.position);
                    var distance = MathEx_1.default.Clamp(Vector3Ex_1.default.Magnitude(toSource), 0, 100);
                    var scale = MathEx_1.default.Lerp(distance / 100, .5, 2);
                    this.text_name.scale(scale, scale);
                    this.text_name.x = outUIPos.x;
                    this.text_name.y = outUIPos.y;
                }
            };
            UINameCmp.prototype.UpdateRank = function() {
                this.text_rank.text = GlobalUnit_1.default.dataManager.GetRankStr(this._playerCmp.rankCount);
            };
            return UINameCmp;
        }(LTUI_1.default);
        exports.default = UINameCmp;
    }, {
        "../../LTGame/LTUtils/MathEx": 37,
        "../../LTGame/LTUtils/QuaternionEx": 38,
        "../../LTGame/LTUtils/Vector3Ex": 40,
        "../../LTGame/UIExt/LTUI": 41,
        "../../LTGame/UIExt/LTUIUtils": 42,
        "../../common/GlobalUnit": 56
    } ],
    113: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../../common/GlobalUnit");
        var UINoticeCmp = function(_super) {
            __extends(UINoticeCmp, _super);
            function UINoticeCmp() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._switchTime = 3e3;
                return _this;
            }
            UINoticeCmp.prototype.onAwake = function() {
                this.text_notice = this.owner;
                this._remainTime = this._switchTime;
                if (GlobalUnit_1.default.noticeManager != null) {
                    this.text_notice.text = GlobalUnit_1.default.noticeManager.GetNotice();
                }
            };
            UINoticeCmp.prototype.onUpdate = function() {
                if (this._remainTime -= Laya.timer.delta) {
                    if (this._remainTime < 0) {
                        this._remainTime = this._switchTime;
                        if (GlobalUnit_1.default.noticeManager != null) {
                            this.text_notice.text = GlobalUnit_1.default.noticeManager.GetNotice();
                        }
                    }
                }
            };
            return UINoticeCmp;
        }(LTUI_1.default);
        exports.default = UINoticeCmp;
    }, {
        "../../LTGame/UIExt/LTUI": 41,
        "../../common/GlobalUnit": 56
    } ],
    114: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var LTUIUtils_1 = require("../../LTGame/UIExt/LTUIUtils");
        var GlobalUnit_1 = require("../../common/GlobalUnit");
        var UIRankCmp = function(_super) {
            __extends(UIRankCmp, _super);
            function UIRankCmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIRankCmp.prototype.GenNew = function() {
                var img_bg = LTUIUtils_1.default.CloneImage(this.img_bg);
                var cmp = img_bg.addComponent(UIRankCmp);
                cmp.img_bg = img_bg;
                cmp.img_bg_single_self = LTUIUtils_1.default.CloneImage(this.img_bg_single_self);
                cmp.img_bg.addChild(cmp.img_bg_single_self);
                cmp.img_bg_team_self = LTUIUtils_1.default.CloneImage(this.img_bg_team_self);
                cmp.img_bg.addChild(cmp.img_bg_team_self);
                cmp.img_bg_team_enemy = LTUIUtils_1.default.CloneImage(this.img_bg_team_enemy);
                cmp.img_bg.addChild(cmp.img_bg_team_enemy);
                cmp.img_bg_team_mate = LTUIUtils_1.default.CloneImage(this.img_bg_team_mate);
                cmp.img_bg.addChild(cmp.img_bg_team_mate);
                cmp.icon_rank = LTUIUtils_1.default.CloneImage(this.icon_rank);
                cmp.img_bg.addChild(cmp.icon_rank);
                cmp.text_rank = LTUIUtils_1.default.CloneFontClip(this.text_rank);
                cmp.img_bg.addChild(cmp.text_rank);
                cmp.usr_icon = LTUIUtils_1.default.CloneImage(this.usr_icon);
                cmp.img_bg.addChild(cmp.usr_icon);
                cmp.text_name = LTUIUtils_1.default.CloneLabel(this.text_name);
                cmp.img_bg.addChild(cmp.text_name);
                cmp.text_time = LTUIUtils_1.default.CloneLabel(this.text_time);
                cmp.img_bg.addChild(cmp.text_time);
                cmp.img_score = LTUIUtils_1.default.CloneImage(this.img_score);
                cmp.img_bg.addChild(cmp.img_score);
                cmp.img_kill = LTUIUtils_1.default.CloneImage(this.img_kill);
                cmp.img_bg.addChild(cmp.img_kill);
                cmp.img_time = LTUIUtils_1.default.CloneImage(this.img_time);
                cmp.img_bg.addChild(cmp.img_time);
                cmp.text_kill = LTUIUtils_1.default.CloneLabel(this.text_kill);
                cmp.img_bg.addChild(cmp.text_kill);
                return cmp;
            };
            UIRankCmp.prototype.UpdateInfo = function(playerCmp) {
                if (GlobalUnit_1.default.gameManager.isSigleModel) {
                    this.img_bg_single_self.visible = playerCmp == GlobalUnit_1.default.mainPlayer;
                    this.img_bg_team_enemy.visible = false;
                    this.img_bg_team_self.visible = false;
                    this.img_bg_team_mate.visible = false;
                } else {
                    this.img_bg_single_self.visible = false;
                    this.img_bg_team_enemy.visible = playerCmp != GlobalUnit_1.default.mainPlayer && playerCmp.teamId != GlobalUnit_1.default.mainPlayer.teamId;
                    this.img_bg_team_self.visible = playerCmp == GlobalUnit_1.default.mainPlayer;
                    this.img_bg_team_mate.visible = playerCmp != GlobalUnit_1.default.mainPlayer && playerCmp.teamId == GlobalUnit_1.default.mainPlayer.teamId;
                }
                if (playerCmp.rankCount <= 3) {
                    switch (playerCmp.rankCount) {
                      case 1:
                        this.icon_rank.skin = "ui_main/btn_jinpai.png";
                        break;

                      case 2:
                        this.icon_rank.skin = "ui_main/btn_yingpai.png";
                        break;

                      case 3:
                        this.icon_rank.skin = "ui_main/btn_tongpaii.png";
                        break;
                    }
                    this.icon_rank.visible = true;
                    this.text_rank.visible = false;
                    
                } else {
                    this.icon_rank.visible = false;
                    this.text_rank.visible = true;
                    this.text_rank.value = playerCmp.rankCount.toFixed(0);
                    // if(playerCmp.rankCount === 1){
                    //     this.img_rank1.skin ="ui_main/st.png"
                    // }else if(playerCmp.rankCount === 2){
                    //     this.img_rank1.skin ="ui_main/ed.png"
                    // }
                    // else if(playerCmp.rankCount === 3){
                    //     this.img_rank1.skin ="ui_main/rd.png"
                    // }else{
                    //     this.img_rank1.skin ="ui_main/th.png"
                    // }
                   
                }
                this.usr_icon.skin = playerCmp.iconUrl;
                this.text_name.text = playerCmp.name;
                var timeStr = "unfinished";
                if (playerCmp.finishTime > 0 && playerCmp.finishTime < 1e4) {
                    timeStr = playerCmp.finishTime > 100 ? playerCmp.finishTime.toFixed(1) : playerCmp.finishTime.toFixed(2);
                    timeStr += "s";
                }
                this.text_time.text = timeStr;
                this.img_kill.visible = GlobalUnit_1.default.gameManager.isSigleModel;
                this.img_score.visible = !GlobalUnit_1.default.gameManager.isSigleModel;
                this.text_kill.text = GlobalUnit_1.default.gameManager.isSigleModel ? playerCmp.killCount.toFixed(0) : playerCmp.teamScore.toFixed(0);
                if (playerCmp == GlobalUnit_1.default.mainPlayer) {
                    this.text_name.color = "#245aca";
                } else {
                    if (GlobalUnit_1.default.gameManager.isSigleModel) {
                        this.text_name.color = "#149ff4";
                    } else {
                        this.text_name.color = playerCmp.teamId == GlobalUnit_1.default.mainPlayer.teamId ? "#149ff4" : "#ff3222";
                    }
                }
            };
            return UIRankCmp;
        }(LTUI_1.default);
        exports.default = UIRankCmp;
    }, {
        "../../LTGame/UIExt/LTUI": 41,
        "../../LTGame/UIExt/LTUIUtils": 42,
        "../../common/GlobalUnit": 56
    } ],
    115: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var UIRankIconCmp_1 = require("./UIRankIconCmp");
        var GlobalUnit_1 = require("../../common/GlobalUnit");
        var MathEx_1 = require("../../LTGame/LTUtils/MathEx");
        var RankConfig_1 = require("../../config/RankConfig");
        var UIRankEndCmp = function(_super) {
            __extends(UIRankEndCmp, _super);
            function UIRankEndCmp() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._progressTime = .5;
                return _this;
            }
            UIRankEndCmp.prototype.onAwake = function() {
                this.img_icon = this.FindCMP("img_rank", UIRankIconCmp_1.default);
                this.progress_bg = this.FindCMP("", Laya.Image);
                this.progress_front = this.FindCMP("progress_front", Laya.Image);
                this.text_score = this.FindCMP("img_score/text_score", Laya.Label);
                this.img_score = this.FindCMP("img_score", Laya.Image);
                this.text_progress = this.FindCMP("text_progress", Laya.Label);
                this.unlock_icon = this.FindCMP("reward_bg/img_icon", Laya.Image);
                this.unlock_notice = this.FindCMP("reward_bg/notice_bg/text_notice", Laya.Label);
                this._needProgress = false;
                this._progressBgWidth = this.progress_bg.width;
            };
            UIRankEndCmp.prototype.UpdateInfo = function(changeScore) {
                var rankInfo = GlobalUnit_1.default.dataManager.currentRankInfo;
                var nextRankInfo = RankConfig_1.RankConfig.data[rankInfo.id + 1];
                this.unlock_icon.skin = rankInfo.notice_icon;
                this.unlock_notice.text = rankInfo.notice_str;
                var cupCount = GlobalUnit_1.default.dataManager.cupCount;
                var rankInfo = GlobalUnit_1.default.dataManager.GetRankInfo(cupCount);
                this.img_icon.UpdateImgs(rankInfo);
                this._targetProgressNum = rankInfo.cup_count + changeScore;
                this._currentProgressNum = cupCount;
                if (nextRankInfo == null) {
                    this._maxProgressNum = this._targetProgressNum;
                } else {
                    this._maxProgressNum = nextRankInfo.cup_count;
                }
                this._UpdateProgress(this._currentProgressNum);
                if (changeScore == 0) {
                    this.img_score.visible = false;
                    this._needProgress = false;
                } else {
                    this.text_score.text = "Score" + (changeScore > 0 ? "+" + changeScore.toFixed(0) : changeScore.toFixed(0));
                    this.img_score.visible = true;
                    this._targetProgressNum = cupCount + changeScore;
                    this._needProgress = true;
                    this._currentTime = 0;
                }
            };
            UIRankEndCmp.prototype._OnUpdate = function() {
                if (this._needProgress) {
                    var dt = Laya.timer.delta / 1e3;
                    this._currentTime += dt;
                    if (this._currentTime > this._progressTime) {
                        this._currentTime = this._progressTime;
                        this._needProgress = false;
                    }
                    var newProgressNum = MathEx_1.default.Lerp(this._currentProgressNum, this._targetProgressNum, this._currentTime / this._progressTime);
                    this._UpdateProgress(newProgressNum);
                }
            };
            UIRankEndCmp.prototype._UpdateProgress = function(value) {
                var leftValue = this._progressBgWidth - 2;
                var rightValue = 2;
                var progress = MathEx_1.default.Clamp01(value / this._maxProgressNum);
                this.progress_front.right = MathEx_1.default.Lerp(leftValue, rightValue, progress);
                this.text_progress.text = value.toFixed(0) + "/" + this._maxProgressNum;
            };
            return UIRankEndCmp;
        }(LTUI_1.default);
        exports.default = UIRankEndCmp;
    }, {
        "../../LTGame/LTUtils/MathEx": 37,
        "../../LTGame/UIExt/LTUI": 41,
        "../../common/GlobalUnit": 56,
        "../../config/RankConfig": 68,
        "./UIRankIconCmp": 116
    } ],
    116: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var UIRankIconCmp = function(_super) {
            __extends(UIRankIconCmp, _super);
            function UIRankIconCmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIRankIconCmp.prototype._CheckInit = function() {
                if (this.img_rank != null) return;
                this.img_rank = this.FindCMP("", Laya.Image);
                this.img_rank_count = this.FindCMP("img_rank_count", Laya.Image);
            };
            UIRankIconCmp.prototype.UpdateImgs = function(rankInfo) {
                this._CheckInit();
                this.img_rank.skin = "ui_rank/" + rankInfo.rank_icon;
                this.img_rank_count.skin = "ui_rank/" + rankInfo.rank_count_icon;
            };
            return UIRankIconCmp;
        }(LTUI_1.default);
        exports.default = UIRankIconCmp;
    }, {
        "../../LTGame/UIExt/LTUI": 41
    } ],
    117: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var UIRankIconCmp_1 = require("./UIRankIconCmp");
        var GlobalUnit_1 = require("../../common/GlobalUnit");
        var MathEx_1 = require("../../LTGame/LTUtils/MathEx");
        var RankConfig_1 = require("../../config/RankConfig");
        var UIRankProgressCmp = function(_super) {
            __extends(UIRankProgressCmp, _super);
            function UIRankProgressCmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIRankProgressCmp.prototype._CheckInit = function() {
                if (this.img_icon != null) return;
                this.img_icon = this.FindCMP("img_rank", UIRankIconCmp_1.default);
                this.progress_bg = this.FindCMP("", Laya.Image);
                this.text_title = this.FindCMP("text_rank", Laya.Label);
                this.progress_front = this.FindCMP("progress_front", Laya.Image);
                this.text_progress = this.FindCMP("text_progress", Laya.Label);
                this._progressBgWidth = this.progress_bg.width;
            };
            UIRankProgressCmp.prototype.UpdateInfo = function() {
                this._CheckInit();
                var rankInfo = GlobalUnit_1.default.dataManager.GetRankInfo(GlobalUnit_1.default.dataManager.cupCount);
                var nextRankInfo = RankConfig_1.RankConfig.data[rankInfo.id + 1];
                this.text_title.text = "Your rank:" + rankInfo.rank_name + rankInfo.rank_count_name;
                if (nextRankInfo == null) {
                    this.text_progress.text = "Max";
                } else {
                    this.text_progress.text = GlobalUnit_1.default.dataManager.cupCount + "/" + nextRankInfo.cup_count;
                }
                this.img_icon.UpdateImgs(rankInfo);
                var progress = GlobalUnit_1.default.dataManager.GetRankProgress(GlobalUnit_1.default.dataManager.cupCount);
                this._UpdateProgress(progress);
            };
            UIRankProgressCmp.prototype._UpdateProgress = function(value) {
                var leftValue = this._progressBgWidth - 2;
                var rightValue = 2;
                this.progress_front.right = MathEx_1.default.Lerp(leftValue, rightValue, value);
            };
            return UIRankProgressCmp;
        }(LTUI_1.default);
        exports.default = UIRankProgressCmp;
    }, {
        "../../LTGame/LTUtils/MathEx": 37,
        "../../LTGame/UIExt/LTUI": 41,
        "../../common/GlobalUnit": 56,
        "../../config/RankConfig": 68,
        "./UIRankIconCmp": 116
    } ],
    118: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../../common/GlobalUnit");
        var UIRebornCardTipCmp = function(_super) {
            __extends(UIRebornCardTipCmp, _super);
            function UIRebornCardTipCmp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIRebornCardTipCmp.prototype.Init = function() {
                this.text_num = this.FindCMP("text_num", Laya.Label);
                this.img_add = this.FindCMP("img_add", Laya.Image);
                this.img_add.on(Laya.Event.CLICK, this, this._OnClickAdd);
            };
            UIRebornCardTipCmp.prototype._OnClickAdd = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_buy_reborn.prefab");
            };
            return UIRebornCardTipCmp;
        }(LTUI_1.default);
        exports.default = UIRebornCardTipCmp;
    }, {
        "../../LTGame/UIExt/LTUI": 41,
        "../../common/GlobalUnit": 56
    } ],
    119: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var UIRoot = function() {
            function UIRoot() {}
            return UIRoot;
        }();
        exports.default = UIRoot;
    }, {} ],
    120: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var UI_Banner = function(_super) {
            __extends(UI_Banner, _super);
            function UI_Banner() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._identifyId = 19;
                _this._idStr = "banner";
                return _this;
            }
            UI_Banner.prototype.onAwake = function() {
                UI_Banner._instance = this;
                this.img_banner = this.FindCMP("img_banner", Laya.Image);
                if (this.img_banner == null) {
                    console.error("æœªæ‰¾åˆ°bannerå±•ç¤ºå›¾ç‰‡æŽ§ä»¶,éœ€è¦åå­—ä¸ºimg_banner");
                    return;
                }
                this.img_banner.visible = false;
                this.img_banner.on(Laya.Event.CLICK, this, this._OnClickBanner);
            };
            UI_Banner.prototype._ShowAD = function() {
                var getAds = MatterManager_1.default.inst.applyMatter(this._idStr, this._identifyId);
                if (getAds == null) return;
                this._showInfo = getAds[0];
                if (this._showInfo == null) return;
                this._RefreshAd();
                this.img_banner.visible = true;
                MatterManager_1.default.inst.showMatter(this._idStr, this._identifyId, [ this._showInfo ]);
            };
            UI_Banner.prototype._RefreshAd = function() {
                this.img_banner.skin = this._showInfo.icon;
            };
            UI_Banner.prototype._HideAD = function() {
                this.img_banner.visible = false;
                MatterManager_1.default.inst.hideMatter(this._idStr, this._identifyId);
            };
            UI_Banner.ShowAD = function() {
                if (this._instance == null) return;
                this._instance._ShowAD();
            };
            UI_Banner.HideAD = function() {
                if (this._instance == null) return;
                this._instance._HideAD();
            };
            UI_Banner.prototype._OnClickBanner = function() {
                console.log(this._showInfo);
                MatterManager_1.default.inst.onClick(this._showInfo);
                MatterManager_1.default.inst.hideMatter(this._idStr, this._identifyId);
                this._ShowAD();
            };
            return UI_Banner;
        }(LTUI_1.default);
        exports.default = UI_Banner;
    }, {
        "../../module/manager/MatterManager": 7,
        "../LTGame/UIExt/LTUI": 41
    } ],
    121: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var UI_BottomAds = function(_super) {
            __extends(UI_BottomAds, _super);
            function UI_BottomAds() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.identifyId = 5;
                _this._identifyStr = "bottom";
                _this._scrollTime = 3e3;
                return _this;
            }
            UI_BottomAds.prototype.onAwake = function() {
                UI_BottomAds._instance = this;
                this.showList.hScrollBarSkin = "";
                this.showList.selectEnable = true;
                this.showList.selectHandler = Laya.Handler.create(this, this._OnClick, null, false);
                this.showList.renderHandler = Laya.Handler.create(this, this._OnRender, null, false);
                this.showList.mouseHandler  = Laya.Handler.create(this, this._OnMove, null, false);
                this.visible = false;
                this.owner.getChildByName("img_bg").bottom =  0;
            };
            UI_BottomAds.prototype.onUpdate = function() {
                if (!this.visible) return;
                this._idleTime -= Laya.timer.delta;
                if (this._idleTime < 0) {
                    this._ScrollNext();
                }
            };
            UI_BottomAds.prototype._ScrollNext = function() {
                this._idleTime = this._scrollTime;
                this._currentIndex++;
                this.showList.tweenTo(this._currentIndex, 300, Laya.Handler.create(this, this._OnScrollEnd));
            };
            UI_BottomAds.prototype._OnScrollEnd = function() {
                while (this._currentIndex > 0) {
                    this._currentIndex--;
                    var newItem = this._showAds.shift();
                    this._showAds.push(newItem);
                }
                this._RefreshAd();
                this.showList.scrollTo(this._currentIndex);
            };
            UI_BottomAds.prototype._ShowBottom = function() {
                this._showAds = MatterManager_1.default.inst.applyMatter(this._identifyStr, this.identifyId);
                if (this._showAds == null) return;
                if (this._showAds.length <= 0) return;
                this._idleTime = this._scrollTime;
                this._currentIndex = 0;
                this._RefreshAd();
                this.showList.scrollTo(this._currentIndex);
                this.visible = true;
            };
            UI_BottomAds.prototype._OnRender = function(item, index) {
                item.offAll(Laya.Event.MOUSE_DOWN);
                item.on(Laya.Event.MOUSE_DOWN,this,()=>{
                    platform.getInstance().navigate("BOTTOM","MORE",item.dataSource.id)
                })
            };
            UI_BottomAds.prototype._RefreshAd = function() {
                var dataSource = [];
                for (var i = 0; i < this._showAds.length; ++i) {
                    var adData = this._showAds[i];
                    var data = {
                        id:adData.id,
                        img_icon: {
                            skin: adData.thumb
                        },
                        text_name: {
                            text: adData.name
                        },
                        imgRedFriend: {
                            visible: adData.dot
                        }
                    };
                    dataSource.push(data);
                }
                this.showList.dataSource = dataSource;
                this.showList.refresh();
            };
            UI_BottomAds.ShowBottom = function() {
                if (this._instance == null) return;
                this._instance._ShowBottom();
            };
            UI_BottomAds.prototype._HideBottom = function() {
                this.visible = false;
                MatterManager_1.default.inst.hideMatter(this._identifyStr, this.identifyId);
            };
            UI_BottomAds.HideBottom = function() {
                if (this._instance == null) return;
                this._instance._HideBottom();
            };
            UI_BottomAds.prototype._OnMove = function(e, index) {
                this._currentIndex = index + 1;
                this._idleTime = this._scrollTime;
            };
            UI_BottomAds.prototype._OnClick = function(index) {
                var _this = this;
                var adData = this._showAds[index];
                if (this._showAds.length > this.showList.repeatX) {
                    this._showAds.splice(index, 1);
                    this._RefreshAd();
                }
                MatterManager_1.default.inst.onClick(adData, BHandler_1.default.create(this, function(bool) {
                    if (!bool) {
                        _this.openMoreGamePanel();
                    }
                }));
            };
            UI_BottomAds.prototype.openMoreGamePanel = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_moregame.prefab");
            };
            return UI_BottomAds;
        }(LTUI_1.default);
        exports.default = UI_BottomAds;
    }, {
        "../../module/manager/MatterManager": 7,
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56
    } ],
    122: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var UI_RebornAd_1 = require("./UI_RebornAd");
        var ADManager_1 = require("../manager/ADManager");
        var UI_Dead = function(_super) {
            __extends(UI_Dead, _super);
            function UI_Dead() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._perCount = 1e3;
                _this._upPos = 328;
                _this._downPos = 600;
                return _this;
            }
            UI_Dead.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_dead = this;
                this.btn_continue.on(Laya.Event.CLICK, this, this._OnClickContinue);
                this.btn_reborn_ad.on(Laya.Event.CLICK, this, this._OnClickRebornAd);
                this.visible = false;
            };
            UI_Dead.prototype.onVisible = function() {
                this.text_time.value = 5 + "";
                this.text_time.visible = true;
                this.text_hint.text = (GlobalUnit_1.default.mainPlayer.moveDistance / GlobalUnit_1.default.roadManager.totalDistance * 100).toFixed(0) + "%  completed";
                Laya.timer.once(this._perCount, this, this._Num4);
                this.changeBtnStatus();
                var bool = true;
                // MatterManager_1.default.inst.isReady && MatterManager_1.default.canShow;
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    this.img_title.centerY = -430;
                    this.text_hint.centerY = -109;
                    this.img_bg2.centerY = 30;
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    this.img_title.centerY = -512;
                    this.text_hint.centerY = -14;
                    this.img_bg2.centerY = 87;
                    bool ? UI_RebornAd_1.default.ShowAD() : "";
                    break;

                  default:
                    this.img_title.centerY = -430;
                    this.text_hint.centerY = 20;
                    this.img_bg2.centerY = 150;
                    UI_RebornAd_1.default.ShowAD()
                    break;
                }
                // if (GlobalUnit_1.default.EnableBannerMove()) {
                //     this._SpecialShowBanner();
                // } else {
                //     this._NormalShowBanner();
                // }
                this.owner.parent.ani_dead_init.play(0, false);
                this.text_reborn_count.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
            };
            UI_Dead.prototype._NormalShowBanner = function() {
                this.btn_continue.centerY = this._upPos;
                // ADManager_1.default.instance.ShowBanner();
            };
            UI_Dead.prototype._SpecialShowBanner = function() {
                var _this = this;
                ADManager_1.default.instance.HideBanner();
                this.btn_continue.centerY = this._downPos;
                Laya.timer.once(1700, this, function() {
                    ADManager_1.default.instance.ShowBanner();
                });
                Laya.timer.once(2e3, this, function() {
                    _this.btn_continue.centerY = _this._upPos;
                });
            };
            UI_Dead.prototype.onUnvisible = function() {
                UI_RebornAd_1.default.HideAD();
            };
            UI_Dead.prototype._Num4 = function() {
                if (!this.visible) return;
                this.text_time.value = 4 + "";
                Laya.timer.once(this._perCount, this, this._Num3);
            };
            UI_Dead.prototype._Num3 = function() {
                if (!this.visible) return;
                this.text_time.value = 3 + "";
                Laya.timer.once(this._perCount, this, this._Num2);
            };
            UI_Dead.prototype._Num2 = function() {
                if (!this.visible) return;
                this.text_time.value = 2 + "";
                Laya.timer.once(this._perCount, this, this._Num1);
            };
            UI_Dead.prototype._Num1 = function() {
                if (!this.visible) return;
                this.text_time.value = 1 + "";
                Laya.timer.once(this._perCount, this, this._Num0);
            };
            UI_Dead.prototype._Num0 = function() {
                if (!this.visible) return;
                this._DoContinue();
            };
            UI_Dead.prototype._OnClickContinue = function() {
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "ç‚¹å‡»é‡æ–°å¼€å§‹");
                this._DoContinue();
            };
            UI_Dead.prototype._DoContinue = function() {
                this.visible = false;
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_luck.prefab", true);
                } else {
                    GlobalUnit_1.default.uiRoot.ui_end.ShowEnd(true);
                }
            };
            UI_Dead.prototype._OnClickRebornAd = function() {
                if (GlobalUnit_1.default.dataManager.rebornCardCount <= 0) {
                    ADManager_1.default.instance.ShowVideoAd("å¤æ´»ç•Œé¢", Laya.Handler.create(this, this._Reborn), null);
                    return;
                }
                GlobalUnit_1.default.dataManager.rebornCardCount--;
                GlobalUnit_1.default.dataManager.Save();
                this._Reborn();
            };
            UI_Dead.prototype._Reborn = function() {
                this.visible = false;
                SDKManager_1.default.inst.sdk.hideBannder();
                GlobalUnit_1.default.gameManager.Reborn();
            };
            UI_Dead.prototype.changeBtnStatus = function() {
                if (GlobalUnit_1.default.dataManager.rebornCardCount <= 0) {
                    this.btn_reborn_ad.skin = "ui_main/bt_resurrection_video.png";
                } else {
                    this.btn_reborn_ad.skin = "ui_main/bt_resurrection_ad.png";
                }
            };
            return UI_Dead;
        }(LTUI_1.default);
        exports.default = UI_Dead;
    }, {
        "../../module/manager/MatterManager": 7,
        "../../module/manager/SDKManager": 8,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76,
        "./UI_RebornAd": 144
    } ],
    123: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var UI_DeadAd = function(_super) {
            __extends(UI_DeadAd, _super);
            function UI_DeadAd() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._identifyId = 6;
                _this._idStr = "dead";
                return _this;
            }
            UI_DeadAd.prototype.onAwake = function() {
                UI_DeadAd._instance = this;
                // this.showList.selectEnable = true;
                // this.showList.selectHandler = Laya.Handler.create(this, this._OnClick, null, false);
                this.showList.renderHandler = Laya.Handler.create(this, this._OnRender, null, false);
                this.visible = false;
            };
            UI_DeadAd.prototype._OnRender = function(item,index)
            {
                item.offAll(Laya.Event.MOUSE_DOWN);
                item.on(Laya.Event.MOUSE_DOWN,this,()=>{
                    platform.getInstance().navigate("LOOSE","MORE",item.dataSource.id);
                });
            }
            
            UI_DeadAd.prototype._ShowAD = function() {
                var getAds = MatterManager_1.default.inst.applyMatter(this._idStr, this._identifyId);
                this._showAds = [];
                for (var i = 0; i < 8 && i < getAds.length; ++i) {
                    this._showAds.push(getAds[i]);
                }
                this._RefreshAd();
                this.visible = true;
                // MatterManager_1.default.inst.showMatter(this._idStr, this._identifyId, this._showAds);
            };
            UI_DeadAd.prototype._RefreshAd = function() {
                var dataSource = [];
                for (var i = 0; i < this._showAds.length; ++i) {
                    var ad = this._showAds[i];
                    var data = {
                        id:ad.id,
                        img_icon: {
                            skin: ad.thumb
                        },
                        text_name: {
                            text: ad.name
                        },
                        imgRed: {
                            visible: ad.dot
                        }
                    };
                    dataSource.push(data);
                }
                this.showList.dataSource = dataSource;
                this.showList.refresh();
            };
            UI_DeadAd.prototype._HideAD = function() {
                this.visible = false;
                MatterManager_1.default.inst.hideMatter(this._idStr, this._identifyId);
            };
            UI_DeadAd.ShowAD = function() {
                if (this._instance == null) return;
                this._instance._ShowAD();
            };
            UI_DeadAd.HideAD = function() {
                if (this._instance == null) return;
                this._instance._HideAD();
            };
            UI_DeadAd.prototype._OnClick = function(index) {
                // var _this = this;
                // var adData = this._showAds[index];
                // MatterManager_1.default.inst.onClick(adData, BHandler_1.default.create(this, function(bool) {
                //     if (!bool) {
                //         _this.openMoreGamePanel();
                //     }
                // }));
            };
            UI_DeadAd.prototype.openMoreGamePanel = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_moregame.prefab");
            };
            return UI_DeadAd;
        }(LTUI_1.default);
        exports.default = UI_DeadAd;
    }, {
        "../../module/manager/MatterManager": 7,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56
    } ],
    124: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var APIManager_1 = require("../../module/manager/APIManager");
        var Resdefine_1 = require("../common/Resdefine");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var UI_DeadAd_1 = require("./UI_DeadAd");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var UIRankEndCmp_1 = require("./Cmp/UIRankEndCmp");
        var ADManager_1 = require("../manager/ADManager");
        var EPropType_1 = require("../common/EPropType");
        var UI_End = function(_super) {
            __extends(UI_End, _super);
            function UI_End() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._upPos = 328;
                _this._downPos = 600;
                return _this;
            }
            UI_End.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_end = this;
                this.btn_get.on(Laya.Event.CLICK, this, this._OnClickGet);
                this.btn_watchAd.on(Laya.Event.CLICK, this, this._OnClickAd);
                this.rankCmp = this.FindCMP("progress_rank", UIRankEndCmp_1.default);
                this.visible = false;
                this._isDead = false;
            };
            UI_End.prototype._UpdateTeamTitle = function() {
                this.text_blue.text = GlobalUnit_1.default.gameManager.blueTeam.toFixed(0);
                this.text_red.text = GlobalUnit_1.default.gameManager.redTeam.toFixed(0);
                this._isRedWin = true;
                if (GlobalUnit_1.default.gameManager.blueTeam == GlobalUnit_1.default.gameManager.redTeam) {
                    this._isRedWin = GlobalUnit_1.default.gameManager.firstPlayer.teamId != GlobalUnit_1.default.mainPlayer.teamId;
                } else {
                    this._isRedWin = GlobalUnit_1.default.gameManager.redTeam > GlobalUnit_1.default.gameManager.blueTeam;
                }
                this.img_win_blue.visible = !this._isRedWin;
                this.img_win_red.visible = this._isRedWin;
            };
            UI_End.prototype._GetAddScore = function(rankInfo) {
                var addScore = 0;
                if (GlobalUnit_1.default.gameManager.isSigleModel) {
                    if (rankInfo.reward_cups.length > GlobalUnit_1.default.mainPlayer.rankCount - 1) {
                        addScore = rankInfo.reward_cups[GlobalUnit_1.default.mainPlayer.rankCount - 1];
                    } else {
                        console.log("é…ç½®é•¿åº¦ä¸è¶³,ä½¿ç”¨0å¡«å……");
                    }
                } else {
                    var selfRankCountOfTeam = 0;
                    for (var _i = 0, _a = GlobalUnit_1.default.gameManager.allPlayers; _i < _a.length; _i++) {
                        var playerCmp = _a[_i];
                        if (playerCmp == GlobalUnit_1.default.mainPlayer) continue;
                        if (playerCmp.teamId == GlobalUnit_1.default.mainPlayer.teamId && playerCmp.rankCount < GlobalUnit_1.default.mainPlayer.rankCount) {
                            selfRankCountOfTeam++;
                        }
                    }
                    var finalIndex = this._isRedWin ? 6 + selfRankCountOfTeam : selfRankCountOfTeam;
                    if (rankInfo.reward_cups.length > finalIndex) {
                        addScore = rankInfo.team_rewards[finalIndex];
                    } else {
                        console.log("é…ç½®é•¿åº¦ä¸è¶³,ä½¿ç”¨0å¡«å……");
                    }
                }
                return addScore;
            };
            UI_End.prototype.onVisible = function() {
                var bool = true;
                // MatterManager_1.default.inst.isReady && MatterManager_1.default.canShow;
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    this.text_coin.visible = false;
                    this.box_qq.visible = true;
                    this.img_win_blue.skin = "ui_main/sp_wofanghuosheng.png";
                    this.img_win_red.skin = "ui_main/sp_difanghuosheng.png";
                    this.img_dead_title.skin = "ui_main/dead_title_qq.png";
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    this.text_coin.visible = true;
                    this.box_qq.visible = false;
                    this.img_win_blue.skin = "ui_main/sp_landuisheng.png";
                    this.img_win_red.skin = "ui_main/sp_hongduishengli.png";
                    this.img_dead_title.skin = "ui_main/dead_title.png";
                    bool ? UI_DeadAd_1.default.ShowAD() : "";
                    break;

                  default:
                    this.text_coin.visible = true;
                    this.box_qq.visible = false;
                    this.img_win_blue.skin = "ui_main/sp_landuisheng.png";
                    this.img_win_red.skin = "ui_main/sp_hongduishengli.png";
                    this.img_dead_title.skin = "ui_main/dead_title.png";
                    bool ? UI_DeadAd_1.default.ShowAD() : "";
                    // UI_DeadAd_1.default.ShowAD() ;
                    break;
                }
                if (!GlobalUnit_1.default.gameManager.isSigleModel) {
                    if (this._isDead) {
                        this.setImgWinTitle(false);
                        this.img_dead_title.visible = MatterManager_1.default.inst.isReady && MatterManager_1.default.canShow;
                        this.container_team.visible = false;
                    } else {
                        this.setImgWinTitle(false);
                        this.img_dead_title.visible = false;
                        this.container_team.visible = true;
                        this._UpdateTeamTitle();
                    }
                } else {
                    this._isDead = GlobalUnit_1.default.mainPlayer.finishTime < 0;
                    if (this._isDead) {
                        this.setImgWinTitle(false);
                        this.img_dead_title.visible = MatterManager_1.default.inst.isReady && MatterManager_1.default.canShow;
                        this.container_team.visible = false;
                    } else {
                        this.setImgWinTitle(true);
                        this.container_team.visible = false;
                        this.img_dead_title.visible = false;
                        this.text_title.value = GlobalUnit_1.default.mainPlayer.rankCount.toFixed(0);
                        if(GlobalUnit_1.default.mainPlayer.rankCount == 1){
                            this.text_title2.skin ="ui_main/1st.png";
                        }
                        else if(GlobalUnit_1.default.mainPlayer.rankCount == 2){
                            this.text_title2.skin ="ui_main/2nd.png";
                        }
                        else if(GlobalUnit_1.default.mainPlayer.rankCount == 3){
                            this.text_title2.skin ="ui_main/3rd.png";
                        }
                        else{
                            this.text_title2.skin ="ui_main/4th.png";
                        }

                    
                        // this.lab_title_qq_my.changeText("ç¬¬" + GlobalUnit_1.default.mainPlayer.rankCount.toFixed(0) + "å");
                    }
                }
                var coinUpProp = GlobalUnit_1.default.skinManager.GetProp(GlobalUnit_1.default.mainPlayer.skinConfig, EPropType_1.EPropType.Coin);
                if (coinUpProp != null) {
                    GlobalUnit_1.default.dataManager.matchCoin = Math.floor(GlobalUnit_1.default.dataManager.matchCoin * coinUpProp.pro_value);
                    console.log("èŽ·å¾—é‡‘å¸åŠ æˆ", coinUpProp.pro_value);
                }
                this.text_coin.text = GlobalUnit_1.default.dataManager.matchCoin.toFixed(0);
                this.fontClip_coin.value = GlobalUnit_1.default.dataManager.matchCoin.toFixed(0);
                if (this._isDead) {
                    this.text_newscore.visible = false;
                } else {
                    var fastTime = GlobalUnit_1.default.dataManager.GetFastScore(GlobalUnit_1.default.roadManager.roadConifg.scene_key);
                    var isNewScore = GlobalUnit_1.default.mainPlayer.finishTime < fastTime;
                    if (isNewScore) {
                        GlobalUnit_1.default.dataManager.SetFastScore(GlobalUnit_1.default.roadManager.roadConifg.scene_key, GlobalUnit_1.default.mainPlayer.finishTime);
                    }
                    APIManager_1.default.inst.api.UploadWeekScore(GlobalUnit_1.default.mainPlayer.finishTime, GlobalUnit_1.default.roadManager.roadConifg.scene_key);
                    var timeStr = GlobalUnit_1.default.mainPlayer.finishTime > 100 ? GlobalUnit_1.default.mainPlayer.finishTime.toFixed(1) : GlobalUnit_1.default.mainPlayer.finishTime.toFixed(2);
                    

                    var showStr = isNewScore ? "You took "+ timeStr + " seconds, just beat the highest record" : "You took "+timeStr+" seconds";
                    this.text_newscore.text = showStr;
                    this.text_newscore.visible = GlobalUnit_1.default.mainPlayer.finishTime < 1e4;
                }
                if (!this._isDead && GlobalUnit_1.default.mainPlayer.rankCount == 1) {
                    GlobalUnit_1.default.dataManager.campionCount++;
                }
                var rankInfo = GlobalUnit_1.default.dataManager.currentRankInfo;
                this._UpdateRewardUI(rankInfo);
                if (this._isDead) {
                    this.rankCmp.UpdateInfo(0);
                } else {
                    var addScore = this._GetAddScore(rankInfo);
                    this.rankCmp.UpdateInfo(addScore);
                    this.owner.parent.ani_ui_end_init.play(0, false);
                    var newCupCount = GlobalUnit_1.default.dataManager.cupCount + addScore;
                    var newRankInfo = GlobalUnit_1.default.dataManager.GetRankInfo(newCupCount);
                    if (newRankInfo.id != rankInfo.id) {
                        if (newRankInfo.id > rankInfo.id) {
                            console.log("æ®µä½å‡çº§");
                            GlobalUnit_1.default.uiRoot.ui_main.rankInfo = newRankInfo;
                            GlobalUnit_1.default.roadManager.isFirstChange = true;
                        } else {
                            console.log("æ®µä½é™çº§");
                        }
                    }
                    GlobalUnit_1.default.dataManager.cupCount = GlobalUnit_1.default.dataManager.cupCount + addScore;
                    GlobalUnit_1.default.dataManager.Save();
                    GlobalUnit_1.default.dataManager.UploadScore();
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "é‡‘å¸æ•°é‡", GlobalUnit_1.default.dataManager.coinCount);
                }
                GlobalUnit_1.default.dataManager.matchNum += 1;
                this.changeBtnWatchSkin();
                if (GlobalUnit_1.default.EnableBannerMove()) {
                    this._SpecialShowBanner();
                } else {
                    this._NormalShowBanner();
                }
            };
            UI_End.prototype.setImgWinTitle = function(bool) {
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    this.boxqq_title.visible = bool;
                    this.img_win_title.visible = false;
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    this.boxqq_title.visible = false;
                    this.img_win_title.visible = bool;
                    break;

                  default:
                    this.boxqq_title.visible = false;
                    this.img_win_title.visible = bool;
                    break;
                }
            };
            UI_End.prototype._NormalShowBanner = function() {
                // this.btn_get.centerY = this._upPos;
                // ADManager_1.default.instance.ShowBanner();
            };
            UI_End.prototype._SpecialShowBanner = function() {
                var _this = this;
                // ADManager_1.default.instance.HideBanner();
                // this.btn_get.centerY = this._downPos;
                // Laya.timer.once(1700, this, function() {
                //     ADManager_1.default.instance.ShowBanner();
                // });
                // Laya.timer.once(2e3, this, function() {
                //     _this.btn_get.centerY = _this._upPos;
                // });
            };
            UI_End.prototype._UpdateRewardUI = function(rankConfig) {
                if (rankConfig.notice_str == null || rankConfig.notice_str == "") {
                    this.reward_bg.visible = false;
                } else {
                    this.reward_text.text = rankConfig.notice_str;
                    this.reward_icon.skin = rankConfig.notice_icon;
                    this.reward_bg.visible = true;
                }
            };
            UI_End.prototype._OnBannerShow = function() {
                this.btn_get.bottom = undefined;
                // this.btn_get.centerY = 388;
            };
            UI_End.prototype.onUnvisible = function() {
                UI_DeadAd_1.default.HideAD();
                ADManager_1.default.instance.HideBanner();
            };
            UI_End.prototype.ShowEnd = function(isDead) {
                this._isDead = isDead;
                this.visible = true;
            };
            UI_End.prototype._OnClickAd = function() {
                ADManager_1.default.instance.ShowVideoAd("ç»“ç®—ç•Œé¢", Laya.Handler.create(this, this._OnSuccess), null);
            };
            UI_End.prototype.changeBtnWatchSkin = function() {
                console.log("----------A-------", GlobalUnit_1.default.dataManager.isTwo11);
                if (GlobalUnit_1.default.dataManager.isTwo11) {
                    this.btn_watchAd.skin = "ui_11/btn_ershibeilingqu.png";
                    var img = this.two11Image;
                    img.x = 274;
                    img.y = -42;
                    this.btn_watchAd.addChild(img);
                } else {
                    this.btn_watchAd.skin = "ui_main/img_watch_ad_01.png";
                }
            };
            Object.defineProperty(UI_End.prototype, "two11Image", {
                get: function() {
                    if (!this._two11Image) {
                        this._two11Image = new Laya.Image();
                        this._two11Image.skin = "ui_11/sp_xiaolibao.png";
                    }
                    return this._two11Image;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UI_End.prototype, "rewardNum", {
                get: function() {
                    if (GlobalUnit_1.default.dataManager.isTwo11) {
                        return 20;
                    } else {
                        return 5;
                    }
                },
                enumerable: true,
                configurable: true
            });
            UI_End.prototype._OnSuccess = function() {
                GlobalUnit_1.default.uiRoot.ui_main.shouldShowCoin = GlobalUnit_1.default.dataManager.matchCoin > 0;
                GlobalUnit_1.default.dataManager.coinCount += GlobalUnit_1.default.dataManager.matchCoin * this.rewardNum;
                GlobalUnit_1.default.dataManager.Save();
                this.isPopGetHintsPanel(GlobalUnit_1.default.dataManager.matchCoin * this.rewardNum);
            };
            UI_End.prototype._OnClickGet = function() {
                GlobalUnit_1.default.uiRoot.ui_main.shouldShowCoin = GlobalUnit_1.default.dataManager.matchCoin > 0;
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "ç‚¹å‡»ç»§ç»­");
                GlobalUnit_1.default.dataManager.coinCount += GlobalUnit_1.default.dataManager.matchCoin;
                GlobalUnit_1.default.dataManager.Save();
                this.isPopGetHintsPanel(GlobalUnit_1.default.dataManager.matchCoin);
            };
            UI_End.prototype.isPopGetHintsPanel = function(coinNum) {
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    if (coinNum > 0) {
                        GlobalUnit_1.default.ShowUI("ui_prefabs/ui_getHints.prefab", {
                            type: 1,
                            coinNum: coinNum
                        });
                    } else {
                        GlobalUnit_1.default.gameManager.ResetGame(false);
                    }
                } else {
                    GlobalUnit_1.default.gameManager.ResetGame(false);
                }
            };
            return UI_End;
        }(LTUI_1.default);
        exports.default = UI_End;
    }, {
        "../../module/manager/APIManager": 5,
        "../../module/manager/MatterManager": 7,
        "../../module/manager/SDKManager": 8,
        "../LTGame/UIExt/LTUI": 41,
        "../common/EPropType": 53,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76,
        "./Cmp/UIRankEndCmp": 115,
        "./UI_DeadAd": 123
    } ],
    125: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var Resdefine_1 = require("../common/Resdefine");
        var UIRankCmp_1 = require("./Cmp/UIRankCmp");
        var GameConst_1 = require("../common/GameConst");
        var ADManager_1 = require("../manager/ADManager");
        var UI_EndRank = function(_super) {
            __extends(UI_EndRank, _super);
            function UI_EndRank() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._minTime = .05;
                _this._singleStartY = [];
                _this._multiStartY = [];
                return _this;
            }
            UI_EndRank.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_end_rank = this;
                // this.btn_share.on(Laya.Event.CLICK, this, this._OnClickShare);
                this.btn_skip.on(Laya.Event.CLICK, this, this._OnClickSkip);
                this._itemList = [];
                this._sampleCmp = this.sample_item.getComponent(UIRankCmp_1.default);
                this._itemList.push(this._sampleCmp);
                this._singleStartY.push(0);
                for (var i = 0; i < 11; ++i) {
                    var newItem = this._sampleCmp.GenNew();
                    this._itemList.push(newItem);
                    this._sampleCmp.owner.parent.addChild(newItem.owner);
                    newItem.img_bg.x = 0;
                    newItem.img_bg.y = 75 * (i + 1);
                    this._singleStartY.push(newItem.img_bg.y);
                }
                var lastY = 0;
                for (var i = 0; i < 6; ++i) {
                    this._multiStartY.push(i * 75 - 110);
                    lastY = i * 75 - 45;
                }
                for (var i = 0; i < 6; ++i) {
                    this._multiStartY.push(i * 75 + lastY + 60 + 75);
                }
                this.visible = false;
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    this.btn_skip.bottom = 210;
                    // this.btn_share.bottom = 210;
                } else {
                    this.btn_skip.bottom = 105;
                    // this.btn_share.bottom = 105;
                }
            };
            UI_EndRank.prototype.onVisible = function() {
                this._ResetAllList();
                this._currentShowIndex = 0;
                this._currentBlueIndex = 0;
                this._currentRedIndex = 0;
                this._waitTime = this._minTime;
                // this.btn_share.visible = false;
                this.btn_skip.visible = false;
                if (GlobalUnit_1.default.gameManager.isSigleModel) {
                    let str = ""
                    if(GlobalUnit_1.default.mainPlayer.rankCount == 1){
                        str ="1st";
                    }
                    else if(GlobalUnit_1.default.mainPlayer.rankCount == 2){
                        str ="2nd";
                    }
                    else if(GlobalUnit_1.default.mainPlayer.rankCount == 3){
                        str ="3rd";
                    }
                    else{
                        str = GlobalUnit_1.default.mainPlayer.rankCount +"th";
                    }
                    this.text_title.text = "You got the " + str + " place";
                    this.img_title.visible = true;
                    this.img_vs.visible = false;
                } else {
                    this.img_title.visible = false;
                    this.UpdateScore();
                    this.img_vs.visible = true;
                }
                Laya.timer.once(5e3, this, this._ShowShareBtn);
                this.owner.parent.ani_end_rank_init.play(0, false);
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    ADManager_1.default.instance.ShowBanner();
                }
            };
            UI_EndRank.prototype._ShowShareBtn = function() {
                // this.btn_share.visible = true;
                this.btn_skip.visible = true;
            };
            UI_EndRank.prototype.UpdateScore = function() {
                this.text_blue.value = GlobalUnit_1.default.gameManager.blueTeam.toFixed(0);
                this.text_red.value = GlobalUnit_1.default.gameManager.redTeam.toFixed(0);
            };
            UI_EndRank.prototype.onUpdate = function() {
                if (!this.visible) return;
                var dt = Laya.timer.delta / 1e3;
                this._waitTime -= dt;
                if (this._waitTime < 0) {
                    if (GlobalUnit_1.default.gameManager.isSigleModel) {
                        if (this._currentShowIndex < this._cachePlayerCmp.length && this._currentShowIndex < this._itemList.length) {
                            this._waitTime = this._minTime;
                            var listItem = this._itemList[this._currentShowIndex];
                            listItem.img_bg.y = this._singleStartY[this._currentShowIndex];
                            listItem.UpdateInfo(this._cachePlayerCmp[this._currentShowIndex]);
                            Laya.Tween.to(listItem.img_bg, {
                                x: 0
                            }, 800, Laya.Ease.backOut);
                            this._currentShowIndex++;
                            this.UpdateScore();
                        }
                        if (this._currentShowIndex >= GameConst_1.default.totalPlayerCount) {
                            this._ShowShareBtn();
                        }
                    } else {
                        if (this._currentBlueIndex < this._cacheBluePlayers.length) {
                            var listItem = this._itemList[this._currentBlueIndex];
                            listItem.img_bg.y = this._multiStartY[this._currentBlueIndex];
                            listItem.UpdateInfo(this._cacheBluePlayers[this._currentBlueIndex]);
                            Laya.Tween.to(listItem.img_bg, {
                                x: 0
                            }, 800, Laya.Ease.backOut);
                            this._currentBlueIndex++;
                            this._waitTime = this._minTime;
                            this.UpdateScore();
                        }
                        if (this._currentRedIndex < this._cacheRedPlayers.length) {
                            var fixIndex = this._currentRedIndex + 6;
                            var listItem = this._itemList[fixIndex];
                            listItem.img_bg.y = this._multiStartY[fixIndex];
                            listItem.UpdateInfo(this._cacheRedPlayers[this._currentRedIndex]);
                            Laya.Tween.to(listItem.img_bg, {
                                x: 0
                            }, 800, Laya.Ease.backOut);
                            this._currentRedIndex++;
                            this._waitTime = this._minTime;
                            this.UpdateScore();
                        }
                        if (this._currentBlueIndex + this._currentRedIndex >= GameConst_1.default.totalPlayerCount) {
                            this._ShowShareBtn();
                        }
                    }
                }
            };
            UI_EndRank.prototype.ClearData = function() {
                this._cachePlayerCmp = [];
                this._cacheBluePlayers = [];
                this._cacheRedPlayers = [];
            };
            UI_EndRank.prototype.PushData = function(playerCmp) {
                if (GlobalUnit_1.default.gameManager.isSigleModel) {
                    if (playerCmp == GlobalUnit_1.default.mainPlayer) {
                        let str = ""
                        if(GlobalUnit_1.default.mainPlayer.rankCount == 1){
                            str ="1st";
                        }
                        else if(GlobalUnit_1.default.mainPlayer.rankCount == 2){
                            str ="2nd";
                        }
                        else if(GlobalUnit_1.default.mainPlayer.rankCount == 3){
                            str ="2rd";
                        }
                        else{
                            str = GlobalUnit_1.default.mainPlayer.rankCount +"th";
                        }
                        this.text_title.text = "You got the " + str + " place";
                    }
                    this._cachePlayerCmp.push(playerCmp);
                } else {
                    if (playerCmp.teamId == GlobalUnit_1.default.mainPlayer.teamId) {
                        this._cacheBluePlayers.push(playerCmp);
                    } else {
                        this._cacheRedPlayers.push(playerCmp);
                    }
                }
            };
            UI_EndRank.prototype._ResetAllList = function() {
                for (var _i = 0, _a = this._itemList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.img_bg.x = -800;
                }
            };
            UI_EndRank.prototype._OnClickShare = function() {
            };
            UI_EndRank.prototype._OnShare = function(res) {
                console.log(res);
            };
            UI_EndRank.prototype._OnClickSkip = function() {
                this.visible = false;
                ADManager_1.default.instance.HideBanner();
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_luck.prefab", false);
                } else {
                    GlobalUnit_1.default.uiRoot.ui_end.ShowEnd(false);
                }
            };
            return UI_EndRank;
        }(LTUI_1.default);
        exports.default = UI_EndRank;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76,
        "./Cmp/UIRankCmp": 114
    } ],
    126: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var LTUIUtils_1 = require("../LTGame/UIExt/LTUIUtils");
        var Vector3Ex_1 = require("../LTGame/LTUtils/Vector3Ex");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var ADManager_1 = require("../manager/ADManager");
        var UI_Fight = function(_super) {
            __extends(UI_Fight, _super);
            function UI_Fight() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._lastStageX = 0;
                _this._progressFixedDistance = 4;
                _this._unitWidth = 65;
                return _this;
            }
            UI_Fight.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_fight = this;
                this.click_bg.on(Laya.Event.MOUSE_DOWN, this, this._OnMousePress);
                this.click_bg.on(Laya.Event.MOUSE_UP, this, this._OnMouseUp);
                this.click_bg.on(Laya.Event.MOUSE_MOVE, this, this._OnMouseMove);
                this.click_bg.on(Laya.Event.MOUSE_OUT, this, this._OnMouseUp);
                this.img_coin_bg.top += SDKManager_1.default.inst.sdk.sysOfy;
                this.progress_bg.top += SDKManager_1.default.inst.sdk.sysOfy;
                this.visible = false;
            };
            UI_Fight.prototype.onVisible = function() {
                this._maxWidth = this.click_bg.width;
                this._maxProgressWidth = this.progress_bg.width - 15;
                this.text_rank.value = GlobalUnit_1.default.mainPlayer.rankCount.toFixed(0);


                if(GlobalUnit_1.default.mainPlayer.rankCount === 1){
                    this.img_rank1.skin ="ui_main/st.png"
                }else if(GlobalUnit_1.default.mainPlayer.rankCount === 2){
                    this.img_rank1.skin ="ui_main/ed.png"
                }
                else if(GlobalUnit_1.default.mainPlayer.rankCount === 3){
                    this.img_rank1.skin ="ui_main/rd.png"
                }else{
                    this.img_rank1.skin ="ui_main/th.png"
                }
               




                this.text_kill.text = "0";
                this._UpdateProgress(0);
                this.img_self_campion_point.visible = false;
                this.img_campion_point.visible = true;
                this.img_self_point.visible = true;
                this.img_campion_point.right = this._maxProgressWidth - 5;
                this.img_hint.visible = false;
                this.img_blue.visible = false;
                this.img_red.visible = false;
                var currentDayCount = new Date().getDay();
                if (GlobalUnit_1.default.dataManager.lastOpenTime != currentDayCount) {
                    GlobalUnit_1.default.dataManager.lastOpenTime = currentDayCount;
                    this.img_guide.visible = true;
                    GlobalUnit_1.default.dataManager.Save();
                } else {
                    this.img_guide.visible = false;
                }
                this.container_end_notice.visible = false;
                this.container_team_notice.visible = !GlobalUnit_1.default.gameManager.isSigleModel;
                this.img_icon.skin = GlobalUnit_1.default.roadManager.roadConifg.icon_path;
                this.text_total_coin.text = GlobalUnit_1.default.dataManager.matchCoin.toFixed(0);
                ADManager_1.default.instance.ShowBanner();
            };
            UI_Fight.prototype.onUnvisible = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_Fight.prototype.ShowCoin = function(sourcePos) {
                var coin = LTUIUtils_1.default.CloneImage(this.img_coin);
                this.owner.addChild(coin);
                var camera = GlobalUnit_1.default.followCamera.camera;
                var outUIPos = Vector3Ex_1.default.zero;
                camera.worldToViewportPoint(sourcePos, outUIPos);
                coin.x = outUIPos.x;
                coin.y = outUIPos.y;
                var cacheX = this.img_coin.x + this.img_coin.parent.x;
                var cacheY = this.img_coin.y + this.img_coin.parent.y;
                var distance = Math.sqrt(Math.pow(cacheX - coin.x, 2) + Math.pow(cacheY - coin.y, 2));
                Laya.Tween.to(coin, {
                    x: cacheX,
                    y: cacheY
                }, distance * .5, Laya.Ease.linearIn, Laya.Handler.create(this, this._HideCoin, [ coin ]));
            };
            UI_Fight.prototype._HideCoin = function(coinImg) {
                coinImg.destroy(true);
                this.text_total_coin.text = GlobalUnit_1.default.dataManager.matchCoin.toFixed(0);
            };
            UI_Fight.prototype._UpdateHeadProgress = function() {
                var selfProgress = GlobalUnit_1.default.mainPlayer.moveDistance / GlobalUnit_1.default.roadManager.totalDistance;
                this._UpdateProgress(selfProgress);
                if (GlobalUnit_1.default.mainPlayer.rankCount == 1) {
                    if (!this.img_self_campion_point.visible) {
                        this.img_self_campion_point.visible = true;
                        this.img_campion_point.visible = false;
                        this.img_self_point.visible = false;
                    }
                } else {
                    if (this.img_self_campion_point.visible) {
                        this.img_self_campion_point.visible = false;
                        this.img_campion_point.visible = true;
                        this.img_self_point.visible = true;
                    }
                    var firstProgress = GlobalUnit_1.default.gameManager.firstPlayer.moveDistance / GlobalUnit_1.default.roadManager.totalDistance;
                    this.img_campion_point.right = this._maxProgressWidth * MathEx_1.default.Clamp01(1 - firstProgress) - 10;
                    if (!GlobalUnit_1.default.gameManager.isSigleModel) {
                        this.img_blue.visible = GlobalUnit_1.default.gameManager.firstPlayer.teamId == GlobalUnit_1.default.mainPlayer.teamId;
                        this.img_red.visible = !this.img_blue.visible;
                    }
                }
            };
            UI_Fight.prototype._OnUpdate = function() {
                if (GlobalUnit_1.default.gameManager != null) {
                    this._UpdateHeadProgress();
                    this.text_rank.value = GlobalUnit_1.default.mainPlayer.rankCount.toFixed(0);
                    this.text_kill.text = GlobalUnit_1.default.mainPlayer.killCount + "";

                    if(GlobalUnit_1.default.mainPlayer.rankCount === 1){
                        this.img_rank1.skin ="ui_main/st.png"
                    }else if(GlobalUnit_1.default.mainPlayer.rankCount === 2){
                        this.img_rank1.skin ="ui_main/ed.png"
                    }
                    else if(GlobalUnit_1.default.mainPlayer.rankCount === 3){
                        this.img_rank1.skin ="ui_main/rd.png"
                    }else{
                        this.img_rank1.skin ="ui_main/th.png"
                    }
                }
                if (this.img_hint.visible) {
                    this._showTime -= Laya.timer.delta;
                    if (this._showTime < 0) {
                        this.img_hint.visible = false;
                    }
                }
            };
            UI_Fight.prototype.UpdateTeamScore = function() {
                this.text_blue.text = GlobalUnit_1.default.gameManager.blueTeam.toFixed(0);
                this.text_red.text = GlobalUnit_1.default.gameManager.redTeam.toFixed(0);
            };
            UI_Fight.prototype.ShowHint = function(addCount) {
                this.text_coin.text = addCount.toFixed(0);
                this.img_hint.visible = true;
                this._showTime = 500;
                GlobalUnit_1.default.dataManager.matchCoin += addCount;
                this.text_total_coin.text = GlobalUnit_1.default.dataManager.matchCoin.toFixed(0);
            };
            UI_Fight.prototype.ShowEnd = function(endTime) {
                this._remainTime = endTime;
                this.text_notice_time.value = this._remainTime.toFixed(0);
                this.img_time.visible = true;
                this.container_end_notice.visible = true;
                Laya.timer.once(1e3, this, this._OnTimeDecrease);
            };
            UI_Fight.prototype._OnTimeDecrease = function() {
                this._remainTime--;
                if (this._remainTime < 0) {
                    this.img_time.visible = false;
                    GlobalUnit_1.default.gameManager.EndGame();
                } else {
                    this.text_notice_time.value = this._remainTime.toFixed(0);
                    Laya.timer.once(1e3, this, this._OnTimeDecrease);
                }
            };
            UI_Fight.prototype._UpdateProgress = function(progress) {
                this.progress_front.right = this._maxProgressWidth * MathEx_1.default.Clamp01(1 - progress);
            };
            UI_Fight.prototype._OnMousePress = function(event) {
                this._isPressed = true;
                this._lastStageX = event.stageX;
                GlobalUnit_1.default.mainPlayer.isPressed = true;
                if (this.img_guide.visible) {
                    this.img_guide.visible = false;
                }
            };
            UI_Fight.prototype._OnMouseUp = function(event) {
                this._isPressed = false;
                GlobalUnit_1.default.mainPlayer.isPressed = false;
            };
            UI_Fight.prototype._OnMouseMove = function(event) {
                if (this._isPressed) {
                    var offset = event.stageX - this._lastStageX;
                    var offsetProgress = offset / this._maxWidth;
                    GlobalUnit_1.default.mainPlayer.HandleTurn(offsetProgress);
                    this._lastStageX = event.stageX;
                }
            };
            return UI_Fight;
        }(LTUI_1.default);
        exports.default = UI_Fight;
    }, {
        "../../module/manager/SDKManager": 8,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/LTUtils/Vector3Ex": 40,
        "../LTGame/UIExt/LTUI": 41,
        "../LTGame/UIExt/LTUIUtils": 42,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    127: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var ADManager_1 = require("../manager/ADManager");
        var UI_GameAd = function(_super) {
            __extends(UI_GameAd, _super);
            function UI_GameAd() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._identifyId = 10;
                _this._idStr = "ct";
                return _this;
            }
            UI_GameAd.prototype.onAwake = function() {
                UI_GameAd._instance = this;
                this.img_btn_close.on(Laya.Event.CLICK, this, this._HideAD);
                this.showList.renderHandler = Laya.Handler.create(this, this._OnRender, null, false);
                this.showList.selectEnable = true;
                this.showList.selectHandler = Laya.Handler.create(this, this._OnClick, null, false);
                this.visible = false;
            };
            UI_GameAd.prototype._ShowAD = function() {
                var getAds = MatterManager_1.default.inst.applyMatter(this._idStr, this._identifyId, 3);
                if (getAds == null) {
                    return;
                }
                this._showAds = [];
                for (var i = 0; i < 12 && i < getAds.length; ++i) {
                    this._showAds.push(getAds[i]);
                }
                this._RefreshAd();
                this.visible = true;
                MatterManager_1.default.inst.showMatter(this._idStr, this._identifyId, this._showAds);
                ADManager_1.default.instance.ShowBanner();
            };
            UI_GameAd.prototype._RefreshAd = function() {
                var dataSource = [];
                for (var i = 0; i < this._showAds.length; ++i) {
                    var ad = this._showAds[i];
                    var data = {
                        img_icon: {
                            skin: ad.icon
                        },
                        text_name: {
                            text: ad.name
                        }
                    };
                    dataSource.push(data);
                }
                this.showList.dataSource = dataSource;
                this.showList.refresh();
            };
            UI_GameAd.prototype._HideAD = function() {
                this.visible = false;
                MatterManager_1.default.inst.hideMatter(this._idStr, this._identifyId);
                ADManager_1.default.instance.HideBanner();
            };
            UI_GameAd.ShowAD = function() {
                if (this._instance == null) return;
                this._instance._ShowAD();
            };
            UI_GameAd.HideAD = function() {
                if (this._instance == null) return;
                this._instance._HideAD();
            };
            UI_GameAd.prototype._OnRender = function(item, index) {};
            UI_GameAd.prototype._OnClick = function(index) {
                var adData = this._showAds[index];
                console.log(adData);
                MatterManager_1.default.inst.onClick(adData);
            };
            return UI_GameAd;
        }(LTUI_1.default);
        exports.default = UI_GameAd;
    }, {
        "../../module/manager/MatterManager": 7,
        "../LTGame/UIExt/LTUI": 41,
        "../manager/ADManager": 76
    } ],
    128: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var ADManager_1 = require("../manager/ADManager");
        var UI_GetHints = function(_super) {
            __extends(UI_GetHints, _super);
            function UI_GetHints() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 10;
                return _this;
            }
            UI_GetHints.prototype.onEnable = function() {
                if (this.openData && this.openData.type) {
                    this.curType = this.openData.type;
                    switch (this.openData.type) {
                      case 1:
                        this.imgCoinCon.visible = true;
                        this.imgSkinCon.visible = false;
                        this.imgRebornCon.visible = false;
                        this.labCoin.changeText(this.openData.coinNum);
                        break;

                      case 2:
                        this.imgCoinCon.visible = false;
                        this.imgSkinCon.visible = false;
                        this.imgRebornCon.visible = true;
                        this.labRebornNum.changeText(this.openData.rebornNum);
                        break;

                      case 3:
                        this.imgCoinCon.visible = false;
                        this.imgSkinCon.visible = true;
                        this.imgRebornCon.visible = false;
                        this.imgSkin.skin = this.openData.skin;
                        this.labSkinName.changeText(this.openData.skinName);
                        break;
                    }
                }
                this.btn_close.on(Laya.Event.CLICK, this, this._OnClickClose);
                this.imgBtnGet.on(Laya.Event.CLICK, this, this._OnClickClose);
                ADManager_1.default.instance.ShowBanner();
            };
            UI_GetHints.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_GetHints.prototype._OnClickClose = function() {
                this.HideUI();
                switch (this.curType) {
                  case 1:
                    GlobalUnit_1.default.gameManager.ResetGame(false);
                    break;

                  case 2:
                    if (this.openData.isStartGame) {
                        GlobalUnit_1.default.gameManager.StartMatch(this.openData.isSingle, null);
                    }
                    break;
                  case 3:
                    GlobalUnit_1.default.gameManager.StartMatch(this.openData.isSingle, this.openData.skinconfig);
                    break;
                }
            };
            return UI_GetHints;
        }(LTUI_1.default);
        exports.default = UI_GetHints;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    129: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var ADManager_1 = require("../manager/ADManager");
        var UI_Gift = function(_super) {
            __extends(UI_Gift, _super);
            function UI_Gift() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_Gift.prototype.onEnable = function() {
                this.btn_close.on(Laya.Event.CLICK, this, this._OnClickClose);
                this.btn_get.on(Laya.Event.CLICK, this, this._OnClickGet);
                ADManager_1.default.instance.ShowBanner();
            };
            UI_Gift.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_Gift.prototype._OnClickGet = function() {
                if (GlobalUnit_1.default.HasSaved()) {
                    GlobalUnit_1.default.skinManager.UnLockGiftSkin();
                    GlobalUnit_1.default.uiRoot.ui_main.UpdateGiftState();
                    GlobalUnit_1.default.dataManager.Save();
                    SDKManager_1.default.inst.sdk.showToast("é¢†å–æˆåŠŸ");
                    this.visible = false;
                } else {
                }
            };
            UI_Gift.prototype._OnClickClose = function() {
                this.HideUI();
            };
            return UI_Gift;
        }(LTUI_1.default);
        exports.default = UI_Gift;
    }, {
        "../../module/manager/SDKManager": 8,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    130: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var ADManager_1 = require("../manager/ADManager");
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var APIManager_1 = require("../../module/manager/APIManager");
        var UI_Invitefrined = function(_super) {
            __extends(UI_Invitefrined, _super);
            function UI_Invitefrined() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                _this._curNum = 0;
                _this.skinId = 11;
                return _this;
            }
            Object.defineProperty(UI_Invitefrined.prototype, "curNum", {
                get: function() {
                    return this._curNum;
                },
                set: function(value) {
                    this._curNum = value;
                },
                enumerable: true,
                configurable: true
            });
            UI_Invitefrined.prototype.onEnable = function() {
                var _this = this;
                this.btn_Help.on(Laya.Event.CLICK, this, this.btnHelpHandler);
                this.btn_No.on(Laya.Event.CLICK, this, this.btnNoHandler);
                ADManager_1.default.instance.ShowBanner();
                APIManager_1.default.inst.api.seeInviteNum(BHandler_1.default.create(this, function(data) {
                    if (data && data.status == 1) {
                        _this.curNum = data.result.num;
                        console.log("data.result.num=====>" + data.result.num);
                        _this.updateShow();
                    }
                }));
            };
            UI_Invitefrined.prototype.updateShow = function() {
                if (this.curNum >= 3) {
                    this.img01.skin = "ui_invitefrined/sp_renwu.png";
                    this.img02.skin = "ui_invitefrined/sp_renwu.png";
                    this.img03.skin = "ui_invitefrined/sp_renwu.png";
                } else if (this.curNum == 2) {
                    this.img01.skin = "ui_invitefrined/sp_renwu.png";
                    this.img02.skin = "ui_invitefrined/sp_renwu.png";
                    this.img03.skin = "ui_invitefrined/sp_touxiang.png";
                } else if (this.curNum == 1) {
                    this.img01.skin = "ui_invitefrined/sp_renwu.png";
                    this.img02.skin = "ui_invitefrined/sp_touxiang.png";
                    this.img03.skin = "ui_invitefrined/sp_touxiang.png";
                } else {
                    this.img01.skin = "ui_invitefrined/sp_touxiang.png";
                    this.img02.skin = "ui_invitefrined/sp_touxiang.png";
                    this.img03.skin = "ui_invitefrined/sp_touxiang.png";
                }
                if (this.curNum >= 3) {
                    this.btn_Help.skin = "ui_main/btn_lingqujingli.png";
                } else {
                    this.btn_Help.skin = "ui_invitefrined/btn_qiuzhujiesuo.png";
                }
            };
            UI_Invitefrined.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_Invitefrined.prototype.btnHelpHandler = function() {
                if (this.curNum >= 3) {
                    GlobalUnit_1.default.dataManager.UnlockSkin(this.skinId);
                    SDKManager_1.default.inst.sdk.showToast("çš®è‚¤é¢†å–æˆåŠŸ");
                    GlobalUnit_1.default.uiRoot.ui_main.isHideInviteBtn();
                    this.HideUI();
                } else {
                    SDKManager_1.default.inst.sdk.shareAppMessage(BHandler_1.default.create(this, this._onShareSuc), {
                        titile: "åˆ†äº«æ¸¸æˆ"
                    });
                }
            };
            UI_Invitefrined.prototype.btnNoHandler = function() {
                this.HideUI();
            };
            UI_Invitefrined.prototype._onShareSuc = function(res) {};
            return UI_Invitefrined;
        }(LTUI_1.default);
        exports.default = UI_Invitefrined;
    }, {
        "../../module/manager/APIManager": 5,
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    131: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var UI_Load = function(_super) {
            __extends(UI_Load, _super);
            function UI_Load() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UI_Load.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_load = this;
                this.visible = false;
            };
            return UI_Load;
        }(LTUI_1.default);
        exports.default = UI_Load;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56
    } ],
    132: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var ADManager_1 = require("../manager/ADManager");
        var DrawlotsDesConfig_1 = require("../config/DrawlotsDesConfig");
        var DrawlotsConfig_1 = require("../config/DrawlotsConfig");
        var UI_Luck = function(_super) {
            __extends(UI_Luck, _super);
            function UI_Luck() {
                var _this = _super.call(this) || this;
                _this.sortOrder = 10;
                _this.rewardCoin = 560;
                _this.clickNum = 0;
                _this.maxClcikNum = 7;
                return _this;
            }
            UI_Luck.prototype.onAwake = function() {
                this.labDeslist = [];
                this.labDeslist.push(this.labDes1);
                this.labDeslist.push(this.labDes2);
                this.labDeslist.push(this.labDes3);
                this.labDeslist.push(this.labDes4);
                this.labDeslist.push(this.labDes5);
                this.spList = [];
                this.spList.push(this.sp01);
                this.spList.push(this.sp02);
                this.spList.push(this.sp03);
                this.spList.push(this.sp04);
                this.spList.push(this.sp05);
                this.spListPos = [];
                var len = this.spList.length;
                for (var i = 0; i < len; i++) {
                    var sp = this.spList[i];
                    this.spListPos.push(new Laya.Point(sp.x, sp.y));
                }
            };
            UI_Luck.prototype.shake1 = function() {
                var len = this.spList.length;
                for (var i = 0; i < len; i++) {
                    var sp = this.spList[i];
                    var targetX = Math.random() * 10 - 5 + this.spListPos[i].x;
                    var targetY = this.spListPos[i].y - Math.ceil(Math.random() * 60 + 35);
                    var time = Math.random() * 200 + 280;
                    Laya.Tween.to(sp, {
                        x: targetX,
                        y: targetY
                    }, time, Laya.Ease.elasticInOut, Laya.Handler.create(this, this.shake2, [ sp, this.spListPos[i] ]));
                }
                Laya.Tween.to(this.box02, {
                    y: this.box02InitPos.y - 30
                }, 200, Laya.Ease.elasticInOut, Laya.Handler.create(this, this.shake3));
            };
            UI_Luck.prototype.shake2 = function(sp, pos) {
                Laya.Tween.to(sp, {
                    x: pos.x,
                    y: pos.y
                }, 200, Laya.Ease.elasticInOut, null);
            };
            UI_Luck.prototype.shake3 = function() {
                Laya.Tween.to(this.box02, {
                    y: this.box02InitPos.y
                }, 100, Laya.Ease.elasticInOut);
            };
            UI_Luck.prototype.onEnable = function() {
                this.box02InitPos = new Laya.Point(this.box02.x, this.box02.y);
                this.isGet = false;
                this._GenCoins();
                this.clickNum = 0;
                this.btnGet.on(Laya.Event.CLICK, this, this.btnGetHandler);
                this.btnGetTwo.on(Laya.Event.CLICK, this, this.btnGetTwoHandler);
                this.btnClick.on(Laya.Event.CLICK, this, this.btnClickHandler);
                this.boxResult.visible = false;
                this.boxImage.visible = true;
                this.btnClick.visible = true;
                ADManager_1.default.instance.HideBanner();
                this.randomLots();
            };
            UI_Luck.prototype.randomLots = function() {
                var len = DrawlotsConfig_1.DrawlotsConfig.dataList.length;
                var cur = Math.ceil(Math.random() * len);
                var cfg = DrawlotsConfig_1.DrawlotsConfig.data[cur];
                if (cfg) {
                    switch (cfg.type) {
                      case 1:
                        this.imgReward.skin = "ui_luck/sp_zhongqian.png";
                        break;

                      case 2:
                        this.imgReward.skin = "ui_luck/sp_zhongqian.png";
                        break;

                      case 3:
                        this.imgReward.skin = "ui_luck/sp_shangqian.png";
                        break;

                      case 4:
                        this.imgReward.skin = "ui_luck/sp_shangshangqian.png";
                        break;
                    }
                    this.labPercen.changeText(cfg.luck + "%");
                    this.labReward.changeText("æœ¬æ¬¡é‡‘å¸å¥–åŠ±ï¼š+" + cfg.coinReward);
                    this.cfg = cfg;
                    this.setLabShow();
                }
            };
            UI_Luck.prototype.setLabShow = function() {
                var len = this.cfg.gift_value.length;
                len > 5 ? 5 : len;
                for (var i = 0; i < len; i++) {
                    var cfg = DrawlotsDesConfig_1.DrawlotsDesConfig.data[this.cfg.gift_value[i]];
                    if (cfg) {
                        this.labDeslist[i].changeText(cfg.des);
                    }
                }
            };
            UI_Luck.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
                this._genCoinList = null;
            };
            UI_Luck.prototype.btnGetHandler = function() {
                if (!this.isGet) {
                    this.isGet = true;
                    this.ShowGetCoin();
                    GlobalUnit_1.default.dataManager.coinCount += this.rewardCoin;
                    GlobalUnit_1.default.dataManager.Save();
                    GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                }
            };
            UI_Luck.prototype.btnGetTwoHandler = function() {
                SDKManager_1.default.inst.sdk.shareAppMessage(BHandler_1.default.create(this, this.onShareEd), {
                    titile: "åˆ†äº«æ¸¸æˆ"
                });
            };
            UI_Luck.prototype.btnClickHandler = function() {
                this.shake1();
                this.clickNum += 1;
                if (this.clickNum == this.maxClcikNum) {
                    ADManager_1.default.instance.ShowBanner();
                } else if (this.clickNum < this.maxClcikNum) {} else {
                    this.boxImage.visible = false;
                    this.boxResult.visible = true;
                    this.btnClick.visible = false;
                    ADManager_1.default.instance.ShowBanner();
                }
            };
            UI_Luck.prototype.onShareEd = function() {
                Laya.timer.scale = 1;
                var shareResult = GlobalUnit_1.default.shareManager.GetShareResult();
                if (shareResult) {
                    this.onsuccess();
                } else {
                    var randomStr = MathEx_1.default.RandomInt(0, 100) > 50 ? "è¯·åˆ†äº«åˆ°ç¾¤" : "è¯·æ¢ä¸ªç¾¤è¯•è¯•";
                    SDKManager_1.default.inst.sdk.showToast(randomStr);
                }
            };
            UI_Luck.prototype.onsuccess = function() {
                if (!this.isGet) {
                    this.isGet = true;
                    this.ShowGetCoin();
                    GlobalUnit_1.default.dataManager.coinCount += this.rewardCoin * 2;
                    SDKManager_1.default.inst.sdk.showToast("é‡‘å¸+" + this.rewardCoin * 2);
                    GlobalUnit_1.default.dataManager.Save();
                    GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                }
            };
            UI_Luck.prototype.closeView = function() {
                this.HideUI();
                GlobalUnit_1.default.uiRoot.ui_end.ShowEnd(this.openData.isDead);
            };
            UI_Luck.prototype._GenCoins = function() {
                if (this._genCoinList == null) {
                    this._genCoinList = [];
                    for (var i = 0; i < 10; ++i) {
                        var cloneCoin = new Laya.Image();
                        cloneCoin.skin = "ui_main/sp_jinbi.png";
                        cloneCoin.centerX = 0;
                        cloneCoin.centerY = 0;
                        this.owner.addChild(cloneCoin);
                        this._genCoinList.push(cloneCoin);
                        cloneCoin.visible = false;
                    }
                }
            };
            UI_Luck.prototype.ShowGetCoin = function() {
                for (var _i = 0, _a = this._genCoinList; _i < _a.length; _i++) {
                    var coin = _a[_i];
                    coin.x = Laya.stage.width / 2;
                    coin.y = Laya.stage.height / 2;
                    var targetX = Laya.stage.width / 2 + MathEx_1.default.Random(-100, 100);
                    var targetY = Laya.stage.height / 2 + MathEx_1.default.Random(-100, 100);
                    var distance = Math.sqrt(Math.pow(targetX - coin.x, 2) + Math.pow(targetY - coin.y, 2));
                    Laya.Tween.to(coin, {
                        x: targetX,
                        y: targetY
                    }, distance * 5, Laya.Ease.quadInOut, Laya.Handler.create(this, this._MoveToCoin, [ coin ], true), 1);
                    coin.visible = true;
                }
                this.visible = true;
                Laya.timer.once(1500, this, this.closeView);
            };
            UI_Luck.prototype._MoveToCoin = function(coinImg) {
                var cacheX = 0;
                var cacheY = 0;
                var distance = Math.sqrt(Math.pow(cacheX - coinImg.x, 2) + Math.pow(cacheY - coinImg.y, 2));
                Laya.Tween.to(coinImg, {
                    x: cacheX,
                    y: cacheY
                }, distance * .5, Laya.Ease.linearIn, Laya.Handler.create(this, this._HideCoin, [ coinImg ]));
            };
            UI_Luck.prototype._HideCoin = function(coinImg) {
                coinImg.removeSelf();
                coinImg.destroy(true);
            };
            return UI_Luck;
        }(LTUI_1.default);
        exports.default = UI_Luck;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../config/DrawlotsConfig": 62,
        "../config/DrawlotsDesConfig": 63,
        "../manager/ADManager": 76
    } ],
    133: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var LTUIUtils_1 = require("../LTGame/UIExt/LTUIUtils");
        var Resdefine_1 = require("../common/Resdefine");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var UI_BottomAd_1 = require("./UI_BottomAd");
        var DispatcherMrg_1 = require("../../module/manager/DispatcherMrg");
        var UIRankProgressCmp_1 = require("./Cmp/UIRankProgressCmp");
        var ADManager_1 = require("../manager/ADManager");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var UIRebornCardTipCmp_1 = require("./Cmp/UIRebornCardTipCmp");
        var UI_Main = function(_super) {
            __extends(UI_Main, _super);
            function UI_Main() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 1;
                _this.inviteRed = true;
                return _this;
            }
            UI_Main.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_main = this;
                this.shouldShowCoin = false;
                this.btn_yad  = this.FindCMP("container_up/yad", Laya.Sprite);

                this.btn_yad.on(Laya.Event.MOUSE_DOWN,this,()=>{
                    platform.getInstance().navigate("HOME","LOGO");
                })


                this.rankView = this.FindCMP("container_up/progress_rank", UIRankProgressCmp_1.default);
                this.img_coin = this.FindCMP("container_up/img_coin_bg/img_coin", Laya.Image);
                this.rebornTip = this.FindCMP("container_up/img_reborn_bg", UIRebornCardTipCmp_1.default);
                this.rebornTip.Init();
                this.map_tip = this.FindCMP("img_btn_map/img_tip", Laya.Image);
                this.img_btn_single.on(Laya.Event.CLICK, this, this._OnClickSingle);
                this.img_btn_multi.on(Laya.Event.CLICK, this, this._OnClickMulti);
                this.btn_skin.on(Laya.Event.CLICK, this, this._OnClickSkin);
                this.btn_map.on(Laya.Event.CLICK, this, this._OnClickMap);
                // this.btn_moregame.on(Laya.Event.CLICK, this, this._OnClickMoreGame);
                this.btn_sign.on(Laya.Event.CLICK, this, this._OnClickSign);
                // this.btn_invite.on(Laya.Event.CLICK, this, this.inviteHandler);
                this.btn_week.on(Laya.Event.CLICK, this, this._OnClickWeek);
                this.btn_week.visible = false;
                this.visible = false;
                this.UpdateGiftState();
                this._GenCoins();
                DispatcherMrg_1.default.ins.on(MatterManager_1.default.Events_MatterReady, this, this._UpdateADState);
                this.isHideInviteBtn();
                this.checkSign();
                // this.changeBtnInvite();
            };
            UI_Main.prototype.toBig = function(btn) {
                Laya.Tween.to(btn, {
                    scaleX: 1.2,
                    scaleY: 1.2
                }, 300, Laya.Ease.linearIn, Laya.Handler.create(this, this.toSmall, [ btn ]));
            };
            UI_Main.prototype.toSmall = function(btn) {
                Laya.Tween.to(btn, {
                    scaleX: 1,
                    scaleY: 1
                }, 300, Laya.Ease.linearIn, Laya.Handler.create(this, this.toBig, [ btn ]));
            };
            UI_Main.prototype._OnClickWeek = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_week.prefab");
            };
            UI_Main.prototype._GenCoins = function() {
                if (this._genCoinList == null) {
                    this._genCoinList = [];
                    for (var i = 0; i < 10; ++i) {
                        var cloneCoin = LTUIUtils_1.default.CloneImage(this.img_coin);
                        cloneCoin.centerX = 0;
                        cloneCoin.centerY = 0;
                        this.owner.addChild(cloneCoin);
                        this._genCoinList.push(cloneCoin);
                        cloneCoin.visible = false;
                    }
                }
            };
            UI_Main.prototype.ShowGetCoin = function() {
                for (var _i = 0, _a = this._genCoinList; _i < _a.length; _i++) {
                    var coin = _a[_i];
                    coin.x = Laya.stage.width / 2;
                    coin.y = Laya.stage.height / 2;
                    var targetX = Laya.stage.width / 2 + MathEx_1.default.Random(-100, 100);
                    var targetY = Laya.stage.height / 2 + MathEx_1.default.Random(-100, 100);
                    var distance = Math.sqrt(Math.pow(targetX - coin.x, 2) + Math.pow(targetY - coin.y, 2));
                    Laya.Tween.to(coin, {
                        x: targetX,
                        y: targetY
                    }, distance * 5, Laya.Ease.quadInOut, Laya.Handler.create(this, this._MoveToCoin, [ coin ], true), 1);
                    coin.visible = true;
                }
                this.visible = true;
            };
            UI_Main.prototype._MoveToCoin = function(coinImg) {
                var cacheX = this.img_coin.x + this.img_coin.parent.x + this.img_coin.parent.parent.x;
                var cacheY = this.img_coin.y + this.img_coin.parent.y + this.img_coin.parent.parent.y;
                var distance = Math.sqrt(Math.pow(cacheX - coinImg.x, 2) + Math.pow(cacheY - coinImg.y, 2));
                Laya.Tween.to(coinImg, {
                    x: cacheX,
                    y: cacheY
                }, distance * .5, Laya.Ease.linearIn, Laya.Handler.create(this, this._HideCoin, [ coinImg ]));
            };
            UI_Main.prototype._HideCoin = function(coinImg) {
                coinImg.visible = false;
                this.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
            };
            UI_Main.prototype.onVisible = function() {
                if (this.shouldShowCoin) {
                    this.shouldShowCoin = false;
                    this.ShowGetCoin();
                } else {
                    this.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                }
                this.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                this.text_campion.text = GlobalUnit_1.default.dataManager.campionCount.toFixed(0);
                if (GlobalUnit_1.default.dataManager.userName == null) {
                    this._CreateAuthorBtn();
                }
                this._UpdateSetBtns();
                this.rankView.UpdateInfo();
                this.container_up.top = SDKManager_1.default.inst.sdk.sysOfy;
                if (this.rankInfo != null) {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_rank_upgrade.prefab", {
                        rankInfo: this.rankInfo
                    });
                    this.rankInfo = null;
                }
                this.map_tip.visible = GlobalUnit_1.default.dataManager.HasMapNew();
                this.UpdateGiftState();
                this._UpdateADState();
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_WX) {
                    console.log(GlobalUnit_1.default.dataManager.matchNum, "======GlobalUnit.mainPlayer.matchNum");
                    if (GlobalUnit_1.default.dataManager.matchNum % 2 == 0 && GlobalUnit_1.default.dataManager.matchNum != 0) {
                        SDKManager_1.default.inst.sdk.startCreateGamePortal();
                    }
                }
            };
            UI_Main.prototype._CreateAuthorBtn = function() {
            };
            UI_Main.prototype._UpdateADState = function() {
                if (!this.visible) return;
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                  case SDKManager_1.default.PlaneForm_Swan:
                    // this.btn_moregame.visible = false;
                    // ADManager_1.default.instance.ShowBanner();
                    break;

                  default:
                        UI_BottomAd_1.default.ShowBottom();
                        // this.btn_moregame.visible = true;
                    // if (MatterManager_1.default.inst.isReady && MatterManager_1.default.canShow) {
                    //     UI_BottomAd_1.default.ShowBottom();
                    //     this.btn_moregame.visible = true;
                    // } else {
                    //     this.btn_moregame.visible = false;
                    // }
                    break;
                }
            };
            UI_Main.prototype.UpdateGiftState = function() {
                // switch (SDKManager_1.default.inst.platform) {
                //   case SDKManager_1.default.PlaneForm_QQ:
                //     if (GlobalUnit_1.default.dataManager.isHaveGift()) {
                //         this.btn_gift.visible = true;
                //     } else {
                //         this.btn_gift.visible = false;
                //     }
                //     break;

                //   case SDKManager_1.default.PlaneForm_WX:
                //     if (GlobalUnit_1.default.skinManager.CheckGiftUnlocked()) {
                //         this.btn_gift.visible = false;
                //     } else {
                //         this.btn_gift.visible = true;
                //     }
                //     break;

                //   default:
                //     this.btn_gift.visible = true;
                //     break;
                // }
            };
            UI_Main.prototype.onUnvisible = function() {
                UI_BottomAd_1.default.HideBottom();
                ADManager_1.default.instance.HideBanner();
            };
            UI_Main.prototype._OnUpdate = function() {
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    ADManager_1.default.instance.ShowBanner();
                }
            };
            UI_Main.prototype.checkInviteRed = function() {
                this.img_share_gift_red.visible = this.inviteRed;
            };
            UI_Main.prototype.inviteHandler = function() {
                this.inviteRed = false;
                this.checkInviteRed();
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_invitefrined.prefab");
            };
            UI_Main.prototype.isHideInviteBtn = function() {
                // this.checkInviteRed();
                // this.btn_invite.visible = !GlobalUnit_1.default.dataManager.IsSkinUnlocked(11);
            };
            UI_Main.prototype._OnClickGift = function() {
                // switch (SDKManager_1.default.inst.platform) {
                //   case SDKManager_1.default.PlaneForm_QQ:
                //     GlobalUnit_1.default.ShowUI("ui_prefabs/ui_qqgift.prefab");
                //     break;

                //   case SDKManager_1.default.PlaneForm_WX:
                //     GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "ç‚¹å‡»æ”¶è—ç¤¼åŒ…");
                //     GlobalUnit_1.default.ShowUI("ui_prefabs/ui_gift.prefab");
                //     break;

                //   default:
                //     break;
                // }
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_gift.prefab");
            };
            UI_Main.prototype._OnClickSingle = function() {
                platform.getInstance().showInterstitial(()=>{
                    this._OnClickStart(true);
                });
            };
            UI_Main.prototype._OnClickMulti = function() {
                platform.getInstance().showInterstitial(()=>{
                    this._OnClickStart(false);
                });
            };
            UI_Main.prototype._OnClickStart = function(isSingle) {
                var trySkin = GlobalUnit_1.default.dataManager.GetTrySkinConfig();
                this._ShowTrySkin(isSingle, trySkin);
            };
            UI_Main.prototype._ShowTrySkin = function(isSingle, trySkin) {
                if (trySkin == null) {
                    GlobalUnit_1.default.gameManager.StartMatch(isSingle, null);
                    return;
                }
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_skin_try.prefab", {
                    isSingle: isSingle,
                    trySkin: trySkin
                });
            };
            UI_Main.prototype._ShowRank = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_rank.prefab");
            };
            UI_Main.prototype._OnClickMap = function() {
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "ç‚¹å‡»åœ°å›¾");
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_map.prefab");
            };
            UI_Main.prototype._OnAuthorized = function(isSuccess) {
                if (isSuccess) {
                    GlobalUnit_1.default.dataManager.userName = SDKManager_1.default.inst.userInfo.userInfo.nickName;
                    GlobalUnit_1.default.dataManager.userIcon = SDKManager_1.default.inst.userInfo.userInfo.avatarUrl;
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "æŽˆæƒæˆåŠŸ");
                } else {
                    this._CreateAuthorBtn();
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "å–æ¶ˆæŽˆæƒ");
                }
            };
            UI_Main.prototype._UpdateSetBtns = function() {
            };
            UI_Main.prototype._OnClickMusicOn = function() {
                GlobalUnit_1.default.dataManager.musicOn = false;
                this._UpdateSetBtns();
                GlobalUnit_1.default.dataManager.Save();
            };
            UI_Main.prototype._OnClickMusicOff = function() {
                GlobalUnit_1.default.dataManager.musicOn = true;
                this._UpdateSetBtns();
                GlobalUnit_1.default.dataManager.Save();
            };
            UI_Main.prototype._OnClickShakeOn = function() {
                GlobalUnit_1.default.dataManager.shakeOn = false;
                this._UpdateSetBtns();
                GlobalUnit_1.default.dataManager.Save();
            };
            UI_Main.prototype._OnClickShakeOff = function() {
                GlobalUnit_1.default.dataManager.shakeOn = true;
                this._UpdateSetBtns();
                GlobalUnit_1.default.dataManager.Save();
            };
            UI_Main.prototype._OnClickSkin = function() {
                this.visible = false;
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_skin.prefab");
            };
            UI_Main.prototype._OnLoadedSkinItem = function() {
                Laya.Scene.load("SkinScene.scene", Laya.Handler.create(this, this._LoadSceneFinished));
            };
            UI_Main.prototype._LoadSceneFinished = function() {
                Laya.Scene.open("SkinScene.scene");
            };
            UI_Main.prototype._OnClickMoreGame = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_moregame.prefab", true);
            };
            UI_Main.prototype._OnClickSign = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_sign.prefab");
            };
            UI_Main.prototype.checkSign = function() {
                var bool = GlobalUnit_1.default.dataManager.isGetSignReward;
                this.img_sign_red.visible = !bool;
                var day = GlobalUnit_1.default.dataManager.curSignDay;
                if (day >= 7 && bool) {
                    this.btn_sign.visible = false;
                } else {
                    this.btn_sign.visible = true;
                }
            };
            UI_Main.prototype._OnShare = function(res) {
                console.log(res);
            };
            return UI_Main;
        }(LTUI_1.default);
        exports.default = UI_Main;
    }, {
        "../../module/manager/DispatcherMrg": 6,
        "../../module/manager/MatterManager": 7,
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../LTGame/UIExt/LTUIUtils": 42,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76,
        "./Cmp/UIRankProgressCmp": 117,
        "./Cmp/UIRebornCardTipCmp": 118,
        "./UI_BottomAd": 121
    } ],
    134: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var ADManager_1 = require("../manager/ADManager");
        var UI_Map = function(_super) {
            __extends(UI_Map, _super);
            function UI_Map() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_Map.prototype.onEnable = function() {
                GlobalUnit_1.default.mapManager.Init();
                if (this._totalCount == null) {
                    this.img_btn_back.on(Laya.Event.CLICK, this, this._OnClickBack);
                    this._totalCount = 15;
                    this.maplist.vScrollBarSkin = "";
                    var dataSource = [];
                    for (var i = 0; i < this._totalCount; ++i) {
                        var data = {
                            img_item: {
                                x: i % 2 == 0 ? 0 : 261
                            },
                            img_time_bg: {
                                x: i % 2 == 0 ? 5 : 276
                            },
                            img_line: {
                                scaleX: i % 2 == 0 ? 1 : -1,
                                x: i % 2 == 0 ? 207 : 327
                            }
                        };
                        dataSource.push(data);
                    }
                    this.maplist.dataSource = dataSource;
                    this.maplist.renderHandler = Laya.Handler.create(this, this._OnItemRender, null, false);
                }
                ADManager_1.default.instance.ShowBanner();
                this.maplist.scrollTo(20);
                this.maplist.refresh();
            };
            UI_Map.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_Map.prototype._OnItemRender = function(cell, index) {
                var currentCount = this._totalCount - index;
                var getConfig = GlobalUnit_1.default.mapManager.GetConfig(currentCount);
                if (getConfig != null) {
                    var isUnlocked = GlobalUnit_1.default.mapManager.CheckUnlocked(currentCount);
                    cell.getChildByName("img_item").getChildByName("img_icon").skin = getConfig.icon_path;
                    cell.getChildByName("img_item").getChildByName("img_icon").visible = true;
                    cell.getChildByName("img_item").getChildByName("img_lock").visible = !isUnlocked;
                    cell.getChildByName("img_item").getChildByName("img_coming").visible = false;
                    cell.getChildByName("img_item").getChildByName("text_name").text = getConfig.scene_name;
                    cell.getChildByName("img_item").getChildByName("text_name").visible = true;
                    var getTime = GlobalUnit_1.default.dataManager.GetFastScore(getConfig.scene_key);
                    var timeStr = getTime > 100 ? getTime.toFixed(1) : getTime.toFixed(2);
                    var label0 = cell.getChildByName("img_time_bg").getChildByName("text_time");
                    label0.text = timeStr;
                    
                    label0.width = label0.textField.textWidth + 2;
                    var label1 = cell.getChildByName("img_time_bg").getChildByName("text_label");
                    label1.width = label1.textField.textWidth + 2;
                    var label2 = cell.getChildByName("img_time_bg").getChildByName("text_label2");
                    label2.width = label2.textField.textWidth + 2;
                    label1.color = "#000000";
                    var allWidth = label0.width + label1.width + label2.width;
                    label1.x = (250 - allWidth) / 2;
                    label0.x = label1.x + label1.width + 35;
                    label2.x = label0.x + label0.width - 25;
                    cell.getChildByName("img_time_bg").visible = true;
                    if (isUnlocked) {
                        cell.getChildByName("img_item").getChildByName("img_new").visible = GlobalUnit_1.default.dataManager.IsMapNew(getConfig.scene_key);
                    } else {
                        cell.getChildByName("img_item").getChildByName("img_new").visible = false;
                        label1.text = getConfig.intro_str;
                        label1.width = label1.textField.width;
                        label1.x = 15;
                        label1.color = "#ff0000";
                        label0.changeText("");
                        label2.changeText("");
                        if (getConfig.intro_str == "") {
                            cell.getChildByName("img_time_bg").visible = false;
                        }
                    }
                } else {
                    cell.getChildByName("img_item").getChildByName("img_icon").visible = false;
                    cell.getChildByName("img_item").getChildByName("img_lock").visible = false;
                    cell.getChildByName("img_item").getChildByName("img_coming").visible = true;
                    cell.getChildByName("img_item").getChildByName("text_name").visible = false;
                    cell.getChildByName("img_time_bg").visible = false;
                    cell.getChildByName("img_item").getChildByName("img_new").visible = false;
                }
            };
            UI_Map.prototype._OnClickBack = function() {
                GlobalUnit_1.default.dataManager.MarkMapOld();
                this.HideUI();
                GlobalUnit_1.default.uiRoot.ui_main.map_tip.visible = false;
            };
            return UI_Map;
        }(LTUI_1.default);
        exports.default = UI_Map;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    135: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var Resdefine_1 = require("../common/Resdefine");
        var LTUtils_1 = require("../LTGame/LTUtils/LTUtils");
        var GameConst_1 = require("../common/GameConst");
        var UIMatchCmp_1 = require("./Cmp/UIMatchCmp");
        var ADManager_1 = require("../manager/ADManager");
        var UI_BottomAd_1 = require("./UI_BottomAd");
        var UI_Match = function(_super) {
            __extends(UI_Match, _super);
            function UI_Match() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_Match.prototype._EmptyHandle = function() {};
            UI_Match.prototype.onEnable = function() {
                UI_BottomAd_1.default.HideBottom();
                if (this.isSingle == null) 
                {
                    this.isSingle = true;
                    this.single_match = this.FindCMP("content_bg", UIMatchCmp_1.default);
                    this.multi_match = this.FindCMP("img_vs", Laya.UIComponent);
                    this.multi_match_blue = this.FindCMP("img_vs/team_blue", UIMatchCmp_1.default);
                    this.multi_match_red = this.FindCMP("img_vs/team_red", UIMatchCmp_1.default);
                    this.icon_sample.visible = false;
                    this.img_bg.on(Laya.Event.CLICK, this, this._EmptyHandle);
                    this.multi_match.visible = false;
                    this.single_match.InitBaseIcons(4, 3, 32, 107, 130, 130);
                    this.multi_match_blue.InitBaseIcons(3, 2, 75, 107, 150, 140);
                    this.multi_match_red.InitBaseIcons(3, 2, 75, 107, 150, 140);
                    
                }
                this.isSingle = this.openData.isSingle;
                this._isModelLoaded = false;
                this._GenAllIcon();
                this._StartLoad();
                this._visbleTime = new Date().getTime();
            };
            UI_Match.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_Match.prototype._OnUpdate = function() {
                if (this._totalCount >= GameConst_1.default.totalPlayerCount && this._isModelLoaded) {
                    GlobalUnit_1.default.gameManager.PreStart();
                    var passTime = (new Date().getTime() - this._visbleTime) / 1e3;
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "åŒ¹é…æ—¶é—´", passTime);
                }
            };
            UI_Match.prototype._GenAllIcon = function() {
                if (this.isSingle) {
                    this.single_match.visible = true;
                    this.multi_match.visible = false;
                    this.single_match.Reset();
                } else {
                    this.single_match.visible = false;
                    this.multi_match.visible = true;
                    this.multi_match_blue.Reset();
                    this.multi_match_red.Reset();
                }
            };
            UI_Match.prototype._StartLoad = function() {
                var loadUrs = [];
                var selfReadyPlayer;
                for (var _i = 0, _a = GlobalUnit_1.default.gameManager.readyPlayers; _i < _a.length; _i++) {
                    var readyPlayerData = _a[_i];
                    if (readyPlayerData.isSelf) {
                        selfReadyPlayer = readyPlayerData;
                        break;
                    }
                }
                this._totalCount = 1;
                if (this.isSingle) {
                    this.single_match.icons[0].SetImg(selfReadyPlayer.iconUrl);
                } else {
                    this._selfTeamId = selfReadyPlayer.teamId;
                    this.multi_match_blue.icons[0].SetImg(selfReadyPlayer.iconUrl);
                }
                var readyDatas = GlobalUnit_1.default.gameManager.readyPlayers;
                for (var _b = 0, readyDatas_1 = readyDatas; _b < readyDatas_1.length; _b++) {
                    var readyData = readyDatas_1[_b];
                    loadUrs.push(readyData.iconUrl);
                }
                var useZip = false;
                if (useZip) {
                    Laya.loader.load([ {
                        url: "res/mainpack.zip",
                        type: "plfb"
                    } ], Laya.Handler.create(this, function() {
                        var template = new Laya.Templet();
                        template.on(Laya.Event.COMPLETE, this, this._LoadModels);
                    }));
                } else {
                    this._LoadModels();
                }
                GlobalUnit_1.default.gameManager.Load2DAtMatch(loadUrs);
                Laya.loader.load(loadUrs, Laya.Handler.create(this, this._LoadEnd));
            };
            UI_Match.prototype._LoadModels = function() {
                var modelLoads = [];
                GlobalUnit_1.default.gameManager.LoadAtMatch(modelLoads);
                LTUtils_1.LTUtils.DownLoadFiles(modelLoads, Laya.Handler.create(this, this._ModelLoadEnd));
            };
            UI_Match.prototype._ModelLoadEnd = function() {
                GlobalUnit_1.default.effectManager.WarmUp();
                this._isModelLoaded = true;
            };
            UI_Match.prototype._LoadEnd = function() {
                if (this.isSingle) {
                    var searchIndex = 1;
                    for (var i = 0; i < GameConst_1.default.totalPlayerCount; ++i) {
                        var readyPlayerData = GlobalUnit_1.default.gameManager.readyPlayers[i];
                        if (!readyPlayerData.isSelf) {
                            var imgCmp = this.single_match.icons[searchIndex];
                            Laya.timer.once(MathEx_1.default.RandomInt(500, 2e3), this, this._SetImg, [ imgCmp, readyPlayerData ], false);
                            searchIndex++;
                        }
                    }
                } else {
                    var blueTeam = [];
                    var redTeam = [];
                    for (var i = 0; i < GameConst_1.default.totalPlayerCount; ++i) {
                        var readyPlayer = GlobalUnit_1.default.gameManager.readyPlayers[i];
                        if (readyPlayer.isSelf) {
                            continue;
                        }
                        if (readyPlayer.teamId == this._selfTeamId) {
                            blueTeam.push(readyPlayer);
                        } else {
                            redTeam.push(readyPlayer);
                        }
                    }
                    for (var i = 0; i < blueTeam.length; ++i) {
                        var readyData = blueTeam[i];
                        var imgCmp = this.multi_match_blue.icons[i + 1];
                        Laya.timer.once(MathEx_1.default.RandomInt(500, 2e3), this, this._SetImg, [ imgCmp, readyData ], false);
                    }
                    for (var i = 0; i < redTeam.length; ++i) {
                        var readyData = redTeam[i];
                        var imgCmp = this.multi_match_red.icons[i];
                        Laya.timer.once(MathEx_1.default.RandomInt(500, 2e3), this, this._SetImg, [ imgCmp, readyData ], false);
                    }
                }
            };
            UI_Match.prototype._SetImg = function(cmp, playerReadyData) {
                cmp.SetImg(playerReadyData.iconUrl);
                this._totalCount++;
            };
            return UI_Match;
        }(LTUI_1.default);
        exports.default = UI_Match;
    }, {
        "../LTGame/LTUtils/LTUtils": 35,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GameConst": 55,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76,
        "./UI_BottomAd": 121,
        "./Cmp/UIMatchCmp": 111
    } ],
    136: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var UI_BottomAd_1 = require("./UI_BottomAd");
        var UI_MoreGame = function(_super) {
            __extends(UI_MoreGame, _super);
            function UI_MoreGame() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.identifyId = 41;
                _this._identifyStr = "moreGame_Friend";
                _this._scrollTime = 3e3;
                _this.sortOrder = 99;
                return _this;
            }
            UI_MoreGame.prototype.onAwake = function() {
                this.listFriend.hScrollBarSkin = "";
                this.listFriend.selectEnable = true;
                this.listFriend.selectHandler = Laya.Handler.create(this, this._OnClick, null, false);
                this.listFriend.renderHandler = Laya.Handler.create(this, this._OnRender, null, false);
                this.listFriend.mouseHandler = Laya.Handler.create(this, this._OnMove, null, false);
                this.btnReturn.on(Laya.Event.CLICK, this, this.btnReturnHandler);
                this.listHot.vScrollBarSkin = "";
                this.listHot.selectEnable = true;
                this.listHot.selectHandler = Laya.Handler.create(this, this._OnClickHot, null, false);
                this.listHot.renderHandler = Laya.Handler.create(this, this._OnRenderHot, null, false);
                this.listHot.scrollBar.elasticDistance = 110;
            };
            UI_MoreGame.prototype.onEnable = function() {
                if (this.openData) {
                    this.identifyId = 10;
                } else {
                    this.identifyId = 41;
                }
                this._ShowBottom();
                this.getHotAds();
                UI_BottomAd_1.default.HideBottom();
            };
            UI_MoreGame.prototype.btnReturnHandler = function() {
                this.HideUI();
                UI_BottomAd_1.default.ShowBottom();
            };
            UI_MoreGame.prototype.onUpdate = function() {
                if (!this.visible) return;
                this._idleTime -= Laya.timer.delta;
                if (this._idleTime < 0) {
                    if (this._showAds && this._showAds.length > 0) {
                        this._ScrollNext();
                    }
                }
            };
            UI_MoreGame.prototype._ScrollNext = function() {
                this._idleTime = this._scrollTime;
                this._currentIndex++;
                this.listFriend.tweenTo(this._currentIndex, 300, Laya.Handler.create(this, this._OnScrollEnd));
            };
            UI_MoreGame.prototype._OnScrollEnd = function() {
                while (this._currentIndex > 0) {
                    this._currentIndex--;
                    var newItem = this._showAds.shift();
                    this._showAds.push(newItem);
                }
                this._RefreshAd();
                this.listFriend.scrollTo(this._currentIndex);
            };
            UI_MoreGame.prototype.getHotAds = function() {
            };
            UI_MoreGame.prototype._ShowBottom = function() {
                this._showAds = MatterManager_1.default.inst.applyMatter(this._identifyStr, this.identifyId, 3);
                if (this._showAds == null) return;
                if (this._showAds.length <= 0) return;
                this._idleTime = this._scrollTime;
                this._currentIndex = 0;
                this._RefreshAd();
                this.listFriend.scrollTo(this._currentIndex);
                this.visible = true;
                MatterManager_1.default.inst.showMatter(this._identifyStr, this.identifyId, this._showAds);
            };
            UI_MoreGame.prototype._OnRender = function(item, index) {
                MatterManager_1.default.inst.showMatter(this._identifyStr, this.identifyId, [ this._showAds[index] ]);
            };
            UI_MoreGame.prototype._OnRenderHot = function(item, index) {
                MatterManager_1.default.inst.showMatter(this._identifyStr, this.identifyId, [ this._showAds[index] ]);
            };
            UI_MoreGame.prototype._RefreshAd = function() {
                var dataSource = [];
                for (var i = 0; i < this._showAds.length; ++i) {
                    var adData = this._showAds[i];
                    var data = {
                        imgIcoFriend: {
                            skin: adData.icon
                        },
                        labNameFriend: {
                            text: adData.name
                        },
                        imgRedFriend: {
                            visible: adData.dot == 1
                        }
                    };
                    dataSource.push(data);
                }
                this.listFriend.dataSource = dataSource;
                this.listFriend.refresh();
            };
            UI_MoreGame.prototype.setListHot = function() {
                var dataSource = [];
                for (var i = 0; i < this._showAdsHot.length; ++i) {
                    var adData = this._showAdsHot[i];
                    var data = {
                        imgIcoHot: {
                            skin: adData.icon
                        },
                        labGameName: {
                            text: adData.name
                        },
                        imgRedHot: {
                            visible: adData.dot == 1
                        },
                        labPlayerNum: {
                            text: adData.count + "äººçŽ©"
                        }
                    };
                    dataSource.push(data);
                }
                this.listHot.dataSource = dataSource;
                this.listHot.refresh();
            };
            UI_MoreGame.prototype._OnMove = function(e, index) {
                this._currentIndex = index + 1;
                this._idleTime = this._scrollTime;
            };
            UI_MoreGame.prototype._OnClick = function(index) {
                if (this._showAds && this._showAds.length > index && index >= 0) {
                    var adData = this._showAds[index];
                    MatterManager_1.default.inst.onClick(adData);
                }
            };
            UI_MoreGame.prototype._OnClickHot = function(index) {
                if (this._showAdsHot && this._showAdsHot.length > index && index >= 0) {
                    var adData = this._showAdsHot[index];
                    MatterManager_1.default.inst.onClick(adData);
                }
            };
            return UI_MoreGame;
        }(LTUI_1.default);
        exports.default = UI_MoreGame;
    }, {
        "../../module/manager/MatterManager": 7,
        "../LTGame/UIExt/LTUI": 41,
        "./UI_BottomAd": 121
    } ],
    137: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var UINameCmp_1 = require("./Cmp/UINameCmp");
        var UI_Name = function(_super) {
            __extends(UI_Name, _super);
            function UI_Name() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UI_Name.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_name = this;
                this._bindCmps = [];
                this._cacheTexts = [];
                this._nameCmp = this.head_info.getComponent(UINameCmp_1.default);
                this.visible = false;
            };
            UI_Name.prototype.onVisible = function() {
                this.head_info.visible = false;
            };
            UI_Name.prototype.onUnvisible = function() {
                this._bindCmps = [];
                for (var _i = 0, _a = this._cacheTexts; _i < _a.length; _i++) {
                    var singleText = _a[_i];
                    singleText.text_name.destroy(true);
                }
                this._cacheTexts = [];
            };
            UI_Name.prototype.GenNewName = function(playerCmp) {
                var newCmp = this._nameCmp.GenNew(playerCmp);
                newCmp.img_icon.skin = playerCmp.iconUrl;
                playerCmp.head_text = newCmp;
                this.owner.addChild(newCmp.owner);
                if (!GlobalUnit_1.default.gameManager.isSigleModel) {
                    if (playerCmp.teamId == GlobalUnit_1.default.mainPlayer.teamId) {
                        newCmp.SetColorHex("#add9ff", "#115c9d");
                    } else {
                        newCmp.SetColorHex("#ff6c6f", "#580000");
                    }
                } else {
                    newCmp.SetColorHex("#d3d3d3", "#424242");
                }
                this._bindCmps.push(playerCmp);
                this._cacheTexts.push(newCmp);
            };
            UI_Name.prototype.UpdateAllUIPos = function() {
                for (var _i = 0, _a = this._bindCmps; _i < _a.length; _i++) {
                    var playerCmp = _a[_i];
                    if (playerCmp.head_text == null) continue;
                    playerCmp.head_text.UpdatePos(GlobalUnit_1.default.followCamera.camera, playerCmp == GlobalUnit_1.default.mainPlayer ? false : true);
                }
            };
            return UI_Name;
        }(LTUI_1.default);
        exports.default = UI_Name;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "./Cmp/UINameCmp": 112
    } ],
    138: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var ADManager_1 = require("../manager/ADManager");
        var UI_QQGift = function(_super) {
            __extends(UI_QQGift, _super);
            function UI_QQGift() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_QQGift.prototype.onEnable = function() {
                this.btn_get.on(Laya.Event.CLICK, this, this._OnClickGet);
            };
            UI_QQGift.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_QQGift.prototype._OnClickGet = function() {
                GlobalUnit_1.default.dataManager.saveGiftData();
                GlobalUnit_1.default.uiRoot.ui_main.UpdateGiftState();
                this._OnClickClose();
            };
            UI_QQGift.prototype._OnClickClose = function() {
                this.HideUI();
            };
            return UI_QQGift;
        }(LTUI_1.default);
        exports.default = UI_QQGift;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    139: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var ADManager_1 = require("../manager/ADManager");
        var UI_QQSmGift = function(_super) {
            __extends(UI_QQSmGift, _super);
            function UI_QQSmGift() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                _this.oneRewardNum = 100;
                _this.maxRewardNum = 13;
                _this.curClickNum = 0;
                return _this;
            }
            UI_QQSmGift.prototype.onEnable = function() {
                ADManager_1.default.instance.HideBanner();
                this.btn_get.skin = "ui_qqgift/btn_kuaishudianji.png";
                this.btn_get.y = 1117;
                this.curClickNum = 0;
                this.btn_get.on(Laya.Event.CLICK, this, this._OnClickGet);
            };
            UI_QQSmGift.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_QQSmGift.prototype._OnClickGet = function() {
                this.curClickNum += 1;
                if (this.curClickNum == this.maxRewardNum) {
                    ADManager_1.default.instance.ShowBanner();
                    this.btn_get.skin = "ui_qqgift/sp_lingqulibao.png";
                    this.btn_get.x = 231;
                    this.btn_get.y = 890;
                    this.changeBtnInvite();
                } else if (this.curClickNum < this.maxRewardNum) {
                    this.btn_get.skin = "ui_qqgift/btn_kuaishudianji.png";
                    this.btn_get.x = 231;
                    this.btn_get.y = 1117;
                    this.changeBtnInvite();
                } else {
                    this._OnClickClose();
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_qqsmgiftget.prefab", {
                        isDead: this.openData,
                        coinNum: this.maxRewardNum * this.oneRewardNum
                    });
                }
            };
            UI_QQSmGift.prototype._OnClickClose = function() {
                this.HideUI();
            };
            UI_QQSmGift.prototype.changeBtnInvite = function() {
                this.imgGift.anchorX = .5;
                this.imgGift.anchorY = .5;
                this.toBig(this.imgGift);
            };
            UI_QQSmGift.prototype.toBig = function(btn) {
                Laya.Tween.to(btn, {
                    scaleX: 1.2,
                    scaleY: 1.2
                }, 300, Laya.Ease.linearIn, Laya.Handler.create(this, this.toSmall, [ btn ]));
            };
            UI_QQSmGift.prototype.toSmall = function(btn) {
                Laya.Tween.to(btn, {
                    scaleX: 1,
                    scaleY: 1
                }, 300, Laya.Ease.linearIn, Laya.Handler.create(this, null, [ btn ]));
            };
            return UI_QQSmGift;
        }(LTUI_1.default);
        exports.default = UI_QQSmGift;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    140: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var ADManager_1 = require("../manager/ADManager");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var UI_QQSmGiftGet = function(_super) {
            __extends(UI_QQSmGiftGet, _super);
            function UI_QQSmGiftGet() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_QQSmGiftGet.prototype.onEnable = function() {
                this._GenCoins();
                this.btn_get.on(Laya.Event.CLICK, this, this._OnClickGet);
                this.labCoin.text = this.openData.coinNum + "";
            };
            UI_QQSmGiftGet.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_QQSmGiftGet.prototype._OnClickGet = function() {
                GlobalUnit_1.default.dataManager.coinCount += this.openData.coinNum;
                GlobalUnit_1.default.dataManager.Save();
                GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                this.ShowGetCoin();
            };
            UI_QQSmGiftGet.prototype._OnClickClose = function() {
                this.HideUI();
                GlobalUnit_1.default.uiRoot.ui_end.ShowEnd(this.openData.isDead);
            };
            UI_QQSmGiftGet.prototype._GenCoins = function() {
                if (this._genCoinList == null) {
                    this._genCoinList = [];
                    for (var i = 0; i < 10; ++i) {
                        var cloneCoin = new Laya.Image();
                        cloneCoin.skin = "ui_main/sp_jinbi.png";
                        cloneCoin.centerX = 0;
                        cloneCoin.centerY = 0;
                        this.owner.addChild(cloneCoin);
                        this._genCoinList.push(cloneCoin);
                        cloneCoin.visible = false;
                    }
                }
            };
            UI_QQSmGiftGet.prototype.ShowGetCoin = function() {
                for (var _i = 0, _a = this._genCoinList; _i < _a.length; _i++) {
                    var coin = _a[_i];
                    coin.x = Laya.stage.width / 2;
                    coin.y = Laya.stage.height / 2;
                    var targetX = Laya.stage.width / 2 + MathEx_1.default.Random(-100, 100);
                    var targetY = Laya.stage.height / 2 + MathEx_1.default.Random(-100, 100);
                    var distance = Math.sqrt(Math.pow(targetX - coin.x, 2) + Math.pow(targetY - coin.y, 2));
                    Laya.Tween.to(coin, {
                        x: targetX,
                        y: targetY
                    }, distance * 5, Laya.Ease.quadInOut, Laya.Handler.create(this, this._MoveToCoin, [ coin ], true), 1);
                    coin.visible = true;
                }
                this.visible = true;
                Laya.timer.once(2e3, this, this._OnClickClose);
            };
            UI_QQSmGiftGet.prototype._MoveToCoin = function(coinImg) {
                var cacheX = 0;
                var cacheY = 0;
                var distance = Math.sqrt(Math.pow(cacheX - coinImg.x, 2) + Math.pow(cacheY - coinImg.y, 2));
                Laya.Tween.to(coinImg, {
                    x: cacheX,
                    y: cacheY
                }, distance * .5, Laya.Ease.linearIn, Laya.Handler.create(this, this._HideCoin, [ coinImg ]));
            };
            UI_QQSmGiftGet.prototype._HideCoin = function(coinImg) {
                coinImg.removeSelf();
                coinImg.destroy(true);
            };
            return UI_QQSmGiftGet;
        }(LTUI_1.default);
        exports.default = UI_QQSmGiftGet;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    141: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var ADManager_1 = require("../manager/ADManager");
        var UI_Rank = function(_super) {
            __extends(UI_Rank, _super);
            function UI_Rank() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_Rank.prototype.onAwake = function() {
                this.btn_close.on(Laya.Event.CLICK, this, this._OnClickClose);
                this.btn_next.on(Laya.Event.CLICK, this, this._OnClickBehind);
                this.btn_pre.on(Laya.Event.CLICK, this, this._OnClickPre);
            };
            UI_Rank.prototype.onEnable = function() {
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_WX || SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    this.text_notice.visible = false;
                    SDKManager_1.default.inst.sdk.postMsg({
                        method: "showFriendRank",
                        userId: SDKManager_1.default.inst.openID,
                        index: 1,
                        pageNum: 7
                    });
                    Laya.timer.once(500, this, function() {
                        SDKManager_1.default.inst.sdk.postMsg({
                            method: "showFriendRank",
                            userId: SDKManager_1.default.inst.openID,
                            index: 1,
                            pageNum: 7
                        });
                    });
                } else {
                    this.text_notice.visible = true;
                }
                ADManager_1.default.instance.ShowBanner();
            };
            UI_Rank.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_Rank.prototype._OnClickPre = function() {
                SDKManager_1.default.inst.sdk.postMsg({
                    method: "changePage",
                    userId: SDKManager_1.default.inst.openID,
                    page: -1,
                    pageNum: 7
                });
            };
            UI_Rank.prototype._OnClickBehind = function() {
                SDKManager_1.default.inst.sdk.postMsg({
                    method: "changePage",
                    userId: SDKManager_1.default.inst.openID,
                    page: 1,
                    pageNum: 7
                });
            };
            UI_Rank.prototype._OnClickClose = function() {
                this.HideUI();
            };
            return UI_Rank;
        }(LTUI_1.default);
        exports.default = UI_Rank;
    }, {
        "../../module/manager/SDKManager": 8,
        "../LTGame/UIExt/LTUI": 41,
        "../manager/ADManager": 76
    } ],
    142: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var UIRankIconCmp_1 = require("./Cmp/UIRankIconCmp");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var BHandler_1 = require("../../module/utils/BHandler");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var Resdefine_1 = require("../common/Resdefine");
        var UI_RankUpgrade = function(_super) {
            __extends(UI_RankUpgrade, _super);
            function UI_RankUpgrade() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_RankUpgrade.prototype.onAwake = function() {
                this.rankView = this.FindCMP("content_bg/img_rank", UIRankIconCmp_1.default);
                this.btn_close = this.FindCMP("content_bg/btn_close", Laya.View);
                this.text_hint = this.FindCMP("content_bg/text_hint", Laya.Label);
                this.btn_close.on(Laya.Event.CLICK, this, this._OnClickClose);
            };
            UI_RankUpgrade.prototype.onEnable = function() {
                var rankInfo = this.openData.rankInfo;
                this.rankView.UpdateImgs(rankInfo);
                this.text_hint.text = rankInfo.unlock_str;
                for (var i = 0; i < rankInfo.unlock_type.length; ++i) {
                    var unlockType = rankInfo.unlock_type[i];
                    var unlockValue = rankInfo.unlock_value[i];
                    switch (unlockType) {
                      case 2:
                        GlobalUnit_1.default.dataManager.UnlockSkin(unlockValue);
                        break;

                      case 1:
                        GlobalUnit_1.default.dataManager.MarkMapNew(unlockValue);
                        break;
                    }
                }
            };
            UI_RankUpgrade.prototype._OnClickShare = function() {
            };
            UI_RankUpgrade.prototype._OnShared = function(res) {
                console.log(res);
            };
            UI_RankUpgrade.prototype._OnClickClose = function() {
                this.HideUI();
            };
            return UI_RankUpgrade;
        }(LTUI_1.default);
        exports.default = UI_RankUpgrade;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "./Cmp/UIRankIconCmp": 116
    } ],
    143: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var UI_Ready = function(_super) {
            __extends(UI_Ready, _super);
            function UI_Ready() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._perCount = 800;
                return _this;
            }
            UI_Ready.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_ready = this;
                this.visible = false;
            };
            UI_Ready.prototype.onVisible = function() {
                this.img_3.visible = true;
                this.img_2.visible = false;
                this.img_1.visible = false;
                this.img_go.visible = false;
            };
            UI_Ready.prototype.StartReady = function() {
                GlobalUnit_1.default.followCamera.StartFollow();
                Laya.timer.once(this._perCount, this, this._Num2);
            };
            UI_Ready.prototype._Num2 = function() {
                this.img_3.visible = false;
                this.img_2.visible = true;
                Laya.timer.once(this._perCount, this, this._Num1);
            };
            UI_Ready.prototype._Num1 = function() {
                this.img_2.visible = false;
                this.img_1.visible = true;
                Laya.timer.once(this._perCount, this, this._Go);
            };
            UI_Ready.prototype._Go = function() {
                this.img_1.visible = false;
                this.img_go.visible = true;
                GlobalUnit_1.default.gameManager.StartGame();
                Laya.timer.once(this._perCount, this, this._Start);
            };
            UI_Ready.prototype._Start = function() {
                this.visible = false;
            };
            return UI_Ready;
        }(LTUI_1.default);
        exports.default = UI_Ready;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56
    } ],
    144: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var MatterManager_1 = require("../../module/manager/MatterManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var UI_RebornAd = function(_super) {
            __extends(UI_RebornAd, _super);
            function UI_RebornAd() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._identifyId = 39;
                _this._idStr = "fh";
                return _this;
            }
            UI_RebornAd.prototype.onAwake = function() {
                UI_RebornAd._instance = this;
                // this.showList.selectEnable = true;
                this.showList.renderHandler = Laya.Handler.create(this, this._OnClick, null, false);
                this.visible = false;
            };
            UI_RebornAd.prototype._ShowAD = function() {
                var getAds = MatterManager_1.default.inst.applyMatter(this._idStr, this._identifyId);
                this._showAds = [];
                for (var i = 0; i < 8 && i < getAds.length; ++i) {
                    this._showAds.push(getAds[i]);
                }
                this._RefreshAd();
                this.visible = true;
                // MatterManager_1.default.inst.showMatter(this._idStr, this._identifyId, this._showAds);
            };
            UI_RebornAd.prototype._RefreshAd = function() {
                var dataSource = [];
                for (var i = 0; i < this._showAds.length; ++i) {
                    var ad = this._showAds[i];
                    var data = {
                        id:ad.id,
                        img_icon: {
                            skin: ad.thumb
                        },
                        text_name: {
                            text: ad.name
                        }
                    };
                    dataSource.push(data);
                }
                this.showList.dataSource = dataSource;
                this.showList.refresh();
            };
            UI_RebornAd.prototype._HideAD = function() {
                this.visible = false;
                MatterManager_1.default.inst.hideMatter(this._idStr, this._identifyId);
            };
            UI_RebornAd.ShowAD = function() {
                if (this._instance == null) return;
                this._instance._ShowAD();
            };
            UI_RebornAd.HideAD = function() {
                if (this._instance == null) return;
                this._instance._HideAD();
            };
            UI_RebornAd.prototype._OnClick = function(item,index) {
                item.offAll(Laya.Event.MOUSE_DOWN);
                item.on(Laya.Event.MOUSE_DOWN,this,()=>{
                    platform.getInstance().navigate("REVIVE","MORE",item.dataSource.id);
                });
                // var _this = this;
                // var adData = this._showAds[index];
                // console.log(adData);
                // MatterManager_1.default.inst.onClick(adData, BHandler_1.default.create(this, function(bool) {
                //     if (!bool) {
                //         _this.openMoreGamePanel();
                //     }
                // }));
            };
            UI_RebornAd.prototype.openMoreGamePanel = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_moregame.prefab");
            };
            return UI_RebornAd;
        }(LTUI_1.default);
        exports.default = UI_RebornAd;
    }, {
        "../../module/manager/MatterManager": 7,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56
    } ],
    145: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var Bd_1 = require("../../module/sdk/baidu/Bd");
        var DispatcherMrg_1 = require("../../module/manager/DispatcherMrg");
        var UI_Record = function(_super) {
            __extends(UI_Record, _super);
            function UI_Record() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UI_Record.prototype.onAwake = function() {
                GlobalUnit_1.default.uiRoot.ui_record = this;
                this.img_start = this.FindCMP("img_bg/img_start", Laya.Image);
                this.img_stop = this.FindCMP("img_bg/img_stop", Laya.Image);
                this.img_start.on(Laya.Event.CLICK, this, this._OnClickStart);
                this.img_stop.on(Laya.Event.CLICK, this, this._OnClickStop);
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_Swan:
                    this.visible = Laya.Browser.onAndroid;
                    var ownerCmp = this.FindCMP("img_bg", Laya.Image);
                    SDKManager_1.default.inst.sdk.recommendationShow(15, 250);
                    break;

                  default:
                    this.visible = false;
                    break;
                }
                if (!this.visible) return;
                this.img_start.visible = true;
                this.img_stop.visible = false;
                DispatcherMrg_1.default.ins.on(Bd_1.default.Event_RecordStop, this, this._OnRecordEnd);
            };
            UI_Record.prototype._OnRecordEnd = function(url) {
                this.img_start.visible = true;
                this.img_stop.visible = false;
                console.log("å½•åˆ¶å®Œæˆå›žè°ƒ", url);
                SDKManager_1.default.inst.sdk.shareVideo(url, "åˆ†äº«è§†é¢‘");
            };
            UI_Record.prototype._OnClickStart = function() {
                console.log("è°ƒç”¨å¼€å§‹å½•åˆ¶");
                SDKManager_1.default.inst.sdk.recorder_Start();
                this.img_start.visible = false;
                this.img_stop.visible = true;
            };
            UI_Record.prototype._OnClickStop = function() {
                console.log("è°ƒç”¨åœæ­¢å½•åˆ¶");
                SDKManager_1.default.inst.sdk.recorder_Stop();
            };
            return UI_Record;
        }(LTUI_1.default);
        exports.default = UI_Record;
    }, {
        "../../module/manager/DispatcherMrg": 6,
        "../../module/manager/SDKManager": 8,
        "../../module/sdk/baidu/Bd": 14,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56
    } ],
    146: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var SignConfig_1 = require("../config/SignConfig");
        var ADManager_1 = require("../manager/ADManager");
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var CharactorConfig_1 = require("../config/CharactorConfig");
        var UI_SIgn = function(_super) {
            __extends(UI_SIgn, _super);
            function UI_SIgn() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_SIgn.prototype.onEnable = function() {
                GlobalUnit_1.default.dataManager.saveOpenSignEd(1);
                this.isNextDay();
                this.item_list.selectEnable = true;
                this.item_list.spaceX = 23;
                this.item_list.spaceY = 23;
                this.item_list.renderHandler = Laya.Handler.create(this, this._OnItemRender, null, false);
                this.item_list.selectHandler = Laya.Handler.create(this, this._OnItemSelect, null, false);
                this.btn_Close.on(Laya.Event.CLICK, this, this._OnClickClose);
                this.btn_get.on(Laya.Event.CLICK, this, this.btnGetHandler);
                this.btn_get_add.on(Laya.Event.CLICK, this, this.btnGetAddHandler);
                this.btn_No.on(Laya.Event.CLICK, this, this.btnNoHandler);
                var dataSource = [];
                var len = SignConfig_1.SignConfig.dataList.length;
                var datas = SignConfig_1.SignConfig.dataList;
                var charactorCfg;
                for (var i = 0; i < len - 1; ++i) {
                    var datas_1 = SignConfig_1.SignConfig.dataList;
                    var cfg = datas_1[i];
                    var imgStr = void 0;
                    if (cfg.gift_type == 1) {
                        imgStr = "ui_main/sp_jinbi.png";
                    } else if (cfg.gift_type == 2) {
                        charactorCfg = this.getCharactorConfig(cfg.gift_value);
                        imgStr = "roleicon/" + charactorCfg.icon_path;
                    } else if (cfg.gift_type == 3) {
                        imgStr = "ui_main/sp_fuhuokabg.png";
                    } else {
                        imgStr = "";
                    }
                    var data = {
                        id: cfg.id,
                        imgReward: {
                            skin: imgStr
                        },
                        labDay: {
                            text: "Day " + cfg.id
                        },
                        labReward: cfg.gift_type == 2 ? {
                            text: "skin"
                        } : {
                            text: cfg.gift_value + ""
                        },
                        gift_type: cfg.gift_type
                    };
                    dataSource.push(data);
                }
                this.item_list.dataSource = dataSource;
                this.item_list.refresh();
                ADManager_1.default.instance.ShowBanner();
                this.box_add.visible = false;
                this.changeShow();
            };
            UI_SIgn.prototype.imgVideoHandler = function() {
                this.isSeeVideo = !this.isSeeVideo;
                this.imgSelect.visible = this.isSeeVideo;
            };
            UI_SIgn.prototype.getCharactorConfig = function(id) {
                if (CharactorConfig_1.CharactorConfig.dataList) {
                    var len = CharactorConfig_1.CharactorConfig.dataList.length;
                    for (var i = 0; i < len; i++) {
                        var cfg = CharactorConfig_1.CharactorConfig.dataList[i];
                        if (cfg.id == id) {
                            return cfg;
                        }
                    }
                }
                return null;
            };
            UI_SIgn.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_SIgn.prototype._OnItemSelect = function(index) {};
            UI_SIgn.prototype._OnItemRender = function(cell, index) {
                if (cell.dataSource == null) {
                    cell.visible = false;
                } else {
                    cell.visible = true;
                    var isget = GlobalUnit_1.default.dataManager.isGetSignReward;
                    var day = GlobalUnit_1.default.dataManager.curSignDay;
                    if (day > cell.dataSource.id) {
                        cell.getChildByName("imgSign").visible = true;
                        cell.getChildByName("imgGray").visible = true;
                    } else if (day == cell.dataSource.id) {
                        if (isget) {
                            cell.getChildByName("imgSign").visible = true;
                            cell.getChildByName("imgGray").visible = true;
                        } else {
                            cell.getChildByName("imgSign").visible = false;
                            cell.getChildByName("imgGray").visible = false;
                        }
                    } else {
                        cell.getChildByName("imgSign").visible = false;
                        cell.getChildByName("imgGray").visible = false;
                    }
                    var img = cell.getChildByName("imgReward");
                    switch (cell.dataSource.gift_type) {
                      case 1:
                        img.x = 57;
                        img.y = 61;
                        img.width = 58;
                        img.height = 58;
                        break;

                      case 2:
                        img.x = 15;
                        img.y = 36;
                        img.width = 140;
                        img.height = 140;
                        break;

                      case 3:
                        img.x = 7;
                        img.y = 48;
                        img.width = 137;
                        img.height = 104;
                        break;
                    }
                }
            };
            UI_SIgn.prototype._OnUpdate = function() {};
            UI_SIgn.prototype.btnGetAddHandler = function() {
                ADManager_1.default.instance.ShowVideoAd("ç­¾åˆ°ç¦åˆ©ç•Œé¢", Laya.Handler.create(this, this._SeeSuc), null);
            };
            UI_SIgn.prototype._SeeSuc = function() {
                var len = SignConfig_1.SignConfig.dataList.length;
                var datas = SignConfig_1.SignConfig.dataList;
                var day = GlobalUnit_1.default.dataManager.curSignDay;
                for (var i = 0; i < len; ++i) {
                    var cfg = datas[i];
                    if (cfg.id == day) {
                        if (cfg.add_type == 1) {
                            GlobalUnit_1.default.dataManager.coinCount += cfg.add_value;
                        } else if (cfg.add_type == 2) {
                            GlobalUnit_1.default.dataManager.UnlockSkin(cfg.add_value);
                        } else if (cfg.add_type == 3) {
                            GlobalUnit_1.default.dataManager.rebornCardCount += cfg.add_value;
                            GlobalUnit_1.default.uiRoot.ui_main.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                        }
                        GlobalUnit_1.default.dataManager.Save();
                        GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                        GlobalUnit_1.default.uiRoot.ui_main.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                    }
                }
                this._OnClickClose();
            };
            UI_SIgn.prototype.btnNoHandler = function() {
                this._OnClickClose();
            };
            UI_SIgn.prototype.saveReward = function() {
                GlobalUnit_1.default.dataManager.isGetSignReward = true;
                var len = SignConfig_1.SignConfig.dataList.length;
                var datas = SignConfig_1.SignConfig.dataList;
                var day = GlobalUnit_1.default.dataManager.curSignDay;
                for (var i = 0; i < len; ++i) {
                    var cfg = datas[i];
                    if (cfg.id == day) {
                        if (cfg.gift_type == 1) {
                            GlobalUnit_1.default.dataManager.coinCount += cfg.gift_value;
                        } else if (cfg.gift_type == 2) {
                            GlobalUnit_1.default.dataManager.UnlockSkin(cfg.gift_value);
                        } else if (cfg.gift_type == 3) {
                            GlobalUnit_1.default.dataManager.rebornCardCount += cfg.gift_value;
                            GlobalUnit_1.default.uiRoot.ui_main.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                        }
                        GlobalUnit_1.default.dataManager.Save();
                        this.changeAddShow();
                        this.box_add.visible = true;
                        GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                        GlobalUnit_1.default.uiRoot.ui_main.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                        this.changeShow();
                        this.item_list.refresh();
                        return;
                    }
                }
            };
            UI_SIgn.prototype.btnGetHandler = function() {
                if (this.isSeeVideo) {
                    ADManager_1.default.instance.ShowVideoAd("å¤æ´»å¡è´­ä¹°ç•Œé¢", Laya.Handler.create(this, this.saveReward), null);
                } else {
                    this.saveReward();
                }
            };
            UI_SIgn.prototype._OnClickClose = function() {
                this.HideUI();
                GlobalUnit_1.default.uiRoot.ui_main.checkSign();
            };
            UI_SIgn.prototype.isNextDay = function() {
                var curDate = new Date();
                var lastDate = GlobalUnit_1.default.dataManager.lastSignLoginDate;
                if (!lastDate) {
                    GlobalUnit_1.default.dataManager.isGetSignReward = false;
                    GlobalUnit_1.default.dataManager.curSignDay = 1;
                    GlobalUnit_1.default.dataManager.Save();
                    GlobalUnit_1.default.dataManager.lastSignLoginDate = curDate.getMonth() + "$" + curDate.getDate();
                    return false;
                }
                var temp = lastDate.split("$");
                var lastMonth = Number(temp[0]);
                var lastDay = Number(temp[1]);
                var curMonth = curDate.getMonth();
                var curDay = curDate.getDate();
                if (curDay != lastDay || lastMonth != curMonth) {
                    if (GlobalUnit_1.default.dataManager.isGetSignReward) {
                        GlobalUnit_1.default.dataManager.curSignDay += 1;
                    }
                    GlobalUnit_1.default.dataManager.isGetSignReward = false;
                    GlobalUnit_1.default.dataManager.lastSignLoginDate = curDate.getMonth() + "$" + curDate.getDate();
                    GlobalUnit_1.default.dataManager.Save();
                    return true;
                }
                return false;
            };
            UI_SIgn.prototype.changeAddShow = function() {
                var charactorCfg;
                var datas = SignConfig_1.SignConfig.dataList;
                var day = GlobalUnit_1.default.dataManager.curSignDay;
                var cfg = datas[day - 1];
                var imgStr;
                if (cfg.add_type == 1) {
                    imgStr = "ui_main/sp_jinbi.png";
                } else if (cfg.add_type == 2) {
                    charactorCfg = this.getCharactorConfig(cfg.id);
                    imgStr = "add_type/" + charactorCfg.icon_path;
                } else if (cfg.gift_type == 3) {
                    imgStr = "ui_main/sp_fuhuokabg.png";
                } else {
                    imgStr = "";
                }
                this.img_change.skin = imgStr;
                var img = this.img_change;
                switch (cfg.add_type) {
                  case 1:
                    img.x = 130;
                    img.y = 112;
                    img.width = 130;
                    img.height = 130;
                    break;

                  case 2:
                    img.x = 49;
                    img.y = 38;
                    img.width = 300;
                    img.height = 300;
                    break;

                  case 3:
                    img.x = 20;
                    img.y = 55;
                    img.width = 307;
                    img.height = 232;
                    break;
                }
                this.lab_Reward_add.text = cfg.add_value.toFixed(0);
            };
            UI_SIgn.prototype.changeShow = function() {
                var bool = GlobalUnit_1.default.dataManager.isGetSignReward;
                this.btn_get.visible = !bool;
                this.lab_get.visible = bool;
            };
            return UI_SIgn;
        }(LTUI_1.default);
        exports.default = UI_SIgn;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../config/CharactorConfig": 61,
        "../config/SignConfig": 71,
        "../manager/ADManager": 76
    } ],
    147: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var CharactorConfig_1 = require("../config/CharactorConfig");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var BHandler_1 = require("../../module/utils/BHandler");
        var EUnlockType_1 = require("../common/EUnlockType");
        var RankConfig_1 = require("../config/RankConfig");
        var ADManager_1 = require("../manager/ADManager");
        var UI_Skin = function(_super) {
            __extends(UI_Skin, _super);
            function UI_Skin() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_Skin.prototype.onEnable = function() {
                if (this._pifuScene == null) {
                    this.img_bg = this.FindCMP("img_bg", Laya.View);
                    this.img_coin_bg = this.FindCMP("img_coin_bg", Laya.Image);
                    this._pifuScene = new Laya.Scene3D();
                    var prefab = this._pifuScene.addChild(Laya.loader.getRes(Resdefine_1.default.pifu_scene));
                    this._taiziObj = prefab.getChildByName("HS_taizi_01");
                    this._pifuObj = this._taiziObj.getChildByName("guadian_01");
                    Laya.stage.addChildAt(this._pifuScene, 0);
                    this._pifuScene.active = false;
                    this.item_list.hScrollBarSkin = "";
                    this.item_list.selectEnable = true;
                    this.item_list.renderHandler = Laya.Handler.create(this, this._OnItemRender, null, false);
                    this.item_list.selectHandler = Laya.Handler.create(this, this._OnItemSelect, null, false);
                    this.item_list.scrollBar.elasticDistance = 80;
                    this.btn_back.on(Laya.Event.CLICK, this, this._OnClickClose);
                    this.img_coin_unlock.on(Laya.Event.CLICK, this, this._OnClickBuy);
                    this.btn_watchad.on(Laya.Event.CLICK, this, this._OnClickWatchAd);
                    this.img_bg.on(Laya.Event.MOUSE_DOWN, this, this._OnMouseDown);
                    this.img_bg.on(Laya.Event.MOUSE_MOVE, this, this._OnMouseMove);
                    this.img_bg.on(Laya.Event.MOUSE_UP, this, this._OnMouseUp);
                    this._maxWidth = this.img_bg.width;
                    this.img_coin_bg.top += SDKManager_1.default.inst.sdk.sysOfy;
                }
                if (this._pifuObj == null) return;
                GlobalUnit_1.default.s3d.active = false;
                this._pifuScene.active = true;
                this._selectIndex = 0;
                this._currentShowId = 0;
                this._enterSelectId = GlobalUnit_1.default.dataManager.currentSkinId;
                var dataSource = [];
                for (var i = 0; i < CharactorConfig_1.CharactorConfig.dataList.length; ++i) {
                    var charactorConfig = CharactorConfig_1.CharactorConfig.dataList[i];
                    var data = {
                        img_icon: {
                            skin: "roleicon/" + charactorConfig.icon_path
                        },
                        text_name: {
                            text: charactorConfig.name
                        }
                    };
                    dataSource.push(data);
                    if (charactorConfig.id == GlobalUnit_1.default.dataManager.currentSkinId) {
                        this._selectIndex = i;
                        this._selectConfig = CharactorConfig_1.CharactorConfig.data[charactorConfig.id];
                    }
                }
                var len = CharactorConfig_1.CharactorConfig.dataList.length;
                for (var i = CharactorConfig_1.CharactorConfig.dataList.length; i < len + 2; ++i) {
                    var ndata = {
                        img_icon: {
                            skin: "roleicon/unknow.png"
                        },
                        text_name: {
                            text: ""
                        }
                    };
                    dataSource.push(ndata);
                }
                this.item_list.dataSource = dataSource;
                this.item_list.refresh();
                this._UpdateRole();
                this._isPressed = false;
                this._taiziObj.transform.localRotationEulerY = 0;
                ADManager_1.default.instance.ShowBanner();
            };
            UI_Skin.prototype.onDisable = function() {
                if (this._pifuObj == null) return;
                var skinConfig = CharactorConfig_1.CharactorConfig.data[GlobalUnit_1.default.dataManager.currentSkinId];
                if (this._enterSelectId != GlobalUnit_1.default.dataManager.currentSkinId) {
                    GlobalUnit_1.default.gameManager.UpdateMainPlayer(skinConfig);
                }
                GlobalUnit_1.default.mainPlayer.Init(skinConfig);
                GlobalUnit_1.default.dataManager.Save();
                GlobalUnit_1.default.s3d.active = true;
                this._pifuScene.active = false;
                ADManager_1.default.instance.HideBanner();
            };
            UI_Skin.prototype._OnMouseDown = function(event) {
                this._isPressed = true;
                this._lastStageX = event.stageX;
            };
            UI_Skin.prototype._OnMouseMove = function(event) {
                if (this._isPressed) {
                    var offset = event.stageX - this._lastStageX;
                    var offsetProgress = offset / this._maxWidth;
                    this._lastStageX = event.stageX;
                    this._taiziObj.transform.localRotationEulerY += offsetProgress * 180;
                }
            };
            UI_Skin.prototype._OnMouseUp = function(event) {
                this._isPressed = false;
            };
            UI_Skin.prototype._UpdateProgress = function(value) {
                this.img_progress_front.right = 270 * MathEx_1.default.Clamp01(1 - value);
            };
            UI_Skin.prototype._OnItemSelect = function(index) {
                var configItem = CharactorConfig_1.CharactorConfig.dataList[index];
                if (configItem == null) {
                    SDKManager_1.default.inst.sdk.showToast("æ•¬è¯·æœŸå¾…");
                    return;
                }
                if (GlobalUnit_1.default.dataManager.IsSkinUnlocked(configItem.id)) {
                    GlobalUnit_1.default.dataManager.currentSkinId = configItem.id;
                }
                this._selectIndex = index;
                this._selectConfig = configItem;
                this._UpdateRole();
                this.item_list.refresh();
            };
            UI_Skin.prototype._OnItemRender = function(cell, index) {
                if (CharactorConfig_1.CharactorConfig.dataList.length <= index) {
                    cell.getChildByName("img_use").visible = false;
                    cell.getChildByName("img_mask").visible = false;
                    cell.getChildByName("img_lock").visible = false;
                    cell.getChildByName("bottom_img").visible = false;
                    cell.getChildByName("sp_tip").visible = true;
                    cell.getChildByName("item_bg").skin = "ui_skin/sp_bg.png";
                } else {
                    var configItem = CharactorConfig_1.CharactorConfig.dataList[index];
                    cell.getChildByName("img_use").visible = configItem.id == GlobalUnit_1.default.dataManager.currentSkinId;
                    var img = cell.getChildByName("item_bg");
                    img.skin = configItem.id == GlobalUnit_1.default.dataManager.currentSkinId ? "ui_skin/bg1.png" : "ui_skin/sp_bg.png";
                    cell.getChildByName("img_mask").visible = !GlobalUnit_1.default.dataManager.IsSkinUnlocked(configItem.id);
                    cell.getChildByName("img_lock").visible = !GlobalUnit_1.default.dataManager.IsSkinUnlocked(configItem.id);
                    cell.getChildByName("bottom_img").visible = true;
                    cell.getChildByName("sp_tip").visible = false;
                }
                cell.getChildByName("img_select").visible = index == this._selectIndex;
            };
            UI_Skin.prototype._OnClickWatchAd = function() {

                platform.getInstance().showReward(()=>{
                    this._OnVideoFinished();
                });

            };
            UI_Skin.prototype._OnVideoFinished = function(res) {
                var currentProgress = GlobalUnit_1.default.dataManager.GetUnlockProgress(this._selectConfig.id);
                currentProgress++;
                if (currentProgress >= this._selectConfig.unlock_value) {
                    GlobalUnit_1.default.dataManager.UnlockSkin(this._selectConfig.id);
                } else {
                    GlobalUnit_1.default.dataManager.SetUnlockProgress(this._selectConfig.id, currentProgress);
                    GlobalUnit_1.default.dataManager.Save();
                }
                this._UpdateRole();
                this.item_list.refresh();
            };
            UI_Skin.prototype._OnClickBuy = function() {
                if (GlobalUnit_1.default.dataManager.coinCount < this._selectConfig.unlock_value) {
                    SDKManager_1.default.inst.sdk.showToast("é‡‘å¸ä¸è¶³");
                } else {
                    GlobalUnit_1.default.dataManager.coinCount -= this._selectConfig.unlock_value;
                    GlobalUnit_1.default.dataManager.UnlockSkin(this._selectConfig.id);
                    GlobalUnit_1.default.dataManager.currentSkinId = this._selectConfig.id;
                    SDKManager_1.default.inst.sdk.showToast("è´­ä¹°æˆåŠŸ");
                    this.item_list.refresh();
                    this._UpdateRole();
                }
            };
            UI_Skin.prototype._OnUpdate = function() {
                if (this._cacheAnimator == null) return;
                var currentState = this._cacheAnimator.getCurrentAnimatorPlayState();
                if (currentState != null) {
                    switch (this._cacheAnimStr) {
                      case Resdefine_1.default.anim_say_hello:
                        if (currentState.normalizedTime >= 1) {
                            this._PlayAnim(Resdefine_1.default.anim_stand_show);
                        }
                        break;

                      case Resdefine_1.default.anim_stand_show:
                        if (currentState.normalizedTime >= 2) {
                            this._PlayAnim(Resdefine_1.default.anim_stand_random);
                        }
                        break;

                      default:
                        if (currentState.normalizedTime >= 1) {
                            this._PlayAnim(Resdefine_1.default.anim_stand_show);
                        }
                        break;
                    }
                } else {
                    this._PlayAnim(Resdefine_1.default.anim_stand_random);
                }
            };
            UI_Skin.prototype._UpdateRole = function() {
                this.text_hint1.text = this._selectConfig.intro_str1;
                this.text_hint2.text = this._selectConfig.intro_str2;
                this.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                this.text_fly.text = this._selectConfig.fly_prop.toFixed(0);
                this.text_hit.text = this._selectConfig.hit_prop.toFixed(0);
                this.text_speed.text = this._selectConfig.speed_prop.toFixed(0);
                if (GlobalUnit_1.default.dataManager.IsSkinUnlocked(this._selectConfig.id)) {
                    this.img_unlock.visible = true;
                    this.img_progress_bg.visible = false;
                    this.img_coin_unlock.visible = false;
                    this.btn_watchad.visible = false;
                    this.text_unlock_text.visible = false;
                } else {
                    switch (this._selectConfig.unlock_type) {
                      case EUnlockType_1.EUnlockType.Coin:
                        this.img_unlock.visible = false;
                        this.img_progress_bg.visible = false;
                        this.img_coin_unlock.visible = true;
                        this.text_unlock_coin.text = this._selectConfig.unlock_value.toFixed(0);
                        this.btn_watchad.visible = false;
                        this.text_unlock_text.visible = false;
                        break;

                      case EUnlockType_1.EUnlockType.Gift:
                        this.img_unlock.visible = false;
                        this.text_unlock_text.visible = true;
                        this.text_unlock_text.text = "  æ”¶è—èŽ·å¾—";
                        this.img_progress_bg.visible = false;
                        this.btn_watchad.visible = false;
                        this.img_coin_unlock.visible = false;
                        break;

                      case EUnlockType_1.EUnlockType.AD:
                        this.img_unlock.visible = false;
                        this.text_unlock_text.visible = true;
                        this.text_unlock_text.text = "Get from ads";
                        this.img_progress_bg.visible = true;
                        this.img_coin_unlock.visible = false;
                        this.text_unlock_coin.text = this._selectConfig.unlock_value.toFixed(0);
                        this.btn_watchad.visible = true;
                        this.text_progress.text = GlobalUnit_1.default.dataManager.GetUnlockProgress(this._selectConfig.id).toFixed(0) + "/" + this._selectConfig.unlock_value.toFixed(0);
                        this._UpdateProgress(GlobalUnit_1.default.dataManager.GetUnlockProgress(this._selectConfig.id) / this._selectConfig.unlock_value);
                        break;

                      case EUnlockType_1.EUnlockType.Rank:
                        this.img_unlock.visible = false;
                        this.text_unlock_text.visible = true;
                        var rankConfig = RankConfig_1.RankConfig.data[this._selectConfig.unlock_value];
                        this.text_unlock_text.text = rankConfig.rank_name + rankConfig.rank_count_name + "è§£é”";
                        this.img_progress_bg.visible = false;
                        this.btn_watchad.visible = false;
                        this.img_coin_unlock.visible = false;
                        break;

                      case EUnlockType_1.EUnlockType.Sign:
                        this.img_unlock.visible = false;
                        this.text_unlock_text.visible = true;
                        this.text_unlock_text.text = "  Daily bonus to get";
                        this.img_progress_bg.visible = false;
                        this.btn_watchad.visible = false;
                        this.img_coin_unlock.visible = false;
                        break;

                      case EUnlockType_1.EUnlockType.Invite:
                        this.img_unlock.visible = false;
                        this.text_unlock_text.visible = true;
                        this.text_unlock_text.text = "  é‚€è¯·èŽ·å¾—";
                        this.img_progress_bg.visible = false;
                        this.btn_watchad.visible = false;
                        this.img_coin_unlock.visible = false;
                        break;

                      default:
                        console.error("æœªå¤„ç†çš„ç±»åž‹", this._selectConfig);
                        break;
                    }
                }
                if (this._currentShowId == this._selectConfig.id) {
                    return;
                }
                this._currentShowId = this._selectConfig.id;
                var modelPath = Resdefine_1.default.prefix + this._selectConfig.model_path + ".lh";
                this._cacheAnimator = null;
                Laya.loader.create(modelPath, Laya.Handler.create(this, this._OnLoaded));
            };
            UI_Skin.prototype._OnLoaded = function() {
                var modelPath = Resdefine_1.default.prefix + this._selectConfig.model_path + ".lh";
                var loadModel = Laya.loader.getRes(modelPath);
                SDKManager_1.default.inst.sdk.hideLoading();
                if (loadModel == null) return;
                if (this._skinObj != null) {
                    this._skinObj.destroy(true);
                }
                this._skinObj = Laya.Sprite3D.instantiate(loadModel);
                this._pifuObj.addChild(this._skinObj);
                this._skinObj.transform.localPosition = new Laya.Vector3(0, 0, 0);
                this._skinObj.transform.localRotationEuler = new Laya.Vector3(0, 0, 0);
                this._skinObj.transform.localScale = new Laya.Vector3(1, 1, 1);
                this._cacheAnimator = this._skinObj.getChildAt(0).getComponent(Laya.Animator);
                this._cacheAnimator.cullingMode = Laya.Animator.CULLINGMODE_ALWAYSANIMATE;
                this._PlayAnim(Resdefine_1.default.anim_say_hello);
            };
            UI_Skin.prototype._PlayAnim = function(animName) {
                this._cacheAnimator.play(animName);
                this._cacheAnimStr = animName;
            };
            UI_Skin.prototype._OnClickClose = function() {
                this.HideUI();
                GlobalUnit_1.default.uiRoot.ui_main.visible = true;
            };
            return UI_Skin;
        }(LTUI_1.default);
        exports.default = UI_Skin;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../common/EUnlockType": 54,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/CharactorConfig": 61,
        "../config/RankConfig": 68,
        "../manager/ADManager": 76
    } ],
    148: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var ADManager_1 = require("../manager/ADManager");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var Resdefine_1 = require("../common/Resdefine");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var UI_TryReborn = function(_super) {
            __extends(UI_TryReborn, _super);
            function UI_TryReborn() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                _this.showNum = 1;
                return _this;
            }
            UI_TryReborn.prototype.onAwake = function() {
                this.btn_close.on(Laya.Event.CLICK, this, this._OnClickClose);
                this.btn_try.on(Laya.Event.CLICK, this, this._OnClickTry);
            };
            UI_TryReborn.prototype.onEnable = function() {
                this._isSingle = this.openData.isSingle;
                this.text_count.text = "x" + this.showNum;
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    this.btn_try.skin = "ui_try_skin/btn_mianfeilingqu_share.png";
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    this.btn_try.skin = "ui_try_skin/btn_mianfeilingqu.png";
                    break;

                  default:
                    this.btn_try.skin = "ui_try_skin/btn_mianfeilingqu.png";
                    break;
                }
            };
            UI_TryReborn.prototype._OnClickClose = function() {
                this.HideUI();
                GlobalUnit_1.default.gameManager.StartMatch(this._isSingle, null);
            };
            UI_TryReborn.prototype._OnClickTry = function() {
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    SDKManager_1.default.inst.sdk.shareAppMessage(BHandler_1.default.create(this, this.onShareEd), {
                        titile: "åˆ†äº«æ¸¸æˆ"
                    });
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "è¯•ç”¨å¤æ´»å¡é¢†å–");
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    ADManager_1.default.instance.ShowVideoAd("å¤æ´»å¡ç•Œé¢", Laya.Handler.create(this, this._OnSuccess), null);
                    break;

                  default:
                    ADManager_1.default.instance.ShowVideoAd("å¤æ´»å¡ç•Œé¢", Laya.Handler.create(this, this._OnSuccess), null);
                    break;
                }
            };
            UI_TryReborn.prototype.onShareEd = function() {
                Laya.timer.scale = 1;
                var shareResult = GlobalUnit_1.default.shareManager.GetShareResult();
                if (shareResult) {
                    this._OnSuccess();
                } else {
                    var randomStr = MathEx_1.default.RandomInt(0, 100) > 50 ? "è¯·åˆ†äº«åˆ°ç¾¤" : "è¯·æ¢ä¸ªç¾¤è¯•è¯•";
                    SDKManager_1.default.inst.sdk.showToast(randomStr);
                    console.log("========AAAA===========", randomStr);
                }
            };
            UI_TryReborn.prototype._OnSuccess = function() {
                GlobalUnit_1.default.dataManager.rebornCardCount += this.showNum;
                SDKManager_1.default.inst.sdk.showToast("å¤æ´»å¡+" + this.showNum);
                GlobalUnit_1.default.dataManager.Save();
                GlobalUnit_1.default.uiRoot.ui_main.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                this.HideUI();
                this.isPopGetHintsPanel();
            };
            UI_TryReborn.prototype.isPopGetHintsPanel = function() {
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_getHints.prefab", {
                        type: 2,
                        rebornNum: this.showNum,
                        isStartGame: true,
                        isSingle: this._isSingle
                    });
                } else {
                    GlobalUnit_1.default.gameManager.StartMatch(this._isSingle, null);
                }
            };
            return UI_TryReborn;
        }(LTUI_1.default);
        exports.default = UI_TryReborn;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76
    } ],
    149: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var Resdefine_1 = require("../common/Resdefine");
        var ADManager_1 = require("../manager/ADManager");
        var UI_TrySkin = function(_super) {
            __extends(UI_TrySkin, _super);
            function UI_TrySkin() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_TrySkin.prototype.onAwake = function() {
                this.img_bg = this.FindCMP("img_bg", Laya.Image);
                this.btn_try.on(Laya.Event.CLICK, this, this._OnClickTry);
                this.btn_skip.on(Laya.Event.CLICK, this, this._OnClickSkip);
                this.img_bg.on(Laya.Event.CLICK, this, this._OnClickSkip);
            };
            UI_TrySkin.prototype.onEnable = function() {
                this._isSingle = this.openData.isSingle;
                this._skinConfig = this.openData.trySkin;
                this.text_name.text = this._skinConfig.name;
                this.text_intro.text = this._skinConfig.intro_str1;
                if (this._skinConfig.try_count > 0) {
                    var tryCount = this._skinConfig.try_count - GlobalUnit_1.default.dataManager.GetTryCount(this._skinConfig.id);
                    this.text_hint.text = tryCount.toFixed(0);
                    this.text_try_count_intro.visible = true;
                    this.text_hint.visible = true;
                } else {
                    this.text_try_count_intro.visible = false;
                    this.text_hint.visible = false;
                }
                this.img_icon.skin = "roleicon/" + this._skinConfig.icon_path;
                ADManager_1.default.instance.ShowBanner();
            };
            UI_TrySkin.prototype._OnClickSkip = function() {
                this.HideUI();
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_try_reborn.prefab", {
                    isSingle: this._isSingle
                });
            };
            UI_TrySkin.prototype._OnClickTry = function() {
                ADManager_1.default.instance.ShowVideoAd("çš®è‚¤è¯•ç”¨", Laya.Handler.create(this, this._OnSuccess), null);
            };
            UI_TrySkin.prototype._OnSuccess = function() {
                this.HideUI();
                this.isPopGetHintsPanel();
            };
            UI_TrySkin.prototype.isPopGetHintsPanel = function() {
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_getHints.prefab", {
                        type: 3,
                        skin: this.img_icon.skin,
                        skinName: this._skinConfig.name,
                        isSingle: this._isSingle,
                        skinconfig: this._skinConfig
                    });
                } else {
                    GlobalUnit_1.default.gameManager.StartMatch(this._isSingle, this._skinConfig);
                }
            };
            return UI_TrySkin;
        }(LTUI_1.default);
        exports.default = UI_TrySkin;
    }, {
        "../../module/manager/SDKManager": 8,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76
    } ],
    150: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var ADManager_1 = require("../manager/ADManager");
        var UI_Two11 = function(_super) {
            __extends(UI_Two11, _super);
            function UI_Two11() {
                var _this = _super.call(this) || this;
                _this.sortOrder = 2;
                _this.isget = false;
                _this.rewardCoin = 3e3;
                return _this;
            }
            UI_Two11.prototype.onEnable = function() {
                this.isget = false;
                this._GenCoins();
                this.btnGet.on(Laya.Event.CLICK, this, this.btnGetHandler);
                ADManager_1.default.instance.ShowBanner();
            };
            UI_Two11.prototype.onDisable = function() {
                var bool = GlobalUnit_1.default.dataManager.isGetSignReward;
                var day = GlobalUnit_1.default.dataManager.curSignDay;
                if (day >= 7 && bool) {} else {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_sign.prefab");
                }
                ADManager_1.default.instance.HideBanner();
            };
            UI_Two11.prototype.btnGetHandler = function() {
                if (!this.isget) {
                    this.isget = true;
                    this.ShowGetCoin();
                    GlobalUnit_1.default.dataManager.saveTwo11RewardStatus(1);
                    GlobalUnit_1.default.dataManager.coinCount += this.rewardCoin;
                    GlobalUnit_1.default.dataManager.Save();
                    GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                }
            };
            UI_Two11.prototype.closeView = function() {
                this.HideUI();
            };
            UI_Two11.prototype._GenCoins = function() {
                if (this._genCoinList == null) {
                    this._genCoinList = [];
                    for (var i = 0; i < 10; ++i) {
                        var cloneCoin = new Laya.Image();
                        cloneCoin.skin = "ui_main/sp_jinbi.png";
                        cloneCoin.centerX = 0;
                        cloneCoin.centerY = 0;
                        this.owner.addChild(cloneCoin);
                        this._genCoinList.push(cloneCoin);
                        cloneCoin.visible = false;
                    }
                }
            };
            UI_Two11.prototype.ShowGetCoin = function() {
                for (var _i = 0, _a = this._genCoinList; _i < _a.length; _i++) {
                    var coin = _a[_i];
                    coin.x = Laya.stage.width / 2;
                    coin.y = Laya.stage.height / 2;
                    var targetX = Laya.stage.width / 2 + MathEx_1.default.Random(-100, 100);
                    var targetY = Laya.stage.height / 2 + MathEx_1.default.Random(-100, 100);
                    var distance = Math.sqrt(Math.pow(targetX - coin.x, 2) + Math.pow(targetY - coin.y, 2));
                    Laya.Tween.to(coin, {
                        x: targetX,
                        y: targetY
                    }, distance * 5, Laya.Ease.quadInOut, Laya.Handler.create(this, this._MoveToCoin, [ coin ], true), 1);
                    coin.visible = true;
                }
                this.visible = true;
                Laya.timer.once(1500, this, this.closeView);
            };
            UI_Two11.prototype._MoveToCoin = function(coinImg) {
                var cacheX = 0;
                var cacheY = 0;
                var distance = Math.sqrt(Math.pow(cacheX - coinImg.x, 2) + Math.pow(cacheY - coinImg.y, 2));
                Laya.Tween.to(coinImg, {
                    x: cacheX,
                    y: cacheY
                }, distance * .5, Laya.Ease.linearIn, Laya.Handler.create(this, this._HideCoin, [ coinImg ]));
            };
            UI_Two11.prototype._HideCoin = function(coinImg) {
                coinImg.removeSelf();
                coinImg.destroy(true);
            };
            return UI_Two11;
        }(LTUI_1.default);
        exports.default = UI_Two11;
    }, {
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../manager/ADManager": 76
    } ],
    151: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var ADManager_1 = require("../manager/ADManager");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var APIManager_1 = require("../../module/manager/APIManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var WeekRankConfig_1 = require("../config/WeekRankConfig");
        var UI_Week = function(_super) {
            __extends(UI_Week, _super);
            function UI_Week() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_Week.prototype._SafeCheck = function() {
                if (this._selectMapIndex != null) {
                    return;
                }
                this._selectMapIndex = 0;
                this.list_map.hScrollBarSkin = "";
                var dataSource = [];
                this._cacheMaps = GlobalUnit_1.default.mapManager.keyMapList;
                var mapLength = this._cacheMaps.length;
                for (var i = 0; i < mapLength; ++i) {
                    var mapConfig = this._cacheMaps[i];
                    var data = {
                        img_icon: {
                            skin: mapConfig.icon_path
                        },
                        img_lock: {
                            visible: mapConfig.start_path == ""
                        },
                        text_name: {
                            text: mapConfig.scene_name
                        }
                    };
                    dataSource.push(data);
                }
                this.list_map.dataSource = dataSource;
                this.list_map.renderHandler = Laya.Handler.create(this, this._OnItemRender_Map, null, false);
                this.list_map.selectEnable = true;
                this.list_map.selectHandler = Laya.Handler.create(this, this._OnSelectItem_Map, null, false);
                this.list_rank.vScrollBarSkin = "";
            };
            UI_Week.prototype.onAwake = function() {
                this.btn_back.on(Laya.Event.CLICK, this, this._OnClickClose);
                this.btn_getReward.on(Laya.Event.CLICK, this, this._OnClickGet);
                this.btn_rule.on(Laya.Event.CLICK, this, this._OnClickRule);
            };
            UI_Week.prototype.onEnable = function() {
                this._SafeCheck();
                this._selectMapIndex = 0;
                var date1 = this.getDateByWeekDay(new Date(), 1, -1);
                var date2 = this.getDateByWeekDay(new Date(), 7, -1);
                this.text_time.text = this.getDateStr(date1) + "-" + this.getDateStr(date2);
                this.list_rank.visible = false;
                this.self_item.visible = false;
                this.no_data_hint.visible = false;
                this.btn_getReward.visible = false;
                this._RefreshList();
                ADManager_1.default.instance.ShowBanner();
            };
            UI_Week.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_Week.prototype.getDateStr = function(date, sign) {
                if (sign === void 0) {
                    sign = ".";
                }
                return date.getFullYear() + sign + (date.getMonth() + 1) + sign + date.getDate();
            };
            UI_Week.prototype.isNextWeek = function() {
                var curDate = new Date();
                var lastDate = GlobalUnit_1.default.dataManager.lastWeekRewardDate;
                if (!lastDate) {
                    GlobalUnit_1.default.dataManager.setWeekRankRewardsStatus(this.selectMapConfig.scene_key, false);
                    var date1_1 = this.getDateByWeekDay(curDate, 1, -1);
                    GlobalUnit_1.default.dataManager.lastWeekRewardDate = date1_1.getMonth() + "$" + date1_1.getDate();
                    return;
                }
                var temp = lastDate.split("$");
                var lastMonth = Number(temp[0]);
                var lastDay = Number(temp[1]);
                var date1 = this.getDateByWeekDay(curDate, 1, -1);
                var curMonth = date1.getMonth();
                var curDay = date1.getDate();
                if (curDay != lastDay) {
                    GlobalUnit_1.default.dataManager.setWeekRankRewardsStatus(this.selectMapConfig.scene_key, false);
                    GlobalUnit_1.default.dataManager.lastWeekRewardDate = date1.getMonth() + "$" + date1.getDate();
                    return;
                }
            };
            UI_Week.prototype.getDateByWeekDay = function(date, weekDay, dValue) {
                if (dValue === void 0) {
                    dValue = 0;
                }
                var oneDayTime = 24 * 60 * 60 * 1e3;
                date = new Date(date.getTime() + dValue * oneDayTime * 7);
                var curWeekDay = date.getDay();
                if (curWeekDay == weekDay) {
                    return date;
                } else if (curWeekDay > weekDay) {
                    var tempTime = date.getTime() - oneDayTime * (curWeekDay - weekDay);
                    var tempDate = new Date(tempTime);
                    return tempDate;
                } else {
                    var tempTime = date.getTime() + oneDayTime * (weekDay - curWeekDay);
                    var tempDate = new Date(tempTime);
                    return tempDate;
                }
            };
            UI_Week.prototype.sortFun = function(vo1, vo2) {
                if (Number(vo1.score) > Number(vo2.score)) {
                    return 1;
                } else {
                    return -1;
                }
            };
            UI_Week.prototype.sortFunQQ = function(vo1, vo2) {
                if (Number(vo1.index) > Number(vo2.index)) {
                    return 1;
                } else {
                    return -1;
                }
            };
            UI_Week.prototype.qqDataFun = function(res, self) {
                if (self === void 0) {
                    self = null;
                }
                if (res == null || res.length == 0) {
                    this.list_rank.visible = false;
                    this.self_item.visible = false;
                    this.no_data_hint.visible = true;
                } else {
                    var dataSource = [];
                    res.sort(this.sortFunQQ);
                    var len = res.length;
                    for (var i = 0; i < res.length && i < 50; ++i) {
                        var serverData = res[i];
                        var rankIconStr = "";
                        switch (i) {
                          case 0:
                            rankIconStr = "ui_main/btn_jinpai.png";
                            break;

                          case 1:
                            rankIconStr = "ui_main/btn_yingpai.png";
                            break;

                          case 2:
                            rankIconStr = "ui_main/btn_tongpaii.png";
                            break;
                        }
                        var temp = WeekRankConfig_1.WeekRankConfig.data[i + 1];
                        var data = {
                            img_rank: {
                                skin: rankIconStr
                            },
                            img_icon: {
                                skin: serverData.iconUrl
                            },
                            text_name: {
                                text: serverData.name
                            },
                            text_time: {
                                text: Number(serverData.score).toFixed(3) + "s"
                            },
                            text_rank: {
                                value: (i + 1).toFixed(0),
                                visible: i > 2
                            },
                            img_pack: {
                                visible: temp && temp.rmb_count > 0
                            }
                        };
                        dataSource.push(data);
                    }
                    this.list_rank.dataSource = dataSource;
                    this.list_rank.scrollTo(0);
                    this.list_rank.visible = true;
                    this.self_item.visible = true;
                    this.no_data_hint.visible = false;
                    this.selfData = null;
                    this.selfData = self;
                    this._UpdateSelf(self);
                }
                SDKManager_1.default.inst.sdk.hideLoading();
                this.chagneShow();
            };
            UI_Week.prototype.wxDataFun = function(res, selfData) {
                if (selfData === void 0) {
                    selfData = null;
                }
                if (res == null || res.length == 0) {
                    this.list_rank.visible = false;
                    this.self_item.visible = false;
                    this.no_data_hint.visible = true;
                } else {
                    var selfData_1;
                    var dataSource = [];
                    res.sort(this.sortFun);
                    var len = res.length;
                    for (var i = 0; i < res.length && i < 50; ++i) {
                        var serverData = res[i];
                        var rankIconStr = "";
                        if (serverData.id == SDKManager_1.default.inst.openID) {
                            selfData_1 = serverData;
                            selfData_1.rankCount = i + 1;
                        }
                        switch (i) {
                          case 0:
                            rankIconStr = "ui_main/btn_jinpai.png";
                            break;

                          case 1:
                            rankIconStr = "ui_main/btn_yingpai.png";
                            break;

                          case 2:
                            rankIconStr = "ui_main/btn_tongpaii.png";
                            break;
                        }
                        var data = {
                            img_rank: {
                                skin: rankIconStr
                            },
                            img_icon: {
                                skin: serverData.iconUrl
                            },
                            text_name: {
                                text: serverData.name
                            },
                            text_time: {
                                text: (serverData.score / 1e3).toFixed(3) + "s"
                            },
                            text_rank: {
                                value: (i + 1).toFixed(0),
                                visible: i > 2
                            },
                            img_pack: {
                                visible: i < 3
                            }
                        };
                        dataSource.push(data);
                    }
                    this.list_rank.dataSource = dataSource;
                    this.list_rank.scrollTo(0);
                    this.list_rank.visible = true;
                    this.self_item.visible = true;
                    this.no_data_hint.visible = false;
                    if (!selfData_1) {
                        var fastTime = GlobalUnit_1.default.dataManager.GetFastScore(GlobalUnit_1.default.roadManager.roadConifg.scene_key);
                        selfData_1 = {
                            index: 20,
                            score: fastTime
                        };
                    }
                    this._UpdateSelf(selfData_1);
                    this.selfData = null;
                    this.selfData = selfData_1;
                }
                SDKManager_1.default.inst.sdk.hideLoading();
                this.chagneShow();
            };
            UI_Week.prototype._OnDataLoaded = function(res, selfData) {
                if (selfData === void 0) {
                    selfData = null;
                }
                this.isNextWeek();
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    this.qqDataFun(res, selfData);
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    this.wxDataFun(res, selfData);
                    break;
                }
            };
            UI_Week.prototype._RefreshList = function() {
                var selectMapConfig = this._cacheMaps[this._selectMapIndex];
                this.selectMapConfig = selectMapConfig;
                this.text_name.text = selectMapConfig.scene_name;
                SDKManager_1.default.inst.sdk.showLoading("æ•°æ®è¯·æ±‚ä¸­");
                APIManager_1.default.inst.api.GetWeekScore(selectMapConfig.scene_key, BHandler_1.default.create(this, this._OnDataLoaded));
            };
            UI_Week.prototype._UpdateSelf = function(selfData) {
                if (selfData == null) {
                    this.self_item.visible = false;
                    return;
                }
                if (selfData.index > 50) {
                    this.self_item.getChildByName("text_rank").visible = false;
                    this.self_item.getChildByName("img_rank").visible = false;
                    this.self_item.getChildByName("img_unrank").visible = true;
                } else if (selfData.index > 3) {
                    this.self_item.getChildByName("text_rank").value = selfData.index.toFixed(0);
                    this.self_item.getChildByName("img_rank").visible = false;
                    this.self_item.getChildByName("img_unrank").visible = false;
                } else {
                    var rankIconStr = "";
                    switch (selfData.index) {
                      case 1:
                        rankIconStr = "ui_main/btn_jinpai.png";
                        break;

                      case 2:
                        rankIconStr = "ui_main/btn_yingpai.png";
                        break;

                      case 3:
                        rankIconStr = "ui_main/btn_tongpaii.png";
                        break;
                    }
                    this.self_item.getChildByName("img_rank").skin = rankIconStr;
                    this.self_item.getChildByName("text_rank").visible = false;
                    this.self_item.getChildByName("img_rank").visible = true;
                    this.self_item.getChildByName("img_unrank").visible = false;
                }
                var temp = WeekRankConfig_1.WeekRankConfig.data[selfData.index];
                this.self_item.getChildByName("img_pack").visible = temp && temp.rmb_count > 0;
                this.self_item.getChildByName("text_name").text = GlobalUnit_1.default.dataManager.userName;
                this.self_item.getChildByName("img_icon").text = GlobalUnit_1.default.dataManager.userIcon;
                this.self_item.getChildByName("text_time").text = selfData.score + "s";
            };
            UI_Week.prototype._OnSelectItem_Map = function(index) {
                if (index == this._selectMapIndex) return;
                var mapConfig = this._cacheMaps[index];
                if (mapConfig.start_path == "") return;
                this._selectMapIndex = index;
                this.list_map.refresh();
                this._RefreshList();
            };
            UI_Week.prototype._OnItemRender_Map = function(cell, index) {
                cell.getChildByName("img_map_bg_select").visible = this._selectMapIndex == index;
            };
            UI_Week.prototype._OnClickRule = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_week_rule.prefab");
            };
            UI_Week.prototype._OnClickClose = function() {
                this.HideUI();
            };
            UI_Week.prototype._OnClickGet = function() {
                GlobalUnit_1.default.ShowUI("ui_prefabs/ui_week_reward.prefab", this.selfData);
            };
            UI_Week.prototype.chagneShow = function() {
                if (this.selfData) {
                    var bool = void 0;
                    bool = GlobalUnit_1.default.dataManager.getWeekRankRewardStatus(this.selectMapConfig.scene_key);
                    if (bool) {
                        this.btn_getReward.visible = false;
                        this.text_status_tip.text = "æ‚¨å·²ç»é¢†å–è¿‡å¥–åŠ±äº†ï¼Œè¯·ä¸‹å‘¨å†æ¥å§~";
                    } else {
                        this.btn_getReward.visible = true;
                        this.text_status_tip.text = "";
                    }
                } else {
                    this.text_status_tip.text = "è¯¥åœ°å›¾ä¸Šå‘¨æ¯”èµ›æ¬¡æ•°ä¸è¶³,æ²¡æœ‰å¥–åŠ±å“¦~";
                    this.btn_getReward.visible = false;
                }
            };
            return UI_Week;
        }(LTUI_1.default);
        exports.default = UI_Week;
    }, {
        "../../module/manager/APIManager": 5,
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../config/WeekRankConfig": 73,
        "../manager/ADManager": 76
    } ],
    152: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var WeekRankConfig_1 = require("../config/WeekRankConfig");
        var UI_WeekMoney = function(_super) {
            __extends(UI_WeekMoney, _super);
            function UI_WeekMoney() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_WeekMoney.prototype.onAwake = function() {
                this.btn_ok.on(Laya.Event.CLICK, this, this._OnClickOK);
            };
            UI_WeekMoney.prototype.onEnable = function() {
                this.text_money.text = WeekRankConfig_1.WeekRankConfig.data[this.openData.index].rmb_count.toFixed(2);
                this.text_rank.text = "ç¬¬" + this.openData.index.toFixed(0) + "å";
                this.text_code.text = this.openData.authCode;
            };
            UI_WeekMoney.prototype._OnClickOK = function() {
                this.HideUI();
            };
            return UI_WeekMoney;
        }(LTUI_1.default);
        exports.default = UI_WeekMoney;
    }, {
        "../LTGame/UIExt/LTUI": 41,
        "../config/WeekRankConfig": 73
    } ],
    153: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var BHandler_1 = require("../../module/utils/BHandler");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var Resdefine_1 = require("../common/Resdefine");
        var WeekRankConfig_1 = require("../config/WeekRankConfig");
        var APIManager_1 = require("../../module/manager/APIManager");
        var UI_WeekReward = function(_super) {
            __extends(UI_WeekReward, _super);
            function UI_WeekReward() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_WeekReward.prototype.onAwake = function() {
                this.img_get.on(Laya.Event.CLICK, this, this._OnClickGet);
                this.img_share.on(Laya.Event.CLICK, this, this._OnClickShare);
            };
            UI_WeekReward.prototype.onEnable = function() {
                if (this.openData.index > 50) {
                    this.cfg = WeekRankConfig_1.WeekRankConfig.data[51];
                    this.text_rank.text = "æœªä¸Šæ¦œ";
                } else {
                    this.cfg = WeekRankConfig_1.WeekRankConfig.data[this.openData.index];
                    this.text_rank.text = "ç¬¬" + this.openData.index.toFixed(0) + "å";
                }
                this.text_coin.text = this.cfg.coin_count.toFixed(0);
            };
            UI_WeekReward.prototype._OnClickGet = function() {
                var bool;
                if (WeekRankConfig_1.WeekRankConfig.data && WeekRankConfig_1.WeekRankConfig.data[this.openData.index]) {
                    bool = WeekRankConfig_1.WeekRankConfig.data[this.openData.index].rmb_count > 0;
                }
                if (this.openData.authCode != null && this.openData.authCode != "" && bool) {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_week_money.prefab", this.openData);
                }
                if (this.cfg) {
                    switch (SDKManager_1.default.inst.platform) {
                      case SDKManager_1.default.PlaneForm_QQ:
                        this.qqDataFun();
                        break;

                      case SDKManager_1.default.PlaneForm_WX:
                        this.wxDataFun();
                        break;

                      default:
                        this.wxDataFun();
                        break;
                    }
                }
                this.HideUI();
            };
            UI_WeekReward.prototype.qqDataFun = function() {
                console.log("è¯·æ±‚å‘¨æŽ’è¡Œé¢†å–â€”â€”QQ");
                this.HideUI();
                APIManager_1.default.inst.api.upWeekRewardStatus(this.openData.mapId, this.openData.index, BHandler_1.default.create(this, this.qqRewardSuc));
            };
            UI_WeekReward.prototype.wxDataFun = function() {
                this.rewardSuc();
            };
            UI_WeekReward.prototype.qqRewardSuc = function(data) {
                if (data.code == 1) {
                    this.rewardSuc();
                } else if (data.code == -5e3) {
                    var uiWeek = GlobalUnit_1.default.GetUI("ui_prefabs/ui_week.prefab");
                    GlobalUnit_1.default.dataManager.setWeekRankRewardsStatus(uiWeek.selectMapConfig.scene_key, true);
                    GlobalUnit_1.default.dataManager.Save();
                    uiWeek.chagneShow();
                } else {
                    SDKManager_1.default.inst.sdk.showToast(data.msg, data.code);
                }
            };
            UI_WeekReward.prototype.rewardSuc = function() {
                var uiWeek = GlobalUnit_1.default.GetUI("ui_prefabs/ui_week.prefab");
                GlobalUnit_1.default.dataManager.coinCount += this.cfg.coin_count;
                GlobalUnit_1.default.dataManager.setWeekRankRewardsStatus(uiWeek.selectMapConfig.scene_key, true);
                GlobalUnit_1.default.dataManager.Save();
                GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                SDKManager_1.default.inst.sdk.showToast("é¢†å–æˆåŠŸ");
                uiWeek.chagneShow();
            };
            UI_WeekReward.prototype._OnClickShare = function() {
                SDKManager_1.default.inst.sdk.shareAppMessage(BHandler_1.default.create(this, this._OnShare), {
                    titile: "åˆ†äº«æ¸¸æˆ"
                });
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "ç‚¹å‡»ä¸»ç•Œé¢åˆ†äº«");
            };
            UI_WeekReward.prototype._OnShare = function(res) {
                console.log(res);
            };
            return UI_WeekReward;
        }(LTUI_1.default);
        exports.default = UI_WeekReward;
    }, {
        "../../module/manager/APIManager": 5,
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../config/WeekRankConfig": 73
    } ],
    154: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var UI_WeekRule = function(_super) {
            __extends(UI_WeekRule, _super);
            function UI_WeekRule() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                return _this;
            }
            UI_WeekRule.prototype.onAwake = function() {
                this.btn_close.on(Laya.Event.CLICK, this, this._OnClose);
            };
            UI_WeekRule.prototype._OnClose = function() {
                this.HideUI();
            };
            return UI_WeekRule;
        }(LTUI_1.default);
        exports.default = UI_WeekRule;
    }, {
        "../LTGame/UIExt/LTUI": 41
    } ],
    155: [ function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var LTUI_1 = require("../LTGame/UIExt/LTUI");
        var GlobalUnit_1 = require("../common/GlobalUnit");
        var SDKManager_1 = require("../../module/manager/SDKManager");
        var ADManager_1 = require("../manager/ADManager");
        var Resdefine_1 = require("../common/Resdefine");
        var BHandler_1 = require("../../module/utils/BHandler");
        var MathEx_1 = require("../LTGame/LTUtils/MathEx");
        var UI_buy_reborn = function(_super) {
            __extends(UI_buy_reborn, _super);
            function UI_buy_reborn() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.sortOrder = 2;
                _this.showNum = 1;
                _this.cost = 1e3;
                return _this;
            }
            UI_buy_reborn.prototype.onEnable = function() {
                this.setLabNum();
                this.labCost.text = this.cost + "";
                this.btn_close.on(Laya.Event.CLICK, this, this._OnClickClose);
                this.btn_video_get.on(Laya.Event.CLICK, this, this._OnVideoBtnCLick);
                this.btn_money_get.on(Laya.Event.CLICK, this, this._OnMoneyBtnCLick);
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    this.btn_video_get.skin = "ui_buy_reborn/btn_fenxianghuuode.png";
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    this.btn_video_get.skin = "ui_buy_reborn/btn_shipinhuode.png";
                    break;

                  default:
                    this.btn_video_get.skin = "ui_buy_reborn/btn_shipinhuode.png";
                    break;
                }
                this.updateBtnMoneyShow();
                ADManager_1.default.instance.ShowBanner();
            };
            UI_buy_reborn.prototype.onDisable = function() {
                ADManager_1.default.instance.HideBanner();
            };
            UI_buy_reborn.prototype._SeeSuc = function() {
                GlobalUnit_1.default.dataManager.rebornCardCount += this.showNum;
                this.setLabNum();
                GlobalUnit_1.default.dataManager.Save();
                SDKManager_1.default.inst.sdk.hideBannder();
                GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                GlobalUnit_1.default.uiRoot.ui_main.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                this.isPopGetHintsPanel();
            };
            UI_buy_reborn.prototype._OnVideoBtnCLick = function() {
                switch (SDKManager_1.default.inst.platform) {
                  case SDKManager_1.default.PlaneForm_QQ:
                    SDKManager_1.default.inst.sdk.shareAppMessage(BHandler_1.default.create(this, this.onShareEd), {
                        titile: "åˆ†äº«æ¸¸æˆ"
                    });
                    GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "åˆ†äº«èŽ·å¾—å¤æ´»å¡");
                    break;

                  case SDKManager_1.default.PlaneForm_WX:
                    ADManager_1.default.instance.ShowVideoAd("å¤æ´»å¡è´­ä¹°ç•Œé¢", Laya.Handler.create(this, this._SeeSuc), null);
                    break;

                  default:
                    ADManager_1.default.instance.ShowVideoAd("å¤æ´»å¡è´­ä¹°ç•Œé¢", Laya.Handler.create(this, this._SeeSuc), null);
                    break;
                }
            };
            UI_buy_reborn.prototype.onShareEd = function() {
                Laya.timer.scale = 1;
                var shareResult = GlobalUnit_1.default.shareManager.GetShareResult();
                if (shareResult) {
                    this._SeeSuc();
                } else {
                    var randomStr = MathEx_1.default.RandomInt(0, 100) > 50 ? "è¯·åˆ†äº«åˆ°ç¾¤" : "è¯·æ¢ä¸ªç¾¤è¯•è¯•";
                    SDKManager_1.default.inst.sdk.showToast(randomStr);
                }
            };
            UI_buy_reborn.prototype._OnMoneyBtnCLick = function() {
                GlobalUnit_1.default.dataManager.coinCount -= this.cost;
                GlobalUnit_1.default.dataManager.rebornCardCount += this.showNum;
                this.setLabNum();
                GlobalUnit_1.default.dataManager.Save();
                this.updateBtnMoneyShow();
                GlobalUnit_1.default.uiRoot.ui_main.text_coin.text = GlobalUnit_1.default.dataManager.coinCount.toFixed(0);
                GlobalUnit_1.default.uiRoot.ui_main.rebornTip.text_num.text = GlobalUnit_1.default.dataManager.rebornCardCount.toFixed(0);
                this.isPopGetHintsPanel();
                GlobalUnit_1.default.PostEvent(Resdefine_1.default.ID_MAIN_SCENE, "é‡‘å¸è´­ä¹°å¤æ´»å¡");
            };
            UI_buy_reborn.prototype.setLabNum = function() {
                this.labNum.text = this.showNum + "";
            };
            UI_buy_reborn.prototype._OnClickClose = function() {
                this.HideUI();
            };
            UI_buy_reborn.prototype.updateBtnMoneyShow = function() {
                var coin = GlobalUnit_1.default.dataManager.coinCount;
                this.btn_money_get.disabled = coin < this.cost;
            };
            UI_buy_reborn.prototype.isPopGetHintsPanel = function() {
                if (SDKManager_1.default.inst.platform == SDKManager_1.default.PlaneForm_QQ) {
                    GlobalUnit_1.default.ShowUI("ui_prefabs/ui_getHints.prefab", {
                        type: 2,
                        rebornNum: this.showNum,
                        isStartGame: false
                    });
                } else {
                    SDKManager_1.default.inst.sdk.showToast("å¤æ´»å¡+" + this.showNum);
                    this._OnClickClose();
                }
            };
            return UI_buy_reborn;
        }(LTUI_1.default);
        exports.default = UI_buy_reborn;
    }, {
        "../../module/manager/SDKManager": 8,
        "../../module/utils/BHandler": 23,
        "../LTGame/LTUtils/MathEx": 37,
        "../LTGame/UIExt/LTUI": 41,
        "../common/GlobalUnit": 56,
        "../common/Resdefine": 57,
        "../manager/ADManager": 76
    } ]
}, {}, [ 2 ]);

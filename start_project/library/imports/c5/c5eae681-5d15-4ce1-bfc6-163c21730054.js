"use strict";
cc._RF.push(module, 'c5eaeaBXRVM4b/GFjwhcwBU', 'Player');
// scripts/tsVersion/Player.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.jumpHeight = 0;
        _this.accel = 0;
        _this.jumpDuration = 0;
        _this.maxMoveSpeed = 0;
        _this.jumpAudio = null;
        _this.xSpeed = 0;
        _this.accLeft = false;
        _this.accRight = false;
        _this.jumpAction = null;
        return _this;
    }
    Player.prototype.start = function () {
        // jump action
        this.jumpAction = this.getJumpAction();
        this.node.runAction(this.jumpAction);
    };
    Player.prototype.update = function (dt) {
        if (this.accLeft)
            this.xSpeed -= this.accel * dt;
        else if (this.accRight)
            this.xSpeed += this.accel * dt;
        else if (Math.abs(this.xSpeed) > 0) // 无输入则减速
         {
            var curSpeed = this.xSpeed;
            curSpeed -= this.accel * Math.abs(curSpeed) / curSpeed * dt;
            if (curSpeed * this.xSpeed < 0)
                curSpeed = 0;
            this.xSpeed = curSpeed;
        }
        // 加速
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed)
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        this.node.x += this.xSpeed;
        // 边界
        var maxX = this.node.parent.width / 2;
        if (Math.abs(this.node.x) > maxX) {
            this.node.x = maxX * this.node.x / Math.abs(this.node.x);
            this.xSpeed = 0;
        }
    };
    Player.prototype.onDestroy = function () {
        this.bindEventListener(false);
    };
    Player.prototype.getJumpAction = function () {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var jumpActionCallback = cc.callFunc(this.playJumpAudio, this); // 回调:播放跳跃音效
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, jumpActionCallback));
    };
    Player.prototype.playJumpAudio = function () {
        cc.audioEngine.play(this.jumpAudio, false, 1);
    };
    Player.prototype.bindEventListener = function (status) {
        if (status) {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        else {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    };
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "accel", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Player.prototype, "jumpAudio", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.Player = Player;

cc._RF.pop();
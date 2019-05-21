"use strict";
cc._RF.push(module, '4e7ffWQAP1ELYtTn0fcVTXe', 'Star');
// scripts/tsVersion/Star.ts

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
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickRadius = 0;
        _this.pickAudio = null;
        _this.lifeTime = 0;
        _this.game = null;
        _this.player = null;
        _this.timer = 0;
        return _this;
    }
    Star.prototype.init = function (game) {
        this.game = game;
        this.player = game.player.node;
        this.timer = this.lifeTime;
    };
    Star.prototype.update = function (dt) {
        this.timer -= dt;
        if (this.timer <= 0) {
            this.game.loseStar();
            this.node.destroy();
            return;
        }
        this.node.opacity = 255 * this.timer / this.lifeTime;
        if ((this.node.position.sub(this.player.position).mag() <= this.pickRadius)) {
            cc.audioEngine.play(this.pickAudio, false, 1);
            this.game.gainStar();
            this.node.destroy();
        }
    };
    __decorate([
        property(cc.Float)
    ], Star.prototype, "pickRadius", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Star.prototype, "pickAudio", void 0);
    __decorate([
        property(cc.Float)
    ], Star.prototype, "lifeTime", void 0);
    Star = __decorate([
        ccclass
    ], Star);
    return Star;
}(cc.Component));
exports.default = Star;

cc._RF.pop();
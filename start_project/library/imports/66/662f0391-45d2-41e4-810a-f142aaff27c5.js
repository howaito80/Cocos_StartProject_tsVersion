"use strict";
cc._RF.push(module, '662f0ORRdJB5IEK8UKq/yfF', 'Game');
// scripts/tsVersion/Game.ts

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
var Player_1 = require("./Player");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starPref = null;
        _this.player = null;
        _this.ground = null;
        _this.scoreLable = null;
        _this.gameoverUI = null;
        _this.groundY = 0;
        _this.score = 0;
        return _this;
    }
    Game.prototype.onLoad = function () {
        this.groundY = this.ground.y + this.ground.height / 2;
    };
    Game.prototype.start = function () {
        this.gameoverUI.active = false;
        // bind listeners
        this.player.bindEventListener(true);
        this.spawnNewStar();
    };
    // update (dt) {}
    Game.prototype.gainStar = function () {
        this.score += 1;
        this.scoreLable.string = this.score.toString();
        this.spawnNewStar();
    };
    Game.prototype.loseStar = function () {
        this.player.node.stopAllActions();
        this.player.bindEventListener(false);
        this.gameoverUI.active = true;
    };
    Game.prototype.restartGame = function () {
        cc.director.loadScene('game');
    };
    Game.prototype.spawnNewStar = function () {
        var newStar = cc.instantiate(this.starPref);
        this.node.addChild(newStar);
        newStar.setPosition(this.getRandomPos());
        var star = newStar.getComponent('Star');
        star.init(this);
    };
    Game.prototype.getRandomPos = function () {
        var randomX = (Math.random() - 0.5) * this.node.width;
        var randomY = this.groundY + Math.random() * (this.player.jumpHeight + 50);
        return cc.v2(randomX, randomY);
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPref", void 0);
    __decorate([
        property(Player_1.Player)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "ground", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreLable", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "gameoverUI", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.Game = Game;

cc._RF.pop();
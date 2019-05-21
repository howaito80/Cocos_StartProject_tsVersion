import { Player } from "./Player";
import Star from "./Star";

const {ccclass, property} = cc._decorator;

@ccclass
export class Game extends cc.Component {

    @property(cc.Prefab)
    starPref: cc.Prefab = null;

    @property(Player)
    player: Player = null;

    @property(cc.Node)
    ground: cc.Node = null;

    @property(cc.Label)
    scoreLable: cc.Label = null;

    private groundY: number = 0;
    private score: number = 0;

    onLoad () 
    {
        this.groundY = this.ground.y + this.ground.height / 2;
    }

    start () 
    {
        this.spawnNewStar();
    }

    // update (dt) {}

    public gainStar()
    {
        this.score += 1;
        this.scoreLable.string = this.score.toString();
        this.spawnNewStar();
    }

    public loseStar()
    {
        this.player.node.stopAllActions();
        //cc.director.loadScene('game');
    }

    private spawnNewStar()
    {
        let newStar = cc.instantiate(this.starPref);
        this.node.addChild(newStar);
        newStar.setPosition(this.getRandomPos());
        
        let star = newStar.getComponent('Star');
        star.init(this);
    }

    private getRandomPos(): cc.Vec2
    {
        let randomX = (Math.random() - 0.5) * this.node.width;
        let randomY = this.groundY + Math.random() * (this.player.jumpHeight + 50);

        return cc.v2(randomX, randomY);
    }

}

import { Game } from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property(cc.Float)
    pickRadius: number = 0;

    @property(cc.AudioClip)
    pickAudio: cc.AudioClip = null;

    @property(cc.Float)
    lifeTime: number = 0;
    
    public game: Game = null;
    public player: cc.Node = null;

    private timer: number = 0;

    public init(game: Game)
    {
        this.game = game;
        this.player = game.player.node;
        this.timer = this.lifeTime;
    }
    update (dt: number) 
    {
        this.timer -= dt;
        if(this.timer <= 0)
        {
            this.game.loseStar();
            this.node.destroy();
            return;
        }
        this.node.opacity = 255 * this.timer / this.lifeTime;
        if((this.node.position.sub(this.player.position).mag() <= this.pickRadius))
        {
            cc.audioEngine.play(this.pickAudio, false, 1);
            this.game.gainStar();
            this.node.destroy();
        }
    }
}

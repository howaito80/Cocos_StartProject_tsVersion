const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {

    @property(cc.Integer)
    jumpHeight: number = 0;

    @property(cc.Integer)
    private accel: number = 0;

    @property(cc.Integer)
    private jumpDuration: number = 0;
    
    @property(cc.Integer)
    private maxMoveSpeed: number = 0;

    @property(cc.AudioClip)
    private jumpAudio: cc.AudioClip = null;

    private xSpeed: number = 0;
    private accLeft: boolean = false;
    private accRight: boolean = false;
    private jumpAction: cc.Action = null;

    waitForSomething(ms: number)
    {
        console.log("please wait..")
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    async startDoingSomething()
    {
        await this.waitForSomething(5000);
        console.info("Stop doing something");
    }

    start () 
    {

        this.startDoingSomething();
        // bind listeners
        this.bindEventListener(true);
        // jump action
        this.jumpAction = this.getJumpAction();
        this.node.runAction(this.jumpAction);
    }

    update (dt: number) 
    {
        if(this.accLeft)
            this.xSpeed -= this.accel * dt;
        else if(this.accRight)
            this.xSpeed += this.accel * dt;
        else if(Math.abs(this.xSpeed) > 0) // 无输入则减速
        {
            let curSpeed = this.xSpeed;

            curSpeed -= this.accel * Math.abs(curSpeed) / curSpeed * dt;
            if(curSpeed * this.xSpeed < 0)
                curSpeed = 0;

            this.xSpeed = curSpeed;
        }

        // 加速
        if(Math.abs(this.xSpeed) > this.maxMoveSpeed)
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        
        this.node.x += this.xSpeed;

        // 边界
        let maxX = this.node.parent.width / 2;
        if(Math.abs(this.node.x) > maxX)
        {
            this.node.x = maxX * this.node.x / Math.abs(this.node.x);
            this.xSpeed = 0;
        }
    }

    onDestroy()
    {
        this.bindEventListener(false);
    }

    private getJumpAction()
    {
        let jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());

        let jumpActionCallback = cc.callFunc(this.playJumpAudio, this);// 回调:播放跳跃音效
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown, jumpActionCallback));
    }

    private playJumpAudio()
    {
        cc.audioEngine.play(this.jumpAudio, false, 1);
    }

    private bindEventListener(status: boolean)
    {
        if(status)
        {
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
        else
        {
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }
    }

    private onKeyDown(event: cc.Event.EventKeyboard)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    }
    private onKeyUp(event: cc.Event.EventKeyboard)
    {
        switch(event.keyCode)
        {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameSpeed extends cc.Component {

    @property(cc.Node) actionNode: cc.Node = undefined;
    @property(cc.Node) tweenNode: cc.Node = undefined;
    @property(cc.Node) updateNode: cc.Node = undefined;

    updateNodeSpeed: number = 300;
    dir: number = -1;

    onLoad() {
        // 使物理生效
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().enabledAccumulator = true;

        // action
        this.actionNode.runAction(cc.repeatForever(
            cc.sequence(
                cc.moveBy(1, 0, -300),
                cc.moveBy(1, 0, 300)
            )
        ));

        // tween
        cc.tween(this.tweenNode).repeatForever(
            cc.tween(this.tweenNode)
                .by(1, { y: -300 })
                .by(1, { y: 300 })
        ).start();
    }

    setSpeed(event, str: string) {
        const s = +str;
        cc.log('set speed: ' + s);
        cc.kSpeed(s);
    }

    update(dt) {
        this.updateNode.y += this.dir * this.updateNodeSpeed * dt;
        if (this.updateNode.y < -80) {
            this.updateNode.y = -80;
            this.dir = 1;
        }
        if (this.updateNode.y > 220) {
            this.updateNode.y = 220;
            this.dir = -1;
        }
    }

}

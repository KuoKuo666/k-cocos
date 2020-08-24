const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    moveNode: cc.Node = undefined;

    onLoad () {
        // 扩展节点
        cc.kNode(this.moveNode);
        
        // 指定节点状态切换回调函数
        this.moveNode.kInfoCb = (newVal, oldVal) => {
            console.log(`状态改变: ${oldVal} -> ${newVal}`);
        }

        // 默认停止状态
        this.moveNode.kInfo = "stop";
    }

    // 按钮调用，使得节点运动
    move () {
        this.moveNode.kInfo = "isMoving";
        cc.tween(this.moveNode)
            .by(2, { x: 400 })
            .call(() => this.moveNode.kInfo = "stop")
            .start();
    }

}

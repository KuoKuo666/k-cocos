cc.Class({
    extends: cc.Component,

    properties: {
        moveNode: cc.Node
    },

    onLoad() {
        // 扩展节点
        cc.kNode(this.moveNode);

        console.log(this.moveNode);
        
        // 指定节点状态切换回调函数
        this.moveNode.kStateCb = (newVal, oldVal) => {
            console.log(`状态改变: ${oldVal} -> ${newVal}`);
        }

        // 默认停止状态
        this.moveNode.kState = "stop";

        this.simpleMoveComp = this.moveNode.addComponent(cc.kSimpleMove);

        // console.log(this.moveNode.kComponents)
        // console.log(this.moveNode.kFirstChild)
        // console.log(this.moveNode.kLastChild)
    },

    // 按钮调用，使得节点运动
    move() {
        this.moveNode.kState = "isMoving";
        // cc.tween(this.moveNode)
        //     .by(2, { x: 400 })
        //     .call(() => this.moveNode.kState = "stop")
        //     .start();
        // this.simpleMoveComp.setAccelerate(10, 0)
        this.simpleMoveComp.setMoveSpeed(10, 0)
        // console.log(this.simpleMoveComp.getMoveSpeed())
        // console.log(this.simpleMoveComp.getAccelerate())
    }

});

const {ccclass, property} = cc._decorator

@ccclass
export default class SimpleMoveTest extends cc.Component {

    @property(cc.Node) clickNode: cc.Node = null
    @property(cc.Node) moveNode: cc.Node = null

    simpleMoveComp: cc.kSimpleMove

    onLoad() {
        this.simpleMoveComp = this.moveNode.addComponent(cc.kSimpleMove)

        this.clickNode.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            const pos = this.clickNode.convertToNodeSpaceAR(e.getLocation())
            // console.log(pos)
            this.simpleMoveComp.setDestination(pos, 100, 20)
        })
    }

    
}

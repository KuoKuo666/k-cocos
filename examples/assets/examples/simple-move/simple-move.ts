const {ccclass, property} = cc._decorator

@ccclass
export default class SimpleMoveTest extends cc.Component {

    @property(cc.Node) clickNode: cc.Node | undefined = undefined
    @property(cc.Node) moveNode: cc.Node | undefined = undefined

    simpleMoveComp: cc.kSimpleMove | undefined = undefined

    onLoad() {
        if (!this.moveNode) { return }
        this.simpleMoveComp = this.moveNode.addComponent(cc.kSimpleMove)
        if (!this.clickNode) { return }
        this.clickNode.on(cc.Node.EventType.TOUCH_END, (e: cc.Event.EventTouch) => {
            const pos = this.clickNode!.convertToNodeSpaceAR(e.getLocation())
            // console.log(pos)
            this.simpleMoveComp!.setDestination(pos, 100, 20)
        })
    }

    
}

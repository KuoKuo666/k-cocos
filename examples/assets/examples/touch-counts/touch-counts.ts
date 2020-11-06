const {ccclass, property} = cc._decorator

@ccclass
export default class TouchCounts extends cc.Component {

    @property(cc.Label) consoleLabel: cc.Label | undefined = undefined

    @property([cc.Node]) colorNodes: cc.Node[] = []

    onLoad() {
        // 设置两个触点限制
        cc.kMultTouch(2)

        this.colorNodes.map(node => {
            node.on(cc.Node.EventType.TOUCH_START, (e: cc.Event.EventTouch) => {
                this.consoleLabel && (this.consoleLabel.string = `单击了${node.name}`)
            })
        })
    }
}

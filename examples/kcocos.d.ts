declare namespace cc {
    /**
     * 控制游戏速率，影响 dt
     * @param speed 速度
     */
    export function kSpeed(speed: number): void;

    /**
     * 将扩展方法注入到节点中
     * @param node 节点
     */
    export function kNode(node: cc.Node): cc.Node;

    /**
     * 节点扩展属性与方法
     */
    export interface Node {
        /**
         * 扩展属性，字符串信息
         */
        kInfo: string;

        /**
         * 扩展方法，kInfo 改变后触发
         */
        kInfoCb: (newVal: string, oldVal: string) => void;
    }
}

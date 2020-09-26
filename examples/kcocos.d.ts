declare namespace cc {
    /**
     * 控制游戏速率，影响 dt
     * @param speed 速度
     */
    export function kSpeed(speed: number): void;

    /**
     * 将普通节点扩展成超级节点
     * @param node 节点
     */
    export function kNode(node: cc.Node): cc.Node;

    /**
     * 传入 0 时禁止所有点击，传入 1 为单点触控，一些平台无法超过 5 个触点
     * @param count 触点数量
     */
    export function kMultTouch(count: number): void;

    /**
     * 节点扩展属性与方法
     */
    export interface Node {
        /**
         * 扩展属性，字符串信息
         */
        kInfo: string;

        /**
         * 扩展属性，简易状态机
         */
        kState: string;

        /**
         * 扩展属性，第一个子节点
         */
        kFirstChild: cc.Node;

        /**
         * 扩展属性，最后一个子节点
         */
        kLastChild: cc.Node;

        /**
         * 扩展属性，获取当前节点上所有组件
         */
        kComponents: cc.Component[];

        /**
         * 扩展方法，kInfo 改变后触发
         */
        kStateCb: (newVal: string, oldVal: string) => void;

    }
}

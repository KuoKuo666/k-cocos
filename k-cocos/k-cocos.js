'use strict';

/**
 * k-cocos 扩展库
 * 作者： kuokuo
 * 地址： https://github.com/KuoKuo666/k-cocos
 * QQ讨论群： 1085201157
 */

(function (global) {
    console.log('k-cocos v0.1');
    var cc = global.cc;

    // 游戏速率
    cc.director._kSpeed = 1;
    var _originCalculateDeltaTime = cc.Director.prototype.calculateDeltaTime;
    cc.director.calculateDeltaTime = function (now) {
        _originCalculateDeltaTime.call(this, now);
        this._deltaTime *= this._kSpeed;
    }

    cc.kSpeed = function (speed) {
        cc.director._kSpeed = speed;
    }

    // 触点数量控制
    cc.kMultTouch = function (count) {
        // 2.3.0 版本以上
        if (cc.internal && cc.internal.inputManager) {
            cc.internal.inputManager._maxTouches = count;
            return;
        }
        // 低版本
        if (_cc && _cc.inputManager) {
            _cc.inputManager._maxTouches = count;
        }
        // 兼容低版本的 QQ_PLAY
        if (CC_QQPLAY && BK && BK.inputManager) {
            BK.inputManager._maxTouches = count;
        }
    }

    // 强化节点
    cc.kNode = function (node) {
        // 记录节点信息
        node.kInfo = 'init';

        node._kState = 'init';
        Object.defineProperties(node, {
            // 简易状态机
            kState: {
                get() {
                    return this._kState;
                },
                set(val) {
                    var old = this._kState;
                    this._kState = val;
                    this.kStateCb && this.kStateCb(val, old);
                }
            },
            // 获取当前节点上所有组件
            kComponents: {
                get() {
                    return this._components;
                },
                set(val) {
                    cc.error(`can not set kComponents, please use addComponent()`);
                }
            },
            // 第一个子节点
            kFirstChild: {
                get() {
                    return this.children[0];
                },
                set(val) {
                    cc.error(`can not set kFirstChild, please use addChild()`);
                }
            },
            // 最后一个子节点
            kLastChild: {
                get() {
                    return this.children[this.childrenCount-1];
                },
                set(val) {
                    cc.error(`can not set kFirstChild, please use addChild()`);
                }
            }
        });

        node.kHitTest = function (cb) {
            this._hitTest = cb;
        }

        return node;
    }

})(window)
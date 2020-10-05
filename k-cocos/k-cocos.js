/**
 * k-cocos 扩展库
 * 作者： kuokuo
 * 地址： https://github.com/KuoKuo666/k-cocos
 * QQ讨论群： 1085201157
 */

(function (global) {
    'use strict';

    var cc = global.cc;
    cc.log('k-cocos v0.1');

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

    // 扩展移动方式脚本
    var kNodeMoveComp = cc.Class({
        extends: cc.Component,
        properties: {
            nodeSpeed_x: 0,
            nodeSpeed_y: 0,

            nodeAccelerate_x: 0,
            nodeAccelerate_y: 0
        },
        editor: {
            // 想让该组件最后执行 update
            executionOrder: 9999
        },
        update: function(dt) {
            this.nodeSpeed_x += this.nodeAccelerate_x;
            this.nodeSpeed_y += this.nodeAccelerate_y;
            this.node.x += this.nodeSpeed_x * dt;
            this.node.y += this.nodeSpeed_y * dt;
        }
    });

    // 强化节点
    cc.kNode = function (node) {
        // 记录节点信息
        node.kInfo = 'init';
        // 简易状态机
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
                    // 如果存在回调则调用，传入新旧状态
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

        // 添加扩展移动脚本，并缓存引用到 _kNodeMoveComp
        node._kNodeMoveComp = node.addComponent(kNodeMoveComp);

        // 设置速度的方法
        node.setkNodeSpeed = function(x, y) {
            if (x && typeof x === 'object') {
                this._kNodeMoveComp.nodeSpeed_x = x.x || 0;
                this._kNodeMoveComp.nodeSpeed_y = x.y || 0;
            } else {
                this._kNodeMoveComp.nodeSpeed_x = x || 0;
                this._kNodeMoveComp.nodeSpeed_y = y || 0;
            }
        }

        // 获取速度的方法
        node.getkNodeSpeed = function() {
            return new cc.Vec2(this._kNodeMoveComp.nodeSpeed_x, this._kNodeMoveComp.nodeSpeed_y);
        }

        // 设置节点加速度
        node.setkAccelerate = function(x, y) {
            if (x && typeof x === 'object') {
                this._kNodeMoveComp.nodeAccelerate_x = x.x || 0;
                this._kNodeMoveComp.nodeAccelerate_y = x.y || 0;
            } else {
                this._kNodeMoveComp.nodeAccelerate_x = x || 0;
                this._kNodeMoveComp.nodeAccelerate_y = y || 0;
            }
        }

        // 获取加速度的方法
        node.getkAccelerate = function() {
            return new cc.Vec2(this._kNodeMoveComp.nodeAccelerate_x, this._kNodeMoveComp.nodeAccelerate_y);
        }

        node.kHitTest = function (cb) {
            this._hitTest = cb;
        }

        return node;
    }

})(window)
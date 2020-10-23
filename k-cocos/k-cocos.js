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

    cc.kGetSpeed = function() {
        return cc.director._kSpeed
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
        // 低版本兼容 QQ_PLAY 的一段逻辑
        if (CC_QQPLAY && BK && BK.inputManager) {
            BK.inputManager._maxTouches = count;
        }
    }

    // 扩展移动方式脚本
    cc.kSimpleMove = cc.Class({
        name: 'cc_kSimpleMove',
        extends: cc.Component,
        properties: {
            speed_x: 0,
            speed_y: 0,

            accelerate_x: 0,
            accelerate_y: 0
        },
        editor: {
            // 想让该组件最后执行 update
            executionOrder: 9999
        },
        // 获取速度
        getMoveSpeed: function() {
            return new cc.Vec2(this.speed_x, this.speed_y);
        },
        // 设置运动速度
        setMoveSpeed: function(x, y) {
            if (x && typeof x === 'object') {
                this.speed_x = x.x || 0;
                this.speed_y = x.y || 0;
            } else {
                this.speed_x = x || 0;
                this.speed_y = y || 0;
            }
        },
        // 获取加速度
        getAccelerate: function() {
            return new cc.Vec2(this.accelerate_x, this.accelerate_y);
        },
        // 设置加速度
        setAccelerate: function(x, y) {
            if (x && typeof x === 'object') {
                this.accelerate_x = x.x || 0;
                this.accelerate_y = x.y || 0;
            } else {
                this.accelerate_x = x || 0;
                this.accelerate_y = y || 0;
            }
        },
        // 设置目的地
        setDestination: function(x, y) {
            // TODO
            // var a_x, a_y;
            // if (x && typeof x === 'object') {
            //     a_x = x.x || 0;
            //     a_y = x.y || 0;
            // } else {
            //     a_x = x || 0;
            //     a_y = y || 0;
            // }
        },
        update: function(dt) {
            this.speed_x += this.accelerate_x;
            this.speed_y += this.accelerate_y;
            this.node.x += this.speed_x * dt;
            this.node.y += this.speed_y * dt;
        }
    });

    // 强化节点
    cc.kNode = function (node) {
        // 节点数字标志
        node.kTag = 0;
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
            // 当前节点上所有组件
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
            // 第二个子节点
            kSecondChild: {
                get() {
                    return this.children[1];
                },
                set(val) {
                    cc.error(`can not set kSecondChild, please use addChild()`);
                }
            },
            // 第三个子节点
            kThirdChild: {
                get() {
                    return this.children[2];
                },
                set(val) {
                    cc.error(`can not set kThirdChild, please use addChild()`);
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

        // 自定义 _hitTest 回调
        node.kHitTest = function (cb) {
            this._hitTest = cb;
        }

        return node;
    }

})(window)
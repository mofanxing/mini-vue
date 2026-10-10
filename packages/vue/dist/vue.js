var Vue = (function (exports) {
    'use strict';

    /**
     * 单例的，当前的 effect
     */
    function effect(fn) {
        var _effect = new ReactiveEffect(fn);
        _effect.run();
    }
    var ReactiveEffect = /** @class */ (function () {
        function ReactiveEffect(fn) {
            this.fn = fn;
        }
        ReactiveEffect.prototype.run = function () {
            this.fn();
        };
        return ReactiveEffect;
    }());
    //收集依赖
    function track(target, key) {
        console.log('收集依赖');
    }
    //触发依赖
    function trigger(target, key) {
        console.log('触发依赖');
    }

    var get = createGetter();
    function createGetter() {
        return function get(target, key, receiver) {
            var res = Reflect.get(target, key, receiver);
            // 收集依赖
            track();
            return res;
        };
    }
    var set = createSetter();
    function createSetter() {
        return function set(target, key, value, receiver) {
            var res = Reflect.set(target, key, value, receiver);
            // 触发依赖
            trigger();
            return res;
        };
    }
    var mutableHandlers = {
        get: get,
        set: set
    };

    var reactiveMap = new WeakMap();
    function reactive(target) {
        return createReactiveObject(target, mutableHandlers, reactiveMap);
    }
    function createReactiveObject(target, mutableHandlers, proxyMap) {
        var existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        var proxy = new Proxy(target, mutableHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }

    exports.effect = effect;
    exports.reactive = reactive;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=vue.js.map

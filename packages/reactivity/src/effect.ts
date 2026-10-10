/**
 * 单例的，当前的 effect
 */
export let activeEffect: ReactiveEffect | undefined

const targetMap = new WeakMap<object, Map<any, any>>()

export function effect<T = any>(fn: () => T) {
    const _effect = new ReactiveEffect(fn)
    _effect.run()
}

export class ReactiveEffect<T = any> {
    constructor (public fn: () => T) {

    }
    run() {
        activeEffect = this
        this.fn()
    }
}


//收集依赖
export function track(target: object, key: unknown) {
    if(!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }
    depsMap.set(key, activeEffect)
}


//触发依赖
export function trigger(target: object, key?: unknown) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    const effect = depsMap.get(key)
    if (effect) {
        effect.fn()
    }
}
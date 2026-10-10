/**
 * 单例的，当前的 effect
 */
export let activeEffect: ReactiveEffect | undefined

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
    console.log('收集依赖');
    
}

//触发依赖
export function trigger(target: object, key?: unknown) {
    console.log('触发依赖');
    
}
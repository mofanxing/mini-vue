import { isArray } from '@vue/shared'
import { createDep, Dep } from './dep'
/**
 * 当前的 effect
 */
export let activeEffect: ReactiveEffect | undefined

type KeyToDepMap = Map<any, Dep>

const targetMap = new WeakMap<any, KeyToDepMap>()

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}
  run() {
    activeEffect = this
    this.fn()
  }
}

//收集依赖
export function track(target: object, key: unknown) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  // 获取指定 key 的 dep
  let dep = depsMap.get(key)
  // 如果 dep 不存在，则生成一个新的 dep，并放入到 depsMap 中
  if (!dep) {
    depsMap.set(key, (dep = createDep()))
  }
  trackEffects(dep)
}

export function trackEffects(dep: Dep) {
  // 添加依赖
  dep.add(activeEffect!)
}

//触发依赖
export function trigger(target: object, key?: unknown) {
  let depsMap = targetMap.get(target)
  if (!depsMap) return
  // 依据指定的 key，获取 dep 实例
  let dep: Dep | undefined = depsMap.get(key)
  // dep 不存在则直接 return
  if (!dep) {
    return
  }
  // 触发 dep
  triggerEffects(dep)
}

export function triggerEffects(dep: Dep) {
  const effects = isArray(dep) ? dep : [...dep]
  for (const effect of effects) {
    triggerEffect(effect)
  }
}

export function triggerEffect(effect: ReactiveEffect) {
  effect.run()
}

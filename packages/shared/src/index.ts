export const isObject = (value: any): value is object =>
  value !== null && typeof value === 'object'

/**
 * 判断是否为一个数组
 */
export const isArray = Array.isArray

/**
 * 对比两个数据是否发生了改变
 */
export const hasChanged = (value: any, oldValue: any): boolean =>
	!Object.is(value, oldValue)
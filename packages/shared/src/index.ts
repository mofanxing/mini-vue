export const isObject = (value: any): value is object =>
  value !== null && typeof value === 'object'

/**
 * 判断是否为一个数组
 */
export const isArray = Array.isArray
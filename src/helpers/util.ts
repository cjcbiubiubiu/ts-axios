const toString = Object.prototype.toString;

// 是否为日期类型
// val is Date使用类型保护
export function isDate(val: any): val is Date {
  return toString.call(val === "[object Date]");
}

// 是否为对象类型
// val is Object使用类型保护
export function isObject(val: any): val is Object {
  // null 也是object类型
  return val !== null && typeof val === "object";
}

// 普通对象类型的判断，比如blob，formData
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    /**
     * (to as T & U)---->因为to是最终的合并项，函数需要将to返回出去，因此它得是T & U 类型-->将to断言为 T & U 类型
     * 括号前面需要加个分号 ;
     * from[key] as any 因为无法将U类型赋值给T & U的类型
     */
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}
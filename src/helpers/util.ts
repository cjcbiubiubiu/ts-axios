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
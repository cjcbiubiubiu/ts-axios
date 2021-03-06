import { isPlainObject } from "./util";

// 处理config中的data的数据，比如post，put方法
export function transformRequest(data: any): any {
  // 只处理普通对象，转化为字符串。
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }

  return data;
}

export function transformResponse(data: any): any {
  // 将字符串类型处理为对象
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // do nothing
    }
  }
  return data;
}

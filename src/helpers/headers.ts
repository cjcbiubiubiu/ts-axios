// 支持配置处理请求头

import { isPlainObject } from "./util";

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return;
  }
  Object.keys(headers).forEach((name) => {
    // 判断转化后的名字是否相同
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
}

// 处理请求头
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, "Content-Type");

  if (isPlainObject(data)) {
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json;charset=utf-8";
    }
  }

  return headers
}

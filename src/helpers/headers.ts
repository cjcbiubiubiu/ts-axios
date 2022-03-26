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

  return headers;
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) {
    return parsed;
  }

  // 以每一行进行分割
  headers.split("\r\n").forEach((line) => {
    // 以:进行分割然后结构赋值到新的数组中
    // 比如 a:1 则key为a，val为1
    let [key, val] = line.split(":");
    key = key.trim().toLowerCase();
    // key为空则跳到下次循环
    if (!key) {
      return;
    }
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  });

  return parsed;
}

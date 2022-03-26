import { isDate, isPlainObject } from "./util";

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, "@")
    .replace(/%3a/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}

// 处理url，以及url上的传参
export function buildURL(url: string, params?: any): string {
  // 没有参数，返回url
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const val = params[key];
    // 如果val为空或者undefined 则return 跳到下一次循环
    if (val === null || typeof val === "undefined") {
      return;
    }

    // 统一成数组形式，方便处理
    let values = [];
    if (Array.isArray(val)) {
      values = val;
      key += "[]";
    } else {
      values = [val];
    }

    values.forEach((val) => {
      // 处理日期，对象
      if (isDate(val)) {
        val = val.toISOString();
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val);
      }

      parts.push(`${encode(key)}=${encode(val)}`);
    });
  });

  let serializedParams = parts.join("&");

  if (serializedParams) {
    // 考虑哈希模式的url
    const markIndex = url.indexOf("#");
    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }

  return url;
}

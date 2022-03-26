import { IAxiosRequestConfig } from "./types";

export default function xhr(config: IAxiosRequestConfig): void {
  const { data = null, url, method = "get", headers } = config;

  const request = new XMLHttpRequest();

  // true设置异步
  request.open(method.toUpperCase(), url, true);

  Object.keys(headers).forEach((name) => {
    // 如果data没有数据，并且headers有content-type这个值，则删除，不需要存在(没有意义)
    if (data === null && name.toLowerCase() === "content-type") {
      delete headers[name];
    } else {
      request.setRequestHeader(name, headers[name]);
    }
  });

  request.send(data);
}

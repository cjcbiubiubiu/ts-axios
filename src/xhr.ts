import { IAxiosRequestConfig } from "./types";

export default function xhr(config: IAxiosRequestConfig): void {
  const { data = null, url, method = "get" } = config;

  const request = new XMLHttpRequest();

  // true设置异步
  request.open(method.toUpperCase(), url, true);

  request.send(data);
}

import { IAxiosRequestConfig } from "./types";
import xhr from "./xhr";
import { buildURL } from "./helpers/url";
import { transformRequest } from "./helpers/data";
import { processHeaders } from "./helpers/headers";

function axios(config: IAxiosRequestConfig): void {
  processConfig(config);
  xhr(config);
}

// 处理传入配置，实际上是处理url
function processConfig(config: IAxiosRequestConfig): void {
  config.url = transformURL(config);
  /**
   * 要在处理data前先处理headers
   * 因为如果先处理data，那么data转换为了字符串以后就无法在headers方法里面判断其为普通对象了
   * 就无法进判断处理headers
   */
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
}

function transformURL(config: IAxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url, params);
}

function transformRequestData(config: IAxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transformHeaders(config: IAxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

export default axios;

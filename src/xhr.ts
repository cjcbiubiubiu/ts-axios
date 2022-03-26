import { parseHeaders } from "./helpers/headers";
import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from "./types";

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = "get", headers, responseType } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    // true设置异步
    request.open(method.toUpperCase(), url, true);

    // ajax原生事件
    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }

      // 获取经过正确处理的headers
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== "text" ? request.response : request.responseType;
      const response: IAxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };

      resolve(response);
    };

    Object.keys(headers).forEach((name) => {
      // 如果data没有数据，并且headers有content-type这个值，则删除，不需要存在(没有意义)
      if (data === null && name.toLowerCase() === "content-type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });

    request.send(data);
  });
}

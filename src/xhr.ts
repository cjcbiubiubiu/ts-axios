import { parseHeaders } from "./helpers/headers";
import { IAxiosRequestConfig, IAxiosPromise, IAxiosResponse } from "./types";
import { createError } from "./helpers/error";

export default function xhr(config: IAxiosRequestConfig): IAxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = "get",
      headers,
      responseType,
      timeout,
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }

    if (timeout) {
      request.timeout = timeout;
    }

    // true设置异步
    request.open(method.toUpperCase(), url, true);

    // ajax原生事件
    request.onreadystatechange = function () {
      if (request.readyState !== 4) {
        return;
      }

      // 请求错误或者超时，request.status也是为0
      if (request.status === 0) {
        return;
      }

      // 获取经过正确处理的headers
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData =
        responseType !== "text" ? request.response : request.responseType;
      const response: IAxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };

      handleResponse(response);
    };

    // 处理错误事件
    request.onerror = function () {
      reject(new Error("Network Error"));
    };

    // 处理超时事件
    request.ontimeout = function () {
      reject(new Error(`Timeout of ${timeout} ms exceeded`));
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

    // 处理错误码
    function handleResponse(response: IAxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(new Error(`Request failed with status ${response.status}`));
      }
    }
  });
}

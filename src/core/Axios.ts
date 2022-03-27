// 表示是一个类，因此文件名开头为大写

import { IAxiosRequestConfig, IAxiosPromise, Method } from "../types";
import dispatchRequest from "./dispatchRequest";

export default class Axios {
  request(url: any, config: any): IAxiosPromise {
    if (typeof url === "string") {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      // 即意味着第一个传参就是config，所以将第一个传参赋值给第二个传参
      config = url;
    }

    return dispatchRequest(config);
  }

  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData("get", url, config);
  }

  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData("delete", url, config);
  }

  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData("head", url, config);
  }

  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData("options", url, config);
  }

  post(url: string, data: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData("post", url, data, config);
  }

  put(url: string, data: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData("put", url, data, config);
  }

  patch(url: string, data: any, config?: IAxiosRequestConfig): IAxiosPromise {
    return this._requestMethodWithoutData("patch", url, data, config);
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    data?: any,
    config?: IAxiosRequestConfig
  ): IAxiosPromise {
    return this.request(
      url,
      Object.assign(config || {}, {
        method,
        url,
        data,
      })
    );
  }
}

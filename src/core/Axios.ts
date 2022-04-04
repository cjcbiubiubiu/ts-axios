// 表示是一个类，因此文件名开头为大写

import {
  IAxiosRequestConfig,
  IAxiosResponse,
  IAxiosPromise,
  Method,
  IResolvedFn,
  IRejectedFn,
} from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManager from "./interceptorManager";

interface IInterceptors {
  request: InterceptorManager<IAxiosRequestConfig>;
  response: InterceptorManager<IAxiosResponse>;
}

interface IPromiseChain<T> {
  resolved: IResolvedFn<T> | ((config: IAxiosRequestConfig) => IAxiosPromise);
  rejected?: IRejectedFn;
}

export default class Axios {
  interceptors: IInterceptors;

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<IAxiosRequestConfig>(),
      response: new InterceptorManager<IAxiosResponse>(),
    };
  }

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

    // 增加拦截器的链式调用
    const chain: IPromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined,
      },
    ];

    this.interceptors.request.forEach((interceptor) => {
      // 因为它是先添加的 后面才执行，所以使用unshift
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach((interceptor) => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    // 实现链式调用
    while (chain.length) {
      // ! 当不为空的时候才从里获取参数
      const { resolved, rejected } = chain.shift()!;
      promise = promise.then(resolved, rejected)
    }

    return promise
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

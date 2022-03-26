import { IAxiosRequestConfig, IAxiosResponse } from "../types";

export class AxiosError extends Error {
  isAxiosError: boolean;
  config: IAxiosRequestConfig;
  code?: string | null;
  request?: any;
  response?: IAxiosResponse;

  constructor(
    message: string,
    config: IAxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: IAxiosResponse
  ) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;

    /**
     * 解决ts的一个坑
     * 当继承一些内置对象的时候，设置一个方法比如 sayHello
     * 1. 如果不添加Object.setPrototypeOf(this, AxiosError.prototype)这句代码，生成的实例是在调用到这个方法的时候回有问题
     * 2. 若判断一个参数是否为AxiosError的实例，即便它就是AxiosError的实例也会返回false
     */
    // 该方法将指定对象的原型（即内部属性）设置为另一个对象或. [[Prototype]]null (参考MDN)
    Object.setPrototypeOf(this, AxiosError.prototype);
  }

  sayHello() {}
}

// 通过内部创建一个工厂函数，生成实例供外界调用
export function createError(
  message: string,
  config: IAxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: IAxiosResponse
) {
  const error = new AxiosError(message, config, code, request, response);

  return error
}

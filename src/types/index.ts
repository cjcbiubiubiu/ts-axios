// 使用字符串字面量的方式定义method的类型
export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH";

export interface IAxiosRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

export interface IAxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: IAxiosRequestConfig;
  request: any;
}

// 创建一个继承Promise类的接口，并且规定参数类型为IAxiosResponse
export interface IAxiosPromise extends Promise<IAxiosResponse> {}

// 创建一个继承Error类的接口
export interface IAxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
}

export interface IAxios {
  request(config: IAxiosRequestConfig): IAxiosPromise
  get(url: string, config?: IAxiosRequestConfig): IAxiosPromise
  delete(url: string, config?: IAxiosRequestConfig): IAxiosPromise
  head(url: string, config?: IAxiosRequestConfig): IAxiosPromise
  options(url: string, config?: IAxiosRequestConfig): IAxiosPromise
  post(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
  put(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
  patch(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise
}

// 混合类型接口，其本身就是一个函数
export interface IAxiosInstance extends IAxios {
  (config: IAxiosRequestConfig): IAxiosPromise

  (url: string, config?: IAxiosRequestConfig): IAxiosPromise
}
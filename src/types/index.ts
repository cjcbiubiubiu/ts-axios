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

export interface IAxiosResponse<T=any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: IAxiosRequestConfig;
  request: any;
}

// 创建一个继承Promise类的接口，并且规定参数类型为IAxiosResponse
// 接收类型T，并且传入IAxiosResponse，类似属性传递--7.5
export interface IAxiosPromise<T=any> extends Promise<IAxiosResponse<T>> {}

// 创建一个继承Error类的接口
export interface IAxiosError extends Error {
  isAxiosError: boolean
  config: IAxiosRequestConfig
  code?: string | null
  request?: any
  response?: IAxiosResponse
}

export interface IAxios {
  interceptors: {
    request: IAxiosInterceptorManager<IAxiosRequestConfig>,
    response: IAxiosInterceptorManager<IAxiosResponse>
  }

  request<T=any>(config: IAxiosRequestConfig): IAxiosPromise<T>
  get<T=any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  delete<T=any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  head<T=any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  options<T=any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
  post<T=any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  put<T=any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
  patch<T=any>(url: string, data?: any, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

// 混合类型接口，其本身就是一个函数
export interface IAxiosInstance extends IAxios {
  <T=any>(config: IAxiosRequestConfig): IAxiosPromise<T>

  <T=any>(url: string, config?: IAxiosRequestConfig): IAxiosPromise<T>
}

export interface IAxiosInterceptorManager<T> {
  use(resolved: IResolvedFn<T>, rejected?: IRejectedFn): number

  // 根据id删除拦截器
  eject(id: number): void
}

export interface IResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface IRejectedFn {
  (error: any): any
}

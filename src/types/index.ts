// 使用字符串字面量的方式定义method的类型
export type Method = 'get' | 'GET'
| 'delete' | 'DELETE'
| 'head' | 'HEAD'
| 'options' | 'OPTIONS'
| 'post' | 'POST'
| 'put' | 'PUT'
| 'patch' | 'PATCH'

export interface IAxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
  headers?: any;
}

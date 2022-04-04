import { IResolvedFn, IRejectedFn } from "../types/index";

interface IInterceptor<T> {
  resolve: IResolvedFn<T>;
  rejected?: IRejectedFn;
}

export default class InterceptorManager<T> {
  private interceptors: Array<IInterceptor<T> | null>;

  constructor() {
    this.interceptors = [];
  }

  use(resolved: IResolvedFn<T>, rejected: IRejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected,
    });

    return this.interceptors.length - 1;
  }

  forEach(fn: (interceptor: IInterceptor<T>) => void): void {
    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    });
  }

  eject(id: number): void {
    // 不能用会对数组下标造成影响的方法去删除拦截器，因为use方法中返回的是数组的长度，比如不能用splice等
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}

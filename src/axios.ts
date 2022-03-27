import { IAxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): IAxiosInstance {
  const context = new Axios()
  // 指向Axios原型上的方法request，但是request方法内部返回一个方法，是用this指向
  // 因此这里需要绑定this的指向
  const instance = Axios.prototype.request.bind(context)

  // 将实例上的原型属性都混合到instance中
  extend(instance, context)

  return instance as IAxiosInstance
}

// 这样做，axios可以拥有request方法，并且拥有Axios原型上的get之类的方法
const axios = createInstance()

export default axios
import axios from "./axios";

//
/**
 * 导出所有定义的类型，以便外界使用
 * 比如调用axios的时候，.catch(e=> {})一个错误，但是这个e的类型是无法被ts推断出来的，所以需要手动给它添加类型，但是类型是定义在axios内部的，无法获取，因此这里导出定义的类型，外界就可以手动添加参数的类型
 */
export * from './types'

export default axios;

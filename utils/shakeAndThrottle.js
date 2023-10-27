/**
 * @param { Function } fun - 传入的执行函数体
 * @param { Number } time - 防抖时间
 * @description 创建防抖函数
 */
export const shakeFun = (fun, time) => {
  let shake = null
  return function (...arg) {
    clearTimeout(shake)
    shake = setTimeout(() => {
      fun(...arg)
    }, time)
  }
}
/**
 * @param { Function } fun - 传入的执行函数体
 * @param { Number } time - 节流时间
 * @description 创建节流函数
 */
export const throttlingFun = (fun, time) => {
  let isTue = true
  return function (...arg) {
    if (isTue === false) {
      return
    }
    fun(...arg)
    isTue = false
    setTimeout(() => {
      isTue = true
    }, time)
  }
}

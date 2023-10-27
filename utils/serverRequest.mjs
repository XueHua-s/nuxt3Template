// 获取服务端当前环境调用的baseUrl
export const getServerBase = () => {
 if (process.env.NODE_ENV === 'development') {
   return process.env.NUXT_PUBLIC_API_BASE_URL_DEV
 } else {
   return process.env.NUXT_PUBLIC_API_BASE_URL_PRO_SERVE
 }
}
/**
 * 发送请求
 * @param {Object} data - 请求数据
 * @param {string} data.url - 请求地址
 * @param {string} data.method - 请求方法
 * @param {Object} data.params - 请求参数
 * @param {Object} data.data - 请求数据
 * @param {Object} data.headers - 请求头
 * @returns {Promise<Response>} - 响应结果
 */
const request = (data) => $fetch(data.url,{
  baseURL: getServerBase(),
  method: data.method,
  query: data.params,
  body: data.data,
  headers: {
    ...data.headers
  }
})
export default request

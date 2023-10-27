export const getClientBase = () => {
  const returnTime = useRuntimeConfig()
  return returnTime.public.baseURL
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
  baseURL: getClientBase(),
  method: data.method,
  query: data.params,
  body: data.data,
  headers: {
    ...data.headers
  }
})
export default request

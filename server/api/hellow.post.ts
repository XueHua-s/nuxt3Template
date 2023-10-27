// 服务端渲染获取
import request from '../../utils/serverRequest.mjs'
export default defineEventHandler(async (event) => {
  // @ts-ignore
  const data = await request({
    method: 'GET',
    url: '/'
  })
  return data
})

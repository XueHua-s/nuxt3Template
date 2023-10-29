// 服务端渲染获取
import request from '../../utils/serverRequest.mjs'
export default defineEventHandler(async (event) => {
  // 获取私密环境变量
  const runtimeConfig  = useRuntimeConfig(event)
  const data: any = await request({
    method: 'GET',
    url: '/'
  } as any, runtimeConfig.serverUrl)
  return data
})

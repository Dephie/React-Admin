import axios from 'axios'
import { message as antdMessage } from 'antd'
import { requestConfigEnum, responseCodeEnum } from '@/enmus/http'
import { loginOut } from '@/api/index'
import { userStore } from '@/store/user'

/**
 *  axios  https://github.com/axios/axios
 */
export const http = axios.create({
  // baseURL: import.meta.env.MODE === 'dev' ? '' : import.meta.env.VITE_APP_API,
  baseURL: import.meta.env.VITE_APP_API,
  timeout: requestConfigEnum.TIME_OUT as number,
})

http.interceptors.request.use(
  (config) => {
    const token = userStore.getState().token
    if (token && config.headers)
      config.headers[requestConfigEnum.TOKEN_NAME] = token
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (config) => {
    // token 失效
    if (config.data.status_code === responseCodeEnum.LOGIN_CODE) {
      antdMessage.error(config.data.status_msg)
      setTimeout(() => {
        loginOut()
      }, 500)
      return Promise.reject(config)
    }
    // 错误异常
    else if (config.data.status_code !== responseCodeEnum.SUCCESS_CODE) {
      antdMessage.error(config.data.status_msg)
      return Promise.reject(config)
    }
    return Promise.resolve(config)
  },
  (error) => {
    let message = error.message
    if (error?.response?.data?.status_code === responseCodeEnum.LOGIN_CODE) {
      antdMessage.error(message)
      setTimeout(() => {
        loginOut()
      }, 500)
      return Promise.reject(error)
    }
    if (message === 'Network Error')
      message = '网络故障'

    else if (message.includes('timeout'))
      message = '接口请求超时'

    else if (message.includes('Request failed with status code'))
      message = '接口异常'

    antdMessage.error(message)
    return Promise.reject(error)
  },
)

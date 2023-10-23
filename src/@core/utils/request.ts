import axios from 'axios'
import Message from 'src/@core/components/message'

import { useRouter } from 'next/router'

import { get } from 'lodash-es'
import { BASE_API_URL } from 'src/@core/utils/constants'
export type BaseResult<T> = {
  code: number
  data: T
  message: string
}

// todo 配置 拦截器处理
const request = axios.create({
  baseURL: `${BASE_API_URL}/naas`,
  headers: {
    'Content-Type': 'application/json'
  }
})

const errorMsgMap: Record<number, string> = {
  502: 'Network connection request failed',
  404: 'Unable to get data from the server, please check if your network is working.'
}

request.interceptors.request.use(config => {
  const authorization = get(config.headers, 'Authorization')
  if (!authorization) {
    const token = localStorage.getItem('token') as string

    // @ts-ignore
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

request.interceptors.response.use(
  response => {
    const { code, message } = response.data

    // token过期，重新登录
    if (code === 71002) {
      // location.href = `/console/login`
      // localStorage.removeItem('user-token')
    } else if (code === 12001) {
      Message.error({
        content: 'The later launch date must be longer than the previous round',
        duration: 3000
      })
    } else if (code === 40003) {
      Message.error({
        content: 'Contract loading failed.',
        duration: 3000
      })
    } else if (code === 56001) {
      return response.data
    } else if (![200, 13009, 10009].includes(code)) {
      Message.error({
        content: message,
        duration: 3000
      })
      throw {
        code: -1,
        message: 'server error'
      }
    }

    // todo
    return response.data
  },
  error => {
    // console.log('error', error.response.status)
    // location.href = `/console/login`
    // localStorage.removeItem('user-token')

    if (error.response?.status == 401) {
      localStorage.removeItem('token')
      // location.href = `/pages/login`
      return error

    }

    // router.push('login')

    return Promise.reject(error)
  }
)

export default request

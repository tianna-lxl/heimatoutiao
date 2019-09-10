// 评论页面相关的方法
import axios from '../utils/axios.config'
import api from '../constent/api'

export function getComments (params) {
  return axios({
    url: api.API_ARTICLES,
    params
  })
}

export function openOrClose (params, data) {
  return axios({
    url: api.API_COMMENT,
    method: 'put',
    params,
    data
  })
}

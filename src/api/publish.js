// publish页面相关的方法
import axios from '../utils/axios.config'
import api from '../constent/api'

export function getChannels () {
  return axios({
    url: api.API_CHANNELS
  })
}

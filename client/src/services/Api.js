import axios from 'axios'

export default function () {
  return axios.create({
//    baseURL: 'http://localhost:3004/'
    baseURL: 'http://www.tosp.net.au:3004/'
  })
}

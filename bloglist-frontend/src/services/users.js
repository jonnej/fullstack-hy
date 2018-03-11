import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUser = async (id) => {
  const response = axios.get(`${baseUrl}/${id}`)
  return response.data

}

export default { getAll, getUser }


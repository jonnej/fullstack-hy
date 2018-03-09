import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (updatedObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/' + updatedObject.id
  const response = await axios.put(url, updatedObject, config)
  return updatedObject
}

const remove = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/' + blog.id
  const response = await axios.delete(url, blog, config)
  return response.data
}



export default { getAll, setToken, create, update, remove }
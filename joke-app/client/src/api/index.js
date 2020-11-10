import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
})

export const insertJoke = payload => api.post(`/joke`, payload)
export const getAllJokes = () => api.get(`/jokes`)
export const updateJokeById = (id, payload) => api.put(`/joke/${id}`, payload)
export const deleteJokeById = id => api.delete(`/joke/${id}`)
export const getJokeById = id => api.get(`/joke/${id}`)
//export const likeJokeById = id => api.post(`/joke/${id}/like`)

const apis = {
    insertJoke,
    getAllJokes,
    updateJokeById,
    deleteJokeById,
    getJokeById,
//    likeJokeById,
}

export default apis
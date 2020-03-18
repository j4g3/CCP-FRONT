import axios from 'axios';

const api = axios.create({
  baseURL: "https://j4g3-ccp-backend.glitch.me"
})

export default api;
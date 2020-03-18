import axios from 'axios';

const api = axios.create({
  baseURL: "http://ccp-demo-backend.herokuapp.com"
})

export default api;

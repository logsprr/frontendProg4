import axios from 'axios';

const api = axios.create({
  baseURL: 'https://prog4-prova.herokuapp.com',
  auth: {
    username: 'ricardo@teste.com',
    password: 1234,
  },
  headers: {
    'Access-Control-Allow-Credentials': '*',
  },

});

export default api;

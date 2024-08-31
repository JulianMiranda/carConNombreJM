import axios, {AxiosHeaders, InternalAxiosRequestConfig} from 'axios';

//const baseURL = 'http://192.168.0.19:5001/api';
//export const socketURL = 'http://192.168.0.19:5001';

const baseURL = 'https://backed-nestjs-base-1.onrender.com/api';
export const socketURL = 'https://backed-nestjs-base-1.onrender.com';

//https://backed-nestjs-base-1.onrender.com'

const api = axios.create({baseURL});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = 'TokenTest65471117c32a0f304c3e608a';

  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('access-control-allow-origin', '*');
      config.headers.set('content-type', 'application/json');
      config.headers.set('x-token', token);
    } else {
      config.headers = new AxiosHeaders({
        'access-control-allow-origin': '*',
        'content-type': 'application/json',
        'x-token': token,
      });
    }
  }

  return config;
});

export default api;

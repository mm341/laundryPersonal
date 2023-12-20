import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const MainApi = axios.create({
  baseURL: baseUrl,
});

MainApi.interceptors.request.use(function (config) {
  let token = undefined
  let language = undefined

  let device_id = undefined

  if (typeof window !== 'undefined') {
      token = localStorage.getItem('token')
      language = localStorage.getItem('language')
      device_id = localStorage.getItem('MachineId')
  }
  config.headers.AppKey = 'c9579dc0-79ef-4993-83b3-df50388de98e'

  if (device_id) {
      config.headers.deviceid = device_id
  }

  if (token) config.headers.authorization = `Bearer ${token}`
  if (language) config.headers['Accept-Language'] = language

  config.headers["Content-Type"] = "application/json;charset=utf-8";
  config.headers["Accept"] = "application/json";
  config.headers["Access-Control-Allow-Origin"] = "*";
  config.headers["Access-Control-Allow-Methods"] = "*";
  config.headers["Access-Control-Allow-Headers"] = "*";
  return config;
});

export default MainApi;

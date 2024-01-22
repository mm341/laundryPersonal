import PublicHandelingErrors from "@/utils/PublicHandelingErrors";
import axios from "axios";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const MainApi = axios.create({
  baseURL: baseUrl,
});

MainApi.interceptors.request.use(
  function (config) {
    let token = undefined;
    let language = undefined;

    let device_key = undefined;

    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
      language = localStorage.getItem("language");
      device_key = localStorage.getItem("MachineId");
    }
    config.headers.AppKey = "c9579dc0-79ef-4993-83b3-df50388de98e";

    if (device_key) {
      config.headers.deviceKey = device_key;
      config.headers.deviceType = "web";
    }

    if (token) config.headers.authorization = `Bearer ${token}`;
    if (language) config.headers["Accept-Language"] = language;
    if (language) config.headers["locale"] = language;

    config.headers["Content-Type"] = "application/json;charset=utf-8";
    config.headers["Accept"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "*";
    config.headers["Access-Control-Allow-Methods"] = "*";
    config.headers["Access-Control-Allow-Headers"] = "*";

    return config;
  },
  function (error) {
    // Do something with request error
    return PublicHandelingErrors.onErrorResponse(error);
  }
);

export default MainApi;

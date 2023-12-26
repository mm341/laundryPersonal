import MainApi from "@/api/MainApi";
import { AxiosHeaders, AxiosProgressEvent, AxiosRequestConfig } from "axios";

export default class AxiosHandler {
  // GET
  public static vGetRequest = (url: string, headers = new AxiosHeaders()) => {
    const config: AxiosRequestConfig = {
      headers,
    };

    return MainApi.get(url, config);
  };

  // POST
  public static vPostRequest = (
    url: string,
    data: any,
    headers: AxiosHeaders = new AxiosHeaders(),
    uploadProgressCallback?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    const config: AxiosRequestConfig = {
      headers,
    };

    if (uploadProgressCallback) {
      config.onUploadProgress = uploadProgressCallback;
    }
    return MainApi.post(url, data, config);
  };

  // POST FORM-DATA
  public static vPostFormRequest = (
    url: string,
    data: any,
    headers: AxiosHeaders = new AxiosHeaders(),
    uploadProgressCallback?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    
    return MainApi.postForm(url, data);
  };

  // PATCH
  public static vPatchRequest = (
    url: string,
    data: any,
    headers: AxiosHeaders = new AxiosHeaders()
  ) => {
    const config: AxiosRequestConfig = {
      headers,
    };

    return MainApi.patch(url, data, config);
  };

  // PUT
  public static vPutRequest = (
    url: string,
    data: any,
    headers: AxiosHeaders = new AxiosHeaders()
  ) => {
    const config: AxiosRequestConfig = {
      headers,
    };

    return MainApi.put(url, data, config);
  };

  // del
  public static vDeleteRequest = (
    url: string,
    headers: AxiosHeaders = new AxiosHeaders()
  ) => {
    const config: AxiosRequestConfig = {
      headers,
    };

    return MainApi.delete(url, config);
  };

  // BUILD FORM DATA
  public static buildFormData = (payload: Record<string, any>, prefix = "") => {
   
    const formData = new FormData();
    Object.keys(payload).forEach((k) => {
      if (Array.isArray(payload[k])) {
        formData.append(
          prefix ? `${prefix}[${k}][]` : `${k}[]`,
          JSON.stringify(payload[k])
        );
      } else {
        formData.append(prefix ? `${prefix}[${k}]` : k, payload[k]);
      }
    });

    return formData;
  };

  public static buildFormData2 = (
    payload: Record<string, any>,
    prefix?: string,
    formData?: any
  ) => {
    Object.keys(payload).forEach((k) => {
      if (Array.isArray(payload[k])) {
        formData.append(
          prefix ? `${prefix}[${k}][]` : `${k}[]`,
          JSON.stringify(payload[k])
        );
      } else {
        formData.append(prefix ? `${prefix}[${k}]` : k, payload[k]);
      }
    });

    return formData;
  };

  // HELPERS
  public static getResponse = async <T>(
    status: number,
    callback: (...any: any[]) => any,
    ...params: any[]
  ): Promise<T> => {
    const response = await callback(...params);
    if (response.status !== status) {
      throw new Error();
    }

    return response.data as T;
  };

  public static buildBearerToken = (token: string): string => {
    return `Bearer ${token}`;
  };
}

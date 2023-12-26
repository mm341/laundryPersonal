import AxiosHandler from "./axios-handler";

export default class PublicRequest {
  public static getData = async (path: string) => {
    return AxiosHandler.getResponse(200, AxiosHandler.vGetRequest, path);
  };

  public static postData = async (payload: any, path: string) => {
    return AxiosHandler.getResponse(
      200,
      AxiosHandler.vPostRequest,
      path,
      payload
    );
  };

  public static postFormData = async (payload: any, path: string) => {
    AxiosHandler.buildFormData(payload);
    return AxiosHandler.getResponse(
      200,
      AxiosHandler.vPostFormRequest,
      path,
      payload
    );
  };

  public static deleteData = async (path: string) => {
    return AxiosHandler.getResponse(200, AxiosHandler.vDeleteRequest, path);
  };
}

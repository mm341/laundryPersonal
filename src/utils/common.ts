import dayjs from "dayjs";
import { AxiosError } from "axios";

export default class CommonUtil {
  public static isObjEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
  };

  public static getObjLength = (obj: object): number => {
    return Object.keys(obj).length;
  };

  public static findIndex<T>(
    array: T[],
    predicate: (e: T) => boolean,
    with_fail = false
  ): number {
    const foundIndex = array.findIndex(predicate);

    if (foundIndex === -1 && with_fail) {
      throw new DOMException();
    }

    return foundIndex;
  }

  public static getErrorMessageFromException(e: unknown): string {
    if (typeof e === "string") {
      return e;
    }

    if (e instanceof AxiosError) {
      if (e?.response?.data?.errors) {
        return e.response.data.errors[0] ?? e.message;
      }

      return e.message;
    }

    return (e as any).toString();
  }

  public static formatDate = (date: string) => {

    if (date !== null) {
      return dayjs(new Date(date)).format("DD/MM/YYYY");
    }
  };

  public static formatDate2 = (date: Date | any): string => {
    let dataFirst = dayjs(new Date(date)).format("DD/MM/YYYY");
    var inputDateStr = dataFirst;

    // Split the input date string into day, month, and year
    var parts = inputDateStr.split("/");
    var day: any = parts[0];
    var month: any = parts[1];
    var year: string | number | any = parts[2];

    // Create a new Date object using the extracted values
    var inputDate = new Date(year, month - 1, day);

    // Extract the components of the date in mm-dd-yyyy format
    var outputMonth = String(inputDate.getMonth() + 1).padStart(2, "0");
    var outputDay = String(inputDate.getDate()).padStart(2, "0");
    var outputYear = inputDate.getFullYear();

    // Construct the final formatted date string
    var outputDateStr = outputYear + "-" + outputMonth + "-" + outputDay;

    // Output the result



    return outputDateStr;
  };

  public static formatDate1(date: string | number | Date | any) {
    // eslint-disable-next-line prefer-const
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      // eslint-disable-next-line prefer-const
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  public static formatNumber = (data: number): string => {
    return new Intl.NumberFormat("en-US").format(data);
  };

  public static componentToHex(c: any) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  public static rgbToHex(r: string, g: string, b: string) {
    return (
      "#" +
      this.componentToHex(r) +
      this.componentToHex(g) +
      this.componentToHex(b)
    );
  }
}

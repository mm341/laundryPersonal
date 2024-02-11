import { AccountInfo } from "@/interfaces/AccountInfo";

export type UpdateProfileModel = {
  isloading: boolean;
  accountInfo: AccountInfo;
  unReadNotifications:number
};

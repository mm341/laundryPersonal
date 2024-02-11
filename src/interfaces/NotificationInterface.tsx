export const initialNotification = () => {
  return {
    id: "",
    isRead: 0,
    title: "",
    message: "",
  };
};

export interface NotificationInterface {
  id: string;
  isRead: number;
  message: string;
  title: string;
}

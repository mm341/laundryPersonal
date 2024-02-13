export const initialNotification = () => {
  return {
    id: "",
    isRead: 0,
    title: "",
    message: "",
    date: "",
    image: "",
  };
};

export interface NotificationInterface {
  id: string;
  isRead: number;
  message: string;
  title: string;
  date: string;
  image: string;
}

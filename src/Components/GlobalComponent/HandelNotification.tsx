import { useStoreFcm } from "@/React-Query/push-notification/usePushNotification";
import { fetchToken, onMessageListener } from "@/firebase";
import { AuxProps } from "@/interfaces/ChildrenInterface";
import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface payload {
  notification: notification;
}
interface notification {
  title: string;
  body: string;
}
const HandelNotification = ({ children }: AuxProps) => {
  //  hooks
  const [notification, setNotification] = useState<any>(null);
  const { push } = useRouter();

  const [isTokenFound, setTokenFound] = useState(false);
  const [fcmToken, setFcmToken] = useState<string | undefined>("");

  useEffect(() => {
    handleFetchToken();
  }, []);

  const handleFetchToken = async () => {
    await fetchToken(setTokenFound, setFcmToken);
  };


  let token: undefined | any | null = undefined;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const { mutate } = useStoreFcm();

  useEffect(() => {
    if (token && fcmToken) {
      mutate(fcmToken);
    }
  }, [fcmToken, token]);
  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        setNotification(payload?.notification);
      })
      .catch((err) => toast(err));
    if (notification) {
      toast.success(
        <Stack
          sx={{ cursor: "pointer" }}
          onClick={() => push("/info?page=order")}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              flexDirection: "row",
            }}
          >
            <Typography>{notification?.title}</Typography>
          </Stack>

          <Typography>{notification?.body}</Typography>
        </Stack>
      );
    }
  }, [notification]);

  return <>{children}</>;
};

export default HandelNotification;

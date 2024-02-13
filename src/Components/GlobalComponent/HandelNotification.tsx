import { onMessageListener } from "@/firebase";
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

  const { push } = useRouter();

  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        console.log(payload)
        if (payload?.notification?.title) {
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
                <Typography>{payload?.notification?.title}</Typography>
              </Stack>

              <Typography>{payload?.notification?.body}</Typography>
            </Stack>
          );
        }
      })
      .catch((err) => toast(err));
  }, []);

  return <>{children}</>;
};

export default HandelNotification;

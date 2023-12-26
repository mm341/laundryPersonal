import {
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import {
  Button,
  Modal,
  Stack,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const DeleteDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  header,
  text,
  Cancel,
  primaryButtonText,
  handelAction,
}: {
  setOpenDeleteDialog: (e: boolean) => void;
  openDeleteDialog: boolean;
  header: string;
  text: string;
  Cancel: string;
  primaryButtonText: string;
  handelAction?: () => void;
}) => {
  //  hooks
  const theme = useTheme();
  const { t } = useTranslation();
  //   dialog style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: { md: "475px", xs: "340px" },
    bgcolor: "background.paper",
    border: "1px solid white",
    boxShadow: 24,
    height: { md: "190px", xs: "250px" },
    borderRadius: "10px",
    p: 3,
  };
  return (
    <>
      <Modal
        open={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
        }}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Stack sx={style}>
          <GlobalDisplayFlexColumnBox
            sx={{ gap: { md: "35px", xs: "20px" } }}
            gap={"35px"}
            width={"100%"}
          >
            <GlobalDisplayFlexColumnBox width={"100%"} gap={"10px"}>
              <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
                {t(header)}
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>
                {t(text)}
              </Typography>
            </GlobalDisplayFlexColumnBox>

            <GlobalDisplayFlexBox
              sx={{
                justifyContent: { md: "flex-end", xs: "center" },
                gap: "24px",
                alignItems: { md: "flex-end", xs: "center" },
              }}
            >
              <GlobalButton
                onClick={() => setOpenDeleteDialog(false)}
                sx={{
                  color: theme.palette.primary.main,
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderRadius: "4px",
                  width: "130px",
                  height: "40px",
                }}
                px={"25px"}
                py={"10px"}
              >
                {t(Cancel)}
              </GlobalButton>
              <Button
                onClick={handelAction}
                style={{
                  backgroundColor: "#329CD7",
                  width: "130px",
                  height: "40px",
                  borderRadius: "4px",
                }}
                // disabled={loading}
                className="bg-[#329CD7]"
                fullWidth
                sx={{
                  color: "white",

                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: (theme: any) =>
                      alpha(theme.palette.primary.main, 0.9),
                  },
                }}
                variant="contained"
                type="submit"
              >
                {/* {loading ? (
                  <CircularProgress
                    sx={{ color: "white", fontSize: "10px" }}
                    size={size}
                  />
                ) : ( */}
                {t(primaryButtonText)}
                {/* )} */}
              </Button>
            </GlobalDisplayFlexBox>
          </GlobalDisplayFlexColumnBox>
        </Stack>
      </Modal>
    </>
  );
};

export default DeleteDialog;

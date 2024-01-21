import {
  GlobalButton,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Box, Modal, SelectChangeEvent, useTheme } from "@mui/material";
import React, { useState } from "react";
import GlobalSelectBox from "../GlobalSelectBox";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { HomeAreas } from "@/interfaces/HomeAreas";

interface Props {
  openAreaDialog: boolean;
  handleClose: () => void;
  homeAreas: HomeAreas[];
  ServiceId:string|undefined
}
const AreaDialog = ({ openAreaDialog, handleClose, homeAreas,ServiceId }: Props) => {
  //    hooks
  const [selectValue, setselectValue] = useState<string>(homeAreas[0]?.id);
  const theme = useTheme();
  const router = useRouter();
  
  const { t } = useTranslation();
  //  style for model
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: { md: "20%", x: "40%" },
    oveflowY: "scroll",
    transform: "translate(-50%, -50%)",
    width: { md: "30%", sm: "45%", xs: "90%" },
    bgcolor: "background.paper",
    p: 4,
    borderRadius: "10px",
  };

  //    handel select value
  const handelSelectBox = (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    setselectValue(e.target.value);
  };

  const handelSubmit = () => {
    if (selectValue) {
      router.push(`/products?service_id=${ServiceId}`);
    } else {
      toast.error(t("Please Select Area"));
    }
  };
  return (
    <Modal
      open={openAreaDialog}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box sx={style}>
        <GlobalDisplayFlexColumnBox gap={"30px"} width={"100%"}>
          <GlobalSelectBox
            area={selectValue}
            handleChange={handelSelectBox}
            label={"Please Select Area"}
            homeAreas={homeAreas}
          />
          <GlobalButton
            py={"15px"}
            px={"15px"}
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: "5px",
            }}
            color={"white"}
            onClick={handelSubmit}
          >
            {t("Submit")}
          </GlobalButton>
        </GlobalDisplayFlexColumnBox>
      </Box>
    </Modal>
  );
};

export default AreaDialog;

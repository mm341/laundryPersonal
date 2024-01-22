import {
  Box,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

import {
  GlobalButton,
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import GlobalSelectBox from "../GlobalSelectBox";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import ServicesDialog from "../Dialogs/ServicesDialog";
import rightPhotoSection from "../../../public/HomePage/huge img.png";
import photo from "../../../public/HomePage/firstSectionImg.svg";

import GlobalTypography from "./GlobalTypography";
import AppSmallSection from "./AppSmallSection";
import { HomeServices } from "@/interfaces/HomeServices";
import { HomeAreas } from "@/interfaces/HomeAreas";
import Carousel from "react-material-ui-carousel";

const FirstSection = ({
  homeServices,
  homeAreas,
}: {
  homeServices: HomeServices[];
  homeAreas: HomeAreas[];
}) => {
  //  hooks
  const { t } = useTranslation();
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("md"));
  const [selectValue, setselectValue] = useState<string>(homeAreas[0]?.id);
  const [openOrderDialog, setOpenOrderDialog] = useState<boolean>(false);
  const handelSelectBox = (
    e: React.ChangeEvent<HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    setselectValue(e.target.value);
  };
  const handelSubmit = () => {
    if (selectValue) {
      setOpenOrderDialog(true);
    } else {
      toast.error(t("Please Select Area"));
    }
  };

  //  close area dialog
  const handelClose = () => {
    setOpenOrderDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(to right bottom, #C0E3FF, #DDEDFA)",
          py: "5px",
        }}
        style={{
          boxShadow: "7px 7px 8px 0px #1E214F0F",
        }}
      >
        <Box sx={{ width: "85%", mx: "auto" }}>
          <GlobalDisplayFlexBox>
            {/*  leftSection */}
            <GlobalDisplayFlexColumnBox
              data-aos="fade-right"
              width={!issmall ? "42%" : "100%"}
              gap={"50px"}
              alignItems={"center"}
              sx={{ py: "25px" }}
            >
              <Box
                sx={{
                  width: "203px",
                  height: "140px",
                  transform: { sm: "translateX(-55px)", xs: "translateX(0px)" },
                }}
              >
                <img
                  src={photo?.src}
                  style={{ width: "100%", height: "100%", marginTop: "30px" }}
                  alt="img"
                  loading="lazy"
                />
              </Box>
              <GlobalDisplayFlexColumnBox
                sx={{ marginTop: "30px" }}
                width={"100%"}
                gap={"15px"}
              >
                <GlobalTypography
                  text={"Say goodbye to laundry day"}
                  FirstSection
                  homePage
                />

                <Carousel
                  sx={{
                    "&.mui-style-1m9128y": {
                      textAlign: "left !important",
                    },
                    "&.mui-style-aq8pb7-MuiSvgIcon-root": {
                      color: "white !important",
                    },
                  }}
                  // className={`${classes.root} mui-style-1m9128y`}
                  animation={"fade"}
                  duration={50}
                  swipe={true}
                  navButtonsAlwaysVisible={false}
                  navButtonsAlwaysInvisible={true}
                  autoPlay
                >
                  <Typography
                    sx={{
                      fontSize: { sm: "20px", xs: "12px" },
                      fontWeight: "400",
                      color: "black",
                      mt: "20px",
                    }}
                  >
                    {t(
                      "You deserve more time for  really important in your life, where the stressful task of laundry is no longer a time-consuming chore."
                    )}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: { sm: "20px", xs: "12px" },
                      fontWeight: "400",
                      color: "black",
                      mt: "20px",
                    }}
                  >
                    {t(
                      "You deserve more time for  really important in your life, where the stressful task of laundry is no longer a time-consuming chore."
                    )}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { sm: "20px", xs: "12px" },
                      fontWeight: "400",
                      color: "black",
                      mt: "20px",
                    }}
                  >
                    {t(
                      "You deserve more time for  really important in your life, where the stressful task of laundry is no longer a time-consuming chore."
                    )}
                  </Typography>
                </Carousel>
              </GlobalDisplayFlexColumnBox>

              {/*  sleect area box */}
              <Box
                sx={{
                  width: { md: "85%", xs: "100%" },
                  mr: "auto",
                  transform: { sm: "translateX(-15px)", xs: "translateX(0px)" },
                  display: "flex",
                  flexDirection: { sm: "row", xs: "column" },

                  justifyContent: {md:"flex-start",xs:"center"},
                  alignItems: "center",
                  gap: { sm: "0px", xs: "15px" },
                  p: { sm: "15px", xs: "0" },
                  my: "20px",
                }}
              >
                <Box sx={{ width: { sm: "85%", xs: "100%" } }}>
                  <GlobalSelectBox
                    homeAreas={homeAreas}
                    area={selectValue}
                    handleChange={handelSelectBox}
                    label={"Please Select Area"}
                  />
                </Box>
                <Box
                  sx={{
                    width: "97px",
                    transform: {
                      sm: "translate(-6px,5px)",
                      xs: "translateX(0px)",
                    },
                  }}
                >
                  <GlobalButton
                    onClick={handelSubmit}
                    py={"16.5px"}
                    px={"12px"}
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderTopRightRadius: "5px",
                      borderBottomRightRadius: "5px",
                      borderTopLeftRadius: {md:"0",xs:"5px"},
                      borderBottomLeftRadius: {md:"0",xs:"5px"},
                    }}
                    color={"white"}
                  >
                    {t("Select")}
                  </GlobalButton>
                </Box>
              </Box>

              <AppSmallSection firstSection />
            </GlobalDisplayFlexColumnBox>

            {/*  Image Right Section */}

            <Box
              data-aos="fade-left"
              sx={{
                width: { md: "50%", xs: "100%" },
                height: { sm: "710px", xs: "350px" },
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <img
                alt="img"
                loading="lazy"
                src={rightPhotoSection?.src}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          </GlobalDisplayFlexBox>
        </Box>
      </Box>
      <ServicesDialog
        openOrderDialog={openOrderDialog}
        handleClose={handelClose}
        homeServices={homeServices}
      />
    </>
  );
};

export default FirstSection;

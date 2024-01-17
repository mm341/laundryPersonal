import Meta from "@/Components/GlobalComponent/Meta";
import GlobalTypography from "@/Components/HomePage/GlobalTypography";
import FilterProductsWithService from "@/Components/Pricing/FilterProductsWithService";
import PublicContainer from "@/Components/PublicContainer";
import {
  GlobalDisplayFlexBox,
  GlobalDisplayFlexColumnBox,
} from "@/styles/PublicStyles";
import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const Pricing = () => {
  //  hooks
  const { t } = useTranslation();

  return (
    <>
    <Meta
        title={"pricing"}
        // ogImage={`${configData?.base_urls?.react_landing_page_images}/${landingPageData?.banner_section_full?.banner_section_img_full}`}
      />
    <PublicContainer>
      <GlobalDisplayFlexColumnBox gap={"64px"}>
        <GlobalDisplayFlexColumnBox gap={"32px"}>
          <GlobalTypography FirstSection clearBg text="Price List" />
          <Typography
            sx={{ textAlign: "center", fontSize: "20px", fontWeight: "400" }}
          >
            {t(
              "It’s our goal to make premium laundry service work with all budgets."
            )}
          </Typography>
        </GlobalDisplayFlexColumnBox>

        <FilterProductsWithService/>
      </GlobalDisplayFlexColumnBox>
    </PublicContainer>
    </>
  );
};

export default Pricing;

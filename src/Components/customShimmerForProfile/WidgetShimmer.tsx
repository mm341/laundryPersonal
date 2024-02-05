import React from "react";

import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { CustomBoxFullWidth } from "@/styles/PublicStyles";
const WidgetShimmer = () => {
  return (
    <CustomBoxFullWidth>
      <Grid container spacing={1} justifyContent="center">
        {[...Array(4)].map((item, index) => {
          return (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="92px"
                style={{
                  borderRadius: "5px",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </CustomBoxFullWidth>
  );
};
export default WidgetShimmer;

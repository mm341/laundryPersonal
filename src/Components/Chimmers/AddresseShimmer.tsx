import React from "react";

import { alpha, Grid, Paper, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { CustomBoxFullWidth } from "@/styles/PublicStyles";
const AddresseShimmer = () => {
  return (
    <CustomBoxFullWidth>
      <Grid container>
        {[...Array(4)].map((item, index) => {
          return (
            <Grid
              item
              container
              spacing={1}
              key={index}
              sx={{
                backgroundColor: (theme) =>
                  alpha(theme.palette.primary.main, 0.3),
                marginBottom: "5px",
                borderRadius: "10px",
              }}
              padding={{ xs: ".6rem", md: "1rem" }}
              justifyContent="space-between"
            >
              <Grid item md={7} xs={4.5}>
                <Stack spacing={0.5}>
                  <Skeleton variant="text" width="50px" height={20} />
                  <Skeleton variant="text" width="50px" height={20} />
                </Stack>
              </Grid>
              <Grid item md={5} xs={7.5} sm={7.5}>
                <Stack spacing={1} alignItems="end">
                  <Skeleton variant="text" width="50px" height={20} />
                  <Skeleton variant="text" width="150px" height={20} />
                </Stack>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </CustomBoxFullWidth>
  );
};
export default AddresseShimmer;

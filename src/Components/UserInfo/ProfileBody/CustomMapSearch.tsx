import React from "react";

import { Autocomplete, Paper, Stack, styled, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

// const CssTextField = styled(TextField)({
//     '& label.Mui-focused': {
//         color: '#EF7822',
//         background: '#fff',
//     },
//     '& .MuiInput-underline:after': {
//         borderBottomColor: '#EF7822',
//         background: '#fff',
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//         border: 'none',
//     },
//     '& .MuiOutlinedInput-root': {
//         border: '2px solid #EF7822 ',
//         '& fieldset': {
//             borderColor: '#EF7822',
//         },
//         '&:hover fieldset': {
//             borderColor: '#EF7822',
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: '#EF7822',
//         },
//     },
// })
const CustomMapSearch = ({
  setSearchKey,
  setEnabled,
  predictions,
  setPlaceId,
  setPlaceDescription,
  setPlaceDetailsEnabled,
  searchKey,
  isLoadingPlacesApi,
}: {
  setSearchKey: (e: { description: string }) => void;
  setEnabled: (e: boolean) => void;
  predictions: any[];
  setPlaceId: (e: string) => void;
  setPlaceDescription: (e: string) => void;
  setPlaceDetailsEnabled: (e: boolean) => void;
  searchKey: { description: string };
  isLoadingPlacesApi: boolean;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Stack width={"100%"} mb="1rem">
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
          }}
        >
          <Autocomplete
            fullWidth
            freeSolo
            id="combo-box-demo"
            getOptionLabel={(option) => option.description}
            options={predictions}
            value={searchKey}
            loading={isLoadingPlacesApi}
            loadingText={t("Loading...")}
            onChange={(event, value) => {
              if (value) {
                if (value?.place_id) {
                  setPlaceId(value?.place_id);
                  setPlaceDescription(value?.description);
                }
              }
              setPlaceDetailsEnabled(true);
            }}
            clearOnBlur={true}
            renderInput={(params) => (
              <TextField
                label={t("Search location")}
                {...params}
                sx={{ backgroundColor: "white" }}
                placeholder={t("Search location here...")}
                onChange={(event: any) => {
                  setSearchKey({
                    description: event.target.value,
                  });
                  if (event.target.value) {
                    setEnabled(true);
                  } else {
                    setEnabled(false);
                  }
                }}
                // onKeyPress={(e) => {
                //   if (e.key === "Enter") {
                //     setSearchKey({
                //       description: event.target.value,
                //     });
                //   }
                // }}
              />
            )}
          />
        </Paper>
      </Stack>
    </>
  );
};
export default CustomMapSearch;

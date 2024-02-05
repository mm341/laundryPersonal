import { paperBoxShadow } from "@/theme/light-theme-options";
import {
  Box,
  Drawer,
  Paper,
  Stack,
  Stepper,
  Typography,
  styled,
  Link as MenuLink,
  Button,
  Rating,
  Autocomplete,
} from "@mui/material";

export const HomeParentBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "80px",
  width: "100%",
}));

export const GlobalDisplayFlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "20px",
  },
}));

export const GlobalDisplayFlexColumnBox = styled(Box)(
  ({ gap, width }: { gap?: string; width?: string }) => ({
    display: "flex",
    flexDirection: "column",
    gap: gap,
    width: width,
  })
);

export const GlobalButton = styled(Box)(
  ({ py, px, service }: { py: string; px: string; service?: boolean }) => ({
    cursor: "pointer",
    display: !service ? "flex" : "none",
    justifyContent: "center",
    alignItems: "Center",
    py: py,
    px: px,
  })
);

export const CustomStackFullWidth = styled(Stack)(
  ({
    marginBottom,
    marginTop,
  }: {
    marginBottom?: string;
    marginTop?: string;
  }) => ({
    width: "100%",
    marginBottom: marginBottom,
    marginTop: marginTop,
  })
);
export const CustomBoxFullWidth = styled(Box)(({ theme }) => ({
  width: "100%",
}));

export const CustomDrawerForSidebar = styled(Drawer)(({ theme }) => ({
  zIndex: theme.zIndex.appBar + 100,
}));

export const SideDrawerWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  width: "18.5rem",
  padding: "15px",
  [theme.breakpoints.up("md")]: {
    width: "25rem",
  },
}));

export const CustomPaperBigCard = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: "12px",
  width: "100%",
  height: "100%",

  borderRadius: "10px",
  boxShadow: `0px 0px 2px rgba(145, 158, 171, 0.2), 0px 5px 20px ${paperBoxShadow}`,
}));

export const ButtonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "start",
  [theme.breakpoints.up("xs")]: {
    display: "flex",
    justifyContent: "center",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    justifyContent: "start",
  },
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "start",
  },
}));

export const CustomTypography = styled(Typography)(
  ({
    fontWeight,
    align,
    color,
  }: {
    fontWeight?: string;
    align?: string;
    color?: string;
  }) => ({
    color: color,
    fontWeight: fontWeight,
    align: align ? align : "",
  })
);

export const CustomTextFieldContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "5.5rem",
  color: theme.palette.primary.main,
}));

export const CustomStepperStyled = styled(Stepper)(({ theme }) => ({
  "& .mui-style-tus5ib-MuiSvgIcon-root-MuiStepIcon-root": {
    color: theme.palette.primary.main,
  },

  "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
    borderColor: theme.palette.primary.main,
    height: "80px",
  },
  "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
    borderColor: theme.palette.primary.main,
    height: "80px",
    borderTopWidth: "4px",
  },
  "& .MuiStepConnector-root MuiStepConnector-horizontal MuiStepConnector-alternativeLabel Mui-disabled mui-style-zpcwqm-MuiStepConnector-root":
    {
      borderColor: theme.palette.primary.main,
      height: "80px",
      borderTopWidth: "4px",
    },

  "& .MuiStepLabel-iconContainer .Mui-completed": {
    width: "32px",
    height: "32px",
    borderColor: theme.palette.primary.main,
  },
  "& .MuiStepContent-root": {},

  "& .MuiStepLabel-label": {
    marginLeft: "20px",
  },
  "& .MuiStepLabel-iconContainer ": {
    width: "32px",
    height: "32px",
    borderColor: theme.palette.primary.main,
  },
  "& .MuiStepConnector-root ": {
    top: "16px",
  },

  "& .MuiSvgIcon-root": {
    width: "32px",
    height: "32px",
  },
  "& .MuiStepLabel-root": {
    padding: "0px",
  },
}));

export const CustomFooterH1Box = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "46px",
  alignItems: "flex-start",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    gap: "30px",
  },
}));

export const CustomFooterH2Typography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "issmall",
})(({ theme }) => ({
  fontWeight: "700",
  fontSize: "24px",
  color: "white",
  [theme.breakpoints.down("md")]: {
    fontSize: "18px",
  },
}));

export const CustomFooterTypographyBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  alignItems: "flex-start",
  justifyContent: "center",
}));

export const CustomFooterNestedTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "issmall",
})(({ theme }) => ({
  fontWeight: "400",
  fontSize: "20px",
  color: "white",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
}));

export const CustomNavbarTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "issmall",
})(({ theme }) => ({
  fontWeight: "400",
  fontSize: "18px",
  color: "black",
  cursor: "pointer",
  [theme.breakpoints.down("xl")]: {
    fontSize: "12px",
  },
}));

export const NavMenuLink = styled(MenuLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  display: "flex",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
}));

export const CustomDrawer = styled(Drawer)(({ theme }) => ({
  zIndex: 1172,
  "& .MuiDrawer-paper": {
    top: "0px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
}));

export const CustomRating = styled(Rating)(({ theme, color }) => ({
  color: "#FFC107",
  // borderColor: (theme) => theme.palette.primary.main,

  "& .MuiSvgIcon-root": {
    fill: "#FFC107",
  },
  fontSize: "25px",
  [theme.breakpoints.down("md")]: {
    // styles
    fontSize: "16px",
  },
}));

export const PreferableTimeInput = styled(Autocomplete)(({ theme }) => ({
  // border: '1px solid rgba(251, 222, 201)',
  borderRadius: '10px',
  '&.MuiAutocomplete-option': {
      backgroundColor: theme.palette.primary.main,
  },
}))

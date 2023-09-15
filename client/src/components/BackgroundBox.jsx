import { Box, styled } from "@mui/material";

export const StyledDashboard = styled(Box)(({ theme }) => ({
  minHeight: "93vh",
  position: "relative", // Required for positioning the ::before pseudo-element
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}/public/files/KLE Technological University/assets/background.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.2, // Adjust the opacity value as needed
    zIndex: -1, // Move the pseudo-element below other content
    paddingBottom: 3,
  },
}));

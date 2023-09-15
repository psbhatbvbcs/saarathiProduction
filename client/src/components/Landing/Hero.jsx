import React from "react";
import { Box, Container, Typography, styled } from "@mui/material";
import NavbarL from "components/Landing/NavbarL";
import CustomButton from "components/Landing/CustomButton";
import heroImg from "components/Landing/assets/groupStudents.png";
import { ArrowDownwardSharp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(0),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));



  const navigateToAbout = () => {
    navigate("/about");
  };

  return (
    <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <Container sx={{ paddingBottom: "20px" }}>
        <NavbarL />
        <CustomBox>
          <Box sx={{ flex: "1" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to Campus Compass
            </Typography>
            <Title variant="h1">
              Discover a Smarter Campus Life with CampusCompass!
            </Title>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#5A6473",
                my: 4,
              }}
            >
              Your One-Stop Destination for Comprehensive Subject Notes and
              Real-Time College Updates. Stay Informed, Stay Ahead!
            </Typography>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="More About Us"
              heroBtn={true}
              onClickFun={navigateToAbout}
            />
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
        <div style={{ textAlign: "center" }}>
          <ArrowDownwardSharp
            style={{
              fontSize: "36px",
              animation: "scaleAnimation 0.5s ease-in-out infinite alternate",
            }}
          />
        </div>
        <style>
          {`
            @keyframes scaleAnimation {
              0% {
                transform: scale(1);
              }
              100% {
                transform: scale(1.3);
              }
            }
          `}
        </style>
      </Container>
    </Box>
  );
};

export default Landing;

import { styled, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import houseCard from "components/Landing/assets/landingImage.png";

const Details = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(10),
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const ImgContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  }));


  const Divider = styled("div")(({ theme }) => ({
    width: "13%",
    height: "5px",
    backgroundColor: "#000339",
    [theme.breakpoints.down("md")]: {
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));

  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );;


  return (
    <Box sx={{ py: isNonMobile ? 5 : 1, bgcolor: "#F5FAFE" }}>
      <Container>
        <CustomBox>
          <ImgContainer>
            <img src={houseCard} alt="house" style={{ width: "100%" }} />
          </ImgContainer>

          <Box width={isNonMobile ? "60%" : "100%"}>
            <Divider />
            <Typography
              sx={{
                fontSize: "35px",
                color: "#000339",
                fontWeight: "700",
                my: 3,
              }}
            >
              Some amazing features of Campus Compass
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#5A6473",
                lineHeight: "27px",
                textAlign: "left"
              }}
            >
              <li>Find all neccessary information at one place</li>
              <li>Switch between Dark and Light Mode</li>
              <li>Open documents on your browser or download for later use</li>
              <li>Customizable User profile. Make it your own!</li>
              <li>Find your fellow friends who are online</li>
            </Typography>
          </Box>
        </CustomBox>

      </Container>
    </Box>
  );
};

export default Details;
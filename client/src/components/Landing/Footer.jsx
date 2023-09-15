import { styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";

import fbIcon from "components/Landing/assets/fbicon.png";
import twitterIcon from "components/Landing/assets/twittericon.png";
import linkedinIcon from "components/Landing/assets/linkedinicon.png";
import { Instagram } from "@mui/icons-material";
import instagramIcon from "components/Landing/assets/instagram.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));

  const FooterLink = styled("span")(({ theme }) => ({
    fontSize: "16px",
    color: "#7A7A7E",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));


  const navigate = useNavigate();

  return (
    <Box sx={{ py: 5 }}>
      <CustomContainer>
        <CustomContainer>




          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Company
            </Typography>
            <FooterLink onClick={() => window.open("/terms-of-use", '_blank')}>Terms of use</FooterLink>
            <br />
            <FooterLink onClick={() => window.open("/privacy-policy", '_blank')}>Privacy</FooterLink>
            <br />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#1C1C1D",
                fontWeight: "700",
                mb: 2,
              }}
            >
              Get in touch
            </Typography>

            <Typography
              sx={{
                fontSize: "16px",
                color: "#7A7A7E",
                fontWeight: "500",
                mb: 2,
              }}
            >
              Follow us on Instagram!
            </Typography>

            <IconBox>
              <img
                src={instagramIcon}
                width={"20px"}
                height={"20px"}
                alt="twitterIcon"
                style={{ cursor: "pointer" }}
              />
            </IconBox>
          </Box>
        </CustomContainer>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
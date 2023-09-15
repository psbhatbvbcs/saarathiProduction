import { IconButton, styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { toast } from "react-hot-toast";

const GetStarted = () => {
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: "#17275F",
    height: "300px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(2, 2, 0, 2),
      width: "95%",
    },
  }));

  const CustomBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3, 0, 5, 0),
    margin: theme.spacing(0, 2, 0, 2),
    [theme.breakpoints.down("md")]: {
      padding: "0",
    },
  }));

  const handleEmailCopy = () => {
    const email = "admsaarathi@gmail.com";
    navigator.clipboard.writeText(email)
      .then(() => {
        toast.success("Email copied to clipboard!");
      })
      .catch(error => {
        console.error("Unable to copy email: ", error);
      });
  };

  return (
    <CustomBox>
      <CustomContainer>
        <Box>
          <Typography
            sx={{ fontSize: "35px", color: "white", fontWeight: "700" }}
          >
            Give Feedback!
          </Typography>
          <Typography
            sx={{ fontSize: "16px", color: "#ccc", fontWeight: "500", my: 3, display: "flex", alignItems: "center" }}
          >
            Contact us on admsaarathi@gmail.com
            <IconButton onClick={handleEmailCopy} color="primary">
              <FileCopyIcon />
            </IconButton>
          </Typography>
        </Box>
      </CustomContainer>
    </CustomBox>
  );
};

export default GetStarted;
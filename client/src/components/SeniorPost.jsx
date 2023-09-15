import { Avatar, Box, Typography, styled, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StyledDashboard } from "components/BackgroundBox";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  color: "primary",
  fontWeight: "bold",
  margin: theme.spacing(0, 0, 1, 4),
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}));

const SeniorPost = () => {
  const { postId } = useParams();
  const seniorsData = useSelector((state) => state.app.seniorsData);
  const server = useSelector((state) => state.app.server);
  const [postData, setPostData] = useState({});
  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );
  const mode = useSelector((state) => state.app.mode);

  useEffect(() => {
    setPostData(seniorsData.find((post) => post._id === postId));
  }, [seniorsData, postId]);

  return (
    <StyledDashboard>
      <Box
        sx={{ minHeight: "90vh", bgcolor: mode === "light" ? "wheat" : "" }}
        m={isNonMobile ? "0rem 3rem" : ""}
        pt={"1rem"}
        borderRadius={"30px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Title>{postData.title}</Title>

        <Box
          width={"70%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={"15px"}
        >
          <Typography
            variant="body1"
            fontWeight={600}
            justifyContent={"flex-end"}
          >
            -{postData.author}
          </Typography>
          <Avatar
            src={`${server}/public${postData.filePath}`}
            sx={{ width: "50px", height: "50px" }}
          />
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          m={"1rem"}
        >
          <div
            style={{
              margin: "2rem",
              filter: mode === "dark" ? "invert(100%)" : "none", // Apply invert filter based on mode
            }}
            dangerouslySetInnerHTML={{ __html: postData.content }}
          ></div>
        </Box>
      </Box>
    </StyledDashboard>
  );
};

export default SeniorPost;

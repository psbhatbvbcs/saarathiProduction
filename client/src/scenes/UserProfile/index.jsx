import {
  Avatar,
  Box,
  Chip,
  Container,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { StyledDashboard } from "components/BackgroundBox";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "api/axiosMy";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { userId } = useParams();

  const mode = useSelector((state) => state.app.mode);

  const server = useSelector((state) => state.app.server);

  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );

  const [user, setUser] = useState({});

  useEffect(() => {
    document.title = "Saarathi | User Profile";
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(
          `/v01/users/getUser/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success("User Found");
        setUser(response.data.user);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else if (error.request) {
          toast.error(
            "Network Error. The backend server is offline. Contact the admins or try again later."
          );
        } else {
          toast.error("Unknown Error. Contact the admins or try again later.");
        }
      }
    };

    fetchUser();
  }, [server, userId]);

  return (
    <StyledDashboard>
      <Container sx={{ py: "50px" }}>
        <Box
          bgcolor={mode === "light" ? "wheat" : "rgb(0,0,0,0.4)"}
          borderRadius={"50px"}
          mt={"20px"}
          width={isNonMobile ? "30vw" : "auto"}
          height={"auto"}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              mt: "-50px",
              ml: "75px",
              bgcolor:
                mode === "light" ? "rgb(0,0,0,0.4)" : "rgb(255,255,255,0.5)",
            }}
            src={`${server}/public${user.profilePicture}`}
          />
          <Box
            display={"flex"}
            flexDirection={isNonMobile ? "row" : "column"}
            justifyContent={"center"}
            my={"70px"}
            p={isNonMobile ? "0px 30px" : "70px 30px"}
            gap={isNonMobile ? "30px" : "0"}
          >
            <Box height={"75%"} width={"100%"} my={"70px"} ml={"30px"}>
              <Typography
                fontFamily={"Space Grotesk"}
                variant="h2"
                mb={"20px"}
                color={mode === "light" ? "black" : "lightblue"}
                sx={{ textDecoration: "underline" }}
              >
                {user.name}
              </Typography>
              <Typography fontFamily={"Space Grotesk"} variant="h4" mb={"5px"}>
                <li>Badges</li>
              </Typography>
              <Box display={"flex"} mb={"15px"}>
                {user?.badges?.length > 0 ? (
                  user.badges[0].split(",").map((badge) => (
                    <Chip
                      key={badge}
                      label={badge}
                      variant="filled"
                      size="medium"
                      color={mode === "light" ? "secondary" : "info"}
                      sx={{
                        m: "5px",
                        ml: "30px",
                        borderColor: "black",
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    />
                  ))
                ) : (
                  <List>
                    <ListItem>
                      <Typography fontStyle={"italic"} variant="body1">
                        {" "}
                        No badges yet. Update Profile to set custom badges!{" "}
                      </Typography>
                    </ListItem>
                  </List>
                )}
              </Box>

              <Typography fontFamily={"Space Grotesk"} variant="h4" mb={"5px"}>
                <li>Semester</li>
              </Typography>
              <Box display={"flex"}>
                {user.semester ? (
                  <List>
                    <ListItem>
                      <Typography
                        fontStyle={"italic"}
                        variant="h5"
                        ml={"30px"}
                        mb={"15px"}
                      >
                        {user.semester}
                      </Typography>
                    </ListItem>
                  </List>
                ) : (
                  <List>
                    <ListItem>
                      <Typography fontStyle={"italic"} variant="body1">
                        {" "}
                        Semester not set. Update Profile to set semester.
                      </Typography>
                    </ListItem>
                  </List>
                )}
              </Box>
              <Typography fontFamily={"Space Grotesk"} variant="h4" mb={"5px"}>
                <li>About Me</li>
              </Typography>
              <Box display={"flex"}>
                {user.description ? (
                  <List>
                    <ListItem>
                      <Typography
                        fontStyle={"italic"}
                        variant="body1"
                        ml={"30px"}
                        mb={"15px"}
                      >
                        {user.description}
                      </Typography>
                    </ListItem>
                  </List>
                ) : (
                  <List>
                    <ListItem>
                      <Typography fontStyle={"italic"} variant="body1">
                        {" "}
                        Write something interesting about yourself so that
                        others can get to know you!
                      </Typography>
                    </ListItem>
                  </List>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </StyledDashboard>
  );
};

export default UserProfile;

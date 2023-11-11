import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { StyledDashboard } from "components/BackgroundBox";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ViewDocumentIcon from "@mui/icons-material/OpenInNew";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import booksIcon from "components/Landing/assets/books.png";
import clubIcon from "components/Landing/assets/clubs.png";
import seniorIcon from "components/Landing/assets/senior.png";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { BirdAnimation } from "components/FlyingBird";
import { useEffect, useState } from "react";
import { StyleSheetManager } from "styled-components";
import { Instagram, LinkedIn } from "@mui/icons-material";

const Title = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  color: "primary",
  fontWeight: "bold",
  fontFamily: "space grotesk",
  textAlign: "center",
  padding: "3rem 0rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0.06)", // Transparent background
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Background shadow
  transition: "background-color 0.3s ease", // Smooth transition for hover effect
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.12)", // Darker background on hover
    cursor: "pointer", // Change the mouse icon
  },
}));

const GuidesBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  width: "70%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: "0",
    flexDirection: "column",
  },
}));

const GuideBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.10)", // Darker background on hover
    cursor: "pointer", // Change the mouse icon
  },
  padding: "15px",
  borderRadius: "15px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  const onlineUsers = useSelector((state) => state.app.onlineUsers);
  const mode = useSelector((state) => state.app.mode);
  const server = useSelector((state) => state.app.server);

  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );
  const navigate = useNavigate();

  const [birdPosition, setBirdPosition] = useState({
    top: 50,
    left: -50,
    yshift: 0,
  });
  const birdFlightDuration = isNonMobile ? 30 : 15; // Adjust the flight duration as needed

  useEffect(() => {
    // Function to randomly position the bird and trigger its flight
    const flyBird = () => {
      const randomTop = Math.random() * window.innerHeight - 50;
      const randomyshift = Math.random() * 40 - 20; // Random vertical shift
      setBirdPosition({ top: randomTop, left: -50, yshift: randomyshift });

      setTimeout(flyBird, Math.random() * 15000); // Random interval between flights
    };

    flyBird(); // Start the first flight
  }, []);

  useEffect(() => {
    document.title = "Saarathi | Dashboard";
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/landing"} />;
  }

  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "yshift"}>
      <StyledDashboard>
        <Box
          display={"flex"}
          flexDirection={isNonMobile ? "row" : "column"}
          justifyContent={"space-evenly"}
        >
          <Box width={"100%"}>
            <Container>
              <Title>Welcome to Saarathi!</Title>
              <Divider orientation={"horizontal"} flexItem />
              <Box
                display={"flex"}
                gap={"5px"}
                width={"100%"}
                borderRadius={"20px"}
                flexDirection={isNonMobile ? "row" : "column"}
                justifyContent={"space-evenly"}
              >
                <StyledBox justifyContent={"center"} height={"fit-content"}>
                  <GuidesBox>
                    <GuideBox
                      onClick={() =>
                        navigate(
                          "/notes-dashboard"
                        )
                      }
                    >
                      <img src={booksIcon} alt="buy" />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: mode === "light" ? "#3B3c45" : "white",
                          my: 1,
                        }}
                      >
                        Get your Notes!
                      </Typography>
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: mode === "light" ? "#0689FF" : "lightblue",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            my: 1,
                          }}
                        >
                          How to download?
                        </Typography>
                        <ArrowRightAltIcon />
                      </Box>
                    </GuideBox>
                    <GuideBox
                      onClick={() =>
                        navigate(
                          "/sem-insights"
                        )
                      }
                    >
                      <img src={clubIcon} alt="buy" />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: mode === "light" ? "#3B3c45" : "white",
                          my: 1,
                        }}
                      >
                        Semester Insights
                      </Typography>
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: mode === "light" ? "#0689FF" : "lightblue",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            my: 1,
                          }}
                        >
                          Click to find
                        </Typography>
                        <ArrowRightAltIcon />
                      </Box>
                    </GuideBox>
                    <GuideBox
                      onClick={() =>
                        navigate(
                          "/senior-talks"
			)
                      }
                    >
                      <img src={seniorIcon} alt="buy" />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: mode === "light" ? "#3B3c45" : "white",
                          my: 1,
                        }}
                      >
                        Senior Talks
                      </Typography>
                      <Box
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: mode === "light" ? "#0689FF" : "lightblue",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            my: 1,
                          }}
                        >
                          Click to read
                        </Typography>
                        <ArrowRightAltIcon />
                      </Box>
                    </GuideBox>
                  </GuidesBox>
                </StyledBox>
              </Box>
              <Box
                display={"flex"}
                gap={"10px"}
                width={"100%"}
                borderRadius={"20px"}
                my={"10px"}
                flexDirection={isNonMobile ? "row" : "column"}
                justifyContent={"space-evenly"}
              >
                <StyledBox height={"300px"}>
                  <Typography
                    variant="h4"
                    textAlign={"center"}
                    fontWeight="bold"
                  >
                    Saarathi was brought to you by
                  </Typography>
                  <Box width={"100%"} display={"flex"}>
                    <Box
                      mt={"15px"}
                      display={"flex"}
                      gap={"5px"}
                      width={"100%"}
                      py={"10px"}
                      borderRadius={"20px"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.10)", // Darker background on hover
                          cursor: "pointer", // Change the mouse icon
                        },
                      }}
                    >
                      <Avatar
                        src={`${server}/public/files/KLE Technological University/CSE/profilePics/Pranav Bhat_pranavbhat.png`}
                        sx={{ width: "100px", height: "100px" }}
                      />
                      <Typography
                        variant="h4"
                        fontFamily={"Space Grotesk"}
                        fontWeight={600}
                      >
                        Pranav Bhat
                      </Typography>
                      <Stack direction={"row"} spacing={1}>
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://www.linkedin.com/in/mr-pranav-bhat/",
                              "_blank"
                            )
                          }
                          sx={{ bgcolor: "rgb(0,0,0,0.2)" }}
                        >
                          <LinkedIn />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://www.instagram.com/mr._.bhat/",
                              "_blank"
                            )
                          }
                          sx={{ bgcolor: "rgb(0,0,0,0.2)" }}
                        >
                          <Instagram />
                        </IconButton>
                      </Stack>
                      <Typography
                        variant="body2"
                        textAlign={"center"}
                        fontFamily={"Space Grotesk"}
                      >
                        5th Sem, CSE
                        <br />
                        KLE Technological University
                      </Typography>
                    </Box>

                    <Box
                      mt={"15px"}
                      display={"flex"}
                      gap={"5px"}
                      width={"100%"}
                      py={"10px"}
                      alignItems={"center"}
                      borderRadius={"20px"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(0, 0, 0, 0.10)", // Darker background on hover
                          cursor: "pointer", // Change the mouse icon
                        },
                      }}
                    >
                      <Avatar
                        src={`${server}/public/files/KLE Technological University/CSE/profilePics/vatsmishra.jpeg`}
                        sx={{ width: "100px", height: "100px" }}
                      />
                      <Typography
                        variant="h4"
                        fontFamily={"Space Grotesk"}
                        fontWeight={600}
                      >
                        Vats Mishra
                      </Typography>
                      <Stack direction={"row"} spacing={1}>
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://www.linkedin.com/in/vats-mishra-758769231/",
                              "_blank"
                            )
                          }
                          sx={{ bgcolor: "rgb(0,0,0,0.2)" }}
                        >
                          <LinkedIn />
                        </IconButton>
                        <IconButton
                          onClick={() =>
                            window.open(
                              "https://www.instagram.com/vats_mishra70/",
                              "_blank"
                            )
                          }
                          sx={{ bgcolor: "rgb(0,0,0,0.2)" }}
                        >
                          <Instagram />
                        </IconButton>
                      </Stack>
                      <Typography
                        variant="body2"
                        textAlign={"center"}
                        fontFamily={"Space Grotesk"}
                      >
                        5th Sem, CSE
                        <br />
                        KLE Technological University
                      </Typography>
                    </Box>
                  </Box>
                </StyledBox>
                <StyledBox height={"300px"}>
                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    mb={"20px"}
                    fontStyle={"italic"}
                  >
                    Want to add profile badges, set semester and a quick bio?
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    Go to your profile
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/my-profile");
                    }}
                    color="secondary"
                    sx={{
                      mt: 1,
                      fontSize: "16px",
                      gap: "10px",
                    }}
                    endIcon={<ViewDocumentIcon />}
                  >
                    Profile
                  </Button>
                </StyledBox>
              </Box>
            </Container>
          </Box>
          <Box
            sx={{
              height: isNonMobile ? "80vh" : "50vh",
              width: isNonMobile ? "250px" : "310px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "1rem",
              gap: "5px",
              margin: isNonMobile ? "3rem" : "3rem auto",
              backgroundColor: "rgba(0, 0, 0, 0.06)", // Transparent background
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Background shadow
              transition: "background-color 0.3s ease", // Smooth transition for hover effect
            }}
          >
            <Typography variant="h4" fontWeight="bold">
              Currently Online
            </Typography>
            <List
              sx={{
                maxHeight: isNonMobile ? "80vh" : "50vh",
                overflowY: "auto",
                width: "100%",
                my: "5px",
              }}
            >
              {onlineUsers?.map((user) => (
                <ListItem
                  key={user._id}
                  component={Link} // Use the Link component for navigation
                  to={`/profile/${user._id}`} // Replace with the appropriate route for user profiles
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "8px",
                    textDecoration: "none",
                    cursor: "pointer",
                    textAlign: "center",
                    bgcolor: "rgba(0, 0, 0, 0.10)",
                    borderRadius: "8px",
                    color: mode === "light" ? "#3B3c45" : "white",
                    my: "5px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.12)", // Darker background on hover
                      cursor: "pointer", // Change the mouse icon
                    },
                  }}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    <PersonIcon />
                  </Avatar>
                  {user.name}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <BirdAnimation
          top={birdPosition.top}
          left={birdPosition.left}
          yshift={birdPosition.yshift}
          duration={birdFlightDuration}
        >
          <img
            src={`${server}/public/files/KLE Technological University/assets/astronaut.png`}
            width="50px"
            style={{ opacity: 0.8 }}
            height="50px"
            alt="Ghost"
          />
        </BirdAnimation>
      </StyledDashboard>
    </StyleSheetManager>
  );
};

export default Dashboard;

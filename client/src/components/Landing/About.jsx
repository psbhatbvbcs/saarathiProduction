import React, { useEffect } from "react";
import NavbarL from "./NavbarL";
import {
  Avatar,
  Box,
  Container,
  IconButton,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Instagram } from "@mui/icons-material";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "1rem",
  padding: "1rem",
  backgroundColor: "rgba(0, 0, 0, 0.06)", // Transparent background
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Background shadow
  transition: "background-color 0.3s ease", // Smooth transition for hover effect
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.12)", // Darker background on hover
    cursor: "pointer", // Change the mouse icon
  },
}));

const StyledBoxDupe = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginTop: "1rem",
  padding: "2rem",
  backgroundColor: "rgba(0, 0, 0, 0.06)", // Transparent background
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Background shadow
  transition: "background-color 0.3s ease", // Smooth transition for hover effect
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.12)", // Darker background on hover
    cursor: "pointer", // Change the mouse icon
  },
}));

const About = () => {
  const server = useSelector((state) => state.app.server);
  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );
  useEffect(() => {
    document.title = "CC | About";
  }, []);

  return (
    <Box bgcolor={"#E6F0FF"} height={"fit-content"}>
      <NavbarL />
      <Container sx={{ paddingBottom: "4rem" }}>
        <StyledBox height={"auto"}>
          <Typography variant="h4" textAlign={"center"} fontWeight="bold">
            Campus Compass was brought to you by
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
                src={`${server}/public/files/KLE Technological University/CSE/profilePics/pranavbhat.png`}
                sx={{ width: "100px", height: "100px" }}
              />
              <Typography
                variant={isNonMobile ? "h4" : "h5"}
                fontFamily={"Space Grotesk"}
                fontWeight={600}
              >
                Pranav Bhat
              </Typography>
              <IconButton
                onClick={() =>
                  window.open("https://www.instagram.com/mr._.bhat/", "_blank")
                }
                sx={{ bgcolor: "lightblue" }}
              >
                <Instagram />
              </IconButton>
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
                variant={isNonMobile ? "h4" : "h5"}
                fontFamily={"Space Grotesk"}
                fontWeight={600}
              >
                Vats Mishra
              </Typography>
              <IconButton
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/vats_mishra70/",
                    "_blank"
                  )
                }
                sx={{ bgcolor: "lightblue" }}
              >
                <Instagram />
              </IconButton>
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
        <StyledBoxDupe fontFamily={"Space Grotesk"}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>

          <Typography variant="h5" gutterBottom>
            Why We Did It
          </Typography>
          <Typography variant="body1">
            At Campus Compass, we are passionate about helping university
            students succeed in their academic journey. We understand the
            challenges and pressures that come with higher education, and we
            wanted to create a platform that eases these burdens.
          </Typography>

          <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            How We Did It
          </Typography>
          <Typography variant="body1">
            Campus Compass was built using the cutting-edge MERN (MongoDB,
            Express.js, React, Node.js) stack. This technology stack enables us
            to create a seamless and user-friendly experience for students,
            offering features like real-time updates, easy navigation, and
            robust security.
          </Typography>

          <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            How It Will Be Useful
          </Typography>
          <Typography variant="body1">
            <ul>
              <li>
                <strong>Access to Comprehensive Notes:</strong> We provide a
                vast repository of well-organized and comprehensive notes on a
                wide range of subjects, helping you grasp key concepts easily.
              </li>
              <li>
                <strong>Previous Year Question Papers:</strong> Prepare for
                exams effectively by practicing with actual previous year
                question papers, gaining insights into the exam patterns and
                question types.
              </li>
              <li>
                <strong>Essential Resources:</strong> Find recommended
                textbooks, online courses, and additional learning materials to
                complement your studies.
              </li>
              <li>
                <strong>Semester-Wise Insights:</strong> Get valuable insights
                into each semester's curriculum, including recommended study
                strategies and tips from seniors who have excelled in those
                courses.
              </li>
              <li>
                <strong>Senior Guidance:</strong> Connect with experienced
                seniors who can offer advice on course selection, study
                techniques, and navigating the challenges of university life.
              </li>
            </ul>
          </Typography>

          <Typography variant="body1" style={{ marginTop: "20px" }}>
            We are committed to providing you with the tools and resources you
            need to excel academically and make the most of your university
            experience. Your success is our success!
          </Typography>

          <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
            Join Us in Your Academic Journey
          </Typography>
          <Typography variant="body1">
            We are excited to be a part of your educational journey and look
            forward to helping you achieve your academic goals. Whether you're a
            freshman just starting or a senior looking to share your wisdom,
            Campus Compass is here to support you every step of the way.
          </Typography>

          <Typography variant="body1" style={{ marginTop: "20px" }}>
            If you have any questions, suggestions, or feedback, please don't
            hesitate to contact us at{" "}
            <a href="mailto:campuscompasscontact@gmail.com">
              campuscompasscontact@gmail.com
            </a>
            . <br />
            We'd love to hear from you!
          </Typography>

          <Typography variant="body1" style={{ marginTop: "20px" }}>
            Thank you for choosing Campus Compass as your trusted academic
            companion.
          </Typography>

          <Typography variant="body1" style={{ marginTop: "20px" }}>
            <em>Happy learning!</em>
          </Typography>
        </StyledBoxDupe>
      </Container>
    </Box>
  );
};

export default About;

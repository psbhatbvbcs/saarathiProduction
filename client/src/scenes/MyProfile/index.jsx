import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { StyledDashboard } from "components/BackgroundBox";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "api/axiosMy";
import { toast } from "react-hot-toast";
import { toastEnd, toastStart } from "components/toastLoading";

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(4),
  marginTop: "1rem",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    marginTop: "2rem",
    gap: theme.spacing(2),
  },
}));

const CustomButton = ({
  backgroundColor,
  color,
  buttonIcon,
  buttonText,
  heroBtn,
  guideBtn,
  getStartedBtn,
  onClickFun,
  type,
}) => {
  const CustomStyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: backgroundColor,
    color: color,
    fontWeight: "700",
    fontSize: "14px",
    cursor: "pointer",
    padding: "0.5rem 1.25rem",
    borderRadius: "7px",
    textTransform: "none",
    display: "flex", // Display as flex to align icon and text horizontally
    alignItems: "center", // Align icon and text vertically within the button
    gap: theme.spacing(1), // Add some gap between icon and text
    border: "2px solid transparent",
    width: "90%",
    "&:hover": {
      backgroundColor: color,
      color: backgroundColor,
      borderColor: backgroundColor,
    },
    [theme.breakpoints.down("md")]: {
      margin: (heroBtn || guideBtn) && theme.spacing(0, "auto", 3, "auto"),
      width: (heroBtn || guideBtn) && "90%",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: guideBtn && theme.spacing(3),
      width: guideBtn && "90%",
    },
  }));

  return (
    <CustomStyledButton onClick={onClickFun} type={type}>
      {buttonIcon}
      {buttonText}
    </CustomStyledButton>
  );
};

const MyProfile = () => {
  const mode = useSelector((state) => state.app.mode);
  const user = useSelector((state) => state.app.user);
  const server = useSelector((state) => state.app.server);

  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );
  const userBadgesArray =
    user.badges.length > 0 ? [...new Set(user.badges[0].split(","))] : [];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedQualities, setSelectedQualities] = useState(
    userBadgesArray || []
  );
  const availableQualities = [
    "Friendly",
    "Creative",
    "Organized",
    "Determined",
    "Adventurous",
  ];

  const [semester, setSemester] = useState(user.semester || "");
  const [description, setDescription] = useState(user.description || "");

  const [file, setFile] = useState(null);

  useEffect(() => {
    document.title = "CC | My Profile";
  }, []);

  const handleAddQuality = (quality) => {
    if (selectedQualities.length < 3 && !selectedQualities.includes(quality)) {
      setSelectedQualities([...selectedQualities, quality]);
    } else if (selectedQualities.includes(quality)) {
      handleRemoveQuality(quality);
    }
  };

  const handleRemoveQuality = (quality) => {
    setSelectedQualities(selectedQualities.filter((q) => q !== quality));
  };

  const handleOpenDialog = () => {
    setOpenDialog(!openDialog);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fileType", "profilePicUser");
    formData.append("department", "CSE");
    formData.append("badges", selectedQualities);
    formData.append("semester", semester);
    formData.append("description", description);
    formData.append("myFile", file);

    toastStart("Updating Profile...");

    try {
      const response = await api.post(
        `/v01/users/updateProfile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toastEnd();
      toast.success(response.data.message);
      setDescription("");
      setSemester("");
      setSelectedQualities([]);
      setFile(null);
    } catch (error) {
      toastEnd();
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

  return (
    <StyledDashboard>
      <Container sx={{ py: "50px" }}>
        <Box
          bgcolor={mode === "light" ? "wheat" : "rgb(0,0,0,0.4)"}
          borderRadius={"50px"}
          mt={"20px"}
          width={isNonMobile ? "40vw" : "auto"}
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
            width={"100%"}
            justifyContent={"flex-end"}
            p={"30px 30px"}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ flexDirection: "flex-end" }}
              onClick={handleOpenDialog}
            >
              Edit Profile
            </Button>
          </Box>
          <Box
            display={"flex"}
            flexDirection={isNonMobile ? "row" : "column"}
            justifyContent={"center"}
            my={"-30px"}
            p={isNonMobile ? "0px 30px" : "70px 30px"}
            gap={isNonMobile ? "30px" : "0"}
          >
            <Box height={"75%"} width={"100%"}>
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
              <Box display={"flex"} ml={"30px"} mb={"15px"}>
                {user.badges.length > 0 ? (
                  [...new Set(user.badges[0].split(","))].map((badge) => (
                    <Chip
                      key={badge}
                      label={badge}
                      variant="filled"
                      size={isNonMobile ? "medium" : "small"}
                      color={mode === "light" ? "secondary" : "info"}
                      sx={{
                        m: "5px",
                        borderColor: "black",
                        fontWeight: 600,
                        fontSize: isNonMobile ? "14px" : "12px",
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
      <Dialog open={openDialog} onClose={handleOpenDialog}>
        <DialogTitle fontSize={"24px"}>
          Add User
          <IconButton style={{ float: "right" }} onClick={handleOpenDialog}>
            <CloseIcon color="red"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CustomBox>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: mode === "light" ? "#F5FAFE" : "black",
                borderRadius: "10px",
                height: "auto",
                padding: "20px",
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Box>
                <Typography variant="body1">Select Qualities:</Typography>
                {availableQualities.map((quality) => (
                  <Chip
                    key={quality}
                    label={quality}
                    onClick={() => handleAddQuality(quality)}
                    color={
                      mode === "light"
                        ? selectedQualities.includes(quality)
                          ? "secondary"
                          : "primary"
                        : selectedQualities.includes(quality)
                        ? "success"
                        : "info"
                    }
                    sx={{
                      margin: "2px",
                      cursor: "pointer",
                      bgcolor:
                        mode === "light"
                          ? selectedQualities.includes(quality)
                            ? "secondary"
                            : "primary"
                          : selectedQualities.includes(quality)
                          ? "success"
                          : "info",
                    }}
                  />
                ))}
              </Box>
              <InputLabel
                id="semester-label"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                Select Semester:
              </InputLabel>
              <Select
                labelId="semester-label"
                label={mode === "light" ? "Select Semester" : ""}
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                displayEmpty
                fullWidth
                sx={{
                  backgroundColor:
                    mode === "light" ? "#E6F0FF" : "rgb(255,255,255,0.2)",
                  color: mode === "light" ? "black" : "white",
                  margin: "-20px",
                }}
              >
                <MenuItem value="" disabled>
                  Select Semester
                </MenuItem>
                {["P Cycle", "C Cycle", "3", "4", "5", "6", "7", "8"].map(
                  (item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  )
                )}
              </Select>
              <InputLabel
                id="description-label"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  mt: "15px",
                  mb: "-20px",
                }}
              >
                Write something about yourself:
              </InputLabel>
              <TextField
                label="Write here..."
                type={"text"}
                variant="filled"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
              />
              <InputLabel
                id="profilepic-label"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                  mt: "15px",
                  mb: "-20px",
                }}
              >
                Change Profile Picture:
              </InputLabel>
              <input
                type="file"
                name="file"
                style={{
                  margin: "10px",
                  backgroundColor: "transparent",
                  color: "black",
                  border: "1px solid black",
                  borderRadius: "10px",
                  width: "80%",
                  display: "inline-block",
                  background:
                    mode === "light" ? "#C2D4F4" : "rgb(255,255,255,1)",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  padding: "8px 16px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
              <CustomButton
                backgroundColor={"#0F1B4C"}
                color="#fff"
                buttonText="Sign Up"
                heroBtn={true}
                type="submit"
              />
            </Box>
          </CustomBox>
        </DialogContent>
      </Dialog>
    </StyledDashboard>
  );
};

export default MyProfile;

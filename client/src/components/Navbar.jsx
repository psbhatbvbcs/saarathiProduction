import React, { useMemo, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
import { api } from "api/axiosMy";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setLoading,
  setMode,
  setUser,
} from "store/appSlice";
import { io } from "socket.io-client";
import { toastEnd, toastStart } from "./toastLoading";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const server = useSelector((state) => state.app.server);
  const user = useSelector((state) => state.app.user);
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
  const mode = useSelector((state) => state.app.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const openProfileMenu = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const closeProfileMenu = () => {
    setProfileMenuAnchorEl(null);
  };

  const navigate = useNavigate();
  const socket = useMemo(() => io(`${server}`), [server]);


  const handleLogout = async () => {
    toastStart("Logging Out...");
    try {
      await api.get(`/v01/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully");
      dispatch(setIsAuthenticated(false));
      socket.emit("logout", { _id: user._id, name: user.name });
      dispatch(setUser({}));
      setAnchorEl(null);
      dispatch(setLoading(false));
      navigate("/landing");
      toastEnd();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        dispatch(setIsAuthenticated(true));
        dispatch(setLoading(false));
      } else if (error.request) {
        toast.error(
          "Network Error. The backend server is offline. Contact the admins or try again later."
        );
      } else {
        toast.error("Unknown Error. Contact the admins or try again later.");
      }
      toastEnd();
    }
  };

  const handleModeChange = () => {
    const newMode = mode === "light" ? "dark" : "light";
    dispatch(setMode(newMode));
    localStorage.setItem("mode", newMode); // Store the mode preference in localStorage
  };

  return (
    <AppBar
      sx={{
        background: "none",
        position: "relative", // Required for positioning the ::before pseudo-element
        "&::before": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url("${server}/public/files/KLE Technological University/assets/background.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2, // Adjust the opacity value as needed
          zIndex: -1, // Move the pseudo-element below other content
        },
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={handleModeChange}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton onClick={openProfileMenu}>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          {!isAuthenticated ? (
            // User is not logged in
            <div>
              <Button
                variant="contained"
                sx={{
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.secondary.main,
                  fontSize: "1rem",
                  width: "120px", // Set a fixed width for the button
                  "@media (max-width: 600px)": {
                    // Apply different styles for mobile screens
                    width: "100%", // Full width on mobile screens
                    fontSize: "0.9rem", // Adjust font size for mobile
                  },
                }}
                component={Link}
                to="/login"
              >
                Log In
              </Button>
            </div>
          ) : (
            // User is logged in
            <FlexBetween>
              {/* Wrap IconButton with a div and use the div as the anchor element */}
              <div>
                <IconButton
                  className="hey"
                  onClick={handleClick}
                  sx={{
                    borderRadius: "20px",
                    bgcolor: theme.palette.primary.main,
                    gap: "5px",
                  }}
                >
                  <Avatar 
                    alt="profile"
                    src={`${server}/public${user.profilePicture}`}
                    sx={{
                      height: "40px",
                      width: "40px",
                    }}
                  />
                  <Box textAlign={"left"}>
                    <Typography
                      fontWeight={"bold"}
                      fontSize={"0.85rem"}
                      sx={{
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {user.name}
                    </Typography>
                    {user.badges.length > 0 ? (
                      <Chip
                        key={user.badges[0]?.split(",")[0]}
                        label={user.badges[0]?.split(",")[0]}
                        variant="filled"
                        size="small"
                        color={mode === "light" ? "secondary" : "info"}
                        sx={{
                          borderColor: "black",
                        }}
                      />
                    ) : (
                      ""
                    )}
                  </Box>
                  <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary.main,
                      fontSize: "25px",
                    }}
                  />
                </IconButton>

                {/* ... your existing code ... */}
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
                <Menu
                  anchorEl={profileMenuAnchorEl}
                  open={Boolean(profileMenuAnchorEl)}
                  onClose={closeProfileMenu}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/my-profile");
                      setProfileMenuAnchorEl(null);
                    }}
                  >
                    User Profile
                  </MenuItem>
                </Menu>
              </div>
            </FlexBetween>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
} from "@mui/icons-material";

import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ArticleIcon from "@mui/icons-material/Article";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SchoolIcon from "@mui/icons-material/School";
import StairsIcon from "@mui/icons-material/Stairs";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";

const navItems = [
  {
    text: "Dashboard",
    navigateTo: "dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Get Exam Ready!",
    icon: null,
  },
  {
    text: "Notes",
    navigateTo: "notes-dashboard",
    icon: <DriveFileRenameOutlineIcon />,
  },
  {
    text: "Practice Question Papers",
    navigateTo: "practice-papers",
    icon: <ArticleIcon />,
  },
  {
    text: "Important Resources",
    navigateTo: "important-resources",
    icon: <MenuBookIcon />,
  },

  {
    text: "What to expect?",
    icon: null,
  },
  {
    text: "SeniorTalks",
    navigateTo: "senior-talks",
    icon: <SchoolIcon />,
  },
  {
    text: "Sem Wise Insights",
    navigateTo: "sem-insights",
    icon: <StairsIcon />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.app.user);
  const mode = useSelector((state) => state.app.mode);
  const server = useSelector((state) => state.app.server);

  useEffect(() => {
    setActive(pathname.substring(1));
    
  }, []);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              boxSizing: "border-box",
              position: "fixed",
              bgcolor: isNonMobile ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 1)",
              width: drawerWidth,
              height: "100vh",
            },
          }}
        >
          <Box
            className="sidebar-background"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url("${server}/public/files/KLE Technological University/assets/background.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              opacity: 0.2,
              zIndex: -1,
            }}
          />
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h2" fontWeight={"bold"}>
                    Campus Compass
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft color="secondary" />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, navigateTo, icon }, index) => {
                if (!icon) {
                  return (
                    <Typography
                      variant="h4"
                      key={text}
                      sx={{
                        m: "2.25rem 0 1rem 2rem",
                        color: theme.palette.secondary.main,
                        fontWeight: "bold",
                        textDecoration: "underline",
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                const navigateToPath = navigateTo.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${navigateToPath}`);
                        setActive(lcText);
                        !isNonMobile && setIsSidebarOpen(false);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                        //borderBottom: "1px solid #7D8589",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText>
                        <Typography
                          variant="body2"
                          sx={
                            mode === "dark"
                              ? {
                                  color:
                                    active === lcText
                                      ? "rgb(0, 0, 0, 0.50)"
                                      : "rgb(255, 255, 255, 0.80)",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                }
                              : {
                                  color:
                                    active === lcText
                                      ? "rgb(0, 0, 0, 0.50)"
                                      : "#7D8589",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                }
                          }
                        >
                          {text}
                        </Typography>
                      </ListItemText>
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position={"fixed"} bottom={"1rem"}>
            <Divider />
            <FlexBetween
              textTransform={"none"}
              gap={"1rem"}
              m={"1.5rem 0rem 0 3rem"}
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
                  fontSize={"0.9rem"}
                  sx={{
                    color: "secondary",
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;

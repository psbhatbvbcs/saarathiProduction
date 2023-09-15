import { Box, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled } from '@mui/material'
import React, { useState } from 'react'

import logoImg from "components/Landing/assets/logoImg.png"
import CustomButton from './CustomButton'
import MenuIcon from '@mui/icons-material/Menu'
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useNavigate } from 'react-router-dom'


export const NavbarL = () => {

  const [mobileMenu, setMobileMenu] = useState({ left: false, })

  const navigate = useNavigate()

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "About", "Contact"].map((text, index) => (
          <ListItem key={text} onClick={() => {
            if (index === 0) {
              navigate("/")
            } else if (index === 1) {
              navigate("/about")
            } else if (index === 2) {
              navigate("/contact")
            }
          }}
            disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <HomeIcon />}
                {index === 1 && <ListAltIcon />}
                {index === 2 && <ContactsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        )
        )}
      </List>

    </Box>
  )



  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "gray",
    },
  }));

  const NavLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    color: "#4F5361",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    mixBlendMode: "multiply",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));


  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem"
        }}
      >
        <Box
          sx={{ display: "flex", alignItems: "center" }}
        >
          <CustomMenuIcon onClick={toggleDrawer("left", true)} />
          <Drawer anchor='left' open={mobileMenu["left"]} onClose={toggleDrawer("left", false)}>
            {list("left")}
          </Drawer>
          <NavbarLogo src={logoImg} alt="logo" onClick={() => navigate("/landing")} />
        </Box>
        <NavLinksBox>
          <NavLink variant='body2' onClick={() => navigate("/landing")}>Home</NavLink>
          <NavLink variant='body2' onClick={() => navigate("/about")}>About</NavLink>
          <NavLink variant='body2' onClick={() => navigate("/contact")}>Contact</NavLink>
        </NavLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem"
        }}
      >
        <NavLink variant='body2' onClick={() => navigate("/login")}>Log in</NavLink>

        <CustomButton backgroundColor="#0F1B4C" color="#fff" buttonText="Sign Up" onClickFun={() => navigate("/register")} />

      </Box>
    </NavbarContainer>
  )

}

export default NavbarL
import React from 'react';
import { Box, Typography, ThemeProvider, createTheme, styled, Container, Button } from '@mui/material';
import NavbarL from 'components/Landing/NavbarL';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import ghostImg from "assets/ghost-img.png"
import { Link, } from 'react-router-dom';

const Error404 = () => {

    const CustomBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: theme.spacing(5),
        marginTop: "8rem",
        [theme.breakpoints.down("md")]: {
            marginTop: "4rem",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
    }));

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: "64px",
        color: "#000336",
        fontWeight: "bold",
        margin: theme.spacing(2, 0, 2, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        }
    }));

    return (
        <Box
            sx={{
                // Remove fontFamily and other styles from here
                backgroundColor: 'hsl(38, 69%, 59%)',
                color: 'hsl(38, 8%, 8%)',
            }}
            height={"100vh"}
            width={"100vw"}
        >
            <style>
                {`
                    @keyframes floaty {
                        0% {
                            transform: translateY(0);
                        }
                        100% {
                            transform: translateY(15px);
                        }
                    }

                    @keyframes shadow {
                        0% {
                            transform: scale(1, 1);
                        }
                        100% {
                            transform: scale(.85, .85);
                        }
                    }
                `}
            </style>
            <Container>
                <NavbarL />
                <CustomBox>
                    <Box sx={{ flex: "1" }} display={"flex"} flexDirection={"column"} alignItems={theme.breakpoints.down("md") ? "" : "center"}>
                        <Typography variant='body2'
                            fontWeight={600}
                            sx={{
                                fontSize: "20px",
                                mb: 2
                            }}>
                            Error 404
                        </Typography>
                        <Title variant="h1" >
                            Hey Buddy!
                        </Title>
                        <Typography
                            variant='body2'
                            fontWeight={600}
                            width={theme.breakpoints.down("md") ? "100%" : "80%"}
                            sx={{
                                fontSize: "18px",
                                my: 3
                            }}
                        >
                            We can't seem to find the page
                            you are looking for.
                        </Typography>
                        <Link to="/landing" style={{ textDecoration: 'none' }}>
                            <Button variant='contained' sx={{ width: "50%", bgcolor: "black", borderRadius: "20px", lineHeight: "39px" }} >
                                Go to Home
                            </Button>
                        </Link>                    </Box>

                    <Box sx={{ flex: "1" }} display={"flex"} flexDirection={"column"} alignItems={"center"}>
                        <img
                            src={ghostImg}
                            alt="heroImg"
                            style={{ maxWidth: "70%", width: "100%", marginBottom: "2rem", animation: "floaty 1.3s infinite alternate", }} // Adjust maxWidth and width
                        />
                        <div
                            style={{
                                width: '250px', // Add single quotes around the values
                                height: '35px', // Add single quotes around the values
                                backgroundColor: 'hsla(38, 21%, 19%, 0.16)', // Corrected background-color
                                margin: '0 auto', // Add single quotes around the value
                                borderRadius: '50%', // Add single quotes around the value
                                filter: 'blur(7px)', // Add single quotes around the value
                                animation: 'shadow 1.3s infinite alternate' // Add single quotes around the value
                            }}
                        ></div>

                    </Box>

                </CustomBox>

            </Container>
        </Box >
    );
}

// Define a custom theme with the desired font family
const theme = createTheme({
    typography: {
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 400,
    },
});

const ThemedError404 = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <ThemeProvider theme={theme}>
                <Error404 />
            </ThemeProvider>
        </MuiThemeProvider>
    );
}

export default ThemedError404;

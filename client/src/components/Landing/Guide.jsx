import React from 'react'
import { Box, styled, Typography } from "@mui/material"

import booksIcon from "components/Landing/assets/books.png"
import clubIcon from "components/Landing/assets/clubs.png"
import seniorIcon from "components/Landing/assets/senior.png"

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CustomButton from './CustomButton'


const Guide = () => {

    const CustomBox = styled(Box)(({ theme }) => ({
        width: "30%",
        [theme.breakpoints.down("md")]: {
            width: "85%"
        }
    }))

    const GuidesBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-around",
        width: "70%",
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        [theme.breakpoints.down("md")]: {
            width: "100%",
        },
        [theme.breakpoints.down("sm")]: {
            marginBottom: "0",
            flexDirection: "column",
        }
    }))

    const GuideBox = styled(Box)(({ theme }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.10)', // Darker background on hover
            cursor: 'pointer', // Change the mouse icon
        },
        padding: "15px",
        borderRadius: "15px",
        marginTop: theme.spacing(5),
        [theme.breakpoints.down("sm")]: {
            margin: theme.spacing(2, 0, 2, 0),
        }
    }))

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                mt: "25px",
                mb: 10,
            }}
        >
            <div style={{
                width: "5%",
                height: "5px",
                backgroundColor: "#000339",
                margin: "0 auto"
            }}>
            </div>
            <Typography variant='h3' sx={{
                fontSize: "35px",
                fontWeight: "bold",
                color: "#000339",
                my: 3
            }}
            >
                How it works?
            </Typography>

            <CustomBox>
                <Typography variant='body2' sx={{
                    fontSize: "16px",
                    color: "#5A6473",
                    fontWeight: "500",
                    textAlign: "center",
                }}>
                    Everything you need to stay updated on campus! <br />Notes, Semester Wise and Senior Insights? We have everything!
                </Typography>
            </CustomBox>

            <GuidesBox>
                <GuideBox>
                    <img src={booksIcon} alt="buy" />
                    <Typography variant='body2' sx={{
                        fontWeight: "500", fontSize: "20px", color: "#3B3c45", my: 1
                    }}>
                        Get Exam Ready!
                    </Typography>
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant='body2' sx={{
                            fontWeight: "bold", fontSize: "14px", color: "#0689FF", my: 1
                        }}>
                            How to download?
                        </Typography>
                        <ArrowRightAltIcon style={{ color: "#0689FF" }} />
                    </Box>
                </GuideBox>

                <GuideBox>
                    <img src={clubIcon} alt="buy" />
                    <Typography variant='body2' sx={{
                        fontWeight: "500", fontSize: "20px", color: "#3B3c45", my: 1
                    }}>
                        Semester Insights
                    </Typography>
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant='body2' sx={{
                            fontWeight: "bold", fontSize: "14px", color: "#0689FF", my: 1
                        }}>
                            How to find?
                        </Typography>
                        <ArrowRightAltIcon style={{ color: "#0689FF" }} />
                    </Box>
                </GuideBox>

                <GuideBox>
                    <img src={seniorIcon} alt="buy" />
                    <Typography variant='body2' sx={{
                        fontWeight: "500", fontSize: "20px", color: "#3B3c45", my: 1
                    }}>
                        Senior Talks
                    </Typography>
                    <Box
                        sx={{
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant='body2' sx={{
                            fontWeight: "bold", fontSize: "14px", color: "#0689FF", my: 1
                        }}>
                            Where to read?
                        </Typography>
                        <ArrowRightAltIcon style={{ color: "#0689FF" }} />
                    </Box>
                </GuideBox>
            </GuidesBox>
        </Box>
    )
}

export default Guide
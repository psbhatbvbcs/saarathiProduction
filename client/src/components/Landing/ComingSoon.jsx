import React from 'react'
import { Box, styled, Typography, useMediaQuery } from "@mui/material"

import booksIcon from "components/Landing/assets/books.png"
import clubIcon from "components/Landing/assets/clubs.png"
import seniorIcon from "components/Landing/assets/senior.png"

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import CustomButton from './CustomButton'


const ComingSoon = () => {

    const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );;


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
        gap: isNonMobile ? "50px" : "30px",
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
        textAlign: "center",
        alignItems: "center",
        width: "100%",
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
                my: 3,
                textAlign: "center",
            }}
            >
                Coming Soon on Saarathi
            </Typography>

            <CustomBox>
                <Typography variant='body2' sx={{
                    fontSize: "16px",
                    color: "#5A6473",
                    fontWeight: "500",
                    textAlign: "center",
                }}>
                    New features to make your experience even more amazing!
                </Typography>
            </CustomBox>

            <GuidesBox>
                <GuideBox>
                    <Typography variant='body2' sx={{
                        fontWeight: "500", fontSize: "24px", color: "#3B3c45", my: 1, textDecoration: "underline",
                    }}>
                        Whatsapp Chat Bot
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant='body2' sx={{
                            fontWeight: "bold", fontSize: "18px", color: "#0689FF", my: 1
                        }}>
                            A WhatsApp chatbot to help you download resources on the go directly to your mobile!
                        </Typography>
                    </Box>
                </GuideBox>
                <GuideBox>
                    <Typography variant='body2' sx={{
                        fontWeight: "500", fontSize: "24px", color: "#3B3c45", my: 1, textDecoration: "underline",
                    }}>
                        Browser Extension
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant='body2' sx={{
                            fontWeight: "bold", fontSize: "18px", color: "#0689FF", my: 1
                        }}>
                            An extension to help you save text, screenshots and important documents from anywhere on the internet, directly to your Saarathi profile
                        </Typography>
                    </Box>
                </GuideBox>

                <GuideBox>
                    <Typography variant='body2' sx={{
                        fontWeight: "500", fontSize: "24px", color: "#3B3c45", my: 1, textDecoration: "underline",
                    }}>
                        Mobile App
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant='body2' sx={{
                            fontWeight: "bold", fontSize: "18px", color: "#0689FF", my: 1
                        }}>
                            A fully functional mobile app built on React Native. All features included
                        </Typography>
                    </Box>
                </GuideBox>
            </GuidesBox>
        </Box>
    )
}

export default ComingSoon
import React from 'react'
import { Box, Container, Typography, styled } from '@mui/material'
import logoImg from "components/Landing/assets/logoImg.png"
import starsImg from "components/Landing/assets/Star.png"
import logosImg from "components/Landing/assets/logos.png"




const Companies = () => {

    const CustomContainer = styled(Container)(({ theme }) => ({
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: theme.spacing(4)
        }
    }));

    const CustomBox = styled(Box)(({ theme }) => ({
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(4)
        
        }
    }))

    return (
        <Box sx={{mt: 5}}>
            <CustomContainer>
                <CustomBox>
                    <img src={logoImg} alt="logo" style={{maxWidth: "200px"}}/>
                   
                </CustomBox>

                <Box>
                     <Typography variant='body2' sx={{color: "#7D8589", fontSize: "16px", fontWeight: "bold", mt: 2, mixBlendMode: "multiply"}}>
                        Join a community of students growing together!
                    </Typography>
                </Box>
            </CustomContainer>

            
        </Box>
    )
}

export default Companies
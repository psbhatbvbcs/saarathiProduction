import { Box, Typography, styled, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const Title = styled(Typography)(({ theme }) => ({
    fontSize: "32px",
    color: "primary",
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 1, 4),
    [theme.breakpoints.down("sm")]: {
        fontSize: "24px",
    }
}));

const SemInsight = ({ insights, semester }) => {
    const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );;
    const [insightData, setInsightData] = useState({})
    const mode = useSelector((state) => state.app.mode);


    useEffect(() => {
        setInsightData(insights?.find(post => post.semester === semester));
    }, [insights, semester]);



    return (
        <Box m={isNonMobile ? "5rem" : "2rem 1rem"}>

            {insightData ? (
                <Box sx={{ minHeight: "90vh", bgcolor: "wheat" }} m={isNonMobile ? "3rem 3rem" : "1rem 0"} borderRadius={"30px"} display={"flex"} flexDirection={"column"} alignItems={"center"} >



                    <Title>{insightData.title}</Title>
                    <Box width={"100%"} display={"flex"} justifyContent={"flex-start"} m={"1rem"}>
                        <div style={{ margin: "2rem" }} dangerouslySetInnerHTML={{ __html: insightData.content }}></div>
                    </Box>
                </Box>
            )
                : (
                    <Typography
                        variant="body1"
                        fontSize={"18px"}
                        color="textSecondary"
                        sx={{
                            backgroundColor: mode === "light" ? "wheat" : "rgb(0,0,0,0.5)",
                            borderRadius: "10px",
                            width: "fit-content",
                            padding: "10px"
                        }}
                    >
                        No Inights found.
                    </Typography>
                )}
        </Box >
    )
}

export default SemInsight
import { Avatar, Box, Card, CardActionArea, CardContent, Chip, Grid, IconButton, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import ViewDocumentIcon from "@mui/icons-material/OpenInNew"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SeniorTalksDisplay = ({ seniorsData }) => {
    const server = useSelector((state) => state.app.server)
    const navigate = useNavigate();
    const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );;
    const mode = useSelector((state) => state.app.mode);



    const handleViewPost = (postId) => {
        navigate(`/senior-post/${postId}`);
    }

    return (
        <Box m={isNonMobile ? "5rem" : "2rem 1rem"}>
            <Box>
                <Grid container spacing={6}>
                    {seniorsData?.map((post, index) => (
                        <Grid item xs={10} sm={6} md={5} key={index}>
                            <Card
                                sx={{
                                    backgroundColor: mode === "light" ? '#E6F0FF' : "rgba(0, 0, 0, 0.3)",
                                    padding: '5px',
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Background shadow
                                    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                                    cursor: 'pointer',
                                    height: '100%',
                                    width: isNonMobile ? "600px" : "350px",
                                    '&:hover': {
                                        backgroundColor: mode === "light" ? '#C2D4F4' : "rgba(0, 0, 0, 0.4)",
                                    },
                                }}
                            >
                                <CardActionArea onClick={() => handleViewPost(post._id)}>
                                    <CardContent>
                                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Box>
                                                <Typography
                                                    variant={isNonMobile ? "h3" : "h5"}
                                                    component="div"
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        color: mode === "light" ? "#333" : 'lightblue',
                                                    }}
                                                >
                                                    {post.title}
                                                </Typography>
                                                <Typography my={"10px"} variant="body1">
                                                    Who will find it usefull?
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary">
                                                    --- {post.valuable}
                                                </Typography>
                                                <Chip label={post.author} color="secondary" sx={{ m: "15px 0 0 10px", fontWeight: 600, fontSize: "14px" }} />
                                            </Box>
                                            <Avatar
                                                sx={{
                                                    width: '150px',
                                                    height: '150px',
                                                    backgroundColor: mode === "light" ? "wheat" : "",
                                                }}
                                                alt={post.author}
                                                src={`${server}/public${post.filePath}`}
                                            />
                                        </Box>


                                    </CardContent>
                                </CardActionArea>
                                <Box display={"flex"} justifyContent={"center"} padding={"5px"} width={"fit-content"} gap={"10px"} borderRadius={"20px"} m={"15px auto"}>
                                    <IconButton sx={{ bgcolor: mode === "light" ? "lightgray" : "rgba(0, 0, 0, 0.12)", border: "0.5px solid lightgray" }} onClick={() => handleViewPost(post._id)}>
                                        <ViewDocumentIcon />
                                    </IconButton>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box >
    )
}

export default SeniorTalksDisplay
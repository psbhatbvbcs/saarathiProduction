import { Box, Card, CardActionArea, CardContent, Grid, List, ListItem, ListItemButton, ListItemIcon, TextField, Typography, styled, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'

import ArrowRightIcon from '@mui/icons-material/ArrowRightAlt';
import { subjectsBySemester } from 'jsData/Subjects';
import { useNavigate } from 'react-router-dom';
import { StyledDashboard } from 'components/BackgroundBox';
import { useSelector } from 'react-redux';
import { BirdAnimation } from 'components/FlyingBird';

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "40px",
    color: "primary",
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 1, 4),
    [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
    }
}));


const NotesDashboard = () => {

    const mode = useSelector((state) => state.app.mode)

    const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );;
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const server = useSelector((state) => state.app.server);

    

    useEffect(() => {
        document.title = "CC | Notes"
    }, [])


    return (
        <StyledDashboard color={mode === "light" ? "black" : "white"}>
            <Title>Find your Notes!</Title>
            <Typography ml={4} variant='h4'>
                Hmmmm...Somebody didn't make their notes in class. Well, here they are.
            </Typography>
            <Box
                m={"2rem"}
                display={"flex"}
                alignItems={isNonMobile ? "center" : "flex-start"}
                justifyContent={"space-between"}
                flexDirection={isNonMobile ? "row" : "column"}
            >
                <Typography variant='h3' fontWeight={600} sx={{ textDecoration: "underline", mb: "20px" }} >
                    Semesters:
                </Typography>
                <Box display={"flex"} alignItems={isNonMobile ? "center" : "flex-start"} flexDirection={isNonMobile ? "row" : "column"} gap={"5px"}>
                    <Typography variant='h6'>
                        Search for subjects:
                    </Typography>
                    <TextField
                        label="Enter subject name"
                        variant="outlined"
                        size='small'
                        color='primary'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={isNonMobile ? {
                            mr: "2rem",
                            width: "350px"
                        } : { mr: "", width: "250px" }}
                    />
                </Box>
            </Box>

            <Box m={isNonMobile ? "3rem 2rem" : "1rem 0rem"} display={"flex"}>

                <Grid container spacing={8} padding={isNonMobile ? 1 : 5}>

                    {["P Cycle", "C Cycle", "3", "4", "5", "6", "7", "8"].map((item, index) => {
                        const matchingSubjects = subjectsBySemester[`sem${item}`]?.filter(subject =>
                            subject.toLowerCase().includes(searchQuery.toLowerCase())
                        );

                        if (matchingSubjects?.length === 0) {
                            // If no matching subjects, don't render the card
                            return null;
                        }

                        return (
                            <Grid item xs={10} sm={6} md={3} key={index}>
                                <Card
                                    sx={{
                                        backgroundColor: mode === "light" ? '#E6F0FF' : "rgba(0, 0, 0, 0.3)",
                                        padding: '5px',
                                        borderRadius: '8px',
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Background shadow
                                        transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                                        cursor: 'pointer',
                                        height: '100%',
                                        width: '320px',
                                        '&:hover': {
                                            backgroundColor: mode === "light" ? '#C2D4F4' : "rgba(0, 0, 0, 0.4)",
                                        },
                                    }}
                                >
                                    <CardActionArea>
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                sx={{
                                                    fontSize: '1.2rem',
                                                    fontWeight: 'bold',
                                                    mb: "10px",
                                                    textDecoration: "2px underline",
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                            <Typography variant="h5" fontWeight={600}>
                                                Subjects:
                                            </Typography>
                                            <List
                                                sx={{
                                                    paddingLeft: 0, // Remove default left padding
                                                    listStyleType: 'none', // Remove default list bullet
                                                }}
                                            >
                                                {matchingSubjects?.map((subject) => (
                                                    <ListItem
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            marginBottom: '-15px', // Adjust the gap between list items
                                                        }}
                                                        key={subject}
                                                    >
                                                        <ListItemButton sx={{ marginBottom: "5px", bgcolor: mode === "light" ? "wheat" : "rgba(0, 0, 0, 0.12)", borderRadius: "10px" }} onClick={() => navigate(`/notes/sem/${item}/${subject}`)}>
                                                            <ListItemIcon
                                                                sx={{
                                                                    minWidth: '20px',
                                                                    marginRight: '8px', // Add space before text
                                                                }}
                                                            >
                                                                <ArrowRightIcon /> {/* Use your preferred arrow icon */}
                                                            </ListItemIcon>
                                                            <Typography variant="body2" fontSize={"14px"}>
                                                                {subject}
                                                            </Typography>
                                                        </ListItemButton>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>
                        )
                    })}
                </Grid>
            </Box>
           
        </StyledDashboard>
    )
}

export default NotesDashboard
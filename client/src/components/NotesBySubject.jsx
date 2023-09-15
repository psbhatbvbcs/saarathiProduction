import { useSelector } from 'react-redux'
import { Box, Card, CardActionArea, CardContent, Container, Grid, IconButton, Typography, useMediaQuery, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ViewDocumentIcon from "@mui/icons-material/OpenInNew"
import DownloadDocumentIcon from "@mui/icons-material/FileDownload"
import { toast } from 'react-hot-toast'
import { toastEnd, toastStart } from './toastLoading'



const NotesBySubject = ({ notes, semester, subject }) => {
    const [notesByUnit, setNotesByUnit] = useState({})
    const server = useSelector((state) => state.app.server);
    const mode = useSelector((state) => state.app.mode);
    const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );

    useEffect(() => {
        const sortedNotes = notes?.filter((file) => file.semester === semester && file.subject === subject);
        const nbyunit = sortedNotes?.reduce((acc, item) => {
            if (!acc[item.unit]) {
                acc[item.unit] = [];
            }
            acc[item.unit].push(item);
            return acc;
        }, {});

        setNotesByUnit(nbyunit)
    }, [semester, subject, notes])

    // Code snippet from index.jsx

    const handleOpenFile = async (filePath) => {
        toastStart("Opening file...")
        try {
            const response = await fetch(`${server}/public${filePath}`)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            toastEnd();
            window.open(blobUrl, "_blank")

        } catch (error) {
            toastEnd();
            toast.error("Error opening file")
        }
    }

    const handleDownloadFile = async (filePath, fileName) => {
        toastStart("Downloading file...")
        try {
            const response = await fetch(`${server}/public${filePath}`);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            toastEnd();
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = blobUrl;
            a.download = fileName; // Set the desired filename here
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

        } catch (error) {
            toastEnd();
            toast.error("Error downloading file");
        }
    };




    return (
        <Container sx={{ mt: 5 }}>
            {Object.keys(notesByUnit).length > 0 ?
                (Object.keys(notesByUnit)?.map((unit, index) => (
                    <Box key={index}>
                        <Typography variant="h4" fontWeight={600} my={"20px"} sx={{ textDecoration: "2px underline" }}>
                            Unit {unit}
                        </Typography>
                        <Grid container spacing={6} padding={isNonMobile ? "" : 4} >
                            {notesByUnit[unit]?.map((item, index) => (
                                <Grid item xs={10} sm={6} md={3} key={index}>
                                    <Card
                                        sx={{
                                            backgroundColor: mode === "light" ? '#E6F0FF' : "rgba(0, 0, 0, 0.3)",
                                            padding: '5px',
                                            borderRadius: '8px',
                                            boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.4)',
                                            transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                                            cursor: 'pointer',
                                            height: '100%',
                                            width: '250px',
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
                                                        fontWeight: 'bold',
                                                        textDecoration: "1px underline",
                                                    }}
                                                >
                                                    {item.chapter}
                                                </Typography>
                                                <Typography my={"5px"}>
                                                    {item.name}
                                                </Typography>

                                            </CardContent>
                                        </CardActionArea>
                                        <Box display={"flex"} justifyContent={"space-between"} bgcolor={mode === "light" ? "wheat" : "rgb(0,0,0,0.5)"} borderRadius={"30px"} p={"3px"} m={"15px 30px"}>
                                            <IconButton sx={{ bgcolor: mode === "light" ? "lightgray" : "rgb(0,0,0,0.5)"}} onClick={() => handleOpenFile(item.filePath)}>
                                                <ViewDocumentIcon />
                                            </IconButton>
                                            <IconButton sx={{ bgcolor: mode === "light" ? "lightgray" : "rgb(0,0,0,0.5)"}} onClick={() => handleDownloadFile(item.filePath, item.name)}>
                                                <DownloadDocumentIcon />
                                            </IconButton>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                    </Box>
                ))) :
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
                    No Notes found. Updating Soon!
                </Typography>}
        </Container>
    )
}

export default NotesBySubject

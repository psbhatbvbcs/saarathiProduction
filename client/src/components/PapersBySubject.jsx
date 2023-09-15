import { Box, Card, CardActionArea, CardContent, Container, Grid, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ViewDocumentIcon from "@mui/icons-material/OpenInNew"
import DownloadDocumentIcon from "@mui/icons-material/FileDownload"
import { toast } from 'react-hot-toast'
import { toastStart, toastEnd } from './toastLoading'

import { useSelector } from 'react-redux'

const PapersBySubject = ({ papers, semester, subject }) => {
  const [papersByExam, setPapersByExam] = useState({})

  const server = useSelector((state) => state.app.server);
  const mode = useSelector((state) => state.app.mode);

  useEffect(() => {
    const sortedPapers = papers?.filter((paper) => paper.semester === semester && paper.subject === subject);
    const nbyexam = sortedPapers.reduce((acc, item) => {
      if (!acc[item.exam]) {
        acc[item.exam] = [];
      }
      acc[item.exam].push(item);
      return acc;
    }, {});

    setPapersByExam(nbyexam)
  }, [semester, subject, papers])

  // Code snippet from index.jsx

  const handleOpenFile = async (filePath) => {
    toastStart("Opening File...")

    try {
      const response = await fetch(`${server}/public${filePath}`)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      toastEnd()
      window.open(blobUrl, "_blank")


    } catch (error) {
      toastEnd()
      toast.error("Error opening file")
    }
  }

  const handleDownloadFile = async (filePath, fileName) => {
    toastStart("Downloading File...")

    try {
      const response = await fetch(`${server}/public${filePath}`);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = blobUrl;
      a.download = fileName; // Set the desired filename here
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toastEnd();

    } catch (error) {
      toastEnd();
      toast.error("Error downloading file");
    }
  };


  return (
    <Container sx={{ mt: 5 }}>
      {Object.keys(papersByExam).length > 0 ?
        (Object.keys(papersByExam).map((exam, index) => (
          <Box key={index}>
            <Typography variant="h4" fontWeight={600} my={"20px"} sx={{ textDecoration: "2px underline" }}>
              Exam: {exam}
            </Typography>
            <Grid container spacing={6}>
              {papersByExam[exam].map((item, index) => (
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
                            fontWeight: 'bold',
                          }}
                        >
                          {item.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <Box display={"flex"} justifyContent={"space-between"} bgcolor={mode === "light" ? "wheat" : "rgb(0,0,0,0.5)"} borderRadius={"50px"} m={"15px auto"} width={"35%"} padding={"5px"}>
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
        ))) : (
          <Typography
            variant="body1"
            fontSize={"18px"}
            color="textSecondary"
            textAlign={"center"}
            sx={{
              backgroundColor: mode === "light" ? "wheat" : "rgb(0,0,0,0.5)",
              borderRadius: "10px",
              width: "fit-content",
              padding: "10px",
              margin: "2rem"
            }}
          >
            No Papers found. Updating Soon!
          </Typography>
        )}
    </Container>
  )
}

export default PapersBySubject
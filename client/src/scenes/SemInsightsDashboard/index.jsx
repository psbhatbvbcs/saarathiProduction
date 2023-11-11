import { Box, Card, CardActionArea, CardContent, Grid, Typography, styled, useMediaQuery } from '@mui/material'
import { StyledDashboard } from 'components/BackgroundBox';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Title = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  color: "primary",
  fontWeight: "bold",
  margin: theme.spacing(0, 0, 1, 4),
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  }
}));

const SemInsightsDashboard = () => {
  const isNonMobile = !useMediaQuery(
    "(max-width:600px) or (max-height:600px) or (orientation: portrait)"
  );;
  const navigate = useNavigate();
  const mode = useSelector((state) => state.app.mode);

  useEffect(() => {
    document.title = `Saarathi | Semester Insights`
  }, [])


  return (
    <StyledDashboard>
      <Title>Semester Insights</Title>
      <Typography ml={4} variant='h4'>
        Find insights for each semesters. It's good to know before taking your next step isn't it? ;)
      </Typography>
<Typography ml={4} variant="h6">
        (All documents belong to the respective owners. We do not claim to own any of the resources provided. Please read our Terms of Use on the landing page)
      </Typography>

	  <Box
        m={"2rem"}
        display={"flex"}
        alignItems={isNonMobile ? "center" : "flex-start"}
        justifyContent={"space-between"}
        flexDirection={isNonMobile ? "row" : "column"}
      >
        <Typography variant='h3' fontWeight={600} sx={{ textDecoration: "underline", mb: "20px" }} >
          Select Semester:
        </Typography>

      </Box>

      <Box m={isNonMobile ? "3rem 1rem" : "1rem 0rem"} display={"flex"} alignItems={"center"}>
        <Grid container spacing={8} padding={isNonMobile ? 1 : 5}>

          {["P Cycle", "C Cycle", "3", "4", "5", "6", "7", "8"].map((item, index) => (


            <Grid item xs={10} sm={6} md={3} key={index}>
              <Card
                sx={{
                  backgroundColor: mode === "light" ? '#E6F0FF' : "rgb(93 68 109 / 100%)",
                  padding: '5px',
                  borderRadius: '8px',
                  boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.4)',
                  cursor: 'pointer',
                  height: '100%',
                  width: '320px',
                  '&:hover': {
                    backgroundColor: mode === "light" ? '#C2D4F4' : 'rgb(0,0,0,0.5)',
                  },
                }}
              >
                <CardActionArea onClick={() => { navigate(`/sem-insight/${item}`) }}>
                  <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", }}>
                    <Typography
                      variant='h4'
                      fontWeight={600}
                      sx={{
                        lineHeight: "50px",
                        backgroundColor: mode === "light" ? 'wheat' : '',
                        px: "10px",
                        borderRadius: "10px",
                        color: mode === "light" ? 'black' : 'lightblue',
                      }} >
                      Semester {item}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>

          ))}
        </Grid>
      </Box>
    </StyledDashboard>
  )
}

export default SemInsightsDashboard 

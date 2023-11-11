import React, { useEffect } from 'react'
import { Box, Typography, styled } from '@mui/material';

import { fetchSeniorTalks } from 'api/apiFunctions';
import { toast } from 'react-hot-toast';

import SeniorTalksDisplay from "scenes/SeniorTalksDisplay"
import { useDispatch, useSelector } from 'react-redux';
import { setSeniorsData } from 'store/appSlice';
import { useQuery } from '@tanstack/react-query';
import { StyledDashboard } from 'components/BackgroundBox';



const Title = styled(Typography)(({ theme }) => ({
    fontSize: "36px",
    color: "primary",
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 1, 4),
    [theme.breakpoints.down("sm")]: {
        fontSize: "36px",
    }
}));

const SeniorTalksDashboard = () => {
    const dispatch = useDispatch();
    const server = useSelector((state) => state.app.server);
    const user = useSelector((state) => state.app.user);
    const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
    const seniorsData = useSelector((state) => state.app.seniorsData);
	const mode = useSelector((state) => state.app.mode);

    const id = user.college;

    useEffect(() => {
        document.title = `Saarathi | SeniorTalks`
    }, [])

    const queryKey = ['seniorsQuery']

    useQuery({
        queryKey: queryKey,
        queryFn: () => fetchSeniorTalks(server, id),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: isAuthenticated,
        refetchOnMount: false,
        keepPreviousData: true,

        onSuccess: (data) => {
            dispatch(setSeniorsData(data.seniors))
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <StyledDashboard>
            <Title>Senior Talks</Title>
            <Typography ml={4} variant='h4'>
                Need some guidance? Read what your seniors have to say! <br />Who know? You may have some revelation ;)
            </Typography>
            {seniorsData.length === 0 ? (
        <Typography
          variant="body1"
          fontSize={"18px"}
          color="textSecondary"
ml={4} 
		    mt={3}

		    sx={{
            backgroundColor: mode === "light" ? "wheat" : "rgb(0,0,0,0.5)",
            borderRadius: "10px",
            width: "fit-content",
            padding: "10px",
          }}
        >
          No insights found.
        </Typography>
      ) : (
        <Box>
          <SeniorTalksDisplay seniorsData={seniorsData} />
        </Box>
      )}
		</StyledDashboard>
    )
}

export default SeniorTalksDashboard

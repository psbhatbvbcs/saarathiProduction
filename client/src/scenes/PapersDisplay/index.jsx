import { useParams } from 'react-router-dom'
import React, { useEffect, } from 'react'
import { Box, Typography, styled } from '@mui/material';

import { fetchPapers } from 'api/apiFunctions';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import PapersBySubject from 'components/PapersBySubject';
import { useDispatch, useSelector } from 'react-redux';
import { setPapers } from 'store/appSlice';
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


const PapersDisplay = () => {

    const { semester, subject } = useParams();

    const dispatch = useDispatch();
    const server = useSelector((state) => state.app.server);
    const user = useSelector((state) => state.app.user);
    const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
    const papers = useSelector((state) => state.app.papers);

    const id = user.college;

    useEffect(() => {
        document.title = `Saarathi | ${subject}`
    }, [subject])

    const queryKey = ['papersQuery']

    useQuery({
        queryKey: queryKey,
        queryFn: () => fetchPapers(server, id),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: isAuthenticated,
        refetchOnMount: false,
        keepPreviousData: true,

        onSuccess: (data) => {
            dispatch(setPapers(data.papers))
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })


    return (
        <StyledDashboard>
            <Title>Question Papers</Title>
            <Box>
                <PapersBySubject papers={papers} subject={subject} semester={semester} />
            </Box>
            </StyledDashboard>
    )
}

export default PapersDisplay
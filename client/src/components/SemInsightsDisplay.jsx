import { useParams } from 'react-router-dom'
import React, { useEffect, } from 'react'
import { Box, Typography, styled } from '@mui/material';

import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import { fetchInsights } from 'api/apiFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { setInsights } from 'store/appSlice';
import SemInsight from './SemInsight';

import { StyledDashboard } from 'components/BackgroundBox';


const Title = styled(Typography)(({ theme }) => ({
    fontSize: "40px",
    color: "primary",
    fontWeight: "bold",
    margin: theme.spacing(0, 0, 1, 4), 
    [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
    }
}));

const SemInsightsDisplay = () => {
    const { semester } = useParams();

    const dispatch = useDispatch();
    const server = useSelector((state) => state.app.server);
    const user = useSelector((state) => state.app.user);
    const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
    const insights = useSelector((state) => state.app.insights);


    const id = user.college;

    useEffect(() => {
        document.title = `CC | Semester Insight`
    }, [])

    const queryKey = ['semInsightsQuery']

    useQuery({
        queryKey: queryKey,
        queryFn: () => fetchInsights(server, id),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: isAuthenticated,
        refetchOnMount: false,
        keepPreviousData: true,

        onSuccess: (data) => {
            dispatch(setInsights(data.insights))
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <StyledDashboard>
            <Title>Semester {semester} Insights</Title>
            <Box>
                <SemInsight insights={insights} semester={semester} />
            </Box>
        </StyledDashboard>

    )
}

export default SemInsightsDisplay
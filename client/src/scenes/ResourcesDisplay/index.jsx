import { useParams } from 'react-router-dom'
import React, { useEffect, } from 'react'
import { Box, Typography, styled } from '@mui/material';

import { fetchLinks } from 'api/apiFunctions';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import LinksBySem from 'components/LinksBySem';
import { useDispatch, useSelector } from 'react-redux';
import { setLinks } from 'store/appSlice';
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

const ResourcesDisplay = () => {
    const { semester } = useParams();

    const dispatch = useDispatch();
    const server = useSelector((state) => state.app.server);
    const user = useSelector((state) => state.app.user);
    const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
    const links = useSelector((state) => state.app.links);


    const id = user.college;

    useEffect(() => {
        document.title = `Saarathi | Important Resources`
    }, [])

    const queryKey = ['linksQuery']

    useQuery({
        queryKey: queryKey,
        queryFn: () => fetchLinks(server, id),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: isAuthenticated,
        refetchOnMount: false,
        keepPreviousData: true,

        onSuccess: (data) => {
            dispatch(setLinks(data.links))
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <StyledDashboard>
            <Title>Resources</Title>
            <Box>
                <LinksBySem links={links} semester={semester} />
            </Box>
        </StyledDashboard>
    )
}

export default ResourcesDisplay
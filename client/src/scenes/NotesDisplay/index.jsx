import { useParams } from 'react-router-dom'
import React, { useEffect, } from 'react'
import { Box,Typography, styled } from '@mui/material';

import { fetchNotes } from 'api/apiFunctions';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

import NotesBySubject from 'components/NotesBySubject';
import { useDispatch, useSelector } from 'react-redux';
import { setNotes } from 'store/appSlice';
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

const NotesDisplay = () => {

    const { semester, subject } = useParams();
    const dispatch = useDispatch();
    const server = useSelector((state) => state.app.server);
    const user = useSelector((state) => state.app.user);
    const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
    const notes = useSelector((state) => state.app.notes);

    const id = user.college;

    useEffect(() => {
        document.title = `Saarathi | ${subject}`
    }, [subject])

    const queryKey = ['notesQuery']

    useQuery({
        queryKey: queryKey,
        queryFn: () => fetchNotes(server, id),
        refetchOnWindowFocus: false,
        retry: 1,
        enabled: isAuthenticated,
        refetchOnMount: false,
        keepPreviousData: true,

        onSuccess: (data) => {
            dispatch(setNotes(data.notes))
        },

        onError: (error) => {
            toast.error(error.message)
        }
    })



    return (
        <StyledDashboard>
            <Title>Find your Notes!</Title>


            <Box>

                <NotesBySubject notes={notes} subject={subject} semester={semester} />

            </Box>
            </StyledDashboard>
    )
}

export default NotesDisplay
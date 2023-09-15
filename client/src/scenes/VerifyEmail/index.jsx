import { useState, useEffect } from 'react';
import { api } from 'api/axiosMy';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import NavbarL from 'components/Landing/NavbarL';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { toastEnd, toastStart } from 'components/toastLoading';



const VerifyEmail = () => {
    const { userRole, userId, tokenId } = useParams();
    const server = useSelector((state) => state.app.server)

    const [validUrl, setValidUrl] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verifyUser = async () => {
            toastStart("Verifying User...")
            try {
                let response;

                if (userRole === "user") {
                    response = await api.get(`/v01/users/verify/user/${userId}/${tokenId}`);
                } else if (userRole === "admin") {
                    response = await api.get(`/v01/admins/verify/admin/${userId}/${tokenId}`);
                }
                toastEnd();
                setMessage(response.data.message);
                setValidUrl(true);
            } catch (error) {
                toastEnd();
                if (error.response) {
                    setMessage(error.response.data.message)
                    setValidUrl(false);
                } else if (error.request) {
                    toast.error('Network Error. The backend server is offline. Contact the admins or try again later.');
                } else {
                    toast.error('Unknown Error. Contact the admins or try again later.');
                }
            }
        };

        verifyUser();
    }, [userRole, userId, tokenId, server]);


    return (
        <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
            <NavbarL />
            <Container sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "70vh", }}>
                {validUrl ? (
                    <Typography variant="h4" color="success" fontWeight={600}>
                        {message}
                    </Typography>
                ) : (
                    <Typography variant="h4" color="error" fontWeight={600}>
                        {message}
                    </Typography>
                )}
            </Container>
        </Box>

    );
};

export default VerifyEmail;

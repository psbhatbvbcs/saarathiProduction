import { Box, Button, Checkbox, FormControlLabel, TextField, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavbarL from 'components/Landing/NavbarL';
import { Navigate, useParams } from 'react-router-dom';
import { api } from 'api/axiosMy';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { toastEnd, toastStart } from 'components/toastLoading';


const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing(4),
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        margin: "1rem",
        gap: theme.spacing(2),
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    fontSize: "48px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(1, 0, 1, 0),
    [theme.breakpoints.down("sm")]: {
        fontSize: "40px",
    }
}));

const CustomButton = ({ backgroundColor, color, buttonIcon, buttonText, heroBtn, guideBtn, getStartedBtn, onClickFun, type }) => {
    const CustomStyledButton = styled(Button)(({ theme }) => ({
        backgroundColor: backgroundColor,
        color: color,
        fontWeight: "700",
        fontSize: "14px",
        cursor: "pointer",
        padding: "0.5rem 1.25rem",
        borderRadius: "7px",
        textTransform: "none",
        display: "flex", // Display as flex to align icon and text horizontally
        alignItems: "center", // Align icon and text vertically within the button
        gap: theme.spacing(1), // Add some gap between icon and text
        border: "2px solid transparent",
        width: "90%",
        "&:hover": {
            backgroundColor: color,
            color: backgroundColor,
            borderColor: backgroundColor
        },
        [theme.breakpoints.down("md")]: {
            margin: (heroBtn || guideBtn) && theme.spacing(0, "auto", 3, "auto"),
            width: (heroBtn || guideBtn) && "90%",
        },
        [theme.breakpoints.down("sm")]: {
            marginTop: guideBtn && theme.spacing(3),
            width: guideBtn && "90%",
        },
    }));

    return (
        <CustomStyledButton onClick={onClickFun} type={type}>
            {buttonIcon}
            {buttonText}
        </CustomStyledButton>
    );
};


const TextFieldWrapper = ({ customSx, ...props }) => {
    const defaultSx = {
        paddingLeft: "10px",
        backgroundColor: "#E6F0FF",
        height: "50px",
        borderRadius: "20px",
        '& .MuiInputLabel-root': {
            background: 'transparent',
            color: 'grey',
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'grey', // Change the focused label color as needed
        },
        '& .MuiFilledInput-underline': {
            '&:before, &:after, &:hover:before, &:hover:after, &:focus:before, &:focus:after, &:active:before, &:active:after,': {
                borderBottom: 'none', // Remove the underline
                color: "black",
            },
        },
        '& .MuiFilledInput-input': {
            borderRadius: '30px',
        },
        '& .MuiFilledInput-root': {
            background: 'transparent',
            color: 'black',
        },
        '& .MuiInputBase-input::placeholder': {
            color: 'black',
        },
    };

    return (
        <TextField
            sx={{ ...defaultSx, ...customSx }}
            {...props}
        />
    );
};

const ResetPassword = () => {

    // const emailRef = useRef();
    // const passwordRef = useRef();
    const server = useSelector((state) => state.app.server);
    const isAuthenticated = useSelector((state) => state.app.isAuthenticated);
    
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { token } = useParams();

    useEffect(() => {
        document.title = "CC | Reset Password"
    }, [])

    const handleShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    }




    if (isAuthenticated) { return <Navigate to={"/dashboard"} replace /> }

    const handleSubmit = async (e) => {
        e.preventDefault();
        toastStart("Changing Password...");
        try {
            const response = await api.post(`/v01/password-reset/reset-password/${token}`,
                {
                    password,
                }, {
                headers: {
                    "Content-Type": "application/json",
                },
            }
            )
            toastEnd();

            toast.success(response.data.message);
            setPassword("");
        } catch (error) {
            toastEnd();
            if (error.response) {
                toast.error(error.response.data.message);
        
              } else if (error.request) {
                toast.error('Network Error. The backend server is offline. Contact the admins or try again later.');
              } else {
                toast.error('Unknown Error. Contact the admins or try again later.');
              }
        }
    };




    return (
        <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
            <NavbarL />
            <CustomBox>
                <Title>Forgot Password?</Title>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        maxWidth: "400px",
                        backgroundColor: "#F5FAFE",
                        borderRadius: "10px",
                        height: "auto",
                        padding: "20px",
                        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
                    }}
                >

                    <TextFieldWrapper
                        label="Enter New Password"
                        type={passwordVisible ? "text" : "password"}
                        variant="filled"
                        id='password'
                        name='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />
                    <Box width={"100%"} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                        <FormControlLabel
                            control={<Checkbox value="showPassword" color="secondary" />}
                            label="Show Password"
                            onChange={handleShowPassword}
                        />
                    </Box>

                    <CustomButton backgroundColor="#0F1B4C" color="#fff" buttonText="Reset Password" heroBtn={true} type={"submit"} />
                </Box>

            </CustomBox>
        </Box>
    )
};

export default ResetPassword;

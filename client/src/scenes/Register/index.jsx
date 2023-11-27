import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select, TextField, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react';
import NavbarL from 'components/Landing/NavbarL';
import { Link, Navigate, } from 'react-router-dom';
import GoogleIcon from "@mui/icons-material/Google"
import { api } from 'api/axiosMy';
import { toast } from 'react-hot-toast';
import { useFormik } from 'formik';
import { signUpSchema } from '../../schemas';
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt"
import { DatePicker } from '@mui/x-date-pickers';
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
    width: '90%',
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

const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  backgroundColor: "#E6F0FF",
  height: "50px",
  width: "100%",
}));



const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  college: "",
  dob: "",
}

const RegisterPage = () => {

  const server = useSelector((state) => state.app.server);
  const isAuthenticated = useSelector((state) => state.app.isAuthenticated);

  const [step, setStep] = useState(1)

  const [colleges, setColleges] = useState([]);

  useEffect(() => {

    document.title = "Saarathi | Sign Up"

    async function fetchColleges() {
      try {
        const response = await api.get(`/v01/admins/getColleges/all`);
        const collegeOptions = response.data.colleges.map(college => ({
          value: college._id,
          label: college.collegeName,
        }));
        setColleges(collegeOptions);
      } catch (error) {
        console.error(error)
      }
    }

    fetchColleges();
  }, [server]);

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      toastStart("Signing up...")
      try {
        const response = await handleSignUp(values);
        toastEnd();
        if (response && response.success) {
          toast.success(response.message);
          resetForm(); // Reset the form only if signup is successful
        }
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
    }
  });




  const handleShowPassword = () => {
    setPasswordVisible(!passwordVisible);
  }

  if (isAuthenticated) { return <Navigate to={"/dashboard"} replace /> }

  const handleSignUp = async (values) => {
    try {
      const response = await api.post(`/v01/users/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
        dateOfBirth: values.dob,
        collegeName: values.college,
      });

      return response.data;
    } catch (error) {
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
        <Title>Sign Up</Title>
        <Typography variant='body2' sx={{ color: "#7D8589", fontSize: "16px", fontWeight: "bold", mt: 0, mixBlendMode: "multiply" }}>
          Already Registered?
          <Typography
            variant='body2'
            component={Link}
            to="/login"
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#0689FF",
              m: 1,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline"
              }
            }}
          >
            Log In Now!
          </Typography>
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "25px",
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
          {step === 1 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#F5FAFE",
                height: "auto",
              }}
            >
              <TextFieldWrapper
                label="Name"
                type="text"
                variant="filled"
                id='name'
                name='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                required
                error={Boolean(errors.name && touched.name)}
                helperText={errors.name && touched.name ? errors.name : ''}
              />

              <TextFieldWrapper
                label="Email"
                type="email"
                variant="filled"
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                required
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email ? errors.email : ''}
              />

              <TextFieldWrapper
                label="Password"
                type={passwordVisible ? "text" : "password"}
                variant="filled"
                id='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                required
                error={Boolean(errors.password && touched.password)}
                helperText={errors.password && touched.password ? errors.password : ''}
              />

              <TextFieldWrapper
                label="Confirm Password"
                type={passwordVisible ? "text" : "password"}

		  variant="filled"
                id='confirmPassword'
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                required
                error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : ''}
              />

              <Box width={"100%"} display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>

                <FormControlLabel
                  control={<Checkbox value="showPassword" color="secondary" />}
                  label="Show Password"
                  onChange={handleShowPassword}
                />
              </Box>
            </Box>
          )}
          {step === 2 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "400px",
                backgroundColor: "#F5FAFE",
                height: "auto",
              }}
            >
              <CustomDatePicker
                label="Enter Date of Birth"
                format="DD-MM-YYYY"
                style={{ color: "black" }}
                value={values.dob || null}
                onChange={(date) => handleChange({ target: { name: 'dob', value: date } })}
                onBlur={handleBlur}
                error={Boolean(errors.dob && touched.dob)}
                helperText={errors.dob && touched.dob ? errors.dob : ''}

              />


              <Select
                label="Select College"
                value={values.college}
                onChange={(e) => handleChange({ target: { name: 'college', value: e.target.value } })}
                onBlur={handleBlur}
                required
                displayEmpty
                fullWidth
                sx={{ backgroundColor: "#E6F0FF", color: "black" }}
              >
                <MenuItem value="" disabled>
                  Select College Name
                </MenuItem>
                {colleges.map(college => (
                  <MenuItem key={college.value} value={college.value}>
                    {college.label}
                  </MenuItem>
                ))}
              </Select>

            </Box>
          )}
          <Box width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} >
            {step === 1 && (


              <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={handleNext} sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline", }, marginBottom: "15px" }}>
                <Typography variant='body2' sx={{
                  fontWeight: "bold", fontSize: "18px", color: "#0689FF", my: 1
                }}>
                  Next
                </Typography>
                <ArrowRightAltIcon style={{ color: "#0689FF" }} />
              </Box>
            )}

            {step === 2 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "25px",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  maxWidth: "400px",
                  backgroundColor: "#F5FAFE",
                  height: "auto",
                }}
              >
                <Box width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"} onClick={handleBack} sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline", }, marginBottom: "15px", marginTop: "15px" }}>
                  <ArrowRightAltIcon style={{ color: "#0689FF", transform: "rotate(180deg)" }} />
                  <Typography variant='body2' sx={{
                    fontWeight: "bold", fontSize: "18px", color: "#0689FF", my: 1
                  }}>
                    Prev
                  </Typography>
                </Box>
                <CustomButton backgroundColor="#0F1B4C" color="#fff" buttonText="Sign Up" heroBtn={true} type="submit" />
              </Box>
            )}
          </Box>

        </Box>

      </CustomBox >
    </Box >
  )
};

export default RegisterPage;

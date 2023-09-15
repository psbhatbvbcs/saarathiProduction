import * as Yup from 'yup';

export const signInSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Please Enter Your Email"),
    password: Yup.string().min(6).required("Please Enter Your Password"),
})

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please Enter Your Name"),
    email: Yup.string().email("Invalid Email").required("Please Enter Your Email"),
    password: Yup.string().min(6).required("Please Enter Your Password"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required("Please Enter Your Password"),
    dob: Yup.date().required("Please Enter Your Date of Birth"),
    college: Yup.string().required("Please Select Your College"),
})
import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SuccessDialog from '../components/SuccessDialog';
import ErrorDialog from '../components/ErrorDialog';
import Header from '../components/Header';

function SignUpPage() {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const headerStyle = { margin: 0 };
    const btnstyle = { margin: '8px 0' };
    const errorStyle = { color: '#ff9800', fontSize: '0.8rem' };

    const { signup } = useAuth();
    const [successDialogOpen, setSuccessDialogOpen] = useState(false); 
    const [errorDialogOpen, setErrorDialogOpen] = useState(false); 
    const [dialogContent, setDialogContent] = useState({});

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Name must be at least 3 characters long").required("Required"),
        email: Yup.string().email('Please enter a valid email').required("Required"),
        password: Yup.string().min(8, "Password should be at least 8 characters long").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords don't match").required("Required")
    });

    const onSubmit = (values, props) => {
        const result = signup(values.name, values.email, values.password);
        if (result.success) {
            setDialogContent({ title: 'Success', message: result.message });
            setSuccessDialogOpen(true);
            setTimeout(() => {
                setSuccessDialogOpen(false);
                navigate('/login');
            }, 2000);
        } else {
            setDialogContent({ title: 'Error', message: result.message });
            setErrorDialogOpen(true);
        }
        props.setSubmitting(false);
    };

    return (
        <>
            <Header />
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><AddCircleOutlineOutlinedIcon /></Avatar>
                        <h2 style={headerStyle}>Sign Up</h2>
                        <Typography variant='caption' gutterBottom>Please fill this form to create an account!</Typography>
                    </Grid>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>
                                <Field as={TextField} label='Name' name="name"
                                    placeholder='Enter your name' fullWidth
                                    helperText={<ErrorMessage name="name" style={errorStyle} />}
                                />
                                <Field as={TextField} label='Email Address' name="email"
                                    placeholder='Enter your email' fullWidth
                                    helperText={<ErrorMessage name="email" style={errorStyle} />}
                                />
                                <Field as={TextField} label='Password' name="password"
                                    placeholder='Enter password' type='password' fullWidth
                                    helperText={<ErrorMessage name="password" style={errorStyle} />}
                                />
                                <Field as={TextField} label='Confirm Password' name="confirmPassword"
                                    placeholder='Confirm your password' type='password' fullWidth
                                    helperText={<ErrorMessage name="confirmPassword" style={errorStyle} />}
                                />
                                <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                    style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign up"}</Button>
                            </Form>
                        )}
                    </Formik>
                    <Typography> Already have an account?
                        <Link href="login">
                            Sign In
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
            <SuccessDialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)} message={dialogContent.message} />
            <ErrorDialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)} message={dialogContent.message} />
        </>
    );
}

export default SignUpPage;

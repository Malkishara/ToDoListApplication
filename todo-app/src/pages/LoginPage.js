import React, { useState } from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SuccessDialog from '../components/SuccessDialog';
import ErrorDialog from '../components/ErrorDialog';

function LoginPage() {
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const headerStyle = { margin: 0 };
    const btnstyle = { margin: '8px 0' };
    const errorStyle = { color: '#ff9800', fontSize: '0.8rem' };

    const { login } = useAuth();
    const [successDialogOpen, setSuccessDialogOpen] = useState(false); 
    const [errorDialogOpen, setErrorDialogOpen] = useState(false); 
    const [dialogContent, setDialogContent] = useState({});

    const initialValues = {
        email: '',
        password: ''
    }

    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email').required("Required"),
        password: Yup.string().required("Required")
    });

    const onSubmit = (values, props) => {
        const result = login(values.email, values.password);
        if (result.success) {
            setDialogContent({ title: 'Success', message: result.message });
            setSuccessDialogOpen(true);
            setTimeout(() => {
                setSuccessDialogOpen(false);
                navigate('/todo');
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
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2 style={headerStyle}>Sign In</h2>
                        <Typography variant='caption' gutterBottom>Please login here!</Typography>
                    </Grid>
                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                        {(props) => (
                            <Form>
                                <Field as={TextField} label='Email Address' name="email"
                                    placeholder='Enter your email' fullWidth
                                    helperText={<ErrorMessage name="email" style={errorStyle} />}
                                />
                                <Field as={TextField} label='Password' name="password"
                                    placeholder='Enter password' type='password' fullWidth
                                    helperText={<ErrorMessage name="password" style={errorStyle} />}
                                />
                                <Button type='submit' color='primary' variant="contained" disabled={props.isSubmitting}
                                    style={btnstyle} fullWidth>{props.isSubmitting ? "Loading" : "Sign in"}</Button>
                            </Form>
                        )}
                    </Formik>
                    <Typography>
                        <Link href="#">
                            Forgot password?
                        </Link>
                    </Typography>
                    <Typography> Don't have an account?
                        <Link href="signup">
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
            <SuccessDialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)} message={dialogContent.message} />
            <ErrorDialog open={errorDialogOpen} onClose={() => setErrorDialogOpen(false)} message={dialogContent.message} />
        </>
    );
}

export default LoginPage;

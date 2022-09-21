import React from 'react'
import { Avatar, Paper, Button, Grid, Typography, Container, TextField } from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input'
import { useState } from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { useDispatch } from 'react-redux'

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setisSignUp] = useState(false);
    const dispatch = useDispatch();
    const handleSubmit = () => {

    }

    const switchMode = () => {
        setisSignUp(!isSignup);
        setShowPassword(!setShowPassword);
    }

    const handleShowPassword = () => {
        setShowPassword(!setShowPassword)
    }

    const handleChange = () => {

    }

    const googleSuccess = (res) => {
        const clientId = res?.clientId
        console.log(clientId)
        dispatch({ type: "AUTH", data: { clientId } })
    }
    const googleFailure = () => {
        console.log("Google Failure")
    }
    return (

        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} xs={6} />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} xs={6} />
                                </>
                            )
                        }
                        <Input name='email' label="Email Address" type='email' handleChange={handleChange} />
                        <Input name='password' label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label='Repeat Passoword' handleChange={handleChange} type='password' />}
                    </Grid>
                    <GoogleLogin onSuccess={googleSuccess} onError={googleFailure}></GoogleLogin>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? "Sign Up" : "Sign In"}</Button>
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>{isSignup ? "Already have an account Sign In" : "Dont have an account ? Sign Up"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    )
}

export default Auth
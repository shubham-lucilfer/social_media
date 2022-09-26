import React from 'react'
import { Avatar, Paper, Button, Grid, Typography, Container, TextField } from '@material-ui/core'
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useState } from 'react'
import { auth } from "../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { updateProfile } from "firebase/auth";
import { useContext } from 'react'
import context from '../../context/AuthContext'
import { useHistory } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
// import GoogleIcon from "@material-ui/icons/GoogleIcon"


const Auth = () => {
    const provider = new GoogleAuthProvider();
    const { Name, setname } = useContext(context);
    const history = useHistory();
    const classes = useStyles();
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSignup, setisSignUp] = useState(false);


    const switchMode = () => {
        setisSignUp(!isSignup);
        setShowPassword(!setShowPassword);
    }
    const handleShowPassword = () => {
        setShowPassword(!setShowPassword)
    }


    const changeemail = (e) => {
        setEmail(e.target.value);
    }

    const changename = (e) => {
        setName(e.target.value);
    }

    const changeconfirmpassword = (e) => {
        setConfirmPassword(e.target.value);
    }
    const changepassword = (e) => {
        setPassword(e.target.value);
    }

    const register = async (e) => {
        if (confirmPassword !== password) {
            alert("Password do not match !!! Try again")
            return;
        }
        e.preventDefault()
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                console.log("done")
            }).catch((error) => {
                console.log(error.message);
            });
            setisSignUp(false);
            setEmail(null);
            setPassword(null);
            history.push("/")
            console.log(user.user)
            setname(name);
        } catch (error) {
            console.log(error.message);
        }

    }
    const login = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            setname(user.user.displayName);
            setEmail(null);
            setPassword(null);
            history.push("/")
        } catch (error) {
            console.log(error.message)
        }
    }
    const googlelogin = async (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setname(user.displayName);
                history.push("/");
            }).catch((error) => {
                console.log(error.message);
            });
    }

    return (

        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : "Sign In"}</Typography>
                <form className={classes.form} >
                    <Grid container spacing={2}>
                        {
                            isSignup ? (
                                <Grid container direction={"column"} spacing={2}>
                                    <Grid item>
                                        <TextField label="Full Name" variant="outlined" fullWidth onChange={changename} />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Email" variant="outlined" fullWidth onChange={changeemail} />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Password" variant="outlined" type='password' fullWidth onChange={changepassword} />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Confirm Password" type='password' variant="outlined" fullWidth onChange={changeconfirmpassword} />
                                    </Grid>
                                    <Grid spacing={3} container justify="center">
                                        <Grid item>
                                            <Button className={classes.submit} type='submit' variant='contained' color='primary' size="medium" onClick={register} > Sign Up </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container direction={"column"} spacing={2}>
                                    <Grid item>
                                        <TextField label="Email" variant="outlined" fullWidth onChange={changeemail} />
                                    </Grid>
                                    <Grid item>
                                        <TextField label="Password" type='password' variant="outlined" fullWidth onChange={changepassword} />
                                    </Grid>
                                    <Grid spacing={3} container justify="center">
                                        <Grid item>
                                            <Button className={classes.submit} type='submit' variant='contained' color='primary' size="medium" onClick={login}> Sign In </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button className={classes.submit} type='submit' variant='contained' color='primary' size="medium" onClick={googlelogin} > Sign Ip Google </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                        }
                        <Grid container justify='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>{isSignup ? "Already have an account Sign In" : "Dont have an account ? Sign Up"}</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>

    )
}

export default Auth
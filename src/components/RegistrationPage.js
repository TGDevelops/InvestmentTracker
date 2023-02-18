import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from '@mui/material/Alert';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css";
import { firebaseConfig } from "../utils/firestoreConfig";
import Header from "./Header";

const useStyles = makeStyles(theme => ({
  container: {
    position: "absolute",
    top: "50%",
    left: "30%",
    transform: "translate(-50%, -50%)",
    alignItems: "left",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const RegistrationPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // Initialize state to store the user input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationFlag, setRegistrationFlag] = useState("null");
  const [registrationMessage, setRegistrationMessage] = useState("null");

  // Get a reference to the Firestore database
  firebase.initializeApp(firebaseConfig);

  // Handle form submissions
  const handleSubmit = async (event) => {
    const auth = getAuth();
    // Prevent the default form submission behavior
    event.preventDefault();
    // Store the user data in Firestore
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setRegistrationFlag("success");
            // navigate the user to the Login page after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        })
        .catch((error) => {
            setRegistrationFlag("error");
            setRegistrationMessage(error.message);
            // ..
        });
  };    

  return (
    <div>
        <Header currentPage="register"/>
        {registrationFlag === 'success' ? (
            <Alert severity="success"> User Registered Successfully! </Alert>
        ) : registrationFlag === 'error' ? (
            <Alert severity="error"> User Registration Failed! {registrationMessage}</Alert>
        ) : null}
        <Container className={classes.root} maxWidth="sm">
            <form className={classes.container} onSubmit={handleSubmit}>
            <h4 className="h4">New User Registration</h4>
            <TextField
                id="name"
                label="Name"
                className={classes.textField}
                value={name}
                onChange={e => setName(e.target.value)}
                margin="normal"
            />
            <TextField
                id="email"
                label="Email"
                className={classes.textField}
                value={email}
                onChange={e => setEmail(e.target.value)}
                margin="normal"
            />
            <TextField
                id="password"
                label="Password"
                className={classes.textField}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
                type="submit"
            >
                Register
            </Button>
            </form>
        </Container>
    </div>
  );
};

export default RegistrationPage;

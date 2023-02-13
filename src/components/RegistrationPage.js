import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { firebaseConfig } from "../utils/firestoreConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const RegistrationPage = () => {
  const classes = useStyles();

  // Initialize state to store the user input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get a reference to the Firestore database
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  // Handle form submissions
  const handleSubmit = event => {
    const auth = getAuth();
    // Prevent the default form submission behavior
    event.preventDefault();
    // Store the user data in Firestore
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
  };    

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
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
        Submit
      </Button>
    </form>
  );
};

export default RegistrationPage;

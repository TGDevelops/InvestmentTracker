import { Container } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Alert from '@mui/material/Alert';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat/app';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import './page.css';
import { firebaseConfig } from "../utils/firestoreConfig";
import Header from './Header';
import { setUser } from '../redux/store';
import Cookies from 'js-cookie';
import { styled } from '@mui/material/styles';

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
}));

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  color: 'white',
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#000000',
});

const LoginPage = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginFlag, setLoginFlag] = useState('null');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get a reference to the Firestore database
  firebase.initializeApp(firebaseConfig);

  const handleLogin = async (event) => {
    const auth = getAuth();
    event.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUser(user));
        setLoginFlag('success');
        auth.onAuthStateChanged((user) => {
          if(user){
            user.getIdToken().then(authToken => {
              Cookies.set('token', authToken);
            }) 
          }
        })
        setTimeout(() => {
          navigate('/dashboard');
          setLoginFlag('null');
        }, 500);
      })
      .catch(error => {
        setLoginFlag('failed');
        setLoginMessage(error.message);
      });
  };

  return (
    <div>
      <Header currentPage="login"/>
      {loginFlag === 'success' ? (
        <Alert severity="success"> Login Successful! </Alert>
      ) : loginFlag === 'failed' ? (
        <Alert severity="error"> Login Failed! {loginMessage}</Alert>
      ) : null}
      <Container className={classes.container} maxWidth="sm">
        <form onSubmit={handleLogin}>
          <h4 className="h4">Login</h4>
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
          <BootstrapButton
            variant="contained"
            onClick={handleLogin}
            type="submit"
          >
            Login
          </BootstrapButton>
        </form>
      </Container>
    </div>
  );
};

export default LoginPage;

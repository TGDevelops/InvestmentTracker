import {
  AppBar, Button, createMuiTheme,
  ThemeProvider, Toolbar,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../components/page.css';
import { clearUser } from '../redux/store';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import {Link} from '@material-ui/core';

//const user = auth.currentUser;
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    padding: '10px',
    margin: '10px'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    justifyContent: 'center'
  }
}));

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  color: 'white',
  padding: '3px 12px 3px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  margin: '0px 20px'
});

function Header(props) {
  const { currentPage } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const user = useSelector((state) => state.auth);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSignOut() {
    const action = clearUser();
    action.reducer = 'auth';
    dispatch(action);
    navigate('/');
  }

  const handleRegister =() => {
    navigate('/register');
  }

  const handleLogin =() => {
    navigate('/');
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static" color='transparent'>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.title}>
              WealthMate
            </Typography>
            <div>
              {user ? (
                <div className='navItems'>
                    <BootstrapButton
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      Menu
                    </BootstrapButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem component='a' href='/home'>Home</MenuItem>
                      <MenuItem component='a' href='/dashboard'>Dashboard</MenuItem>
                      <MenuItem component='a' href='/investments'>Investment</MenuItem>
                      <MenuItem component='a' href='/debts'>Debt</MenuItem>
                    </Menu>
                  <BootstrapButton startIcon={<ExitToAppIcon />} size="small" onClick={handleSignOut}>LogOut</BootstrapButton>
                </div>
              ) : (
                currentPage === 'login' ? (<Button variant="contained" startIcon={<LockOpenIcon />} size="small" onClick={handleRegister}>Register</Button>) : 
                (<Button variant="contained" startIcon={<LockOpenIcon />} size="small" onClick={handleLogin}>Login</Button>))
              } 
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default Header;

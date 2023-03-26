import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import "../App.css";
import '../components/page.css';
import { addInvestment } from '../redux/store';
import Header from './Header';
import BootStrapButton from './mui/BootStrapButton';
import DataTable from './mui/DataTable';
import PieChart from './visualizations/PieChart';
import InvestmentServices from '../services/InvestmentServices';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  title: {
    flexGrow: 1,
    color: 'black',
    padding: '10px',
    margin: '10px',
    fontStyle: 'bold',
    alignSelf: 'center'
  },
  select: {
    padding: '0px',
    margin: '0px'
  }
}));

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#ffffff',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const getSumOfInvestments = (investments) => {
  let investmentSum = 0;
  investments.forEach(investment => {
    investmentSum += parseInt(investment.amount);
  });
  return investmentSum;
}

const InvestmentPage = () => {
  const classes = useStyles();
  const [investmentType, setInvestmentType] = useState('');
  const [investmentName, setInvestmentName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentYear, setInvestmentYear] = useState('');
  const [investmentRoi, setInvestmentRoi] = useState('');
  const [investments, setInvestments] = useState([]);
  const [newInvestment, setNewInvestment] = useState(null);
  const [sum, setSum] = useState(0);
  
  const dispatch = useDispatch(); 

  const handleInvestmentTypeChange = (event) => {
    setInvestmentType(event.target.value);
  };

 /*  useEffect(() => {
    if(newInvestment){
      setInvestments([...investments, newInvestment])
    }
  }, [newInvestment]); */

  const handleAddInvestment = (e) => {
    console.log('Investments before:', investments);
    e.preventDefault();
    const tempInvestment = {
      type: investmentType,
      name: investmentName,
      amount: investmentAmount,
      year: investmentYear,
      roi: investmentRoi
    };
    //setNewInvestment(tempInvestment);
    setInvestments([...investments, tempInvestment]);
    console.log('New Investment', tempInvestment);
    setInvestmentName('');
    setInvestmentAmount('');
    setInvestmentYear('');  
    setInvestmentType('');
    setInvestmentRoi('');
    console.log('Investments After:', investments);
    const action = addInvestment(tempInvestment);
    action.reducer = "investment";
    dispatch(action);
  };

  const handleSubmit = (e) => {
    InvestmentServices.submitInvestments(investments)
  };

  return (
    <div>
      <Header />
      <div className='page-body'>
            <Typography variant="h6" className={classes.title}>
              Add Your Investments
            </Typography>
        <div  className='form'>
        <Container>
            <form noValidate autoComplete="off" className='form'>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel className={classes.select} id="investment-type">Investment Type</InputLabel>
                  <Select
                    labelId="select-small"
                    id="investment-type-select"
                    value={investmentType}
                    label="Investment Type"
                    onChange={handleInvestmentTypeChange}
                  >
                    <MenuItem value="Stocks">Stocks</MenuItem>
                    <MenuItem value="Bonds">Bonds</MenuItem>
                    <MenuItem value="FD">Fixed Diposits</MenuItem>
                    <MenuItem value="MF">Mutual Funds</MenuItem>
                    <MenuItem value="PPF">Public Provident Fund (PPF)</MenuItem>
                    <MenuItem value="NPS">National Pension System (NPS)</MenuItem>
                    <MenuItem value="ULIP">Unit Linked Insurance Plan (ULIP)</MenuItem>
                    <MenuItem value="SSY">Sukhanya Samrudhi Yojana</MenuItem>
                    <MenuItem value="RE">Real Estate</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                    id="investment-name"
                    label="Investment Name"
                    className={classes.textField}
                    value={investmentName}
                    onChange={(e) => setInvestmentName(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <TextField
                    id="investment-amount"
                    label="Investment Amount"
                    className={classes.textField}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <TextField
                    id="investment-year"
                    label="Investment Year"
                    className={classes.textField}
                    value={investmentYear}
                    onChange={(e) => setInvestmentYear(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <TextField
                    id='investment-roi'
                    label="Expected ROI(%)"
                    className={classes.textField}
                    value={investmentRoi}
                    onChange={(e) => setInvestmentRoi(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <ThemeProvider theme={theme}>
                  <BootStrapButton label={'Add'} onClickEvent={handleAddInvestment}/>
                </ThemeProvider>
                </form>
        </Container>
        </div>
        <Typography variant="h6" className={classes.title}>
              Investment Summary
            </Typography>
        <div className='table'>
          { /* <DataTable/> */}
        </div>
        <ThemeProvider theme={theme}>
                  <BootStrapButton label={'Submit'} onClickEvent={handleSubmit}/>
                </ThemeProvider>
        <div>
          <Container className={classes.chartContainer}>
            <PieChart />
          </Container>
        </div>
      </div>
    </div>
  )
}

export default InvestmentPage;
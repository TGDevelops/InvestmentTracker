import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "../App.css";
import '../components/page.css';
import { addDebt } from '../redux/store';
import Header from './Header';
import BootStrapButton from './mui/BootStrapButton';
import DataTable from './mui/DataTable';
import PieChart from './visualizations/PieChart';

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

const getSumOfDebts = (Debts) => {
  let DebtSum = 0;
  Debts.forEach(Debt => {
    DebtSum += parseInt(Debt.amount);
  });
  return DebtSum;
}

const DebtPage = () => {
  const classes = useStyles();
  const [DebtName, setDebtName] = useState('');
  const [DebtAmount, setDebtAmount] = useState('');
  const [DebtYear, setDebtYear] = useState('');
  const [DebtRoi, setDebtRoi] = useState('');
  const [Debts, setDebts] = useState([]);
  const [sum, setSum] = useState(0);
  const [DebtType, setDebtType] = useState('');
  const dispatch = useDispatch();

  const handleDebtTypeChange = (event) => {
    setDebtType(event.target.value);
  };

  const handleAddDebt = (e) => {
    e.preventDefault();
    setDebts([...Debts, { name: DebtName, amount: DebtAmount, type: DebtType, year: DebtYear, roi: DebtRoi }]);
    setDebtName('');
    setDebtAmount('');
    setDebtYear('');
    setDebtType('');
    setDebtRoi('');
    setSum(getSumOfDebts(Debts));
    const action = addDebt(DebtType, DebtName, DebtAmount, DebtYear);
    action.reducer = "Debt";
    dispatch(action);
  };

  const handleSubmit = (e) => {
    
  };

  return (
    <div>
      <Header />
      <div className='page-body'>
            <Typography variant="h6" className={classes.title}>
              Add Your Debts
            </Typography>
        <div  className='form'>
        <Container>
            <form noValidate autoComplete="off" className='form'>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel className={classes.select} id="Debt-type">Debt Type</InputLabel>
                  <Select
                    labelId="select-small"
                    id="Debt-type-select"
                    value={DebtType}
                    label="Debt Type"
                    onChange={handleDebtTypeChange}
                  >
                    <MenuItem value="Stocks">Personal Loan</MenuItem>
                    <MenuItem value="Bonds">Automobile Loan</MenuItem>
                    <MenuItem value="FD">Home Loan</MenuItem>
                    <MenuItem value="MF">Credit Card Outstanding</MenuItem>
                    <MenuItem value="PPF">Student Loan</MenuItem>
                    <MenuItem value="NPS">Other Mortgages</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                    id="Debt-name"
                    label="Debt Name"
                    className={classes.textField}
                    value={DebtName}
                    onChange={(e) => setDebtName(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <TextField
                    id="Debt-amount"
                    label="Debt Amount"
                    className={classes.textField}
                    value={DebtAmount}
                    onChange={(e) => setDebtAmount(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <TextField
                    id="Debt-year"
                    label="Debt Year"
                    className={classes.textField}
                    value={DebtYear}
                    onChange={(e) => setDebtYear(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <TextField
                    id='Debt-roi'
                    label="Expected ROI(%)"
                    className={classes.textField}
                    value={DebtRoi}
                    onChange={(e) => setDebtRoi(e.target.value)}
                    margin="normal"
                    variant='outlined'
                />
                <ThemeProvider theme={theme}>
                  <BootStrapButton label={'Add'} onClickEvent={handleAddDebt}/>
                </ThemeProvider>
                </form>
        </Container>
        </div>
        <div className='table'>
          <DataTable/>
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

export default DebtPage;
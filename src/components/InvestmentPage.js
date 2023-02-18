import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "../App.css";
import '../components/page.css';
import { addInvestment } from '../redux/store';
import Header from './Header';
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
  button: {
    margin: theme.spacing(5),
    alignItems: "center"
  }
}));

const getSumOfInvestments = (investments) => {
  let investmentSum = 0;
  investments.forEach(investment => {
    investmentSum += parseInt(investment.amount);
  });
  return investmentSum;
}

const InvestmentPage = () => {
  const classes = useStyles();
  const [investmentName, setInvestmentName] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentYear, setInvestmentYear] = useState('');
  const [investments, setInvestments] = useState([]);
  const [sum, setSum] = useState(0);
  const [investmentType, setInvestmentType] = useState('');
  const dispatch = useDispatch();

  const handleInvestmentTypeChange = (event) => {
    setInvestmentType(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInvestments([...investments, { name: investmentName, amount: investmentAmount, type: investmentType, year: investmentYear }]);
    setInvestmentName('');
    setInvestmentAmount('');
    setInvestmentYear('');
    setInvestmentType('');
    setSum(getSumOfInvestments(investments));
    const action = addInvestment(investmentType, investmentName, investmentAmount, investmentYear);
    action.reducer = "investment";
    dispatch(action);
  };

  return (
    <div>
      <Header />
      <div className='page-body'>
        <h3>Add your Investments</h3>
        <Container>
            <form noValidate autoComplete="off" className='form'>
                <FormControl variant='standard' sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="investment-type">Investment Type</InputLabel>
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
                    variant='standard'
                />
                <TextField
                    id="investment-amount"
                    label="Investment Amount"
                    className={classes.textField}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    margin="normal"
                    variant='standard'
                />
                <TextField
                    id="investment-year"
                    label="Investment Year"
                    className={classes.textField}
                    value={investmentYear}
                    onChange={(e) => setInvestmentYear(e.target.value)}
                    margin="normal"
                    variant='standard'
                />
                <Button
                    variant="text"
                    color="primary"
                    className={classes.button} 
                    onClick={handleSubmit}
                    size="medium"   
                >
                    Add Investment
                </Button>
                </form>
        </Container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Investment Type</TableCell>
                <TableCell>Investment Name</TableCell>
                <TableCell>Investment Value</TableCell>
                <TableCell>Investment Year</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell>{investment.type}</TableCell>
                  <TableCell>{investment.name}</TableCell>
                  <TableCell>{investment.amount}</TableCell>
                  <TableCell>{investment.year}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Container className={classes.chartContainer}>
          <PieChart />
        </Container>
      </div>
    </div>
  )
}

export default InvestmentPage;
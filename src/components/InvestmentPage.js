import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import "../App.css"

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  button: {
    margin: theme.spacing(2),
    alignItems: "center"
  },
  root: {
    width: '80%',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#333',
    color: '#fff',
  },
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
  const [investments, setInvestments] = useState([]);
  const [sum, setSum] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    setInvestments([...investments, { name: investmentName, amount: investmentAmount }]);
    setInvestmentName('');
    setInvestmentAmount('');
    setSum(getSumOfInvestments(investments));
  };
  return (
    <div>
      <h1 className="InvestmentTracker-title">Investment Tracker</h1>
      <Container className={classes.root} maxWidth="sm">
          <Paper>
              <form className={classes.container} noValidate autoComplete="off">
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
              <Button
                  variant="outlined"
                  color="primary"
                  className={classes.button}
                  onClick={handleSubmit}
                  size="medium"   
              >
                  Add Investment
              </Button>
              <table>
                  <thead>
                  <tr>
                      <th>Investment Name</th>
                      <th>Investment Amount</th>
                  </tr>
                  </thead>
                  <tbody>
                  {investments.map((investment, index) => (
                      <tr key={index}>
                      <td>{investment.name}</td>
                      <td>{investment.amount}</td>
                      </tr>
                  ))}
                  </tbody>
              </table>
              </form>
          </Paper>
      </Container>
      <h1>Total Investments {sum}</h1>
    </div>
  )
}

export default InvestmentPage;
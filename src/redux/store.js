import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

const initialState = {
  isAuthenticated: false,
  user: null,
};

//Auth Reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return action.payload;
      case 'CLEAR_USER':
        return null;
      default:
        return state;
    }
  }

const setUser = (user) => ({
  type: 'SET_USER',
  payload: {
    user: user,
    isAuthenticated: true,
  },
});

const clearUser = () => ({
    type: 'CLEAR_USER',
    payload: {
      user: null,
      isAuthenticated: false,
    },
});

//Debt Reducer
const initialStateDebts = {
  
};

const debtReducer = (state = initialStateDebts, action) => {
  switch (action.type) {
    case 'ADD_DEBT':
      return {
        ...state,
        [action.payload.type]: { name: action.payload.name, value: action.payload.value, year: action.payload.year, type: action.payload.type }
      };
    case 'REMOVE_DEBT':
      const { [action.payload.name]: removedDebt, ...restOfDebts } = state;
      return restOfDebts;
    case 'UPDATE_DEBT':
      return {
        ...state,
        [action.payload.type]: { ...state[action.payload.name], ...action.payload.updates }
      };
    default:
      return state;
  }
};

const addDebt = (type, name, value, year) => {
  return {
    type: 'ADD_DEBT',
    payload: {type, name, value, year}
  }
}

//Investment Reducer
const initialStateInvestments = {
  
};

const investmentReducer = (state = initialStateInvestments, action) => {
  switch (action.type) {
    case 'ADD_INVESTMENT':
      return {
        ...state,
        [action.payload.type]: { name: action.payload.name, value: action.payload.value, year: action.payload.year, type: action.payload.type }
      };
    case 'REMOVE_INVESTMENT':
      const { [action.payload.name]: removedInvestment, ...restOfInvestments } = state;
      return restOfInvestments;
    case 'UPDATE_INVESTMENT':
      return {
        ...state,
        [action.payload.type]: { ...state[action.payload.name], ...action.payload.updates }
      };
    default:
      return state;
  }
};

const addInvestment = (type, name, value, year) => {
  return {
    type: 'ADD_INVESTMENT',
    payload: {type, name, value, year}
  }
}

const rootReducer = combineReducers({
  auth: authReducer,
  debt: debtReducer,
  investment: investmentReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export { setUser, clearUser, addInvestment, addDebt, store };

  
    
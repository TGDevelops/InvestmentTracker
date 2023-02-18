import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

//Auth Reducer
const authReducer = (state = null, action) => {
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
  payload: user,
});

const clearUser = () => ({
    type: 'CLEAR_USER',
});

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
  investment: investmentReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export { setUser, clearUser, addInvestment, store };

  
    
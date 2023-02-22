import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Root from './components/Root';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
            <Root/ >
        </BrowserRouter>
        </div>
    </Provider> 
  );
}

export default App;

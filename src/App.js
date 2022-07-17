import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Main from './pages/MbTask/container/Main';
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Main />
      </Provider>

    </div>
  );
}

export default App;

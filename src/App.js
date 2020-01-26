import React, { Component } from 'react';
import Main from './Components/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import './App.css';
const store = ConfigureStore();
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <div>
            <Main />
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;

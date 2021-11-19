import logo from './logo.svg';
import { Component } from 'react';
import './App.css';
import Input from './components/Input';
import Output from './components/Output';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";

class App extends Component {
  render(){
    return (
      <div className="App">
      <Router>
          <Routes>
              <Route path="/reactapp/"  element={<Input/>}/>
              <Route path="/"  element={<Input/>}/>
              <Route path="/Output"  element={<Output/>}/>
          </Routes>
        </Router>
      </div>

    );
  }
}

export default App;

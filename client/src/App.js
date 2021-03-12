// import logo from './logo.svg';
// import './App.css';
// import React from 'react'
import {
  BrowserRouter as Router, Route, Switch
  // , Switch, Link
} from 'react-router-dom';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainPage from './pages/MainPage/MainPage';
import SecondPage from './pages/SecondPage/SecondPage';
import ThirdPage from './pages/ThirdPage/ThirdPage';
import MyPage from './pages/MyPage/MyPage';

import FourthPage from './pages/FourthPage/FourthPage';
import LoginRegisterPage from './pages/LoginRegisterPage/LoginRegisterPage';

function App() {
  return (
    <div>
      <Header />

      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/second' component={SecondPage} />
            <Route path='/third' component={ThirdPage} />
            <Route path='/mypage' component={MyPage} />
            <Route path='/fourth' component={FourthPage} />
            <Route path='/login' component={LoginRegisterPage} />
          </Switch>
        </div>
      </Router>

      <Footer />
    </div>
  );
}

export default App;

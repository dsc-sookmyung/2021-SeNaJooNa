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
import SecondPage from './pages/CollectionPage/SecondPage';
import ThirdPage from './pages/PlacePage/ThirdPage';
import MyPage from './pages/MyPage/MyPage';

import FourthPage from './pages/FourthPage/FourthPage';
import LoginPage from './pages/LoginRegisterPage/LoginPage';
import RegisterPage from './pages/LoginRegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <div>
      <Router>
        <Header />

        <div>
          <Switch>
            <Route exact path='/' component={Auth(MainPage, null)} />
            <Route path='/collection' component={Auth(SecondPage, null)} />
            <Route path='/place' component={Auth(ThirdPage, null)} />
            <Route path='/mypage' component={Auth(MyPage, true)} />
            <Route path='/fourth' component={Auth(FourthPage, null)} />
            <Route path='/login' component={Auth(LoginPage, false)} />
            <Route path='/register' component={Auth(RegisterPage, false)} />
          </Switch>
        </div>


        <Footer />
      </Router>
    </div>
  );
}

export default App;

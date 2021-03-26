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
import CategoryPage from './pages/CategoryPage/CategoryPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import MyPage from './pages/MyPage/MyPage';

import PlacePage from './pages/PlacePage/PlacePage';
import SearchPage from './pages/SearchPage/SearchPage';
import LoginPage from './pages/LoginRegisterPage/LoginPage';
import RegisterPage from './pages/LoginRegisterPage/RegisterPage';
import MakeCollectionPage from './pages/MakeCollectionPage/MakeCollectionPage';
import MakePlacePage from './pages/MakePlacePage/MakePlacePage';
import Auth from './hoc/auth';

function App() {
  return (
    <div>
      <Router>
        <Header />

        <div>
          <Switch>
            <Route exact path='/' component={Auth(MainPage, null)} />
            <Route path='/category' component={Auth(CategoryPage, null)} />
            <Route path='/collection' component={Auth(CollectionPage, null)} />
            <Route path='/mypage' component={Auth(MyPage, true)} />
            <Route path='/place' component={Auth(PlacePage, null)} />
            <Route path='/search' component={Auth(SearchPage, null)} />
            <Route path='/login' component={Auth(LoginPage, false)} />
            <Route path='/register' component={Auth(RegisterPage, false)} />
            <Route path='/makeCollection/:id' component={Auth(MakeCollectionPage, null)} />
            <Route path='/makePlace' component={Auth(MakePlacePage, null)} />
          </Switch>
        </div>


        <Footer />
      </Router>
    </div>
  );
}

export default App;

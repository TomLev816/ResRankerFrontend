import React, { Component } from 'react';
import './App.css';
// import Restaurants from './components/Restaurants'
// import Users from './components/Users'
import { connect } from "react-redux";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { getRestaurants, getUsers } from './store/actions/'

import NavBar from './components/NavBar'
import HomePage from './containers/HomePage'
import Login from './containers/Login'
import Signup from './containers/Signup'
import UserShowPage from './containers/UserShowPage'

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:4000/api/v1/restaurants')
      .then(res => res.json())
      .then(resJson => this.props.loadRestaurantsFromApi(resJson))

    fetch('http://localhost:4000/api/v1/users')
      .then(res => res.json())
      .then(resJson => this.props.loadUsersFromApi(resJson))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="/" component={NavBar} />
            <Route path="/home" component={HomePage} />
            <Route exact path="/" component={HomePage} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/user-page' component={UserShowPage} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    allRestaurants: state.allRestaurants,
    allUsers: state.allUsers
  };
};

const mapDispatchToProps = dispatch => ({
  loadRestaurantsFromApi: apiRestaurantData => dispatch(getRestaurants(apiRestaurantData)),
  loadUsersFromApi: apiUserData => dispatch(getUsers(apiUserData))
});


const exposeAll = connect(
  mapStateToProps,
  mapDispatchToProps
);

const connectedApp = exposeAll(App); //Why app there? IDK

export default connectedApp;

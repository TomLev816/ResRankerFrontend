import React, { Component } from 'react';
import './App.css';

import { connect } from "react-redux";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { getRestaurants, getUsers, getVisits } from './store/actions/'

import NavBar from './components/NavBar'
import HomePage from './containers/HomePage'
import Login from './containers/Login'
import Signup from './containers/Signup'
import UserShowPage from './containers/UserShowPage'
import AddMultipleRestaurants from './containers/AddMultipleRestaurants'
import AddNewVisit from './containers/AddNewVisit'
import RestaurantInfoPage from './containers/RestaurantInfoPage'
import UserMapPage from './containers/UserMapPage'
import ViewVisits from './containers/ViewVisits'
import About from './containers/About'
import ViewAllVisits from './components/ViewAllVisits'

class App extends Component {

  componentDidMount() {
    fetch('http://localhost:4000/api/v1/restaurants')
      .then(res => res.json())
      .then(resJson => this.props.loadRestaurantsFromApi(resJson))

    fetch('http://localhost:4000/api/v1/users')
      .then(res => res.json())
      .then(resJson => this.props.loadUsersFromApi(resJson))

    fetch('http://localhost:4000/api/v1/visits')
      .then(res => res.json())
      .then(resJson => this.props.loadVisitsFromApi(resJson))
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
            <Route path='/user-map-page' component={UserMapPage} />
            <Route path='/add-restaurants' component={AddMultipleRestaurants} />
            <Route path='/add-new-visit' component={AddNewVisit} />
            <Route path='/view-restaurants' component={RestaurantInfoPage} />
            <Route path='/visits' component={ViewVisits} />
            <Route path='/about' component={About} />
            <Route path='/see-visits' component={ViewAllVisits} />

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
  loadUsersFromApi: apiUserData => dispatch(getUsers(apiUserData)),
  loadVisitsFromApi: apiVisitData => dispatch(getVisits(apiVisitData)),
});


const exposeAll = connect(
  mapStateToProps,
  mapDispatchToProps
);

const connectedApp = exposeAll(App);

export default connectedApp;

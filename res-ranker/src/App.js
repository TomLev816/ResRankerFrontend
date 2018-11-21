import React, { Component } from 'react';
import './App.css';
import Restaurants from './components/Restaurants'
import { connect } from "react-redux";

class App extends Component {
  state = {
    users: '' ,
    restaurants: []
  }

  componentDidMount() {
    fetch('http://localhost:4000/api/v1/restaurants')
      .then(res => res.json())
      .then(resJson => this.setState({
        restaurants: resJson,
      }))

    fetch('http://localhost:4000/api/v1/users')
      .then(res => res.json())
      .then(resJson => this.setState({
        users: resJson ,
      }))
  }

  render() {
    return (
      <div className="App">
        <Restaurants allRestaurants={this.state.restaurants}/>
      </div>
    );
  }
}



export default App;

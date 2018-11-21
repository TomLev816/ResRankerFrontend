import React, { Component } from 'react';


export default class Restaurant extends Component {

  renderRestaurnat = () => {
    this.props.allRestaurants.map(restaurant => console.log(restaurant.name))
  }

  render() {
    return (
      <div>
        restaurant Page
        {this.renderRestaurnat()}
      </div>
    );
  }

}

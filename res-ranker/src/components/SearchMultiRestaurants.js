import React, { Component } from 'react';
import {connect} from 'react-redux'
import SmallRestaurantComponent from './SmallRestaurantComponent'



class SearchMultiRestaurants extends Component {
  state = {
    search: '',
    startIndex: 0,
  }
  
  handleChange = (event) => {
    if (!event.target.value) {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value ,
        startIndex: 0,
      });
    }
  } // end handle change

  changeRestaurants = (event) => {
    const {startIndex} = this.state
    if (event.target.name === 'next') {
      this.setState({
        startIndex: startIndex + 5,
      });
    } else if (event.target.name === 'previous' && startIndex > 4) {
      this.setState({
        startIndex: startIndex - 5,
      })
    }
  }

  filterRestaurntsWithSearch = () => {
    const {search, startIndex} = this.state
    return this.props.allRestaurants
      .filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()))
      .slice(startIndex, startIndex + 5)
      .map(restaurant => <SmallRestaurantComponent key={restaurant.id} restaurant={restaurant} />)
  }

  render() {
    const {search} = this.state
    return (
      <div className='search-multi-component' >
        <input name='search'className='search-bar' value={search} onChange={this.handleChange}/>
        {this.filterRestaurntsWithSearch()}
        <br></br>
        <button name='previous' onClick={this.changeRestaurants}> Get Previous Restaurants </button>
        <button name='next' onClick={this.changeRestaurants}> Get More Restaurants </button>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    allRestaurants: state.allRestaurants
  }
}

export default connect(mapStateToProps)(SearchMultiRestaurants)

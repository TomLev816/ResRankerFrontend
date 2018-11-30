import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { newVisitFormAction, creatNewVisit, userPageToLoadAction } from '../store/actions/'
// import EditRanking from '../components/EditRanking'



class AddNewVisit extends Component {
  state = {
    redirect: false
  }

  handleChange = (event) => {
    let {newVisitFormChange, newVisitForm } = this.props
    let formChange = {...newVisitForm, [event.target.name]: event.target.value }
    newVisitFormChange(formChange)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let restToAddVisitTo = this.props.rankedRestaurants.find(rest => rest.restaurant_id === this.props.visitRestaurant.id)

    let {date, comment, mealEaten} = this.props.newVisitForm
    console.log('ID', restToAddVisitTo.id, 'date:', date, 'comment:', comment, 'mealEaten:', mealEaten);
    this.props.newVisitToDatabase(restToAddVisitTo.id, date, comment, mealEaten)
    this.props.newVisitFormChange({date: "", comment:"", mealEaten:""})
    this.props.userPageToLoadFunction('editRanking')
    this.setState({
      redirect: true,
    });
  }

  render (){

    return (
      <div className='user-show-page'>
        {this.state.redirect ? <Redirect to={'/user-page'}/> : null}
        <div className='user-side-of-page'>
          <div className='user-pic'>
            <img src={this.props.visitRestaurant.image_src} alt=''></img>
          </div>
          <div className='user-info'>
            <h1>Restaurant Name: {this.props.visitRestaurant.name}</h1>
            <h2>Address: {this.props.visitRestaurant.address}</h2>
            <h3>Cusine: {this.props.visitRestaurant.cuisine}</h3>
          </div>
        </div>
        <div className='restaurant-side-of-page'>
          <h1>How Was Your Visit {this.props.visitRestaurant.name}</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              name='date'
              placeholder='Enter a Date'
              value={this.props.newVisitForm.date}
              onChange={this.handleChange}>
            </input>
            <input
              name='comment'
              type="field"
              placeholder='Enter Comment'
              value={this.props.newVisitForm.comment}
              onChange={this.handleChange}>
            </input>
            <input
              name='mealEaten'
              placeholder='Enter Your Meal'
              value={this.props.newVisitForm.mealEaten}
              onChange={this.handleChange}>
            </input>
            <input type="submit"></input>
          </form>
        </div>
      </div>
    );
  }
}

// date, :comment, :meal_eaten

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    visitRestaurant: state.visitRestaurant,
    newVisitForm: state.newVisitForm,
    rankedRestaurants: state.rankedRestaurants,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newVisitFormChange: visitFormChange => dispatch(newVisitFormAction(visitFormChange)),
    newVisitToDatabase: (restToAddVisitTo, date, comment, mealEaten) => dispatch(creatNewVisit(restToAddVisitTo, date, comment, mealEaten)),
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewVisit)

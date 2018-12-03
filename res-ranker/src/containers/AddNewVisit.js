import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { newVisitFormAction, creatNewVisit, userPageToLoadAction } from '../store/actions/'
// import EditRanking from '../components/EditRanking'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import UploadImage from '../components/UploadImage'


class AddNewVisit extends Component {
  state = {
    redirect: false
  }

  handleChange = (event) => {
    let {newVisitFormChange, newVisitForm } = this.props
    let formChange = {...newVisitForm, [event.target.name]: event.target.value }
    newVisitFormChange(formChange)
  }

  handleDateChange = (date) => {
    let {newVisitFormChange, newVisitForm } = this.props
    let formChange = {...newVisitForm, 'date':date}
    newVisitFormChange(formChange)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {allVisits, visitRestaurant, userLoggedIn, rankedRestaurants } = this.props
    let restToAddVisitTo = rankedRestaurants.find(rest => rest.restaurant_id === visitRestaurant.id)
    let {date, comment, mealEaten} = this.props.newVisitForm

    const image = event.target.querySelector('#file-input').files[0]
    console.log(image);
    let formUpload = new FormData()
    formUpload.append("image", image)

    let visitData = {
      "restaurant_id": visitRestaurant.id,
      "user_id": userLoggedIn.id,
      "date": date,
      "comment": comment,
      "meal_eaten": mealEaten,
    }

    formUpload.append("visitData", JSON.stringify(visitData))





    console.log('ID', visitRestaurant.id , userLoggedIn.id , 'date:', date, 'comment:', comment, 'mealEaten:', mealEaten, "Allthe visits", allVisits);



    this.props.newVisitToDatabase(formUpload, allVisits)

    this.props.newVisitFormChange({date: new Date(), comment:"", mealEaten:""})
    this.props.userPageToLoadFunction('editRanking')
    this.setState({
      redirect: true,
    });
  }

  render (){
    console.log(this.props.allVisits);
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
            <DatePicker
              name='date'
              selected={this.props.newVisitForm.date}
              onChange={this.handleDateChange}
            />
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
            <input type="file" id="file-input"/>
            <input type="submit"></input>
          </form>
        </div>
      </div>
    );
  }
}





const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    visitRestaurant: state.visitRestaurant,
    newVisitForm: state.newVisitForm,
    rankedRestaurants: state.rankedRestaurants,
    allVisits: state.allVisits,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newVisitFormChange: visitFormChange => dispatch(newVisitFormAction(visitFormChange)),
    newVisitToDatabase: (userResRankId, restaurantId, userID, date, comment, mealEaten, allVisits) => dispatch(creatNewVisit(userResRankId,restaurantId, userID, date, comment, mealEaten, allVisits)),
    userPageToLoadFunction: userPageToLoad => dispatch(userPageToLoadAction(userPageToLoad))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewVisit)

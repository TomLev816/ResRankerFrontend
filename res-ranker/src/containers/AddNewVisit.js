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

    // get info from props/redux visitFormChange
    const {allVisits, visitRestaurant, userLoggedIn } = this.props

    // get info from users filled out form
    let {date, comment, mealEaten} = this.props.newVisitForm

    //get the image from the page
    const image = event.target.querySelector('#file-input').files[0]

    // FormData object lets you compile a set of key/value pairs to send using XMLHttpRequest
    let formUpload = new FormData()

    // Image file added to form
    formUpload.append("image", image)

    // create object of visit data
    let visitData = {
      "restaurant_id": visitRestaurant.id,
      "user_id": userLoggedIn.id,
      "date": date,
      "comment": comment,
      "meal_eaten": mealEaten,
    }

    // add visit data to formdata with image
    formUpload.append("visitData", JSON.stringify(visitData))


    // console.log('ID', visitRestaurant.id , userLoggedIn.id , 'date:', date, 'comment:', comment, 'mealEaten:', mealEaten, "Allthe visits", allVisits);

    // sends visit to action/index.js/creatNewVisit
    this.props.newVisitToDatabase(formUpload, allVisits)

    this.props.newVisitFormChange({date: new Date(), comment:"", mealEaten:""})
    this.props.userPageToLoadFunction('editRanking')
    this.setState({
      redirect: true,
    });
  }

  render (){
    const {visitRestaurant, newVisitForm } = this.props
    const cusineCapitalized = visitRestaurant.cuisine.charAt(0).toUpperCase() + visitRestaurant.cuisine.slice(1)
    return (
      <div className='user-show-page'>
        {this.state.redirect ? <Redirect to={'/user-page'}/> : null}
        <div className='user-side-of-page'>
          <div className='user-pic'>
            <img src={visitRestaurant.image_src} alt=''></img>
          </div>
          <div className='user-info'>
            <h1>Restaurant Name: {visitRestaurant.name}</h1>
            <h3>Address: {visitRestaurant.address}</h3>
            <h3>Cusine: {cusineCapitalized}</h3>
          </div>
        </div>
        <div className='restaurant-side-of-page'>
          <h1>How Was Your Visit {visitRestaurant.name}</h1>
          <div className='new-visit-form'>
            <form onSubmit={this.handleSubmit}>

              <div className='new-visit-date'>
                <DatePicker
                  name='date'
                  selected={newVisitForm.date}
                  onChange={this.handleDateChange}
                />
              </div>

              <div className='new-visit-meal-eaten'>
                <input
                  name='mealEaten'
                  placeholder='Enter Your Meal'
                  value={newVisitForm.mealEaten}
                  onChange={this.handleChange}>
                </input>
                <div className='new-visit-upload'>
                  <input type="file" id="file-input"/>
                </div>
              </div>


            <center>
              <div className='new-visit-comment'>
                <textarea name='comment' rows="22" cols="50" value={newVisitForm.comment} placeholder='Enter Comment' onChange={this.handleChange}></textarea>
              </div>
            </center>

              <input type="submit"></input>
            </form>
            </div>
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

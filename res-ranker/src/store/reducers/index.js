import { combineReducers } from "redux";
import allRestaurants from "./allRestaurants";
import allUsers from "./allUsers";
import userLoggedIn from './userLoggedIn'
import rankedRestaurants from './rankedRestaurants'
import visitRestaurant from './visitRestaurant'
import userPageToLoad from './userPageToLoad'
import newVisitForm from './newVisitForm'

const rootReduce = combineReducers({
  allRestaurants: allRestaurants,
  allUsers : allUsers,
  userLoggedIn: userLoggedIn,
  rankedRestaurants: rankedRestaurants,
  visitRestaurant: visitRestaurant,
  userPageToLoad: userPageToLoad,
  newVisitForm: newVisitForm
});

export default rootReduce;

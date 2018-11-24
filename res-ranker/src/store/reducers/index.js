import { combineReducers } from "redux";
import allRestaurants from "./allRestaurants";
import allUsers from "./allUsers";
import userLoggedIn from './userLoggedIn'

const rootReduce = combineReducers({
  allRestaurants: allRestaurants,
  allUsers : allUsers,
  userLoggedIn: userLoggedIn
});

export default rootReduce;

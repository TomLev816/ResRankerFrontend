import { combineReducers } from "redux";
import allRestaurants from "./allRestaurants";
import allUsers from "./allUsers";
import userLoggedIn from './userLoggedIn'
import rankedRestaurants from './rankedRestaurants'

const rootReduce = combineReducers({
  allRestaurants: allRestaurants,
  allUsers : allUsers,
  userLoggedIn: userLoggedIn,
  rankedRestaurants: rankedRestaurants
});

export default rootReduce;

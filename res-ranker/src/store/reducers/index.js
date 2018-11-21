import { combineReducers } from "redux";
import allRestaurants from "./allRestaurants";

const rootReduce = combineReducers({
  team1Roster: allRestaurants
});

export default rootReduce;

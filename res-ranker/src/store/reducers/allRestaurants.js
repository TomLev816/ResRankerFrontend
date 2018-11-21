const defaultAllRestaurants = [];

const allRestaurants = (state = defaultAllRestaurants, action) => {
  debugger;
  switch (action.type) {
    case "LOAD_TEAM_FROM_API":
      return action.payload;
    default:
      return state;
  }
};

export default allRestaurants;

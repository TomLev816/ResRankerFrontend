const defaultRankedRestaurants = [];

const rankedRestaurants = (state = defaultRankedRestaurants, action) => {
  switch (action.type) {
    case "CHANGE_RANKED_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default rankedRestaurants;

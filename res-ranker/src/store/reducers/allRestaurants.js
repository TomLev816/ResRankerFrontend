const defaultAllRestaurants = [];

const allRestaurants = (state = defaultAllRestaurants, action) => {
  switch (action.type) {
    case "LOAD_RESTAURANTS_FROM_API":
      return action.payload;
    default:
      return state;
  }
};

export default allRestaurants;

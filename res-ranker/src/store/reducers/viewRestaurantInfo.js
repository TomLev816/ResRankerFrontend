const defaultRestaurantInfoLoad = '';

const restaurantInfoLoad = (state = defaultRestaurantInfoLoad, action) => {
  switch (action.type) {
    case "RESTAURANT_INFO_LOAD":
      return action.payload;
    default:
      return state;
  }
};

export default restaurantInfoLoad;

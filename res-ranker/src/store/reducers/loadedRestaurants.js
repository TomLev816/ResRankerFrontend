const defaultLoadedRestaurants = false;

const loadedRestaurants = (state = defaultLoadedRestaurants, action) => {
  switch (action.type) {
    case "GETTING_RESTAURANTS":
      return action.payload;
    default:
      return state;
  }
};

export default loadedRestaurants;

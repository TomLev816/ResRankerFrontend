const defaultVisitRestaurant = '';

const visitRestaurant = (state = defaultVisitRestaurant, action) => {
  switch (action.type) {
    case "VISIT_RESTAURANT":
      return action.payload;
    default:
      return state;
  }
};

export default visitRestaurant;

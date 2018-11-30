const defaultAllVisits = [];

const allVisits = (state = defaultAllVisits, action) => {
  switch (action.type) {
    case "LOAD_VISITS_FROM_API":
      return action.payload;
    case "NEW_VISIT_RESTAURANT":
      return action.payload;
    default:
      return state;
  }
};

export default allVisits;

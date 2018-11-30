const defaultUserVisits = [];

const userVisits = (state = defaultUserVisits, action) => {
  switch (action.type) {
    case "VISIT_RESTAURANT":
      return action.payload;
    default:
      return state;
  }
};

export default userVisits;

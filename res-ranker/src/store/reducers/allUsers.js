const defaultAllUsers = [];

const allUsers = (state = defaultAllUsers, action) => {
  switch (action.type) {
    case "LOAD_USERS_FROM_API":
      return action.payload;
      case "NEW_USER":
        return [...state, action.payload];
    default:
      return state;
  }
};

export default allUsers;

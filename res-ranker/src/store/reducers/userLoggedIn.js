const defaultUserLoggedIn = '';

const userLoggedIn = (state = defaultUserLoggedIn, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload;
    default:
      return state;
  }
};

export default userLoggedIn;

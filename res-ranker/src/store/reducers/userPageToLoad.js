const defaultUserPageToLoad = 'renderRestaurants';

const userPageToLoad = (state = defaultUserPageToLoad, action) => {
  switch (action.type) {
    case "USER_PAGE_TO_LOAD":
      return action.payload;
    default:
      return state;
  }
};

export default userPageToLoad;

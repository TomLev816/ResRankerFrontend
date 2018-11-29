const defaultUserMapToLoad = 'restaurantList';

const userMapToLoad = (state = defaultUserMapToLoad, action) => {
  switch (action.type) {
    case "USER_MAP_TO_LOAD":
      return action.payload;
    default:
      return state;
  }
};

export default userMapToLoad;

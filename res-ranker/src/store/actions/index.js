export const getRestaurants = (apiData) => {
  console.log(apiData);
  return {
    type: "LOAD_RESTAURANTS_FROM_API",
    payload: apiData
  }
}

export const getUsers = (apiData) => {
  console.log(apiData)
  return {
    type: "LOAD_USERS_FROM_API",
    payload: apiData
  }
}

export const userLoggedInAction = (user) => {
  console.log(user)
  return {
    type: "LOGIN_USER",
    payload: user
  }
}

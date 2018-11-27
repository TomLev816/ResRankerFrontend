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

export const rankedRestaurantsAction = (newRestaurantRanking) => {
  console.log(newRestaurantRanking)
  return {
    type: "CHANGE_RANKED_LIST",
    payload: newRestaurantRanking
  }
}

export const visitRestaurantsAction = (visitRestaurant) => {
  console.log(visitRestaurant);
  return {
    type: "VISIT_RESTAURANT",
    payload: visitRestaurant
  }
}

export const userPageToLoadAction = (userPageToLoad) => {
  console.log(userPageToLoad);
  return {
    type: "USER_PAGE_TO_LOAD",
    payload: userPageToLoad
  }
}

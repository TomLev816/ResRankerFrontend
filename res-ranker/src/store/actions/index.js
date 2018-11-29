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

export const newVisitFormAction = (newVisitForm) => {
  console.log(newVisitForm);
  return {
    type: "CHANGE_VISIT_FORM",
    payload: newVisitForm
  }
}

export const restaurnatInfoLoadAction = (restaurnatInfoLoad) => {
  console.log(restaurnatInfoLoad);
  return {
    type: "RESTAURANT_INFO_LOAD",
    payload: restaurnatInfoLoad
  }
}

export const viewOrMapAction = (viewOrMap) => {
  console.log(viewOrMap);
  return {
    type: "VIEW_OR_MAP_TO_LOAD",
    payload: viewOrMap
  }
}



export const creatNewUserRestaurantRank = (restaurant, userLoggedIn, rankedRestaurants) => {
 return (dispatch) => {
   dispatch({ type: 'UPDATE_USER_RES_RANK' })
   fetch('http://localhost:4000/api/v1/user_restaurant_rankings', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json'
     },
     body: JSON.stringify({
       "restaurant_id": restaurant.id,
       "user_id": userLoggedIn.id,
       "ranking": rankedRestaurants.length,
       "visits": [],
     })
   })
     .then(response => {
       console.log(response)
       if (response.ok) {
         return response.json()
       } else {
         throw response
       }
     })
     .then(userResRank => {
       console.log('%c INSIDE .THEN', 'color: navy', userResRank)
       dispatch({ type: 'CHANGE_RANKED_LIST', payload: [...rankedRestaurants,userResRank ] })

     })
     .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
 }
}

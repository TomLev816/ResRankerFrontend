import React from 'react';
import { connect } from 'react-redux'
import { userLoggedInAction } from '../store/actions/'




function ViewVisits(props) {
  console.log(props.userLoggedIn);
  console.log(props.allVisits);
  console.log(props.rankedRestaurants);


const renderVisits = (props) => {
}

  return (
    <div>
      VISIT PAGE
      {renderVisits(props)}
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    allVisits: state.allVisits,
    rankedRestaurants: state.rankedRestaurants,
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    userLoggedInFunction: user => dispatch(userLoggedInAction(user)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewVisits)

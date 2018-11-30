import React from 'react';
import { connect } from 'react-redux'



function ViewVisits(props) {
  console.log(props.userLoggedIn);
  console.log(props.allVisits);

let userVisits = []
userVisits = props.allVisits.filter(visit => visit.user_id === props.userLoggedIn.id)
console.log(userVisits)


  return (
    <div>
      VISIT PAGE

    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
    allVisits: state.allVisits
  }
}


export default connect(mapStateToProps)(ViewVisits)

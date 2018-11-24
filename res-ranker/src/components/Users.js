import React from 'react';
import { connect } from 'react-redux'

function Users(props) {
  console.log(props);
  return (
    <div>
      {props.allUsers.map(user => console.log(user))}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers
  }
}

export default connect(mapStateToProps)(Users)

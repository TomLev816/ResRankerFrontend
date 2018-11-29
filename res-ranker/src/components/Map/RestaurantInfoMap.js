import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
class RestaurantInfoMap extends PureComponent {

  renderStats = (restaurant) => {
    const {allUsers} = this.props

    let first = 0
    let top3 = 0
    let top10 = 0
    let bad = 0
    restaurant.user_restaurant_rankings.map(restaurant => {
      if (restaurant.ranking === 0) {
        return first += 1
      } else if (restaurant.ranking < 3) {
        return top3 += 1
      } else if (restaurant.ranking < 10) {
        return top10 += 1
      } else {
        return bad += 1
      }
    })


    first = first / allUsers.length
    first = Number((first).toFixed(2))
    first = first * 100

    top3 = top3 / allUsers.length
    top3 = Number((top3).toFixed(2))
    top3 = top3 * 100

    top10 = top10 / allUsers.length
    top10 = Number((top10).toFixed(2))
    top10 = top10 * 100



    return (
      <div>
        <h4>Ranked first by {first}% of users </h4>
        <h4>Ranked top 3 by {top3}% of users</h4>
        <h4>Ranked top 10 by {top10}% of users</h4>
      </div>
    )
  }


  render() {
    const {restaurant} = this.props;
    console.log(restaurant);
    const displayName = `${restaurant.name}`;

    return (
      <div>
        <div>
          {displayName}
        </div>
        <img width={240} src={restaurant.image_src} alt="" />
        <div>
          {this.renderStats(restaurant)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allUsers: state.allUsers
  }
}

export default connect(mapStateToProps)(RestaurantInfoMap)

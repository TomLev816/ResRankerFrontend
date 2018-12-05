import React, {Component} from 'react';
import { connect } from 'react-redux'
import {render} from 'react-dom';
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';


import RestaurantPin from './RestaurantPin';
import RestaurantInfoMap from './RestaurantInfoMap';



const token = 'pk.eyJ1IjoiZGV2bGV2Z3JvdXAiLCJhIjoiY2pwMTVsZXBkMDg3YjN3cWdnamU4czQwaSJ9.e3MR7gYQgh9rSfdM_45TCw'

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

class MapShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 40.73,
        longitude: -73.95,
        zoom: 11,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  updateViewport = (viewport) => {
    this.setState({viewport});
  }

  renderRestaurantMarker = (restaurant, index) => {
    return (
      <Marker
        className="on-the-map"
        key={`marker-${index}`}
        longitude={restaurant.location_long}
        latitude={restaurant.location_lat} >

        <RestaurantPin size={20} onClick={() => this.setState({popupInfo: restaurant})} />
      </Marker>
    );
  }

  renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      <Popup tipSize={15}
        anchor="top"
        longitude={popupInfo.location_long}
        latitude={popupInfo.location_lat}
        onClose={() => this.setState({popupInfo: null})} >
         <RestaurantInfoMap restaurant={popupInfo} />
      </Popup>
    );
  }

  render() {
    const {viewport} = this.state;
    const {restaurants} = this.props


    return (
      <MapGL
        {...viewport}
        width="100%"
        height="800px"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this.updateViewport}
        mapboxApiAccessToken={token} >

        {restaurants.map(this.renderRestaurantMarker) }

        {this.renderPopup()}

        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this.updateViewport} />
        </div>

      </MapGL>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userLoggedIn: state.userLoggedIn,
  }
}

export default connect(mapStateToProps)(MapShow)

export function renderToDom(container) {
  render(<MapShow/>, container);
}

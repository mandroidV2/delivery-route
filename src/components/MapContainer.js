import React, { Component } from "react";
import {Map, GoogleApiWrapper, Polyline} from 'google-maps-react';
 
class MapContainer extends Component {
 
  render() {
    console.log('path ' , this.props.path)
    const initialCenter = { lat: 22.3964, lng: 114.1095 };
    const polyPath = this.props.path;
    const bounds = new this.props.google.maps.LatLngBounds();
    if (polyPath.length === 0) {
      bounds.extend(initialCenter);
    } else {
      for (var i = 0; i < polyPath.length; i++) {
        bounds.extend(polyPath[i]);
      }
    }
    
    return(
      <Map google={this.props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        initialCenter={initialCenter}
        bounds={bounds}
        zoom={4}>
          <Polyline
            path={polyPath}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={3} />
      </Map>
    )
  }
}
 
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(MapContainer)
import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { GoogleMapAPIKey } from '../../config';
import './Map.css';

const GoogleAPI = process.env.GOOGLE_API || GoogleMapAPIKey;

class GoogleMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {}
    };
    this.onMouseover = this.onMouseover.bind(this);
    this.onMouseout = this.onMouseout.bind(this);
  }

  onMouseover(props, marker) {
    this.setState({
      activeMarker: marker,
      showingInfoWindow: true
    })
  };

  onMouseout() {
    this.setState({
      showingInfoWindow: false
    })
  };

  render() {
    const { image, name } = this.props.restaurant
    return (
      <div id='map'>
        <Map zoom={15} google={this.props.google} initialCenter={{
          lat: this.props.latitude,
          lng: this.props.longitude
        }}>
          <Marker onMouseover={this.onMouseover} onMouseout={this.onMouseout} onClick={this.onMouseover}/>
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h6>{name}</h6>
              <img className='info-restoImage' src={image} alt={name} />
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}



export default GoogleApiWrapper({
  apiKey: (GoogleAPI),
  version: 3.39
})(GoogleMap);

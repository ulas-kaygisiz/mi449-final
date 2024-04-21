// this is the first api that is used to display the map and get the country information

import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const startPosition = {
    lat: 42.70,
    lng: -84.48
  };

const mapStyle = {
height: '65vh',
  width: '85vw',
  margin: '3vh',
};


function MapComponent({ onClick }) {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={5}
        center={startPosition}
        onClick={onClick} 
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(MapComponent);

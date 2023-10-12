import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React from 'react';

const MapContainer = () => {
  const mapStyles = {
    height: '400px',
    width: '600px'
  };

  const defaultCenter = {
    lat: 1.3521,
    lng: 103.8198
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBtCNokZUWwJY38GhVR4JP1SLYHB3njp74"
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        { /* Add map markers or other map components here */ }
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;

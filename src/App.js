// combines both Google Maps API and REST Countries API in the main app

import React, { useState } from 'react';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Spinner } from 'react-bootstrap';

function App() {
  const [countryInfo, setCountryInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hoverStyle, setHoverStyle] = useState({});
  const [error, setError] = useState('');

  const handleMapClick = async (event) => {
    setLoading(true);
    setError('');
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, async (results, status) => {
      if (status === 'OK') {
        const addressComponents = results[0].address_components;
        const countryComponent = addressComponents.find(component => component.types.includes('country'));
        if (countryComponent) {
          const country = countryComponent.long_name;
          //  the usage of second api
          fetch(`https://restcountries.com/v3.1/name/${country}`)
            .then(response => response.json())
            .then(data => {
              const countryData = data[0];
              setCountryInfo({
                country: countryData.name.common,
                flag: countryData.flags.svg,
                population: countryData.population,
                flagDescription: countryData.flags.alt
              });
            })
            .catch(error => {
              console.error('Failed to fetch country data', error);
              setError('Failed to fetch country information, please try clicking somewhere else.');
              setCountryInfo(null);
            })
            .finally(() => setLoading(false));
        } else {
          setError('No country found at this location, please click somewhere else.');
          setCountryInfo(null);
          setLoading(false);
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
        setError('Geocoder error. Please try again.');
        setCountryInfo(null);
        setLoading(false);
      }
    });
  };

  // styling for 3D visual effect
  const cardHoverEnter = () => {
    setHoverStyle({
      transform: 'translateY(-10px) scale(1.05)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
    });
  };

  const cardHoverLeave = () => {
    setHoverStyle({});
  };

  const appStyle = {
    textAlign: 'center',
    backgroundColor: '#6B7FD7', 
    minHeight: '100vh',
    paddingTop: '5vh',
  };

  const titleStyle = {
    color: '#DDFBD2', 
    marginBottom: '1vh'
  };

  const mapHolderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '3vh'
  };

  const cardStyle = {
    width: '60vw',
    backgroundColor: '#9448BC', 
    marginTop: '3vh',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
    borderColor: '#4C2A85' 
  };

  const cardTextStyle = {
    fontSize: '1.25em',
    color: '#fff',
  };

  const spinnerStyle = {
    color: '#DDFBD2', 
    marginTop: '3vh'
  };

  return (
    <div className="App" style={appStyle}>
      <h1 style={titleStyle}>Country Information</h1>
      <p>Click anywhere on the map to see the country name, flag information, and population.</p>
      <div className='mapHolder' style={mapHolderStyle}>
        <MapComponent onClick={handleMapClick} />
        {loading ? (
          <Spinner animation="border" role="status" style={spinnerStyle}>
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : error ? (
          <Card style={cardStyle}>
            <Card.Body>
              <Card.Text style={cardTextStyle}>
                {error}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : countryInfo && (
          <Card style={{...cardStyle, ...hoverStyle}}
                onMouseEnter={cardHoverEnter}
                onMouseLeave={cardHoverLeave}>
            <Card.Body>
              <Card.Title style={cardTextStyle}>{countryInfo.country}</Card.Title>
              <Card.Text style={cardTextStyle}>
                <img src={countryInfo.flag} alt={`Flag of ${countryInfo.country}`} style={{ height: '100px' }} />
                <br />
                Population: {countryInfo.population.toLocaleString()}
                <br />
                <small>{countryInfo.flagDescription}</small>
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;

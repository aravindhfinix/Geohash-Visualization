import React, { useState, useCallback } from 'react';
import './App.css';
import MapWithGeohashes from './Geohash/MapWithGeohashes';

function App() {
  const [geohashInput, setGeohashInput] = useState('t9ywx');
  const [staticCoordinatesInput, setStaticCoordinatesInput] = useState(''); // New input for static coordinates
  const [geohashList, setGeohashList] = useState([]);
  const [staticCoordinates, setStaticCoordinates] = useState([
    [11.072102914349513, 76.97078501124118],
    [11.07024978115282, 76.95636545557711],
    [11.060983939304466, 76.96220194239352],
    [11.052054760004486, 76.95756708521579],
    [11.04144047633279, 76.95945536036227],
    [11.032510702396053, 76.96323191065524],
    [11.027624484802901, 76.9637468947861],
    [11.022401196885015, 76.96572100062106],
    [11.022569691491652, 76.97121416468356],
    [11.03613319058459, 76.99533258814547],
    [11.042872584625423, 76.99254309076998],
    [11.048432468252146, 76.99679170984957],
    [11.051517737016189, 77.00178061861727],
    [11.053086683771422, 76.99372326273654],
    [11.052128468965414, 76.98497926134799],
    [11.055045222977125, 76.97486196894381],
    [11.063574192784497, 76.97179352183078],
    [11.072102914349513, 76.97078501124118],
  ]);

  const handleInputChange = useCallback((event) => {
    setGeohashInput(event.target.value);
  }, []);

  const handleStaticCoordinatesInputChange = useCallback((event) => {
    setStaticCoordinatesInput(event.target.value);
  }, []);

  const handleAddGeohashes = useCallback(() => {
    const geohashes = geohashInput.split(',').map((item) => item.trim());
    setGeohashList(geohashes);
  }, [geohashInput]);

  const handleAddStaticCoordinates = useCallback(() => {
    try {
      // Remove the first three and last three characters (brackets and spaces)
      const trimmedInput = staticCoordinatesInput.trim().slice(3, -3);
      // Split the trimmed input into individual coordinate pairs and map them
      const coordinates = trimmedInput.split(',').map((coordinatePair) => {
        // Split each coordinate pair into latitude and longitude
        const [longitude, latitude] = coordinatePair.trim().split(' ');
        return [parseFloat(latitude), parseFloat(longitude)];
      });
      setStaticCoordinates(coordinates);
    } catch (error) {
      console.error("Error parsing static coordinates:", error);
    }
  }, [staticCoordinatesInput]);

  const isGeohashButtonDisabled = geohashInput.trim() === '';
  const isStaticCoordinatesButtonDisabled = staticCoordinatesInput.trim() === '';

  return (
    <div className="App">
      <div>
        <MapWithGeohashes geohashList={geohashList} staticCoordinates={staticCoordinates} />
        <br />
        <br />
        <input
          type="text"
          value={geohashInput}
          onChange={handleInputChange}
          placeholder="Enter geohashes, separated by commas"
          style={{ width: '300px' }}
        />
        <br />
        <button onClick={handleAddGeohashes} disabled={isGeohashButtonDisabled}>Add Geohashes</button>

        <br />
        <br />
        <input
          type="text"
          value={staticCoordinatesInput}
          onChange={handleStaticCoordinatesInputChange}
          placeholder="Enter static coordinates"
          style={{ width: '300px' }}
        />
        <br />
        <button onClick={handleAddStaticCoordinates} disabled={isStaticCoordinatesButtonDisabled}>Add Static Coordinates</button>
      </div>
    </div>
  );
}

export default App;

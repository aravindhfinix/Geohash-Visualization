import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup } from 'react-leaflet';
import './MapWithGeohashes.css'; // Import a CSS file for custom styles
import * as geohash from 'ngeohash';

const MapWithGeohashes = React.memo(({ geohashList, staticCoordinates }) => {
  const polygons = useMemo(() => {
    return geohashList.map((geohashCode) => {
      const bounds = geohash.decode_bbox(geohashCode);
      const polygon = [
        [bounds[0], bounds[1]],
        [bounds[0], bounds[3]],
        [bounds[2], bounds[3]],
        [bounds[2], bounds[1]],
      ];
      return (
        <Polygon key={geohashCode} positions={polygon} >
          <Popup>{geohashCode}</Popup>
        </Polygon>
      );
    });
  }, [geohashList]);

  return (
    <div>
      <MapContainer
        center={staticCoordinates[0]}
        zoom={13}
        style={{ height: '70vh', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Polygon positions={staticCoordinates} color="transparent" fillOpacity={0.2} className="custom-polygon" />

        {staticCoordinates.map((coordinate, index) => (
          <CircleMarker
            key={index}
            center={coordinate}
            radius={1}
            color="red"
          >
            <Popup>
              <div>
                <p>Static Coordinate</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {polygons}
      </MapContainer>
    </div>
  );
});

export default MapWithGeohashes;

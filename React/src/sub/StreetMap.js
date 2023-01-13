import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function StreetMap(props) {

  const getCoords = (item) => {
    const stringArray = item.Address.split(",");
    let city = props.cities.find((obj) => obj.name.trim() === stringArray[1].trim());
    if(city!== undefined)
    {
      return [city.latitude,city.longitude];
    }
  }
  return (
    <div className="mapBox">
      <MapContainer center={[51.9189046 , 19.1343786]} zoom={6} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="dupcia">
          {props.data.map((item) => <Marker key={item.Id} position={getCoords(item)}><Popup key={item.Id}>{item.Notes}</Popup></Marker>)}
        </div>
        
        
      </MapContainer>
    </div>
  );
}

export default StreetMap;

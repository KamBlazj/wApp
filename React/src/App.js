import React from 'react';
import {useEffect} from 'react';
import './App.css';
import List from './sub/List';
import StreetMap from './sub/StreetMap';
import Indicator from './sub/Indicator';


function App() {
  const [data, setData] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [voivodeships, setVoivodeships] = React.useState([]);
  const [render, setRender] = React.useState(false);
  useEffect(() => {
    checkRender();
  },[cities, voivodeships]);
  const checkRender = () => {
    if(cities.length > 0 && voivodeships.length > 0)
    {
      setRender(true);
    }
  }

  useEffect(() => {
    fetch(`https://wavy-media-proxy.wavyapps.com/investors-notebook/?action=get_entries`)
    .then((res) => res.json())
    .then((res) => {setData(res);});
  }, []);
  useEffect(() => {
    fetch(`https://wavy-media-proxy.wavyapps.com/investors-notebook/data/miasta.json`)
    .then((res) => res.json())
    .then((res) => {setCities(res);});
  }, []);
  useEffect(() => {
    fetch(`https://wavy-media-proxy.wavyapps.com/investors-notebook/inst4/data/wojewodztwa.json`)
    .then((res) => res.json())
    .then((res) => {setVoivodeships(res);});
  }, []);
  return (
    <div className="reactApp">
      <h3>Lista Nieruchomości React</h3>
      <Indicator data={data} />
      { render ?  <List data={data} cities={cities} voivodeships={voivodeships} /> : "" }
      <h3>Mapa Nieruchomości</h3>
      <StreetMap data={data} cities={cities} />
      
    </div>
  );
}

export default App;

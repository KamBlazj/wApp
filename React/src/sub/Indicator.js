import React from 'react';
import {useEffect} from 'react';

function Indicator(props) {
  const MINUTE_MS = 60000;
  const [newAmount, setNewAmount] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      getNew(props.data);
    }, MINUTE_MS);
  
    return () => clearInterval(interval); 
  }, [props.data]);


  const getNew = (old) => {
    fetch(`https://wavy-media-proxy.wavyapps.com/investors-notebook/?action=get_entries`)
    .then((res) => res.json())
    .then((res) => checkNew(res, old));
  }
  const checkNew = (list, old) => {
    let amount = 0;
    for (let i = 0, len = list.length; i < len; i++) { 
      let found = false;
      for (let j = 0, len2 = old.length; j < len2; j++) { 
        
          if (list[i].Id.trim() === old[j].Id.trim()) {
              found = true;
              break;
          }
      }
      if(!found){ amount++;}
    }
    setNewAmount(amount);
  }
  return (
    <div>
      {newAmount > 0 ? <div className="indicator"> Pojawiły się nowe nieruchomośi: {newAmount} nowych</div> : ''}
    </div>
  );
}

export default Indicator;

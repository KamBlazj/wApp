import React from 'react';

function Location(props) {
  //const stringArray = props.item.Address.split(",");
  
  const getClass = () => 
  {
    let clas = "tr_main tr_main3";
    if(props.index%2 === 1)
    {
        clas = "tr_main tr_main4";
    }
    return clas;
  }
  return (
    <tbody className={getClass()}>
      <tr>
        <td>{props.address[0]}</td>
        <td>{props.address[1]}</td>
        <td>{props.address[2]}</td>
      </tr>
      <tr>
        <td colSpan="3">{props.item.Notes}</td>
      </tr>
    </tbody>
  );
}

export default Location;

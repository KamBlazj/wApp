import React from 'react';

function PageButton(props) {
  const clicked = () => {
    props.pageClicked(props.nr);
  }
  const getClass = () => 
  {
    let clas = "pageButton pageButtonNonActive";
    if(props.nr + 1 === props.page)
    {
        clas = "pageButton pageButtonActive";
    }
    return clas;
  }
  return (
    <div className={getClass()} onClick={(event) => clicked(event)}>{props.nr + 1}</div>
  );
}

export default PageButton;

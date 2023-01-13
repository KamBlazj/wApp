import React from 'react';
import {useEffect} from 'react';
import Location from './Location';
import PageButton from './PageButton';

function List(props) {
  const [dataShow, setDataShow] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [pageAmount, setPageAmount] = React.useState(0);
  const perPage = 5;

  useEffect(() => {
    dataToShow();
  },[props.data, page]);
  useEffect(() => {
    pagesCount();
  },[props.data]);
  const dataToShow = () => {
    let i = 0;
    setDataShow(props.data.filter((item) =>{
      i++;
      if(i<= page * perPage && i > (page-1) * perPage)
      {
        return item;
      }
    }));
  }
  const pagesCount = () => {
    setPageAmount(Math.ceil(props.data.length/perPage));
  }
  const pageClicked = (nr) => {
    setPage(nr+1);
  }
  const distribute = (item) => {
    const stringArray = item.split(",");
    let result = ["","",""];
    let non = 0;
    for(let i = 0; i<stringArray.length; i++)
    {
        const type = check(stringArray[i]);
        if(type === 0)
        {
            result[0] = stringArray[i];
        }
        else if(type === 1)
        {
            result[1] = stringArray[i];
        }
        else if(type === 2)
        {
            result[2 - non] = stringArray[i];
            non++;
        }
    }
    return result;
  }
  const check = (item) => {
    const voivodeship = props.voivodeships.find(obj => obj.name.trim() === item.trim());
    if(voivodeship!==undefined)
    {
        if(voivodeship.name === item)
        {
            return 0;
        }
    }
    
    const trimmed = item.trim();
    const lowered = trimmed.charAt(0).toLowerCase()+ item.trim().slice(1);
    const voivodeship2 = props.voivodeships.find(obj => obj.name.trim() === lowered);
    if(voivodeship2!==undefined)
    {
        if(voivodeship2.name === lowered)
        {
            return 0;
        }
    }
    const city = props.cities.find(obj => obj.name.trim() === item.trim());
    if(city!==undefined)
    {
        if(city.name === item)
        {
            return 1;
        }
    }
    const upper = trimmed.charAt(0).toUpperCase()+ item.trim().slice(1);
    const city2 = props.cities.find(obj => obj.name.trim() === upper);
    if(city2!==undefined)
    {
        if(city2.name === upper)
        {
            return 1;
        }
    }
    return 2;
  }
  return (
    <div className="reactList">
      <table>
        <thead>
          <tr>
            <th>Województwo</th>
            <th>Miasto</th>
            <th>Ulica</th>
          </tr>
          <tr>
            <th colSpan="3">Notatka</th>
          </tr>
        </thead>
        {dataShow.map((item, index) => <Location address={distribute(item.Address)} key={item.Id} index={index} item={item}/>)}
      </table>
      <div className="pagination">
      {pageAmount > 1
        ? [...Array(pageAmount)].map((x, i) =>
          <PageButton pageClicked={pageClicked} key={i} page={page} nr={i} />
        )
        : ""
      } 
      </div>
    </div>
  );
}

export default List;

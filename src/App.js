import { useState, useEffect } from 'react';
import SearchBar from './SearchBar.js';
import AddInvItem from './AddInvItem';
import InvItemsDisplay from './InvItemsDisplay';


function App() {
  const [filterData, setFilterData] = useState({});
  const [invItems, setInvItems] = useState({items: []})


  const updateFilterData = (searchParams) => {
    setFilterData(searchParams);
  }

/* this function is called whenever addInvItem prop is accessed from inside the AddInvItem component
through props.addInvItem when Add Item Button is pressed. The passed object inside the component is
passed one level up to App parent component level where is to a parent-level state which is invItems.
*/
  const addItemToInvItems = (item) => {
    let items = invItems['items'];
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    };
    fetch("http://localhost:3001/items", requestOptions)
    .then((response) => response.json())
    .then((recievedResponseFromPOSTRequest) => {
      items.push(recievedResponseFromPOSTRequest);
      setInvItems({items: items});
    });

  };

  function filterInvItems (data) {
    const filteredInvItems = [];
    
    if (!filterData.name) {
      return data;
    }
    //item is one object inside items array which is inside invItems state
    for (let item of data) {
      if(filterData.name !== "" && item.name !== filterData.name) {
        continue;
      }

      if(filterData.price !== 0 && item.price > filterData.price) {
        continue;
      }

      if(filterData.type !== "" && item.type !== filterData.type) {
        continue;
      }

      if(filterData.brand !== "" && item.brand !== filterData.brand) {
        continue;
      }
      filteredInvItems.push(item);
    }
    return filteredInvItems;
  };

  /*useEffect hook fires when there's an update to any of states of the
  component. What comes after return keyword is only executed before a new update
  to the states if there's one; essentially at the point of destruction.
  Passing an empty array as a second to useEffect hook makes the hook runs once at
  the instance of mounting; essentially mimking componentDidMount. Filling the array 
  with state names will execute the hook if those states are changed. Ignoring this argument,
  i.e. not passing anything, will make the hook fires whenever there's a change in any state
  */
  useEffect(() => {
    fetch("http://localhost:3001/items")
    .then((response) => response.json())
    .then((recievedResponseFromGETRequest) => {
      setInvItems({items: recievedResponseFromGETRequest});
    });

  }, []);

  function deleteItem(item) {
    let items = invItems['items'];
    const requestOptions = {
      method: "DELETE"
    }
    fetch(`http://localhost:3001/items/${item["id"]}`, requestOptions)
    .then((response) => {
     if(response.ok) {
      const idx = items.indexOf(item);
      items.splice(idx, 1);
      setInvItems({items: items});
     }
    })
  }
  return (
    <div style={{color: "#ffffff"}} className="container-fluid bg-secondary bg-gradient">
      <div className='row mt-2'><InvItemsDisplay propInvItemsDisplay={filterInvItems(invItems['items'])}
      propDeleteItemButton={deleteItem}/></div>
      <div className='row mt-3'><SearchBar callback={updateFilterData}/></div>
      <div className='row mt-3'><AddInvItem addInvItem={addItemToInvItems}/></div>

    </div>
  );
}

export default App;
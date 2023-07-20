import { useState } from 'react';

export default function SearchBar(props) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const searchButtonPressed = () => {
        props.callback({name: name, price: price, type: type, brand: brand});
    }
    return (
      <div className="container">
        <div className="row">
          <h2>Filter the displayed items by adding filters</h2>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="name-field">Name: </label>
            <input
              className="form-control"
              id="name-field"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="col">
            <label htmlFor="price-field">Max Price: </label>
            <input
              className="form-control"
              id="price-field"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div className="col">
            <label htmlFor="type-field">Type: </label>
            <input
              className="form-control"
              id="type-field"
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            ></input>
          </div>
          <div className="col">
            <label htmlFor="brand-field">Brand: </label>
            <input
              className="form-control"
              id="brand-field"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>
          <div className="col">
            <button
              className="btn btn-warning btn-lg w-100 mt-3"
              type="button"
              onClick={searchButtonPressed}
            >
              Filter
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-10"/>
            
        </div>

        <p>{price}</p>
      </div>
    );
}
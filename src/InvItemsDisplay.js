export default function InvItemsDisplay({propInvItemsDisplay, propDeleteItemButton}) {
  return (
    <div className="container">
      <div className="row">
        <h2>Items</h2>
      </div>
      <div className="row">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Type</th>
              <th scope="col">Brand</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {propInvItemsDisplay.map((item) => {
              return (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.type}</td>
                  <td>{item.brand}</td>
                  {/* if the function inside onClick= is typed without 
                  arrow function notaion like this {propDeleteItemButton(item)}, 
                  the application will delete everything */}
                  <td><button className="btn btn-danger" onClick={() => propDeleteItemButton(item)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
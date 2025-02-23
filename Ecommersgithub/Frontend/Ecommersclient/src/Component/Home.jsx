import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router';

function Home() {
  let [data, setData] = useState([]);
  let params=useParams();


  let showallproduct = async () => {
    try {
      let response = await fetch("http://localhost:8080/showpost");
      let result = await response.json();
      setData(result);
      console.log(result)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const searchData = async (event) => {
    let key = event.target.value;
    let result = await fetch(`http://localhost:8080/search/${key}`)
    result = await result.json();
    console.log(result);
    setData(result);
}
  useEffect(() => {
    showallproduct();
  }, []);

  return (
    <div className="container mt-4">
      <div className="container">
      <div className="mb-3">
    <input type="text" onChange={searchData}  className="form-control" id="exampleInputPassword4" placeholder='Search for product name and category'/>
  </div>
      </div>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div className="category">
        <h4 style={{fontFamily:"fantasy",fontWeight:"lighter",textAlign:"center"}}>Categories</h4>
        <div>
        <span className="badge text-bg-warning" style={{margin:"5px"}}><Link style={{color:"black",textDecoration:"none"}} to={`/filtercategory/mobile`}>Mobile</Link></span>
        <span className="badge text-bg-warning" style={{margin:"5px"}}><Link style={{color:"black",textDecoration:"none"}} to={`/filtercategory/Laptop`}>Laptop</Link></span>
        <span className="badge text-bg-warning" style={{margin:"5px"}}><Link style={{color:"black",textDecoration:"none"}} to={`/filtercategory/TV`}>TV</Link></span>
        </div>
      </div>
      </div>
      <div className="row">
        {data.length > 0 ? data.map((item, index) => (
          <div className="col-md-4 d-flex justify-content-center" key={index}>
            <div className="card" style={{ width: "18rem", margin: "1rem" }}>
              <img src={item.pimage} style={{height:"200px",backgroundPosition:"center"}} className="card-img-top" alt={item.pname} />
              <div className="card-body">
                <h5 className="card-title">{item.pname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: ₹{item.pprice}</h6>
                <span className="badge text-bg-danger">{item.pcategory}</span>
                <span className="badge text-bg-warning" style={{marginLeft:"5px"}}>{item.pcompany}</span>
                <p className="card-text">{item.pdesc}</p>
                <button className='btn btn-primary'><Link style={{color:"white",textDecoration:"none"}} to={`/addtocart/${item._id}`}>Add to cart</Link></button>
              </div>
            </div>
          </div>
        )) : <p>No data available</p>}
      </div>
    </div>
  );
}

export default Home;

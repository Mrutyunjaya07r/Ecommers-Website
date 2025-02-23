import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router'

function Filtercategory() {
    let {categoryname}=useParams();
    let [data,setData]=useState([])
    let fetchcategory=async()=>{
        let result=await fetch(`http://localhost:8080/filtercategories/${categoryname}`)
        result=await result.json();
        setData(result);
        console.log(result);
    }
    useEffect(()=>{
        fetchcategory()
    },[])
  return (
    <div>
        <div className="container mt-4">
            <h1 style={{textAlign:"center",fontFamily:"fantasy"}}>{categoryname}</h1>
            <div className="row">
            {
                data.length>0 ? data.map((item,index)=>(
                    <div className="col-md-4 d-flex justify-content-center" key={index}>
            <div className="card" style={{ width: "18rem", margin: "1rem" }}>
              <img src={item.pimage} style={{height:"200px",backgroundPosition:"center"}} className="card-img-top" alt={item.pname} />
              <div className="card-body">
                <h5 className="card-title">{item.pname}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: ₹{item.pprice}</h6>
                <span class="badge text-bg-danger">{item.pcategory}</span>
                <span class="badge text-bg-warning" style={{marginLeft:"5px"}}>{item.pcompany}</span>
                <p className="card-text">{item.pdesc}</p>
                <button className='btn btn-primary'><Link style={{color:"white",textDecoration:"none"}} to={`/addtocart/${item._id}`}>Add to cart</Link></button>
              </div>
            </div>
          </div>
                ))   : <p>No Category is available</p>
            }
            </div>
           
        </div>
    </div>
  )
}

export default Filtercategory
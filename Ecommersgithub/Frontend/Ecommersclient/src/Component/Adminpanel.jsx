import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

function Adminpanel() {
    let [data,setData]=useState([]);
    let fetchAllpost=async()=>{
        let result=await fetch("http://localhost:8080/showpost");
        result=await result.json();
        setData(result);
    }
   
    useEffect(()=>{
        fetchAllpost();
    },[])
  return (
    <div>
        <h1 style={{textAlign:"center",fontFamily:"fantasy"}}>Admin home panel</h1>
        <div className="container mt-4">
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
                <div style={{display:"flex",alignItems:"center"}}>
                    <button className='btn btn-primary' style={{margin:"5px"}}><Link to={`/updateproduct/${item._id}`} style={{color:"white",textDecoration:"none"}}>Update</Link></button>
                    <button className='btn btn-danger'  style={{margin:"5px"}}><Link to={`/deleteproduct/${item._id}`} style={{color:"white",textDecoration:"none"}}>Delete</Link></button>
                </div>
              </div>
            </div>
          </div>
                )) : <p>No product</p>
            }
        </div>
        </div>
    </div>
  )
}

export default Adminpanel
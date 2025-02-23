import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

function Cartproducy() {
    let {productId}=useParams();
    let [data,setData]=useState({});
    let addtocart=async()=>{
        let result=await fetch(`http://localhost:8080/addtocart/${productId}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "authorization":"Bearer "+localStorage.getItem("Ecommersfinal")
            },
        })
        result=await result.json();
        console.log(result);
        setData(result)
        alert("Product is added to cart successfully")
    }

    useEffect(()=>{
        addtocart()
    },[])
  return (
    <div>
        <div className="container">
            <h1>Add product to cart</h1>
            {
                data && Object.keys(data).length !== 0 ? (
                    <div className="card text-bg-info mb-3" style={{ width: "500px" }}>
                        <div className="card-header"><h2>{data.pname}</h2></div>
                        <div className="card-body">
                            <img style={{ height: "300px", width: "400px" }} src={data.pimage} alt="" />
                            <br />
                            <h5 className="card-title">{data.pdesc}</h5>
                            <h5 className="card-title">Category : {data.pcategory}</h5>
                            <h5 className="card-title">Product Price : {data.pprice} Rs.</h5>
                        </div>
                    </div>
                ):<h2>No product like that</h2>
            }
        </div>
    </div>
  )
}

export default Cartproducy
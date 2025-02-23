import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router';

function Deleteproduct() {
    let navigate=useNavigate();
    let {productId}=useParams();
    let deleteProduct=async()=>{
        let result=await fetch(`http://localhost:8080/admindelete/${productId}`,{
            method:"delete",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("Ecommersfinal")
            }
        })
        result=await result.json();
        console.log(result);
        alert('Product deleted successfully')
        navigate("/")
    }
    useEffect(()=>{
        deleteProduct();
    },[])
  return (
    <div>Deleteproduct</div>
  )
}

export default Deleteproduct
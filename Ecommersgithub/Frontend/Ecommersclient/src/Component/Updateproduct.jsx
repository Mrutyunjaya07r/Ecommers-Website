import React,{useState} from 'react'
import { useParams,useNavigate } from 'react-router'


function Updateproduct() {
    let navigate=useNavigate()
    let {productId}=useParams();
     let [pname,setPname]=useState("");
        let [pcategory,setPcategory]=useState("")
        let [pprice,setPprice]=useState("")
        let [pcompany,setPcompany]=useState("")
    let fetchupdate=async()=>{
        let result=await fetch(`http://localhost:8080/adminupdate/${productId}`,{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization": "Bearer "+localStorage.getItem("Ecommersfinal")
            },
            body:JSON.stringify({
                pname:pname,
                pcategory:pcategory,
                pprice:pprice,
                pcompany:pcompany,
            })
        })
        result=await result.json()
        console.log(result)
        alert('Update successfully')
        navigate("/")
    }

  return (
    <div>
        <h1 style={{textAlign:"center",fontFamily:"fantasy"}}>Update Product</h1>
        <div className="container">
        <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Product Name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={pname} onChange={(e)=>{setPname(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Product category</label>
    <input type="text" className="form-control" id="exampleInputPassword2" value={pcategory} onChange={(e)=>{setPcategory(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Product Price</label>
    <input type="text" className="form-control" id="exampleInputPassword3" value={pprice} onChange={(e)=>{setPprice(e.target.value)}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Product company</label>
    <input type="text" className="form-control" id="exampleInputPassword3" value={pcompany} onChange={(e)=>{setPcompany(e.target.value)}}/>
  </div>

  <button className='btn btn-primary' onClick={fetchupdate}>Update</button>


        </div>
    </div>
  )
}

export default Updateproduct
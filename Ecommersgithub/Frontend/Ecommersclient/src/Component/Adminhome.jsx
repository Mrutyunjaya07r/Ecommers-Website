import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router';

function Adminhome() {
    let navigate=useNavigate();
    let [pname,setPname]=useState("");
    let [pcategory,setPcategory]=useState("")
    let [pprice,setPprice]=useState("")
    let [pcompany,setPcompany]=useState("")
    let [pdesc,setPdesc]=useState("")
    let [pimage,setPimage]=useState("")
    let [url,setUrl]=useState();

    useEffect(()=>{
        if(url){
            fetch("http://localhost:8080/addpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": "Bearer "+localStorage.getItem("Ecommersfinal")
                },
                body:JSON.stringify({
                    pname:pname,
                    pcategory:pcategory,
                    pprice:pprice,
                    pcompany:pcompany,
                    pdesc:pdesc,
                    pic:url
                })
            })
            .then((res)=>res.json())
            .then((data)=>{console.log(data)})
            .catch((err)=>{console.log(err)})
            navigate('/')
        }
    },[url])

    let postDetail=async()=>{
        console.log(pimage,pname)
        let data=new FormData();
        data.append("file",pimage);
        data.append("upload_preset","Samsungecommers")
        data.append("cloud_name","mrutyunjayacloud")
        fetch("https://api.cloudinary.com/v1_1/mrutyunjayacloud/image/upload",{
            method:"post",
            body:data
        })
        .then((res)=>res.json())
        .then((data)=>setUrl(data.url))
        .catch((err)=>{console.log(err)})

    }


    var loadFile =(event)=> {
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
          URL.revokeObjectURL(output.src) // free memory
        }
      };


  return (
    <div>
        <div className="container">
        <h1>Admin Page | Add Products</h1>
        <div className="formcon">
          <p>Add photo</p>  
          <img id="output" style={{height:"200px",width:"200px",margin:"10px"}}/>
        <input type="file" accept="image/*" onChange={(event)=>{loadFile(event);setPimage(event.target.files[0])}}/>

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
    <label htmlFor="exampleInputPassword1" className="form-label">Product Description</label>
    <input type="text" className="form-control" id="exampleInputPassword4" value={pdesc} onChange={(e)=>{setPdesc(e.target.value)}}/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Product Company</label>
    <input type="text" className="form-control" id="exampleInputPassword5" value={pcompany} onChange={(e)=>{setPcompany(e.target.value)}}/>
  </div>


    <button className='btn btn-primary' onClick={postDetail}>Add Product</button>
</div>
       

        </div>
        </div>
        <div className="container">
          <button className='btn btn-primary' style={{margin:"10px"}}><Link to="/adminpanel" style={{color:"white",textDecoration:"none"}}>Admin Home</Link></button>
        </div>
    </div>
  )
}

export default Adminhome
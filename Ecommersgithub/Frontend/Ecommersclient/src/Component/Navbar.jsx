import React from 'react'
import { Link,useNavigate } from 'react-router'

function Navbar() {
    let navigate=useNavigate();
    const logout=()=>{
        localStorage.removeItem("Ecommersfinal");
        navigate('/signin')
    }
  return (
    <div>
        <div className="container">
    <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
    <div style={{height:"60px",width:"100px"}}>
      <img src="https://tse3.mm.bing.net/th/id/OIP.3DbB0C3-LsGSt-xtIonLLQHaEK?rs=1&pid=ImgDetMain" style={{height:"70px",width:"100px"}} alt="" />
      </div>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <span className="fs-4" style={{fontWeight:"lighter",fontFamily:"fantasy"}}>Samsung Store</span>
      </a>

      <ul className="nav nav-pills">
        <li className="nav-item"><Link to="/" className="nav-link active" aria-current="page">Home</Link></li>
        <li className="nav-item"><Link to="/cartlist" className="nav-link">Your Cart</Link></li>
        {
            localStorage.getItem("Ecommersfinal") !== null ? <button className='btn btn-danger' style={{height:"40px"}} onClick={logout}>Logout</button>: <div style={{display:"flex"}}>
                <li className="nav-item"><Link to='/signin' className="nav-link">Signin</Link></li>
                <li className="nav-item"><Link to="/signup" className="nav-link">Register Now!</Link></li>
            </div> 
        }
      </ul>
    </header>
  </div>
    </div>
  )
}

export default Navbar
import { useState } from 'react'
import Navbar from './Component/Navbar'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router'
import Signup from './Component/Signup'
import Signin from './Component/Signin'
import Home from './Component/Home'
import Adminhome from './Component/Adminhome'
import Footer from './Component/Footer'
import Cartproducy from './Component/Cartproducy'
import Cartlist from './Component/Cartlist'
import Filtercategory from './Component/Filtercategory'
import Adminpanel from './Component/Adminpanel'
import Updateproduct from './Component/Updateproduct'
import Deleteproduct from './Component/Deleteproduct'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/' element={<Home/>}/>
    <Route path='/adminhome' element={<Adminhome/>}/>
    <Route path='/addtocart/:productId' element={<Cartproducy/>}/>
    <Route path="/cartlist" element={<Cartlist/>}/>
    <Route path="/filtercategory/:categoryname" element={<Filtercategory/>}/>
    <Route path='/adminpanel' element={<Adminpanel/>}/>
    <Route path='/updateproduct/:productId' element={<Updateproduct/>}/>
    <Route path='/deleteproduct/:productId' element={<Deleteproduct/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App

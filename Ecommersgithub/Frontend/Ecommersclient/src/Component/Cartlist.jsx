import React, { useEffect, useState } from 'react';
import DropIn from "braintree-web-drop-in-react";
import '../App.css'

function Cartlist() {
  const [data, setData] = useState([]);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);

  // Fetch cart items
  const cartlist = async () => {
    try {
      let result = await fetch("http://localhost:8080/addtocartlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("Ecommersfinal")
        }
      });
      result = await result.json();
      setData(result);
    } catch (error) {
      console.log("Error fetching cart list:", error);
    }
  };

  // Fetch Braintree client token
  const getToken = async () => {
    try {
      let result = await fetch("http://localhost:8080/braintree/token", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("Ecommersfinal")
        }
      });
      result = await result.json();
      setClientToken(result.clientToken); // Ensure the key matches the backend response
    } catch (error) {
      console.log("Error fetching client token:", error);
    }
  };

  // Call the cart and token fetch functions on component mount
  useEffect(() => {
    cartlist();
    getToken();
  }, []);

  // Handle payment submission
  const handlePayment = async () => {
    if (!instance) {
      console.log("Payment instance not available");
      return;
    }

    try {
      const { nonce } = await instance.requestPaymentMethod();
      let result = await fetch("http://localhost:8080/braintree/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer " + localStorage.getItem("Ecommersfinal")
        },
        body: JSON.stringify({
          nonce: nonce,
          cart: data
        })
      });

      result = await result.json();
      console.log("Payment successful:", result);
      alert("Payment Successful!");
    } catch (error) {
      console.log("Payment failed:", error);
      alert("Payment Failed. Please try again.");
    }
  };

  // Calculate total cart price
  const sumOfPrice = data.reduce((sum, item) => sum + Number(item.pprice || 0), 0);

  return (
    <div>
      <div className="container">
        <h1>Cart list of your profile</h1>
      </div>

      <div className="container mt-4">
        <div className="row">
          {data.length > 0 ? data.map((item, index) => (
            <div className="col-md-4 d-flex justify-content-center" key={index}>
              <div className="card" style={{ width: "18rem", margin: "1rem" }}>
                <img
                  src={item.pimage}
                  style={{ height: "200px", backgroundPosition: "center" }}
                  className="card-img-top"
                  alt={item.pname}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.pname}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Price: ₹{item.pprice}</h6>
                  <span className="badge text-bg-danger">{item.pcategory}</span>
                  <span className="badge text-bg-warning" style={{ marginLeft: "5px" }}>{item.pcompany}</span>
                  <p className="card-text">{item.pdesc}</p>
                </div>
              </div>
            </div>
          )) : <h3>No item in cart</h3>}
        </div>
      </div>

      <div className='container'>
        <h1 style={{ fontFamily: "fantasy" }}>Total cart price: ₹{sumOfPrice}</h1>
      </div>

      <div className="container">
        {clientToken && (
          <DropIn
            options={{
              authorization: clientToken,
              paypal: {
                flow: "vault"
              }
            }}
            onInstance={(instance) => {  console.log("Instance created:", instance);setInstance(instance)}}
          />
        )}
        <button onClick={handlePayment} className='btn btn-primary'>
          Buy
        </button>
      </div>
    </div>
  );
}

export default Cartlist;

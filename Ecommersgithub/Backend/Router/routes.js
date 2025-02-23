let express=require('express');
let Router=express.Router();
let mongoose=require('mongoose');
let USER=mongoose.model("USERS");
let POST=mongoose.model("POST");
let ORDER=mongoose.model("ORDER");
let JWT=require('jsonwebtoken')
let {JWT_secret}=require('../key')
let requirelogin=require('../Middleware/requirelogin')
let braintree=require('braintree');
let dotenv=require('dotenv')

dotenv.config();


Router.get("/",(req,res)=>{
    res.send("<h1>Ecommers</h1>")
})
// Middleware to check if the user is an admin
const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // User is admin, allow access
  } else {
    return res.status(403).json({ error: "Access Denied: Admins only" });
  }
};

Router.get("/add",requirelogin,(req,res)=>{
    res.send("hello from middleware")
})
Router.post("/signup",(req,res)=>{
    let {name,email,password,username,role}=req.body;
    if(!name||!email||!password||!username||!role){
        return res.status(404).send('Please fill all the require feilds');
    }
    let user=new USER({
        name,
        email,
        password,
        username,
        role
    })
    let result=user.save();
    console.log(result);
    res.send(result)
})
Router.post("/signin",(req,res)=>{
    let {email,password}=req.body;
    if(!email||!password){
        return res.status(404).send("Fill all the feilds");
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send("User not found");
        }
        console.log(savedUser);
    })
    USER.findOne({password:password}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send("User not found");
        }
        console.log(savedUser);
        let token=JWT.sign({_id:savedUser.id},JWT_secret)
        console.log(token);
        console.log(savedUser.role);
        let role=savedUser.role;
        res.json({token,role})
    })
})
Router.post('/addpost',requirelogin,requireAdmin,(req,res)=>{
    let {pname,pcategory,pcompany,pic,pprice,pdesc}=req.body;
    if(!pname||!pcompany||!pcategory||!pic||!pprice||!pdesc){
        return res.status(404).send("Fill all the feilds")
    }
    req.user
    let post=new POST({
        pname,
        pcategory,
        pcompany,
        pimage:pic,
        pprice,
        pdesc,
        postedBy:req.user
    })
    let result=post.save();
    console.log(result);
    res.send(result);
})

Router.get("/showpost",async(req,res)=>{
    let result=await POST.find();
    if(!result){
        return res.status(404).send("Post not found")
    }
    console.log(result);
    res.send(result);
})
Router.put("/addtocart/:productId",requirelogin,async(req,res)=>{
    try {
        let addtocart=await POST.findByIdAndUpdate(req.params.productId,{
            $push:{addtocart:req.user._id}
        },{
            new:true
        }).populate("addtocart")
        res.send(addtocart);
        console.log(addtocart)
    } catch (error) {
        console.log(error)    
    }
})
Router.get("/addtocartlist",requirelogin,async(req,res)=>{
    let result=await POST.find({"addtocart":req.user._id}).populate("addtocart",{name:req.user.name},{_id:req.user._id})
    res.send(result);
    console.log(result)
})
Router.get("/showproduct/:productId",async(req,res)=>{
    let result = await POST.findById(req.params.productId)
    if(!result){
        res.status(404).send('No such product')
    }
    res.send(result);
    console.log(result)
})
Router.get("/filtercategories/:category",async(req,res)=>{
    let result=await POST.find({pcategory:req.params.category})
    if(!result){
        return res.status(404).send("No category like that")
    }
    res.send(result)
    console.log(result)
})
Router.put("/adminupdate/:postId",requirelogin,requireAdmin,async(req,res)=>{
    let result=await POST.findByIdAndUpdate({_id:req.params.postId},{
        pname:req.body.pname,
        pcategory:req.body.pcategory,
        pprice:req.body.pprice,
        pcompany:req.body.pcompany
    })
    res.send(result);
})
Router.delete("/admindelete/:postId",requirelogin,requireAdmin,async(req,res)=>{
    let result=await POST.findByIdAndDelete({_id:req.params.postId});
    res.send(result);
    console.log(result)
})
Router.get("/search/:key",async(req,res)=>{
  let result=await POST.find({
      $or:[
          {"pname":{$regex:req.params.key}},
          {"pcategory":{$regex:req.params.key}},
      ]
  })
  if(!result){
      return res.send("Movie not found");
  }
  res.send(result);
  console.log(result);
})


//payment gateway
var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  });

  //payment route
  //token
  Router.get("/braintree/token", requirelogin, async (req, res) => {
    try {
      gateway.clientToken.generate({}, (err, response) => {
        if (err) {
          res.status(500).json({ error: "Failed to generate token", details: err });
        } else {
          res.send({ clientToken: response.clientToken }); // Sending the correct response format
        }
      });
    } catch (error) {
      console.log("Error generating token:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  // Route to handle Braintree payment
  Router.post("/braintree/payment", requirelogin, async (req, res) => {
    try {
      const { cart, nonce } = req.body;
      let total = 0;
  
      // Correct the price field as used in your frontend (pprice instead of price)
      cart.forEach((item) => {
        total += item.pprice;
      });
  
      // Braintree transaction
      gateway.transaction.sale(
        {
          amount: total.toFixed(2), // Ensuring the amount has two decimal places
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true
          }
        },
        async (error, result) => {
          if (result && result.success) {
            // Save order to database
            const order = new ORDER({
              products: cart,
              payment: result,
              buyer: req.user._id
            });
  
            await order.save();
            res.json({ success: true, message: "Transaction Successful", transaction: result });
          } else {
            console.error("Transaction Failed:", error || result.message);
            res.status(500).json({ success: false, message: "Transaction Failed", details: error || result.message });
          }
        }
      );
    } catch (error) {
      console.log("Payment Processing Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });


module.exports=Router
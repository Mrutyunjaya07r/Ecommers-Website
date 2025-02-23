let mongoose=require('mongoose');
let {ObjectId}=mongoose.Schema.Types

let orderModel=new mongoose.Schema({
    products:[{ type:ObjectId,ref:"POST"}],
    payment:{},
    buyer:[{type:ObjectId,ref:"USERS"}],
    statusoforder:{type:String,default:"Not process",enum:["Not process","Processing","Shipped","delivered","cancel"]}
},{
    timestamps:true
});

mongoose.model("ORDER",orderModel)
let mongoose=require('mongoose');
let {ObjectId}=mongoose.Schema.Types

let post=mongoose.Schema({
    pname:{type:String,required:true},
    pcompany:{type:String,required:true},
    pcategory:{type:String,required:true},
    pimage:{type:String,required:true},
    pprice:{type:String,required:true},
    pdesc:{type:String,required:true},
    addtocart:[{type:ObjectId,ref:"USERS"}],
    postedBy:{type:ObjectId,ref:"USERS"}
})

mongoose.model("POST",post)
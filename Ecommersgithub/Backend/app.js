let express=require('express');
let cors=require('cors');

let app=express();
app.use(express.json());
app.use(cors());
let mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1/Ecommersprojectfinal")
.then(()=>{console.log(`Database is connected successfully`)})
.catch((err)=>{console.log(err)})

require('./Models/users')
require('./Models/post')
require('./Models/order')
app.use(require('./Router/routes'))

app.get("/",(req,res)=>{
    res.send("<h1>hello</h1>");
})

let port=process.env.PORT||8080;
app.listen(port,()=>{console.log(`App is running at ${port}`)});
const express=require('express')
const bodyParser=require('body-parser')
const db=require('./dbConnection')
const app=express()
const cors=require('cors')
console.log("backend called");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/upload`));

app.use(cors())
const route=require('./routes')
app.use('/vehicle_parking_locator_api',route)

app.listen(4031,()=>{
    console.log("Server created successfully at 4010");
})
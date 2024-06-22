
const serviceBooking = require('../serviceBooking');
const ServiceUpdate = require('./modificationSchema'); // Assuming your schema model is defined in a file named ServiceUpdate.js
const multer=require('multer')


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
// Route to create a new service update
const addServiceUpdate=async (req, res) => {
    let shopid=null,serviceid=null,mechid=null,flag=0,custid=null,servicedate=null;

    const { finaldate, comments } = req.body;

await serviceBooking.findById({_id:req.params.id}).exec().then(data=>{
shopid=data.shopid
serviceid=data.serviceid
mechid=data.mechid
custid=data.custid
servicedate=data.servicedate
}).catch(err=>{
    console.log(err);
})
await ServiceUpdate.find({
    bookingid:req.params.id
}).then(datas=>{
if(datas.length>0)
 flag=1
}).catch(err=>{
console.log(err);
})
    const newServiceUpdate = new ServiceUpdate({
        custid:custid,
        shopid:shopid,
        serviceid:serviceid,
        servicedate:servicedate,
        currentdate:new Date(),
        finaldate,
        mechid:mechid,
        image:req.file,
        comments,
        bookingid:req.params.id
    });

    if(flag==0){
   await newServiceUpdate.save()
        .then(serviceUpdate => {
            res.json({
                status:200,
                 message: 'Service update created successfully', 
                 data:serviceUpdate });
        })
        .catch(error => {
            console.error('Error:', error);
            res.json({ ststus:500,
                error: 'Failed to create service update' });
        });
    }
    else{
        ServiceUpdate.findOneAndUpdate({
            bookingid:req.params.id
        },{
            custid:custid,
            shopid:shopid,
            serviceid:serviceid,
            servicedate:servicedate,
            currentdate:new Date(),
            finaldate:req.body.finaldate,
            mechid:mechid,
            image:req.file,
            comments:req.body.comments

        }).exec()
        .then(serviceUpdate => {
            res.json({
                status:200,
                 message: 'Service update created successfully', 
                 data:serviceUpdate });
        })
        .catch(error => {
            console.error('Error:', error);
            res.json({ ststus:500,
                error: 'Failed to create service update' });
        });
    }
}
const viewServiceUpdateByCustId = (req, res) => {
ServiceUpdate.find({custid:req.params.id})
    .populate('shopid')
    .populate('serviceid')
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }
  const viewServiceUpdateByserviceid = (req, res) => {
    ServiceUpdate.find({bookingid:req.params.id})
        .populate('shopid')
        .exec()
          .then(data => {
            console.log(data);
            res.json({
              status: 200,
              msg: "Data obtained successfully",
              data: data
            })
      
          }).catch(err => {
            console.log(err);
            res.json({
              status: 500,
              msg: "No Data obtained",
              Error: err
            })
          })
      
      }
    
  const viewServiceUpdateByMechid = (req, res) => {
    ServiceUpdate.find({mechid:req.params.id})
    .populate('custid')
    .populate('serviceid')
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }

module.exports = {
    addServiceUpdate,
    upload,
    viewServiceUpdateByMechid,
    viewServiceUpdateByCustId,
    viewServiceUpdateByserviceid
};

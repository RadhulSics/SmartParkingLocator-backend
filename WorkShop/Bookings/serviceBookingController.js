const serviceSchema = require("../Services/serviceSchema");
const serviceBookings = require("./serviceBooking");

const bookaService =async (req, res) => {
  console.log('req',req);
    let shopid=null,date=new Date()
await serviceSchema.findById({_id: req.params.serviceid}).exec().then(datas=>{
    shopid=datas.shopid
})
.catch((err) => {
        
    console.log(err);
  });

    const newBooking = new serviceBookings({
        custid:req.body.custid,
        serviceid: req.params.serviceid,
        servicedate: req.body.servicedate,
        shopid:shopid,
        bookingdate:date,
        paymentstatus:true
    });
    await newBooking
      .save()
      .then((data) => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Booked successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 500,
          msg: "Data not Inserted",
          Error: err,
        });
      });
  };


  const viewBookingByWid = (req, res) => {
    serviceBookings.find({shopid:req.params.id,approvalstatus:false})
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

  const viewbookigbyid = (req, res) => {
    serviceBookings.findById({_id:req.params.id})
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


  const viewBookingByCustid = (req, res) => {
    serviceBookings.find({custid:req.params.id})
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

  const updatePaymentbyBookingId = (req, res) => {
    serviceBookings.findByIdAndUpdate({_id:req.params.id},{paymentstatus:true})
    
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data Updated  successfully",
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
  const approveBookingByWid = (req, res) => {
    serviceBookings.findByIdAndUpdate({_id:req.params.id},{
      approvalstatus:true
    }).exec()
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
  const assignMechForService=(req,res)=>{
    serviceBookings.findByIdAndUpdate({_id:req.params.id},{
      mechAssigned:true,
      mechid:req.body.mechid
    }).exec()
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
  const viewBookingByMechid = (req, res) => {
    serviceBookings.find({mechid:req.params.id})
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
  const deleteservicebookingById = (req, res) => {
  
    serviceBookings.findByIdAndDelete({ _id: req.params.id }).exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data removed successfully",
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

  module.exports={
    bookaService,
    viewBookingByWid,
    viewBookingByCustid,
    approveBookingByWid,
    assignMechForService,
    viewBookingByMechid,
    updatePaymentbyBookingId,
    viewbookigbyid,
    deleteservicebookingById
  }
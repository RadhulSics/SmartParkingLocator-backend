const serviceSchema = require("../Services/serviceSchema");
const workshopSchema = require("../workshopSchema");
const emergencySchema = require("./emergencySchema");

const addEmergency =async (req, res) => {


    const newBooking = new emergencySchema({
        custid:req.body.custid,
        date:new Date(),
        district:req.body.district,
      
        issues:req.body.issues
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


  const adminViewEmergencyReqs = (req, res) => {
    emergencySchema.find({adminapproved:"Pending"})
    .populate('custid')
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

  const adminApproveEmergencyReqs = (req, res) => {
    emergencySchema.findByIdAndUpdate({_id:req.params.id},
        {adminapproved:"Approved"})
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data Updated successfully",
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
  const adminRejectEmergencyReqs = (req, res) => {
    emergencySchema.findByIdAndUpdate({_id:req.params.id},
        {adminapproved:"Rejected"})
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data Updated successfully",
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
//   const viewEmergencyByWid =async (req, res) => {
//     let district=[]


//     await workshopSchema.find({isactive:true}).exec()
//     .then(data=>{
//      data.map(x=>{
//  district.push(x.district)
//      })
//     }).catch(err=>{
//      console.log(err);
//     })

//    await emergencySchema.find({adminapproved:"Approved",shopid:null,district:{$in:district}}).exec()
//    .then(datas=>{
//     console.log(datas);
// res.send(datas)
//    }).catch(err=>{
//     console.log(err);
//    })
    // await workshopSchema.find()
    // .exec()
    //   .then(data => {
    //     console.log(data);
    //     res.json({
    //       status: 200,
    //       msg: "Data obtained successfully",
    //       data: data
    //     })
  
    //   }).catch(err => {
    //     console.log(err);
    //     res.json({
    //       status: 500,
    //       msg: "No Data obtained",
    //       Error: err
    //     })
    //   })
  
//   }


  const viewEmergencyForShops = async (req, res) => {
    try {
        // Fetch active workshops' districts
        const activeWorkshops = await workshopSchema.find({ isactive: true });
        const districts = activeWorkshops.map(workshop => workshop.district);

        // Find admin-approved emergency requests with matching districts and no assigned shop
        const emergencyRequests = await emergencySchema.find({
            adminapproved: "Approved",
            shopid: null,
            district: { $in: districts }
        });
        
        // Send the emergency requests to the client
        if(emergencyRequests.length>0)
        res.json({
            status:200,
            data:emergencyRequests,
            msg:"data obtained"
        });
        else
        res.json({
            status:200,
            data:null,
            msg:"No data obtained"
        });
    } catch (error) {
        console.error("Error viewing emergency requests by workshop ID:", error);
        res.json({
            status:500,msg:"Internal Server Error"});
    }
};

const shopAcceptEmergencyReq = (req, res) => {
  emergencySchema.findByIdAndUpdate({_id:req.params.id},
      {shopid:req.body.shopid})
  .exec()
    .then(data => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data Updated successfully",
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
  
const assignMechForEmergencyService=(req,res)=>{
  emergencySchema.findByIdAndUpdate({_id:req.params.id},{
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


const viewEmergencyByMechid = (req, res) => {
  emergencySchema.find({mechid:req.params.id})
  .populate('custid')
  .exec()
    .then(data => {
      // console.log(data);
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
const addServiceandPaymentByMech=(req,res)=>{
  console.log(req.body.payment,req.body.service,req.params.id);
  emergencySchema.findByIdAndUpdate({_id:req.params.id},{
    payment:req.body.payment,
    service:req.body.service,
    completedStatus:true
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
const viewEmergencyById = (req, res) => {
  emergencySchema.findById({_id:req.params.id})
  .populate('custid')
  .populate('shopid')
  .populate('mechid')
  .exec()
    .then(data => {
      // console.log(data);
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
  serviceBookings.findByIdAndUpdate({_id:req.params.id},
    {paymentstatus:true,
      payment:req.body.payment
  })
  
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
const viewEmergenciesByCustId = (req, res) => {
  emergencySchema.find({custid:req.params.id})
  .populate('shopid')
  .populate('mechid')

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
  module.exports={
    addEmergency,
    adminApproveEmergencyReqs,
    shopAcceptEmergencyReq,
    adminViewEmergencyReqs,
    adminRejectEmergencyReqs,
    viewEmergencyForShops,
    assignMechForEmergencyService,
viewEmergencyByMechid,
addServiceandPaymentByMech,
viewEmergencyById,
updatePaymentbyBookingId,
viewEmergenciesByCustId
    
  }
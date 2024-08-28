const SlotBooking = require("./bookingSchema"); 
const paSchema=require('../ParkingAreas/paSchema')
// Create Slot Booking
const createSlotBooking = (req, res) => {
  const newSlotBooking = new SlotBooking({
    paId: req.body.paId,
    custId: req.body.custId,
    date: new Date(),
    agentId: req.body.agentId,
    vehicleNumber:req.body.vehicleNumber
  });

  newSlotBooking
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Slot booking created successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error creating slot booking",
        Error: err,
      });
    });
};

// View all Slot Bookings
const viewSlotBookings = (req, res) => {
  SlotBooking.find()
    .populate('paId')
    .populate('custId')
    .populate('agentId')
    .then((data) => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: "No data obtained",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error obtaining data",
        Error: err,
      });
    });
};

//check if slots are fre
const checkSlotAvailability = (req, res) => {
    paSchema.findById(req.params.id)
    
     
      .then((data) => {
        if (data.slots > req.body.carCount) {
          res.json({
            status: 200,
            msg: "you can approve parking",
            data: true,
          });
        } else {
          res.json({
            status: 405,
            msg: "no slots available",
            data:false
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error obtaining data",
          Error: err,
        });
      });
  };
// View Slot Booking by ID
const viewSlotBookingById = (req, res) => {
  SlotBooking.findById(req.params.id)
    .populate('paId')
    .populate('custId')
    .populate('agentId')
    .then((data) => {
      if (data) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.json({
          status: 404,
          msg: "Slot booking not found",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error obtaining data",
        Error: err,
      });
    });
};


// View Slot Booking by ID
const viewSlotBookingByCustId = (req, res) => {
    SlotBooking.find({custId:req.params.id})
      .populate('paId')
      .populate('custId')
      .populate('agentId')
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.json({
            status: 404,
            msg: "Slot booking not found",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error obtaining data",
          Error: err,
        });
      });
  };

  
// View Slot Booking by ID
const viewPendingBookingReqsByAgentId = (req, res) => {
    SlotBooking.find({agentId:req.params.id,status:'pending'})
      .populate('paId')
      .populate('custId')
      .populate('agentId')
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.json({
            status: 404,
            msg: "Slot booking not found",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error obtaining data",
          Error: err,
        });
      });
  };


// View Slot Booking by ID
const viewTodysApprovedBookingByAgentId = (req, res) => {
    SlotBooking.find({agentId:req.params.id,status:'approved',date:new Date()})
      .populate('paId')
      .populate('custId')
      .populate('agentId')
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.json({
            status: 404,
            msg: "Slot booking not found",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error obtaining data",
          Error: err,
        });
      });
  };
  

// View Slot Booking by ID
const viewTodysPendingBookingByAgentId = (req, res) => {
    SlotBooking.find({agentId:req.params.id,status:'pending',date:new Date()})
      .populate('paId')
      .populate('custId')
      .populate('agentId')
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.json({
            status: 404,
            msg: "Slot booking not found",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error obtaining data",
          Error: err,
        });
      });
  };
// Delete Slot Booking by ID
const deleteSlotBookingById = (req, res) => {
  SlotBooking.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json({
        status: 200,
        msg: "Slot booking deleted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error deleting slot booking",
        Error: err,
      });
    });
};
// Approve Slot Booking by ID
const approveSlotBookingById = (req, res) => {
    const { id } = req.params;
  
    SlotBooking.findByIdAndUpdate(id, { status: 'approved' }, { new: true })
      .populate('paId')
      .populate('custId')
      .populate('agentId')
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            msg: "Slot booking approved successfully",
            data: data,
          });
        } else {
          res.json({
            status: 404,
            msg: "Slot booking not found",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error approving slot booking",
          Error: err,
        });
      });
  };
  
  // Reject Slot Booking by ID
  const rejectSlotBookingById = (req, res) => {
    const { id } = req.params;
  
    SlotBooking.findByIdAndUpdate(id, { status: 'rejected' }, { new: true })
      .populate('paId')
      .populate('custId')
      .populate('agentId')
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            msg: "Slot booking rejected successfully",
            data: data,
          });
        } else {
          res.json({
            status: 404,
            msg: "Slot booking not found",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error rejecting slot booking",
          Error: err,
        });
      });
  };


  const viewApprovedBookingByAgentId = (req, res) => {
    SlotBooking.find({agentId:req.params.id,status:'approved'})
      .populate('paId')
      .populate('custId')
      .populate('agentId')
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.json({
            status: 404,
            msg: "Slot booking not found",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Error obtaining data",
          Error: err,
        });
      });
  };
  

  
module.exports = {
  createSlotBooking,
  viewSlotBookings,
  viewSlotBookingById,
  deleteSlotBookingById,
  viewPendingBookingReqsByAgentId,
  viewSlotBookingByCustId,
  viewTodysApprovedBookingByAgentId,
  viewTodysPendingBookingByAgentId,
  approveSlotBookingById,
  rejectSlotBookingById,
  checkSlotAvailability,
  viewApprovedBookingByAgentId
};

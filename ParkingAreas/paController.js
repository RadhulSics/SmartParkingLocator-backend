const ParkingArea = require("./paSchema");

// Create Parking Area
const createParkingArea = (req, res) => {
  const newParkingArea = new ParkingArea({
    location: req.body.location,
    lat: req.body.lat,
    lon: req.body.lon,
    slots: req.body.slots,
    price: req.body.price,
    agentId: req.params.id,
    freeSlots: req.body.slots
  });

  newParkingArea
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Parking area created successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error creating parking area",
        Error: err,
      });
    });
};

// View all Parking Areas
const viewParkingAreas = (req, res) => {
  ParkingArea.find().populate('agentId').exec()
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

// View Parking Area by ID
const viewParkingAreaById = (req, res) => {
  ParkingArea.findById(req.params.id).populate('agentId')
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
          msg: "Parking area not found",
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

// View Parking Area by ID
const viewParkingAreaByAgentId = (req, res) => {
    ParkingArea.find({agentId:req.params.id}).populate('agentId')
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
            msg: "Parking area not found",
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
// Update Parking Area by ID
const updateParkingAreaById = (req, res) => {
  const updateData = {
    location: req.body.location,
    lat: req.body.lat,
    lon: req.body.lon,
    slots: req.body.slots,
    price: req.body.price,
  };

  ParkingArea.findByIdAndUpdate(req.params.id, updateData)
    .then(() => {
      res.json({
        status: 200,
        msg: "Parking area updated successfully",
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error updating parking area",
        Error: err,
      });
    });
};

// Delete Parking Area by ID
const deleteParkingAreaById = (req, res) => {
  ParkingArea.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json({
        status: 200,
        msg: "Parking area deleted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error deleting parking area",
        Error: err,
      });
    });
};

module.exports = {
  createParkingArea,
  viewParkingAreas,
  viewParkingAreaById,
  updateParkingAreaById,
  deleteParkingAreaById,
  viewParkingAreaByAgentId
};

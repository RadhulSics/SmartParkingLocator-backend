const ParkingAgent = require("./agentSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

// Parking Agent Registration
const registerParkingAgent = (req, res) => {
  console.log("api worked 2");
  const newAgent = new ParkingAgent({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address,
    image: req.file ? req.file : null,
 
  });

  newAgent
    .save()
    .then((data) => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      if (err.code == 11000) {
        return res.json({
          status: 409,
          msg: "Email already in use",
          Error: err
        });
      }
      res.json({
        status: 500,
        msg: "Data not inserted",
        Error: err,
      });
    });
};

// Parking Agent Login
const loginParkingAgent = (req, res) => {
  const { email, password } = req.body;

  ParkingAgent.findOne({ email })
    .then((data) => {
      if (!data) {
        return res.json({
          status: 405,
          msg: "No user found",
        });
      } else if (password == data.password) {
        if (!data.adminApproved) {
          return res.json({ status:405,msg: 'Waiting for Admin Approval !!' });
        } if (!data.isActive) {
          return res.json({ status:405,msg: 'You Are Currently Deactivated By Admin !!' });
        }else{
        return res.json({
          status: 200,
          msg: "Login successful",
          data: data,
        });
      }
      } else {
        return res.json({
          status: 401,
          msg: "Password mismatch",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Internal server error",
        Error: err,
      });
    });
};

// View all Parking Agents
const viewParkingAgents = (req, res) => {
  ParkingAgent.find({adminApproved:true})
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

// View all Parking Agents
const viewPendingParkingAgents = (req, res) => {
  ParkingAgent.find({adminApproved:false})
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
// Update Parking Agent by ID
const editParkingAgentById = (req, res) => {
  const updateData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    gender: req.body.gender,
    dob: req.body.dob,
    address: req.body.address,
    image: req.file ? req.file : null,
  };

  ParkingAgent.findByIdAndUpdate(req.params.id, updateData)
    .then(() => {
      res.json({
        status: 200,
        msg: "Updated successfully"
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not updated",
        Error: err,
      });
    });
};

// View Parking Agent by ID
const viewParkingAgentById = (req, res) => {
  ParkingAgent.findById(req.params.id)
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
          msg: "User not found",
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

// Delete Parking Agent by ID
const deleteParkingAgentById = (req, res) => {
  ParkingAgent.findByIdAndDelete(req.params.id)
    .then((data) => {
      res.json({
        status: 200,
        msg: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error deleting data",
        Error: err,
      });
    });
};

// Forgot Password
const forgotPwd = (req, res) => {
  const { email, newPassword } = req.body;

  ParkingAgent.findOneAndUpdate({ email }, { password: newPassword })
    .then((data) => {
      if (data) {
        res.json({
          status: 200,
          msg: "Password updated successfully",
          data: data,
        });
      } else {
        res.json({
          status: 404,
          msg: "User not found",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error updating password",
        Error: err,
      });
    });
};

// Approve Parking Agent
const approveParkingAgent = (req, res) => {
  ParkingAgent.findByIdAndUpdate(req.params.id, { adminApproved: true,isActive:true })
    .then((data) => {
      res.json({
        status: 200,
        msg: "Agent approved successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error approving agent",
        Error: err,
      });
    });
};

// Reject Parking Agent
const rejectParkingAgent = (req, res) => {
  ParkingAgent.findByIdAndUpdate(req.params.id, { adminApproved: false })
    .then((data) => {
      res.json({
        status: 200,
        msg: "Agent rejected successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Error rejecting agent",
        Error: err,
      });
    });
};

module.exports = {
  registerParkingAgent,
  loginParkingAgent,
  viewParkingAgents,
  editParkingAgentById,
  viewParkingAgentById,
  deleteParkingAgentById,
  forgotPwd,
  approveParkingAgent,
  rejectParkingAgent,
  upload,
  viewPendingParkingAgents
};

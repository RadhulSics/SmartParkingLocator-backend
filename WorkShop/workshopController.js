
const workshops = require("./workshopSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
//User Registration

const registerWorkshop = (req, res) => {
  const newworkshops = new workshops({
    name: req.body.name,

    email: req.body.email,

    contact: req.body.contact,
    password: req.body.password,
    regno: req.body.regno,
    city: req.body.city,

    district: req.body.district,

    image: req.file,
    aadhar:req.body.aadhar
  });
  newworkshops
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      if (err.code == 1100) {
        return res.json({
          status: 409,
          msg: "Mail Id already in Use",
          Error: err
        })
      }
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};
//Workshop Registration -- finished

//Login Workshop
const loginworkshops = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  workshops
    .findOne({ email: email })
    .exec()
    .then((data) => {
      if (!data) {
          return res.json({
              status: 400,
              msg: "User not found"
          });
      }
      if (data.isactive === false) {
          return res.json({
              status: 403,
              msg: "User is not active. Please contact administrator."
          });
      }
      if (password === data.password) {
          return res.status(200).json({
              status: 200,
              msg: "Login successfully",
              data: data
          });
      } else {
          return res.json({
              status: 401,
              msg: "Password mismatch"
          });
      }
  })
  .catch((err) => {
      res.status(500).json({
          status: 500,
          msg: "Internal Server Error"
      });
  });
 };
//Login Workshops --finished

//View all Workshops

const viewApprovedWorkshops = (req, res) => {
  workshops
    .find({isactive:true})
    .exec()
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
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view Workshops finished

//View all Workshops reqs

const viewWorkshopReqs = (req, res) => {
  workshops
    .find({isactive:false})
    .exec()
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
          data:data,
          msg: "No Data obtained ",
        });
      }
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// view Workshops finished

//Approve Workshops

const approveWorkshopById = (req, res) => {
  workshops
    .findByIdAndUpdate({_id:req.params.id},{isactive:true})
    .exec()
    .then((result) => {
      res.json({
          status: 200,
          data: result,
          msg: 'data obtained'
      })
  })
  .catch(err => {
      res.json({
          status: 500,
          msg: 'Error in API',
          err: err
      })
  })
};

// approve Workshops finished

//update  by id
const editWorkshopById = (req, res) => {
  workshops.findByIdAndUpdate({ _id: req.params.id }, {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    password: req.body.password,
    regno: req.body.regno,
    city: req.body.city,
    district: req.body.district,
    image: req.file,
    aadhar:req.body.aadhar

  })
    .exec().then(data => {
      res.json({
        status: 200,
        msg: "Updated successfully"
      })
    }).catch(err => {
console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      })
    })
}
// view  by id
const viewWorkshopById = (req, res) => {
  console.log(req.params.id);

  workshops.findById({ _id: req.params.id }).exec()
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

const deleteWorkshopById = (req, res) => {

  workshops.findByIdAndDelete({ _id: req.params.id }).exec()
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


//forgotvPawd
const forgotPwd = (req, res) => {



  workshops.findOneAndUpdate({ email: req.body.email }, {

    password: req.body.password
  })
    .exec().then(data => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully"
        })
      else
        res.json({
          status: 500,
          msg: "Workshop Not Found"

        })
    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      })
    })
}


module.exports = {
  registerWorkshop,
  viewWorkshopReqs,
  upload,
  loginworkshops,
  approveWorkshopById,
  viewWorkshopById,
  viewApprovedWorkshops,
  editWorkshopById,
  upload,
  forgotPwd,
  deleteWorkshopById
}
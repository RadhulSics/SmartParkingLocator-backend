
const mechSchema = require("./mechanicSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("files");
const upload2 = multer({ storage: storage }).single("image");

//User Registration

const addMechanic = (req, res) => {
  const newMech = new mechSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,

    email: req.body.email,
    shopid: req.params.id,
    contact: req.body.contact,
    password: req.body.password,
    gender: req.body.gender,
    image: req.files[0],
    certificate: req.files[1],
    aadhar: req.body.aadhar
  });
  newMech
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
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
//Mechanic Registration -- finished

//Login Mechanic
const loginMech = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  mechSchema
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


//Login Mechanics --finished

//View all Mechanics

const viewMechanics = (req, res) => {
  mechSchema
    .find().populate('shopid')
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

// view Mechanics finished




//update  by id
const editMechanicById = (req, res) => {



  mechSchema.findByIdAndUpdate({ _id: req.params.id }, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    contact: req.body.contact,
    gender: req.body.gender,
    image: req.file,
    aadhar: req.body.aadhar
  })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: "Updated successfully"
      })
    }).catch(err => {

      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      })
    })
}
// view  by id
const viewMechById = (req, res) => {
  mechSchema.findById({ _id: req.params.id }).populate('shopid').exec()
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

const deleteMechanicById = (req, res) => {

  mechSchema.findByIdAndDelete({ _id: req.params.id }).exec()
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



  mechSchema.findOneAndUpdate({ email: req.body.email }, {

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
          msg: "Mechanic Not Found"

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

//View all mech by shopid

const viewMechanicsByShopid = (req, res) => {
  mechSchema
    .find({shopid:req.params.id})
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
          data: data,
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

module.exports = {
  addMechanic,
  viewMechanics,
  upload,
  upload2,
  loginMech,
  viewMechById,
  editMechanicById,
  forgotPwd,
  deleteMechanicById,
  viewMechanicsByShopid
}
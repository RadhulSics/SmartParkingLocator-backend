
const customers = require("./customerSchema");
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

const registerCustomer = (req, res) => {
  const newCust = new customers({
    firstname: req.body.firstname,
    lastname: req.body.lastname,

    email: req.body.email,

    contact: req.body.contact,
    password: req.body.password,
    gender: req.body.gender,
    image: req.file
  });
  newCust
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
//Customer Registration -- finished

//Login Customer
const loginCust = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  customers
    .findOne({ email: email })
    .exec()
    .then((data) => {
      console.log(data);
      if(!data){
      return  res.json({
          status:405,
          msg:"No User Found",
          
      })
      }
       else if(password==data.password){
         return res.json({
            status:200,
            msg:"Login successfully",
            data:data
        })
      }else{
        res.json({
          status:401,
          msg:"password Mismatch",
          
      })
      }
    
    }).catch(err=>{
      console.log(err);
    res.json({
        status:500,
        msg:"Internal server error",
        Error:err
    })
    })
      };
    
    
//Login customers --finished

//View all customers

const viewCustomers = (req, res) => {
  customers
    .find()
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

// view customers finished




//update  by id
const editCustomerById = (req, res) => {



  customers.findByIdAndUpdate({ _id: req.params.id }, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,

    email: req.body.email,

    contact: req.body.contact,
    password: req.body.password,
    gender: req.body.gender,
    image: req.file
  })
    .exec().then(data => {
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
const viewCustById = (req, res) => {
  customers.findById({ _id: req.params.id }).exec()
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

const deleteCustomerById = (req, res) => {

  customers.findByIdAndDelete({ _id: req.params.id }).exec()
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



  customers.findOneAndUpdate({ email: req.body.email }, {

    password: req.body.password
  })
    .exec().then(data => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
          data:data
        })
      else
        res.json({
          status: 500,
          msg: "customer Not Found"

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
  registerCustomer,
  viewCustomers,
  upload,
  loginCust,
  viewCustById,
  viewCustomers,
  editCustomerById,
  forgotPwd,
  deleteCustomerById
}
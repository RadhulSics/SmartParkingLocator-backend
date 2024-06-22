const serviceSchema = require('./serviceSchema')


const registerService = (req, res) => {
    const newService = new serviceSchema({
        serviceName: req.body.serviceName,

        description: req.body.description,

        price: req.body.price,
        shopid: req.body.shopid
    });
    newService
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
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err,
            });
        });
};
//service  Registration -- finished


//View all services by workshop id

const viewServicesByWid = (req, res) => {
    serviceSchema
        .find({ shopid: req.params.id })
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
                    data:data
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

// view services finished

const searchServicesByName = (req, res) => {
    serviceSchema.find({ serviceName: { $regex: req.params.serviceName, $options: 'i' } }).populate('shopid')
        .then(services => {
            if (services.length === 0) {
                return res.status(404).json({ message: 'No services found with the serviceName.' });
            }
            res.status(200).json(services);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        });
}


const editServiceById = (req, res) => {



    serviceSchema.findByIdAndUpdate({ _id: req.params.id }, {

        serviceName: req.body.serviceName,

        description: req.body.description,

        price: req.body.price

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
const viewServiceById = (req, res) => {
    serviceSchema.findById({ _id: req.params.id }).populate('shopid').exec()
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
  
  const viewallservices = (req, res) => {
    serviceSchema.find({}).populate('shopid').exec()
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
  

  const deleteServiceById = (req, res) => {
  
    serviceSchema.findByIdAndDelete({ _id: req.params.id }).exec()
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
module.exports = {
    registerService,
    viewServicesByWid,
    searchServicesByName,
    editServiceById,
    deleteServiceById,
    viewServiceById,
    viewallservices
}
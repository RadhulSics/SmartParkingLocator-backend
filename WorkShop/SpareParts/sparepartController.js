const spareparts = require('./sparepartsSchema')

const multer=require('multer')


const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("img");

const addSpareParts = (req, res) => {
    const newSparePart = new spareparts({
        partName: req.body.partName,
        description: req.body.description,
        price: req.body.price,
        shopid: req.body.shopid,
        manufacturer:req.body.manufacturer,
        count:req.body.count,
        img:req.file
    });
    newSparePart
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
//SparePart  Registration -- finished


//View all SparePart by workshop id

const viewSparePartByWid = (req, res) => {
    spareparts
        .find({ shopid: req.params.id, count: {$gt : 0} })
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

// view SparePart finished

const searchSparePartByName = (req, res) => {
    Service.find({ partName: { $regex: req.params.partName, $options: 'i' } }).populate('shopid')
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


const editSparePartById = (req, res) => {

    spareparts.findByIdAndUpdate({ _id: req.params.id }, {

        partName: req.body.partName,
        description: req.body.description,
        price: req.body.price,
        shopid: req.body.shopid,
        manufacturer:req.body.manufacturer,
        count:req.body.count,
        img:req.file
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
const viewSparePartById = (req, res) => {
    spareparts.findById({ _id: req.params.id }).populate('shopid').exec()
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
  
  const viewallSpareParts = (req, res) => {
    spareparts.find({ "count": {$gt : 0}}).populate('shopid').exec()
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
  

  const deleteSparePartById = (req, res) => {
  
    spareparts.findByIdAndDelete({ _id: req.params.id }).exec()
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
    addSpareParts,
    viewSparePartById,
    searchSparePartByName,
    editSparePartById,
    deleteSparePartById,
    viewSparePartByWid,
    viewallSpareParts,
    upload
}
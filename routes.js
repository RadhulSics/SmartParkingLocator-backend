const express = require('express')
const router = express.Router()
console.log("api worked");
const customers = require('./Customer/customerController')
const mechanic = require('./Mechanic/mechanicController')
const workshops = require('./WorkShop/workshopController')
const services = require('./WorkShop/Services/serviceController')
const booking = require('./WorkShop/Bookings/serviceBookingController')
const sparepartController = require('./WorkShop/SpareParts/sparepartController')
// const spareparts = require('./WorkShop/SpareParts/sparepartController')
const spareOrderController = require('./WorkShop/SpareParts/Orders/spareOrderController')
const emergencyController = require('./WorkShop/Emergency/emergencyController')
const Modifications=require('./WorkShop/Bookings/Modifications/modificationController')
const parkingAgents = require('./ParkingAgent/agentController');
const parkingArea = require('./ParkingAreas/paController');

// Customer routes
router.post('/registerCustomer', customers.upload, customers.registerCustomer)
router.post('/viewCustomers', customers.viewCustomers)
router.post('/viewCustById/:id', customers.viewCustById)
router.post('/editCustomerById/:id', customers.upload, customers.editCustomerById)
router.post('/loginCust', customers.loginCust)
router.post('/forgotPwdCustomer', customers.forgotPwd)
router.post('/deleteCustomerById/:id', customers.deleteCustomerById)


// Workshop routes
router.post('/registerWorkshop', workshops.upload, workshops.registerWorkshop)
router.post('/viewWorkshopReqs', workshops.viewWorkshopReqs)
router.post('/viewWorkshopById/:id', workshops.viewWorkshopById)
router.post('/editWorkshopById/:id', workshops.upload,workshops.editWorkshopById)
router.post('/approveWorkshopById/:id', workshops.approveWorkshopById)
router.post('/viewApprovedWorkshops', workshops.viewApprovedWorkshops)
router.post('/loginworkshops', workshops.loginworkshops)
router.post('/forgotPwdWorkshop', workshops.forgotPwd)
router.post('/deleteWorkshopById/:id', workshops.deleteWorkshopById)

// mechanic routes

router.post('/addMechanic/:id',mechanic.upload,mechanic.addMechanic)
router.post('/viewMechanics',mechanic.viewMechanics)
router.post('/viewMechById/:id',mechanic.viewMechById)
router.post('/editMechanicById/:id',mechanic.upload2,mechanic.editMechanicById)
router.post('/loginMech',mechanic.loginMech)
router.post('/forgotPwdmech',mechanic.forgotPwd)
router.post('/deleteMechanicById/:id',mechanic.deleteMechanicById)
router.post('/viewMechanicsByShopid/:id',mechanic.viewMechanicsByShopid)



// services routes
router.post('/registerService', services.registerService)
router.post('/searchServicesByName/:serviceName', services.searchServicesByName)
router.post('/viewServicesByWid/:id', services.viewServicesByWid)
router.post('/editServiceById/:id', services.editServiceById)
router.post('/viewServiceById/:id', services.viewServiceById)
router.post('/deleteServiceById/:id', services.deleteServiceById)
router.post('/viewallservices', services.viewallservices)
router.post('/editServiceById/:id', services.editServiceById)


//booking routes
router.post('/bookaService/:serviceid', booking.bookaService)
router.post('/viewBookingByWid/:id', booking.viewBookingByWid)
router.post('/viewbookigbyid/:id', booking.viewbookigbyid)
router.post('/viewBookingByCustid/:id', booking.viewBookingByCustid)
router.post('/approveBookingByWid/:id', booking.approveBookingByWid)
router.post('/assignMechForService/:id', booking.assignMechForService)
router.post('/viewBookingByMechid/:id', booking.viewBookingByMechid)
router.post('/deleteservicebookingById/:id', booking.deleteservicebookingById)
router.post('/closeBookingById/:id', booking.closeBookingById) // radhul commented


// router.post('/updatePaymentbyBookingId', booking.updatePaymentbyBookingId) -- not needed

//spareparts
router.post('/addSpareParts',sparepartController.upload, sparepartController.addSpareParts)
router.post('/viewSparePartById/:id', sparepartController.viewSparePartById)
router.post('/searchSparePartByName/:partName',sparepartController.searchSparePartByName)
router.post('/editSparePartById/:id',sparepartController.upload, sparepartController.editSparePartById)
router.post('/deleteSparePartById/:id',sparepartController.deleteSparePartById)
router.post('/viewSparePartByWid/:id',sparepartController.viewSparePartByWid)
router.post('/viewallSpareParts',sparepartController.viewallSpareParts)

//spare part booking
router.post('/bookSparePart',spareOrderController.bookSparePart)
router.post('/viewBookingByUserid/:id',spareOrderController.viewBookingByUserid)
router.post('/viewSparePartBookingByWid/:id',spareOrderController.viewSparePartBookingByWid)
router.post('/updateSparePartBookingByWid/:id',spareOrderController.updateSparePartBookingByWid)//--------------


//Emergency
router.post('/addEmergency',emergencyController.addEmergency)
router.post('/adminApproveEmergencyReqs/:id',emergencyController.adminApproveEmergencyReqs)
router.post('/viewEmergencyForShops/:id',emergencyController.viewEmergencyForShopid)
router.post('/adminViewEmergencyReqs',emergencyController.adminViewEmergencyReqs)
router.post('/viewEmergencyById/:id',emergencyController.viewEmergencyById)
router.post('/shopAcceptEmergencyReq/:id',emergencyController.shopAcceptEmergencyReq)
router.post('/assignMechForEmergencyService/:id',emergencyController.assignMechForEmergencyService)
router.post('/viewEmergencyByMechid/:id',emergencyController.viewEmergencyByMechid)
router.post('/viewEmergenciesByCustId/:id',emergencyController.viewEmergenciesByCustId)
router.post('/addServiceandPaymentByMech/:id',emergencyController.addServiceandPaymentByMech)
router.post('/adminRejectEmergencyReqs/:id',emergencyController.adminRejectEmergencyReqs)


//modification
router.post('/addServiceUpdate/:id',Modifications.upload, Modifications.addServiceUpdate)
router.post('/viewServiceUpdateByCustId/:id', Modifications.viewServiceUpdateByCustId)
router.post('/viewServiceUpdateByMechid/:id', Modifications.viewServiceUpdateByMechid)
router.post('/viewServiceUpdateByserviceid/:id', Modifications.viewServiceUpdateByserviceid)




//Parking Agents
router.post('/registerParkingAgent', parkingAgents.upload, parkingAgents.registerParkingAgent);
router.post('/loginParkingAgent', parkingAgents.loginParkingAgent);
router.post('/viewParkingAgents', parkingAgents.viewParkingAgents);
router.post('/viewParkingAgentById/:id', parkingAgents.viewParkingAgentById);
router.post('/editParkingAgentById/:id', parkingAgents.upload, parkingAgents.editParkingAgentById);
router.post('/deleteParkingAgentById/:id', parkingAgents.deleteParkingAgentById);
router.post('/forgotPwd', parkingAgents.forgotPwd);
router.post('/approveParkingAgent/:id', parkingAgents.approveParkingAgent);
router.post('/rejectParkingAgent/:id', parkingAgents.rejectParkingAgent);
router.post('/viewPendingParkingAgents', parkingAgents.viewPendingParkingAgents);


//parkingArea
router.post('/createParkingArea/:id', parkingArea.createParkingArea);
router.post('/viewParkingAreaById/:id', parkingArea.viewParkingAreaById);
router.post('/updateParkingAreaById/:id', parkingArea.updateParkingAreaById);
router.post('/deleteParkingAreaById/:id', parkingArea.deleteParkingAreaById);
router.post('/viewParkingAreaByAgentId/:id', parkingArea.viewParkingAreaByAgentId);
router.post('/viewParkingAreas', parkingArea.viewParkingAreas);

module.exports = router



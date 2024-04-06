const express = require("express");
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controller/CustomerController");
const validateCustomer = require("../middleware/validateCustomer");
const { cloudinaryUpload } = require("../middleware/cloudinary");
const router = express.Router();

router.post("/", cloudinaryUpload, validateCustomer, createCustomer);

router.get("/", getCustomers);

router.put("/:id", cloudinaryUpload,validateCustomer, updateCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;

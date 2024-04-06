const cloudinary = require("cloudinary").v2;
const CustomerModel = require("../models/customer");

const createCustomer = async (req, res) => {
  try {
    const usernameExists = await CustomerModel.findOne({
      username: req.body.username,
    });
    if (usernameExists) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    const emailExists = await CustomerModel.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const customerData = {
      ...req.body,
      profilePicture: req.cloudinary?.url,
    };
    let customer = new CustomerModel(customerData);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

const getCustomers = async (req, res) => {
  try {
    let sortParam = req.query.sortBy;
    let sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
    let customers = await CustomerModel.find().sort({ [sortParam]: sortOrder });
    res.json({ data: customers });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};
const updateCustomer = async (req, res) => {
  try {
    let customer = await CustomerModel.findById(req.params.id);
    if (!customer) return res.status(404).json({ msg: "Customer not found" });

    const customerData = {
      ...req.body,
    };
    if (req.cloudinary?.url) {
      customerData.profilePicture = req.cloudinary.url;
    }

    let updateCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.id,
      customerData,
      { new: true }
    );
    res.json({ msg: "Customer updated", data: updateCustomer });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await CustomerModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Customer deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

module.exports = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};

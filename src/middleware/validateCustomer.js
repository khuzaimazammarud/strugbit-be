const validateCustomer = (req, res, next) => {
  console.log("🚀 ~ validateCustomer ~ req:", req.body)
  if (!req.body.name || !req.body.username || !req.body.email) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({ msg: "Please enter a valid email address" });
  }

  next();
};

module.exports = validateCustomer;

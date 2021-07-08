const { isEmpty } = require("../helper/validations.helper");

exports.categoryAndTagValidator = (req, res, next) => {
  if (isEmpty(req.body.name))
    return res.status(422).json({ error: "Name is required" });

  next();
};

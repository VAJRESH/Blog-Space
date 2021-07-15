const { isEmpty } = require("../helper/validations.helper");

exports.validateNewBlog = (req, res, next) => {
  const { title, body, tags } = req.body;

  if (isEmpty(title)) return res.status(422).json({ error: "Title is required" });
  if (isEmpty(body)) return res.status(422).json({ error: "Body is required" });
  if (isEmpty(tags)) return res.status(422).json({ error: "At least 1 tag is required" });
  
  if (title.length > 100) return res.status(422).json({ error: "Title is too long" });
  if (body.length < 200) return res.status(422).json({ error: "Body is too short" });

  next();
};


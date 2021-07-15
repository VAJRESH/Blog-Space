exports.slugify = (name) => {
  if (!name) return;
  return name.split(" ").join("-").toLowerCase();
};

exports.handleResponse = (error, responseObject, message) => {
  if (error) return responseObject.status(400).json({ error: error });

  responseObject.json(message);
};

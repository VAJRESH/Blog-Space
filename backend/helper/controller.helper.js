exports.slugify = (name) => {
    return name.split(' ').join('-').toLowerCase();
}

exports.handleResponse = (error, fetchedData, responseObject, message) => {
  if (error) return res.status(400).json({ error: error });

  responseObject.json(message);
}

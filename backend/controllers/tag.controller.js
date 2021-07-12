const Tag = require("../models/tag.model");
const { slugify, handleResponse } = require("../helper/controller.helper");

exports.createNewTag = (req, res) => {
  const { name } = req.body;
  const slug = slugify(name);

  const newTag = new Tag({ name, slug });
  newTag.save((saveError, data) =>
    handleResponse(saveError, res, { message: `${data.name} tag created` })
  );
};

exports.getAllTags = (req, res) => {
  Tag.find({}).exec((findError, data) => handleResponse(findError, res, data));
};

exports.getSingleTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndRemove({ slug }).exec((findError, tag) => {
    if (findError) return res.status(400).json({ error: findError });
    if (!tag)
      return res.status(400).json({ error: `${slug} does not exist!!` });

    res.json(tag);
  });
};

exports.deleteTag = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Tag.findOneAndDelete({ slug }).exec((findError, tag) =>
    handleResponse(findError, res, { message: `${slug} deleted!!` })
  );
};

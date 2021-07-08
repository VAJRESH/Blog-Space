const Category = require("../models/category.model");
const { slugify, handleResponse } = require("../helper/controller.helper");

exports.createNewCategory = (req, res) => {
  const { name } = req.body;
  const slug = slugify(name);

  const newCategory = new Category({ name, slug });
  newCategory.save((saveError, data) =>
    handleResponse(saveError, data, res, data)
  );
};

exports.getAllCategories = (req, res) => {
  Category.find({}).exec((findError, data) =>
    handleResponse(findError, data, res, data)
  );
};

exports.getSingleCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndRemove({ slug }).exec((findError, category) => {
    if (findError) return res.status(400).json({ error: findError });
    if (!category)
      return res.status(400).json({ error: `${slug} does not exist!!` });

    res.json(category);
  });
};

exports.deleteCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  Category.findOneAndDelete({ slug }).exec((findError, category) =>
    handleResponse(findError, category, res, `${slug} deleted!!`)
  );
};

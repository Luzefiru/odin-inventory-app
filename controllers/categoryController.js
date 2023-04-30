const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

module.exports.createCategory = [
  // validate & sanitize the req.body.name
  body('name', 'Genre name must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // validate & sanitize the req.body.description
  body('description', 'Description must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    // if there are errors, re-render the form with the previous tags and the errors.array() for display
    if (!errors.isEmpty()) {
      console.log(errors);
      res.render('form_category', {
        title: 'New Category',
        name: req.body.name,
        description: req.body.description,
        errors: errors.array(),
      });
    }

    // create a MongoDB document inside collection 'Category' with these fields
    const [name, description] = [req.body.name, req.body.description];
    const newCategoryDocument = new Category({
      name,
      description,
    });

    // save the document
    await newCategoryDocument.save();
    console.log('SAVED');
    res.redirect(newCategoryDocument.URL);
  }),
];

module.exports.readCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();

  // if the category with the associated URL :id is not found, throw an error
  if (category === null) {
    const err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }

  // otherwise, render the associated view
  res.render('detail_category', {
    title: category.name,
    name: category.name,
    description: category.description,
  });
});

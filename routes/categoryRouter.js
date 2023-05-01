const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

// READ all categories
router.get('/', categoryController.getIndex);

// new category form page
router.get('/new', (req, res) => {
  res.render('form_category', { title: 'New Category' });
});

// CREATE a single category
router.post('/new', categoryController.postCategory);

// READ a single category
router.get('/:id', categoryController.getDetail);

module.exports = router;

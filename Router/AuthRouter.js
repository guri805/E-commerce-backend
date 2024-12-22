const express = require('express')
const router = express.Router()
const { signup, login } = require('../controller/AuthController');
const validate = require('../Middleware/SignupMiddleware');
const signupSchema = require('../validators/SignupValidator');
const { createCategory, deleteCategory, updateCategory } = require('../Controller/CreateCategoryController');
const createProduct = require('../Controller/CreateProductController');

router.post('/signup', validate(signupSchema), signup)
router.post('/login', login);
router.post('/category', createCategory)
router.post('/product', createProduct)
router.put('/category/:id', updateCategory)
router.delete("/category/:id", deleteCategory)

module.exports = router; 

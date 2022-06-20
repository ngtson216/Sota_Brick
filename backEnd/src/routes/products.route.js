const express = require('express')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { uploadMulti } = require('../middlewares/upload.middleware')

const router = express.Router()

router.route('/')
  .get(getProducts)
  .post(requireAuth, uploadMulti, createProduct)

router.route('/:id')
  .get(getProduct)
  .put(requireAuth, uploadMulti, updateProduct)
  .delete(requireAuth, deleteProduct)

module.exports = router
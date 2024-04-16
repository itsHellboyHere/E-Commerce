const express = require('express')
const router = express.Router()
const { authenticateUser, authorizePermissions } = require('../middleware/authentication')
const { getSingleProductReview } = require('../controllers/reviewController')
const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
} = require('../controllers/productController')

router.route('/')
    .post([authenticateUser, authorizePermissions('seller')], createProduct)
    .get(getAllProducts);

router.route('/uploadImage')
    .post([authenticateUser, authorizePermissions('seller')], uploadImage);


router
    .route('/:id').get(getSingleProduct)
    .patch([authenticateUser, authorizePermissions('seller')], updateProduct)
    .delete([authenticateUser, authorizePermissions('seller')], deleteProduct);

router.route('/:id/reviews').get(getSingleProductReview);

module.exports = router;

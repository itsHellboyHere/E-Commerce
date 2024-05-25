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
    getSellerProducts,
} = require('../controllers/productController')

router.route('/')
    .post([authenticateUser, authorizePermissions('seller')], createProduct)
    .get(getAllProducts);

router.route('/seller')
    // new route for seller-specific products
    .get([authenticateUser, authorizePermissions('seller')], getSellerProducts); 
    
router.route('/uploadImage')
    .post([authenticateUser, authorizePermissions('seller')], uploadImage);
router
    .route('/:id').get(getSingleProduct)
    .patch([authenticateUser, authorizePermissions('seller')], updateProduct)
    .delete([authenticateUser, authorizePermissions('seller')], deleteProduct);

router.route('/:id/reviews').get(getSingleProductReview);

module.exports = router;

const express =require('express')
const router=express.Router()
const{authenticateUser} = require('../middleware/authentication')

const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
} = require('../controllers/reviewController')

router.route('/')
.post(authenticateUser, createReview) //creates a new review
.get(getAllReviews)

router.route('/:id')
.get(getSingleReview)  //gets one specific review by its id
.patch(authenticateUser, updateReview)
.delete(authenticateUser, deleteReview)

module.exports = router;
//the authenticate user middleware checks if the user is logged in and then it passes on to check permissions with authorizepermissions middleware which verifies.

//permissions middleware will check if the user is authenticated and then it checks for permissions in the token to see if they have access to the routes.

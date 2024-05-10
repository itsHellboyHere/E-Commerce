

const express = require('express')
const router = express.Router()

const { register, login, logout, registerSeller } = require('../controllers/authController')

router.post('/register', register)
router.post('/register/seller', registerSeller);
router.post('/login', login)
router.get('/logout', logout)

module.exports = router;
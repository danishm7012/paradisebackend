const jwt = require('jsonwebtoken')
const User = require('../models/Contact')
const keys = require('./keys').secretOrKey

const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, keys)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)

      return res.json({ UnAuthorized: 'token failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ UnAuthorized: 'No token' })
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(401).json({ UnAuthorized: 'Not an admin' })
  }
}

const retailer = (req, res, next) => {
  if (req.user && req.user.isRetailer) {
    next()
  } else {
    return res.status(401).json({ UnAuthorized: 'Not a retailer' })
  }
}

module.exports = { protect, admin, retailer }

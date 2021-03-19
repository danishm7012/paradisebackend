const express = require('express')
const router = express.Router()

// Load Input Validation
const validateContactInput = require('../../validation/contact')

// Load User model
const Contact = require('../../models/Contact')
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Contact is  Workking' }))

// @route   GET api/contact/
// @desc    Register user
// @access  Public
router.post('/add', (req, res) => {
  const { errors, isValid } = validateContactInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Get fields
  const ContactFields = {}

  if (req.body.name) ContactFields.name = req.body.name
  if (req.body.email) ContactFields.email = req.body.email
  if (req.body.subject) ContactFields.subject = req.body.subject
  if (req.body.message) ContactFields.message = req.body.message

  // Create Contact
  // Save Contact
  new Contact(ContactFields)
    .save()
    .then(() => res.status(200).json({ success: 'Submitted Successfully!' }))
    .catch((err) => res.status(404).json(err))
})

module.exports = router

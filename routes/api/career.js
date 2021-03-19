const express = require('express')
const router = express.Router()

// Load Career Model
const Career = require('../../models/Career')
// Load Validation
const validateCareerInput = require('../../validation/career')

// @route   GET api/career/test
// @desc    Tests career route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Careers Works' }))

// @route   POST api/Career
// @desc    Create Career
// @access  Private
router.post('/', (req, res) => {
  const { errors, isValid } = validateCareerInput(req.body)

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors)
  }

  // Get fields
  const CareerFields = {}

  if (req.body.name) CareerFields.name = req.body.name
  if (req.body.email) CareerFields.email = req.body.email
  if (req.body.phone) CareerFields.phone = req.body.phone
  if (req.body.job) CareerFields.job = req.body.job

  // Create Career
  // Save Career
  new Career(CareerFields)
    .save()
    .then(() => res.status(200).json({ success: 'Submitted Successfully!' }))
  console.log('contact')
})

module.exports = router

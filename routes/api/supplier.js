const express = require('express')
const router = express.Router()
const Supplier = require('../../models/Supplier')

// Load Validation
const validateSupplierInput = require('../../validation/supplier')
// @route   GET api/supplier/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Supplier Works' }))

// @route   GET api/supplier/
// @desc    add supplier
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateSupplierInput(req.body)

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  // Get fields
  const SupplierFields = {}

  if (req.body.name) SupplierFields.name = req.body.name
  if (req.body.email) SupplierFields.email = req.body.email
  if (req.body.phone) SupplierFields.phone = req.body.phone
  if (req.body.company) SupplierFields.company = req.body.company
  if (req.body.productDesc) SupplierFields.productDesc = req.body.productDesc
  // Create Supplier
  // Save Supplier
  new Supplier(SupplierFields)
    .save()
    .then(() => res.status(200).json({ success: 'Submitted Successfully!' }))
})

module.exports = router

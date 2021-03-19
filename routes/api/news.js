const express = require('express')
const router = express.Router()

const Newslatter = require('../../models/Newslatter')

// @route   GET api/news/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Newslatter Works' }))

router.post('/', (req, res) => {
  // Get fields
  const NewsFields = {}

  if (req.body.email) NewsFields.email = req.body.email
  new Newslatter(NewsFields)
    .save()
    .then(() => res.status(200).json({ success: 'Submitted Successfully!' }))
})

module.exports = router

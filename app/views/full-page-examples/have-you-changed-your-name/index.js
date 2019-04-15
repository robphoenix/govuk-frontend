const express = require('express')
const formController = express.Router()
const { body, validationResult } = require('express-validator/check')
const { formatValidationErrors } = require('../../../utils.js')

formController.post('/have-you-changed-your-name',
  [
    body('changed-name')
      .exists()
      .not().isEmpty().withMessage('Select if you have changed your name')
  ],
  (request, response) => {
    const errors = formatValidationErrors(validationResult(request))
    if (errors) {
      return response.render('./full-page-examples/have-you-changed-your-name/index', {
        errors,
        errorSummary: Object.values(errors),
        values: request.body // In production this should sanitized.
      })
    }
    response.render('./full-page-examples/have-you-changed-your-name/confirm')
  }
)

module.exports = formController
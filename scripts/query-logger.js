'use strict'

const log4js = require('log4js'),
      logger = log4js.getLogger('queryLogger')

function queryLogger (req, res, next) {
  logger.trace('%s %s', req.method, req.url)
  next()
}

module.exports = queryLogger
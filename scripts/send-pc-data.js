'use strict'

const log4js      = require('log4js'),
      get         = require('lodash/get'),
      compact     = require('lodash/compact'),
      isUndefined = require('lodash/isUndefined'),
      logger      = log4js.getLogger('sendPcData')

function sendPcData (req, res, pcData) {
	try {
		const props = compact(
			req.url
				.replace(/[^\w\/]+/, '')
				.split('?')[0]
				.split('#')[0]
				.split('/')
		)
			.join('.')
		
		const findedData = props === ''
			? pcData
			: get(pcData, props)
		
		if (isUndefined(findedData)) {
			return res.sendStatus(404)
		} else {
			return res.send(JSON.stringify(findedData))
		}
		
	} catch (e) {
		logger.error('Fail', e)
		res.sendStatus(500)
	}
}

module.exports = sendPcData

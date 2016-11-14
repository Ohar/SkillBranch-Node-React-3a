'use strict'

const log4js       = require('log4js'),
      reduce       = require('lodash/reduce'),
      countVolumes = require('./count-volumes'),
      logger       = log4js.getLogger('handleVolumes')

function handleVolumes (req, res, pcData) {
	try {
		
		const volumes = countVolumes(pcData)
		
		return res.send(JSON.stringify(volumes))
	} catch (e) {
		logger.error('Fail', e)
		
		switch (e.message) {
			case 'Invalid username':
				res.send(e.message)
				break
			default:
				res.sendStatus(500)
				break
		}
	}
}

module.exports = handleVolumes

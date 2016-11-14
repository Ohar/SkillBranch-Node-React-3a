'use strict'

const express       = require('express'),
      cors          = require('cors'),
      sendPcData    = require('./scripts/send-pc-data'),
      handleVolumes = require('./scripts/handle-volumes'),
      queryLogger   = require('./scripts/query-logger'),
      log4js        = require('log4js'),
      logger        = log4js.getLogger('Server')

function server (pcData) {
	try {
		const SERVER = express(),
		      API    = express.Router(),
		      PORT   = process.env.PORT || 8082
		
		API.use(queryLogger)
		API.get('/volumes', (req, res) => handleVolumes(req, res, pcData))
		API.get('*', (req, res) => sendPcData(req, res, pcData))
		
		SERVER.use(cors())
		SERVER.use('/', API)
		SERVER.listen(PORT)
		
		logger.trace('Start')
	} catch (e) {
		logger.error('Fail', e)
	}
}

module.exports = server
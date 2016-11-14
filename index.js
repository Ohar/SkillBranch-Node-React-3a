'use strict'

const express = require('express'),
      fetch   = require('node-fetch'),
      server  = require('./server'),
      log4js  = require('log4js'),
      logger  = log4js.getLogger('App')

const URL = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json'

logger.trace('Start')

fetch(URL)
	.then(
		res => res.json()
	)
	.then(
		pcData => {
			logger.trace('Got PC data', pcData)
			server(pcData)
		}
	)
	.catch(
		err => {
			logger.error('Fail, ', err)
		}
	)

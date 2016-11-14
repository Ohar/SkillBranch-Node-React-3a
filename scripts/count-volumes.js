'use strict'

const reduce = require('lodash/reduce')

function countVolumes (pcData) {
	if (pcData && 'hdd' in pcData && Array.isArray(pcData.hdd)) {
		return reduce(
			pcData.hdd,
			(result, e) => {
				if (result[e.volume]) {
					result[e.volume] = String(Number(result[e.volume]) + Number(e.size))
				} else {
					result[e.volume] = String(e.size)
				}
				return result
			},
			{}
		)
	} else {
		return {}
	}
}

module.exports = countVolumes

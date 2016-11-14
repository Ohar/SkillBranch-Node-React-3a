'use strict'

const reduce = require('lodash/reduce')

function countVolumes (pcData) {
	if (pcData && 'hdd' in pcData && Array.isArray(pcData.hdd)) {
		return reduce(
			pcData.hdd,
			(result, e) => {
				if (result[e.volume]) {
					result[e.volume] += e.size
				} else {
					result[e.volume] = e.size
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

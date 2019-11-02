/**
 * Module for all communication with libre.fm
 */

const { AudioScrobbler } = require('scrobbler/audioscrobbler');
const { createQueryString } = require('util/util-browser');

class LibreFm extends AudioScrobbler {
	/** @override */
	async sendRequest(options, params, signed) {
		if ('post' === options.method.toLowerCase()) {
			options.headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};
			options.body = createQueryString(params);
		}

		return super.sendRequest(options, params, signed);
	}
}

export const libreFm = new LibreFm({
	label: 'Libre.fm',
	storage: 'LibreFM',
	apiUrl: 'https://libre.fm/2.0/',
	apiKey: 'r8i1y91hz71tcx7vyrp9hk1alhqp1898',
	apiSecret: '8187db5vg234yq6tm7o62q8mtl1niala',
	authUrl: 'https://www.libre.fm/api/auth/',
	statusUrl: null,
	profileUrl: 'https://libre.fm/user/',
});

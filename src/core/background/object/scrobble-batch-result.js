'use strict';

/**
 * An error containing additional information about batch scrobble failures.
 *
 * Each error instance contains a list of song indices attached to a scrobbler.
 * The scrobbler ID is are used as a key.
 *
 * Each index from the array of indices refers to a song that was failed to
 * scrobble. The index can be used to get a song info object from the array
 * used to query batch scrobble.
 */
class ScrobbleBatchError extends Error {
	/**
	 * @constructor
	 *
	 * @param {String} message Error message
	 */
	constructor(message) {
		super(message);

		this.errorData = {};
	}

	/**
	 * Set a list of song indices failed to scrobble with a scrobbler
	 * matching a given ID.
	 *
	 * @param {String} scrobblerId Scrobbler ID
	 * @param {Array} songIndices Array of song indices
	 */
	setFailedSongIndices(scrobblerId, songIndices) {
		this.errorData[scrobblerId] = songIndices;
	}

	/**
	 * Return a list of song indices failed to scrobble with a scrobbler
	 * matching a given ID.
	 *
	 * @param {String} scrobblerId Scrobbler ID
	 * @return {Array} Array of song indices
	 */
	getFailedSongIndices(scrobblerId) {
		return this.errorData[scrobblerId];
	}
}

define(() => ScrobbleBatchError);

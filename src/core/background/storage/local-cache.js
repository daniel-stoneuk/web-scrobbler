import { Song } from 'object/song';
import * as BrowserStorage from 'storage/browser-storage';

const storage = BrowserStorage.getStorage(BrowserStorage.LOCAL_CACHE);

export async function fillSongData(song) {
	const songId = song.getUniqueId();
	if (!songId) {
		return false;
	}

	const data = await storage.get();
	if (data[songId]) {
		const savedMetadata = data[songId];

		for (const field of Song.USER_FIELDS) {
			song.processed[field] = savedMetadata[field];
		}

		return true;
	}

	return false;
}

/**
 * Save custom song info to browser storage.
 * @param  {Object} song Song instance
 * @param  {Object} data User data
 */
export async function saveSongData(song, data) {
	const songId = song.getUniqueId();
	if (!songId) {
		return;
	}

	const storageData = await storage.get();

	if (!storageData[songId]) {
		storageData[songId] = {};
	}

	for (const field of Song.USER_FIELDS) {
		storageData[songId][field] = data[field];
	}

	await storage.set(storageData);
}

/**
 * Remove song info from browser storage.
 * @param  {Object} song Song object
 */
export async function removeSongData(song) {
	const songId = song.getUniqueId();
	if (!songId) {
		return;
	}

	const data = await storage.get();

	delete data[songId];
	await storage.set(data);
}

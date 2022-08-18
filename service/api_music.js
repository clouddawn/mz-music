import {
	mzRequest
} from "./index";

export function getBanners() {
	return mzRequest.get('/banner', {
		type: 2
	})
}

const songIdMap = {
	'新歌': 3779629,
	'热歌': 3778678,
	'原创': 2884035,
	'飙升': 19723756
}

export function getRankings(id) {
	id = songIdMap[id]
	return mzRequest.get('/playlist/detail', {
		id
	})
}

export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
	return mzRequest.get("/top/playlist", {
		cat,
		limit,
		offset
	})
}
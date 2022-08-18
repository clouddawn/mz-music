import {
	mzRequest
} from "./index";

export function getTopMv(offset, limit = 10) {
	return mzRequest.get('/top/mv', {
		offset,
		limit
	})
}

/**
 * 请求mv的播放地址
 * @param {number} id mv的id
 */
export function getMVURL(id) {
	return mzRequest.get('/mv/url', {
		id
	})
}

/**
 * 请求mv的详细信息
 * @param {number} mvid 
 */
export function getMVDetail(mvid) {
	return mzRequest.get('/mv/detail', {
		mvid
	})
}

/**
 * 请求相关视频
 */
export function getRelatedVideo(id) {
	return mzRequest.get('/related/allvideo', {
		id
	})
}
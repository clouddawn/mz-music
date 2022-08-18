const BASE_URL = 'https://coderwhy-music.vercel.app';

class MZRequest {
	request(url, method, params) {
		return new Promise((resolve, reject) => {
			wx.request({
				url: BASE_URL + url,
				method,
				timeout: 6000,
				data: params,
				success(res) {
					resolve(res.data);
				},
				fail: reject
			})
		})
	}
	get(url, params) {
		return this.request(url, 'GET', params);
	}
	post(url, params) {
		return this.request(url, 'POST', params);
	}
}

export const mzRequest = new MZRequest();
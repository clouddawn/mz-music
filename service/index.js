const BASE_URL = 'https://coderwhy-music.vercel.app';

class MZRequest {
	request(url, method, params) {
		wx.showLoading({
			title: '加载中',
			mask: true
		});
		return new Promise((resolve, reject) => {
			wx.request({
				url: BASE_URL + url,
				method,
				timeout: 10000,
				data: params,
				success(res) {
					wx.hideLoading();
					if (res.statusCode >= 400) {
						wx.showToast({
							title: '调用接口失败',
							icon: "none"
						})
					}
					resolve(res.data);
				},
				fail(err) {
					wx.hideLoading();
					reject(err);
				}
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
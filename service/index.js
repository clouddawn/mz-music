// const BASE_URL = 'https://coderwhy-music.vercel.app';
const BASE_URL = 'http://codercba.com:9002';
const LOGIN_BASE_URL = "http://123.207.32.32:3000"
import {
	TOKEN_KEY
} from "../constants/token-const"

const token = wx.getStorageSync(TOKEN_KEY);

class MZRequest {
	constructor(baseUrl, authHeader = {}) {
		this.baseUrl = baseUrl;
		this.authHeader = authHeader;
	}
	request(url, method, params, isAuth = false, header = {}) {
		wx.showLoading({
			title: '加载中',
			mask: true
		});
		return new Promise((resolve, reject) => {
			const finerHeader = isAuth ? {
				...this.authHeader,
				...header
			} : {};
			wx.request({
				url: this.baseUrl + url,
				method,
				header: finerHeader,
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
	get(url, params, isAuth = false, header) {
		return this.request(url, 'GET', params,isAuth, header);
	}
	post(url, params, isAuth = false, header) {
		return this.request(url, 'POST', params, isAuth, header);
	}
}

export const mzRequest = new MZRequest(BASE_URL);
export const mzLoginRequest = new MZRequest(LOGIN_BASE_URL, {
	token
});
import {
	mzLoginRequest
} from "./index";


export function getLoginCode() {
	return new Promise((resolve, reject) => {
		// 获取code
		wx.login({
			timeout: 3000,
			success: (res) => {
				resolve(res.code);
			},
			fail: err => {
				reject(err);
			}
		})
	})
}
export function sendCodeToServer(code) {
	return mzLoginRequest.post("/login", {
		code
	})
}
export function checkToken() {
	return mzLoginRequest.post("/auth", {},true)
}
export function checkSession() {
	return new Promise((resolve) => {
		wx.checkSession({
			success () {
				resolve(true);
			},
			fail () {
				resolve(false);
			}
		})
	})
}
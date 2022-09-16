// app.js
import {
	getLoginCode,
	sendCodeToServer,
	checkToken,
	checkSession
} from "./service/api.login"
import {TOKEN_KEY} from "./constants/token-const"
App({
	globalData: {
		screenWidth: 0,
		screenHeight: 0,
		statusBarHeight: 0,
		navBarHeight: 44
	},
	async onLaunch() {
		// 获取设备信息
		const res = wx.getSystemInfoSync();
		this.globalData.screenWidth = res.screenWidth;
		this.globalData.screenHeight = res.screenHeight;
		this.globalData.statusBarHeight = res.statusBarHeight;
		// 让用户默认进行登录
		this.handleLogin();
	},
	async handleLogin(){
		const token = wx.getStorageSync(TOKEN_KEY);
		try {
			const checkTokenRes = await checkToken(token);
			const isSessionExpire = await checkSession();
			if(!token || checkTokenRes.errorCode || !isSessionExpire){
				this.loginAction()
			}
		} catch (error) {
			console.log(error);
		}
	},
	loginAction: async function () {
		const code = await getLoginCode();
		sendCodeToServer(code).then((res) => {
			// console.log(res.token);
			// console.log(TOKEN_KEY);
			wx.setStorageSync(TOKEN_KEY, res.token)
		}).catch((err) => {
			console.log(err);
		})
	}
})
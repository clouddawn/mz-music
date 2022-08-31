// baseui/nav-bar/navBar.js
Component({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
	},
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: {
			type: String,
			value: "默认标题"
		}
	},
	// 生命周期
	lifetimes: {
		// ready(){
		// 	const info = wx.getSystemInfoAsync({
		// 		success: (result) => {
		// 			console.log(result);
		// 			this.setData({
		// 				statusBarHeight:result.statusBarHeight
		// 			})
		// 		},
		// 	})
		// }
	},
	/**
	 * 组件的初始数据
	 */
	data: {
		statusBarHeight: getApp().globalData.statusBarHeight
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handleLeftClick(){
			this.triggerEvent('click');
		}
	}
})
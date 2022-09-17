// pages/home-video/index.js

import {
	getTopMv
} from "../../service/api_video"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		topMVs: [],
		hasMore: true,
		loadMore: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getTopMvData(0);
	},

	// 封装网络请求的方法
	async getTopMvData(offset) {
		const res = await getTopMv(offset);
		let newData = this.data.topMVs;
		if (offset === 0) {
			newData = res.data;
		} else {
			newData.push(...res.data);
		}
		this.setData({
			topMVs: newData,
			hasMore: res.hasMore
		})
	},
	// 封装事件处理的方法
	handleVideoItemClick(event) {
		const id = event.currentTarget.dataset.item.id;
		wx.navigateTo({
			url: '/packageDetail/pages/detail-video/detailVideo' + "?id=" + id,
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	async onPullDownRefresh() {
		await this.getTopMvData(0);
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	async onReachBottom() {
		if (!this.data.hasMore || !this.data.loadMore) return;
		this.data.loadMore = false;
		try {
			await this.getTopMvData(this.data.topMVs.length);
			this.data.loadMore = true;
		} catch (err) {
			console.log(err);
			this.data.loadMore = true;
		}

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
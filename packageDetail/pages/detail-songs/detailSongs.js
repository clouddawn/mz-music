// pages/detail-songs/detailSongs.js
import {
	rankingStore,playerStore
} from "../../../store/index";
import {
	getSongMenuDetail
} from "../../../service/api_music"

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		ranking: '',
		songInfo: "",
		type: "",
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.setData({
			type: options.type
		})
		if (options.type === 'rank') {
			const ranking = options.ranking;
			this.setData({
				ranking
			})
			rankingStore.onState(ranking, this.getRankingData);
		} else if (options.type === 'menu') {
			const id = options.id;
			getSongMenuDetail(id).then((res) => {
				this.setData({
					songInfo: res.playlist
				})
			})
		}
	},
	getRankingData(res) {
		this.setData({
			songInfo: res
		})
	},
	handleSongItemClick(event){
		playerStore.setState('playListSongs',this.data.songInfo.tracks);
		playerStore.setState('playListIndex',event.currentTarget.dataset.index);
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
		if (this.data.ranking) {
			rankingStore.offState(this.data.ranking, this.getRankingData)
		}
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
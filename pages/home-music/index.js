// pages/home-music/index.js

import {
	getBanners,
	getRankings,
	getSongMenu
} from "../../service/api_music"
import {
	getComponentHeight
} from "../../utils/query-rect"
import {
	throttle
} from "../../utils/throttle"
import {
	rankingStore
} from "../../store/index"

const tGetComponentHeight = throttle(getComponentHeight)

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		banners: [],
		swiperHeight: 0,
		recommendSongs: [],
		hotSongMenu: [],
		recommendSongMenu: [],
		rankings: []
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getPageData();
		rankingStore.dispatch("getRankingDataAction");
		rankingStore.onState('hotRanking', (res) => {
			res.tracks && this.setData({
				recommendSongs: res.tracks.slice(0, 6)
			});
		});
		rankingStore.onState('upRanking', this.getNewRankingHandler);
		rankingStore.onState('newRanking', this.getNewRankingHandler);
		rankingStore.onState('originRanking', this.getNewRankingHandler);
	},

	getNewRankingHandler(res) {
		if (!res.tracks) return;
		const rankingId = {
			'新歌榜': 1,
			'原创榜': 2,
			'飙升榜': 3
		}
		const name = res.name;
		const id = rankingId[name];
		const coverImgUrl = res.coverImgUrl;
		const songList = res.tracks.slice(0, 3);
		const playCount = res.playCount;
		const rankingObj = {
			name,
			coverImgUrl,
			songList,
			id,
			playCount
		};
		const newRankings = [...this.data.rankings];
		newRankings.push(rankingObj);
		newRankings.sort((a, b) => {
			return a.id - b.id;
		})
		this.setData({
			rankings: newRankings
		})
	},

	getPageData() {
		getBanners().then((res) => {
			this.setData({
				banners: res.banners
			})
		})
		getSongMenu().then((res) => {
			this.setData({
				hotSongMenu: res.playlists
			})
		})
		getSongMenu('华语').then((res) => {
			this.setData({
				recommendSongMenu: res.playlists
			})
		}).catch((err) => {
			console.error(err);
		})
	},

	imgLoad(event) {
		// 拿到图片的原始宽高和显示宽度，计算出显示高度
		// const screenWidth = wx.getSystemInfoSync().screenWidth;
		// const imgHeight = (event.detail.height * screenWidth) / event.detail.width;
		// this.setData({
		// 	swiperHeight: imgHeight
		// });
		// 直接拿图片的显示高度
		tGetComponentHeight('.swiper-image').then((res) => {
			this.setData({
				swiperHeight: res[0].height
			})
		});
	},
	// 点击搜索框
	handleSearchClick() {
		console.log('search');
		wx.navigateTo({
			url: '/pages/detail-search/detailSearch',
		})
	},
	// 推荐歌曲点击更多
	handleMoreClick() {
		this.navigateToDetailSongs('hotRanking')
	},
	//巅峰榜榜单点击
	handleRankingClick(event){
		const rankingChineseName = event.currentTarget.dataset.item.name;
		const rankingMap = {
			'新歌榜':'newRanking',
			'原创榜':'originRanking',
			'飙升榜':'upRanking'
		}
		const rankingName = rankingMap[rankingChineseName];
		this.navigateToDetailSongs(rankingName);
	},
	navigateToDetailSongs(rankingName){
		wx.navigateTo({
			url: `/pages/detail-songs/detailSongs?ranking=${rankingName}&type=rank`,
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
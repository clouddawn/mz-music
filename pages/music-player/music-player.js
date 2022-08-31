// pages/music-player/music-player.js
import {
	innerAudioContext,
	playerStore
} from "../../store/index"

Page({
	data: {
		currentLyricText: "",

		currentSong: {},

		currentPage: 0,
		contentHeight: 500,
		deviceRadio: 0,
		songDuration: 0,
		currentTime: 0,
		isSliderChaning: false,
		sliderValue: 0,

		lineLyricsArr: [],

		currentLyricIndex: 0,
		lyricScrollTop: 0
	},
	onLoad(options) {
		const id = options.id;

		// 根据id获取歌曲信息
		this.setupPlayerStoreListener();

		const screenHeight = getApp().globalData.screenHeight;
		const screenWidth = getApp().globalData.screenWidth;
		const deviceRadio = screenHeight / screenWidth;
		this.setData({
			deviceRadio
		})

		// 计算内容高度
		this.getContentHeight();


		// this.setupAudioContextListener();
	},
	// 歌曲播放监听
	// setupAudioContextListener() {
	// 	innerAudioContext.onCanplay(() => {
	// 		innerAudioContext.play();
	// 		this.setData({
	// 			songDuration: innerAudioContext.duration
	// 		})
	// 	})
	// 	innerAudioContext.onTimeUpdate(() => {
	// 		if (this.data.isSliderChaning) return;
	// 		const currentTime = innerAudioContext.currentTime;
	// 		const sliderValue = currentTime / this.data.songDuration * 100;
	// 		const lineLyricsArr = this.data.lineLyricsArr;
	// 		let currentLyricText;
	// 		let currentLyricIndex;
	// 		for (let i = 0; i < this.data.lineLyricsArr.length; i++) {
	// 			if (currentTime * 1000 < lineLyricsArr[i].time) {
	// 				currentLyricText = lineLyricsArr[i - 1].text;
	// 				currentLyricIndex = i - 1;
	// 				break;
	// 			}
	// 		}
	// 		const lyricScrollTop = 35 * currentLyricIndex;
	// 		if (currentLyricIndex !== this.data.currentLyricIndex) {
	// 			this.setData({
	// 				currentLyricText,
	// 				currentLyricIndex,
	// 				lyricScrollTop
	// 			})
	// 		}
	// 		this.setData({
	// 			currentTime,
	// 			sliderValue
	// 		})

	// 	})
	// },
	handleSwiperChange(event) {
		this.setData({
			currentPage: event.detail.current,
		})
	},
	getContentHeight() {
		const globaldata = getApp().globalData;
		const screenHeight = globaldata.screenHeight;
		const statusBarHeight = globaldata.statusBarHeight;
		const navBarHeight = globaldata.navBarHeight;
		const contentHeight = screenHeight - statusBarHeight - navBarHeight;
		this.setData({
			contentHeight
		})
	},
	handleSliderChaning(event) {
		const value = event.detail.value;
		const currentTime = value / 100 * this.data.songDuration;
		this.setData({
			isSliderChaning: true,
			currentTime
		})
	},
	handleSliderChange(event) {
		innerAudioContext.pause();
		const value = event.detail.value;
		const currentTime = value / 100 * this.data.songDuration;
		innerAudioContext.seek(currentTime);

		this.setData({
			isSliderChaning: false
		})
	},
	// 点击返回
	handleLeftClick() {
		wx.navigateBack();
	},
	setupPlayerStoreListener() {
		playerStore.onStates(['currentSong', 'lineLyricsArr'], ({
			currentSong,
			lineLyricsArr
		}) => {
			if (currentSong) this.setData({
				currentSong
			});
			if (lineLyricsArr) this.setData({
				lineLyricsArr
			});
		})
		playerStore.onStates(['songDuration', 'currentTime', 'currentLyricText', 'currentLyricIndex'], ({
			songDuration,
			currentTime,
			currentLyricText,
			currentLyricIndex
		}) => {
			if (songDuration) this.setData({
				songDuration
			});
			if (currentTime && !this.data.isSliderChaning) {
				const sliderValue = currentTime / this.data.songDuration * 100;
				this.setData({
					currentTime,
					sliderValue
				});
			};
			if (currentLyricText) this.setData({
				currentLyricText
			});
			if (currentLyricIndex) this.setData({
				currentLyricIndex,
				lyricScrollTop: 35 * currentLyricIndex
			});
		});
	},
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},
})
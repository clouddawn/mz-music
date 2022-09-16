// pages/home-music/cpns/player-bar/player-bar.js
import {
	playerStore
} from "../../../../store/index"
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		currentSong: {
			type: Object,
			value: {}
		}
	},
	lifetimes: {
		attached: function () {
			// 在组件实例进入页面节点树时执行
			playerStore.onState('isPlaying', (isPlaying) => {
				this.setData({
					isPlaying
				})
			})
		},
		detached: function () {
			// 在组件实例被从页面节点树移除时执行
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		isPlaying: false,
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		handlePlayBtnClick() {
			playerStore.dispatch('changePlayStatus', !this.data.isPlaying);
		},
		handlePlayerBarClick(){
			const id = this.properties.currentSong.id;
			wx.navigateTo({
				url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
			})
		}
	}
})
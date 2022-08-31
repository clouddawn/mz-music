// components/song-item-v1/song-item-v1.js
import {playerStore} from "../../store/index"
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		songItem:{
			type:Object,
			value:{}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		goMusicPlayer(event){
      const id = event.currentTarget.dataset.id;
      playerStore.dispatch("playMusicWithSongIdAction",{id})
			wx.navigateTo({
				url: `/pages/music-player/music-player?id=${id}`,
      })
		}
	}
})

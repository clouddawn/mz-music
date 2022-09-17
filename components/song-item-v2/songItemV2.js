// components/song-item-v2/songItemV2.js
import {playerStore} from "../../store/index"
Component({
	options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    itemInfo: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
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
			// const id = event.currentTarget.dataset.id;
			const id = this.properties.itemInfo.id;
			playerStore.dispatch("playMusicWithSongIdAction",{id})
			wx.navigateTo({
				url: `/packagePlayer/pages/music-player/music-player?id=${id}`,
			})
		}
  }
})
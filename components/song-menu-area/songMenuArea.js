// components/song-menu-area/songMenuArea.js

const app = getApp();

Component({
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    songMenu:{
      type:Array,
      value: []
    }, 
    title:{
      type:String,
      value:'默认文字'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: app.globalData.screenWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
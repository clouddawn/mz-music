// app.js
App({
  globalData: {
    screenWidth: 0,
    screenHeight: 0,
  },
  onLaunch() {
    const res = wx.getSystemInfoSync();
    this.globalData.screenWidth = res.screenWidth;
    this.globalData.screenHeight = res.screenHeight;
  }
})
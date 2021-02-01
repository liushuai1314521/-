// pages/user/index.js
Page({
  data: {
    userinfo: {},
    collectName: 0
  },
  handleGetUserInfo(e) {
    const { userInfo } = e.detail
    console.log(userInfo);
    wx.setStorageSync('userinfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })

  },
  onShow() {
    const userinfo = wx.getStorageSync("userinfo")
    const collect = wx.getStorageSync('collect') || [];

    this.setData({
      userinfo,
      collectName:collect.length
    })
  },
  callFn(){
    wx.makePhoneCall({
      phoneNumber: '17853635005',
    })
  }
})
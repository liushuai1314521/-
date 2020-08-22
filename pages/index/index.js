Page({
  data: {
    //轮播图数组
    swiperList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //发送异步请求，获取轮播图数据
    wx.request({
      url: 'http://localhost:3000/admin/api/rest/ads',
      success: (result) => {
        //this.swiperList = result
        console.log(result);

      },
    })
  },
})
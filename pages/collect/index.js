// pages/collect/index.js
Page({
  data: {
    tabs: [{
      id: 0,
      value: "商品收藏",
      isActive: true,

    },
    {
      id: 1,
      value: "品牌收藏",
      isActive: false,

    },
    {
      id: 2,
      value: "店铺收藏",
      isActive: false,

    },
    {
      id: 3,
      value: "浏览足迹",
      isActive: false,

    },
    ],
    collectObj: []
  },

  onShow() {
    const collect_goods = wx.getStorageSync('collect')||[];
    this.setData({
      collectObj: collect_goods
    })
  },
  handletabsItemChange(e) {
    //1,获取被点击的标题索引
    const { index } = e.detail;
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //复制到data中
    this.setData({
      tabs
    })
  },
})
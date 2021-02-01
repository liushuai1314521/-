// pages/order/index.js
Page({
  data: {
    tabs: [{
      id: 0,
      value: "全部订单",
      isActive: true,

    },
    {
      id: 1,
      value: "待发货",
      isActive: false,

    },
    {
      id: 2,
      value: "待收货",
      isActive: false,

    },
    {
      id: 3,
      value: "退款/退货",
      isActive: false,

    },
  ],
  },
  onShow(options) {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    // console.log(currentPage.options);
    const {type} = currentPage.options
    this.changeTitleByIndex(type-1)
  },
  changeTitleByIndex(index) {
    //2,修改原数组
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //复制到data中
    this.setData({
      tabs
    })

  },
   //标题点击事件
  handletabsItemChange(e) {
    //1,获取被点击的标题索引
    const { index } = e.detail;
    this.changeTitleByIndex(index)
  },
})
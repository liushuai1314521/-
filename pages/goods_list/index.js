// pages/goods_list/index.js
Page({
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true,

      },
      {
        id: 1,
        value: "销量",
        isActive: false,

      },
      {
        id: 2,
        value: "价格",
        isActive: false,

      },
    ],
    goodsList: [],
  },
  //接口需要的参数
  QueryParams: {
    query: '',
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalpages: 1,
  onShareAppMessage(){
    return {
      title: '[有人@你]邀请您一起免费领取【家电 | 海信电视】,快去免费领取吧',
      imageUrl:"http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000606013705_1_400x400.jpg"
    }
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
      
    }),
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList()
  },
  getGoodsList() {
    let that = this;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      data: that.QueryParams,
      success: (result) => {
        if(result.data.meta.status == 200){
          wx.hideLoading();
          wx.stopPullDownRefresh()
           //获取 总条数
        const total = result.data.message.total;
        //计算总页数
        that.totalpages = Math.ceil(total / that.QueryParams.pagesize)
        that.setData({
          // goodsList: result.data.message.goods
          goodsList: [...that.data.goodsList, ...result.data.message.goods]
        })
        }
       
      },
    })
  },
  //标题点击事件
  handletabsItemChange(e) {
    //1,获取被点击的标题索引
    const {index} = e.detail;
    //2,修改原数组
    let {tabs} = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    //复制到data中
    this.setData({
      tabs
    })
  },
  //上滑滚动条触底事件
  onReachBottom() {
    //判断是否有下一页数据,即当前页码是否大于等于 总页数, 如果大于等于则无下一页数据
    if (this.QueryParams.pagenum >= this.totalpages) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'success',
        // image:"../../images/分类.png",
      })
    } else {
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },
  //下拉刷新事件
  onPullDownRefresh(){
    //清空原数组
    this.setData({
      goodsList:[]
    })
    //重置页码为1
    this.QueryParams.pagenum=1;
    //重新发送请求
    this.getGoodsList()

  },
  
})
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// pages/goods_list/index.js
Page({
  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    }, {
      id: 1,
      value: "销量",
      isActive: false
    }, {
      id: 2,
      value: "价格",
      isActive: false
    }],
    goodsList: []
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
  onShareTimeline: function onShareTimeline() {
    return {
      title: '自定义转发标题'
    };
  },
  onLoad: function onLoad(options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    }), wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },
  getGoodsList: function getGoodsList() {
    var that = this;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      data: that.QueryParams,
      success: function success(result) {
        if (result.data.meta.status == 200) {
          wx.hideLoading();
          wx.stopPullDownRefresh(); //获取 总条数

          var total = result.data.message.total; //计算总页数

          that.totalpages = Math.ceil(total / that.QueryParams.pagesize);
          that.setData({
            // goodsList: result.data.message.goods
            goodsList: [].concat(_toConsumableArray(that.data.goodsList), _toConsumableArray(result.data.message.goods))
          });
        }
      }
    });
  },
  //标题点击事件
  handletabsItemChange: function handletabsItemChange(e) {
    //1,获取被点击的标题索引
    var index = e.detail.index; //2,修改原数组

    var tabs = this.data.tabs;
    tabs.forEach(function (v, i) {
      return i === index ? v.isActive = true : v.isActive = false;
    }); //复制到data中

    this.setData({
      tabs: tabs
    });
  },
  //上滑滚动条触底事件
  onReachBottom: function onReachBottom() {
    //判断是否有下一页数据,即当前页码是否大于等于 总页数, 如果大于等于则无下一页数据
    if (this.QueryParams.pagenum >= this.totalpages) {
      wx.showToast({
        title: '没有更多数据了',
        icon: 'success' // image:"../../images/分类.png",

      });
    } else {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },
  //下拉刷新事件
  onPullDownRefresh: function onPullDownRefresh() {
    //清空原数组
    this.setData({
      goodsList: []
    }); //重置页码为1

    this.QueryParams.pagenum = 1; //重新发送请求

    this.getGoodsList();
  }
});
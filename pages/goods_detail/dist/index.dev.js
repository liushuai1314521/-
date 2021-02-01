"use strict";

// pages/goos_detail/index.js
Page({
  data: {
    goodsObj: {},
    isIphoneX: {},
    Car_totla: 0
  },
  //商品对象
  GoodsInfo: {},
  onLoad: function onLoad(options) {
    var cart_totals = wx.getStorageSync("totles");
    this.setData({
      Car_totla: cart_totals || 0
    });
    var goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
    var modelmes = wx.getStorageSync('modelmes');
    var isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX: isIphoneX
    });
  },
  //获取商品详情数据
  getGoodsDetail: function getGoodsDetail(goods_id) {
    var _this = this;

    var that = this;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      data: {
        goods_id: goods_id
      },
      success: function success(result) {
        // console.log(result.data.message);
        _this.GoodsInfo = result.data.message;
        that.setData({
          //按需结构获取，减少小程序处理数据压力
          // goodsObj:result.data.message
          goodsObj: {
            goods_name: result.data.message.goods_name,
            goods_price: result.data.message.goods_price,
            //由于iphone机型不兼容webp图片格式,即对获取的结果进行处理
            // goods_introduce:result.data.message.goods_introduce,
            goods_introduce: result.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
            pics: result.data.message.pics
          }
        });
      }
    });
  },
  //商品详情轮播图放大预览
  handlePreviewImage: function handlePreviewImage(e) {
    //构造预览数组
    var urls = this.GoodsInfo.pics.map(function (v) {
      return v.pics_mid;
    }); //接收传递过来的图片url

    var current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,
      // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表

    });
  },
  handleCartAdd: function handleCartAdd() {
    var _this2 = this;

    //1,获取缓存中的购物车数组    
    var cart = wx.getStorageSync("cart") || []; //2,判断商品对象是否存在购物车数组中
    //findIndex:返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1
    //数组实例的find()方法，用于找出第一个符合条件的数组成员

    var index = cart.findIndex(function (v) {
      return v.goods_id === _this2.GoodsInfo.goods_id;
    });

    if (index === -1) {
      //3,不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = false;
      cart.push(this.GoodsInfo);
    } else {
      //4,已经存在购物车数据,执行 num++
      cart[index].num++;
    }

    var total = 0;
    cart.forEach(function (v) {
      total += v.num;
    });
    this.setData({
      Car_totla: total
    });
    wx.setStorageSync('totles', total); //5,把购物车重新添加回缓存中

    wx.setStorageSync('cart', cart); //弹窗提示

    wx.showToast({
      title: '添加购物车成功',
      icon: "success",
      //防止用户手抖,频繁点击
      // mask:true,
      image: "../../images/action panel.png"
    });
  }
});
// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
    goods_id:"",
    goodsObj:""
  },
  onShow() {
    const address6 = wx.getStorageSync('address6')
    const address0 = wx.getStorageSync('address')
    if (address6.userName) {
      this.setData({
        address: address6
      })
    } else {
      this.setData({
        address: address0
      })
    }
    let cart = wx.getStorageSync("cart") || [];
    //过滤后的购物车数组
    cart = cart.filter(v=>v.checked)
    this.setCar(cart)
  },
  //设置购物车状态 同时重新计算 底部工具栏的数据 全选 总价 购买数量
  setCar(cart) {
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
    })
  },
  handlePay() {
    const {address} = this.data;
    //判断是否存在收货地址
    if (!address.userName) {
      wx.showToast({
        title: '请添加收货地址',
      })
      return;
    }
    wx.showToast({
      title: '暂未开通此功能',
    })
  },

  //编辑收货地址
  handleEditAddress() {
    wx.chooseAddress({
      success: (res) => {
        wx.setStorageSync('address6', res)
        this.setData({
          address: res
        })
      }
    })
  },
  /* 获取用户收货地址功能: wx.chooseAddress */
  handleChoose() {
    wx.getSetting({
      success: (res) => {
        const scopeAddress = res.authSetting["scope.address"];
        if (scopeAddress === false) {
          wx.openSetting({
            success: (res1) => {
              wx.chooseAddress({
                success: (result1) => {
                  wx.setStorageSync('address', result1)
                  this.setData({
                    address: result1
                  })
                },
              })
            }
          })
          return;
        }
        wx.chooseAddress({
          success: (result) => {
            //把获取的收货地址缓存起来
            wx.setStorageSync('address', result)
            this.setData({
              address: result
            })
          },
        })
      }
    })
  },
  onLoad: function (options) {
    let goodsObj = wx.getStorageSync('goodsObj')
     this.setData({
      goods_id:options.id,
      goodsObj
     })
  },
  //点击支付
  handleOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    console.log("已经存在token");

  }
})
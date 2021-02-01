// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
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


    const cart = wx.getStorageSync("cart") || [];
    this.setCar(cart)
  },
  //点击结算功能
  handlePay() {
    const {address} = this.data;
    //判断是否存在收货地址
    if (!address.userName) {
      wx.showToast({
        title: '请添加收货地址',
      })
      return;
    }
    //判断购物车是否为空
    if (this.data.totalNum === 0) {
      wx.showToast({
        title: '请选购商品',
      })
      return;
    }
    //若通过上述验证 则进入支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  },
  //商品选择切换功能
  handleItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    //获取购物车数组
    let {
      cart
    } = this.data;
    //找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id);
    //选中状态取反
    cart[index].checked = !cart[index].checked
    this.setCar(cart) //调用封装的setCar()函数
  },
  //商品数量编辑功能
  handleNumItemEdit(e) {
    //获取传递过来的参数
    const {
      id,
      operation
    } = e.currentTarget.dataset;
    //获取购物车数组
    let {
      cart
    } = this.data;
    //找到被修改商品的索引
    const index = cart.findIndex(v => v.goods_id === id)
    //判断是否执行删除
    if (cart[index].num === 1 && operation === -1) {
      //弹窗提示
      wx.showModal({
        content: '是否要删除该商品？',
        title: '提示',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.setCar(cart);
          } else if (res.cancel) {
            console.log("取消");
          }
        }
      })
      return;
    } else {
      //修改商品属性
      cart[index].num += operation;
      this.setCar(cart);
    }

  },
  //设置购物车状态 同时重新计算 底部工具栏的数据 全选 总价 购买数量
  setCar(cart) {
    //把购物车数量重新设置回data中和缓存中
    this.setData({
      cart
    }) //非必写
    wx.setStorageSync('cart', cart) //非必写
    let allChecked = true;
    //总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false
      }
    })
    //判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
  },
  //商品的全选功能
  handleItemAllChecked() {
    //获取data中的数据
    let {
      cart,
      allChecked
    } = this.data
    //修改全选的checked值
    allChecked = !allChecked
    //循环修改cart数组中每个商品的checked值 让它等于allChecked的值
    cart.forEach(v => v.checked = allChecked);
    //把上述修改后的值重新添加到data和缓存中
    this.setCar(cart) //调用封装的setCar()函数重新计算底部商品数据
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
  onLoad: function (options) {},
})
// pages/goos_detail/index.js
const app = getApp();
Page({
  data: {
    goodsObj:{},
    isIphoneX:{},
    Car_totla:0
  },
  //商品对象
  GoodsInfo:{},
  //商品收藏初始化
  isCollect:false,
  onShow(){
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    const {goods_id} = options; 
    this.getGoodsDetail(goods_id);
  },
  onLoad: function (options) {
    let cart_totals = wx.getStorageSync("totles")
    this.setData({
      Car_totla:cart_totals||0
    })
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
    let modelmes = wx.getStorageSync('modelmes');
    let isIphoneX = app.globalData.isIphoneX;
    this.setData({
      isIphoneX
    })
    // console.log(this.data.isIphoneX);
    
  },
   //获取商品详情数据
   getGoodsDetail(goods_id){
    let that = this;
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      data: {goods_id},
      success: (result) => {
        console.log(result);
        
        wx.setStorageSync('goodsObj', result.data.message)
        // console.log(result.data.message);
        this.GoodsInfo=result.data.message;
        //获取缓存中的收藏数组
          let collect = wx.getStorageSync('collect')||[];
        //判断当前商品是否被收藏
         let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);

        that.setData({
          //按需结构获取，减少小程序处理数据压力
          // goodsObj:result.data.message
          goodsObj:{
            goods_name:result.data.message.goods_name,
            goods_price:result.data.message.goods_price,
            //由于iphone机型不兼容webp图片格式,即对获取的结果进行处理
            // goods_introduce:result.data.message.goods_introduce,
            goods_introduce:result.data.message.goods_introduce.replace(/\.webp/g,'.jpg'),
            pics:result.data.message.pics
          },
          isCollect
        })
      },
    })
  },
  //商品详情轮播图放大预览
  handlePreviewImage(e){
    //构造预览数组
  const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
  //接收传递过来的图片url
  let current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls:urls // 需要预览的图片http链接列表
    })
  },
  handleCartAdd(){     
    //1,获取缓存中的购物车数组    
    let cart = wx.getStorageSync("cart")||[];
    //2,判断商品对象是否存在购物车数组中
    //findIndex:返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1
    //数组实例的find()方法，用于找出第一个符合条件的数组成员
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
      if(index===-1){
        //3,不存在 第一次添加
        this.GoodsInfo.num=1;
        this.GoodsInfo.checked=true;
        cart.push(this.GoodsInfo);            
      }else{
        //4,已经存在购物车数据,执行 num++
          cart[index].num++; 
      }
      let total = 0;
        cart.forEach(v=>{
          total+=v.num
        })
        this.setData({
          Car_totla:total
        })
        wx.setStorageSync('totles', total)
      
      //5,把购物车重新添加回缓存中
      wx.setStorageSync('cart', cart);
      //弹窗提示
      wx.showToast({
        title: '添加购物车成功',
        icon:"success",
        //防止用户手抖,频繁点击
        // mask:true,
        image:"../../images/action panel.png"
      })
  },
  //点击收藏功能
  handleCollect(){
    let isCollect = false;
    //获取缓存中的商品数组
    let collect = wx.getStorageSync("collect")||[];
    //判断该商品是否被收藏过
    let index = collect.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id);
    console.log(index);
    
    //当index!==-1表示已经收藏过了
    if(index !==-1){
      //此时应删除数组中的该商品
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title:"取消收藏"
      })
    }else{
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title:"收藏成功"
      })
    }
    //把数组存入到缓存中
    wx.setStorageSync("collect",collect)
    //修改data中的属性 isCollect
    this.setData({
      isCollect
    })
  }
})
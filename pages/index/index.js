Page({
  data: {
    dataList: [],
    floorList: [],
    //轮播图数组
    /*  swiperList: ["cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/huaweimate30.png",
       "cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/huaweip30.png",
       "cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/oppo.png",
       "cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/samsung.png"
     ], */
    cateList: ["cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/分类.png",
      "cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/秒杀活动1.png",
      "cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/超市购物车-购物车.png",
      "cloud://ls2622304857-zn58u.6c73-ls2622304857-zn58u-1302934638/母婴用品.png"
    ],
    text: ["分类", "秒杀", "超市", "母婴"],
    imgdata: [],
  },
  /* addImg() {
    wx.chooseImage({
      success: function (res) {
        console.log(res);
        wx.cloud.uploadFile({
          filePath: res.tempFilePaths[0],
          cloudPath: "nav.png",
          success(res) {
            console.log(res)
          }
        })
      }
    })
  }, */
  /*  addDate() {
     let db = wx.cloud.database();
     db.collection('swiper').add({
       data: {
         name: "liu_shuai",
         age: "999",
         sku: "handsome",
         imgsrc: "../../images/分类.png"
       },
       success(res) {
         console.log(res, "添加数据库成功")
       },
       fail(res) {
         console.log(res)
       }
     })
   }, */
  getSwiperData() {
    let db = wx.cloud.database();
    var that = this
    db.collection("swiperdata").get({
      success(res) {
        that.setData({
          dataList: res.data[0].message
        })
      }
    })
  },
  getFloorData() {
    let db = wx.cloud.database();
    var that = this
    db.collection("floordata").get({
      success(res) {
        that.setData({
          floorList: res.data[0].message
        })
        
      }
    })
  },
  onShareAppMessage(){
    return {
      title: '优购商城',
   /*    imageUrl:"http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000606013705_1_400x400.jpg" */
    }
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],      
    }),
    this.getSwiperData(),
      this.getFloorData()
    /* let db = wx.cloud.database();
    db.collection("swiperdata").get({
      success(res) {
        console.log(res.data[0].message),
          this.setData({
            dataList: res.data[0].message
          })
      }
    }); */
  },
})
// pages/category/index.js
Page({

  data: {
    leftMenuList: [],
    rightMenuList: [],
    //被点击左侧菜单active
    currentIndex: 0,
    //右侧内容的滚动条距离顶部距离
    // scrollTop:0,
    Cates: []
  },

  getLeftMenuList() {
    let db = wx.cloud.database()
    var that = this
    db.collection("categories").get({
      success(res) {
        /* console.log(res.data[0].message) */
        that.Cates = res.data[0].message
        /* 把接口的数据存入到本地存储中 */
        wx.setStorageSync('cates', {
          time: Date.now(),
          data: that.Cates
        })
        /* 构造左侧菜单列表 */
        let leftMenuList = that.Cates.map(v => v.cat_name)
        /* 构造右侧商品数据 */
        let rightMenuList = that.Cates[0].children;
        that.setData({
          leftMenuList,
          rightMenuList
        })
      }
    })
  },
  //左侧菜单的点击事件
  handleItemTap(e) {
    /* 1,获取被点击事件的索引值
      2,给data中的currentIndex赋值
      3,根据不同的索引渲染不同的内容
    */
    const {index} = e.currentTarget.dataset
    let rightMenuList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightMenuList
    })
  },
  onLoad: function (options) {
    // scrollView.showsVerticalScrollIndicator = no;
    /*1,判断本地存储是否有旧的数据
      2,若没有旧的数据则发送请求
      3,若有数据，且旧的数据没有过期,则使用本地存储中的数据
    */
    //获取本地存储数据
    const Cates = wx.getStorageSync("cates");
    //判断
    if (!Cates) {
      this.getLeftMenuList()
    } else {
      /* 判断旧的数据是否过期 */
      if (Date.now() - Cates.time > 1000 * 3600) {
        this.getLeftMenuList()
      } else {
        /* 可以使用旧的数据 */
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightMenuList = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightMenuList,
          // scrollTop: 0
        })
      }
    }
  },
})
"use strict";

// pages/category/index.js
Page({
  data: {
    leftMenuList: [],
    rightMenuList: [],
    //被点击左侧菜单active
    currentIndex: 0,
    Cates: []
  },
  getLeftMenuList: function getLeftMenuList() {
    var db = wx.cloud.database();
    var that = this;
    db.collection("categories").get({
      success: function success(res) {
        /* console.log(res.data[0].message) */
        that.Cates = res.data[0].message;
        /* 构造左侧菜单列表 */

        var leftMenuList = that.Cates.map(function (v) {
          return v.cat_name;
        });
        /* 构造右侧商品数据 */

        var rightMenuList = that.Cates[0].children;
        that.setData({
          leftMenuList: leftMenuList,
          rightMenuList: rightMenuList
        });
      }
    });
  },
  //左侧菜单的点击事件
  handleItemTap: function handleItemTap(e) {
    /* 1,获取被点击事件的索引值
      2,给data中的currentIndex赋值
      3,根据不同的索引渲染不同的内容
    */
    var index = e.currentTarget.dataset.index;
    var rightMenuList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightMenuList: rightMenuList
    });
  },
  onLoad: function onLoad(options) {
    /*1,判断本地存储是否有旧的数据
      2,若没有旧的数据则发送请求
      3,若有数据，且旧的数据没有过期,则使用本地存储中的数据
    */
    // this.getLeftMenuList()
  }
});
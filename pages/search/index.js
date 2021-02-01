Page({
  data: {
    search_list: [],
    //取消按钮
    isFocus:false,
    inputVal:''
  },
  TimeId:-1,
  cancelBtn(){
    this.setData({
      isFocus:false,
      search_list:[],
      inputVal:''
    })
  },
  //输入框的值改变触发事件
  handleInput(e) {
    //检测输入框的值
    const { value } = e.detail;
    const query = value
    //检测合法性 !value.trim()表示不合法
    if (!query.trim()) {
      this.setData({
        search_list:[],
        isFocus:false
      })
      return;
    }
    //显示取消按钮
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(()=>{
      wx.showLoading({
        title: '加载中...',
      })
       //发送请求获取数据
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/qsearch',
      data: { query },
      success: (result) => {
        if (result.data.meta.status == 200) {
          wx.hideLoading();
          const search_list = result.data.message
          this.setData({
            search_list
          })
        }
      },
    })
    },1000)
  }
})
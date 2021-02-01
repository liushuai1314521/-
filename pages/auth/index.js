// pages/auth/index.js
Page({
  data:{
    token:""
  },
  //获取用户信息
  async handleGetUserInfo(e) {
    const {encryptedData,rawData,iv,signature} = e.detail
    const {code} = await wx.login({});
    const loginParams = {encryptedData,rawData,iv,signature,code}
    //获取openid和session_key
    // wx.request({
    //   url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxe6726a050d230a92&secret=0a44b0133ee911f70a1afe7a66f50c7b&js_code=${code}&grant_type=authorization_code`,
    //   success: (result) => {
    //     console.log(result);  
    //   },
    // })
    //发送请求 获取用户的token
    //注：如果不是企业微信 则不能获取到下面res.data里面的值(token)
    //假如这是企业微信 以下是获取token的正常流程
    wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
        data: loginParams,
        method: "post",
        success: (res) => {
          //由于此账号不是企业号 下面的token是模拟的token
          const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYTZlZmEyNjIzZjFjMWFkODczNmM5YSIsImlhdCI6MTU5NzM3Njk3N30.TLrVpFOVV46IgwAGrnt00Adov14-nIKzM2RPkx95XLM";
          wx.setStorageSync('token', token);
          wx.showToast({
            title: '授权成功',
            icon: "success",
            image: "../../images/action panel.png"
          })
        }
      })
      wx.navigateBack({
        //delta的值为1 则代表返回上一层,2代表返回上两层，以此类推
        delta: 1,
      })
        //创建订单
      //准备请求头参数
      //此处由于是异步请求 不能拿到token的值,需要借用es7语法,async await语法来获取
      const header = {Authorization:token}
      console.log(header);
    
     
   
    
   
  }
})
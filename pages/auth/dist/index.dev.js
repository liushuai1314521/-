"use strict";

// pages/auth/index.js
Page({
  //获取用户信息
  handleGetUserInfo: function handleGetUserInfo(e) {
    var _e$detail, encryptedData, rawData, iv, signature, _ref, code, loginParams;

    return regeneratorRuntime.async(function handleGetUserInfo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _e$detail = e.detail, encryptedData = _e$detail.encryptedData, rawData = _e$detail.rawData, iv = _e$detail.iv, signature = _e$detail.signature;
            _context.next = 3;
            return regeneratorRuntime.awrap(wx.login({}));

          case 3:
            _ref = _context.sent;
            code = _ref.code;
            loginParams = {
              encryptedData: encryptedData,
              rawData: rawData,
              iv: iv,
              signature: signature,
              code: code
            };
            console.log(loginParams); //发送请求 获取用户的token

            /* wx.request({
              url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
              data: loginParams,
              method: "post",
              success: (res) => {
                console.log(res.data);
              }
            }) */

          case 7:
          case "end":
            return _context.stop();
        }
      }
    });
  }
});
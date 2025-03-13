Page({
  onLoad() {
    // 直接跳转到chatBot页面
    wx.redirectTo({
      url: '/pages/chatBot/chatBot'
    });
  }
});

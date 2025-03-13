// pages/chatBot/chatBot.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    chatMode: "bot", // bot 表示使用agent，model 表示使用大模型
    showBotAvatar: true, // 是否在对话框左侧显示头像
    agentConfig: {
      botId: "bot-48233905", // agent id,
      allowWebSearch: true, // 允许客户端选择启用联网搜索
      allowUploadFile: true, // 允许上传文件
      allowPullRefresh: true // 允许下拉刷新
    },
    modelConfig: {
      modelProvider: "hunyuan-exp", // 大模型服务厂商
      quickResponseModel: "hunyuan-lite", // 快速响应模型 （混元 turbo, gpt4 turbo版，deepseek v3等）
      logo: "", // model 头像
      welcomeMsg: "欢迎语", // model 欢迎语
    },
    chatHistory: [], // 添加聊天记录
    pageSize: 50, // 每页显示的消息数量
    currentPage: 1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.memoryMonitorInterval = setInterval(() => {
      wx.getPerformance({
        success: (res) => {
          console.log('Memory usage:', res.memory);
          if (res.memory > 800) {
            wx.showToast({
              title: '内存占用过高',
              icon: 'none'
            });
          }
        }
      });
    }, 5000);
  },

  onHide() {
    if (this.memoryMonitorInterval) {
      clearInterval(this.memoryMonitorInterval);
      this.memoryMonitorInterval = null;
    }
  },

  onUnload() {
    if (this.memoryMonitorInterval) {
      clearInterval(this.memoryMonitorInterval);
      this.memoryMonitorInterval = null;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  // 添加分页加载方法
  loadMoreMessages() {
    if (this.data.chatHistory.length > this.data.pageSize * this.data.currentPage) {
      this.setData({
        currentPage: this.data.currentPage + 1
      });
    }
  },
  // 清理历史记录
  clearChatHistory() {
    this.setData({
      chatHistory: []
    });
  }
});

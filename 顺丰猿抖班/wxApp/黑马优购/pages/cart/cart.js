// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{}
  },
  //点击获取收获地址事件
  handleChooseAddress(){
    wx.chooseAddress({
      success: (address) => {
        console.log(address);
        wx.setStorageSync("address", address);
      }
    });

    // wx.getSetting({
    //   success: (result) => {
    //     console.log(result);
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });
      
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     // 1 获取缓存中的收货地址信息
     const address = wx.getStorageSync("address");
     // 1 获取缓存中的购物车数据
    //  const cart = wx.getStorageSync("cart") || [];
 
     this.setData({ address });
    //  this.setCart(cart);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
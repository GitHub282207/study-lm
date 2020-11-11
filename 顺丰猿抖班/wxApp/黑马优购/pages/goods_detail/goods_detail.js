// pages/goods_detail/goods_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },  

  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id}=options;
    // console.log(goods_id);
    this.getGoodsDetail(goods_id);
  },

   // 获取商品详情数据
  getGoodsDetail(goods_id) {
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
      data: {goods_id},
      success: (result) => {
        console.log(result);
        this.GoodsInfo=result.data.message;

        this.setData({
          goodsObj:result.data.message
        })
      }
    });
      
  },

  // 点击轮播图 放大预览
  handlePreviewImage(e) {
    //  console.log("dianji");
    // 1 先拿到要预览的图片数组 
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 2 接收传递过来的图片url 自定义属性
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });

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
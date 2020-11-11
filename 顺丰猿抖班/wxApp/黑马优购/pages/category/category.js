// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList:[],
    // 右侧商品数据
    rightContent:[],
    // 被点击左侧菜单的索引
    currentIndex:0,
     // 右侧内容的滚动条距离顶部的距离
     scrollTop: 0
  },

  //接口的返回数据
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCates();
  },

  // 获取分类数据
  getCates(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success: (result) => {
        // console.log(result);
        this.Cates=result.data.message;

        //左侧大菜单数据
      let leftMenuList=this.Cates.map(item=>item.cat_name)
        //右侧商品数据 Cates[0]大家电下的children
      let rightContent=this.Cates[0].children
          this.setData({
          leftMenuList,
          rightContent
          })
      }
    });
      
  },
 
    // 左侧菜单的点击事件
    handleItemTap(e) {
      // console.log(e);
      const { index } = e.currentTarget.dataset;
      // 右侧列表商品随着左侧点击菜单变化而变化，关键在于拿到的index，接着让商品展示
      let rightContent=this.Cates[index].children
      this.setData({
        currentIndex: index,
        rightContent,
        // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
        scrollTop: 0
      })


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
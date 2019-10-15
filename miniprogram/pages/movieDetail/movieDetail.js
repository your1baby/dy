  // pages/movieDetail/movieDetail.js
// 创建数据库对象
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 查询云数据库 mymovie
     db.collection("mymovie")  //指定集合
     .get()                    //查询
     .then(res=>{              //查询成功
       console.log(res);       //返回结果
      // 2.在当前对象data中添加属性 list
      // 3.将云数据库返回值保存list
       this.setData({
         list:res.data         //保存数据
       })
      //  console.log(list)
     })
     .catch(err=>{
       console.log(err)
     })
    //  console.log(this.data.list);
    // 4.在模板页面显示电影列表
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
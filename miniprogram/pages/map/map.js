// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    polyline:[
      {
        points:[
          {longitude: 116.300901,latitude:39.916085},
          {longitude:116.346685,latitude:39.913702},
        ],
        color:"#0i0",
        width:10
      },
    ],
    // 地图上显示的控件
    conrtols:[
      {
        id:0,//控件id数值
        iconPath:"/images/blue.png",
        position: {  //控件坐标
          left: 110,  //左侧位置 
          top: 200,    //顶端位置
          width:15,
          height:15,
        }
      },
    ],

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
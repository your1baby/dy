// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pno:0 , //pon 页码 1 2 3 
    list:[]
  },
  jumpComment(event){
  // 功能: 点击跳转
  // 获取当前电影的id
  var id=  event.target.dataset.id;
  console.log(id);
  // 2.跳转comment组件
  // 关闭跳转
  // wx.redirectTo({
  //   url: '/pages/comment/comment?id='+id,
  // })
  // 保留跳转
  wx.navigateTo({
    url: '/pages/comment/comment?id=' + id,
  })
},
 loadMore(){
  //  下一页
   var pno = this.data.pno + 1;   //当前页加一
   this.setData({                 //修改data代码
     pno:pno
   })
  //  offset偏移量
  var offset=( pno - 1 ) * 4 
  // 功能 调用云函数完成数据加载
  // 1.调用云函数
   wx.cloud.callFunction({
     name: "movielist",  //调用云函数的名称
     data: {
       start: offset,         //参数:起始行数
        count: 4          //几条记录
     }
   }).then(res => {       //成功回调
    //  console.log(res);
    // 豆瓣发字符串 ->云函数也返回字符串
    // 字符串string转换js对象
     var rows = JSON.parse(res.result);//云函数返回结果
    //  云函数返回结果
    // 输出电影列表
    var lists=this.data.list.concat(rows.subjects); 
    //  console.log(rows.subjects);
     this.setData({
       list:lists
     })
   }).catch(err => {
     console.log(err)
   })
 },
    //  2.返回云函数返回结果
    // 3.将返回结果保存到data中
    // 4.显示电影列表

  onLoad: function (options) {
      this.loadMore();
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
    console.log(123)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
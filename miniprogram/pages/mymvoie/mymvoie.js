// pages/mymvoie/mymvoie.js
const db = wx.cloud.database(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movienname: '', //用户喜欢电影的名称  
    content:'',    //用户的点评
    images:[],      //获取上传图片
    fileIds:[],     //保存上传文件id
  },
  submit(){
    if(this.data.images.length==0){
      wx.showToast({
        title: '请选择图片',
        image:'../../images/err.png'
      })
      return;
    }
    // 提交
    // 功能一：将选中的图片上传到云存储
    // 1.显示数据加载提示框
     wx.showLoading({
       title: '正在上传...',
     })
    //  2.创建数组 保存promise对象
    var rows=[];
    // 创建循环遍历选中图片
    for(var i=0;i<this.data.images.length;i++){
      //  创建Promise对象上传
      rows.push(new Promise((resolve,reject)=>{
        // 获取当前文件夹名
        var item= this.data.images[i]
        // 获取后缀
        var suffix = /\.\w+$/.exec(item)[0]
        // 创建新文件名 时间+随机数+后缀
        var newfile=new Date().getTime;
        newfile+= Math.floor(Math.random()*9999);
        newfile+=suffix;
            // 上传图片
            wx.cloud.uploadFile({
              cloudPath: newfile, // 设置新文件名
              filePath: item,  // 设置需要上传的图片
              success: (res => {  // 上传成功回调函数
                // 在data属性中添加数组 fileIds 保存文件的id
                //  上传成功将fileID保存
                var fid = res.fileID;
                this.data.fileIds.push(fid);
                // 上传成功后执行 解析
                resolve();
              })
            })
            
      }));//promise end
    }//end for

    // 功能二：将用户信息fileid添加云数据库
    Promise.all(rows).then(res=>{


      // 获取用户留言
      var msg = this.data.content;
      // 当前电影名称
      var name= this.data.movienname;
      // 获取上传图片filesIds
      var fileid=this.data.fileIds;
      // 创建数据库对象

      // 云数据库控制台创建集合 :mymovie
      // 向mymovie集合中添加一条记录
      db.collection('mymovie').add({
        data:{
          msg: msg,
          name: name,
          fileid: fileid,
        }
      }).then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '上传成功~',
          image: '../../images/ok.png'
        })
      }).catch(err=>{
        console.log(err);
      })
   })    
    // 添加成功
    // 隐藏加载提示框
    // 显示短消息提示框
  },

  jumpDetail(){
    // 跳转电影详情列表
    // 1.创建新数组 movieDetail
    // 2.查询云数据库 mymovie
    // 3.在当前对象data中添加属性 list
    // 4.将云数据库返回值保存list
    // 5.在模板页面显示电影列表
    wx.navigateTo({
      url: '/pages/movieDetail/movieDetail',
    })
  },
  upload(){
    wx.showLoading({
      title: '正在加载...',
    }),
    wx.chooseImage({
      count:9,                              //选中9张图片
      sizeType: ["original", "compressed"], //图片来源
      sourceType: ["album", "camera"],      //图片类型
      success: (res)=> {                    //选择成功
        // 获取选中图片路径
        // var list = this.data.images.concat(res.tempFilePaths)
        var list = res.tempFilePaths;
        // console.log(list)
        // 将选中图片显示到页面
        this.setData({
          images:list
        })
        // 隐藏正在加载提示框
        wx.hideLoading()
      },
    })
  },
  onChangeContent(event){
    //  功能:当用户输入原因内容时触发事件
    this.setData({
      content:event.detail
    })
  },
  onChangeMname(event){
    // 功能:修改电影名称
    this.setData({
      movienname:event.detail
    })
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
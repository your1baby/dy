// pages/comment/comment.js
const db =wx.cloud.database(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieid:25779217, //电影id
    value: 3,        //保存分数
    value2: '',      //保留用户评论信息
    detail:{} ,      //js对象当前电影信息
    images:[] ,       //保存预览图片
    fileIds: [],      //上传文件id
  
  },
  comment(){
    // 0 判断如果当前用户没有选择图片(可选)
    if(this.data.images.length==0){
      // 1. 提示请选择图片
      wx.showToast({
        title: '请选择图片',
      })
      // 2. 停止函数执行
      return;
    }
    // 功能
    // (1).获取用户评论信息
    // (2).上传多张图片
    // (3).将用户的评论信息与图片的fileID保存云数据库
      // 1.在云数据库中创建集合comment 
      // 2.data中添加属性 fileIds  上传文件id
      // 3.显示数据加载的提示框
        wx.showLoading({
          title: '评论上传中...',
        })
      // 4.创建数组 rows 保存Promise对象
      var rows=[];
      // 5.创建循环遍历每一张选中的图片
      for(var i=0;i<this.data.images.length;i++){
        // 6.为每张创建Promise对象完成上传 上传一张
        //  rows+=k
         rows.push(new Promise((resolve,reject)=>{
          // 6.1 获取当前图片的名称
          var item=this.data.images[i];
          // 6.2 获取后缀(拆分/搜索/正则)
          //123.jpg  jpg=>exec()=>[.png]
          var suffix= /\.\w+$/.exec(item)[0]
          // 6.3 创建新文件名 时间+随机数
          // var newFile=new Date().getTime().Math.floor(Math.random()*9999)+suffix;
           var newFile = new Date().getTime;
           newFile += Math.floor(Math.random() * 9999);
           newFile += suffix;
          // 6.4 上传一张图片
           wx.cloud.uploadFile({

             cloudPath:newFile, // 设置新文件名
             filePath: item,  // 设置需要上传的图片
             success: (res => {  // 上传成功回调函数
                // 6.5 在data属性中添加数组 fileIds 保存文件的id
                // 6.6 上传成功将fileID保存
                var fid=res.fileID;
                this.data.fileIds.push(fid);
                // 6.7 上传成功后执行 解析
                resolve();
             })
           })
         }))//push end
           
        }
      //功能三 将用户评论信息与图片fileID保存云数据库
      // 1.创建数据库对象
      // 1.1 等待所有promise执行完成之后
      //      才执行以下代码
      Promise.all(rows).then(err=>{

        // 2.获取用户评论内容
        var content=this.data.value2;
        // 3.获取用户评分
        var  score=this.data.value;
        // 4.当前电影id
        var  id=this.data.movieid;
        // 5.图片fileIds
        var  list=this.data.fileIds;
        // 6.添加集合 comment
        db.collection('comment').add({
          data:{
            content:content,
            score:score,
            movieid:id,
            fileIds:list
          }
        }).then(res=>{
        // 7.添加成功 隐藏加载提示框
            wx.hideLoading();
        // 8.提示评论成功 
            wx.showToast({
              title: '发表成功',
            })
        }).catch(err=>{

        })
      })
      
      
          
  },
  uploadFile() {
    // 功能 选中图片并且实现预览图片
    wx.chooseImage({
      count: 9,   // 2.选中9张图片
      sizeType: ["original", "compressed"],  // 3.设置图片类型,原图/压缩图
      sourceType: ["album", "camera"],  // 4.设置图片来源相机/相册
      success:(res)=>{         // 5.选中成功
        // 6.获取选中图片路径
        // var list= res.tempFilePaths;
        var list = this.data.images.concat(res.tempFilePaths)
        console.log(list)
        // 7.保存data中images属性
        this.setData({
        // 8.在模板中显示选中图片列表
          images: list
        })
      },
    })
  },

  onChange(event) {
    this.setData({
      value: event.detail
    });
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    // console.log(event.detail);
    this.setData({
      value2:event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    // 功能 获取hom组件传递id并且保存
    this.setData({
      movieid:options.id
    })
    this.loadMore();
  },
  loadMore(){
    // 功能:组件创建成功后调用云函数
    // 1. 获取用户选中电影id
    var id=this.data.movieid;
    console.log(id)
    // 2. 显示数据加载提示框
    wx.showLoading({
      title: '正在加载中...',
    })
    // 3. 调用云函数fiingDetail
    wx.cloud.callFunction({
      name:"findDetail",
      data:{id:id}
    }).then(res=>{
       console.log(res);
    // 4. 获取云函数返回的数据
    var  obj=JSON.parse(res.result);
    // 5. 保存detail:{}
    this.setData({
      detail:obj
    })
    // 6. 隐藏加提示框
      wx.hideLoading();
    }).catch(err=>{
       console.log(err);
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
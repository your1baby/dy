// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 
const rp=require("request-promise")

//1:引入request-promise库
// const rp = require("request-promise");
//2:创建url
exports.main = async (event, context) => {
  var url = `http://api.douban.com/v2/movie/subject/`;
  url +=`${event.id}`
  url += `?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  //3:发送ajax  注意两个return
  return rp(url).then(res => {
    return res;
  }).catch(err => {
    console.log(err);
  })
}

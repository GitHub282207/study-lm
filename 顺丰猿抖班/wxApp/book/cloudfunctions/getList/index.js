// 云函数入口文件
// 爬数据的前期准备工作 安装东西 在目标云函数getList文件夹下开终端 每个云函数度需要自己的package.json  先npm init -y 初始化
// 再npm install request-promise  再npm install cheerio  再npm install superagent-charset  再npm install superagent 
// 安装完然后云函数的文件夹下会有node_modules
const cloud = require('wx-server-sdk')
const rp = require('request-promise')//http模块
const cheerio = require('cheerio')//帮助我们准确的读懂页面的html结构
let charset = require('superagent-charset')//解决乱码
let superagent = require('superagent')//发起请求
charset(superagent)//解决请求的乱码
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let serverUrl = "https://wap.biqiuge8.com/"//要爬取的数据的地址
  // superagent.get(serverUrl)朝该地址请求 result是请求到的数据 分段请求到的是整个页面的html结构
  const result = await  superagent.get(serverUrl).charset('gb2312')//取决于网页的编码方式
  const data = result.text || ''
  const $ = cheerio.load(result.text)//用cheerio读取整份html文件，然后声明成一个$，然后可以用cheerio的语法取用Html结构


  //热门推荐
  let hotList = $('.hot').find('.image')//是数组，有4个
  let hotData =[] //热榜
  // 取每一条数据里面的a标签里面的src属性
  for(let i=0;i<hotList.length;i++){
    let obj = {};
    obj['url'] = $(hotList[i]).find('a').attr('href')
    obj['imgurl'] = $(hotList[i]).find('img').attr('src')
    obj['name'] = $(hotList[i]).find('img').attr('alt')
    // .next()取兄弟节点 因为hotList不包含dl  .text()找里面的内容
    obj['author'] = $(hotList[i]).next().find('dt').find('span').text()
    obj['detail'] = $(hotList[i]).next().find('dd').text()
    hotData.push(obj)//for循环会循环4次，每一次会拿到一个obj对象，再把它添加到hotData数组里面，每个对象是一本书的详情
  }

  // 分类推荐  从.block这块html结构开始扒
  let classifyList = $('.block')
  let classifyData = [] // 分类
  for (let i = 0; i < classifyList.length; i++) {
    let obj = {}
    let childData = []
    let childDom = $(classifyList[i]).find('.lis').find('li')
    for (let j = 0; j < childDom.length; j++) {
      let childObj = {}
      childObj['name'] = $(childDom[j]).find('.s2').find('a').text()
      childObj['url'] = $(childDom[j]).find('.s2').find('a').attr('href')
      childObj['author'] = $(childDom[j]).find('.s3').text()
      childData.push(childObj)
    }
    obj['classifyList'] = $(classifyList[i]).find('h2').text()
    obj['data'] = childData
    classifyData.push(obj)
  }
  
  return{
    hotData,
    classifyData
  }

}
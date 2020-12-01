const addLog = {
  updated () {
    console.log('数据发生变化')
  }
}

const app = {
  created () {
    console.log('我是扩展的created')
  }
}
// export default抛出一个值，module.export以对象的形式可抛出多个值，页面引入也一样
module.export = { addLog, app }

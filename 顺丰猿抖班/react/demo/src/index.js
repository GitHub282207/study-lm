// 入口文件，vue里面的main.js
import React from 'react'
import ReactDom from 'react-dom'
// import App from './components/App'//App为组件
import Eat from './components/eat'


ReactDom.render(<Eat/>,document.getElementById('root'))//两个参数，谁，去哪

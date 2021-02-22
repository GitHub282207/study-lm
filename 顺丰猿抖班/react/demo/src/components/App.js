import React,{Component} from 'react'
//{Component} => const Component = React.Component

class App extends Component{//从组件继承过来的模板
    render(){
        return(//jsx语法  react的特色  是xml(html的前身)<>括号+js{}括号  方便创建虚拟dom结构
            // <div>hello world</div>
            <ul className="items">
                <li>vue</li>
                <li>react</li>
                <li>{false ? 'react':'REACT'}</li>
            </ul>
        )
    }
}

export default APP  
// 抛出该组件，入口文件的引入才能生效
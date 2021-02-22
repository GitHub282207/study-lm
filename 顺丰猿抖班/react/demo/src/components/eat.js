// eat组件  imrc引入快捷键  

// cc组件快捷键
// class  extends Component {
//     state = {  }
//     render() { 
//         return (  );
//     }
// }

// export default ;
import React, { component, Fragment } from 'react'
import EatItem from './eatItem'
import '../style/eat.css'

class Eat extends Component {//类编程    还有一种函数式编程  方便维护
    // 构造函数里面放数据
    constructor(props) {
        super(props)
        this.state = {//相当于vue的数据源   数据源绑定到jsx里面
            inputValue: 'hello',
            list: ['宫保鸡丁', '醋溜肥肠']
        }
    }

    inputChange(e) {
        // console.log(e);
        // this.state.inputValue = e.target.value
        this.setState({
            inputValue = e.target.value
        })
    }

    addList() {
        this.setState({
            list: [...this.state.list, this.state.inputValue]
        })
    }

    deleteItem(index) {
        console.log(index);
        // 再根据下标移除数据
        // this.state.list.splice(index,1) 不能这么写  react禁止直接操作数据源，性能会很差，必须要this.setState
        let list = this.state.list
        list.splice(index, 1)//splice才能修改原数组
        this.setState({
            list: list
        })
    }

    render() {
        return (
            // <div>
            // Fragment分段  解决jsx里面的必须要有一层空容器包裹的问题
            //  数据源绑定到jsx里面 {inputValue}  jsx里面放上花括号就会被当做js语法处理  this.state.inputValue取值
            // input的onchange事件  字面量方法{this.inputChange} 而不是字符串"inputChange"
            // this.inputChange.bind(this),因为inputchange事件是在jsx里面调用，所以this指向需要重新绑定，否则为undifine
            <Fragment>
                <div>
                    {/* <label for="addGoods">加菜：</label> */}
                    <input id="addGoods" className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} ></input>
                    <button onClick={this.addList.bind(this)}>下单</button>
                </div>
                <ul>
                    {
                        // <li>宫保鸡丁</li>
                        // <li>醋溜肥肠</li>
                        // 没有v-if,只能原生js实现循环动态渲染  jsx实现循环输出
                        // dangerouslySetInnerHTML相当于v-HTMLAllCollection,易遭受跨站脚本攻击 输入框植入script脚本自执行


                        this.state.list.map((item, index) => {
                            {/*return <li key={index+item} onClick={this.deleteItem.bind(this,index)} dangerouslySetInnerHTML={{__html:item}}></li>*/ }
                            return (
                                <div key={index + item}>
                                    {/* 给子组件传值 */}
                                    <EatItem content={item} list={this.state.list} index={index} deleteItem={this.deleteItem.bind(this)}/>
                                </div>
                            )

                        })

                    }
                </ul>
            </Fragment>
            // </div>
        )
    }
}

export default Eat
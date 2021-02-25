import React, { Component } from 'react';
class EatItem extends Component {
// 构造函数  不属于react生命周期函数 不是react独有  是es6的基本语法
    // constructor(props){ //不用bind方法
    //     super(props)
    //     this.handleClick =  this.handleClick.bind(this)
    // }
    state = {  }

    componentWillMount(){//只在页面刷新的时候执行一次 1
        console.log('componentWillMount--组件将要挂载到页面');
    }

    componentDidMount(){//只在页面刷新的时候执行一次 3
        console.log('componentDidMount--组件挂载完成');
    }
// 数据发生变化才会走这个周期函数  返回bool值  false时会阻止下一个组件的渲染
    shouldComponentUpdate(){//4
        console.log('shouldComponentUpdate--组件发生改变之前执行');
        return true
    }

    componentWillUpdate(){//5
        console.log('componentWillUpdate--组件更新之前执行');
    }

    componentDidUpdate(){//7
        console.log('componentDidUpdate--组件更新完成');
    }

    handleClick(){
        console.log(this.props.index);//此时函数内部没有使用this
        this.props.deleteItem(this.props.index)

    }


    render() { //属于生命周期函数  数据源state或者props发生变化，就会重新执行的生命周期 2  6
        console.log('render--组件挂载中');
        return ( 
            <li onClick={this.handleClick.bind(this)}>{this.props.content}</li>
         );
    }
}
 
export default EatItem;

// 作为eat的子组件使用

//  菜单渲染   父子组件的传值  靠属性传值，props 接收  this.props.content


//  删除   子组件向父组件传值  vue 子组件$emit抛出  但react子组件不能直接更改父组件的数据，需要迂回操作
// 把父组件里面的方法传递给子组件使用
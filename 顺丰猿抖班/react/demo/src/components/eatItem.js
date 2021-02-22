import React, { Component } from 'react';
class EatItem extends Component {

    // constructor(){ //不用bind方法
    //     super(props)
    //     this.handleClick =  this.handleClick.bind(this)
    // }
    state = {  }

    handleClick(){
        console.log(this.props.index);//此时函数内部没有使用this
        this.props.deleteItem(this.props.index)

    }


    render() { 
        return ( 
            <li onClick={this.handleClick.bind(this)}>{this.props.content}</li>
         );
    }
}
 
export default EatItem;

// 作为eat的子组件使用

//  菜单渲染   父子组件的传值  靠属性传值，props 接收  this.props.content


//  删除   子组件向父组件传值  vue 子组件$emit抛出  但react子组件不能直接更改父组件的数据，需要迂回操作
把父组件里面的方法传递给子组件使用
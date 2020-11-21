//源码没有this
let foo = {
    value:1,
    getValue:() => {console.log(this.value)},//没有加{}自动return  打印undefine
    getValue:function(){console.log(this.value)},//1
    getValue:() => {console.log(this)},//this 默认绑定window
    getValue:() => console.log(this.value)//没有加{}自动return  箭头函数没有this 可以写成foo.value
}

foo.getValue()
foo.getValue.call(foo)//掰 不行


function Foo(){
    this.value = 1
}

Foo.prototype.getValue = function(){
    console.log(this.value);
}//1
Foo.prototype.getValue = () =>console.log(this.value);//undefine
let foo = new Foo
// foo={
//     value:1
//     getValue:function(){
//         console.log(this.value);
//     }
// }
// foo={
//     value:1
//     getValue:()=>{
//         console.log(this.value);
//     }
// }
foo.getValue()//原型继承



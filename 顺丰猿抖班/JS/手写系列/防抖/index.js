//在一定的时间内，如果持续发送请求，就一直不执行，在规定的时间内，没有第二次操作，才执行
function debounce(fn,delay){
    let timer = null

    return function(){
        let arg = arguments
        clearTimeout(timer)
        timer = setTimeout(()=>{//箭头函数不会干扰this作用域，因为箭头函数源码里面没有this关键字
            fn(arg)
        },delay)
    }
    //不用箭头函数导致更改了this作用域的方法
    // return function(){
    //     let context = this
    //     let arg = arguments
    //     clearTimeout(timer)
    //     timer = setTimeout(function(){//箭头函数不会干扰this作用域，因为箭头函数源码里面没有this关键字
    //         fn.apply(context,arg)
    //     },delay)
    // }
}
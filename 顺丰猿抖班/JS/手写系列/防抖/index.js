// 在一定的时间内，如果持续请求，就一直不执行，在规定的时间没有第二次操作才执行
function debounce(fn, delay) {
  let timer = null
  return function () {//return会形成闭包，timer变量不会被垃圾回收机制回收，同时timer会拿到每一次的定时器，在清除上一次的定时器
    let context = this//this代表btn
    let arg = arguments//拿到fn函数里面的参数
    clearTimeout(timer)
    timer = setTimeout(() => {//箭头函数不会干扰this，源码里面没有this单词
      fn.apply(context, arg)//确保fn的this作用域不会被更改,还是指向btn
    }, delay)
  }

}

// 第二次的点击事件执行的时候，把上一次的定时器清空，怎么保证下一次点击还能留住上一次的定时器呢？闭包，能够保留作用域
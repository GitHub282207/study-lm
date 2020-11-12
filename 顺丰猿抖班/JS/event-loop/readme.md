# 进程与线程的区别
    进程：cpu在运行指令及加载和保存上下文所需要的时间
    线程：是进程中更小的单位，描述了执行一段指令所需的时间

# JS单线程带来什么好处
节省内存，更安全的渲染，不会出现冲突

# 执行栈
执行栈可以认为是一个存储函数调用的栈结构

# event loop
微任务：process.nextTick,promise.then, metationObserver
宏任务：script,settimeout,setinterval,setimmediate,I/O,UI-rendering

执行顺序：
   1 首先执行同步代码，这属于宏任务
   2 当执行完所有的同步代码后，执行栈为空，接着去查看是否有异步代码需要执行  异步代码分为微任务和宏任务
   3 执行所有的微任务
   4 当所有微任务执行完后，有必要的话就会开始渲染页面
   5 然后开始下一轮的event-loop，执行宏任务中的异步代码，
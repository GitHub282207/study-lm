async function async1() {
    console.log('async1 start');//2
    await async2();//立即执行
   }
   async function async2() {
    console.log('async2 start');// 3
    return new Promise((resolve, reject) => {
     resolve();
     console.log('async2 promise');// 4
    })
   }
   console.log('script start'); //1
   setTimeout(function() {  //宏任务
    console.log('setTimeout');//9
   }, 0);  
   async1();
   new Promise(function(resolve) {
    console.log('promise1');// 5 
    resolve();
   }).then(function() {
    console.log('promise2');//微任务2 7
   }).then(function() {
    console.log('promise3');//微任务2 8
   });
   console.log('script end');//  6

// script start 
// async1 start
// async2 start   
// async2 promise
// promise1
// script end
// promise2
// promise3
// setTimeout


// console.log(1);//
// async function bar() {
//   await fn()//立即执行
//   console.log(6);// 变成异步，微任务队列   队列，先进先出
// }
// function fn() {
//   console.log(7);//
// }
// function foo() {
//   return new Promise((resolve) => {
//     console.log(2);//
//     resolve()
//   })
// }
// bar()
// console.log(3);//

// foo().then(() => {
//   console.log(4);//微任务队列
// })
// console.log(5);//    1732564
const PENDING = 'pengding'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn){
    const that = this
    that.value = null //存储函数的参数
    that.resolvedCallBack = [] //存储.then的第一个回调函数
    that.rejectedCallBack = [] //存储.then的第二个回调函数
    that.state = PENDING   //定义一个开关变量

    
    try {
        fn(resolve,reject)  //执行promise的回调函数
    } catch (error) {
        reject(error)
    }

    function resolve(value){
        if(that.state === PENDING){//确保不可逆
            that.state = RESOLVED
            that.value = value
            that.rejectedCallBack.map(cb => { //resolve的执行导致.then的执行，也就是导致.then里面的回调函数的执行，参数是resolve出来的内容value
                cb(that.value)
            })
        }
    }

    function reject(value){
        if(that.state === PENDING){
            that.state = REJECTED
            that.value = value
            that.rejectedCallBack.map(cb => {
                cb(that.value)
            })
        }
    }

}

MyPromise.prototype.then = function (onFulfilled,onRejected) {
    const that = this
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }

    if(that.state === PENDING){
        that.resolvedCallBack.push(onFulfilled)
        that.rejectedCallBack.push(onRejected)
    }


    if(that.state === RESOLVED){
        onFulfilled(that.value)
    }

    if(that.state === REJECTED){
        onRejected(that.value)
    }


}


// promise是把异步缕成同步，resolve执行才能执行.then， .then接收两个参数，都是函数，但不需要括号，源码里面做了判断补全
// .then的回调函数的参数是resolve出来的内容，
// .then后面可以一直接.then,但是不会把代码变成同步，且之后.then里面的回调函数的参数依旧是上一次.then的执行结果



function a(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('aaa');
            resolve('ok')
        },1000)
    })
}

function b(){
    setTimeout(()=>{
        console.log('bbb');
    })
}

// a().then(b)
a()
b()
let arr = []
// arr instanceof Array   //左边这个（可以往原型上倒(__proto__)）等不等于右边

function instance_of(L,R){  //instance_of(arr,Array)
    L = L.__proto__ //赋值为自己的隐式原型 Array.prototype
    let O = R.prototype//__proto__是找父亲的显示原型prototype
    while(true){//（）的条件为true会一直循环
        if (L === null) return false
        if(O === L) return true
            L = L.__proto__ //Array.prototype.__proto__ == Object.prototype
        
    }
    
}

console.log(instance_of(arr,Array));
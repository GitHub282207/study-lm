const arr = [1,2]
arr.unshift(0)//数组头部添加
arr.push(3)//数组尾部添加
arr.splice(1,0,3)//数组任意位置添加 从哪个位置开始切，切几个，添加的值

//stack 后进先出
const stack = []
stack.push('a')
stack.push('b')
stack.push('c')
stack.push('d')

while (stack.length){
    const top = stack[stack.length-1]//只访问栈里面的元素
    console.log(top);
    stack.pop()//出栈，直接pop就是会使得栈里面的元素少掉
}

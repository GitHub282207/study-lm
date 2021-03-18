// 题目描述： 用 JavaScript 实现斐波那契数列函数,返回第n个斐波那契数。 f(1) = 1, f(2) = 1 等

function fibonacci(n) {
    //判断 f(2)=1 f(2)=1
    if(n==2||n==1){
    return 1;
    }
    //f(n)=f(n-1)+f(n-2)
    return fibonacci(n-1)+fibonacci(n-2)
    }
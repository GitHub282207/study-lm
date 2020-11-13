// var playerAction = process.argv[process.argv.length-1]
const game = require('./lib')//game是抛出的那个函数

// const result = game(playerAction)
// console.log(result);

// 获取进程的标准输入
let count = 0
process.stdin.on('data',e=>{
    const playerAction = e.toString().trim()
    const result = game(playerAction)
    console.log(result);
    if(result == -1){
        count++
    }
    if(count === 3){
        console.log('你太厉害了，不跟你玩儿了');
        process.exit()//结束进程
    }
})
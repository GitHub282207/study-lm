var playerAction = process.argv[process.argv.length-1]
const game = require('./lib')//game是抛出的那个函数

const result = game(playerAction)
console.log(result);
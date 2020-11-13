// console.log('start require');
// // require ('./lib.js')
// console.log(require ('./lib.js'));
// console.log('end require');

let lib=require ('./lib.js')
console.log(lib);
lib.name='woniu'

// exports导出的应用跟index.js里面的lib是同一个引用
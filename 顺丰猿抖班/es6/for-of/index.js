Array.prototype.f = 'f'//arr它爹，可被隐式继承
let arr = ['a', 'b', 'c', 'd', 'e']//相当于new Array
let obj = {
    name: 'jiushen',
    age: 18,
    sex: 'boy'
}
// console.log(obj.length);//obj没有length属性 undefine
console.log(Object.keys(obj));
// for循环遍历对象
for (let i = 0; i < Object.keys(obj).length; i++) {
    console.log(obj[Object.keys(obj)[i]]);
}

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);//下标
}

for (let i of arr) {//for of
    console.log(i);
}

for (let i of obj) {//for of 遍历具有迭代器属性 object不具有
    console.log(i);//报错
}

obj.height = 180
for (let key in obj) {//for in 遍历对象
    console.log(key);//键
    console.log(obj[key]);//值
}


for (let key in arr) {//for in 可遍历数组 不建议，有bug,for in会把数组原型上的属性和方法也遍历出来，for of 不会
    console.log(arr[key]);
}
for (let key in arr) {
    console.log(arr[key]);//a,b,c,d,e,f
}

// 特殊情况下，遍历的顺序不会按照对象的顺序进行 所以不适合用来遍历数组，不按顺序
function Foo() {
    this[100] = 'test-100'
    this[1] = 'test-1'
    this['b'] = 'bar-B'
    this[50] = 'test-50'
    this[9] = 'test-9'
    this[8] = 'test-8'
    this[3] = 'test-3'
    this[5] = 'test-5'
    this['A'] = 'bar-A'
    this['C'] = 'bar-C'
}
let bar = new Foo()
// console.log(bar);//数字优先遍历出来，且按从小到大的顺序排列 ECMAScript规范 数字属性应该按照索引值的大小升序排列，字符串属性根据创建时的顺序排列

for (let key in bar){
    console.log(`index:${key} value:${bar[key]}`);
}


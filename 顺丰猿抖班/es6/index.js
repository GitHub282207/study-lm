var foo = 'bar'

console.log(foo);

let foo = 'bar'



let example = 'Tom'
const foo = 'this is' + example//模板拼接
const foo = `this is ${example}`

// es6新增的数组的方法
let arr = ['a','b','c']
console.log(Object.keys(arr));//返回数组，但是是下标['0','1','2']
let newArr = [...arr.keys()]//keys    [0,1,2]number 
console.log(newArr);

let iter = arr.entries()
for(let e of iter){
    console.log(e);//键值对都能取到
}
console.log(iter);

let eArr = arr.values()
for(let e of eArr){
    console.log(e);//拿到每一个值
}

function test(fruit){
    if(fruit == 'apple' || fruit == 'strawberry'){
        console.log('red');
    }
}
function test(fruit){
    const redFruits = ['apple','strawberry','cherry']
    if(redFruits.includes(fruit)){
        console.log('red');
    }
}

test('cherry')



let people = [
    {name:'数据1',age:20},
    {name:'数据2',age:18},
    {name:'数据3',age:21}
]
function findFriend(person){
    return person.name === '数据2'
}
console.log(people.find(findFriend));//find方法会自动遍历people数组交给findFriend方法


let test = ['a','b','c','d']
// test.findIndex('b')
function index(i){
    return i =='b'
}
console.log(test.findIndex(index));//1  findIndex找数组某一个指定元素的下标


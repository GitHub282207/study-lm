let arr = [1,2,3,2,4,1]//数组去重

let newArr = [...new Set(arr)]//set返回一个不包含重复项的数组回来
console.log(newArr);


function test(color){
    switch(color){
        case 'red':
            return ['apple','strawberry']
        case 'yellow':
            return ['banana','pear']
        case 'green':
            return ['watermelon']
        default:
            return []
    }
}

console.log(test('yellow'));

//set 改写

const fruitColor = {
    red:['apple','strawberry'],
    yellow:['banana','pear'],
    green:['watermelon']
}

function test(color){
    return fruitColor[color]||[]//fruitColor[color]=fruitColor.color
}

let obj = new Map()
let a = 1
obj.set(a,123)//obj.a = 123 ==>obj.'a'=123
console.log(obj.get(a));//可以取到123

test('yellow')

// let obj = new Object()
// let a = 1
// obj.a = 123
// console.log(obj.a);

// let obj={
//     1:123,//传统对象只接受字符串作为key值
// }
// console.log(obj.1);//错误

const fruitColor = new Map()//创建一个map对象，添加属性.set,取值.get,key值可以是任意类型
// console.log(fruitColor);//Map{}
.set('red',['apple','strawberry'])
.set('yellow',['banana','pear'])
function test(color){
    return fruitColor.get(color)
}


test('yellow')
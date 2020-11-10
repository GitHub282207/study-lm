let key1 = Symbol(1)//Symbol 唯一值
let key2 = Symbol(1)
// console.log(key1 === key2);

// console.log(typeof(null));

// console.log('hello'.length);

0.1 + 0.2 == 0.3
// console.log(0.1 + 0.2 );//0.300000000000004 js引擎精度丢失

let obj = {
    name:'wn'
}

const a = [] //假设#001为内存地址指针
const b = a//赋值  就是指针的复制
b.push(1)//
// console.log(a);//a = [1] 指针指的是同一个地址


function test (person) {
    person.age = 26//更改属性
    person = {// 赋值操作，给person重新分配内存地址，开辟了指针 #002 此时person与p1无关了
        name:'yyy',
        age:30
    }
    return person
}
const p1 = {//#001
    name = 'xxx',
    age:25
}
const p2 = test(p1)
// console.log(p1);//xxx 26
// console.log(p2);//yyy 30

// 1. 函数传参是传递对象指针的副本
// 2. p1和person具有相同的指针，person被修改，p1也会被修改
// 3. person拥有了一个新的内存地址



// console.log(typeof([]));
console.log([] instanceof Array);//true  会往原型上倒
console.log('hello' instanceof String);//false 读不出原始类型


//让instanceof也能判断原始类型

class PrimitiveString{
    static [Symbol.hasInstance](){//[Symbol.hasInstance]函数，自定义instanceof的行为
        return typeof x === 'string'
    }
}
console.log('hello' instanceof PrimitiveString);//true

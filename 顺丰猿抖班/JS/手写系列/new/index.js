Person.prototype.say = function() {
  console.log('hahaha');
}
function Person(name, age) {
  this.name = name
  this.age = age
  // return {}  // return string 和 number都可以, 但是不能返回object，否则就失效
}



// let person = new Person('小敏', '18') //new的存在让函数干这个事情
// console.log(person); 





function myNew() {
  let obj = {} //因为经过new得到的一定是个对象，所以定义一个对象并抛出
  // 取到外部传入的构造器

  // arguments// myNew接收到的所有的参数
  let Constructor = Array.prototype.shift.call(arguments)//shift会影响原数组  arguments类数组，不是数组，不存在shift方法，借用call方法把shift放到arguments里面生效，就是把数组里面的shift方法拿到arguments里面执行  最终会拿到调用时的person
  // 实现一个继承   Constructor指向构造函数的出处 即Person   把person的显示原型赋值给new出来的函数的隐式原型
  obj.__proto__ = Constructor.prototype

  let result = Constructor.apply(obj, arguments)//apply方法可以使person对象拿到原构造函数Person里面的属性


  // console.log(arguments);
  return typeof result === 'object' ? result : obj//如果构造函数有return 且return出来的是对象，则new的结果就是空对象，如果return 出来的是原始类型，则不影响
}

let person = myNew(Person, '小敏', '18')
console.log(person);
person.say()
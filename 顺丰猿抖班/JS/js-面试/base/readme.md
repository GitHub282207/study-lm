# js 原始类型有几种？
boolean null undefine number string symbol

# null 是对象吗？
是，typeof(null)
000 代表的是对象，而 null的二进制都是0

# 原始类型和引用（对象）类型有什么差别？
原始类型存的是值
而对象类型存的是地址（指针）

# typeof能正确判断的类型是？
typeof只能判断原始类型（null除外），{} []统一为object,js万物皆对象的bug
instanceof 只能判断引用类型

# 让instanceof也能判断原始类型

# instanceof实现原理 instanceof.js

# 类型转换 
转为布尔值
转为数字
转为字符串
# 对象转原始值
 对象在转类型的时候回调用内置的[[ToPrimitive]]
 - 如果已经是原始类型，那就不用转换了
 - 先调用valueOf  x.valueOf(),如果转为了原始类型，就返回值
 - 再调用toString  x.toString(),如果转为了原始类型，就返回值
 - 如果还没有转为原始类型，就报错

# 四则运算
  加法： 运算中其中一方为字符串，另一方一定会转换为字符串
        如果一方不是数组或字符串，那就会把它转换成数字或字符串进行运算   4 + [1,2,3]   "41,2,3"
    除加法外的运算，只要一方是数字，另一方一定会转为数字来运算



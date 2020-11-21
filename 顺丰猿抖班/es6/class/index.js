class Foo{
    constructor(){}//放上这个就可以被new了
    static bar() {
        this.baz()//this代表Foo
    }
    static baz() {
        console.log('hello');//static baz被声明为私有的 防止被继承
    }
    baz(){//出错，baz不是function
        console.log('world');
    }
}
let foo = new Foo()
Foo.baz()

// Foo.bar()

class Shape{
    constructor (width,height){
        this._width = width
        this._height = height
        this.area = width*height
    }

    area(){//加static就拿不到
        console.log(123);
    }
    get area(){//加get自动执行
       return this._width * this._height
    }
}

const square = new Shape(10,10)
// console.log(square._width);//10
console.log(square.area);
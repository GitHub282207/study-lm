// 题目描述： 根据包名，在指定空间中创建对象

// 输入： namespace({a: {test: 1, b: 2}}, 'a.b.c.d')

// 输出： {a: {test: 1, b: {c: {d: {}}}}}

function namespace(oNamespace, sPackage) {
    let name = sPackage.split('.')
    let res = oNamespace
    for (let i in name) {
        if (typeof oNamespace.hasOwnProperty(name[i])) {//判断oNamespace有没有a b c d的属性
            if (typeof oNamespace[name[i]] !== 'object') {
                oNamespace[name[i]] = {}//oNamespace.b不是一个对象，所以把它变成一个对象
            }
        } else {//oNamespace没有该属性
            oNamespace[name[i]] ={}//oNamespace增加该属性并赋值为{}
        }
        oNamespace = oNamespace[name[i]]//比如c这个值，添加进去会和a同级，那下一次就判断这个c
    }
}

// c会和a同级，怎么会到b里面去
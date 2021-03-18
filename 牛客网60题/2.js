// 题目描述： 获取 url 中的参数

// 指定参数名称，返回该参数的值 或者 空字符串
// 不指定参数名称，返回全部的参数对象 或者 {}
// 如果存在多个同名参数，则返回数组
// 输入： www.nowcoder.com?key=1&key=2&key=3&test=4#hehekey

// 输出： [1, 2, 3]

function getUrlParam(sUrl, sKey) {
    let left = sUrl.indexOf('?') + 1   //left拿到？的下标值再加一
    let right = sUrl.lastIndexOf('#')  //从后往前找到#的小标值
    let parasString = sUrl.slice(left, right)  //slice左闭右开，返回数组，切割出key=1&key=2&key=3&test=4
    let paras = parasString.split('&')  //它通过给定的分隔符&将字符串分割成一个数组  得到 ["key=1", "key=2", "key=3", "test=4"]
    let parasJson = {}
    paras.forEach((value, index, arr) => {
        let a = value.split('=')  //得到一个二维数组 [[key,1],[key,2]...]
        parasJson[a[0]] !== undefined  //判断键值是否存在
            ? parasJson[a[0]] = [].concat(parasJson[a[0]], a[1]) //存在，用从concat融合，保留键值存入value值
            : parasJson[a[0]] = a[1]  //不存在，就存入key:1
    })
    let result = sKey !== undefined ? (parasJson[sKey] || '') : parasJson //是否指定了参数名
    return result
}
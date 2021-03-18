// 题目描述： 为 Array 对象添加一个去除重复项的方法

// 输入： [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN]

// 输出： [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a']

Array.prototype.uniq = function () {
    // return [... new Set(this)] es6解法  this就是指向那个调用者的数组
    let res = []
    let hasNaN = false
    this.forEach(e => {
        if (res.indexOf(e) === -1) { //res中还不存在就添加
            if  (e !== e) { //判断nan这个数据类型 因为nan ！== nan  其实{} !== {}
                if (!hasNaN) { //  增加标志位，确保只添加一次
                    res.push(e)
                    hasNaN = true
                }
            } else {
                res.push(e)
            }
        }
    })
    return res
}
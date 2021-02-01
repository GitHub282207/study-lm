// 字符串翻转
const str = 'maoshen'
// nehsoam 
// 调用api实现
const res = str.split('').reverse().join('')//split先把字符串分割,reverse数组翻转,join以空字段拼接，数组就转回了字符串
console.log(res);

// 回文字符串，用官方api实现
let str = 'yessey'
function ispalindrome(str){
    const res = str.split('').reverse().join('')
    return res === str
}
console.log(ispalindrome(str));

// 2
let str = 'yessey'
function ispalindrome(str){
    let mid = parseInt(str.length/2)
    for(let i=0,j=str.length-1;i<mid;){
        if(str[i] === str[j]){
            i++
            j--
        }else{
            return false
        }
    }
    return true
}
console.log(ispalindrome(str));

// 3
let str = 'yessey'
function ispalindrome(str){
    let mid = parseInt(str.length/2)
    for(let i=0;i<mid;i++){
        if(str[i] !== str[str.length-1-i]){
           return false
        }
    }
    return true
}
console.log(ispalindrome(str));


// 4
let str = 'yessey'
var ispalindrome = function (str){
    let mid = parseInt(str.length/2)
    while(i<j){
        if(str[i] === str[j]){
            i++
            j--
        }else{
            return false
        }
    }
    return true
}
console.log(ispalindrome(str));


// 最多删除一个字符串，判断是否能成为回文字符串

let str = 'aba' //true
let str = 'abca' //true

// 双指针 

function validpalindrome(str){
    let flag = ispalindrome(str)
    if(!flag){
        let i = 0,len = str.length
        while(i<len && !flag){
            let arrStr = str.split('')
            arrStr.splice(i,1)
            i++
            let newStr = arrStr.join('')
            console.log(newStr);
            flag = ispalindrome(newStr)
        }
    }
    return flag
}
let str = 'abcyocba'
console.log(validpalindrome(str));


// 2 不用遍历已经是回文的点，高效，第一种方法属于盲删
let str = 'abca'

function validpalindrome(str){
    let i = 0,j = str.length -1
    while(i<j){
        if(str[i] != str[j]){
            return ispalindrome(str,i+1,j) || ispalindrome(str,i,j-1)
        }
        i++
        j--
    }
    return true
}

console.log(validpalindrome(str));




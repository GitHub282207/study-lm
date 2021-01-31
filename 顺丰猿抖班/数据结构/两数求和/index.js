// 给定一个整数数组nums和一个目标值target
// 在该数组中找出和为target的两个整数，并返回它们的下标

nums = [2, 7, 11, 15]
let target = 9
// [0,1]

var twoSum = function (nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] === target - nums[j]) {
                return [i, j]
            }
        }
    }
}

//空间换时间  map数据结构是一个对象但是key可以是任何类型

var twoSum = function (nums, target) {
    const diffs = {}//第一次存值{ 2:0 }
    const len = nums.length
    // 遍历到的值为key下标为value,用map存储
    for(let i = 0;i < len; i++){
        // 判断diffs数组里面有没有目标值减去原数组后的差值
        if(diffs[target - nums[i]] !== undefined){
            return [diffs[target - nums[i]],i]
        }
        // diffs数组里面没有这个差值时就将该值存进数组
        diffs[nums[i]] = i
    }
}

// es6 map方法
var twoSum = function (nums,target){
    const map = new Map()
    for(let i =0;i<nums.length;i++){
        let n=nums[i] 
        let n2=target - nums[i]
        if(map.has(n2)){
            return [map.get(n2),i]
        }else{
            map.set(n,i)
        }
    }
}


// 不开辟空间 双指针法



// 三数求和  双指针法，空间换时间的应用场景 数组有序

// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
// 使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

let num2 = [-1, 0, 1, 2, -1, -4]
// [[-1,0,1],[-1,-1,2]]



const threeSum = function (nums) {
    let res = []//三元组返回的是一个数组，return出去一个数组
    // nums排序
    nums = nums.sort((a, b) => {
        return a - b//sort接收一个回调函数，函数接收两个参数a,b，a-b升序，b-a降序
    })
    const len = nums.length
    // len-2因为左右指针至少指向了两个数，不需要拉出来作为固定的数
    for(let i = 0; i < len-2; i++){//循环固定一个数
        let j = i + 1  //左指针
        let k = len - 1 //右指针

        if(nums[i]>0) {//因为数组已经排好序了，这个大于0，后面的必然也大于0
            break
        }

        if(i>0&&nums[i] === nums[i-1]){//两次固定的数是一样的，结果一定是重复的三元组
            continue//终止本次循环，开启下一次循环
        }

       while(j<k) {
        if(nums[i]+nums[j]+nums[k]<0){//被固定的数和左右指针指向得数小于0，说明左指针指的数不够大，左指针右移
            j++
            // 左指针指向的值存在重复的情况
            while(j<k&&nums[j] === nums[j-1]){
                j++
            }
        }else if(nums[i]+nums[j]+nums[k]>0){
            k--//右指针指向的值偏大，右指针往左退
             // 右指针指向的值存在重复的情况
             while(j<k&&nums[k] === nums[k+1]){
                k--
            }
        }else{//找到满足条件的三个值，也就是和为0
            res.push([nums[i],nums[j],nums[k]])
            j++
            k--
             // 左指针指向的值存在重复的情况
             while(j<k&&nums[j] === nums[j-1]){
                j++
            }

             // 右指针指向的值存在重复的情况
             while(j<k&&nums[k] === nums[k+1]){
                k--
            }
        }
       }
    }
    return res
}
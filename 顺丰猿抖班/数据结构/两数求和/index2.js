// 不开辟空间 双指针法
// 给定两个有序的整数数组，请将nums2合并到nums1中,使得nums1成为一个有序的数组

let nums1 = [1,2,3,0,0,0],m = 3
let nums2 = [2,5,6],n = 3
// [1,2,2,3,5,6]

// 1.定义两个指针，分别指向两个数组生效部分的尾部
// 2.每次只对指针所指的元素进行比较，取其中较大的元素，把它从nums1的末尾往前填补

const merge = function(nums1,m,nums2,n){
    let i = m - 1//该指针指向num1的3，m为num1的有效长度
    let j = n - 1,k = m + n - 1//num1排序完成后的尾部的索引，因为num1终将变成m+n的长度

    while(i>=0&&j>=0){
        if(nums1[i]>=nums2[j]){
            nums1[k]=nums1[i]//确定排序后的数组的最大值，以此类推，由大到小
            i--
            k--
        }else{
            nums1[k] = nums2[j]
            j--
            k--
        }
    }

    // Nums2有剩余 nums1到头，nums2剩余的全部放在num1的前面？
    while(j>=0){
        nums1[k] = nums2[j]
        k--
        j--
    }
}
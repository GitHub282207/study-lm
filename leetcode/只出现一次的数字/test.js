// 题目描述：
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次


// 哈希集有个重要特性，其是不包含任何重复元素的无序集合
// 故当我们向哈希集添加重复元素时，如果添加失败，则移除当前试图向哈希集添加的元素
// 语言：c#
// public static int SingleNumber(int[] nums)
// {
//     HashSet<int> set = new HashSet<int>();
//     for (int i = 0; i < nums.Length; i++)
//     {
//         //该判断语句的整体作用是：如果当前数字（nums[i]）已经在之前出现过，那么在哈希集实例（set）中移除当前数字
//         // Add 方法的作用是添加当前数字于哈希集中，如果当前数字和该集合（set）元素存在重复，则返回 False 。故在此采用了逻辑非操作符（!）
//         if (!set.Add(nums[i]))
//             set.Remove(nums[i]); ;
//     }
//     //因为每个重复元素最多存在两个，而重复元素的第一个添加后均被移除，而第二个均未添加成功，故此时哈希集只保留唯一且未重复的元素
//     // First*1 方法的作用是返回该序列的第一个元素
//     return set.First();
// }
// 语言：java
// class Solution {
//     public int singleNumber(int[] nums) {
//       int len = nums.length;
//     Set<Integer> set = new HashSet<>();

//     for (int i = 0; i < len; i++) {
//         if (!set.add(nums[i])) {
//             set.remove(nums[i]);
//         }
//     }

//     return set.iterator().next();
//     }
// }

// 法二 语言：javascript
// 当甲乙值相等时，异或操作后结果为不等（False，0），反之，为相等（True，1）
// 举一例例子：
// 甲：0 0 0 0 1 1 0 0 （值为12）
// 乙：0 0 0 0 0 1 1 1 （值为7）
// 甲和乙进行按位异或操作得到新值丙
// 丙：0 0 0 0 1 0 1 1 (值为11)
// 根据这个性质，由于每个重复元素重复两次，故他们在遍历后将相互抵消，而唯一元素只出现一次，故将得到保留
// public static int SingleNumber(int[] nums)
// {
//     int result = 0;
//     for (int i = 0; i < nums.Length; i++)
//     {
//         // ^ 为C#提供的按位异或操作符，而 ^= 相似 += ,其效果等价于 result = result ^ nums[i]
//         result ^= nums[i];
//     }
//     return result;
// }
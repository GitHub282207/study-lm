//队列是一边进，另一边出。用来存储数据的一种数据结构，只能用push和shift方法的一个数组
const queue = []
queue.push('a')
queue.push('b')
queue.push('c')
queue.push('d')

while (queue.length){
    const top = queue[0]//访问队头元素
    queue.shift()//出队列
}


// 链表  中的数据单位名称叫结点，且结点在内存中是可以离散的

// 链表在js中的表现
// {
//     val: 1,
//     next: {
//         val: 2,
//         next: ...
//     }
// }

// 使用构造函数创建结点
function ListNode(val){
    this.val = val
    this.next = null
}

const node1 = new ListNode(1)//数据域值为1，next节点数据域值为2的链表结点
node1.next = new ListNode(2)
// 链表元素的增删改查
const node3 = new ListNode(3)//创建出来3这个结点
node1.next.next = node3//3放在2的后面
node3.next = node1.next//1指向2，现在3指向2
node1.next = node3//3放在1和2的中间

// [1,3，2]

// 删除 标准：在遍历的过程中无法在遍历到该结点
// 让1的next重新指向2 跳过它
node1.next = node3.next//node3成为了一个不可抵达的结点，会被垃圾回收机制回收掉

// 分辨链表和数组

const arr = [1,2,3,4]//只在数组定义了一种类型的元素
const arr = ['haha',1,{a:1}]
// 只有是同一种数据类型的时候是连续内存，不同数据类型的时候是非连续内存，只有在js中
// js里面的数组未必是真正的数组（存储在连续的内存空间里），第二种就应该是链表
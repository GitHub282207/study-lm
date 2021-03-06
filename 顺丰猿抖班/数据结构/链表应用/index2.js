// 链表的删除
// 给定一个排序的链表，删除所有重复的元素，使得每个元素只出现一次
// 1>1>2  => 1>2  链表去重，删除节点

// 生成一个链表结点的
function ListNode(val){
    this.val = val
    this.next = null
}

const deleteDuplicates = function(head){
    // 设定cur指针，初始值为链表的第一个节点
    let cur = head
    // 遍历链表 条件：有头结点且不只一个节点
    while(cur !== null && cur.next !== null){
        if(cur.val === cur.next.val){
            cur.next = cur.next.next
        }else{
            cur = cur.next
        }
   }
    return head //head是一条最完整的链表
}



// 删除进阶
// 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中没有重复出现的数字
// 1>2>3>3>4>4>5   1>2>5


// 虚拟节点
const deleteDuplicates = function(head){
if(!head || !head.next){
    return head
}

// dummy
let dummy = new ListNode()
// dummy永远指向头结点
dummy.next = head
let cur = dummy
// cur后面必须要有两个节点
while(cur.next && cur.next.next){
    // 对两个节点进行比较
    if(cur.next.val === cur.next.next.val){
        // 记录重复的值
        let val = cur.next.val
        while(cur.next && cur.next.val === val){
            cur.next = cur.next.next
        }
        }else{
            cur = cur.next
    }
}
return dummy.next
}
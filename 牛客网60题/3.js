// 题目描述： 查找两个节点的最近的一个共同父节点，可以包括节点自身

// oNode1 和 oNode2 在同一文档中，且不会为相同的节点

function commonParentNode(oNode1, oNode2) {
    if (oNode1 === oNode2) return oNode1
    let s = new Set()
    while (!s.has(oNode1) && !s.has(oNode2)) {
        s.add(oNode1)
        s.add(oNode2)
        if (oNode1.parentNode) oNode1 = oNode1.parentNode
        if (oNode2.parentNode) oNode2 = oNode2.parentNode       
    }
    return s.has(oNode1) ? oNode1 : oNode2 //set这个数据结构会去除重复值，所以定义一个set的数据结构
}
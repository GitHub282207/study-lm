// 数据域，左子树，右子树
function TreeNode(val){
    this.val = val
    this.left = this.right = null
}
const node = new TreeNode(1)//一个节点有一个值和两个指针，指向左右子树

const root = {
    val: "A",
    left: {
      val: "B",
      left: {
        val: "D"
      },
      right: {
        val: "E"
      }
    },
    right: {
      val: "C",
      right: {
        val: "F"
      }
    }
  };
function preorder(root){
    if(!root){
        return
    }
    console.log(root.val);//前序中序后序取决于啥时候输出值，此时为前序
    preorder(root.left)
    preorder(root.right)
}
preorder(root)
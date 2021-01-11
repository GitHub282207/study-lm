// 给定一个二叉树，检查它是否是镜像对称的。
// 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

//     1
//    / \
//   2   2
//    \   \
//    3    3



const isSymmetric = (root) => {
  
    const check = (left, right) => {
      if (left == null && right == null) { // 两个子树都为null，是对称的
        return true;
      }
      if (left && right) {  // 两个子树都存在，则需要：root值相同，且他们的子树也满足镜像
        return left.val == right.val && check(left.left, right.right) && check(left.right, right.left);
      }
      return false;         // 一个子树存在一个不存在，肯定不对称
    };
  
    if (root == null) {     // 如果传入的root就是null，对称
      return true;
    }           
    return check(root.left, root.right); // 否则，判断它的左右子树是否满足对称
  };
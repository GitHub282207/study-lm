var minDepth = function (root){
    if(root == null){
        return 0
    }
    if(root.left == null && root.right == null){
        return 1
    }
    let ans = Infinity
    if(root.left){
        ans = Math.min(minDepth(root.left),ans)
    }
    if(root.right){
        ans = Math.min(minDepth(root.right),ans)
    }
    return ans + 1
}

 var root = [3,9,20,null,null,15,7]

 minDepth(root)
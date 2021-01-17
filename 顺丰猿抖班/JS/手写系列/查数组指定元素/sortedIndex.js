function cb(func, context) {//仅仅只是绑定了this作用域
  if (context === void 0) return func;
  return function() {
    return func.apply(context, arguments)
  }
}


function sortedIndex(array, obj, iteratee, context) {
  iteratee = cb(iteratee, context)//保证了iteratee函数作用域不被更改

  let low = 0, high = array.length-1;
  // let low = 0, high = array.length; low < high ；else high = mid; return high

  while(low <= high) {
    let mid = Math.floor((low + high) / 2)
    if (iteratee(array[mid]) < iteratee(obj)) low = mid + 1
    else if (iteratee(array[mid]) == iteratee(obj)) {
      return mid
    }
    else high = mid - 1
  }

  return low
}


// console.log(sortedIndex([10, 20, 30], 25));
// sortedIndex([10, 20, 30], 25) // 2



var stooges = [{name: 'moe', age: 40},{name: 'larry', age: 50}, {name: 'curly', age: 60}];
let result = sortedIndex(stooges, {name: 'larry', age: 40}, function(stooge) {
  return stooge.age
});
console.log(result); // 1
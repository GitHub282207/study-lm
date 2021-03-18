// 封装函数 f，使 f 的 this 指向指定的对象

function bindThis(f, oTarget) {
    return f.bind(oTarget) //实际作用：把f这个函数移到oTarget这个对象里面执行
 }
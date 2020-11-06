//拿到要操作的dom结构（HTML标签）
//能拖动这个dom
//能控制这个dom的高度发生变化
//根据该dom高度的值来调整视频播放的速度



var speed = document.querySelector('.speed');
var bar = document.querySelector('.speed-bar');
var video = document.querySelector('.flex');
speed.addEventListener('mousemove',function(e){//在speed身上注册了一个鼠标移动的事件
  //控制滑块的位置
    var y = e.pageY - speed.offsetTop //offsetTop是获取某个dom结构导浏览器顶部的距离
    var percent = y / speed.offsetHeight//offSetHeight是获取某个dom结构自身的高度
    var min = 0.4
    var max = 4
    var height = Math.round(percent * 100) + '%'//四舍五入方法
    var playbackRate = percent * (max - min) + min//值在0.4到4之间
    bar.style.height = height
    video.playbackRate = playbackRate
    bar.textContent = playbackRate.toFixed(2) + 'x'//bar.textContent设置dom元素里面的文本内容，toFixed(2)保留两位小数

})
class VueRouter {

}
VueRouter.install = function(){

}

export default VueRouter

// class Vue{
//     constructor(){
//         _installedPlugins:''
//     }
// }
// Vue.use = function(plugin){
//     const installedPlugins = (this._installedPlugins ||(this._installedPlugins == []))
//     if(installedPlugins.indexOf(plugin)>-1){//插件存在就不会再二次加载
//         return this
//     }
//     const args = toArray(arguments,1)//类数组转换为数组
//     args.unshift(this)
//     if(typeof plugin.install === 'function'){
//         plugin.install.apply(plugin,args)
//     }else if(typeof plugin === 'function'){
//         plugin.apply(null,plugin,args)
//     }
//     installedPlugins.push(plugin)
//     return this
// }
class EventEmit{
    constructor(){
        // 存储事件
        this.events = this.events || new Map()
    }
    // 监听事件
    addListener(type,fn){
        if(!this.events.get(type)){//还没有事件，就发布事件
            this.events.set(type,fn)
        }
    }

    // 触发事件
    emit(type){
        let handle = this.events.get(type)//获取到事件里面的事件，并执行  拿到的是age
        handle.apply(this,[...arguments].slice(1))
    }
}

let emitter = new EventEmit()

emitter.addListener('age',age=>{
    console.log(age);
})

emitter.emit('age',18)//这行代码执行，addlistener就会立马拿到age值18并打印，age是事件，18是参数
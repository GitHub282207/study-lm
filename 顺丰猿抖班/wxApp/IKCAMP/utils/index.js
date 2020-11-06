import config from './config'//引入，config就是抛出的core
import * as Mock from './mock'//引入所有给mock,此时mock为对象

let util = {
    isDEV: config.isDev,
    log() {
        this.isDEV && console.log(...arguments);
    },
    alert(title='提示',content = config.defaultAlertMessage) {
        if(typeof content === 'object'){//判断content有没有传
            content = this.isDEV && JSON.stringify(content)//格式化为json字符串类型            
        }
        wx.showModal({
            title: 'title',
            content: content
          
        });
    },
    getStorageData(key,cb) {
        wx.getStorage({
            key:key,
            success (res) {
               cb && cb(res.data)
            },
            fail(err){
                this.log(err)
            }
        })
    },
    setStorageData(key,value='',cb){
        wx.setStorage({
            key:key,
            data:value,
            success(){
                cb && cb()
            }
          })
    },
    request(opt){
        let {url,data,header,method,dataType,mock=false} = opt//let url=opt.url 解构

        let self = this
        return new Promise((resolve,reject)=>{
            if(mock==ture){
                let res ={
                    statusCode:200,
                    data:Mock[url]
                }
                if(res && res.statusCode == 200&&res.data){//判断接口请求成功200
                    resolve(res.data)
                  }else{
                      self.alert('提示',res)
                      reject(res)
                  }
            }else{
                 wx.request({
                url: url, 
                data: data,
                header: header ||{'content-type':'application/json'},
                method:method ||'get',
                dataType:dataType ||'json',
                  success (res) {
                  if(res && res.statusCode == 200&&res.data){//判断接口请求成功200
                    resolve(res.data)
                  }else{
                      self.alert('提示',res)
                      reject(res)
                  }
                },
                fail(err){
                    self.log(err)
                    self.alert('提示',err)
                    reject(err)
                }
              })
            }
        })
            
          
       
    }
}

export default util//抛出util
import apiLogin from './interface/login'

const install = Vue => {
  Object.defineProperties(Vue.prototype, {//Object.defineProperties拦截vue的原型，然后给它增加$http
    $http: {
      get() {
        return Object.assign(
          {},
          apiLogin,
          // ...
        )
      }
    }
  })
}

export default install
import axios from 'axios'
// import axios from '../utils/axios'
import url from '../utils/url'

export function getswiper(){
    // 正式发起接口请求
    // return axios.get('./index-infos')
    return axios.post(url.baseUrl+'users/swiperinfos')
}

export function getHotgoods(){
    // 正式发起接口请求
    // return axios.get('./index-infos')
    return axios.post(url.baseUrl+'users/hgoodsinfos')
}

export function getNewgoods(){
    // 正式发起接口请求
    // return axios.get('./index-infos')
    return axios.post(url.baseUrl+'users/ngoodsinfos')
}

export function getRecommendgoods(){
    // 正式发起接口请求
    // return axios.get('./index-infos')
    return axios.post(url.baseUrl+'users/rgoodsinfos')
}

export function register(params){
    // 接口地址
    return axios.post(url.baseUrl+'users/register',params)
}

export function login(params){
    return axios.post(url.baseUrl+'users/login',params)
}

export function getDetail(params){
    return axios.post(url.baseUrl+'users/detail',params)
}

export function addCart(params){
    return axios.post(url.baseUrl+'users/shopcart',params)
}

export function getcartcount(){
    return axios.post(url.baseUrl+'users/cartcount')
}
// 修改购物车商品的goodscount字段
export function modifyCart(params){
    return axios.post(url.baseUrl+'users/modifycartcount',params)
}
// 删除购物车的某条商品
export function deleteCart(params){
    return axios.post(url.baseUrl+'users/deletecartgoods',params)
}

// 从购物车获取到想确定买的商品付款，数据展示在订单页
export function getCartOrder(params){
    return axios.post(url.baseUrl+'users/getcartorder',params)
}

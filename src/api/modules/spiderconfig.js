import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'


// ====================== 采集站点配置页面 =====================
// 获取采集站点配置的列表
export function list (params) {
  return request({
    url: requestUrl('/api/linkInfo/list'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

//获取手动输入的cookie
export function gainCookie(id){
  return request({
    url: requestUrl('/api/linkInfo/gain_cookie' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params:requestParam({},'get')
  })
}

//手动插入cookie的值
export function addByCookie(params){
  return request({
    url: requestUrl('/api/linkInfo/hand_cookie'),
    method: 'post',
    data:requestParam(params)
  })
}

// 获取采集站点配置信息
export function info (id) {
  return request({
    url: requestUrl('/api/linkInfo/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 添加采集站点配置
export function add (params) {
  return request({
    url: requestUrl('/api/linkInfo/save'),
    method: 'post',
    data: requestParam(params)
  })
}

// 修改采集站点配置
export function update (params) {
  return request({
    url: requestUrl('/api/linkInfo/update'),
    method: 'post',
    data: requestParam(params)
  })
}

// 删除采集站点配置
export function del (params) {
  return request({
    url: requestUrl('/api/linkInfo/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 获取模拟登录页面
export function getLoginPage (params) {
  return request({
    url: requestUrl('/api/target/analog_login_one'),
    method: 'get',
    params: requestParam(params, 'get', false)
  })
}

// 获取登录页面的参数，并传给后台
export function getLoginParams (params) {
  return request({
    url: requestUrl('/api/target/analog_login_two'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}


// ====================== 单点采集页面 =====================
// 单点采集
export function spider (params) {
  return request({
    url: requestUrl('/api/target/spdier_point'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

export function test (params) {
  return request({
    url: requestUrl('/api/target/test'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 获取采集项目
export function getSpiderItems (params) {
  return request({
    url: requestUrl('/api/target/spider_head'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 将获取到的采集项目保存
export function saveInfo (params) {
  return request({
    url: requestUrl('/api/target/spider_head_update'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}


// ====================== 采集结果页面 =====================
// 获取采集结果
export function getResult (params) {
  return request({
    url: requestUrl('/api/resultInfo/list'),
    method: 'get',
    params: requestParam(params, 'get', false)
  })
}

export function getConviersion (params) {
  return request({
    url: requestUrl('/api/resultInfo/challenge'),
    method: 'get',
    params: requestParam(params, 'get', false)
  })
}

// 获取采集结果的比对列表数据
export function comparison (params) {
  return request({
    url: requestUrl('/sys/spiderconfig/comparison'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取所有模板数据，用来比对
export function getAllTemplate () {
  return request({
    url: requestUrl('/api/resultInfo/is_model'),
    method: 'get',
    params: requestParam({}, 'get', false)
  })
}


// 获取当前的采集结果，用来比对结果
export function getCurrentDataList (params) {
  return request({
    url: requestUrl('/api/resultInfo/comparison'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 获取已选择的模板数据，用来比对结果
export function getChooseDataList (params) {
  return request({
    url: requestUrl('/api/resultInfo/comparison'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}
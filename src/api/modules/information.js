import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

// 获取信息资源目录
export function catalog(params) {
  return request({
    url: requestUrl('/api/resultInfo/catalog'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取信息资源列表
export function list(params) {
  return request({
    url: requestUrl('/api/linkInfo/query_accurate'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取信息资源详情
export function info(id) {
  return request({
    url: requestUrl('/api/resultInfo/conversion' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 设置模板详情
export function details(id){
  return request({
    url: requestUrl('/api/pageInfo/template_details' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({},'get')
  })
}

// 信息资源修改
export function update (params) {
  return request({
    url: requestUrl('/sys/information/update'),
    method: 'post',
    data: requestParam(params)
  })
}

// 信息资源删除
export function del (params) {
  return request({
    url: requestUrl('/sys/information/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 获取模板管理列表信息
export function template(params) {
  return request({
    url: requestUrl('/api/resultInfo/list'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 设置模板
export function setTemplate(params) {
  return request({
    url: requestUrl('/api/resultInfo/set_template'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取采集结果-查看-信息项列表
export function itemList(params) {
  return request({
    url: requestUrl('/api/element/list'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取信息项-数据转换列表
export function itemConversion(params) {
  return request({
    url: requestUrl('/api/resultInfo/datachallege'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取信息项-数据转换列表-删除
export function itemConversionDelete (params) {
  return request({
    url: requestUrl('/api/pageInfo/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 获取信息项-数据转换列表-查看数据  
export function iteminfo(id) {
  return request({
    url: requestUrl('/api/pageInfo/query_id' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

export function itembyinfo(id) {
  return request({
    url: requestUrl('/api/element/queryByPageId' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 获取信息项-数据转换列表-补充数据 
export function itemSuppleUpdate (params) {
  return request({
    url: requestUrl('/api/pageInfo/chang_data'),
    method: 'post',
    data: requestParam(params)
  })
}








// 获取信息项详情
export function item(id) {
  return request({
    url: requestUrl('/api/element/info' + (isInteger(id) ? `/${id}` : '')),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 信息项修改
export function itemUpdate (params) {
  return request({
    url: requestUrl('/sys/information/itemUpdate'),
    method: 'post',
    data: requestParam(params)
  })
}

// 信息项删除
export function itemDelete (params) {
  return request({
    url: requestUrl('/api/element/delete'),
    method: 'post',
    data: requestParam(params, 'post', false)
  })
}

// 获取类型列表
export function typeList(params) {
  return request({
    url: requestUrl('/api/information/typeList'),
    method: 'post',
    params: requestParam(params, 'post')
  })
}
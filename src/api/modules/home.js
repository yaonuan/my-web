import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'


// ====================== 首页页面 =====================
// 获取首页信息统计数量
export function getInfoCount () {
  return request({
    url: requestUrl('/api/home/getInfoCount'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}

// 获取系统平台列表
export function getSystemList (params) {
  return request({
    url: requestUrl('/api/home/getSystemList'),
    method: 'get',
    params: requestParam(params, 'get')
  })
}

// 获取统计图表数据
export function getTrendData (params) {
  return request({
    url: requestUrl('/api/home/getTrendData'),
    method: 'get',
    params: requestParam({}, 'get')
  })
}
import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import isInteger from 'lodash/isInteger'

//发送爬取页面信息
export function send(params){
  return request({
  	url: requestUrl('/spiderdata/send'),
  	method: 'post',
  	data: requestParam(params,'post',false)
  })
}
import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'

//获取查询信息
export function list (params){
	return request({
		url: requestUrl('/pageInfo/list'),
		method: 'get',
		params: requestParam(params, 'get')
	})
}
//按照用户输入的条件
export function selective(params){
	return request({
		url: requestUrl('/pageInfo/selective'),
		method: 'post',
		data: requestParam(params)
	})	
}

//根据id查单条数据
export function info(id){
	return request({
		url: requestUrl('/pageInfo/seleceById'),
		method: 'post',
		data: requestParam(id,'post',false)
	})
}
//修改爬取存储的信息
export function update(params){
	return request({
		url: requestUrl('/pageInfo/update'),
		method: 'post',
		data: requestParam(params,'post',false)
	})
}
//删除爬取得数据信息
export function del(params){
	return request({
		url: requestUrl('/pageInfo/delect'),
		method: 'post',
		data: requestParam(params,'post',false)
	})
}
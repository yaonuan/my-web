import isInteger from 'lodash/isInteger'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  dataList.push(Mock.mock({
    'roleId': '@increment',
    'title': Mock.Random.ctitle(),
    'roleName': name,
    'ip': Mock.Random.ip(),
    'url': Mock.Random.domain(),
    'createTime': '@datetime'
  }))
}

// 获取日志列表
export function list (params) {
  return {
    // isOpen: false,
    url: '/sys/log/list',
    type: 'get',
    data: {}
  }
}

// 获取定时任务日志列表
export function scheduleList (params) {
  return {
    // isOpen: false,
    url: '/sys/scheduleLog/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1
      }
    }
  }
}

// 获取定时任务日志信息
export function scheduleInfo (id) {
  return {
    // isOpen: false,
    url: '/sys/scheduleLog/info' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList[0]
    }
  }
}

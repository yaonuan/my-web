import isInteger from 'lodash/isInteger'

// 生成数据列表
var dataList = []
var itemData = []
var pageInfo = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  let url = Mock.Random.url()
  dataList.push(Mock.mock({
    'id': '@increment',
    'system': '@csentence',
    'countNum': '@increment',
    'module': name,
    'status': 1,
    'remark': '@csentence',
    'createTime': '@datetime',
    'nameCn': '@csentence',
    'nameEn': name,
    'provider': name,
    'url': url,
    'source': '舟山市人口普查系统',
    'isTemplate|1': true
  }))

  itemData.push(Mock.mock({
    'id': '@increment',
    'nameCn': '@csentence',
    'nameEn': name,
    'length': '@increment',
    'source': '舟山市人口普查系统'
  }))

  pageInfo.push(Mock.mock({
    "pageId": '@increment',
    'nameCn': '@csentence',
    'nameEn': name,
    "source": '舟山市人口普查系统',
    "informationName": '资源目录名称',
    "type": "人口普查",
    "len": '@increment',
    "remark": '',
    "routine": '默认值',
    "createTime": "2018-07-19 05:17:15",
    "updateTime": "2018-07-19 05:17:15",
    "isChange|1": true,   // <0、待完善  1、已完善>
    "resultId": '@increment',
  }))
}

// 获取信息资源目录
export function catalog(params) {
  return {
    // isOpen: false,
    url: '/api/resultInfo/catalog',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'maps': dataList,
    }
  }
}

// 获取信息资源列表数据
export function list(params) {
  return {
    // isOpen: false,
    url: '/api/information/list',
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

// 获取信息资源详情
export function info(id) {
  return {
    // isOpen: false,
    url: '/sys/information/info' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList[0],
      'itemData': itemData,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1
      }
    }
  }
}

// 信息资源修改
export function update(params) {
  return {
    // isOpen: false,
    url: '/sys/information/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
}

// 信息资源删除
export function del(params) {
  return {
    // isOpen: false,
    url: '/sys/information/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
}

// 获取模板信息
export function template(params) {
  return {
    // isOpen: false,
    url: '/sys/information/template',
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

// 设置模板
export function setTemplate(params) {
  return {
    // isOpen: false,
    url: '/sys/information/setTemplate',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 获取采集结果-查看-信息项列表
export function itemList(params) {
  return {
    // isOpen: false,
    url: '/api/element/list',
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

// 获取信息项-数据转换列表
export function itemConversion(params) {
  return {
    // isOpen: false,
    url: '/api/resultInfo/query_result_id',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'resultInfos': [{
        "id": 18,
        "system": "部门登记",
        "module": '部门登记模块名称',
        "creatTime": "2018-07-19 05:17:15",
        "isModel": 0,
        "linkId": 18,
        "state": 1,
        'pageInfo': pageInfo
      }],
      'page': {
        'totalCount': pageInfo.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1
      }
    }
  }
}

// 获取信息项-数据转换列表-查看数据
export function iteminfo(id) {
  return {
    // isOpen: false,
    url: '/api/pageInfo/query_id' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': pageInfo[0]
    }
  }
}

// 获取信息项-数据转换列表-补充数据 
export function itemSuppleUpdate(params) {
  return {
    // isOpen: false,
    url: '/api/pageInfo/chang_data',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
}





// 获取信息项详情
export function item(id) {
  return {
    // isOpen: false,
    url: '/api/element/info' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList[0]
    }
  }
}

// 信息项修改
export function itemUpdate(params) {
  return {
    // isOpen: false,
    url: '/sys/information/itemUpdate',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
}

// 信息项删除
export function itemDelete(params) {
  return {
    // isOpen: false,
    url: '/api/element/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
}
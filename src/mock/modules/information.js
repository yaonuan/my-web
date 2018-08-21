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
    'linkId': '@increment',
    'elementId': '@increment',
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
    "type": '2',
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
    "type": '2',
    "len": '@increment',
    "remark": '',
    "routine": '默认值',
    "createTime": "2018-07-19 05:17:15",
    "updateTime": "2018-07-19 05:17:15",
    "isChange|1": true,   // <0、待完善  1、已完善>
    "resultId": '@increment',
  }))
}

var options = [
  {
    value: '1',
    label: '长文本Text'
  },
  {
    value: '2',
    label: '浮点型F'
  },
  {
    value: '3',
    label: '双精度型B'
  }
]

var infoData = [
        {
            "id": 26,
            "system": "淮安信息系统整合平台26",
            "module": "国脉内网模块查询",
            "createTime": "2018-07-30 09:55:12",
            "isModel": 1,
            "linkId": 20,
            "changeState": 1,
            "state": 1,
            "pageInfo": null,
            "elementInfo": [
                {
                    "elementId": 3,
                    "nameCn": "地址",
                    "nameEn": "dz",
                    "source": "系统名称",
                    "informationName": "信息名称",
                    "type": "2",
                    "len": 225,
                    "remark": "描述1",
                    "resultId": 26,
                    "routine": "默认值1"
                },
                {
                    "elementId": 4,
                    "nameCn": "年龄",
                    "nameEn": "nl",
                    "source": "source",
                    "informationName": "资源名称",
                    "type": "1",
                    "len": 225,
                    "remark": "描述2",
                    "resultId": 26,
                    "routine": "默认值2"
                },
                {
                    "elementId": 5,
                    "nameCn": "操作",
                    "nameEn": "cz",
                    "source": "spider_element_info",
                    "informationName": "30号测试开始",
                    "type": "3",
                    "len": 255,
                    "remark": null,
                    "resultId": 26,
                    "routine": "null"
                },
                {
                    "elementId": 14,
                    "nameCn": "部门编号",
                    "nameEn": "bmbh",
                    "source": "11",
                    "informationName": "30号测试开始",
                    "type": "2",
                    "len": 11,
                    "remark": "11",
                    "resultId": 26,
                    "routine": "11"
                },
                {
                    "elementId": 17,
                    "nameCn": "是否内网结算部门",
                    "nameEn": "sfnwjsbm",
                    "source": "11",
                    "informationName": "30号测试开始",
                    "type": "1",
                    "len": 11,
                    "remark": "11",
                    "resultId": 26,
                    "routine": "11"
                }
            ]
        },
        {
            "id": 28,
            "system": "淮安信息系统整合平台28",
            "module": "国脉内网模块查询",
            "createTime": "2018-07-30 01:34:19",
            "isModel": 1,
            "linkId": 20,
            "changeState": 0,
            "state": 1,
            "pageInfo": null,
            "elementInfo": [
                {
                    "elementId": 15,
                    "nameCn": "部门名称",
                    "nameEn": "bmmc",
                    "source": "111",
                    "informationName": "30号测试开始",
                    "type": "1",
                    "len": 111,
                    "remark": "111",
                    "resultId": 28,
                    "routine": "null"
                },
                {
                    "elementId": 16,
                    "nameCn": "负责人",
                    "nameEn": "fzr",
                    "source": "国脉系统",
                    "informationName": "30号测试开始",
                    "type": "2",
                    "len": 255,
                    "remark": "国脉内网系统",
                    "resultId": 28,
                    "routine": "null"
                }
            ]
        },
        {
            "id": 37,
            "system": "淮安信息系统整合平台",
            "module": "国脉内网模块查询",
            "createTime": "2018-07-31 10:38:21",
            "isModel": 0,
            "linkId": 20,
            "changeState": 1,
            "state": 1,
            "pageInfo": null,
            "elementInfo": [
                {
                    "elementId": 18,
                    "nameCn": "所属大区",
                    "nameEn": "ssdq",
                    "source": "淮安信息系统整合平台",
                    "informationName": "信息采集",
                    "type": "1",
                    "len": 1,
                    "remark": "1",
                    "resultId": 37,
                    "routine": "1"
                }
            ]
        }
    ]


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
    url: '/api/linkInfo/query_accurate',
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
    url: '/api/resultInfo/conversion' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'results': infoData,
      // 'itemData': itemData,
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
    url: '/api/resultInfo/list',
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
    url: '/api/resultInfo/datachallege',
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

// 获取信息项-数据转换列表-删除
export function itemConversionDelete(params) {
  return {
    // isOpen: false,
    url: '/api/pageInfo/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
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

// 获取类型列表
export function typeList(params) {
  return {
    // isOpen: false,
    url: '/api/information/typeList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': options
    }
  }
}
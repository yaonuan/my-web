import Mock from 'mockjs'

Mock.Random.extend({
  constellation: function(date) {
      var constellations = ['0','1']
      return this.pick(constellations)
    }
})

var paramsList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  let number = Mock.Random.constellation()
  paramsList.push(Mock.mock({
    'linkInfoId': '@increment',
    'module': name
  }))
}

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  let number = Mock.Random.constellation()
  dataList.push(Mock.mock({
    'jobId': '@increment',
    'beanName': '自动化采集任务',
    'methodName': '自动化采集方法',
    'params': ["zhinan", "shejiyuanze", "kekong"],
    'cronExpression': '0 0/30 * * * ?',
    'status': number,
    'remark': '@csentence',
    'createTime': '@datetime',
    'paramsList': paramsList
  }))
}

// 获取定时任务列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/schedule/list',
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

// 获取定时任务信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/schedule/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'schedule': dataList[0],
    }
  }
}

// 获取定时任务信息-采集系统模块列表
export function getModule () {
  return {
    // isOpen: false,
    url: '/api/linkInfo/module',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': moduleList
    }
  }
}

// 添加定时任务
export function add () {
  return {
    // isOpen: false,
    url: '/sys/schedule/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// import isInteger from 'lodash/isInteger'

// // 获取定时任务列表
// export function list (params) {
//   return {
//     // isOpen: false,
//     url: '/sys/schedule/list',
//     type: 'get',
//     data: {}
//   }
// }

// // 获取定时任务信息
// export function info (id) {
//   return {
//     // isOpen: false,
//     url: '/sys/schedule/info' + (isInteger(id) ? `/${id}` : ''),
//     type: 'get',
//     data: {}
//   }
// }

// // 添加定时任务
// export function add (params) {
//   return {
//     // isOpen: false,
//     url: '/sys/schedule/save',
//     type: 'post',
//     data: {}
//   }
// }

// 修改定时任务
export function update (params) {
  return {
    // isOpen: false,
    url: '/sys/schedule/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除定时任务
export function del (params) {
  return {
    // isOpen: false,
    url: '/sys/schedule/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 运行定时任务
export function run (params) {
  return {
    // isOpen: false,
    url: '/sys/schedule/run',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 暂停定时任务
export function pause (params) {
  return {
    // isOpen: false,
    url: '/sys/schedule/pause',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 恢复定时任务
export function resume (params) {
  return {
    // isOpen: false,
    url: '/sys/schedule/resume',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}


var moduleList = [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]

import Mock from 'mockjs'

var dataList = []
var infoList = []
var trendData = []

Mock.Random.extend({
  title: function(date) {
    var titles = ['采集系统总数', '采集模块总数', '采集信息资源总数', '采集信息项总数']
    return this.pick(titles)
  },
  constellation: function(date) {
  	var constellations = [166,274,363]
  	return this.pick(constellations)
  }
})

for (let i = 1; i <= 4; i++) {
  let name = Mock.Random.name()
  let title = Mock.Random.title()

  infoList.push(Mock.mock({
    'id': i,
    'title': title,
    'count': '@increment'
  }))
}

for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  let cname = Mock.Random.ctitle()

  dataList.push(Mock.mock({
    'id': '@increment',
    'system': cname,
  }))
}

for (let i = 0; i < 12; i++) {
	let number = Mock.Random.constellation()
	trendData.push(Mock.mock({
	    xAxisData: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
	    seriesData: [{
			name: '采集模块数量',
			type: 'bar',
			data: [320, 332, 301, 334, 390, 150, 232, 201, number, 190, 184, 289]
		}, {
			name: '采集信息资源数量',
			type: 'bar',
			data: [220, 182, 191, 234, number, 98, 77, 101, 99, 40, 201, 154]
		}, {
			name: '采集信息项数量',
			type: 'bar',
			data: [150, 232, 201, 154, 190, 334, 390, 150, 232, 201, 154, number]
		}, {
			name: '清洗比对数量',
			type: 'bar',
			data: [number, 77, 101, 99, 40, 234, 290, 98, 77, 101, 99, 40]
		}]
	  }))
}

// ====================== 首页页面 =====================
// 获取首页信息统计数量
export function getInfoCount(params) {
  return {
    // isOpen: false,
    url: '/api/home/getInfoCount',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': infoList
    }
  }
}

// 获取系统平台列表
export function getSystemList(params) {
  return {
    // isOpen: false,
    url: '/api/home/getSystemList',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList
    }
  }
}

// 获取统计图表数据
export function getTrendData(params) {
  return {
    // isOpen: false,
    url: '/api/home/getTrendData',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': trendData[0]
    }
  }
}
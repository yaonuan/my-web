/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 获取路由名称, 根据url地址
 * @param {*} url
 */
export function getRouteNameByUrl(url) {
  let val = /.*\/(.*)\.html/.exec(url)
  return val && val.length >= 1 ? val[1] : ''
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 获取字符串字节长度
 * @param {*} s
 */
export function getStringLength(s) {
  return s.replace(/[\u4e00-\u9fa5\uff00-\uffff]/g, '**').length
}

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 获取元素的xPath属性
 */
export function createXPathFromElement(elm) {
  var allNodes = document.getElementsByTagName('*');
  for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
    if (elm.hasAttribute('id')) {
      var uniqueIdCount = 0;
      for (var n = 0; n < allNodes.length; n++) {
        if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id)
          uniqueIdCount++;
        if (uniqueIdCount > 1) break;
      }
      if (uniqueIdCount == 1) {
        segs.unshift('id("' + elm.getAttribute('id') + '")');
        return segs.join('/');
      } else {
        segs.unshift(
          elm.localName.toLowerCase() +
          '[@id="' +
          elm.getAttribute('id') +
          '"]'
        );
      }
    } else if (elm.hasAttribute('class')) {
      segs.unshift(
        elm.localName.toLowerCase() +
        '[@class="' +
        elm.getAttribute('class') +
        '"]'
      );
    } else {
      for (
        var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling
      ) {
        if (sib.localName == elm.localName) i++;
      }
      segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
    }
  }
  return segs.length ? '/' + segs.join('/') : null;
}

/**
 * ES6方式获取元素的xPath属性
 */
export function getXPathForElement(element) {
  //*[@id="simLoginContent"]/form/div[3]/input
  const idx = (sib, name) =>
    sib ?
    idx(sib.previousElementSibling, name || sib.localName) +
    (sib.localName == name) :
    1;
  const segs = elm =>
    !elm || elm.nodeType !== 1 ? [''] :
    // elm.id && document.querySelector(`#${elm.id}`) === elm ? [`//*[@id="${elm.id}"]`] : [
    elm.id && document.getElementById(`${elm.id}`) === elm ? [`//*[@id="${elm.id}"]`] : [
      ...segs(elm.parentNode),
      `${elm.localName.toLowerCase()}[${idx(elm)}]`
    ];
  return segs(element).join('/');
}

/**
 * 根据xPath获取Dom元素
 */
export function getElementByXPath(path) {
  return new XPathEvaluator().evaluate(
    path,
    document.documentElement,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

/**
 * 数据转换中的类型选项
 */
export function getTypeOptions() {
  return [{
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
    },
    {
      value: '4',
      label: '货币型Y'
    },
    {
      value: '5',
      label: '数值型N'
    },
    {
      value: '6',
      label: '整型I'
    },
    {
      value: '7',
      label: '通用型G'
    },
    {
      value: '8',
      label: '日期时间型T'
    },
    {
      value: '9',
      label: '字符型C'
    },
    {
      value: '10',
      label: '备注型M'
    },
    {
      value: '11',
      label: '二进制Blob'
    },
    {
      value: '12',
      label: '日期型D'
    },
    {
      value: '13',
      label: '逻辑型L'
    }
  ]
}

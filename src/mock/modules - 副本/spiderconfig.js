import isInteger from 'lodash/isInteger'

// 生成数据列表
var dataList = []
var pageInfos = []
var lastDataList = []
var currentDataList = []
Mock.Random.extend({
  constellation: function(date) {
      var constellations = ['0','1','2']
      return this.pick(constellations)
    }
})

for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  let name = Mock.Random.name()
  let cname = Mock.Random.ctitle()
  let url = Mock.Random.domain()
  let number = Mock.Random.constellation()

  dataList.push(Mock.mock({
    'id': '@increment',
    'linkId': '@increment',
    'resultId': '@increment',  // 采集结果页面 - 查看 (需要这个字段)
    'system': cname,
    'module': name,
    'url': url,
    'isLogin': 1,
    'hasTarget|1': true,
    'createTime': '@datetime',
    'type': '手动采集',
    'count': '@increment',
    'params': '-',
    'cronExpression': '0 0/30 * * * ?',
    'status': 1,
    'remarks': '@csentence',
    'changeState': number
  }))

  lastDataList.push(Mock.mock({
    'id': '@increment',
    'nameCn': name,
    'nameEn': name,
  }))

  currentDataList.push(Mock.mock({
    'id': '@increment',
    'nameCn': name,
    'nameEn': name,
  }))

  pageInfos.push(Mock.mock({
    'pageId': '@increment',
    'nameCn': name,
    'nameEn': name,
  }))
}

// ====================== 采集站点配置页面 =====================
// 获取采集站点配置列表
export function list(params) {
  return {
    // isOpen: false,
    url: '/api/linkInfo/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
      }
    }
  }
}

// 获取采集站点配置信息
export function info(id) {
  return {
    // isOpen: false,
    url: '/api/linkInfo/info' + (isInteger(id) ? `/${id}` : ''),
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList[0],
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
      }
    }
  }
}

// 添加采集站点配置
export function add(params) {
  return {
    // isOpen: false,
    url: '/api/linkInfo/save',
    type: 'post',
    data: {
      type: 'success',
      'msg': 'success',
      'code': 0,
    }
  }
}

// 修改采集站点配置
export function update(params) {
  return {
    // isOpen: false,
    url: '/api/linkInfo/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
}

// 删除采集站点配置
export function del(params) {
  return {
    // isOpen: false,
    url: '/api/linkInfo/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
    }
  }
}

// 获取模拟登录页面
export function getLoginPage(params) {
  return {
    // isOpen: false,
    url: '/api/target/analog_login_one',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'url': 'https://www.163.com',
      'contents': `<form name="loginForm" style="height: 500px">
                    <div><label>用户名</label><input name="username" class="username" /></div>
                    <div><label>密码</label><input name="password" id="password" type="password" /></div>
                    <div><label>验证码</label><input name="code" /><img src="https://www.163.com"></div>
                    <div><button>登录</button></div>
                  </form>`
    }
  }
}

// 获取登录页面的参数，并传给后台
export function getLoginParams(params) {
  return {
    // isOpen: false,
    url: '/api/target/analog_login_two',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// ====================== 单点采集页面 =====================
// 单点采集
export function spider(params) {
  return {
    // isOpen: false,
    url: '/api/target/spdier_point',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'url': 'https://www.163.com',
      'contents': spiderStr
    }
  }
}

// 获取采集项目
export function getSpiderItems(params) {
  return {
    // isOpen: false,
    url: '/api/target/spider_head',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'pageInfos': pageInfos
    }
  }
}

// 将获取到的采集项目保存
export function saveInfo(params) {
  return {
    // isOpen: false,
    url: '/api/target/spider_head_update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}


// ====================== 采集结果页面 =====================
// 获取采集结果
export function getResult(params) {
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
        'currPage': 1,
      }
    }
  }
}

// 获取采集的比对列表数据
export function comparison(params) {
  return {
    // isOpen: false,
    url: '/sys/spiderconfig/comparison',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList,
      }
    }
  }
}

// 获取所有模板数据，用来比对
export function getAllTemplate(params) {
  return {
    // isOpen: false,
    url: '/api/resultInfo/is_model',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': currentDataList
    }
  }
}

// 获取当前的采集结果，用来比对结果
export function getCurrentDataList(params) {
  return {
    // isOpen: false,
    url: '/api/resultInfo/comparison',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': currentDataList
    }
  }
}

// 获取已选择的模板数据，用来比对结果
export function getChooseDataList(params) {
  return {
    // isOpen: false,
    url: '/api/resultInfo/comparison',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0,
      'list': lastDataList
    }
  }
}


var spiderStr = `<html>
 <head> 
  <meta charset="utf-8"> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <meta name="renderer" content="webkit|ie-comp|ie-stand"> 
  <title>平台登记</title> 
  <meta name="keywords" content=""> 
  <meta name="description" content=""> 
  <link rel="shortcut icon" href="http://ioa.govmade.com/template/2/default/_files/img/favicon.ico"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/bootstrap.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/font-awesome.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/plugins/dataTables/dataTables.bootstrap.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/animate.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/iconfont.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/plugins/iCheck/custom.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/zoomify.min.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/notes.css" rel="stylesheet"> 
  <link href="http://ioa.govmade.com/template/2/default/_files/css/labels-detail.css" rel="stylesheet"> 
  <link rel="stylesheet" href="http://ioa.govmade.com/template/2/default/_files/js/plugins/layer/skin/layer.css" id="layui_layer_skinlayercss" style=""> 
  <link rel="stylesheet" href="http://ioa.govmade.com/template/2/default/_files/js/plugins/layer/laydate/theme/default/laydate.css?v=5.0.9" id="layuicss-laydate"> 
  <style>
.divs{
display: none;
}
</style> 
 </head> 
 <body class="gray-bg"> 
  <div class="wrapper wrapper-content animated fadeInRight"> 
   <div class="row"> 
    <div class="col-sm-12"> 
     <div class="ibox no-margins"> 
      <div class="ibox-title"> 
       <h5>平台登记</h5> 
       <span class="dataRemarks">[共10资源]</span> 
      </div> 
      <div class="ibox-content"> 
       <div class="row"> 
        <div class="col-sm-12"> 
         <form id="file_form" action="http://ioa.govmade.com/innerExcel/excelImport" enctype="multipart/form-data" method="post"> 
          <div class="form-inline search-form-box"> 
           <div id="import-box" style="display:none;"> 
            <input type="hidden" name="nodeId" value="434"> 
            <div class="form-group pic-upload"> 
             <input type="text" id="filename" class="form-control"> 
             <a href="javascript:void(0);" class="btn btn-gray input-file" style="margin:0;">选择文件<input type="file" name="file" id="file_input"></a> 
            </div> 
            <button class="btn btn-sm btn-primary btn-search" type="submit" id="upFile-btn">提交</button> 
            <a class="btn btn-gray btn-search" href="/innerExcel/getExcelModel?modelId=373" target="_blank"><i class="fa fa-file-excel-o"></i> 模板下载</a> 
            <!-- <a class="btn btn-gray btn-search" href="http://ioa.govmade.com/excl/platform.xls" target="_blank"><i class="fa fa-file-excel-o"></i> 模板下载</a> --> 
           </div> 
          </div> 
         </form> 
         <form role="form" id="myform" class="form-inline search-form-box" action="http://ioa.govmade.com/inner/list/434"> 
          <input type="hidden" name="isPrivate" value="0"> 
          <div class="form-group"> 
           <label>平台名称:&nbsp;</label> 
           <input type="text" placeholder="请输入平台名称" class="form-control" name="search_CONTAIN_detail.title" value=""> 
          </div> 
          <div class="form-group"> 
           <label>发布人:&nbsp;</label> 
           <input type="text" placeholder="请输入发布人" class="form-control" name="search_CONTAIN_creator.realName" value=""> 
          </div> 
          <button class="btn btn-sm btn-primary btn-search" type="button" onclick="$('#page').val('0')[0].form.submit();"><strong>搜索</strong></button> 
         </form> 
        </div> 
       </div> 
       <table class="table table-striped table-bordered table-hover"> 
        <thead> 
         <tr> 
          <th width="30%">平台名称</th> 
          <th>负责人</th> 
          <th>发布人</th> 
          <th width="15%">操作</th> 
         </tr> 
        </thead> 
        <tbody> 
         <tr id="tr3379"> 
          <td>海工装备平台</td> 
          <td> 王虎&nbsp; </td> 
          <td>陈飞娜</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/3379?type=0" title="平台登记详情" data-index="0"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr3378"> 
          <td>中船通</td> 
          <td> 王虎&nbsp; </td> 
          <td>陈飞娜</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/3378?type=0" title="平台登记详情" data-index="1"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr694"> 
          <td>佛山政企通平台</td> 
          <td> 陈晓芳&nbsp; </td> 
          <td>陈晓芳</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/694?type=0" title="平台登记详情" data-index="2"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr183"> 
          <td>蟠桃会</td> 
          <td> 黄磊&nbsp; </td> 
          <td>潘超巧</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/183?type=0" title="平台登记详情" data-index="3"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr160"> 
          <td>蟠桃会会议平台</td> 
          <td> 唐鹏&nbsp; 黄磊&nbsp; </td> 
          <td>楼晓燕</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/160?type=0" title="平台登记详情" data-index="4"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr158"> 
          <td>国脉智慧城市网</td> 
          <td> 徐向南&nbsp; </td> 
          <td>徐向南</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/158?type=0" title="平台登记详情" data-index="5"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr150"> 
          <td>数邦客</td> 
          <td> 刘丹&nbsp; </td> 
          <td>刘丹</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/150?type=0" title="平台登记详情" data-index="6"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr136"> 
          <td>司马钱</td> 
          <td> 申镇铨&nbsp; </td> 
          <td>申镇铨</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/136?type=0" title="平台登记详情" data-index="7"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr133"> 
          <td>国脉物联网</td> 
          <td> 陈宏&nbsp; </td> 
          <td>何雪萍</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/133?type=0" title="平台登记详情" data-index="8"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
         <tr id="tr124"> 
          <td>国脉电子政务网</td> 
          <td> 洪琼&nbsp; </td> 
          <td>洪琼</td> 
          <td> 
           <div class="btn-group-deal"> 
            <a class="J_indexItem" href="/inner/views/124?type=0" title="平台登记详情" data-index="9"><i class="fa fa-eye"></i>查看</a> 
           </div></td> 
         </tr> 
        </tbody> 
       </table> 
       <div class="row form-inline page-line"> 
        <div class="col-sm-5"> 
         <input type="hidden" id="page" name="page" value="0"> 
         <div class="dataTables_length"> 
          <label>共 10 项，每页 </label> 
          <select class="form-control input-sm pageSize" id="pageSize" name="pageSize" onchange="this.form.submit();"> <option value="10" selected>10</option> <option value="25">25</option> <option value="50">50</option> <option value="100">100</option> </select> 
          <label> 条记录</label> 
         </div> 
        </div> 
        <div class="col-sm-7"> 
         <div class="dataTables_paginate"> 
          <ul class="pagination"> 
           <li class="previous disabled"><a href="javascript:;">上一页</a></li> 
           <li class="active"> <a href="javascript:;" onclick="$('#page').val('0')[0].form.submit();">1</a> </li> 
           <li class="previous disabled"><a href="javascript:;">下一页</a></li> 
          </ul> 
          <span class="jump-text">跳转至第<input style="width: 70px" class="text form-control" type="number" id="nums">页</span> 
          <a class="btn btn-white" id="tzbtn"><span>确定</span></a> 
         </div> 
        </div> 
       </div> 
      </div> 
     </div> 
    </div> 
   </div> 
  </div> 
  <style type="text/css">
#zzc{
display: none;
}
</style> 
  <div class="layer-mask" id="zzc"> 
   <div class="loadEffect"> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
    <span></span> 
   </div> 
  </div>  
 </body>
</html>`

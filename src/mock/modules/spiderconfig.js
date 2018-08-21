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
    'system': name,
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
      'src': '../../../static/page/index.html',
      'url': 'https://www.163.com',
      'contents': content,
      'contents1': `<form name="loginForm" style="height: 500px">
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
      'src': '../../../static/page/table.html',
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

// 获取采集结果 - 转化
export function getConviersion(params) {
  return {
    // isOpen: false,
    url: '/api/resultInfo/challenge',
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

var content = `<html lang="en">
 <head> 
  <title>海沧区公共安全主题数据资源管理系统</title> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0"> 
  <link rel="shortcut icon" href="http://115.233.227.46:18080/hcdata/static/favicon.ico"> 
  <link href="http://115.233.227.46:18080/hcdata/static/css/bootstrap.min.css?v=3.3.6" rel="stylesheet"> 
  <!-- <link rel="stylesheet" href="http://115.233.227.46:18080/hcdata/static/static/css/system/system/login.css" /> --> 
  <link href="http://115.233.227.46:18080/hcdata/static/css/index.css" rel="stylesheet"> 
  <!--[if lte IE 8]><![endif]--> 
  <style>
  .min-width-wrapper {width: 100%;min-width: 1200px;}
  .login {position: relative;width: 100%;height: 100vh;min-height: 620px;text-align: center;min-height: 620px;}
  .skin-1 .login{background: linear-gradient(#015293 50%, #fff 50%);background: -moz-linear-gradient(#015293 50%, #fff 50%);background: -webkit-linear-gradient(#015293 50%, #fff 50%);background: -o-linear-gradient(#015293 50%, #fff 50%);}
  .skin-1 .login-wrapper {position: absolute; top: 50%; left: 50%; width: 718px;margin-left: -359px;margin-top: -250px;}
  .skin-1 .login-wrapper .login-box{border-radius: 10px;margin: 30px auto;width: 718px;height: 350px;background: #fff;box-shadow: 2px 2px 2px #888888; padding: 60px;}
  .skin-1 .login-wrapper .content-left {width: 300px;}
  .skin-1 .login-wrapper .case-verify {width: 210px;}
  .skin-1 .pull-right .img {margin-top: -20px;}
  .skin-1 .btn-submit {background: #015293;color: #fff;}
  .skin-1 .btn-submit:hover {background: #0060ad;}
  .copyright {color: #444;font-size: 14px;}
  .title {font-size: 40px;color: #fff;line-height: 56px;display: inline-block;}
  .font-red {color:red}
</style> 
  <link rel="stylesheet" href="http://115.233.227.46:18080/hcdata/static/js/plugins/layer/skin/default/layer.css?v=3.0.11110" id="layuicss-skinlayercss"> 
  <link rel="stylesheet" href="http://115.233.227.46:18080/hcdata/static/js/plugins/layer/skin/../extend/layer.ext.js" id="layuicss-skinextendlayerextjs"> 
 </head> 
 <body class="skin-1 min-width-wrapper"> 
  <div class="login"> 
   <div class="login-wrapper register-page"> 
    <div class="title"> 
     <!-- <img class="logo" src="http://115.233.227.46:18080/hcdata/static/images/skin/skin-1/dnalogo.png"/> --> 海沧区公共安全主题数据资源管理系统 
    </div> 
    <div class="login-box clearfix"> 
     <div class="pull-left register-page-case content-left"> 
      <div id="loginForm"> 
       <div class="form-group user-case"> 
        <input class="form-control" type="text" id="loginName" name="loginName" value="admin" required autocomplete="off" placeholder="请输入账号"> 
       </div> 
       <div class="form-group lock-case"> 
        <input class="form-control" type="password" id="password" name="password" value="123456" required maxlength="16" autocomplete="off" placeholder="请输入密码"> 
       </div> 
       <div class="form-group verify-case clearfix"> 
        <input class="form-control case-verify pull-left" id="verifyCodeId" name="verifyCode" required maxlength="4" type="tel" onkeyup="this.value=this.value.replace(/\D/g,'')"> 
        <img class="verify pull-right" id="vimg" style="cursor: pointer;" title="验证码" width="90" height="34" src="http://115.233.227.46:18080/hcdata/login/verifyCode?random=0.7304289337922849" autocomplete="off"> 
       </div> 
       <input class="btn btn-default btn-submit btn-block" id="loginBtn" type="button" value="登 录">&nbsp;&nbsp; 
       <span class="font-red pull-left" id="msgLabel"></span> 
       <a href="http://115.233.227.46:18080/hcdata/static/upload/ChromeStandalone_56.0.2924.87_Setup.exe" class="download-chrome pull-right">适配浏览器下载</a> 
      </div> 
     </div> 
     <div class="pull-right"> 
      <img class="img" src="http://115.233.227.46:18080/hcdata/static/images/skin/skin-1/zt.png"> 
     </div> 
    </div> 
    <p class="copyright">Copyright © 2017 国脉海洋信息发展有限公司</p> 
   </div> 
  </div> 
  <!-- [if !IE]> --> 
  <!-- <![endif] --> 
  <!--[if lte IE 8] --> 
  <!-- [endif] -->  
 </body>
</html>`

var content1 = `<html lang="en">
 <head> 
  <link rel="icon" href="http://115.233.227.46:18080/images/icon/1.ico" type="image/x-icon"> 
  <title>肇庆市政务信息资产管理平台</title> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0"> 
  <link rel="shortcut icon" href="http://115.233.227.46:18080/zqdata/static/favicon.ico"> 
  <link href="http://115.233.227.46:18080/zqdata/static/css/bootstrap.min.css?v=3.3.6" rel="stylesheet"> 
  <!-- <link rel="stylesheet" href="http://115.233.227.46:18080/zqdata/static/static/css/system/system/login.css" /> --> 
  <link href="http://115.233.227.46:18080/zqdata/static/css/index.css" rel="stylesheet"> 
  <!--[if lte IE 8]><![endif]--> 
  <style>
  .min-width-wrapper {width: 100%;min-width: 1200px;}
  .login {position: relative;width: 100%;height: 100vh;min-height: 620px;text-align: center;min-height: 620px;}
  .skin-1 .login{background: linear-gradient(#015293 50%, #fff 50%);background: -moz-linear-gradient(#015293 50%, #fff 50%);background: -webkit-linear-gradient(#015293 50%, #fff 50%);background: -o-linear-gradient(#015293 50%, #fff 50%);}
  .skin-1 .login-wrapper {position: absolute; top: 50%; left: 50%; width: 718px;margin-left: -359px;margin-top: -250px;}
  .skin-1 .login-wrapper .login-box{border-radius: 10px;margin: 30px auto;width: 718px;height: 350px;background: #fff;box-shadow: 2px 2px 2px #888888; padding: 60px;}
  .skin-1 .login-wrapper .content-left {width: 300px;}
  .skin-1 .login-wrapper .case-verify {width: 210px;}
  .skin-1 .pull-right .img {margin-top: -20px;}
  .skin-1 .btn-submit {background: #015293;color: #fff;}
  .skin-1 .btn-submit:hover {background: #0060ad;}
  .copyright {color: #444;font-size: 14px;}
  .title {font-size: 40px;color: #fff;line-height: 56px;display: inline-block;}
</style> 
  <link rel="stylesheet" href="http://115.233.227.46:18080/zqdata/static/js/plugins/layer/skin/default/layer.css?v=3.0.11110" id="layuicss-skinlayercss"> 
  <link rel="stylesheet" href="http://115.233.227.46:18080/zqdata/static/js/plugins/layer/skin/../extend/layer.ext.js" id="layuicss-skinextendlayerextjs"> 
 </head> 
 <body class="skin-1 min-width-wrapper"> 
  <div class="login"> 
   <div class="login-wrapper register-page"> 
    <div class="title"> 
     <img class="logo" src="http://115.233.227.46:18080/zqdata/static/images/skin/skin-1/dnalogo.png"> 肇庆市政务信息资产管理平台 
    </div> 
    <div class="login-box clearfix"> 
     <!--<div class="pull-left register-page-case content-left">
          <form id="loginForm" action="http://115.233.227.46:18080/zqdata/login" method="post">
            <div class="form-group user-case case">
              <input class="form-control" type="text"
                id="accountNameId" name="accountName" required="required"
                placeholder="请输入用户名">
            </div>
            <div class="form-group lock-case case">
              <input class="form-control" type="password"
                id="passwordId" name="password" required="required"
                maxlength="16" class="form-control" placeholder="请输入密码">
            </div>
            <div class="form-group verify-case case clearfix">
                <input class="form-control case-verify pull-left"
                  id="verifyCodeId" name="verifyCode" required="required"
                  maxlength="4" type="tel" class="form-control"
                  placeholder="请输入验证码" title="验证码"
                  onkeyup="this.value=this.value.replace(/\D/g,'')">
                  <img class="verify pull-right" id="vimg" style="cursor: pointer;" title="验证码"
                  width="90" height="34" src="http://115.233.227.46:18080/zqdata/login/verifyCode?random=0.7304289337922849" />
            </div>
              <input class="btn btn-default btn-submit btn-block" type="submit" value="登 录"/>
            
          </form>
        </div>--> 
     <div class="pull-left register-page-case content-left"> 
      <form id="loginForm" action="http://115.233.227.46:18080/zqdata/login" method="post"> 
       <div class="form-group user-case"> 
        <input class="form-control" type="text" id="loginName" name="loginName" required value="admin" autocomplete="off"> 
       </div> 
       <div class="form-group lock-case"> 
        <input class="form-control" type="password" id="password" name="password" required maxlength="16" autocomplete="off"> 
       </div> 
       <div class="form-group verify-case clearfix"> 
        <input class="form-control case-verify pull-left" id="verifyCodeId" name="verifyCode" required maxlength="4" type="tel" onkeyup="this.value=this.value.replace(/\D/g,'')"> 
        <img class="verify pull-right" id="vimg" style="cursor: pointer;" title="验证码" width="90" height="34" src="http://115.233.227.46:18080/zqdata/login/verifyCode?random=0.7304289337922849" autocomplete="off"> 
        <!-- 用于测试 --> 
        <!--   <input type=hidden name="verifyCodeNum" value=""> --> 
       </div> 
       <input class="btn btn-default btn-submit btn-block" type="submit" value="登 录">&nbsp;&nbsp; 
       <a href="http://115.233.227.46:18080/zqdata/static/upload/ChromeStandalone_56.0.2924.87_Setup.exe" class="download-chrome pull-right">适配浏览器下载</a> 
      </form> 
     </div> 
     <div class="pull-right"> 
      <img class="img" src="http://115.233.227.46:18080/zqdata/static/images/skin/skin-1/zt.png"> 
     </div> 
    </div> 
    <p class="copyright">Copyright © 2017 国脉海洋信息发展有限公司</p> 
   </div> 
  </div> 
  <!-- <div class="register-page">
    <div class="container-fluid">
      <div class="row skin-bg">
        <div
          class="col-md-4 col-sm-6 col-xs-10 col-md-offset-4 col-sm-offset-3 col-xs-offset-1 page-case">
          <h2 class="text-center title">
          </h2>
          <div class="register-page-case">
            <h3>账号登录</h3>
            <form id="loginForm" method="post">
              <div class="form-group user-case case">
                <i></i> <input class="form-control" type="text"
                  id="accountNameId" name="accountName" required="required"
                  placeholder="请输入用户名">
              </div>
              <div class="form-group lock-case case">
                <i></i> <input class="form-control" type="password"
                  id="passwordId" name="password" required="required"
                  maxlength="16" class="form-control" placeholder="请输入密码">
              </div>
              <div class="form-group verify-case case">
                <div class="">
                  <i></i> <input class="form-control case-verify"
                    id="verifyCodeId" name="verifyCode" required="required"
                    maxlength="4" type="tel" class="form-control"
                    placeholder="请输入验证码"
                    onkeyup="this.value=this.value.replace(/\D/g,'')"> <img
                    class="verify" id="vimg" style="cursor: pointer;" title="验证码"
                    width="60" height="34" />
                </div>
              </div>
              <button type="button" id="loginBtn"
                class="btn btn-default btn-submit btn-block">登 录</button>
              <a
                href="http://115.233.227.46:18080/upload/excel/ChromeStandalone_56.0.2924.87_Setup.exe"
                class="download-chrome pull-right">适配浏览器下载</a>
            </form>
          </div>
        </div>
      </div>
      <p class="last-copyright">Copyright © 2016 国脉海洋信息发展有限公司</p>
    </div>
  </div> --> 
  <!-- /signup-box --> 
  <!--  --> 
  <!-- [if !IE]> --> 
  <!-- <![endif] --> 
  <!--[if lte IE 8] --> 
  <!-- [endif] -->  
 </body>
</html>`

var content2 = `<html lang="en">
 <head> 
  <title>湘西州政务信息普查系统</title> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0"> 
  <link rel="shortcut icon" href="http://114.55.11.227:18088/cityhunan/favicon.ico"> 
  <link href="http://114.55.11.227:18088/cityhunan/static/css/bootstrap.min.css?v=3.3.6" rel="stylesheet"> 
  <!-- <link rel="stylesheet" href="http://114.55.11.227:18088/cityhunan/static/css/system/system/login.css" /> --> 
  <link href="http://114.55.11.227:18088/cityhunan/static/css/index.css" rel="stylesheet"> 
  <link rel="stylesheet" href="http://114.55.11.227:18088/cityhunan/static/css/skin/skin-1.css"> 
  <!--[if lte IE 8]><![endif]--> 
  <style>
  .min-width-wrapper {width: 100%;min-width: 1200px;}
  .login {position: relative;width: 100%;height: 100vh;min-height: 620px;text-align: center;min-height: 620px;}
  .skin-1 .login{background: linear-gradient(#015293 50%, #fff 50%);background: -moz-linear-gradient(#015293 50%, #fff 50%);background: -webkit-linear-gradient(#015293 50%, #fff 50%);background: -o-linear-gradient(#015293 50%, #fff 50%);}
  .skin-1 .login-wrapper {position: absolute; top: 50%; left: 50%; width: 718px;margin-left: -359px;margin-top: -250px;}
  .skin-1 .login-wrapper .login-box{border-radius: 10px;margin: 30px auto;width: 718px;height: 350px;background: #fff;box-shadow: 2px 2px 2px #888888; padding: 60px;}
  .skin-1 .login-wrapper .content-left {width: 300px;}
  .skin-1 .login-wrapper .case-verify {width: 210px;}
  .skin-1 .pull-right .img {margin-top: -20px;}
  .skin-1 .btn-submit {background: #015293;color: #fff;}
  .skin-1 .btn-submit:hover {background: #0060ad;}
  .copyright {color: #444;font-size: 14px;}
  .title {font-size: 40px;color: #fff;line-height: 56px;display: inline-block;}
</style> 
  <link rel="stylesheet" href="http://114.55.11.227:18088/cityhunan/static/js/plugins/layer/skin/default/layer.css?v=3.0.11110" id="layuicss-skinlayercss"> 
  <link rel="stylesheet" href="http://114.55.11.227:18088/cityhunan/static/js/plugins/layer/skin/../extend/layer.ext.js" id="layuicss-skinextendlayerextjs"> 
 </head> 
 <!-- <body class="hook-login skin-1"> --> 
 <body class="skin-1 min-width-wrapper"> 
  <div class="login"> 
   <div class="login-wrapper register-page"> 
    <div class="title"> 
     <img class="logo" src="http://114.55.11.227:18088/cityhunan/static/images/skin/skin-1/logo2.png" style="width: 60px;"> 湘西州政务信息普查系统 
    </div> 
    <div class="login-box clearfix"> 
     <div class="pull-left register-page-case content-left"> 
      <form id="loginForm" method="post"> 
       <div class="form-group user-case case"> 
        <input class="form-control" type="text" id="accountNameId" name="accountName" required placeholder="请输入用户名"> 
       </div> 
       <div class="form-group lock-case case"> 
        <input class="form-control" type="password" id="passwordId" name="password" required maxlength="16" placeholder="请输入密码"> 
       </div> 
       <div class="form-group verify-case case clearfix"> 
        <input class="form-control case-verify pull-left" id="verifyCodeId" name="verifyCode" required maxlength="4" type="tel" placeholder="请输入验证码" onkeyup="this.value=this.value.replace(/\D/g,'')"> 
        <img class="verify pull-right" id="vimg" style="cursor: pointer;" title="验证码" width="90" height="34" src="http://114.55.11.227:18088/cityhunan/verifyCode/slogin.do?random=0.680608200840652"> 
       </div> 
       <button type="button" id="loginBtn" class="btn btn-default btn-submit btn-block">登 录</button> 
      </form> 
     </div> 
     <div class="pull-right"> 
      <img class="img" src="http://114.55.11.227:18088/cityhunan/static/images/skin/skin-1/zt.png"> 
     </div> 
    </div> 
    <p class="copyright">Copyright © 2016 国脉海洋信息发展有限公司</p> 
   </div> 
  </div> 
  <!-- <div class="register-page">
    <div class="container-fluid">
      <div class="row skin-bg">
        <div
          class="col-md-4 col-sm-6 col-xs-10 col-md-offset-4 col-sm-offset-3 col-xs-offset-1 page-case">
          <h2 class="text-center title">
            <img src="http://114.55.11.227:18088/cityhunan/upload/icon/1506675789223/timg111.jpg" alt="logo">
            <span>湘西州政务信息普查系统</span>
          </h2>
          <div class="register-page-case">
            <h3>账号登录</h3>
            <form id="loginForm" method="post">
              <div class="form-group user-case case">
                <i></i> <input class="form-control" type="text"
                  id="accountNameId" name="accountName" required="required"
                  placeholder="请输入用户名">
              </div>
              <div class="form-group lock-case case">
                <i></i> <input class="form-control" type="password"
                  id="passwordId" name="password" required="required"
                  maxlength="16" class="form-control" placeholder="请输入密码">
              </div>
              <div class="form-group verify-case case">
                <div class="">
                  <i></i> <input class="form-control case-verify"
                    id="verifyCodeId" name="verifyCode" required="required"
                    maxlength="4" type="tel" class="form-control"
                    placeholder="请输入验证码"
                    onkeyup="this.value=this.value.replace(/\D/g,'')"> <img
                    class="verify" id="vimg" style="cursor: pointer;" title="验证码"
                    width="60" height="34" />
                </div>
              </div>
              <button type="button" id="loginBtn"
                class="btn btn-default btn-submit btn-block">登 录</button>
              <a
                href="http://114.55.11.227:18088/cityhunan/upload/excel/ChromeStandalone_56.0.2924.87_Setup.exe"
                class="download-chrome pull-right">适配浏览器下载</a>
            </form>
          </div>
        </div>
      </div>
      <p class="last-copyright">Copyright © 2016 国脉海洋信息发展有限公司</p>
    </div>
  </div> --> 
  <!-- /signup-box --> 
  <!-- #dialog-confirm --> 
  <div id="jyConfirm" class="hide"> 
   <div class="center"> 
    <h4> <i class="icon-hand-right blue bigger-120"></i> <span id="jyConfirmStr"></span> </h4> 
   </div> 
  </div> 
  <div id="jyInfo" class="hide"> 
   <div class="center"> 
    <h4> <i class="icon-info-sign blue bigger-120"></i> <span id="jyInfoStr"></span> </h4> 
   </div> 
  </div> 
  <div id="jyError" class="hide"> 
   <div class="center"> 
    <h4> <i class="icon-warning-sign red bigger-120"></i> <span id="jyErrorStr"></span> </h4> 
   </div> 
  </div> 
  <div id="jyLoading" class="hide"> 
   <div class="center"> 
    <h4> <img alt="loading" src="http://114.55.11.227:18088/cityhunan/static/images/system/loading.gif"><span id="jyLoadingStr"></span> </h4> 
   </div> 
  </div>  
 </body>
</html>`

var spiderStr = `<html lang="en">
 <head> 
  <meta charset="utf-8"> 
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"> 
  <meta name="renderer" content="webkit"> 
  <title>湘西州政务信息普查系统</title> 
  <link href="http://114.55.11.227:18088/cityhunan/static/css/main.css" rel="stylesheet"> 
  <!-- <link href="http://114.55.11.227:18088/cityhunan/static/css/bootstrap.min.css?v=3.3.6" rel="stylesheet">
  <link href="http://114.55.11.227:18088/cityhunan/static/fonts/Font-Awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="http://114.55.11.227:18088/cityhunan/static/css/plugins/bootstrap-table/bootstrap-table.min.css" rel="stylesheet"> --> 
  <link href="http://114.55.11.227:18088/cityhunan/static/css/plugins/chosen/chosen.css" rel="stylesheet"> 
  <!-- <link href="http://114.55.11.227:18088/cityhunan/static/css/bootstrap-datetimepicker.min.css" rel="stylesheet"> --> 
  <link href="http://114.55.11.227:18088/cityhunan/static/css/plugins/iCheck/_all.css" rel="stylesheet"> 
  <link href="http://114.55.11.227:18088/cityhunan/static/css/style.css?v=4.1.0" rel="stylesheet"> 
  <link rel="stylesheet" href="http://114.55.11.227:18088/cityhunan/static/css/skin/skin-1.css"> 
  <link href="http://114.55.11.227:18088/cityhunan/static/fonts/default-font/iconfont.css" rel="stylesheet"> 
  <!--[if lte IE 8]><![endif]--> 
  <style type="text/css">
.c-list {
  cursor: auto !important;
}

.c-list li {
  cursor: pointer !important;
}

.data-info {
  display: none;
}

.info-label {
  cursor: pointer;
}

.i-checks {
  margin-top: 0px !important;
}

.hot-keyword {
  cursor: pointer;
}

.hot-keyword:hover {
  text-decoration: underline;
  color: red;
}

.com-count {
  padding: 0 15px 0 15px;
  background-color: #737973;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  margin: 5px;
}

.com-count .badge {
  margin-left: 5px;
}
.fast-search-content {
position: absolute;
top: 40px;
left: 20px;
right: 20px;
background:rgba(255,255,255, .8);
border: 1px solid #dfe6ec;
z-index: 10;
}
.com-count {
    padding: 0 15px 0 15px;
    background: rgba(255,255,255, .8);
    color: #1e70b2;
    border-radius: 3px;
    cursor: pointer;
    margin: 5px;
    font-size: 16px;
}
.com-count:hover {
  text-decoration: underline;
}

</style> 
  <link rel="stylesheet" href="http://114.55.11.227:18088/cityhunan/static/js/plugins/layer/skin/default/layer.css?v=3.0.11110" id="layuicss-skinlayercss"> 
  <link rel="stylesheet" href="http://114.55.11.227:18088/cityhunan/static/js/plugins/layer/skin/../extend/layer.ext.js" id="layuicss-skinextendlayerextjs"> 
 </head> 
 <body class="skin-1"> 
  <div class="wrapper wrapper-content"> 
   <div class="ibox float-e-margins"> 
    <div class="form-inline col-sm-12" style="position:relative;margin: 20px auto 0;    padding-left: 20px;"> 
     <div class="form-group"> 
      <input type="text" placeholder="输入关键字" name="keyword" class="form-control  search-content"> 
      <select class="form-control  sub-select-content1" name="it" style="width:195px;display:none;"> <option value=""></option> <option value="6"> oracle</option> <option value="14"> Mysql</option> <option value="13"> Oracle</option> <option value="4"> 县（市）区财局</option> <option value="3"> 县（市）区财政资金</option> <option value="8"> 无</option> <option value="6"> 无</option> <option value="7"> 无</option> <option value="9"> 无</option> <option value="3"> 系统日志+估算</option> <option value="3"> 无</option> <option value="6"> 无</option> <option value="5"> 无</option> <option value="7"> 无</option> <option value="6"> 其他</option> <option value="6"> 无</option> <option value="5"> 其他</option> <option value="6"> 无</option> <option value="10"> 无</option> <option value="8"> 无</option> <option value="6"> 无</option> <option value="5"> 无</option> <option value="4"> 其他</option> <option value="6"> 无</option> <option value="5"> 无</option> <option value="5"> 无</option> <option value="4"> 其他</option> <option value="5"> 无</option> <option value="4"> 其他</option> <option value="5"> 无</option> <option value="6"> 其他</option> <option value="8"> 其他</option> <option value="4"> 县（市）区级</option> <option value="3"> 州级</option> <option value="2"> 省级</option> <option value="1"> 国家</option> <option value=""> </option> <option value="12"> DB</option> <option value="7"> 每半年</option> <option value="12"> 数字型D</option> <option value="4"> 无</option> <option value="3"> 无</option> <option value="5"> 单机</option> <option value="1"> 无</option> <option value="7"> 无</option> <option value="4"> 业务专网</option> <option value="345"> 345</option> <option value="123"> 123</option> <option value="90"> 90</option> <option value="89"> 89</option> <option value="78"> 78</option> <option value="67"> 67</option> <option value="56"> 56</option> <option value="45"> 54</option> <option value="34"> 34</option> <option value="23"> 23</option> <option value="2"> 2</option> <option value="8"> 群众团体</option> <option value="7"> 民主党派、工商联</option> <option value="6"> 检察院</option> <option value="5"> 法院</option> <option value="4"> 政协</option> <option value="3"> 政府</option> <option value="2"> 人大</option> <option value="1"> 党委</option> <option value=""> </option> <option value="2"> 县区级</option> <option value="1"> 市级</option> <option value=""> </option> <option value="City"> 城市管理</option> <option value="4"> 数据库导入</option> <option value="3"> 数据表生成</option> <option value="2"> Excel导入</option> <option value="1"> 模版导入</option> <option value="0"> 手动添加</option> <option value=""> </option> <option value="4"> 其他资金</option> <option value="3"> 单位自筹资金</option> <option value="2"> 州财政资金</option> <option value="1"> 上级配套资金</option> <option value=""> </option> <option value="5"> 其他</option> <option value=""> </option> <option value="27"> 下拉多选</option> <option value="26"> 数据字典下拉框带按钮</option> <option value="25"> 方块单选</option> <option value="24"> 普通单选</option> <option value="23"> 文本</option> <option value="22"> 上传文件</option> <option value="21"> 共享条件选择</option> <option value="30"> 信息项数据类型</option> <option value="19"> 信息项共享方式</option> <option value="18"> 数据字典下拉框读取第三级 </option> <option value="17"> 上传控件</option> <option value="16"> 数据元分类配置 </option> <option value="15"> 表字段选择框</option> <option value="14"> 数据表选择框</option> <option value="13"> 数据库选择框</option> <option value="12"> 业务梳理</option> <option value="11"> 机房选择框</option> <option value="10"> 存储器选择框</option> <option value="9"> 服务器选择框</option> <option value="1"> 必填</option> <option value="2"> 非必填</option> <option value=""> </option> <option value="2"> 扩展元数据</option> <option value="1"> 核心元数据</option> <option value="1"> 目录元数据</option> <option value="2"> 数据元数据</option> <option value=""> </option> <option value="remove"> 删除</option> <option value="create"> 新增</option> <option value="update"> 更新</option> <option value=""> </option> <option value="11"> 浮点型F</option> <option value="10"> 整型I</option> <option value="9"> 双精度型B</option> <option value="8"> 通用型G</option> <option value="7"> 备注型M</option> <option value="6"> 逻辑型L</option> <option value="5"> 日期时间型T</option> <option value="4"> 日期型D</option> <option value="3"> 货币型Y</option> <option value="2"> 数值型N</option> <option value="1"> 字符型C</option> <option value=""> </option> <option value="5"> 等级审批中</option> <option value="4"> 未定密</option> <option value="3"> 绝密</option> <option value="2"> 机密</option> <option value="1"> 秘密</option> <option value=""> </option> <option value="7"> 等级审核中</option> <option value="6"> 未定级</option> <option value="5"> 五级</option> <option value="4"> 四级</option> <option value="3"> 三级</option> <option value="2"> 二级</option> <option value="1"> 一级</option> <option value=""> </option> <option value="5"> 面向社会公开</option> <option value="4"> 系统内地方各级跨部门共享</option> <option value="3"> 本部门内部级</option> <option value="2"> 内设机构内部</option> <option value="1"> 不共享</option> <option value=""> </option> <option value="4"> 社区（街道）</option> <option value="3"> 乡（镇）</option> <option value="2"> 县、市（区）</option> <option value="1"> 州</option> <option value=""> </option> <option value="5"> 其他</option> <option value="4"> 社会公众</option> <option value="3"> 系统内地方各级</option> <option value="2"> 本部门本级</option> <option value="1"> 处室内部</option> <option value=""> </option> <option value="9"> 其他</option> <option value="8"> Access</option> <option value="7"> Hbase</option> <option value="6"> PostgreSQL</option> <option value="5"> DB2</option> <option value="4"> Sybase</option> <option value="3"> Oracle</option> <option value="2"> MS SQL</option> <option value="1"> My sql</option> <option value=""> </option> <option value="7"> 其他</option> <option value="6"> 每年</option> <option value="5"> 每半年</option> <option value="4"> 按季</option> <option value="3"> 按月</option> <option value="2"> 按天</option> <option value="1"> 实时</option> <option value="5"> 其他</option> <option value="4"> 各企业报送</option> <option value="3"> 州县、市逐级报送</option> <option value="2"> 自动生成</option> <option value="1"> 人工录入</option> <option value=""> </option> <option value="3"> 物理隔离</option> <option value="2"> 与政务内网逻辑隔离</option> <option value="1"> 与政务外网逻辑隔离</option> <option value=""> </option> <option value="5"> 业务专网</option> <option value="4"> 政务内网</option> <option value="3"> 政务外网</option> <option value="2"> 互联网</option> <option value="1"> 单机</option> <option value="4"> 其他</option> <option value="3"> 全州统一云平台</option> <option value="2"> 租用机房</option> <option value="1"> 自建机房</option> <option value=""> </option> <option value="3"> 现场+远程</option> <option value="2"> 远程</option> <option value="1"> 现场</option> <option value=""> </option> <option value="2"> 估算</option> <option value="1"> 系统日志</option> <option value=""> </option> <option value="4"> 其他</option> <option value="3"> 停用</option> <option value="2"> 运行中</option> <option value="1"> 建设中</option> <option value=""> </option> <option value="4"> 本部门</option> <option value="3"> 省发改委</option> <option value="2"> 州发改委</option> <option value="1"> 州财局</option> <option value=""> </option> <option value="3"> 更多搜索项</option> <option value="2"> 主要搜索项</option> <option value="1"> 不加入搜索</option> <option value=""> </option> <option value="8"> 信息系统选择框</option> <option value="7"> Radio&amp;CheckBoX</option> <option value="6"> 时间选择框</option> <option value="5"> 机构下拉框</option> <option value="4"> 隐藏文本</option> <option value="3"> 涉及业务下拉框</option> <option value="2"> 数据字典下拉框</option> <option value="1"> 单行文本框</option> <option value=""> </option> <option value="2"> 新窗口打开</option> <option value="1"> iframe</option> <option value=""> </option> <option value="2"> 否</option> <option value="1"> 是</option> <option value=""> </option> <option value="6"> 每年</option> <option value="5"> 每季度</option> <option value="4"> 每月</option> <option value="3"> 每周</option> <option value="2"> 每日</option> <option value="1"> 实时</option> <option value=""> </option> <option value="2"> 无</option> <option value="1"> 邮件或介质</option> <option value="3"> 文件</option> <option value="2"> 数据库</option> <option value="1"> 接口</option> <option value="2"> 邮件或介质</option> <option value="1"> 共享平台方式</option> <option value=""> </option> <option value="3"> 不予共享</option> <option value="2"> 有条件共享</option> <option value="1"> 无条件共享</option> <option value=""> </option> <option value="2"> 其他</option> <option value="1"> 表驱动码</option> <option value="4"> 其他</option> <option value="3"> swf</option> <option value="2"> rm</option> <option value="1"> mpg</option> <option value="4"> 其他</option> <option value="3"> jpg</option> <option value="2"> gif</option> <option value="1"> bmp</option> <option value="4"> 其他</option> <option value="3"> xlsx</option> <option value="2"> xls</option> <option value="1"> et</option> <option value="10"> 其他</option> <option value="9"> xml</option> <option value="8"> wps</option> <option value="7"> txt</option> <option value="6"> ppt</option> <option value="5"> pdf</option> <option value="4"> OFD</option> <option value="3"> html</option> <option value="2"> docx</option> <option value="1"> doc</option> <option value="11"> 其他</option> <option value="10"> mysql</option> <option value="9"> sysbase</option> <option value="8"> sqlServer</option> <option value="7"> oracle</option> <option value="6"> KingBaseES</option> <option value="5"> Dm</option> <option value="4"> dbf</option> <option value="3"> dbase</option> <option value="2"> db2</option> <option value="1"> access</option> <option value="6"> 自描述格式</option> <option value="5"> 流媒体</option> <option value="4"> 图形图像</option> <option value="3"> 电子表格</option> <option value="2"> 电子文件</option> <option value="1"> 数据库</option> <option value=""> </option> <option value="3"> 互联网</option> <option value="2"> 政务外网</option> <option value="1"> 政务内网</option> <option value=""> </option> <option value="Account"> 用户管理</option> <option value="Company"> 机构设置</option> <option value="Role"> 角色管理</option> <option value="Scope"> 权限规则</option> <option value="Permission"> 权限管理</option> <option value="Permission"> 菜单管理</option> <option value="GovmadeDic"> 字典配置</option> <option value="DataElement"> 信息项</option> <option value="InformationResource"> 信息资源</option> <option value="GovApplicationSystem"> 信息系统</option> </select> 
      <select class="form-control  sub-select-content2" name="it1" style="width:195px;display:none;"> <option value=""></option> <option value="6"> oracle</option> <option value="14"> Mysql</option> <option value="13"> Oracle</option> <option value="4"> 县（市）区财局</option> <option value="3"> 县（市）区财政资金</option> <option value="8"> 无</option> <option value="6"> 无</option> <option value="7"> 无</option> <option value="9"> 无</option> <option value="3"> 系统日志+估算</option> <option value="3"> 无</option> <option value="6"> 无</option> <option value="5"> 无</option> <option value="7"> 无</option> <option value="6"> 其他</option> <option value="6"> 无</option> <option value="5"> 其他</option> <option value="6"> 无</option> <option value="10"> 无</option> <option value="8"> 无</option> <option value="6"> 无</option> <option value="5"> 无</option> <option value="4"> 其他</option> <option value="6"> 无</option> <option value="5"> 无</option> <option value="5"> 无</option> <option value="4"> 其他</option> <option value="5"> 无</option> <option value="4"> 其他</option> <option value="5"> 无</option> <option value="6"> 其他</option> <option value="8"> 其他</option> <option value="4"> 县（市）区级</option> <option value="3"> 州级</option> <option value="2"> 省级</option> <option value="1"> 国家</option> <option value=""> </option> <option value="12"> DB</option> <option value="7"> 每半年</option> <option value="12"> 数字型D</option> <option value="4"> 无</option> <option value="3"> 无</option> <option value="5"> 单机</option> <option value="1"> 无</option> <option value="7"> 无</option> <option value="4"> 业务专网</option> <option value="345"> 345</option> <option value="123"> 123</option> <option value="90"> 90</option> <option value="89"> 89</option> <option value="78"> 78</option> <option value="67"> 67</option> <option value="56"> 56</option> <option value="45"> 54</option> <option value="34"> 34</option> <option value="23"> 23</option> <option value="2"> 2</option> <option value="8"> 群众团体</option> <option value="7"> 民主党派、工商联</option> <option value="6"> 检察院</option> <option value="5"> 法院</option> <option value="4"> 政协</option> <option value="3"> 政府</option> <option value="2"> 人大</option> <option value="1"> 党委</option> <option value=""> </option> <option value="2"> 县区级</option> <option value="1"> 市级</option> <option value=""> </option> <option value="City"> 城市管理</option> <option value="4"> 数据库导入</option> <option value="3"> 数据表生成</option> <option value="2"> Excel导入</option> <option value="1"> 模版导入</option> <option value="0"> 手动添加</option> <option value=""> </option> <option value="4"> 其他资金</option> <option value="3"> 单位自筹资金</option> <option value="2"> 州财政资金</option> <option value="1"> 上级配套资金</option> <option value=""> </option> <option value="5"> 其他</option> <option value=""> </option> <option value="27"> 下拉多选</option> <option value="26"> 数据字典下拉框带按钮</option> <option value="25"> 方块单选</option> <option value="24"> 普通单选</option> <option value="23"> 文本</option> <option value="22"> 上传文件</option> <option value="21"> 共享条件选择</option> <option value="30"> 信息项数据类型</option> <option value="19"> 信息项共享方式</option> <option value="18"> 数据字典下拉框读取第三级 </option> <option value="17"> 上传控件</option> <option value="16"> 数据元分类配置 </option> <option value="15"> 表字段选择框</option> <option value="14"> 数据表选择框</option> <option value="13"> 数据库选择框</option> <option value="12"> 业务梳理</option> <option value="11"> 机房选择框</option> <option value="10"> 存储器选择框</option> <option value="9"> 服务器选择框</option> <option value="1"> 必填</option> <option value="2"> 非必填</option> <option value=""> </option> <option value="2"> 扩展元数据</option> <option value="1"> 核心元数据</option> <option value="1"> 目录元数据</option> <option value="2"> 数据元数据</option> <option value=""> </option> <option value="remove"> 删除</option> <option value="create"> 新增</option> <option value="update"> 更新</option> <option value=""> </option> <option value="11"> 浮点型F</option> <option value="10"> 整型I</option> <option value="9"> 双精度型B</option> <option value="8"> 通用型G</option> <option value="7"> 备注型M</option> <option value="6"> 逻辑型L</option> <option value="5"> 日期时间型T</option> <option value="4"> 日期型D</option> <option value="3"> 货币型Y</option> <option value="2"> 数值型N</option> <option value="1"> 字符型C</option> <option value=""> </option> <option value="5"> 等级审批中</option> <option value="4"> 未定密</option> <option value="3"> 绝密</option> <option value="2"> 机密</option> <option value="1"> 秘密</option> <option value=""> </option> <option value="7"> 等级审核中</option> <option value="6"> 未定级</option> <option value="5"> 五级</option> <option value="4"> 四级</option> <option value="3"> 三级</option> <option value="2"> 二级</option> <option value="1"> 一级</option> <option value=""> </option> <option value="5"> 面向社会公开</option> <option value="4"> 系统内地方各级跨部门共享</option> <option value="3"> 本部门内部级</option> <option value="2"> 内设机构内部</option> <option value="1"> 不共享</option> <option value=""> </option> <option value="4"> 社区（街道）</option> <option value="3"> 乡（镇）</option> <option value="2"> 县、市（区）</option> <option value="1"> 州</option> <option value=""> </option> <option value="5"> 其他</option> <option value="4"> 社会公众</option> <option value="3"> 系统内地方各级</option> <option value="2"> 本部门本级</option> <option value="1"> 处室内部</option> <option value=""> </option> <option value="9"> 其他</option> <option value="8"> Access</option> <option value="7"> Hbase</option> <option value="6"> PostgreSQL</option> <option value="5"> DB2</option> <option value="4"> Sybase</option> <option value="3"> Oracle</option> <option value="2"> MS SQL</option> <option value="1"> My sql</option> <option value=""> </option> <option value="7"> 其他</option> <option value="6"> 每年</option> <option value="5"> 每半年</option> <option value="4"> 按季</option> <option value="3"> 按月</option> <option value="2"> 按天</option> <option value="1"> 实时</option> <option value="5"> 其他</option> <option value="4"> 各企业报送</option> <option value="3"> 州县、市逐级报送</option> <option value="2"> 自动生成</option> <option value="1"> 人工录入</option> <option value=""> </option> <option value="3"> 物理隔离</option> <option value="2"> 与政务内网逻辑隔离</option> <option value="1"> 与政务外网逻辑隔离</option> <option value=""> </option> <option value="5"> 业务专网</option> <option value="4"> 政务内网</option> <option value="3"> 政务外网</option> <option value="2"> 互联网</option> <option value="1"> 单机</option> <option value="4"> 其他</option> <option value="3"> 全州统一云平台</option> <option value="2"> 租用机房</option> <option value="1"> 自建机房</option> <option value=""> </option> <option value="3"> 现场+远程</option> <option value="2"> 远程</option> <option value="1"> 现场</option> <option value=""> </option> <option value="2"> 估算</option> <option value="1"> 系统日志</option> <option value=""> </option> <option value="4"> 其他</option> <option value="3"> 停用</option> <option value="2"> 运行中</option> <option value="1"> 建设中</option> <option value=""> </option> <option value="4"> 本部门</option> <option value="3"> 省发改委</option> <option value="2"> 州发改委</option> <option value="1"> 州财局</option> <option value=""> </option> <option value="3"> 更多搜索项</option> <option value="2"> 主要搜索项</option> <option value="1"> 不加入搜索</option> <option value=""> </option> <option value="8"> 信息系统选择框</option> <option value="7"> Radio&amp;CheckBoX</option> <option value="6"> 时间选择框</option> <option value="5"> 机构下拉框</option> <option value="4"> 隐藏文本</option> <option value="3"> 涉及业务下拉框</option> <option value="2"> 数据字典下拉框</option> <option value="1"> 单行文本框</option> <option value=""> </option> <option value="2"> 新窗口打开</option> <option value="1"> iframe</option> <option value=""> </option> <option value="2"> 否</option> <option value="1"> 是</option> <option value=""> </option> <option value="6"> 每年</option> <option value="5"> 每季度</option> <option value="4"> 每月</option> <option value="3"> 每周</option> <option value="2"> 每日</option> <option value="1"> 实时</option> <option value=""> </option> <option value="2"> 无</option> <option value="1"> 邮件或介质</option> <option value="3"> 文件</option> <option value="2"> 数据库</option> <option value="1"> 接口</option> <option value="2"> 邮件或介质</option> <option value="1"> 共享平台方式</option> <option value=""> </option> <option value="3"> 不予共享</option> <option value="2"> 有条件共享</option> <option value="1"> 无条件共享</option> <option value=""> </option> <option value="2"> 其他</option> <option value="1"> 表驱动码</option> <option value="4"> 其他</option> <option value="3"> swf</option> <option value="2"> rm</option> <option value="1"> mpg</option> <option value="4"> 其他</option> <option value="3"> jpg</option> <option value="2"> gif</option> <option value="1"> bmp</option> <option value="4"> 其他</option> <option value="3"> xlsx</option> <option value="2"> xls</option> <option value="1"> et</option> <option value="10"> 其他</option> <option value="9"> xml</option> <option value="8"> wps</option> <option value="7"> txt</option> <option value="6"> ppt</option> <option value="5"> pdf</option> <option value="4"> OFD</option> <option value="3"> html</option> <option value="2"> docx</option> <option value="1"> doc</option> <option value="11"> 其他</option> <option value="10"> mysql</option> <option value="9"> sysbase</option> <option value="8"> sqlServer</option> <option value="7"> oracle</option> <option value="6"> KingBaseES</option> <option value="5"> Dm</option> <option value="4"> dbf</option> <option value="3"> dbase</option> <option value="2"> db2</option> <option value="1"> access</option> <option value="6"> 自描述格式</option> <option value="5"> 流媒体</option> <option value="4"> 图形图像</option> <option value="3"> 电子表格</option> <option value="2"> 电子文件</option> <option value="1"> 数据库</option> <option value=""> </option> <option value="3"> 互联网</option> <option value="2"> 政务外网</option> <option value="1"> 政务内网</option> <option value=""> </option> <option value="Account"> 用户管理</option> <option value="Company"> 机构设置</option> <option value="Role"> 角色管理</option> <option value="Scope"> 权限规则</option> <option value="Permission"> 权限管理</option> <option value="Permission"> 菜单管理</option> <option value="GovmadeDic"> 字典配置</option> <option value="DataElement"> 信息项</option> <option value="InformationResource"> 信息资源</option> <option value="GovApplicationSystem"> 信息系统</option> </select> 
      <button class="btn btn-primary" type="submit" onclick="$(tableId).bootstrapTable('refresh');"><i class="iconfont gm-search"></i>搜索</button> 
     </div> 
     <div class="form-group"> 
      <button type="button" class="btn btn-green" onclick="showComCount(this);">部门搜索</button> 
     </div> 
     <div class="form-group"> 
     </div> 
     <div class="fast-search-content" id="com_div" style="display:none;"> 
      <input type="hidden" name="com-count"> 
      <div class="pull-left com-count" data-id="" style="width: 240px">
        全部 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="726" title="凤凰县国家税务局">
        凤凰县国家税务局 ( 216 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="421" title="州国家税务局">
        州国家税务局 ( 208 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="748" title="吉首市国家税务局">
        吉首市国家税务局 ( 199 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="45" title="州卫生和计划生育委员会">
        州卫生和计划生育委... ( 152 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="491" title="凤凰县食品药品工商质量监督管理局">
        凤凰县食品药品工商... ( 145 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="463" title="吉首市卫生和计划生育局">
        吉首市卫生和计划生... ( 140 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="487" title="凤凰县卫生和计划生育局">
        凤凰县卫生和计划生... ( 139 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="478" title="凤凰县人力资源和社会保障局">
        凤凰县人力资源和社... ( 133 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="467" title="吉首市食品药品工商质量监督管理局">
        吉首市食品药品工商... ( 120 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="481" title="凤凰县住房和城乡建设局">
        凤凰县住房和城乡建... ( 118 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="19" title="州教育和体育局">
        州教育和体育局 ( 110 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="482" title="凤凰县交通运输局">
        凤凰县交通运输局 ( 101 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="48" title="州安全生产监督管理局">
        州安全生产监督管理... ( 99 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="35" title="州人力资源和社会保障局">
        州人力资源和社会保... ( 97 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="466" title="吉首市安全生产监督管理局">
        吉首市安全生产监督... ( 97 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="40" title="州农业委员会（州委农村工作办公室）">
        州农业委员会（州委... ( 96 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="486" title="凤凰县旅游和文化广电新闻出版局">
        凤凰县旅游和文化广... ( 85 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="39" title="州交通运输局">
        州交通运输局 ( 84 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="457" title="吉首市交通运输局">
        吉首市交通运输局 ( 82 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="453" title="吉首市人力资源和社会保障局">
        吉首市人力资源和社... ( 80 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="455" title="吉首市环境保护局">
        吉首市环境保护局 ( 69 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="474" title="凤凰县公安局">
        凤凰县公安局 ( 67 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="462" title="吉首市旅游和文化广电新闻出版局">
        吉首市旅游和文化广... ( 67 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="475" title="凤凰县民政局">
        凤凰县民政局 ( 66 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="52" title="州质量技术监督局">
        州质量技术监督局 ( 65 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="490" title="凤凰县安全生产监督管理局">
        凤凰县安全生产监督... ( 64 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="446" title="吉首市教育和体育局">
        吉首市教育和体育局 ( 64 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="471" title="凤凰县教育和体育局">
        凤凰县教育和体育局 ( 61 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="47" title="州统计局">
        州统计局 ( 61 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="50" title="州食品药品监督管理局（州食品安全委员会办公室）">
        州食品药品监督管理... ( 61 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="51" title="州工商行政管理局">
        州工商行政管理局 ( 61 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="31" title="州公安局">
        州公安局 ( 58 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="33" title="州司法局">
        州司法局 ( 58 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="465" title="吉首市统计局">
        吉首市统计局 ( 58 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="32" title="州民政局">
        州民政局 ( 57 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="479" title="凤凰县国土资源局">
        凤凰县国土资源局 ( 55 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="450" title="吉首市民政局">
        吉首市民政局 ( 55 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="49" title="州旅游发展和外事侨务委员会">
        州旅游发展和外事侨... ( 54 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="483" title="凤凰县农业局">
        凤凰县农业局 ( 53 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="54" title="州粮食局">
        州粮食局 ( 52 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="489" title="凤凰县统计局">
        凤凰县统计局 ( 50 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="461" title="吉首市商务局">
        吉首市商务局 ( 50 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="476" title="凤凰县司法局">
        凤凰县司法局 ( 49 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="485" title="凤凰县林业局">
        凤凰县林业局 ( 48 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="43" title="州商务局">
        州商务局 ( 48 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="38" title="州住房和城乡建设局">
        州住房和城乡建设局 ( 47 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="458" title="吉首市农业局">
        吉首市农业局 ( 45 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="451" title="吉首市司法局">
        吉首市司法局 ( 44 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="36" title="州国土资源局">
        州国土资源局 ( 42 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="730" title="凤凰县扶贫办">
        凤凰县扶贫办 ( 42 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="469" title="凤凰县人民政府办公室">
        凤凰县人民政府办公... ( 41 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="427" title="州扶贫开发办公室">
        州扶贫开发办公室 ( 40 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="480" title="凤凰县环境保护局">
        凤凰县环境保护局 ( 37 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="449" title="吉首市公安局">
        吉首市公安局 ( 37 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="42" title="州林业局">
        州林业局 ( 36 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="6" title="州人民政府办公室（州人民政府金融工作办公室、州人民政府研究室）">
        州人民政府办公室（... ( 35 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="34" title="州财政局">
        州财政局 ( 35 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="41" title="州水利局">
        州水利局 ( 33 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="459" title="吉首市水利局">
        吉首市水利局 ( 33 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="460" title="吉首市林业局">
        吉首市林业局 ( 31 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="37" title="州环境保护局">
        州环境保护局 ( 31 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="484" title="凤凰县水利局">
        凤凰县水利局 ( 31 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="454" title="吉首市国土资源局">
        吉首市国土资源局 ( 30 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="456" title="吉首市住房和城乡建设局">
        吉首市住房和城乡建... ( 28 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="472" title="凤凰县经济和信息化局">
        凤凰县经济和信息化... ( 27 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="28" title="州科学技术局">
        州科学技术局 ( 26 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="29" title="州经济和信息化委员会">
        州经济和信息化委员... ( 25 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="737" title="吉首市城市管理行政执法局">
        吉首市城市管理行政... ( 24 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="46" title="州审计局">
        州审计局 ( 23 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="18" title="州发展和改革委员会">
        州发展和改革委员会 ( 20 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="493" title="凤凰县房地产业管理局(凤凰县白蚁防治所)">
        凤凰县房地产业管理... ( 20 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="473" title="凤凰县民族宗教事务局">
        凤凰县民族宗教事务... ( 19 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="30" title="州民族宗教事务委员会">
        州民族宗教事务委员... ( 19 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="492" title="凤凰县城乡规划管理局">
        凤凰县城乡规划管理... ( 18 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="725" title="州科学技术协会">
        州科学技术协会 ( 18 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="44" title="州文化广电新闻出版局（州版权局）">
        州文化广电新闻出版... ( 17 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="424" title="州公共资源交易中心">
        州公共资源交易中心 ( 17 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="445" title="吉首市发展和改革局">
        吉首市发展和改革局 ( 16 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="727" title="凤凰县移民局">
        凤凰县移民局 ( 16 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="470" title="凤凰县发展和改革局">
        凤凰县发展和改革局 ( 15 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="422" title="州地方税务局">
        州地方税务局 ( 15 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="477" title="凤凰县财政局">
        凤凰县财政局 ( 15 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="735" title="吉首市城市规划管理局">
        吉首市城市规划管理... ( 14 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="464" title="吉首市审计局">
        吉首市审计局 ( 14 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="425" title="州人民防空办公室">
        州人民防空办公室 ( 13 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="488" title="凤凰县审计局">
        凤凰县审计局 ( 11 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="448" title="吉首市民族宗教事务局">
        吉首市民族宗教事务... ( 11 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="729" title="凤凰县人民防空办公室">
        凤凰县人民防空办公... ( 10 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="734" title="吉首市残疾人联合会">
        吉首市残疾人联合会 ( 8 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="439" title="州残疾人联合会">
        州残疾人联合会 ( 7 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="751" title="中国共产主义青年团吉首市委员会">
        中国共产主义青年团... ( 7 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="442" title="共青团湘西州委">
        共青团湘西州委 ( 7 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="426" title="州气象局">
        州气象局 ( 7 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="437" title="州中级人民法院">
        州中级人民法院 ( 6 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="766" title="州委政法委员会（州社会管理综合治理委员会办公室）">
        州委政法委员会（州... ( 6 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="444" title="吉首市人民政府办公室">
        吉首市人民政府办公... ( 6 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="430" title="州出入境检验检疫局">
        州出入境检验检疫局 ( 6 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="732" title="凤凰县残疾人联合会">
        凤凰县残疾人联合会 ( 5 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="423" title="州档案局">
        州档案局 ( 5 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="441" title="州红十字会">
        州红十字会 ( 5 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="432" title="州烟草专卖局">
        州烟草专卖局 ( 5 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="55" title="州人民政府国有资产监督管理委员会">
        州人民政府国有资产... ( 5 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="763" title="凤凰县人民法院">
        凤凰县人民法院 ( 4 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="728" title="凤凰县气象局">
        凤凰县气象局 ( 4 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="53" title="州人民政府法制办公室">
        州人民政府法制办公... ( 4 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="731" title="凤凰县文物局">
        凤凰县文物局 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="56" title="州政府政务服务中心">
        州政府政务服务中心 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="438" title="州人民检察院">
        州人民检察院 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="765" title="吉首市城市供水总公司">
        吉首市城市供水总公... ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="521" title="州政协办公室">
        州政协办公室 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="429" title="州移民局">
        州移民局 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="447" title="吉首市经济科技和信息化局">
        吉首市经济科技和信... ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="431" title="州文物管理局">
        州文物管理局 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="443" title="州贸促会">
        州贸促会 ( 2 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="428" title="州政府口岸办">
        州政府口岸办 ( 2 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="759" title="吉首市工商业联合会（总商会）">
        吉首市工商业联合会... ( 2 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="440" title="州妇女联合会">
        州妇女联合会 ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="846" title="湘西土家族苗族自治州邮政管理局">
        湘西土家族苗族自治... ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="433" title="州机构编制委员会办公室">
        州机构编制委员会办... ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="435" title="州信访局">
        州信访局 ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="436" title="州人大常委会办公室">
        州人大常委会办公室 ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="762" title="中国人民银行湘西土家族苗族自治州中心支行">
        中国人民银行湘西土... ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="468" title="吉首市政务服务中心">
        吉首市政务服务中心 ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1015" title="花垣县审计局">
        花垣县审计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="891" title="泸溪县人民检察院">
        泸溪县人民检察院 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1031" title="古丈县公安局">
        古丈县公安局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="907" title="保靖县人力资源和社会保障局">
        保靖县人力资源和社... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="747" title="吉首市人民检察院">
        吉首市人民检察院 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1047" title="古丈县卫计局">
        古丈县卫计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="967" title="龙山县地方海事处">
        龙山县地方海事处 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="923" title="保靖县机构编制委员会办公室">
        保靖县机构编制委员... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1063" title="永顺县公安局">
        永顺县公安局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="983" title="&nbsp;龙山县城镇规划管理局">
        &nbsp;龙山县城镇规划管... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="939" title="保靖县地方海事处">
        保靖县地方海事处 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="859" title="泸溪县民政局">
        泸溪县民政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1079" title="永顺县房产局">
        永顺县房产局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="999" title="花垣县住房和城乡建设局">
        花垣县住房和城乡建... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1" title="州委办公室">
        州委办公室 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="955" title="龙山县旅游和文化广电新闻出版局">
        龙山县旅游和文化广... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="875" title="泸溪县城乡建设规划局">
        泸溪县城乡建设规划... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1095" title="永顺县政务中心">
        永顺县政务中心 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1016" title="花垣县人民政府政务服务中心">
        花垣县人民政府政务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="892" title="泸溪县妇女联合会">
        泸溪县妇女联合会 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1032" title="古丈县民政局">
        古丈县民政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="908" title="保靖县国土资源局">
        保靖县国土资源局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1048" title="古丈县畜牧局">
        古丈县畜牧局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="968" title="龙山县教育和体育局">
        龙山县教育和体育局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="924" title="保靖县气象局">
        保靖县气象局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1064" title="永顺县财政局">
        永顺县财政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="984" title="龙山县人民政府移民开发局">
        龙山县人民政府移民... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="940" title="保靖县妇幼保健计划生育服务中心">
        保靖县妇幼保健计划... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="860" title="泸溪县司法局">
        泸溪县司法局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1080" title="永顺县信访局">
        永顺县信访局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1000" title="花垣县文物管理局">
        花垣县文物管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="956" title="龙山县统计局">
        龙山县统计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="876" title="泸溪县房地产业管理局(泸溪县白蚁防治办公室、泸溪县国有土地上房屋征收与补偿办公室)">
        泸溪县房地产业管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1096" title="永顺县农机局">
        永顺县农机局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="877" title="泸溪县国家税务局">
        泸溪县国家税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1097" title="永顺县国税局">
        永顺县国税局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1017" title="花垣县水利局">
        花垣县水利局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="893" title="泸溪县人民代表大会常务委员会">
        泸溪县人民代表大会... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="733" title="吉首市公路管理局">
        吉首市公路管理局 ( 19 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1033" title="古丈县司法局">
        古丈县司法局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="909" title="保靖县环境保护局">
        保靖县环境保护局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="749" title="吉首市地方税务局">
        吉首市地方税务局 ( 8 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1049" title="古丈县住建局">
        古丈县住建局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="969" title="龙山县经济和信息化局">
        龙山县经济和信息化... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="925" title="保靖县国家税务局">
        保靖县国家税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1065" title="永顺县住建局">
        永顺县住建局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="985" title="龙山县畜牧水产局">
        龙山县畜牧水产局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="941" title="保靖县人民代表大会常务委员会">
        保靖县人民代表大会... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="861" title="泸溪县财政局">
        泸溪县财政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1081" title="永顺县国土局">
        永顺县国土局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1001" title="花垣县农业局">
        花垣县农业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="957" title="龙山县农村经营服务站">
        龙山县农村经营服务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="878" title="泸溪县移民开发局">
        泸溪县移民开发局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1098" title="永顺县地税局">
        永顺县地税局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1018" title="花垣县城乡规划局">
        花垣县城乡规划局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="894" title="中国共产主义青年团泸溪县委员会">
        中国共产主义青年团... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1034" title="古丈县财政局">
        古丈县财政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="910" title="保靖县住房和城乡建设局">
        保靖县住房和城乡建... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="750" title="吉首市移民开发局">
        吉首市移民开发局 ( 4 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1050" title="古丈县政务中心">
        古丈县政务中心 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="970" title="龙山县公安局交通警察大队">
        龙山县公安局交通警... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="926" title="保靖县地方税务局">
        保靖县地方税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1066" title="永顺县扶贫开发办">
        永顺县扶贫开发办 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="986" title="龙山县文化市场综合执法局">
        龙山县文化市场综合... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="942" title="中国人民政治协商会议保靖县委员会">
        中国人民政治协商会... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="862" title="泸溪县人力资源和社会保障局">
        泸溪县人力资源和社... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1082" title="永顺县民政局">
        永顺县民政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1002" title="花垣县国家税务局">
        花垣县国家税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="958" title="龙山县食品药品工商质量监督管理局">
        龙山县食品药品工商... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="879" title="泸溪县气象局（泸溪县防雷减灾办公室、泸溪县施放气球管理办公室）">
        泸溪县气象局（泸溪... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1099" title="永顺县文物局">
        永顺县文物局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1019" title="花垣县林业局">
        花垣县林业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="895" title="泸溪县文化市场综合执法局">
        泸溪县文化市场综合... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1035" title="古丈县人力资源和社会保障局">
        古丈县人力资源和社... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="911" title="保靖县交通运输局">
        保靖县交通运输局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1051" title="古丈县农经站">
        古丈县农经站 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="971" title="龙山县司法局">
        龙山县司法局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="927" title="保靖县残疾人联合会">
        保靖县残疾人联合会 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="847" title="保靖县人民政府办公室">
        保靖县人民政府办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1067" title="永顺县人力资源和社会保障局">
        永顺县人力资源和社... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="987" title="龙山县国家税务局">
        龙山县国家税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="943" title="中国共产党保靖县委员会组织部">
        中国共产党保靖县委... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="863" title="泸溪县国土资源局">
        泸溪县国土资源局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1083" title="永顺县卫生和计划生育局">
        永顺县卫生和计划生... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1003" title="花垣县档案局">
        花垣县档案局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="959" title="龙山县房地产管理局">
        龙山县房地产管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="880" title="泸溪县人民防空办公室">
        泸溪县人民防空办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1100" title="永顺县档案局&nbsp;">
        永顺县档案局&nbsp; ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1020" title="花垣县卫生和计划生育局">
        花垣县卫生和计划生... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="896" title="泸溪县文物管理局">
        泸溪县文物管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="736" title="吉首市房地产管理局">
        吉首市房地产管理局 ( 5 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1036" title="古丈县国土局">
        古丈县国土局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="912" title="保靖县农业局">
        保靖县农业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="752" title="吉首市归国华侨侨眷联合会">
        吉首市归国华侨侨眷... ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1052" title="永顺县政府办">
        永顺县政府办 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="972" title="龙山县人力资源和社会保障局">
        龙山县人力资源和社... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="928" title="保靖县扶贫开发办公室">
        保靖县扶贫开发办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="848" title="保靖县发展和改革局">
        保靖县发展和改革局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1068" title="永顺县商务局">
        永顺县商务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="988" title="龙山县烟草专卖局">
        龙山县烟草专卖局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="944" title="保靖县人民检察院">
        保靖县人民检察院 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="864" title="泸溪县环境保护局">
        泸溪县环境保护局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1084" title="永顺县安监局">
        永顺县安监局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1004" title="花垣县人民防空办公室">
        花垣县人民防空办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="960" title="龙山县文物管理局">
        龙山县文物管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="961" title="龙山县农业机械管理局">
        龙山县农业机械管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="881" title="泸溪县扶贫开发服务中心">
        泸溪县扶贫开发服务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1101" title="永顺县气象局">
        永顺县气象局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1021" title="花垣县地方税务局">
        花垣县地方税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="897" title="泸溪县公路管理局">
        泸溪县公路管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1037" title="古丈县环境保护局">
        古丈县环境保护局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="913" title="保靖县林业局">
        保靖县林业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="753" title="吉首市人民代表大会常务委员会">
        吉首市人民代表大会... ( 2 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1053" title="永顺县人大办">
        永顺县人大办 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="973" title="龙山县环境保护局">
        龙山县环境保护局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="929" title="保靖县水库移民开发局">
        保靖县水库移民开发... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="849" title="保靖县教育和体育局">
        保靖县教育和体育局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1069" title="永顺县旅游文广新局">
        永顺县旅游文广新局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="989" title="龙山县人民政府信访办公室">
        龙山县人民政府信访... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="945" title="保靖县人民法院">
        保靖县人民法院 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="865" title="泸溪县住房和城乡建设局">
        泸溪县住房和城乡建... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1085" title="永顺县民族宗教事务局">
        永顺县民族宗教事务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1005" title="花垣县畜牧水产局">
        花垣县畜牧水产局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="962" title="龙山县商务局">
        龙山县商务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="882" title="泸溪县残疾人联合会">
        泸溪县残疾人联合会 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1102" title="永顺县烟草局">
        永顺县烟草局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1022" title="花垣县移民开发局">
        花垣县移民开发局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="898" title="泸溪县道路运输管理所">
        泸溪县道路运输管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="738" title="吉首市红十字会">
        吉首市红十字会 ( 6 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1038" title="古丈县安监局">
        古丈县安监局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="914" title="保靖县水利局">
        保靖县水利局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="754" title="吉首市畜牧水产局">
        吉首市畜牧水产局 ( 12 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1054" title="永顺县政协办">
        永顺县政协办 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="974" title="龙山县公路管理局">
        龙山县公路管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="930" title="保靖县文物管理局">
        保靖县文物管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="850" title="保靖县经济和信息化局">
        保靖县经济和信息化... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1070" title="永顺县教体局">
        永顺县教体局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="990" title="花垣县经济和信息化局">
        花垣县经济和信息化... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="946" title="龙山县发展和改革局">
        龙山县发展和改革局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="866" title="泸溪县交通运输局">
        泸溪县交通运输局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1086" title="永顺县水利局">
        永顺县水利局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1006" title="花垣县农业机械管理局">
        花垣县农业机械管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="963" title="龙山县农业综合开发办公室">
        龙山县农业综合开发... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="883" title="泸溪县人民法院">
        泸溪县人民法院 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1103" title="湘西州住房公积金管理中心（永顺管理部）">
        湘西州住房公积金管... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1023" title="花垣县统计局">
        花垣县统计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="899" title="泸溪县地方海事处">
        泸溪县地方海事处 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="739" title="吉首市总工会">
        吉首市总工会 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1039" title="古丈县交通局">
        古丈县交通局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="915" title="保靖县卫生和计划生育局">
        保靖县卫生和计划生... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="755" title="吉首市气象局">
        吉首市气象局 ( 4 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1055" title="永顺县法院">
        永顺县法院 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="975" title="龙山县农业局">
        龙山县农业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="931" title="保靖县城市管理行政执法局">
        保靖县城市管理行政... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="851" title="保靖县民族宗教事务和旅游文化广电新闻出版局">
        保靖县民族宗教事务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1071" title="永顺县交通运输局">
        永顺县交通运输局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="991" title="花垣县国土资源局">
        花垣县国土资源局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="947" title="龙山县民族宗教事务局">
        龙山县民族宗教事务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="867" title="泸溪县农业局">
        泸溪县农业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1087" title="永顺县人防办">
        永顺县人防办 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1007" title="花垣县公路管理局">
        花垣县公路管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="964" title="龙山县扶贫开发领导小组办公室&nbsp;">
        龙山县扶贫开发领导... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="884" title="泸溪县城市管理行政执法局">
        泸溪县城市管理行政... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1024" title="花垣县国有资产投资管理办公室">
        花垣县国有资产投资... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="900" title="泸溪县畜牧水产局">
        泸溪县畜牧水产局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="740" title="中共吉首市委政法委员会">
        中共吉首市委政法委... ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1040" title="古丈县林业局">
        古丈县林业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="916" title="保靖县审计局">
        保靖县审计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="756" title="政协吉首市委员会">
        政协吉首市委员会 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1056" title="永顺县检察院">
        永顺县检察院 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="976" title="龙山县卫生和计划生育局">
        龙山县卫生和计划生... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="932" title="保靖县公路管理局">
        保靖县公路管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="852" title="保靖县公安局">
        保靖县公安局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1072" title="永顺县道路运输管理所">
        永顺县道路运输管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="992" title="花垣县环境保护局">
        花垣县环境保护局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="948" title="龙山县公安局">
        龙山县公安局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="868" title="泸溪县水利局">
        泸溪县水利局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1088" title="永顺县审计局">
        永顺县审计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1008" title="花垣县人力资源和社会保障局">
        花垣县人力资源和社... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="965" title="龙山县地方税务局">
        龙山县地方税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="885" title="泸溪县地方税务局">
        泸溪县地方税务局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1025" title="花垣县公安消防大队">
        花垣县公安消防大队 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="901" title="泸溪县农业机械管理局">
        泸溪县农业机械管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="741" title="吉首市文学艺术界联合会">
        吉首市文学艺术界联... ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1041" title="古丈县农机局">
        古丈县农机局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="917" title="保靖县统计局">
        保靖县统计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="757" title="吉首市档案局">
        吉首市档案局 ( 12 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1057" title="永顺县委组织部">
        永顺县委组织部 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="977" title="龙山县住房和城乡建设局">
        龙山县住房和城乡建... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="933" title="保靖县农业机械管理局">
        保靖县农业机械管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="853" title="泸溪县人民政府办公室">
        泸溪县人民政府办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1073" title="永顺县地方海事处">
        永顺县地方海事处 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="993" title="花垣县民族宗教事务和旅游文化广电新闻出版局">
        花垣县民族宗教事务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="949" title="龙山县民政局">
        龙山县民政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="869" title="泸溪县林业局">
        泸溪县林业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1089" title="永顺县不二门国家森林公园管理处">
        永顺县不二门国家森... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1009" title="花垣县司法局">
        花垣县司法局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="966" title="龙山县气象局">
        龙山县气象局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="886" title="泸溪县烟草局">
        泸溪县烟草局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1026" title="古丈县人民政府办公室">
        古丈县人民政府办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="902" title="泸溪县外资外援项目办公室">
        泸溪县外资外援项目... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="742" title="吉首市计划生育协会">
        吉首市计划生育协会 ( 2 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1042" title="古丈县农业局">
        古丈县农业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="918" title="保靖县安全生产监督管理局">
        保靖县安全生产监督... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="758" title="吉首市人民防空办公室">
        吉首市人民防空办公... ( 8 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1058" title="永顺县纪委">
        永顺县纪委 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="978" title="龙山县审计局">
        龙山县审计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="934" title="保靖县房地产管理局">
        保靖县房地产管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="854" title="泸溪县发展和改革局">
        泸溪县发展和改革局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1074" title="永顺县交通建设质量安全监督管理所">
        永顺县交通建设质量... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="994" title="花垣县民政局">
        花垣县民政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="950" title="龙山县财政局">
        龙山县财政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="870" title="泸溪县卫生和计划生育局">
        泸溪县卫生和计划生... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1090" title="永顺县猛管处">
        永顺县猛管处 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1010" title="花垣县发展和改革局">
        花垣县发展和改革局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="887" title="泸溪县消防大队">
        泸溪县消防大队 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1027" title="古丈县发展和改革局">
        古丈县发展和改革局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="903" title="泸溪县农村经营服务站">
        泸溪县农村经营服务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="743" title="吉首市机构编制委员会办公室">
        吉首市机构编制委员... ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1043" title="古丈县审计局">
        古丈县审计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="919" title="保靖县食品药品工商质量监督管理局">
        保靖县食品药品工商... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1059" title="永顺县编办">
        永顺县编办 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="979" title="龙山县安全生产监督管理局">
        龙山县安全生产监督... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="935" title="保靖县疾病预防控制中心">
        保靖县疾病预防控制... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="855" title="泸溪县教育和体育局">
        泸溪县教育和体育局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1075" title="永顺县环境保护局">
        永顺县环境保护局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="995" title="花垣县食品药品工商质量监督管理局">
        花垣县食品药品工商... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="951" title="龙山县国土资源局">
        龙山县国土资源局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="871" title="泸溪县审计局">
        泸溪县审计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1091" title="永顺县林业局">
        永顺县林业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1011" title="花垣县房地产管理局">
        花垣县房地产管理局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="888" title="泸溪县信访局">
        泸溪县信访局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1028" title="古丈县教育和体育局">
        古丈县教育和体育局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="904" title="保靖县民政局">
        保靖县民政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="744" title="吉首市妇女联合会">
        吉首市妇女联合会 ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1044" title="古丈县食药工商质监局">
        古丈县食药工商质监... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="920" title="保靖县政务服务中心">
        保靖县政务服务中心 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="760" title="吉首市科学技术协会">
        吉首市科学技术协会 ( 3 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1060" title="永顺县发改局">
        永顺县发改局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="980" title="龙山县档案局">
        龙山县档案局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="936" title="保靖县国有资产管理局">
        保靖县国有资产管理... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="856" title="泸溪县经济和信息化局">
        泸溪县经济和信息化... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1076" title="永顺县农经站">
        永顺县农经站 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="996" title="花垣县教育和体育局">
        花垣县教育和体育局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="952" title="龙山县交通运输局">
        龙山县交通运输局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="872" title="泸溪县统计局">
        泸溪县统计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1092" title="永顺县经济和信息化局">
        永顺县经济和信息化... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1012" title="花垣县交通运输局">
        花垣县交通运输局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1013" title="花垣县公安局">
        花垣县公安局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="889" title="泸溪县档案局">
        泸溪县档案局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1029" title="古丈县经济科技和信息化局">
        古丈县经济科技和信... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="905" title="保靖县司法局">
        保靖县司法局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="745" title="吉首市信访局">
        吉首市信访局 ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1045" title="古丈县水利局">
        古丈县水利局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="921" title="保靖县档案局">
        保靖县档案局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="761" title="吉首市人民法院">
        吉首市人民法院 ( 1 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1061" title="永顺县行政执法局">
        永顺县行政执法局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="981" title="龙山县城市管理行政执法局">
        龙山县城市管理行政... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="937" title="保靖县农村经营服务站">
        保靖县农村经营服务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="857" title="泸溪县民族宗教事务和旅游文化广电新闻出版局">
        泸溪县民族宗教事务... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1077" title="永顺县移民局">
        永顺县移民局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="997" title="花垣县财政局">
        花垣县财政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="953" title="龙山县水利局">
        龙山县水利局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="873" title="泸溪县安全生产监督管理局">
        泸溪县安全生产监督... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1093" title="永顺县公路局">
        永顺县公路局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1014" title="花垣县安全生产监督管理局">
        花垣县安全生产监督... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="890" title="泸溪县编办">
        泸溪县编办 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1030" title="古丈县民宗旅文广新局">
        古丈县民宗旅文广新... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="906" title="保靖县财政局">
        保靖县财政局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="746" title="吉首市扶贫开发办公室">
        吉首市扶贫开发办公... ( 40 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1046" title="古丈县统计局">
        古丈县统计局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="922" title="保靖县人民防空办公室">
        保靖县人民防空办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1062" title="永顺县农业局">
        永顺县农业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="452" title="吉首市财政局">
        吉首市财政局 ( 16 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="982" title="龙山县人民防空办公室">
        龙山县人民防空办公... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="938" title="保靖县畜牧水产局">
        保靖县畜牧水产局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="858" title="泸溪县公安局">
        泸溪县公安局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1078" title="永顺县司法局">
        永顺县司法局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="998" title="花垣县城市管理行政执法局">
        花垣县城市管理行政... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="954" title="龙山县林业局">
        龙山县林业局 ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="874" title="泸溪县食品药品工商质量监督管理局">
        泸溪县食品药品工商... ( 0 ) 
      </div> 
      <div style="width: 240px" class="pull-left com-count" data-id="1094" title="永顺县公安局交通警察大队">
        永顺县公安局交通警... ( 0 ) 
      </div> 
     </div> 
    </div> 
    <div class="ibox-content"> 
     <div class="bootstrap-table"> 
      <div class="fixed-table-toolbar"> 
       <div class="bars pull-left"> 
        <div id="toolbar"> 
         <div class="clearfix" style="    margin-top: -30px;"> 
          <span>热门搜词：</span> 
         </div> 
        </div> 
       </div> 
      </div> 
      <div class="fixed-table-container" style="padding-bottom: 0px;"> 
       <div class="fixed-table-header" style="display: none;"> 
        <table></table> 
       </div> 
       <div class="fixed-table-body"> 
        <div class="fixed-table-loading" style="top: 37px; display: block;">
          正在努力地加载数据中，请稍候…… 
        </div> 
        <table id="dicList" class="table table-hover table-striped"> 
         <thead> 
          <tr> 
           <th style="" data-field="value2" tabindex="0"> 
            <div class="th-inner ">
              信息资源代码 
            </div> 
            <div class="fht-cell"></div></th> 
           <th style="" data-field="value1" tabindex="0"> 
            <div class="th-inner ">
              信息资源名称 
            </div> 
            <div class="fht-cell"></div></th> 
           <th style="" data-field="id" tabindex="0"> 
            <div class="th-inner ">
              操作 
            </div> 
            <div class="fht-cell"></div></th> 
          </tr> 
         </thead> 
         <tbody> 
          <tr class="no-records-found"> 
           <td colspan="3">没有找到匹配的记录</td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <div class="fixed-table-footer" style="display: none;"> 
        <table> 
         <tbody> 
          <tr></tr> 
         </tbody> 
        </table> 
       </div> 
       <div class="fixed-table-pagination" style="display: none;"> 
        <div class="pull-left pagination-detail"> 
         <span class="pagination-info">显示第 1 到第 0 条记录，总共 0 条记录</span> 
         <span class="page-list" style="display: none;">每页显示 <span class="btn-group dropup"><button type="button" class="btn btn-default  btn-outline dropdown-toggle" data-toggle="dropdown"><span class="page-size">10</span> <span class="caret"></span></button> 
           <ul class="dropdown-menu" role="menu"> 
            <li class="active"><a href="javascript:void(0)">10</a></li> 
           </ul></span> 条记录</span> 
        </div> 
        <div class="pull-right pagination" style="display: none;"> 
         <ul class="pagination pagination-outline"> 
          <li class="page-first disabled"><a href="javascript:void(0)">«</a></li> 
          <li class="page-pre disabled"><a href="javascript:void(0)">‹</a></li> 
          <li class="page-next disabled"><a href="javascript:void(0)">›</a></li> 
          <li class="page-last disabled"><a href="javascript:void(0)">»</a></li> 
         </ul> 
        </div> 
       </div> 
      </div> 
     </div> 
     <div class="clearfix"></div> 
    </div> 
   </div> 
  </div> 
  <div id="layer_form" style="display: none;" class="ibox-content"> 
   <form method="post" class="form-horizontal eform1" id="eform"> 
    <!-- form input封装 --> 
    <input type="hidden" name="id" class="form-control"> 
    <input type="hidden" name="idForShow" class="form-control"> 
    <input type="hidden" name="dataElementId"> 
    <input type="hidden" name="companyId"> 
    <input type="hidden" name="groupId"> 
    <div id="status_div"></div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源名称：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="text" name="value1" rangelength="[1,50]" class="form-control" required> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源所在位置：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="text" name="value5" rangelength="[1,400]" class="form-control" id="infoadd"> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源所在网络：</label> 
      </div> 
      <div class="col-sm-8"> 
       <select name="value3" id="value3" data-placeholder="信息资源所在网络" class="chosen-select" disabled> <option value=""></option> <option value="1">政务内网</option> <option value="2">政务外网</option> <option value="3">互联网</option> <option value="4">业务专网</option> <option value="5">单机</option> <option value="6">其他</option> <option value="7">无</option> </select> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源关联系统：</label> 
      </div> 
      <div class="col-sm-8"> 
       <select name="value4" id="value4" data-placeholder="信息资源关联系统" class="chosen-select" style="width: 350px;" tabindex="4" required> <option value=""></option> <option value="1756">企业勘察设计管理信息系统　</option> <option value="1755">　湖南省施工图管理信息系统</option> <option value="1754">湖南建筑信息网</option> <option value="1753">湖南省建筑工程项目管理系统</option> <option value="1752">水务通　</option> <option value="1748">残疾人就业和职业培训信息管理系统</option> <option value="1747">中国残疾人事业统计管理系统</option> <option value="1746">残疾人人口基础数据库管理系统</option> <option value="1745">全国残疾基层工作服务平台、残疾人基本服务状况和需求信息动态更新</option> <option value="1744">中国文物保护基金会</option> <option value="1743">社会扶贫网</option> <option value="1742">雨露计划信息管理服务系统</option> <option value="1741">全国扶贫开发信息系统</option> <option value="1735">中小尺度资料应用系统</option> <option value="1732">湖南信访信息系统</option> <option value="1730">湖南省移民综合管理信息系统</option> <option value="1729">湖南国税电子税务局</option> <option value="1728">金税三期税收管理系统</option> <option value="1727">税务综合办公信息系统</option> <option value="1726">数字法院业务应用系统</option> <option value="1722">全国工商联数据库系统</option> <option value="1719">互联网+政务服务一体化平台</option> <option value="1718">金通档案管理软件系统</option> <option value="1717">政协云</option> <option value="1716">ISOS</option> <option value="1715">湖南气象智能办公系统</option> <option value="1714">湖南省气象局综合管理信息系统</option> <option value="1713">中小尺度资料应用系统</option> <option value="1712">全国畜牧业统计监测系统</option> <option value="1711">全国畜禽规模养殖场信息服务云平台</option> <option value="1710">A++财务管理软件</option> <option value="1709">用友票据通6专业版</option> <option value="1708">机关事业单位人事工资信息管理系统</option> <option value="1707">部门预算管理系统1.0</option> <option value="1706">部门决算报表软件</option> <option value="1705">用友GRP－U8行政事业财务管理软件</option> <option value="1704">行政事业单位内部控制报告填报软件</option> <option value="1703">地方财政分析评价系统3.0</option> <option value="1701">移民资金会计报表系统</option> <option value="1700">湖南省移民综合管理信息系统</option> <option value="1699">金税三期税收管理系统</option> <option value="1698">全国检察机关统一业务应用系统</option> <option value="1697">全国扶贫开发信息系统</option> <option value="1696">湖南省信访信息系统</option> <option value="1695">全国妇联信访信息管理系统</option> <option value="1694">湖南省机构编制综合管理平台</option> <option value="1693">事业单位网上登记管理系统</option> <option value="1689">吉首市工资统发平台</option> <option value="1688">吉首市固定资产管理平台</option> <option value="1687">吉首市财政局国库集中支付平台</option> <option value="1686">全国党员管理信息系统</option> <option value="1685">全国公务员信息管理系统</option> <option value="1684">红星后台管理系统</option> <option value="1683">州文明单位动态管理平台</option> <option value="1681">百菲特人事薪资网络管理信息系统</option> <option value="1680">州人力资源社会保障统计报表系统</option> <option value="1679">全省政法领导干部信息综合系统</option> <option value="1678">中国法学会会员信息管理系统</option> <option value="1677">全国铁路护路联防信息管理系统</option> <option value="1676">湖南省护路办办公信息系统</option> <option value="1675">全国工会基层组织管理系统</option> <option value="1674">湖南省工会统一社会信用代码信息管理系统</option> <option value="1673">工会帮扶工作管理系统</option> <option value="1669">国家企业信用信息公示系统</option> <option value="1667">吉首市政协提案办公系统</option> <option value="1666">湖南省网上政务服务平台</option> <option value="1665">湖南省城镇个人住房信息系统</option> <option value="1664">商品房网上签约备案系统</option> <option value="1663">房地产综合管理系统</option> <option value="1662">州综合治税</option> <option value="1661">湖南省电子政务监察平台</option> <option value="1660">残疾人实名制就业培训系统</option> <option value="1659">湖南省残联学生资助和服务系统</option> <option value="1658">贫困残疾人家庭无障碍改造数据系统</option> <option value="1657">残疾人机动轮椅车燃油补贴申请审批系统</option> <option value="1656">阳光家园项目管理系统</option> <option value="1655">贫困残疾儿童抢救性康复项目数据管理系统</option> <option value="1654">全国残联基层工作服务平台、残疾人基本服务状况和需求信息动态更新系统</option> <option value="1653">残疾人人口基础数据库管理系统第二代残疾人证管理系统</option> <option value="1652">吉首市网格化社会服务管理指挥中心</option> <option value="1651">湖南省网上政务服务和电子监察系统V2</option> <option value="1649">湘西自治州电子政务协同办公系统</option> <option value="1648">全国党员管理信息系统</option> <option value="1647">全国公务员信息管理系统</option> <option value="1646">红星后台管理系统</option> <option value="1644">全省特定身份人员信息管理系统</option> <option value="1643">百菲特人事薪资网络管理信息系统</option> <option value="1642">全省政法领导干部信息综合系统</option> <option value="1641">中国法学会会员信息管理系统</option> <option value="1640">全国铁路护路联防信息管理系统</option> <option value="1639">湖南省护路办办公信息系统</option> <option value="1638">国家免费孕前优生健康检查项目信息系统</option> <option value="1637">中国危重孕产妇监测系统v3.0</option> <option value="1636">全国妇幼保健机构监测管理系统</option> <option value="1635">国家基本公共卫生服务项目管理信息系统</option> <option value="1634">湖南省妇幼卫生信息直报管理系统</option> <option value="1633">中国妇幼卫生监测数据直报系统</option> <option value="1632">新生儿疾病筛查信息管理系统</option> <option value="1631">妇幼重大公共卫生服务项目信息直报系统</option> <option value="1630">全国妇幼卫生报表管理平台</option> <option value="1629">湖南省免疫规划信息管理系统-金苗</option> <option value="1628">预防艾滋病、梅毒和乙肝母婴传播管理信息系统</option> <option value="1627">卫生和计划生育监督信息平台</option> <option value="1626">湖南省卫生监督信息系统</option> <option value="1625">国家卫生计生委全国卫生计生财务报表系统</option> <option value="1624">湖南医疗机构、医师、护士电子化注册信息系统</option> <option value="1623">全国妇幼卫生信息直报管理系统</option> <option value="1622">中国疾病预防控制信息系统</option> <option value="1621">远程视频会议系统</option> <option value="1620">业务OA系统</option> <option value="1619">全员人口信息系统</option> <option value="1618">湖南省农村卫生信息系统</option> <option value="1617">湖南省农工业机械管理局内容管理系统</option> <option value="1616">全国农垦国有土地使用权确权登记发证工作进度管理系统</option> <option value="1615">种子生产经营许可管理系统</option> <option value="1614">湖南省农作物重大病虫害监测预警信息系统</option> <option value="1613">植保专业统计子系统</option> <option value="1612">全国植物检疫信息化管理系统</option> <option value="1611">湖南省农情信息调度系统</option> <option value="1610">全国水生生物资源养护信息采集系统</option> <option value="1609">中国渔业船员管理系统</option> <option value="1608">农业部渔政调查管理系统</option> <option value="1607">渔业统计报表与分析系统</option> <option value="1606">全国兽医队伍信息管理系统</option> <option value="1605">全国执业兽医资格考试信息管理系统</option> <option value="1604">全国兽医实验室信息管理系统</option> <option value="1603">动物检疫合格证明电子出证系统</option> <option value="1602">动物标识及动物产品追溯系统（全国动物疫病防控与动物卫生监督工作云平台）</option> <option value="1601">湖南省动物卫生监督信息平台</option> <option value="1600">全国动物卫生监督信息统计报送软件</option> <option value="1599">畜禽标准化示范场信息管理系统</option> <option value="1598">全国畜牧业灾情上报系统</option> <option value="1597">全国畜禽规模养殖信息服务云平台</option> <option value="1596">畜牧业综合信息平台—草原子平台</option> <option value="1595">国家种畜禽生产经营许可证管理系统</option> <option value="1594">全国畜牧业统计监测系统</option> <option value="1593">湖南省畜牧水产局自动化办公系统</option> <option value="1592">湘西州信用信息共享交换平台</option> <option value="1591">国家重大建设项目库</option> <option value="1590">湖南省投资项目在线审批监管平台</option> <option value="1589">湖南省安全监管与应急指挥平台</option> <option value="1588">国家安监局-非药品类易制化学品综合管理信息系统</option> <option value="1587">全国非煤矿山安全生产许可证管理系统</option> <option value="1586">湖南安监电子政务系统</option> <option value="1585">湘西州安全生产综合管控平台</option> <option value="1584">湖南省安全生产合行政执法管理系统</option> <option value="1583">湖南省网上政务服务和电子监察系统V2</option> <option value="1582">安全生产举报信息统计系统</option> <option value="1581">安全生产行政执法统计系统</option> <option value="1580">隐患排查治理统计系统</option> <option value="1579">安全生产综合统计信息直报系统</option> <option value="1578">国家食品药品监督管理总局国产非特殊用途化妆品备案管理系统</option> <option value="1577">湖南省药品抽验管理信息系统</option> <option value="1576">国家化妆品不良反应监测系统</option> <option value="1575">国家药品不良反应监测系统</option> <option value="1574">食品药品监督管理统计信息系统</option> <option value="1573">湖南省食品药品监督管理局投诉举报热线</option> <option value="1572">食品药品安全重大信息直报系统试运行</option> <option value="1571">特殊药品监管系统</option> <option value="1570">湖南省食品药品监督管理行政审批系统</option> <option value="1569">医疗器械注册管理信息系统</option> <option value="1568">医疗器械流通监管系统</option> <option value="1567">医疗器械生产注册监管系统</option> <option value="1566">全国水库大坝注册登记申报系统</option> <option value="1565">湘西州山洪灾害预警信息系统</option> <option value="1564">全国旅游厕所管理系统</option> <option value="1563">A级旅游景区管理系统</option> <option value="1562">省旅发委假日旅游填报系统</option> <option value="1561">全国旅游项目管理系统</option> <option value="1560">全国星级饭店统计调查系统</option> <option value="1559">国家旅游局旅行社统计管理系统</option> <option value="1558">全国旅游监管服务平台</option> <option value="1557">湖南省移民综合管理信息系统</option> <option value="1556">湖南气象智能办公系统</option> <option value="1555">湖南省气象局综合管理信息系统</option> <option value="1554">中小尺度资料应用系统</option> <option value="1553">精细化城镇天气预报制作系统</option> <option value="1552">国家企业信用信息公示系统（部门协同监管平台-湖南）</option> <option value="1548">湘西州公共资源交易中心医疗器械电子交易管理平台</option> <option value="1547">政府采购网上商城</option> <option value="1546">湘西公共资源交易系统</option> <option value="1545">金通档案管理软件系统</option> <option value="1544">湖南国税电子税务局</option> <option value="1543">金税三期税收管理系统</option> <option value="1542">税务综合办公信息系统</option> <option value="1541">湖南省企业质量信用管理平台</option> <option value="1540">12365直报平台</option> <option value="1539">湖南省产品质量分类监管系统</option> <option value="1538">特种设备综合业务监管系统</option> <option value="1537">检验检测机构资质认定网上审批系统</option> <option value="1536">认证认可业务综合监管平台</option> <option value="1535">湖南省检验检测机构资质认定监督管理系统</option> <option value="1534">12315投诉管理平台</option> <option value="1533">信用公示系统</option> <option value="1532">湖南省工商综合业务系统</option> <option value="1531">湖南省食品药品监督管理行政审批系统</option> <option value="1530">国家化妆品不良反应监测系统</option> <option value="1529">国家药品不良反应监测系统</option> <option value="1528">湖南省行政审批系统</option> <option value="1527">软件视频会议系统</option> <option value="1526">湖南省道路运输行业行车责任事故报表与分析系统</option> <option value="1525">湖南省网上政务服务和电子监督系统</option> <option value="1524">湖南省交通运输统计分析监测和投资计划管理信息系统</option> <option value="1523">湖南省客运班线实载率信息直报管理系统</option> <option value="1522">湖南省站场信息采录系统</option> <option value="1521">智慧畅行（湖南省城乡道路客运油补与新能源监管平台）</option> <option value="1520">交通运输企业一套表联网直报系统</option> <option value="1519">湖南省道路运输管理信息系统</option> <option value="1518">湖南省重点营运车辆动态信息公共监管与服务平台</option> <option value="1517">船舶动态管理系统</option> <option value="1516">水运油补系统</option> <option value="1515">运政系统</option> <option value="1514">渡口码头视频监控系统</option> <option value="1513">全国污染源监测信息管理与共享平台</option> <option value="1512">县域生态环境质量考核数据填报系统</option> <option value="1511">饮用水水源环境基础信息采集系统</option> <option value="1510">全国饮用水水源地环境状况评估信息化管理系统</option> <option value="1509">环境统计业务系统</option> <option value="1508">排污许可证管理系统</option> <option value="1507">湖南省建设项目环评审批数据管理系统</option> <option value="1506">湘西自治州公安局警务信息应用支撑服务平台（信息服务支撑平台）</option> <option value="1505">全国刑侦信息专业应用系统</option> <option value="1504">湖南省会计从业人员综合系统管理系统</option> <option value="1503">会计代理记账机构执业资格信息系统</option> <option value="1502">账务核算系统</option> <option value="1501">惠农补贴一卡通系统</option> <option value="1500">财政行政复议信息管理系统</option> <option value="1499">湘西州自治州财政局综合办公系统</option> <option value="1498">湖南财政一体化信息系统</option> <option value="1497">资产管理系统</option> <option value="1496">非税收入管理系统</option> <option value="1495">工资统发系统</option> <option value="1494">财务核算系统</option> <option value="1493">年度决算报表软件</option> <option value="1492">部门决算管理系统</option> <option value="1491">国库专户管理系统</option> <option value="1490">财税库收入横联系统</option> <option value="1489">国库支付管理系统</option> <option value="1488">财政供养人员管理系统</option> <option value="1487">预算执行管理系统</option> <option value="1486">部门预算管理系统</option> <option value="1485">湖南省网上政务和电子监察系统</option> <option value="1484">湖南省建筑起重机械管理信息系统</option> <option value="1483">湖南省施工图管理信息系统</option> <option value="1482">湖南省建筑工程项目管理系统</option> <option value="1481">国家粮油统计信息系统</option> <option value="1480">湖南省内联引资项目管理信息系统</option> <option value="1479">湖南省电子商务统计监测管理系统政府端</option> <option value="1478">湖南省成品油审批监管服务平台</option> <option value="1477">事业单位人员信息管理系统</option> <option value="1476">职业技能鉴定工作平台</option> <option value="1475">湖南省公共就业服务信息管理平台</option> <option value="1474">全国人力资源市场统计信息系统-人力资源服务机构数据库</option> <option value="1473">大医保系统</option> <option value="1472">工伤保险管理信息系统</option> <option value="1471">失业保险管理系统</option> <option value="1470">湖南省社会保障卡管理系统</option> <option value="1469">湖南省企业养老保险信息管理系统</option> <option value="1468">湖南省机关事业单位养老保险业务系统</option> <option value="1467">湖南省城乡居民社会养老保险信息管理系统</option> <option value="1466">全国可移动文物信息登陆平台</option> <option value="1465">双随机监管系统</option> <option value="1464">文网卫士监控系统</option> <option value="1463">视频监控系统</option> <option value="1462">全国文化市场技术监管与服务平台</option> <option value="1461">广播影视统计信息网</option> <option value="1460">湖南省印刷行业信息管理平台</option> <option value="1459">湖南省新闻出版行业信息管理平台</option> <option value="1458">全国新闻出版统计网</option> <option value="1457">全国文化市场技术监管与政务平台</option> <option value="1456">湖南旅游监管网</option> <option value="1455">旅游企业财务填报系统</option> <option value="1454">国家旅游局旅游厕所管理系统</option> <option value="1453">国家旅游局星级饭店统计调查系统</option> <option value="1452">国家旅游局旅行社统计管理系统</option> <option value="1451">凤凰县审计办公系统</option> <option value="1450">湖南省建筑市场和工程质量安全监管一体化平台</option> <option value="1448">全国建筑市场监管公共服务平台</option> <option value="1447">湖南省施工图管理信息系统</option> <option value="1446">湖南省建筑工程项目管理系统</option> <option value="1445">建筑工程项目监管信息平台</option> <option value="1444">全国城镇生活垃圾处理管理信息系统</option> <option value="1442">医师、护士、医疗机构电子化注册信息系统</option> <option value="1441">全国妇幼卫生报表管理平台</option> <option value="1440">重点慢性病监测信息系统</option> <option value="1439">人口死亡信息登记管理系统</option> <option value="1438">寄生虫防治信息管理系统</option> <option value="1437">国家严重精神障碍信息系统</option> <option value="1436">全国农村环境卫生监测信息管理系统</option> <option value="1435">食源性疾病监测报告系统</option> <option value="1433">中国免疫规划信息管理系统</option> <option value="1432">中国疾病预防控制信息系统</option> <option value="1431">湖南省免疫规划信息管理系统</option> <option value="1430">湖南省免疫规划综合信息平台</option> <option value="1429">结核病信息管理系统</option> <option value="1428">湖南省全员人口信息综合管理系统，人口计生综合治理信息实时通报子系统</option> <option value="1427">国家免费孕前优生健康检查项目信息系统</option> <option value="1426">湖南省出生缺陷防治信息平台产前筛查信息系统</option> <option value="1425">湖南省卫生统计信息网络直报系统</option> <option value="1424">新生儿疾病筛查信息管理系统</option> <option value="1423">湖南省妇幼卫生信息直报管理系统</option> <option value="1422">全国妇幼保健机构监测管理系统</option> <option value="1421">妇幼重大公共卫生服务项目信息直报系统</option> <option value="1420">国家妇幼卫生信息管理平台</option> <option value="1419">预防艾滋病、梅毒和乙肝母婴传播管理信息系统</option> <option value="1418">卫生和计划生育监督信息平台</option> <option value="1417">湖南省卫生监督信息系统</option> <option value="1416">医师联网注册及考核管理系统</option> <option value="1415">护士执业注册联网管理信息系统</option> <option value="1414">医疗机构注册联网管理系统</option> <option value="1413">湖南省卫生计生科教信息服务平台</option> <option value="1412">一体机管理系统</option> <option value="1411">国家基本公共卫生服务项目基层高血压管理办公室</option> <option value="1410">国家基本公共卫生服务项目管理信息系统</option> <option value="1408">全国卫生计生机构建设管理系统</option> <option value="1407">国家卫生统计信息网络直报系统</option> <option value="1406">湖南省卫生计生服务体系基本建设与大型设备管理系统</option> <option value="1405">国家卫生健康委员会建设装备审批监管系统</option> <option value="1404">湖南省统计联网直报平台</option> <option value="1403">全国计划生育药具购调存业务管理信息系统</option> <option value="1402">计划生育药具自助发放管理平台</option> <option value="1401">湖南省食品安全评议考核信息系统</option> <option value="1400">湖南省组织工作应用系统云平台</option> <option value="1399">湖南省健康扶贫管理</option> <option value="1398">湖南省农村卫生信息系统</option> <option value="1396">国家住户调查平台</option> <option value="1395">iHaps程序</option> <option value="1394">SAPPA程序</option> <option value="1393">投资处理程序（河利时）</option> <option value="1392">联网直报系统</option> <option value="1391">湖南省安全监管与应急指挥平台</option> <option value="1390">国家安监局-非药品类易制化学品综合管理信息系统</option> <option value="1389">湖南安监电子政务系统</option> <option value="1388">湖南省安全生产合行政执法管理系统</option> <option value="1386">安全生产举报信息统计系统</option> <option value="1385">安全生产行政执法统计系统</option> <option value="1384">隐患排查治理统计系统</option> <option value="1383">安全生产综合统计信息直报系统</option> <option value="1382">农业标准化信息平台</option> <option value="1381">企业标准信息公共服务平台</option> <option value="1380">重大及较大案件信息管理系统</option> <option value="1379">国家食品安全抽检检测信息系统</option> <option value="1378">湖南省保健食品和化妆品安全监管信息系统</option> <option value="1377">湖南省12315消费者投诉举报信息系统</option> <option value="1376">湖南省凤凰工商旅游市场监管系统</option> <option value="1375">湖南省食品药品监督管理食品经营许可管理系统</option> <option value="1374">湖南省工商行政管理局市场主体信息化综合管理系统</option> <option value="1373">湖南省食品药品监督管理行政审批系统</option> <option value="1372">湖南省药品抽验管理信息系统</option> <option value="1371">国家化妆品不良反应监测系统</option> <option value="1370">国家药品不良反应监测系统</option> <option value="1369">食品药品监督管理统计信息系统</option> <option value="1368">食品药品安全重大信息直报系统试运行</option> <option value="1367">医疗器械流通监管系统</option> <option value="1366">信用公示系统</option> <option value="1365">湘西自治州计量测试检定所卓软计量业务管理平台</option> <option value="1364">湖南省企业质量信用管理平台</option> <option value="1363">特种设备综合业务监管系统</option> <option value="1362">认证认可业务监管平台</option> <option value="1361">湖南省检验检测机构资质认定监督管理系统</option> <option value="1360">SAPPA程序</option> <option value="1359">投资处理程序（河利时）</option> <option value="1358">联网直报系统</option> <option value="1357">湖南省安全监管与应急指挥平台</option> <option value="1356">国家安监局-非药品类易制毒化学品综合管理信息系统</option> <option value="1355">湖南安监电子政务系统</option> <option value="1354">湖南省安全生产综合行政执法管理系统</option> <option value="1353">安全生产举报信息统计系统</option> <option value="1352">安全生产行政执法管理系统</option> <option value="1351">隐患排查治理统计系统</option> <option value="1350">安全生产综合统计信息直报系统</option> <option value="1349">刑释解教人员信息管理系统</option> <option value="1348">政务服务平台</option> <option value="1347">刑满释放人员信息管理系统</option> <option value="1346">政法人才信息统计</option> <option value="1345">湖南省政法领导干部信息综合系统</option> <option value="1344">国家司法行政基层工作信息管理平台</option> <option value="1343">全国法律服务机构统一代码管理系统</option> <option value="1342">如法网</option> <option value="1341">湖南省司法厅社区矫正管理系统</option> <option value="1340">国家重大建设项目库</option> <option value="1339">湖南省投资项目在线审批监管平台</option> <option value="1338">湖南省互联网+监督平台（数据报送系统）</option> <option value="1337">国家学生资助管理信息系统</option> <option value="1336">湖南省普通高校招生考试管理信息系统</option> <option value="1335">全国中等职业学校学生管理信息系统</option> <option value="1334">湖南省民办教育网</option> <option value="1333">运动员注册管理系统</option> <option value="1332">全国青少年体育基础数据网络填报系统</option> <option value="1331">全国中小学生学籍信息管理系统</option> <option value="1330">中国教师资格网</option> <option value="1329">矿业权管理信息系统</option> <option value="1328">矿业权配号系统</option> <option value="1327">矿业权人勘查开采信息公示系统</option> <option value="1326">湖南省征地信息公开平台</option> <option value="1325">农村土地整治监测监管系统</option> <option value="1324">土地市场动态监测与监管系统</option> <option value="1323">湖南省国土资源厅公文传输系统</option> <option value="1322">湖南省国土资源厅远程报件系统</option> <option value="1321">吉首市国土资源移动执法监察平台</option> <option value="1320">国土资源电子政务系统</option> <option value="1319">不动产登记信息系统</option> <option value="1318">湘西州科技项目申报与评审系统</option> <option value="1317">湖南省乡镇财政分级补贴平台</option> <option value="1316">全国木材运输管理系统</option> <option value="1315">全国林木采伐管理系统</option> <option value="1314">全国建设项目使用林地审核审批管理系统</option> <option value="1313">林地测土配方信息系统</option> <option value="1312">湖南省网上信访信息系统</option> <option value="1311">湖南省森林公安执法办案系统</option> <option value="1310">湖南省森林公安信息管理系统</option> <option value="1309">湖南防火管理信息系统</option> <option value="1308">案件管理报表系统</option> <option value="1307">湖南省“12119”森林火灾报警系统</option> <option value="1305">人力资源社会保障工资管理系统</option> <option value="1304">全国林业有害生物防治信息管理系统</option> <option value="1303">全国森林保险数据系统</option> <option value="1302">林业工作站本底数据报表管理系统</option> <option value="1301">全国林木种苗许可证管理信息系统</option> <option value="1300">视频会议系统</option> <option value="1299">无纸化办公系统</option> <option value="1298">全国林业植物检疫管理信息系统</option> <option value="1297">全国农村留守儿童和困境儿童信息管理系统</option> <option value="1296">流浪乞讨人员救助管理信息系统</option> <option value="1295">湖南省网上政务服务-老龄业务管理系统</option> <option value="1294">全国优抚信息管理系统</option> <option value="1293">湖南省民政厅社会组织管理平台</option> <option value="1292">湖南组织工作应用系统云平台</option> <option value="1291">军休干部管理系统</option> <option value="1290">军休职工管理系统</option> <option value="1289">退役士兵信息管理系统</option> <option value="1288">湖南省城乡医疗救助及优抚对象医疗保障系统</option> <option value="1287">湖南省社会救助信息管理系统</option> <option value="1286">国家地名数据库管理系统</option> <option value="1285">国家自然灾害灾情报送系统</option> <option value="1284">全国综合减灾示范社区申报展示管理系统</option> <option value="1283">人力资源社会保障统计报表系统</option> <option value="1282">人事工资信息管理系统（百菲特系统）</option> <option value="1281">机构编制实名制管理系统</option> <option value="1280">事业单位人员统计系统</option> <option value="1279">全国公务员管理信息系统</option> <option value="1278">湖南省婚姻登记系统</option> <option value="1277">全国救助管理信息系统</option> <option value="1276">全国儿童福利信息管理系统</option> <option value="1275">全国养老机构业务管理系统</option> <option value="1274">湖南省民政项目库管理平台</option> <option value="1273">全国居民经济状况核对工作统计平台</option> <option value="1272">湖南省居民家庭经济状况核对平台</option> <option value="1271">湖南省民政厅电子公文传输系统</option> <option value="1269">全国民政信访信息系统</option> <option value="1268">民政视频信息系统</option> <option value="1267">湖南省行政事业资产动态管理信息系统</option> <option value="1266">拖拉机派证管理系统2015</option> <option value="1265">湖南省农作物重大病虫害监测预警信息系统</option> <option value="1264">全国植物检疫信息化管理系统</option> <option value="1263">动物检疫合格证明电子出证系统</option> <option value="1262">动物标识及动物产品追溯系统（全国动物疫病防控与动物卫生监督工作云平台）</option> <option value="1261">湖南省动物卫生监督信息平台</option> <option value="1260">全国动物卫生监督信息统计报送软件</option> <option value="1259">湘西自治州审计办公系统</option> <option value="1258">国家水资源管理系统取水许可登记子系统</option> <option value="1257">湖南省河长制综合管理信息系统</option> <option value="1256">水利部应用门户河长制</option> <option value="1255">中央气象台</option> <option value="1254">洪涝灾情信息服务系统</option> <option value="1253">湘西防汛信息网</option> <option value="1252">湖南防汛短信平台</option> <option value="1251">水利工程动态监管系统</option> <option value="1250">湖南省防汛抗旱云平台</option> <option value="1249">全国水库大坝注册登记申报系统</option> <option value="1248">吉首市山洪灾害预警信息系统</option> <option value="1247">行政复议应诉案件统计系统</option> <option value="1246">湖南省行政执法证和执法监督管理证管理系统</option> <option value="1245">会计核算中心财务GRP-U8软件</option> <option value="1244">国家免费孕前优生健康检查项目信息系统</option> <option value="1243">中国危重孕产妇监测系统</option> <option value="1242">全国妇幼保健机构监测管理系统</option> <option value="1241">国家基本公共卫生服务项目管理信息系统</option> <option value="1240">湖南省妇幼卫生信息直报管理系统</option> <option value="1239">中国妇幼卫生监测数据直报系统</option> <option value="1238">新生儿疾病筛查信息管理系统</option> <option value="1237">妇幼重大公共卫生服务项目信息直报系统</option> <option value="1236">全国妇幼卫生年报管理平台</option> <option value="1235">湖南省免疫规划信息管理系统-金苗</option> <option value="1234">预防艾滋病、梅毒和乙肝母婴传播管理信息系统</option> <option value="1233">卫生和计划生育监督信息平台</option> <option value="1232">湖南省卫生监督信息系统</option> <option value="1231">湖南医疗机构、医师、护士电子化注册信息系统</option> <option value="1230">全国妇幼卫生信息直报管理系统</option> <option value="1229">全员人口管理系统</option> <option value="1228">湖南省农村卫生信息系统</option> <option value="1225">凤凰县山洪灾害预警信息系统</option> <option value="1224">全国水库大坝注册登记申报系统</option> <option value="1210">全国兽医队伍信息管理系统</option> <option value="1209">湖南省动物卫生监督信息平台</option> <option value="1208">动物疫病监测系统</option> <option value="1207">渔业统计报送与分析系统</option> <option value="1205">畜牧业信息即时采集上报系统</option> <option value="1204">全国畜牧业统计监测系统</option> <option value="1203">湖南省联合收割机管理系统</option> <option value="1202">湖南省拖拉机管理系统</option> <option value="1201">全国农局综合管理系统</option> <option value="1200">湖南省农机购置补贴系统</option> <option value="1199">中国种业信息网</option> <option value="1198">农资管家可溯源电子台账</option> <option value="1196">全国植物检疫信息化管理系统</option> <option value="1195">财务软件</option> <option value="1192">湖南省交通运输厅省城乡道路客运油补与新能源监管平台</option> <option value="1190">湖南省道路运输管理信息系统</option> <option value="1189">湖南省道路运输三级协同管理与服务信息系统</option> <option value="1188">湖南省重点营运车辆动态信息公共监管与服务平台</option> <option value="1187">湖南省农村水路客运燃油补助申报系统</option> <option value="1186">船舶及海上设施检验管理信息系统</option> <option value="1185">湖南省水路运政管理系统</option> <option value="1184">中国海事协同管理平台</option> <option value="1183">船舶动态管理2.0系统</option> <option value="1182">渡口码头视频监控系统</option> <option value="1181">内河客运船舶3G视频监控系统</option> <option value="1180">湖南省公路网</option> <option value="1179">湘西公路网</option> <option value="1178">湖南省交通运输项目库与计划管理信息平台</option> <option value="1177">凤凰县网格化平台</option> <option value="1176">湖南省网上政务服务和电子监察系统</option> <option value="1174">湘西自治州电子政务协同办公系统</option> <option value="1173">全国排污许可证管理信息平台（管理端）</option> <option value="1172">湘西自治州机动车排污监控平台</option> <option value="1171">湖南省建设项目环评审批数据管理系统</option> <option value="1170">全国污染源监测信息管理与共享平台</option> <option value="1169">湘西州文明创建管理平台</option> <option value="1168">污染地块土壤管理</option> <option value="1167">湖南省排污许可发放系统</option> <option value="1166">湖南省生态环境大数据系统</option> <option value="1165">湖南省环评审批系统</option> <option value="1164">湖南省污染源在线监控</option> <option value="1163">湖南省地理信息平台</option> <option value="1162">湖南省专项资金管理系统</option> <option value="1161">湘西州空气质量预警预报系统</option> <option value="1160">湖南省国家重点监控企业自行监测信息发布平台</option> <option value="1159">凤凰县国土资源电子政务系统</option> <option value="1158">凤凰县不动产登记信息系统</option> <option value="1157">矿业权管理信息系统</option> <option value="1156">矿业权配号系统</option> <option value="1155">矿业权人勘查开采信息公示系统</option> <option value="1154">湖南省征地信息公开平台</option> <option value="1153">农村土地整治监测监管系统</option> <option value="1152">土地市场动态监测与监管系统</option> <option value="1151">湖南省国土资源厅公文传输系统</option> <option value="1150">湖南省国土资源厅远程报件系统</option> <option value="1149">湘西州国土资源移动执法监察平台</option> <option value="1148">国家林业局林业有害生物防治检疫管理与服务平台</option> <option value="1147">林业有害生物及野生动物疫源疾病信息管理平台</option> <option value="1146">行政审批系统</option> <option value="1145">新一轮退耕还林检查验收管理与应用系统</option> <option value="1144">全国木材运输管理系统</option> <option value="1143">全国林木采伐管理系统</option> <option value="1142">全国建设项目使用林地审核审批管理系统</option> <option value="1141">林地测土配方信息系统</option> <option value="1139">湖南省森林公安执法办案系统</option> <option value="1138">湖南省森林公安信息管理系统</option> <option value="1137">湖南防火管理信息系统</option> <option value="1136">案件管理报表系统</option> <option value="1135">湖南省“12119”森林火灾报警系统</option> <option value="1134">机构编制实名制管理系统</option> <option value="1133">公务员统计系统</option> <option value="1132">人力资源社会保障工资管理系统</option> <option value="1130">全国林业有害生物防治信息管理系统</option> <option value="1129">林业工作站本底数据报表管理系统</option> <option value="1128">视频会议系统</option> <option value="1127">无纸化办公系统</option> <option value="1126">全国林业植物检疫管理信息系统</option> <option value="1125">中国教师资格管理系统</option> <option value="1124">全国中等职业学校学生管理信息系统</option> <option value="1123">湖南省民办教育网</option> <option value="1122">全国中小学学籍信息管理系统</option> <option value="1121">中国教师资格网</option> <option value="1120">湘西助学网</option> <option value="1119">湘西自治州普通高中招生管理系统</option> <option value="1118">湘西远程教育网</option> <option value="1117">互联网＋湖南省异地扶贫搬迁信息管理系统</option> <option value="1116">湖南省重点建设项目管理信息系统</option> <option value="1115">商务部业务系统统一平台（内贸流通统计监测信息服务）</option> <option value="1114">商务预报平台</option> <option value="1113">湖南省成品油审批监管服务平台</option> <option value="1112">商务部业务系统统一平台（技术贸易管理信息系统）</option> <option value="1111">单用途商业预付卡业务信息管理</option> <option value="1110">湖南省电子商务统计监测管理系统政府端</option> <option value="1109">商务部业务系统统一平台（加工贸易服务促进）</option> <option value="1108">湖南省对外贸易管理服务平台</option> <option value="1107">湖南省再生资源回收经营者备案登记系统</option> <option value="1106">商务部业务系统统一平台（全国拍卖行业管理）</option> <option value="1105">商务部业务系统统一平台（全国典当行业监督管理信息系统）</option> <option value="1104">湖南省对外投资合作管理系统（平台版）</option> <option value="1103">商务部走出去公共服务平台（对外劳务合作服务）</option> <option value="1102">商务部走出去公共服务平台（境外投资备案和核准）</option> <option value="1101">湖南省内联引资项目管理信息系统</option> <option value="1100">湘西州信用信息共享交换平台</option> <option value="1099">国家重大建设项目库</option> <option value="1098">湖南省投资项目在线审批监管平台</option> <option value="1097">全国文化市场技术监管与政务平台</option> <option value="1096">湖南省旅游监管网</option> <option value="1095">旅游企业财务填报系统</option> <option value="1094">全国旅游厕所管理系统</option> <option value="1093">A级旅游景区管理系统</option> <option value="1092">省旅发委假日旅游填报系统</option> <option value="1091">全国旅游项目管理系统</option> <option value="1090">全国星级饭店统计调查系统</option> <option value="1089">国家旅游局旅行社统计管理系统</option> <option value="1088">全国旅游监管服务平台</option> <option value="1073">湖南省公共法律服务平台管理系统</option> <option value="1072">视频会议系统</option> <option value="1071">刑满释放人员信息管理系统</option> <option value="1070">政法人才信息统计</option> <option value="1069">国家司法行政基层工作信息管理平台</option> <option value="1068">湖南省司法厅社区矫正管理系统</option> <option value="1066">湘西自治州社会综合治税共享平台</option> <option value="1065">烈士纪念设施保护管理信息系统</option> <option value="1063">社会服务统计信息管理系统</option> <option value="1062">乡镇财政管理系统</option> <option value="1061">方正数字财政</option> <option value="1060">财政大平台</option> <option value="1057">全国农村留守儿童和困境儿童信息管理系统</option> <option value="1056">湖南省网上政务服务-老龄业务管理系统</option> <option value="1055">全国优抚信息管理系统</option> <option value="1054">湖南省民政厅社会组织管理平台</option> <option value="1053">军休干部管理系统</option> <option value="1052">军休职工管理系统</option> <option value="1051">退役士兵信息管理系统</option> <option value="1050">湖南省城乡医疗救助及优抚对象医疗保障系统</option> <option value="1049">湖南省社会救助信息管理系统</option> <option value="1048">国家地名数据库管理系统</option> <option value="1047">国家自然灾害灾情报送系统</option> <option value="1046">全国综合减灾示范社区申报展示管理系统</option> <option value="1045">人力资源社会保障统计报表系统</option> <option value="1042">事业单位人员统计系统</option> <option value="1041">全国公务员管理信息系统</option> <option value="1040">湖南省婚姻登记系统</option> <option value="1039">全国救助管理信息系统</option> <option value="1038">全国儿童福利信息管理系统</option> <option value="1037">湖南省民政项目库管理平台</option> <option value="1035">全国居民经济状况核对工作统计平台</option> <option value="1034">湖南省居民家庭经济状况核对平台</option> <option value="1033">湖南省民政厅电子公文传输系统</option> <option value="1031">全国民政信访信息系统</option> <option value="1004">凤凰县城乡居民医保信息管理系统</option> <option value="1003">聘用干部查询系统</option> <option value="1002">干部人事档案管理系统</option> <option value="1001">湖南省养老保险信息管理系统</option> <option value="1000">社会保险基金报表管理信息系统</option> <option value="999">用友GRP-U8行政事业财务管理软件</option> <option value="998">互联网+政务服务 一体化平台</option> <option value="996">凤凰县社会信用信息共享平台单位共享系统</option> <option value="995">“互联网+监督”平台系统</option> <option value="994">基金监督软件系统</option> <option value="993">湖南省职称管理系统</option> <option value="992">百菲特人事薪资网络管理信息系统</option> <option value="991">湘西州社会保障卡管理系统</option> <option value="990">湖南人才智能一体化服务平台</option> <option value="989">湖南省公共就业服务信息管理平台</option> <option value="988">全国人力资源市场统计信息系统</option> <option value="987">社会医疗保险信息管理系统</option> <option value="986">工伤保险管理信息系统</option> <option value="985">失业保险管理系统</option> <option value="984">湖南省社会保障卡管理系统</option> <option value="983">企业养老保险管理信息系统</option> <option value="982">湖南省机关事业单位养老保险业务系统</option> <option value="981">湖南省城乡居民社会养老保险信息管理系统</option> <option value="980">湖南乡镇财政补贴平台</option> <option value="979">县财政局综合办公系统</option> <option value="978">资产管理系统</option> <option value="977">非税收入管理系统</option> <option value="976">工资统发系统</option> <option value="975">社保基金管理系统</option> <option value="974">国库专户管理系统</option> <option value="973">财税库收入横联系统</option> <option value="972">国库支付管理系统</option> <option value="971">预算执行管理系统</option> <option value="970">部门预算管理系统</option> <option value="969">湖南省农业综合开发信息管理系统</option> <option value="968">农村综合改革工作管理信息系统</option> <option value="967">湖南财政一体化信息系统</option> <option value="966">部门决算管理系统</option> <option value="965">财政供养人员管理系统</option> <option value="963">全国在逃人员信息系统</option> <option value="962">全国盗抢汽车信息系统</option> <option value="961">全国未知名尸体信息系统</option> <option value="960">全国失踪人员信息系统</option> <option value="959">全国公安机关DNA数据库应用系统</option> <option value="958">全国公安机关现场勘查信息系统</option> <option value="957">全国人口信息管理系统</option> <option value="956">湖南省实有人口信息管理平台</option> <option value="955">全省驾驶人网上报名考试预约系统</option> <option value="954">公安交通集成指挥平台</option> <option value="953">湖南省治安行政许可及备案管理系统</option> <option value="952">湖南省旅馆治安管理信息系统</option> <option value="951">全国枪支管理系统</option> <option value="950">全国民用爆炸物品信息管理系统</option> <option value="949">湖南省保安服务监管信息系统</option> <option value="948">公安交通管理综合应用平台</option> <option value="947">凤凰公安网</option> <option value="946">湖南省警务综合应用平台</option> <option value="945">湘西自治州公安局警务信息综合应用平台</option> <option value="916">湘西州科技成果数据库</option> <option value="915">湘西州科技项目申报与评审系统</option> <option value="914">湘西州科技创新服务平台</option> <option value="913">湖南省中小企业公共服务平台</option> <option value="887">湖南省城镇个人住房信息系统</option> <option value="886">房屋项目测绘云平台管理系统</option> <option value="885">凤凰县商品房网上签约备案管理系统</option> <option value="884">凤凰县房产综合管理信息系统</option> <option value="873">行政复议应诉案件统计系统</option> <option value="872">湖南省行政执法证和执法监督管理证管理系统</option> <option value="871">小额贷款公司监测管理系统</option> <option value="870">融资性担保机构监管预警系统</option> <option value="869">湖南省资本市场信息管理系统</option> <option value="868">建筑工程项目监管信息平台</option> <option value="867">湘西自治州公安局警务信息应用支撑服务平台（信息服务支撑平台）</option> <option value="866">湘西自治州公安局警务信息综合应用平台</option> <option value="865">全国技工院校电子注册和统计信息管理系统</option> <option value="864">职业技能鉴定工作平台</option> <option value="863">湖南人才智能一体化服务平台</option> <option value="862">湖南省公共就业服务信息管理平台</option> <option value="861">湖南人事考试网</option> <option value="860">全国人力资源市场统计信息系统-人力资源服务机构数据库</option> <option value="859">湖南省劳动保障监察两网化管理系统</option> <option value="858">大医保系统</option> <option value="857">工伤保险管理信息系统</option> <option value="856">失业保险管理系统</option> <option value="855">湖南省社会保障卡管理系统</option> <option value="854">企业养老保险管理信息系统</option> <option value="853">湖南省机关事业单位养老保险业务系统</option> <option value="852">湖南省城乡居民社会养老保险信息管理系统</option> <option value="851">政协云</option> <option value="850">湖南省网上政务服务和电子监察系统</option> <option value="848">湘西自治州公积金业务系统</option> <option value="847">OA办公系统平台</option> <option value="846">政府网站群平台</option> <option value="845">网格化融合平台</option> <option value="844">州综合治税平台（州财税综合信息共享平台）</option> <option value="843">小额贷款公司监测管理系统</option> <option value="842">融资性担保机构监管预警系统</option> <option value="841">湖南省资本市场信息管理系统</option> <option value="840">电子政务项目审批平台</option> <option value="828">湘西州空气质量预警预报系统</option> <option value="827">湖南省建设项目环评审批数据管理系统</option> <option value="826">全国污染源监测信息管理与共享平台</option> <option value="825">湘西自治州机动车排污监控平台</option> <option value="824">湖南省国家重点监控企业自行监测信息发布平台</option> <option value="823">金税三期税收管理系统</option> <option value="814">湖南省信访信息系统</option> <option value="796">湖南国税电子税务局</option> <option value="794">税务综合办公信息系统</option> <option value="782">湖南省烟草专卖局一体化综合管理系统</option> <option value="779">互联网+政务服务一体化平台</option> <option value="776">国家企业信息公示系统（部门协同监管平台-湖南）</option> <option value="767">湖南省机构编制综合管理平台</option> <option value="766">事业单位网上登记管理系统</option> <option value="762">全国妇联信访信息管理系统</option> <option value="761">残疾人报税平台</option> <option value="760">残疾人就业和职业培训信息管理系统</option> <option value="759">中国残疾人事业统计管理系统</option> <option value="758">残疾人人口基础数据库管理系统</option> <option value="757">全国残疾基层工作服务平台、残疾人基本服务状况和需求信息动态更新</option> <option value="756">社会扶贫网</option> <option value="755">雨露计划信息管理服务系统</option> <option value="754">全国扶贫开发信息系统</option> <option value="704">全国农村留守儿童和困境儿童信息管理系统</option> <option value="703">流浪乞讨人员救助管理信息系统</option> <option value="702">湖南省网上政务服务-老龄业务管理系统</option> <option value="701">全国优抚信息管理系统</option> <option value="700">湖南省民政厅社会组织管理平台</option> <option value="699">湖南组织工作应用系统云平台</option> <option value="698">军休干部管理系统</option> <option value="697">军休职工管理系统</option> <option value="696">退役士兵信息管理系统</option> <option value="695">湖南省城乡医疗救助及优抚对象医疗保障系统</option> <option value="694">湖南省社会救助信息管理系统</option> <option value="693">国家地名数据库管理系统</option> <option value="692">国家自然灾害灾情报送系统</option> <option value="691">全国综合减灾示范社区申报展示管理系统</option> <option value="690">人力资源社会保障统计报表系统</option> <option value="689">人事工资信息管理系统（百菲特系统）</option> <option value="688">机构编制实名制管理系统</option> <option value="687">事业单位人员统计系统</option> <option value="686">全国公务员管理信息系统</option> <option value="685">湖南省婚姻登记系统</option> <option value="684">全国救助管理信息系统</option> <option value="683">全国儿童福利信息管理系统</option> <option value="682">全国养老机构业务管理系统</option> <option value="681">湖南省民政项目库管理平台</option> <option value="679">全国居民经济状况核对工作统计平台</option> <option value="678">湖南省居民家庭经济状况核对平台</option> <option value="677">湖南省民政厅电子公文传输系统</option> <option value="675">全国民政信访信息系统</option> <option value="674">民政视频信息系统</option> <option value="673">国资委财务快报软件</option> <option value="672">国家林业局林业有害生物防治检疫管理与服务平台</option> <option value="671">林业专项资金稽查系统</option> <option value="670">自然保护区财务报表</option> <option value="669">林业统计</option> <option value="668">全国木材运输管理系统</option> <option value="667">全国林木采伐管理系统</option> <option value="666">全国建设项目使用林地审核审批管理系统</option> <option value="665">林地测土配方信息系统</option> <option value="664">湖南省网上信访信息系统</option> <option value="663">湖南省森林公安执法办案系统</option> <option value="662">湖南省森林公安信息管理系统</option> <option value="661">湖南防火管理信息系统</option> <option value="660">单兵传输视频指挥系统</option> <option value="659">案件管理报表系统</option> <option value="658">湖南省“12119”森林火灾报警系统</option> <option value="656">公务员统计系统</option> <option value="655">人力资源社会保障工资管理系统</option> <option value="654">特定身份人员信息管理系统</option> <option value="653">湖南职称管理系统</option> <option value="652">干部人事档案管理系统</option> <option value="651">全国林业有害生物防治信息管理系统</option> <option value="650">全国森林保险数据系统</option> <option value="649">林业工作站本底数据报表管理系统</option> <option value="648">全国林木种苗许可证管理信息系统</option> <option value="647">视频会议系统</option> <option value="646">无纸化办公系统</option> <option value="645">全国林业植物检疫管理信息系统</option> <option value="626">湖南省农业综合开发信息管理系统</option> <option value="625">农村综合改革工作管理信息系统</option> <option value="624">政财行政复议信息管理系统</option> <option value="623">外资财政管理系统</option> <option value="622">湘西州自治州财政局综合办公系统</option> <option value="621">湖南财政一体化信息系统</option> <option value="620">年度决算报表软件</option> <option value="619">资产管理系统</option> <option value="618">非税收入管理系统</option> <option value="617">工资统发系统</option> <option value="616">财务核算系统</option> <option value="615">社保基金管理系统</option> <option value="614">部门决算管理系统</option> <option value="613">国库专户管理系统</option> <option value="612">财税库收入横联系统</option> <option value="611">国库专项资金管理系统</option> <option value="610">国库支付管理系统</option> <option value="609">财政供养人员管理系统</option> <option value="608">预算执行管理系统</option> <option value="607">部门预算管理系统</option> <option value="567">商务部业务系统统一平台（内贸流通统计监测信息服务）</option> <option value="566">商务预报平台</option> <option value="565">湖南省成品油审批监管服务平台</option> <option value="564">商务部业务系统统一平台（技术贸易管理信息系统）</option> <option value="563">单用途商业预付卡业务信息管理</option> <option value="562">湖南省电子商务统计监测管理系统政府端</option> <option value="561">商务部业务系统统一平台（加工贸易服务促进）</option> <option value="560">湖南省对外贸易管理服务平台</option> <option value="559">湖南省再生资源回收经营者备案登记系统</option> <option value="558">商务部业务系统统一平台（全国拍卖行业管理）</option> <option value="557">商务部业务系统统一平台（全国典当行业监督管理信息系统）</option> <option value="556">湖南省对外投资合作管理系统（平台版）</option> <option value="555">商务部走出去公共服务平台（对外劳务合作服务）</option> <option value="554">商务部走出去公共服务平台（境外投资备案和核准）</option> <option value="553">湖南省内联引资项目管理信息系统</option> <option value="432">全国中等职业学校学生管理信息系统</option> <option value="431">湖南省民办教育网</option> <option value="430">运动员注册管理系统</option> <option value="429">全国青少年体育基础数据网络填报系统</option> <option value="428">社会体育指导员信息管理系统</option> <option value="427">国家体育总局运动员技术等级信息系统</option> <option value="426">全国中小学学籍信息管理系统</option> <option value="425">中国教师资格网</option> <option value="424">湘西助学网</option> <option value="423">湘西自治州普通高中招生管理系统</option> <option value="422">湘西远程教育网</option> <option value="373">SAPPA程序</option> <option value="372">投资处理程序（河利时）</option> <option value="371">联网直报系统</option> <option value="362">湖南省道路运输管理信息系统</option> <option value="361">综合办公业务管理平台（OA系统）</option> <option value="360">湖南省交通运输统计分析监测和投资计划管理系统</option> <option value="359">湖南省农村公路建设养护系统</option> <option value="358">湖南省道路运输三级协同管理与服务信息系统</option> <option value="357">湖南省道路危险货物运输企业安全生产主体责任落实监管系统</option> <option value="356">湖南省重点营运车辆动态信息公共监管与服务平台</option> <option value="355">从业人员管理信息系统</option> <option value="354">湘西州公路路网监控信息系统</option> <option value="353">船舶及海上设施检验管理信息系统</option> <option value="352">湖南省三级水路运政管理系统</option> <option value="351">中国海事协同管理平台船员管理系统</option> <option value="350">船舶动态管理2.0系统</option> <option value="349">渡口码头视频监控系统</option> <option value="348">内河客运船舶3G视频监控系统</option> <option value="347">软件视频会议系统</option> <option value="346">湘西州科技成果数据库</option> <option value="345">湘西州科技项目申报与评审系统</option> <option value="344">湘西州科技创新服务平台</option> <option value="343">行政复议应诉案件统计系统</option> <option value="342">湖南省行政执法证和执法监督管理证管理系统</option> <option value="304">湘西自治州计量测试检定所卓软计量业务管理平台</option> <option value="303">青之实验室信息管理系统V2.0</option> <option value="302">湖南省企业质量信用管理平台</option> <option value="301">12365直报平台</option> <option value="300">湖南省产品质量分类监管系统</option> <option value="299">特种设备综合业务监管系统</option> <option value="298">检验检测机构资质认定网上审批系统</option> <option value="297">认证认可业务监管平台</option> <option value="296">湖南省检验检测机构资质认定监督管理系统</option> <option value="271">视频会议系统（监狱）</option> <option value="270">司法部监狱管理局生活卫生报表管理系统</option> <option value="269">减刑、假释网上协同办案平台</option> <option value="268">刑满释放人员信息管理系统</option> <option value="267">湖南省监狱管理局罪犯档卡管理系统</option> <option value="266">湖南省狱政管理平台</option> <option value="265">12348法律热线</option> <option value="264">政法人才信息统计</option> <option value="263">湖南省政法领导干部信息综合系统</option> <option value="262">国家司法行政基层工作信息管理平台</option> <option value="261">全国法律服务机构统一代码管理系统</option> <option value="260">如法网</option> <option value="259">湖南省司法厅社区矫正管理系统</option> <option value="258">国家民委政务信息内网报送系统</option> <option value="257">宗教工作基础信息采集系统2014</option> <option value="256">湘西自治州审计办公系统</option> <option value="255">全国建筑市场监管公共服务平台</option> <option value="254">湖南省施工图管理信息系统</option> <option value="253">湖南省建筑业诚信信息管理系统</option> <option value="252">湖南省建筑工程项目管理系统</option> <option value="251">湖南省建设企业管理信息系统</option> <option value="250">湖南省工程建设执(从)业员管理信息系统</option> <option value="249">湖南省城镇燃气管理信息系统</option> <option value="247">湖南省房地产市场监管平台</option> <option value="246">全国城镇生活垃圾处理管理信息系统</option> <option value="245">全国城镇污水处理管理信息系统</option> <option value="244">全国城市地下综合管廊建设项目信息系统</option> <option value="243">湘西州政务中心移动政务便民服务平台</option> <option value="242">湘西州政务大厅一体化平台</option> <option value="241">湘西州政务中心政务服务信息资源共享平台</option> <option value="240">全国文化市场技术监管与政务平台</option> <option value="223">州国土资源局数字档案馆—档案数字化项目</option> <option value="222">数字湘西州县一体化地理信息公共服务云平台</option> <option value="221">湘西州国土资源移动执法监察平台</option> <option value="220">国土资源电子政务系统</option> <option value="219">不动产登记信息系统</option> <option value="218">12315投拆管理平台</option> <option value="217">信用公示系统</option> <option value="216">湖南省工商综合业务系统</option> <option value="215">国家粮食局标准质量中心业务管理平台-粮食质监机构信息系统</option> <option value="214">湖南省价格监测系统</option> <option value="213">湖南省互联网+政务服务一体化平台</option> <option value="212">国家粮油统计信息系统</option> </select> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源代码：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="text" name="value2" class="form-control" placeholder="自动填写" readonly> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源提供方：</label> 
      </div> 
      <div class="col-sm-8"> 
       <select name="value6" id="value6" data-placeholder="自动填写" class="chosen-select" style="width: 350px;" tabindex="4" disabled> <option value=""></option> <option value="1103">湘西州住房公积金管理中心（永顺管理部）</option> <option value="1102">永顺县烟草局</option> <option value="1101">永顺县气象局</option> <option value="1100">永顺县档案局&nbsp;</option> <option value="1099">永顺县文物局</option> <option value="1098">永顺县地税局</option> <option value="1097">永顺县国税局</option> <option value="1096">永顺县农机局</option> <option value="1095">永顺县政务中心</option> <option value="1094">永顺县公安局交通警察大队</option> <option value="1093">永顺县公路局</option> <option value="1092">永顺县经济和信息化局</option> <option value="1091">永顺县林业局</option> <option value="1090">永顺县猛管处</option> <option value="1089">永顺县不二门国家森林公园管理处</option> <option value="1088">永顺县审计局</option> <option value="1087">永顺县人防办</option> <option value="1086">永顺县水利局</option> <option value="1085">永顺县民族宗教事务局</option> <option value="1084">永顺县安监局</option> <option value="1083">永顺县卫生和计划生育局</option> <option value="1082">永顺县民政局</option> <option value="1081">永顺县国土局</option> <option value="1080">永顺县信访局</option> <option value="1079">永顺县房产局</option> <option value="1078">永顺县司法局</option> <option value="1077">永顺县移民局</option> <option value="1076">永顺县农经站</option> <option value="1075">永顺县环境保护局</option> <option value="1074">永顺县交通建设质量安全监督管理所</option> <option value="1073">永顺县地方海事处</option> <option value="1072">永顺县道路运输管理所</option> <option value="1071">永顺县交通运输局</option> <option value="1070">永顺县教体局</option> <option value="1069">永顺县旅游文广新局</option> <option value="1068">永顺县商务局</option> <option value="1067">永顺县人力资源和社会保障局</option> <option value="1066">永顺县扶贫开发办</option> <option value="1065">永顺县住建局</option> <option value="1064">永顺县财政局</option> <option value="1063">永顺县公安局</option> <option value="1062">永顺县农业局</option> <option value="1061">永顺县行政执法局</option> <option value="1060">永顺县发改局</option> <option value="1059">永顺县编办</option> <option value="1058">永顺县纪委</option> <option value="1057">永顺县委组织部</option> <option value="1056">永顺县检察院</option> <option value="1055">永顺县法院</option> <option value="1054">永顺县政协办</option> <option value="1053">永顺县人大办</option> <option value="1052">永顺县政府办</option> <option value="1051">古丈县农经站</option> <option value="1050">古丈县政务中心</option> <option value="1049">古丈县住建局</option> <option value="1048">古丈县畜牧局</option> <option value="1047">古丈县卫计局</option> <option value="1046">古丈县统计局</option> <option value="1045">古丈县水利局</option> <option value="1044">古丈县食药工商质监局</option> <option value="1043">古丈县审计局</option> <option value="1042">古丈县农业局</option> <option value="1041">古丈县农机局</option> <option value="1040">古丈县林业局</option> <option value="1039">古丈县交通局</option> <option value="1038">古丈县安监局</option> <option value="1037">古丈县环境保护局</option> <option value="1036">古丈县国土局</option> <option value="1035">古丈县人力资源和社会保障局</option> <option value="1034">古丈县财政局</option> <option value="1033">古丈县司法局</option> <option value="1032">古丈县民政局</option> <option value="1031">古丈县公安局</option> <option value="1030">古丈县民宗旅文广新局</option> <option value="1029">古丈县经济科技和信息化局</option> <option value="1028">古丈县教育和体育局</option> <option value="1027">古丈县发展和改革局</option> <option value="1026">古丈县人民政府办公室</option> <option value="1025">花垣县公安消防大队</option> <option value="1024">花垣县国有资产投资管理办公室</option> <option value="1023">花垣县统计局</option> <option value="1022">花垣县移民开发局</option> <option value="1021">花垣县地方税务局</option> <option value="1020">花垣县卫生和计划生育局</option> <option value="1019">花垣县林业局</option> <option value="1018">花垣县城乡规划局</option> <option value="1017">花垣县水利局</option> <option value="1016">花垣县人民政府政务服务中心</option> <option value="1015">花垣县审计局</option> <option value="1014">花垣县安全生产监督管理局</option> <option value="1013">花垣县公安局</option> <option value="1012">花垣县交通运输局</option> <option value="1011">花垣县房地产管理局</option> <option value="1010">花垣县发展和改革局</option> <option value="1009">花垣县司法局</option> <option value="1008">花垣县人力资源和社会保障局</option> <option value="1007">花垣县公路管理局</option> <option value="1006">花垣县农业机械管理局</option> <option value="1005">花垣县畜牧水产局</option> <option value="1004">花垣县人民防空办公室</option> <option value="1003">花垣县档案局</option> <option value="1002">花垣县国家税务局</option> <option value="1001">花垣县农业局</option> <option value="1000">花垣县文物管理局</option> <option value="999">花垣县住房和城乡建设局</option> <option value="998">花垣县城市管理行政执法局</option> <option value="997">花垣县财政局</option> <option value="996">花垣县教育和体育局</option> <option value="995">花垣县食品药品工商质量监督管理局</option> <option value="994">花垣县民政局</option> <option value="993">花垣县民族宗教事务和旅游文化广电新闻出版局</option> <option value="992">花垣县环境保护局</option> <option value="991">花垣县国土资源局</option> <option value="990">花垣县经济和信息化局</option> <option value="989">龙山县人民政府信访办公室</option> <option value="988">龙山县烟草专卖局</option> <option value="987">龙山县国家税务局</option> <option value="986">龙山县文化市场综合执法局</option> <option value="985">龙山县畜牧水产局</option> <option value="984">龙山县人民政府移民开发局</option> <option value="983">&nbsp;龙山县城镇规划管理局</option> <option value="982">龙山县人民防空办公室</option> <option value="981">龙山县城市管理行政执法局</option> <option value="980">龙山县档案局</option> <option value="979">龙山县安全生产监督管理局</option> <option value="978">龙山县审计局</option> <option value="977">龙山县住房和城乡建设局</option> <option value="976">龙山县卫生和计划生育局</option> <option value="975">龙山县农业局</option> <option value="974">龙山县公路管理局</option> <option value="973">龙山县环境保护局</option> <option value="972">龙山县人力资源和社会保障局</option> <option value="971">龙山县司法局</option> <option value="970">龙山县公安局交通警察大队</option> <option value="969">龙山县经济和信息化局</option> <option value="968">龙山县教育和体育局</option> <option value="967">龙山县地方海事处</option> <option value="966">龙山县气象局</option> <option value="965">龙山县地方税务局</option> <option value="964">龙山县扶贫开发领导小组办公室&nbsp;</option> <option value="963">龙山县农业综合开发办公室</option> <option value="962">龙山县商务局</option> <option value="961">龙山县农业机械管理局</option> <option value="960">龙山县文物管理局</option> <option value="959">龙山县房地产管理局</option> <option value="958">龙山县食品药品工商质量监督管理局</option> <option value="957">龙山县农村经营服务站</option> <option value="956">龙山县统计局</option> <option value="955">龙山县旅游和文化广电新闻出版局</option> <option value="954">龙山县林业局</option> <option value="953">龙山县水利局</option> <option value="952">龙山县交通运输局</option> <option value="951">龙山县国土资源局</option> <option value="950">龙山县财政局</option> <option value="949">龙山县民政局</option> <option value="948">龙山县公安局</option> <option value="947">龙山县民族宗教事务局</option> <option value="946">龙山县发展和改革局</option> <option value="945">保靖县人民法院</option> <option value="944">保靖县人民检察院</option> <option value="943">中国共产党保靖县委员会组织部</option> <option value="942">中国人民政治协商会议保靖县委员会</option> <option value="941">保靖县人民代表大会常务委员会</option> <option value="940">保靖县妇幼保健计划生育服务中心</option> <option value="939">保靖县地方海事处</option> <option value="938">保靖县畜牧水产局</option> <option value="937">保靖县农村经营服务站</option> <option value="936">保靖县国有资产管理局</option> <option value="935">保靖县疾病预防控制中心</option> <option value="934">保靖县房地产管理局</option> <option value="933">保靖县农业机械管理局</option> <option value="932">保靖县公路管理局</option> <option value="931">保靖县城市管理行政执法局</option> <option value="930">保靖县文物管理局</option> <option value="929">保靖县水库移民开发局</option> <option value="928">保靖县扶贫开发办公室</option> <option value="927">保靖县残疾人联合会</option> <option value="926">保靖县地方税务局</option> <option value="925">保靖县国家税务局</option> <option value="924">保靖县气象局</option> <option value="923">保靖县机构编制委员会办公室</option> <option value="922">保靖县人民防空办公室</option> <option value="921">保靖县档案局</option> <option value="920">保靖县政务服务中心</option> <option value="919">保靖县食品药品工商质量监督管理局</option> <option value="918">保靖县安全生产监督管理局</option> <option value="917">保靖县统计局</option> <option value="916">保靖县审计局</option> <option value="915">保靖县卫生和计划生育局</option> <option value="914">保靖县水利局</option> <option value="913">保靖县林业局</option> <option value="912">保靖县农业局</option> <option value="911">保靖县交通运输局</option> <option value="910">保靖县住房和城乡建设局</option> <option value="909">保靖县环境保护局</option> <option value="908">保靖县国土资源局</option> <option value="907">保靖县人力资源和社会保障局</option> <option value="906">保靖县财政局</option> <option value="905">保靖县司法局</option> <option value="904">保靖县民政局</option> <option value="903">泸溪县农村经营服务站</option> <option value="902">泸溪县外资外援项目办公室</option> <option value="901">泸溪县农业机械管理局</option> <option value="900">泸溪县畜牧水产局</option> <option value="899">泸溪县地方海事处</option> <option value="898">泸溪县道路运输管理所</option> <option value="897">泸溪县公路管理局</option> <option value="896">泸溪县文物管理局</option> <option value="895">泸溪县文化市场综合执法局</option> <option value="894">中国共产主义青年团泸溪县委员会</option> <option value="893">泸溪县人民代表大会常务委员会</option> <option value="892">泸溪县妇女联合会</option> <option value="891">泸溪县人民检察院</option> <option value="890">泸溪县编办</option> <option value="889">泸溪县档案局</option> <option value="888">泸溪县信访局</option> <option value="887">泸溪县消防大队</option> <option value="886">泸溪县烟草局</option> <option value="885">泸溪县地方税务局</option> <option value="884">泸溪县城市管理行政执法局</option> <option value="883">泸溪县人民法院</option> <option value="882">泸溪县残疾人联合会</option> <option value="881">泸溪县扶贫开发服务中心</option> <option value="880">泸溪县人民防空办公室</option> <option value="879">泸溪县气象局（泸溪县防雷减灾办公室、泸溪县施放气球管理办公室）</option> <option value="878">泸溪县移民开发局</option> <option value="877">泸溪县国家税务局</option> <option value="876">泸溪县房地产业管理局(泸溪县白蚁防治办公室、泸溪县国有土地上房屋征收与补偿办公室)</option> <option value="875">泸溪县城乡建设规划局</option> <option value="874">泸溪县食品药品工商质量监督管理局</option> <option value="873">泸溪县安全生产监督管理局</option> <option value="872">泸溪县统计局</option> <option value="871">泸溪县审计局</option> <option value="870">泸溪县卫生和计划生育局</option> <option value="869">泸溪县林业局</option> <option value="868">泸溪县水利局</option> <option value="867">泸溪县农业局</option> <option value="866">泸溪县交通运输局</option> <option value="865">泸溪县住房和城乡建设局</option> <option value="864">泸溪县环境保护局</option> <option value="863">泸溪县国土资源局</option> <option value="862">泸溪县人力资源和社会保障局</option> <option value="861">泸溪县财政局</option> <option value="860">泸溪县司法局</option> <option value="859">泸溪县民政局</option> <option value="858">泸溪县公安局</option> <option value="857">泸溪县民族宗教事务和旅游文化广电新闻出版局</option> <option value="856">泸溪县经济和信息化局</option> <option value="855">泸溪县教育和体育局</option> <option value="854">泸溪县发展和改革局</option> <option value="853">泸溪县人民政府办公室</option> <option value="852">保靖县公安局</option> <option value="851">保靖县民族宗教事务和旅游文化广电新闻出版局</option> <option value="850">保靖县经济和信息化局</option> <option value="849">保靖县教育和体育局</option> <option value="848">保靖县发展和改革局</option> <option value="847">保靖县人民政府办公室</option> <option value="846">湘西土家族苗族自治州邮政管理局</option> <option value="766">州委政法委员会（州社会管理综合治理委员会办公室）</option> <option value="765">吉首市城市供水总公司</option> <option value="763">凤凰县人民法院</option> <option value="762">中国人民银行湘西土家族苗族自治州中心支行</option> <option value="761">吉首市人民法院</option> <option value="760">吉首市科学技术协会</option> <option value="759">吉首市工商业联合会（总商会）</option> <option value="758">吉首市人民防空办公室</option> <option value="757">吉首市档案局</option> <option value="756">政协吉首市委员会</option> <option value="755">吉首市气象局</option> <option value="754">吉首市畜牧水产局</option> <option value="753">吉首市人民代表大会常务委员会</option> <option value="752">吉首市归国华侨侨眷联合会</option> <option value="751">中国共产主义青年团吉首市委员会</option> <option value="750">吉首市移民开发局</option> <option value="749">吉首市地方税务局</option> <option value="748">吉首市国家税务局</option> <option value="747">吉首市人民检察院</option> <option value="746">吉首市扶贫开发办公室</option> <option value="745">吉首市信访局</option> <option value="744">吉首市妇女联合会</option> <option value="743">吉首市机构编制委员会办公室</option> <option value="742">吉首市计划生育协会</option> <option value="741">吉首市文学艺术界联合会</option> <option value="740">中共吉首市委政法委员会</option> <option value="739">吉首市总工会</option> <option value="738">吉首市红十字会</option> <option value="737">吉首市城市管理行政执法局</option> <option value="736">吉首市房地产管理局</option> <option value="735">吉首市城市规划管理局</option> <option value="734">吉首市残疾人联合会</option> <option value="733">吉首市公路管理局</option> <option value="732">凤凰县残疾人联合会</option> <option value="731">凤凰县文物局</option> <option value="730">凤凰县扶贫办</option> <option value="729">凤凰县人民防空办公室</option> <option value="728">凤凰县气象局</option> <option value="727">凤凰县移民局</option> <option value="726">凤凰县国家税务局</option> <option value="725">州科学技术协会</option> <option value="521">州政协办公室</option> <option value="493">凤凰县房地产业管理局(凤凰县白蚁防治所)</option> <option value="492">凤凰县城乡规划管理局</option> <option value="491">凤凰县食品药品工商质量监督管理局</option> <option value="490">凤凰县安全生产监督管理局</option> <option value="489">凤凰县统计局</option> <option value="488">凤凰县审计局</option> <option value="487">凤凰县卫生和计划生育局</option> <option value="486">凤凰县旅游和文化广电新闻出版局</option> <option value="485">凤凰县林业局</option> <option value="484">凤凰县水利局</option> <option value="483">凤凰县农业局</option> <option value="482">凤凰县交通运输局</option> <option value="481">凤凰县住房和城乡建设局</option> <option value="480">凤凰县环境保护局</option> <option value="479">凤凰县国土资源局</option> <option value="478">凤凰县人力资源和社会保障局</option> <option value="477">凤凰县财政局</option> <option value="476">凤凰县司法局</option> <option value="475">凤凰县民政局</option> <option value="474">凤凰县公安局</option> <option value="473">凤凰县民族宗教事务局</option> <option value="472">凤凰县经济和信息化局</option> <option value="471">凤凰县教育和体育局</option> <option value="470">凤凰县发展和改革局</option> <option value="469">凤凰县人民政府办公室</option> <option value="468">吉首市政务服务中心</option> <option value="467">吉首市食品药品工商质量监督管理局</option> <option value="466">吉首市安全生产监督管理局</option> <option value="465">吉首市统计局</option> <option value="464">吉首市审计局</option> <option value="463">吉首市卫生和计划生育局</option> <option value="462">吉首市旅游和文化广电新闻出版局</option> <option value="461">吉首市商务局</option> <option value="460">吉首市林业局</option> <option value="459">吉首市水利局</option> <option value="458">吉首市农业局</option> <option value="457">吉首市交通运输局</option> <option value="456">吉首市住房和城乡建设局</option> <option value="455">吉首市环境保护局</option> <option value="454">吉首市国土资源局</option> <option value="453">吉首市人力资源和社会保障局</option> <option value="452">吉首市财政局</option> <option value="451">吉首市司法局</option> <option value="450">吉首市民政局</option> <option value="449">吉首市公安局</option> <option value="448">吉首市民族宗教事务局</option> <option value="447">吉首市经济科技和信息化局</option> <option value="446">吉首市教育和体育局</option> <option value="445">吉首市发展和改革局</option> <option value="444">吉首市人民政府办公室</option> <option value="443">州贸促会</option> <option value="442">共青团湘西州委</option> <option value="441">州红十字会</option> <option value="440">州妇女联合会</option> <option value="439">州残疾人联合会</option> <option value="438">州人民检察院</option> <option value="437">州中级人民法院</option> <option value="436">州人大常委会办公室</option> <option value="435">州信访局</option> <option value="433">州机构编制委员会办公室</option> <option value="432">州烟草专卖局</option> <option value="431">州文物管理局</option> <option value="430">州出入境检验检疫局</option> <option value="429">州移民局</option> <option value="428">州政府口岸办</option> <option value="427">州扶贫开发办公室</option> <option value="426">州气象局</option> <option value="425">州人民防空办公室</option> <option value="424">州公共资源交易中心</option> <option value="423">州档案局</option> <option value="422">州地方税务局</option> <option value="421">州国家税务局</option> <option value="56">州政府政务服务中心</option> <option value="55">州人民政府国有资产监督管理委员会</option> <option value="54">州粮食局</option> <option value="53">州人民政府法制办公室</option> <option value="52">州质量技术监督局</option> <option value="51">州工商行政管理局</option> <option value="50">州食品药品监督管理局（州食品安全委员会办公室）</option> <option value="49">州旅游发展和外事侨务委员会</option> <option value="48">州安全生产监督管理局</option> <option value="47">州统计局</option> <option value="46">州审计局</option> <option value="45">州卫生和计划生育委员会</option> <option value="44">州文化广电新闻出版局（州版权局）</option> <option value="43">州商务局</option> <option value="42">州林业局</option> <option value="41">州水利局</option> <option value="40">州农业委员会（州委农村工作办公室）</option> <option value="39">州交通运输局</option> <option value="38">州住房和城乡建设局</option> <option value="37">州环境保护局</option> <option value="36">州国土资源局</option> <option value="35">州人力资源和社会保障局</option> <option value="34">州财政局</option> <option value="33">州司法局</option> <option value="32">州民政局</option> <option value="31">州公安局</option> <option value="30">州民族宗教事务委员会</option> <option value="29">州经济和信息化委员会</option> <option value="28">州科学技术局</option> <option value="19">州教育和体育局</option> <option value="18">州发展和改革委员会</option> <option value="6">州人民政府办公室（州人民政府金融工作办公室、州人民政府研究室）</option> <option value="1">州委办公室</option> </select> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">提供方内部部门：</label> 
      </div> 
      <div class="col-sm-8"> 
       <select name="value7" id="value7" data-placeholder="自动填写" class="chosen-select" style="width: 350px;" tabindex="4" disabled> <option value=""></option> <option value="845">纳税服务科</option> <option value="844">收入核算科</option> <option value="843">稽查局</option> <option value="842">税源管理科</option> <option value="841">政策法规科</option> <option value="840">办税服务厅</option> <option value="839">征收管理科</option> <option value="838">办公室</option> <option value="837">人事股</option> <option value="836">财务股</option> <option value="835">吉首市科技咨询中心</option> <option value="834">财务股</option> <option value="833">办公室</option> <option value="832">法规股</option> <option value="831">工程股</option> <option value="830">档案查阅中心</option> <option value="829">业务法规股</option> <option value="828">市政协办公室</option> <option value="827">市委统战部</option> <option value="826">市政协提案委</option> <option value="825">气象台</option> <option value="824">办公室</option> <option value="823">兽医所</option> <option value="822">办公室</option> <option value="821">畜牧站</option> <option value="820">市人大联工委</option> <option value="819">办公室</option> <option value="818">办公室</option> <option value="817">工程开发和法规培训股</option> <option value="816">项目股</option> <option value="815">信息中心</option> <option value="814">办税服务中心</option> <option value="813">办公室</option> <option value="812">控申科</option> <option value="811">金融股</option> <option value="810">项目股</option> <option value="809">信息股</option> <option value="808">网信室</option> <option value="807">办信室</option> <option value="806">人民来访接待中心</option> <option value="805">办公室</option> <option value="804">综合办公室</option> <option value="803">事业单位登记管理局</option> <option value="802">办公室</option> <option value="801">人事股</option> <option value="800">财务股</option> <option value="799">办公室</option> <option value="798">政法委</option> <option value="797">综治办（铁护办）</option> <option value="796">办公室</option> <option value="795">法学会</option> <option value="794">组宣部</option> <option value="793">法律保障部</option> <option value="792">困难职工帮扶中心</option> <option value="791">财务室</option> <option value="790">办公室</option> <option value="789">应急救护部</option> <option value="788">三献办</option> <option value="787">事业发展部</option> <option value="786">办公室</option> <option value="785">法规股</option> <option value="784">渣土办</option> <option value="783">市容股</option> <option value="782">信息中心</option> <option value="781">档案馆</option> <option value="780">房屋测绘队</option> <option value="779">危房鉴定办</option> <option value="778">房屋交易管理所</option> <option value="777">开发办</option> <option value="776">政务分中心</option> <option value="775">规划办</option> <option value="774">业务股</option> <option value="773">残联教就股</option> <option value="772">残联康复股</option> <option value="771">残疾人就业服务所</option> <option value="770">财务股</option> <option value="769">办公室</option> <option value="768">治超站</option> <option value="767">路政大队</option> <option value="724">产业发展科</option> <option value="723">项目办</option> <option value="722">市交管所安全股</option> <option value="721">市交管所</option> <option value="720">市道路运输维修驾培协会</option> <option value="719">市道路运输管理所机动车维修管理股</option> <option value="718">市道路运输管理所运政法规股</option> <option value="717">市道路运输管理所城市客运管理服务办公室</option> <option value="716">市道路运输管理所客货运输管理股</option> <option value="715">市道路运输管理所证照管理办公室</option> <option value="714">市海事处</option> <option value="713">办公室</option> <option value="712">市道路运输管理所安全管理股</option> <option value="711">市道路运输管理所信息管理股</option> <option value="710">综合业务股</option> <option value="709">监控中心</option> <option value="708">市失业保险股</option> <option value="707">市企业社保局</option> <option value="706">市机关社保局</option> <option value="705">社保股</option> <option value="704">专业技术人员管理股</option> <option value="703">公务员股</option> <option value="702">事管股</option> <option value="701">职业能力建设股</option> <option value="700">就业股（劳动关系）</option> <option value="699">劳动保障监察大队</option> <option value="698">劳动仲裁委员会</option> <option value="697">市就业局</option> <option value="696">市职业技能鉴定中心</option> <option value="695">市创贷中心</option> <option value="694">市双创中心</option> <option value="693">市城乡居保局</option> <option value="692">市医保局</option> <option value="691">市机关养老局</option> <option value="690">市工伤保险局</option> <option value="689">特设股</option> <option value="688">标准质量管理股</option> <option value="687">计量与认证监管股</option> <option value="686">行政审批服务股</option> <option value="685">商广股</option> <option value="684">个体企业监管股</option> <option value="683">市投诉举报中心</option> <option value="682">吉首市药品不良反应监测中心</option> <option value="681">药械化股</option> <option value="680">检验所</option> <option value="679">食品股</option> <option value="678">法制法规股</option> <option value="677">办公室</option> <option value="676">交通警察大队</option> <option value="675">交通指挥中心</option> <option value="674">经济犯罪侦查大队</option> <option value="673">治安管理大队</option> <option value="672">禁毒大队</option> <option value="671">法制大队</option> <option value="670">刑事侦查大队</option> <option value="669">会计股</option> <option value="668">乡财局</option> <option value="667">法规股</option> <option value="666">办公室</option> <option value="665">采购办</option> <option value="664">产权股</option> <option value="663">非税管理局</option> <option value="662">国库集中支付核算中心</option> <option value="661">国库股</option> <option value="660">预算股</option> <option value="659">污染防治股</option> <option value="658">环境监测站</option> <option value="657">环境监察大队</option> <option value="656">污染源管理股</option> <option value="655">环境影响评价股</option> <option value="654">市城建档案馆</option> <option value="653">建筑节能和科技设计股</option> <option value="652">招标办</option> <option value="651">市建管站</option> <option value="650">市质安站</option> <option value="649">行政审批办证厅</option> <option value="648">办公室</option> <option value="647">科技股</option> <option value="646">市场股</option> <option value="645">规划财务科</option> <option value="644">行业管理科</option> <option value="643">行业管理股</option> <option value="642">文化旅游产业发展服务中心</option> <option value="641">粮食流通调控股</option> <option value="640">调控科</option> <option value="639">行发科</option> <option value="638">法规科</option> <option value="637">招商组</option> <option value="636">电子商务股</option> <option value="635">商贸服务行业发展股</option> <option value="634">财务室</option> <option value="633">政治工作办公室</option> <option value="632">司法所</option> <option value="631">社区矫正股</option> <option value="630">基层股</option> <option value="629">公征处</option> <option value="628">法律援助中心</option> <option value="627">资助中心</option> <option value="626">考试中心</option> <option value="625">救助中心</option> <option value="624">基教股</option> <option value="623">体育产业股</option> <option value="622">群体股</option> <option value="621">职成股</option> <option value="620">竞训股</option> <option value="619">教师股</option> <option value="618">计财股</option> <option value="617">基础股</option> <option value="616">市民创办</option> <option value="615">民族股</option> <option value="614">办公室</option> <option value="613">宗教股</option> <option value="612">经济股</option> <option value="611">综合股</option> <option value="610">执法大队</option> <option value="609">办公室</option> <option value="608">综合股</option> <option value="607">矿管股</option> <option value="606">耕保股</option> <option value="605">地产股</option> <option value="604">办公室</option> <option value="603">用地股</option> <option value="602">执法队</option> <option value="601">信息中心</option> <option value="600">不动产登记中心</option> <option value="599">科技股</option> <option value="598">资源林政股</option> <option value="597">林业科技推广站</option> <option value="596">湘西州信访局</option> <option value="595">森林公安局</option> <option value="594">人事科</option> <option value="593">财务室</option> <option value="592">林改科</option> <option value="591">种苗站</option> <option value="590">办公室</option> <option value="589">森林病虫害防治检疫站</option> <option value="588">市老龄办</option> <option value="587">优抚股</option> <option value="586">社会组织管理局</option> <option value="585">安置股</option> <option value="584">社会救助股</option> <option value="583">区划地名股</option> <option value="582">救灾股</option> <option value="581">人事股</option> <option value="580">社会事务股</option> <option value="579">福慈股</option> <option value="578">低收入家庭认定指导中心</option> <option value="577">办公室</option> <option value="576">财务股</option> <option value="575">市农机局</option> <option value="574">市植保局</option> <option value="573">市农业综合执法大队</option> <option value="572">吉首市水资源管理局</option> <option value="571">河长办</option> <option value="570">建管站</option> <option value="569">吉首市防汛抗旱办公室</option> <option value="568">核算中心</option> <option value="567">市妇幼保健计划生育服务中心</option> <option value="566">市卫生监督执法局</option> <option value="565">医政医管股</option> <option value="564">妇幼健康股</option> <option value="563">基层指导股</option> <option value="562">基层卫生股</option> <option value="561">农业执法大队</option> <option value="560">计财股</option> <option value="559">办公室</option> <option value="558">公路局</option> <option value="557">办公室</option> <option value="556">生态股</option> <option value="555">办公室</option> <option value="554">监测站</option> <option value="553">不动产登记中心</option> <option value="552">办公室</option> <option value="551">人社局信息中心</option> <option value="550">人力资源管理服务中心档案室</option> <option value="549">财务室</option> <option value="548">业务股</option> <option value="547">办公室</option> <option value="546">国资股</option> <option value="545">工资中心</option> <option value="544">社保股</option> <option value="543">非税局</option> <option value="542">国库支付局</option> <option value="541">办公室</option> <option value="540">预算股</option> <option value="539">规划信息股</option> <option value="538">刑侦大队</option> <option value="537">民间组织管理局</option> <option value="536">财务室</option> <option value="535">办公室</option> <option value="534">办公室</option> <option value="533">综治专干股</option> <option value="532">办公室</option> <option value="531">法制支队</option> <option value="530">网络中心</option> <option value="529">办公室</option> <option value="528">12315指挥中心</option> <option value="527">标准计量股</option> <option value="526">学生资助管理中心</option> <option value="525">基教股</option> <option value="524">教师股</option> <option value="523">信用办</option> <option value="522">无</option> <option value="519">应急科</option> <option value="518">征收管理科</option> <option value="517">办公室</option> <option value="515">州法学会</option> <option value="514">州综治办（铁护办）</option> <option value="513">办公室</option> <option value="512">办公室</option> <option value="510">财务科</option> <option value="509">法规科</option> <option value="507">州气象台</option> <option value="505">督查科</option> <option value="504">事登局</option> <option value="503">政府采购科</option> <option value="502">办公室</option> <option value="501">维权部</option> <option value="500">社会动员科</option> <option value="499">培训管理科</option> <option value="498">贫困检测科</option> <option value="496">科技信息科</option> <option value="495">就业中心</option> <option value="494">康复部</option> <option value="418">优抚科</option> <option value="417">安置科</option> <option value="416">区划地名科</option> <option value="415">救灾科</option> <option value="414">人事科</option> <option value="412">低收入家庭认定指导中心</option> <option value="411">办公室</option> <option value="410">信息中心</option> <option value="408">科信支队</option> <option value="406">湘西州渔政监督管理站</option> <option value="405">湘西州水产工作站</option> <option value="404">湘西州动物疫病控制中心</option> <option value="403">州动物疫病疫制中心</option> <option value="402">州动物卫生监督所</option> <option value="401">局办公室</option> <option value="400">竞训科</option> <option value="399">州学生资助管理中心</option> <option value="398">州电教仪器站</option> <option value="397">计财科</option> <option value="396">湘西自治州林业科技推广站</option> <option value="395">信访局</option> <option value="394">人事科</option> <option value="393">林改科</option> <option value="392">农业</option> <option value="391">各个专业科室</option> <option value="390">无</option> <option value="389">船舶检验科</option> <option value="388">办公室</option> <option value="387">综合计划科</option> <option value="386">农村公路科</option> <option value="385">州政务服务中心</option> <option value="384">货运科</option> <option value="383">信息科</option> <option value="382">养护科</option> <option value="381">运输综合科</option> <option value="380">船舶船员科</option> <option value="379">监控中心</option> <option value="378">科技信息科</option> <option value="377">办公室</option> <option value="376">网络中心</option> <option value="375">无</option> <option value="374">办公室</option> <option value="373">协调科</option> <option value="372">无</option> <option value="371">乡镇财政管理局</option> <option value="370">办公室</option> <option value="369">政府采购监督管理科</option> <option value="368">教科文科</option> <option value="367">国库集中支付核算中心</option> <option value="366">预算科</option> <option value="365">州住房公积金管理中心（科技信息科）</option> <option value="363">信息科</option> <option value="362">保健（信息管理）科</option> <option value="361">妇幼科</option> <option value="360">疾控科</option> <option value="359">基层指导科</option> <option value="358">基层卫生科</option> <option value="357">信息技术科</option> <option value="356">生活卫生科</option> <option value="355">刑罚执行科</option> <option value="354">狱政管理科</option> <option value="353">法律援助中心</option> <option value="352">鉴定科</option> <option value="351">警务科</option> <option value="350">政治部</option> <option value="349">审计技术科</option> <option value="348">投资管理科</option> <option value="347">合作处</option> <option value="346">市场建设处</option> <option value="345">法规科</option> <option value="344">对外经济合作科</option> <option value="343">流通业发展科</option> <option value="342">对外贸易科</option> <option value="341">盐务管理科</option> <option value="340">市场运行调节科</option> <option value="339">州投资促进事务局</option> <option value="338">电子商务科</option> <option value="337">商贸服务科</option> <option value="336">市场秩序科</option> <option value="335">外事侨务科</option> <option value="334">旅游质量监督管理所</option> <option value="333">导游管理中心</option> <option value="332">行业管理科</option> <option value="331">规划财务科</option> <option value="330">产业发展科</option> <option value="329">刑事侦查支队</option> <option value="328">交通警察支队</option> <option value="327">政治部</option> <option value="326">人口与出入境管理支队</option> <option value="325">治安管理支队</option> <option value="324">法制支队</option> <option value="323">情报指挥中心</option> <option value="322">社会福利和慈善事业促进科</option> <option value="321">社会组织管理局</option> <option value="320">老龄办</option> <option value="319">社会救助科</option> <option value="318">社会事务科</option> <option value="317">慈善办</option> <option value="316">投资科</option> <option value="315">信用办</option> <option value="314">法规科</option> <option value="313">湘西州重点项目建设办公室</option> <option value="312">湘西州价格监督检查局</option> <option value="311">收费管理科</option> <option value="310">资环科</option> <option value="308">预算科</option> <option value="307">职业能力建设科</option> <option value="306">劳动保障监察局</option> <option value="305">基金征缴科</option> <option value="304">州人社统计信息中心</option> <option value="303">信息中心</option> <option value="302">老干科</option> <option value="300">湖南省金融办小额贷款公司管理处</option> <option value="299">湖南省金融办企业银行处</option> <option value="298">湖南省金融办企业上市处</option> <option value="297">州电子政务办公室</option> <option value="294">12331投诉举报中心</option> <option value="293">应急管理科</option> <option value="292">州防汛办</option> <option value="291">市场管理科</option> <option value="290">州计量测试检定所</option> <option value="288">城建科</option> <option value="287">州普通话测试站</option> <option value="286">职成科</option> <option value="285">政策法规科</option> <option value="284">学前教育科</option> <option value="283">体育产业管理科</option> <option value="282">人事科</option> <option value="281">群体科</option> <option value="280">青少年体育和竞赛训练科</option> <option value="279">民办教育发展科</option> <option value="278">教师工作与师范教育科</option> <option value="277">计财科</option> <option value="276">基础教育科</option> <option value="275">能源科</option> <option value="274">服务业科</option> <option value="273">经济科</option> <option value="272">综合科</option> <option value="271">农业科</option> <option value="270">州农机局</option> <option value="269">州动物疫控中心实验室</option> <option value="268">州农机局科教科</option> <option value="267">州农管站</option> <option value="266">州植保站</option> <option value="265">能源站</option> <option value="264">农业信息服务站</option> <option value="263">州屠管办</option> <option value="262">州农经站</option> <option value="261">州畜牧局质量安全科</option> <option value="260">法规科</option> <option value="259">州兽医局</option> <option value="258">州农机安全监理所</option> <option value="257">农产品加工科</option> <option value="256">州土壤肥料工作站</option> <option value="255">州绿色食品办公室</option> <option value="254">州农药监管站</option> <option value="253">州畜牧水产局</option> <option value="252">州畜牧工作站</option> <option value="251">州水产工作站</option> <option value="250">州生猪屠宰办</option> <option value="249">州种子管理站</option> <option value="248">水利窗口</option> <option value="247">建管科</option> <option value="246">河道科</option> <option value="245">各业务科室</option> <option value="244">水利综合监察支队</option> <option value="242">水资源科</option> <option value="241">州防汛办综合科</option> <option value="240">测绘科</option> <option value="239">办公室</option> <option value="238">政策法规科</option> <option value="237">应急救援指挥中心</option> <option value="236">安全生产综合监督管理协调科</option> <option value="235">烟花爆竹安全监督管理科</option> <option value="234">非煤矿山安全监督管理科</option> <option value="233">危险化学品安全监督管理科</option> <option value="232">法规科政务中心窗口</option> <option value="231">行政执法支队</option> <option value="230">驻政务中心安监局窗口</option> <option value="229">质量科</option> <option value="228">州政府金融办</option> <option value="227">办公室</option> <option value="226">科技科</option> <option value="225">人事科</option> <option value="224">办公室</option> <option value="223">人事科</option> <option value="222">办公室</option> <option value="221">法规科</option> <option value="219">计量所综合办公室</option> <option value="218">州质监技术监督稽查支队</option> <option value="217">计量科</option> <option value="216">质监管理科</option> <option value="215">质量管理科</option> <option value="214">食品相关产品监管科</option> <option value="213">标准化科</option> <option value="212">产品质量监督科</option> <option value="211">特设科</option> <option value="210">认证科</option> <option value="209">州产商品质量监督检验所</option> <option value="208">运输管理科</option> <option value="207">州运管处客货运输管理科</option> <option value="206">州海事局</option> <option value="205">驾培科</option> <option value="204">州运管处</option> <option value="203">州运管处安全科</option> <option value="202">州森林公园国有林场管理站</option> <option value="201">种苗站</option> <option value="200">造林科</option> <option value="199">野保科</option> <option value="198">退耕办</option> <option value="197">森林公安局</option> <option value="196">森防站</option> <option value="195">绿化办</option> <option value="194">林政科</option> <option value="193">产业办</option> <option value="192">建筑节能和科技设计科</option> <option value="191">规划处</option> <option value="190">建管科</option> <option value="189">州房地产局</option> <option value="188">燃气站</option> <option value="187">州风景园林管理办公室</option> <option value="186">招标办</option> <option value="184">房产科</option> <option value="183">州造价站</option> <option value="182">州质安站</option> <option value="181">勘储科</option> <option value="180">矿管科</option> <option value="179">基础测绘处</option> <option value="178">储备中心</option> <option value="177">地产科</option> <option value="176">执法监察支队</option> <option value="175">土地利用科</option> <option value="174">不动产登记中心</option> <option value="173">信息中心</option> <option value="172">环境影响评价科</option> <option value="171">污染源管理科(总量科)</option> <option value="169">科技监测科</option> <option value="168">餐饮服务食品安全监管科</option> <option value="167">药品不良反应中心</option> <option value="166">稽查支队</option> <option value="165">药品注册生产监管科</option> <option value="164">保健食品化妆品监管科</option> <option value="163">食品流通安全监管科</option> <option value="162">食品生产安全监管科</option> <option value="161">医疗器械监管科</option> <option value="160">综合科</option> <option value="159">药品流通监管科</option> <option value="158">各科室部门</option> <option value="157">州知识产权局执法科</option> <option value="156">高新技术及产业化科</option> <option value="155">农村科技科</option> <option value="154">科技成果与技术市场科</option> <option value="153">知识产权科</option> <option value="152">州地震局震防科</option> <option value="151">行政复议、应诉科</option> <option value="150">立法和规范性文件管理科</option> <option value="149">依法行政指导监督科</option> <option value="146">科技科</option> <option value="145">新闻出版（版权）科（法规科）</option> <option value="144">州卫生监督执法局</option> <option value="143">州妇幼保健院</option> <option value="142">医政医管科</option> <option value="140">医务科</option> <option value="138">乡镇、街道计生专干</option> <option value="137">计划生育基层指导科</option> <option value="136">规划信息科</option> <option value="131">财务科</option> <option value="130">人事科</option> <option value="129">专业技术人员管理科</option> <option value="128">州医保局</option> <option value="127">州就业局</option> <option value="126">州机关养老局</option> <option value="125">州城乡居保局</option> <option value="124">职业技能鉴定中心</option> <option value="123">州企业社保局</option> <option value="122">双创中心</option> <option value="121">人力资源管理服务中心</option> <option value="120">人才开发科</option> <option value="119">劳动仲裁委员会</option> <option value="118">劳动关系科</option> <option value="117">考试中心</option> <option value="116">工伤保险局</option> <option value="115">司法考试科</option> <option value="114">司法鉴定科</option> <option value="113">律师管理科</option> <option value="112">矫正科</option> <option value="111">基层工作科</option> <option value="110">公证管理科</option> <option value="109">法律援助管理科</option> <option value="108">宗教事务科</option> <option value="107">政策法规科</option> <option value="106">调控科</option> <option value="105">检验科</option> <option value="104">行发科</option> <option value="103">州无线电管理处</option> <option value="102">州散装水泥办</option> <option value="101">电子通信产业科</option> <option value="100">州电力行政执法支队</option> <option value="99">州墙改办</option> <option value="98">注册分局</option> <option value="97">信息科</option> <option value="96">商广科</option> <option value="95">企业科</option> <option value="94">法制科</option> <option value="93">12315指挥中心</option> <option value="92">税政法规科</option> <option value="91">对外经济贸易科</option> <option value="90">政府采购监督管理办公室</option> <option value="89">农业综合开发办公室</option> <option value="88">会计科</option> <option value="87">州非税局</option> <option value="86">资产科</option> <option value="85">国库科</option> <option value="84">内审管理科</option> <option value="83">投资审计中心</option> <option value="82">法规科</option> <option value="81">业务科</option> <option value="80">办公室</option> <option value="79">州住房公积金管理中心（综合业务科）</option> </select> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">资源提供方代码：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="text" name="value8" class="form-control" placeholder="自动填写" readonly> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源格式分类：</label> 
      </div> 
      <div class="col-sm-8"> 
       <select name="value10" data-placeholder=" " data-param="fatherId" data-bind="select[data-name='zygs']" class="chosen-select" required> <option value=""></option> <option value="1083">数据库</option> <option value="1084">电子文件</option> <option value="1085">电子表格</option> <option value="1086">图形图像</option> <option value="1087">流媒体</option> <option value="1088">自描述格式</option> <option value="1343">无</option> </select> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源格式类型：</label> 
      </div> 
      <div class="col-sm-8"> 
       <select data-name="zygs" name="value11" data-placeholder=" " class="chosen-select" data-level="2" data-url="http://114.55.11.227:18088/cityhunan/backstage/govmadeDic/listAjax?all=y" data-keyfield="id" data-valuefield="dicValue" required> </select> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">其他类型资源格式描述：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="text" name="value12" rangelength="[1,25]" class="form-control" id="infoadd"> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">信息资源摘要：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="text" name="value9" rangelength="[1,200]" class="form-control" required> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">数据存储总量（G）：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="number" name="value13" rangelength="[1,10]" class="form-control" placeholder="如无法确定，可填“00000”" required> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">结构化信息记录总数（万）：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="number" name="value14" rangelength="[1,10]" class="form-control" placeholder="如无法确定，可填“00000”" required> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">已共享的数据存储量（G）：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="number" name="value15" rangelength="[1,10]" class="form-control" placeholder="如无法确定，可填“00000”" required> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">已共享结构化记录数（万）：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="number" name="value16" rangelength="[1,10]" class="form-control" placeholder="如无法确定，可填“00000”" required> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">已开放的数据存储量（G）：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="number" name="value17" rangelength="[1,10]" class="form-control" placeholder="如无法确定，可填“00000”" required> 
      </div> 
     </div> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">已开放结构化记录数（万）：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="number" name="value18" rangelength="[1,10]" class="form-control" placeholder="如无法确定，可填“00000”" required> 
      </div> 
     </div> 
    </div> 
    <div class="row"> 
     <div class="form-group col-sm-6"> 
      <div class="col-sm-4" style="text-align: right;"> 
       <label class="control-label info-label">关联及类目名称：</label> 
      </div> 
      <div class="col-sm-8"> 
       <input type="text" name="value27" rangelength="[1,100]" class="form-control" id="infoadd"> 
      </div> 
     </div> 
    </div> 
    <!-- form input封装 结束--> 
    <div class="ibox-content" id="dicTree" style="padding-left: 0px; padding-right: 0px;"> 
     <div class="btn-group" id="toolbar" role="group" style="margin-bottom: 15px;"> 
      <div class="text-center detail-hide"> 
       <a data-toggle="modal" class="btn btn-primary" id="addDM" onclick="openDicLayer();" href="http://114.55.11.227:18088/#">选择信息项</a> 
      </div> 
     </div> 
     <div class="bootstrap-table"> 
      <div class="fixed-table-toolbar"></div> 
      <div class="fixed-table-container" style="padding-bottom: 0px;"> 
       <div class="fixed-table-header" style="display: none;"> 
        <table></table> 
       </div> 
       <div class="fixed-table-body"> 
        <div class="fixed-table-loading" style="top: 1px; display: block;">
          正在努力地加载数据中，请稍候…… 
        </div> 
        <table id="dm2" class="table table-hover table-striped"> 
         <thead style=""> 
          <tr> 
           <th style="" data-field="value1ForShow" tabindex="0"> 
            <div class="th-inner ">
              信息项名称 
            </div> 
            <div class="fht-cell"></div></th> 
           <th style="" data-field="value2" tabindex="0"> 
            <div class="th-inner ">
              数据表名称 
            </div> 
            <div class="fht-cell"></div></th> 
           <th style="" data-field="value3" tabindex="0"> 
            <div class="th-inner ">
              字段名称 
            </div> 
            <div class="fht-cell"></div></th> 
           <th style="" data-field="id" tabindex="0"> 
            <div class="th-inner ">
              操作 
            </div> 
            <div class="fht-cell"></div></th> 
          </tr> 
         </thead> 
         <tbody> 
          <tr class="no-records-found"> 
           <td colspan="4">没有找到匹配的记录</td> 
          </tr> 
         </tbody> 
        </table> 
       </div> 
       <div class="fixed-table-footer" style="display: none;"> 
        <table> 
         <tbody> 
          <tr></tr> 
         </tbody> 
        </table> 
       </div> 
       <div class="fixed-table-pagination" style="display: none;"></div> 
      </div> 
     </div> 
     <div class="clearfix"></div> 
    </div> 
   </form> 
  </div> 
  <!--查看数据元开始 --> 
  <div id="dataElement-detail" class="form-horizontal" style="overflow: hidden; display: none;"> 
   <div class="ibox float-e-margins"> 
    <div class="ibox-content"> 
     <div class="form-group"> 
      <label class="col-sm-4 control-label">内部标识符：</label> 
      <span class="col-sm-7 dt-span" name="identifier"></span> 
     </div> 
     <div class="form-group"> 
      <label class="col-sm-4 control-label">中文名称：</label> 
      <span class="col-sm-7 dt-span" name="chName"></span> 
     </div> 
     <div class="form-group"> 
      <label class="col-sm-4 control-label">英文名称：</label> 
      <span class="col-sm-7 dt-span" name="egName"></span> 
     </div> 
     <div class="form-group"> 
      <label class="col-sm-4 control-label">定义：</label> 
      <span class="col-sm-7 dt-span" name="define"></span> 
     </div> 
     <div class="form-group"> 
      <label class="col-sm-4 control-label">数据类型：</label> 
      <span class="col-sm-7 dt-span" name="dataTypeForShow"></span> 
     </div> 
     <div class="form-group"> 
      <label class="col-sm-4 control-label">数据长度：</label> 
      <span class="col-sm-7 dt-span" name="dataFormat"></span> 
     </div> 
     <div class="form-group"> 
      <label class="col-sm-4 control-label">对象类型：</label> 
      <span class="col-sm-7 dt-span" name="objectTypeForShow"></span> 
     </div> 
    </div> 
   </div> 
  </div> 
  <!-- 查看数据元结束 --> 
  <!--资源申请开始 --> 
  <div id="application-layer" class="form-horizontal" style="overflow: hidden; display: none;"> 
   <form method="post" class="form-horizontal eform1" id="applicationForm"> 
    <input type="hidden" name="informationId"> 
    <input type="hidden" name="informationCompany"> 
    <div class="ibox float-e-margins"> 
     <div class="ibox-content"> 
      <div class="form-group"> 
       <label class="col-sm-3 control-label">申请资源：</label> 
       <span class="col-sm-8 dt-span" name="information"></span> 
      </div> 
      <div class="form-group"> 
       <label class="col-sm-3 control-label">经办人：</label> 
       <span class="col-sm-8 dt-span" name="informationCompanyForShow"></span> 
      </div> 
      <div class="form-group"> 
       <label class="col-sm-3 control-label">申请用途：</label> 
       <div class="col-sm-8" style="padding: 0px;"> 
        <textarea class="form-control" rows="7" name="applyReason" required></textarea> 
       </div> 
      </div> 
     </div> 
    </div> 
   </form> 
  </div> 
  <!-- 资源申请结束 --> 
  <!-- 上传数据开始 --> 
  <div id="upload-data" style="overflow: hidden; display: none;"> 
   <input name="informationResourceId" type="hidden"> 
   <div class="ibox float-e-margins"> 
    <div class="ibox-content"> 
     <div class="form-group"> 
      <table id="fileList"></table> 
     </div> 
    </div> 
   </div> 
  </div> 
  <!-- 上传数据结束 --> 
  <!-- 可视化 --> 
  <div id="echarthidden" style="display: none"> 
   <div class="echarts" id="main" style="height: 500px;width:85%"></div> 
  </div>  
 </body>
</html>`

var spiderStr1 = `<html>
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

import * as common from './modules/common'
import * as home from './modules/home'
import * as user from './modules/user'
import * as role from './modules/role'
import * as menu from './modules/menu'
import * as log from './modules/log'
import * as config from './modules/config'
import * as oss from './modules/oss'
import * as schedule from './modules/schedule'
import * as seedata from './modules/seedata'
import * as spiderdata from './modules/spiderdata'
import * as spiderconfig from './modules/spiderconfig'  // 采集站点配置
import * as information from './modules/information'  // 信息资源

export default {
  spiderdata,  //数据爬取
  seedata,	  //数据查询
  common,     // 公共
  home,       // 首页
  user,       // 管理员管理
  role,       // 角色管理
  menu,       // 菜单管理
  log,        // 系统日志
  config,     // 参数管理
  oss,        // 文件服务
  schedule,    // 定时任务
  spiderconfig,    // 采集站点配置
  information    // 信息资源
}

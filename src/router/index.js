/*
 * @Author: your name
 * @Date: 2020-05-18 11:30:02
 * @LastEditTime: 2020-06-05 11:17:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \svn-work\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'


const home = resolve => require(['@/components/home/home'], resolve) // 首页
const hello = resolve => require(['@/components/HelloWorld'], resolve) // 文档页面
const senior = resolve => require(['@/components/senior/senior'], resolve) // 高级搜索页面
const Class = resolve => require(['@/components/class/class'], resolve) // 分类页面
const News = resolve => require(['@/components/news/news'], resolve) //新闻列表页
const User = resolve => require(['@/components/user/user'], resolve) // 我的页面
const Info = resolve => require(['@/common/user/info'], resolve) // 我的信息页面
const SearchHistory = resolve => require(['@/common/user/sHistory'], resolve) // 搜索历史页面
const BrowsingHistory = resolve => require(['@/common/user/bHistory'], resolve) // 浏览历史页面
const Collection = resolve => require(['@/common/user/Collection'], resolve) // 收藏页面
const Note = resolve => require(['@/common/user/Note'], resolve) // 记笔记页面
const Echarts = resolve => require(['@/components/echarts/echart'], resolve) // 图表页面
const Echartss = resolve => require(['@/components/newEcharts/index'], resolve) // new图表页面
const Table = resolve => require(['@/components/table/table'], resolve) // 表格页面
const TrilalXml = resolve => require(['@/components/TrilalXml/TrilalXml'], resolve) // 记笔记页面
const Login = resolve => require(['@/components/Login/login'], resolve) // 登录页面
const Dictionary = resolve => require(['@/components/dictionary/index'], resolve) // 数据字典页面
const Personal = resolve => require(['@/components/Personal/index'], resolve) // 个人中心页面
const Editing = resolve => require(['@/components/Editing/index'], resolve) // 编辑资料页面
const Journal = resolve => require(['@/components/journal/index'], resolve) // 登录日志页面
const Information = resolve => require(['@/components/information/index'], resolve) // 登录日志页面
const MyCollection = resolve => require(['@/components/myCollection/index'], resolve) // 我的收藏页面
const Message = resolve => require(['@/components/Message/index'], resolve) // 消息推送页面
const Editor = resolve => require(['@/components/editor/index'], resolve) // 富文本编辑页面
const EditPass = resolve => require(['@/components/editPass/index'], resolve) // 富文本编辑页面
const NewsList = resolve => require(['@/components/newsList/index'], resolve) // 新闻列表页面
const FeedBack = resolve => require(['@/components/feedBack/index'], resolve) // 需求反馈列表页面
const Nav = resolve => require(['@/components/nav/nav'], resolve) // 导航页面（方便验收）
const Translate = resolve => require(['@/components/Translate/index'], resolve) // 翻译页面（翻译）
const ceshi = resolve => require(['@/components/ceshi'], resolve)

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [

    {
      path: '/Nav',
      name: 'Nav',
      component: Nav
    },
    {
      path: '/Translate',
      name: 'Translate',
      component: Translate
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/EditPass',
      name: 'EditPass',
      component: EditPass
    }, {
      path: '/editor',
      name: 'Editor',
      component: Editor
    }, {
      path: '/Message',
      name: 'Message',
      component: Message
    }, {
      path: '/MyCollection',
      name: 'MyCollection',
      component: MyCollection
    }, {
      path: '/Journal',
      name: 'Journal',
      component: Journal
    }, {
      path: '/Information',
      name: 'Information',
      component: Information
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal
    },
    {
      path: '/Editing',
      name: 'Editing',
      component: Editing
    }, {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hello',
      name: 'hello',
      component: hello
    }, {
      path: '/Dictionary',
      name: 'Dictionary',
      component: Dictionary
    }, {
      path: '/senior',
      name: 'senior',
      component: senior
    }, {
      path: '/class',
      name: 'Class',
      component: Class
    }, {
      path: '/News',
      name: 'News',
      component: News
    }, {
      path: '/User',
      name: 'User',
      component: User,
      children: [{
        path: 'Info',
        component: Info
      }, {
        path: 'SearchHistory',
        component: SearchHistory
      }, {
        path: 'BrowsingHistory',
        component: BrowsingHistory
      }, {
        path: 'Collection',
        component: Collection
      }, {
        path: 'Note',
        component: Note
      }]
    }, {
      path: '/view/:id',
      name: 'Echarts',
      component: Echarts
    },
    {
      path: '/Echartss',
      name: 'Echartss',
      component: Echartss
    },
    {
      path: '/Table/:id',
      name: 'Table',
      component: Table
    }, {
      path: '/TrilalXml',
      name: 'TrilalXml',
      component: TrilalXml
    }, {
      path: '/NewsList',
      name: 'NewsList',
      component: NewsList
    }, {
      path: '/FeedBack',
      name: 'FeedBack',
      component: FeedBack
    }, {
      path: '/ceshi',
      name: 'ceshi',
      component: ceshi
    }
  ]

})

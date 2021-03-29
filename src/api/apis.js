/*
 * @Author: your name
 * @Date: 2020-05-23 11:19:32
 * @LastEditTime: 2020-05-28 17:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \svn-work\src\api\apis.js
 */
import request from '@/utils/request'
import drequest from '@/utils/drequest'

// 翻译
const translateUrl = '/crawlTask/translate'
export function translate(data) {
  return drequest({
    url: translateUrl,
    method: 'get',
    params:data
  })
}
// 登录
const loginUrl = '/user/login'
export function Login(data) {
  return drequest({
    url: loginUrl,
    method: 'post',
    data
  })
}
// 退出
const cancelUrl = '/user/logout'
export function LoginOut(data) {
  return drequest({
    url: cancelUrl,
    method: 'post',
    data
  })
}
// 获取用户权限
const userRuleURL = '/user/getUserRight'
export function userRule(data) {
  return drequest({
    url: userRuleURL,
    method: 'get',
    params:data
  })
}
// 修改密码
const ChangePasswordURL = '/user/updatePassword'
export function ChangePassword(data) {
  return drequest({
    url: ChangePasswordURL,
    method: 'post',
    data
  })
}
// 首页
// 获取四大分类（热搜/推荐/最近更新/我的足迹）
const NavigationUrl = '/navigation/topSearchInformation'
export function getNav(query) {
  return drequest({
    url: NavigationUrl,
    method: 'get',
    params: query
  })
}
// 首页推荐
const recommend='/navigation/promoteInformation'
export function getComment(query) {
  return drequest({
    url: recommend,
    method: 'get',
    params: query
  })
}
// 首页最静更新
const news='/navigation/newestInformation'
export function getNews(query) {
  return drequest({
    url: news,
    method: 'get',
    params: query
  })
}
// 首页我的足迹
const footprint='/statisticInfo/footprintRecord'
export function getFootprint(query) {
  return drequest({
    url: footprint,
    method: 'get',
    params: query
  })
}
//词云
const ciyun='/statisticInfo/wordCloud'
export function getciyun(query) {
  return drequest({
    url: ciyun,
    method: 'get',
    params: query
  })
}
// 情报分类
const informationurl = '/navigation/classifiedInformation'
export function getInformation(query) {
  return drequest({
    url: informationurl,
    method: 'get',
    params: query
  })
}

// 活跃用户
const activeUserUrl ='/statisticInfo/activeUser'
export function getActive(query) {
  return drequest({
    url: activeUserUrl,
    method: 'get',
    params: query
  })
}
// 获取情报列表
const cuttingEdgeurl ='statisticInfo/footprintRecord'
export function getCuttingEdge(query) {
  return drequest({
    url: cuttingEdgeurl,
    method: 'get',
    params: query
  })
}
// 获取情报分类一级分类
const getClassOrderURL ='/kgInformationlistController/TypeList'
export function getClassOrder(query) {
  return drequest({
    url: getClassOrderURL,
    method: 'get',
    params: query
  })
}
// 获取情报分类的二级分类
const sendClassURL = '/kgInformationlistController/SecondaryList'
export function getSendClass(query) {
  return drequest({
    url: sendClassURL,
    method: 'get',
    params: query
  })
}
// 查询情报分类的国家
const NationaURL = '/kgInformationlistController/NationalityList'
export function Nationa(query) {
  return drequest({
    url: NationaURL,
    method: 'get',
    params: query
  })
}
// 根据tab和国家更新情报列表
const togglecuttingEdgeurl ='/kgInformationlistController/kgInformationlist'
export function gettoggleCuttingEdge(query) {
  return drequest({
    url: togglecuttingEdgeurl,
    method: 'get',
    params: query
  })
}
// 太空进出活动统计图
const InAndOutURL = '/kgInformationFileInventory/inventoryshow'
export function InAndOut(query) {
  return drequest({
    url: InAndOutURL,
    method: 'get',
    params: query
  })
}
// 太空人员统计图
const personnelURL = '/kgInformationOuterspaceStaff/OuterspaceStaffshow'
export function personnel(query) {
  return drequest({
    url: personnelURL,
    method: 'get',
    params: query
  })
}
// 详情数据前页
// 获取全部的详情数据
const beforeDetailUrl = 'kgInformationlistController/kgInformationlistdatainfo'
export function getBeforeDetail(query) {
  return drequest({
    url: beforeDetailUrl,
    method: 'get',
    params: query
  })
}
// 消息推送页面
// 获取消息推送列表
const messPushUrl = '/messageManagement/queryPageMessageByClass'
export function getMessPush(query) {
  return drequest({
    url: messPushUrl,
    method: 'get',
    params: query
  })
}
// 个人中心页面
// 获取个人资料

// 获取统计信息
const Statisticsurl = '/personalCenter/statInformation'
export function getStatistics(query) {
  return drequest({
    url: Statisticsurl,
    method: 'get',
    params: query
  })
}
// 我的资料列表
const infourl = '/personalCenter/myProfile'
export function getData(data) {
  return drequest({
    url: infourl,
    method: 'post',
    data
  })
}
//获取笔记列表(详情页)
const listUrl = '/KgMarkController/SelectByUserId'
export function GetlistUrl(query) {
  return drequest({
    url: listUrl,
    method: 'get',
    params: query
  })
}
// 我的笔记页面（列表）
const myNoteurl = '/KgMarkController/KgMarkAllByUserId'
export function GetMyNote(query) {
  return drequest({
    url: myNoteurl,
    method: 'get',
    params: query
  })
}
// 根据关键字查询笔记
const noteSearch = '/KgMarkController/SelectKgMarkName'
export function getNoteSearch(query) {
  return drequest({
    url: noteSearch,
    method: 'get',
    params: query
  })
}
// 获取当前用户的标签（可选择，可新增，可删除）
const flagUrl = '/KgLabelController/SelectAllbyUserId'  
export function Getflag(query) {
  return drequest({
    url: flagUrl,
    method: 'get',
    params: query
  })
}
// 获取收藏夹列表
var getCollUrl = '/KgDocCollectionFolderController/rootList'
export function GetCollList(query) {
  return drequest({
    url:getCollUrl,
    method:'get',
    params: query
  })
}
// 新建收藏文件夹
var addFloderUrl = '/KgDocCollectionFolderController/add'
export function addCollFloder (data) {
  return drequest({
    url: addFloderUrl,
    method: 'post',
    data
  })
}
// 修改收藏文件夹
const editColl = '/KgDocCollectionFolderController/edit'
export function editCollName(data) {
  return drequest({
    url:editColl,
    method:'put',
    data
  })
}
// 获取我的浏览列表
const lookURL = '/personalCenter/BrowsingList'
export function getLook(query) {
  return drequest({
    url:lookURL,
    method:'get',
    params: query
  })
}
// 删除浏览记录
const delLookUrl = '/personalCenter/BrowsingCleanall'
export function delLook(query) {
  return drequest({
    url:delLookUrl,
    method:'delete',
    params: query
  })
}
// 下载文档的记录
const downloadRecordURL = '/personalCenter/updateDownloadRecord'
export function downloadRecord(query) {
  return drequest({
    url:downloadRecordURL,
    method:'get',
    params: query
  })
}
// 根据笔记文件夹id获取笔记
const allFloderNote = '/KgMarkFolder/SelectAllFolderFile'
export function getAllNote(query) {
  return drequest({
    url:allFloderNote,
    method:'get',
    params: query
  })
}
// 删除收藏夹
const delFloderUrl = '/KgDocCollectionFolderController/delete'
export function delFloder(data) {
  return drequest({
    url: delFloderUrl,
    method: 'delete',
    params:data
  })
}
// 根据收藏夹id获取所有的文件
const queryUrl = '/KgDocCollectionFolderController/queryById'
export function getCollFolderFile(data) {
  return drequest({
    url: queryUrl,
    method: 'get',
    params:data

  })
}
// 添加当前用户的标签（可选择，可新增，可删除）
const addflagUrl = '/KgLabelController/AddLabel'  
export function ADDflag(data) {
  return drequest({
    url: addflagUrl,
    method: 'post',
    data
  })
}
// 获取所有笔记列表（分页）
const AlllistUrl = 'KgMarkController/KgMarkAllByUserId'
export function GetAllListUrl(query) {
  return drequest({
    url: AlllistUrl,
    method: 'get',
    params: query
  })
}
// 修改笔记名称
const editNoteUrl = '/KgMarkController/UpdateKgMarkName'
export function editNote(data) {
  return drequest({
    url: editNoteUrl,
    method: 'post',
    data
  })
}
// 获取所有的收藏列表
const getCollectUrl = '/BookCollecTionController/SelectAllBookCollecTion'
export function getAllCollection(data) {
  return drequest({
    url: getCollectUrl,
    method: 'get',
    params:data
  })
}
// 收藏书籍
const collectUrl = '/KgDocCollectionController/AddBookCollecTion'
export function Collection(data) {
  return drequest({
    url: collectUrl,
    method: 'post',
    data
  })
}
// 获取当前用户所有的文件夹
const userFloder = '/KgDocCollectionFolderController/rootList'
export function geteFloder(data) {
  return drequest({
    url: userFloder,
    method: 'get',
    params:data
  })
}
// 获取军语一级分类
const MilitarycateUrl = '/KgDictionariesFrontEnd/classifyone'
export function getMilitary(data) {
  return drequest({
    url: MilitarycateUrl,
    method: 'get',
    params:data
  })
}
// 获取军语一级分类
const twoMilitarycateUrl = '/KgDictionariesFrontEnd/classifytwo'
export function gettwoMilitary(data) {
  return drequest({
    url: twoMilitarycateUrl,
    method: 'get',
    params:data
  })
}
// 词典查询（根据首字母/军语/外文）
const dictionary = '/KgDictionariesFrontEnd/Spellselect'
export function getDictionary(data) {
  return drequest({
    url: dictionary,
    method: 'get',
    params:data
  })
}
// 查询所有的数据字典
const dataS = '/KgDictionariesFrontEnd/KgDictionariesSelectAll'
export function getDataDictionary(data) {
  return drequest({
    url: dataS,
    method: 'get',
    params:data
  })
}
// 根据关键词获取书籍列表
const bookNameList = '/BookCollecTionController/SelectByBookCollecTionName'
export function getBookNameList(data) {
  return drequest({
    url: bookNameList,
    method: 'get',
    params:data
  })
}
// 高级搜索
const seniorUrl = '/KgInformationFile/AdvancedSearch'
export function getSenior(data) {
  return drequest({
    url: seniorUrl,
    method: 'post',
    data
  })
}
// 获取高级搜索的条件
const conditionSearchURL = '/KgInformationFile/queryrule'
export function conditionSearch(data) {
  return drequest({
    url: conditionSearchURL,
    method: 'get',
    params:data
  })
}
// 取消收藏
const cancelcollectUrl = '/KgDocCollectionFolderController/deletefolderfile'
export function cancelCollection(data) {
  return drequest({
    url: cancelcollectUrl,
    method: 'delete',
    params:data
  })
}
// 删除笔记
const delNoteUrl = '/KgMarkController/DeleteKgMarkName'
export function delNote(data) {
  return drequest({
    url: delNoteUrl,
    method: 'post',
    data
  })
}
//关键字搜索笔记列表
const searchlistUrl = '/KgSaveTheBookmarkController/SelectBookmarkName'  
export function GetSearchlistUrl(query) {
  return drequest({
    url: searchlistUrl,
    method: 'get',
    params: query
  })
}

// 获取文章列表 === 正序
const weChat = '/KgInformationFile/queryPagelist';
export function weChatList(query) {
  return drequest({
    url: weChat,
    method: 'get',
    params: query
  })
}
// 获取所有的标签（单选框）
const weChatIn = '/KgInformationFile/SelectAllTitle';
export function Title(query) {
  return drequest({
    url: weChatIn,
    method: 'get',
    params: query
  })
}
// 添加笔记 /KgSaveTheBookmarkController/BookMarkAdd
const addNote = '/KgMarkController/BookMarkAdd'
export function AddNote(data) {
  return drequest({
    url: addNote,
    method: 'post',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    data:data
  })
}

// 反馈问题类型查询
const searchFeedbackClass = '/kgFeedback/searchFeedbackClass'
export function GetFeedback(query) {
  return drequest({
    url: searchFeedbackClass,
    method: 'get',
    params: query
  })
}
// 添加反馈
const addFeedBackurl = '/kgFeedback/add'
export function addFeedBack(data) {
  return drequest({
    url: addFeedBackurl,
    method: 'post',
    data
  })
}
// 个人信息展示
const userInfoURL = '/personalCenter/userBasicInformation'
export function userInfo(query) {
  return drequest({
    url: userInfoURL,
    method: 'get',
    params: query
  })
}
// 修改个人资料
const editUserInfoURL = '/personalCenter/userBasicInformationEdit'
export function editUserInfo(data) {
  return drequest({
    url: editUserInfoURL,
    method: 'post',
    data
  })
}
// 获取关注分类
const focusClassURL = '/dictItem/list'
export function focusClass(query) {
  return request({
    url: focusClassURL,
    method: 'get',
    params:query
  })
}
// 获取关注分类(全部)
const followlistURL = '/dictItem/followlist'
export function followlist(query) {
  return request({
    url: followlistURL,
    method: 'get',
    params:query
  })
}
// 我的资料下载
const downloadFileURL = '/personalCenter/downloadFile'
export function downloadFile(query) {
  return drequest({
    url: downloadFileURL,
    method: 'get',
    params:query,
  })
}
// 删除我的资料
const delDataURL = '/personalCenter/deleteMyProfileByDocID'
export function delData(query) {
  return drequest({
    url: delDataURL,
    method: 'delete',
    params:query,
  })
}
// 获取部门（树形结构）
const treeURL = '/sysDepart/queryTreeList'
export function getPeopelTree(query) {
  return request({
    url: treeURL,
    method: 'get',
    params:query,
  })
}
// 查询对应部门下的人员
const getDepartmentURL = '/user/departUserList'
export function Department(query) {
  return request({
    url: getDepartmentURL,
    method: 'get',
    params:query,
  })
}
// 分享文档
const shareURL = '/personalCenter/sharingMyResource'
export function Share(data) {
  return drequest({
    url: shareURL,
    method: 'post',
    data
  })
}
// 消息类型未读数量查询
const UnreadURL = '/messageManagement/queryUnreadMessageNumberByClass'
export function UnreadQuantity(query) {
  return drequest({
    url: UnreadURL,
    method: 'get',
    params: query
  })
}
// 消息管理-信息狀態修改
const messageStatusURL = '/messageManagement/updateMessageStatus'
export function messageStatusUpdata(data) {
  return drequest({
    url: messageStatusURL,
    method: 'get',
    params:data
  })
}
// 消息管理===意见未读
const MUnreadURL = '/messageManagement/messageIsNoReadOneKey'
export function Unread(data) {
  return drequest({
    url: MUnreadURL,
    method: 'post',
    data
  })
}
// 消息管理===意见已读
const ReadURL = '/messageManagement/messageIsReadOneKey'
export function Read(data) {
  return drequest({
    url: ReadURL,
    method: 'post',
    data
  })
}
// 查询当前人员的部门
const departmentURL = '/sysDepart/queryMyDeptTreeList'
export function department(data) {
  return request({
    url: departmentURL,
    method: 'get',
    params: data
  })
}
// 消息批量删除
const removeMessageURL = '/messageManagement/deleteBatch'
export function removeMessage(data) {
  return drequest({
    url: removeMessageURL,
    method: 'delete',
    params: data
  })
}
// 获取文档的密集
const mijiUrl = '/dict/getDictItems/security_classification'
export function miji(data) {
  return request({
    url: mijiUrl,
    method: 'get',
    params: data
  })
}
// 修改秘籍
const editmijiUrl = '/kgInformationFileManage/edit'
export function editmiji(data) {
  return drequest({
    url: editmijiUrl,
    method: 'put',
    data
  })
}
// 根据文档id获取评论列表
const commentURL = '/kgInformationlistController/showCommentByInformationId'
export function comment(data) {
  return drequest({
    url: commentURL,
    method: 'get',
    params: data
  })
}
// 根据文档id发表评论
const sendcommentURL = '/kgInformationlistController/publishComment'
export function sendcomment(data) {
  return drequest({
    url: sendcommentURL,
    method: 'post',
    data
  })
}
// 文件工具下载列表
const toolURL ='/lookTool/list'
export function getTool(data) {
  return drequest({
    url: toolURL,
    method: 'get',
    params: data
  })
}
// 文件工具下载
const filetoolURL ='/lookTool/downloadTool/'
export function uploadTool(url) {
  return drequest({
    url: filetoolURL+url,
    method: 'get',
  })
}
// 发射图模板下载
const templateUrl = '/satelliteLaunching/exportXls'
export function template() {
  return drequest({
    url: templateUrl,
    method: 'get',
    responseType: 'blob'
  })
}
// 太空战略演习编辑rl
const manoeuverUrl = '/strategyManoeuvre/edit'
export function manoeuver(data) {
  return drequest({
    url: manoeuverUrl,
    method: 'put',
    data
  })
}
// 太空装备编辑
const mainEquipmenteditUrl = '/mainEquipment/edit'
export function mainEquipmentedit(data) {
  return drequest({
    url: mainEquipmenteditUrl,
    method: 'put',
    data
  })
}
// 太空战略演习新增
const manoeuveraddUrl = '/strategyManoeuvre/add'
export function manoeuverAdd(data) {
  return drequest({
    url: manoeuveraddUrl,
    method: 'post',
    data
  })
}
// 太空整备新增
const mainEquipmentaddUrl = '/mainEquipment/add'
export function mainEquipmentAdd(data) {
  return drequest({
    url: mainEquipmentaddUrl,
    method: 'post',
    data
  })
}
// 太空战略演习删除
const manoeuverdelUrl = '/strategyManoeuvre/delete'
export function manoeuverDel(data) {
  return drequest({
    url: manoeuverdelUrl,
    method: 'delete',
    params: data
  })
}
// 太空装备删除
const mainEquipmentDelURL = '/mainEquipment/delete'
export function mainEquipmentDel(data) {
  return drequest({
    url: mainEquipmentDelURL,
    method: 'delete',
    params: data
  })
}
// 装备图模板下载
const EquipmentURL = '/mainEquipment/exportXls'
export function Equipments() {
  return drequest({
    url: EquipmentURL,
    method: 'get',
    responseType: 'blob'
  })
}
// 战略图模板下载
const manoeuvreURL = '/strategyManoeuvre/exportXls'
export function manoeuvre() {
  return drequest({
    url: manoeuvreURL,
    method: 'get',
    responseType: 'blob'
  })
}
// 太空力量部署模板下载
const deploymentURL = '/spaceStrength/exportXls'
export function deployment() {
  return drequest({
    url: deploymentURL,
    method: 'get',
    responseType: 'blob'
  })
}
// 太空力量部署-时间范围查询
const getdeploymentURL = '/spaceStrength/list'
export function getdeployment(data) {
  return drequest({
    url: getdeploymentURL,
    method: 'get',
    params:data
  })
}
// 太空力量部署-添加基地
const adddeploymentURL = '/spaceStrength/add'
export function adddeployment(data) {
  return drequest({
    url: adddeploymentURL,
    method: 'post',
    data
  })
}
// 太空力量部署-编辑基地
const editdeploymentURL = '/spaceStrength/edit'
export function editdeployment(data) {
  return drequest({
    url: editdeploymentURL,
    method: 'put',
    data
  })
}
// 太空力量部署-删除基地
const deldeploymentURL = '/spaceStrength/delete'
export function deldeployment(data) {
  return drequest({
    url: deldeploymentURL,
    method: 'delete',
    params: data
  })
}
// 获取太空领域威胁挑战图的分类 (一级分类)
const classThreatenURL = '/kgInformationChallengeimg/rootList'
export function classThreaten(data) {
  return drequest({
    url: classThreatenURL,
    method: 'get',
  })
}
// 获取太空领域威胁挑战图的分类 (二级分类)
const sendclassThreatenURL = '/kgInformationChallengeimg//childList'
export function sendclassThreaten(data) {
  return drequest({
    url: sendclassThreatenURL,
    method: 'get',
    params: data
  })
}
// 编辑太空领域威胁的二级（
const editThreatenURL = '/kgInformationChallengeimg/edit'
export function editThreaten(data) {
  return drequest({
    url: editThreatenURL,
    method: 'put',
    data
  })
}
// 删除太空领域威胁的二级（
const deleThreatenURL = '/kgInformationChallengeimg/delete'
export function deleThreaten(data) {
  return drequest({
    url: deleThreatenURL,
    method: 'delete',
    params:data
  })
}
// 新增太空领域威胁的二级（
const addThreatenURL = '/kgInformationChallengeimg/add'
export function addThreaten(data) {
  return drequest({
    url: addThreatenURL,
    method: 'post',
    data
  })
}
// 查询所有部门
const allDeptURL ='/sysDepart/queryTreeList'
export function getAllDeptList(url) {
  return request({
    url: allDeptURL,
    method: 'get',
  })
}
// 用户注册
const registerURL ='/user/userRegistration'
export function register(data) {
  return drequest({
    url: registerURL,
    method: 'post',
    data
  })
}
// 用户名称校验
const userCheckURL ='/user/verifyUserName'
export function nameCheck(data) {
  return drequest({
    url: userCheckURL,
    method: 'get',
    params: data
  })
}
// 所有国家
const countryUrl = '/satelliteLaunching/queryAllCountry'
export function getCountryList(data) {
  return drequest({
    url: countryUrl,
    method: 'get',
    params:data
  })
}
// 太空发射统计: 根据国家 / 时间 进行查询
const LaunchStatisticsUrl = '/satelliteLaunching/queryConditionList'
export function LaunchStatistics(data) {
  return drequest({
    url: LaunchStatisticsUrl,
    method: 'post',
    data
  })
}
// 获取对应类型下的所有类型
const equipURL ='/mainEquipment/queryEquipModelByType'
export function equip(data) {
  return drequest({
    url: equipURL,
    method: 'get',
    params:data
  })
}
// 分页查询对应类型以及型号下的所有数据
const mainEquipmentUrl ='/mainEquipment/list'
export function mainEquipment(data) {
  return drequest({
    url: mainEquipmentUrl,
    method: 'get',
    params:data
  })
}
// 对应类型 型号的统计数据
const StatisticsURL ='/mainEquipment/queryStatisticResult'
export function Statistics(data) {
  return drequest({
    url: StatisticsURL,
    method: 'get',
    params:data
  })
}
// 太空战略演习 - 查询所有战略演习
const maneuversURL ='/strategyManoeuvre/queryAllStrategyManoeuvre'
export function maneuvers(data) {
  return drequest({
    url: maneuversURL,
    method: 'get',
    params:data
  })
}
// 太空战略演习 - 查询所有战略演习
const maneuversListURL ='/strategyManoeuvre/list'
export function maneuversList(data) {
  return drequest({
    url: maneuversListURL,
    method: 'get',
    params:data
  })
}
export const REFUND_LIST = '';


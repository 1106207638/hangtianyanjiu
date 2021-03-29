import request from '@/utils/request'
import drequest from '@/utils/drequest'
//添加页面
// const craftsmanListUrl='/wx/artist/list'
// export function getCraftsmanList() {
//   return request({
//     url: craftsmanListUrl,
//     method: 'get',
//     data
//   })
// }

// const ChartsAdd='/card/palmCardInfo/add';
// export function ChartsAddData(data) {
//   return request({
//     url: ChartsAdd,
//     method: 'post',
//     data
//   })
// }
const url = 'accessToDirectory/1301710369047318501'
export function getAccessToDirectory(query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}
// 获取html结构
const Htmlurl = 'wordToHtml/1301710369047318501'
export function getWordToHtml(query) {
  return request({
    url: Htmlurl,
    method: 'get',
    params: query
  })
}

// 获取新闻列表
const newsListUrl='/journalism/list';
export function GetNewsList(query) {
  return drequest({
    url: newsListUrl,
    method: 'get',
    params: query
  })
}
// 获取首页新闻
const homeNewsURL = '/journalism/newJournalism'
export function GetHomeNews(query) {
  return drequest({
    url: homeNewsURL,
    method: 'get',
    params: query
  })
}
// 获取需求反馈  /kgFeedback
const feedUrl = '/kgFeedback/list'
export function GetFeedBackList(query) {
  return drequest({
    url: feedUrl,
    method: 'get',
    params: query
  })
}
// 回应
const responseUrl = '/kgFeedback/response'
export function sendReponse(query) {
  return drequest({
    url: responseUrl,
    method: 'post',
    data: query
  })
}
// 获去回应列表
const responseListUrl = '/kgFeedback/responselist'
export function getReponse(query) {
  return drequest({
    url: responseListUrl,
    method: 'get',
    params: query
  })
}
// 点赞
const dzURL = '/kgFeedback/dz'
export function dainzan(query) {
  return drequest({
    url: dzURL,
    method: 'get',
    params: query
  })
}
// 获取视图
const viewURL = '/kgInformationlistController/kgInformationViewManage'
export function getUploadView(data) {
  return drequest({
    url: viewURL,
    method: 'post',
    data: data
  })
}
// 视图返回上一步的视图
const backViewURL = '/kgInformationlistController/kgInformationViewRestore'
export function backView(data) {
  return drequest({
    url: backViewURL,
    method: 'post',
    data: data
  })
}
export const REFUND_LIST = '';

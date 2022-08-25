import {
  mzRequest
} from "./index";
//热门搜索
export function getSearchKeywords() {
  return mzRequest.get("/search/hot")
}
// 搜索建议
export function getSearchSuggest(keywords) {
  return mzRequest.get("/search/suggest", {
    keywords,
    type: 'mobile'
  })
}
// 搜索结果
export function getSearchResult(keywords) {
  return mzRequest.get("/cloudsearch", {
    keywords
  })
}
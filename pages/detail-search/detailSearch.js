// pages/detail-search/detailSearch.js
import {
	getSearchKeywords,
	getSearchSuggest,
	getSearchResult
} from "../../service/api_search";
import {
	debounce
} from "../../utils/debounce";

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300);

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		hots: [],
		searchValue: "",
		suggestSongs: [],
		resultSongs: [],
		keywordHtml: "",
		testHtml: "",
		historySearch: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		this.getPageData();
		this.getStorage();
	},
	getPageData() {
		getSearchKeywords().then((res) => {
			this.setData({
				hots: res.result.hots
			})
		})
	},
	handleSearchChange(event) {
		this.setData({
			searchValue: event.detail,
			resultSongs: []
		})
		if (!event.detail) {
			this.setData({
				suggestSongs: []
			})
			return
		}
		debounceGetSearchSuggest(event.detail).then((res) => {
			console.log(event.detail);
			const suggestsSongs = res.result.allMatch;
			suggestsSongs.forEach((item) => {
				const searchValue = this.data.searchValue;
				// 拆分关键字字符
				const keyword1 = item.keyword.slice(0, searchValue.length);
				const keyword2 = item.keyword.slice(searchValue.length);
				// 转为大写
				const upSearchValue = searchValue.toUpperCase();
				const upKkeyword1 = keyword1.toUpperCase();
				// 按条件转为 html
				let color = 'black';

				upKkeyword1 === upSearchValue ? color = '#26ce8a' : color = 'black';

				let keywordHtml = `
				<span class="text">
					<span style="color:${color};font-size:14px">${keyword1}</span>${keyword2}
				</span>
				`
				item.keywordHtml = keywordHtml;
			})
			this.setData({
				suggestSongs: res.result.allMatch
			})
		})
	},
	handleSearchAction(event) {
		getSearchResult(event.detail).then(res => {
			this.setData({
				resultSongs: res.result.songs
			})
		})
		this.setStorage(event.detail);
	},
	setStorage(keyword) {
		let historySearchArr = [];
		// 将关键词数组缓存下来
		function pushKeywordStorage(keyword) {
			wx.setStorageSync('historySearch', JSON.stringify(historySearchArr));
		}
		// 搜索词最长为10个字符
		let sliceKeyword = "";
		if (keyword.length > 10) {
			sliceKeyword = keyword.slice(0, 10) + "...";
		} else if (keyword.length > 0) {
			sliceKeyword = keyword;
		}
		if (wx.getStorageSync('historySearch')) {
			historySearchArr = JSON.parse(wx.getStorageSync('historySearch')).slice(0, 10);
			// 重复内容的索引
			const index = historySearchArr.indexOf(sliceKeyword);
			console.log(index);
			// 删除重复内容
			if (index > -1) {
				historySearchArr.splice(index, 1);
				historySearchArr.unshift(sliceKeyword);
			} else {
				historySearchArr.unshift(sliceKeyword);
			}
			pushKeywordStorage(sliceKeyword)
			console.log(wx.getStorageSync('historySearch'))
		} else {
			pushKeywordStorage(sliceKeyword)
			console.log(wx.getStorageSync('historySearch'))
		}
	},
	getStorage() {
		if (wx.getStorageSync('historySearch')) {
			const historySearchArr = JSON.parse(wx.getStorageSync('historySearch'));
			this.setData({
				historySearch: historySearchArr
			})
		}
	},
	// 请求搜索数据
	getPageSearchResult(event) {
		let keyword;
		if (event.currentTarget.dataset && event.currentTarget.dataset.keyword) {
			keyword = event.currentTarget.dataset.keyword;
		} else if (event.detail && event.detail.keyword) {
			keyword = event.detail.keyword;
		} else {
			return
		}
		this.setData({
			searchValue: keyword
		});
		getSearchResult(keyword).then(res => {
			this.setData({
				resultSongs: res.result.songs
			})
		})
		this.setStorage(keyword);
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})
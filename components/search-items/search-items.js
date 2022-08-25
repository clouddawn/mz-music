// components/search-items/search-items.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: {
			type: String,
			value: '默认内容'
		},
		items: {
			type: Array,
			value: []
		}, 
		style: {
			type:String,
			value:""
		 }
	},

	/**
	 * 组件的初始数据
	 */
	data: {

	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		getPageSearchResult(event){
			const keyword = event.currentTarget.dataset.keyword;
			this.triggerEvent('itemClick',{keyword})
		}
	}
})
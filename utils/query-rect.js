	// 获取组件的高度
	// export async function getComponentHeight(selectorName) {
	// 	let height;
	// 	const query = wx.createSelectorQuery()
	// 	query.select(selectorName).boundingClientRect()
	//   await	query.exec(rect => {
	// 		console.log(rect);
	// 		height = rect[0].height;
	// 	})
	// 	return height;
	// }
	export function getComponentHeight(selector) {
		return new Promise((resolve,reject)=>{
			const query = wx.createSelectorQuery()
			query.select(selector).boundingClientRect()
			query.exec(resolve)
		})
	}
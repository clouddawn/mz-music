import {
	HYEventStore
} from "hy-event-store";
import {
	getRankings
} from "../service/api_music";


export const rankingStore = new HYEventStore({
	state: {
		hotRanking: [],
		upRanking:[],
		originRanking:[],
		newRanking:[],
	},
	actions: {
		getRankingDataAction(ctx) {
			const rankingMap = {
				'新歌':'newRanking',
				'热歌':'hotRanking',
				'原创':'originRanking',
				'飙升':'upRanking'
			}
			Object.keys(rankingMap).forEach((item)=>{
				getRankings(item).then((res) => {
					ctx[rankingMap[item]] = res.playlist;
				})
			})
		}
	}
})
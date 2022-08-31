import {
	HYEventStore
} from "hy-event-store";
import {
	getSongDetail,
	getSongLyric
} from "../service/api_music";
import {
	parseLyric
} from "../utils/parse-lyric";

const innerAudioContext = wx.createInnerAudioContext({
	useWebAudioImplement: true
})

const playerStore = new HYEventStore({
	state: {
		id: 0,
		currentSong: {},
		lineLyricsArr: [],
		songDuration: 0,
		currentTime: 0,
		currentLyricIndex: 0,
		currentLyricText:0,
		lyricScrollTop: 0,
	},
	actions: {
		playMusicWithSongIdAction(ctx, {
			id
		}) {
			if (id === ctx.id) return;
			ctx.id = id;
			getSongDetail(id).then((res) => {
				ctx.currentSong = res.songs[0]
			})

			getSongLyric(id).then((res) => {
				const lyric = res.lrc.lyric;
				const lineLyricsArr = parseLyric(lyric);
				ctx.lineLyricsArr = lineLyricsArr;
			})

			innerAudioContext.stop();
			// innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
			innerAudioContext.src = `http://m801.music.126.net/20220831095649/05647f4bb43ff4cfc1949b0b2235d4e5/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096426578/ff65/7348/d83f/36ab528a5935b3ee552768bd939af6cf.mp3`;

			// 监听 audioContext 一些事件
			this.dispatch("setupAudioContextListenerAction");
		},
		setupAudioContextListenerAction(ctx) {
			innerAudioContext.onCanplay(() => {
				innerAudioContext.play();
				ctx.songDuration = innerAudioContext.duration
			})
			innerAudioContext.onTimeUpdate(() => {
				const currentTime = innerAudioContext.currentTime;
				ctx.currentTime = currentTime;
				const lineLyricsArr = ctx.lineLyricsArr;
				let currentLyricText;
				let currentLyricIndex;
				for (let i = 0; i < ctx.lineLyricsArr.length; i++) {
					if (currentTime * 1000 < lineLyricsArr[i].time) {
						currentLyricText = lineLyricsArr[i - 1].text;
						currentLyricIndex = i - 1;
						break;
					}
				}
				if (currentLyricIndex !== ctx.currentLyricIndex) {
					ctx.currentLyricText = currentLyricText;
					ctx.currentLyricIndex = currentLyricIndex;
				}
				ctx.currentTime = currentTime;
				// this.setData({
				// 	currentTime,
				// 	sliderValue
				// })

			})
		},
	}
})

export {
	innerAudioContext,
	playerStore
}
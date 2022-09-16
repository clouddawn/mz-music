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

// const innerAudioContext = wx.createInnerAudioContext({
// 	useWebAudioImplement: true
// })
const innerAudioContext = wx.getBackgroundAudioManager();

const playerStore = new HYEventStore({
	state: {
		id: 0,
		currentSong: {},
		lineLyricsArr: [],
		songDuration: 0,
		currentTime: 0,
		currentLyricIndex: 0,
		currentLyricText: '',
		lyricScrollTop: 0,
		// 播放模式
		playModeIndex: 0, // 0:顺序播放  1:单曲循环  2:随机播放
		playModeIcon: 'order',
		isPlaying: false,
		playListSongs: [],
		playListIndex: 0,
		isFirstPlay: true,	
	},
	actions: {
		playMusicWithSongIdAction(ctx, {
			id
		}) {
			if (id === ctx.id) {
				this.dispatch('changePlayStatus', true);
				return;
			}
			ctx.id = id;
			ctx.currentSong = {};
			ctx.lineLyricsArr = [];
			ctx.songDuration = 0;
			ctx.currentTime = 0;
			ctx.currentLyricText = "";
			ctx.currentLyricIndex = 0;
			getSongDetail(id).then((res) => {
				ctx.currentSong = res.songs[0]

				innerAudioContext.stop();
				innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
				// innerAudioContext.src = `http://m801.music.126.net/20220903134716/bf742f797f7897acd11ab94549b29a83/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096427404/eb04/0298/86a7/980b0563f5bc9ff48d0bc02a800da1fd.mp3`;
				innerAudioContext.title = res.songs[0].name;
				ctx.isPlaying = true;
				// 监听 audioContext 一些事件
				if(ctx.isFirstPlay){
					this.dispatch("setupAudioContextListenerAction");
					ctx.isFirstPlay = false;
				}
			})

			getSongLyric(id).then((res) => {
				const lyric = res.lrc.lyric;
				const lineLyricsArr = parseLyric(lyric);
				ctx.lineLyricsArr = lineLyricsArr;
			})
		},
		setupAudioContextListenerAction(ctx) {
			innerAudioContext.onCanplay(() => {
				if (ctx.isPlaying) {
					innerAudioContext.play();
				}
			})
			innerAudioContext.onTimeUpdate(() => {
				const currentTime = innerAudioContext.currentTime;
				ctx.currentTime = currentTime;
				if(innerAudioContext.duration !== ctx.songDuration){
					ctx.songDuration = innerAudioContext.duration
				}
				if (ctx.lineLyricsArr) {
					this.actions.getCurrentLyricTextAction({
						ctx,
						currentTime
					});
				}
			})
			innerAudioContext.onEnded(()=>{
				this.dispatch('switchSongAction','next')
			})
			// 监听音乐暂停
			innerAudioContext.onPause(()=>{
				ctx.isPlaying = false;
			})
			// 监听音乐播放
			innerAudioContext.onPlay(()=>{
				ctx.isPlaying = true; 
			})
			// 监听音乐停止
			innerAudioContext.onStop(()=>{
				ctx.isPlaying = false;
			})
		},
		getCurrentLyricTextAction({
			ctx,
			currentTime
		}) {
			const lineLyricsArr = ctx.lineLyricsArr;
			let currentLyricText;
			let currentLyricIndex;
			for (let i = 0; i < lineLyricsArr.length; i++) {
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
		},
		changeMode(ctx) {
			if (ctx.playModeIndex === 2) {
				ctx.playModeIndex = 0
			} else {
				ctx.playModeIndex = ++ctx.playModeIndex
			}
			const playModeMap = {
				0: 'order',
				1: 'repeat',
				2: 'random'
			}
			ctx.playModeIcon = playModeMap[ctx.playModeIndex]
		},
		// 点击进度条跳转
		handleSliderChangeAction(ctx, event) {
			const value = event.detail.value;
			const currentTime = value / 100 * ctx.songDuration;
			ctx.currentTime = currentTime;
			innerAudioContext.seek(currentTime);
			if (!ctx.isPlaying) {
				innerAudioContext.pause();
				this.actions.getCurrentLyricTextAction({
					ctx,
					currentTime
				});
			}
		},
		// 改变播放状态
		changePlayStatus(ctx, isPlaying) {
			ctx.isPlaying = isPlaying;
			if (isPlaying) {
				innerAudioContext.play();
			} else {
				innerAudioContext.pause();
			}
		},
		// 切换歌曲
		switchSongAction(ctx, type) {
			let playListIndex = ctx.playListIndex;
			const maxPlayListIndex = ctx.playListSongs.length - 1;
			const playModeIndex = ctx.playModeIndex;
			let id;

			// 顺序播放
			if (playModeIndex === 0) { 
				switch (type) {
					case 'prev':
						playListIndex--;
						if (playListIndex < 0) {
							playListIndex = maxPlayListIndex;
						}
						break;
					case 'next':
						playListIndex++;
						if (playListIndex > maxPlayListIndex) {
							playListIndex = 0;
						}
						break;
				}

				// 单曲循环
			} else if (ctx.playModeIndex === 1) {
				innerAudioContext.stop();

				// 随机播放
			} else if (ctx.playModeIndex === 2) {
				const getRandomNumber = ()=>{
					playListIndex = Math.floor(Math.random() * ctx.playListSongs.length);
					if(ctx.playListSongs.length > 1 && playListIndex === ctx.playListIndex){
						getRandomNumber();
					}
				}
				getRandomNumber();
			}

			id = ctx.playListSongs[playListIndex].id;
			ctx.playListIndex = playListIndex;
			this.dispatch('playMusicWithSongIdAction', {
				id
			})
		}
	}
})

export {
	innerAudioContext,
	playerStore
}
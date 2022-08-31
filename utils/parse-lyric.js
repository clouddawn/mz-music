export function parseLyric(lyric){
	const lyricArr = lyric.split('\n');
	const regRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
	const lineLyricsArr = [];
	for (let lineLyric of lyricArr) {
		const lineLyricArr = regRegExp.exec(lineLyric);
		let time;
		if (!lineLyricArr) continue;
		if (lineLyricArr[3].length === 2) {
			time = lineLyricArr[1] * 60 * 1000 + lineLyricArr[2] * 1000 + lineLyricArr[3] * 10;
		} else if (lineLyricArr[3].length === 3) {
			time = lineLyricArr[1] * 60 * 1000 + lineLyricArr[2] * 1000 + lineLyricArr[3] * 1;
		}
		const lineLyricObj = {
			time,
			text: lineLyricArr[4]
		}
		lineLyricsArr.push(lineLyricObj);
	}
	return lineLyricsArr;
}
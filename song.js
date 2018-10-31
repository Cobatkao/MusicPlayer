$(function () {

  let id = location.search.match(/(\?|&)([a-z]{2}\=)([a-zA-Z0-9]*)/)[3]
  var query = new AV.Query('Song')
  query.get(id).then(function(song) {
    let {cover, id, lyc, name, singer, url} = song.attributes
    initMusicplayer.call(null, url)
    initSongInfo(name, singer, lyc)
  }, function(error) {
    console.log('Song对象获取失败')
  })

  //拼装歌名、歌手、歌词区域
  function initSongInfo(name, singer, lyc) {
    $('.song-description > h2').text(name + ' - ' + singer)
    parseMusicLyric.call(null, lyric)
  }

  function fillingZero(num) {
    return num >= 10 ? num + '' : '0' + num
  }

  /*
  * initMusicplayer(url)
  * 1. 控制转盘播放、暂停
  * 2. 歌词处理
  */
  function initMusicplayer(url) {
    let audio = document.createElement('audio')
    audio.src = url
    audio.oncanplay = function () {
      audio.play()
      $('.disc-container').addClass('playing')
    }

    //修复移动端跳转后无法自动播放
    $('html').one('touchstart',function () {
			audio.play();
			$('.disc-container').addClass('playing')
		})
    $('.icon-pause').on('click', function () {
      console.log('歌曲暂停')
      audio.pause()
      $('.disc-container').removeClass('playing')
    })
    $('.icon-play').on('click', function () {
      console.log('歌曲播放')
      audio.play()
      $('.disc-container').addClass('playing')
    })

    //截取歌词
    setInterval(()=>{
      let second = audio.currentTime
      let minute = ~~(second / 60)
      let leftTime = second - minute * 60
      //获取当前播放时间
      let time = `${fillingZero(minute)}:${fillingZero(leftTime)}`
      console.log(time)
      let $lines = $('.lines > p')
      let $theVeryLine
      for(let i = 0; i < $lines.length; i++) {
        if($lines.eq(i).attr("data-time") < time && $lines.eq(i+1).attr("data-time") > time) {
          $theVeryLine = $lines.eq(i)
          break
        }
      }
      //处理歌词滚动
      if($theVeryLine) {
        console.log('当前：' + $theVeryLine)
        $theVeryLine.addClass('active').prev().removeClass('active')
        let theVeryLyricTop = $theVeryLine.offset().top
        let linesTop = $('.lines').offset().top
        let gap = theVeryLyricTop - linesTop - $('.lyric').height() / 3
        $('.lines').css({'transform': `translateY(-${gap}px)`, 'transition': 'transform .3s'})
      }
    },300)
  }

  /*
  * parseMusicLyric(lyc)
  * 1. 控制转盘播放、暂停
  * 2. 歌词处理
  */
  function parseMusicLyric(lyc) {
    let array = lyric.split('\n')
    let regex = /^\[(.+)\](.*)$/
    array = array.map(function (string) {
      let matches = string.match(regex)
      if (matches) {
        return {
          time: matches[1],
          word: matches[2]
        }
      }
    })
    let $lyric = $('.lyric')
    array.map(function (object) {
      if (!object) {
        return
      }
      $('<p></p>', {
        'data-time': object.time,
        html: object.word
      }).appendTo($lyric.children('.lines'))
    })
  }
})
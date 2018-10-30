$(function () {
  let id = parseInt(location.search.match(/\bsongid=([^&]*)/)[1])
  $.get('./songs.json').then(function (response) {
    let verysong = response
    // debugger
    let songs = verysong.filter((n) =>
      n.songid === id
    )[0]
    //解构获取url
    let {
      url, name, singer, lyric
    } = songs
    initMusicplayer.call(null, url)
    initSongInfo(name, singer, lyric)
  })

  //拼装歌名、歌手、歌词区域
  function initSongInfo(name, singer, lyric) {
    $('.song-description > h2').text(name + ' - ' + singer)
    parseMusicLyric.call(null, lyric)
  }

  function fillingZero(num) {
    return num >= 10 ? num + '' : '0' + num
  }

  //请求歌曲url
  function initMusicplayer(url) {
    let audio = document.createElement('audio')
    audio.src = url
    audio.oncanplay = function () {
      audio.play()
      $('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('click', function () {
      audio.pause()
      $('.disc-container').removeClass('playing')
    })
    $('.icon-play').on('click', function () {
      audio.play()
      $('.disc-container').addClass('playing')
    })

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

  //请求歌曲时间，歌词
  function parseMusicLyric(lyric) {
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
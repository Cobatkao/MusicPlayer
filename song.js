
let id = location.search.match(/(\?|&)([a-z]{2}\=)([a-zA-Z0-9]*)/)[3]
var query = new AV.Query('Song')
query.get(id).then(function(song) {
  let {cover, id, lyc, name, singer, url} = song.attributes
  initMusicplayer.call(null, url)
  initInfo(name, singer, lyc)
}, function(error) {
  console.log('Song对象获取失败')
})

//拼装歌名、歌手、歌词区域
function initInfo(name, singer, lyc, cover) {
  var $info = `
  <span class="song-name">${name}</span>
  <span class="song-gap">-</span>
  <b class="song-autr">${singer}</b>
  `
  $('.song-description > h2').append($info)
  
  //渲染歌词
  parseLyc(lyc)
}

function fillingZero(num) {
  return num >= 10 ? num + '' : '0' + num
}

/*
* parseLyc(lyc)
* 1. 获取时间轴与对应歌词
* 2. 插入DOM
*/
function parseLyc(lyc) {
  let array = lyc.split('\n')
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
      'data-time': object.time, //时间轴时间
      html: object.word
    }).appendTo($lyric.children('.lines'))
  })
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
  $('html').on('click', function () {
    console.log('歌曲暂停')
    audio.pause()
    $('.disc-container').removeClass('playing')
    $('.disc-container>.pointer').addClass('paused')
  })
  $('.pointer').click(function (event) {
    console.log('歌曲播放')
    audio.play()
    $('.disc-container').addClass('playing')
    $('.disc-container>.pointer').removeClass('paused')
  })

  //处理时间格式
  setInterval(()=>{
    let second = audio.currentTime
    let minute = ~~(second / 60)
    let leftTime = second - minute * 60
    let time = `${fillingZero(minute)}:${fillingZero(leftTime)}`
    //组装好的歌曲播放实时时间
    // console.log('当前时间：' + time)
    let $lines = $('.lines > p')
    for(let i = 0; i < $lines.length; i++) {
      let $theVeryLine = $lines.eq(i)
      let $theNextLine = $lines.eq(i + 1)
      if($theNextLine.length === 0) {
        return
      } else {
        if($theVeryLine.attr("data-time") < time && $theNextLine.attr("data-time") > time) {
          $theVeryLine.addClass('active').siblings().removeClass('active')
          let gap = $theVeryLine.offset().top - $('.lines').offset().top
          let middle = $('.lyric').height() / 3
          $('.lines').css('transform',`translateY(-${gap-middle}px)`)
          break
        }
      }
    }
}, 300)
}

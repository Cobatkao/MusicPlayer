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

  //请求歌曲url
  function initMusicplayer(url) {
    let audio = document.createElement('audio')
    audio.src = url
    audio.oncanplay = function () {
      console.log('ready play')
      audio.play()
      console.log('unable to play')
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
  // $.get('./lyric.json').then(function (object) {
  //   let {
  //     lyric
  //   } = object
  //   parseMusicLyric.call(null, lyric)
  // })

})
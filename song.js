$(function () {
  //获取请求歌曲的url
  let id = parseInt(location.search.match(/\bsongid=([^&]*)/)[1])
  $.get('./songs.json').then(function (response) {
    let verysong = response
    // debugger
    let songs = verysong.filter((n) =>
      n.songid === id
    )[0]
    //解构获取url
    let {
      url
    } = songs

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
  })


  $.get('./lyric.json').then(function (object) {
    let {
      lyric
    } = object
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
  })


})
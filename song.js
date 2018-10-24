$(function () {
  $.get('./lyric.json').then(function (object) {
    let { lyric } = object
    let array = lyric.split('\n')
    let regex = /^\[(.+)\](.*)$/
    array = array.map(function (string) {
      let matches = string.match(regex)
      if (matches) {
        return { time: matches[1], word: matches[2] }
      }
    })
    let $lyric = $('.lyric')
    array.map(function (object) {
      if (!object) { return }
      $('<p></p>', { 'data-time': object.time, html: object.word }).appendTo($lyric.children('.lines'))
    })
  })

  let audio = document.createElement('audio')
  // audio.src = 'http://m10.music.126.net/20181023202909/d24287a820fb0b5aa8a383276e8a0463/ymusic/92cf/af91/eb3d/c40ee3f9d91daba18f4c7537766d106d.mp3'
  audio.src = 'http://36.248.20.145/amobile.music.tc.qq.com/C400001XdWPc3zSK8E.m4a?guid=9531842138&vkey=D9B73DFCC58922E805F0F44544787207147C6CA35F099DE03A76BA26FB5F8D3BDD7761DCFB124939D0994BC5B0C76827A95A8D28587B46A4&uin=1910&fromtag=66'
  // audio.src = 'http://dl.stream.qqmusic.qq.com/C400000OFXjz0Nljbh.m4a?vkey=33E6799DB60508E9561F3DDAA6ED69488988B51DE791617A2E34B02A3A48E9CCBD43595DC00D796EB6768D26134AAB1C3AD192C7044DE1A1&guid=3655047200&fromtag=66'
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
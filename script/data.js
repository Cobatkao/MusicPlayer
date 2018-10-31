

//最新音乐模块
var query = new AV.Query('Song')
query.find().then(function(result) {
  $('#latestmusic-loading').remove()
  for(let i = 0; i < result.length; i++) {
    let song = result[i].attributes
    let $Nli = `
    <li>
      <a href="../song.html?id=${result[i].id}">
        <h3>${song.name}</h3>
        <p class="song-info">
          <svg class="icon icon-sq">
            <use xlink:href="#icon-sq"></use>
          </svg>
          <span>${song.singer}</span>
        </p>
        <svg class="icon icon-play">
          <use xlink:href="#icon-play"></use>
        </svg>
      </a>
    </li>
  `
    $('#latestmusic-wrapper').append($Nli)
  }
}, function(error) {
  console.log('歌曲获取失败')
})

//搜索模块
let timer = null

$('#searchSong').on('input', function(e) {

  if(timer) {
    clearTimeout(timer)
  }

  let $input = $(e.currentTarget)
  let inputValue = $input.val().trim()
  if(inputValue === '') {
    $('#songOutput').empty()
    return
  }

  timer = setTimeout(function() {
    var querySinger = new AV.Query('Song')
    var querySong = new AV.Query('Song')
    querySong.contains('name', inputValue)
    querySinger.contains('singer', inputValue)
    var query = AV.Query.or(querySinger, querySong)

    query.find().then(function (results) {
    $('#songOutput').empty()
    if(results.length === 0) {
      $('#songOutput').html('<div class="vain">嘿嘿嘿，没有你想要的歌曲🤔</div>')
    } else {
      for(let i = 0; i < results.length; i++) {
        let song = results[i].attributes
        let $ct = `
          <div data-id="${results[i].id}">
            <a href="../song.html?id=${results[i].id}">${song.singer} - ${song.name}</a>
          </div>
        `
        $('#songOutput').append($ct)
      }
    }
    }, function (error) {
      console.log("搜索数据失败")
    });
  }, 300)
})

var APP_ID = 'sEuCbQa4uemoiTAwR26yX2Rg-gzGzoHsz';
var APP_KEY = 'Khq0CnYeBxIkRDEll8AO1ire';

//初始化AV对象
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

// $(function() {
//   $.get('../songs.json').then(function(response) {
//     let songData = response
//     songData.forEach(function(item) {
//       var SongObject = AV.Object.extend('Song')
//       var songObject = new SongObject()
//       songObject.save({
//         id: item.songid,
//         name: item.name,
//         singer: item.singer,
//         lyc: item.lyric,
//         url: item.url
//       })
//     })
//     console.log('song数据获取成功')
//   }, function(error) {
//     console.log('song数据获取失败')
//   })
// })

var query = new AV.Query('Song');
query.find().then(function(result) {
  $('#latestmusic-loading').remove()
  for(let i = 0; i < result.length; i++) {
    let song = result[i].attributes
    let $li = `
      <li>
        <a href="./song.html?songid=${song.songid}">
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
    $('#latestmusic-wrapper').append($li)
  }
}, function(error) {
  alert('歌曲获取失败')
})


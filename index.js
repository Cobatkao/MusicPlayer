$(function () {
  $.get('./songs.json').then(function (response) {
    let items = response
    items.forEach((i) => {
      let $li = $(`
      <li>
        <a href="./song.html?songid=${i.songid}">
          <h3>${i.name}</h3>
          <p class="song-info">
            <svg class="icon icon-sq">
              <use xlink:href="#icon-sq"></use>
            </svg>
            <span>演唱者1-专辑1</span>
          </p>
          <svg class="icon icon-play">
            <use xlink:href="#icon-play"></use>
          </svg>
        </a>
      </li>
      `)
      $('#latestmusic-wrap').append($li)
    })
    $('#latestmusic-loading').remove()
  }, function () {
    console.log('请求失败')
  })
})
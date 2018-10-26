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

  $('.siteNav').on('click', 'ol.tabItems>li', function(e) {
    let $li = $(e.currentTarget).addClass('active')
    $li.siblings().removeClass('active')
    let index = $li.index()
    //自定义tab切换事件
    $li.trigger('tabChange', index)
    $('.tabContent > li').eq(index).addClass('active')
    $('.tabContent > li').eq(index).siblings().removeClass('active')
  })
  //冒泡监听自定义事件
  $('.siteNav').on('tabChange', function(e, index) {
    if(index === 1) {
      $.get('./hot.json').then(function(response) {
        console.log(response)
      })
    } else if(index === 2) {
      $.get('./search.json').then(function(response) {
        console.log(response)
      }
    )}
  })
})
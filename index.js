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

  //点击nav，跳转页面
  $('.siteNav').on('click', 'ol.tabItems>li', function (e) {
    let $li = $(e.currentTarget)
    $li.addClass('active').siblings().removeClass('active')
    let index = $li.index()
    $('.tabContent > li').eq(index).addClass('active').siblings().removeClass('active')
    $li.trigger('tabChange', index)
  })

  //监听自定义tab切换事件
  $('.siteNav').on('tabChange', function (e, index) {
    let $li = $('.tabContent > li').eq(index)
    //检查该页面是否下载过
    if ($li.attr('data-downloaded') === 'yes') {
      return
    } else {
      setTimeout(function () {
        if (index === 1) {
          $.get('./hot.json').then(function (response) {
            $li.text(response.content)
            $li.attr('data-downloaded', 'yes')
          })
        } else if (index === 2) {
          return
          $.get('./search.json').then(function (response) {
            $li.text(response.content)
            $li.attr('data-downloaded', 'yes')
          })
        }
      }, 1000)
    }
  })

  let timer = null
  $('#searchSong').on('input', (e) => {
    //函数防抖处理
    if (timer) {
      clearTimeout(timer)
    }
    let $input = $(e.currentTarget)
    let inputValue = $input.val().trim()
    if (inputValue == '') {
      return
    }

    timer = setTimeout(() => {
      //调用搜索函数
      search(inputValue).then((result) => {
        timer = undefined
        console.log(result)
        if (result.length !== 0) {
          $('#output').text(result.map((r) => {
            return r.name
          }))
        } else {
          $('#output').text('搜索无结果')
        }
      })
    }, 300)
  })

  function mockSearch(keyword) {
    console.log('开始搜索' + 'keyword')
    return new Promise((resolve, reject) => {
      var database = [{
          "songid": 1,
          "name": "关于郑州的回忆",
        },
        {
          "songid": 2,
          "name": "梵高先生",
        },
        {
          "songid": 3,
          "name": "太平洋的风",
        }
      ]
      let result = database.filter((key) => {
        return key.name.indexOf(keyword) >= 0
      })
      setTimeout(() => {
        console.info('已经检索到' + keyword + "的结果！")
        //在异步操作成功时调用，将异步操作的结果，作为参数传递出去；
        resolve(result)
      }, (Math.random() * 1000)) //容易造成乱序bug
    })
  }
  window.search = mockSearch
})
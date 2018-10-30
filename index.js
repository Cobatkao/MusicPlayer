$(function () {
  
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
})
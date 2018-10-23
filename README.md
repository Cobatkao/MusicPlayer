# MusicPlayer

## 需求

页面部分共五张：

- 推荐音乐
- 热歌榜
- 搜索
- 音乐播放界面
- 推荐歌单详情页面

主界面包含：Tab切换
搜索界面：搜索功能（ajax）

## 拿图片技巧

开发者工具 -》application -》 images

让一个东西animation最好让他display：block

正确使用IDE的replace的正则规则

## lyric

1. 获取歌词文本，分段
2. 时间到了就会高亮对应歌词

## jq

- 创建元素
```javascript
$(function(){
var $h1=$(“<h1></h1>”);
$(“body”).append($h1);
})
```

`$('<div/>'`
 Its short cut to <div></div>.

 ```javascript
$('<div/>', {id: 'hello', 'class': 'new', html: 'New div'}).appendTo('#target');
 ```
 最简便写法。

 ⚠️，实践中比较骚的写法:创建并添加节点
 ```javascript
$('<p></p>', {'data-time': object.time, html: object.word}).appendTo($lyric)
 ```

 ## audio元素

例子

```html
  <audio src="http://m10.music.126.net/20181023202909/d24287a820fb0b5aa8a383276e8a0463/ymusic/92cf/af91/eb3d/c40ee3f9d91daba18f4c7537766d106d.mp3" controls
```

api

- when：当前播放时间
- duration：音频长度
- play：开始播放
- pause：暂停播放

事件

- onplay：播放时触发
- onpause：暂停时触发

## console对象

`cosnole.dir(audio)`可以查看audio对象的所有属性与方法 

## 经验&套路

1. 手机端不要使用fixed
2. 两个字之间的间距用`letter-spacing`

## bug

### 无法自动播放

报错信息：
`Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD`

chrome 66后，调audio.play必须在touchend, click, doubleclick或者是 keydown事件里面响应

解决办法：

## 细节

- 播放/暂停按钮控制音乐

1. 加两个按钮，分别是播放和暂停。用一个**类（playing）来切换**播放与暂停按钮的显示/隐藏，
2. 再在按钮上绑定播放/暂停事件，同时点击后再切换到另一个按钮显示。
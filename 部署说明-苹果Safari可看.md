# 部署说明：苹果 Safari 可直接打开

这个项目是纯静态 H5，不需要后端，也不需要科学上网浏览器。只要上传到一个国内能访问的静态网站空间，iPhone 自带 Safari 打开 HTTPS 链接就能看。

## 推荐部署方式

最稳的国内访问方案：

1. 腾讯云 COS 静态网站托管
2. 阿里云 OSS 静态网站托管
3. 又拍云 / 七牛云静态空间
4. 你自己的服务器 Nginx 静态目录

如果只是临时测试，也可以用 GitHub Pages、Vercel、Netlify，但在国内访问稳定性不如国内云。

## 需要上传的文件

上传整个文件夹里的这些内容：

```text
index.html
styles.css
script.js
assets/
```

不要只上传 `index.html`，否则照片、音乐和样式会丢。

## 音乐

把陈绮贞版本《太聪明》放到：

```text
assets/music/tai-cong-ming.mp3
```

iPhone Safari 不允许网页自动播放音乐，必须由用户点一下音乐按钮后播放。这是苹果浏览器规则，不是代码问题。

## 照片

照片在：

```text
assets/photos/
```

保持 `photo01.jpg`、`photo02.jpg` 这样的文件名，替换图片即可。

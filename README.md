# 恋爱时间胶囊

这是一个纯前端 H5 生日惊喜网站，入口文件是 `index.html`。

## 放到 GitHub 生成网址

1. 在 GitHub 新建仓库，比如 `love-time-capsule`。
2. 上传本项目里的文件：

```text
index.html
styles.css
script.js
assets/
.nojekyll
```

3. 打开仓库 `Settings` -> `Pages`。
4. `Source` 选择 `Deploy from a branch`。
5. `Branch` 选择 `main`，目录选择 `/root`。
6. 等 GitHub 生成网址，格式通常是：

```text
https://你的用户名.github.io/love-time-capsule/
```

注意：如果仓库是公开的，照片也可能被别人看到。想保护隐私，建议用私有部署平台或不要放太私密的照片。

## 把 GitHub 里的内容放进网页

如果 GitHub 仓库里有图片、音乐、文案或代码素材，建议下载后复制到本项目：

```text
assets/photos/
assets/music/
assets/github-content/
```

不要直接引用 `raw.githubusercontent.com` 的图片或音乐，因为国内和 iPhone Safari 访问可能不稳定。

## 电脑预览

双击 `打开预览.bat`。

## 手机预览

1. 双击 `手机预览-先运行这个.bat`。
2. 手机和电脑连接同一个 Wi-Fi。
3. 在电脑 PowerShell 运行 `ipconfig`，找到无线网卡的 IPv4 地址。
4. 手机浏览器打开 `http://你的IPv4地址:5173`。

## 替换音乐

把陈绮贞版本《太聪明》放到：

```text
assets/music/tai-cong-ming.mp3
```

## 替换照片

替换 `assets/photos` 里的图片，并保持 `photo01.jpg`、`photo02.jpg` 这种文件名即可。

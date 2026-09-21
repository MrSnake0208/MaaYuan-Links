# MaaYuan 官方入口

暖纸色、单列、自适应的官方链接聚合页。初始目录为空，因此采用原生 HTML / CSS / JavaScript，无第三方依赖。

## 本地运行

需要 Node.js 18 或更高版本，无须安装依赖。

```sh
npm run dev
npm run check
npm run build
```

预览地址为 http://127.0.0.1:4173。将 `dist/` 中的全部文件及 `assets/` 资源目录部署到静态托管根目录即可。域名与 HTTPS 由部署平台配置。

## 内容维护

- `app.js`：`linkGroups` 集中配置所有入口，统一渲染卡片。
- `styles.css`：配色、移动端布局、键盘焦点与减少动画支持。
- `index.html`：品牌区、页脚与 SEO 元信息。
- `scripts/site.mjs`：零依赖预览和静态文件打包。

## 品牌资源与随机 Logo

图片按用途统一整理，原始图片内容保持不变（原图只作母版留存，不参与部署）：

```text
assets/images/
  maayuan/            # 23 款顶部随机 Logo，480px 宽的 WebP 压缩版，参与部署
  links/              # 8 个入口的专用 Logo，统一英文小写文件名
design/source-images/maayuan/   # 23 款随机 Logo 的原始 1742×1700 PNG 母版，不参与部署
design/reference-logos/         # 未采用的 GitHub 对比图、QQ 海报，不参与部署
```

顶部 Logo 显示尺寸是 120×120，因此部署用的是 `sharp` 以 `-q 82`、宽度 480px（`--withoutEnlargement`，不做放大）生成的 WebP：23 张合计约 0.5 MB，而原始 PNG 合计约 8 MB。压缩后可见像素的 PSNR 约 38 dB、alpha 通道无损，在 120px 显示尺寸下与原图无法区分。母版始终保留在 `design/source-images/maayuan/`，需要更高画质时可以随时重新生成。

顶部每次打开或刷新页面，从 `app.js` 的 `logoVariants` 等概率随机选择一个；停留期间不切换，连续两次可能随机到相同款式。未启用 JavaScript 或顶部图片加载失败时，使用默认款 `maayuan-default.webp`。MaaYuan 卡片和 favicon 使用新提供的专用 `links/maayuan.png`。

新增随机款式时：把 `maayuan-款式名称.png` 母版放入 `design/source-images/maayuan/`，生成对应 WebP 到 `assets/images/maayuan/`，再在 `logoVariants` 中加入对应名称：

```sh
sharp -i design/source-images/maayuan/maayuan-款式名称.png \
  -o assets/images/maayuan/maayuan-款式名称.webp \
  -f webp -q 82 --autoOrient resize 480 --withoutEnlargement
```

新链接图标放入 `assets/images/links/`，更新链接配置的 `image`。预览和构建递归收集 `assets/images/` 中的 PNG/JPEG/WebP/SVG，添加文件后需重启预览服务；`npm run build` 会先清空 `dist/`，因此改名或删除的图片不会残留在部署产物里。

GitHub 使用原 `github01.jpg`，QQ 使用原 `QQ01.jpg`。对于含留白、文字或其他品牌的展示图，配置 `crop: [原图宽, 原图高, 左坐标, 顶坐标, 正方形边长]`，通过 CSS 仅显示图标区域，不修改原图。原 `github.jpg` 与 `QQ.jpg` 移入参考目录保存。YuanHub 使用官方品牌 Logo `links/yuanhub.png`，与 `https://hub.maayuan.com/brand/yuanhub-logo.png` 字节一致（正方形圆角、无留白），因此不需要 `crop`。

项目没有 ESLint 或 TypeScript 配置，`check` 执行 JavaScript 语法检查，不替代 lint 或 typecheck。

## GitHub 自动部署

`.github/workflows/gce_deploy.yml` 会在 `master` 分支 push 后构建并部署，也可以从 GitHub Actions 页面手动运行。部署过程：

1. `npm run check` 与 `npm run build` 生成 `dist/`。
2. 通过一条 SSH 流（`tar.gz`）把 `index.html`、`styles.css`、`app.js` 写入服务器的 `/var/www/maayuan-links`，压缩后约 6 KB。文件先解包到临时目录，校验后再改名替换，中途失败或被取消不会让站点缺文件。
3. `dist/assets/` 压缩后约 0.7 MB（图片压缩前约 8.5 MB），且只在新增或替换图片时变化：脚本对构建出的图片和服务器上正在使用的图片分别做内容哈希再比对，只有确实不同才整目录上传；上传同样先解包再改名替换，站点不会出现图片缺失窗口。
4. 校验入口文件与图片目录存在后才算部署成功。

因此日常只改文案时每次只传输约 6 KB，跨境链路拥塞时也能在秒级完成；新增或替换 `assets/images/` 里的图片会自动触发完整图片同步。需要强制重传全部图片时，在 Actions 页面手动运行并勾选 `force_assets`。job 设置了 `timeout-minutes: 20`，链路异常时会明确失败，而不是长时间挂起。

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中配置以下 Repository secrets：

```text
VPS_HOST_C       # 服务器地址或 IP
VPS_USER_C       # SSH 用户名
VPS_SSH_KEY_C    # 对应用户的 SSH 私钥（完整内容）
VPS_PORT_C       # 可选，SSH 端口，默认 22
```

部署脚本不调用 sudo，避免 GitHub Actions 因为没有终端而卡在 sudo 密码提示。首次部署前，请使用 SSH 登录服务器并手动执行一次下面的目录授权命令，把 `<SSH_USER>` 替换成 `VPS_USER_C` 的实际值：

```sh
sudo install -d -m 0755 /var/www/maayuan-links
sudo chown -R <SSH_USER>:<SSH_USER> /var/www/maayuan-links
```

之后 GitHub Actions 可以直接清理和写入该目录，不再需要 sudo。若仓库使用其他生产分支，将 workflow 中 `push.branches` 的 `master` 改为实际分支名；部署完成后由服务器现有的 Nginx 或其他 Web 服务指向 `/var/www/maayuan-links`。

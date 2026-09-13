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

图片按用途统一整理，原始图片内容保持不变：

```text
assets/images/
  maayuan/            # 23 款顶部随机 Logo
  links/              # 7 个入口的专用 Logo，统一英文小写文件名
design/reference-logos/ # 未采用的 GitHub 对比图、QQ 海报，不参与部署
```

顶部每次打开或刷新页面，从 `app.js` 的 `logoVariants` 等概率随机选择一个；停留期间不切换，连续两次可能随机到相同款式。未启用 JavaScript 或顶部图片加载失败时，使用默认款。MaaYuan 卡片和 favicon 使用新提供的专用 `links/maayuan.png`。

新增随机款式时，将 `maayuan-款式名称.png` 放入 `assets/images/maayuan/`，并在 `logoVariants` 中加入对应名称。新链接图标放入 `assets/images/links/`，更新链接配置的 `image`。预览和构建递归收集 `assets/images/` 中的 PNG/JPEG/WebP/SVG，添加文件后需重启预览服务。

GitHub 使用原 `github01.jpg`，QQ 使用原 `QQ01.jpg`。对于含留白、文字或其他品牌的展示图，配置 `crop: [原图宽, 原图高, 左坐标, 顶坐标, 正方形边长]`，通过 CSS 仅显示图标区域，不修改原图。原 `github.jpg` 与 `QQ.jpg` 移入参考目录保存。YuanHub 尚无专用资源，保留通用图标。

项目没有 ESLint 或 TypeScript 配置，`check` 执行 JavaScript 语法检查，不替代 lint 或 typecheck。

## GitHub 自动部署

`.github/workflows/gce_deploy.yml` 会在 `dev` 分支 push 后构建并部署，也可以从 GitHub Actions 页面手动运行。它沿用 MaaYuan Share 的 SSH/SCP 部署方式，将 `dist/` 上传到临时目录，再切换到服务器上的 `/var/www/maayuan-links`。

在 GitHub 仓库的 Settings → Secrets and variables → Actions 中配置以下 Repository secrets：

```text
VPS_HOST_C       # 服务器地址或 IP
VPS_USER_C       # SSH 用户名
VPS_SSH_KEY_C    # 对应用户的 SSH 私钥（完整内容）
```

服务器上的 SSH 用户需要能够执行 `sudo mkdir`、`sudo mv` 和 `sudo rm`，建议为这些命令配置免密码 sudo。若仓库使用其他生产分支，将 workflow 中 `push.branches` 的 `dev` 改为实际分支名；部署完成后由服务器现有的 Nginx 或其他 Web 服务指向 `/var/www/maayuan-links`。

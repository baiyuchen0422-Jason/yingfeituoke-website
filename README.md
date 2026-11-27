# yingfeituoke-website

合肥迎飞拓科技术有限公司（迎飞拓科 / YINGFEITUOKE）企业官网。使用原生 HTML、CSS 和 JavaScript，无框架、无构建、无外部资源依赖。

## 页面与文件结构

```text
index.html                    首页
about/index.html              关于我们、价值观、企业信息
technology/index.html         技术方向与研发理念
assets/css/style.css          公共样式、响应式布局、减少动画设置
assets/js/main.js             移动导航、键盘交互、自动版权年份
assets/images/logo.webp       用户提供的 Logo
assets/images/optical-ring.webp 首页光学主视觉
assets/images/light-space.webp 关于我们空间光影
assets/images/light-field.webp 技术页光场主视觉
favicon.svg                   浏览器图标
robots.txt                    搜索引擎抓取规则
sitemap.xml                   三页站点地图
.nojekyll                     直接发布静态文件
.gitignore                    忽略本机临时文件
README.md                     修改、发布与域名配置说明
```

正文以用户提供的《迎飞拓科_网站开发文案.md》为准。图片由用户提供，仅转换为 WebP 以减小体积；抽象空间与光学图片用于视觉表达，不代表实际办公场所、设备或产品。未添加产品型号、客户、认证、专利、邮箱或备案信息。

## 修改与本地预览

- 直接编辑对应页面 HTML 的标题和段落。每页保留一个 `h1`，同步修改该页的 `title`、`description` 和 Open Graph 标题、描述。
- 三页的页眉、页脚均为静态 HTML，修改公共内容时请同步三页。企业信息位于 `about/index.html`。
- 电话文本及链接统一为 `15397119585`、`tel:15397119585`。
- 版权年份由 `assets/js/main.js` 按访问者当前年份更新；JavaScript 不可用时显示 HTML 中的后备年份。禁用 JavaScript 时导航仍可访问。
- 替换图片时沿用相同文件名，或同步更新 HTML 的 `src`、`width` 和 `height`。
- 页面使用相对路径：根页面为 `./assets/...`，内页为 `../assets/...`。不要改为 `/assets/...`，以免 GitHub Pages 项目路径下资源失效。

在仓库目录运行以下命令，然后打开 <http://127.0.0.1:8000/>。Python 仅用于可选的本地预览，网站发布和访问不需要 Python。

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

## GitHub Pages 发布

现有仓库：<https://github.com/baiyuchen0422-Jason/yingfeituoke-website>。

1. 登录仓库所有者账户，打开 [Settings → Pages](https://github.com/baiyuchen0422-Jason/yingfeituoke-website/settings/pages)。
2. 在 **Build and deployment** 中选择 **Deploy from a branch**，Branch 选择 **main**，目录选择 **/(root)**，点击 **Save**。
3. 在 [Actions](https://github.com/baiyuchen0422-Jason/yingfeituoke-website/actions) 等待 `pages build and deployment` 成功，再访问默认地址：<https://baiyuchen0422-jason.github.io/yingfeituoke-website/>。
4. 验证首页、`about/`、`technology/`、图片、CSS、JavaScript 均正常后，再启用自定义域名。

后续向 `main` 提交文件会触发更新，无需运行构建命令或安装 npm 依赖。

**初次交付的发布状态（2026-11-27）：** 仓库原先仅有一行 README；检查时 `has_pages` 为 `false`，默认 Pages 地址返回 HTTP 404。当前 GitHub 插件能写代码但没有 Pages 设置接口，浏览器未登录 GitHub，因此尚未启用 Pages。代码上传、Pages 发布、DNS 生效为三个独立步骤，不可互相替代。当前未添加 `CNAME`，以便先验证默认 Pages 地址。

## yingfeituoke.com 与阿里云 DNS

仅使用 GitHub Pages 托管，阿里云管理域名与 DNS。以下配置根据 GitHub 与阿里云官方文档于 2026-11-27 核对。

### 启用域名的顺序

1. 先确认上述默认 Pages 地址能打开。
2. 在 [Pages 设置](https://github.com/baiyuchen0422-Jason/yingfeituoke-website/settings/pages) 的 **Custom domain** 填入 `yingfeituoke.com` 并保存。分支发布模式下，GitHub 会自动在 `main` 根目录提交 `CNAME` 文件，其内容应只有一行 `yingfeituoke.com`。本地也应同步这次提交，后续上传时保留该文件。
3. 打开 [阿里云云解析 DNS](https://dns.console.aliyun.com/)，进入 **公网权威解析 → yingfeituoke.com → 解析设置**，按下表填写，解析请求来源选“默认”，TTL 选 10 分钟（600 秒）。阿里云同一记录集合可填写多个 A 记录值；也可分别添加四条记录。
4. DNS 检查通过、证书签发后，在 Pages 设置勾选 **Enforce HTTPS**。验证 `https://yingfeituoke.com/` 和 `https://www.yingfeituoke.com/`；后者应转到主域名。DNS 和证书可能需要最多 24 小时。
5. 绑定成功后，将三个 HTML 的 `canonical`、`robots.txt` 的 Sitemap 地址及 `sitemap.xml` 的网址前缀从 `https://baiyuchen0422-jason.github.io/yingfeituoke-website/` 统一替换成 `https://yingfeituoke.com/`，提交至 `main`。导航和图片等相对路径无需改动。

### 必需解析记录

| 记录类型 | 主机记录 | 记录值 | 已有记录如何调整 |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | 若已有该值则保留；主域名用于本官网后，替换指向旧网站的 A 记录，并移除冲突的 CNAME/URL 转发 |
| A | @ | 185.199.109.153 | 同上；四个 A 值共同保留 |
| A | @ | 185.199.110.153 | 同上；四个 A 值共同保留 |
| A | @ | 185.199.111.153 | 同上；四个 A 值共同保留 |
| CNAME | www | baiyuchen0422-jason.github.io | 替换旧 www 的 A/AAAA/CNAME 或 URL 转发，保留一个上述 CNAME |

`www` 的记录值不含 `https://`，也不含仓库路径 `/yingfeituoke-website/`。不要添加 `*` 泛解析。不要修改无关的 MX、TXT 或其他子域名记录。

IPv6 可选；不配置不会妨碍网站使用。如已有 `@` 的 AAAA 指向其他服务，应删除或更新为以下四个 GitHub Pages 值：

```text
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

未连接阿里云账户，无法读取后台记录清单或直接修改 DNS。初次公开 DNS 查询未返回上述域名的有效记录；这不替代阿里云控制台中的实际配置检查。若域名 NS 未指向阿里云，需先确认域名使用阿里云的 DNS 托管。

可选增强：在 [GitHub 账户 Pages 设置](https://github.com/settings/pages) 验证域名所有权，并按该页面实际生成的主机记录和值添加 TXT。验证码与账户绑定，不能预先编造。

### 官方参考

- [GitHub：从分支发布 Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub：配置自定义域名、A/AAAA/CNAME 与 www 重定向](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub：HTTPS 与证书检查](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [阿里云：第一次配置网站解析](https://help.aliyun.com/zh/dns/getting-started-with-website-dns)
- [阿里云：添加解析记录](https://help.aliyun.com/zh/dns/pubz-add-parsing-record)

## 交付检查

- 三页在本地浏览器正常打开，独立标题、描述、单一 `h1`、正确当前导航。
- 桌面 1440px、平板 768px、手机 390px 和窄屏 320px 检查，无横向溢出，长地址自然换行。
- 移动菜单支持点击、Enter/Space、Esc；Esc 关闭后焦点返回按钮；点击菜单外部或焦点离开页眉会收起。
- 有“跳至主要内容”链接及可见键盘焦点；通过 `prefers-reduced-motion` 关闭过渡。
- 三页图片正常显示；样式与脚本均本地加载，浏览器控制台未发现错误。
- 企业名称、信用代码、地址、电话与附件核对一致。
- 公开网站的可访问性须在 Pages 启用后再次验证；本地检查不表示已上线。

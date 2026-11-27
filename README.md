# yingfeituoke-website

合肥迎飞拓科技术有限公司（迎飞拓科 / YINGFEITUOKE）企业官网。使用原生 HTML、CSS 和 JavaScript，无框架、无构建、无外部资源依赖。

## 页面与文件结构

```text
index.html                    首页
about/index.html              关于我们、价值观、企业信息
technology/index.html         技术方向与研发理念
insights/index.html           行业洞察列表（归档日期倒序）
insights/*/index.html         7 篇光学行业文章
news/index.html               公司新闻列表（示例内容）
news/*/index.html             9 篇员工动态示例
assets/css/editorial.css      列表、卡片和文章阅读样式
assets/images/industry/       行业文章 WebP 配图
assets/images/insights-hero.webp 行业洞察栏目背景
assets/images/news-hero.webp   公司新闻栏目背景
assets/images/originals/      本次 9 张 PNG 原图，网页不加载
assets/css/style.css          公共样式、响应式布局、减少动画设置
assets/js/main.js             移动导航、键盘交互、自动版权年份
assets/images/logo.webp       用户提供的 Logo
assets/images/optical-ring.webp 首页光学主视觉
assets/images/light-space.webp 关于我们空间光影
assets/images/light-field.webp 技术页光场主视觉
favicon.svg                   浏览器图标
robots.txt                    搜索引擎抓取规则
sitemap.xml                   全站 21 页站点地图
.nojekyll                     直接发布静态文件
.gitignore                    忽略本机临时文件
README.md                     修改、发布与域名配置说明
```

正文以用户提供的《迎飞拓科_网站开发文案.md》为准。图片由用户提供，仅转换为 WebP 以减小体积；抽象空间与光学图片用于视觉表达，不代表实际办公场所、设备或产品。未添加产品型号、客户、认证、专利、邮箱或备案信息。

## 修改与本地预览

- 直接编辑对应页面 HTML 的标题和段落。每页保留一个 `h1`，同步修改该页的 `title`、`description` 和 Open Graph 标题、描述。
- 全站页眉、页脚均为静态 HTML，修改公共导航或公司信息时请同步所有页面。企业信息位于 `about/index.html`。
- 电话文本及链接统一为 `15397119585`、`tel:15397119585`。
- 版权年份由 `assets/js/main.js` 按访问者当前年份更新；JavaScript 不可用时显示 HTML 中的后备年份。禁用 JavaScript 时导航仍可访问。
- 替换图片时沿用相同文件名，或同步更新 HTML 的 `src`、`width` 和 `height`。
- 页面使用相对路径：根页面为 `./assets/...`，栏目页为 `../assets/...`，文章详情页为 `../../assets/...`。不要改为 `/assets/...`，以免 GitHub Pages 项目路径下资源失效。

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

**发布配置（2026-11-27）：** 网站代码已通过连接的 GitHub 插件提交到现有仓库 `main`。Pages 已通过 GitHub 官方 CLI 配置为 `main / (root)`，默认域名启用 HTTPS。首次构建成功，三个页面与全部 CSS、JavaScript、图片、favicon、robots.txt、sitemap.xml 在线返回 HTTP 200，内容与本地版本逐字节一致；线上移动导航和控制台检查通过。代码上传、Pages 发布、DNS 生效为三个独立步骤，不可互相替代。之后用户已将自定义域名设为 `yingfeituoke.com`，仓库现有 `CNAME` 已保留。本次栏目更新沿用 `main / (root)`，不修改域名、DNS、HTTPS 或部署设置。2026-11-27 更新前查询域名仍返回 NXDOMAIN；Pages 构建状态与域名公网可访问性需要分别核实。

## yingfeituoke.com 与阿里云 DNS

仅使用 GitHub Pages 托管，阿里云管理域名与 DNS。以下配置根据 GitHub 与阿里云官方文档于 2026-11-27 核对。

### 启用域名的顺序

1. 先确认上述默认 Pages 地址能打开。
2. 在 [Pages 设置](https://github.com/baiyuchen0422-Jason/yingfeituoke-website/settings/pages) 的 **Custom domain** 填入 `yingfeituoke.com` 并保存。分支发布模式下，GitHub 会自动在 `main` 根目录提交 `CNAME` 文件，其内容应只有一行 `yingfeituoke.com`。本地也应同步这次提交，后续上传时保留该文件。
3. 打开 [阿里云云解析 DNS](https://dns.console.aliyun.com/)，进入 **公网权威解析 → yingfeituoke.com → 解析设置**，按下表填写，解析请求来源选“默认”，TTL 选 10 分钟（600 秒）。阿里云同一记录集合可填写多个 A 记录值；也可分别添加四条记录。
4. DNS 检查通过、证书签发后，在 Pages 设置勾选 **Enforce HTTPS**。验证 `https://yingfeituoke.com/` 和 `https://www.yingfeituoke.com/`；后者应转到主域名。DNS 和证书可能需要最多 24 小时。
5. 当前所有页面的 `canonical`、`robots.txt` 和站点地图已统一使用配置中的目标地址 `https://yingfeituoke.com/`。内部导航和图片仍使用相对路径，同时兼容项目子路径和域名根路径。

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

未连接阿里云账户，无法读取后台记录清单或直接修改 DNS。2026-11-27 公开 DNS 查询对 `yingfeituoke.com` 与 `www.yingfeituoke.com` 返回 `NXDOMAIN`（域名当前在公共 DNS 中不存在）。请先在阿里云核实该域名已注册、状态正常、域名拼写正确且 DNS 托管生效；该结果不能单独判断域名是否已购买。再按上表添加记录。不要在域名尚未就绪时提前切换 GitHub Pages 自定义域名，否则默认访问地址可能重定向至无法访问的域名。

可选增强：在 [GitHub 账户 Pages 设置](https://github.com/settings/pages) 验证域名所有权，并按该页面实际生成的主机记录和值添加 TXT。验证码与账户绑定，不能预先编造。

### 官方参考

- [GitHub：从分支发布 Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub：配置自定义域名、A/AAAA/CNAME 与 www 重定向](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub：HTTPS 与证书检查](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- [阿里云：第一次配置网站解析](https://help.aliyun.com/zh/dns/getting-started-with-website-dns)
- [阿里云：添加解析记录](https://help.aliyun.com/zh/dns/pubz-add-parsing-record)

## 原三页初次交付检查

- 三页在本地浏览器正常打开，独立标题、描述、单一 `h1`、正确当前导航。
- 桌面 1440px、平板 768px、手机 390px 和窄屏 320px 检查，无横向溢出，长地址自然换行。
- 移动菜单支持点击、Enter/Space、Esc；Esc 关闭后焦点返回按钮；点击菜单外部或焦点离开页眉会收起。
- 有“跳至主要内容”链接及可见键盘焦点；通过 `prefers-reduced-motion` 关闭过渡。
- 三页图片正常显示；样式与脚本均本地加载，浏览器控制台未发现错误。
- 企业名称、信用代码、地址、电话与附件核对一致。
- 初次发布时默认 GitHub Pages 地址已验证可访问。用户随后启用了自定义域名；当前应以域名 DNS 和证书实际状态为准。


## 行业洞察与公司新闻（2026-11-27 更新）

新增两类静态栏目，无后台、数据库或新增运行时依赖。所有 HTML 已生成并可直接由 Pages 托管。

### 内容维护与日期规则

- 行业文稿来自《迎飞拓科_行业博客7篇.md》，每篇正文 6 段，保留原文及段落；文章目录、关键词和编辑说明不作为正文发布。
- 文章详情页显示“归档日期”和“发布日期”。归档日期来自文稿，仅用于栏目排序；首次部署日期为 **2026-11-27**，`BlogPosting.datePublished` 使用该真实部署日期。日后修改文章只更新 `dateModified`，不随意更改首发日期。
- 行业列表按归档日期倒序，首页使用最近 3 篇。相邻文章中“上一篇”指较早归档文章，“下一篇”指较晚归档文章；首尾显示边界说明，不制造无效链接。
- 员工新闻来自《迎飞拓科_员工新闻9篇_示例稿.md》，每篇 2 段；按原稿顺序展示，不编造历史新闻日期。
- 首页新闻入口、新闻列表及每个详情页都有“示例内容”标识。人物、事件和奖励金额均为虚构示例；新闻页面不输出 `NewsArticle` 等真实新闻结构化数据。新闻标题与 meta description 同样包含示例提示。
- 修改文章时直接编辑对应 HTML；摘要同时用于列表卡片、meta description 与行业文章结构化数据，修改时保持一致。修改标题后也需同步相邻文章链接文本。新建文章时同步列表、导航与 `sitemap.xml`。
- 所有页面保留原有电话、自动版权年份、键盘焦点、跳至正文链接与减少动画设置。顶部导航和页脚均包含五个栏目。

### 文章路径

| 栏目 | 路径 | 内容 |
| --- | --- | --- |
| 行业洞察 | `insights/optical-system-design/` | 光学系统的协同设计 |
| 行业洞察 | `insights/compact-optical-design/` | 光学设备的小型化 |
| 行业洞察 | `insights/understanding-image-quality/` | 成像质量的关键维度 |
| 行业洞察 | `insights/coatings-and-stray-light/` | 镀膜与杂散光控制 |
| 行业洞察 | `insights/visible-and-infrared-imaging/` | 可见光与红外成像 |
| 行业洞察 | `insights/computational-imaging/` | 计算成像 |
| 行业洞察 | `insights/integrated-optical-sensing/` | 光学感知与空间信息融合 |
| 公司新闻 | `news/lost-wallet/` | 拾金不昧（示例） |
| 公司新闻 | `news/better-archives/` | 合理化建议（示例） |
| 公司新闻 | `news/careful-review/` | 认真核对（示例） |
| 公司新闻 | `news/optics-sharing/` | 光学知识交流（示例） |
| 公司新闻 | `news/new-colleague-exchange/` | 新员工交流（示例） |
| 公司新闻 | `news/fire-safety/` | 消防培训（示例） |
| 公司新闻 | `news/autumn-outing/` | 秋季团建（示例） |
| 公司新闻 | `news/birthday-gathering/` | 员工生日会（示例） |
| 公司新闻 | `news/badminton-friendly/` | 羽毛球友谊赛（示例） |

### 图片与原图

`assets/images/industry/` 的配图与文章路径同名。所有内容配图使用统一 16:9 比例和 `object-fit: cover`，仅通过浏览器裁切显示，不拉伸、不改色、不叠加图片文字。两张栏目背景的视觉主体位于右侧，左侧用于页面标题。

PNG 原图在 `assets/images/originals/` 下保留，文件名与 WebP 对应，图片原始字节未修改。原始素材目录 `迎飞拓科官网材料/` 留在本地，不整体上传或作为网站内容发布。

特别说明：素材文件夹中的“背景图/eea293b0…”实际为建筑与点云，应匹配空间感知文章；“每篇文章的图片/31c32f79…”实际为右侧光学弧面，应匹配行业洞察列表背景。以图像内容为准，已校正对应关系。

### 本次栏目更新检查

- 本地 21 个页面与关联静态资源共 61 个 URL 均返回 HTTP 200。
- 核对 473 处相对链接及资源引用；分别按域名根目录和 GitHub Pages 项目子路径解析，均可定位对应文件。
- 7 篇行业文章的 42 个正文段落、9 篇示例新闻的 18 个正文段落与提供文稿逐段一致。
- 原首页主视觉文案、关于我们及技术发展正文、公共交互脚本保留；9 张 PNG 与素材原件逐字节一致。
- 所有 21 页在 320px 手机宽度下无横向溢出；另检查 390px 手机、768px 平板、1440px 桌面布局。
- 浏览器验证移动菜单 Enter/Space 展开、Esc 收起并恢复焦点，以及新闻返回、文章上一篇/下一篇、图片延迟加载；控制台未见错误。
- sitemap 含全部 21 页，各页单一 h1、独立标题和描述、五项导航及当前栏目状态已核对。
- 上传后还需结合当次 Actions 部署状态核验公开访问；自定义域名的 DNS 故障与代码检查结果分别报告。

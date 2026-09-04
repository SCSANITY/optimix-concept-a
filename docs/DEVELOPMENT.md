# Concept A 开发现状与交接

维护者：开发主线。首次建立：2026-09-04。

本文件是 `concept-a` 工程事实、验证、部署依据与开发交接的主要记录位置。项目级背景、客户反馈和角色状态请读 WebA 外层的 `AGENTS.md`、`docs/PROJECT.md`、`docs/STATUS.md` 与 `docs/DECISIONS.md`。

## 1. 工程定位

`concept-a` 是独立 Git 仓库中的 Vite 多页面前端 Demo，用于确认视觉方向、信息架构、内容模型和交互方式。它不是正式 WordPress 站点，也不覆盖 WebA 外层的客户资料、项目管理和交付文件。

用户于 2026-09-04 再次说明“初代 Demo 已获甲方认可”，但没有给出逐页、逐功能或正式站范围的批准清单。因此当前只记录为阶段性、用户转述的客户认可，不能扩大解释为全部正式需求已确认。

## 2. 当前页面与功能范围

| 入口 | 当前已实现 | 模拟、限制或待完成 |
| --- | --- | --- |
| `index.html` | 全屏企业影片 Hero；产品/项目/证书三入口 Portfolio Stage；机场第三跑道 Featured Project；品牌滚动与指针动效 | Hero 使用客户影片的派生 loop；Featured Project 为单一精选案例，不是轮播或详情页；首页文案仍需最终客户审定 |
| `products.html` | 9 个产品类别名称；TA313、TA328、TG410E 三个明星产品；产品特点、应用图与原始 data sheet 下载 | 9 个类别目前是视觉索引，不可进入类别/产品详情；没有搜索、规格比较、完整产品数据库或 CMS |
| `projects.html` | 30 个项目卡片；All/Hong Kong/Mainland China 筛选；初始展示 6 个精选项目并可展开全部；案例集 PDF 下载 | 没有项目详情页、分页或后台；英文项目名在内容中明确标记为待客户批准的工作翻译 |
| `certifications.html` | 11 份证书，分为 5 个 credential family；证书首屏预览、签发方/持证实体/日期与 PDF 链接 | 没有后台更新、到期提醒或证书真实性接口；元数据仍需客户最终核对 |
| `company.html` | 公司简介、4 项 manufacturer facts、客户影片派生的生产设施静帧 | 只是精简介绍，不是完整企业历史、厂房/团队/联络地点体系 |

所有页面共同包含：响应式主导航、当前页状态、邮件/电话联络、内部页脚导航、移动菜单、滚动 reveal、品牌进度轨与无障碍减弱动效处理。

客服机器人是明确的 Demo 壳：本地预设 4 个 quick replies、约 720 ms 的打字反馈和统一 fallback；没有模型、知识库、人工客服、消息持久化、网络请求或后台。语言切换器也是占位显示，尚未实现繁中或其他语言路由。

`data/content.json` 中仍保留 `systems`、`systemsSection`、`downloadsSection`、`newsSection` 和 `news`；对应部分 partial/JavaScript 也存在，但当前五个 HTML 入口没有引入这些 section。下载与新闻数据中的旧站外链因此不是当前页面可见入口，不应把这些 dormant 数据描述成已上线功能。

## 3. 工程结构与技术约定

- `vite.config.js` 定义五个 HTML build inputs，并在构建/开发时递归展开 `<!-- @include ... -->`；线上没有客户端模板运行时。
- `data/content.json` 是当前页面内容模型的单一主要入口，ES module 在构建时导入它。
- `partials/` 保存语义结构和 CMS mapping 注释；`assets/js/sections/` 负责按页面元素存在与否初始化交互。
- `assets/css/main.css`、`tailwind.config.js` 保存设计 token、布局、响应式和动效；字体当前通过 Google Fonts 请求 Archivo 与 IBM Plex Sans。
- `public/` 中的媒体和 PDF 由 Vite 原样复制到 `dist/`；`assets/media/` 中的 Logo 由模块图处理。
- `base: './'` 使构建使用相对资源路径，适配 GitHub Pages 的仓库子路径。
- 各 HTML 入口均设置 `noindex, nofollow`，符合评审 Demo 定位，不是正式 SEO 配置。

本地命令与 PowerShell 兼容说明见 [README](../README.md) 和工程入口 [AGENTS.md](../AGENTS.md)。素材来源与转换限制见 [ASSET_PROVENANCE](ASSET_PROVENANCE.md)。

## 4. 内容模型与 WordPress 方向

现有映射方向仍有效，但仅代表可迁移的设计约定：

- 页面入口可映射到 `front-page.php`、页面模板或 archive；header/footer 对应主题公共模板。
- `project`、`product`、`credential` 适合 CPT；地区、产品类别和证书 family 适合 taxonomy；Hero、全局联络、首页精选和全局文案适合 ACF Options/field groups。
- `partials/sections/` 可成为 `template-parts/`；设计 token、CSS 与一部分原生交互可以复用。

它不代表正式迁移已经完成。正式站仍需把浏览器端 DOM 生成改为 PHP/WordPress 服务端渲染，建立字段 schema、URL/详情页、媒体管理、权限、输入验证、多语言、SEO、缓存、安全、表单/客服集成和编辑预览流程。正式站范围冻结前，不应为复用 Demo 代码而提前建立复杂抽象。

## 5. 素材、来源与 `shared/` 关系

当前运行与构建只引用 `concept-a/assets/` 和 `concept-a/public/`，不会直接读取外层 `shared/`。因此单纯的线上运行不依赖相对父目录；但 `shared/` 保留客户原件，是来源证明、重新导出和质量升级的依据，不能因“构建仍通过”就删除或迁移。

已核实的主要关系：

- 官方 Logo：`shared/assets/` 两个同内容文件与 `assets/media/optimix-logo-official.png` 的 SHA-256 一致。
- Hero：`shared/Hero01.mp4` 与网页 full-film copy 完全一致；首页另用 4.5 MB 派生 loop 和 poster。现有来源记录称供应文件约 967 × 544，正式站仍应索取获批的高分辨率 master。
- 产品：3 份 `shared/产品/` PDF 与 `public/documents/products/` 的重命名副本逐一同 hash；应用图为 PDF 派生预览，缺少可复现的页码/裁切 recipe。
- 证书：11 份 `shared/证书/` PDF 与公开下载副本逐一同 hash；网页预览为首屏 rasterisation。
- 项目：`shared/奧迪美_2022-2024+精選工程案例.pdf` 与公开 casebook copy 同 hash；30 张项目图由案例集派生，缺少原始高分辨率摄影。
- 公司设施图：从客户企业影片抽帧。`shared/202304+珠海祥邦環保建材生產基地.pdf` 当前未被 active page data 引用。

正式制作仍缺：高分辨率企业影片 master、产品与项目原图、批准的系统技术剖面图、完整产品内容/规格、正式多语言文本，以及客户对事实性数字、证书元数据和工作翻译的逐项确认。

## 6. 状态分层与本轮依据

### 已实现

以提交 `3744b218c463b669411c45a4bed4cd90ebbe8630`（`3744b21`，`Elevate homepage hero and portfolio stage`）为代码基线，源文件包含上述五入口、内容数据、媒体、交互与 GitHub Pages workflow。

### 本轮已验证（2026-09-04）

- 读取五个 HTML 入口、Vite 配置、内容 JSON、主要 partial/section JavaScript、素材记录和 Pages workflow。
- `git ls-remote --heads origin main` 返回 `3744b218...`，与本地 `main`/本地 `origin/main` 一致。
- GitHub Actions 显示提交 `3744b218...` 的 `Deploy GitHub Pages` run `32693912656` 于 2026-08-24 成功完成。
- 公开 URL `https://scsanity.github.io/optimix-concept-a/` 的五个页面在 2026-09-04 均返回 HTTP 200；首页返回构建资源 `main-Ca0Dj1kR.css` 与 `main-DNG6fVQZ.js`。
- 本机 Chrome headless 对五个公开页面执行真实 DOM 渲染，观察到：首页 3 个 gateway；Products 9 个类别和 3 个明星产品；Projects 30 个项目；Certifications 11 个文档入口；Company 4 个事实项；五页均渲染 chatbot shell。
- 对 Logo、Hero full film、3 份产品 PDF、11 份证书 PDF 和项目案例集的来源/网页副本执行 SHA-256 对比，结果一致。

本轮没有运行 `npm run build`、本地 dev server、全量视觉回归、真实移动设备测试、交互逐项回归、控制台审计、性能或无障碍审计。标准 `agent-browser` CLI 在当前环境不可用，线上渲染核查改用本机 Chrome headless；以上限制不得被改写为全面 QA 通过。

### 已部署

当前远端 `main` 与本地代码基线一致，历史 Pages workflow 已成功，且本轮重新核实公开五入口可访问并渲染预期内容。因此可以说“`3744b21` 当前可从公开预览访问”；部署发生于 2026-08-24，本轮只做 2026-09-04 的只读复核，没有重新部署。

### 客户已确认

唯一可稳妥记录的范围是：用户转述初代 Demo 获甲方认可。此前对话中的具体意见与用户对迭代的同意是设计输入或开发批准，不自动等于甲方逐项验收；正式站范围、内容、素材、功能和交付标准仍待明确。

## 7. Git 与未提交修改

- 实际仓库：`D:/SCSANITY/数字游民/Optimix/WebA/concept-a`
- 当前分支：`main`，跟踪 `origin/main`
- 当前主题代码基线：`6ad9fdd`（文档同步提交可能位于其后）
- 远端：`https://github.com/SCSANITY/optimix-concept-a.git`
- 2026-09-04 接入文档已提交为 `23991d7`（`Add project development documentation`）。外层 onboarding response 不属于此独立仓库。
- 同日主题色代码已提交为 `6ad9fdd`（`Lighten the deep blue theme`）。
- 两个提交均已推送至 `origin/main`；主题部署和线上复核依据见第 10 节。

当前 Codex 启动目录 `C:/Users/SCSANITY/Documents/Codex/2026-09-04/optimix-codex-d-scsanity-optimix-weba` 不是 Git 仓库，也不是上述仓库的已登记 worktree。后续开发应先确认正在操作的仓库根目录，避免把工作写进临时工作目录。

## 8. 外层文档与独立仓库的长期建议

最小可行方案：保持 `concept-a` 作为独立公开 Demo 仓库及现有 Pages 部署源；为 WebA 外层共同文档建立独立的私有版本管理，并排除 `concept-a/`、客户原件、大型媒体和交付导出文件。外层记录只引用 Demo remote、分支和已核实 commit，不复制工程事实。

此方案不改变 `concept-a/.git`、remote、workflow 或仓库名，对现有 Pages 没有部署影响。若未来需要固定关联，可在团队确实需要一键 clone 时再评估 Git submodule；当前用文档记录 commit 比引入 submodule 的操作成本更低。

不要现在把 Demo 强行改成 WebA monorepo。仓库合并或移动的前提至少包括：正式站技术/目录方案已确认；公开与私有资料边界、素材授权和大文件存储方式已确定；目标 remote、域名/Pages URL、历史保留方式和 CI working directory 已设计；迁移窗口内冻结发布；迁移后完成路由、相对资源、下载文件与公开 URL 回归。若正式站采用 WordPress，正式主题也可以建立新仓库，不必继承 Demo 的公开仓库边界。

## 9. 当前阶段、遗留问题与下一步

当前阶段是“获认可的前端 Demo 已恢复增量优化，正式站尚未启动”。Demo 代码没有本轮发现的阻塞；正式制作的主要前置条件是客户范围、内容和高质量素材，而不是继续堆叠原型功能。

优先下一步：

1. 由项目秘书汇总本盘点，并与用户确认客户实际认可范围、现场汇报目标及下一阶段是否仍是 Demo 优化。
2. 决定 WebA 外层文档的私有版本管理与备份方式；大型客户原件不要直接进入公开仓库。
3. 向客户索取 Hero 高分辨率 master、产品/项目原图和系统剖面图，并确认公开展示/下载授权。
4. 启动正式站前做一次 WordPress 内容建模工作坊，冻结 CPT、taxonomy、字段、详情页、语言、编辑流、客服和旧站迁移范围。
5. 若继续 Demo 开发，先处理客户新反馈与素材替换，再执行本地 build、桌面/移动视觉和关键交互回归；部署仍需用户单独授权。

给下一任开发主线的简短交接：先读外层共同入口和本文件；以 `3744b21` 为代码基线；保留本轮未提交文档；不要把 dormant section 当成可见功能；修改素材前查 provenance；任何代码工作开始前重新检查 Git、客户最新反馈和是否已有人编辑目标文件。

## 10. 2026-09-04 主题深蓝调整

用户确认将主题深蓝从 `#07324B` 调浅为 `#0B3D5A`。设计意图是减轻大面积深色区的黑重感，同时与亮品牌蓝 `#00609C` 保持明确层级；新色与白色的 WCAG 对比度约为 `11.48:1`。

实现范围：

- `tailwind.config.js` 的 `deep-blue` token。
- `assets/css/main.css` 中 5 个直接复写旧深蓝的实色或渐变端点，包括 gateway fallback、system viewport、product index gradient、chatbot trigger/base 和 chatbot header base。
- 品牌蓝、品牌红、正文 ink 均未修改；视频和图片上的半透明深色遮罩、阴影继续使用原值，以保持白字和影像层次。

本轮验证：

- `npm.cmd run build` 成功；Vite 8.2.1 构建五个 HTML 入口，输出 CSS `main-B5NKC4jM.css`、JS `main-CC1oiS_E.js`。
- 用本地 Vite preview 和浏览器检查桌面首页、证书页/内部 Hero、页脚、客服浮窗，以及 390 × 844 移动首页。
- 浏览器计算样式确认 Hero、内部 Hero、证书区、页脚及客服深色 base 为 `rgb(11, 61, 90)`；移动端标题未越界，页面未出现横向溢出；控制台 warning/error 为空。
- 本轮未修改内容、结构、资源或遮罩，未执行完整五页交互回归或真实设备测试。
- 提交与部署：`6ad9fdd` 已推送；GitHub Pages run `33873944321` 的 build/deploy 均于 2026-09-04 成功。
- 线上复核：公开站加载 `main-B5NKC4jM.css`；Hero、内部 Hero、证书区和页脚的计算背景均为 `rgb(11, 61, 90)`；证书页仍渲染 11 个文档入口；浏览器控制台 warning/error 为空。
- 状态：已实现、已本地验证、已提交、已推送、已部署；尚未获得客户确认。

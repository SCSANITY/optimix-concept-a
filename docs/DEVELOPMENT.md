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
| `products.html` | 具有固定 16:9 图片位的紧凑 10 大类产品目录；三列/两列/单列响应式；10 类均使用从 Optimix 旧站迁入本地的参考图 | 只有 Tiling、Waterproofing、Repairing 有客户技术资料并可进入；其余 7 类为结构预览；旧站图片仍需生产原图与授权确认 |
| `product-category.html?category=...` | 数据驱动类别页；Tiling、Waterproofing、Repairing 可用；按 product family 筛选并显示对应产品卡 | 查询参数路由仅服务静态 Demo；其余类别和完整产品线尚缺资料 |
| `product-detail.html?product=...` | TA313、TA328、TG410E、WP533、RM760 五款独立详情；packshot、用途、卖点、关键参数、PDF 和同类产品入口 | 参数是 data sheet 的精选摘要，完整 PDF 才是技术依据；正式 permalink、版本管理、关联证书/系统仍待 WordPress 实现 |
| `projects.html` | 31 个项目卡片；地区筛选与展开；北京大兴国际机场“航拍/材料到场/施工/完成面”专题；案例集 PDF 下载 | 大兴机场供应期、精确工程范围与图片推广授权待确认；没有项目详情页、分页或后台；英文名仍是工作翻译 |
| `certifications.html` | 11 份证书，分为 5 个 credential family；证书首屏预览、签发方/持证实体/日期与 PDF 链接 | 没有后台更新、到期提醒或证书真实性接口；元数据仍需客户最终核对 |
| `company.html` | 公司简介、4 项 manufacturer facts、客户影片派生设施静帧；数字已按新英文 brochure 更新 | brochure 事实与展示口径仍需客户审定；不是完整企业历史、厂房/团队/联络地点体系 |

所有页面共同包含：响应式主导航、当前页状态、邮件/电话联络、内部页脚导航、移动菜单、滚动 reveal、品牌进度轨与无障碍减弱动效处理。

客服机器人是明确的 Demo 壳：本地预设 4 个 quick replies、约 720 ms 的打字反馈和统一 fallback；没有模型、知识库、人工客服、消息持久化、网络请求或后台。语言切换器也是占位显示，尚未实现繁中或其他语言路由。

`data/content.json` 中仍保留 `systems`、`systemsSection`、`downloadsSection`、`newsSection` 和 `news`；对应部分 partial/JavaScript 也存在，但当前七个 HTML 入口没有引入这些 section。下载与新闻数据中的旧站外链因此不是当前页面可见入口，不应把这些 dormant 数据描述成已上线功能。

## 3. 工程结构与技术约定

- `vite.config.js` 定义七个 HTML build inputs，并在构建/开发时递归展开 `<!-- @include ... -->`；线上没有客户端模板运行时。
- `data/content.json` 是当前页面内容模型的单一主要入口，ES module 在构建时导入它。
- `partials/` 保存语义结构和 CMS mapping 注释；`assets/js/sections/` 负责按页面元素存在与否初始化交互。
- `assets/css/main.css`、`tailwind.config.js` 保存设计 token、布局、响应式和动效；字体当前通过 Google Fonts 请求 Archivo 与 IBM Plex Sans。
- `public/` 中的媒体和 PDF 由 Vite 原样复制到 `dist/`；`assets/media/` 中的 Logo 由模块图处理。
- `base: './'` 使构建使用相对资源路径，适配 GitHub Pages 的仓库子路径。
- 各 HTML 入口均设置 `noindex, nofollow`，符合评审 Demo 定位，不是正式 SEO 配置。

本地命令与 PowerShell 兼容说明见 [README](../README.md) 和工程入口 [AGENTS.md](../AGENTS.md)。素材来源与转换限制见 [ASSET_PROVENANCE](ASSET_PROVENANCE.md)。
项目级 sitemap、AI 助手边界、旧站技术比较和正式 WordPress/部署建议见 WebA 外层的 [`docs/SITE_ARCHITECTURE.md`](../../docs/SITE_ARCHITECTURE.md)。

## 4. 内容模型与 WordPress 方向

现有映射方向仍有效，但仅代表可迁移的设计约定：

- 页面入口可映射到 `front-page.php`、页面模板或 archive；header/footer 对应主题公共模板。
- `project`、`product`、`credential` 适合 CPT；地区、产品类别和证书 family 适合 taxonomy；产品类别采用可分层 taxonomy，使顶层应用类别下继续组织 product family；Hero、全局联络、首页精选和全局文案适合 ACF Options/field groups。
- `partials/sections/` 可成为 `template-parts/`；设计 token、CSS 与一部分原生交互可以复用。

它不代表正式迁移已经完成。正式站仍需把浏览器端 DOM 生成改为 PHP/WordPress 服务端渲染，建立字段 schema、URL/详情页、媒体管理、权限、输入验证、多语言、SEO、缓存、安全、表单/客服集成和编辑预览流程。正式站范围冻结前，不应为复用 Demo 代码而提前建立复杂抽象。

## 5. 素材、来源与 `shared/` 关系

当前运行与构建只引用 `concept-a/assets/` 和 `concept-a/public/`，不会直接读取外层 `shared/`。因此单纯的线上运行不依赖相对父目录；但 `shared/` 保留客户原件，是来源证明、重新导出和质量升级的依据，不能因“构建仍通过”就删除或迁移。

已核实的主要关系：

- 官方 Logo：`shared/assets/` 两个同内容文件与 `assets/media/optimix-logo-official.png` 的 SHA-256 一致。
- Hero：`shared/Hero01.mp4` 与网页 full-film copy 完全一致；首页另用 4.5 MB 派生 loop 和 poster。现有来源记录称供应文件约 967 × 544，正式站仍应索取获批的高分辨率 master。
- 产品：旧有 `shared/产品/` 与新 `shared/新增資料夾/新增資料夾/` 共同提供 TA313、TA328、TG410E、WP533、RM760 data sheet；运行目录现有 5 份 PDF。RM760/WP533 新副本及 TA313 新旧副本于 2026-09-16 核对同 hash。Packshot 与 10 类目录图来自 Optimix 官方旧站的本地副本，正式制作仍需原图和授权确认。
- 证书：11 份 `shared/证书/` PDF 与公开下载副本逐一同 hash；网页预览为首屏 rasterisation。
- 项目：`shared/奧迪美_2022-2024+精選工程案例.pdf` 与公开 casebook copy 同 hash；原 30 张项目图由案例集派生。新增北京大兴机场使用客户现场记录图的 5 份网页派生图；Hufton+Crow 与 VCG 图片因宣传授权缺失/不明而明确排除。
- 公司设施图：从客户企业影片抽帧。新 `OPTIMIX_Company_Brochure_English_Translation.docx` 支撑 2000 年成立、两处工厂、60 万吨综合年产能、120+ 配方和四项 ISO 管理体系口径；`shared/202304+珠海祥邦環保建材生產基地.pdf` 当前未被 active page data 引用。

正式制作仍缺：高分辨率企业影片 master、产品与项目原图、批准的系统技术剖面图、完整产品内容/规格、正式多语言文本，以及客户对事实性数字、证书元数据和工作翻译的逐项确认。

## 6. 2026-09-04 历史状态分层与依据

本节保留首次工程接入时的历史证据，已经被后续提交和本文件第 14 节的 2026-09-16 开发覆盖；不得把以下旧基线当作当前发布状态。

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

## 7. Git 与当前工作区

- 实际仓库：`D:/SCSANITY/数字游民/Optimix/WebA/concept-a`
- 当前分支：`main`，跟踪 `origin/main`
- 本轮开始时的已提交基线：`96b55ad`（`Record theme deployment`），本地 `HEAD` 与 `origin/main` 一致
- 当前功能发布提交：`fd068aa`（`Expand product catalogue and project proof`），已于 2026-09-16 推送并通过 GitHub Pages；其后的文档同步提交不改变构建页面功能。
- 远端：`https://github.com/SCSANITY/optimix-concept-a.git`
- 2026-09-04 接入文档已提交为 `23991d7`（`Add project development documentation`）。外层 onboarding response 不属于此独立仓库。
- 同日主题色代码已提交为 `6ad9fdd`（`Lighten the deep blue theme`）。
- 两个提交均已推送至 `origin/main`；主题部署和线上复核依据见第 10 节。
- 2026-09-07 至 2026-09-15 的 Product 信息架构、全局 Header、内部页背景和紧凑目录修改在本轮开始时仍未提交；2026-09-16 在保留这些修改的基础上继续加入产品资料、大兴机场案例、公司事实、详情页和工程文档，并统一收束为 `fd068aa`。远端与 Pages 依据记录在第 14 节。

当前 Codex 启动目录 `C:/Users/SCSANITY/Documents/Codex/2026-09-04/optimix-codex-d-scsanity-optimix-weba` 不是 Git 仓库，也不是上述仓库的已登记 worktree。后续开发应先确认正在操作的仓库根目录，避免把工作写进临时工作目录。

## 8. 外层文档与独立仓库的长期建议

最小可行方案：保持 `concept-a` 作为独立公开 Demo 仓库及现有 Pages 部署源；为 WebA 外层共同文档建立独立的私有版本管理，并排除 `concept-a/`、客户原件、大型媒体和交付导出文件。外层记录只引用 Demo remote、分支和已核实 commit，不复制工程事实。

此方案不改变 `concept-a/.git`、remote、workflow 或仓库名，对现有 Pages 没有部署影响。若未来需要固定关联，可在团队确实需要一键 clone 时再评估 Git submodule；当前用文档记录 commit 比引入 submodule 的操作成本更低。

不要现在把 Demo 强行改成 WebA monorepo。仓库合并或移动的前提至少包括：正式站技术/目录方案已确认；公开与私有资料边界、素材授权和大文件存储方式已确定；目标 remote、域名/Pages URL、历史保留方式和 CI working directory 已设计；迁移窗口内冻结发布；迁移后完成路由、相对资源、下载文件与公开 URL 回归。若正式站采用 WordPress，正式主题也可以建立新仓库，不必继承 Demo 的公开仓库边界。

## 9. 当前阶段、遗留问题与下一步

当前阶段是“前端 Demo 的核心产品层级与新客户资料接入；正式 WordPress 站尚未启动”。Product 目录、三个可用类别、五个产品详情和大兴机场专题已经完成本地实现与浏览器检查；等待本轮 GitHub Pages 发布及客户对内容/素材权利的复核。

优先下一步：

1. 由客户确认 10 个顶层类别、三款主力产品的定位及五个现有产品详情文字。
2. 索取官方旧站目录图/packshot 的原始文件和书面推广授权，并为其余 7 类补齐正式产品数据。
3. 确认北京大兴机场的供应期、Optimix 精确工程范围、中英文名和现场图推广权；继续排除 Hufton+Crow/VCG 受限图。
4. 冻结正式站 sitemap、多语言、旧 URL 重定向、WordPress CPT/taxonomy/字段、编辑流和托管边界。
5. AI 助手单独确认知识范围、免责声明、隐私、服务端与运营责任；不要把当前预设回复壳误认为已接入 AI。

给下一任开发主线的简短交接：先读外层共同入口和本文件；以 `96b55ad` 为已提交基线并保留第 13 节列出的未提交工作；先等待本轮视觉评审和客户图片，不要恢复双层 Product 导航或全屏巨幕卡片；不要把 dormant section 当成可见功能；修改素材前查 provenance；任何代码工作开始前重新检查 Git、客户最新反馈和是否已有人编辑目标文件。

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

## 11. 2026-09-04 Product 信息架构第一稿（已被第 12 节取代）

用户确认产品展示只参考旧站的浏览逻辑，不复制其 UI；当前 Demo 继续采用现代、技术化的视觉语言。开发主线只读核实旧站实际路径为“Products 大类总览 → 大类产品列表 → 单品详情”，并据现有客户资料纠正分类事实：TA313、TA328 属于 Tile Adhesive，TG410E 属于 Tile Grout，三者共同属于 Tiling，不应统称为 TA 系列。

本阶段实现：

- `products.html` 将原有平铺产品展示改为可交互的 Material Systems Navigator；Tiling 是唯一可进入类别，其他 8 类明确显示 `Content pending`，未使用来源不明的网图或虚构产品数据。
- 原 Product Category 蓝色索引保留在页面下方，并作为完整类别索引；Tiling 提供真实链接，待补类别不产生空链接。
- 新增 `product-category.html?category=tiling` 和对应 partial；可按 `All products / Tile Adhesive / Tile Grout` 筛选三款产品，data sheet 下载继续使用客户提供的现有文件。
- `data/content.json` 新增 category status、Tiling 类别字段、`productFamilies` 和产品 category/family 关联；此结构可映射为 WordPress `product` CPT 与分层 `product_category` taxonomy。
- Logo 固有 HTML 尺寸改为 81 × 54，并移除 Logo 自身的高度/位移动画和滚动缩小规则；导航栏背景与高度变化保留。浏览器计算样式确认 Logo 为 81 × 54、transition duration 为 0 秒。

本阶段验证：

- `npm.cmd run build` 成功，Vite 8.2.1 构建六个 HTML 入口；新增 `dist/product-category.html`。
- 本地 dev server 的六个入口均返回 HTTP 200。
- 浏览器核实 Products 总览、Tiling 跳转、三款产品渲染、Tile Grout 筛选只保留 TG410E、待补类别 CTA 无 href 且带 `aria-disabled=true`；未观察到 Vite 错误遮罩。
- 视觉检查覆盖 1265 px 桌面 Products/Category 页面，以及 Chrome headless 的 500 × 844 窄屏响应式布局；未使用真实移动设备，标准 `agent-browser` CLI 在此前工程盘点中已记录为不可用。
- `git diff --check` 无空白错误；命令只输出 Git 的 LF/CRLF 工作区提示。

该稿随后被用户否决，原因是 Products 页面重复呈现两层同级类别、主体模块过于收缩，以及页面切换时 Header/Logo 状态变化仍然突兀。相关事实只作为决策历史保留，不代表当前工作区界面；当前实现与状态以第 12 节为准。

## 12. 2026-09-07 Product 目录与全局 Header 修正

用户重新明确：旧站只提供“10 个顶层大类 → 类别产品 → 单品详情”的信息架构参考，视觉继续采用当前现代技术风格；Products 总览只能出现一组顶层类别；所有页面使用与首页一致的深色透明 Header；彻底移除页面切换时的 Header/Logo 状态动画。

本轮实现：

- 全部六个入口统一使用固定 80 px 高的深色玻璃 Header；Logo 固定为 81 × 54 的白底品牌签，不再随 Hero、滚动或页面状态改变尺寸、位置、背景或高度。`header.js` 已删除 Hero 判断、滚动监听和 `is-over-hero` 状态，相关 CSS 过渡和覆盖规则亦已清理。
- 内部页主体由纯白改为冷灰蓝底，并在 Products、Projects、Company 的主要内容区加入低对比度蓝色光晕/网格；白色只保留给需要内容分层的卡片，避免与暗色 Header 生硬断开。
- `products.html` 删除上一稿的 Material Systems Navigator 和页面底部重复索引，改为唯一一组全页面幅、两列交替色调的 10 类目录；窄于 900 px 时切为单列。Tiling 使用客户 PDF 派生的既有应用图并可进入类别页，其余 9 类没有伪造链接或网图。
- 顶层类别现为 Plastering、Tiling、Waterproofing、Grouting、Repairing、Flooring、Concreting、Emulsion、Eco Build、HKHA District Term Contract Solutions。类别卖点摘要由当前 Optimix 旧站内容提炼，已在界面和 CMS 注释中标为客户复核项，不能视为获批正式文案。
- 保留 `product-category.html?category=tiling`、两种产品 family、TA313/TA328/TG410E 三款已供资料产品和 PDF 下载。独立单品详情页仍未实现，留待本轮视觉方向确认后进行。
- 客服 Demo 的产品回复已同步由 9 类修正为 10 类。WordPress 映射仍是 `product` CPT + 分层 `product_category` taxonomy；查询参数只属于静态 Demo。

本轮验证（2026-09-07）：

- `npm.cmd run build` 成功，Vite 8.2.1 构建六个 HTML 入口并输出 `dist/product-category.html`。
- 本地 dev server 的首页、Products、Tiling Category、Projects、Certifications、Company 六个 URL 均返回 HTTP 200。
- Chrome headless 真实 DOM 渲染确认 Products 只有 10 个 `.product-directory-card`、恰有 1 个 Tiling 类别链接、旧 `product-atlas`/`data-product-index` 标记为 0；Tiling 类别页有 3 张产品卡和 3 个 family filter。
- 桌面视觉检查覆盖 1440 px 的首页、Products、Projects 和 Tiling Category；窄屏检查覆盖 500 px 的 Products 和 Tiling Category。共享 Header 在已抽查页面保持同一尺寸与位置，目录在 500 px 下为单列且未观察到横向溢出。
- `git diff --check` 无空白错误，仅有 Git 的 LF/CRLF 工作区提示。标准 `agent-browser` CLI 在本机不可用，因此使用本机 Chrome headless 回退；未做真实移动设备、完整控制台自动化、性能或无障碍审计，也未把保留未改的筛选交互重新声明为本轮全面验证通过。

该版本的信息层级与全局 Header 方向获用户认可，但用户于 2026-09-15 指出两列巨幕卡片占用空间过满，并要求缩小类别展示、明确预留图片位置。其部署状态不变，当前目录实现以第 13 节为准。

## 13. 2026-09-15 Product 紧凑媒体目录

用户确认沿用第 12 节的信息架构和网站视觉语言，但要求参考旧站较紧凑的多列展示节奏，并为每个顶层类别预留明确、尺寸一致的产品图片框；现阶段不使用网络图片，等待客户素材。

本轮实现：

- `products.html` 的目录由铺满屏幕的两列巨幕改为 `max-w-site` 内的三列卡片；1023 px 以下两列、639 px 以下单列。常规桌面卡约 384 × 517 px，不再与 Hero 争夺视觉强度。
- 每张类别卡无论有无素材都生成同一个 16:9 `.product-directory-card__media`。Tiling 继续使用现有客户 PDF 派生图，其余 9 类显示深蓝技术网格、框线标记和 `Approved product image pending`，没有引入网络图片或伪造品牌素材。
- 卡片正文改为中等标题、前三条核心卖点和固定底部状态/入口；完整卖点仍保留在 `data/content.json`，只是总览层控制信息密度。
- Tiling 保持唯一有效类别链接和红色可用状态；待补类别继续使用不可点击的 `article`，不会产生空详情页。
- 第十项 HKHA District Term Contract Solutions 在桌面端采用 1200 × 321 px 横向卡，解决三列目录的孤立尾卡和长标题问题；平板及移动端恢复普通卡形。
- 新增静态锚点 `#product-categories`，方便直接定位目录。类别图片仍由 taxonomy term 的 `imageUrl`/`imageAlt` 模型承接，后续填素材不需更改 DOM 结构。
- Products Hero、全站深色玻璃 Header、内部页背景及 Tiling 类别页没有在本轮重设计。

本轮验证（2026-09-15）：

- `npm.cmd run build` 成功，Vite 8.2.1 构建六个 HTML 入口。
- 本地 Products 返回 HTTP 200；真实 DOM 有 10 张类别卡、10 个媒体框、9 个缺图占位和 1 张现有实图，未出现 Vite error overlay。
- 浏览器在 1440 × 900 下计算为 3 × 384 px 列，常规卡约 384 × 517 px、媒体框约 383 × 215 px、HKHA 横卡约 1200 × 321 px；页面无横向溢出。
- 浏览器在 500 × 900 下计算为单列，常规及 HKHA 卡约 445 × 531 px、媒体框约 443 × 249 px；卡片顺序堆叠且无横向溢出。桌面和移动目录均完成滚动截图检查。
- 实际点击 Tiling 卡可进入 `product-category.html?category=tiling`；页面标题更新为 `Tiling Products — Optimix`、渲染 3 张产品卡，浏览器 warning/error 为 0。
- 标准 `agent-browser` CLI 仍不可用，本轮以本机 Chrome headless 和 Codex in-app browser 的 Playwright/可视滚动核验作为回退。未使用真实移动设备，也未进行性能或完整无障碍审计。

当前状态：已实现并完成上述本地验证；已提交基线仍为 `96b55ad`，本轮与第 12 节相关代码、内容及文档仍保留在工作区。尚未提交、推送、部署或获得客户确认，公开预览不包含本轮调整。下一步先由用户查看本地视觉；随后接收并逐类替换客户图片，再决定是否进入独立单品详情页。

## 14. 2026-09-16 新资料、产品详情与大兴机场专题

本轮在用户批准第 13 节目录方向后，接入 `shared/新增資料夾/` 的产品、公司与北京大兴国际机场资料，并把 2026-09-07 至 09-15 的未提交 Product/Header 工作一并收束。

实现结果：

- 10 个顶层类别全部获得固定 16:9 图像区和本地图片；结构及图片来自 Optimix 官方旧站，不使用运行时 hotlink。Tiling、Waterproofing、Repairing 标记为 documented range；另外 7 类仍是 structure preview。
- Tiling 现有 TA313、TA328、TG410E；Waterproofing 新增 WP533；Repairing 新增 RM760。类别页依据 query string 和 JSON 数据共用一个模板，并按 product family 生成筛选。
- 新增第七个入口 `product-detail.html?product=...`。五款产品均有独立详情；TA313、WP533、RM760 标记为旗舰，TA328/TG410E 保持补充产品。所有用途、参数和版本标签来自对应英文 data sheet 的摘要，页面明确提示原始 PDF 才是完整技术依据。
- 产品卡和详情改用官方旧站 packshot，白底图片作为技术样品板以 `object-fit: contain` 展示，没有强行裁切或铺成大背景。
- Projects 从 30 项增至 31 项。北京大兴国际机场新增大幅专题，串联航拍、SF878 到场、施工过程与完成面；卡片元数据允许供应期为空，不伪造日期。
- Hufton+Crow 的 32 张建筑摄影因随附条款禁止未经许可的宣传/营销使用而未接入；两张 VCG 图也因授权不明而排除。专题只使用客户现场记录图片的网页尺寸派生文件。
- Company 数据按英文 brochure 更新为：2000 年成立、东莞/珠海两处工厂、60 万吨综合年产能、120+ 干混砂浆配方，以及 ISO 9001/14001/45001/50001 管理体系。均待客户最终审定展示口径。
- 首页/项目页的项目数量由 30 更新为 31，首页 proof 编号改为数据驱动，避免以后新增项目仍写死总数。
- 外层新增 [`docs/SITE_ARCHITECTURE.md`](../../docs/SITE_ARCHITECTURE.md)，记录当前 sitemap、功能分区、WordPress 内容模型、未来 AI 助手、旧站技术观察、正式栈与部署建议。

本轮本地验证（2026-09-16）：

- `npm.cmd run build` 成功；Vite 8.2.1 构建七个 HTML 入口并输出 `dist/product-detail.html`。
- 本地 dev server 为 `http://127.0.0.1:4173/`。`agent-browser` 未在 PATH 中，使用 `npx.cmd --yes agent-browser` 0.37.1 完成相同流程。
- Home 和 Products 均有有效正文且无 Vite/Next/Webpack error overlay；Products DOM 显示 10 类，其中 3 类为可进入链接。
- Tiling、Waterproofing、Repairing 三个类别路由，以及 TA313、WP533、RM760 三个主力详情路由均加载正确标题、有效正文、0 张失败图片和 0 个错误遮罩；TA328/TG410E 由同一数据模板和 build output 覆盖。
- 桌面视觉检查覆盖 Product 目录、Tiling 产品卡、TA313 详情和大兴机场专题；390 × 844 检查 Product 目录、WP533 详情与大兴机场专题，Product 目录为单列，已检查页面无横向溢出。浏览器 `errors` 输出为空。
- RM760/WP533 公开 PDF 副本与新 supplied source 的 SHA-256 一致；TA313 新 source 与既有副本一致。5 张大兴机场网页图核实为 2400 × 1350、1800 × 1200、1800 × 1200、1800 × 1164、1800 × 1200，而客户原图未修改。

验证边界：未在真实手机上检查；未做完整无障碍、性能或 SEO 审计；旧站图片版权只做风险记录，不构成授权确认；大兴机场供应期/工程范围仍未知。本节记录的“本地通过”不等于已部署或客户确认。

部署与公开复核（2026-09-16）：

- 功能发布提交 `fd068aaf34143d9e57cb0483eab75da115e51215` 已推送到 `origin/main`。
- GitHub Actions `Deploy GitHub Pages` run `35016872566` 于 2026-09-16 03:59（Asia/Shanghai；GitHub 记录 2026-09-15 19:59 UTC）成功完成 build 与 deploy：`https://github.com/SCSANITY/optimix-concept-a/actions/runs/35016872566`。
- 公开 Home、Products、WP533 Detail 和 Projects 经 `agent-browser` 真实加载，标题正确、失败图片为 0、浏览器 errors 为空；Products 为 10 类/3 个可用链接，Projects 为 31 张卡并存在 Daxing feature。
- 公开 RM760 与 WP533 PDF 均返回 HTTP 200、`application/pdf`，字节数与本地发布副本一致。
- 公开预览：`https://scsanity.github.io/optimix-concept-a/`。该结果证明 `fd068aa` 已部署，不等于客户已确认本轮设计、文字或素材权利。

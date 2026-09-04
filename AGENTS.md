# Concept A 工程工作约定

本文件只补充 `concept-a` 的工程约定。项目级职责、事实归属、编辑边界与交接规则以 WebA 共同入口为准，不在这里复制维护。

## 开始工作前

1. 显式定位并完整读取 WebA 共同入口：`D:/SCSANITY/数字游民/Optimix/WebA/AGENTS.md`。
2. 继续读取外层 `docs/PROJECT.md`、`docs/STATUS.md`，以及任务指定的决策或任务文件。
3. 再读取本工程的 `README.md`、`docs/DEVELOPMENT.md` 和与任务有关的源码或素材记录。
4. 开始编辑前运行 `git status --short --branch`，重读目标文件，保留其他任务已经产生的修改。

不要假定 `../AGENTS.md` 在所有 worktree 或复制目录中都存在。若上述绝对入口因主机、挂载或目录变化不可访问，应先从用户或项目交接中明确一个可访问的 WebA 共同资料位置；不要自行创建另一套项目级规则。

## 工程定位与边界

- 本仓库是用于评审的前端 Demo，当前不是正式 WordPress 站点，也不是整个 Optimix 项目的资料边界。
- 初代 Demo 获得甲方认可属于用户转述的阶段结果；不得据此推断所有页面、内容、功能或正式站范围均已批准。
- 与用户沟通及工程记录使用中文；代码、代码注释、界面内容字段和技术标识沿用英文。
- 不编造客户事实，不生成或替换品牌资产。缺少图片、视频、技术图或内容时，应明确记录并向用户索取。
- `shared/` 位于 WebA 外层，是客户来源与再处理依据；运行时使用仓库内 `assets/` 和 `public/`。移动或重做素材前先查 `docs/ASSET_PROVENANCE.md` 与实际引用。

## 开发入口

- `data/content.json`：当前内容模型和页面数据的主要入口。
- `*.html`：五个 Vite 多页面入口；通过 `<!-- @include ... -->` 引入 `partials/`。
- `partials/`：固定语义结构与 WordPress 映射说明。
- `assets/js/sections/`：按 section 隔离的原生 JavaScript 行为。
- `assets/css/main.css` 与 `tailwind.config.js`：设计 token、排版、布局、响应式和动效。
- `public/`：构建时原样复制的网页媒体与可下载文档。

保持实现可平移到 WordPress 自定义主题：内容与结构分离，页面/组件边界清晰，交互不依赖复杂前端框架。现有 CMS 注释是迁移方向，不代表 PHP 模板、CPT、ACF、权限、SEO 或后台工作流已经完成。

## 本地命令

```bash
npm install
npm run dev
npm run build
npm run preview
```

Windows PowerShell 若因执行策略阻止 `npm.ps1`，使用等价的 `npm.cmd run dev`、`npm.cmd run build` 或 `npm.cmd run preview`；无需为本工程修改系统级执行策略。

## 验证与记录

- 代码、样式、内容模型或构建配置变更：至少运行 `npm run build`，并按影响范围验证相关页面、桌面/移动布局、关键交互、控制台和资源请求。
- 仅文档变更：无需机械运行构建；只做支撑文档结论所需的只读检查。
- 动效变更同时检查 `prefers-reduced-motion`；Hero 媒体同时考虑省流量/慢网络的 poster 回退。
- 五个页面入口、PDF 链接和相对资源路径是多页面部署的基本回归范围。
- 部署只有在用户明确要求时执行。当前流程为 `main` push 触发 GitHub Pages；推送、CI 成功、公开 URL 可访问和客户确认必须分别记录。
- 在 `docs/DEVELOPMENT.md` 记录检查日期、命令/依据、结果与限制；不要把旧构建或历史部署写成本轮验证通过。

## 交接维护

开发主线在阶段完成、技术决定变化、出现阻塞或长期角色交接时更新 `docs/DEVELOPMENT.md`。记录当前分支/提交、未提交修改、已执行验证、部署依据、遗留问题与下一步；外层总体状态和客户资料由项目秘书按共同规则汇总。

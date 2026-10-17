# 港险小象 · 录题后台

界面第一原则：App 与后台管理界面统一使用繁體中文；新增或修改用户可见文案时必须遵守此规范。

这个项目已经从“香港法律文化之旅”改造成港险题库与大纲维护后台，使用 Rails 管理员登录保护后台页面，题库快照保存在 PostgreSQL 的 `content_snapshots` 表中。

## 功能

- 卷一七章大纲、考试比重和多级节点维护
- 单选题、多选题、参考章节、选项、正确答案和解析录入
- 题目自动按参考章节归入大纲并显示章节统计
- 服务器端保存、JSON 快照导入/导出
- 卷一试题 1–927 已整理为 `db/content_q1_q50_questions.json`
- 卷二「一般保險」已加入 4 章大綱、考試比重（46%／34%／10%／10%）及 682 道模擬題，資料在 `db/content_q2_general_insurance.json`
- 卷一题目解析会自动归入对应大纲节点的 `contents`，每条内容保存关联题目 ID，供 App 显示一个或多个铃铛入口
- 后台以大纲为主：右键章节或节点可新建下级大纲、新建试题、关联已有试题或删除节点；删除节点会保留题目数据
- App 读取接口：`GET /api/v1/content?paper=保险原理及实务`
- 卷二读取接口：`GET /api/v1/content?paper=一般保險`

## 本地运行

准备 Ruby、Bundler、Node.js 和 PostgreSQL 后执行：

```bash
bundle install
npm install
bin/rails db:prepare
bin/rails db:seed
bin/dev
```

打开 `http://127.0.0.1:3000/admin`，使用已有管理员账户登录。

## 卷一 1–50 录题说明

首次初始化或后台导入时会载入 `db/content_q1_q50_questions.json`。
题型只有“单选题”和“多选题”；卷一原 PDF 的组合答案题统一录入为“多选题”，答案是在 A/B/C/D 中选择一个组合（例如 `i、iii、iv`）。
也可以在后台使用“导入 JSON 快照”手动载入，导入前建议先导出当前快照备份。

## 香港服务器部署

服务器需要配置 `DATABASE_URL`、`RAILS_MASTER_KEY` 和生产环境域名，然后执行数据库迁移、种子数据和资源构建。部署前请先配置 HTTPS、管理员密码和数据库备份策略。

详细清单见 [`docs/deploy-hong-kong.md`](docs/deploy-hong-kong.md)。

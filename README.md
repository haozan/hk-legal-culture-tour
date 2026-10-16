# 港险小象 · 录题后台

这个项目已经从“香港法律文化之旅”改造成港险题库与大纲维护后台，使用 Rails 管理员登录保护后台页面，题库快照保存在 PostgreSQL 的 `content_snapshots` 表中。

## 功能

- 卷一七章大纲、考试比重和多级节点维护
- 单选题、多选题、参考章节、选项、正确答案和解析录入
- 题目自动按参考章节归入大纲并显示章节统计
- 服务器端保存、JSON 快照导入/导出
- App 读取接口：`GET /api/v1/content?paper=保险原理及实务`

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

## 香港服务器部署

服务器需要配置 `DATABASE_URL`、`RAILS_MASTER_KEY` 和生产环境域名，然后执行数据库迁移、种子数据和资源构建。部署前请先配置 HTTPS、管理员密码和数据库备份策略。

详细清单见 [`docs/deploy-hong-kong.md`](docs/deploy-hong-kong.md)。

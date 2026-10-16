# 香港服务器部署清单

## 服务器建议

- 香港地区 Linux VPS，Ubuntu 24.04 LTS
- 2 vCPU、4 GB RAM、40 GB SSD 起步
- PostgreSQL 16；生产环境使用独立数据库或托管 PostgreSQL
- 域名解析到服务器，使用 HTTPS（Nginx + Let's Encrypt）

## 必填环境变量

```text
RAILS_ENV=production
RAILS_MASTER_KEY=...
SECRET_KEY_BASE=...
DATABASE_URL=postgresql://...
PUBLIC_HOST=https://你的域名
```

## Docker 部署

```bash
git clone <repository-url> hk-legal-culture-tour
cd hk-legal-culture-tour
docker build -t gangxian-admin .
docker run -d --name gangxian-admin --restart unless-stopped \
  --env-file .env.production \
  -p 3000:3000 gangxian-admin
```

容器启动时会执行 `db:prepare`。首次打开 `/admin` 时会自动初始化卷一题库快照；之后通过后台保存的数据写入 PostgreSQL。

## App 读取接口

```text
GET https://你的域名/api/v1/content?paper=保险原理及实务
```

上线前请配置数据库备份、服务器防火墙只开放 80/443/SSH，并把 SSH 改为密钥登录。

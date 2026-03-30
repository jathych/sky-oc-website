# OC World Website (Next.js Full-Stack Application)

A full-stack web application built with Next.js for managing and displaying original characters (OC), stories, and artworks.

## 🚀 Key Features

- Full-stack architecture (Next.js + API routes)  
- Authentication system (session + protected admin panel)  
- Content management system (artworks & stories)  
- File upload and data handling  
- Responsive UI with dynamic theming  

## 🛠️ Tech Stack

- Next.js, React, TypeScript  
- Tailwind CSS  
- API Routes  
- File handling & authentication  

---
## 📖 About This Project

This project also serves as a creative platform for original storytelling set in the *Sky: Children of the Light* universe.

👇 Scroll down to see the full world-building documentation and content structure (which is in Chinese).

———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

# 光遇世界 OC 网站

一个基于 Next.js 构建的原创角色（OC）展示网站，用于展示《光·遇》同人世界观下的原创故事、角色和画作。

## 📖 项目简介

本网站是一个完整的原创故事展示平台，讲述了光之子与暗之子两大阵营的故事。主要角色包括列何卫（箬笠）、艾米尔（公主）等，通过正剧、小剧场和番外等多种形式展现丰富的世界观。

### 核心特色

- 🎭 **角色展示系统** - 按阵营分类展示角色，支持详细信息页
- 📚 **多类型故事** - 正剧连载、小剧场短篇、番外故事
- 🎨 **画廊功能** - 网格/瀑布流双布局，支持标签和角色关联
- 🔍 **全站搜索** - 搜索角色和故事内容
- 🔧 **管理后台** - 可视化管理画作和小剧场，带密码保护
- 🔐 **安全认证** - 管理后台密码保护，会话管理，防止未授权访问
- 📤 **图片上传** - 拖拽上传图片，自动验证和保存
- ✍️ **小剧场管理** - 在线添加、编辑短篇日常互动片段
- 🎨 **主题定制** - 可自定义光明/黑暗阵营配色
- 📱 **响应式设计** - 完美适配移动端和桌面端

## 🏗️ 项目架构

```
oc-website/
│
├── app/                          # Next.js App Router 页面
│   ├── layout.tsx               # 根布局（包含导航和页脚）
│   ├── page.tsx                 # 首页（英雄区、特色角色、故事亮点）
│   ├── globals.css              # 全局样式
│   │
│   ├── characters/              # 角色模块
│   │   ├── page.tsx            # 角色列表页（按阵营分类）
│   │   └── [id]/
│   │       └── page.tsx        # 角色详情页
│   │
│   ├── artworks/                # 画廊模块
│   │   ├── page.tsx            # 画廊主页（网格/瀑布流切换）
│   │   └── [id]/
│   │       └── page.tsx        # 画作详情页
│   │
│   ├── scenes/                  # 小剧场模块
│   │   └── page.tsx            # 小剧场时间线展示页
│   │
│   ├── novel/                   # 正剧模块
│   │   ├── page.tsx            # 章节列表
│   │   └── [id]/
│   │       └── page.tsx        # 章节阅读页
│   │
│   ├── extras/                  # 番外模块
│   │   ├── page.tsx            # 番外列表页
│   │   └── [id]/
│   │       └── page.tsx        # 番外阅读页
│   │
│   ├── search/                  # 搜索模块
│   │   └── page.tsx            # 搜索结果页
│   │
│   ├── api/                     # API 路由
│   │   ├── artworks/
│   │   │   └── route.ts        # 画作 CRUD API
│   │   ├── scenes/
│   │   │   └── route.ts        # 小剧场 CRUD API
│   │   ├── upload/
│   │   │   └── route.ts        # 图片上传 API
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts    # 登录 API
│   │   │   └── logout/
│   │   │       └── route.ts    # 登出 API
│   │   └── theme/
│   │       └── route.ts        # 主题配置 API
│   │
│   └── admin/                   # 管理功能（需要登录）
│       ├── page.tsx            # 管理中心首页
│       ├── login/
│       │   └── page.tsx        # 登录页面
│       ├── artworks/
│       │   └── page.tsx        # 画作管理后台
│       ├── scenes/
│       │   └── page.tsx        # 小剧场管理后台
│       └── theme/
│           └── page.tsx        # 主题配色管理
│
├── components/                   # 可复用组件
│   ├── Navigation.tsx           # 顶部导航栏（含搜索功能）
│   ├── Footer.tsx               # 页脚组件
│   └── ImageUpload.tsx          # 图片上传组件
│
├── data/                         # 数据定义
│   ├── characters.ts            # 角色数据（5个角色）
│   ├── artworks.ts              # 画作数据加载器
│   ├── stories.ts               # 故事加载逻辑
│   └── stories.metadata.ts      # 故事元数据（小剧场和番外）
│
├── lib/                          # 工具函数
│   ├── content.ts               # 内容文件读取（支持 .txt 和 .docx）
│   ├── theme.ts                 # 主题管理工具
│   └── auth.ts                  # 认证工具函数
│
├── content/                      # 内容文件存储
│   ├── extras/                  # 番外文本文件
│   │   ├── 人鱼传说.txt
│   │   ├── 神女与她虔诚的信徒.txt
│   │   └── 小红狼与大灰帽.txt
│   └── 正剧.txt                 # 正剧全文（自动提取章节）
│
├── config/                       # 配置文件
│   ├── artworks.config.json     # 画作数据配置
│   ├── scenes.config.json       # 小剧场数据配置
│   └── theme.config.json        # 主题配色配置
│
├── public/                       # 静态资源
│   └── images/
│       ├── characters/          # 角色图片
│       │   ├── liehewei.jpg
│       │   ├── amir.jpg
│       │   ├── baixiao.jpg
│       │   ├── chenpu.jpg
│       │   └── fangzheng.jpg
│       └── artworks/            # 画作图片（支持自动上传）
│           └── mermaid-legend.jpg
│
├── middleware.ts                 # 路由保护中间件
├── .env.local                    # 环境变量配置（需手动创建）
├── tailwind.config.ts           # Tailwind 配置（自定义配色）
├── tsconfig.json                # TypeScript 配置
├── package.json                 # 项目依赖
└── README.md                    # 项目说明文档
```

## 🚀 快速开始

### 环境要求

- Node.js 20.x 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
cd oc-website
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
# 复制 .env.local 文件并修改密码
# 编辑 .env.local 文件，设置管理员密码和会话密钥
```

在 `.env.local` 文件中设置：
```env
ADMIN_PASSWORD=your_secure_password
SESSION_SECRET=random_32_char_string
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **访问网站**
打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 其他命令

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 📝 内容管理指南

### 添加新角色

编辑 `data/characters.ts` 文件，在 `characters` 数组中添加新对象：

```typescript
{
  id: 'character-id',           // 唯一标识符
  name: '角色名',               // 角色名称
  nickname: '昵称',             // 可选：角色昵称
  faction: 'light',             // 阵营：'light' | 'dark' | 'neutral'
  image: '/images/characters/filename.jpg',  // 角色图片路径
  description: '角色简介',
  details: {
    age: '年龄',
    occupation: '职业',
    personality: '性格特点',
    background: '背景故事'
  }
}
```

将角色图片放入 `public/images/characters/` 目录。

### 添加小剧场（推荐使用管理后台）

**小剧场说明**：小剧场是现代平行世界中的短小日常互动片段，没有标题，只有内容。适合记录角色们的趣味瞬间。

**方法一：使用管理后台（推荐）**

1. 登录管理后台：访问 `/admin/login` 并输入密码
2. 进入小剧场管理页面：`/admin/scenes`
3. 在管理页面填写表单：
   - **内容**：输入小剧场内容（支持多行文本，直接按回车换行）
   - **创建日期**：选择日期
   - **关联角色**：可选，勾选相关角色
   - **标签**：可选，用逗号分隔（例如：现代AU, 校园, 日常）
4. 点击"添加小剧场"按钮
5. ID会自动生成（格式：scene-YYYYMMDD-序号）
6. 修改立即生效，无需重启服务器

**方法二：手动编辑配置文件**

编辑 `config/scenes.config.json` 文件，添加：

```json
{
  "id": "scene-20260122-001",
  "content": "某课间箬笠默默路过公主和同学表演的舞台\n箬笠默默走过\n假装根本不认识\n然后往回走假装有事回头（箬笠欣赏）",
  "createdDate": "2026-01-22",
  "relatedCharacters": ["liehewei", "princess"],
  "tags": ["现代AU", "校园", "日常"]
}
```

**注意**：
- 小剧场内容使用 `\n` 表示换行
- 小剧场没有标题，只有内容
- 会按时间倒序显示在时间线上

### 添加番外故事

番外故事是完整的长篇故事，需要创建文本文件。

1. **创建内容文件**
   - 在 `content/extras/` 目录下创建 `.txt` 或 `.docx` 文件
   - 文件名即为故事标题

2. **注册元数据**
   编辑 `data/stories.metadata.ts`，在 `extrasMetadata` 数组中添加：
   ```typescript
   {
     id: 'extra-story-id',
     title: '故事标题',
     type: 'extra',
     description: '故事简介',
     contentFile: '文件名.txt'
   }
   ```

### 添加画作（推荐使用管理后台）

**方法一：使用管理后台（推荐）**

1. 登录管理后台：访问 `/admin/login` 并输入密码
2. 进入画作管理页面：`/admin/artworks`
3. 在管理页面填写表单：
   - 画作ID（唯一标识符）
   - 标题和描述
   - **上传图片**：拖拽图片到上传区域或点击选择文件
   - 创建日期
   - 可选：关联角色、添加标签
4. 点击"添加画作"按钮
5. 图片会自动上传到 `public/images/artworks/` 目录

**方法二：手动编辑配置文件**

编辑 `config/artworks.config.json` 文件，添加：

```json
{
  "id": "artwork-id",
  "title": "画作标题",
  "description": "画作描述",
  "image": "/images/artworks/filename.jpg",
  "createdDate": "2024-01-01",
  "relatedCharacters": ["character-id"],
  "tags": ["标签1", "标签2"]
}
```

手动上传图片到 `public/images/artworks/` 目录。

### 更新正剧内容

直接编辑 `content/正剧.txt` 文件，系统会自动识别章节：

```
第一章 章节标题

章节内容...

第二章 另一个标题

章节内容...
```

章节格式：`第X章` 或 `第X回` 开头的行会被识别为新章节。

## 🔧 管理后台

本项目提供了便捷的管理后台，带有密码保护，确保只有创作者可以管理内容。

### 🔐 安全认证

管理后台使用密码保护，首次使用前需要配置：

1. **设置管理员密码**
   编辑 `.env.local` 文件：
   ```env
   ADMIN_PASSWORD=your_secure_password
   SESSION_SECRET=random_32_char_string_or_longer
   ```

2. **登录管理后台**
   - 访问首页底部的"管理入口"链接，或直接访问 `/admin/login`
   - 输入在 `.env.local` 中设置的密码
   - 登录后会话有效期为 24 小时
   - 点击右上角"登出"按钮可退出登录

**安全特性**：
- ✅ HTTP-only cookies 防止 XSS 攻击
- ✅ 会话 token 签名验证防止伪造
- ✅ 24 小时自动过期
- ✅ 登录速率限制（5次/分钟）
- ✅ 所有管理页面和 API 受保护

### 管理中心

**访问地址**: `/admin`（需要登录）

登录后会看到管理中心，提供以下功能入口：
- 📸 **画廊管理** - 管理画作作品
- ✍️ **小剧场管理** - 管理日常互动片段
- 🎨 **主题管理** - 自定义配色方案

### 画作管理

**访问地址**: `/admin/artworks`（需要登录）

**功能**:
- ✅ 添加新画作 - 通过表单快速添加
- ✅ 图片上传 - 拖拽或点击上传图片（支持 JPG/PNG/WEBP，最大 5MB）
- ✅ 编辑画作 - 修改现有画作信息
- ✅ 删除画作 - 一键删除
- ✅ 实时预览 - 查看所有画作缩略图和上传的图片预览
- ✅ 角色关联 - 多选框选择关联角色
- ✅ 标签管理 - 逗号分隔输入标签

**使用步骤**:
1. 访问 `/admin/login` 并使用密码登录
2. 在管理中心选择"画廊管理"或直接访问 `/admin/artworks`
3. 填写画作信息：
   - 画作ID（唯一标识符，例如：artwork-1）
   - 标题和描述
   - **图片上传**：拖拽图片到上传区域或点击选择文件
   - 创建日期
   - 可选：关联角色、添加标签
4. 点击"添加画作"按钮
5. 修改立即生效，无需重启服务器

**图片上传功能**：
- 支持拖拽上传或点击选择
- 自动验证文件类型（JPG/PNG/WEBP）和大小（最大 5MB）
- 实时预览上传的图片
- 自动保存到 `public/images/artworks/` 目录
- 文件名自动添加时间戳防止冲突
- 也可以手动输入图片路径作为备用方式

### 小剧场管理

**访问地址**: `/admin/scenes`（需要登录）

**功能**:
- ✅ 添加新小剧场 - 快速添加短篇互动片段
- ✅ 编辑小剧场 - 修改现有内容
- ✅ 删除小剧场 - 一键删除
- ✅ 多行文本输入 - 支持换行和长文本
- ✅ 角色关联 - 多选框选择关联角色
- ✅ 标签管理 - 逗号分隔输入标签
- ✅ 自动生成ID - 格式：scene-YYYYMMDD-序号

**使用步骤**:
1. 访问 `/admin/login` 并使用密码登录
2. 在管理中心选择"小剧场管理"或直接访问 `/admin/scenes`
3. 填写小剧场信息：
   - **内容**：输入小剧场内容（支持多行，直接按回车换行）
   - **创建日期**：选择日期
   - **关联角色**：可选，勾选相关角色
   - **标签**：可选，用逗号分隔（例如：现代AU, 校园, 日常）
4. 点击"添加小剧场"按钮
5. 修改立即生效，无需重启服务器

**小剧场特点**：
- 没有标题，只有内容
- 适合记录短小的日常互动片段
- 在前台以时间线形式展示
- 按时间倒序排列（最新的在最上面）

### 主题管理

**访问地址**: `/admin/theme`

**功能**:
- 自定义光明/黑暗阵营配色
- 调整中性色配色
- 修改渐变效果
- 编辑网站元信息

配置保存在 `config/theme.config.json`，修改后需重启开发服务器。

## 🎨 主题定制

访问 `/admin/theme` 页面可以自定义配色方案：

- **光明阵营配色** - 温暖明亮的色调
- **黑暗阵营配色** - 神秘深邃的色调
- **中性色配色** - 文字、边框、背景等

配置保存在 `config/theme.config.json`，修改后需重启开发服务器。

## 🛠️ 技术栈

- **框架**: Next.js 16.1.1 (App Router)
- **UI 库**: React 19.2.3
- **样式**: Tailwind CSS 4
- **语言**: TypeScript 5
- **内容处理**: mammoth (支持 .docx 文件)
- **部署**: 支持 Vercel、Netlify 等平台

## 📂 数据结构说明

### Character（角色）
```typescript
interface Character {
  id: string;                    // 唯一标识
  name: string;                  // 角色名
  nickname?: string;             // 昵称
  faction: 'light' | 'dark' | 'neutral';  // 阵营
  image: string;                 // 图片路径
  description: string;           // 简介
  details: {                     // 详细信息
    age?: string;
    occupation?: string;
    personality?: string;
    background?: string;
  };
}
```

### Artwork（画作）
```typescript
interface Artwork {
  id: string;                    // 唯一标识
  title: string;                 // 标题
  description: string;           // 描述
  image: string;                 // 图片路径
  createdDate: string;           // 创建日期 (YYYY-MM-DD)
  relatedCharacters?: string[];  // 关联角色ID数组
  tags?: string[];               // 标签数组
}
```

### StoryMetadata（故事元数据）
```typescript
interface StoryMetadata {
  id: string;                    // 唯一标识
  title: string;                 // 标题
  type: 'scene' | 'extra' | 'main';  // 类型
  order?: number;                // 排序（用于章节）
  description: string;           // 描述
  contentFile?: string;          // 内容文件路径
  publishDate?: string;          // 发布日期
}
```

## 🌟 功能特性详解

### 1. 自动章节提取
正剧文件会自动解析章节，无需手动分割文件。系统识别以下格式：
- `第一章 标题`
- `第1章 标题`
- `第一回 标题`

### 2. 内容文件支持
- `.txt` 文件：直接读取纯文本
- `.docx` 文件：通过 mammoth 库转换为 HTML

### 3. 搜索功能
支持搜索：
- 角色名称和描述
- 故事标题和内容
- 实时搜索结果展示

### 4. 响应式布局
- 移动端：单列布局，汉堡菜单
- 平板：双列布局
- 桌面：多列布局，完整导航

## 📄 许可证

本项目为个人创作项目，仅供学习和展示使用。

## 🤝 贡献

欢迎提出建议和改进意见！

---

**作者**: Jathy
**创建时间**: 2024
**最后更新**: 2026-01-22

## 🔒 安全说明

- `.env.local` 文件包含敏感信息，已被 `.gitignore` 排除，不会提交到代码库
- 请妥善保管管理员密码，不要分享给他人
- 建议使用强密码（至少 12 位，包含字母、数字和特殊字符）
- 会话 token 使用 HMAC-SHA256 签名，防止伪造
- 所有管理 API 都受中间件保护，未登录无法访问

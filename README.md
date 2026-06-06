# 📝 我的待办 · 全栈 Todo 应用

一个简洁美观、前后端分离的待办事项（Todo List）应用。前端用 **React + TypeScript** 打造现代化界面，后端用 **Python Flask + SQLite** 提供 REST API，数据持久化保存。

> 一个适合学习全栈开发的小项目：涵盖前端组件化、TypeScript 类型、REST API 设计、SQLite 持久化与开发代理等常见实践。

---

## ✨ 功能特性

- ✅ **增删改查**：添加、完成/取消、编辑、删除待办
- ✍️ **双击编辑**：双击任意待办即可就地修改，回车保存、Esc 取消
- 🔀 **拖拽排序**：按住拖动调整顺序，结果自动保存到后端
- ⌨️ **回车快捷添加**：输入内容后直接回车即可新增
- 🔖 **状态筛选**：全部 / 进行中 / 已完成 三种视图
- 🧹 **一键清除**：批量删除所有已完成项
- 📊 **实时统计**：底部显示进行中 / 已完成数量
- 🎨 **精致界面**：渐变背景、毛玻璃卡片、圆形勾选框、过渡动画
- 🌙 **深色模式**：自动跟随系统主题

---

## 🛠️ 技术栈

| 层 | 技术 |
|----|------|
| 前端 | React 19 · TypeScript · Vite |
| 后端 | Python · Flask · Flask-CORS |
| 数据库 | SQLite |

---

## 📂 项目结构

```
CCfirst/
├── backend/                  后端（Flask + SQLite）
│   ├── app.py                REST API 与数据库逻辑
│   ├── requirements.txt      Python 依赖
│   └── todos.db              SQLite 数据库（运行时自动生成）
├── frontend/                 前端（React + TypeScript）
│   └── src/
│       ├── api.ts            后端接口调用封装
│       ├── types.ts          Todo 类型定义
│       ├── App.tsx           主界面与状态逻辑
│       ├── App.css           界面样式
│       └── components/       组件
│           ├── AddTodo.tsx   添加输入框
│           ├── TodoList.tsx  列表容器
│           └── TodoItem.tsx  单条待办（含编辑、拖拽）
└── README.md
```

---

## 🚀 快速开始

需要先安装 [Node.js](https://nodejs.org/)（18+）和 [Python](https://www.python.org/)（3.10+）。

启动时请开 **两个终端**，分别运行后端和前端。

### 1️⃣ 启动后端（Flask · 端口 5000）

```powershell
cd backend

# 首次运行：创建虚拟环境并安装依赖
python -m venv venv
./venv/Scripts/python.exe -m pip install -r requirements.txt

# 启动服务
./venv/Scripts/python.exe app.py
```

后端运行在 **http://127.0.0.1:5000**，首次启动会自动创建 `todos.db`。

> macOS / Linux 用户把 `./venv/Scripts/python.exe` 换成 `./venv/bin/python` 即可。

### 2️⃣ 启动前端（Vite · 端口 5173）

```powershell
cd frontend

npm install      # 首次运行
npm run dev
```

浏览器打开 **http://localhost:5173** 即可使用。

> 开发环境下 Vite 会把 `/api/*` 请求自动代理到后端，无需关心跨域问题。

---

## 📡 API 接口

所有接口前缀为 `/api/todos`，请求/响应均为 JSON。

| 方法 | 路径 | 说明 |
|------|------|------|
| `GET` | `/api/todos` | 获取所有待办（按自定义顺序排列） |
| `POST` | `/api/todos` | 新建待办，body：`{ "title": "..." }` |
| `PUT` | `/api/todos/<id>` | 更新待办标题或完成状态 |
| `DELETE` | `/api/todos/<id>` | 删除指定待办 |
| `PUT` | `/api/todos/reorder` | 保存拖拽排序，body：`{ "ids": [3, 1, 2] }` |

**待办对象示例：**

```json
{
  "id": 1,
  "title": "学习 Claude Code",
  "completed": false,
  "created_at": "2026-06-06 08:04:40"
}
```

---

## 💡 使用技巧

- **添加**：在输入框输入内容，按回车或点击 ＋ 按钮
- **完成**：点击左侧圆形勾选框
- **编辑**：双击待办文字，修改后回车保存（Esc 取消）
- **排序**：在「全部」视图下按住待办上下拖动
- **删除**：把鼠标移到待办上，点击右侧 ✕

---

## 📄 许可证

本项目仅供学习与演示使用。

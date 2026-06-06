# Todo List — 全栈示例

一个简单的全栈 Todo 应用：

- **前端**：React + TypeScript（Vite 构建）
- **后端**：Python Flask + SQLite（REST API）

```
CCfirst/
├── backend/      Flask REST API（/api/todos 的增删改查）
└── frontend/     React + TypeScript 界面
```

## 运行方式

需要开**两个终端**，分别启动后端和前端。

### 1. 启动后端（Flask，端口 5000）

```powershell
cd backend
python -m venv venv               # 首次需要
./venv/Scripts/python.exe -m pip install -r requirements.txt   # 首次需要
./venv/Scripts/python.exe app.py
```

后端运行在 http://127.0.0.1:5000 ，首次启动会自动创建 `todos.db`。

### 2. 启动前端（Vite，端口 5173）

```powershell
cd frontend
npm install                       # 首次需要
npm run dev
```

打开浏览器访问 http://localhost:5173 即可。
开发环境下 Vite 会把 `/api/*` 请求代理到后端，无需关心跨域。

## API 一览

| 方法   | 路径                | 说明           |
|--------|---------------------|----------------|
| GET    | `/api/todos`        | 列出所有待办   |
| POST   | `/api/todos`        | 新建待办       |
| PUT    | `/api/todos/<id>`   | 更新待办       |
| DELETE | `/api/todos/<id>`   | 删除待办       |

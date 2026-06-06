"""Flask backend for the Todo app.

A small REST API backed by SQLite. Exposes CRUD endpoints under /api/todos.
Run with:  python app.py   (listens on http://127.0.0.1:5000)
"""
import sqlite3
from pathlib import Path

from flask import Flask, jsonify, request, abort
from flask_cors import CORS

DB_PATH = Path(__file__).parent / "todos.db"

app = Flask(__name__)
CORS(app)  # allow the Vite dev server (different origin) to call the API


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_db() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS todos (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                title     TEXT    NOT NULL,
                completed INTEGER NOT NULL DEFAULT 0,
                created_at TEXT   NOT NULL DEFAULT (datetime('now'))
            )
            """
        )


def row_to_dict(row):
    return {
        "id": row["id"],
        "title": row["title"],
        "completed": bool(row["completed"]),
        "created_at": row["created_at"],
    }


@app.get("/api/todos")
def list_todos():
    with get_db() as conn:
        rows = conn.execute("SELECT * FROM todos ORDER BY id DESC").fetchall()
    return jsonify([row_to_dict(r) for r in rows])


@app.post("/api/todos")
def create_todo():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    if not title:
        abort(400, description="title is required")
    with get_db() as conn:
        cur = conn.execute("INSERT INTO todos (title) VALUES (?)", (title,))
        row = conn.execute("SELECT * FROM todos WHERE id = ?", (cur.lastrowid,)).fetchone()
    return jsonify(row_to_dict(row)), 201


@app.put("/api/todos/<int:todo_id>")
def update_todo(todo_id):
    data = request.get_json(silent=True) or {}
    with get_db() as conn:
        row = conn.execute("SELECT * FROM todos WHERE id = ?", (todo_id,)).fetchone()
        if row is None:
            abort(404, description="todo not found")

        title = data.get("title", row["title"])
        if isinstance(title, str):
            title = title.strip() or row["title"]
        completed = data.get("completed", bool(row["completed"]))

        conn.execute(
            "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
            (title, int(bool(completed)), todo_id),
        )
        row = conn.execute("SELECT * FROM todos WHERE id = ?", (todo_id,)).fetchone()
    return jsonify(row_to_dict(row))


@app.delete("/api/todos/<int:todo_id>")
def delete_todo(todo_id):
    with get_db() as conn:
        cur = conn.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
        if cur.rowcount == 0:
            abort(404, description="todo not found")
    return "", 204


@app.errorhandler(400)
@app.errorhandler(404)
def handle_error(err):
    return jsonify({"error": err.description}), err.code


if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=True)

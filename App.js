import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTag, setNewTag] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState('');
  const [editTag, setEditTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, tag: newTag }]);
      setNewTask('');
      setNewTag('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id, text, tag) => {
    setIsEditing(id);
    setEditText(text);
    setEditTag(tag);
  };

  const handleSaveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText, tag: editTag } : task
      )
    );
    setIsEditing(null);
    setEditText('');
    setEditTag('');
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <input
          type="text"
          placeholder="Add a tag (optional)..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            {isEditing === task.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <input
                  type="text"
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              </>
            ) : (
              <>
                <div>
                  <span className="task-text">{task.text}</span>
                  {task.tag && <span className="task-tag">[{task.tag}]</span>}
                </div>
                <div>
                  <button onClick={() => handleEditTask(task.id, task.text, task.tag)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

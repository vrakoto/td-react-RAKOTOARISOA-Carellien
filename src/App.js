// App.js
import React, { useState, useEffect } from 'react';
import TaskForm from './Components/TaskForm';
import TaskList from './Components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { text: task, completed: false }]);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'done') return task.completed;
    if (filter === 'undone') return !task.completed;
    return false;
  });

  return (
    <div className='app-container'>
      <TaskForm addTask={addTask} data-cy="task-form" />
      <div>
        <button data-cy="filter-btn-all" onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>
          Toutes
        </button>
        <button data-cy="filter-btn-done" onClick={() => setFilter('done')} className={filter === 'done' ? 'selected' : ''} 
>
          Complétées
        </button>
        <button data-cy="filter-btn-undone" onClick={() => setFilter('undone')} className={filter === 'undone' ? 'selected' : ''}>
          Non complétées
        </button>
      </div>
      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        data-cy="task-list"
      />
    </div>
  );
};

export default App;
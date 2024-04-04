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
  

  // Lorsqu'une tâche est créer, on l'ajoute dans le tableau des tasks existant et on initialise son statut "completed" à false 
  const addTask = (task) => {
	  setTasks([...tasks, { text: task, completed: false }]);
  };


  // Active ou désactive le statut d'une tâche soit à "Completée" soit à "Non complétées" 
  const toggleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };


  // Filtre les tâches par "Toutes", "Complétée" ou "Non complétée"
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'done') return task.completed;
    if (filter === 'undone') return !task.completed;
    return false;
  });

  return (
    <div className='app-container'>
      <TaskForm addTask={addTask} data-cy="task-form" /> {/* Formulaire permettant l'ajout d'une tache */}
      <div>
        <button data-cy="filter-btn-all" onClick={() => setFilter('all')} className={filter === 'all' ? 'selected' : ''}>
          Toutes
        </button>
        <button data-cy="filter-btn-done" onClick={() => setFilter('done')} className={filter === 'done' ? 'selected' : ''} >
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
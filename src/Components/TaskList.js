// TaskList.js
import React from 'react';
import './style.css';

const TaskList = ({ tasks, toggleTaskCompletion }) => {
  return (
    <ul data-cy="task-list">
      {tasks.map((task, index) => (
        <li
          key={index}
          onClick={() => toggleTaskCompletion(index)}
        //   style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          className={task.completed ? 'completed' : ''}
          data-cy="task-item"
        >
          {task.text}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
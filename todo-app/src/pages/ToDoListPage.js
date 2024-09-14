import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import TodoList from '../components/ToDoList';
import AddTodo from '../components/AddTodo';
import Header from '../components/Header';
import WelcomeComponent from '../components/WelcomeComponent';

function ToDoListPage() {
  const gStyle = {  margin: "20px" };

  const [todos, setTodos] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);

  
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos)); 
      } catch (error) {
        console.error("Error parsing localStorage todos:", error);
        setTodos([]); 
      }
    } else {
      setTodos([]); 
    }
  }, []);

  // Save todos to local storage whenever the todos array changes
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos)); 
    }
  }, [todos]);

  const addTodo = (title, description) => {
    const newTodo = { id: Date.now(), title, description, completed: false };
    setTodos([...todos, newTodo]);
    setOpenAdd(false);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <Header />
      <WelcomeComponent/>
      <Grid style={gStyle}>
        
        <Button variant="contained" color="primary" onClick={() => setOpenAdd(true)}>
          Add Task
        </Button>
        <TodoList
          todos={todos}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          toggleCompletion={toggleCompletion}
        />
        <AddTodo open={openAdd} handleClose={() => setOpenAdd(false)} addTodo={addTodo} />
      </Grid>
    </>
  );
}

export default ToDoListPage;

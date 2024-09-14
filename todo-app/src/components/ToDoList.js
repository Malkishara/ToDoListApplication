import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox, Typography } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import EditTodo from '../components/EditTodo';

const TodoList = ({ todos, updateTodo, deleteTodo, toggleCompletion }) => {
  const listStyle = {
    margin: '20px 0px',
    maxHeight: '600px', 
    overflowY: 'auto',  
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setOpenEdit(true);
  };

  return (
    <>
      <List style={listStyle}>
        {todos
          .slice() 
          .reverse() 
          .map((todo) => (
            <ListItem key={todo.id} divider>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}
              />
              <ListItemText
                primary={
                  <Typography
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                  >
                    {todo.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography>{todo.description}</Typography>
                    <Typography style={{ color: todo.completed ? 'green' : 'red', marginTop: 8 }}>
                      {todo.completed ? 'Completed' : 'Incomplete'}
                    </Typography>
                  </>
                }
              />
              <IconButton edge="end" onClick={() => handleEditClick(todo)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                <Delete />
              </IconButton>
            </ListItem>
          ))}
      </List>
      {selectedTodo && (
        <EditTodo
          open={openEdit}
          handleClose={() => setOpenEdit(false)}
          todo={selectedTodo}
          updateTodo={updateTodo}
        />
      )}
    </>
  );
};

export default TodoList;

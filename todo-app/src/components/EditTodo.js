import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core';

const EditTodo = ({ open, handleClose, todo, updateTodo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const handleSubmit = () => {
    if (title && description) {
      updateTodo(todo.id, { ...todo, title, description });
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
      <Button onClick={handleClose} type='submit' color="secondary"  variant="contained" style={{ width: '80px' }} >Cancel</Button>
      <Button onClick={handleSubmit} type='submit' color='primary' variant="contained" style={{ width: '80px' }} >Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodo;

import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { UpdateTodoAPI } from '../../../api/todo/TodoListController.js';


const EditDialog = ({ open, handleClose, selectedTodo, selectedId }) => {
  const [todoText, setTodoText] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      setTodoText(selectedTodo.TodoItem); 
    }
  }, [selectedTodo]);

  const handleSave = async () => {
    const payload = {
      TodoItem: todoText,  
    };

    try {
      
      await UpdateTodoAPI(selectedId,payload);
      
        handleClose();
    
        window.location.reload();  
  
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  };

  return (
    <Dialog  className='bg-gray-100 rounded-3xl p-10 shadow-md' open={open}>
      <DialogHeader>Edit Todo Wish list</DialogHeader>
      <DialogBody >
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)} 
          className="w-full p-2 rounded-md border border-gray-300 focus:outline-none
          focus:ring-1
          focus:ring-blue-500
          focus:border-blue-500
          shadow-sm
          transition-all"
        />
      </DialogBody>
      <DialogFooter >
        <Button
          variant="text"
          color="red"
          onClick={handleClose}
          className="mr-1 font-medium"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={handleSave}
          className='font-medium'
        >
          <span>Save</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditDialog;

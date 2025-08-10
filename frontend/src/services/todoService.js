/**
 * Todo Service
 * 
 * This service handles all interactions with the todo data.
 * Currently implemented with localStorage for development.
 * 
 * To integrate with Frappe backend:
 * 1. Replace the localStorage functions with API calls
 * 2. Update the response handling to match Frappe's API format
 */

// Storage key for localStorage
const STORAGE_KEY = 'todos';

// Get all todos
export const getAllTodos = async () => {
  try {
    const todos = localStorage.getItem(STORAGE_KEY);
    return todos ? JSON.parse(todos) : [];
    
    // When integrating with Frappe:
    // const response = await fetch('/api/resource/Todo');
    // return response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// Add a new todo
export const addTodo = async (text) => {
  try {
    const todos = await getAllTodos();
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return newTodo;
    
    // When integrating with Frappe:
    // const response = await fetch('/api/resource/Todo', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     text: text,
    //     completed: 0,
    //   })
    // });
    // return response.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

// Toggle todo completion status
export const toggleTodo = async (id) => {
  try {
    const todos = await getAllTodos();
    const todo = todos.find(t => t.id === id);
    
    if (todo) {
      todo.completed = !todo.completed;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      return todo;
    }
    
    // When integrating with Frappe:
    // const response = await fetch(`/api/resource/Todo/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     completed: completed ? 1 : 0
    //   })
    // });
    // return response.json();
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    let todos = await getAllTodos();
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return { success: true };
    
    // When integrating with Frappe:
    // const response = await fetch(`/api/resource/Todo/${id}`, {
    //   method: 'DELETE'
    // });
    // return response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
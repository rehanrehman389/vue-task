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
import { createListResource, createResource } from 'frappe-ui'
// Storage key for localStorage
// const STORAGE_KEY = 'todos';

// Get all todos
export const getAllTodos = async () => {
  try {
    // const todos = localStorage.getItem(STORAGE_KEY);
    // return todos ? JSON.parse(todos) : [];
    
    // When :
    const response = await fetch(
      '/api/resource/ToDo?fields=["name","description","status", "creation"]'
    );
    // return response.json();
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// export const todos = createListResource({
//   doctype: 'ToDo',
//   fields: ['description'],
//   orderBy: 'creation desc',
//   start: 0,
//   pageLength: 5,
// })

// // Fetch todos initially
// todos.fetch()

// // Get all todos (returns reactive data)
// export const getAllTodos = () => {
//   return todos.data || []
// }

// Add a new todo
export const addTodo = async (text) => {
  try {
    // const todos = await getAllTodos();
    // const newTodo = {
    //   id: Date.now(),
    //   text,
    //   completed: false,
    //   createdAt: new Date().toISOString()
    // };
    
    // todos.push(newTodo);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    // return newTodo;
    
    // When integrating with Frappe:
    const response = await fetch('/api/resource/ToDo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: text,
        status: 'Open',
      })
    });
    // After adding, fetch the updated list so UI has all todos
    // return await getAllTodos();
    const data = await response.json();
    return data.data; // Return only the new todo
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

// Toggle todo completion status
export const toggleTodo = async (id) => {
  try {
    // const todos = await getAllTodos();
    // const todo = todos.find(t => t.id === id);
    
    // if (todo) {
    //   todo.completed = !todo.completed;
    //   localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    //   return todo;
    // }
    
    // When integrating with Frappe:
    const response = await fetch(`/api/resource/ToDo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Closed'
      })
    });
    // return response.json();
    // return await getAllTodos();
    const data = await response.json();
    return data.data; // Return only the updated todo
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id) => {
  try {
    // let todos = await getAllTodos();
    // todos = todos.filter(t => t.id !== id);
    // localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    // return { success: true };
    
    // When integrating with Frappe:
    const response = await fetch(`/api/resource/ToDo/${id}`, {
      method: 'DELETE'
    });
    // return response.json();
    // return await getAllTodos();
    return { success: true, id };
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
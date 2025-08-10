<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center mb-6">
        Todo App
      </h1>
      <TodoForm @add-todo="addTodo" />
      <div v-if="loading" class="text-center py-4">
        <div class="spinner"></div>
        Loading todos...
      </div>
      <TodoList 
        v-else
        :todos="todos" 
        @toggle-todo="toggleTodo" 
        @delete-todo="deleteTodo"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TodoList from './components/TodoList.vue';
import TodoForm from './components/TodoForm.vue';
import { getAllTodos, addTodo as addTodoService, toggleTodo as toggleTodoService, deleteTodo as deleteTodoService } from './services/todoService';

const todos = ref([]);
const loading = ref(true);

// Load todos when app mounts
onMounted(async () => {
  try {
    todos.value = await getAllTodos();
    console.log(todos.value);
  } catch (error) {
    console.error('Failed to load todos:', error);
  } finally {
    loading.value = false;
  }
});

// Add a new todo
async function addTodo(text) {
  if (text.trim()) {
    try {
      const newTodo = await addTodoService(text);
      todos.value.push(newTodo);
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }
}

// Toggle todo completed state
async function toggleTodo(id) {
  try {
    await toggleTodoService(id);
    const todo = todos.value.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  } catch (error) {
    console.error('Failed to toggle todo:', error);
  }
}

// Delete a todo
async function deleteTodo(id) {
  try {
    await deleteTodoService(id);
    todos.value = todos.value.filter(todo => todo.name !== id);
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
}
</script>

<style>
@import './style.css';

.spinner {
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-top: 3px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin: 0 auto 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
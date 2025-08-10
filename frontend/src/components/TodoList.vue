<template>
  <div v-if="todos.length > 0" class="space-y-2">
    <div 
      v-for="todo in todos" 
      :key="todo.name" 
      class="flex items-center justify-between p-3 bg-white rounded-md shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
    >
      <div class="flex items-center">
        <input
          type="checkbox"
          :checked="todo.status === 'Closed'"
          @change="$emit('toggle-todo', todo.name)"
          class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mr-3"
        />
        <span :class="{ 'line-through text-gray-400': todo.status === 'Closed' }"
        v-html="todo.description"
        >
        </span>
      </div>
      <div class="flex items-center">
        <span class="text-xs text-gray-500 mr-3">
          {{ formatDate(todo.creation) }}
        </span>
        <button 
          @click="$emit('delete-todo', todo.name)"
          class="text-red-500 hover:text-red-700"
          aria-label="Delete todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div v-else class="p-6 text-center text-gray-500 bg-white rounded-md shadow-sm border border-gray-200">
    No todos yet. Add one to get started!
  </div>
</template>

<script setup>
defineProps({
  todos: {
    type: Array,
    required: true
  }
});

defineEmits(['toggle-todo', 'delete-todo']);

// Format the date to be more readable
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  });
}
</script>
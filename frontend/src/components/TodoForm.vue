<template>
  <form @submit.prevent="handleSubmit" class="mb-4">
    <div class="flex gap-2">
      <input
        v-model="todoText"
        type="text"
        placeholder="Add a new task..."
        class="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        type="submit"
        class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const todoText = ref('');
const emit = defineEmits(['add-todo']);

function handleSubmit() {
  emit('add-todo', todoText.value);
  todoText.value = '';
}
</script>
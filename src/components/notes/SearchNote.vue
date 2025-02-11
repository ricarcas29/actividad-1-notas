<template>
    <input type="text" class="form-control" placeholder="Buscar nota..." @input="handleSearchNote" />
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits<{
    (e: 'search', value: string): void
}>();

const handleSearchNote = (e: Event) => {
    const target = e.target as HTMLInputElement;
    emit('search', target.value);
};

</script>
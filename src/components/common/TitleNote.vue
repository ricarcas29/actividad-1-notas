<template>
    <div class="col-12 my-1.5">
        <div class="flex items-center gap-x-1.5">
            <h1 class="m-0 truncate font-bold max-w-fit">{{ title }}</h1>
            <span class="badge rounded-pill bg-gray-300">{{ noteStore.notesCount }}</span>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useNoteStore } from '@/stores/noteStore';

const noteStore = useNoteStore();

defineProps<{
    title: string;
}>();
</script>
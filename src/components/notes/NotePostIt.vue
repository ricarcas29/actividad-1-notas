<script setup lang="ts">
import type { Note } from '@/interfaces/Note';
import TagNoteBadge from '../common/TagNoteBadge.vue';

defineProps<{ note: Note }>();

const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString('es-ES', options);
};
</script>

<template>
    <div class="col-4 p-2">
        <div class=" post-it">
            <h3 class="title">{{ note.title }}</h3>
            <p class="content">{{ note.content }}</p>
            <p class="m-0 text-sm">{{ formatDate(note.createdAt) }}</p>
            <div class="d-flex justify-content-end gap-2">
                <TagNoteBadge v-for="tag in note.tags" :key="tag.id" :color="tag.color">
                    <template #name>{{ tag.name }}</template>
                </TagNoteBadge>
            </div>
        </div>
    </div>
</template>

<style scoped>
.post-it {
    width: 100%;
    height: 200px;
    background-color: #ffeb3b;
    padding: 10px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
}

.post-it:hover {
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.02);
    transition: all 0.3s;
}

.title {
    font-size: 1.2em;
    font-weight: bold;
    white-space: break-spaces;
    text-overflow: ellipsis;
    margin: 0;
}

.content {
    flex-grow: 1;
    overflow: auto;
    word-wrap: break-word;
    max-height: 100%;
    margin: 0;
}
</style>

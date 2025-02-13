<template>
    <button class="fixed bottom-10 right-10 p-2 bg-black text-white rounded-full shadow-lg w-10 h-10 text-center"
        @click="showModal">
        <PlusIcon fill="white" />
    </button>

    <AddNoteModal @submit="handleAddNote" @edit="handleEditNote" ref="modalRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PlusIcon from '@/assets/icons/PlusIcon.vue';
import AddNoteModal from '../notes/AddNoteModal.vue';

import type { Note } from '@/interfaces/Note';
import { useNoteStore } from '@/stores/noteStore';

const noteStore = useNoteStore();
const modalRef = ref<InstanceType<typeof AddNoteModal> | null>(null);

const showModal = () => {
    modalRef.value?.open();
};

const handleAddNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    noteStore.addNote(note);
};

const handleEditNote = (noteId: string) => {
    modalRef.value?.handleEditNote(noteId);
};

defineExpose({ showModal, handleEditNote });

</script>

<style scoped>
button {
    border-radius: 100% !important;
}
</style>

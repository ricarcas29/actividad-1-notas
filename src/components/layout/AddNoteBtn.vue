<template>
    <button class="fixed bottom-10 right-10 p-2 bg-black text-white rounded-full shadow-lg w-10 h-10 text-center"
        style="border-radius:  100% !important;" @click="showModal">
        <PlusIcon fill="white" />
    </button>

    <AddNoteModal @submit="handleAddNote" @submit-update="handleUpdateNote" ref="modalRef" />
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import PlusIcon from '@/assets/icons/PlusIcon.vue';
import AddNoteModal from '../notes/AddNoteModal.vue';

import type { Note } from '@/interfaces/Note';
import { useNoteStore } from '@/stores/noteStore';

const noteStore = useNoteStore();
const modalRef = ref<InstanceType<typeof AddNoteModal> | null>(null);
defineEmits(["edit"]);

const showModal = () => {
    if (modalRef.value) {
        modalRef.value.open();
    }
};

const handleAddNote = (note: Omit<Note, 'id' | 'createdAt'>) => {
    noteStore.addNote({
        ...note,
    });
};

const handleUpdateNote = (note: Note) => {
    noteStore.updateNote(note);
};

</script>

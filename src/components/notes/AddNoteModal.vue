<template>
    <div class="modal fade" id="addNoteModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true" ref="modalEl">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId" v-if="!isEditing">Añadir nota</h5>
                    <h5 class="modal-title" id="modalTitleId" v-else>Editar nota</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="handleResetForm"></button>
                </div>
                <div class="modal-body">
                    <NoteForm ref="noteFormRef" @submit="handleSubmitForm" @submit-update="handleEditForm" />
                </div>
                <div class="modal-footer" :class="{ 'justify-content-between': isEditing }">
                    <div v-if="isEditing">
                        <button type="button" class="btn btn-danger" @click="handleDeleteNote">Eliminar</button>
                    </div>
                    <div class="gap-2 flex">
                        <button type="button" class="btn btn-secondary" @click="handleResetForm">Cerrar</button>
                        <button type="button" class="btn bg-black text-white" @click="submitForm">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
/* IMPORTACIÓN DE FUNCIONES */
import { ref, onMounted, computed } from 'vue';
import type { Note } from '@/interfaces/Note';

import { useNoteStore } from '@/stores/noteStore';
import NoteForm from './NoteForm.vue';

const noteStore = useNoteStore();

const modalEl = ref<HTMLElement | null>(null);
const noteFormRef = ref<InstanceType<typeof NoteForm> | null>(null);
let modalInstance: import("bootstrap").Modal | null = null;

const notes = computed(() => noteStore.notes);
const isEditing = ref(false);
const currentNoteId = ref('');

onMounted(() => {
    const bootstrap = (window as any).bootstrap;
    if (bootstrap && modalEl.value) {
        modalInstance = new bootstrap.Modal(modalEl.value);
    }
});

const open = () => {
    isEditing.value = false;
    if (modalInstance) {
        modalInstance.show();
    }
};

const submitForm = () => {
    if (!isEditing.value) {
        noteFormRef.value?.handleSubmit();
    } else {
        noteFormRef.value?.handleSubmitForUpdate(currentNoteId.value);
    }
};

const handleSubmitForm = (note: Omit<Note, 'id' | 'createdAt'>) => {
    noteStore.addNote(note);
    if (modalInstance) {
        modalInstance.hide();
    }
};

const handleEditNote = (noteId: string) => {
    const note = noteStore.notes.find(n => n.id === noteId) as Note;
    if (note) {
        isEditing.value = true;
        currentNoteId.value = noteId;
        noteFormRef.value?.setForm(note);
    }
};

const handleEditForm = (note: Omit<Note, 'createdAt'>) => {
    noteStore.updateNote({
        ...note,
        id: currentNoteId.value,
    });
    if (modalInstance) {
        modalInstance.hide();
    }
};

const handleResetForm = () => {
    noteFormRef.value?.resetForm();
    if (modalInstance) {
        modalInstance.hide();
    }
};

const handleDeleteNote = () => {
    noteStore.deleteNote(currentNoteId.value);
    noteFormRef.value?.resetForm();
    if (modalInstance) {
        modalInstance.hide();
    }
};

defineExpose({ open, handleEditNote });
</script>

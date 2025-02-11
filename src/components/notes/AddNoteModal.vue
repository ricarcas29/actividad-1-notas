<template>
    <div class="modal fade" id="addNoteModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true" ref="modalEl">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">Añadir nota</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <NoteForm ref="noteFormRef" @submit="handleSubmitForm" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn bg-black text-white" @click="submitForm">Guardar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Note } from '@/interfaces/Note';

import { useNoteStore } from '@/stores/noteStore';
import NoteForm from './NoteForm.vue';

const noteStore = useNoteStore();

const modalEl = ref<HTMLElement | null>(null);
const noteFormRef = ref<InstanceType<typeof NoteForm> | null>(null);
let modalInstance: import("bootstrap").Modal | null = null;

onMounted(() => {

    const bootstrap = (window as any).bootstrap;
    if (bootstrap && modalEl.value) {
        modalInstance = new bootstrap.Modal(modalEl.value);
    }
});

const open = () => {
    if (modalInstance) {
        modalInstance.show();
    }
};

const submitForm = () => {
    noteFormRef.value?.handleSubmit();
};

const handleSubmitForm = (note: Omit<Note, 'id' | 'createdAt'>) => {
    noteStore.addNote({
        ...note,
    });
    if (modalInstance) {
        modalInstance.hide();
    }
};

defineExpose({ open });
</script>

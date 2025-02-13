<template>
    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true" ref="modalEl">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        ¡Atención!
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <p class="m-0">Esta acción eliminará todas las notas de la pantalla actual. ¿Estás seguro que
                        quieres continuar?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-black text-white" data-bs-dismiss="modal">
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-danger text-white"
                        @click="handleDeleteTagsById">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTagStore } from '@/stores/tagStore';
import { useNoteStore } from '@/stores/noteStore';

const modalEl = ref<HTMLElement | null>(null);
let modalInstance: import("bootstrap").Modal | null = null;

const tagStore = useTagStore();
const notesStore = useNoteStore();

const emit = defineEmits<{
    (e: 'delete-all-notes'): void;
}>()

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

const handleDeleteTagsById = () => {
    notesStore.deleteNotesByTag(tagStore?.currentTag?.id)
    close();
    emit('delete-all-notes');
};


const close = () => {
    if (modalInstance) {
        modalInstance.hide();
    }
};

defineExpose({
    open,
    close
});
</script>
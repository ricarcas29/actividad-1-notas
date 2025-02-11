<template>
    <div class="modal fade" id="addTagModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="titleModal" aria-hidden="true" ref="tagModal">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titleModal">
                        Añadir etiqueta
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <TagForm ref="tagForm" @submit="handleFormSubmit" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Cancelar
                    </button>
                    <button type="button" class="btn bg-black text-white" @click="submitFormTag">Guardar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Tag } from '@/interfaces/Tag';
import { useTagStore } from '@/stores/tagStore';

import TagForm from './TagForm.vue';

const tagModal = ref<HTMLElement | null>(null);
const tagForm = ref<InstanceType<typeof TagForm> | null>(null);
let modalInstance: import("bootstrap").Modal | null = null;

const tagStore = useTagStore();

onMounted(() => {
    const bootstrap = (window as any).bootstrap;
    if (bootstrap && tagModal.value) {
        modalInstance = new bootstrap.Modal(tagModal.value);
    }
});

const open = () => {
    if (modalInstance) {
        modalInstance.show();
    }
};

const handleFormSubmit = (tag: Omit<Tag, 'id'>) => {
    tagStore.addTag({
        ...tag,
    });

    if (modalInstance) {
        modalInstance.hide();
    }
};

const submitFormTag = () => {
    tagForm.value?.handleTagSubmit();
};

defineExpose({ open });
</script>
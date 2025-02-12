<template>
    <button class="btn btn-danger text-white w-10 h-10" type="button" @click="openModal">
        <TrashIcon fill="white" />
    </button>
    <DeleteAllNotesModal ref="deleteAllNotesModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

import TrashIcon from '@/assets/icons/TrashIcon.vue';
import DeleteAllNotesModal from '../notes/DeleteAllNotesModal.vue';

const deleteAllNotesModal = ref<InstanceType<typeof DeleteAllNotesModal> | null>(null);

const openModal = () => {
    if (deleteAllNotesModal.value) {
        deleteAllNotesModal.value.open();
    }
};
</script>
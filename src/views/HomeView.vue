<script setup lang="ts">
import AddNoteBtn from '@/components/layout/AddNoteBtn.vue';
import SidebarApp from '../components/SidebarApp.vue';
import TitleNote from '@/components/common/TitleNote.vue';
import SearchNote from '@/components/notes/SearchNote.vue';
import NotePostIt from '@/components/notes/NotePostIt.vue';

import { useNoteStore } from '@/stores/noteStore';
import { useTagStore } from '@/stores/tagStore';
import { computed, onMounted, ref } from 'vue';

import OrderNotes from '@/components/common/OrderNotes.vue';
import DeleteAllNotes from '@/components/common/DeleteAllNotes.vue';

/* --- referencias a componentes :) --- */
const addNoteBtnRef = ref<InstanceType<typeof AddNoteBtn> | null>(null);

/* --- variables reactivas --- */
const currentTitle = ref('Notas');

/* --- stores --- :D */
const noteStore = useNoteStore();
const tagStore = useTagStore();

/* --- Datos computados --- */
const hasNotes = computed(() => noteStore.filteredNotes.length > 0);

/* --- metodos para filtrar notas ;) --- */
const filterNotesByDate = (orderAsc: boolean) => {
    noteStore.orderNotesByDate(orderAsc);
};

const filterNotesByTitle = (title: string) => {
    noteStore.searchNotesByTitle(title);
};

/* --- metodo para abrir modal de edicion de nota :P --- */
const openEditModal = (noteId: string) => {
    if (addNoteBtnRef.value) {
        addNoteBtnRef.value.showModal();
        addNoteBtnRef.value.handleEditNote(noteId);
    }
};

const handleTagChange = (tagId: string) => {
    changeNoteTitle(tagId);
    noteStore.filterNotesByTag(tagId);
};

const changeNoteTitle = (tagId: string) => {
    const tag = tagStore.tags.find((tag) => tag.id === tagId);
    if (tag) {
        currentTitle.value = tag.name;
    } else {
        currentTitle.value = 'Notas';
    }
};

</script>

<template>
    <main class="flex">
        <SidebarApp  />
        <div class="container px-4 py-2">
            <div class="row items-center">
                <div class="col-4">
                    <TitleNote :title="currentTitle" />
                </div>
                <div class="col-4 text-center">
                    <SearchNote @search="filterNotesByTitle" />
                </div>
                <div class="col-4 text-end gap-2 flex justify-content-end">
                    <OrderNotes ref="orderNotes" @order="filterNotesByDate" />
                    <DeleteAllNotes ref="deleteAllNotesRef" />
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div v-if="hasNotes" class="row">
                        <NotePostIt v-for="note in noteStore.filteredNotes" :key="note.id" :note="note" @click="openEditModal(note.id)" />
                    </div>
                    <div v-else>
                        <p>No hay notas</p>
                    </div>
                </div>
            </div>
        </div>
        <AddNoteBtn ref="addNoteBtnRef" />
    </main>
</template>

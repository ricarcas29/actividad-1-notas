<script setup lang="ts">
import AddNoteBtn from '@/components/layout/AddNoteBtn.vue';
import SidebarApp from '../components/SidebarApp.vue';
import TitleNote from '@/components/common/TitleNote.vue';
import SearchNote from '@/components/notes/SearchNote.vue';
import NotePostIt from '@/components/notes/NotePostIt.vue';

import { useNoteStore } from '@/stores/noteStore';
import { computed, onMounted } from 'vue';
import OrderNotes from '@/components/common/OrderNotes.vue';

const noteStore = useNoteStore();

onMounted(() => {
    noteStore.fetchNotes();
});

const hasNotes = computed(() => noteStore.notes.length > 0);
const notes = computed(() => noteStore.filteredNotes);

const filterNotesByDate = (orderAsc: boolean) => {
    noteStore.orderNotesByDate(orderAsc);
};

const filterNotesByTitle = (title: string) => {
    noteStore.searchNotesByTitle(title);
};

</script>

<template>
    <main class="flex">
        <SidebarApp />
        <div class="container px-4 py-2">
            <div class="row items-center">
                <div class="col-4">
                    <TitleNote title="Notas" />
                </div>
                <div class="col-4">
                    <SearchNote @search="filterNotesByTitle" />
                </div>
                <div class="col-4 text-end">
                    <OrderNotes ref="orderNotes" @order="filterNotesByDate" />
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div v-if="hasNotes" class="row">
                        <NotePostIt v-for="note in notes" :key="note.id" :note="note" />
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
<template>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="title" class="form-label">Título</label>
            <input type="text" id="title" class="form-control" v-model="form.title" required>
        </div>
        <div class="mb-3">
            <label for="content" class="form-label">Contenido</label>
            <textarea id="content" class="form-control" v-model="form.content" required></textarea>
        </div>

        <div class="mb-3">
            <label for="selectTag">Etiquetas</label>
            <div class="input-group">
                <select class="form-select" id="selectTag" v-model="selectedTagId">
                    <option disabled value="">Selecciona una etiqueta</option>
                    <option v-for="tag in tagStore.tags" :key="tag.id" :value="tag.id">
                        {{ tag.name }}
                    </option>
                </select>
                <button class="btn btn-outline-secondary" type="button" @click="addSelectedTag">
                    +
                </button>
            </div>
            <a href="#" class="text-sm text-primary d-block mt-2" @click.prevent="openAddTagModal">
                Añadir etiqueta
            </a>
        </div>

        <div class="mb-3">
            <div class="d-flex flex-wrap gap-2">
                <span v-for="tag in selectedTags" :key="tag.id" class="badge rounded-pill"
                    :style="{ backgroundColor: tag.color }">
                    {{ tag.name }}
                    <button type="button" class="btn-close" @click="removeTag(tag.id)"></button>
                </span>
            </div>
        </div>
    </form>

    <AddTagModal ref="addTagModalRef" />
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import type { Note } from '@/interfaces/Note';
import type { Tag } from '@/interfaces/Tag';
import { useTagStore } from '@/stores/tagStore';

import AddTagModal from '../tags/AddTagModal.vue';

const tagStore = useTagStore();

const addTagModalRef = ref<InstanceType<typeof AddTagModal> | null>(null);
const selectedTagId = ref<string>('');
const selectedTags = ref<Tag[]>([]);

const emit = defineEmits<{
    (e: 'submit', task: Omit<Note, 'id' | 'createdAt'>): void
    (e: 'submit-update', task: Omit<Note, 'createdAt'>): void
}>()

const initialForm = {
    title: '',
    content: '',
    tags: [],
};

const form = reactive(initialForm);

const handleSubmit = () => {
    emit('submit', { ...form, tags: selectedTags.value });
    resetForm();
};

const handleSubmitForUpdate = (noteId: string) => {
    emit('submit-update', { ...form, id: noteId, tags: selectedTags.value });
    resetForm();
};

const resetForm = () => {
    Object.assign(form, { title: '', content: '', tags: [] });
    selectedTags.value = [];
};

const addSelectedTag = () => {
    if (!selectedTagId.value) return;

    const tag = tagStore.tags.find(t => t.id === selectedTagId.value);
    if (tag && !selectedTags.value.some(t => t.id === tag.id)) {
        selectedTags.value.push(tag);
    }
    selectedTagId.value = '';
};

const removeTag = (tagId: string) => {
    selectedTags.value = selectedTags.value.filter(tag => tag.id !== tagId);
};

const openAddTagModal = () => {
    if (addTagModalRef.value) {
        addTagModalRef.value.open();
    }
};

const setForm = (note: Note) => {
    Object.assign(form, note);
    selectedTags.value = note.tags;
};

defineExpose({ handleSubmit, form, setForm, handleSubmitForUpdate, resetForm });
</script>

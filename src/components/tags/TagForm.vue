<template>
    <form @submit="handleTagSubmit">
        <div class="mb-3">
            <label for="name" class="form-label">Título</label>
            <input type="text" id="name" class="form-control" v-model="form.name" required>
        </div>
        <div class="mb-3">
            <label for="color" class="form-label">Color</label>
            <input type="color" id="color" class="form-control" v-model="form.color" required>
        </div>
    </form>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useTagStore } from '@/stores/tagStore';
import type { Tag } from '@/interfaces/Tag';

const tagStore = useTagStore();

const emit = defineEmits<{
    (e: 'submit', tag: Omit<Tag, 'id'>): void;
}>();

onMounted(() => {
    //El fetchTags() sirve cuando haces una petición a una API o una reasignacion de variables
    // Por ejemplos una variable de este componente para usar solo en este template:
    // const tagsInTagForm = tagStore.fetchTags();
    // Se escribe así por que tu estas esperando que la función te retorne un valor.
    //Pero si quieres que siga manteniendo la reactividad, se escribe así en el store:
    // const fetchTags = () => {
    //       const req = await fetch('https://api.com/tags') = [{id: '1', name: 'tag1', color: 'red'}];
    //       const tags = ref(req);
    //      return tags;
    // }
    // tagStore.fetchTags();
});

const initialForm = {
    name: '',
    color: '',
};
const form = reactive(initialForm);

const handleTagSubmit = () => {
    emit('submit', form);
    resetForm();
};

const resetForm = () => {
    Object.assign(form, { name: '', color: '' });
};


defineExpose({ handleTagSubmit });

</script>
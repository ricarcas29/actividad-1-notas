import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Tag } from '@/interfaces/Tag.ts'

export const useTagStore = defineStore('tag', () => {
    const tagList = JSON.parse(localStorage.getItem('tags') ?? '[]');
    const tags = ref<Tag[]>(tagList);
    const loadingTags = ref(false);

    const tagsCount = computed(() => tags.value.length);

    const fetchTags = () => {
        return tags.value;
    }

    const addTag = (tag: Omit<Tag, 'id'>) => {
        const newTag = {
            ...tag,
            id: crypto.randomUUID(),
        }
        tags.value = [...tags.value, newTag];
    };

    const deleteTag = (id: string) => {
        tags.value = tags.value.filter((tag) => tag.id !== id);
    };

    watch(tags, (newTags) => {
        localStorage.setItem('tags', JSON.stringify(newTags));
    }, { deep: true });

    return {
        tags,
        tagsCount,
        loadingTags,
        addTag,
        deleteTag,
        fetchTags,
    }
});
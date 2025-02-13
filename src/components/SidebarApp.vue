<template>
    <nav class="flex flex-col shrink-0 w-24 shadow-sm navbar justify-content-start h-lvw">
        <div class="block p-2 no-underline font-bold text-sm">
            <p class="m-0">N-Dot</p>
            <hr class="m-0 border-t border-gray-500 w-100">
        </div>
        <div class="max-h-full overflow-y-auto flex flex-col gap-y-1.5">
            <NavbarLink to="/" @click="handleTagClick('')">
                <template v-slot:title>Todas</template>
            </NavbarLink>
            <NavbarLink v-for="tag in tagStore.tags" :key="tag.id" :to="`/?tag=${tag.id}`" :bg-color="tag.color"
                @click="handleTagClick(tag.id)">
                <template v-slot:title>{{ tag.name }}</template>
            </NavbarLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, computed, defineEmits } from 'vue';
import NavbarLink from './common/NavbarLink.vue';
import { useTagStore } from '@/stores/tagStore';
import { useNoteStore } from '@/stores/noteStore';
import { useRoute } from 'vue-router';


const tagStore = useTagStore();
const noteStore = useNoteStore();
// const tags = computed(() => tagStore.tags);

const emit = defineEmits<{
    (e: 'tag-click', tagId: string): void
}>();

onMounted(() => {
    // tagStore.fetchTags();

    const route = useRoute();
    const tagId = route.query.tag as string;

    handleTagClick(tagId);
});

const handleTagClick = (tagId: string) => {
    tagStore.setCurrentTag(tagId);
    noteStore.filterNotesByTag(tagId);
};

</script>
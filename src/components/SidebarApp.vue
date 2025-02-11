<template>
    <nav class="flex flex-col shrink-0 w-24 shadow-sm navbar justify-content-start h-lvw">
        <div class="block p-2 no-underline font-bold text-sm">
            <p class="m-0">N-Dot</p>
            <hr class="m-0 border-t border-gray-500 w-100">
        </div>
        <div class="max-h-full overflow-y-auto flex flex-col gap-y-1.5">
            <NavbarLink to="/">
                <template v-slot:title>Todas</template>
            </NavbarLink>
            <NavbarLink v-for="tag in tags" :key="tag.id" :to="`/?tag=${tag.id}`" :bg-color="tag.color">
                <template v-slot:title>{{ tag.name }}</template>
            </NavbarLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import NavbarLink from './common/NavbarLink.vue';
import { useTagStore } from '@/stores/tagStore';

const tagStore = useTagStore();
const tags = computed(() => tagStore.tags);

onMounted(() => {
    tagStore.fetchTags();
});


</script>
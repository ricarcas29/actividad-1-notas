<template>
    <RouterLink :to="to" :class="[
        'block p-2 text-sm text-center badge rounded-pill text-wrap',
        textColor,
        hoverColor
    ]" :style="{ textDecoration: isActive ? 'underline' : 'none', backgroundColor: bgColor ? bgColor : '#000' }">
        <slot name="title"></slot>
    </RouterLink>
</template>


<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';

interface Props {
    to: string;
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    hoverColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
    bgColor: '',
    textColor: 'text-white',
    hoverColor: 'hover:bg-red-500',
});

const route = useRoute();
const isActive = computed(() => {
    return route.query.tag === props.to.split('=')[1];
});

</script>
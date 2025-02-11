<template>
    <div class="badge rounded-pill text-white" :style="`background-color: ${color}`">
        <slot name="name"></slot>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    color: string;
}

withDefaults(defineProps<Props>(), {
    color: 'gray'
});
</script>
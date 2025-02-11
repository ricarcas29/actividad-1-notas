<template>
    <button class="btn bg-black text-white w-10 h-10" type="button" @click="toggleOrder">
        <OrderAscIcon fill="white" v-if="orderAsc" />
        <OrderDesc fill="white" v-else />
    </button>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';

import OrderDesc from '@/assets/icons/OrderDesc.vue';
import OrderAscIcon from '@/assets/icons/OrderAscIcon.vue';

const orderAsc = ref(true);

const toggleOrder = () => {
    orderAsc.value = !orderAsc.value;
};

const emit = defineEmits<{
    (e: 'order', value: boolean): void
}>();

watch(orderAsc, (value) => {
    emit('order', value);
});

onMounted(() => {
    emit('order', orderAsc.value);
});
</script>
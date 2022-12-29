<template>
    <a-breadcrumb class="container-breadcrumb">
        <a-breadcrumb-item v-for="item in props.items" :key="item">
            {{ item }}
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>
  
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    items: {
        type: Array,
        default() {
            return [];
        },
    },
})
</script>
  
<style scoped lang="less">
.container-breadcrumb {
    margin: 16px 0;

    :deep(.arco-breadcrumb-item) {
        color: rgb(var(--gray-6));

        &:last-child {
            color: rgb(var(--gray-8));
        }
    }
}
</style>
  
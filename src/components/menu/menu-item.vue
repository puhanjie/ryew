<template>
    <div>
        <a-sub-menu v-if="props.item?.children && props.item?.children.length != 0" :key="absolutePath">
            <template #icon>
                <component :is="icon" />
            </template>
            <template #title>{{ props.item.meta.title }}</template>
            <menu-item v-for="route in props.item.children" :key="route.path" :item="route"></menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="absolutePath" @click="onMenuItemClick">
            {{ props.item.meta.title }}
        </a-menu-item>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const router = useRouter()
const absolutePath = router.getRoutes().filter(item => item.name == props.item.name)[0].path
const icon = props.item.meta?.icon ? `${props.item.meta?.icon}` : null

function onMenuItemClick() {
    //路由跳转
    router.push(absolutePath)
}
</script>
<template>
    <div v-if="!isHidden()">
        <template v-if="hasChild()">
            <a-sub-menu :key="absolutePath">
                <template #icon>
                    <component :is="icon" />
                </template>
                <template #title>{{ props.item.meta.title }}</template>
                <menu-item v-for="route in props.item.children" :key="route.path" :item="route"></menu-item>
            </a-sub-menu>
        </template>
        <template v-else>
            <a-menu-item :key="absolutePath" @click="onMenuItemClick">
                {{ props.item.meta.title }}
            </a-menu-item>
        </template>
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

const isHidden = () => {
    if (props.item?.hidden) {
        return props.item.hidden
    }
    return false
}

const hasChild = () => {
    if (props.item?.children && props.item?.children.length != 0) {
        return true
    }
    return false
}

function onMenuItemClick() {
    //路由跳转
    router.push(absolutePath)
}
</script>
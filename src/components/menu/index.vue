<template>
    <div>
        <a-menu :style="{ width: `${defaultSettings.menuWidth}px` }" 
        :level-indent="34"
        :auto-open-selected="true"
        :default-selected-keys="['/dashboard']">
            <menu-item v-for="route in routes" :key="route.path" :item="route"></menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import menuItem from '@/components/menu/menu-item.vue'
import { useRouter } from "vue-router"
import defaultSettings from '@/config/setting.json'

const router = useRouter()
const routes = router.options.routes
</script>
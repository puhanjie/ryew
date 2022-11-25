<template>
    <div>
        <a-menu :style="{ width: `${defaultSettings.menuWidth}px` }" 
        :level-indent="34"
        :auto-open-selected="true"
        :default-selected-keys="['/dashboard']">
            <menu-item v-for="route in userStore.routes" :key="route.path" :item="route"></menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import menuItem from '@/components/menu/menu-item.vue'
import defaultSettings from '@/config/setting.json'
import { useUserStore } from '@/store'

const userStore = useUserStore()
</script>
<template>
    <div class="container">
        <a-menu style="height: 100%" theme="dark" :level-indent="34" :auto-open-selected="true" @collapse="setCollapsed"
            :default-selected-keys="['/dashboard']">
            <menu-item v-for="route in userStore.routes" :key="route.path" :item="route"></menu-item>
        </a-menu>
    </div>
</template>

<script setup>
import menuItem from '@/components/menu/menu-item.vue'
import defaultSettings from '@/config/setting.json'
import { useUserStore, useAppStore } from '@/store'

const userStore = useUserStore()
const appStore = useAppStore()

const setCollapsed = () => {
    appStore.setCollapseStatus();
};
</script>

<style lang="less" scoped>
.container {
    height: 100%;
}
</style>
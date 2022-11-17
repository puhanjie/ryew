<template>
    <a-layout class="layout">
        <a-layout-header class="layout-header">
            <NavBar />
        </a-layout-header>
        <a-layout class="layout-bottom">
            <a-layout-sider class="layout-bottom-sider" :width="defaultSettings.menuWidth">
                <Menu />
            </a-layout-sider>
            <a-layout>
                <a-layout-content class="layout-bottom-content">
                    <router-view :key="router.currentRoute.path"/>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<script setup>
import NavBar from '@/components/navbar/index.vue'
import { useRouter } from 'vue-router'
import Menu from '@/components/menu/index.vue'
import defaultSettings from '@/config/setting.json'

const router = useRouter()
</script>

<style lang="less" scoped>
@nav-size-height: 60px;

.layout {
    width: 100%;
    height: 100%;

    .layout-header {
        width: 100%;
        height: @nav-size-height;
        z-index: 100;
    }

    .layout-bottom {
        position: absolute;
        width: 100%;
        height: 100%;

        .layout-bottom-sider {
            height: 100%;
            padding-top: @nav-size-height;
        }

        .layout-bottom-content {
            width: 100%;
            height: 100%;
            padding-top: @nav-size-height;
            background-color: var(--color-fill-2);
        }
    }
}
</style>
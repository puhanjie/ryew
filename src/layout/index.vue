<template>
    <a-layout class="layout">
        <a-layout-sider class="layout-sider" :width="appStore.menuWidth" :collapsible="true" :collapsed="collapsed"
            breakpoint="xl" :hide-trigger="true">
            <div class="logo" :style="{ 'width': `${menuWidth}px` }">
                <a-space>
                    <img alt="logo"
                        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image" />
                    <a-typography-title :style="{ margin: 0, fontSize: '18px', color: '#fff' }" :heading="5"
                        v-show="!collapsed">
                        Rye
                    </a-typography-title>
                </a-space>
            </div>
            <Menu />
        </a-layout-sider>
        <a-layout-header class="layout-navbar" :style="{ 'padding-left': `${menuWidth}px` }">
            <NavBar />
        </a-layout-header>
        <a-layout-content class="layout-content" :style="{ 'padding-left': `${menuWidth}px` }">
            <router-view :key="router.currentRoute.path" />
        </a-layout-content>
    </a-layout>
</template>

<script setup>
import { computed } from 'vue';
import NavBar from '@/components/navbar/index.vue'
import { useRouter } from 'vue-router'
import Menu from '@/components/menu/index.vue'
import { useAppStore } from '@/store'

const router = useRouter()
const appStore = useAppStore()

const menuWidth = computed(() => {
    return appStore.menuCollapse ? 48 : appStore.menuWidth;
})
const collapsed = computed(() => {
    return appStore.menuCollapse
})
</script>

<style lang="less" scoped>
@nav-size-height: 60px;

.layout {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--color-fill-2);

    .layout-sider {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        padding: @nav-size-height 0 0 0;
        z-index: 99;
        transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);

        .logo {
            display: flex;
            align-items: center;
            padding-left: 10px;
            height: 60px;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #232324;
            z-index: 100;
        }
    }

    .layout-navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: @nav-size-height;
        z-index: 98;
    }

    .layout-content {
        padding-top: @nav-size-height;
    }
}
</style>
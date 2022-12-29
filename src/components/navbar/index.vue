<template>
    <div class="navbar">
        <div class="left-side">
            <component :is="appStore.menuCollapse ? 'icon-menu-unfold' : 'icon-menu-fold'" :size="20" style="cursor: pointer" @click="appStore.setCollapseStatus()"/>
            <Breadcrumb style="padding-left:10px" :items="['系统管理', '用户管理']" />
        </div>
        <ul class="right-side">
            <li>
                <a-dropdown trigger="click">
                    <a-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
                        <img alt="avatar" :src="avatar" />
                    </a-avatar>
                    <template #content>
                        <a-doption>
                            <a-space @click="$router.push({ name: 'Info' })">
                                <icon-user />
                                <span>
                                    用户中心
                                </span>
                            </a-space>
                        </a-doption>
                        <a-doption>
                            <a-space @click="$router.push({ name: 'Setting' })">
                                <icon-settings />
                                <span>
                                    用户设置
                                </span>
                            </a-space>
                        </a-doption>
                        <a-doption>
                            <a-space @click="handleLogout">
                                <icon-export />
                                <span>
                                    退出登录
                                </span>
                            </a-space>
                        </a-doption>
                    </template>
                </a-dropdown>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore, useAppStore } from '@/store'
import Breadcrumb from '@/components/breadcrumb/index.vue'

const userStore = useUserStore()
const appStore = useAppStore()

const avatar = computed(() => {
    return userStore.avatar
})

const handleLogout = () => {
    console.log('退出登录')
}
</script>

<style lang="less" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
}

.left-side {
    display: flex;
    align-items: center;
    padding-left: 10px;
}

.right-side {
    display: flex;
    padding-right: 20px;
    list-style: none;

    :deep(.locale-select) {
        border-radius: 20px;
    }

    li {
        display: flex;
        align-items: center;
        padding: 0 10px;
    }

    .nav-btn {
        border-color: rgb(var(--gray-2));
        color: rgb(var(--gray-8));
        font-size: 16px;
    }
}
</style>
<template>
    <div class="container">
        <Breadcrumb :items="['系统管理', '用户管理']" />
        <a-card class="general-card" title="用户管理">
            <a-row>
                <a-col :flex="1">
                    <a-form :model="formModel" :label-col-props="{ span: 6 }" :wrapper-col-props="{ span: 18 }"
                        label-align="left">
                        <a-row :gutter="16">
                            <a-col :span="8">
                                <a-form-item field="username" label="用户名">
                                    <a-input v-model="formModel.username" placeholder="请输入用户名" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-item field="email" label="邮箱">
                                    <a-input v-model="formModel.email" placeholder="请输入邮箱" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-col>
                <a-divider style="height: 42px" direction="vertical" />
                <a-col :flex="'86px'" style="text-align: right">
                    <a-space direction="horizontal" :size="18">
                        <a-button type="primary" @click="search">
                            <template #icon>
                                <icon-search />
                            </template>
                            查询
                        </a-button>
                        <a-button @click="reset">
                            <template #icon>
                                <icon-refresh />
                            </template>
                            重置
                        </a-button>
                    </a-space>
                </a-col>
            </a-row>
            <a-divider style="margin-top: 0" />
            <a-row style="margin-bottom: 16px">
                <a-col :span="12">
                    <a-space>
                        <a-button type="primary">
                            <template #icon>
                                <icon-plus />
                            </template>
                            新增
                        </a-button>
                        <a-upload action="/">
                            <template #upload-button>
                                <a-button>
                                    批量导入
                                </a-button>
                            </template>
                        </a-upload>
                    </a-space>
                </a-col>
            </a-row>
            <a-table row-key="username" :columns="columns" :data="data" :row-selection="rowSelection" />
        </a-card>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Breadcrumb from '@/components/breadcrumb/index.vue'

const generateFormModel = () => {
    return {
        username: '',
        email: ''
    }
}
const formModel = ref(generateFormModel())

const search = () => {

}

const reset = () => {

}

const rowSelection = reactive({
    type: 'checkbox',
    showCheckedAll: true,
    onlyCurrent: false,
})

const columns = [
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: '邮箱',
        dataIndex: 'email'
    },
    {
        title: '手机',
        dataIndex: 'phone'
    }
]
const data = reactive([
    {
        username: 'admin',
        email: 'hanjie.pu@outlook.com',
        phone: '15887280652'
    },
    {
        username: 'guest',
        email: 'example@qq.com',
        phone: '18650329448'
    }
])
</script>

<style lang="less" scoped>
.container {
    padding: 0 20px 20px 20px;
    height: 100%;
}
</style>
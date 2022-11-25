<template>
    <div class="login-form-wrapper">
        <div class="login-form-title">登录 Arco Design Pro</div>
        <div class="login-form-sub-title">登录 Arco Design Pro</div>
        <a-form ref="loginForm" :model="userInfo" class="login-form" layout="vertical" @submit="handleSubmit">
            <a-form-item field="username" :rules="[{ required: true, message: '用户名不能为空' }]"
                :validate-trigger="['change', 'blur']" hide-label>
                <a-input v-model="userInfo.username" placeholder="请输入用户名">
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item field="password" :rules="[{ required: true, message: '密码不能为空' }]"
                :validate-trigger="['change', 'blur']" hide-label>
                <a-input-password v-model="userInfo.password" placeholder="请输入密码" allow-clear>
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
                <div class="login-form-password-actions">
                    <a-checkbox checked="rememberPassword" :model-value="userInfo.rememberPassword"
                        @change="setRememberPassword">
                        记住密码
                    </a-checkbox>
                    <a-link>忘记密码</a-link>
                </div>
                <a-button type="primary" html-type="submit" long :loading="loading">
                    登录
                </a-button>
                <a-button type="text" long class="login-form-register-btn">
                    注册
                </a-button>
            </a-space>
        </a-form>
    </div>
</template>
  
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '@/store'
import useLoading from '@/hooks/loading'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
import { permissionRoutes } from '@/utils/routes'

const router = useRouter()
const { loading, setLoading } = useLoading()
const userStore = useUserStore()
const userInfo = reactive({
    username: 'admin',
    password: 'admin',
    rememberPassword: true
})
const handleSubmit = async () => {
    if (loading.value) return
    setLoading(true)
    try {
        const res = await login(userInfo)

        userStore.setUserStore(res.data)
        userStore.routes = permissionRoutes(router.options.routes, res.data.permissions)

        setToken(res.data.token)
        Message.success('登录成功')
        router.push('/')
    } catch (err) {
        console.error(err.message)
    } finally {
        setLoading(false)
    }
}
const setRememberPassword = () => {
    userInfo.rememberPassword = !userInfo.rememberPassword
}
</script>
  
<style lang="less" scoped>
.login-form {
    &-wrapper {
        width: 320px;
    }

    &-title {
        color: var(--color-text-1);
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
    }

    &-sub-title {
        color: var(--color-text-3);
        font-size: 16px;
        line-height: 24px;
    }

    &-password-actions {
        display: flex;
        justify-content: space-between;
    }

    &-register-btn {
        color: var(--color-text-3) !important;
    }
}
</style>
  
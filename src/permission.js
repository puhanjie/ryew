import router from './router'
import { useUserStore } from './store'
import { Message } from '@arco-design/web-vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { getInfo } from '@/api/user'

router.beforeEach(async (to, from, next) => {
    // 开始加载进度条
    NProgress.start()
    // 设置页面title
    document.title = to.meta.title

    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // 有token，则进入首页
            next({ path: '/' })
            // 进度条加载完成
            NProgress.done()
        } else {
            const userStore = useUserStore();
            const hasRoles = userStore.roles && userStore.roles.length > 0

            if (hasRoles) {
                // 有角色，则放行
                next()
            } else {
                // 无角色，用token重新获取角色
                try {
                    const res = await getInfo(hasToken)
                    userStore.username = res.data.username
                    userStore.roles = res.data.roles
                    userStore.permissions = res.data.permissions
                    next({ ...to, replace: true })
                } catch (error) {
                    // token过期，跳转至登录页
                    Message.error({
                        content: error || 'Has Error',
                        duration: 5 * 1000,
                    })
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        /* 无token */
        if (to.path === '/login') {
            // 若是登录则放行
            next()
        } else {
            // 非登陆则跳转为登录
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // 完成进度条加载
    NProgress.done()
})

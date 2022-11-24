import router from './router'
import { useUserStore } from './store'
import { Message } from '@arco-design/web-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { getInfo } from '@/api/user'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    // set page title
    document.title = to.meta.title

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const userStore = useUserStore();
            const hasRoles = userStore.roles && userStore.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    const res = await getInfo(hasToken)
                    userStore.username = res.data.username
                    userStore.roles = res.data.roles
                    userStore.permissions = res.data.permissions
                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and go to login page to re-login
                    //   await useUserStore.dispatch('user/resetToken')    // 移除状态管理器中的当前token，重新登录获取新token
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
        /* has no token*/
        console.log('无token重新定位至登录页')
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

import router from './router'
import useUserStore from './store'
import { Message } from '@arco-design/web-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()
    console.log('进入导航守卫')
    // set page title
    //   document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = useUserStore.role && useUserStore.role.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
                    //   const { roles } = await useUserStore.dispatch('user/getInfo')  // 获取用户角色

                    // generate accessible routes map based on roles
                    //   const accessRoutes = await useUserStore.dispatch('permission/generateRoutes', roles)   // 根据用户角色请求服务器获取动态路由

                    // dynamically add accessible routes
                    //   router.addRoutes(accessRoutes) // 添加动态路由

                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    console.log('有token但无角色重新获取角色')
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

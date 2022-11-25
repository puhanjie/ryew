import { useUserStore } from '@/store'

// 自定义权限指令
function checkPermission(el, binding) {
    const { value } = binding
    const userStore = useUserStore()
    const { permissions } = userStore

    if (Array.isArray(value)) {
        if (value.length > 0) {
            const permissionValues = value

            const hasPermission = permissionValues.includes(permissions)
            if (!hasPermission && el.parentNode) {
                el.parentNode.removeChild(el)
            }
        }
    } else {
        throw new Error(`need permissions! Like v-permission="['admin','user']"`)
    }
}

export default {
    // 指令生命周期函数
    mounted(el, binding) {
        checkPermission(el, binding)
    },
    updated(el, binding) {
        checkPermission(el, binding)
    }
}

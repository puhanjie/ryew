import permission from './permission'

// 安装自定义指令，用法：v-permission=['admin','guest']
export default {
    install(Vue) {
        Vue.directive('permission', permission)
    }
}